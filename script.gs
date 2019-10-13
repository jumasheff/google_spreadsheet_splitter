function splitter() {
  var numberOfLines = Browser.inputBox('Enter number of lines, e.g. 200');
  var shouldCopyTheFirstRowIntoNewSheet = Browser.inputBox('Copy the first row into new sheets. 1 -- yes, 0 -- no.');
  var files = [];
  var numberOfLines = numberOfLines ? numberOfLines : 200;
  var sheet = SpreadsheetApp.getActiveSheet();
  var sheetName = sheet.getParent().getName();
  var data = sheet.getDataRange().getValues();
  var yourNewSheet = {};
  var name = sheet.getName();
  for (var i = 0; i < data.length; i++) {
    var tabName = i % numberOfLines;
    if(tabName == 0){
      var newTabName = "_Part" + i;
      var newSheet = SpreadsheetApp.create(sheetName + newTabName);
      files.push(newSheet);
      yourNewSheet = newSheet.insertSheet(newTabName);
      newSheet.deleteSheet(newSheet.getSheets()[0]);
      // Append header
      if (i > 0 && shouldCopyTheFirstRowIntoNewSheet) {
        yourNewSheet.appendRow(data[0])
      }
    }
    yourNewSheet.appendRow(data[i]);
  }
  for (var i = 0; i < files.length; i++) {
    var spreadsheet = files[i];
    var fileSheets = spreadsheet.getSheets();
    var sh = fileSheets[0];
    var maxRows = sh.getMaxRows(); 
    var lastRow = sh.getLastRow();
    sh.deleteRows(lastRow+1, maxRows-lastRow);
  }
}
