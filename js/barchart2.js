// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
// console.log("visualization.js is up!");
(() => {
  var barchart_data = d3.json("../data/insurancd2.json");
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
  var bars = svg.selectAll('bar')
    .data(barchart_data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d.State))
    .attr('width', xScale.bandwidth())
    .attr('y', d => yScale(d.Insured))
    .attr('height', d => height - yScale(d.Insured))
    .attr('fill', 'steelblue') // Bar color, you can change this as needed
    .on('click', handleBarClick); // Add click event listener to each bar

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

  // Add brush for multi-selection
  var brush = d3.brushX()
    .extent([[0, 0], [width, height]])
    .on("brush end", brushed);

  svg.append("g")
    .attr("class", "brush")
    .call(brush);

  function handleBarClick(d) {
    // Toggle the 'selected' class for the clicked bar
    d3.select(this).classed('selected', !d3.select(this).classed('selected'));

    // Set the fill color based on the 'selected' class
    bars.attr('fill', function (barData) {
      return barData === d && d3.select(this).classed('selected') ? 'red' : 'steelblue';
    });
  }

  function brushed() {
    var selection = d3.event.selection;
    bars.classed('selected', function (d) {
      var barX = xScale(d.State);
      return selection && barX >= selection[0] && barX + xScale.bandwidth() <= selection[1];
    });

    // Set the fill color based on the 'selected' class
    bars.attr('fill', function (barData) {
      return d3.select(this).classed('selected') ? 'red' : 'steelblue';
    });
  }

})();
