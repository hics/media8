//create the tips tableview
exports.createTaxiView = function() {
	//Internationalization variables
	var int_taxi1 = L('taxi1');
	var int_taxi2 = L('taxi2');
	var int_taxi3 = L('taxi3');
	var int_taxi4 = L('taxi4');
	var int_taxi5 = L('taxi5');
	
	/* ******************************** */
	/* Create ScrollView to add content */
	/* ******************************** */
	var scrollView = Titanium.UI.createScrollView({ 
		top: 0,
		left:0,
		width: 320,
		contentWidth: 320,
		contentHeight: 400,
		//showVerticalScrollIndicator:true, 
		//showHorizontalScrollIndicator:true,
		touchEnabled: true,
		backgroundImage: "images/bkg.png"
	});
	
	
	/* ************************* */
	/* Picker logic and controls */
	/* ************************* */
	var dataHotels = [
		{title:'Borinquen Beach Inn',custom_item:'$10',fontSize:18,selected:true},
		{title:'Casa de Playa',custom_item:'$10',fontSize:18},
		{title:'Coqui Inn Hotel',custom_item:'$10',fontSize:18},
		{title:'Coqui Kokeé Hotel and Rest.',custom_item:'$10',fontSize:18},
		{title:'Coral by the Sea',custom_item:'$10',fontSize:18},
		{title:'Courtyard Mariott Isla Verde',custom_item:'$10',fontSize:18},
		{title:'El Patio Guest House',custom_item:'$10',fontSize:18},
		{title:'El San Juan Hotel & Casino',custom_item:'$10',fontSize:18},
		{title:'Embassy Suites Hotel & Casino',custom_item:'$10',fontSize:18},
		{title:'ESJ Towers',custom_item:'$10',fontSize:18},
		{title:'Hamptonn Inn & Suites by Hilton',custom_item:'$10',fontSize:18},
		{title:'Howard Johnson Hotel',custom_item:'$10',fontSize:18},
		{title:'InterContinental San Juan Resort & Casino',custom_item:'$10',fontSize:18},
		{title:'Hotel La Playa',custom_item:'$10',fontSize:18},
		{title:'The Ritz-Carlton San Juan Hotel',custom_item:'$10',fontSize:18},
		{title:'San Juan Water & Beach Club',custom_item:'$10',fontSize:18},
		{title:'Verdanza Hotel',custom_item:'$10',fontSize:18},
		{title:'Hotel Villa Del Sol',custom_item:'$10',fontSize:18},
		{title:'Acacia Seaside Inn',custom_item:'$15',fontSize:18},
		{title:'Alelí by the Sea Guest House',custom_item:'$15',fontSize:18},
		{title:'Arcade Inn',custom_item:'$15',fontSize:18},
		{title:'At Wind Chimes Inn',custom_item:'$15',fontSize:18},
		{title:'Atlantic Beach Hotel',custom_item:'$15',fontSize:18},
		{title:'Casa del Caribe',custom_item:'$15',fontSize:18},
		{title:'Comfort Inn San Juan',custom_item:'$15',fontSize:18},
		{title:'Conrad San Juan Condado Plaza',custom_item:'$15',fontSize:18},
		{title:'Coral Princess Inn',custom_item:'$15',fontSize:18},
		{title:'Courtyard by Marriott San Juan Miramar',custom_item:'$15',fontSize:18},
		{title:'Double Tree by Hilton San Juan',custom_item:'$15',fontSize:18},
		{title:'El Canario By The Lagoon Hotel',custom_item:'$15',fontSize:18},
		{title:'Sandy Beach Hotel',custom_item:'$15',fontSize:18},
		{title:'El Canario Inn',custom_item:'$15',fontSize:18},
		{title:'El Pradi Inn',custom_item:'$15',fontSize:18},
		{title:'Embassy Guest House',custom_item:'$15',fontSize:18},
		{title:'Holiday Inn Express San Juan',custom_item:'$15',fontSize:18},
		{title:'Hostería del Mar',custom_item:'$15',fontSize:18},
		{title:'Hotel Iberia',custom_item:'$15',fontSize:18},
		{title:'L’Habitation Beach Guest House',custom_item:'$15',fontSize:18},
		{title:'La Concha A Renaissance Resort',custom_item:'$15',fontSize:18},
		{title:'Le Consulat Hotel',custom_item:'$15',fontSize:18},
		{title:'Miramar Hotel',custom_item:'$15',fontSize:18},
		{title:'Hotel Las Américas',custom_item:'$15',fontSize:18},
		{title:'Número 1 on the Beach',custom_item:'$15',fontSize:18},
		{title:'Oceana Hostal Playero',custom_item:'$15',fontSize:18},
		{title:'Olimpo Court Hotel',custom_item:'$15',fontSize:18},
		{title:'Quality Inn El Portal',custom_item:'$15',fontSize:18},
		{title:'Radisson Ambassador Plaza',custom_item:'$15',fontSize:18},
		{title:'San Juan Beach Hotel',custom_item:'$15',fontSize:18},
		{title:'SJ Marriott Resort & Stellaris Casino',custom_item:'$15',fontSize:18},
		{title:'Tres Palmas Inn',custom_item:'$15',fontSize:18},
		{title:'Tu Casa Guest House',custom_item:'$15',fontSize:18},
		{title:'Panamerican East & West Piers',custom_item:'$19',fontSize:18},
		{title:'Caleta Guest House',custom_item:'$19',fontSize:18},
		{title:'Caribe Hilton Hotel',custom_item:'$19',fontSize:18},
		{title:'Casa Blanca Inn',custom_item:'$19',fontSize:18},
		{title:'Casa Candela',custom_item:'$19',fontSize:18},
		{title:'Chateau Cervantes',custom_item:'$19',fontSize:18},
		{title:'Da’House Hotel',custom_item:'$19',fontSize:18},
		{title:'El Convento Hotel',custom_item:'$19',fontSize:18},
		{title:'Gallery Inn Hotel',custom_item:'$19',fontSize:18},
		{title:'Howard Johnson Plaza de Armas Hotel',custom_item:'$19',fontSize:18},
		{title:'Hotel Milano',custom_item:'$19',fontSize:18},
		{title:'San Juan Suites Hotel',custom_item:'$19',fontSize:18},
		{title:'Sheraton Old San Juan',custom_item:'$19',fontSize:18},
		{title:'San Juan Park Hotel',custom_item:'$19',fontSize:18},
		{title:'Convention Center',custom_item:'$15',fontSize:18},
		{title:'Isla Grande Airport',custom_item:'$15',fontSize:18},
		{title:'Sheraton Convention Center',custom_item:'$15',fontSize:18}
	];

	var dataTowns = [
		{title:'Adjuntas',custom_item:'$147',fontSize:18,selected:true},
		{title:'Aguada',custom_item:'$150',fontSize:18},
		{title:'Aguadilla',custom_item:'$140',fontSize:18},
		{title:'Aguas Buenas',custom_item:'$57',fontSize:18},
		{title:'Aibonito',custom_item:'$88',fontSize:18},
		{title:'Añasco',custom_item:'$145',fontSize:18},
		{title:'Arecibo',custom_item:'$96',fontSize:18},
		{title:'Arroyo',custom_item:'$103',fontSize:18},
		{title:'Barceloneta',custom_item:'$80',fontSize:18},
		{title:'Barranquitas',custom_item:'$88',fontSize:18},
		{title:'Bayamón',custom_item:'$33',fontSize:18},
		{title:'Cabo Rojo',custom_item:'$175',fontSize:18},
		{title:'Caguas',custom_item:'$55',fontSize:18},
		{title:'Camuy',custom_item:'$110',fontSize:18},
		{title:'Canóvanas',custom_item:'$46',fontSize:18},
		{title:'Carolina',custom_item:'Metered',fontSize:18},
		{title:'Cataño',custom_item:'$28',fontSize:18},
		{title:'Cayey',custom_item:'$70',fontSize:18},
		{title:'Ceiba',custom_item:'$80',fontSize:18},
		{title:'Ciales',custom_item:'$85',fontSize:18},
		{title:'Cidra',custom_item:'$75',fontSize:18},
		{title:'Coamo',custom_item:'$100',fontSize:18},
		{title:'Comerío',custom_item:'$75',fontSize:18},
		{title:'Corozal',custom_item:'$69',fontSize:18},
		{title:'Dorado',custom_item:'$60',fontSize:18},
		{title:'Fajardo',custom_item:'$80',fontSize:18},
		{title:'Florida',custom_item:'$90',fontSize:18},
		{title:'Guánica',custom_item:'$155',fontSize:18},
		{title:'Guayama',custom_item:'$95',fontSize:18},
		{title:'Guayanilla',custom_item:'$150',fontSize:18},
		{title:'Guaynabo',custom_item:'$31',fontSize:18},
		{title:'Gurabo',custom_item:'$69',fontSize:18},
		{title:'Hatillo',custom_item:'$100',fontSize:18},
		{title:'Hormigueros',custom_item:'$175',fontSize:18},
		{title:'Humacao',custom_item:'$77',fontSize:18},
		{title:'Isabela',custom_item:'$125',fontSize:18},
		{title:'Jayuya',custom_item:'$135',fontSize:18},
		{title:'Juana Díaz',custom_item:'$110',fontSize:18},
		{title:'Juncos',custom_item:'$65',fontSize:18},
		{title:'Lajas',custom_item:'$170',fontSize:18},
		{title:'Lares',custom_item:'$105',fontSize:18},
		{title:'Las Marías',custom_item:'$140',fontSize:18},
		{title:'Las Piedras',custom_item:'$75',fontSize:18},
		{title:'Loíza',custom_item:'$50',fontSize:18},
		{title:'Luquillo',custom_item:'$72',fontSize:18},
		{title:'Manatí',custom_item:'$70',fontSize:18},
		{title:'Maricao',custom_item:'$160',fontSize:18},
		{title:'Maunabo',custom_item:'$100',fontSize:18},
		{title:'Mayagüez',custom_item:'$160',fontSize:18},
		{title:'Moca',custom_item:'$130',fontSize:18},
		{title:'Morovis',custom_item:'$75',fontSize:18},
		{title:'Naguabo',custom_item:'$85',fontSize:18},
		{title:'Naranjuto',custom_item:'$72',fontSize:18},
		{title:'Orocovis',custom_item:'$95',fontSize:18},
		{title:'Patillas',custom_item:'$95',fontSize:18},
		{title:'Peñuelas',custom_item:'$140',fontSize:18},
		{title:'Piñones',custom_item:'Metered',fontSize:18},
		{title:'Ponce',custom_item:'$125',fontSize:18},
		{title:'Quebradillas',custom_item:'$155',fontSize:18},
		{title:'Rincón',custom_item:'$155',fontSize:18},
		{title:'Río Grande',custom_item:'$63',fontSize:18},
		{title:'Río Piedras',custom_item:'Metered',fontSize:18},
		{title:'Sabana Grande',custom_item:'$165',fontSize:18},
		{title:'Salinas',custom_item:'$97',fontSize:18},
		{title:'San Juan',custom_item:'Metered',fontSize:18},
		{title:'San Germán',custom_item:'$160',fontSize:18},
		{title:'San Lorenzo',custom_item:'$65',fontSize:18},
		{title:'San Sebastián',custom_item:'$125',fontSize:18},
		{title:'Santa Isabel',custom_item:'$105',fontSize:18},
		{title:'Toa Alta',custom_item:'$50',fontSize:18},
		{title:'Toa Baja',custom_item:'$50',fontSize:18},
		{title:'Trujillo Alto',custom_item:'$28',fontSize:18},
		{title:'Utuado',custom_item:'$115',fontSize:18},
		{title:'Vega Alta',custom_item:'$55',fontSize:18},
		{title:'Vega Baja',custom_item:'$65',fontSize:18},
		{title:'Villalba',custom_item:'$123',fontSize:18},
		{title:'Yabucoa',custom_item:'$91',fontSize:18},
		{title:'Yauco',custom_item:'$155',fontSize:18}
	];
	// animations that control the picker. 
	var slideIn =  Titanium.UI.createAnimation({bottom:0 });
	var slideOut =  Titanium.UI.createAnimation({bottom:-425 });

	/* *********** */
	/* UI elements */
	/* *********** */
	// Airport-to-hotel elements
	// ===============
	//Airport-to-hotel title	
	var lblah = Ti.UI.createLabel({ top: 20, left:20, width: 265, height: "auto", text: int_taxi1, color: "#222", font:{fontFamily: "Helvetica Neue", fontSize:13, fontWeight:"bold"} });
	scrollView.add(lblah);
	//Airport-to-hotel field
	var btn_ah = Ti.UI.createButton({ top:80, left:20, width:280, height:40, backgroundColor:'#FFF', borderRadius:10, borderColor:'#a0b327', borderWidth:1 });
	scrollView.add(btn_ah);
	var lbl_ahbtn = Titanium.UI.createLabel({ text:int_taxi2, font:{fontSize:15, fontFamily:'Helvetica Neue', fontWeight:'bold'}, color:'#069', left:10, height:'auto' });
	btn_ah.add(lbl_ahbtn);
	var arrow = Ti.UI.createImageView({ image:'images/icn_arrow_grey_down.png', right:10, height:10, width:15 });
	btn_ah.add(arrow);
	//Airport-to-hotel price
	var lblah_rate = Ti.UI.createLabel({ top:130, left:20, width: "auto", height: "auto", text: "Rate:", color: "#3c6100", font:{fontFamily: "Helvetica Neue", fontSize:13, fontWeight:"bold"} });
	scrollView.add(lblah_rate);
	var lblah_rate_number = Ti.UI.createLabel({ top:130, left:55, width: "auto", height: "auto", text: "$0", color: "#3c6100", font:{fontFamily: "Helvetica Neue", fontSize:13, fontWeight:"bold"} });
	scrollView.add(lblah_rate_number);

	// Airport-to-town elements
	// ===============
	//Airport-to-town title
	var lblat = Ti.UI.createLabel({ top: 160, left:20, width: 290, height: "auto", text: int_taxi3, color: "#222", font:{fontFamily: "Helvetica Neue", fontSize:13, fontWeight:"bold"} });
	scrollView.add(lblat);
	//Airport-to-town field
	var btn_at = Ti.UI.createButton({ top:220, left:20, width:280, height:40, backgroundColor:'#FFF', borderRadius:10, borderColor:'#a0b327', borderWidth:1 });
	scrollView.add(btn_at);
	var lbl_atbtn = Titanium.UI.createLabel({ text:int_taxi4, font:{fontSize:15, fontFamily:'Helvetica Neue', fontWeight:'bold'}, color:'#069', left:10, height:'auto' });
	btn_at.add(lbl_atbtn);
	var arrow2 = Ti.UI.createImageView({ image:'images/icn_arrow_grey_down.png', right:10, height:10, width:15 });
	btn_at.add(arrow2);
	//Airport-to-town price
	var lblat_rate = Ti.UI.createLabel({ top:270, left:20, width: "auto", height: "auto", text: "Rate:", color: "#3c6100", font:{fontFamily: "Helvetica Neue", fontSize:13, fontWeight:"bold"} });
	scrollView.add(lblat_rate);
	var lblat_rate_number = Ti.UI.createLabel({ top:270, left:55, width: "auto", height: "auto", text: "$0", color: "#3c6100", font:{fontFamily: "Helvetica Neue", fontSize:13, fontWeight:"bold"} });
	scrollView.add(lblat_rate_number);

	// Important info elements
	// ===============
	//Airport-to-town title
	var lblinfo = Ti.UI.createLabel({ top: 300, left:20, width: 265, height: "auto", text: int_taxi5, color: "#222", font:{fontFamily: "Helvetica Neue", fontSize:11} });
	scrollView.add(lblinfo);
	
	// View for picker
	// ===============
	var pickerView = Titanium.UI.createView({height:420, bottom:-420 });
	var black = Titanium.UI.createView({backgroundColor:'#000', height:160, opacity:0.85, top:0 });
	pickerView.add(black);
	// Header bar for view
	var valuesbar = Titanium.UI.createView({height:45, top:160, backgroundColor:'#000' });
	pickerView.add(valuesbar);
	// Cancel, return to add edit without a new time
	var closePickerView = Ti.UI.createButton({ title:"Cancel", color:'#fff', font:{fontSize:12,fontFamily:'Helvetica Neue',fontWeight:'bold'}, backgroundImage:"images/system_btn_bg.png", width:62,height:32, top:4, left:5 });
	valuesbar.add(closePickerView);
	// Button Save 
	var savePlace = Ti.UI.createButton({ title:"Save", color:'#fff', font:{fontSize:12,fontFamily:'Helvetica Neue',fontWeight:'bold'}, backgroundImage:"images/system_btn_bg.png", width:62, height:32, top:4, left:255 });
	valuesbar.add(savePlace);
	// Pickers
	var thePickerHotel = Ti.UI.createPicker({ top:205, width: 320, left: 0, selectionIndicator:'true'});
	pickerView.add(thePickerHotel);
	thePickerHotel.add(dataHotels);
	var thePickerTown = Ti.UI.createPicker({ top:205, width: 320, left: 0, selectionIndicator:'true'});
	pickerView.add(thePickerTown);
	thePickerTown.add(dataTowns);
	//pickerView.display = thePicker;
	
	/* ********* */
	/* Listeners */
	/* ********* */
	var airportFlag = false;
	//Airport to hotel button
	btn_ah.addEventListener('click', function() {
		pickerView.animate(slideIn);
		thePickerHotel.top = 205;
		thePickerTown.top = 500;
		airportFlag = true;
	});
	
	//Airport to town button
	btn_at.addEventListener('click', function() {
		pickerView.animate(slideIn);
		thePickerHotel.top = 500;
		thePickerTown.top = 205;
		airportFlag = false;
	});
	
	// PickerHotel get value, save on newTime
	var pickerHotelItemName="";
	var pickerHotelItemPrice="";
	thePickerHotel.addEventListener('change',function(e) {
		pickerHotelItemName = e.row.title;
		pickerHotelItemPrice = e.row.custom_item;
	});
	// PickerTown get value, save on newTime
	var pickerTownItemName="";
	var pickerTownItemPrice="";
	thePickerTown.addEventListener('change',function(e) {
		pickerTownItemName = e.row.title;
		pickerTownItemPrice = e.row.custom_item;
	});

	closePickerView.addEventListener('click', function(e) {
		pickerView.animate(slideOut);
		//win.rightNavButton=saveBtn;
	});

	savePlace.addEventListener('click', function() {
		pickerView.animate(slideOut);
		if(airportFlag == true){
			lbl_ahbtn.text=pickerHotelItemName;
			lblah_rate_number.text=pickerHotelItemPrice;
		}else{
			lbl_atbtn.text=pickerTownItemName;
			lblat_rate_number.text=pickerTownItemPrice;
		}
	});
	
	scrollView.add(pickerView);

	return scrollView;
}

