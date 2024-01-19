function runManually() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var list = ss.getSheetByName('List');
  var ontology = ss.getSheetByName('Ontology');
  var healthTransactions = ss.getSheetByName('Health Transactions');
  
  // Get all the data from the List sheet
  var listData = list.getDataRange().getValues();
  
  // Define the starting row (row 2)
  var startRow = 2;
  
  // Loop through the data starting from row 5 to find checkboxes that are checked
  for (var i = 4; i < listData.length; i++) {
    if (listData[i][0] === true) {
      var keywordD = listData[i][3]; // Get data from column D in 'List'
      var data = ontology.getDataRange().getValues();
      
      // Filter data from 'Ontology' based on data from column B
      var filteredData = data.filter(function(row) {
        return row[1] == keywordD; // Assuming column B is the second column (index 1)
      });
      
      // Get the current date and time
      var timestamp = new Date();
      
      // Create an array for the date timestamp and all columns from 'Ontology' (A to Q)
      var appendedData = filteredData.map(function(row) {
        var ontologyColumns = row.slice(0, 17); // Columns A to Q
        return [timestamp].concat(new Array(2).fill(""), ...ontologyColumns);
      });
      healthTransactions.getRange(startRow, 3, appendedData.length, appendedData[0].length).setValues(appendedData);
      
      // Update the starting row for the next keyword
      startRow += appendedData.length;
    }
  }
}
