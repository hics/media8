
var ui = require('lib/ui');
var optionsMenu = require('lib/optionsMenu');
var menuBar = require('lib/menuBar');

//This is the main window for the flow of our application
var win = Ti.UI.currentWindow;

//Internationalization variables
var int_img_welcome = L('img_welcome');
var int_carr_ext = L('carr_ext');
var int_gallery_noconn1 = L('gallery_noconn1');
var int_gallery_noconn2 = L('gallery_noconn2');
var int_close = L('close');
var int_img_welcometipsfacts = L('img_welcometipsfacts');

/* ************* */
/* Main Elements */
/* ************* */
var tabGroup = win.tabGroup;

var bar = menuBar.menuBar('Puerto Rico does it better');
win.add(bar);



var image = Titanium.UI.createImageView({
	image:int_img_welcome,
	width: '100%',
	height: '100%',
	top:bar.height,
	//bottom:0,
	zindex:-1
});

win.add(image);

//var tipsFactsWindow = ui.mkWinNavBtns("winWelcomeTipsFacts.js");
//var galleryWindow = ui.mkWinNavBtns("winGallery.js");
//var transportationWindow = ui.mkWinNavBtns("winTransportation.js");
//var pocketGuideWindow = ui.mkWinNavBtns("winPocketGuide.js");

//selected initial option
var selectedItem = 3;

/* **************** */
/* Create carrousel */
/* **************** */
/*var carrouselView = Ti.UI.createView({
	width: "100%",
	height: 100,
	bottom: 60,
	//backgroundColor: "black"
	backgroundColor: "transparent"
});*/
var carrouselView = Ti.UI.createView({
	//width: "50%",
	height: 300,
	bottom: 0,
	//backgroundColor: "red",
	layout:'horizontal',
	
	//backgroundColor: "transparent"
});
win.add(carrouselView);



var images = [];
for (var c=0;c<8;c++)
{
	images[c]='images/imageview/'+c+int_carr_ext;
}
function selectMenu(e){
	switch(e)
		{
			case 0:
				//go to Tips
				openTipsFacts(false);
				break;
			case 1:
				//go to Key Facts
				openTipsFacts(true);
				break;
			case 2:
				//go to Transportation
				Ti.UI.currentTab.open(transportationWindow);//**** mostrar text para la segunda opcion nada mas!
				break;
			case 3:
				//go to Nearby
				tabGroup.setActiveTab(1);
				break;
			case 4:
				//go to translator
				tabGroup.setActiveTab(2);
				break;
			case 5:
				//go to Gallery
				if(checkConnection() == false){
					Ti.UI.createAlertDialog({title:int_gallery_noconn1, message:int_gallery_noconn1, buttonNames:[int_close]}).show();
				}else{
					Ti.UI.currentTab.open(galleryWindow);
				}
				break;
			case 6:
				//go to pocketGuideWindow
				if(checkConnection() == false){
					Ti.UI.createAlertDialog({title:int_gallery_noconn1, message:int_gallery_noconn1, buttonNames:[int_close]}).show();
				}else{
					Ti.UI.currentTab.open(pocketGuideWindow);
				}
				break;
			case 7:
				//go to Settings
				tabGroup.setActiveTab(3);
				break;
		}//switch
	
}
//carrouselView.add(cfview);
function minimize(scrollView, e, r){
	var num = e.currentPage;
	for(var i=0; i<scrollView.views.length; i++){
			if(Math.round(e.currentPage)!=i){
				var matrix = Ti.UI.create2DMatrix();
  				matrix = matrix.scale(r);
  				var a = Ti.UI.createAnimation({
    			transform : matrix,
    			//autoreverse: true,
   	 			duration :500,
  				});
  				scrollView.views[i].animate(a);
			}
		}
}

var rows = new Array();
for(var i=0; i<images.length; i++ ){
	
		
	rows[i] = Ti.UI.createImageView({image:images[i],right:0, layout:'composite', borderWidth: 0, borderColor:'red'});
	
	rows[i].addEventListener('singletap',function(e){
	//	alert(e.source.number);
	var matrix = Ti.UI.create2DMatrix();
  	matrix = matrix.scale(1.4);
  	var a = Ti.UI.createAnimation({
    	transform : matrix,
    	autoreverse: true,
   	 	duration : 250,
   	 	//repeat: 1, 	
  	});
  	selectMenu(this.number);
	this.animate(a, function(){
		alert("asda");
		//selectMenu(this.number);
	});
	
  
});
	//rows[i].centerx=0 ;,height: Ti.UI.SIZE, width:150
	//height:100, width:100,  right:0, left:0, top:0,number:i,,height: Ti.UI.SIZE, width: Ti.UI.SIZE 
}


