// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
// console.log("visualization.js is up!");
(() => {

  var barchart_data = [
    {"State": "Alabama", "Insured": 90.1},
    {"State": "Alaska", "Insured": 88.6},
    {"State": "Arizona", "Insured": 89.3},
    {"State": "Arkansas", "Insured": 90.8},
    {"State": "California", "Insured": 93},
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
  ];

  var margin = { top: 30, right: 30, bottom: 70, left: 60 };
  var width = 800 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;

  var svg = d3.select('#barchart') // Assuming 'barchart' is the container ID
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  var xScale = d3.scaleBand().range([0, width]).padding(0.1);
  var yScale = d3.scaleLinear().range([height, 0]);

  // Domain for xScale (states)
  xScale.domain(barchart_data.map(d => d.State));

  // Domain for yScale (values)
  yScale.domain([0, d3.max(barchart_data, d => d.Insured)]);

  // Append bars to the SVG
  var bar = svg.selectAll('bar')
    .data(barchart_data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d.State))
    .attr('width', xScale.bandwidth())
    .attr('y', d => yScale(d.Insured))
    .attr('height', d => height - yScale(d.Insured))
    .attr('fill', 'steelblue'); // Bar color, you can change this as needed

  // Append x-axis
  svg.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(xScale))
    .selectAll('text')
    .attr('dy', '.35em')
    .attr('transform', 'rotate(45)')
    .style('text-anchor', 'start');

  // Append y-axis
  svg.append('g')
    .call(d3.axisLeft(yScale));

  // Append y-axis label
  svg.append('text')
    .attr('class', 'axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', -margin.left + 20) // Position the label to the left of the y-axis
    .style('text-anchor', 'middle')
    .text('Insured Percentage'); // Change this to your y-axis label text

  // IMPLEMENTING THE HIGHLIGHTING 
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

      bar.classed('selected', d =>
        x0 <= xScale(d.State) && xScale(d.State) <= x1 &&
        y0 <= yScale(d.Insured) && yScale(d.Insured) <= y1
      );

      bar.attr('fill', function () {
        return d3.select(this).classed('selected') ? 'red' : ''; // Apply red fill to selected bars
      });
    }

    function brushEnd() {
      // We don't want infinite recursion
      if (d3.event.sourceEvent.type != "end") {
        d3.select(this).call(brush.move, null);
      }
    }
  }

  brush();

  // Adding mousedown event listener to document body
  document.body.addEventListener('mousedown', function (event) {
    const isClickedInsideCircle = event.target.closest('.bar');
    const isClickedInsideSelected = event.target.closest('.selected');

    if (!isClickedInsideCircle && !isClickedInsideSelected) {
      // Remove 'selected' class and reset circle colors
      bar.classed('selected', false).attr('fill', ''); // Remove 'selected' class and reset fill color
    }
  });

})();
