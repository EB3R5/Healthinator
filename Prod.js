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

      // Find matching rows in Ontology based on column B
      var ontologyData = ontologySheet.getDataRange().getValues();
      var matchingRows = ontologyData.filter(function(row) {
        return row[1] == keyword; // Assuming column B in Ontology contains the keyword
      });

      if (matchingRows.length > 0) {
        // Process each matching row
        for (var j = 0; j < matchingRows.length; j++) {
          // Get the current date
          var currentDate = new Date();

          // If there is a quantity, repeat the data as specified
          var numCols = matchingRows[j].length;
          var numRows = 1;

          if (quantity && quantity > 1) {
            numRows = quantity;
          }

          for (var k = 0; k < numRows; k++) {
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





function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
      .addItem('Run Script', 'copyDataToHealthTransactions')
      .addItem('Run Balances', 'healthBalances')
      .addItem('The thing', 'duplicateHighlightedRow') // Corrected function name
      .addItem('Calorie Query', 'getCalorieData')
      .addToUi();
}

function healthBalances() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var list = ss.getSheetByName('List');
  var ontology = ss.getSheetByName('Ontology');
  var healthBalanceHistory = ss.getSheetByName('Health Balance History');

  // Get all the values from column B and column D in the List sheet starting from row 4
  var valuesInColumnB = list.getRange("B4:B" + list.getLastRow()).getValues();
  var valuesInColumnD = list.getRange("D4:D" + list.getLastRow()).getValues();

  if (!valuesInColumnB || !valuesInColumnD) {
    Logger.log("No data found in columns B or D of the 'List' sheet.");
    return;
  }
  
  // Set the starting row in the 'Health Balance History' sheet
  var startRow = healthBalanceHistory.getLastRow() + 1;
  
  // Loop through the values in column B and column D
  for (var i = 0; i < valuesInColumnB.length; i++) {
    var valueInColumnB = valuesInColumnB[i][0]; // Get the value from column B in 'List'
    var valueInColumnD = valuesInColumnD[i][0]; // Get the value from column D in 'List'
    
    // Check if valueInColumnB is not empty
    if (valueInColumnB !== "" && valueInColumnD !== "") {
      var data = ontology.getDataRange().getValues();
      
      // Filter data from 'Ontology' based on data from column B
      var filteredData = data.filter(function(row) {
        return row[1] == valueInColumnD; // Assuming column B in Ontology matches column D in List
      });
      
      // Get the current date and time
      var timestamp = new Date();
      
      // Create an array for the date timestamp and all columns from 'Ontology' (A to Q)
      var appendedData = filteredData.map(function(row) {
        var ontologyColumns = row.slice(0, 17); // Columns A to Q
        return [timestamp, valueInColumnB].concat(ontologyColumns);
      });
      healthBalanceHistory.getRange(startRow, 1, appendedData.length, appendedData[0].length).setValues(appendedData);
      
      // Update the starting row for the next value in column B
      startRow += appendedData.length;
    }
  }
}



function clearHealthTransactions() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var healthTransactions = ss.getSheetByName('Health Balance History');
  
  // Get the data range for the 'Health Transactions' sheet, excluding the header row (row 1)
  var dataRange = healthTransactions.getRange("A2:z" + healthTransactions.getLastRow());
  
  // Clear the contents of all cells in the data range
  dataRange.clearContent();

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
          var newRange = sheet.getRange(selectedRange.getRowIndex() + 1, 1, 1, rowData.length);
          newRange.setValues([rowData]);
        }
      } else {
        ui.alert("Invalid input. Please enter a positive number.");
      }
    }
  } else {
    SpreadsheetApp.getUi().alert("Select a single row to duplicate.");
  }
}

function getCalorieData() {
  // Get the query from cell A1 in the "List" sheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var listSheet = spreadsheet.getSheetByName('List');
  var query = listSheet.getRange('A1').getValue();

  // Your API key
  var apiKey = 'uXwPveJPLNNE38aj5yoJpQ==qIwy2sWiF8rYAnLO';
  var url = 'https://api.calorieninjas.com/v1/nutrition?query=' + encodeURIComponent(query);

  var options = {
    method: 'get',
    headers: {
      'X-Api-Key': apiKey
    },
    contentType: 'application/json'
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    var data = JSON.parse(response.getContentText());

    // Get the "Health Transactions" sheet and find the last row
    var sheet = spreadsheet.getSheetByName('Health Transactions');
    var lastRow = sheet.getLastRow() + 1;

    if (data.items && data.items.length > 0) {
      var item = data.items[0]; // Assuming the first item

      // Set labels in the first row
      sheet.getRange('C1').setValue('Name');
      sheet.getRange('H1').setValue('Category');
      sheet.getRange('G1').setValue('Value');

      // Define the labels for categories
      var categories = ['Calories', 'Protein (g)', 'Fat (g)', 'Carbohydrates (g)', 'Fiber (g)'];

      // Paste the name, category, and value in the "Health Transactions" sheet
      for (var i = 0; i < categories.length; i++) {
        var category = categories[i];
        var value;
        if (category === 'Calories') {
          value = item.calories;
        } else if (category === 'Protein (g)') {
          value = item.protein_g || 'N/A';
        } else if (category === 'Fat (g)') {
          value = item.fat_total_g || 'N/A';
        } else if (category === 'Carbohydrates (g)') {
          value = item.carbohydrates_total_g || 'N/A';
        } else if (category === 'Fiber (g)') {
          value = item.fiber_g || 'N/A';
        }

        // Add timestamp in the loop
        var timestamp = new Date();
        sheet.getRange(lastRow, 1).setValue(timestamp);
        sheet.getRange(lastRow, 3).setValue(item.name);
        sheet.getRange(lastRow, 8).setValue(category);
        sheet.getRange(lastRow, 7).setValue(value);
        lastRow++;
      }
      
      // Add more data as needed
    } else {
      console.error('No data found for the query.');
    }
  } catch (e) {
    console.error('Error: ', e);
  }
}




