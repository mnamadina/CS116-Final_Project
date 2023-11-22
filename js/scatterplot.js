/* Brooke's code */

// Initialize a scatterplot. Modeled after Mike Bostock's
// Reusable Chart framework https://bost.ocks.org/mike/chart/
function scatterplot() {

  // Based on Mike Bostock's margin convention
  // https://bl.ocks.org/mbostock/3019563
  let margin = {
      top: 60,
      left: 50,
      right: 30,
      bottom: 20
    },
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    xValue = d => d[0],
    yValue = d => d[1],
    xLabelText = "",
    yLabelText = "",
    yLabelOffsetPx = 0,
    xScale = d3.scaleLinear(),
    yScale = d3.scaleLinear(),
    ourBrush = null,
    selectableElements = d3.select(null),
    dispatcher;

  // Create the chart by adding an svg to the div with the id 
  // specified by the selector using the given data
  function chart(selector, data) {
    let svg = d3.select(selector)
      .append("svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))
        .classed("svg-content", true);

    svg = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Define scales
    xScale
      .domain([
        d3.min(data, d => xValue(d)),
        d3.max(data, d => xValue(d))
      ])
      .rangeRound([0, width]);

    yScale
      .domain([
        d3.min(data, d => yValue(d)),
        d3.max(data, d => yValue(d))
      ])
      .rangeRound([height, 0]);

    let xAxis = svg.append("g")
        .attr("transform", "translate(0," + (height) + ")")
        .call(d3.axisBottom(xScale));
        
    // X axis label
    xAxis.append("text")        
        .attr("class", "axisLabel")
        .attr("transform", "translate(" + (width - 50) + ",-10)")
        .text(xLabelText);
      
    let yAxis = svg.append("g")
        .call(d3.axisLeft(yScale))
      .append("text")
        .attr("class", "axisLabel")
        .attr("transform", "translate(" + yLabelOffsetPx + ", -12)")
        .text(yLabelText);

    // Add the points
    let points = svg.append("g")
      .selectAll(".scatterPoint")
        .data(data);

    points.exit().remove();

    points = points.enter()
      .append("circle")
        .attr("class", "point scatterPoint")
      .merge(points)
        .attr("cx", X)
        .attr("cy", Y)
        .attr("r", 5);
    
    selectableElements = points;
    
    svg.call(brush);

    // Highlight points when brushed
    function brush(g) {
      const brush = d3.brush() // Create a 2D interactive brush
        .on("start brush", highlight) // When the brush starts/continues do...
        .on("end", brushEnd) // When the brush ends do...
        .extent([
          [-margin.left, -margin.bottom],
          [width + margin.right, height + margin.top]
        ]);
        
      ourBrush = brush;

      g.call(brush); // Adds the brush to this element

      // Highlight the selected circles
      function highlight() {
        if (d3.event.selection === null) return;
        const [
          [x0, y0],
          [x1, y1]
        ] = d3.event.selection;

        // If within the bounds of the brush, select it
        points.classed("selected", d =>
          x0 <= X(d) && X(d) <= x1 && y0 <= Y(d) && Y(d) <= y1
        );

        // Get the name of our dispatcher's event
        let dispatchString = Object.getOwnPropertyNames(dispatcher._)[0];

        // Let other charts know about our selection
        dispatcher.call(dispatchString, this, svg.selectAll(".selected").data());
      }
      
      function brushEnd(){
        // We don't want infinite recursion
        if(d3.event.sourceEvent.type!="end"){
          d3.select(this).call(brush.move, null);
        }         
      }
    }

    return chart;
  }

  // The x-accessor from the datum
  function X(d) {
    return xScale(xValue(d));
  }

  // The y-accessor from the datum
  function Y(d) {
    return yScale(yValue(d));
  }

  chart.margin = function (_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function (_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function (_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.x = function (_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return chart;
  };

  chart.y = function (_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return chart;
  };

  chart.xLabel = function (_) {
    if (!arguments.length) return xLabelText;
    xLabelText = _;
    return chart;
  };

  chart.yLabel = function (_) {
    if (!arguments.length) return yLabelText;
    yLabelText = _;
    return chart;
  };

  chart.yLabelOffset = function (_) {
    if (!arguments.length) return yLabelOffsetPx;
    yLabelOffsetPx = _;
    return chart;
  };

  // Gets or sets the dispatcher we use for selection events
  chart.selectionDispatcher = function (_) {
    if (!arguments.length) return dispatcher;
    dispatcher = _;
    return chart;
  };

  // Given selected data from another visualization 
  // select the relevant elements here (linking)
  chart.updateSelection = function (selectedData) {
    if (!arguments.length) return;

    // Select an element if its datum was selected
    selectableElements.classed("selected", d => {
      return selectedData.includes(d)
    });

  };

  return chart;
}