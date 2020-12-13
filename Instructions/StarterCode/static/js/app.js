// from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

// Loop through `data` and console.log each ufo object
// Use d3 to append one table row `tr` for each ufo report object
// Use `Object.entries` to console.log each ufo report value
// Use d3 to append 1 cell per ufo report value (datetime, city, state, country, shape, durationMinutes, comments)
// Use d3 to update each cell's text with ufo report values

tableData.forEach((uforeport) => {
    var row = tbody.append("tr");
    Object.entries(uforeport).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
});

// Now filter the data accordingly user input and show the filtered data only
//__________________________________________________________________________________


// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#form");

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);

// Complete the event handler function for the form
function runEnter() {
  
  // Prevent the page from refreshing
  d3.event.preventDefault();
  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");
  // Get the value property of the input element
  var inputValue = inputElement.property("value");
  // Filter the ufo data by the date input by the user
  var filteredData = tableData.filter(tableData => tableData.datetime === inputValue);
  
  
  // Need to clear the current table while preserving the headers
  tableData.forEach((uforeport) => {
    var row = tbody.remove("tr");
  });
  // Add tbody back in so that a new table can be constructed for filter data
  var table = d3.select("#ufo-table")
  table.append("tbody")
  tbody = d3.select("tbody")

  
  // If there is a valid input, then add the filtered data back into the table
  if (inputValue != "") {
    // Display the filtered data
    filteredData.forEach((uforeport) => {
      var row = tbody.append("tr");
      Object.entries(uforeport).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
      });
    });
  }
  // If there is no input (user clicked "Filter Table" without a value) then show original dataset
  else {
    tableData.forEach((uforeport) => {
      var row = tbody.append("tr");
      Object.entries(uforeport).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
      });
  });
  }
  
};
