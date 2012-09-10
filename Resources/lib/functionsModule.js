exports.saySomething2 = function(text){
	alert(text);
}

//add commas to the string
exports.addCommas = function(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

//open the detail page within the same tab group.The index of the result is passed. 
exports.openDetail = function(index){
	//var index = index;
	
	var winDetail = Ti.UI.createWindow({
		url: "windetail.js",
		barColor: "#045cb0",
		barImage: "images/bg_bargrey.png",
		//backButtonTitle: "Search",
		titleImage: "images/logo-small.png",
		index: index,
		data: data,
		currRegion: win.currRegion,
		currLocation: win.currLocation
	});
	
	//Ti.API.info(index);
	
	Ti.UI.currentTab.open(winDetail);
}


//talk function
exports.run = function(text, language, callback, bb){
	//Internationalization variables
	var int_tra_working = L('tra_working');
	
    var my = {},
    headers,
    fnCallback,
    bufferSize = 0,
    beatbox = false,
    bufferCounter = 1,
    files = [];
    
    headers = {
        'Host': 'translate.google.com',
        'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:2.0.0) Gecko/20110320 Firefox/4.0.0',
       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-us,en;q=0.5',
        'Accept-Encoding': 'gzip,deflate',
        'Accept-Charset': 'utf-8;q=0.7,*;q=0.7'
    };
    
    
    function timestamp () {
       return new Date().getTime();
    }

    
    function split(text, maxlength) {
      var len = text.length;
      var pos = -1;
      for (var i=maxlength; i<len; i += maxlength) {
        var separator = "\n";
        for (pos = i; text.charAt(pos) != " "; pos--) {
          if (pos == i-maxlength){
            pos = i;
            separator += text.charAt(pos);
            len++;
            break;
          }
        }
        text = text.substring(0, pos) + separator + text.substring(pos+1, len-1);
        i = pos;
      }
      return text;
    }
    
    function download(url, number) {
        var xhr = Ti.Network.createHTTPClient();
        xhr.open('GET', url, false);
        xhr.setTimeout(1000);
        for (var key in headers ) { 
            if (headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key]);
            }
        }
        xhr.onerror = function () {
            Ti.API.info('gtts: Download error');
        };
        xhr.onload = function () {
        	if (Ti.Platform.name == 'android') {
        		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'tmp_'+timestamp()+'_'+number+'.mp3');
        		f.write(xhr.responseData);
        		files.push(f);
        	} else {
        		files.push(xhr.file);	
        	}
            downloadFinished();
        };
        if (Ti.Platform.name != 'android') {
        	xhr.file = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,'tmp_'+timestamp()+'_'+number+'.mp3');
        }
        xhr.send();
    }
    
    function buildUrls(buffer, language) {
        var baseurl = 'http://translate.google.com/translate_tts?';
        if (beatbox) {
            baseurl +='format=bb&';
        }
        var urls = [];
        for (var i=0;i < buffer.length;i++) {
            urls.push(baseurl+'q='+encodeURIComponent(buffer[i])+'&tl='+encodeURIComponent(language));
        }	
        return urls;
    }
    
    function downloadFinished () {
        if(bufferSize == bufferCounter) {
            my.mp3_files = files;
            mergeFiles();
        } else {
            bufferCounter++;
        }
    }
    
    function mergeFiles () {
        var finalFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'final_'+timestamp()+'.mp3');
//        finalFile.createFile();
		finalFile.write("");
		if (Ti.Platform.name == 'android') {
	    	var firstFile = Ti.Filesystem.getFile(files[0].nativePath);
		} else {
			var firstFile = Ti.Filesystem.getFile(files[0]);
		}
        finalFile.write(firstFile);
        firstFile.deleteFile();
        for (var i = 1; i < files.length; i++) {
            var nextFile = Ti.Filesystem.getFile(files[i]);
            finalFile.append(nextFile.read.blob);
            nextFile.deleteFile();
        }
        fnCallback(finalFile.nativePath);
    }
    
    my.mp3_files = [];
    //my.run = function(text, language, callback, bb) { 
    	//speech btton: do while speech is working
    	//Ti.API.info("Aqui pudieramos desactivarlo");
    	btnSpeech.enabled = false;
    	btnSpeech.title = int_tra_working;
    	
		fnCallback = callback;
		bufferCounter = 1;
		files = [];
		beatbox = bb;
		var buffer = split(text, 95);
		var urls = buildUrls(buffer.split('\n'), language);
		bufferSize = urls.length;
		for (var i = 0; i < urls.length;i++ ) {
		    download(urls[i], i);
		}
    //};  
    return my; 
}

exports.play = function(file) {
	Ti.API.info(file);
	var sound = Ti.Filesystem.getFile(file);
    var player = Ti.Media.createSound({url:file});
    player.url = file;
    player.play();
    Ti.API.info("player.duration: "+player.duration);
    
    /*
     * temporary solution to sound bug: if sound does not finish playing at its duration, re-enable speech sound
     */
    var errorTimer = setTimeout(function(){
		Ti.API.info("doAfterTime");
		player.stop();
		//btnSpeech.enabled = true;
    	//btnSpeech.title = "Speech";
    }, Math.ceil(player.duration)*1000);	
	
	//eventListeners
    player.addEventListener('complete', function(e) {
		Ti.API.info("Aqui pudieramos REactivarlo");
		btnSpeech.enabled = true;
    	btnSpeech.title = "Speech";
	});
	
    player.addEventListener('error', function(e) {
		Ti.API.info("Error message: "+message);
	});
	
    player.addEventListener('interrupted', function(e) {
		Ti.API.info("interrupted source: "+source);
	});	
//    log('mp3 file: ' + file);
}

exports.ToRad = function(deg) {
	return deg * Math.PI/180;
}