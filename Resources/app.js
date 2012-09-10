var ui = require('lib/ui');
var funcMod = require('lib/functionsModule');
var math = require('lib/mathModule');

//app.js
//Ti.Geolocation.purpose = "Yelp API for camera overlay";

var int_tab_home = L('tab_home');
var int_tab_nearby = L('tab_nearby');
var int_tab_translate = L('tab_translate');
var int_tab_settings = L('tab_settings');

//This is the tab group that will hold our two windows
/*var tg = Ti.UI.createTabGroup({
	backgroundImage: "images/bkg.png",
	
});*/

var winHome = Ti.UI.createWindow({
	//url: "winHome_v2.js",
	url: "winHome.js",
	navBarHidden: true,
	tabBarHidden: true,
	distance: 1
});

//This is our main window that will perform most of the actions
var winMain = Ti.UI.createWindow({
	url: "winmainYelp.js",
	navBarHidden: true,
	distance: 1,
	//enableLoc: true //test enable
	enableLoc: false
});

Ti.App.Properties.setString("distRadius", 1);

var winTranslator = Ti.UI.createWindow({
	url: "winTranslator.js",
	//title: "Translator",
	barColor: "#0063b3",
	barImage: 'images/bg_bargrey.png',
	navBarHidden: false
});

var winProfile = Ti.UI.createWindow({
	url: "winsettings.js",
	//title: "Settings",
	barColor: "#0063b3",
	barImage: 'images/bg_bargrey.png',
	navBarHidden: false
});
//Debug: This listener is executed when the correct code is entered.
winProfile.addEventListener("enableAllLocations", function(e) {
	winMain.enableLoc = e.enableLoc; //enable all locations
	Ti.App.fireEvent('runGeoFunction');
});
//Here are the tabs for the tab group

var tabHome = Ti.UI.createTab({
	title: int_tab_home,
	icon: "images/tab-home.png",
	width: 23,
	height: 23,
	window: winHome
});

var tabMain = Ti.UI.createTab({
	title: int_tab_nearby,
	icon: "images/tab-nearby.png",
	width: 29,
	height: 29,
	window: winMain
});

var tabTranslator = Ti.UI.createTab({
	title: int_tab_translate,
	icon: "images/tab-translate.png",
	width: 25,
	height: 28,
	window: winTranslator
});

var tabProfile = Ti.UI.createTab({
	title: int_tab_settings,
	icon: "images/tab-more.png",
	width: 30,
	height: 9,
	window: winProfile
});

//Add tabs to the group and open the tag group to really start our application
//tg.addTab(tabHome);
//tg.addTab(tabMain);
//tg.addTab(tabTranslator);
//tg.addTab(tabProfile);
//tg.open();
winHome.open();
