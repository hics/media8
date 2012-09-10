var ui = require('lib/ui');
var tipsFacts = require('lib/photosAndVideos');

var win = Ti.UI.currentWindow;

//Internationalization variables
var int_btn_back = L('btn_back');
var int_btn_photos = L('btn_photos');
var int_btn_photos_selected = L('btn_photos_selected');
var int_btn_videos = L('btn_videos');
var int_btn_videos_selected = L('btn_videos_selected');
var int_txt_photo = L('txt_photo');

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
//var navBar = ui.mkbarGrey();
//navBar.top=0;

//create navBar
var navBar = ui.mkbarGreyTitle(int_txt_photo);
navBar.top=0;

//create and insert back button
var btnBack = ui.mkBackButtonGrey(int_btn_back);
navBar.add(btnBack);

/* ****************************** */
/* Create photos and videos buttons */
/* ****************************** */
//photos button
var btnPhoto = Ti.UI.createButton({
	backgroundImage:int_btn_photos,
	backgroundDisabledImage:int_btn_photos_selected,
	width:90,
	height:30,
	left:70,
	top:10,
	enabled:false
});

//videos button
var btnVideo = Ti.UI.createButton({
	backgroundImage:int_btn_videos,
	backgroundDisabledImage:int_btn_videos_selected,
	width:90,
	height:30,
	left:160,
	top:10
});

//add buttons to navBar, and navBar to window
//navBar.add(btnPhoto);
//navBar.add(btnVideo);
win.add(navBar);

/* ****************************** */
/* Create photos and videos views */
/* ****************************** */
//Photos
var photosView = tipsFacts.createPhotosGrid();

//Videos
var viedeosView = tipsFacts.createVideosList();
viedeosView.visible = false;

//Create the view that will contain 2 tableviews and will slide
var slidingView = Ti.UI.createView({
	backgroundColor:'black', //Use your favorite background image (better with rectangle).
	top:50,
	left:0,
	width:640,
	height:361
});

slidingView.add(photosView);
slidingView.add(viedeosView);
win.add(slidingView);

/* ************************************** */
/* Views Animations and Buttons Listeners */
/* ************************************** */
//Animations
var seePhotoAnimation = Titanium.UI.createAnimation();
seePhotoAnimation.left = 0;
seePhotoAnimation.duration = 400;

var seeVideosAnimation = Titanium.UI.createAnimation();
seeVideosAnimation.left = -320;
seeVideosAnimation.duration = 400;

//Listeners
btnPhoto.addEventListener('click',function(e)
{	
	//do animation
	slidingView.animate(seePhotoAnimation);
	
	seePhotoAnimation.addEventListener('complete', function()
	{
		btnPhoto.enabled=false; //pressed
		btnVideo.enabled=true; //unpressed
		viedeosView.visible = false;//this helps prevent the video to be shown whenever views on top are closed
	});	
});

btnVideo.addEventListener('click',function(e)
{
	viedeosView.visible = true;//this helps prevent the video to be shown whenever views on top are closed

	//do animation
	slidingView.animate(seeVideosAnimation);
	
	seeVideosAnimation.addEventListener('complete', function()
	{
		btnPhoto.enabled=true;	//unpressed
		btnVideo.enabled=false;	//pressed	
	});		
});

win.add(viewActInd);
viewActInd.children[1].show();

btnBack.addEventListener('click', function() { 
	win.close();
	//Help titanium clean memory	
	win.remove(navBar);
	navBar = null;
	win.remove(slidingView);
	slidingView = null;
	win.remove(viewActInd);
	//viewActInd = null;
});

win.addEventListener('open',function(e)
{
	//viewActInd.children[1].hide();
});