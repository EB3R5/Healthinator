function getService() {
  // Log a message to indicate that the function is being executed
  Logger.log("Executing getService");
  var email = "firebase-adminsdk-1a3mj@healthinator-f7a9c.iam.gserviceaccount.com"
  var key = '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDG1pV1aMlxsmjN\n9hWMNDDmyBsKuC8CWvWCgFsrxLbK5TvPZGFKk0dx32M0yCHw++i71zBzsVwTeV3G\nQAyTit1B1O2vELNM/pNqtBoEyHtPh9hXXdUPVfkQDO9I59NrY2UNoj2sPSqmttfy\njL7/+oCM3Am16HiFv/5Emjy0UYLZhPf5JsqrFS16ohzb2ASxjPaYk7su3Xi09hsH\nQ7kerR/eg1gDVVuThcR91pKjWi6o4vw7HrPMzzLDIxBu5l4x2/POyGfw93P1IDRb\nPHF8cTuFgAB7CWrYk5a2kuvY7STKhfCS3Kv8MnqNRFO1tIg6nLNmCukRycrByo+F\nK4ixrWPZAgMBAAECggEAIGhSBMhW6NaMuWDt4yOQgtTDf4xEcSxVDneQJIKTzl7t\nUCCKsOZvQxKHL0+dJJNSO+dXSMvz92KVE55VzmhYJoYnVRyyNI7bhQ0knnn0iyJX\ncunis3SuOtz41RefwEV7b2ztg1iWzoRHjws8iCkScaLdXE4u8pG3xgOjeDo+yufU\nu//YRMhZw3rpTB4POrQk6mRiEU/47vNHOdi3zv4J25lkriOYO0ZI4Ejxw1L+sNqa\nBUfvz305yGH0k0MWhLboqpEKR2qgMgZ69e5YHAjFbll28VAfXWtNSX9UPVp2oVQe\nDQzzA4eciiPhyW2zwfL9tF/EIGyerbgtFXrCT4lmGQKBgQD5vvwVWSP0dk32UwPw\neoWrfuMh5lKDDWE2yONJSfnFT+NureEyHpDU+XvBr87BAroHnfffK1usLlWTj9af\nrzb/LzF/OyFGXKl06AzJUuYhJXDmWD9siCWBbBLnpevC74TUSUcA7Jsw0kgCDfRD\nmSjksMSNp8fMOkJ2b73n+y0cZQKBgQDL0UA2QfpE31seQNkUZn9dEAAJid//2rKL\nzbwU6INBl7ClPmQnwiQcQtidumbkCTsvaCyj65E85KRWiAvtQATNF0k8m07Mt/nP\nV4uXkXpKjq06KSN+IJ/edcf1a17BvThFzkCMjUTps7CM0lDtLDOStfVlzJCX7pRu\n/Q7SFtFwZQKBgBx2bKpOL2/T78yr514HyKYj3uTlJ/AxnSuuN2EJ4kJfeW8KuAiL\nPTxYdoc7bxfGJMdrdG1ltpvn5+7aTL6ELINmsIBsj71CIDnnnFVxcjLC3pwR4KCQ\n351hYMIvwa/EtmGvPD1ZudIVlQlO59Cwat2tW6k9PuMCnMJ8t6rxkFGVAoGAOZ13\nR18zPhDdkxnFw6yNyGLjf87H0W2jFz4bMtXfdMVKnAudCFgrGQoUbdHpkADECEys\ngdHvhoUjp4phxLlaIhe5Djbg+aHwLhqTTU9EgJsAgPZsIBVc2+fzlH67lIzGwYTi\nXlj46A9xkv1I/yKFma1yJ0rCfRBmSVGjxOPKZLkCgYAT+uUtkYMg3rmPYJWqi67C\nkTojV9EdV6Nh86zuXzYx0uJKSZAJWH0yIGSX+ROlx3xGHfVVTlVsP/Iq8Z795bBS\nDtljYGTU1IB4Ousbxq+21xuvX3sJUvDujH565Tvp9Iag7grfJ9fdj17jGFxHbNhf\nzSqOUYmXjZd9xlMuCSgIxw==\n-----END PRIVATE KEY-----\n'
  var projectId = "healthinator-f7a9c"
  return FirestoreApp.getFirestore(email,key,projectId)
}




function logAllData() {
  const firestore = getService();
  var sheetName = "Ontology";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  if (!sheet) {
    Logger.log("Sheet not found: " + sheetName);
    return;
  }

  // Get the last row and last column with data
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  // Specify the range starting from row 2 to the last row and all columns
  var dataRange = sheet.getRange(2, 1, lastRow - 1, lastCol);
  var sheetData = dataRange.getValues();

  // Iterate through each row
  for (var i = 0; i < sheetData.length; i++) {
    // Check if the second column is not empty
    if (sheetData[i][1] !== '') {
      // Initialize data object
      var data = {
        Configuration: sheetData[i][0],
        Exercise: sheetData[i][1],
        Type: sheetData[i][2],
        Activity: sheetData[i][3],
        Description: sheetData[i][4],
        Value: sheetData[i][5],
        Key: sheetData[i][6],
        Metric: sheetData[i][7],
        InputOutput: sheetData[i][8]
      };

      // Log the data for the current row
      Logger.log(data);

      try {
        firestore.createDocument("Ontology", data);
        Logger.log("Document created successfully for row " + (i + 2));
      } catch (e) {
        Logger.log("Error:", e.toString());
        Logger.log("Stack Trace:", e.stack);
      }
    }
  }

  Logger.log("Data logging complete.");
}