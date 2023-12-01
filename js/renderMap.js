(async () => {
  // Step 2. Load the US map data.
  const us = await d3.json('https://d3js.org/us-10m.v2.json');
  const data = topojson.feature(us, us.objects.states).features;

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
      d3.select(this)
          .transition()
          .duration(200)
          .style('fill', 'bisque'); // Change the color on mouseover
  }

  // Function to handle mouseleave event
  function handleMouseLeave(d) {
      d3.select(this)
          .transition()
          .duration(200)
          .style('fill', 'cornflowerblue'); // Change back to original color on mouseleave
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