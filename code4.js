function runManually() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var list = ss.getSheetByName('List');
  var ontology = ss.getSheetByName('Ontology');
  var healthTransactions = ss.getSheetByName('Health Transactions');
  
  // Get all the data from the List sheet
  var listData = list.getDataRange().getValues();
  
  // Define the starting row (row 2) and column (column F)
  var startRow = 2;
  var startColumn = 6; // Column F
  
  // Loop through the data starting from row 5 to find checkboxes that are checked
  for (var i = 4; i < listData.length; i++) {
    if (listData[i][0] === true) {
      var keywordD = listData[i][3]; // Get data from column D in 'List'
      var data = ontology.getDataRange().getValues();
      
      // Filter data from 'Ontology' based on data from column B
      var filteredData = data.filter(function(row) {
        return row[1] == keywordD; // Assuming column B is the second column (index 1)
      });
      
      // Append the filtered data to the 'Health Transactions' sheet starting from column F, row 2
      healthTransactions.getRange(startRow, startColumn, filteredData.length, filteredData[0].length).setValues(filteredData);
      
      // Update the starting row for the next keyword
      startRow += filteredData.length;
    }
  }
}
