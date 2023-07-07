
function updateSpreadSheetView(spreadSheetName: string, data: any): void
{
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    var spreadSheet = ss.getSheetByName(spreadSheetName);
    const startRow = 1;
    const startColumn = 1;
    const allocateRow = data.length;
    const allocateColumn = data[0].length;



    spreadSheet
        .getRange(startRow, startColumn, allocateRow, allocateColumn)
        .setValues(data);
}
