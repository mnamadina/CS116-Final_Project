/* global D3 */

console.log("barchart file");

(() => {

  // Will be edited to follow the path later
  var barchart_data =
  [
    {"State": "United States", "Insured": 91.4},
    {"State": "Alabama", "Insured": 90.1},
    {"State": "Alaska", "Insured": 88.6},
    {"State": "Arizona", "Insured": 89.3},
    {"State": "Arkansas", "Insured": 90.8},
    {"State": "California", "Mortality": 93},
    {"State": "Colorado", "Insured": 92},
    {"State": "Connecticut", "Insured": 94.8},
    {"State": "Delaware", "Insured": 94.3},
    {"State": "District of Columbia", "Insured": 96.3},
    {"State": "Florida", "Insured": 87.9},
    {"State": "Georgia", "Insured": 87.4},
    {"State": "Hawaii", "Insured": 96.1},
    {"State": "Idaho", "Insured": 91.2},
    {"State": "Illinois", "Insured": 93},
    {"State": "Indiana", "Insured": 92.5},
    {"State": "Iowa", "Insured": 95.2},
    {"State": "Kansas", "Insured": 90.8},
    {"State": "Kentucky", "Insured": 94.3},
    {"State": "Louisiana", "Insured": 92.4},
    {"State": "Maine", "Insured": 94.3},
    {"State": "Maryland", "Insured": 93.9},
    {"State": "Massachusetts", "Insured": 97.5},
    {"State": "Michigan", "Insured": 95},
    {"State": "Minnesota", "Insured": 95.5},
    {"State": "Mississippi", "Insured": 88.1},
    {"State": "Missouri", "Insured": 90.6},
    {"State": "Montana", "Insured": 91.8},
    {"State": "Nebraska", "Insured": 92.9},
    {"State": "Nevada", "Insured": 88.4},
    {"State": "New Hampshire", "Insured": 94.9},
    {"State": "New Jersey", "Insured": 92.8},
    {"State": "New Mexico", "Insured": 90},
    {"State": "New York", "Insured": 94.8},
    {"State": "North Carolina", "Insured": 89.6},
    {"State": "North Dakota", "Insured": 92.1},
    {"State": "Ohio", "Insured": 93.5},
    {"State": "Oklahoma", "Insured": 86.2},
    {"State": "Oregon", "Insured": 93.9},
    {"State": "Pennsylvania", "Insured": 94.5},
    {"State": "Rhode Island", "Insured": 95.7},
    {"State": "South Carolina", "Insured": 90},
    {"State": "South Dakota", "Insured": 90.5},
    {"State": "Tennessee", "Insured": 90},
    {"State": "Texas", "Insured": 82},
    {"State": "Utah", "Insured": 91},
    {"State": "Vermont", "Insured": 96.3},
    {"State": "Virginia", "Insured": 93.2},
    {"State": "Washington", "Insured": 93.6},
    {"State": "West Virginia", "Insured": 93.9},
    {"State": "Wisconsin", "Insured": 94.6},
    {"State": "Wyoming", "Insured": 87.8}
  ]


/* global D3 */

function barchart() {
  console.log("setting the measurements for the barchart");

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
    console.log("calling the chart in the barchart");
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
})