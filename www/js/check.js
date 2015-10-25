Browser = {
	_ucwords: function(string) {
		var ret = '';

		if(typeof(string) === 'string' && string.length > 0){
		
			ret = string.replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1){
				return $1.toUpperCase();
			});
		}

		return ret;
	},

	_cmpVersion: function (a, b) {
		
		if (b===''){return true;}

	    var re = /(\.0)+[^\.]*$/;
	    	
	    var i, cmp;
	    
	    a = (a + '').replace(re, '').split('.');
	    b = (b + '').replace(re, '').split('.');

	    var len = Math.min(a.length, b.length); 

	    for( i = 0; i < len; i++ ) {
	        cmp = parseFloat(a[i], 10) - parseFloat(b[i], 10);
	        
	        
	        if( cmp !== 0 ) {
	            return cmp >= 0;
	        }
	    }
	    
	    return (a.length - b.length) >= 0; 
	},

	/**
	 * Return the platform name
	 * @property platformName
	 * @return String
	 */
	_platformName: function() {
		var ret = '';
		switch($.browser.platform) {
			case 'android':
				ret = 'Android';
		        break;

		    case 'iphone':
		    case 'ipad':
		    case 'ipod':
		    	ret = 'IOS';
				break;

			case 'mac':
				ret = 'Macintosh';
				break;

			case 'windows phone':
				ret = 'Windows Phone';
				break;
			
			//Firefox OS platform is empty
			case '':
				if ($.browser.mozilla){
					ret = 'Firefox OS';
				}
				break;

			case 'win':
				ret = 'Windows';
				break;
			
			case 'playbook':
			case 'blackberry':
			case 'bb':
				ret = 'BlackBerry';
				break;
			
			default:
				ret = this._ucwords($.browser.platform);
				break;
		}

		return ret;
	},

	/**
	 * Get mayor number of the platform version
	 * @property platformVersion
	 * @return String
	 */
	_platformVersion: function(){
		var ret = '';
		var ua;

		switch($.browser.platform) {
			case 'android':
				ua = navigator.userAgent;
				ret = parseFloat(ua.slice(ua.indexOf('Android')+8));
		        break;

		    case 'iphone':
		    case 'ipad':
		    case 'ipod':
		    	var v = (navigator.userAgent).match(/OS (\d+)_(\d+)_?(\d+)?/);

      			ret = parseInt(v[1], 10)+ '.' + parseInt(v[2], 10);
				break;	
			case 'mac':
				v = (navigator.userAgent).match(/OS X (\d+)[_.](\d+)?/);
      			ret = parseInt(v[1], 10)+ '.' + parseInt(v[2], 10);
				break;
	
			case 'windows phone':
				ret = $.browser.version;
				break;
			
			case 'playbook':
			case 'blackberry':
			case 'bb':
				ua = navigator.userAgent;
				var tmp = ua.slice(ua.indexOf('Version')+8).split(' ')[0].split('.');
				ret = tmp[0]+'.'+tmp[1];
				break;

			case '':
				var ffVersionArray = (navigator.userAgent.match(/Firefox\/([\d]+\.[\w]?\.?[\w]+)/));
         		if (ffVersionArray.length === 2) {
					//Check with the gecko version the Firefox OS version
					//Table https://developer.mozilla.org/en-US/docs/Gecko_user_agent_string_reference
					var hashVersion = {
						'18.0': '1.0.1',
						'18.1': '1.1',
						'26.0': '1.2',
						'28.0': '1.3',
						'30.0': '1.4',
						'32.0': '2.0',
						'34.0': '2.1',
						'37.0': '2.2',
						'41.0': '3.0',
					}
					var rver = ffVersionArray[1];
					var sStr = ffVersionArray[1].substring(0, 4);
					if (hashVersion[sStr]) {
						rver = hashVersion[sStr];
					}
					ret = rver;
         		}
				break;

			default:
				ret = '';
				break;
		}
		return ret;
	},

	/**
	 * Return the browser name
	 * @property browserName
	 * @return String
	 */
	_browserName: function(){

		var ret = this._ucwords($.browser.name);

		if (ret === 'Mozilla'){
			ret = 'Firefox';
		}
		
		return ret;
	},

	/**
	 * Return the browser version
	 * @property browserName
	 * @return String
	 */
	_browserVersion: function(){

		var ua = navigator.userAgent;
		var tem,
		    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

	
			if(/trident/i.test(M[1])){//Internet explorer
		        tem=  /\brv[ :]+([\d]+\.[\w]?)/g.exec(ua) || [];
		        return (tem[1] || '');
		    }

			//Chrome		    
		    if(M[1]=== 'Chrome'){
	        	return ua.match(/Chrome\/([\d]+\.[\w]?)+/i)[1];
		    }

		    //Firefox
		    if(M[1]=== 'Firefox'){
	        	return ua.match(/Firefox\/([\d]+\.[\w]?)+/i)[1];
		    }

		    //MSIE
		    if(M[1]=== 'MSIE'){
		    	var temp = ua.match(/IEMobile\/([\d]+\.[\w]?)+/i) || ua.match(/MSIE\s([\d]+\.[\w]?)/);
		    	return temp[1];
		    }

		    M = M[2] ? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
		    //En otro caso busca el item version
		    if((tem= ua.match(/version\/([\d]+\.[\w]?)+/i))!= null) {
		    	M.splice(1, 1, tem[1]);
		    }

		return M[1];
	},

	/**
	 * If device is mobile return true
	 * @property isMobileDevice
	 * @return Boolean 
	 */
	_isMobileDevice: function(){

		return !$.browser.desktop;
	},

	/**
	 * Return size screen Height
	 * @property screenHeight
	 * @return Boolean 
	 */
	_screenSize: function(){

		return window.screen.width + ' X ' + window.screen.height;
	},

	/**
	 * supportsVideo
	 * @property supportsVideo
	 * @return Boolean
	 */
	_supportsVideo: function (){
		return !!document.createElement('video').canPlayType;
	},

	/**
	 * supportsDate Comprueba si el navegador implementa correctamente un input-date
	 * @property supportsDate
	 * @return Boolean Devuelve true si el navegador soporta intput date
	 */
	_supportsDate: function(){
		var i = document.createElement('input');
		i.setAttribute('type', 'date');
		
		//if i.type === 'date' then the browser is compatible with dates, otherwise it does not support HTML5 dates
		//Hay navegadores que en versión de escritorio no soportan está característica pero en versión movil sí
		
		return (i.type === 'date');
	},

	/**
	 * supportsLocalStorage check if browser supports localStorage
	 * @property supportsLocalStorage
	 * @return Boolean
	 */
	_supportsLocalStorage: function (){
		// Feature detect + local reference
		// Also in iOS5 Private Browsing mode, attepting to use localStorage.setItem
		var storageTestKey = 'sTest';
		var isSupported = true;
		
		try{
			window.localStorage.setItem(storageTestKey, 'test');
		  	window.localStorage.removeItem(storageTestKey);
		}catch(e){
		  	isSupported = false;
		}
		return isSupported;
	},

	/**
	 * isPrivateBrowsing check if browser supports Storage
	 * @property isPrivateBrowsing
	 * @return Boolean [Returns true if private browsing]
	 */
	_isPrivateBrowsing: function () {
		var storageTestKey = 'sTest';
		var isPrivate = false;

		try {
			window.sessionStorage.setItem(storageTestKey, 'test');
			window.sessionStorage.removeItem(storageTestKey);
		} catch (e) {
			isPrivate = true;
		}

		return isPrivate;
	},
	/**
	* ratioToDensity Convierte pixel ratio a densidad de pantalla.
	* @property ratioToDensity
	* @param  {number} pixelRatio [pixelRatio device]
	* @return String
	*/
	_ratioToDensity: function (){
		var pixelRatio = window.devicePixelRatio || 1,
			densities = {
				'0.75': 'ldpi',
				'1': 'mdpi',
				'1.5': 'hdpi',
				'2': 'xhdpi',
				'3': 'xxhdpi',
				'4': 'xxxhdpi'
			};
		return ( typeof densities[pixelRatio] !== 'undefined' ) ? densities[pixelRatio] : 'mdpi';
	},

	
	/* Requisitos minimos dispositivo/browser */
	device: {
		minVersion: {
			//browser
			msie: 10.0,
			mozilla: 39,
			chrome: 30,
			edge: 12,
			//device
			iOS: 7,
			android: 4,
			windowsPhone:8,
			blackberry: 10.3,
			firefox: 2,
		}
	},

	isValidDevice: false,
	isValidBrowserVersion : false,
	isValidPlatformVersion : false,

	/**
	 * [_checkBrowserVersion comprobar versión del navegador]
	 * @return {Bool} [isValidBrowserVersion]
	 */
	_checkBrowserVersion: function(){
		var valid = false,
			self = this;

		switch(this._browserName()) {
		    case "BlackBerry":
		        valid = this._cmpVersion(this._browserVersion() , this.device.minVersion.blackberry);
		        break;
		    case "Chrome":
		        valid = this._cmpVersion(this._browserVersion() , this.device.minVersion.chrome);
		        break;
		    case "Mozilla":
		    case "Firefox":
		        valid = this._cmpVersion(this._browserVersion() , this.device.minVersion.mozilla);
		        break;
		    case "Safari":
		        valid = this._cmpVersion(this._browserVersion() , this.device.minVersion.iOS);
		        break;
		    case "Msie":
		        valid = this._cmpVersion(this._browserVersion() , this.device.minVersion.msie);
		        break;
		    case "Edge":
		        valid = this._cmpVersion(this._browserVersion() , this.device.minVersion.edge);
		        break;
		    default:
		    	//Para el resto de navegadores si pasa la validación de dispositivo y browser lo damos por válido
		    	valid = true;
		    	break;

		}
		self.isValidBrowserVersion = valid;
		return self;
	},
	
	/**
	 * [_checkBrowserVersion comprobar versión del navegador]
	 * @return {Bool} [isValidBrowserVersion]
	 */
	_checkPlatformVersion: function(){
		var valid = true,
			self = this;

		if(this._isMobileDevice()){
			switch(this._platformName()) {
			    case "BlackBerry":
			        valid = this._cmpVersion(this._platformVersion() , this.device.minVersion.blackberry);
			        break;
			    case "WindowsPhone":
			        valid = this._cmpVersion(this._platformVersion() , this.device.minVersion.WindowsPhone);
			        break;
			    case "IOS":
			        valid = this._cmpVersion(this._platformVersion() , this.device.minVersion.iOS);
			        break;
			    case "Android":
			        valid = this._cmpVersion(this._platformVersion() , this.device.minVersion.android);
			        break;
				case "FirefoxOS":
			        valid = this._cmpVersion(this._platformVersion() , this.device.minVersion.firefox);
			        break;

			    default:
			    	valid = true;
			    	break;

			}
		}
		self.isValidPlatformVersion = valid;	

		return self;
	},


	setValidDevice: function(){
		var self = this;
		self.isValidDevice = this.isValidBrowserVersion && this.isValidPlatformVersion;
		return self.isValidDevice;
	},

	_showFeatures: function (argument) {
		var ret = '';
		var nl ='<br>';
		var sep = nl + '------------------------------';

		//Device
		ret += sep;
		ret += nl + "Platform name: " + this._platformName();
		ret += nl + "Platform version: " +  this._platformVersion();
		ret += nl + "is Mobile Device: " +  this._isMobileDevice();
		ret += nl + "Screen Size: " +  this._screenSize();
		ret += nl + "Screen Density: " +  this._ratioToDensity();
		ret += sep;

		//Browser
		ret += sep;
		ret += nl + "Browser name: " + this._browserName();
		ret += nl + "Browser version: " +  this._browserVersion();
		ret += sep;

		//Advanced inputs
		ret += sep;
		ret += nl + "supports input-date: " + this._supportsDate();
		ret += nl + "supports input Video: " +  this._supportsVideo();
		ret += sep;

		//Storage
		ret += sep;
		ret += nl + "supportsLocalStorage: " + this._supportsLocalStorage();
		ret += nl + "isPrivateBrowsing: " +  this._isPrivateBrowsing();
		ret += sep;

		//Min version required
		ret += sep;
		ret += nl + "is valid device: " + this.isValidDevice;
		ret += sep;
		return ret;
	},

	setup: function(){
		
		this._checkBrowserVersion();
		this._checkPlatformVersion();

		this.setValidDevice();
	}
};
Browser.setup();
