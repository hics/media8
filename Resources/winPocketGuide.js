var ui = require('lib/ui');
var pocketGuide = require('lib/pocketGuide');

var win = Ti.UI.currentWindow;

//Internationalization variables
var int_btn_back = L('btn_back');

/* **************************************** */
/* Create Activity Indicator with Listeners */
/* **************************************** */
var viewActInd = ui.mkActIndicator();

Ti.App.addEventListener('show_indicator', function(e){
	//alert("Llega a SHOW");
	viewActInd.visible = true;
});
Ti.App.addEventListener('hide_indicator', function(e){
	viewActInd.visible = false;
});
/* ****************************** */
/* Create Navbar with Back Button */
/* ****************************** */
//create navBar
var navBar = ui.mkbarGreyTitle('My Pocket Guide');
navBar.top=0;

//create and insert back button
var btnBack = ui.mkBackButtonGrey(int_btn_back);
btnBack.addEventListener('click', function() { 
	win.close();
});
navBar.add(btnBack);

win.add(navBar);

/* ************ */
/* Create views */
/* ************ */
var loginView = pocketGuide.createLoginView();
loginView.top = 50;
win.add(loginView);

win.add(viewActInd);
viewActInd.children[1].show();