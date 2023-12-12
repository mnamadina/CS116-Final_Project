import { barchart } from './barchart2.js';
import { scatterplot } from './scatterplot.js';
import { createEmptyTable } from "./table.js";
import { renderMap } from './renderMap.js';

console.log("visualization.js is up!");

(() => {
    barchart();
    scatterplot();
    createEmptyTable()
    renderMap();

    document.addEventListener('selectedStateNamesUpdated', (event) => {
        const selectedStateNames = event.detail;
        console.log("Selected State Names from Another File: ", selectedStateNames);

        // Call your highlighting functions
        highlightBarchart(selectedStateNames);
        highlightScatterplot(selectedStateNames);
        highlightMap(selectedStateNames);
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

   // Function to handle highlighting in the US Map from the bar chart and scatter plot
    function highlightMap(selectedStates) {
        d3.selectAll('.state')
            .classed('highlighted', d => selectedStates.includes(d.properties.name))
            .attr('fill', d => (selectedStates.includes(d.properties.name) ? 'red' : 'cornflowerblue'));
    }

})();