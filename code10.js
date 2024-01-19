function getCalorieData() {
var apiKey = 'uXwPveJPLNNE38aj5yoJpQ==qIwy2sWiF8rYAnLO';
  var query = '3lb carrots and a chicken sandwich';
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

    // Extract and paste the relevant data into your Google Sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (data.items && data.items.length > 0) {
      var item = data.items[0]; // Assuming the first item

      // Set labels in the first row
      sheet.getRange('C1').setValue('Name');
      sheet.getRange('H1').setValue('Category');
      sheet.getRange('G1').setValue('Value');

      // Define the labels for categories
      var categories = ['Calories', 'Protein (g)', 'Fat (g)', 'Carbohydrates (g)', 'Fiber (g)'];

      // Paste the name in each row in Column A
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

        sheet.getRange(2 + i, 3).setValue(item.name);
        sheet.getRange(2 + i, 8).setValue(category);
        sheet.getRange(2 + i, 7).setValue(value);
      }
      
      // Add more data as needed
    } else {
      console.error('No data found for the query.');
    }
  } catch (e) {
    console.error('Error: ', e);
  }
}

function getCalorieData11() {
var apiKey = 'uXwPveJPLNNE38aj5yoJpQ==qIwy2sWiF8rYAnLO';
  var query = '3lb carrots and a chicken sandwich';
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

    // Extract and paste the relevant data into your Google Sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (data.items && data.items.length > 0) {
      var item = data.items[0]; // Assuming the first item

      // Set labels in the first row
      sheet.getRange('A1').setValue('Category');
      sheet.getRange('B1').setValue('Name');
      sheet.getRange('C1').setValue('Value');

      // Define the labels for categories
      var categories = ['Calories', 'Protein (g)', 'Fat (g)', 'Carbohydrates (g)', 'Fiber (g)'];

      // Paste the name in Column C, category in Column B, and value in Column D
      sheet.getRange(2, 2).setValue(item.name);

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

        sheet.getRange(2 + i, 1).setValue(category);
        sheet.getRange(2 + i, 3).setValue(value);
      }
      
      // Add more data as needed
    } else {
      console.error('No data found for the query.');
    }
  } catch (e) {
    console.error('Error: ', e);
  }
}

