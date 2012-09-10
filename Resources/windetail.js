var ui = require('lib/ui');

var win = Ti.UI.currentWindow;
var data = win.data;					//This is the JSON array of the locations that are used in in the tableview.
var theIndex = win.index;
var currLocation = win.currLocation;	//our current location
var currRegion = win.currRegion;		//We pass the current location here to give us a starting point.

//Internationalization variables
var int_btn_back = L('btn_back');
var int_title_map = L('title_map');
var int_title_dirtobusiness = L('title_dirtobusiness');
var int_text_reviews = L('text_reviews');
var int_text_reviewsntips = L('text_reviewsntips');
//Debug variables
/*
Ti.API.info("currRegion.latitude: "+currRegion.latitude);
Ti.API.info("index: "+index);
Ti.API.info("data[theIndex].photo: "+data[theIndex].photo);
*/

//Custom Back button
var btnBack = ui.mkBackButtonGrey(int_btn_back);
btnBack.addEventListener("click", function() {
    Ti.UI.currentWindow.close();
});
win.setLeftNavButton(btnBack);

//**************************
//First block: Business info
//**************************
var viewResult = Ti.UI.createView({
	width: 300,
	height: 120,
	top: 12,
	borderRadius: 10,
	//backgroundColor: "#086aae",
	backgroundGradient:{
		type:'linear',
		colors:['#bdc4b4','#bdc4b4'],
		startPoint:{x:0,y:0},
		endPoint:{x:0,y:120},
		backFillStart:true
	}	
}); 
win.add(viewResult);

viewResult.addEventListener("click", function(e) {
	var webview = Titanium.UI.createWebView({url:data[theIndex].url});
	var windowWeb = Titanium.UI.createWindow({
		title: "Yelp",
		backButtonTitle: "Back",
		barColor: "#2b2e2f",
		//leftNavButton: btnBack,
		barImage: "images/bg_bargrey.png"
	});
	windowWeb.add(webview);	
	Ti.UI.currentTab.open(windowWeb);
});

//---------------
//ViewResult data
var photoUrl = "images/defualt_thumb_review.png";
if(data[theIndex].photo != null){
	photoUrl = data[theIndex].photo;
}
var imgPlace = Ti.UI.createImageView({
	image: photoUrl,
	width: 100,
	height: 100,
	top: 10,
	left: 10
});
viewResult.add(imgPlace);

Ti.API.info("data[theIndex].name.length: "+data[theIndex].name.length);
var nameText = data[theIndex].name;
if(data[theIndex].name.length > 26){
	nameText = nameText.substr(0,25)+"...";
}

var lblName = Ti.UI.createLabel({
	text: nameText,
	//width: 175,
	//height: 45,
	width: 175,
	height: "auto",
	left: 115,
	top: 10,
	font: {fontFamily: "HelveticaNeue-Bold", fontSize: 18},
	color: "#fff"
});
viewResult.add(lblName);

if(data[theIndex].rating_large != null){
	var imgRating = Ti.UI.createImageView({
		image: data[theIndex].rating_large,
		width: 83,
		height: 15,
		left: 115,
		top: 60
	});
	viewResult.add(imgRating);	
};

if(data[theIndex].review_count != null){
	var lblRevNum = Ti.UI.createLabel({
		text: data[theIndex].review_count+" "+int_text_reviews,
		width: 170,
		height: "auto",
		left: 203,
		top: 57,
		font: {fontFamily: "HelveticaNeue-Italic", fontSize: 12},
		color: "#fff"
	});
	viewResult.add(lblRevNum);
};

var viewLine = Ti.UI.createView({
	width: 184,
	height: 1,
	top: 82,
	right: 0,
	backgroundColor: "#fff"	
}); 
viewResult.add(viewLine);

if (data[theIndex].categories != null) {
	var categoriesArry = (data[theIndex].categories.toString()).split(',');
	var categories = categoriesArry[0];

	var lblCategories = Ti.UI.createLabel({
		text: categories,
		color: "#fff",
		textAlign: "left",
		width: "auto",
		height: "auto", 
		top: 88,
		left: 115,
		font: {fontSize: 10, fontFamily:"HelveticaNeue"}
	});
	viewResult.add(lblCategories);
}

var imgArrow = Ti.UI.createImageView({
	image: "images/icn_arrow_white.png",
	width: 9,
	height: 15,
	top: 88,
	right: 10
});
viewResult.add(imgArrow);	

