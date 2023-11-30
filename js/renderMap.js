(async () => {
  console.log("working");
  
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
    // const svg = d3.select('#map')
    //       .attr('width', width)
    //       .attr('height', height);

    // Create an instance of geoPath.
    const path = d3.geoPath();

    // Use the path to plot the US map based on the geometry data.
    svg.append('g')
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('d', path);
  })();