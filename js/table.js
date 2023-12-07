// table.js

// Function to create an empty table structure with headers
function createEmptyTable() {
  // Append a table to the body of the HTML document
  const table = d3.select("#table")
    .append("table")
    .attr("class", "table");

  const stateList = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
    "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  // Append the header row
  table.append("thead")
    .append("tr")
    .selectAll("th")
    .data(["State", "Total Healthcare Expenditure", "Spending on Medicaid", "Health Insurance Coverage Percentage", "Maternity Deaths"])
    .enter().append("th")
    .text(d => d);

  // Append the data rows
  table.selectAll("tr.data-row")
    .data(stateList)
    .enter().append("tr")
    .attr("class", "data-row")
    .selectAll("td")
    .data(d => [d, "", "", "", ""]) // Add empty strings for other columns
    .enter().append("td")
    .text(d => d);

  // Append an empty tbody
  table.append("tbody");

  return table;
}

// Call the function to create an empty table initially
createEmptyTable();