//**********************************
//Second block: Business Review info
//**********************************
var viewReviews = Ti.UI.createView({
	width: 300,
	height: 77,
	top: 144,
	borderRadius: 10,
	backgroundGradient:{
		type:'linear',
		colors:['#bdc4b4','#bdc4b4'],
		startPoint:{x:0,y:0},
		endPoint:{x:0,y:77},
		backFillStart:true
	}	
}); 
win.add(viewReviews);

viewReviews.addEventListener("click", function(e) {
	var webview = Titanium.UI.createWebView({url:data[theIndex].url});
	var windowWeb = Titanium.UI.createWindow({
		title: "Yelp",
		backButtonTitle: "Back",
		barColor: "#2b2e2f",
		//leftNavButton: btnBack,
		barImage: "images/bg_bargrey.png"
	});
	windowWeb.add(webview);	
	Ti.UI.currentTab.open(windowWeb);
});

//----------------
//viewReviews data
var imgReview = Ti.UI.createImageView({
	image: data[theIndex].snippet_image_url,
	width: 57,
	height: 57,
	top: 10,
	left: 10
});
viewReviews.add(imgReview);

var lblRevTitle = Ti.UI.createLabel({
	text: int_text_reviewsntips,
	width: 200,
	height: "auto",
	left: 75,
	top: 10,
	font: {fontFamily: "HelveticaNeue-Bold", fontSize: 14},
	color: "#23353b"
});
viewReviews.add(lblRevTitle);

/*var snippetText = data[theIndex].snippet_text;
if(data[theIndex].snippet_text.length > 55){
	snippetText = snippetText.substr(0,56)+"...";
}
*/
var lblRevSnippet = Ti.UI.createLabel({
	//text: snippetText,
	text: "Read what others are saying before you go!",
	width: 200,
	height: 34,
	left: 75,
	top: 30,
	font: {fontFamily: "HelveticaNeue", fontSize: 14},
	color: "#fff"
});
viewReviews.add(lblRevSnippet);

var imgArrow2 = Ti.UI.createImageView({
	image: "images/icn_arrow_white.png",
	width: 9,
	height: 15,
	top: 36,
	right: 10
});
viewReviews.add(imgArrow2);

//**********************************
//Third block: Business Address info
//**********************************
var viewAddressDirs = Ti.UI.createView({
	width: 300,
	height: 91,
	top: 233,
	borderRadius: 10,
	//backgroundColor: "#086aae",
	backgroundGradient:{
		type:'linear',
		colors:['#bdc4b4','#bdc4b4'],
		startPoint:{x:0,y:0},
		endPoint:{x:0,y:91},
		backFillStart:true
	}	
}); 
win.add(viewAddressDirs);

//--------------------
//viewAddressDirs data
var viewAddress = Ti.UI.createView({ //create view of address map so it's clickable
	width: 300,
	height: 56,
	top: 0,
	//backgroundColor: "#000",
	font: {fontFamily: "HelveticaNeue-Bold", fontSize: 14},
	color: "#c1d830"
});
viewAddressDirs.add(viewAddress);

viewAddress.addEventListener("click", function(e) {
	Ti.API.info("currRegion.latitude: "+currRegion.latitude);
	viewActInd.visible = true;

	var dataMap = []; //populate the result array that will be sent to the map
    dataMap[0] = {
        name:data[theIndex].name,
        categories:data[theIndex].categories,
        url:data[theIndex].url,
        city:data[theIndex].city,
        state:data[theIndex].state,
        street:data[theIndex].street,
        zip:data[theIndex].zip,
        rating:data[theIndex].rating,
        rating_small:data[theIndex].rating_small,
        rating_large:data[theIndex].rating_large,
        review_count:data[theIndex].review_count,
        snippet_image_url:data[theIndex].snippet_image_url,
        snippet_text:data[theIndex].snippet_text,   
        photo:data[theIndex].photo,
        phone:data[theIndex].phone,
        lat:data[theIndex].lat,
        lng:data[theIndex].lng,
        distance:data[theIndex].distance
     };	

	var winMap = Ti.UI.createWindow({
		url: "map.js",
		data: dataMap,
		title: int_title_map,
		barImage: "images/bg_bargrey.png",
		backButtonTitle: "Back",
		barColor: "#23353b",
		//leftNavButton: btnBack,
		currRegion: win.currRegion
	});
	
	Ti.UI.currentTab.open(winMap);
	viewActInd.visible = false;	
});

