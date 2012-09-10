//create the tips tableview
exports.createTipsTable = function() {
	/* ************************************************************* */
	/* Get content from the json file and define function to load it */
	/* ************************************************************* */	
	//get results from the json file
	var int_json_tips = L('json_tips');
	var factsJson = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,int_json_tips);
	
	var parsedData = [];
	if (factsJson.exists()){
	    //Store data to be parsed
	    var preParseData = (factsJson.read().text);
	 
	    //Parse data
	    parsedData = eval('('+preParseData+')');   
	}else{
		alert("Oops! Can't get the key facts.");
	}
		
	var dataTip = [];
	for (var c=0;c<parsedData.length;c++)
	{
		var row = Ti.UI.createTableViewRow({
			height:"auto",
			leftImage:"images/icon_tips.png",
			selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		var lblTitle = Ti.UI.createLabel({
			text: parsedData[c].title,
			color: '#39878c',
			textAlign:'left',
			top:8,
			left:41,
			width: 'auto',
			height:'auto',
			font:{fontWeight:'bold',fontSize:13}
		});
		row.add(lblTitle);
	
		var lblText = Ti.UI.createLabel({
			text: parsedData[c].text,
			color: '#000',
			textAlign:'left',
			font:{fontSize:12},
			top:25,
			bottom: 8,
			left:41,
			right:50,
			height:'auto'
		});
		row.add(lblText);
	
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
		
		dataTip[c]=row;
	}
	
	var tipsTable = Titanium.UI.createTableView({
		data:dataTip,
		top: 0,
		left: 0,
		width: 320,
		height:361,
		backgroundColor:'white',
		separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
		rowBackgroundColor:'white'
	});
	
	return tipsTable;
}

//create the tips tableview
exports.createFactsView2 = function() {
	/* ************************************************************* */
	/* Get content from the json file and define function to load it */
	/* ************************************************************* */	
	//get results from the json file
	var int_json_facts = L('json_facts');
	var factsJson = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,int_json_facts);
	
	var parsedData = [];
	if (factsJson.exists()){
	    //Store data to be parsed
	    var preParseData = (factsJson.read().text);
	 
	    //Parse data
	    parsedData = eval('('+preParseData+')');   
	}else{
		alert("Oops! Can't get the key facts.");
	}
		
	var dataTip = [];
	for (var c=0;c<parsedData.length;c++)
	{
		var row = Ti.UI.createTableViewRow({
			height:"auto",
			leftImage:"images/icon_fact.png",
			selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		var lblTitle = Ti.UI.createLabel({
			text: parsedData[c].title,
			color: '#39878c',
			textAlign:'left',
			top:8,
			left:41,
			width: 'auto',
			height:'auto',
			font:{fontWeight:'bold',fontSize:13}
		});
		row.add(lblTitle);
	
		var lblText = Ti.UI.createLabel({
			text: parsedData[c].text,
			color: '#000',
			textAlign:'left',
			font:{fontSize:12},
			top:25,
			bottom: 8,
			left:41,
			right:50,
			height:'auto'
		});
		row.add(lblText);
	
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
		
		dataTip[c]=row;
	}
	
	var tipsTable = Titanium.UI.createTableView({
		data:dataTip,
		top: 0,
		left: 320,
		width: 320,
		height:361,
		backgroundColor:'white',
		separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
		rowBackgroundColor:'white'
	});
	
	return tipsTable;
}

//create the key facts tableview
exports.createFactsView = function() {
	// current key fact item
	var currentItem = 0;
	
	/* ********************************************************************* */
	/* Create the view that will contain the images and arrows for the facts */
	/* ********************************************************************* */
	var imageContainerView = Ti.UI.createView({
		backgroundImage:'images/bg_welcome_factsImage.jpg', //Use your favorite background image (better with rectangle).
		top:0,
		left:0,
		width:320,
		height:147
	});	
	
	var leftArrow = Titanium.UI.createButton({
		backgroundImage:'images/arrowPrevious_welcome_factsImage.png',
		top:62,
		left:20,
		width:15,
		height:21
	});
	var rightArrow = Titanium.UI.createButton({
		backgroundImage:'images/arrowNext_welcome_factsImage.png',
		top:62,
		right:20,
		width:15,
		height:21
	});
	var keyImageView = Ti.UI.createImageView({
		//image:'images/ph_welcome_factsImage.png',
		top:11,
		height:121,
		width:208,
		borderColor:"#181818",
		borderWidth:1
	});
	
	imageContainerView.add(leftArrow);
	imageContainerView.add(rightArrow);
	imageContainerView.add(keyImageView);
	
	/* ******************************************************* */
	/* Create the view that will contain the key facts content */
	/* ******************************************************* */	
	var titleRow = Ti.UI.createTableViewRow({height:"auto",selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE});
	var lblTitle = Ti.UI.createLabel({
		//text: 'The new Puerto Rico Convention Center is the largest in the Caribbean and the most technologically advanced.',
		color: '#000',
		textAlign:'left',
		top:21,
		left:20,
		right:20,
		width: 'auto',
		height:'auto',
		font:{fontWeight:'bold',fontSize:13}
	});
	titleRow.add(lblTitle);
		
	var textRow = Ti.UI.createTableViewRow({height:"auto"});
	var lblText = Ti.UI.createLabel({
		//text: "Meeting in Puerto Rico will never be the same. The Puerto Rico Convention Center is the largest in the Caribbean and the most technologically advanced throughout both the Caribbean and Latin America. Boasting 580,000 square feet of total space, the Center can accommodate groups of up to 10,000, in an ideal setting at the gateway to all the Island has to offer. Yes, we're open!",
		color: '#000',
		textAlign:'left',
		top:21,
		bottom:21,
		left:20,
		right:20,
		width: 'auto',
		height:'auto',
		font:{fontSize:12}
	});	
	textRow.add(lblText);

	//Key Facts View
	var factContentView = Titanium.UI.createTableView({
		data:[titleRow,textRow],
		width:320,
	    contentHeight:'auto',
	    top:147,
	    backgroundColor: "white",
		separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
	    showVerticalScrollIndicator:true
	});
	
	/* ************************************************************* */
	/* Get content from the json file and define function to load it */
	/* ************************************************************* */	
	//get results from the json file
	var factsJson = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'json/welcome_facts.json');
	
	var parsedData = [];
	if (factsJson.exists()){
	    //Store data to be parsed
	    var preParseData = (factsJson.read().text);
	 
	    //Parse data
	    parsedData = eval('('+preParseData+')');   
	}else{
		alert("Oops! Can't get the key facts.");
	}	
	
	//function to load the content of the json file into the corresponding areas.
	function loadContent(index, direction){
		//if the user requests to see the next fact
		if(direction == "right"){
			//if already in last item, do nothing
			if( parsedData.length-1 === index){
				//alert("do nothing");
				//do nothing
				currentItem = parsedData.length-1;
			}else{
				currentItem = index;
				currentItem++;
					
				keyImageView.image = parsedData[currentItem].image;
				lblTitle.text = parsedData[currentItem].title;
				lblText.text = parsedData[currentItem].text;
				
				//alert("parsedData.length:"+parsedData.length+"---index:"+currentItem);
		
				//if jumped to last item, remove right arrow and do nothing
				if( (parsedData.length-1) === currentItem ){
					rightArrow.visible = false;					
				}else{//else, keep arrows visible
					rightArrow.visible = true;
					leftArrow.visible = true;
				}
			}//else
		}else if(direction == "left"){//if the user requests to see the previous fact
			//if already in last item, do nothing
			if( index === -1){
				//alert("do nothing");
				//do nothing
				currentItem = 0;
			}else{
				currentItem = index;
				currentItem--;
				
				keyImageView.image = parsedData[currentItem].image;
				lblTitle.text = parsedData[currentItem].title;
				lblText.text = parsedData[currentItem].text;
				
				//alert("parsedData.length:"+parsedData.length+"---index:"+currentItem);
				
				//if jumped to last item, remove left arrow
				if( currentItem === 0 ){
					leftArrow.visible = false;
				}else{//else, keep arrows visible
					rightArrow.visible = true;
					leftArrow.visible = true;
				}
			}//else
		}else{//if no direction is given, it has been called for the first time to load the first item
			keyImageView.image = parsedData[index].image;
			lblTitle.text = parsedData[index].title;
			lblText.text = parsedData[index].text;
			leftArrow.visible = false;	
		}//else
	}//function
	
	//start function with first item
	loadContent(currentItem, "");
	//arrow buttons
	leftArrow.addEventListener('click',function(e)
	{
		loadContent(currentItem, "left");
	});
	rightArrow.addEventListener('click',function(e)
	{
		loadContent(currentItem, "right");
	});
	
	/* ****************************************************** */
	/* Create the actual view of all of the key facts section */
	/* ****************************************************** */
	var factsView = Ti.UI.createView({
		top: 0,
		left:320,
		width: 320,
		height:361,
		backgroundColor:'white'
	});	

	var swiped = null;

	//swipe listener
	factsView.addEventListener('swipe', function(e){
		swiped = e.direction;
	});	
	factsView.addEventListener('touchend', function(e){
		if(swiped){
			if(swiped == "right"){//move content to the left
				loadContent(currentItem, "left");
			}
			if(swiped == "left"){//move content to the right
				loadContent(currentItem, "right");
			}
		}
		swiped = false;
	});	
 	
	//add the two main views to the facts main view
	factsView.add(imageContainerView);
	factsView.add(factContentView);
	
	return factsView;
}