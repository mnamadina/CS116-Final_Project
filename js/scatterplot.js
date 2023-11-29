<html>
<head>
  <meta charset="utf-8"></meta>
    <script src="https://d3js.org/d3.v6.min.js"></script>
  </head>
  <body>
    <script>
      var width=600, height=500;
      var data = [{"temperature":14.2, "sales":208},
                  {"temperature":16.4, "sales":310},
                  {"temperature":15.2, "sales":322},
                  {"temperature":21.1, "sales":510}];
      var svg = d3.select("body").append("svg")
                  .attr("width",width).attr("height", height)
                  .style("background","pink")
                  .append("g")
                  .attr("transform","translate(" + spacing/2 + "," + spacing/2 ")");
      var xScale = d3.scaleLinear()
                      .domain([d3.min(data,function(d){return 
                      d.temperature;}), d3.max(data,
                      function(d){rerturn d.temperature;})])
                      .range([0,width-spacing]);
      var yScale = d3.scaleLinear()
                      .domain([0, d3.max(data, function(d)
                      {return d.sales;})])
                      .range([height-spacing,0]);
      var xAxis = d3.axisBottom(xScale);
      var yAxis = d3.axisLeft(yScale);
      svg.append("g").attr("transform","translate(0" + (height
      - spacing) + ")").call(xAxis);
      svg.append("g").call(yAxis)
  
    </script>
</body>
</html>