// table.js

// Function to create an empty table structure with headers
function createEmptyTable() {
  // Append a table to the body of the HTML document
  const table = d3.select("#table")
    .append("table")
    .attr("class", "table");

  // Append the header row
  table.append("thead")
    .append("tr")
    .selectAll("th")
    .data(["State", "Total Healthcare Expenditure", "Spending on Medicaid", "Health Insurance Coverage Percentage", "Maternity Deaths"])
    .enter().append("th")
    .text(d => d);

  // Append an empty tbody
  table.append("tbody");

  return table;
}

// Call the function to create an empty table initially
createEmptyTable();
