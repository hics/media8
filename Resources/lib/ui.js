//create a Grey Bar to be positioned after it is created, it can act as a tool bar or nav bar
exports.mkbarGrey = function() {
	return Ti.UI.createView({
		backgroundImage:'images/bg_bargrey.png', //Use your favorite background image (better with rectangle).
		right:0,
		left:0,
		height:50
	});
}
exports.mkbarGreyTitle = function(titleText) {
	var bar= Ti.UI.createView({
		backgroundImage:'images/bg_bargrey.png', //Use your favorite background image (better with rectangle).
		right:0,
		left:0,
		height:50
	});
	bar.add(Ti.UI.createLabel({
		text:titleText,
		textAlign:"center",
		color:"#23353b",
		font: {fontSize: 14, fontFamily: "Helvetica Neue", color:"#23353b", fontWeight:"bold"},
		shadowColor: "#f5f9ef",
		shadowOffset: {x:0,y:1}
	}));
	return bar;

}
exports.mkBackButtonGrey = function(sourceImg) {
	return Ti.UI.createButton({
		backgroundImage:sourceImg,
		width:50,
		height:30,
		left:7,
		top:10
	});
}

exports.mkWinNavBtns = function(sourceWin) {
	return Ti.UI.createWindow({
		url: sourceWin,
		navBarHidden: true
	});
}

//activity indicator
exports.mkActIndicator = function(sourceWin) {
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
	
	viewActInd.add(viewActIndBkg);
	viewActInd.add(actInd);
	
	return viewActInd;
}