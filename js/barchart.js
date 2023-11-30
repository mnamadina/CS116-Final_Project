/* global D3 */

function barchart() {
  // Based on Mike Bostock's margin convention
  // https://bl.ocks.org/mbostock/3019563
  let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35
  },
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    xValue = d => d[0],
    yValue = d => d[1],
    xLabelText = "",
    yLabelText = "",
    yLabelOffsetPx = 0,
    xScale = d3.scalePoint(),
    yScale = d3.scaleLinear(),
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

    // Define scales
    xScale
      .domain([])
      .rangeRound([0, width]);

    yScale
      .domain([])
      .rangeRound([height, 0]);

    // X axis
    let xAxis = svg.append("g")
      .attr("transform", "translate(0," + (height) + ")")
      .call(d3.axisBottom(xScale));

    // Put X axis tick labels at an angle
    xAxis.selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    // X axis label
    xAxis.append("text")
      .attr("class", "axisLabel")
      .attr("transform", "translate(" + (width - 50) + ",-10)")
      .text(xLabelText);

    // Y axis and label
    let yAxis = svg.append("g")
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("class", "axisLabel")
      .attr("transform", "translate(" + yLabelOffsetPx + ", -12)")
      .text(yLabelText);

    return chart;
  }

  return chart;
}