exports.optMenu = function(win){
	var activity = win.activity;

activity.onCreateOptionsMenu = function(e){
  var menu = e.menu;

  var menuItemHome = menu.add({ title: "Home" });
  menuItemHome.width= 100;
  menuItemHome.setIcon("images/tab-home.png");
  menuItemHome.addEventListener("click", function(e) {
    Ti.API.debug("I was clicked");
  });
  var menuItemNearby = menu.add({ title: "Nearby" });
  menuItemNearby.width= 100;
  menuItemNearby.setIcon("images/tab-nearby.png");
  menuItemNearby.addEventListener("click", function(e) {
    Ti.API.debug("I was clicked");
  });
  var menuItemTranslate = menu.add({ title: "Translate" });
  menuItemTranslate.width= 100;
  menuItemTranslate.setIcon("images/tab-translate.png");
  menuItemTranslate.addEventListener("click", function(e) {
    Ti.API.debug("I was clicked");
  });
  var menuItemSettings = menu.add({ title: "Settings" });
  menuItemSettings.width= 100;
 menuItemSettings.setIcon("images/tab-more.png");
  menuItemSettings.addEventListener("click", function(e) {
    Ti.API.debug("I was clicked");
  });
};

}