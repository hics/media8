var ui = require('lib/ui');
var funcMod = require('lib/functionsModule');

var win = Ti.UI.currentWindow;
//Internationalization variables
var int_tra_title = L('tra_title');
var int_tra_fromto = L('tra_fromto');
var int_tra_bblfrom = L('tra_bblfrom');
var int_tra_bblto = L('tra_bblto');
var int_tra_from = L('tra_from');
var int_tra_to = L('tra_to');
var int_tra_close = L('tra_close');
var int_tra_enter_text = L('tra_enter_text');
var int_nodata = L('gallery_noconn1');
var int_nodata2 = L('gallery_noconn2');
var int_tra_btn_tran = L('tra_btn_tran');
var int_tra_btn_speech = L('tra_btn_speech');
var int_tra_nospeechalert = L('tra_nospeechalert');

//add custom font title
var titleLabel = Titanium.UI.createLabel({
	text:int_tra_title,
	textAlign:"center",
	color:"#23353b",
	font: {fontSize: 14, fontFamily: "Helvetica Neue", color:"#23353b", fontWeight:"bold"},
	shadowColor: "#f5f9ef",
	shadowOffset: {x:0,y:1}
});	
win.setTitleControl(titleLabel);

/* ******************************** */
/* Create ScrollView to add content */
/* ******************************** */
var scrollView = Titanium.UI.createScrollView({ 
	contentWidth:'auto', 
	contentHeight:'auto', 
	top:3,
	showVerticalScrollIndicator:true, 
	showHorizontalScrollIndicator:true 
});
win.add(scrollView);

/*-- translate from bar --*/
var tfView = Ti.UI.createView({ width:298, height:40, backgroundColor:'#FFF', top:10, borderRadius:10, borderColor:'#a0b327', borderWidth:1 });
scrollView.add(tfView);
var tfLabel = Titanium.UI.createLabel({ text:int_tra_fromto, font:{fontSize:15, fontFamily:'Helvetica Neue', fontWeight:'bold'}, color:'#069', left:10, height:'auto' });
tfView.add(tfLabel);
//var tfArrow = Ti.UI.createImageView({ image:'images/icn_arrow_grey.png', right:10, height:20, width:10 });
//tfView.add(tfArrow);

/*-- bubble from --*/
var tfBubble = Ti.UI.createView({ width:232, height:120, backgroundImage:'images/bubble_white.png', top:59, left:10 });
scrollView.add(tfBubble);
var tfBubbleLabel = Titanium.UI.createLabel({ text:int_tra_bblfrom, font:{fontSize:12, fontFamily:'Helvetica Neue'}, color:'#707070', textAlign:'right', right:30, top:10, width:60, height:'auto' });
tfBubble.add(tfBubbleLabel);
var tfEraseButton = Titanium.UI.createButton({
   backgroundImage: "images/btn_bubbleclose.png",
   backgroundSelectedImage: "images/btn_bubbleclose_pressed.png",
   right:10, 
   top:10,
   width: 16,
   height: 16
});
tfBubble.add(tfEraseButton);
var tf = Titanium.UI.createTextArea({ width:212, height:74, top:25, left:10, font:{fontSize:15, fontFamily:'Helvetica Neue'}, color:'#000', backgroundColor:'transparent', returnKeyType:Titanium.UI.RETURNKEY_DONE }); //borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED 
tfBubble.add(tf);
tfEraseButton.addEventListener('click',function(e)
{
   tf.value = ""; //if close button clicked, delete this field
   ta.value = ""; //if close button clicked, delete this field
});
tf.addEventListener('change',function(e) {
	ta.value = ""; //whenever user types new words to translate, erase the translated text bubble.
});

