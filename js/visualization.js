import { barchart } from './barchart2.js';
import { scatterplot } from './scatterplot.js';
import { createEmptyTable } from "./table.js";
import { renderMap } from './renderMap.js';

console.log("visualization.js is up!");

(() => {
    barchart();
    scatterplot();
    const table = createEmptyTable(); // Save the table reference
    renderMap();

    document.addEventListener('selectedStateNamesUpdated', (event) => {
        const selectedStateNames = event.detail;
        console.log("Selected State Names from Another File: ", selectedStateNames);

        // Call your highlighting functions
        highlightBarchart(selectedStateNames);
        highlightScatterplot(selectedStateNames);
        updateTable(table, selectedStateNames);
        highlightMap(selectedStateNames);
    });

    // Function to handle highlighting in the bar chart from the scatter plot
    function highlightBarchart(selectedStates) {
        d3.selectAll('.bar')
            .classed('selected', d => selectedStates.includes(d.State))
            .attr('fill', d => (selectedStates.includes(d.State) ? 'red' : 'steelblue'));
    }

    // Function to handle highlighting in the scatter plot from the bar chart
    function highlightScatterplot(selectedStates) {
        d3.selectAll('.scatter-circle')
            .classed('selected', d => selectedStates.includes(d.State))
            .attr('fill', d => (selectedStates.includes(d.State) ? 'red' : ''));
    }

   // Function to handle highlighting in the US Map from the bar chart and scatter plot
    function highlightMap(selectedStates) {
        d3.selectAll('.state')
            .classed('highlighted', d => selectedStates.includes(d.properties.name))
            .attr('fill', d => (selectedStates.includes(d.properties.name) ? 'red' : 'cornflowerblue'));
    }

    function updateTable(table, selectedStates) {
        // Append a new row for each selected state and its data
        selectedStates.forEach(selectedState => {
            const stateIndex = selectedStateNames.indexOf(selectedState);
    
            if (stateIndex !== -1) {
                const totalExpenditure = finalExpenditures[stateIndex].toLocaleString("en-US", { style: "currency", currency: "USD" });
                const insurancePercentage = (insuredPercentage[stateIndex] !== null) ? insuredPercentage[stateIndex].toFixed(1) : "N/A";
                const maternityDeath = (maternityDeaths[stateIndex] !== null) ? maternityDeaths[stateIndex].toFixed(1) : "N/A";
    
                const newRow = table.select("tbody").append("tr").attr("class", "data-row");
                newRow.append("td").text(selectedState);
                newRow.append("td").text(totalExpenditure);
                newRow.append("td").text(insurancePercentage);
                newRow.append("td").text(maternityDeath);
    
                rowIndex++;
    
                updateSelectionRow(table, selectedState);
            } else {
                console.error("Selected state not found in the data.");
            }
        });
    }

    function updateSelectionRow(table, selectedState) {
        // Remove existing selection row
 table.select(".selection-row").remove();

 // Add a new selection row
 const selectionHead = table.select("thead");
 const selectionRow = selectionHead.append("tr").attr("class", "selection-row");
 const stateSelect = selectionRow.append("td")
   .append("select")
   .attr("class", "state-select")
   .on("change", function () {
     const selectedState = d3.select(this).property("value");
     updateTable(table, selectedState);
   });

 stateSelect.selectAll("option")
   .data(stateList)
   .enter().append("option")
   .text(d => d)
   .property("selected", d => d === selectedState); // Set the selected state

    }

    

})();
