function copyDataToHealthTransactions() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var listSheet = ss.getSheetByName('List');
  var ontologySheet = ss.getSheetByName('Ontology');
  var healthTransactionsSheet = ss.getSheetByName('Health Transactions');

  // Get all the data from the List sheet
  var listData = listSheet.getDataRange().getValues();

  // Get the last row in the Health Transactions sheet
  var lastRow = healthTransactionsSheet.getLastRow() + 1;

  for (var i = 3; i < listData.length; i++) {
    if (listData[i][0] === true) { // Check if there's a checkmark in column A
      var keyword = listData[i][3]; // Assuming column D in List contains the keyword to match
      var quantity = listData[i][2]; // Assuming column C in List contains the quantity

      // Debugging: Log the keyword and quantity to check their values
      Logger.log("Keyword: " + keyword);
      Logger.log("Quantity: " + quantity);

      // Find matching rows in Ontology based on column B
      var ontologyData = ontologySheet.getDataRange().getValues();
      var matchingRows = ontologyData.filter(function(row) {
        return row[1] == keyword; // Assuming column B in Ontology contains the keyword
      });

      // Debugging: Log the number of matching rows
      Logger.log("Matching Rows: " + matchingRows.length);

      if (matchingRows.length > 0) {
        // Process each matching row
        for (var j = 0; j < matchingRows.length; j++) {
          // Get the current date
          var currentDate = new Date();

          // Debugging: Log the current date
          Logger.log("Current Date: " + currentDate);

          // If there is a quantity, repeat the data as specified
          var numCols = matchingRows[j].length;
          var numRows = 1;

          if (quantity && quantity > 1) {
            numRows = quantity;
          }

          // Debugging: Log the number of rows and columns
          Logger.log("Num Rows: " + numRows);
          Logger.log("Num Cols: " + numCols);

          for (var k = 0; k < numRows; k++) {
            // Debugging: Log a message for each iteration
            Logger.log("Processing Row: " + (lastRow + 1));

            // Append the date and data
            healthTransactionsSheet.getRange(lastRow, 1, 1, 1).setValue(currentDate);
            healthTransactionsSheet.getRange(lastRow, 2, 1, numCols).setValues([matchingRows[j]]);
            lastRow++;
          }
        }
      }
    }
  }
}


