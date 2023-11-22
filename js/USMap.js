var svgStates = d3.select("svg #states"),
    svgBoundary = d3.select("svg #boundary"),
    states = {},
    startYear = 1790,
    currentYear = startYear;

var width = window.innerWidth, // (1)
  height = window.innerHeight;
var projection = d3.geoAlbersUsa()
  .translate([width / 2, height / 2]);  // (2)

var path = d3.geoPath()
    .projection(projection);  // (3)


d3.json("data/usa.json", function(error, boundary) {
    svgBoundary.selectAll("path")
    .data(boundary.features)
    .enter()
    .append("path")
    .attr("d", path)
});

d3.json("data/states.json", function(error, topologies) {  // (4)

  var state = topojson.feature(topologies[0], topologies[0].objects.stdin);  // (5)

  svgStates.selectAll("path")  // (6)
      .data(state.features)
      .enter()
    .append("path")
      .attr("d", path)
      .style("fill", function(d, i) { 
        console.log("d is ", d)
        var name = d.properties.STATENAM.replace(" Territory", ""); 
        return colors[name];
      });
}