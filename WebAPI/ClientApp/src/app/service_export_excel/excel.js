
function exportToExcel(fileName, sheetName, table) {
	if (myData.length === 0) {
		console.error('Chưa có data');
		return;
	}
	console.log('exportToExcel', myData);

	let wb;
	if (table && table !== '') {
		wb = XLSX.utils.table_to_book($('#' + table)[0]);
	} else {
		const ws = XLSX.utils.json_to_sheet(myData);
		// console.log('ws', ws);
		wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, sheetName);
	}
	console.log('wb', wb);
	XLSX.writeFile(wb, `${fileName}.xlsx`);
}
