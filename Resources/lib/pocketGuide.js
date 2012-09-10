//create the tips tableview
exports.createLoginView = function() {	
	//Internationalization variables
	var int_pg_welcome = L('pg_welcome');
	var int_pg_welcome2 = L('pg_welcome2');
	var int_pg_username = L('pg_username');
	var int_pg_password = L('pg_password');
	var int_pg_login = L('pg_login');
	var int_neterror = L('neterror');
	var int_pg_uspwreq = L('pg_uspwreq');
	
	/* ******************************** */
	/* Create ScrollView to add content */
	/* ******************************** */
	var loginView = Titanium.UI.createScrollView({ 
		top: 0,
		left:0,
		width: 320,
		contentHeight: 366,
		backgroundColor: "#eee"
	});

	/* *********** */
	/* UI elements */
	/* *********** */
	/* ******** Upper Block ******** */
	var upperBlock = Titanium.UI.createView({ 
		top: 0,
		left:0,
		height: 127,
		width: 320,
		backgroundColor: "#fff"
	});
	// bottom border
	upperBlock.add(Ti.UI.createView({
		bottom: 1,
		height: 1,
		backgroundColor: '#f2f2f2',
	}));
	loginView.add(upperBlock);
	
	var introTitle = Ti.UI.createLabel({
		text: int_pg_welcome,
		color: '#39878c',
		textAlign:'left',
		top:22,
		width: 280,
		height:"auto",
		font:{fontWeight:'bold',fontSize:12}
	});
	upperBlock.add(introTitle);
	
	var introText = Ti.UI.createLabel({
		text: int_pg_welcome2,
		color: '#333333',
		textAlign: 'left',
		top: 40,
		width: 280,
		height: "auto",
		font:{fontWeight:'regular',fontSize:12}
	});
	upperBlock.add(introText);

	/* ******** Lower Block ******** */
	var lowerBlock = Titanium.UI.createView({ 
		top: 127,
		left:0,
		height: 239,
		width: 320,
		backgroundColor: "#eee"
	});
	loginView.add(lowerBlock);
	
	var userLbl = Ti.UI.createLabel({
		text: int_pg_username,
		color: '#23353b',
		textAlign: 'left',
		top: 31,
		width: 185,
		height: "auto",
		//backgroundColor: "#000",
		font:{fontWeight:'bold',fontSize:12}
	});
	lowerBlock.add(userLbl);
	
	var username = Titanium.UI.createTextField({  
	    color:'#336699',  
	    top:48,   
	    width:185,  
	    height:30,  
	    //keyboardType:Titanium.UI.KEYBOARD_ASCII,  
	    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});  
	lowerBlock.add(username);  

	var userLbl = Ti.UI.createLabel({
		text: int_pg_password,
		color: '#23353b',
		textAlign: 'left',
		top: 93,
		width: 185,
		height: "auto",
		//backgroundColor: "#000",
		font:{fontWeight:'bold',fontSize:12}
	});
	lowerBlock.add(userLbl);
		  
	var password = Titanium.UI.createTextField({  
	    color:'#336699',  
	    top:110,   
	    width:185,  
	    height:30,   
	    passwordMask:true,  
	    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
	    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
	    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED  
	});  
	lowerBlock.add(password);
	
	var loginBtn = Titanium.UI.createButton({
		color:'#23353b',
		backgroundImage:'images/bg_button_kaki.png',
		backgroundSelectedImage:'images/bg_button_kaki_selected.png',
		title:int_pg_login,  
	    top:156,
	    right:67,
	    width:100,  
	    height:35,  
	    borderRadius:5,
		color: "#23353b",
	    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:12}  
	});
	
	lowerBlock.add(loginBtn); 
	
	/* ******************** */
	/* Login Event Handling */
	/* ******************** */
	/* ******** Network Connection ******** */
	var loginReq = Titanium.Network.createHTTPClient();
	loginReq.onload = function()
	{
		var json = this.responseText;
		//Ti.API.info(this.responseText);
		
		response = eval('('+json+')'); //objectify the json text to object
		//Ti.API.info(json);
		
		if(response == null){
			alert("Password incorrect");
			Ti.App.fireEvent("hide_indicator");
		}else{
			//alert("Welcome " + response.name + ". Your email is: " + response.email + ". Your uID is: " + response.uid);
			var winPocketGuideFavs = Ti.UI.createWindow({
				url: "winPocketGuideFavs.js",
				title: "My Pocket Guide",
				userid: response.uid,
				//barColor: "#045cb0",
				barImage: "images/bg_bargrey.png",
				//leftNavButton: btnBack,
				navBarHidden: true
			});
			Ti.UI.currentTab.open(winPocketGuideFavs);
			Ti.App.fireEvent("hide_indicator");
		}
	};
	
	loginReq.onerror = function(e)
	{
		Ti.API.info(e.error);
		Ti.App.fireEvent("hide_indicator");
		alert(int_neterror);
	};
	
	
	/* ******** Button Listener ******** */
	loginBtn.addEventListener('click',function(e)  
	{
		Ti.App.fireEvent("show_indicator");
		
	    if (username.value != '' && password.value != '')  
	    {  
			//Ti.App.fireEvent("hide_indicator");
	        loginReq.open("POST","http://m.seepuertorico.com/lgn.php");  
	        var params = {  
	            name: username.value,  
	            pass: password.value
	        };  
	        loginReq.send(params);
	    }else{  
			Ti.App.fireEvent("hide_indicator");
	        alert(int_pg_uspwreq);  
	    }  
	});
	//Ti.App.fireEvent("hide_indicator");
	
	return loginView;
}