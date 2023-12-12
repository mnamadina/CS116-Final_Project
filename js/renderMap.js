export async function renderMap() {
    // Step 2. Load the US map data.
    const us = await d3.json('https://d3js.org/us-10m.v2.json');
    const data = topojson.feature(us, us.objects.states).features;
  
    // Load the expenditure data from CSV
    const expenditureData = await d3.csv("../data/final_expenditure.csv");
  
    const mapHolder = d3.select('.map-holder');
    // Step 3. Draw the SVG.
    // First let's create an empty SVG with 960px width and 600px height.
    const width = 960;
    const height = 600;
    const svg = mapHolder
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
          .style('fill', 'red'); // Change the color on mouseover
      
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
  
      console.log("Highlighted States: ", d.properties.name);
      // const highlightedStateNames = d3.selectAll('.highlighted').data().map(d => d.properties.name);
      document.dispatchEvent(new CustomEvent('selectedStateNamesUpdated', { detail: d.properties.name }));
  
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
          .style('fill', isHighlighted ? 'cornflowerblue' : 'red');
      
          // Get the highlighted state names
          const highlightedStateNames = d3.selectAll('.highlighted').data().map(d => d.properties.name);
      
          // Log the highlighted state names
          console.log("Highlighted State Names: ", highlightedStateNames);
          document.dispatchEvent(new CustomEvent('selectedStateNamesUpdated', { detail: highlightedStateNames }));
      }
       // Add a brush to enable multiple state selection
    const brush = d3.brush().on('start brush end', handleBrush);
  
    svg.append('g').attr('class', 'brush').call(brush);
  
    // Function to handle brushing
    function handleBrush() {
      const selection = d3.event.selection;
  
      // Reset fill color for all states
      d3.selectAll('.state').style('fill', 'cornflowerblue');
  
      // Remove the displayed state name and expenditure
      svg.selectAll('text').remove();
  
      // If there's a selection, highlight the brushed states
      if (selection) {
        const brushedStates = data.filter(d => {
          const [x0, y0] = path.bounds(d)[0];
          const [x1, y1] = path.bounds(d)[1];
          return x0 >= selection[0][0] && x1 <= selection[1][0] && y0 >= selection[0][1] && y1 <= selection[1][1];
        });
  
        // Display state name and expenditure for the first brushed state
        if (brushedStates.length > 0) {
          const firstBrushedState = brushedStates[0];
          const expenditure = expenditureData.find(entry => entry.State === firstBrushedState.properties.name);
  
          // Display state name and expenditure
          svg.append('text')
            .attr('x', width / 2)
            .attr('y', height / 2)
            .attr('text-anchor', 'middle')
            .attr('font-size', '16px')
            .attr('fill', 'aquamarine')
            .text(`${firstBrushedState.properties.name}: $${expenditure.Expenditure}`);
        }
  
        // Highlight the brushed states
        d3.selectAll('.state')
          .filter(d => brushedStates.includes(d))
          .style('fill', 'red');
  
        // Get the names of highlighted states
        const highlightedStateNames = brushedStates.map(d => d.properties.name);
  
        // Log the highlighted state names
        console.log('Highlighted State Names:', highlightedStateNames);
        document.dispatchEvent(new CustomEvent('selectedStateNamesUpdated', { detail: highlightedStateNames }));
      }
    }
    // Use the path to plot the US map based on the geometry data.
    svg.append('g')
        .selectAll('path')
        .data(data)
        .enter()
        .append('path')
        .attr('class', 'state')
        .attr('d', path)
        .style('fill', 'cornflowerblue');
  //       .on('mouseover', handleMouseOver)
  //       .on('mouseleave', handleMouseLeave)
  //       .on('click', handleMouseClick);
  }
  
  