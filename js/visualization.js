import { returnStateNames } from './barchart2.js'; 
    
console.log("visualizaion.js is up!");

// Call the function to get the selected state names
const selectedStates = returnStateNames();
console.log("Selected State Names from Another File: ", selectedStates);

(() => {
    // Include the code from barchart2.js
    // ...
  
    // Include the code from scatterplot.js
    // ...
  
    // Function to handle highlighting in the bar chart from the scatter plot
    function highlightBarchart(selectedStates) {
      // Implement the logic to highlight corresponding bars in the bar chart based on selected states in the scatter plot
      // Use the selectedStates array to identify which bars to highlight
      // You may need to modify this based on your data structure and logic
      d3.selectAll('.bar')
        .classed('selected', d => selectedStates.includes(d.State))
        .attr('fill', d => (selectedStates.includes(d.State) ? 'red' : 'steelblue'));
    }
  
    // Function to handle highlighting in the scatter plot from the bar chart
    function highlightScatterplot(selectedStates) {
      // Implement the logic to highlight corresponding circles in the scatter plot based on selected states in the bar chart
      // Use the selectedStates array to identify which circles to highlight
      // You may need to modify this based on your data structure and logic
      d3.selectAll('.scatter-circle')
        .classed('selected', d => selectedStates.includes(d.State))
        .attr('fill', d => (selectedStates.includes(d.State) ? 'red' : ''));
    }
  
    // Function to handle brushing in the bar chart
    function brushBarchart(selectedStates) {
      // Implement the logic to brush the corresponding bars in the bar chart based on selected circles in the scatter plot
      // Use the selectedStates array to identify which bars to brush
      // You may need to modify this based on your data structure and logic
      d3.selectAll('.bar')
        .classed('selected', d => selectedStates.includes(d.State))
        .attr('fill', d => (selectedStates.includes(d.State) ? 'red' : 'steelblue'));
    }
  
    // Function to handle brushing in the scatter plot
    function brushScatterplot(selectedStates) {
      // Implement the logic to brush the corresponding circles in the scatter plot based on selected bars in the bar chart
      // Use the selectedStates array to identify which circles to brush
      // You may need to modify this based on your data structure and logic
      d3.selectAll('.scatter-circle')
        .classed('selected', d => selectedStates.includes(d.State))
        .attr('fill', d => (selectedStates.includes(d.State) ? 'red' : ''));
    }
  
    // You may need to call these functions based on the interactions in your visualizations
    // For example, when a user clicks on a bar in the bar chart, you can call highlightScatterplot(selectedStates)
    // and when a user clicks on a circle in the scatter plot, you can call highlightBarchart(selectedStates)
  })();
  