/*-- bubble to --*/
var taBubble = Ti.UI.createView({ width:232, height:120, backgroundImage:'images/bubble_yellow.png', top:184, right:10 });
scrollView.add(taBubble);
var taBubbleLabel = Titanium.UI.createLabel({ text:int_tra_bblto, font:{fontSize:12, fontFamily:'Helvetica Neue'}, color:'#707070', textAlign:'right', right:10, top:10, width:60, height:'auto' });
taBubble.add(taBubbleLabel);
var ta = Titanium.UI.createTextArea({ width:212, height:71, top:25, left:10, font:{fontSize:15, fontFamily:'HelveticaNeue'}, color:'#333', backgroundColor:'transparent', value:'', editable: false }); //appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT, //keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION, //returnKeyType:Titanium.UI.RETURNKEY_EMERGENCY_CALL,
taBubble.add(ta);

/*-- btn translate --*/
var btnTranslateBg = Ti.UI.createView({ width:147, height:45, left:10, top:310, backgroundImage:'images/btn_view_bg.png', borderRadius:10 });
scrollView.add(btnTranslateBg);
var btnTranslate = Ti.UI.createButton({ width:141, height:39, backgroundImage:'images/btn_bg_repeat.png', title: int_tra_btn_tran, font:{fontSize:20, fontFamily:'Helvetica Neue', fontWeight:'bold'}, color:'#23353b', borderRadius:8 });
btnTranslateBg.add(btnTranslate);
//translate the text after the translate button is pressed
btnTranslate.addEventListener('click',function(e) {
	tf.blur();
	btnSpeech.enabled = true;
	var toTranslate = tf.value;
	var translateFrom = int_tra_from;
	var translateTo = int_tra_to;
	//alert(tf.value);
	
	// NETWORK CONNECTION CHECK
	var network = Titanium.Network;
	if (network.online == false) {
	    Ti.UI.createAlertDialog({title:int_nodata, message:int_nodata2, buttonNames:[int_tra_close]}).show();
	}else{
		if(!toTranslate) { ta.value = int_tra_enter_text; }
		else {
			var loader = Titanium.Network.createHTTPClient();
			loader.timeout = 1000000;
			//loader.open("GET","https://www.googleapis.com/language/translate/v2?key=AIzaSyDwlIYBpvpmhQPAIiLnuR94KLxaWFP7q84&q="+toTranslate+"&source="+translateFrom+"&target="+translateTo+"");
			loader.open("GET","https://www.googleapis.com/language/translate/v2?key=AIzaSyCv7uzvjcLzOr1TQhAuziF67gMMj8IC4_U&q="+toTranslate+"&source="+translateFrom+"&target="+translateTo+"");
			
			loader.onload = function()
			{
				try{
					//var result = eval('('+data.translations.translatedText+')');
					var resultArray = JSON.parse(this.responseText);
					var result = resultArray.data.translations[0].translatedText;
					
					ta.value = result;
				}
				catch(E){
					//alert(E);
					alert("Error code "+resultArray.error.code+": "+resultArray.error.message);
				}
			};
			loader.send();
		}
	}
});


/*-- btn speech --*/
var btnSpeechBg = Ti.UI.createView({ width:147, height:45, top:310, right:10, backgroundImage:'images/btn_view_bg.png', borderRadius:10 });
scrollView.add(btnSpeechBg);
var btnSpeech =  Ti.UI.createButton({ width:141, height:39, backgroundImage:'images/btn_bg_repeat.png', top:3, left:3, title: int_tra_btn_speech, enabled: false, font:{fontSize:20, fontFamily:'Helvetica Neue', fontWeight:'bold'}, color:'#23353b', borderRadius:8 });
btnSpeechBg.add(btnSpeech);
//Speak the translated text, using functions in the function.js
btnSpeech.addEventListener('click',function(e) {
    tf.blur();
   	if(tf.value){ 
   		//stateful.getPointStep()
   		funcMod.run(ta.value, int_tra_to, funcMod.play);
	}
    else{ 
    	alert(int_tra_nospeechalert);
	}
});

win.addEventListener('click',function(e) {
    tf.blur();
});
