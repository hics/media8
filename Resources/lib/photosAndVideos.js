//create the tips tableview
exports.createPhotosGrid = function() {
	//Internationalization variables
	var int_btn_back = L('btn_back');

	// create table view
	var tableview = Titanium.UI.createTableView({top:5, left:2,backgroundColor: "black", separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE});
	
	Ti.App.fireEvent("show_indicator");
	
	// add table view to the window
	//http://site2012.seepuertorico.com/mobileServices/opentable_setphotos.xml
	var resultLimit = 52;
	
	//Titanium.Yahoo.yql('select * from flickr.photos.search(200) where user_id = "67846921@N06" and api_key="728d00593eb4a7f583fd6656de6d9147" limit '+resultLimit,function(e)
	Titanium.Yahoo.yql('use "http://site2012.seepuertorico.com/mobileServices/opentable_setphotos.xml" as photosets; select * from photosets('+resultLimit+') where photoset_id="72157629696525779"',function(e)
	{
		var images = [];
		var data = e.data;
		//alert(data.photoset.photo.length);
		//(data.photoset.photo[0].farm);
		
		if (data == null)
		{
			Titanium.UI.createAlertDialog({
				title: 'Error querying YQL',
				message: 'No data could be retrieved using YQL' }).show();
			Ti.App.fireEvent('hide_indicator');
			return;
		}
		
		// to fit in a 320-wide space 
		var cellWidth = 77;
		var cellHeight = 77;
		var xSpacer = 8;
		var ySpacer = 2;
		var xGrid = 4;
		//var yGrid = (data.photo.length/xGrid);
		var yGrid = (data.photoset.photo.length/xGrid);

		var cellIndex = 0;
		var rowIndex = 0;

		for (var c=0;c<yGrid;c++)
		{
			 //alert("yGrid is: "+yGrid);
			// form the flickr url
			//var url = 'http://farm' + data.photo[c].farm + '.static.flickr.com/' + data.photo[c].server + '/' + data.photo[c].id + '_' + data.photo[c].secret + '_m.jpg';
			//Ti.API.info("flickr url = "+url);
			
			var row = Ti.UI.createTableViewRow({
		        className: "grid",
		        layout: "horizontal",
		        height: cellHeight+(2*ySpacer)
			});
			
		    for (var x=0; x<xGrid; x++){
		    	//if(cellIndex<resultLimit){
		    	if(cellIndex<data.photoset.photo.length){
			 		//alert("xGrid is: "+xGrid+" and cellIndex is: "+cellIndex+" and rowIndex+x is: "+(rowIndex+x));
			        var thisView = Ti.UI.createView({
			            //objName:"grid-view",
			            //objIndex:cellIndex.toString(),
			            backgroundColor: "black",
			            left: ySpacer,
			            height: cellHeight,
			            width: cellWidth
			        });
					var image = Ti.UI.createImageView({ 
			            objName:"grid-Image",
			            objIndex:cellIndex.toString(),
						//image: 'http://farm' + data.photo[rowIndex+x].farm + '.static.flickr.com/' + data.photo[rowIndex+x].server + '/' + data.photo[rowIndex+x].id + '_' + data.photo[rowIndex+x].secret + '_m.jpg',
						image: 'http://farm' + data.photoset.photo[rowIndex+x].farm + '.static.flickr.com/' + data.photoset.photo[rowIndex+x].server + '/' + data.photoset.photo[rowIndex+x].id + '_' + data.photoset.photo[rowIndex+x].secret + '_m.jpg',
						width:77
					});
					
			        thisView.add(image);
			        row.add(thisView);
			        cellIndex++;
				}
		    }
		    
			rowIndex = rowIndex + 4;
			
			//row.add(image);
			//row.add(title);
			images[c] = row;
		}	
		
		tableview.setData(images);
	
		tableview.addEventListener("click", function(e){
			//alert("clicked source: "+e.source.objIndex);
		    if(e.source.objName = "grid-Image"){
		        //alert("---> " + e.source.objName+e.source.objIndex + " was clicked!");
		        
				var image = Ti.UI.createImageView({
					image: 'http://farm' + data.photoset.photo[e.source.objIndex].farm + '.static.flickr.com/' + data.photoset.photo[e.source.objIndex].server + '/' + data.photoset.photo[e.source.objIndex].id + '_' + data.photoset.photo[e.source.objIndex].secret + '_m.jpg', 
				    //image: "images/ph_welcome_factsImage.png",
				    rotateGesture:false,
				    pinchGesture:true,
				    panGesture:true,
				    recognizeSimultaneously:true
				});
						
				var lastAngle = 0.0;
				var currentAngle = 0.0;
				
				var lastScale = 1.0;
				var currentScale = 1.0;
				
				var currentTranslation = {x:0.0, y:0.0};
				var lastTranslation = {x:0.0, y:0.0};
				
				function updateTransform(image)
				{
				    var transform = Ti.UI.create2DMatrix().scale(lastScale*currentScale).rotate(lastAngle+currentAngle);
				        
				    transform.tx = lastTranslation.x+currentTranslation.x;
				    transform.ty = lastTranslation.y+currentTranslation.y;
				
					image.transform = transform;
				};
				
				image.addEventListener('rotate', function(e){
				    currentAngle = e.rotation / Math.PI * 180.0;
					updateTransform(image);
				});
				
				image.addEventListener('rotateend', function(e){
				    lastAngle = (lastAngle + currentAngle) % 360.0;
				    currentAngle = 0.0;
				});
				
				image.addEventListener('pinch', function(e){
				    currentScale = e.scale;
				    updateTransform(image);
					//alert("pinch event");
				});
				
				image.addEventListener('pinchend', function(e){
				    lastScale = (lastScale * currentScale);
				    currentScale = 1.0;
				    //Ti.API.debug("pinchend event occurred.");
					alert("pinchend event");
				});
				
				image.addEventListener('pan', function(e){
					currentTranslation.x = e.translation.x;
					currentTranslation.y = e.translation.y;
					updateTransform(image);
				});
				
				image.addEventListener('panend', function(e){
				    lastTranslation.x = lastTranslation.x + currentTranslation.x;
				    lastTranslation.y = lastTranslation.y + currentTranslation.y;
				    currentTranslation.x = 0.0;
				    currentTranslation.y = 0.0;
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

				var windowImage = Titanium.UI.createWindow({
					backgroundColor: "black",
					//title: rowdata.title,
					barColor: "#2b2e2f",
					barImage: "images/bg_bargrey.png",
					navBarHidden: true
				});

				//Create the view that will contain 2 tableviews and will slide
				var theImageView = Ti.UI.createView({
					backgroundColor:'black', //Use your favorite background image (better with rectangle).
					top:50,
					width:320,
					height:361
				});

				theImageView.add(image);	
				windowImage.add(theImageView);
				windowImage.add(navBar);
		
				Titanium.UI.currentTab.open(windowImage, {animated:true});	
				btnBack.addEventListener('click', function() { 
					//windowImage.close();
					Titanium.UI.currentTab.close(windowImage, {animated:true});
				});	        
		    }
		});
	
		Ti.App.fireEvent("hide_indicator");
	}); //Titanium.Yahoo.yql

	return tableview;
}

//create the tips tableview
exports.createVideosList = function() {
	var dataVideos = [];
	
	//create the table view that will have the results
	var videosTable = Titanium.UI.createTableView({
		//data:dataVideos,
		top: 0,
		left:320,
		width: 320,
		height:361,
		backgroundColor:'grey',
		separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
		rowBackgroundColor:'white'
	});
	
	videosTable.addEventListener('click',function(e)
	{	
		//alert("gets here and e.row.url is: "+e.row.url);
		
		//Ti.App.fireEvent("show_indicator");
	   
		var webview = Ti.UI.createWebView({ 
			//innerHTML:htmlVideo
			url: e.rowData.url,
			autoplay:true
		});
		
		var windowWeb = Titanium.UI.createWindow({
			title: "YouTube",
			backButtonTitle: "Back",
			barColor: "#2b2e2f",
			barImage: "images/bg_bargrey.png",
			navBarHidden: false
		});
		
		windowWeb.add(webview);
	
		Titanium.UI.currentTab.open(windowWeb, {animated:true});
		
		windowWeb.addEventListener("close", function(e){
			//Ti.App.fireEvent("hide_indicator");
		});
	});	
	var xhr = Ti.Network.createHTTPClient();
	
	xhr.onload = function(){
		//alert(">>> got the feed! ... ");
		
		// Now parse the feed XML 
		var xml = this.responseXML;
		
		// Find the channel element 
		var items = xml.documentElement.getElementsByTagName("entry");
		
		var videoThumb;
		var videoUrl;
		var videoTitle;
		var viewCount;
		var videoDuration;
		var viewCount;
		var ratingAverage;
			
		if(items){
			//go through the entries
			for (var c=0;c<items.length;c++)
			{
				videoThumb = items.item(c).getElementsByTagName("media:group").item(0).getElementsByTagName("media:thumbnail").item(0).getAttribute("url");
				videoUrl = items.item(c).getElementsByTagName("media:group").item(0).getElementsByTagName("media:player").item(0).getAttribute("url");
				videoTitle = items.item(c).getElementsByTagName("media:group").item(0).getElementsByTagName("media:title").item(0).text;
				viewCount = items.item(c).getElementsByTagName("yt:statistics").item(0).getAttribute("viewCount");
				videoDuration = items.item(c).getElementsByTagName("media:group").item(0).getElementsByTagName("media:content").item(0).getAttribute("duration");//result in seconds
				
			 	try {
			        ratingAverage = items.item(c).getElementsByTagName("gd:rating").item(0).getAttribute("average");
			    } catch (ee) {
			        Ti.API.info("ratingAverage ee: "+ee);
			        ratingAverage = false;
			    }
			    
				var row = Ti.UI.createTableViewRow({
					url: videoUrl,
					top:0,
					height:71
					//backgroundColor:'black'
				});
				
				var image = Ti.UI.createImageView({
					image: videoThumb,
					height:71,
					width:95,
					left:0,
					//backgroundColor:'green',
					top:0
				});
				row.add(image);
				
				var lblTitle = Ti.UI.createLabel({
					text: videoTitle,
					color: '#000',
					textAlign:'left',
					top:0,
					left:105,
					width: 200,
					height:30,
					//backgroundColor:'green',
					font:{fontWeight:'bold',fontSize:13}
				});
				row.add(lblTitle);
				
				var lblViewsCount = Ti.UI.createLabel({
					text: viewCount+" Views",
					color: '#555555',
					textAlign:'left',
					top:34,
					left:185,
					width: 100,
					height:30,
					//backgroundColor:'green',
					font:{fontWeight:'normal',fontSize:11}
				});
				row.add(lblViewsCount);
				
				if(ratingAverage != false){
					var ratingImage;
					ratingAverage = parseInt(ratingAverage);
					if( ratingAverage < 1){
						ratingImage = "images/icon_youtube_0.png";
					}else if(  (ratingAverage >= 1) && (ratingAverage < 2) ){
						ratingImage = "images/icon_youtube_1.png";	
					}else if(  (ratingAverage >= 2) && (ratingAverage < 3) ){
						ratingImage = "images/icon_youtube_2.png";
					}else if(  (ratingAverage >= 3) && (ratingAverage < 4) ){
						ratingImage = "images/icon_youtube_3.png";	
					}else if(  (ratingAverage >= 4) && (ratingAverage < 5) ){
						ratingImage = "images/icon_youtube_4.png";						
					}else if( ratingAverage === 5){
						ratingImage = "images/icon_youtube_5.png";
					}
					
					var imgRating = Ti.UI.createImageView({
						image: ratingImage,
						color: '#555555',
						textAlign:'left',
						top:35,
						left:105,
						width:62,
						height:11,
						font:{fontWeight:'normal',fontSize:12}
					});
					row.add(imgRating);
				}else{
					var lblRating = Ti.UI.createLabel({
						text: "No Rating",
						color: '#555555',
						textAlign:'left',
						top:34,
						left:105,
						width:62,
						height:14,
						font:{fontWeight:'normal',fontSize:12}
					});
					row.add(lblRating);
				}
				
				
				var lblDuration = Ti.UI.createLabel({
					text: rectime(videoDuration),
					color: '#555555',
					textAlign:'left',
					top:50,
					left:105,
					width: 100,
					height:14,
					font:{fontWeight:'normal',fontSize:12}
				});
				row.add(lblDuration);	
				
				// top border
				row.add(Ti.UI.createView({
				  top: 0,
				  height: 1,
				  backgroundColor: '#fff',
				}));
				//bottom border
				row.add(Ti.UI.createView({
				  bottom: 0,
				  height: 1,
				  backgroundColor: '#e9e9e9',
				}));
				
				dataVideos[c]=row;
				
				videosTable.data = dataVideos;
			}			
		}else{
			alert("No videos found!");
			var row = Ti.UI.createTableViewRow({
				height:"auto",
				selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
			});
			
			var lblTitle = Ti.UI.createLabel({
				text: "No videos found!",
				color: '#000',
				textAlign:'left',
				top:8,
				left:41,
				width: 'auto',
				height:30,
				font:{fontWeight:'bold',fontSize:13}
			});
			row.add(lblTitle);
			
			dataVideos[0]=row
			
			videosTable.data = dataVideos;
		}
		
	};
	
	// open the client
	xhr.open("GET","https://gdata.youtube.com/feeds/api/users/prtourismco/uploads");
	
	// send the data
	xhr.send();
	
	return videosTable;	
}

function rectime(sec) {
	var hr = Math.floor(sec / 3600);
	var min = Math.floor((sec - (hr * 3600))/60);
	sec -= ((hr * 3600) + (min * 60));
	sec += ''; min += '';
	while (min.length < 2) {min = '0' + min;}
	while (sec.length < 2) {sec = '0' + sec;}
	hr = (hr)?':'+hr:'';
	return hr + min + ':' + sec;
}

/*var videoUrl = items.item(0).getElementsByTagName("media:group").item(0).getElementsByTagName("media:content").item(0).getAttribute("url");
var videoDuration = items.item(0).getElementsByTagName("media:group").item(0).getElementsByTagName("media:content").item(0).getAttribute("duration");//result in seconds
var videoThumb = items.item(0).getElementsByTagName("media:group").item(0).getElementsByTagName("media:thumbnail").item(0).getAttribute("url");
var videoTitle = items.item(0).getElementsByTagName("media:group").item(0).getElementsByTagName("media:title").item(0).text;
var ratingAverage = items.item(0).getElementsByTagName("gd:rating").item(0).getAttribute("average");
var viewCount = items.item(0).getElementsByTagName("yt:statistics").item(0).getAttribute("viewCount");
*/