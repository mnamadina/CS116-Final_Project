// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
// console.log("visualization.js is up!");
(() => {

  // Will be edited to follow the path later
  let scatterplot_data =
    [
      {
        "State": "California",
        "Ranking": 1,
        "Mortality deaths/100,000 births": 9.5,
        "% living below poverty line (2021)": 12.3,
        "% of non-white residents": 26.23,
        "Instances of hate crimes (per 100,000)": 2.76
      },
      {
        "State": "Wisconsin",
        "Ranking": 2,
        "Mortality deaths/100,000 births": 10.8,
        "% living below poverty line (2021)": 10.8,
        "% of non-white residents": 26.47,
        "Instances of hate crimes (per 100,000)": 1.34
      },
      {
        "State": "Rhode Island",
        "Ranking": 3,
        "Mortality deaths/100,000 births": 11.2,
        "% living below poverty line (2021)": 12.1,
        "% of non-white residents": 20.63,
        "Instances of hate crimes (per 100,000)": 1.9
      },
      {
        "State": "Minnesota",
        "Ranking": 4,
        "Mortality deaths/100,000 births": 12.4,
        "% living below poverty line (2021)": 9.3,
        "% of non-white residents": 23.44,
        "Instances of hate crimes (per 100,000)": 3.71
      },
      {
        "State": "Massachusetts",
        "Ranking": 5,
        "Mortality deaths/100,000 births": 14.2,
        "% living below poverty line (2021)": 10.4,
        "% of non-white residents": 6.32,
        "Instances of hate crimes (per 100,000)": 5.77
      },
      {
        "State": "Utah",
        "Ranking": 6,
        "Mortality deaths/100,000 births": 14.9,
        "% living below poverty line (2021)": 8.7,
        "% of non-white residents": 23.27,
        "Instances of hate crimes (per 100,000)": 2.45
      },
      {
        "State": "Pennsylvania",
        "Ranking": 7,
        "Mortality deaths/100,000 births": 15.6,
        "% living below poverty line (2021)": 12,
        "% of non-white residents": 28.85,
        "Instances of hate crimes (per 100,000)": 0.42
      },
      {
        "State": "Colorado",
        "Ranking": 8,
        "Mortality deaths/100,000 births": 15.9,
        "% living below poverty line (2021)": 9.7,
        "% of non-white residents": 24.63,
        "Instances of hate crimes (per 100,000)": 3.73
      },
      {
        "State": "Connecticut",
        "Ranking": 9,
        "Mortality deaths/100,000 births": 16.7,
        "% living below poverty line (2021)": 10.1,
        "% of non-white residents": 43.95,
        "Instances of hate crimes (per 100,000)": 3.91
      },
      {
        "State": "New Hampshire",
        "Ranking": 10,
        "Mortality deaths/100,000 births": 16.7,
        "% living below poverty line (2021)": 7.4,
        "% of non-white residents": 14.69,
        "Instances of hate crimes (per 100,000)": 1.87
      },
      {
        "State": "Oregon",
        "Ranking": 11,
        "Mortality deaths/100,000 births": 16.8,
        "% living below poverty line (2021)": 12.2,
        "% of non-white residents": 19.53,
        "Instances of hate crimes (per 100,000)": 5.25
      },
      {
        "State": "Hawaii",
        "Ranking": 12,
        "Mortality deaths/100,000 births": 16.9,
        "% living below poverty line (2021)": 10.9,
        "% of non-white residents": 28.36,
        "Instances of hate crimes (per 100,000)": null
      },
      {
        "State": "Illinois",
        "Ranking": 13,
        "Mortality deaths/100,000 births": 16.9,
        "% living below poverty line (2021)": 12.1,
        "% of non-white residents": 75.85,
        "Instances of hate crimes (per 100,000)": 0.69
      },
      {
        "State": "Idaho",
        "Ranking": 14,
        "Mortality deaths/100,000 births": 18.2,
        "% living below poverty line (2021)": 10.8,
        "% of non-white residents": 42.75,
        "Instances of hate crimes (per 100,000)": 2.08
      },
      {
        "State": "Michigan",
        "Ranking": 15,
        "Mortality deaths/100,000 births": 18.4,
        "% living below poverty line (2021)": 13,
        "% of non-white residents": 45.76,
        "Instances of hate crimes (per 100,000)": 3.62
      },
      {
        "State": "Iowa",
        "Ranking": 16,
        "Mortality deaths/100,000 births": 18.7,
        "% living below poverty line (2021)": 11,
        "% of non-white residents": 30.21,
        "Instances of hate crimes (per 100,000)": 0.52
      },
      {
        "State": "Delaware",
        "Ranking": 17,
        "Mortality deaths/100,000 births": 18.9,
        "% living below poverty line (2021)": 11.5,
        "% of non-white residents": 18.48,
        "Instances of hate crimes (per 100,000)": 1.65
      },
      {
        "State": "New York",
        "Ranking": 18,
        "Mortality deaths/100,000 births": 19.8,
        "% living below poverty line (2021)": 14,
        "% of non-white residents": 34.5,
        "Instances of hate crimes (per 100,000)": 2.82
      },
      {
        "State": "Washington",
        "Ranking": 19,
        "Mortality deaths/100,000 births": 20.4,
        "% living below poverty line (2021)": 9.9,
        "% of non-white residents": 6.4,
        "Instances of hate crimes (per 100,000)": 3.12
      },
      {
        "State": "Kansas",
        "Ranking": 20,
        "Mortality deaths/100,000 births": 20.9,
        "% living below poverty line (2021)": 11.6,
        "% of non-white residents": 17.72,
        "Instances of hate crimes (per 100,000)": 2.76
      },
      {
        "State": "North Dakota",
        "Ranking": 21,
        "Mortality deaths/100,000 births": 21.2,
        "% living below poverty line (2021)": 10.9,
        "% of non-white residents": 37.69,
        "Instances of hate crimes (per 100,000)": 4.05
      },
      {
        "State": "Maryland",
        "Ranking": 22,
        "Mortality deaths/100,000 births": 22,
        "% living below poverty line (2021)": 10.3,
        "% of non-white residents": 38.75,
        "Instances of hate crimes (per 100,000)": 0.85
      },
      {
        "State": "West Virginia",
        "Ranking": 23,
        "Mortality deaths/100,000 births": 22.3,
        "% living below poverty line (2021)": 16.8,
        "% of non-white residents": 33.68,
        "Instances of hate crimes (per 100,000)": 1.07
      },
      {
        "State": "Alaska",
        "Ranking": 24,
        "Mortality deaths/100,000 births": 22.4,
        "% living below poverty line (2021)": 10.8,
        "% of non-white residents": 36.64,
        "Instances of hate crimes (per 100,000)": 2.62
      },
      {
        "State": "Nebraska",
        "Ranking": 25,
        "Mortality deaths/100,000 births": 22.4,
        "% living below poverty line (2021)": 10.5,
        "% of non-white residents": 18.71,
        "Instances of hate crimes (per 100,000)": 2.44
      },
      {
        "State": "Nevada",
        "Ranking": 26,
        "Mortality deaths/100,000 births": 22.4,
        "% living below poverty line (2021)": 14,
        "% of non-white residents": 12.2,
        "Instances of hate crimes (per 100,000)": 2.7
      },
      {
        "State": "Ohio",
        "Ranking": 27,
        "Mortality deaths/100,000 births": 23.7,
        "% living below poverty line (2021)": 13.3,
        "% of non-white residents": 32.42,
        "Instances of hate crimes (per 100,000)": 2.31
      },
      {
        "State": "Florida",
        "Ranking": 28,
        "Mortality deaths/100,000 births": 23.8,
        "% living below poverty line (2021)": 13.2,
        "% of non-white residents": 32.56,
        "Instances of hate crimes (per 100,000)": 0.65
      },
      {
        "State": "New Jersey",
        "Ranking": 29,
        "Mortality deaths/100,000 births": 24.1,
        "% living below poverty line (2021)": 10.2,
        "% of non-white residents": 37.92,
        "Instances of hate crimes (per 100,000)": 5.76
      },
      {
        "State": "Missouri",
        "Ranking": 30,
        "Mortality deaths/100,000 births": 25.2,
        "% living below poverty line (2021)": 12.8,
        "% of non-white residents": 18.36,
        "Instances of hate crimes (per 100,000)": 1.95
      },
      {
        "State": "North Carolina",
        "Ranking": 31,
        "Mortality deaths/100,000 births": 25.4,
        "% living below poverty line (2021)": 13.5,
        "% of non-white residents": 30,
        "Instances of hate crimes (per 100,000)": 1.16
      },
      {
        "State": "South Dakota",
        "Ranking": 32,
        "Mortality deaths/100,000 births": 25.9,
        "% living below poverty line (2021)": 11.9,
        "% of non-white residents": 21,
        "Instances of hate crimes (per 100,000)": 2.87
      },
      {
        "State": "Montana",
        "Ranking": 33,
        "Mortality deaths/100,000 births": 26.6,
        "% living below poverty line (2021)": 12,
        "% of non-white residents": 42,
        "Instances of hate crimes (per 100,000)": 2.33
      },
      {
        "State": "Virginia",
        "Ranking": 34,
        "Mortality deaths/100,000 births": 26.8,
        "% living below poverty line (2021)": 10.3,
        "% of non-white residents": 14.86,
        "Instances of hate crimes (per 100,000)": 1.78
      },
      {
        "State": "Texas",
        "Ranking": 35,
        "Mortality deaths/100,000 births": 27,
        "% living below poverty line (2021)": 14.2,
        "% of non-white residents": 16.39,
        "Instances of hate crimes (per 100,000)": 0.59
      },
      {
        "State": "Oklahoma",
        "Ranking": 36,
        "Mortality deaths/100,000 births": 29.8,
        "% living below poverty line (2021)": 15.4,
        "% of non-white residents": 14.32,
        "Instances of hate crimes (per 100,000)": 0.77
      },
      {
        "State": "Arizona",
        "Ranking": 37,
        "Mortality deaths/100,000 births": 30,
        "% living below poverty line (2021)": 12.9,
        "% of non-white residents": 26.3,
        "Instances of hate crimes (per 100,000)": 3.08
      },
      {
        "State": "Indiana",
        "Ranking": 38,
        "Mortality deaths/100,000 births": 30,
        "% living below poverty line (2021)": 12.1,
        "% of non-white residents": 11.59,
        "Instances of hate crimes (per 100,000)": 2.7
      },
      {
        "State": "South Carolina",
        "Ranking": 39,
        "Mortality deaths/100,000 births": 30.3,
        "% living below poverty line (2021)": 14.5,
        "% of non-white residents": 40.03,
        "Instances of hate crimes (per 100,000)": 2.89
      },
      {
        "State": "New Mexico",
        "Ranking": 40,
        "Mortality deaths/100,000 births": 31,
        "% living below poverty line (2021)": 17.7,
        "% of non-white residents": 8.02,
        "Instances of hate crimes (per 100,000)": 2.88
      },
      {
        "State": "Georgia",
        "Ranking": 41,
        "Mortality deaths/100,000 births": 33.4,
        "% living below poverty line (2021)": 14.2,
        "% of non-white residents": 58.93,
        "Instances of hate crimes (per 100,000)": 0.2
      },
      {
        "State": "Kentucky",
        "Ranking": 42,
        "Mortality deaths/100,000 births": 36.5,
        "% living below poverty line (2021)": 16.3,
        "% of non-white residents": 10.91,
        "Instances of hate crimes (per 100,000)": 4.33
      },
      {
        "State": "Mississippi",
        "Ranking": 43,
        "Mortality deaths/100,000 births": 38,
        "% living below poverty line (2021)": 19.2,
        "% of non-white residents": 22.44,
        "Instances of hate crimes (per 100,000)": 0.13
      },
      {
        "State": "Louisiana",
        "Ranking": 44,
        "Mortality deaths/100,000 births": 39.4,
        "% living below poverty line (2021)": 19.5,
        "% of non-white residents": 17.04,
        "Instances of hate crimes (per 100,000)": 0.2
      },
      {
        "State": "Tennessee",
        "Ranking": 45,
        "Mortality deaths/100,000 births": 40.2,
        "% living below poverty line (2021)": 13.7,
        "% of non-white residents": 33.49,
        "Instances of hate crimes (per 100,000)": 2.25
      },
      {
        "State": "Arkansas",
        "Ranking": 46,
        "Mortality deaths/100,000 births": 40.6,
        "% living below poverty line (2021)": 16,
        "% of non-white residents": 26.63,
        "Instances of hate crimes (per 100,000)": 0.39
      },
      {
        "State": "Alabama",
        "Ranking": 47,
        "Mortality deaths/100,000 births": 41.9,
        "% living below poverty line (2021)": 16.3,
        "% of non-white residents": 32.5,
        "Instances of hate crimes (per 100,000)": 3.63
      },
      {
        "State": "Maine",
        "Ranking": 48,
        "Mortality deaths/100,000 births": 52,
        "% living below poverty line (2021)": 11.2,
        "% of non-white residents": 13.75,
        "Instances of hate crimes (per 100,000)": 4.14
      },
      {
        "State": "Vermont",
        "Ranking": 49,
        "Mortality deaths/100,000 births": null,
        "% living below poverty line (2021)": 10.2,
        "% of non-white residents": 30.84,
        "Instances of hate crimes (per 100,000)": 1.13
      },
      {
        "State": "Wyoming",
        "Ranking": 50,
        "Mortality deaths/100,000 births": null,
        "% living below poverty line (2021)": 10.6,
        "% of non-white residents": 7.48,
        "Instances of hate crimes (per 100,000)": 0.36
      }
  ];
  let margin = { top: 30, right: 60, bottom: 60, left: 70 };
  let width = 800 - margin.left - margin.right;
  let height = 500 - margin.top - margin.bottom;

  const svg = d3.select('#scatterplot') // creating the og scatterplot yay
    .append('svg')
    .attr('id', 'vis-svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // crerating the axes
  let xScale = d3.scaleLinear().range([0, width]);
  let yScale = d3.scaleLinear().range([height, 0]);

  //continuing to create axes
  xScale.domain([d3.min(scatterplot_data, d => d["% of non-white residents"]), d3.max(scatterplot_data, d => d["% of non-white residents"])]);
  yScale.domain([d3.min(scatterplot_data, d => d["Mortality deaths/100,000 births"]), d3.max(scatterplot_data, d => d["Mortality deaths/100,000 births"])]);

  svg.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(xScale))
    .append('text')
    .attr('class', 'axis-label')
    .attr('x', width / 2)
    .attr('y', 40)
    .style('text-anchor', 'middle')
    .text('% of non-white residents');

  svg.append('g')
    .call(d3.axisLeft(yScale))
    .append('text')
    .attr('class', 'axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('y', -60)
    .attr('x', -height / 2)
    .style('text-anchor', 'middle')
    .text('Mortality deaths/100,000 births');

  let circles = svg.selectAll('circle')
  .data(scatterplot_data)
  .enter().append('circle')
  .attr('cx', d => xScale(d["% of non-white residents"]))
  .attr('cy', d => yScale(d["Mortality deaths/100,000 births"]))
  .attr('r', 8) // radius (should change depending on certain factors)
  .attr('class', 'scatter-circle');

  // Adding x-axis label
  svg.append('text')
  .attr('class', 'axis-label')
  .attr('x', width / 2)
  .attr('y', height + margin.top + 25) // Position the label below the x-axis
  .style('text-anchor', 'middle')
  .text('% of non-white residents');

  // Adding y-axis label
  svg.append('text')
    .attr('class', 'axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', -margin.left + 20) // Position the label to the left of the y-axis
    .style('text-anchor', 'middle')
    .text('Mortality deaths/100,000 births');

  //labels for each individual dot on the scatterplot
  svg.selectAll('.text-label')
    .data(scatterplot_data)
    .enter().append('text')
    .attr('class', 'text-label')
    .attr('x', d => xScale(d["% of non-white residents"]) + 10) 
    .attr('y', d => yScale(d["Mortality deaths/100,000 births"]) - 10) // Adjust the position to better fit the labels
    .text(d => `${d.State} - Mortality: ${d["Mortality deaths/100,000 births"]}`);

  function brush() {
    const brush = d3.brush()
      .on("start brush", highlight)
      .on("end", brushEnd)
      .extent([
        [-margin.left, -margin.bottom],
        [width + margin.right, height + margin.top]
      ]);
      
  svg.append('g')
    .call(brush);

  function highlight() {
    const [
      [x0, y0],
      [x1, y1]
    ] = d3.event.selection;
      
  circles.classed('selected', d =>
    x0 <= xScale(d["% of non-white residents"]) && xScale(d["% of non-white residents"]) <= x1 &&
    y0 <= yScale(d["Mortality deaths/100,000 births"]) && yScale(d["Mortality deaths/100,000 births"]) <= y1
  );
    
  // Toggle display of labels based on the brushed area
  svg.selectAll('.text-label')
    .style('display', d =>
      x0 <= xScale(d["% of non-white residents"]) && xScale(d["% of non-white residents"]) <= x1 &&
      y0 <= yScale(d["Mortality deaths/100,000 births"]) && yScale(d["Mortality deaths/100,000 births"]) <= y1
        ? 'block' // Show labels within the brushed area
        : 'none' // Hide labels outside the brushed area
    );
}
    
  function brushEnd() {
    if (d3.event.sourceEvent.type !== "end") {
      d3.select(this).call(brush.move, null);
    }
  }
}
    
  brush();
  // Adding mousedown event listener to document body
  document.body.addEventListener('mousedown', function (event) {
    const isClickedInsideCircle = event.target.closest('.scatter-circle');
    const isClickedInsideSelected = event.target.closest('.selected');

    if (!isClickedInsideCircle && !isClickedInsideSelected) {
      // Remove 'selected' class and reset circle colors
      circles.classed('selected', false).attr('fill', ''); // Remove 'selected' class and reset fill color
    }
  });
})();
