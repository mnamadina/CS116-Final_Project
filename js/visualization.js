import { barchart } from './barchart2.js';
import { scatterplot } from './scatterplot.js';

console.log("visualization.js is up!");

(() => {
    barchart();
    scatterplot();

    document.addEventListener('selectedStateNamesUpdated', (event) => {
        const selectedStateNames = event.detail;
        console.log("Selected State Names from Another File: ", selectedStateNames);

        // Call your highlighting functions
        highlightBarchart(selectedStateNames);
        highlightScatterplot(selectedStateNames);
    });

    // Function to handle highlighting in the bar chart from the scatter plot
    function highlightBarchart(selectedStates) {
        d3.selectAll('.bar')
            .classed('selected', d => selectedStates.includes(d.State))
            .attr('fill', d => (selectedStates.includes(d.State) ? 'red' : 'steelblue'));
    }

    // Function to handle highlighting in the scatter plot from the bar chart
    function highlightScatterplot(selectedStates) {
        d3.selectAll('.scatter-circle')
            .classed('selected', d => selectedStates.includes(d.State))
            .attr('fill', d => (selectedStates.includes(d.State) ? 'red' : ''));
    }

    // Add other functions as needed
})();
