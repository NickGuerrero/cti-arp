function onOpen() 
{
    var spreadsheetMenu = SpreadsheetApp.getActiveSpreadsheet();

    var canvasMenuTitle = 'Canvas'
    var canvasMenuEntries = [{
        name: 'Canvas Gradebook',
        functionName: 'getCanvasGradebook'
    }];

    spreadsheetMenu.addMenu(canvasMenuTitle, canvasMenuEntries);
}