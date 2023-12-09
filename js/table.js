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

  const maternityDeaths = [41.9, 22.4, 30, 40.6, 9.5, 15.9, 16.7, 18.9, 23.8, 33.4, 
                          16.9, 18.2, 16.9, 30, 18.7, 20.9, 36.5, 39.4, 52, 22,
                          14.2, 18.4, 12.4, 38, 25.2, 26.6, 22.4, 22.4, 16.7, 24.1,
                          31, 19.8, 25.4, 21.2, 23.7, 29.8, 16.8, 15.6, 11.2, 30.3,
                          25.9, 40.2, 27, 14.9, null, 26.8, 20.4, 22.3, 10.8, null
  ];

  const insuredPercentage = [90.1, 88.6, 89.3, 90.8, 93, 92, 94.8, 94.3, 96.3,87.9,
    87.4, 96.1, 91.2, 93, 92.5, 95.2, 90.8, 94.3, 92.4, 94.3, 93.9, 97.5, 95,
    95.5, 88.1, 90.6, 91.8, 92.9, 88.4, 94.9, 92.8, 90, 94.8, 89.6, 92.1, 93.5,
    86.2, 93.9, 94.5, 95.7, 90, 90.5, 90, 82, 91, 96.3, 93.2, 93.6, 93.9, 94.6, 87.8
  ];

  // Append the header row
  table.append("thead")
    .append("tr")
    .selectAll("th")
    .data(["State", "Total Healthcare Expenditure", "Health Insurance Coverage Percentage", "Maternity Deaths"])
    .enter().append("th")
    .text(d => d);

  // Append the data rows
  const rows = table.selectAll("tr.data-row")
    .data(stateList)
    .enter().append("tr")
    .attr("class", "data-row");

  // Append cells for each column
  rows.append("td").text(d => d); // State column
  rows.append("td").text(""); // Total Healthcare Expenditure column
  rows.append("td").text((d, i) => (insuredPercentage[i] !== null) ? insuredPercentage[i].toFixed(1) : "N/A"); // Health Insurance Covered Percentage column
  rows.append("td").text((d, i) => (maternityDeaths[i] !== null) ? maternityDeaths[i].toFixed(1) : "N/A"); // Maternity Deaths column

  // Append an empty tbody
  table.append("tbody");

  return table;
}

// Call the function to create an empty table initially
createEmptyTable();