//viewAddress elements
var lblMapTitle = Ti.UI.createLabel({
	text: "Map",
	width: "auto",
	height: "auto",
	left: 75,
	top: 10,
	font: {fontFamily: "HelveticaNeue-Bold", fontSize: 14},
	color: "#23353b"
});
viewAddress.add(lblMapTitle);

Ti.API.info("data[theIndex].street: "+data[theIndex].street.toString());
var streetLoc = data[theIndex].street.toString();
var lblMapAddress = Ti.UI.createLabel({
	text: streetLoc.substr(0,20)+"...\n"+data[theIndex].city+", "+data[theIndex].state+", "+data[theIndex].zip,
	width: 170,
	height: "auto",
	left: 115,
	top: 10,
	//backgroundColor: "#000",
	font: {fontFamily: "HelveticaNeue-Bold", fontSize: 14},
	color: "#fff"
});
viewAddress.add(lblMapAddress);

var viewLine2 = Ti.UI.createView({
	width: 300,
	height: 1,
	top: 55,
	right: 0,
	backgroundColor: "#fff"	
}); 
viewAddress.add(viewLine2);

//create view of directions so it's clickable
var viewDirections = Ti.UI.createView({
	width: 300,
	height: 55,
	top: 56,
	//backgroundColor: "#000",
	font: {fontFamily: "HelveticaNeue-Bold", fontSize: 14},
	color: "#c1d830"
});
viewAddressDirs.add(viewDirections);

viewDirections.addEventListener("click", function(e) {
	Ti.API.info("currLocation.lat: "+currLocation.lat);
	Ti.Platform.openURL("http://maps.google.com/maps?saddr="+currLocation.lat+","+currLocation.lng+"&daddr="+data[theIndex].lat+","+data[theIndex].lng);
});

//viewAddress elements
var lblMapTitle = Ti.UI.createLabel({
	text: int_title_dirtobusiness,
	width: "auto",
	height: "auto",
	top: 8,
	textAlign: "center",
	font: {fontFamily: "HelveticaNeue-Bold", fontSize: 14},
	color: "#23353b"
});
viewDirections.add(lblMapTitle);

/* **************************** */
/* Yelp display requirement */
/* **************************** */
/*
var yelpView = Ti.UI.createView({
	//backgroundColor: "#ececec",
	backgroundImage: "images/bg_yelp_bar.png",
	height: 37,
	width: "100%",
	bottom: 0
});

var yelpImage = Ti.UI.createImageView({
	image: "images/logo_yelp.png",
	width: 143,
	height: 28
});

yelpImage.addEventListener("click", function(e) {
	var webview = Titanium.UI.createWebView({url:"http://www.yelp.com"});
	var windowWeb = Titanium.UI.createWindow({
		title: "Yelp",
		barColor: "#045cb0",
		barImage: "images/bg_barblue.png"
	});
	windowWeb.add(webview);	
	Ti.UI.currentTab.open(windowWeb);
});


yelpView.add(yelpImage);
win.add(yelpView);
*/

/* ********************** */
/* The activity indicator */
/* ********************** */
var viewActInd = Ti.UI.createView({
	width: 100,
	height: 100,
	visible: false
});

var viewActIndBkg = Ti.UI.createView({
	backgroundColor: "#000",
	width: 100,
	height: 100,
	borderRadius: 14,
	opacity: 0.8
});

var actInd = Ti.UI.createActivityIndicator({
	height:50,
	width:10,
	style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG
});

//This is the activity view adding to the main window
win.add(viewActInd);
viewActInd.add(viewActIndBkg);
viewActInd.add(actInd);
actInd.show();	//we have to call show otherwise the spinner won't show
/*	
var btnPhone = Ti.UI.createButton({
	title: data[theIndex].phone,
	width: 100,
	height: 32,
	left: 20,
	top: 40,
	font: {fontFamily: "Trebuchet MS", fontSize: 13},
	color: "#333333"
});
viewResult.add(btnPhone);


//Make phone call to number
btnPhone.addEventListener('click',function(evt)
{
	//Ti.API.info("btnPhone.title: "+btnPhone.title);
	Titanium.Platform.openURL("tel:"+btnPhone.title);
});
*/