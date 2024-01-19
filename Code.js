function runManually() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var list = ss.getSheetByName('List');
  var ontology = ss.getSheetByName('Ontology');
  var healthTransactions = ss.getSheetByName('Health Transactions');

  // Get all the data from the List sheet
  var listData = list.getDataRange().getValues();

  // Initialize an array to store the keywords
  var keywords = [];

  // Define the starting row (row "F" = 6)
  var startRow = 6;

  // Loop through the data starting from row 5 to find checkboxes that are checked
  for (var i = 4; i < listData.length; i++) {
    if (listData[i][0] === true) {
      keywords.push(listData[i][1]);
    }
  }

  if (keywords.length > 0) {
    // Process each keyword and filter the data
    keywords.forEach(function(keyword) {
      var data = ontology.getDataRange().getValues();
      var filteredData = data.filter(function(row) {
        return row[4] == keyword;
      });

      // Get the current date
      var currentDate = new Date();

      // Append the date to column A
      healthTransactions.getRange(startRow, 1, 1, 1).setValue(currentDate);

      // Append the filtered data to column B
      var numCols = filteredData[0].length;
      var numRows = filteredData.length;
      healthTransactions.getRange(startRow, 1, numRows, numCols).setValues(filteredData);

      // Update the starting row for the next keyword
      startRow += numRows + 2; // +2 to leave two empty rows between results
    });
  }
}


function removeEmptyRows1(){
  var sh = SpreadsheetApp.getActive();
  var s = sh.getSheetByName("Keys");

  var maxRows = s.getMaxRows();
  var lastRow = s.getLastRow();

  s.deleteRows(lastRow+1, maxRows-lastRow);

}

function removeRowsWithNullValue() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Keys'); // Replace 'Sheet1' with the name of your sheet.
  var data = sheet.getDataRange().getValues();
  var columnToCheck = 2; // Change this to the column number you want to check (e.g., column B is 2).

  for (var i = data.length - 1; i >= 0; i--) {
    if (data[i][columnToCheck - 1] === null || data[i][columnToCheck - 1] === '') {
      // If the value in the specified column is null or empty, remove the row.
      sheet.deleteRow(i + 1); // Adjust the row index (i + 1) because Google Sheets is 1-based.
    }
  }
}

function duplicateHighlightedRow() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var selectedRange = sheet.getActiveRange();
  
  if (selectedRange.getNumRows() === 1) {
    var ui = SpreadsheetApp.getUi();
    var response = ui.prompt("Duplicate Row", "Enter the number of times to duplicate the selected row:", ui.ButtonSet.OK_CANCEL);
    
    if (response.getSelectedButton() === ui.Button.OK) {
      var numRowsToDuplicate = parseInt(response.getResponseText(), 10);
      
      if (!isNaN(numRowsToDuplicate) && numRowsToDuplicate > 0) {
        var rowData = selectedRange.getValues()[0];
        
        for (var i = 0; i < numRowsToDuplicate; i++) {
          sheet.insertRowAfter(selectedRange.getRowIndex());
          sheet.getRange(selectedRange.getRowIndex() + 1, 1, 1, rowData.length).setValues([rowData]);
        }
      } else {
        ui.alert("Invalid input. Please enter a positive number.");
      }
    }
  } else {
    SpreadsheetApp.getUi().alert("Select a single row to duplicate.");
  }
}

function addRowsBelowExistingData() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  
  for (var i = lastRow; i > 0; i--) {
    sheet.insertRowsAfter(i, 2); // Insert 2 rows below the current row
  }
}




