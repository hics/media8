Ti.include('js/titanium_oauth.js'); //Include the oauth functionality
var math = require('lib/mathModule');
var ui = require('lib/ui');

var win = Ti.UI.currentWindow;
win.backgroundColor = "#fff";
var data = win.data;
var currRegion = win.currRegion;	//We pass the current location here to give us a starting point.
var currLocation = win.currLocation;

//Internationalization variables
var int_btn_back = L('btn_back');
var int_artent = L('artent');
var int_historical = L('historical');
var int_hotels = L('hotels');
var int_nightlife = L('nightlife');
var int_restaurants = L('restaurants');
var int_shopping = L('shopping');
var int_nearby_title = L('tab_nearby');
var int_text_nomatches = L('text_nomatches');

//Custom Back button
var btnBack = ui.mkBackButtonGrey(int_btn_back);
btnBack.addEventListener("click", function() {
    Ti.UI.currentWindow.close();
});
win.setLeftNavButton(btnBack);
		
/* ***************************************** */
/* Create the category array and create list */
/* ***************************************** */
var catArray = [
	{code: "arcades,galleries,gardens,movietheaters,festivals,jazzandblues,museums,musicvenues,opera,theater,sportsteams,psychic_astrology,social_clubs,stadiumsarenas,wineries", name:int_artent},//more specific on subcategories to exclude Casinos
	{code: 'landmarks', name:int_historical},
	{code: "hotels", name:int_hotels},
	{code: "nightlife", name:int_nightlife},
	{code: "restaurants", name:int_restaurants},
	{code: "shopping", name:int_shopping}
];

//Set up tableview for the results window
var tv = Ti.UI.createTableView({
	backgroundColor: "transparent"
});

//go through each result and create labels
for (var i=0; i < catArray.length; i++) {
	var row = Ti.UI.createTableViewRow({
		name: catArray[i].name,
		code: catArray[i].code,
		data: catArray[i],
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		height: 56
	});
	
	var viewBkg = Ti.UI.createView({
		width: "100%",
		height: "100%",
		backgroundColor: "#fff"
	});
	
	var lblTitle = Ti.UI.createLabel({
		//text: catArray[i].name+" ("+catResults+")",
		text: catArray[i].name,
		left: 12,
		top: 0,
		width: "auto",
		height: 56,
		color: "#000",
		font: {fontSize: 18, fontFamily: "HelveticaNeue-Bold"}
	});
	
	var lblAct = Ti.UI.createActivityIndicator({
		height:5,
		width:5,
		left: lblTitle.width+25,
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
	});
	
	var lblResults = Ti.UI.createLabel({
		//text: catArray[i].name+" ("+catResults+")",
		text: " ",
		left: lblTitle.width+20,
		top: 0,
		width: 30,
		color: "#7f7f7f",
		font: {fontSize: 16, fontFamily: "HelveticaNeue"}
	});
		
	var imgHasChild = Ti.UI.createImageView({
		image: "images/icn_arrow_grey.png",
		width: 10,
		height: 13,
		top: 20,
		right: 12
	});	
		
	row.add(viewBkg);
	row.add(lblTitle);
	//row.add(lblAct);
	row.add(lblResults);
	row.add(imgHasChild);
	row.textLabel = lblTitle;
	row.resultsLabel = lblResults;
	row.lblActivity = lblAct;
	tv.appendRow(row);
	//lblAct.show();	//show activity indicator	
}
win.add(tv);

