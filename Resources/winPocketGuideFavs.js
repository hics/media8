var ui = require('lib/ui');
var funcMod = require('lib/functionsModule');

var win = Ti.UI.currentWindow;
var userID = win.userid;

win.backgroundColor = "#fff";

//Internationalization variables
var int_btn_back = L('btn_back');
var int_pg_remove = L('pg_remove');
var int_pg_feed = L('pg_feed');

/* **************************************** */
/* Create Activity Indicator with Listeners */
/* **************************************** */
var viewActIndFavs = ui.mkActIndicator();

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

/* ********************* */
/* Get the favorites XML */
/* ********************* */
var xhr = Titanium.Network.createHTTPClient();

xhr.onload = function()
{
	//Ti.API.info('Seepuertorico xml ' + this.responseXML + ' text ' + this.responseText);
	var doc = this.responseXML.documentElement;
	var elements = doc.getElementsByTagName("node");
	populateTable(elements);
};
	
xhr.onerror = function(e)
{
	Ti.API.info(e.error);
	viewActIndFavs.visible = false;
	alert("Network error: "+e.error);
};

// open the client
xhr.open('GET',int_pg_feed+userID);

// send the data
xhr.send();

/* *************************** */
/* Run populate table with XML */
/* *************************** */
function populateTable(elements){
	var tv = Ti.UI.createTableView({
		backgroundColor: "transparent",
		top: 50
	});
	win.add(tv);
	
	//var data = [];
	//data[0] = {title: "Flamenco Beach", description: "Shopping in San JuanWhether you want global brand names or local arts and crafts, shopping in San Juan is a delight. Visit Plaza Las Américas, the largest shopping center in the Caribbean, pick up a folkloric demon mask or wooden saint figurine, and browse the boutiques of some of the region’s most acclaimed fashion designers. You can also find excellent bargains on jewelry and outlet stores of your favorite brands.", image: "http://site2012.seepuertorico.com/sites/default/files/blog/Big-Time-Rush.gif", region: "Culebra", address:"Lorem Ipsum 520, San Juan"};
	//data[1] = {title: "Arecibo Observatory", description: "Arecibo Observatory The world’s largest single-dish radio telescope, the Arecibo Observatory has been responsible for many notable findings in radio astronomy and planetary radar and terrestrial aeronomy. A tour of this unique attraction does more than channel your inner astronaut; it’s a chance to explore a true marvel of engineering.", image: "http://site2012.seepuertorico.com/sites/default/files/blog/Big-Time-Rush.gif", region: "Porta Atlántico", address:"Lorem Ipsum 520, San Juan"};
	//data[2] = {title: "Outlet Shopping", description: "Las Cabezas de San JuanThe northeastern-most point of Puerto Rico is worth a full day’s exploration. After visiting its lighthouse and the nearby Seven Seas Beach, wait until sundown to kayak out into a glow-in-the-dark bioluminescent bay.", image: "http://site2012.seepuertorico.com/sites/default/files/blog/Big-Time-Rush.gif", region: "Porta del Sol", address:"Lorem Ipsum 520, San Juan"};
	    
	//go through each result and create labels
	for (var i=0; i < elements.length; i++) {
		var row = Ti.UI.createTableViewRow({
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
			height:120
		});
		
		//alternate background
		if( (i%2) == 0){
			var bgColor = "#f7f7f7";
		}else{
			var bgColor = "#fff";
		}	
		var viewBkg = Ti.UI.createView({
			width: "100%",
			height: "100%",
			backgroundColor: bgColor
		});
		
		var theImage = "";
		//alert("The exact content is:---"+elements.item(i).getElementsByTagName("image2").item(0));
		if( elements.item(i).getElementsByTagName("image1").item(0).text.length > 1){
			theImage = elements.item(i).getElementsByTagName("image1").item(0).text;
		}
		if( elements.item(i).getElementsByTagName("image2").item(0).text.length > 1){
			theImage = elements.item(i).getElementsByTagName("image2").item(0).text;
		}
		if( elements.item(i).getElementsByTagName("image3").item(0).text.length > 1){
			theImage = elements.item(i).getElementsByTagName("image3").item(0).text;
		}
		Ti.API.info(theImage);
		var imgItem = Ti.UI.createImageView({
			image: theImage,
			width: 62,
			height: 39,
			left: 10,
			top: 12,
			visible: true
		});
	
		var btn_remove = Titanium.UI.createButton({
			color:'#23353b',
			backgroundImage:'images/bg_button_kaki.png',
			backgroundSelectedImage:'images/bg_button_kaki_selected.png',
			left: 10,
			top: 59,
			width:59,
			height:23,
			borderWidth: 1,
			borderRadius: 5,
			borderColor: "black",
			font:{fontSize:11,fontWeight:'bold',fontFamily:'Helvetica Neue'},
			title:int_pg_remove,
			deleteLink: elements.item(i).getElementsByTagName("unflaglink").item(0).text,
			visible: true
		});
	
		var lblTitle = Ti.UI.createLabel({
			text: elements.item(i).getElementsByTagName("title").item(0).text,
			left: 85,
			top: 12,
			width: 220,
			height: 20,
			color: "#398795",
			//backgroundColor: 'gray',
			font: {fontSize: 12, fontWeight:'bold', fontFamily: "Arial"}
		});
	
		var lblDescShort = Ti.UI.createLabel({
			text: elements.item(i).getElementsByTagName("description").item(0).text,
			width: 215,
			height: 40,
			left: 85,
			top: 32,
			textAlign: "left",
			color: "#333333",
			//backgroundColor: "gray",
			font: {fontSize: 12, fontFamily: "Arial"}
		});
		
		//if no value, then hide element
		var addFlag = true;
		if( elements.item(i).getElementsByTagName("address").item(0).text.length < 2){
			addFlag = false;
		}
		var lblAddrTitle = Ti.UI.createLabel({
			text: "Address:",
			width: 50,
			height: 15,
			left: 85,
			top: 72,
			textAlign: "left",
			color: "#39878c",
			font: {fontSize: 12, fontFamily: "Arial"},
			visible: addFlag
			//bottom: 2
		});
		
		var lblAddr = Ti.UI.createLabel({
			text: elements.item(i).getElementsByTagName("address").item(0).text,
			width: 170,
			height: 15,
			left: 135,
			top: 72,
			textAlign: "left",
			color: "#333333",
			font: {fontSize: 12, fontFamily: "Arial"},			visible: addFlag
			//bottom: 2
		});
		
		//if no value, then hide element
		var regFlag = true;
		if( elements.item(i).getElementsByTagName("region").item(0).text < 2){
			regFlag = false;
		}
		var lblRegTitle = Ti.UI.createLabel({
			text: "Region:",
			//width: 45,
			height: 15,
			left: 85,
			top: 88,
			textAlign: "left",
			color: "#39878c",
			font: {fontSize: 12, fontFamily: "Arial"},
			visible: regFlag
			//bottom: 2
		});
	
		var lblReg = Ti.UI.createLabel({
			text: elements.item(i).getElementsByTagName("region").item(0).text,
			width: 165,
			height: 15,
			left: 130,
			top: 88,
			textAlign: "left",
			color: "#333333",
			font: {fontSize: 12, fontFamily: "Arial"},
			visible: regFlag
		});
		
		//if there is no address or region, do some changes
		if( (addFlag == false ) && (regFlag == false) ){
			row.height = 95;
			//viewBkg.backgroundColor = "gray";
		} else if( (addFlag == false ) && (regFlag == true) ){
			lblRegTitle.top = 72;
			lblReg.top = 72;
			row.height = 100;
		}
		//row.height = lblDescShort.height+85;
		
		row.add(viewBkg);
		row.add(imgItem);
		row.add(btn_remove);
		row.add(lblTitle);
		row.add(lblDescShort);
		row.add(lblAddrTitle);
		row.add(lblAddr);
		row.add(lblRegTitle);
		row.add(lblReg);
		tv.appendRow(row);
		win.add(viewActIndFavs);
		viewActIndFavs.children[1].show();
	}
	
	//when clicking on row, increase to size of
	tv.addEventListener("click", function(e) {
		var index = e.index;
		var row = e.row;
		var rowdata = e.rowData;
	
		//If the source is the button, delete if not, show detail
		if(e.source.title == "Remove"){
			viewActIndFavs.visible = true;
			/* ********************* */
			/* Run php to delete item */
			/* ********************* */
			var xhrDelete = Titanium.Network.createHTTPClient();
			
			xhrDelete.onload = function()
			{
				var json = this.responseText;
				response = eval('('+json+')');
			
				if(response.operation == 1){
					//alert("let's delete index:"+index);	
					try {
						tv.deleteRow(index);
						viewActIndFavs.visible = false;
					} catch (E) {
						Ti.UI.createNotification({ message: E.message }).show();
					}
				}
			};
				
			xhrDelete.onerror = function(e)
			{
				Ti.API.info(e.error);
				alert("Network error: "+e.error);
				viewActIndFavs.visible = false;
			};
			// open the client
			xhrDelete.open('GET',e.source.deleteLink);
			// send the data
			xhrDelete.send();
		}else{// show detail
			//open the detail window
			var winPocketGuideFavsDetail = Ti.UI.createWindow({
				url: "winPocketGuideFavsDetail.js",
				title: "My Pocket Guide",
				barImage: "images/bg_bargrey.png",
				navBarHidden: true,
				rowdata: rowdata
			});
			Ti.UI.currentTab.open(winPocketGuideFavsDetail);
		}
	});
}

