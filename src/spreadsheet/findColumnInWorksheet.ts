function searchColumnInWorksheet(worksheet, column) {
    for(var column = 0; column < worksheet.length; column++) {
        let worksheet_column_title = worksheet[column].toLocaleString().replace(/\s+/g, '');
        let column_title = column.toLocaleString().replace(/\s+/g, '');

        if(worksheet_column_title.includes(column_title)) {
            return column;
        }
    }
    return -1;
}