/*
* Titanium OAuth Client
*
* Copyright 2010, Social Vitamin, Inc.
* Licensed under the MIT
* Copyright (c) 2010 Social Vitamin, Inc.
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

Ti.include('../lib/sha1.js');
Ti.include('../lib/oauth.js');

var TitaniumOAuth = function(ck, cs, at, ats) {

	var self = this;
	var authWebView = null;
	var oauthWin = null;

	var consumer = {
	    consumerKey:      ck,
	    consumerSecret:   cs,
		accessToken: at,
		accessTokenSecret: ats,
		serviceProvider: { 
		  signatureMethod: "HMAC-SHA1"
		}
	};
	
	var accessor = {
	    consumerSecret: consumer.consumerSecret,
	    tokenSecret: consumer.accessTokenSecret
	};
	
	// Request
	this.request = function(options, callback) {
		 
        var message = {
			method: options.method,
			action: options.action,
			parameters: [
				['oauth_consumer_key', consumer.consumerKey],
				['oauth_consumer_secret', consumer.consumerSecret],
				['oauth_token', consumer.accessToken],
				['oauth_signature_method', consumer.serviceProvider.signatureMethod]
			]
		};

		for (param in options.parameters) {
			message.parameters.push(options.parameters[param]);
		};

		// Access Token Secret
		accessor.tokenSecret = ats;

		OAuth.setTimestampAndNonce(message);
		OAuth.SignatureMethod.sign(message, accessor);

		var finalUrl = OAuth.addToURL(message.action, message.parameters);

		var xhr = Titanium.Network.createHTTPClient({
			timeout: 200000
		});
		xhr.onload = function() {
			callback(this.responseText);
		};
		xhr.onerror = function(e) {

			Ti.UI.createAlertDialog({
				title: 'Service Unavailable',
				message: 'An error ocurred while making a request.'
			}).show();

		};
		xhr.open(options.method, finalUrl, false);
		xhr.send();
		
	};

};