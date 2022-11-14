const { async } = require("rxjs");

let myData = [];

function getData() {
	$.ajax({
	//	url: 'https://randomuser.me/api/?results=10',
		 url :  this.REST_API_URL + '/sys_cong_viec_giang_vien/GetAll',
  
		dataType: 'json',
		success: function (data) {
			console.log('getData', data.results);
			showData(data.results);
		},
	});
}

function showData(data) {
	// console.log(data);
	myData = data.map((d) => {
		return {
			firstName: d?.name?.first,
			lastName: d?.name?.last,
			email: d?.email,
			phone: d?.phone,
			income: `$` + (Math.random() * 1000).toFixed(2),
		};
	});
	console.log('myData', myData);
	let html =
		'<tr><td>Tên</td><td>Họ</td><td>Email</td><td>Phone</td><td>Income</td></tr>';
	$.each(myData, function (key, value) {
		html += '<tr>';
		html += '<td>' + value?.firstName + '</td>';
		html += '<td>' + value?.lastName + '</td>';
		html += '<td>' + value?.email + '</td>';
		html += '<td>' + value?.phone + '</td>';
		html += '<td>' + value?.income + '</td>';
		html += '</tr>';
	});
	// console.log('html', html);
	$('table tbody').html(html);
}
// fileName,
// sheetName,
// report,
// myHeader,
// myFooter,
// widths){
// if(!myData||myData.length===0){
// console.error('Chưa có data');
// return;
// }
async function exportToExcel(fileName, sheetName, report) {
	if (!myData|| myData.length === 0) {
		console.error('Chưa có data');
		return;
	}
	console.log('exportToExcel', myData);
if(report!==''){
	myHeader=['Ten','Ho','Email','Phone'];
	exportToExcelPro('Users','users',report,myHeader,myFooter,[
{with:15},
{with:15},
{with:30},
{with:20},
{with:25},
	]);
	return;
}
const wb=new ExcelJS.Workbook();
const ws=wb.addWorksheet(sheetName);
const header=Object.keys(myData[0]);
console.log('header',header);

ws.addRow(header);
myData.forEach((rowData)=>{
console.log('rowData',rowData);
row=ws.addRow(Object.values(rowData));

});
const buf=await wb.xlsx.writeBuffer();
saveAs(new Blob([buf]),'${fileName}.xlsx');
	// let wb;
	// if (table && table !== '') {
	// 	wb = XLSX.utils.table_to_book($('#' + table)[0]);
	// } else {
	// 	const ws = XLSX.utils.json_to_sheet(myData);
	// 	// console.log('ws', ws);
	// 	wb = XLSX.utils.book_new();
	// 	XLSX.utils.book_append_sheet(wb, ws, sheetName);
	// }
	// console.log('wb', wb);
	// XLSX.writeFile(wb, `${fileName}.xlsx`);
}

async function exportToExcel(fileName, sheetName, table) {
	if (myData.length === 0) {
		console.error('Chưa có data');
		return;
	}
	console.log('exportToExcel', myData);
if(report!==''){
	myHeader=['Ten','Ho','Email','Phone'];
	exportToExcelPro('Users','users',report,myHeader,myFooter,[
{with:15},
{with:15},
{with:30},
{with:20},
{with:25},
	]);
	return;
}


const wb=new ExcelJS.Workbook();
const ws=wb.addWorksheet(sheetName);
const header=Object.keys(myData[0]);
console.log('header',header);

ws.addRow(header);
myData.forEach((rowData)=>{
console.log('rowData',rowData);
row=ws.addRow(Object.values(rowData));

});
const buf=await wb.xlsx.writeBuffer();
saveAs(new Blob([buf]),'${fileName}.xlsx');




	// let wb;
	// if (table && table !== '') {
	// 	wb = XLSX.utils.table_to_book($('#' + table)[0]);
	// } else {
	// 	const ws = XLSX.utils.json_to_sheet(myData);
	// 	// console.log('ws', ws);
	// 	wb = XLSX.utils.book_new();
	// 	XLSX.utils.book_append_sheet(wb, ws, sheetName);
	// }
	// console.log('wb', wb);
	// XLSX.writeFile(wb, `${fileName}.xlsx`);
}

async function exportToExcelPro(
	myData,
	fileName,sheetName,report,myHeader,widths) {
if(!myData||myData.length===0){
	console.error('Chưa có data');
	return;
}
console.log('exportToExcel', myData);

const wb=new ExcelJS.Workbook();
const ws=wb.addWorksheet(sheetName);
const colums=myHeader?.length;
const title={
	border:true,
	money:false,
	height:100,
	font:{size:30,bold:false,color:{argb:'FFFFFF'}},
	alignment:{horizontal:'center',vertical:'middle'},
	fill:{
		type:'pattern',
		pattern:'solid',
		fgColoor:{
			argb:'0000FF',
		},
	},
};
const header={
	border:true,
	money:false,
	height:70,
	font:{size:15,bold:false,color:{argb:'FFFFFF'}},
	alignment:{horizontal:'center',vertical:'middle'},
	fill:{
		type:'pattern',
		pattern:'solid',
		fgColoor:{
			argb:'0000FF',
		},
	},
};
const data={
	border:true,
	money:true,
	height:0,
	font:{size:12,bold:false,color:{argb:'000000'}},
alignment:null,
fill:null,
};
const footer={
	border:true,
	money:true,
	height:70,
	font:{size:15,bold:true,color:{argb:'FFFFFF'}},
alignment:null,
fill:{
	type:'pattern',
	pattern:'solid',
	fgColoor:{
		argb:'0000FF',
	},
},
};
if(widths&& widths.length>0){
	ws.colums=widths;
}
let row=addRow(ws,[report],title);
mergeCells(ws,row,1,colums);
addRow(ws,myHeader,header);

myData.forEach((r)=>{
	addRow(ws,Object.values(r),data);
});

row=addRow(ws,myFooter,footer);
mergeCells(ws,row,1,colums-1);

const buf=await wb.xlsx.writeBuffer();
saveAs(new Blob([buf]),'${fileName}.xlsx');
}

// const header={
// 	border:true,
// 	money:false,
// 	height:70,
// 	font:{size:15,bold:false,color:{argb:'FFFFFF'}},
// }



function addRow(ws,data,section){

	const borderStyles={
		top:{style:'thin'},
		left:{stype:'thin'},
		bottom:{stype:'thin'},
		right:{stype:'thin'},
	};
const row=ws.addRow(data);
console.log('addRow',section,data);
row.eachCel({includeEmpty:true},(cell,colNumber)=>{
if(section?.boder){
	cell.boder=borderStyles;
}
if(section?.money && typeof cell.value==='number'){
	cell.alignment={horizontal:'right',vertical:'middle'};
	cell.numFmt='$#,##0.00;[Red]-$#,##0.00';
}
if(section?.alignment){
	cell.alignment=section.alignment;
}else{
	cell.alignment={vertical:'middle'};
}
if(section?.font){
	cell.font=section.font;
}
if(section?.fill){
	cell.fill,section.file;
}
});
if(section?.height>0){
	row.height=section.height;
}
return row;
}




function mergeCells(ws,row,from,to){

	console.log('mergeCells',row, from, to,row.getCell(from)._address,
	row.getcell(to)._address);
	ws.mergeCells('${row.getCell(from)._address}:${row.getCell(to)._address}');
}


function columnToLetter(colum){}