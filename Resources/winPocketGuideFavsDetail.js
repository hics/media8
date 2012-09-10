var ui = require('lib/ui');
var funcMod = require('lib/functionsModule');

var win = Ti.UI.currentWindow;
var rowdata = win.rowdata;
var descHeight = win.descHeight;

win.backgroundColor = "#fff";

//Internationalization variables
var int_btn_back = L('btn_back');

/* ****************************** */
/* Create Navbar with Back Button */
/* ****************************** */
//create navBar
var navBar = ui.mkbarGrey();
navBar.top=0;

//create and insert back button
var btnBack = ui.mkBackButtonGrey(int_btn_back);
btnBack.addEventListener('click', function() { 
	win.close();
});
navBar.add(btnBack);

win.add(navBar);

/* *************** */
/* Create the view */
/* *************** */
var scrollView = Ti.UI.createScrollView({
	backgroundColor: "white",
	//backgroundColor: "gray",
	//contentHeight: 'auto',
    contentWidth:'auto',
    contentHeight:'auto',
	top: 50,
	width: 320
	//height: "100%"
});

var detailView = Ti.UI.createView({
    //backgroundColor:'#336699',
    top:0,
    width:320
});
scrollView.add(detailView);

var imgItem = Ti.UI.createImageView({
	image: rowdata.children[1].image,
	width: 62,
	height: 39,
	left: 10,
	//backgroundColor: "gray",
	top: 12,
	visible: true
});

var lblTitle = Ti.UI.createLabel({
	text: rowdata.children[3].text,
	left: 85,
	top: 12,
	width: 215,
	//height: 20,
	height: 'auto',
	color: "#398795",
	font: {fontSize: 12, fontWeight:'bold', fontFamily: "Arial"}
});

//alert(rowdata.children[4].size.height);

var lblDesc = Ti.UI.createLabel({
	text: rowdata.children[4].text,
	width: 215,
	//height: rowdata.children[4].height,
	height: "auto",
	left: 85,
	top: 17+lblTitle.height,
	textAlign: "left",
	color: "#333333",
	font: {fontSize: 12, fontFamily: "Arial"}
});

//alert(lblDesc.height);

//longest item, set height of view according to this item's height
detailView.height = lblDesc.height+100;

var addFlag = true;
if( rowdata.children[6].text < 2){
	addFlag = false;
}
		
var lblAddrTitle = Ti.UI.createLabel({
	text: "Address:",
	width: 55,
	height: 'auto',
	left: 85,
	top: lblDesc.height+lblDesc.top+5,
	textAlign: "left",
	color: "#39878c",
	font: {fontSize: 12, fontFamily: "Arial"},
	visible: addFlag
});

var lblAddr = Ti.UI.createLabel({
	text: rowdata.children[6].text,
	width: 200,
	height: 'auto',
	left: 140,
	//top: -50,
	top: lblDesc.height+lblDesc.top+5,
	textAlign: "left",
	color: "#333333",
	font: {fontSize: 12, fontFamily: "Arial"},
	visible: addFlag
});

		
//if no value, then hide element
var regFlag = true;
if( rowdata.children[8].text < 2){
	regFlag = false;
}
var lblRegTitle = Ti.UI.createLabel({
	text: "Region:",
	width: 55,
	height: 'auto',
	left: 85,
	top: lblDesc.height+lblDesc.top+22,
	textAlign: "left",
	color: "#39878c",
	font: {fontSize: 12, fontFamily: "Arial"},
	visible: regFlag
});

var lblReg = Ti.UI.createLabel({
	text: rowdata.children[8].text,
	width: 200,
	height: 'auto',
	left: 140,
	top: lblDesc.height+lblDesc.top+22,
	textAlign: "left",
	color: "#333333",
	font: {fontSize: 12, fontFamily: "Arial"},
	visible: regFlag
});

//if there is no address, adjust region
if( (addFlag == false ) && (regFlag == true) ){
	lblRegTitle.top = lblDesc.height+lblDesc.top+5;
	lblReg.top = lblDesc.height+lblDesc.top+5;
}

detailView.add(imgItem);
detailView.add(lblTitle);
detailView.add(lblDesc);
detailView.add(lblAddrTitle);
detailView.add(lblAddr);
detailView.add(lblRegTitle);
detailView.add(lblReg);
win.add(scrollView);

