

function getCalorieData() {
  var apiKey = 'uXwPveJPLNNE38aj5yoJpQ==qIwy2sWiF8rYAnLO';
  var query = 'chicken breast, rice noodles, 3 tablespoons soy sauce, 1 tablespoon balsamic vinegar, 2 tablespoons sriracha';
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
    sheet.getRange('A1').setValue(data.items[0].name); // Assuming the first item name
    sheet.getRange('B1').setValue(data.items[0].calories); // Assuming the first item calories
    // Add more data as needed
  } catch (e) {
    console.error('Error: ', e);
  }
}

function getCalorieData2() {
  var apiKey = 'uXwPveJPLNNE38aj5yoJpQ==qIwy2sWiF8rYAnLO';
  var query = 'chicken breast';
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

      sheet.getRange('A1').setValue(item.name);
      sheet.getRange('B1').setValue(item.calories);
      sheet.getRange('C1').setValue(item.protein_grams);
      sheet.getRange('D1').setValue(item.fat_grams);
      sheet.getRange('E1').setValue(item.carbohydrates_grams);
      sheet.getRange('F1').setValue(item.fiber_grams);
      
      // Add more data as needed
    } else {
      console.error('No data found for the query.');
    }
  } catch (e) {
    console.error('Error: ', e);
  }
}

function getCalorieData3() {
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

      sheet.getRange('A1').setValue(item.name);
      sheet.getRange('B1').setValue(item.calories);
      sheet.getRange('C1').setValue(item.protein_grams);
      sheet.getRange('D1').setValue(item.fat_grams);
      sheet.getRange('E1').setValue(item.carbohydrates_grams);
      sheet.getRange('F1').setValue(item.fiber_grams);
      
      // Add more data as needed
    } else {
      console.error('No data found for the query.');
    }
  } catch (e) {
    console.error('Error: ', e);
  }
}

function getCalorieData4() {
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

      sheet.getRange('A1').setValue(item.name);
      sheet.getRange('B1').setValue(item.calories);
      
      // Extract additional data
      var nutrients = item.nutrition;
      sheet.getRange('C1').setValue(nutrients.protein_grams);
      sheet.getRange('D1').setValue(nutrients.fat_grams);
      sheet.getRange('E1').setValue(nutrients.carbohydrates_grams);
      sheet.getRange('F1').setValue(nutrients.fiber_grams);
      
      // Add more data as needed
    } else {
      console.error('No data found for the query.');
    }
  } catch (e) {
    console.error('Error: ', e);
  }
}

function getCalorieData5() {
  var apiKey = 'uXwPveJPLNNE38aj5yoJpQ==qIwy2sWiF8rYAnLO';
  var query = 'chicken breast';
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

      sheet.getRange('A1').setValue(item.name);
      sheet.getRange('B1').setValue(item.calories);

      if (item.nutrition) {
        sheet.getRange('C1').setValue(item.nutrition.protein_grams || 'N/A');
        sheet.getRange('D1').setValue(item.nutrition.fat_grams || 'N/A');
        sheet.getRange('E1').setValue(item.nutrition.carbohydrates_grams || 'N/A');
        sheet.getRange('F1').setValue(item.nutrition.fiber_grams || 'N/A');
      } else {
        sheet.getRange('C1').setValue('N/A');
        sheet.getRange('D1').setValue('N/A');
        sheet.getRange('E1').setValue('N/A');
        sheet.getRange('F1').setValue('N/A');
      }
      
      // Add more data as needed
    } else {
      console.error('No data found for the query.');
    }
  } catch (e) {
    console.error('Error: ', e);
  }
}

function getCalorieData6() {
var apiKey = 'uXwPveJPLNNE38aj5yoJpQ==qIwy2sWiF8rYAnLO';
  var query = '1 lb steak burrito';
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

      sheet.getRange('A1').setValue(item.name);
      sheet.getRange('B1').setValue(item.calories);

      if (item) {
        sheet.getRange('C1').setValue(item.protein_g || 'N/A');
        sheet.getRange('D1').setValue(item.fat_total_g || 'N/A');
        sheet.getRange('E1').setValue(item.carbohydrates_total_g || 'N/A');
        sheet.getRange('F1').setValue(item.fiber_g || 'N/A');
      } else {
        sheet.getRange('C1').setValue('N/A');
        sheet.getRange('D1').setValue('N/A');
        sheet.getRange('E1').setValue('N/A');
        sheet.getRange('F1').setValue('N/A');
      }

      // Add more data as needed
    } else {
      console.error('No data found for the query.');
    }
  } catch (e) {
    console.error('Error: ', e);
  }
}

function getCalorieData7() {
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

      // Set column labels
      sheet.getRange('A1').setValue('Name');
      sheet.getRange('B1').setValue('Calories');
      sheet.getRange('C1').setValue('Protein (g)');
      sheet.getRange('D1').setValue('Fat (g)');
      sheet.getRange('E1').setValue('Carbohydrates (g)');
      sheet.getRange('F1').setValue('Fiber (g)');

      // Extract and paste the relevant data
      sheet.getRange('A2').setValue(item.name);
      sheet.getRange('B2').setValue(item.calories);
      sheet.getRange('C2').setValue(item.protein_g || 'N/A');
      sheet.getRange('D2').setValue(item.fat_total_g || 'N/A');
      sheet.getRange('E2').setValue(item.carbohydrates_total_g || 'N/A');
      sheet.getRange('F2').setValue(item.fiber_g || 'N/A');
      
      // Add more data as needed
    } else {
      console.error('No data found for the query.');
    }
  } catch (e) {
    console.error('Error: ', e);
  }
}

function getCalorieData8() {
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
      var numRows = 6; // Number of rows to insert

      // Set column labels
      sheet.getRange('A1').setValue('Name');
      sheet.getRange('B1').setValue('Calories');
      sheet.getRange('C1').setValue('Protein (g)');
      sheet.getRange('D1').setValue('Fat (g)');
      sheet.getRange('E1').setValue('Carbohydrates (g)');
      sheet.getRange('F1').setValue('Fiber (g)');

      // Repeat the name in each row
      for (var i = 0; i < numRows; i++) {
        sheet.getRange(2 + i, 1).setValue(item.name);
        sheet.getRange(2 + i, 2).setValue(item.calories);
        sheet.getRange(2 + i, 3).setValue(item.protein_g || 'N/A');
        sheet.getRange(2 + i, 4).setValue(item.fat_total_g || 'N/A');
        sheet.getRange(2 + i, 5).setValue(item.carbohydrates_total_g || 'N/A');
        sheet.getRange(2 + i, 6).setValue(item.fiber_g || 'N/A');
      }
      
      // Add more data as needed
    } else {
      console.error('No data found for the query.');
    }
  } catch (e) {
    console.error('Error: ', e);
  }
}

function getCalorieData9() {
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
      sheet.getRange('B1').setValue('Value');

      // Define the labels for categories
      var categories = ['Name', 'Calories', 'Protein (g)', 'Fat (g)', 'Carbohydrates (g)', 'Fiber (g)'];

      // Paste the name and nutritional data in one column, and the corresponding categories in the third column
      for (var i = 0; i < categories.length; i++) {
        var category = categories[i];
        var value;
        if (category === 'Name') {
          value = item.name;
        } else if (category === 'Calories') {
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
        sheet.getRange(2 + i, 2).setValue(value);
        sheet.getRange(2 + i, 3).setValue(category);
      }
      
      // Add more data as needed
    } else {
      console.error('No data found for the query.');
    }
  } catch (e) {
    console.error('Error: ', e);
  }
}
