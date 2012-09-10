exports.menuBar = function(title){
	var bar = Ti.UI.createView({
		height:50,
		width:'100%',
		visible:true,
		backgroundColor:'#DEDEDE',
		//backgroundImage:"images/bkg.png",
		backgroundRepeat:true,
		top:0
		//zIndex:1
	});
	
	var im = Ti.UI.createImageView({
		image: '../images/logo-small_es.png',
		top:10,
		left: 30
		//left: 60
	});
	var lab = Ti.UI.createLabel({
		text: title,
		right:100,
		color: 'black',
		top:10,
		left:  20 ,
		//5verticalAlign:TEXT_VERTICAL_ALIGNMENT_CENTER,
		//horizontalWrap:true,
		//left: im.,
		font: {font:"Helvetica", fontSize: 20, color: 'black'}
	});
	bar.layout= 'horizontal';
	bar.add(im);
	bar.add(lab);
	

	return bar;
}

