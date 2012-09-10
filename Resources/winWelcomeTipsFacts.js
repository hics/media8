var ui = require('lib/ui');
var tipsFacts = require('lib/tipsAndFacts');

var win = Ti.UI.currentWindow;
var keyFactsSelected = win.keyFactsSelected;

//Internationalization variables
var int_btn_back = L('btn_back');

var int_btn_tips = L('btn_tips');
var int_btn_tips_selected = L('btn_tips_selected');
var int_btn_facts = L('btn_facts');
var int_btn_facts_selected = L('btn_facts_selected');

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
//tip button
Ti.Platform.displayCaps.platformWidth/2;
var btnTip = Ti.UI.createButton({
		backgroundImage:int_btn_tips,
		backgroundDisabledImage:int_btn_tips_selected,
		width:80,
		height:30,
		left:'100%',
		bottom:10,
		enabled:false,
		//center:[{Ti.Platform.displayCaps.platformWidth/2}]
	});

//facts button
var btnFacts = Ti.UI.createButton({
		backgroundImage:int_btn_facts,
		backgroundDisabledImage:int_btn_facts_selected,
		width:99,
		height:30,
		left:150,
		top:10
	});

//add buttons to navBar, and navBar to window
navBar.add(btnTip);
navBar.add(btnFacts);
win.add(navBar);

/* ************************* */
/* Create tips and key views */
/* ************************* */
//Tips tableview
var tipsTable = tipsFacts.createTipsTable();

//Key Facts view
var factsView = tipsFacts.createFactsView2();

//Create the view that will contain 2 tableviews and will slide
var slidingView = Ti.UI.createView({
	backgroundColor:'black', //Use your favorite background image (better with rectangle).
	top:50,
	left:0,
	width:640,
	height:361
});

slidingView.add(tipsTable);
slidingView.add(factsView);
win.add(slidingView);

btnBack.addEventListener('click', function() { 
	win.close();
	//Help titanium clean memory
	win.remove(navBar);
	navBar = null;
	win.remove(slidingView);
	slidingView = null;
});

//if key facts was selected, show it selected
if(keyFactsSelected == true){
	slidingView.left = -320;
	btnTip.enabled=true;	//unpressed
	btnFacts.enabled=false;	//pressed	
}

/* ************************************** */
/* Views Animations and Buttons Listeners */
/* ************************************** */
//Animations
var seeTipsAnimation = Titanium.UI.createAnimation();
seeTipsAnimation.left = 0;
seeTipsAnimation.duration = 400;

var seeFactsAnimation = Titanium.UI.createAnimation();
seeFactsAnimation.left = -320;
seeFactsAnimation.duration = 400;

//Listeners
btnTip.addEventListener('click',function(e)
{
	//do animation
	slidingView.animate(seeTipsAnimation);
	seeTipsAnimation.addEventListener('complete', function()
	{
		btnTip.enabled=false; //pressed
		btnFacts.enabled=true; //unpressed
		factsView.visible = false;//this helps prevent the video to be shown whenever views on top are closed
	});	
});

btnFacts.addEventListener('click',function(e)
{
	factsView.visible = true;//this helps prevent the video to be shown whenever views on top are closed
		
	//do animation
	slidingView.animate(seeFactsAnimation);
	seeFactsAnimation.addEventListener('complete', function()
	{
		btnTip.enabled=true;	//unpressed
		btnFacts.enabled=false;	//pressed	
	});		
});