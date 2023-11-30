// Sony's code
function Table() {
    function chart(selector, data) {
        let ourBrush = null,
        selectableElements = d3.select(null),
        dispatcher;
        
        // let table = d3.select(selector)
        //     .append("table")
        //     .classed("my-table", true);
        let svg = d3.select(selector)
            .append("svg")
            .classed("my-svg", true);

        let tableHeaders = ["State", "Total Healthcare Expenditure", "Spending on Medicaid", "Health Insurance Coverage Percentage", "Maternity Deaths"];

        let headerText = svg.append('g')
            .classed('headers', true)
            .selectAll('text')
            .data(tableHeaders)
            .enter()
            .append('text')
            .attr('x', (d, i) => i * 150)
            .attr('y', 20)
            .text(d => d);

        let rows = svg.append('g')
        .classed('rows', true)
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(0, ${30 + i * 20})`);
            
        let tr = table.append('thead').append('tr');
        tr.selectAll('th').data(tableHeaders).enter().append('th').text((d) => d);

        // let rows = table.append('tbody').selectAll('tr')
        //     .data(data)
        //     .enter()
        //     .append('tr');

        rows.selectAll('td')
            .data(d => [d.column1, d.column2, d.column3, d.column4, d.column5])
            .enter()
            .append('td')
            .text(d => d);

        let isMouseDown = false;

        rows.on("mouseover", (d, i, elements) => {
            if (ourBrush !== null) {
              d3.select(elements[i]).classed("highlighted", true);
              dispatcher.call("highlight", this, d);
            }
          }).on("mouseout", (d, i, elements) => {
            if (!isMouseDown) {
              d3.select(elements[i]).classed("selected", false)
                let dispatchString = Object.getOwnPropertyNames(dispatcher._)[0];
      
                // Let other charts know
                dispatcher.call(dispatchString, this, table.selectAll(".selected").data());
            }
            if (ourBrush !== null) {
              d3.select(elements[i]).classed("highlighted", false);
              dispatcher.call("unhighlight", this);
            }
          });
      
          rows.on("mousedown", (d, i, elements) => {
            isMouseDown = true;
            ourBrush = d3.select(elements[i]);
            ourBrush.classed("mousedown", true);
            selectableElements = d3.selectAll(".highlighted");
            dispatcher.call("selected", this, selectableElements.data());
          });
      
          d3.select("body").on("mouseup", () => {
            isMouseDown = false;
            if (ourBrush !== null) {
              ourBrush.classed("mousedown", false);
              selectableElements = d3.select(null);
              ourBrush = null;
            }
          });

          /* Brooke's code:
          let isMouseDown = false;
          d3.selectAll("tr")
          .on("mousedown", (d, i, elements) => {
            isMouseDown = true;
          })
          .on("mouseup", (d, i, elements) => {
            isMouseDown = false;
          })
          .on("mouseover", (d, i, elements) => {
            d3.select(elements[i]).classed("selected", true)
              let dispatchString = Object.getOwnPropertyNames(dispatcher._)[0];
              console.log('table.selectAll(".selected") is ', table.selectAll(".selected"))
              console.log('table.selectAll(".selected").data() is ', table.selectAll(".selected").data())
              dispatcher.call(dispatchString, this, table.selectAll(".selected").data());
          })
          .on("mouseout", (d, i, elements) => {
            if (!isMouseDown) {
              d3.select(elements[i]).classed("selected", false)
                let dispatchString = Object.getOwnPropertyNames(dispatcher._)[0];
      
                // Let other charts know
                dispatcher.call(dispatchString, this, table.selectAll(".selected").data());
      
            }
          });
          */

        return chart;
    }
    chart.selectionDispatcher = function (_) {
        if (!arguments.length) return dispatcher;
        dispatcher = _;
        return chart;
      };
    
      // Used to select relevant information from our other visualizations.
      // Will be modified for linking
      chart.updateSelection = function (selectedData) {
        if (!arguments.length) return;
    
        // Select an element if its datum was selected
        d3.selectAll('tr').classed("selected", d => {
          return selectedData.includes(d)
        });
      };

    return chart;
}
