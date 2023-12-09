(async () => {
  // Step 2. Load the US map data.
  const us = await d3.json('https://d3js.org/us-10m.v2.json');
  const data = topojson.feature(us, us.objects.states).features;

  // Load the expenditure data from CSV
  const expenditureData = await d3.csv("../data/final_expenditure.csv");

  // Step 3. Draw the SVG.
  // First let's create an empty SVG with 960px width and 600px height.
  const width = 960;
  const height = 600;
  const svg = d3.select('body')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

  // Create an instance of geoPath.
  const path = d3.geoPath();

  // Function to handle mouseover event
  function handleMouseOver(d) {
    const currState = d3.select(this);
    currState.transition()
        .duration(200)
        .style('fill', 'bisque'); // Change the color on mouseover
    
    // find the corresponding data in the expenditureData
    const expenditure = expenditureData.find(entry => entry.State === d.properties.name);

    // Display state name and expenditure
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height / 2)
        .attr('text-anchor', 'middle')
        .attr('font-size', '16px')
        .attr('fill', 'aquamarine')
        .text(`${d.properties.name}: $${expenditure.Expenditure}`);

  }

  // Function to handle mouseleave event
  function handleMouseLeave(d) {

    const currState = d3.select(this);
    currState.transition()
        .duration(200)
        .style('fill', 'cornflowerblue'); // Change back to original color on mouseleave
    
    // Remove the displayed state name and expenditure
    svg.selectAll('text').remove();
  }

  // Function to handle click event
  function handleMouseClick(d) {

      // Toggle the highlighted state on click
      const currentState = d3.select(this);
      const isHighlighted = currentState.classed('highlighted');

      currentState.classed('highlighted', !isHighlighted);

      // Change the color based on whether the state is highlighted
      currentState.transition()
          .duration(200)
          .style('fill', isHighlighted ? 'cornflowerblue' : 'lightpink');
  }

  // Use the path to plot the US map based on the geometry data.
  svg.append('g')
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('class', 'state')
      .attr('d', path)
      .style('fill', 'cornflowerblue')
      .on('mouseover', handleMouseOver)
      .on('mouseleave', handleMouseLeave)
      .on('click', handleMouseClick);
})();