//tableview listener
tv.addEventListener("click", function(e) {
	viewActInd.visible = true;
	//get the row info
	var index = e.index;
	var section = e.section;
	var row = e.row;
	var rowdata = e.rowData;	
	
	/* Call the oauth titanium function and pass the yelp api consumer and access keys (santiago.obando@media8.com dev account) */
	// set the variables for the yelp api request
	var latlong = currLocation.lat+','+currLocation.lng; //example: '18.28,-66.7';
	var limit = '20'; //results limit
	var radius = Ti.App.Properties.getString("distRadius"); //results in miles
	radius = radius*1609; //convert miles to meters, which is the unit required by the yelp api.

	parameters = [];
	parameters.push(['ll', currLocation.lat+','+currLocation.lng]);
	parameters.push(['limit', limit]);
	parameters.push(['radius_filter', radius]);
	parameters.push(['category_filter', rowdata.code]);
		
	//var oauth = new TitaniumOAuth('Consumer key','Consumer secret', 'accessToken', 'accessTokenSecret');
	var oauth = new TitaniumOAuth('XF2XqHdgt3CZ5gHIYIWl3w','rXptjholWWEEeLRvXgcQXwXoGJY', 'es5mA2LXxs8rQczEoO0ME16VH06p2mgy', '0DbKoQM4XclMae18b5E9lTH4KnM');
	
	var options = {
	            method: 'GET',
	            action: 'http://api.yelp.com/v2/search?',
	            parameters: parameters
	        };
	
	//make the actual request and get the site's response
	oauth.request(options, function(data){
		Ti.API.info(data);
		try{
			//get the result and parse it
			var yelpResultJson = JSON.parse(data);
			var data = []; //get the same name for a data array
			var yelpResult = yelpResultJson.businesses;
			var yelpNumberResult = yelpResultJson.total;
			var yelpLatitudeResult = yelpResultJson.region.center.latitude;
			var yelpLongitudeResult = yelpResultJson.region.center.longitude;
			var yelpLatitudeDeltaResult = yelpResultJson.region.span.latitude_delta;
			var yelpLongitudeDeltaResult = yelpResultJson.region.span.longitude_delta;
			//set current region
			currRegion = {latitude:yelpLatitudeResult,longitude:yelpLongitudeResult,animate:true,latitudeDelta:yelpLatitudeDeltaResult, longitudeDelta:yelpLongitudeDeltaResult};
			
			//Titanium.UI.createAlertDialog({title:'places.address', message:"yelpLatitudeDeltaResult: "+yelpLatitudeDeltaResult+"...yelpLatitudeDeltaResult: "+yelpLatitudeDeltaResult}).show();
			
			Ti.API.info( "yelpNumberResult: " + yelpNumberResult );
			
			//go through the json object yelpResult and construct the data array.
			for (var c=0;c<yelpResult.length;c++){
				//Ti.API.info(yelpResult[c].id);
				
				var distance = yelpResult[c].distance * 0.00062137119; //result in meters, convert to miles
				//Ti.API.info(yelpResult[c].categories);
				
			    data[c] = {
			    	id:yelpResult[c].id,
			        name:yelpResult[c].name,
			        categories:yelpResult[c].categories,
			        url:yelpResult[c].url,
			        city:yelpResult[c].location.city,
			        state:yelpResult[c].location.state_code,
			        street:yelpResult[c].location.address,
			        zip:yelpResult[c].location.postal_code,
			        rating:yelpResult[c].rating_img_url,
			        rating_small:yelpResult[c].rating_img_url_small,
			        rating_large:yelpResult[c].rating_img_url_large,
			        review_count:yelpResult[c].review_count,
			        snippet_image_url:yelpResult[c].snippet_image_url,
			        snippet_text:yelpResult[c].snippet_text,   
			        photo:yelpResult[c].image_url,
			        phone:yelpResult[c].phone,
			        lat:yelpResult[c].location.coordinate.latitude,
			        lng:yelpResult[c].location.coordinate.longitude,
			        distance:distance,
			     };				     
			 }
			
			data = math.sortArrayByDistance(data);
			
			//math.saySomething("hola");
			
			//send all the data array to the next window
			if (data.length != 0) {
				var titleLabel = Titanium.UI.createLabel({
					text:int_nearby_title,
					textAlign:"center",
					color:"#23353b",
					font: {fontSize: 14, fontFamily: "Helvetica Neue", color:"#000", fontWeight:"bold"},
					shadowColor: "#f5f9ef",
					shadowOffset: {x:0,y:1}
				});	
				
				var winYelpResults = Ti.UI.createWindow({
					url: "winyelpresults.js",
					title: int_nearby_title,
					data: data,
					//barColor: "#045cb0",
					barImage: "images/bg_bargrey.png",
					leftNavButton: btnBack,
					currLocation: currLocation,
					currRegion: currRegion,
					navBarHidden: false
				});
				winYelpResults.setTitleControl(titleLabel);
				Ti.UI.currentTab.open(winYelpResults);
				viewActInd.visible = false;
			} else {
				alert(int_text_nomatches);
				viewActInd.visible = false;
			}			
		}
		catch(E){
			alert(E);
		}	
	});
	
});//tv.addEventListener


/* ******************** */
/* Update category list */
/* ******************** */
//go through each category and display the number of results when window finishes loading
/*
win.addEventListener('open', function()
{
	for (var i=0; i < catArray.length; i++) {
		//call function that will pass the category code, make the call to the api, create the results array, get the number of results, region suggested and more.
		var catResults = categoryResults(catArray[i].code);
		
		Ti.API.info("categoryResults(catArray[i].code): "+ categoryResults(catArray[i].code));
		Ti.API.info("catResults: "+ catResults);
		
		tv.data[0].rows[i].lblActivity.hide();
		tv.data[0].rows[i].resultsLabel.text = "("+catResults+")";
	}   
});
*/

/* ***************************** */
/* Create the activity indicator */
/* ***************************** */
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

win.add(viewActInd);
viewActInd.add(viewActIndBkg);
viewActInd.add(actInd);
actInd.show();	//show activity indicator

/* ************************ */
/* Functions for categories */
/* ************************ */
//function that pulls results from the Yelp API
function categoryResults(catCode){
	var totalResult = 0;
	
	// set the variables for the yelp api request
	var latlong = currLocation.lat+','+currLocation.lng; //example: '18.28,-66.7';
	var limit = '20'; //results limit
	var radius = Ti.App.Properties.getString("distRadius"); //results in miles
	radius = radius*1609; //convert miles to meters, which is the unit required by the yelp api.
	
	Ti.API.info("radius:"+radius);
	
	parameters = [];
	parameters.push(['ll', currLocation.lat+','+currLocation.lng]);
	parameters.push(['limit', limit]);
	parameters.push(['radius_filter', radius]);
	parameters.push(['category_filter', catCode]);
		
	//var oauth = new TitaniumOAuth('Consumer key','Consumer secret', 'accessToken', 'accessTokenSecret');
	var oauth = new TitaniumOAuth('XF2XqHdgt3CZ5gHIYIWl3w','rXptjholWWEEeLRvXgcQXwXoGJY', 'es5mA2LXxs8rQczEoO0ME16VH06p2mgy', '0DbKoQM4XclMae18b5E9lTH4KnM');
	
	var options = {
	            method: 'GET',
	            action: 'http://api.yelp.com/v2/search?',
	            parameters: parameters
	        };
	
	//make the actual request and get the site's response
	oauth.request(options, function(data){
		//Ti.API.info(data);
		try{
			//get the result and parse it
			var yelpResultJson = JSON.parse(data);
			totalResult = yelpResultJson.total;
			
			Ti.API.info( "totalResult: " + totalResult );
		}
		catch(E){
			alert(E);
		}	
	});//oauth
	
	return totalResult;
}//categoryResults(catCode)