//create the key facts tableview
exports.createBusView = function() {
	// current key fact item
	var currentItem = 0;
	
	/* ****************** */
	/* Create the webview */
	/* ****************** */
	var webview = Titanium.UI.createWebView({
		url:'http://www.dtoprutas.com/demo10.php?capa=ama',
		//url:'winTransBus.html',
		//touchEnabled: true,
		size: {width: 410, height:400},
		scalesPageToFit:true,
		center: {x:113,y:200}
	});
	
	var webviewNoInternet = Titanium.UI.createWebView({
		html:'<html><body><div style="color:black;">No internet connection detected.</div></body></html>'
		//url:'winTransBus.html',
		//touchEnabled: true,
	});
	
	//var transform = Ti.UI.create2DMatrix().scale(2.5);
	//webview.transform = transform;
	
	/* ************************************************ */
	/* Create the actual view of all of the Bus section */
	/* ************************************************ */
	var BusView = Ti.UI.createView({
		top: 0,
		left:320,
		width: 320,
		height:361,
		backgroundColor:'white'
	});	
 	
 	//check connection, if no connection show webview with text
	var network = Titanium.Network;
	// NETWORK CONNECTION CHECK
	if (network.online == false) {
		BusView.add(webviewNoInternet);
	}else{
		BusView.add(webview);
	}
	/*factsView.add(factContentView);*/
	
	return BusView;
}