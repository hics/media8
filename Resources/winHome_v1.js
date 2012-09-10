//This is the main window for the flow of our application
var win = Ti.UI.currentWindow;

var image = Titanium.UI.createImageView({
	image:'images/welcome_image.png',
	width: 320,
	height: 412
});

win.add(image);
