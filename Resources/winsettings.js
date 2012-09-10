var win = Ti.UI.currentWindow;

//Internationalization variables
var int_settings = L('settings');
var int_set_head1 = L('set_head1');
var int_set_text1 = L('set_text1');
var int_set_text2 = L('set_text2');
var int_btn_text1 = L('btn_text1');
var int_msg1 = L('msg1');
var int_msg2 = L('msg2');
var int_msg3 = L('msg3');
var int_msg4 = L('msg4');

//add custom font title
var titleLabel = Titanium.UI.createLabel({
	text:int_settings,
	textAlign:"center",
	color:"#23353b",
	font: {fontSize: 14, fontFamily: "Helvetica Neue", color:"#23353b", fontWeight:"bold"},
	shadowColor: "#f5f9ef",
	shadowOffset: {x:0,y:1}
});	
win.setTitleControl(titleLabel);
	
/* ************* */
/* Search Radius */
/* ************* */
//Label heading
var lblHeading = Ti.UI.createLabel({ text: int_set_head1, width:'auto', height: "auto", color: "#3c6100", font:{fontFamily: "Helvetica Neue", fontSize:13}, top: 20 });
win.add(lblHeading);
//button options
var buttonObjects = [
	{title: '1 mi.', distance:1},// in meters
	{title: '2 mi.', distance:2},
	{title: '5 mi.', distance: 5},
	{title: '10 mi.', distance: 10},
	{title: '15 mi.', distance: 15}
];
//radius button view
var bbView = Ti.UI.createView({ width:300, height:46, top:45, right:10, backgroundImage:'images/btn_view_bg.png', borderRadius:10 });
win.add(bbView);
//radius buttonbar
var bb = Ti.UI.createButtonBar({ labels:buttonObjects, style:2, backgroundColor:'#bfc6b6', borderColor:'#bfc6b6', height:40, width:294, borderRadius:8 });
bbView.add(bb);
bb.addEventListener('click', function(e) {	
	var distance = buttonObjects[e.index].distance;
	lblSelected.text = int_set_text1+ buttonObjects[e.index].title;
	Ti.App.Properties.setString("distRadius", distance);
});
//radius selection info label
var lblSelected = Ti.UI.createLabel({ text: "", width:'auto', height: "auto", color: "#3c6100", font:{fontFamily: "Helvetica Neue", fontSize:12}, top:100 });
win.add(lblSelected);

/* ************ */
/* Special code */
/* ************ */
var lblSpecial = Ti.UI.createLabel({
	text: int_set_text2,
	width: "auto",
	height: "auto",
	font:{fontSize:12, fontFamily:'Helvetica Neue', fontWeight:'normal'}, 
	color:'#3c6100', 
	top:125 
});
win.add(lblSpecial);

var txtCode = Titanium.UI.createTextArea({ 
	width: 220,
	height: 30, 
	font:{fontSize:13, fontFamily:'Helvetica Neue', fontWeight:'normal'}, 
	color:'#069', 
	top:150 
});
win.add(txtCode);

txtCode.addEventListener('change', function(e) { //when some text is entered, allow button to be pressed
	btnSpecial.enabled = true;
});

//Button to evaluate code
var btnSpecialBg = Ti.UI.createView({ 
	width:180, 
	height:45,
	top:185, 
	backgroundImage:'images/btn_view_bg.png', 
	borderRadius:10 
});
win.add(btnSpecialBg);
var btnSpecial = Ti.UI.createButton({ 
	width:174, 
	height:39, 
	backgroundImage:'images/btn_bg_repeat.png', 
	title: int_btn_text1, 
	font:{fontSize:12, fontFamily:'Helvetica Neue', fontWeight:'bold'}, color:'#23353b', 
	borderRadius:8,
	enabled: false
});
btnSpecialBg.add(btnSpecial);

btnSpecial.addEventListener('click', function(e) {
	if( (txtCode.value).toLowerCase() == "a1b2c3"){
		win.fireEvent("enableAllLocations", {enableLoc: true});
		Titanium.UI.createAlertDialog({title:int_msg1, message:int_msg2}).show();
	}else{
		Titanium.UI.createAlertDialog({title:int_msg3, message:int_msg4}).show();
	}
});