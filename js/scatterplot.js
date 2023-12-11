// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
// console.log("visualization.js is up!");
(() => {
  var scatterplot_data = d3.json("../data/scatterplotData.js");
      
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
