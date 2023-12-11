// table.js

const stateList = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const finalExpenditures = [
  18561,27284, 17511, 18675, 20598, 17166, 24978, 25798, 28763, 19732, 17517, 20582, 16297,
  20381, 21032, 19577, 18817, 20514, 21031, 24154, 21680, 26638, 19793,21693, 18788, 19841,
  20424, 21028, 16696, 23587, 23734, 17804, 28014, 17835, 22604, 20957, 18889, 20141, 23207,
  23387, 17532, 24990, 18672, 16812, 15044, 25510, 18390, 18530, 25536, 19963, 21978,
];

const insuredPercentage = [90.1, 88.6, 89.3, 90.8, 93, 92, 94.8, 94.3, 96.3,87.9,
  87.4, 96.1, 91.2, 93, 92.5, 95.2, 90.8, 94.3, 92.4, 94.3, 93.9, 97.5, 95,
  95.5, 88.1, 90.6, 91.8, 92.9, 88.4, 94.9, 92.8, 90, 94.8, 89.6, 92.1, 93.5,
  86.2, 93.9, 94.5, 95.7, 90, 90.5, 90, 82, 91, 96.3, 93.2, 93.6, 93.9, 94.6, 87.8
];

const maternityDeaths = [41.9, 22.4, 30, 40.6, 9.5, 15.9, 16.7, 18.9, 23.8, 33.4, 
  16.9, 18.2, 16.9, 30, 18.7, 20.9, 36.5, 39.4, 52, 22,
  14.2, 18.4, 12.4, 38, 25.2, 26.6, 22.4, 22.4, 16.7, 24.1,
  31, 19.8, 25.4, 21.2, 23.7, 29.8, 16.8, 15.6, 11.2, 30.3,
  25.9, 40.2, 27, 14.9, null, 26.8, 20.4, 22.3, 10.8, null
];
let rowIndex = 0; // Counter to track the current row index

function createEmptyTable() {
  // Append a table to the body of the HTML document
  const table = d3.select("#table")
    .append("table")
    .attr("class", "table");

  // Append the header row
  table.append("thead")
    .append("tr")
    .selectAll("th")
    .data(["State", "Total Healthcare Expenditure", "Health Insurance Coverage Percentage", "Maternity Deaths"])
    .enter().append("th")
    .text(d => d);

  // Append a separate thead for the state selection
  const selectionHead = table.append("thead");
  const selectionRow = selectionHead.append("tr").attr("class", "selection-row");
  const stateSelect = selectionRow.append("td")
    .append("select")
    .attr("class", "state-select")
    .on("change", function () {
      const selectedState = d3.select(this).property("value");
      updateTable(table, selectedState);
    });

  stateSelect.selectAll("option")
    .data(stateList)
    .enter().append("option")
    .text(d => d);

  // Append an empty tbody
  table.append("tbody");

  // Append a "Clear" button
  d3.select("#table")
    .append("button")
    .attr("class", "clear-button")
    .text("Clear")
    .on("click", function () {
      clearTable(table);
    });

  return table;
}

function updateTable(table, selectedState) {
  // Fetch data for the selected state
  const stateIndex = stateList.indexOf(selectedState);
  console.log("Selected State Index:", stateIndex);

  if (stateIndex !== -1) {
    const totalExpenditure = finalExpenditures[stateIndex].toLocaleString("en-US", { style: "currency", currency: "USD" });
    const insurancePercentage = (insuredPercentage[stateIndex] !== null) ? insuredPercentage[stateIndex].toFixed(1) : "N/A";
    const maternityDeath = (maternityDeaths[stateIndex] !== null) ? maternityDeaths[stateIndex].toFixed(1) : "N/A";

    console.log("Total Expenditure:", totalExpenditure);
    console.log("Insurance Percentage:", insurancePercentage);
    console.log("Maternity Death:", maternityDeath);

    // Append a new row for the selected state and its data
    const newRow = table.select("tbody").append("tr").attr("class", "data-row");
    newRow.append("td").text(selectedState);
    newRow.append("td").text(totalExpenditure);
    newRow.append("td").text(insurancePercentage);
    newRow.append("td").text(maternityDeath);

    // Increment the rowIndex for the next row
    rowIndex++;

    // Add another selection row for additional selections
    updateSelectionRow(table, selectedState);
  } else {
    console.error("Selected state not found in the data.");
  }
}

function updateSelectionRow(table, selectedState) {
  // Remove existing selection row
  table.select(".selection-row").remove();

  // Add a new selection row
  const selectionHead = table.select("thead");
  const selectionRow = selectionHead.append("tr").attr("class", "selection-row");
  const stateSelect = selectionRow.append("td")
    .append("select")
    .attr("class", "state-select")
    .on("change", function () {
      const selectedState = d3.select(this).property("value");
      updateTable(table, selectedState);
    });

  stateSelect.selectAll("option")
    .data(stateList)
    .enter().append("option")
    .text(d => d)
    .property("selected", d => d === selectedState); // Set the selected state
}

function clearTable(table) {
  // Clear the tbody
  table.select("tbody").selectAll(".data-row").remove();

  // Reset the rowIndex
  rowIndex = 0;

  // Remove existing selection row
  table.select(".selection-row").remove();

  // Add a new selection row
  updateSelectionRow(table, stateList[0]); // Initialize with the first state in the list
}

// Call the function to create an empty table initially
const table = createEmptyTable();