// create coverflow view with images
/*
if(Ti.Platform.osname=="iphone"||Ti.Platform.osname=="ipad"){
var cfview = Ti.UI.iOS.createCoverFlowView({
	images: images,
	height: 120,
	width: 320,
	backgroundColor:'transparent',
	selected: selectedItem
});
cfview.addEventListener('change',function(e)
{
	//alert("image changed: "+e.index+', selected is '+cfview.selected);
	selectedItem = cfview.selected;
});
// change listener when active image changes


// click listener - when image is clicked
cfview.addEventListener('click',function(e)
{
	//alert("image clicked: "+e.index+', selected is '+cfview.selected);
	
	//we want to go to the option only when the image clicked is the selected image.
	if( selectedItem === cfview.selected){
		//alert("now we can go to option");
			
		selectMenu(e.index);
	}//if

});
carrouselView.add(cfview);
}
else */
if(Ti.Platform.osname=="android"){
/*var scrollView = Ti.UI.createScrollView({
	//views:[handMade,natural,panCrust,stuffedCrust,thinNCrispy],
	//views: table,
	//showPagingControl:true,
	//pagingControlAlpha: .1,
	//pagingControlColor: 'gray',
	//backgroundColor:'black',
	//clipViews:false,
	//bottom: 0,
	//top:180,
	//width: '100%',
	//left:30,
	//right:30,
	height:'100%',
	//contentWidth: 800,
	contentOffset: { x:600, y:0},
	//contentHeight: rows[0].height, 
	layout: 'horizontal',
	scrollType: 'horizontal',
	//bottom:0,
	//horizontalWrap: false,
	opacity:100
});*/
var scrollView = Ti.UI.createScrollableView({
	//views:[handMade,natural,panCrust,stuffedCrust,thinNCrispy],
	//views: table,
	showPagingControl:true,
	//pagingControlAlpha: .1,
	//pagingControlColor: 'gray',
	//backgroundColor:'black',
	showPagingControl:true,
	//clipViews:false,
	//bottom: 0,
	//top:180,
	//width: '100%',
	//left:30,
	//right:30,
	layout: 'absolute',
	//scrollType: 'horizontal',
	//bottom:0,
	//horizontalWrap: false,
	opacity:100
});
//for(var i=0; i<rows.length; i++){
	//rows[i].left=(i*rows[i].width)+scrollView.width;

	//scrollView.add(rows[i]);
	
//}
scrollView.scrollToView(selectedItem);
scrollView.setViews(rows);

//scrollView.updateLayout({contentWidth: rows[0].width,contentHeight: rows[0].height, width: 100});
scrollView.addEventListener('scroll', function(e)
{ 
	//minimize(scrollView,e,.2);
	if(e.currentPageAsFloat%1==0){
	
	//	alert("ended");
 	/*var matrix = Ti.UI.create2DMatrix();
  	matrix = matrix.scale(1.4);
  	var a = Ti.UI.createAnimation({
    	transform : matrix,
    	//autoreverse: true,
   	 	duration : 500,
   	 	repeat: 1, 	
  	});

  	e.view.animate(a, function () {
	var stopAnim  = Titanium.UI.createAnimation();  
	e.view.animate(stopAnim);
	});*/
	//minimize(scrollView,e,1);
	}
	});
scrollView.addEventListener('clisk', function(e)
{ 
		alert(e.source.number);
});


scrollView.visible=true;
/*scrollView.addEventListener('singletap',function(e){
	//	alert(e.source.number);
	var matrix = Ti.UI.create2DMatrix();
  	matrix = matrix.scale(1.4);
  	var a = Ti.UI.createAnimation({
    	transform : matrix,
    	autoreverse: true,
   	 	duration : 250,
   	 	repeat: 1, 	
  	});

  	selectMenu(e.source.number);
});*/

//scrollView.views[0].animate({transform: Ti.UI.create2DMatrix({scale: 1.4})});
carrouselView.add(scrollView);

}






/* ********************* */
/* Create custom toolbar */
/* ********************* */
var toolBar = ui.mkbarGrey();
toolBar.bottom = 0;
//button
var mkButton = function(sourceImg) {
	return Ti.UI.createButton({
		backgroundImage:sourceImg,
		width:300,
		//left:70,
		top:0,
		height:45,
		
	});
}
var btn1 = mkButton(int_img_welcometipsfacts);

toolBar.add(btn1);

btn1.addEventListener('click',function(e)
{
	//Ti.API.info("Click aca ");
	openTipsFacts(false);
});

function openTipsFacts(kfSelected){
	tipsFactsWindow.keyFactsSelected = kfSelected;
	Ti.UI.currentTab.open(tipsFactsWindow);
}

win.add(toolBar);

//check the network connection status
function checkConnection(){
	var network = Titanium.Network;
	 
	// NETWORK CONNECTION CHECK
	if (network.online == false) {
	    //Ti.UI.createAlertDialog({title:'No Cellular Data Network', message:'Please connect to a cellular data network.', buttonNames:['Close']}).show();
	    return false;
	}else{
		//alert("Connected!");
		return true;
	}
}



var options = optionsMenu.optMenu(win);


/*
var cArgs = Ti.App.getArguments();

	
if( cArgs['url'] == 'prpocket://trans'){
	Ti.UI.currentTab.open(transportationWindow);	
}
	
Ti.App.addEventListener('resumed',function() {
    Ti.API.info( Ti.App.getArguments() );
    //alert( Ti.App.getArguments() );
    
	var cArgs = Ti.App.getArguments();
	
	if( cArgs['url'] == 'prpocket://trans'){
		Ti.UI.currentTab.open(transportationWindow);	
	}
	
});
*/
