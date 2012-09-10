var ui = require('lib/ui');
var transportation = require('lib/transportation');

var win = Ti.UI.currentWindow;

//Internationalization variables
var int_btn_back = L('btn_back');
var int_btn_taxi = L('btn_taxi');
var int_btn_taxi_selected = L('btn_taxi_selected');
var int_btn_bus = L('btn_bus');
var int_btn_bus_selected = L('btn_bus_selected');
    
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
var navBar = ui.mkbarGrey();
navBar.top=0;

//create and insert back button
var btnBack = ui.mkBackButtonGrey(int_btn_back);
navBar.add(btnBack);

/* *************************** */
/* Create tips and key buttons */
/* *************************** */
//Taxi button
var btnTaxi = Ti.UI.createButton({
	backgroundImage:int_btn_taxi,
	backgroundDisabledImage:int_btn_taxi_selected,
	width:90,
	height:30,
	left:70,
	top:10,
	enabled:false
});

//Bus button
var btnBus = Ti.UI.createButton({
	backgroundImage:int_btn_bus,
	backgroundDisabledImage:int_btn_bus_selected,
	width:89,
	height:30,
	left:160,
	top:10
});

//add buttons to navBar, and navBar to window
navBar.add(btnTaxi);
navBar.add(btnBus);
win.add(navBar);

/* ************************* */
/* Create tips and key views */
/* ************************* */
//Taxi tableview
var taxiView = transportation.createTaxiView();

//Bus view
var busView = transportation.createBusView();

//Create the view that will contain 2 tableviews and will slide
var slidingView = Ti.UI.createView({
	backgroundColor:'black', //Use your favorite background image (better with rectangle).
	top:50,
	left:0,
	width:640,
	height:361
});

slidingView.add(busView);
slidingView.add(taxiView);
win.add(slidingView);

btnBack.addEventListener('click', function() { 
	win.close();
	//Help titanium clean memory
	win.remove(navBar);
	navBar = null;
	win.remove(slidingView);
	slidingView = null;
});


/* ************************************** */
/* Views Animations and Buttons Listeners */
/* ************************************** */
//Animations
var seeTaxiAnimation = Titanium.UI.createAnimation();
seeTaxiAnimation.left = 0;
seeTaxiAnimation.duration = 400;

var seeBusAnimation = Titanium.UI.createAnimation();
seeBusAnimation.left = -320;
seeBusAnimation.duration = 400;

//Listeners
btnTaxi.addEventListener('click',function(e)
{
	//do animation
	slidingView.animate(seeTaxiAnimation);
	seeTaxiAnimation.addEventListener('complete', function()
	{
		btnTaxi.enabled=false; //pressed
		btnBus.enabled=true; //unpressed
		busView.visible = false;//this helps prevent the video to be shown whenever views on top are closed
	});	
});

btnBus.addEventListener('click',function(e)
{
	busView.visible = true;//this helps prevent the video to be shown whenever views on top are closed
		
	//do animation
	slidingView.animate(seeBusAnimation);
	seeBusAnimation.addEventListener('complete', function()
	{
		btnTaxi.enabled=true;	//unpressed
		btnBus.enabled=false;	//pressed	
	});		
});

win.add(viewActInd);
viewActInd.children[1].show();