//FWDRLUtils
(function (window){
	
	var FWDRLUtils = function(){};
	
	FWDRLUtils.dumy = document.createElement("div");
	
	//###################################//
	/* String */
	//###################################//
	FWDRLUtils.trim = function(str){
		return str.replace(/\s/gi, "");
	};
	
	FWDRLUtils.splitAndTrim = function(str, trim_bl){
		var array = str.split(",");
		var length = array.length;
		for(var i=0; i<length; i++){
			if(trim_bl) array[i] = FWDRLUtils.trim(array[i]);
		};
		return array;
	};

	//#############################################//
	//Array //
	//#############################################//
	FWDRLUtils.indexOfArray = function(array, prop){
		var length = array.length;
		for(var i=0; i<length; i++){
			if(array[i] === prop) return i;
		};
		return -1;
	};
	
	FWDRLUtils.randomizeArray = function(aArray) {
		var randomizedArray = [];
		var copyArray = aArray.concat();
			
		var length = copyArray.length;
		for(var i=0; i< length; i++) {
				var index = Math.floor(Math.random() * copyArray.length);
				randomizedArray.push(copyArray[index]);
				copyArray.splice(index,1);
			}
		return randomizedArray;
	};
	

	//#############################################//
	/*DOM manipulation */
	//#############################################//
	FWDRLUtils.parent = function (e, n){
		if(n === undefined) n = 1;
		while(n-- && e) e = e.parentNode;
		if(!e || e.nodeType !== 1) return null;
		return e;
	};
	
	FWDRLUtils.sibling = function(e, n){
		while (e && n !== 0){
			if(n > 0){
				if(e.nextElementSibling){
					 e = e.nextElementSibling;	 
				}else{
					for(var e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling);
				}
				n--;
			}else{
				if(e.previousElementSibling){
					 e = e.previousElementSibling;	 
				}else{
					for(var e = e.previousSibling; e && e.nodeType !== 1; e = e.previousSibling);
				}
				n++;
			}
		}
		return e;
	};
	
	FWDRLUtils.getChildAt = function (e, n){
		var kids = FWDRLUtils.getChildren(e);
		if(n < 0) n += kids.length;
		if(n < 0) return null;
		return kids[n];
	};
	
	FWDRLUtils.getChildById = function(id){
		return document.getElementById(id) || undefined;
	};
	
	FWDRLUtils.getChildren = function(e, allNodesTypes){
		var kids = [];
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes){
				kids.push(c);
			}else if(c.nodeType === 1){
				kids.push(c);
			}
		}
		return kids;
	};
	
	FWDRLUtils.getChildrenFromAttribute = function(e, attr, allNodesTypes){
		var kids = [];
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes && FWDRLUtils.hasAttribute(c, attr)){
				kids.push(c);
			}else if(c.nodeType === 1 && FWDRLUtils.hasAttribute(c, attr)){
				kids.push(c);
			}
		}
		return kids.length == 0 ? undefined : kids;
	};
	
	FWDRLUtils.getChildFromNodeListFromAttribute = function(e, attr, allNodesTypes){
		for(var c = e.firstChild; c != null; c = c.nextSibling){
			if(allNodesTypes && FWDRLUtils.hasAttribute(c, attr)){
				return c;
			}else if(c.nodeType === 1 && FWDRLUtils.hasAttribute(c, attr)){
				return c;
			}
		}
		return undefined;
	};
	
	FWDRLUtils.getAttributeValue = function(e, attr){
		if(!FWDRLUtils.hasAttribute(e, attr)) return undefined;
		return e.getAttribute(attr);	
	};
	
	FWDRLUtils.hasAttribute = function(e, attr){
		if(e.hasAttribute){
			return e.hasAttribute(attr); 
		}else {
			var test = e.getAttribute(attr);
			return  test ? true : false;
		}
	};
	
	FWDRLUtils.insertNodeAt = function(parent, child, n){
		var children = FWDRLUtils.children(parent);
		if(n < 0 || n > children.length){
			throw new Error("invalid index!");
		}else {
			parent.insertBefore(child, children[n]);
		};
	};
	
	FWDRLUtils.hasCanvas = function(){
		return Boolean(document.createElement("canvas"));
	};
	
	//###################################//
	/* DOM geometry */
	//##################################//
	FWDRLUtils.hitTest = function(target, x, y){
		var hit = false;
		if(!target) throw Error("Hit test target is null!");
		var rect = target.getBoundingClientRect();
		
		if(x >= rect.left && x <= rect.left +(rect.right - rect.left) && y >= rect.top && y <= rect.top + (rect.bottom - rect.top)) return true;
		return false;
	};
	
	FWDRLUtils.getScrollOffsets = function(){
		//all browsers
		if(window.pageXOffset != null) return{x:window.pageXOffset, y:window.pageYOffset};
		
		//ie7/ie8
		if(document.compatMode == "CSS1Compat"){
			return({x:document.documentElement.scrollLeft, y:document.documentElement.scrollTop});
		}
	};
	
	FWDRLUtils.getViewportSize = function(){
		if(FWDRLUtils.hasPointerEvent && navigator.msMaxTouchPoints > 1){
			return {w:document.documentElement.clientWidth || window.innerWidth, h:document.documentElement.clientHeight || window.innerHeight};
		}
		
		if(FWDRLUtils.isMobile) return {w:window.innerWidth, h:window.innerHeight};
		return {w:document.documentElement.clientWidth || window.innerWidth, h:document.documentElement.clientHeight || window.innerHeight};
	};
	
	FWDRLUtils.getViewportMouseCoordinates = function(e){
		var offsets = FWDRLUtils.getScrollOffsets();
		
		if(e.touches){
			return{
				screenX:e.touches[0] == undefined ? e.touches.pageX - offsets.x :e.touches[0].pageX - offsets.x,
				screenY:e.touches[0] == undefined ? e.touches.pageY - offsets.y :e.touches[0].pageY - offsets.y
			};
		}
		
		return{
			screenX: e.clientX == undefined ? e.pageX - offsets.x : e.clientX,
			screenY: e.clientY == undefined ? e.pageY - offsets.y : e.clientY
		};
	};
	
	
	//###################################//
	/* Browsers test */
	//##################################//
	FWDRLUtils.hasPointerEvent = (function(){
		return Boolean(window.navigator.msPointerEnabled) || Boolean(window.navigator.pointerEnabled);
	}());
	
	FWDRLUtils.isMobile = (function (){
		if((FWDRLUtils.hasPointerEvent && navigator.msMaxTouchPoints > 1) || (FWDRLUtils.hasPointerEvent && navigator.maxTouchPoints > 1)) return true;
		var agents = ['android', 'webos', 'iphone', 'ipad', 'blackberry', 'kfsowi'];
	    for(i in agents) {
	    	 if(String(navigator.userAgent).toLowerCase().indexOf(String(agents[i]).toLowerCase()) != -1) {
	            return true;
	        }
	    }
	    return false;
	}());
	
	FWDRLUtils.isAndroid = (function(){
		 return (navigator.userAgent.toLowerCase().indexOf("android".toLowerCase()) != -1);
	}());
	
	FWDRLUtils.isChrome = (function(){
		return navigator.userAgent.toLowerCase().indexOf('chrome') != -1;
	}());
	
	FWDRLUtils.isSafari = (function(){
		return navigator.userAgent.toLowerCase().indexOf('safari') != -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1;
	}());
	
	FWDRLUtils.isOpera = (function(){
		return navigator.userAgent.toLowerCase().indexOf('opera') != -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1;
	}());
	
	FWDRLUtils.isFirefox = (function(){
		return navigator.userAgent.toLowerCase().indexOf('firefox') != -1;
	}());
	
	FWDRLUtils.isIE = (function(){
		var isIE = Boolean(navigator.userAgent.toLowerCase().indexOf('msie') != -1) || Boolean(navigator.userAgent.toLowerCase().indexOf('edge') != -1);
		return Boolean(isIE || document.documentElement.msRequestFullscreen);
	}());
	
	FWDRLUtils.isIE11 = (function(){
		return Boolean(!FWDRLUtils.isIE && document.documentElement.msRequestFullscreen);
	}());
	
	FWDRLUtils.isIEAndLessThen9 = (function(){
		return navigator.userAgent.toLowerCase().indexOf("msie 7") != -1 || navigator.userAgent.toLowerCase().indexOf("msie 8") != -1;
	}());
	
	FWDRLUtils.isIEAndLessThen10 = (function(){
		return navigator.userAgent.toLowerCase().indexOf("msie 7") != -1 
		|| navigator.userAgent.toLowerCase().indexOf("msie 8") != -1
		|| navigator.userAgent.toLowerCase().indexOf("msie 9") != -1;
	}());
	
	FWDRLUtils.isIE7 = (function(){
		return navigator.userAgent.toLowerCase().indexOf("msie 7") != -1;
	}());
	
	FWDRLUtils.isIOS = (function(){
		return navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
	}());
	
	FWDRLUtils.isIphone = (function(){
		return navigator.userAgent.match(/(iPhone|iPod)/g);
	}());
	
	FWDRLUtils.isApple = (function(){
		return navigator.appVersion.toLowerCase().indexOf('mac') != -1;
	}());
	
	FWDRLUtils.isLocal = (function(){
		return location.href.indexOf('file:') != -1;
	}());
	
	FWDRLUtils.hasFullScreen = (function(){
		return FWDRLUtils.dumy.requestFullScreen || FWDRLUtils.dumy.mozRequestFullScreen || FWDRLUtils.dumy.webkitRequestFullScreen || FWDRLUtils.dumy.msieRequestFullScreen;
	}());
	
	function get3d(){
	    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform', 'KhtmlTransform'];
	    var p;
	    var position;
	    while (p = properties.shift()) {
	       if (typeof FWDRLUtils.dumy.style[p] !== 'undefined') {
	    	   FWDRLUtils.dumy.style.position = "absolute";
	    	   position = FWDRLUtils.dumy.getBoundingClientRect().left;
	    	   FWDRLUtils.dumy.style[p] = 'translate3d(500px, 0px, 0px)';
	    	   position = Math.abs(FWDRLUtils.dumy.getBoundingClientRect().left - position);
	    	   
	           if(position > 100 && position < 900){
	        	   try{document.documentElement.removeChild(FWDRLUtils.dumy);}catch(e){}
	        	   return true;
	           }
	       }
	    }
	    try{document.documentElement.removeChild(FWDRLUtils.dumy);}catch(e){}
	    return false;
	};
	
	function get2d(){
	    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform', 'KhtmlTransform'];
	    var p;
	    while (p = properties.shift()) {
	       if (typeof FWDRLUtils.dumy.style[p] !== 'undefined') {
	    	   return true;
	       }
	    }
	    try{document.documentElement.removeChild(FWDRLUtils.dumy);}catch(e){}
	    return false;
	};	
	
	//###############################################//
	/* various utils */
	//###############################################//
	FWDRLUtils.onReady =  function(callbalk){
		if (document.addEventListener) {
			document.addEventListener( "DOMContentLoaded", function(){
				FWDRLUtils.checkIfHasTransofrms();
				callbalk();
			});
		}else{
			document.onreadystatechange = function () {
				FWDRLUtils.checkIfHasTransofrms();
				if (document.readyState == "complete") callbalk();
			};
		 }
	};
	
	FWDRLUtils.checkIfHasTransofrms = function(){
		document.documentElement.appendChild(FWDRLUtils.dumy);
		FWDRLUtils.hasTransform3d = get3d();
		FWDRLUtils.hasTransform2d = get2d();
		FWDRLUtils.isReadyMethodCalled_bl = true;
	};
	
	FWDRLUtils.disableElementSelection = function(e){
		try{e.style.userSelect = "none";}catch(e){};
		try{e.style.MozUserSelect = "none";}catch(e){};
		try{e.style.webkitUserSelect = "none";}catch(e){};
		try{e.style.khtmlUserSelect = "none";}catch(e){};
		try{e.style.oUserSelect = "none";}catch(e){};
		try{e.style.msUserSelect = "none";}catch(e){};
		try{e.msUserSelect = "none";}catch(e){};
		e.onselectstart = function(){return false;};
	};
	
	FWDRLUtils.getSearchArgs = function(){
		var args = {};
		var query = location.href.substr(location.href.indexOf("?") + 1);
		
		var pairs = query.split("&");
		
		for(var i=0; i< pairs.length; i++){
			var pos = pairs[i].indexOf("=");
			var name = pairs[i].substring(0,pos);
			var value = pairs[i].substring(pos + 1);
			value = decodeURIComponent(value);
			args[name] = value;
		}
		return args;
	};
	
	FWDRLUtils.getHashArgs = function(string){
		var args = {};
		var query = string.substr(string.indexOf("#") + 1) || location.hash.substring(1);
		var pairs = query.split("&");
		for(var i=0; i< pairs.length; i++){
			var pos = pairs[i].indexOf("=");
			var name = pairs[i].substring(0,pos);
			var value = pairs[i].substring(pos + 1);
			value = decodeURIComponent(value);
			args[name] = value;
		}
		return args;
	};
	
	
	FWDRLUtils.isReadyMethodCalled_bl = false;
	
	window.FWDRLUtils = FWDRLUtils;
}(window));
/*!
 * VERSION: 1.19.0
 * DATE: 2016-07-14
 * FWDAnimation tween engine*
 **/
if(!window['FWDAnimation']){
var _fwd_gsScope = (typeof(fwd_module) !== "undefined" && fwd_module.exports && typeof(fwd_global) !== "undefined") ? fwd_global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_fwd_gsScope._fwd_gsQueue || (_fwd_gsScope._fwd_gsQueue = [])).push( function() {

	"use strict";

	_fwd_gsScope._gsDefine("FWDAnimation", ["core.Animation","core.SimpleTimeline","FWDTweenLite"], function(Animation, SimpleTimeline, FWDTweenLite) {

		var _slice = function(a) { //don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++]));
				return b;
			},
			_applyCycle = function(vars, targets, i) {
				var alt = vars.cycle,
					p, val;
				for (p in alt) {
					val = alt[p];
					vars[p] = (typeof(val) === "function") ? val(i, targets[i]) : val[i % val.length];
				}
				delete vars.cycle;
			},
			FWDAnimation = function(target, duration, vars) {
				FWDTweenLite.call(this, target, duration, vars);
				this._cycle = 0;
				this._yoyo = (this.vars.yoyo === true);
				this._repeat = this.vars.repeat || 0;
				this._repeatDelay = this.vars.repeatDelay || 0;
				this._dirty = true; //ensures that if there is any repeat, the totalDuration will get recalculated to accurately report it.
				this.render = FWDAnimation.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)
			},
			_tinyNum = 0.0000000001,
			TweenLiteInternals = FWDTweenLite._internals,
			_isSelector = TweenLiteInternals.isSelector,
			_isArray = TweenLiteInternals.isArray,
			p = FWDAnimation.prototype = FWDTweenLite.to({}, 0.1, {}),
			_blankArray = [];

		FWDAnimation.version = "1.19.0";
		p.constructor = FWDAnimation;
		p.kill()._gc = false;
		FWDAnimation.killTweensOf = FWDAnimation.killDelayedCallsTo = FWDTweenLite.killTweensOf;
		FWDAnimation.getTweensOf = FWDTweenLite.getTweensOf;
		FWDAnimation.lagSmoothing = FWDTweenLite.lagSmoothing;
		FWDAnimation.ticker = FWDTweenLite.ticker;
		FWDAnimation.render = FWDTweenLite.render;

		p.invalidate = function() {
			this._yoyo = (this.vars.yoyo === true);
			this._repeat = this.vars.repeat || 0;
			this._repeatDelay = this.vars.repeatDelay || 0;
			this._uncache(true);
			return FWDTweenLite.prototype.invalidate.call(this);
		};
		
		p.updateTo = function(vars, resetDuration) {
			var curRatio = this.ratio,
				immediate = this.vars.immediateRender || vars.immediateRender,
				p;
			if (resetDuration && this._startTime < this._timeline._time) {
				this._startTime = this._timeline._time;
				this._uncache(false);
				if (this._gc) {
					this._enabled(true, false);
				} else {
					this._timeline.insert(this, this._startTime - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			for (p in vars) {
				this.vars[p] = vars[p];
			}
			if (this._initted || immediate) {
				if (resetDuration) {
					this._initted = false;
					if (immediate) {
						this.render(0, true, true);
					}
				} else {
					if (this._gc) {
						this._enabled(true, false);
					}
					if (this._notifyPluginsOfEnabled && this._firstPT) {
						FWDTweenLite._onPluginEvent("_onDisable", this); //in case a plugin like MotionBlur must perform some cleanup tasks
					}
					if (this._time / this._duration > 0.998) { //if the tween has finished (or come extremely close to finishing), we just need to rewind it to 0 and then render it again at the end which forces it to re-initialize (parsing the new vars). We allow tweens that are close to finishing (but haven't quite finished) to work this way too because otherwise, the values are so small when determining where to project the starting values that binary math issues creep in and can make the tween appear to render incorrectly when run backwards. 
						var prevTime = this._totalTime;
						this.render(0, true, false);
						this._initted = false;
						this.render(prevTime, true, false);
					} else {
						this._initted = false;
						this._init();
						if (this._time > 0 || immediate) {
							var inv = 1 / (1 - curRatio),
								pt = this._firstPT, endValue;
							while (pt) {
								endValue = pt.s + pt.c;
								pt.c *= inv;
								pt.s = endValue - pt.c;
								pt = pt._next;
							}
						}
					}
				}
			}
			return this;
		};
				
		p.render = function(time, suppressEvents, force) {
			
			if (!this._initted) if (this._duration === 0 && this.vars.repeat) { //zero duration tweens that render immediately have render() called from FWDTweenLite's constructor, before FWDAnimation's constructor has finished setting _repeat, _repeatDelay, and _yoyo which are critical in determining totalDuration() so we need to call invalidate() which is a low-kb way to get those set properly.
				this.invalidate();
			}
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				prevTime = this._time,
				prevTotalTime = this._totalTime, 
				prevCycle = this._cycle,
				duration = this._duration,
				prevRawPrevTime = this._rawPrevTime,
				isComplete, callback, pt, cycleDuration, r, type, pow, rawPrevTime;
			if (time >= totalDur - 0.0000001) { //to work around occasional floating point math artifacts.
				this._totalTime = totalDur;
				this._cycle = this._repeat;
				if (this._yoyo && (this._cycle & 1) !== 0) {
					this._time = 0;
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				} else {
					this._time = duration;
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				}
				if (!this._reversed) {
					isComplete = true;
					callback = "onComplete";
					force = (force || this._timeline.autoRemoveChildren); //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
				}
				if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (this._startTime === this._timeline._duration) { //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
						time = 0;
					}
					if (prevRawPrevTime < 0 || (time <= 0 && time >= -0.0000001) || (prevRawPrevTime === _tinyNum && this.data !== "isPause")) if (prevRawPrevTime !== time) { //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
						force = true;
						if (prevRawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
					this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				}
				
			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = this._cycle = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTotalTime !== 0 || (duration === 0 && prevRawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (prevRawPrevTime >= 0) {
							force = true;
						}
						this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					}
				}
				if (!this._initted) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
					force = true;
				}
			} else {
				this._totalTime = this._time = time;
				if (this._repeat !== 0) {
					cycleDuration = duration + this._repeatDelay;
					this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)
					if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration && prevTotalTime <= time) {
						this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
					}
					this._time = this._totalTime - (this._cycle * cycleDuration);
					if (this._yoyo) if ((this._cycle & 1) !== 0) {
						this._time = duration - this._time;
					}
					if (this._time > duration) {
						this._time = duration;
					} else if (this._time < 0) {
						this._time = 0;
					}
				}

				if (this._easeType) {
					r = this._time / duration;
					type = this._easeType;
					pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}

					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (this._time / duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}

				} else {
					this.ratio = this._ease.getRatio(this._time / duration);
				}
				
			}
				
			if (prevTime === this._time && !force && prevCycle === this._cycle) {
				if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) { //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
					this._callback("onUpdate");
				}
				return;
			} else if (!this._initted) {
				this._init();
				if (!this._initted || this._gc) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
					return;
				} else if (!force && this._firstPT && ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration))) { //we stick it in the queue for rendering at the very end of the tick - this is a performance optimization because browsers invalidate styles and force a recalculation if you read, write, and then read style data (so it's better to read/read/read/write/write/write than read/write/read/write/read/write). The down side, of course, is that usually you WANT things to render immediately because you may have code running right after that which depends on the change. Like imagine running FWDTweenLite.set(...) and then immediately after that, creating a nother tween that animates the same property to another value; the starting values of that 2nd tween wouldn't be accurate if lazy is true.
					this._time = prevTime;
					this._totalTime = prevTotalTime;
					this._rawPrevTime = prevRawPrevTime;
					this._cycle = prevCycle;
					TweenLiteInternals.lazyTweens.push(this);
					this._lazy = [time, suppressEvents];
					return;
				}
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete) {
					this.ratio = this._ease.getRatio(this._time / duration);
				} else if (isComplete && this._ease._calcEnd) {
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
				}
			}
			if (this._lazy !== false) {
				this._lazy = false;
			}

			if (!this._active) if (!this._paused && this._time !== prevTime && time >= 0) {
				this._active = true; //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTotalTime === 0) {
				if (this._initted === 2 && time > 0) {
					//this.invalidate();
					this._init(); //will just apply overwriting since _initted of (2) means it was a from() tween that had immediateRender:true
				}
				if (this._startAt) {
					if (time >= 0) {
						this._startAt.render(time, suppressEvents, force);
					} else if (!callback) {
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}
				}
				if (this.vars.onStart) if (this._totalTime !== 0 || duration === 0) if (!suppressEvents) {
					this._callback("onStart");
				}
			}
			
			pt = this._firstPT;
			while (pt) 
			{
				if (pt.f) 
				{
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} 
				else 
				{
					var newVal = pt.c * this.ratio + pt.s;
				
					if (pt.p == "x")
					{
						pt.t.setX(newVal);
					}
					else if (pt.p == "y")
					{
						pt.t.setY(newVal);
					}
					else if (pt.p == "z")
					{
						pt.t.setZ(newVal);
					}
					else if (pt.p == "angleX")
					{
						pt.t.setAngleX(newVal);
					}
					else if (pt.p == "angleY")
					{
						pt.t.setAngleY(newVal);
					}
					else if (pt.p == "angleZ")
					{
						pt.t.setAngleZ(newVal);
					}
					else if (pt.p == "w")
					{
						pt.t.setWidth(newVal);
					}
					else if (pt.p == "h")
					{
						pt.t.setHeight(newVal);
					}
					else if (pt.p == "alpha")
					{
						pt.t.setAlpha(newVal);
					}
					else if (pt.p == "scale")
					{
						pt.t.setScale2(newVal);
					}
					else
					{
						pt.t[pt.p] = newVal;
					}
				}
				pt = pt._next;
			}
			
			if (this._onUpdate) {
				if (time < 0) if (this._startAt && this._startTime) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}
				if (!suppressEvents) if (this._totalTime !== prevTotalTime || callback) {
					this._callback("onUpdate");
				}
			}
			if (this._cycle !== prevCycle) if (!suppressEvents) if (!this._gc) if (this.vars.onRepeat) {
				this._callback("onRepeat");
			}
			if (callback) if (!this._gc || force) { //check gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate && this._startTime) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, suppressEvents, force);
				}
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
				if (duration === 0 && this._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) { //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
					this._rawPrevTime = 0;
				}
			}
		};
		
//---- STATIC FUNCTIONS -----------------------------------------------------------------------------------------------------------
		
		FWDAnimation.to = function(target, duration, vars) {
			return new FWDAnimation(target, duration, vars);
		};
		
		FWDAnimation.from = function(target, duration, vars) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return new FWDAnimation(target, duration, vars);
		};
		
		FWDAnimation.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return new FWDAnimation(target, duration, toVars);
		};
		
		FWDAnimation.staggerTo = FWDAnimation.allTo = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			stagger = stagger || 0;
			var delay = 0,
				a = [],
				finalComplete = function() {
					if (vars.onComplete) {
						vars.onComplete.apply(vars.onCompleteScope || this, arguments);
					}
					onCompleteAll.apply(onCompleteAllScope || vars.callbackScope || this, onCompleteAllParams || _blankArray);
				},
				cycle = vars.cycle,
				fromCycle = (vars.startAt && vars.startAt.cycle),
				l, copy, i, p;
			if (!_isArray(targets)) {
				if (typeof(targets) === "string") {
					targets = FWDTweenLite.selector(targets) || targets;
				}
				if (_isSelector(targets)) {
					targets = _slice(targets);
				}
			}
			targets = targets || [];
			if (stagger < 0) {
				targets = _slice(targets);
				targets.reverse();
				stagger *= -1;
			}
			l = targets.length - 1;
			for (i = 0; i <= l; i++) {
				copy = {};
				for (p in vars) {
					copy[p] = vars[p];
				}
				if (cycle) {
					_applyCycle(copy, targets, i);
					if (copy.duration != null) {
						duration = copy.duration;
						delete copy.duration;
					}
				}
				if (fromCycle) {
					fromCycle = copy.startAt = {};
					for (p in vars.startAt) {
						fromCycle[p] = vars.startAt[p];
					}
					_applyCycle(copy.startAt, targets, i);
				}
				copy.delay = delay + (copy.delay || 0);
				if (i === l && onCompleteAll) {
					copy.onComplete = finalComplete;
				}
				a[i] = new FWDAnimation(targets[i], duration, copy);
				delay += stagger;
			}
			return a;
		};
		
		FWDAnimation.staggerFrom = FWDAnimation.allFrom = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return FWDAnimation.staggerTo(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};
		
		FWDAnimation.staggerFromTo = FWDAnimation.allFromTo = function(targets, duration, fromVars, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return FWDAnimation.staggerTo(targets, duration, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};
				
		FWDAnimation.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new FWDAnimation(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, callbackScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, immediateRender:false, useFrames:useFrames, overwrite:0});
		};
		
		FWDAnimation.set = function(target, vars) {
			return new FWDAnimation(target, 0, vars);
		};
		
		FWDAnimation.isTweening = function(target) {
			return (FWDTweenLite.getTweensOf(target, true).length > 0);
		};
		
		var _getChildrenOf = function(timeline, includeTimelines) {
				var a = [],
					cnt = 0,
					tween = timeline._first;
				while (tween) {
					if (tween instanceof FWDTweenLite) {
						a[cnt++] = tween;
					} else {
						if (includeTimelines) {
							a[cnt++] = tween;
						}
						a = a.concat(_getChildrenOf(tween, includeTimelines));
						cnt = a.length;
					}
					tween = tween._next;
				}
				return a;
			}, 
			getAllTweens = FWDAnimation.getAllTweens = function(includeTimelines) {
				return _getChildrenOf(Animation._rootTimeline, includeTimelines).concat( _getChildrenOf(Animation._rootFramesTimeline, includeTimelines) );
			};
		
		FWDAnimation.killAll = function(complete, tweens, delayedCalls, timelines) {
			if (tweens == null) {
				tweens = true;
			}
			if (delayedCalls == null) {
				delayedCalls = true;
			}
			var a = getAllTweens((timelines != false)),
				l = a.length,
				allTrue = (tweens && delayedCalls && timelines),
				isDC, tween, i;
			for (i = 0; i < l; i++) {
				tween = a[i];
				if (allTrue || (tween instanceof SimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
					if (complete) {
						tween.totalTime(tween._reversed ? 0 : tween.totalDuration());
					} else {
						tween._enabled(false, false);
					}
				}
			}
		};
		
		FWDAnimation.killChildTweensOf = function(parent, complete) {
			if (parent == null) {
				return;
			}
			var tl = TweenLiteInternals.tweenLookup,
				a, curParent, p, i, l;
			if (typeof(parent) === "string") {
				parent = FWDTweenLite.selector(parent) || parent;
			}
			if (_isSelector(parent)) {
				parent = _slice(parent);
			}
			if (_isArray(parent)) {
				i = parent.length;
				while (--i > -1) {
					FWDAnimation.killChildTweensOf(parent[i], complete);
				}
				return;
			}
			a = [];
			for (p in tl) {
				curParent = tl[p].target.parentNode;
				while (curParent) {
					if (curParent === parent) {
						a = a.concat(tl[p].tweens);
					}
					curParent = curParent.parentNode;
				}
			}
			l = a.length;
			for (i = 0; i < l; i++) {
				if (complete) {
					a[i].totalTime(a[i].totalDuration());
				}
				a[i]._enabled(false, false);
			}
		};

		var _changePause = function(pause, tweens, delayedCalls, timelines) {
			tweens = (tweens !== false);
			delayedCalls = (delayedCalls !== false);
			timelines = (timelines !== false);
			var a = getAllTweens(timelines),
				allTrue = (tweens && delayedCalls && timelines),
				i = a.length,
				isDC, tween;
			while (--i > -1) {
				tween = a[i];
				if (allTrue || (tween instanceof SimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
					tween.paused(pause);
				}
			}
		};
		
		FWDAnimation.pauseAll = function(tweens, delayedCalls, timelines) {
			_changePause(true, tweens, delayedCalls, timelines);
		};
		
		FWDAnimation.resumeAll = function(tweens, delayedCalls, timelines) {
			_changePause(false, tweens, delayedCalls, timelines);
		};

		FWDAnimation.globalTimeScale = function(value) {
			var tl = Animation._rootTimeline,
				t = FWDTweenLite.ticker.time;
			if (!arguments.length) {
				return tl._timeScale;
			}
			value = value || _tinyNum; //can't allow zero because it'll throw the math off
			tl._startTime = t - ((t - tl._startTime) * tl._timeScale / value);
			tl = Animation._rootFramesTimeline;
			t = FWDTweenLite.ticker.frame;
			tl._startTime = t - ((t - tl._startTime) * tl._timeScale / value);
			tl._timeScale = Animation._rootTimeline._timeScale = value;
			return value;
		};
		
	
//---- GETTERS / SETTERS ----------------------------------------------------------------------------------------------------------
		
		p.progress = function(value, suppressEvents) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime( this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), suppressEvents);
		};
		
		p.totalProgress = function(value, suppressEvents) {
			return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime( this.totalDuration() * value, suppressEvents);
		};
		
		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			if (this._yoyo && (this._cycle & 1) !== 0) {
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
			} else if (this._repeat !== 0) {
				value += this._cycle * (this._duration + this._repeatDelay);
			}
			return this.totalTime(value, suppressEvents);
		};

		p.duration = function(value) {
			if (!arguments.length) {
				return this._duration; //don't set _dirty = false because there could be repeats that haven't been factored into the _totalDuration yet. Otherwise, if you create a repeated FWDAnimation and then immediately check its duration(), it would cache the value and the totalDuration would not be correct, thus repeats wouldn't take effect.
			}
			return Animation.prototype.duration.call(this, value);
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					//instead of Infinity, we use 999999999999 so that we can accommodate reverses
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
					this._dirty = false;
				}
				return this._totalDuration;
			}
			return (this._repeat === -1) ? this : this.duration( (value - (this._repeat * this._repeatDelay)) / (this._repeat + 1) );
		};
		
		p.repeat = function(value) {
			if (!arguments.length) {
				return this._repeat;
			}
			this._repeat = value;
			return this._uncache(true);
		};
		
		p.repeatDelay = function(value) {
			if (!arguments.length) {
				return this._repeatDelay;
			}
			this._repeatDelay = value;
			return this._uncache(true);
		};
		
		p.yoyo = function(value) {
			if (!arguments.length) {
				return this._yoyo;
			}
			this._yoyo = value;
			return this;
		};
		
		
		return FWDAnimation;
		
	}, true);








/*
 * ----------------------------------------------------------------
 * TimelineLite
 * ----------------------------------------------------------------
 */
	_fwd_gsScope._gsDefine("TimelineLite", ["core.Animation","core.SimpleTimeline","FWDTweenLite"], function(Animation, SimpleTimeline, FWDTweenLite) {

		var TimelineLite = function(vars) {
				SimpleTimeline.call(this, vars);
				this._labels = {};
				this.autoRemoveChildren = (this.vars.autoRemoveChildren === true);
				this.smoothChildTiming = (this.vars.smoothChildTiming === true);
				this._sortChildren = true;
				this._onUpdate = this.vars.onUpdate;
				var v = this.vars,
					val, p;
				for (p in v) {
					val = v[p];
					if (_isArray(val)) if (val.join("").indexOf("{self}") !== -1) {
						v[p] = this._swapSelfInParams(val);
					}
				}
				if (_isArray(v.tweens)) {
					this.add(v.tweens, 0, v.align, v.stagger);
				}
			},
			_tinyNum = 0.0000000001,
			TweenLiteInternals = FWDTweenLite._internals,
			_internals = TimelineLite._internals = {},
			_isSelector = TweenLiteInternals.isSelector,
			_isArray = TweenLiteInternals.isArray,
			_lazyTweens = TweenLiteInternals.lazyTweens,
			_lazyRender = TweenLiteInternals.lazyRender,
			_globals = _fwd_gsScope._gsDefine.globals,
			_copy = function(vars) {
				var copy = {}, p;
				for (p in vars) {
					copy[p] = vars[p];
				}
				return copy;
			},
			_applyCycle = function(vars, targets, i) {
				var alt = vars.cycle,
					p, val;
				for (p in alt) {
					val = alt[p];
					vars[p] = (typeof(val) === "function") ? val.call(targets[i], i) : val[i % val.length];
				}
				delete vars.cycle;
			},
			_pauseCallback = _internals.pauseCallback = function() {},
			_slice = function(a) { //don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++]));
				return b;
			},
			p = TimelineLite.prototype = new SimpleTimeline();

		TimelineLite.version = "1.19.0";
		p.constructor = TimelineLite;
		p.kill()._gc = p._forcingPlayhead = p._hasPause = false;

		/* might use later...
		//translates a local time inside an animation to the corresponding time on the root/fwd_global timeline, factoring in all nesting and timeScales.
		function localToGlobal(time, animation) {
			while (animation) {
				time = (time / animation._timeScale) + animation._startTime;
				animation = animation.timeline;
			}
			return time;
		}

		//translates the supplied time on the root/fwd_global timeline into the corresponding local time inside a particular animation, factoring in all nesting and timeScales
		function globalToLocal(time, animation) {
			var scale = 1;
			time -= localToGlobal(0, animation);
			while (animation) {
				scale *= animation._timeScale;
				animation = animation.timeline;
			}
			return time * scale;
		}
		*/

		p.to = function(target, duration, vars, position) {
			var Engine = (vars.repeat && _globals.FWDAnimation) || FWDTweenLite;
			return duration ? this.add( new Engine(target, duration, vars), position) : this.set(target, vars, position);
		};

		p.from = function(target, duration, vars, position) {
			return this.add( ((vars.repeat && _globals.FWDAnimation) || FWDTweenLite).from(target, duration, vars), position);
		};

		p.fromTo = function(target, duration, fromVars, toVars, position) {
			var Engine = (toVars.repeat && _globals.FWDAnimation) || FWDTweenLite;
			return duration ? this.add( Engine.fromTo(target, duration, fromVars, toVars), position) : this.set(target, toVars, position);
		};

		p.staggerTo = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			var tl = new TimelineLite({onComplete:onCompleteAll, onCompleteParams:onCompleteAllParams, callbackScope:onCompleteAllScope, smoothChildTiming:this.smoothChildTiming}),
				cycle = vars.cycle,
				copy, i;
			if (typeof(targets) === "string") {
				targets = FWDTweenLite.selector(targets) || targets;
			}
			targets = targets || [];
			if (_isSelector(targets)) { //senses if the targets object is a selector. If it is, we should translate it into an array.
				targets = _slice(targets);
			}
			stagger = stagger || 0;
			if (stagger < 0) {
				targets = _slice(targets);
				targets.reverse();
				stagger *= -1;
			}
			for (i = 0; i < targets.length; i++) {
				copy = _copy(vars);
				if (copy.startAt) {
					copy.startAt = _copy(copy.startAt);
					if (copy.startAt.cycle) {
						_applyCycle(copy.startAt, targets, i);
					}
				}
				if (cycle) {
					_applyCycle(copy, targets, i);
					if (copy.duration != null) {
						duration = copy.duration;
						delete copy.duration;
					}
				}
				tl.to(targets[i], duration, copy, i * stagger);
			}
			return this.add(tl, position);
		};

		p.staggerFrom = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.immediateRender = (vars.immediateRender != false);
			vars.runBackwards = true;
			return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.staggerFromTo = function(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};

		p.call = function(callback, params, scope, position) {
			return this.add( FWDTweenLite.delayedCall(0, callback, params, scope), position);
		};

		p.set = function(target, vars, position) {
			position = this._parseTimeOrLabel(position, 0, true);
			if (vars.immediateRender == null) {
				vars.immediateRender = (position === this._time && !this._paused);
			}
			return this.add( new FWDTweenLite(target, 0, vars), position);
		};

		TimelineLite.exportRoot = function(vars, ignoreDelayedCalls) {
			vars = vars || {};
			if (vars.smoothChildTiming == null) {
				vars.smoothChildTiming = true;
			}
			var tl = new TimelineLite(vars),
				root = tl._timeline,
				tween, next;
			if (ignoreDelayedCalls == null) {
				ignoreDelayedCalls = true;
			}
			root._remove(tl, true);
			tl._startTime = 0;
			tl._rawPrevTime = tl._time = tl._totalTime = root._time;
			tween = root._first;
			while (tween) {
				next = tween._next;
				if (!ignoreDelayedCalls || !(tween instanceof FWDTweenLite && tween.target === tween.vars.onComplete)) {
					tl.add(tween, tween._startTime - tween._delay);
				}
				tween = next;
			}
			root.add(tl, 0);
			return tl;
		};

		p.add = function(value, position, align, stagger) {
			var curTime, l, i, child, tl, beforeRawTime;
			if (typeof(position) !== "number") {
				position = this._parseTimeOrLabel(position, 0, true, value);
			}
			if (!(value instanceof Animation)) {
				if ((value instanceof Array) || (value && value.push && _isArray(value))) {
					align = align || "normal";
					stagger = stagger || 0;
					curTime = position;
					l = value.length;
					for (i = 0; i < l; i++) {
						if (_isArray(child = value[i])) {
							child = new TimelineLite({tweens:child});
						}
						this.add(child, curTime);
						if (typeof(child) !== "string" && typeof(child) !== "function") {
							if (align === "sequence") {
								curTime = child._startTime + (child.totalDuration() / child._timeScale);
							} else if (align === "start") {
								child._startTime -= child.delay();
							}
						}
						curTime += stagger;
					}
					return this._uncache(true);
				} else if (typeof(value) === "string") {
					return this.addLabel(value, position);
				} else if (typeof(value) === "function") {
					value = FWDTweenLite.delayedCall(0, value);
				} else {
					throw("Cannot add " + value + " into the timeline; it is not a tween, timeline, function, or string.");
				}
			}

			SimpleTimeline.prototype.add.call(this, value, position);

			//if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.
			if (this._gc || this._time === this._duration) if (!this._paused) if (this._duration < this.duration()) {
				//in case any of the ancestors had completed but should now be enabled...
				tl = this;
				beforeRawTime = (tl.rawTime() > value._startTime); //if the tween is placed on the timeline so that it starts BEFORE the current rawTime, we should align the playhead (move the timeline). This is because sometimes users will create a timeline, let it finish, and much later append a tween and expect it to run instead of jumping to its end state. While technically one could argue that it should jump to its end state, that's not what users intuitively expect.
				while (tl._timeline) {
					if (beforeRawTime && tl._timeline.smoothChildTiming) {
						tl.totalTime(tl._totalTime, true); //moves the timeline (shifts its startTime) if necessary, and also enables it.
					} else if (tl._gc) {
						tl._enabled(true, false);
					}
					tl = tl._timeline;
				}
			}

			return this;
		};

		p.remove = function(value) {
			if (value instanceof Animation) {
				this._remove(value, false);
				var tl = value._timeline = value.vars.useFrames ? Animation._rootFramesTimeline : Animation._rootTimeline; //now that it's removed, default it to the root timeline so that if it gets played again, it doesn't jump back into this timeline.
				value._startTime = (value._paused ? value._pauseTime : tl._time) - ((!value._reversed ? value._totalTime : value.totalDuration() - value._totalTime) / value._timeScale); //ensure that if it gets played again, the timing is correct.
				return this;
			} else if (value instanceof Array || (value && value.push && _isArray(value))) {
				var i = value.length;
				while (--i > -1) {
					this.remove(value[i]);
				}
				return this;
			} else if (typeof(value) === "string") {
				return this.removeLabel(value);
			}
			return this.kill(null, value);
		};

		p._remove = function(tween, skipDisable) {
			SimpleTimeline.prototype._remove.call(this, tween, skipDisable);
			var last = this._last;
			if (!last) {
				this._time = this._totalTime = this._duration = this._totalDuration = 0;
			} else if (this._time > last._startTime + last._totalDuration / last._timeScale) {
				this._time = this.duration();
				this._totalTime = this._totalDuration;
			}
			return this;
		};

		p.append = function(value, offsetOrLabel) {
			return this.add(value, this._parseTimeOrLabel(null, offsetOrLabel, true, value));
		};

		p.insert = p.insertMultiple = function(value, position, align, stagger) {
			return this.add(value, position || 0, align, stagger);
		};

		p.appendMultiple = function(tweens, offsetOrLabel, align, stagger) {
			return this.add(tweens, this._parseTimeOrLabel(null, offsetOrLabel, true, tweens), align, stagger);
		};

		p.addLabel = function(label, position) {
			this._labels[label] = this._parseTimeOrLabel(position);
			return this;
		};

		p.addPause = function(position, callback, params, scope) {
			var t = FWDTweenLite.delayedCall(0, _pauseCallback, params, scope || this);
			t.vars.onComplete = t.vars.onReverseComplete = callback;
			t.data = "isPause";
			this._hasPause = true;
			return this.add(t, position);
		};

		p.removeLabel = function(label) {
			delete this._labels[label];
			return this;
		};

		p.getLabelTime = function(label) {
			return (this._labels[label] != null) ? this._labels[label] : -1;
		};

		p._parseTimeOrLabel = function(timeOrLabel, offsetOrLabel, appendIfAbsent, ignore) {
			var i;
			//if we're about to add a tween/timeline (or an array of them) that's already a child of this timeline, we should remove it first so that it doesn't contaminate the duration().
			if (ignore instanceof Animation && ignore.timeline === this) {
				this.remove(ignore);
			} else if (ignore && ((ignore instanceof Array) || (ignore.push && _isArray(ignore)))) {
				i = ignore.length;
				while (--i > -1) {
					if (ignore[i] instanceof Animation && ignore[i].timeline === this) {
						this.remove(ignore[i]);
					}
				}
			}
			if (typeof(offsetOrLabel) === "string") {
				return this._parseTimeOrLabel(offsetOrLabel, (appendIfAbsent && typeof(timeOrLabel) === "number" && this._labels[offsetOrLabel] == null) ? timeOrLabel - this.duration() : 0, appendIfAbsent);
			}
			offsetOrLabel = offsetOrLabel || 0;
			if (typeof(timeOrLabel) === "string" && (isNaN(timeOrLabel) || this._labels[timeOrLabel] != null)) { //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
				i = timeOrLabel.indexOf("=");
				if (i === -1) {
					if (this._labels[timeOrLabel] == null) {
						return appendIfAbsent ? (this._labels[timeOrLabel] = this.duration() + offsetOrLabel) : offsetOrLabel;
					}
					return this._labels[timeOrLabel] + offsetOrLabel;
				}
				offsetOrLabel = parseInt(timeOrLabel.charAt(i-1) + "1", 10) * Number(timeOrLabel.substr(i+1));
				timeOrLabel = (i > 1) ? this._parseTimeOrLabel(timeOrLabel.substr(0, i-1), 0, appendIfAbsent) : this.duration();
			} else if (timeOrLabel == null) {
				timeOrLabel = this.duration();
			}
			return Number(timeOrLabel) + offsetOrLabel;
		};

		p.seek = function(position, suppressEvents) {
			return this.totalTime((typeof(position) === "number") ? position : this._parseTimeOrLabel(position), (suppressEvents !== false));
		};

		p.stop = function() {
			return this.paused(true);
		};

		p.gotoAndPlay = function(position, suppressEvents) {
			return this.play(position, suppressEvents);
		};

		p.gotoAndStop = function(position, suppressEvents) {
			return this.pause(position, suppressEvents);
		};

		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				prevTime = this._time,
				prevStart = this._startTime,
				prevTimeScale = this._timeScale,
				prevPaused = this._paused,
				tween, isComplete, next, callback, internalForce, pauseTween, curTime;
			if (time >= totalDur - 0.0000001) { //to work around occasional floating point math artifacts.
				this._totalTime = this._time = totalDur;
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					internalForce = !!this._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
					if (this._duration === 0) if ((time <= 0 && time >= -0.0000001) || this._rawPrevTime < 0 || this._rawPrevTime === _tinyNum) if (this._rawPrevTime !== time && this._first) {
						internalForce = true;
						if (this._rawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
				}
				this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				time = totalDur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7.

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime !== _tinyNum && (this._rawPrevTime > 0 || (time < 0 && this._rawPrevTime >= 0)))) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._timeline.autoRemoveChildren && this._reversed) { //ensures proper GC if a timeline is resumed after it's finished reversing.
						internalForce = isComplete = true;
						callback = "onReverseComplete";
					} else if (this._rawPrevTime >= 0 && this._first) { //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
						internalForce = true;
					}
					this._rawPrevTime = time;
				} else {
					this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					if (time === 0 && isComplete) { //if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
						tween = this._first;
						while (tween && tween._startTime === 0) {
							if (!tween._duration) {
								isComplete = false;
							}
							tween = tween._next;
						}
					}
					time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)
					if (!this._initted) {
						internalForce = true;
					}
				}

			} else {

				if (this._hasPause && !this._forcingPlayhead && !suppressEvents) {
					if (time >= prevTime) {
						tween = this._first;
						while (tween && tween._startTime <= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && this._rawPrevTime === 0)) {
								pauseTween = tween;
							}
							tween = tween._next;
						}
					} else {
						tween = this._last;
						while (tween && tween._startTime >= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
								pauseTween = tween;
							}
							tween = tween._prev;
						}
					}
					if (pauseTween) {
						this._time = time = pauseTween._startTime;
						this._totalTime = time + (this._cycle * (this._totalDuration + this._repeatDelay));
					}
				}

				this._totalTime = this._time = this._rawPrevTime = time;
			}
			if ((this._time === prevTime || !this._first) && !force && !internalForce && !pauseTween) {
				return;
			} else if (!this._initted) {
				this._initted = true;
			}
			
			

			if (!this._active) if (!this._paused && this._time !== prevTime && time > 0) {
				this._active = true;  //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
			}

			if (prevTime === 0) if (this.vars.onStart) if (this._time !== 0 || !this._duration) if (!suppressEvents) {
				this._callback("onStart");
			}

			curTime = this._time;
			if (curTime >= prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= curTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the timeline and cease rendering. This is only a concern when going in reverse.
							while (pauseTween && pauseTween.endTime() > this._time) {
								pauseTween.render( (pauseTween._reversed ? pauseTween.totalDuration() - ((time - pauseTween._startTime) * pauseTween._timeScale) : (time - pauseTween._startTime) * pauseTween._timeScale), suppressEvents, force);
								pauseTween = pauseTween._prev;
							}
							pauseTween = null;
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			}

			if (this._onUpdate) if (!suppressEvents) {
				if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
					_lazyRender();
				}
				this._callback("onUpdate");
			}

			if (callback) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
						_lazyRender();
					}
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
			}
		};

		p._hasPausedChild = function() {
			var tween = this._first;
			while (tween) {
				if (tween._paused || ((tween instanceof TimelineLite) && tween._hasPausedChild())) {
					return true;
				}
				tween = tween._next;
			}
			return false;
		};

		p.getChildren = function(nested, tweens, timelines, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || -9999999999;
			var a = [],
				tween = this._first,
				cnt = 0;
			while (tween) {
				if (tween._startTime < ignoreBeforeTime) {
					//do nothing
				} else if (tween instanceof FWDTweenLite) {
					if (tweens !== false) {
						a[cnt++] = tween;
					}
				} else {
					if (timelines !== false) {
						a[cnt++] = tween;
					}
					if (nested !== false) {
						a = a.concat(tween.getChildren(true, tweens, timelines));
						cnt = a.length;
					}
				}
				tween = tween._next;
			}
			return a;
		};

		p.getTweensOf = function(target, nested) {
			var disabled = this._gc,
				a = [],
				cnt = 0,
				tweens, i;
			if (disabled) {
				this._enabled(true, true); //getTweensOf() filters out disabled tweens, and we have to mark them as _gc = true when the timeline completes in order to allow clean garbage collection, so temporarily re-enable the timeline here.
			}
			tweens = FWDTweenLite.getTweensOf(target);
			i = tweens.length;
			while (--i > -1) {
				if (tweens[i].timeline === this || (nested && this._contains(tweens[i]))) {
					a[cnt++] = tweens[i];
				}
			}
			if (disabled) {
				this._enabled(false, true);
			}
			return a;
		};

		p.recent = function() {
			return this._recent;
		};

		p._contains = function(tween) {
			var tl = tween.timeline;
			while (tl) {
				if (tl === this) {
					return true;
				}
				tl = tl.timeline;
			}
			return false;
		};

		p.shiftChildren = function(amount, adjustLabels, ignoreBeforeTime) {
			ignoreBeforeTime = ignoreBeforeTime || 0;
			var tween = this._first,
				labels = this._labels,
				p;
			while (tween) {
				if (tween._startTime >= ignoreBeforeTime) {
					tween._startTime += amount;
				}
				tween = tween._next;
			}
			if (adjustLabels) {
				for (p in labels) {
					if (labels[p] >= ignoreBeforeTime) {
						labels[p] += amount;
					}
				}
			}
			return this._uncache(true);
		};

		p._kill = function(vars, target) {
			if (!vars && !target) {
				return this._enabled(false, false);
			}
			var tweens = (!target) ? this.getChildren(true, true, false) : this.getTweensOf(target),
				i = tweens.length,
				changed = false;
			while (--i > -1) {
				if (tweens[i]._kill(vars, target)) {
					changed = true;
				}
			}
			return changed;
		};

		p.clear = function(labels) {
			var tweens = this.getChildren(false, true, true),
				i = tweens.length;
			this._time = this._totalTime = 0;
			while (--i > -1) {
				tweens[i]._enabled(false, false);
			}
			if (labels !== false) {
				this._labels = {};
			}
			return this._uncache(true);
		};

		p.invalidate = function() {
			var tween = this._first;
			while (tween) {
				tween.invalidate();
				tween = tween._next;
			}
			return Animation.prototype.invalidate.call(this);;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (enabled === this._gc) {
				var tween = this._first;
				while (tween) {
					tween._enabled(enabled, true);
					tween = tween._next;
				}
			}
			return SimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline);
		};

		p.totalTime = function(time, suppressEvents, uncapped) {
			this._forcingPlayhead = true;
			var val = Animation.prototype.totalTime.apply(this, arguments);
			this._forcingPlayhead = false;
			return val;
		};

		p.duration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					this.totalDuration(); //just triggers recalculation
				}
				return this._duration;
			}
			if (this.duration() !== 0 && value !== 0) {
				this.timeScale(this._duration / value);
			}
			return this;
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					var max = 0,
						tween = this._last,
						prevStart = 999999999999,
						prev, end;
					while (tween) {
						prev = tween._prev; //record it here in case the tween changes position in the sequence...
						if (tween._dirty) {
							tween.totalDuration(); //could change the tween._startTime, so make sure the tween's cache is clean before analyzing it.
						}
						if (tween._startTime > prevStart && this._sortChildren && !tween._paused) { //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
							this.add(tween, tween._startTime - tween._delay);
						} else {
							prevStart = tween._startTime;
						}
						if (tween._startTime < 0 && !tween._paused) { //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
							max -= tween._startTime;
							if (this._timeline.smoothChildTiming) {
								this._startTime += tween._startTime / this._timeScale;
							}
							this.shiftChildren(-tween._startTime, false, -9999999999);
							prevStart = 0;
						}
						end = tween._startTime + (tween._totalDuration / tween._timeScale);
						if (end > max) {
							max = end;
						}
						tween = prev;
					}
					this._duration = this._totalDuration = max;
					this._dirty = false;
				}
				return this._totalDuration;
			}
			return (value && this.totalDuration()) ? this.timeScale(this._totalDuration / value) : this;
		};

		p.paused = function(value) {
			if (!value) { //if there's a pause directly at the spot from where we're unpausing, skip it.
				var tween = this._first,
					time = this._time;
				while (tween) {
					if (tween._startTime === time && tween.data === "isPause") {
						tween._rawPrevTime = 0; //remember, _rawPrevTime is how zero-duration tweens/callbacks sense directionality and determine whether or not to fire. If _rawPrevTime is the same as _startTime on the next render, it won't fire.
					}
					tween = tween._next;
				}
			}
			return Animation.prototype.paused.apply(this, arguments);
		};

		p.usesFrames = function() {
			var tl = this._timeline;
			while (tl._timeline) {
				tl = tl._timeline;
			}
			return (tl === Animation._rootFramesTimeline);
		};

		p.rawTime = function() {
			return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale;
		};

		return TimelineLite;

	}, true);








	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * TimelineMax
 * ----------------------------------------------------------------
 */
	_fwd_gsScope._gsDefine("TimelineMax", ["TimelineLite","FWDTweenLite","easing.Ease"], function(TimelineLite, FWDTweenLite, Ease) {

		var TimelineMax = function(vars) {
				TimelineLite.call(this, vars);
				this._repeat = this.vars.repeat || 0;
				this._repeatDelay = this.vars.repeatDelay || 0;
				this._cycle = 0;
				this._yoyo = (this.vars.yoyo === true);
				this._dirty = true;
			},
			_tinyNum = 0.0000000001,
			TweenLiteInternals = FWDTweenLite._internals,
			_lazyTweens = TweenLiteInternals.lazyTweens,
			_lazyRender = TweenLiteInternals.lazyRender,
			_globals = _fwd_gsScope._gsDefine.globals,
			_easeNone = new Ease(null, null, 1, 0),
			p = TimelineMax.prototype = new TimelineLite();

		p.constructor = TimelineMax;
		p.kill()._gc = false;
		TimelineMax.version = "1.19.0";

		p.invalidate = function() {
			this._yoyo = (this.vars.yoyo === true);
			this._repeat = this.vars.repeat || 0;
			this._repeatDelay = this.vars.repeatDelay || 0;
			this._uncache(true);
			return TimelineLite.prototype.invalidate.call(this);
		};

		p.addCallback = function(callback, position, params, scope) {
			return this.add( FWDTweenLite.delayedCall(0, callback, params, scope), position);
		};

		p.removeCallback = function(callback, position) {
			if (callback) {
				if (position == null) {
					this._kill(null, callback);
				} else {
					var a = this.getTweensOf(callback, false),
						i = a.length,
						time = this._parseTimeOrLabel(position);
					while (--i > -1) {
						if (a[i]._startTime === time) {
							a[i]._enabled(false, false);
						}
					}
				}
			}
			return this;
		};

		p.removePause = function(position) {
			return this.removeCallback(TimelineLite._internals.pauseCallback, position);
		};

		p.tweenTo = function(position, vars) {
			vars = vars || {};
			var copy = {ease:_easeNone, useFrames:this.usesFrames(), immediateRender:false},
				Engine = (vars.repeat && _globals.FWDAnimation) || FWDTweenLite,
				duration, p, t;
			for (p in vars) {
				copy[p] = vars[p];
			}
			copy.time = this._parseTimeOrLabel(position);
			duration = (Math.abs(Number(copy.time) - this._time) / this._timeScale) || 0.001;
			t = new Engine(this, duration, copy);
			copy.onStart = function() {
				t.target.paused(true);
				if (t.vars.time !== t.target.time() && duration === t.duration()) { //don't make the duration zero - if it's supposed to be zero, don't worry because it's already initting the tween and will complete immediately, effectively making the duration zero anyway. If we make duration zero, the tween won't run at all.
					t.duration( Math.abs( t.vars.time - t.target.time()) / t.target._timeScale );
				}
				if (vars.onStart) { //in case the user had an onStart in the vars - we don't want to overwrite it.
					t._callback("onStart");
				}
			};
			return t;
		};

		p.tweenFromTo = function(fromPosition, toPosition, vars) {
			vars = vars || {};
			fromPosition = this._parseTimeOrLabel(fromPosition);
			vars.startAt = {onComplete:this.seek, onCompleteParams:[fromPosition], callbackScope:this};
			vars.immediateRender = (vars.immediateRender !== false);
			var t = this.tweenTo(toPosition, vars);
			return t.duration((Math.abs( t.vars.time - fromPosition) / this._timeScale) || 0.001);
		};

		p.render = function(time, suppressEvents, force) {
			if (this._gc) {
				this._enabled(true, false);
			}
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
				dur = this._duration,
				prevTime = this._time,
				prevTotalTime = this._totalTime,
				prevStart = this._startTime,
				prevTimeScale = this._timeScale,
				prevRawPrevTime = this._rawPrevTime,
				prevPaused = this._paused,
				prevCycle = this._cycle,
				tween, isComplete, next, callback, internalForce, cycleDuration, pauseTween, curTime;
			if (time >= totalDur - 0.0000001) { //to work around occasional floating point math artifacts.
				if (!this._locked) {
					this._totalTime = totalDur;
					this._cycle = this._repeat;
				}
				if (!this._reversed) if (!this._hasPausedChild()) {
					isComplete = true;
					callback = "onComplete";
					internalForce = !!this._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
					if (this._duration === 0) if ((time <= 0 && time >= -0.0000001) || prevRawPrevTime < 0 || prevRawPrevTime === _tinyNum) if (prevRawPrevTime !== time && this._first) {
						internalForce = true;
						if (prevRawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
				}
				this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				if (this._yoyo && (this._cycle & 1) !== 0) {
					this._time = time = 0;
				} else {
					this._time = dur;
					time = dur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7. We cannot do less then 0.0001 because the same issue can occur when the duration is extremely large like 999999999999 in which case adding 0.00000001, for example, causes it to act like nothing was added.
				}

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				if (!this._locked) {
					this._totalTime = this._cycle = 0;
				}
				this._time = 0;
				if (prevTime !== 0 || (dur === 0 && prevRawPrevTime !== _tinyNum && (prevRawPrevTime > 0 || (time < 0 && prevRawPrevTime >= 0)) && !this._locked)) { //edge case for checking time < 0 && prevRawPrevTime >= 0: a zero-duration fromTo() tween inside a zero-duration timeline (yeah, very rare)
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (this._timeline.autoRemoveChildren && this._reversed) {
						internalForce = isComplete = true;
						callback = "onReverseComplete";
					} else if (prevRawPrevTime >= 0 && this._first) { //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
						internalForce = true;
					}
					this._rawPrevTime = time;
				} else {
					this._rawPrevTime = (dur || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					if (time === 0 && isComplete) { //if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
						tween = this._first;
						while (tween && tween._startTime === 0) {
							if (!tween._duration) {
								isComplete = false;
							}
							tween = tween._next;
						}
					}
					time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)
					if (!this._initted) {
						internalForce = true;
					}
				}

			} else {
				if (dur === 0 && prevRawPrevTime < 0) { //without this, zero-duration repeating timelines (like with a simple callback nested at the very beginning and a repeatDelay) wouldn't render the first time through.
					internalForce = true;
				}
				this._time = this._rawPrevTime = time;
				if (!this._locked) {
					this._totalTime = time;
					if (this._repeat !== 0) {
						cycleDuration = dur + this._repeatDelay;
						this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but it gets reported as 0.79999999!)
						if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration && prevTotalTime <= time) {
							this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
						}
						this._time = this._totalTime - (this._cycle * cycleDuration);
						if (this._yoyo) if ((this._cycle & 1) !== 0) {
							this._time = dur - this._time;
						}
						if (this._time > dur) {
							this._time = dur;
							time = dur + 0.0001; //to avoid occasional floating point rounding error
						} else if (this._time < 0) {
							this._time = time = 0;
						} else {
							time = this._time;
						}
					}
				}

				if (this._hasPause && !this._forcingPlayhead && !suppressEvents) {
					time = this._time;
					if (time >= prevTime) {
						tween = this._first;
						while (tween && tween._startTime <= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && this._rawPrevTime === 0)) {
								pauseTween = tween;
							}
							tween = tween._next;
						}
					} else {
						tween = this._last;
						while (tween && tween._startTime >= time && !pauseTween) {
							if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
								pauseTween = tween;
							}
							tween = tween._prev;
						}
					}
					if (pauseTween) {
						this._time = time = pauseTween._startTime;
						this._totalTime = time + (this._cycle * (this._totalDuration + this._repeatDelay));
					}
				}

			}

			if (this._cycle !== prevCycle) if (!this._locked) {
				/*
				make sure children at the end/beginning of the timeline are rendered properly. If, for example,
				a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
				would get transated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
				could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
				we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
				ensure that zero-duration tweens at the very beginning or end of the TimelineMax work.
				*/
				var backwards = (this._yoyo && (prevCycle & 1) !== 0),
					wrap = (backwards === (this._yoyo && (this._cycle & 1) !== 0)),
					recTotalTime = this._totalTime,
					recCycle = this._cycle,
					recRawPrevTime = this._rawPrevTime,
					recTime = this._time;

				this._totalTime = prevCycle * dur;
				if (this._cycle < prevCycle) {
					backwards = !backwards;
				} else {
					this._totalTime += dur;
				}
				this._time = prevTime; //temporarily revert _time so that render() renders the children in the correct order. Without this, tweens won't rewind correctly. We could arhictect things in a "cleaner" way by splitting out the rendering queue into a separate method but for performance reasons, we kept it all inside this method.

				this._rawPrevTime = (dur === 0) ? prevRawPrevTime - 0.0001 : prevRawPrevTime;
				this._cycle = prevCycle;
				this._locked = true; //prevents changes to totalTime and skips repeat/yoyo behavior when we recursively call render()
				prevTime = (backwards) ? 0 : dur;
				this.render(prevTime, suppressEvents, (dur === 0));
				if (!suppressEvents) if (!this._gc) {
					if (this.vars.onRepeat) {
						this._callback("onRepeat");
					}
				}
				if (prevTime !== this._time) { //in case there's a callback like onComplete in a nested tween/timeline that changes the playhead position, like via seek(), we should just abort.
					return;
				}
				if (wrap) {
					prevTime = (backwards) ? dur + 0.0001 : -0.0001;
					this.render(prevTime, true, false);
				}
				this._locked = false;
				if (this._paused && !prevPaused) { //if the render() triggered callback that paused this timeline, we should abort (very rare, but possible)
					return;
				}
				this._time = recTime;
				this._totalTime = recTotalTime;
				this._cycle = recCycle;
				this._rawPrevTime = recRawPrevTime;
			}

			if ((this._time === prevTime || !this._first) && !force && !internalForce && !pauseTween) {
				if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) { //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
					this._callback("onUpdate");
				}
				return;
			} else if (!this._initted) {
				this._initted = true;
			}

			if (!this._active) if (!this._paused && this._totalTime !== prevTotalTime && time > 0) {
				this._active = true;  //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
			}

			if (prevTotalTime === 0) if (this.vars.onStart) if (this._totalTime !== 0 || !this._totalDuration) if (!suppressEvents) {
				this._callback("onStart");
			}

			curTime = this._time;
			if (curTime >= prevTime) {
				tween = this._first;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			} else {
				tween = this._last;
				while (tween) {
					next = tween._prev; //record it here because the value could change after rendering...
					if (curTime !== this._time || (this._paused && !prevPaused)) { //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
						break;
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
						if (pauseTween === tween) {
							pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the timeline and cease rendering. This is only a concern when going in reverse.
							while (pauseTween && pauseTween.endTime() > this._time) {
								pauseTween.render( (pauseTween._reversed ? pauseTween.totalDuration() - ((time - pauseTween._startTime) * pauseTween._timeScale) : (time - pauseTween._startTime) * pauseTween._timeScale), suppressEvents, force);
								pauseTween = pauseTween._prev;
							}
							pauseTween = null;
							this.pause();
						}
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			}

			if (this._onUpdate) if (!suppressEvents) {
				if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
					_lazyRender();
				}
				this._callback("onUpdate");
			}
			if (callback) if (!this._locked) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
						_lazyRender();
					}
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
			}
		};

		p.getActive = function(nested, tweens, timelines) {
			if (nested == null) {
				nested = true;
			}
			if (tweens == null) {
				tweens = true;
			}
			if (timelines == null) {
				timelines = false;
			}
			var a = [],
				all = this.getChildren(nested, tweens, timelines),
				cnt = 0,
				l = all.length,
				i, tween;
			for (i = 0; i < l; i++) {
				tween = all[i];
				if (tween.isActive()) {
					a[cnt++] = tween;
				}
			}
			return a;
		};


		p.getLabelAfter = function(time) {
			if (!time) if (time !== 0) { //faster than isNan()
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				l = labels.length,
				i;
			for (i = 0; i < l; i++) {
				if (labels[i].time > time) {
					return labels[i].name;
				}
			}
			return null;
		};

		p.getLabelBefore = function(time) {
			if (time == null) {
				time = this._time;
			}
			var labels = this.getLabelsArray(),
				i = labels.length;
			while (--i > -1) {
				if (labels[i].time < time) {
					return labels[i].name;
				}
			}
			return null;
		};

		p.getLabelsArray = function() {
			var a = [],
				cnt = 0,
				p;
			for (p in this._labels) {
				a[cnt++] = {time:this._labels[p], name:p};
			}
			a.sort(function(a,b) {
				return a.time - b.time;
			});
			return a;
		};


//---- GETTERS / SETTERS -------------------------------------------------------------------------------------------------------

		p.progress = function(value, suppressEvents) {
			return (!arguments.length) ? this._time / this.duration() : this.totalTime( this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), suppressEvents);
		};

		p.totalProgress = function(value, suppressEvents) {
			return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime( this.totalDuration() * value, suppressEvents);
		};

		p.totalDuration = function(value) {
			if (!arguments.length) {
				if (this._dirty) {
					TimelineLite.prototype.totalDuration.call(this); //just forces refresh
					//Instead of Infinity, we use 999999999999 so that we can accommodate reverses.
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
				}
				return this._totalDuration;
			}
			return (this._repeat === -1 || !value) ? this : this.timeScale( this.totalDuration() / value );
		};

		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			if (value > this._duration) {
				value = this._duration;
			}
			if (this._yoyo && (this._cycle & 1) !== 0) {
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
			} else if (this._repeat !== 0) {
				value += this._cycle * (this._duration + this._repeatDelay);
			}
			return this.totalTime(value, suppressEvents);
		};

		p.repeat = function(value) {
			if (!arguments.length) {
				return this._repeat;
			}
			this._repeat = value;
			return this._uncache(true);
		};

		p.repeatDelay = function(value) {
			if (!arguments.length) {
				return this._repeatDelay;
			}
			this._repeatDelay = value;
			return this._uncache(true);
		};

		p.yoyo = function(value) {
			if (!arguments.length) {
				return this._yoyo;
			}
			this._yoyo = value;
			return this;
		};

		p.currentLabel = function(value) {
			if (!arguments.length) {
				return this.getLabelBefore(this._time + 0.00000001);
			}
			return this.seek(value, true);
		};

		return TimelineMax;

	}, true);
	




	
	
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * BezierPlugin
 * ----------------------------------------------------------------
 */
	(function() {

		var _RAD2DEG = 180 / Math.PI,
			_r1 = [],
			_r2 = [],
			_r3 = [],
			_corProps = {},
			_globals = _fwd_gsScope._gsDefine.globals,
			Segment = function(a, b, c, d) {
				if (c === d) { //if c and d match, the final autoRotate value could lock at -90 degrees, so differentiate them slightly.
					c = d - (d - b) / 1000000;
				}
				if (a === b) { //if a and b match, the starting autoRotate value could lock at -90 degrees, so differentiate them slightly.
					b = a + (c - a) / 1000000;
				}
				this.a = a;
				this.b = b;
				this.c = c;
				this.d = d;
				this.da = d - a;
				this.ca = c - a;
				this.ba = b - a;
			},
			_correlate = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
			cubicToQuadratic = function(a, b, c, d) {
				var q1 = {a:a},
					q2 = {},
					q3 = {},
					q4 = {c:d},
					mab = (a + b) / 2,
					mbc = (b + c) / 2,
					mcd = (c + d) / 2,
					mabc = (mab + mbc) / 2,
					mbcd = (mbc + mcd) / 2,
					m8 = (mbcd - mabc) / 8;
				q1.b = mab + (a - mab) / 4;
				q2.b = mabc + m8;
				q1.c = q2.a = (q1.b + q2.b) / 2;
				q2.c = q3.a = (mabc + mbcd) / 2;
				q3.b = mbcd - m8;
				q4.b = mcd + (d - mcd) / 4;
				q3.c = q4.a = (q3.b + q4.b) / 2;
				return [q1, q2, q3, q4];
			},
			_calculateControlPoints = function(a, curviness, quad, basic, correlate) {
				var l = a.length - 1,
					ii = 0,
					cp1 = a[0].a,
					i, p1, p2, p3, seg, m1, m2, mm, cp2, qb, r1, r2, tl;
				for (i = 0; i < l; i++) {
					seg = a[ii];
					p1 = seg.a;
					p2 = seg.d;
					p3 = a[ii+1].d;

					if (correlate) {
						r1 = _r1[i];
						r2 = _r2[i];
						tl = ((r2 + r1) * curviness * 0.25) / (basic ? 0.5 : _r3[i] || 0.5);
						m1 = p2 - (p2 - p1) * (basic ? curviness * 0.5 : (r1 !== 0 ? tl / r1 : 0));
						m2 = p2 + (p3 - p2) * (basic ? curviness * 0.5 : (r2 !== 0 ? tl / r2 : 0));
						mm = p2 - (m1 + (((m2 - m1) * ((r1 * 3 / (r1 + r2)) + 0.5) / 4) || 0));
					} else {
						m1 = p2 - (p2 - p1) * curviness * 0.5;
						m2 = p2 + (p3 - p2) * curviness * 0.5;
						mm = p2 - (m1 + m2) / 2;
					}
					m1 += mm;
					m2 += mm;

					seg.c = cp2 = m1;
					if (i !== 0) {
						seg.b = cp1;
					} else {
						seg.b = cp1 = seg.a + (seg.c - seg.a) * 0.6; //instead of placing b on a exactly, we move it inline with c so that if the user specifies an ease like Back.easeIn or Elastic.easeIn which goes BEYOND the beginning, it will do so smoothly.
					}

					seg.da = p2 - p1;
					seg.ca = cp2 - p1;
					seg.ba = cp1 - p1;

					if (quad) {
						qb = cubicToQuadratic(p1, cp1, cp2, p2);
						a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
						ii += 4;
					} else {
						ii++;
					}

					cp1 = m2;
				}
				seg = a[ii];
				seg.b = cp1;
				seg.c = cp1 + (seg.d - cp1) * 0.4; //instead of placing c on d exactly, we move it inline with b so that if the user specifies an ease like Back.easeOut or Elastic.easeOut which goes BEYOND the end, it will do so smoothly.
				seg.da = seg.d - seg.a;
				seg.ca = seg.c - seg.a;
				seg.ba = cp1 - seg.a;
				if (quad) {
					qb = cubicToQuadratic(seg.a, cp1, seg.c, seg.d);
					a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
				}
			},
			_parseAnchors = function(values, p, correlate, prepend) {
				var a = [],
					l, i, p1, p2, p3, tmp;
				if (prepend) {
					values = [prepend].concat(values);
					i = values.length;
					while (--i > -1) {
						if (typeof( (tmp = values[i][p]) ) === "string") if (tmp.charAt(1) === "=") {
							values[i][p] = prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)); //accommodate relative values. Do it inline instead of breaking it out into a function for speed reasons
						}
					}
				}
				l = values.length - 2;
				if (l < 0) {
					a[0] = new Segment(values[0][p], 0, 0, values[(l < -1) ? 0 : 1][p]);
					return a;
				}
				for (i = 0; i < l; i++) {
					p1 = values[i][p];
					p2 = values[i+1][p];
					a[i] = new Segment(p1, 0, 0, p2);
					if (correlate) {
						p3 = values[i+2][p];
						_r1[i] = (_r1[i] || 0) + (p2 - p1) * (p2 - p1);
						_r2[i] = (_r2[i] || 0) + (p3 - p2) * (p3 - p2);
					}
				}
				a[i] = new Segment(values[i][p], 0, 0, values[i+1][p]);
				return a;
			},
			bezierThrough = function(values, curviness, quadratic, basic, correlate, prepend) {
				var obj = {},
					props = [],
					first = prepend || values[0],
					i, p, a, j, r, l, seamless, last;
				correlate = (typeof(correlate) === "string") ? ","+correlate+"," : _correlate;
				if (curviness == null) {
					curviness = 1;
				}
				for (p in values[0]) {
					props.push(p);
				}
				//check to see if the last and first values are identical (well, within 0.05). If so, make seamless by appending the second element to the very end of the values array and the 2nd-to-last element to the very beginning (we'll remove those segments later)
				if (values.length > 1) {
					last = values[values.length - 1];
					seamless = true;
					i = props.length;
					while (--i > -1) {
						p = props[i];
						if (Math.abs(first[p] - last[p]) > 0.05) { //build in a tolerance of +/-0.05 to accommodate rounding errors.
							seamless = false;
							break;
						}
					}
					if (seamless) {
						values = values.concat(); //duplicate the array to avoid contaminating the original which the user may be reusing for other tweens
						if (prepend) {
							values.unshift(prepend);
						}
						values.push(values[1]);
						prepend = values[values.length - 3];
					}
				}
				_r1.length = _r2.length = _r3.length = 0;
				i = props.length;
				while (--i > -1) {
					p = props[i];
					_corProps[p] = (correlate.indexOf(","+p+",") !== -1);
					obj[p] = _parseAnchors(values, p, _corProps[p], prepend);
				}
				i = _r1.length;
				while (--i > -1) {
					_r1[i] = Math.sqrt(_r1[i]);
					_r2[i] = Math.sqrt(_r2[i]);
				}
				if (!basic) {
					i = props.length;
					while (--i > -1) {
						if (_corProps[p]) {
							a = obj[props[i]];
							l = a.length - 1;
							for (j = 0; j < l; j++) {
								r = (a[j+1].da / _r2[j] + a[j].da / _r1[j]) || 0;
								_r3[j] = (_r3[j] || 0) + r * r;
							}
						}
					}
					i = _r3.length;
					while (--i > -1) {
						_r3[i] = Math.sqrt(_r3[i]);
					}
				}
				i = props.length;
				j = quadratic ? 4 : 1;
				while (--i > -1) {
					p = props[i];
					a = obj[p];
					_calculateControlPoints(a, curviness, quadratic, basic, _corProps[p]); //this method requires that _parseAnchors() and _setSegmentRatios() ran first so that _r1, _r2, and _r3 values are populated for all properties
					if (seamless) {
						a.splice(0, j);
						a.splice(a.length - j, j);
					}
				}
				return obj;
			},
			_parseBezierData = function(values, type, prepend) {
				type = type || "soft";
				var obj = {},
					inc = (type === "cubic") ? 3 : 2,
					soft = (type === "soft"),
					props = [],
					a, b, c, d, cur, i, j, l, p, cnt, tmp;
				if (soft && prepend) {
					values = [prepend].concat(values);
				}
				if (values == null || values.length < inc + 1) { throw "invalid Bezier data"; }
				for (p in values[0]) {
					props.push(p);
				}
				i = props.length;
				while (--i > -1) {
					p = props[i];
					obj[p] = cur = [];
					cnt = 0;
					l = values.length;
					for (j = 0; j < l; j++) {
						a = (prepend == null) ? values[j][p] : (typeof( (tmp = values[j][p]) ) === "string" && tmp.charAt(1) === "=") ? prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)) : Number(tmp);
						if (soft) if (j > 1) if (j < l - 1) {
							cur[cnt++] = (a + cur[cnt-2]) / 2;
						}
						cur[cnt++] = a;
					}
					l = cnt - inc + 1;
					cnt = 0;
					for (j = 0; j < l; j += inc) {
						a = cur[j];
						b = cur[j+1];
						c = cur[j+2];
						d = (inc === 2) ? 0 : cur[j+3];
						cur[cnt++] = tmp = (inc === 3) ? new Segment(a, b, c, d) : new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
					}
					cur.length = cnt;
				}
				return obj;
			},
			_addCubicLengths = function(a, steps, resolution) {
				var inc = 1 / resolution,
					j = a.length,
					d, d1, s, da, ca, ba, p, i, inv, bez, index;
				while (--j > -1) {
					bez = a[j];
					s = bez.a;
					da = bez.d - s;
					ca = bez.c - s;
					ba = bez.b - s;
					d = d1 = 0;
					for (i = 1; i <= resolution; i++) {
						p = inc * i;
						inv = 1 - p;
						d = d1 - (d1 = (p * p * da + 3 * inv * (p * ca + inv * ba)) * p);
						index = j * resolution + i - 1;
						steps[index] = (steps[index] || 0) + d * d;
					}
				}
			},
			_parseLengthData = function(obj, resolution) {
				resolution = resolution >> 0 || 6;
				var a = [],
					lengths = [],
					d = 0,
					total = 0,
					threshold = resolution - 1,
					segments = [],
					curLS = [], //current length segments array
					p, i, l, index;
				for (p in obj) {
					_addCubicLengths(obj[p], a, resolution);
				}
				l = a.length;
				for (i = 0; i < l; i++) {
					d += Math.sqrt(a[i]);
					index = i % resolution;
					curLS[index] = d;
					if (index === threshold) {
						total += d;
						index = (i / resolution) >> 0;
						segments[index] = curLS;
						lengths[index] = total;
						d = 0;
						curLS = [];
					}
				}
				return {length:total, lengths:lengths, segments:segments};
			},



			BezierPlugin = _fwd_gsScope._gsDefine.plugin({
					propName: "bezier",
					priority: -1,
					version: "1.3.7",
					API: 2,
					fwd_global:true,

					//gets called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
					init: function(target, vars, tween) {
						this._target = target;
						if (vars instanceof Array) {
							vars = {values:vars};
						}
						this._func = {};
						this._mod = {};
						this._props = [];
						this._timeRes = (vars.timeResolution == null) ? 6 : parseInt(vars.timeResolution, 10);
						var values = vars.values || [],
							first = {},
							second = values[0],
							autoRotate = vars.autoRotate || tween.vars.orientToBezier,
							p, isFunc, i, j, prepend;

						this._autoRotate = autoRotate ? (autoRotate instanceof Array) ? autoRotate : [["x","y","rotation",((autoRotate === true) ? 0 : Number(autoRotate) || 0)]] : null;
						for (p in second) {
							this._props.push(p);
						}

						i = this._props.length;
						while (--i > -1) {
							p = this._props[i];

							this._overwriteProps.push(p);
							isFunc = this._func[p] = (typeof(target[p]) === "function");
							first[p] = (!isFunc) ? parseFloat(target[p]) : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]();
							if (!prepend) if (first[p] !== values[0][p]) {
								prepend = first;
							}
						}
						this._beziers = (vars.type !== "cubic" && vars.type !== "quadratic" && vars.type !== "soft") ? bezierThrough(values, isNaN(vars.curviness) ? 1 : vars.curviness, false, (vars.type === "thruBasic"), vars.correlate, prepend) : _parseBezierData(values, vars.type, first);
						this._segCount = this._beziers[p].length;

						if (this._timeRes) {
							var ld = _parseLengthData(this._beziers, this._timeRes);
							this._length = ld.length;
							this._lengths = ld.lengths;
							this._segments = ld.segments;
							this._l1 = this._li = this._s1 = this._si = 0;
							this._l2 = this._lengths[0];
							this._curSeg = this._segments[0];
							this._s2 = this._curSeg[0];
							this._prec = 1 / this._curSeg.length;
						}

						if ((autoRotate = this._autoRotate)) {
							this._initialRotations = [];
							if (!(autoRotate[0] instanceof Array)) {
								this._autoRotate = autoRotate = [autoRotate];
							}
							i = autoRotate.length;
							while (--i > -1) {
								for (j = 0; j < 3; j++) {
									p = autoRotate[i][j];
									this._func[p] = (typeof(target[p]) === "function") ? target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ] : false;
								}
								p = autoRotate[i][2];
								this._initialRotations[i] = (this._func[p] ? this._func[p].call(this._target) : this._target[p]) || 0;
								this._overwriteProps.push(p);
							}
						}
						this._startRatio = tween.vars.runBackwards ? 1 : 0; //we determine the starting ratio when the tween inits which is always 0 unless the tween has runBackwards:true (indicating it's a from() tween) in which case it's 1.
						return true;
					},

					//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
					set: function(v) {
						var segments = this._segCount,
							func = this._func,
							target = this._target,
							notStart = (v !== this._startRatio),
							curIndex, inv, i, p, b, t, val, l, lengths, curSeg;
						if (!this._timeRes) {
							curIndex = (v < 0) ? 0 : (v >= 1) ? segments - 1 : (segments * v) >> 0;
							t = (v - (curIndex * (1 / segments))) * segments;
						} else {
							lengths = this._lengths;
							curSeg = this._curSeg;
							v *= this._length;
							i = this._li;
							//find the appropriate segment (if the currently cached one isn't correct)
							if (v > this._l2 && i < segments - 1) {
								l = segments - 1;
								while (i < l && (this._l2 = lengths[++i]) <= v) {	}
								this._l1 = lengths[i-1];
								this._li = i;
								this._curSeg = curSeg = this._segments[i];
								this._s2 = curSeg[(this._s1 = this._si = 0)];
							} else if (v < this._l1 && i > 0) {
								while (i > 0 && (this._l1 = lengths[--i]) >= v) { }
								if (i === 0 && v < this._l1) {
									this._l1 = 0;
								} else {
									i++;
								}
								this._l2 = lengths[i];
								this._li = i;
								this._curSeg = curSeg = this._segments[i];
								this._s1 = curSeg[(this._si = curSeg.length - 1) - 1] || 0;
								this._s2 = curSeg[this._si];
							}
							curIndex = i;
							//now find the appropriate sub-segment (we split it into the number of pieces that was defined by "precision" and measured each one)
							v -= this._l1;
							i = this._si;
							if (v > this._s2 && i < curSeg.length - 1) {
								l = curSeg.length - 1;
								while (i < l && (this._s2 = curSeg[++i]) <= v) {	}
								this._s1 = curSeg[i-1];
								this._si = i;
							} else if (v < this._s1 && i > 0) {
								while (i > 0 && (this._s1 = curSeg[--i]) >= v) {	}
								if (i === 0 && v < this._s1) {
									this._s1 = 0;
								} else {
									i++;
								}
								this._s2 = curSeg[i];
								this._si = i;
							}
							t = ((i + (v - this._s1) / (this._s2 - this._s1)) * this._prec) || 0;
						}
						inv = 1 - t;

						i = this._props.length;
						while (--i > -1) {
							p = this._props[i];
							b = this._beziers[p][curIndex];
							val = (t * t * b.da + 3 * inv * (t * b.ca + inv * b.ba)) * t + b.a;
							if (this._mod[p]) {
								val = this._mod[p](val, target);
							}
							if (func[p]) {
								target[p](val);
							} else {
								if (p == "x")
								{
									target.setX(val);
								}
								else if (p == "y")
								{
									target.setY(val);
								}
								else if (p == "z")
								{
									target.setZ(val);
								}
								else if (p == "angleX")
								{
									target.setAngleX(val);
								}
								else if (p == "angleY")
								{
									target.setAngleY(val);
								}
								else if (p == "angleZ")
								{
									target.setAngleZ(val);
								}
								else if (p == "w")
								{
									target.setWidth(val);
								}
								else if (p == "h")
								{
									target.setHeight(val);
								}
								else if (p == "alpha")
								{
									target.setAlpha(val);
								}
								else if (p == "scale")
								{
									target.setScale2(val);
								}
								else
								{
									target[p] = val;
								}
							}
						}

						if (this._autoRotate) {
							var ar = this._autoRotate,
								b2, x1, y1, x2, y2, add, conv;
							i = ar.length;
							while (--i > -1) {
								p = ar[i][2];
								add = ar[i][3] || 0;
								conv = (ar[i][4] === true) ? 1 : _RAD2DEG;
								b = this._beziers[ar[i][0]];
								b2 = this._beziers[ar[i][1]];

								if (b && b2) { //in case one of the properties got overwritten.
									b = b[curIndex];
									b2 = b2[curIndex];

									x1 = b.a + (b.b - b.a) * t;
									x2 = b.b + (b.c - b.b) * t;
									x1 += (x2 - x1) * t;
									x2 += ((b.c + (b.d - b.c) * t) - x2) * t;

									y1 = b2.a + (b2.b - b2.a) * t;
									y2 = b2.b + (b2.c - b2.b) * t;
									y1 += (y2 - y1) * t;
									y2 += ((b2.c + (b2.d - b2.c) * t) - y2) * t;

									val = notStart ? Math.atan2(y2 - y1, x2 - x1) * conv + add : this._initialRotations[i];

									if (this._mod[p]) {
										val = this._mod[p](val, target); //for modProps
									}

									if (func[p]) {
										target[p](val);
									} else {
										target[p] = val;
									}
								}
							}
						}
					}
			}),
			p = BezierPlugin.prototype;


		BezierPlugin.bezierThrough = bezierThrough;
		BezierPlugin.cubicToQuadratic = cubicToQuadratic;
		BezierPlugin._autoCSS = true; //indicates that this plugin can be inserted into the "css" object using the autoCSS feature of FWDTweenLite
		BezierPlugin.quadraticToCubic = function(a, b, c) {
			return new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
		};

		BezierPlugin._cssRegister = function() {
			var CSSPlugin = _globals.CSSPlugin;
			if (!CSSPlugin) {
				return;
			}
			var _internals = CSSPlugin._internals,
				_parseToProxy = _internals._parseToProxy,
				_setPluginRatio = _internals._setPluginRatio,
				CSSPropTween = _internals.CSSPropTween;
			_internals._registerComplexSpecialProp("bezier", {parser:function(t, e, prop, cssp, pt, plugin) {
				if (e instanceof Array) {
					e = {values:e};
				}
				plugin = new BezierPlugin();
				var values = e.values,
					l = values.length - 1,
					pluginValues = [],
					v = {},
					i, p, data;
				if (l < 0) {
					return pt;
				}
				for (i = 0; i <= l; i++) {
					data = _parseToProxy(t, values[i], cssp, pt, plugin, (l !== i));
					pluginValues[i] = data.end;
				}
				for (p in e) {
					v[p] = e[p]; //duplicate the vars object because we need to alter some things which would cause problems if the user plans to reuse the same vars object for another tween.
				}
				v.values = pluginValues;
				pt = new CSSPropTween(t, "bezier", 0, 0, data.pt, 2);
				pt.data = data;
				pt.plugin = plugin;
				pt.setRatio = _setPluginRatio;
				if (v.autoRotate === 0) {
					v.autoRotate = true;
				}
				if (v.autoRotate && !(v.autoRotate instanceof Array)) {
					i = (v.autoRotate === true) ? 0 : Number(v.autoRotate);
					v.autoRotate = (data.end.left != null) ? [["left","top","rotation",i,false]] : (data.end.x != null) ? [["x","y","rotation",i,false]] : false;
				}
				if (v.autoRotate) {
					if (!cssp._transform) {
						cssp._enableTransforms(false);
					}
					data.autoRotate = cssp._target._gsTransform;
					data.proxy.rotation = data.autoRotate.rotation || 0;
					cssp._overwriteProps.push("rotation");
				}
				plugin._onInitTween(data.proxy, v, cssp._tween);
				return pt;
			}});
		};

		p._mod = function(lookup) {
			var op = this._overwriteProps,
				i = op.length,
				val;
			while (--i > -1) {
				val = lookup[op[i]];
				if (val && typeof(val) === "function") {
					this._mod[op[i]] = val;
				}
			}
		};

		p._kill = function(lookup) {
			var a = this._props,
				p, i;
			for (p in this._beziers) {
				if (p in lookup) {
					delete this._beziers[p];
					delete this._func[p];
					i = a.length;
					while (--i > -1) {
						if (a[i] === p) {
							a.splice(i, 1);
						}
					}
				}
			}
			a = this._autoRotate;
			if (a) {
				i = a.length;
				while (--i > -1) {
					if (lookup[a[i][2]]) {
						a.splice(i, 1);
					}
				}
			}
			return this._super._kill.call(this, lookup);
		};

	}());






	
	
	
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * CSSPlugin
 * ----------------------------------------------------------------
 */
	_fwd_gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin","FWDTweenLite"], function(TweenPlugin, FWDTweenLite) {

		/** @constructor **/
		var CSSPlugin = function() {
				TweenPlugin.call(this, "css");
				this._overwriteProps.length = 0;
				this.setRatio = CSSPlugin.prototype.setRatio; //speed optimization (avoid prototype lookup on this "hot" method)
			},
			_globals = _fwd_gsScope._gsDefine.globals,
			_hasPriority, //turns true whenever a CSSPropTween instance is created that has a priority other than 0. This helps us discern whether or not we should spend the time organizing the linked list or not after a CSSPlugin's _onInitTween() method is called.
			_suffixMap, //we set this in _onInitTween() each time as a way to have a persistent variable we can use in other methods like _parse() without having to pass it around as a parameter and we keep _parse() decoupled from a particular CSSPlugin instance
			_cs, //computed style (we store this in a shared variable to conserve memory and make minification tighter
			_overwriteProps, //alias to the currently instantiating CSSPlugin's _overwriteProps array. We use this closure in order to avoid having to pass a reference around from method to method and aid in minification.
			_specialProps = {},
			p = CSSPlugin.prototype = new TweenPlugin("css");

		p.constructor = CSSPlugin;
		CSSPlugin.version = "1.19.0";
		CSSPlugin.API = 2;
		CSSPlugin.defaultTransformPerspective = 0;
		CSSPlugin.defaultSkewType = "compensated";
		CSSPlugin.defaultSmoothOrigin = true;
		p = "px"; //we'll reuse the "p" variable to keep file size down
		CSSPlugin.suffixMap = {top:p, right:p, bottom:p, left:p, width:p, height:p, fontSize:p, padding:p, margin:p, perspective:p, lineHeight:""};


		var _numExp = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
			_relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
			_valuesExp = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, //finds all the values that begin with numbers or += or -= and then a number. Includes suffixes. We use this to split complex values apart like "1px 5px 20px rgb(255,102,51)"
			_NaNExp = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, //also allows scientific notation and doesn't kill the leading -/+ in -= and +=
			_suffixExp = /(?:\d|\-|\+|=|#|\.)*/g,
			_opacityExp = /opacity *= *([^)]*)/i,
			_opacityValExp = /opacity:([^;]*)/i,
			_alphaFilterExp = /alpha\(opacity *=.+?\)/i,
			_rgbhslExp = /^(rgb|hsl)/,
			_capsExp = /([A-Z])/g,
			_camelExp = /-([a-z])/gi,
			_urlExp = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, //for pulling out urls from url(...) or url("...") strings (some browsers wrap urls in quotes, some don't when reporting things like backgroundImage)
			_camelFunc = function(s, g) { return g.toUpperCase(); },
			_horizExp = /(?:Left|Right|Width)/i,
			_ieGetMatrixExp = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
			_ieSetMatrixExp = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
			_commasOutsideParenExp = /,(?=[^\)]*(?:\(|$))/gi, //finds any commas that are not within parenthesis
			_complexExp = /[\s,\(]/i, //for testing a string to find if it has a space, comma, or open parenthesis (clues that it's a complex value)
			_DEG2RAD = Math.PI / 180,
			_RAD2DEG = 180 / Math.PI,
			_forcePT = {},
			_doc = document,
			_createElement = function(type) {
				return _doc.createElementNS ? _doc.createElementNS("http://www.w3.org/1999/xhtml", type) : _doc.createElement(type);
			},
			_tempDiv = _createElement("div"),
			_tempImg = _createElement("img"),
			_internals = CSSPlugin._internals = {_specialProps:_specialProps}, //provides a hook to a few internal methods that we need to access from inside other plugins
			_agent = navigator.userAgent,
			_autoRound,
			_reqSafariFix, //we won't apply the Safari transform fix until we actually come across a tween that affects a transform property (to maintain best performance).

			_isSafari,
			_isFirefox, //Firefox has a bug that causes 3D transformed elements to randomly disappear unless a repaint is forced after each update on each element.
			_isSafariLT6, //Safari (and Android 4 which uses a flavor of Safari) has a bug that prevents changes to "top" and "left" properties from rendering properly if changed on the same frame as a transform UNLESS we set the element's WebkitBackfaceVisibility to hidden (weird, I know). Doing this for Android 3 and earlier seems to actually cause other problems, though (fun!)
			_ieVers,
			_supportsOpacity = (function() { //we set _isSafari, _ieVers, _isFirefox, and _supportsOpacity all in one function here to reduce file size slightly, especially in the minified version.
				var i = _agent.indexOf("Android"),
					a = _createElement("a");
				_isSafari = (_agent.indexOf("Safari") !== -1 && _agent.indexOf("Chrome") === -1 && (i === -1 || Number(_agent.substr(i+8, 1)) > 3));
				_isSafariLT6 = (_isSafari && (Number(_agent.substr(_agent.indexOf("Version/")+8, 1)) < 6));
				_isFirefox = (_agent.indexOf("Firefox") !== -1);
				if ((/MSIE ([0-9]{1,}[\.0-9]{0,})/).exec(_agent) || (/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/).exec(_agent)) {
					_ieVers = parseFloat( RegExp.$1 );
				}
				if (!a) {
					return false;
				}
				a.style.cssText = "top:1px;opacity:.55;";
				return /^0.55/.test(a.style.opacity);
			}()),
			_getIEOpacity = function(v) {
				return (_opacityExp.test( ((typeof(v) === "string") ? v : (v.currentStyle ? v.currentStyle.filter : v.style.filter) || "") ) ? ( parseFloat( RegExp.$1 ) / 100 ) : 1);
			},
			_log = function(s) {//for logging messages, but in a way that won't throw errors in old versions of IE.
				if (window.console) {
					console.log(s);
				}
			},
			_target, //when initting a CSSPlugin, we set this variable so that we can access it from within many other functions without having to pass it around as params
			_index, //when initting a CSSPlugin, we set this variable so that we can access it from within many other functions without having to pass it around as params

			_prefixCSS = "", //the non-camelCase vendor prefix like "-o-", "-moz-", "-ms-", or "-webkit-"
			_prefix = "", //camelCase vendor prefix like "O", "ms", "Webkit", or "Moz".

			// @private feed in a camelCase property name like "transform" and it will check to see if it is valid as-is or if it needs a vendor prefix. It returns the corrected camelCase property name (i.e. "WebkitTransform" or "MozTransform" or "transform" or null if no such property is found, like if the browser is IE8 or before, "transform" won't be found at all)
			_checkPropPrefix = function(p, e) {
				e = e || _tempDiv;
				var s = e.style,
					a, i;
				if (s[p] !== undefined) {
					return p;
				}
				p = p.charAt(0).toUpperCase() + p.substr(1);
				a = ["O","Moz","ms","Ms","Webkit"];
				i = 5;
				while (--i > -1 && s[a[i]+p] === undefined) { }
				if (i >= 0) {
					_prefix = (i === 3) ? "ms" : a[i];
					_prefixCSS = "-" + _prefix.toLowerCase() + "-";
					return _prefix + p;
				}
				return null;
			},

			_getComputedStyle = _doc.defaultView ? _doc.defaultView.getComputedStyle : function() {},

			/**
			 * @private Returns the css style for a particular property of an element. For example, to get whatever the current "left" css value for an element with an ID of "myElement", you could do:
			 * var currentLeft = CSSPlugin.getStyle( document.getElementById("myElement"), "left");
			 *
			 * @param {!Object} t Target element whose style property you want to query
			 * @param {!string} p Property name (like "left" or "top" or "marginTop", etc.)
			 * @param {Object=} cs Computed style object. This just provides a way to speed processing if you're going to get several properties on the same element in quick succession - you can reuse the result of the getComputedStyle() call.
			 * @param {boolean=} calc If true, the value will not be read directly from the element's "style" property (if it exists there), but instead the getComputedStyle() result will be used. This can be useful when you want to ensure that the browser itself is interpreting the value.
			 * @param {string=} dflt Default value that should be returned in the place of null, "none", "auto" or "auto auto".
			 * @return {?string} The current property value
			 */
			_getStyle = CSSPlugin.getStyle = function(t, p, cs, calc, dflt) {
				var rv;
				if (!_supportsOpacity) if (p === "opacity") { //several versions of IE don't use the standard "opacity" property - they use things like filter:alpha(opacity=50), so we parse that here.
					return _getIEOpacity(t);
				}
				if (!calc && t.style[p]) {
					rv = t.style[p];
				} else if ((cs = cs || _getComputedStyle(t))) {
					rv = cs[p] || cs.getPropertyValue(p) || cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase());
				} else if (t.currentStyle) {
					rv = t.currentStyle[p];
				}
				return (dflt != null && (!rv || rv === "none" || rv === "auto" || rv === "auto auto")) ? dflt : rv;
			},

			/**
			 * @private Pass the target element, the property name, the numeric value, and the suffix (like "%", "em", "px", etc.) and it will spit back the equivalent pixel number.
			 * @param {!Object} t Target element
			 * @param {!string} p Property name (like "left", "top", "marginLeft", etc.)
			 * @param {!number} v Value
			 * @param {string=} sfx Suffix (like "px" or "%" or "em")
			 * @param {boolean=} recurse If true, the call is a recursive one. In some browsers (like IE7/8), occasionally the value isn't accurately reported initially, but if we run the function again it will take effect.
			 * @return {number} value in pixels
			 */
			_convertToPixels = _internals.convertToPixels = function(t, p, v, sfx, recurse) {
				if (sfx === "px" || !sfx) { return v; }
				if (sfx === "auto" || !v) { return 0; }
				var horiz = _horizExp.test(p),
					node = t,
					style = _tempDiv.style,
					neg = (v < 0),
					precise = (v === 1),
					pix, cache, time;
				if (neg) {
					v = -v;
				}
				if (precise) {
					v *= 100;
				}
				if (sfx === "%" && p.indexOf("border") !== -1) {
					pix = (v / 100) * (horiz ? t.clientWidth : t.clientHeight);
				} else {
					style.cssText = "border:0 solid red;position:" + _getStyle(t, "position") + ";line-height:0;";
					if (sfx === "%" || !node.appendChild || sfx.charAt(0) === "v" || sfx === "rem") {
						node = t.parentNode || _doc.body;
						cache = node._gsCache;
						time = FWDTweenLite.ticker.frame;
						if (cache && horiz && cache.time === time) { //performance optimization: we record the width of elements along with the ticker frame so that we can quickly get it again on the same tick (seems relatively safe to assume it wouldn't change on the same tick)
							return cache.width * v / 100;
						}
						style[(horiz ? "width" : "height")] = v + sfx;
					} else {
						style[(horiz ? "borderLeftWidth" : "borderTopWidth")] = v + sfx;
					}
					node.appendChild(_tempDiv);
					pix = parseFloat(_tempDiv[(horiz ? "offsetWidth" : "offsetHeight")]);
					node.removeChild(_tempDiv);
					if (horiz && sfx === "%" && CSSPlugin.cacheWidths !== false) {
						cache = node._gsCache = node._gsCache || {};
						cache.time = time;
						cache.width = pix / v * 100;
					}
					if (pix === 0 && !recurse) {
						pix = _convertToPixels(t, p, v, sfx, true);
					}
				}
				if (precise) {
					pix /= 100;
				}
				return neg ? -pix : pix;
			},
			_calculateOffset = _internals.calculateOffset = function(t, p, cs) { //for figuring out "top" or "left" in px when it's "auto". We need to factor in margin with the offsetLeft/offsetTop
				if (_getStyle(t, "position", cs) !== "absolute") { return 0; }
				var dim = ((p === "left") ? "Left" : "Top"),
					v = _getStyle(t, "margin" + dim, cs);
				return t["offset" + dim] - (_convertToPixels(t, p, parseFloat(v), v.replace(_suffixExp, "")) || 0);
			},

			// @private returns at object containing ALL of the style properties in camelCase and their associated values.
			_getAllStyles = function(t, cs) {
				var s = {},
					i, tr, p;
				if ((cs = cs || _getComputedStyle(t, null))) {
					if ((i = cs.length)) {
						while (--i > -1) {
							p = cs[i];
							if (p.indexOf("-transform") === -1 || _transformPropCSS === p) { //Some webkit browsers duplicate transform values, one non-prefixed and one prefixed ("transform" and "WebkitTransform"), so we must weed out the extra one here.
								s[p.replace(_camelExp, _camelFunc)] = cs.getPropertyValue(p);
							}
						}
					} else { //some browsers behave differently - cs.length is always 0, so we must do a for...in loop.
						for (i in cs) {
							if (i.indexOf("Transform") === -1 || _transformProp === i) { //Some webkit browsers duplicate transform values, one non-prefixed and one prefixed ("transform" and "WebkitTransform"), so we must weed out the extra one here.
								s[i] = cs[i];
							}
						}
					}
				} else if ((cs = t.currentStyle || t.style)) {
					for (i in cs) {
						if (typeof(i) === "string" && s[i] === undefined) {
							s[i.replace(_camelExp, _camelFunc)] = cs[i];
						}
					}
				}
				if (!_supportsOpacity) {
					s.opacity = _getIEOpacity(t);
				}
				tr = _getTransform(t, cs, false);
				s.rotation = tr.rotation;
				s.skewX = tr.skewX;
				s.scaleX = tr.scaleX;
				s.scaleY = tr.scaleY;
				s.x = tr.x;
				s.y = tr.y;
				if (_supports3D) {
					s.z = tr.z;
					s.rotationX = tr.rotationX;
					s.rotationY = tr.rotationY;
					s.scaleZ = tr.scaleZ;
				}
				if (s.filters) {
					delete s.filters;
				}
				return s;
			},

			// @private analyzes two style objects (as returned by _getAllStyles()) and only looks for differences between them that contain tweenable values (like a number or color). It returns an object with a "difs" property which refers to an object containing only those isolated properties and values for tweening, and a "firstMPT" property which refers to the first MiniPropTween instance in a linked list that recorded all the starting values of the different properties so that we can revert to them at the end or beginning of the tween - we don't want the cascading to get messed up. The forceLookup parameter is an optional generic object with properties that should be forced into the results - this is necessary for className tweens that are overwriting others because imagine a scenario where a rollover/rollout adds/removes a class and the user swipes the mouse over the target SUPER fast, thus nothing actually changed yet and the subsequent comparison of the properties would indicate they match (especially when px rounding is taken into consideration), thus no tweening is necessary even though it SHOULD tween and remove those properties after the tween (otherwise the inline styles will contaminate things). See the className SpecialProp code for details.
			_cssDif = function(t, s1, s2, vars, forceLookup) {
				var difs = {},
					style = t.style,
					val, p, mpt;
				for (p in s2) {
					if (p !== "cssText") if (p !== "length") if (isNaN(p)) if (s1[p] !== (val = s2[p]) || (forceLookup && forceLookup[p])) if (p.indexOf("Origin") === -1) if (typeof(val) === "number" || typeof(val) === "string") {
						difs[p] = (val === "auto" && (p === "left" || p === "top")) ? _calculateOffset(t, p) : ((val === "" || val === "auto" || val === "none") && typeof(s1[p]) === "string" && s1[p].replace(_NaNExp, "") !== "") ? 0 : val; //if the ending value is defaulting ("" or "auto"), we check the starting value and if it can be parsed into a number (a string which could have a suffix too, like 700px), then we swap in 0 for "" or "auto" so that things actually tween.
						if (style[p] !== undefined) { //for className tweens, we must remember which properties already existed inline - the ones that didn't should be removed when the tween isn't in progress because they were only introduced to facilitate the transition between classes.
							mpt = new MiniPropTween(style, p, style[p], mpt);
						}
					}
				}
				if (vars) {
					for (p in vars) { //copy properties (except className)
						if (p !== "className") {
							difs[p] = vars[p];
						}
					}
				}
				return {difs:difs, firstMPT:mpt};
			},
			_dimensions = {width:["Left","Right"], height:["Top","Bottom"]},
			_margins = ["marginLeft","marginRight","marginTop","marginBottom"],

			/**
			 * @private Gets the width or height of an element
			 * @param {!Object} t Target element
			 * @param {!string} p Property name ("width" or "height")
			 * @param {Object=} cs Computed style object (if one exists). Just a speed optimization.
			 * @return {number} Dimension (in pixels)
			 */
			_getDimension = function(t, p, cs) {
				if ((t.nodeName + "").toLowerCase() === "svg") { //Chrome no longer supports offsetWidth/offsetHeight on SVG elements.
					return (cs || _getComputedStyle(t))[p] || 0;
				} else if (t.getBBox && _isSVG(t)) {
					return t.getBBox()[p] || 0;
				}
				var v = parseFloat((p === "width") ? t.offsetWidth : t.offsetHeight),
					a = _dimensions[p],
					i = a.length;
				cs = cs || _getComputedStyle(t, null);
				while (--i > -1) {
					v -= parseFloat( _getStyle(t, "padding" + a[i], cs, true) ) || 0;
					v -= parseFloat( _getStyle(t, "border" + a[i] + "Width", cs, true) ) || 0;
				}
				return v;
			},

			// @private Parses position-related complex strings like "top left" or "50px 10px" or "70% 20%", etc. which are used for things like transformOrigin or backgroundPosition. Optionally decorates a supplied object (recObj) with the following properties: "ox" (offsetX), "oy" (offsetY), "oxp" (if true, "ox" is a percentage not a pixel value), and "oxy" (if true, "oy" is a percentage not a pixel value)
			_parsePosition = function(v, recObj) {
				if (v === "contain" || v === "auto" || v === "auto auto") { //note: Firefox uses "auto auto" as default whereas Chrome uses "auto".
					return v + " ";
				}
				if (v == null || v === "") {
					v = "0 0";
				}
				var a = v.split(" "),
					x = (v.indexOf("left") !== -1) ? "0%" : (v.indexOf("right") !== -1) ? "100%" : a[0],
					y = (v.indexOf("top") !== -1) ? "0%" : (v.indexOf("bottom") !== -1) ? "100%" : a[1],
					i;
				if (a.length > 3 && !recObj) { //multiple positions
					a = v.split(", ").join(",").split(",");
					v = [];
					for (i = 0; i < a.length; i++) {
						v.push(_parsePosition(a[i]));
					}
					return v.join(",");
				}
				if (y == null) {
					y = (x === "center") ? "50%" : "0";
				} else if (y === "center") {
					y = "50%";
				}
				if (x === "center" || (isNaN(parseFloat(x)) && (x + "").indexOf("=") === -1)) { //remember, the user could flip-flop the values and say "bottom center" or "center bottom", etc. "center" is ambiguous because it could be used to describe horizontal or vertical, hence the isNaN(). If there's an "=" sign in the value, it's relative.
					x = "50%";
				}
				v = x + " " + y + ((a.length > 2) ? " " + a[2] : "");
				if (recObj) {
					recObj.oxp = (x.indexOf("%") !== -1);
					recObj.oyp = (y.indexOf("%") !== -1);
					recObj.oxr = (x.charAt(1) === "=");
					recObj.oyr = (y.charAt(1) === "=");
					recObj.ox = parseFloat(x.replace(_NaNExp, ""));
					recObj.oy = parseFloat(y.replace(_NaNExp, ""));
					recObj.v = v;
				}
				return recObj || v;
			},

			/**
			 * @private Takes an ending value (typically a string, but can be a number) and a starting value and returns the change between the two, looking for relative value indicators like += and -= and it also ignores suffixes (but make sure the ending value starts with a number or +=/-= and that the starting value is a NUMBER!)
			 * @param {(number|string)} e End value which is typically a string, but could be a number
			 * @param {(number|string)} b Beginning value which is typically a string but could be a number
			 * @return {number} Amount of change between the beginning and ending values (relative values that have a "+=" or "-=" are recognized)
			 */
			_parseChange = function(e, b) {
				if (typeof(e) === "function") {
					e = e(_index, _target);
				}
				return (typeof(e) === "string" && e.charAt(1) === "=") ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : (parseFloat(e) - parseFloat(b)) || 0;
			},

			/**
			 * @private Takes a value and a default number, checks if the value is relative, null, or numeric and spits back a normalized number accordingly. Primarily used in the _parseTransform() function.
			 * @param {Object} v Value to be parsed
			 * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
			 * @return {number} Parsed value
			 */
			_parseVal = function(v, d) {
				if (typeof(v) === "function") {
					v = v(_index, _target);
				}
				return (v == null) ? d : (typeof(v) === "string" && v.charAt(1) === "=") ? parseInt(v.charAt(0) + "1", 10) * parseFloat(v.substr(2)) + d : parseFloat(v) || 0;
			},

			/**
			 * @private Translates strings like "40deg" or "40" or 40rad" or "+=40deg" or "270_short" or "-90_cw" or "+=45_ccw" to a numeric radian angle. Of course a starting/default value must be fed in too so that relative values can be calculated properly.
			 * @param {Object} v Value to be parsed
			 * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
			 * @param {string=} p property name for directionalEnd (optional - only used when the parsed value is directional ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation). Property name would be "rotation", "rotationX", or "rotationY"
			 * @param {Object=} directionalEnd An object that will store the raw end values for directional angles ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation.
			 * @return {number} parsed angle in radians
			 */
			_parseAngle = function(v, d, p, directionalEnd) {
				var min = 0.000001,
					cap, split, dif, result, isRelative;
				if (typeof(v) === "function") {
					v = v(_index, _target);
				}
				if (v == null) {
					result = d;
				} else if (typeof(v) === "number") {
					result = v;
				} else {
					cap = 360;
					split = v.split("_");
					isRelative = (v.charAt(1) === "=");
					dif = (isRelative ? parseInt(v.charAt(0) + "1", 10) * parseFloat(split[0].substr(2)) : parseFloat(split[0])) * ((v.indexOf("rad") === -1) ? 1 : _RAD2DEG) - (isRelative ? 0 : d);
					if (split.length) {
						if (directionalEnd) {
							directionalEnd[p] = d + dif;
						}
						if (v.indexOf("short") !== -1) {
							dif = dif % cap;
							if (dif !== dif % (cap / 2)) {
								dif = (dif < 0) ? dif + cap : dif - cap;
							}
						}
						if (v.indexOf("_cw") !== -1 && dif < 0) {
							dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						} else if (v.indexOf("ccw") !== -1 && dif > 0) {
							dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						}
					}
					result = d + dif;
				}
				if (result < min && result > -min) {
					result = 0;
				}
				return result;
			},

			_colorLookup = {aqua:[0,255,255],
				lime:[0,255,0],
				silver:[192,192,192],
				black:[0,0,0],
				maroon:[128,0,0],
				teal:[0,128,128],
				blue:[0,0,255],
				navy:[0,0,128],
				white:[255,255,255],
				fuchsia:[255,0,255],
				olive:[128,128,0],
				yellow:[255,255,0],
				orange:[255,165,0],
				gray:[128,128,128],
				purple:[128,0,128],
				green:[0,128,0],
				red:[255,0,0],
				pink:[255,192,203],
				cyan:[0,255,255],
				transparent:[255,255,255,0]},

			_hue = function(h, m1, m2) {
				h = (h < 0) ? h + 1 : (h > 1) ? h - 1 : h;
				return ((((h * 6 < 1) ? m1 + (m2 - m1) * h * 6 : (h < 0.5) ? m2 : (h * 3 < 2) ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255) + 0.5) | 0;
			},

			/**
			 * @private Parses a color (like #9F0, #FF9900, rgb(255,51,153) or hsl(108, 50%, 10%)) into an array with 3 elements for red, green, and blue or if toHSL parameter is true, it will populate the array with hue, saturation, and lightness values. If a relative value is found in an hsl() or hsla() string, it will preserve those relative prefixes and all the values in the array will be strings instead of numbers (in all other cases it will be populated with numbers).
			 * @param {(string|number)} v The value the should be parsed which could be a string like #9F0 or rgb(255,102,51) or rgba(255,0,0,0.5) or it could be a number like 0xFF00CC or even a named color like red, blue, purple, etc.
			 * @param {(boolean)} toHSL If true, an hsl() or hsla() value will be returned instead of rgb() or rgba()
			 * @return {Array.<number>} An array containing red, green, and blue (and optionally alpha) in that order, or if the toHSL parameter was true, the array will contain hue, saturation and lightness (and optionally alpha) in that order. Always numbers unless there's a relative prefix found in an hsl() or hsla() string and toHSL is true.
			 */
			_parseColor = CSSPlugin.parseColor = function(v, toHSL) {
				var a, r, g, b, h, s, l, max, min, d, wasHSL;
				if (!v) {
					a = _colorLookup.black;
				} else if (typeof(v) === "number") {
					a = [v >> 16, (v >> 8) & 255, v & 255];
				} else {
					if (v.charAt(v.length - 1) === ",") { //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
						v = v.substr(0, v.length - 1);
					}
					if (_colorLookup[v]) {
						a = _colorLookup[v];
					} else if (v.charAt(0) === "#") {
						if (v.length === 4) { //for shorthand like #9F0
							r = v.charAt(1);
							g = v.charAt(2);
							b = v.charAt(3);
							v = "#" + r + r + g + g + b + b;
						}
						v = parseInt(v.substr(1), 16);
						a = [v >> 16, (v >> 8) & 255, v & 255];
					} else if (v.substr(0, 3) === "hsl") {
						a = wasHSL = v.match(_numExp);
						if (!toHSL) {
							h = (Number(a[0]) % 360) / 360;
							s = Number(a[1]) / 100;
							l = Number(a[2]) / 100;
							g = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
							r = l * 2 - g;
							if (a.length > 3) {
								a[3] = Number(v[3]);
							}
							a[0] = _hue(h + 1 / 3, r, g);
							a[1] = _hue(h, r, g);
							a[2] = _hue(h - 1 / 3, r, g);
						} else if (v.indexOf("=") !== -1) { //if relative values are found, just return the raw strings with the relative prefixes in place.
							return v.match(_relNumExp);
						}
					} else {
						a = v.match(_numExp) || _colorLookup.transparent;
					}
					a[0] = Number(a[0]);
					a[1] = Number(a[1]);
					a[2] = Number(a[2]);
					if (a.length > 3) {
						a[3] = Number(a[3]);
					}
				}
				if (toHSL && !wasHSL) {
					r = a[0] / 255;
					g = a[1] / 255;
					b = a[2] / 255;
					max = Math.max(r, g, b);
					min = Math.min(r, g, b);
					l = (max + min) / 2;
					if (max === min) {
						h = s = 0;
					} else {
						d = max - min;
						s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
						h = (max === r) ? (g - b) / d + (g < b ? 6 : 0) : (max === g) ? (b - r) / d + 2 : (r - g) / d + 4;
						h *= 60;
					}
					a[0] = (h + 0.5) | 0;
					a[1] = (s * 100 + 0.5) | 0;
					a[2] = (l * 100 + 0.5) | 0;
				}
				return a;
			},
			_formatColors = function(s, toHSL) {
				var colors = s.match(_colorExp) || [],
					charIndex = 0,
					parsed = colors.length ? "" : s,
					i, color, temp;
				for (i = 0; i < colors.length; i++) {
					color = colors[i];
					temp = s.substr(charIndex, s.indexOf(color, charIndex)-charIndex);
					charIndex += temp.length + color.length;
					color = _parseColor(color, toHSL);
					if (color.length === 3) {
						color.push(1);
					}
					parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
				}
				return parsed + s.substr(charIndex);
			},
			_colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b"; //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.

		for (p in _colorLookup) {
			_colorExp += "|" + p + "\\b";
		}
		_colorExp = new RegExp(_colorExp+")", "gi");

		CSSPlugin.colorStringFilter = function(a) {
			var combined = a[0] + a[1],
				toHSL;
			if (_colorExp.test(combined)) {
				toHSL = (combined.indexOf("hsl(") !== -1 || combined.indexOf("hsla(") !== -1);
				a[0] = _formatColors(a[0], toHSL);
				a[1] = _formatColors(a[1], toHSL);
			}
			_colorExp.lastIndex = 0;
		};

		if (!FWDTweenLite.defaultStringFilter) {
			FWDTweenLite.defaultStringFilter = CSSPlugin.colorStringFilter;
		}

		/**
		 * @private Returns a formatter function that handles taking a string (or number in some cases) and returning a consistently formatted one in terms of delimiters, quantity of values, etc. For example, we may get boxShadow values defined as "0px red" or "0px 0px 10px rgb(255,0,0)" or "0px 0px 20px 20px #F00" and we need to ensure that what we get back is described with 4 numbers and a color. This allows us to feed it into the _parseComplex() method and split the values up appropriately. The neat thing about this _getFormatter() function is that the dflt defines a pattern as well as a default, so for example, _getFormatter("0px 0px 0px 0px #777", true) not only sets the default as 0px for all distances and #777 for the color, but also sets the pattern such that 4 numbers and a color will always get returned.
		 * @param {!string} dflt The default value and pattern to follow. So "0px 0px 0px 0px #777" will ensure that 4 numbers and a color will always get returned.
		 * @param {boolean=} clr If true, the values should be searched for color-related data. For example, boxShadow values typically contain a color whereas borderRadius don't.
		 * @param {boolean=} collapsible If true, the value is a top/left/right/bottom style one that acts like margin or padding, where if only one value is received, it's used for all 4; if 2 are received, the first is duplicated for 3rd (bottom) and the 2nd is duplicated for the 4th spot (left), etc.
		 * @return {Function} formatter function
		 */
		var _getFormatter = function(dflt, clr, collapsible, multi) {
				if (dflt == null) {
					return function(v) {return v;};
				}
				var dColor = clr ? (dflt.match(_colorExp) || [""])[0] : "",
					dVals = dflt.split(dColor).join("").match(_valuesExp) || [],
					pfx = dflt.substr(0, dflt.indexOf(dVals[0])),
					sfx = (dflt.charAt(dflt.length - 1) === ")") ? ")" : "",
					delim = (dflt.indexOf(" ") !== -1) ? " " : ",",
					numVals = dVals.length,
					dSfx = (numVals > 0) ? dVals[0].replace(_numExp, "") : "",
					formatter;
				if (!numVals) {
					return function(v) {return v;};
				}
				if (clr) {
					formatter = function(v) {
						var color, vals, i, a;
						if (typeof(v) === "number") {
							v += dSfx;
						} else if (multi && _commasOutsideParenExp.test(v)) {
							a = v.replace(_commasOutsideParenExp, "|").split("|");
							for (i = 0; i < a.length; i++) {
								a[i] = formatter(a[i]);
							}
							return a.join(",");
						}
						color = (v.match(_colorExp) || [dColor])[0];
						vals = v.split(color).join("").match(_valuesExp) || [];
						i = vals.length;
						if (numVals > i--) {
							while (++i < numVals) {
								vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
							}
						}
						return pfx + vals.join(delim) + delim + color + sfx + (v.indexOf("inset") !== -1 ? " inset" : "");
					};
					return formatter;

				}
				formatter = function(v) {
					var vals, a, i;
					if (typeof(v) === "number") {
						v += dSfx;
					} else if (multi && _commasOutsideParenExp.test(v)) {
						a = v.replace(_commasOutsideParenExp, "|").split("|");
						for (i = 0; i < a.length; i++) {
							a[i] = formatter(a[i]);
						}
						return a.join(",");
					}
					vals = v.match(_valuesExp) || [];
					i = vals.length;
					if (numVals > i--) {
						while (++i < numVals) {
							vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
						}
					}
					return pfx + vals.join(delim) + sfx;
				};
				return formatter;
			},

			/**
			 * @private returns a formatter function that's used for edge-related values like marginTop, marginLeft, paddingBottom, paddingRight, etc. Just pass a comma-delimited list of property names related to the edges.
			 * @param {!string} props a comma-delimited list of property names in order from top to left, like "marginTop,marginRight,marginBottom,marginLeft"
			 * @return {Function} a formatter function
			 */
			_getEdgeParser = function(props) {
				props = props.split(",");
				return function(t, e, p, cssp, pt, plugin, vars) {
					var a = (e + "").split(" "),
						i;
					vars = {};
					for (i = 0; i < 4; i++) {
						vars[props[i]] = a[i] = a[i] || a[(((i - 1) / 2) >> 0)];
					}
					return cssp.parse(t, vars, pt, plugin);
				};
			},

			// @private used when other plugins must tween values first, like BezierPlugin or ThrowPropsPlugin, etc. That plugin's setRatio() gets called first so that the values are updated, and then we loop through the MiniPropTweens which handle copying the values into their appropriate slots so that they can then be applied correctly in the main CSSPlugin setRatio() method. Remember, we typically create a proxy object that has a bunch of uniquely-named properties that we feed to the sub-plugin and it does its magic normally, and then we must interpret those values and apply them to the css because often numbers must get combined/concatenated, suffixes added, etc. to work with css, like boxShadow could have 4 values plus a color.
			_setPluginRatio = _internals._setPluginRatio = function(v) {
				this.plugin.setRatio(v);
				var d = this.data,
					proxy = d.proxy,
					mpt = d.firstMPT,
					min = 0.000001,
					val, pt, i, str, p;
				while (mpt) {
					val = proxy[mpt.v];
					if (mpt.r) {
						val = Math.round(val);
					} else if (val < min && val > -min) {
						val = 0;
					}
					mpt.t[mpt.p] = val;
					mpt = mpt._next;
				}
				if (d.autoRotate) {
					d.autoRotate.rotation = d.mod ? d.mod(proxy.rotation, this.t) : proxy.rotation; //special case for ModifyPlugin to hook into an auto-rotating bezier
				}
				//at the end, we must set the CSSPropTween's "e" (end) value dynamically here because that's what is used in the final setRatio() method. Same for "b" at the beginning.
				if (v === 1 || v === 0) {
					mpt = d.firstMPT;
					p = (v === 1) ? "e" : "b";
					while (mpt) {
						pt = mpt.t;
						if (!pt.type) {
							pt[p] = pt.s + pt.xs0;
						} else if (pt.type === 1) {
							str = pt.xs0 + pt.s + pt.xs1;
							for (i = 1; i < pt.l; i++) {
								str += pt["xn"+i] + pt["xs"+(i+1)];
							}
							pt[p] = str;
						}
						mpt = mpt._next;
					}
				}
			},

			/**
			 * @private @constructor Used by a few SpecialProps to hold important values for proxies. For example, _parseToProxy() creates a MiniPropTween instance for each property that must get tweened on the proxy, and we record the original property name as well as the unique one we create for the proxy, plus whether or not the value needs to be rounded plus the original value.
			 * @param {!Object} t target object whose property we're tweening (often a CSSPropTween)
			 * @param {!string} p property name
			 * @param {(number|string|object)} v value
			 * @param {MiniPropTween=} next next MiniPropTween in the linked list
			 * @param {boolean=} r if true, the tweened value should be rounded to the nearest integer
			 */
			MiniPropTween = function(t, p, v, next, r) {
				this.t = t;
				this.p = p;
				this.v = v;
				this.r = r;
				if (next) {
					next._prev = this;
					this._next = next;
				}
			},

			/**
			 * @private Most other plugins (like BezierPlugin and ThrowPropsPlugin and others) can only tween numeric values, but CSSPlugin must accommodate special values that have a bunch of extra data (like a suffix or strings between numeric values, etc.). For example, boxShadow has values like "10px 10px 20px 30px rgb(255,0,0)" which would utterly confuse other plugins. This method allows us to split that data apart and grab only the numeric data and attach it to uniquely-named properties of a generic proxy object ({}) so that we can feed that to virtually any plugin to have the numbers tweened. However, we must also keep track of which properties from the proxy go with which CSSPropTween values and instances. So we create a linked list of MiniPropTweens. Each one records a target (the original CSSPropTween), property (like "s" or "xn1" or "xn2") that we're tweening and the unique property name that was used for the proxy (like "boxShadow_xn1" and "boxShadow_xn2") and whether or not they need to be rounded. That way, in the _setPluginRatio() method we can simply copy the values over from the proxy to the CSSPropTween instance(s). Then, when the main CSSPlugin setRatio() method runs and applies the CSSPropTween values accordingly, they're updated nicely. So the external plugin tweens the numbers, _setPluginRatio() copies them over, and setRatio() acts normally, applying css-specific values to the element.
			 * This method returns an object that has the following properties:
			 *  - proxy: a generic object containing the starting values for all the properties that will be tweened by the external plugin.  This is what we feed to the external _onInitTween() as the target
			 *  - end: a generic object containing the ending values for all the properties that will be tweened by the external plugin. This is what we feed to the external plugin's _onInitTween() as the destination values
			 *  - firstMPT: the first MiniPropTween in the linked list
			 *  - pt: the first CSSPropTween in the linked list that was created when parsing. If shallow is true, this linked list will NOT attach to the one passed into the _parseToProxy() as the "pt" (4th) parameter.
			 * @param {!Object} t target object to be tweened
			 * @param {!(Object|string)} vars the object containing the information about the tweening values (typically the end/destination values) that should be parsed
			 * @param {!CSSPlugin} cssp The CSSPlugin instance
			 * @param {CSSPropTween=} pt the next CSSPropTween in the linked list
			 * @param {TweenPlugin=} plugin the external TweenPlugin instance that will be handling tweening the numeric values
			 * @param {boolean=} shallow if true, the resulting linked list from the parse will NOT be attached to the CSSPropTween that was passed in as the "pt" (4th) parameter.
			 * @return An object containing the following properties: proxy, end, firstMPT, and pt (see above for descriptions)
			 */
			_parseToProxy = _internals._parseToProxy = function(t, vars, cssp, pt, plugin, shallow) {
				var bpt = pt,
					start = {},
					end = {},
					transform = cssp._transform,
					oldForce = _forcePT,
					i, p, xp, mpt, firstPT;
				cssp._transform = null;
				_forcePT = vars;
				pt = firstPT = cssp.parse(t, vars, pt, plugin);
				_forcePT = oldForce;
				//break off from the linked list so the new ones are isolated.
				if (shallow) {
					cssp._transform = transform;
					if (bpt) {
						bpt._prev = null;
						if (bpt._prev) {
							bpt._prev._next = null;
						}
					}
				}
				while (pt && pt !== bpt) {
					if (pt.type <= 1) {
						p = pt.p;
						end[p] = pt.s + pt.c;
						start[p] = pt.s;
						if (!shallow) {
							mpt = new MiniPropTween(pt, "s", p, mpt, pt.r);
							pt.c = 0;
						}
						if (pt.type === 1) {
							i = pt.l;
							while (--i > 0) {
								xp = "xn" + i;
								p = pt.p + "_" + xp;
								end[p] = pt.data[xp];
								start[p] = pt[xp];
								if (!shallow) {
									mpt = new MiniPropTween(pt, xp, p, mpt, pt.rxp[xp]);
								}
							}
						}
					}
					pt = pt._next;
				}
				return {proxy:start, end:end, firstMPT:mpt, pt:firstPT};
			},



			/**
			 * @constructor Each property that is tweened has at least one CSSPropTween associated with it. These instances store important information like the target, property, starting value, amount of change, etc. They can also optionally have a number of "extra" strings and numeric values named xs1, xn1, xs2, xn2, xs3, xn3, etc. where "s" indicates string and "n" indicates number. These can be pieced together in a complex-value tween (type:1) that has alternating types of data like a string, number, string, number, etc. For example, boxShadow could be "5px 5px 8px rgb(102, 102, 51)". In that value, there are 6 numbers that may need to tween and then pieced back together into a string again with spaces, suffixes, etc. xs0 is special in that it stores the suffix for standard (type:0) tweens, -OR- the first string (prefix) in a complex-value (type:1) CSSPropTween -OR- it can be the non-tweening value in a type:-1 CSSPropTween. We do this to conserve memory.
			 * CSSPropTweens have the following optional properties as well (not defined through the constructor):
			 *  - l: Length in terms of the number of extra properties that the CSSPropTween has (default: 0). For example, for a boxShadow we may need to tween 5 numbers in which case l would be 5; Keep in mind that the start/end values for the first number that's tweened are always stored in the s and c properties to conserve memory. All additional values thereafter are stored in xn1, xn2, etc.
			 *  - xfirst: The first instance of any sub-CSSPropTweens that are tweening properties of this instance. For example, we may split up a boxShadow tween so that there's a main CSSPropTween of type:1 that has various xs* and xn* values associated with the h-shadow, v-shadow, blur, color, etc. Then we spawn a CSSPropTween for each of those that has a higher priority and runs BEFORE the main CSSPropTween so that the values are all set by the time it needs to re-assemble them. The xfirst gives us an easy way to identify the first one in that chain which typically ends at the main one (because they're all prepende to the linked list)
			 *  - plugin: The TweenPlugin instance that will handle the tweening of any complex values. For example, sometimes we don't want to use normal subtweens (like xfirst refers to) to tween the values - we might want ThrowPropsPlugin or BezierPlugin some other plugin to do the actual tweening, so we create a plugin instance and store a reference here. We need this reference so that if we get a request to round values or disable a tween, we can pass along that request.
			 *  - data: Arbitrary data that needs to be stored with the CSSPropTween. Typically if we're going to have a plugin handle the tweening of a complex-value tween, we create a generic object that stores the END values that we're tweening to and the CSSPropTween's xs1, xs2, etc. have the starting values. We store that object as data. That way, we can simply pass that object to the plugin and use the CSSPropTween as the target.
			 *  - setRatio: Only used for type:2 tweens that require custom functionality. In this case, we call the CSSPropTween's setRatio() method and pass the ratio each time the tween updates. This isn't quite as efficient as doing things directly in the CSSPlugin's setRatio() method, but it's very convenient and flexible.
			 * @param {!Object} t Target object whose property will be tweened. Often a DOM element, but not always. It could be anything.
			 * @param {string} p Property to tween (name). For example, to tween element.width, p would be "width".
			 * @param {number} s Starting numeric value
			 * @param {number} c Change in numeric value over the course of the entire tween. For example, if element.width starts at 5 and should end at 100, c would be 95.
			 * @param {CSSPropTween=} next The next CSSPropTween in the linked list. If one is defined, we will define its _prev as the new instance, and the new instance's _next will be pointed at it.
			 * @param {number=} type The type of CSSPropTween where -1 = a non-tweening value, 0 = a standard simple tween, 1 = a complex value (like one that has multiple numbers in a comma- or space-delimited string like border:"1px solid red"), and 2 = one that uses a custom setRatio function that does all of the work of applying the values on each update.
			 * @param {string=} n Name of the property that should be used for overwriting purposes which is typically the same as p but not always. For example, we may need to create a subtween for the 2nd part of a "clip:rect(...)" tween in which case "p" might be xs1 but "n" is still "clip"
			 * @param {boolean=} r If true, the value(s) should be rounded
			 * @param {number=} pr Priority in the linked list order. Higher priority CSSPropTweens will be updated before lower priority ones. The default priority is 0.
			 * @param {string=} b Beginning value. We store this to ensure that it is EXACTLY what it was when the tween began without any risk of interpretation issues.
			 * @param {string=} e Ending value. We store this to ensure that it is EXACTLY what the user defined at the end of the tween without any risk of interpretation issues.
			 */
			CSSPropTween = _internals.CSSPropTween = function(t, p, s, c, next, type, n, r, pr, b, e) {
				this.t = t; //target
				this.p = p; //property
				this.s = s; //starting value
				this.c = c; //change value
				this.n = n || p; //name that this CSSPropTween should be associated to (usually the same as p, but not always - n is what overwriting looks at)
				if (!(t instanceof CSSPropTween)) {
					_overwriteProps.push(this.n);
				}
				this.r = r; //round (boolean)
				this.type = type || 0; //0 = normal tween, -1 = non-tweening (in which case xs0 will be applied to the target's property, like tp.t[tp.p] = tp.xs0), 1 = complex-value SpecialProp, 2 = custom setRatio() that does all the work
				if (pr) {
					this.pr = pr;
					_hasPriority = true;
				}
				this.b = (b === undefined) ? s : b;
				this.e = (e === undefined) ? s + c : e;
				if (next) {
					this._next = next;
					next._prev = this;
				}
			},

			_addNonTweeningNumericPT = function(target, prop, start, end, next, overwriteProp) { //cleans up some code redundancies and helps minification. Just a fast way to add a NUMERIC non-tweening CSSPropTween
				var pt = new CSSPropTween(target, prop, start, end - start, next, -1, overwriteProp);
				pt.b = start;
				pt.e = pt.xs0 = end;
				return pt;
			},

			/**
			 * Takes a target, the beginning value and ending value (as strings) and parses them into a CSSPropTween (possibly with child CSSPropTweens) that accommodates multiple numbers, colors, comma-delimited values, etc. For example:
			 * sp.parseComplex(element, "boxShadow", "5px 10px 20px rgb(255,102,51)", "0px 0px 0px red", true, "0px 0px 0px rgb(0,0,0,0)", pt);
			 * It will walk through the beginning and ending values (which should be in the same format with the same number and type of values) and figure out which parts are numbers, what strings separate the numeric/tweenable values, and then create the CSSPropTweens accordingly. If a plugin is defined, no child CSSPropTweens will be created. Instead, the ending values will be stored in the "data" property of the returned CSSPropTween like: {s:-5, xn1:-10, xn2:-20, xn3:255, xn4:0, xn5:0} so that it can be fed to any other plugin and it'll be plain numeric tweens but the recomposition of the complex value will be handled inside CSSPlugin's setRatio().
			 * If a setRatio is defined, the type of the CSSPropTween will be set to 2 and recomposition of the values will be the responsibility of that method.
			 *
			 * @param {!Object} t Target whose property will be tweened
			 * @param {!string} p Property that will be tweened (its name, like "left" or "backgroundColor" or "boxShadow")
			 * @param {string} b Beginning value
			 * @param {string} e Ending value
			 * @param {boolean} clrs If true, the value could contain a color value like "rgb(255,0,0)" or "#F00" or "red". The default is false, so no colors will be recognized (a performance optimization)
			 * @param {(string|number|Object)} dflt The default beginning value that should be used if no valid beginning value is defined or if the number of values inside the complex beginning and ending values don't match
			 * @param {?CSSPropTween} pt CSSPropTween instance that is the current head of the linked list (we'll prepend to this).
			 * @param {number=} pr Priority in the linked list order. Higher priority properties will be updated before lower priority ones. The default priority is 0.
			 * @param {TweenPlugin=} plugin If a plugin should handle the tweening of extra properties, pass the plugin instance here. If one is defined, then NO subtweens will be created for any extra properties (the properties will be created - just not additional CSSPropTween instances to tween them) because the plugin is expected to do so. However, the end values WILL be populated in the "data" property, like {s:100, xn1:50, xn2:300}
			 * @param {function(number)=} setRatio If values should be set in a custom function instead of being pieced together in a type:1 (complex-value) CSSPropTween, define that custom function here.
			 * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parseComplex() call.
			 */
			_parseComplex = CSSPlugin.parseComplex = function(t, p, b, e, clrs, dflt, pt, pr, plugin, setRatio) {
				//DEBUG: _log("parseComplex: "+p+", b: "+b+", e: "+e);
				b = b || dflt || "";
				if (typeof(e) === "function") {
					e = e(_index, _target);
				}
				pt = new CSSPropTween(t, p, 0, 0, pt, (setRatio ? 2 : 1), null, false, pr, b, e);
				e += ""; //ensures it's a string
				if (clrs && _colorExp.test(e + b)) { //if colors are found, normalize the formatting to rgba() or hsla().
					e = [b, e];
					CSSPlugin.colorStringFilter(e);
					b = e[0];
					e = e[1];
				}
				var ba = b.split(", ").join(",").split(" "), //beginning array
					ea = e.split(", ").join(",").split(" "), //ending array
					l = ba.length,
					autoRound = (_autoRound !== false),
					i, xi, ni, bv, ev, bnums, enums, bn, hasAlpha, temp, cv, str, useHSL;
				if (e.indexOf(",") !== -1 || b.indexOf(",") !== -1) {
					ba = ba.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
					ea = ea.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
					l = ba.length;
				}
				if (l !== ea.length) {
					//DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
					ba = (dflt || "").split(" ");
					l = ba.length;
				}
				pt.plugin = plugin;
				pt.setRatio = setRatio;
				_colorExp.lastIndex = 0;
				for (i = 0; i < l; i++) {
					bv = ba[i];
					ev = ea[i];
					bn = parseFloat(bv);
					//if the value begins with a number (most common). It's fine if it has a suffix like px
					if (bn || bn === 0) {
						pt.appendXtra("", bn, _parseChange(ev, bn), ev.replace(_relNumExp, ""), (autoRound && ev.indexOf("px") !== -1), true);

					//if the value is a color
					} else if (clrs && _colorExp.test(bv)) {
						str = ev.indexOf(")") + 1;
						str = ")" + (str ? ev.substr(str) : ""); //if there's a comma or ) at the end, retain it.
						useHSL = (ev.indexOf("hsl") !== -1 && _supportsOpacity);
						bv = _parseColor(bv, useHSL);
						ev = _parseColor(ev, useHSL);
						hasAlpha = (bv.length + ev.length > 6);
						if (hasAlpha && !_supportsOpacity && ev[3] === 0) { //older versions of IE don't support rgba(), so if the destination alpha is 0, just use "transparent" for the end color
							pt["xs" + pt.l] += pt.l ? " transparent" : "transparent";
							pt.e = pt.e.split(ea[i]).join("transparent");
						} else {
							if (!_supportsOpacity) { //old versions of IE don't support rgba().
								hasAlpha = false;
							}
							if (useHSL) {
								pt.appendXtra((hasAlpha ? "hsla(" : "hsl("), bv[0], _parseChange(ev[0], bv[0]), ",", false, true)
									.appendXtra("", bv[1], _parseChange(ev[1], bv[1]), "%,", false)
									.appendXtra("", bv[2], _parseChange(ev[2], bv[2]), (hasAlpha ? "%," : "%" + str), false);
							} else {
								pt.appendXtra((hasAlpha ? "rgba(" : "rgb("), bv[0], ev[0] - bv[0], ",", true, true)
									.appendXtra("", bv[1], ev[1] - bv[1], ",", true)
									.appendXtra("", bv[2], ev[2] - bv[2], (hasAlpha ? "," : str), true);
							}

							if (hasAlpha) {
								bv = (bv.length < 4) ? 1 : bv[3];
								pt.appendXtra("", bv, ((ev.length < 4) ? 1 : ev[3]) - bv, str, false);
							}
						}
						_colorExp.lastIndex = 0; //otherwise the test() on the RegExp could move the lastIndex and taint future results.

					} else {
						bnums = bv.match(_numExp); //gets each group of numbers in the beginning value string and drops them into an array

						//if no number is found, treat it as a non-tweening value and just append the string to the current xs.
						if (!bnums) {
							pt["xs" + pt.l] += (pt.l || pt["xs" + pt.l]) ? " " + ev : ev;

						//loop through all the numbers that are found and construct the extra values on the pt.
						} else {
							enums = ev.match(_relNumExp); //get each group of numbers in the end value string and drop them into an array. We allow relative values too, like +=50 or -=.5
							if (!enums || enums.length !== bnums.length) {
								//DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
								return pt;
							}
							ni = 0;
							for (xi = 0; xi < bnums.length; xi++) {
								cv = bnums[xi];
								temp = bv.indexOf(cv, ni);
								pt.appendXtra(bv.substr(ni, temp - ni), Number(cv), _parseChange(enums[xi], cv), "", (autoRound && bv.substr(temp + cv.length, 2) === "px"), (xi === 0));
								ni = temp + cv.length;
							}
							pt["xs" + pt.l] += bv.substr(ni);
						}
					}
				}
				//if there are relative values ("+=" or "-=" prefix), we need to adjust the ending value to eliminate the prefixes and combine the values properly.
				if (e.indexOf("=") !== -1) if (pt.data) {
					str = pt.xs0 + pt.data.s;
					for (i = 1; i < pt.l; i++) {
						str += pt["xs" + i] + pt.data["xn" + i];
					}
					pt.e = str + pt["xs" + i];
				}
				if (!pt.l) {
					pt.type = -1;
					pt.xs0 = pt.e;
				}
				return pt.xfirst || pt;
			},
			i = 9;


		p = CSSPropTween.prototype;
		p.l = p.pr = 0; //length (number of extra properties like xn1, xn2, xn3, etc.
		while (--i > 0) {
			p["xn" + i] = 0;
			p["xs" + i] = "";
		}
		p.xs0 = "";
		p._next = p._prev = p.xfirst = p.data = p.plugin = p.setRatio = p.rxp = null;


		/**
		 * Appends and extra tweening value to a CSSPropTween and automatically manages any prefix and suffix strings. The first extra value is stored in the s and c of the main CSSPropTween instance, but thereafter any extras are stored in the xn1, xn2, xn3, etc. The prefixes and suffixes are stored in the xs0, xs1, xs2, etc. properties. For example, if I walk through a clip value like "rect(10px, 5px, 0px, 20px)", the values would be stored like this:
		 * xs0:"rect(", s:10, xs1:"px, ", xn1:5, xs2:"px, ", xn2:0, xs3:"px, ", xn3:20, xn4:"px)"
		 * And they'd all get joined together when the CSSPlugin renders (in the setRatio() method).
		 * @param {string=} pfx Prefix (if any)
		 * @param {!number} s Starting value
		 * @param {!number} c Change in numeric value over the course of the entire tween. For example, if the start is 5 and the end is 100, the change would be 95.
		 * @param {string=} sfx Suffix (if any)
		 * @param {boolean=} r Round (if true).
		 * @param {boolean=} pad If true, this extra value should be separated by the previous one by a space. If there is no previous extra and pad is true, it will automatically drop the space.
		 * @return {CSSPropTween} returns itself so that multiple methods can be chained together.
		 */
		p.appendXtra = function(pfx, s, c, sfx, r, pad) {
			var pt = this,
				l = pt.l;
			pt["xs" + l] += (pad && (l || pt["xs" + l])) ? " " + pfx : pfx || "";
			if (!c) if (l !== 0 && !pt.plugin) { //typically we'll combine non-changing values right into the xs to optimize performance, but we don't combine them when there's a plugin that will be tweening the values because it may depend on the values being split apart, like for a bezier, if a value doesn't change between the first and second iteration but then it does on the 3rd, we'll run into trouble because there's no xn slot for that value!
				pt["xs" + l] += s + (sfx || "");
				return pt;
			}
			pt.l++;
			pt.type = pt.setRatio ? 2 : 1;
			pt["xs" + pt.l] = sfx || "";
			if (l > 0) {
				pt.data["xn" + l] = s + c;
				pt.rxp["xn" + l] = r; //round extra property (we need to tap into this in the _parseToProxy() method)
				pt["xn" + l] = s;
				if (!pt.plugin) {
					pt.xfirst = new CSSPropTween(pt, "xn" + l, s, c, pt.xfirst || pt, 0, pt.n, r, pt.pr);
					pt.xfirst.xs0 = 0; //just to ensure that the property stays numeric which helps modern browsers speed up processing. Remember, in the setRatio() method, we do pt.t[pt.p] = val + pt.xs0 so if pt.xs0 is "" (the default), it'll cast the end value as a string. When a property is a number sometimes and a string sometimes, it prevents the compiler from locking in the data type, slowing things down slightly.
				}
				return pt;
			}
			pt.data = {s:s + c};
			pt.rxp = {};
			pt.s = s;
			pt.c = c;
			pt.r = r;
			return pt;
		};

		/**
		 * @constructor A SpecialProp is basically a css property that needs to be treated in a non-standard way, like if it may contain a complex value like boxShadow:"5px 10px 15px rgb(255, 102, 51)" or if it is associated with another plugin like ThrowPropsPlugin or BezierPlugin. Every SpecialProp is associated with a particular property name like "boxShadow" or "throwProps" or "bezier" and it will intercept those values in the vars object that's passed to the CSSPlugin and handle them accordingly.
		 * @param {!string} p Property name (like "boxShadow" or "throwProps")
		 * @param {Object=} options An object containing any of the following configuration options:
		 *                      - defaultValue: the default value
		 *                      - parser: A function that should be called when the associated property name is found in the vars. This function should return a CSSPropTween instance and it should ensure that it is properly inserted into the linked list. It will receive 4 paramters: 1) The target, 2) The value defined in the vars, 3) The CSSPlugin instance (whose _firstPT should be used for the linked list), and 4) A computed style object if one was calculated (this is a speed optimization that allows retrieval of starting values quicker)
		 *                      - formatter: a function that formats any value received for this special property (for example, boxShadow could take "5px 5px red" and format it to "5px 5px 0px 0px red" so that both the beginning and ending values have a common order and quantity of values.)
		 *                      - prefix: if true, we'll determine whether or not this property requires a vendor prefix (like Webkit or Moz or ms or O)
		 *                      - color: set this to true if the value for this SpecialProp may contain color-related values like rgb(), rgba(), etc.
		 *                      - priority: priority in the linked list order. Higher priority SpecialProps will be updated before lower priority ones. The default priority is 0.
		 *                      - multi: if true, the formatter should accommodate a comma-delimited list of values, like boxShadow could have multiple boxShadows listed out.
		 *                      - collapsible: if true, the formatter should treat the value like it's a top/right/bottom/left value that could be collapsed, like "5px" would apply to all, "5px, 10px" would use 5px for top/bottom and 10px for right/left, etc.
		 *                      - keyword: a special keyword that can [optionally] be found inside the value (like "inset" for boxShadow). This allows us to validate beginning/ending values to make sure they match (if the keyword is found in one, it'll be added to the other for consistency by default).
		 */
		var SpecialProp = function(p, options) {
				options = options || {};
				this.p = options.prefix ? _checkPropPrefix(p) || p : p;
				_specialProps[p] = _specialProps[this.p] = this;
				this.format = options.formatter || _getFormatter(options.defaultValue, options.color, options.collapsible, options.multi);
				if (options.parser) {
					this.parse = options.parser;
				}
				this.clrs = options.color;
				this.multi = options.multi;
				this.keyword = options.keyword;
				this.dflt = options.defaultValue;
				this.pr = options.priority || 0;
			},

			//shortcut for creating a new SpecialProp that can accept multiple properties as a comma-delimited list (helps minification). dflt can be an array for multiple values (we don't do a comma-delimited list because the default value may contain commas, like rect(0px,0px,0px,0px)). We attach this method to the SpecialProp class/object instead of using a private _createSpecialProp() method so that we can tap into it externally if necessary, like from another plugin.
			_registerComplexSpecialProp = _internals._registerComplexSpecialProp = function(p, options, defaults) {
				if (typeof(options) !== "object") {
					options = {parser:defaults}; //to make backwards compatible with older versions of BezierPlugin and ThrowPropsPlugin
				}
				var a = p.split(","),
					d = options.defaultValue,
					i, temp;
				defaults = defaults || [d];
				for (i = 0; i < a.length; i++) {
					options.prefix = (i === 0 && options.prefix);
					options.defaultValue = defaults[i] || d;
					temp = new SpecialProp(a[i], options);
				}
			},

			//creates a placeholder special prop for a plugin so that the property gets caught the first time a tween of it is attempted, and at that time it makes the plugin register itself, thus taking over for all future tweens of that property. This allows us to not mandate that things load in a particular order and it also allows us to log() an error that informs the user when they attempt to tween an external plugin-related property without loading its .js file.
			_registerPluginProp = _internals._registerPluginProp = function(p) {
				if (!_specialProps[p]) {
					var pluginName = p.charAt(0).toUpperCase() + p.substr(1) + "Plugin";
					_registerComplexSpecialProp(p, {parser:function(t, e, p, cssp, pt, plugin, vars) {
						var pluginClass = _globals.com.greensock.plugins[pluginName];
						if (!pluginClass) {
							_log("Error: " + pluginName + " js file not loaded.");
							return pt;
						}
						pluginClass._cssRegister();
						return _specialProps[p].parse(t, e, p, cssp, pt, plugin, vars);
					}});
				}
			};


		p = SpecialProp.prototype;

		/**
		 * Alias for _parseComplex() that automatically plugs in certain values for this SpecialProp, like its property name, whether or not colors should be sensed, the default value, and priority. It also looks for any keyword that the SpecialProp defines (like "inset" for boxShadow) and ensures that the beginning and ending values have the same number of values for SpecialProps where multi is true (like boxShadow and textShadow can have a comma-delimited list)
		 * @param {!Object} t target element
		 * @param {(string|number|object)} b beginning value
		 * @param {(string|number|object)} e ending (destination) value
		 * @param {CSSPropTween=} pt next CSSPropTween in the linked list
		 * @param {TweenPlugin=} plugin If another plugin will be tweening the complex value, that TweenPlugin instance goes here.
		 * @param {function=} setRatio If a custom setRatio() method should be used to handle this complex value, that goes here.
		 * @return {CSSPropTween=} First CSSPropTween in the linked list
		 */
		p.parseComplex = function(t, b, e, pt, plugin, setRatio) {
			var kwd = this.keyword,
				i, ba, ea, l, bi, ei;
			//if this SpecialProp's value can contain a comma-delimited list of values (like boxShadow or textShadow), we must parse them in a special way, and look for a keyword (like "inset" for boxShadow) and ensure that the beginning and ending BOTH have it if the end defines it as such. We also must ensure that there are an equal number of values specified (we can't tween 1 boxShadow to 3 for example)
			if (this.multi) if (_commasOutsideParenExp.test(e) || _commasOutsideParenExp.test(b)) {
				ba = b.replace(_commasOutsideParenExp, "|").split("|");
				ea = e.replace(_commasOutsideParenExp, "|").split("|");
			} else if (kwd) {
				ba = [b];
				ea = [e];
			}
			if (ea) {
				l = (ea.length > ba.length) ? ea.length : ba.length;
				for (i = 0; i < l; i++) {
					b = ba[i] = ba[i] || this.dflt;
					e = ea[i] = ea[i] || this.dflt;
					if (kwd) {
						bi = b.indexOf(kwd);
						ei = e.indexOf(kwd);
						if (bi !== ei) {
							if (ei === -1) { //if the keyword isn't in the end value, remove it from the beginning one.
								ba[i] = ba[i].split(kwd).join("");
							} else if (bi === -1) { //if the keyword isn't in the beginning, add it.
								ba[i] += " " + kwd;
							}
						}
					}
				}
				b = ba.join(", ");
				e = ea.join(", ");
			}
			return _parseComplex(t, this.p, b, e, this.clrs, this.dflt, pt, this.pr, plugin, setRatio);
		};

		/**
		 * Accepts a target and end value and spits back a CSSPropTween that has been inserted into the CSSPlugin's linked list and conforms with all the conventions we use internally, like type:-1, 0, 1, or 2, setting up any extra property tweens, priority, etc. For example, if we have a boxShadow SpecialProp and call:
		 * this._firstPT = sp.parse(element, "5px 10px 20px rgb(2550,102,51)", "boxShadow", this);
		 * It should figure out the starting value of the element's boxShadow, compare it to the provided end value and create all the necessary CSSPropTweens of the appropriate types to tween the boxShadow. The CSSPropTween that gets spit back should already be inserted into the linked list (the 4th parameter is the current head, so prepend to that).
		 * @param {!Object} t Target object whose property is being tweened
		 * @param {Object} e End value as provided in the vars object (typically a string, but not always - like a throwProps would be an object).
		 * @param {!string} p Property name
		 * @param {!CSSPlugin} cssp The CSSPlugin instance that should be associated with this tween.
		 * @param {?CSSPropTween} pt The CSSPropTween that is the current head of the linked list (we'll prepend to it)
		 * @param {TweenPlugin=} plugin If a plugin will be used to tween the parsed value, this is the plugin instance.
		 * @param {Object=} vars Original vars object that contains the data for parsing.
		 * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parse() call.
		 */
		p.parse = function(t, e, p, cssp, pt, plugin, vars) {
			return this.parseComplex(t.style, this.format(_getStyle(t, this.p, _cs, false, this.dflt)), this.format(e), pt, plugin);
		};

		/**
		 * Registers a special property that should be intercepted from any "css" objects defined in tweens. This allows you to handle them however you want without CSSPlugin doing it for you. The 2nd parameter should be a function that accepts 3 parameters:
		 *  1) Target object whose property should be tweened (typically a DOM element)
		 *  2) The end/destination value (could be a string, number, object, or whatever you want)
		 *  3) The tween instance (you probably don't need to worry about this, but it can be useful for looking up information like the duration)
		 *
		 * Then, your function should return a function which will be called each time the tween gets rendered, passing a numeric "ratio" parameter to your function that indicates the change factor (usually between 0 and 1). For example:
		 *
		 * CSSPlugin.registerSpecialProp("myCustomProp", function(target, value, tween) {
		 *      var start = target.style.width;
		 *      return function(ratio) {
		 *              target.style.width = (start + value * ratio) + "px";
		 *              console.log("set width to " + target.style.width);
		 *          }
		 * }, 0);
		 *
		 * Then, when I do this tween, it will trigger my special property:
		 *
		 * FWDTweenLite.to(element, 1, {css:{myCustomProp:100}});
		 *
		 * In the example, of course, we're just changing the width, but you can do anything you want.
		 *
		 * @param {!string} name Property name (or comma-delimited list of property names) that should be intercepted and handled by your function. For example, if I define "myCustomProp", then it would handle that portion of the following tween: FWDTweenLite.to(element, 1, {css:{myCustomProp:100}})
		 * @param {!function(Object, Object, Object, string):function(number)} onInitTween The function that will be called when a tween of this special property is performed. The function will receive 4 parameters: 1) Target object that should be tweened, 2) Value that was passed to the tween, 3) The tween instance itself (rarely used), and 4) The property name that's being tweened. Your function should return a function that should be called on every update of the tween. That function will receive a single parameter that is a "change factor" value (typically between 0 and 1) indicating the amount of change as a ratio. You can use this to determine how to set the values appropriately in your function.
		 * @param {number=} priority Priority that helps the engine determine the order in which to set the properties (default: 0). Higher priority properties will be updated before lower priority ones.
		 */
		CSSPlugin.registerSpecialProp = function(name, onInitTween, priority) {
			_registerComplexSpecialProp(name, {parser:function(t, e, p, cssp, pt, plugin, vars) {
				var rv = new CSSPropTween(t, p, 0, 0, pt, 2, p, false, priority);
				rv.plugin = plugin;
				rv.setRatio = onInitTween(t, e, cssp._tween, p);
				return rv;
			}, priority:priority});
		};






		//transform-related methods and properties
		CSSPlugin.useSVGTransformAttr = _isSafari || _isFirefox; //Safari and Firefox both have some rendering bugs when applying CSS transforms to SVG elements, so default to using the "transform" attribute instead (users can override this).
		var _transformProps = ("scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent").split(","),
			_transformProp = _checkPropPrefix("transform"), //the Javascript (camelCase) transform property, like msTransform, WebkitTransform, MozTransform, or OTransform.
			_transformPropCSS = _prefixCSS + "transform",
			_transformOriginProp = _checkPropPrefix("transformOrigin"),
			_supports3D = (_checkPropPrefix("perspective") !== null),
			Transform = _internals.Transform = function() {
				this.perspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0;
				this.force3D = (CSSPlugin.defaultForce3D === false || !_supports3D) ? false : CSSPlugin.defaultForce3D || "auto";
			},
			_SVGElement = window.SVGElement,
			_useSVGTransformAttr,
			//Some browsers (like Firefox and IE) don't honor transform-origin properly in SVG elements, so we need to manually adjust the matrix accordingly. We feature detect here rather than always doing the conversion for certain browsers because they may fix the problem at some point in the future.

			_createSVG = function(type, container, attributes) {
				var element = _doc.createElementNS("http://www.w3.org/2000/svg", type),
					reg = /([a-z])([A-Z])/g,
					p;
				for (p in attributes) {
					element.setAttributeNS(null, p.replace(reg, "$1-$2").toLowerCase(), attributes[p]);
				}
				container.appendChild(element);
				return element;
			},
			_docElement = _doc.documentElement,
			_forceSVGTransformAttr = (function() {
				//IE and Android stock don't support CSS transforms on SVG elements, so we must write them to the "transform" attribute. We populate this variable in the _parseTransform() method, and only if/when we come across an SVG element
				var force = _ieVers || (/Android/i.test(_agent) && !window.chrome),
					svg, rect, width;
				if (_doc.createElementNS && !force) { //IE8 and earlier doesn't support SVG anyway
					svg = _createSVG("svg", _docElement);
					rect = _createSVG("rect", svg, {width:100, height:50, x:100});
					width = rect.getBoundingClientRect().width;
					rect.style[_transformOriginProp] = "50% 50%";
					rect.style[_transformProp] = "scaleX(0.5)";
					force = (width === rect.getBoundingClientRect().width && !(_isFirefox && _supports3D)); //note: Firefox fails the test even though it does support CSS transforms in 3D. Since we can't push 3D stuff into the transform attribute, we force Firefox to pass the test here (as long as it does truly support 3D).
					_docElement.removeChild(svg);
				}
				return force;
			})(),
			_parseSVGOrigin = function(e, local, decoratee, absolute, smoothOrigin, skipRecord) {
				var tm = e._gsTransform,
					m = _getMatrix(e, true),
					v, x, y, xOrigin, yOrigin, a, b, c, d, tx, ty, determinant, xOriginOld, yOriginOld;
				if (tm) {
					xOriginOld = tm.xOrigin; //record the original values before we alter them.
					yOriginOld = tm.yOrigin;
				}
				if (!absolute || (v = absolute.split(" ")).length < 2) {
					b = e.getBBox();
					local = _parsePosition(local).split(" ");
					v = [(local[0].indexOf("%") !== -1 ? parseFloat(local[0]) / 100 * b.width : parseFloat(local[0])) + b.x,
						 (local[1].indexOf("%") !== -1 ? parseFloat(local[1]) / 100 * b.height : parseFloat(local[1])) + b.y];
				}
				decoratee.xOrigin = xOrigin = parseFloat(v[0]);
				decoratee.yOrigin = yOrigin = parseFloat(v[1]);
				if (absolute && m !== _identity2DMatrix) { //if svgOrigin is being set, we must invert the matrix and determine where the absolute point is, factoring in the current transforms. Otherwise, the svgOrigin would be based on the element's non-transformed position on the canvas.
					a = m[0];
					b = m[1];
					c = m[2];
					d = m[3];
					tx = m[4];
					ty = m[5];
					determinant = (a * d - b * c);
					x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + ((c * ty - d * tx) / determinant);
					y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - ((a * ty - b * tx) / determinant);
					xOrigin = decoratee.xOrigin = v[0] = x;
					yOrigin = decoratee.yOrigin = v[1] = y;
				}
				if (tm) { //avoid jump when transformOrigin is changed - adjust the x/y values accordingly
					if (skipRecord) {
						decoratee.xOffset = tm.xOffset;
						decoratee.yOffset = tm.yOffset;
						tm = decoratee;
					}
					if (smoothOrigin || (smoothOrigin !== false && CSSPlugin.defaultSmoothOrigin !== false)) {
						x = xOrigin - xOriginOld;
						y = yOrigin - yOriginOld;
						//originally, we simply adjusted the x and y values, but that would cause problems if, for example, you created a rotational tween part-way through an x/y tween. Managing the offset in a separate variable gives us ultimate flexibility.
						//tm.x -= x - (x * m[0] + y * m[2]);
						//tm.y -= y - (x * m[1] + y * m[3]);
						tm.xOffset += (x * m[0] + y * m[2]) - x;
						tm.yOffset += (x * m[1] + y * m[3]) - y;
					} else {
						tm.xOffset = tm.yOffset = 0;
					}
				}
				if (!skipRecord) {
					e.setAttribute("data-svg-origin", v.join(" "));
				}
			},
			_canGetBBox = function(e) {
				try {
					return e.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
				} catch (e) {}
			},
			_isSVG = function(e) { //reports if the element is an SVG on which getBBox() actually works
				return !!(_SVGElement && e.getBBox && e.getCTM && _canGetBBox(e) && (!e.parentNode || (e.parentNode.getBBox && e.parentNode.getCTM)));
			},
			_identity2DMatrix = [1,0,0,1,0,0],
			_getMatrix = function(e, force2D) {
				var tm = e._gsTransform || new Transform(),
					rnd = 100000,
					style = e.style,
					isDefault, s, m, n, dec, none;
				if (_transformProp) {
					s = _getStyle(e, _transformPropCSS, null, true);
				} else if (e.currentStyle) {
					//for older versions of IE, we need to interpret the filter portion that is in the format: progid:DXImageTransform.Microsoft.Matrix(M11=6.123233995736766e-17, M12=-1, M21=1, M22=6.123233995736766e-17, sizingMethod='auto expand') Notice that we need to swap b and c compared to a normal matrix.
					s = e.currentStyle.filter.match(_ieGetMatrixExp);
					s = (s && s.length === 4) ? [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), (tm.x || 0), (tm.y || 0)].join(",") : "";
				}
				isDefault = (!s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)");
				if (isDefault && _transformProp && ((none = (_getComputedStyle(e).display === "none")) || !e.parentNode)) {
					if (none) { //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none".
						n = style.display;
						style.display = "block";
					}
					if (!e.parentNode) {
						dec = 1; //flag
						_docElement.appendChild(e);
					}
					s = _getStyle(e, _transformPropCSS, null, true);
					isDefault = (!s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)");
					if (n) {
						style.display = n;
					} else if (none) {
						_removeProp(style, "display");
					}
					if (dec) {
						_docElement.removeChild(e);
					}
				}
				if (tm.svg || (e.getBBox && _isSVG(e))) {
					if (isDefault && (style[_transformProp] + "").indexOf("matrix") !== -1) { //some browsers (like Chrome 40) don't correctly report transforms that are applied inline on an SVG element (they don't get included in the computed style), so we double-check here and accept matrix values
						s = style[_transformProp];
						isDefault = 0;
					}
					m = e.getAttribute("transform");
					if (isDefault && m) {
						if (m.indexOf("matrix") !== -1) { //just in case there's a "transform" value specified as an attribute instead of CSS style. Accept either a matrix() or simple translate() value though.
							s = m;
							isDefault = 0;
						} else if (m.indexOf("translate") !== -1) {
							s = "matrix(1,0,0,1," + m.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")";
							isDefault = 0;
						}
					}
				}
				if (isDefault) {
					return _identity2DMatrix;
				}
				//split the matrix values out into an array (m for matrix)
				m = (s || "").match(_numExp) || [];
				i = m.length;
				while (--i > -1) {
					n = Number(m[i]);
					m[i] = (dec = n - (n |= 0)) ? ((dec * rnd + (dec < 0 ? -0.5 : 0.5)) | 0) / rnd + n : n; //convert strings to Numbers and round to 5 decimal places to avoid issues with tiny numbers. Roughly 20x faster than Number.toFixed(). We also must make sure to round before dividing so that values like 0.9999999999 become 1 to avoid glitches in browser rendering and interpretation of flipped/rotated 3D matrices. And don't just multiply the number by rnd, floor it, and then divide by rnd because the bitwise operations max out at a 32-bit signed integer, thus it could get clipped at a relatively low value (like 22,000.00000 for example).
				}
				return (force2D && m.length > 6) ? [m[0], m[1], m[4], m[5], m[12], m[13]] : m;
			},

			/**
			 * Parses the transform values for an element, returning an object with x, y, z, scaleX, scaleY, scaleZ, rotation, rotationX, rotationY, skewX, and skewY properties. Note: by default (for performance reasons), all skewing is combined into skewX and rotation but skewY still has a place in the transform object so that we can record how much of the skew is attributed to skewX vs skewY. Remember, a skewY of 10 looks the same as a rotation of 10 and skewX of -10.
			 * @param {!Object} t target element
			 * @param {Object=} cs computed style object (optional)
			 * @param {boolean=} rec if true, the transform values will be recorded to the target element's _gsTransform object, like target._gsTransform = {x:0, y:0, z:0, scaleX:1...}
			 * @param {boolean=} parse if true, we'll ignore any _gsTransform values that already exist on the element, and force a reparsing of the css (calculated style)
			 * @return {object} object containing all of the transform properties/values like {x:0, y:0, z:0, scaleX:1...}
			 */
			_getTransform = _internals.getTransform = function(t, cs, rec, parse) {
				if (t._gsTransform && rec && !parse) {
					return t._gsTransform; //if the element already has a _gsTransform, use that. Note: some browsers don't accurately return the calculated style for the transform (particularly for SVG), so it's almost always safest to just use the values we've already applied rather than re-parsing things.
				}
				var tm = rec ? t._gsTransform || new Transform() : new Transform(),
					invX = (tm.scaleX < 0), //in order to interpret things properly, we need to know if the user applied a negative scaleX previously so that we can adjust the rotation and skewX accordingly. Otherwise, if we always interpret a flipped matrix as affecting scaleY and the user only wants to tween the scaleX on multiple sequential tweens, it would keep the negative scaleY without that being the user's intent.
					min = 0.00002,
					rnd = 100000,
					zOrigin = _supports3D ? parseFloat(_getStyle(t, _transformOriginProp, cs, false, "0 0 0").split(" ")[2]) || tm.zOrigin  || 0 : 0,
					defaultTransformPerspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0,
					m, i, scaleX, scaleY, rotation, skewX;

				tm.svg = !!(t.getBBox && _isSVG(t));
				if (tm.svg) {
					_parseSVGOrigin(t, _getStyle(t, _transformOriginProp, cs, false, "50% 50%") + "", tm, t.getAttribute("data-svg-origin"));
					_useSVGTransformAttr = CSSPlugin.useSVGTransformAttr || _forceSVGTransformAttr;
				}
				m = _getMatrix(t);
				if (m !== _identity2DMatrix) {

					if (m.length === 16) {
						//we'll only look at these position-related 6 variables first because if x/y/z all match, it's relatively safe to assume we don't need to re-parse everything which risks losing important rotational information (like rotationX:180 plus rotationY:180 would look the same as rotation:180 - there's no way to know for sure which direction was taken based solely on the matrix3d() values)
						var a11 = m[0], a21 = m[1], a31 = m[2], a41 = m[3],
							a12 = m[4], a22 = m[5], a32 = m[6], a42 = m[7],
							a13 = m[8], a23 = m[9], a33 = m[10],
							a14 = m[12], a24 = m[13], a34 = m[14],
							a43 = m[11],
							angle = Math.atan2(a32, a33),
							t1, t2, t3, t4, cos, sin;

						//we manually compensate for non-zero z component of transformOrigin to work around bugs in Safari
						if (tm.zOrigin) {
							a34 = -tm.zOrigin;
							a14 = a13*a34-m[12];
							a24 = a23*a34-m[13];
							a34 = a33*a34+tm.zOrigin-m[14];
						}
						tm.rotationX = angle * _RAD2DEG;
						//rotationX
						if (angle) {
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							t1 = a12*cos+a13*sin;
							t2 = a22*cos+a23*sin;
							t3 = a32*cos+a33*sin;
							a13 = a12*-sin+a13*cos;
							a23 = a22*-sin+a23*cos;
							a33 = a32*-sin+a33*cos;
							a43 = a42*-sin+a43*cos;
							a12 = t1;
							a22 = t2;
							a32 = t3;
						}
						//rotationY
						angle = Math.atan2(-a31, a33);
						tm.rotationY = angle * _RAD2DEG;
						if (angle) {
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							t1 = a11*cos-a13*sin;
							t2 = a21*cos-a23*sin;
							t3 = a31*cos-a33*sin;
							a23 = a21*sin+a23*cos;
							a33 = a31*sin+a33*cos;
							a43 = a41*sin+a43*cos;
							a11 = t1;
							a21 = t2;
							a31 = t3;
						}
						//rotationZ
						angle = Math.atan2(a21, a11);
						tm.rotation = angle * _RAD2DEG;
						if (angle) {
							cos = Math.cos(-angle);
							sin = Math.sin(-angle);
							a11 = a11*cos+a12*sin;
							t2 = a21*cos+a22*sin;
							a22 = a21*-sin+a22*cos;
							a32 = a31*-sin+a32*cos;
							a21 = t2;
						}

						if (tm.rotationX && Math.abs(tm.rotationX) + Math.abs(tm.rotation) > 359.9) { //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
							tm.rotationX = tm.rotation = 0;
							tm.rotationY = 180 - tm.rotationY;
						}

						tm.scaleX = ((Math.sqrt(a11 * a11 + a21 * a21) * rnd + 0.5) | 0) / rnd;
						tm.scaleY = ((Math.sqrt(a22 * a22 + a23 * a23) * rnd + 0.5) | 0) / rnd;
						tm.scaleZ = ((Math.sqrt(a32 * a32 + a33 * a33) * rnd + 0.5) | 0) / rnd;
						if (tm.rotationX || tm.rotationY) {
							tm.skewX = 0;
						} else {
							tm.skewX = (a12 || a22) ? Math.atan2(a12, a22) * _RAD2DEG + tm.rotation : tm.skewX || 0;
							if (Math.abs(tm.skewX) > 90 && Math.abs(tm.skewX) < 270) {
								if (invX) {
									tm.scaleX *= -1;
									tm.skewX += (tm.rotation <= 0) ? 180 : -180;
									tm.rotation += (tm.rotation <= 0) ? 180 : -180;
								} else {
									tm.scaleY *= -1;
									tm.skewX += (tm.skewX <= 0) ? 180 : -180;
								}
							}
						}
						tm.perspective = a43 ? 1 / ((a43 < 0) ? -a43 : a43) : 0;
						tm.x = a14;
						tm.y = a24;
						tm.z = a34;
						if (tm.svg) {
							tm.x -= tm.xOrigin - (tm.xOrigin * a11 - tm.yOrigin * a12);
							tm.y -= tm.yOrigin - (tm.yOrigin * a21 - tm.xOrigin * a22);
						}

					} else if ((!_supports3D || parse || !m.length || tm.x !== m[4] || tm.y !== m[5] || (!tm.rotationX && !tm.rotationY))) { //sometimes a 6-element matrix is returned even when we performed 3D transforms, like if rotationX and rotationY are 180. In cases like this, we still need to honor the 3D transforms. If we just rely on the 2D info, it could affect how the data is interpreted, like scaleY might get set to -1 or rotation could get offset by 180 degrees. For example, do a FWDTweenLite.to(element, 1, {css:{rotationX:180, rotationY:180}}) and then later, FWDTweenLite.to(element, 1, {css:{rotationX:0}}) and without this conditional logic in place, it'd jump to a state of being unrotated when the 2nd tween starts. Then again, we need to honor the fact that the user COULD alter the transforms outside of CSSPlugin, like by manually applying new css, so we try to sense that by looking at x and y because if those changed, we know the changes were made outside CSSPlugin and we force a reinterpretation of the matrix values. Also, in Webkit browsers, if the element's "display" is "none", its calculated style value will always return empty, so if we've already recorded the values in the _gsTransform object, we'll just rely on those.
						var k = (m.length >= 6),
							a = k ? m[0] : 1,
							b = m[1] || 0,
							c = m[2] || 0,
							d = k ? m[3] : 1;
						tm.x = m[4] || 0;
						tm.y = m[5] || 0;
						scaleX = Math.sqrt(a * a + b * b);
						scaleY = Math.sqrt(d * d + c * c);
						rotation = (a || b) ? Math.atan2(b, a) * _RAD2DEG : tm.rotation || 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).
						skewX = (c || d) ? Math.atan2(c, d) * _RAD2DEG + rotation : tm.skewX || 0;
						if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
							if (invX) {
								scaleX *= -1;
								skewX += (rotation <= 0) ? 180 : -180;
								rotation += (rotation <= 0) ? 180 : -180;
							} else {
								scaleY *= -1;
								skewX += (skewX <= 0) ? 180 : -180;
							}
						}
						tm.scaleX = scaleX;
						tm.scaleY = scaleY;
						tm.rotation = rotation;
						tm.skewX = skewX;
						if (_supports3D) {
							tm.rotationX = tm.rotationY = tm.z = 0;
							tm.perspective = defaultTransformPerspective;
							tm.scaleZ = 1;
						}
						if (tm.svg) {
							tm.x -= tm.xOrigin - (tm.xOrigin * a + tm.yOrigin * c);
							tm.y -= tm.yOrigin - (tm.xOrigin * b + tm.yOrigin * d);
						}
					}
					tm.zOrigin = zOrigin;
					//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 0 in these cases. The conditional logic here is faster than calling Math.abs(). Also, browsers tend to render a SLIGHTLY rotated object in a fuzzy way, so we need to snap to exactly 0 when appropriate.
					for (i in tm) {
						if (tm[i] < min) if (tm[i] > -min) {
							tm[i] = 0;
						}
					}
				}
				//DEBUG: _log("parsed rotation of " + t.getAttribute("id")+": "+(tm.rotationX)+", "+(tm.rotationY)+", "+(tm.rotation)+", scale: "+tm.scaleX+", "+tm.scaleY+", "+tm.scaleZ+", position: "+tm.x+", "+tm.y+", "+tm.z+", perspective: "+tm.perspective+ ", origin: "+ tm.xOrigin+ ","+ tm.yOrigin);
				if (rec) {
					t._gsTransform = tm; //record to the object's _gsTransform which we use so that tweens can control individual properties independently (we need all the properties to accurately recompose the matrix in the setRatio() method)
					if (tm.svg) { //if we're supposed to apply transforms to the SVG element's "transform" attribute, make sure there aren't any CSS transforms applied or they'll override the attribute ones. Also clear the transform attribute if we're using CSS, just to be clean.
						if (_useSVGTransformAttr && t.style[_transformProp]) {
							FWDTweenLite.delayedCall(0.001, function(){ //if we apply this right away (before anything has rendered), we risk there being no transforms for a brief moment and it also interferes with adjusting the transformOrigin in a tween with immediateRender:true (it'd try reading the matrix and it wouldn't have the appropriate data in place because we just removed it).
								_removeProp(t.style, _transformProp);
							});
						} else if (!_useSVGTransformAttr && t.getAttribute("transform")) {
							FWDTweenLite.delayedCall(0.001, function(){
								t.removeAttribute("transform");
							});
						}
					}
				}
				return tm;
			},

			//for setting 2D transforms in IE6, IE7, and IE8 (must use a "filter" to emulate the behavior of modern day browser transforms)
			_setIETransformRatio = function(v) {
				var t = this.data, //refers to the element's _gsTransform object
					ang = -t.rotation * _DEG2RAD,
					skew = ang + t.skewX * _DEG2RAD,
					rnd = 100000,
					a = ((Math.cos(ang) * t.scaleX * rnd) | 0) / rnd,
					b = ((Math.sin(ang) * t.scaleX * rnd) | 0) / rnd,
					c = ((Math.sin(skew) * -t.scaleY * rnd) | 0) / rnd,
					d = ((Math.cos(skew) * t.scaleY * rnd) | 0) / rnd,
					style = this.t.style,
					cs = this.t.currentStyle,
					filters, val;
				if (!cs) {
					return;
				}
				val = b; //just for swapping the variables an inverting them (reused "val" to avoid creating another variable in memory). IE's filter matrix uses a non-standard matrix configuration (angle goes the opposite way, and b and c are reversed and inverted)
				b = -c;
				c = -val;
				filters = cs.filter;
				style.filter = ""; //remove filters so that we can accurately measure offsetWidth/offsetHeight
				var w = this.t.offsetWidth,
					h = this.t.offsetHeight,
					clip = (cs.position !== "absolute"),
					m = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + b + ", M21=" + c + ", M22=" + d,
					ox = t.x + (w * t.xPercent / 100),
					oy = t.y + (h * t.yPercent / 100),
					dx, dy;

				//if transformOrigin is being used, adjust the offset x and y
				if (t.ox != null) {
					dx = ((t.oxp) ? w * t.ox * 0.01 : t.ox) - w / 2;
					dy = ((t.oyp) ? h * t.oy * 0.01 : t.oy) - h / 2;
					ox += dx - (dx * a + dy * b);
					oy += dy - (dx * c + dy * d);
				}

				if (!clip) {
					m += ", sizingMethod='auto expand')";
				} else {
					dx = (w / 2);
					dy = (h / 2);
					//translate to ensure that transformations occur around the correct origin (default is center).
					m += ", Dx=" + (dx - (dx * a + dy * b) + ox) + ", Dy=" + (dy - (dx * c + dy * d) + oy) + ")";
				}
				if (filters.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1) {
					style.filter = filters.replace(_ieSetMatrixExp, m);
				} else {
					style.filter = m + " " + filters; //we must always put the transform/matrix FIRST (before alpha(opacity=xx)) to avoid an IE bug that slices part of the object when rotation is applied with alpha.
				}

				//at the end or beginning of the tween, if the matrix is normal (1, 0, 0, 1) and opacity is 100 (or doesn't exist), remove the filter to improve browser performance.
				if (v === 0 || v === 1) if (a === 1) if (b === 0) if (c === 0) if (d === 1) if (!clip || m.indexOf("Dx=0, Dy=0") !== -1) if (!_opacityExp.test(filters) || parseFloat(RegExp.$1) === 100) if (filters.indexOf("gradient(" && filters.indexOf("Alpha")) === -1) {
					style.removeAttribute("filter");
				}

				//we must set the margins AFTER applying the filter in order to avoid some bugs in IE8 that could (in rare scenarios) cause them to be ignored intermittently (vibration).
				if (!clip) {
					var mult = (_ieVers < 8) ? 1 : -1, //in Internet Explorer 7 and before, the box model is broken, causing the browser to treat the width/height of the actual rotated filtered image as the width/height of the box itself, but Microsoft corrected that in IE8. We must use a negative offset in IE8 on the right/bottom
						marg, prop, dif;
					dx = t.ieOffsetX || 0;
					dy = t.ieOffsetY || 0;
					t.ieOffsetX = Math.round((w - ((a < 0 ? -a : a) * w + (b < 0 ? -b : b) * h)) / 2 + ox);
					t.ieOffsetY = Math.round((h - ((d < 0 ? -d : d) * h + (c < 0 ? -c : c) * w)) / 2 + oy);
					for (i = 0; i < 4; i++) {
						prop = _margins[i];
						marg = cs[prop];
						//we need to get the current margin in case it is being tweened separately (we want to respect that tween's changes)
						val = (marg.indexOf("px") !== -1) ? parseFloat(marg) : _convertToPixels(this.t, prop, parseFloat(marg), marg.replace(_suffixExp, "")) || 0;
						if (val !== t[prop]) {
							dif = (i < 2) ? -t.ieOffsetX : -t.ieOffsetY; //if another tween is controlling a margin, we cannot only apply the difference in the ieOffsets, so we essentially zero-out the dx and dy here in that case. We record the margin(s) later so that we can keep comparing them, making this code very flexible.
						} else {
							dif = (i < 2) ? dx - t.ieOffsetX : dy - t.ieOffsetY;
						}
						style[prop] = (t[prop] = Math.round( val - dif * ((i === 0 || i === 2) ? 1 : mult) )) + "px";
					}
				}
			},

			/* translates a super small decimal to a string WITHOUT scientific notation
			_safeDecimal = function(n) {
				var s = (n < 0 ? -n : n) + "",
					a = s.split("e-");
				return (n < 0 ? "-0." : "0.") + new Array(parseInt(a[1], 10) || 0).join("0") + a[0].split(".").join("");
			},
			*/

			_setTransformRatio = _internals.set3DTransformRatio = _internals.setTransformRatio = function(v) {
				var t = this.data, //refers to the element's _gsTransform object
					style = this.t.style,
					angle = t.rotation,
					rotationX = t.rotationX,
					rotationY = t.rotationY,
					sx = t.scaleX,
					sy = t.scaleY,
					sz = t.scaleZ,
					x = t.x,
					y = t.y,
					z = t.z,
					isSVG = t.svg,
					perspective = t.perspective,
					force3D = t.force3D,
					a11, a12, a13, a21, a22, a23, a31, a32, a33, a41, a42, a43,
					zOrigin, min, cos, sin, t1, t2, transform, comma, zero, skew, rnd;
				//check to see if we should render as 2D (and SVGs must use 2D when _useSVGTransformAttr is true)
				if (((((v === 1 || v === 0) && force3D === "auto" && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime)) || !force3D) && !z && !perspective && !rotationY && !rotationX && sz === 1) || (_useSVGTransformAttr && isSVG) || !_supports3D) { //on the final render (which could be 0 for a from tween), if there are no 3D aspects, render in 2D to free up memory and improve performance especially on mobile devices. Check the tween's totalTime/totalDuration too in order to make sure it doesn't happen between repeats if it's a repeating tween.

					//2D
					if (angle || t.skewX || isSVG) {
						angle *= _DEG2RAD;
						skew = t.skewX * _DEG2RAD;
						rnd = 100000;
						a11 = Math.cos(angle) * sx;
						a21 = Math.sin(angle) * sx;
						a12 = Math.sin(angle - skew) * -sy;
						a22 = Math.cos(angle - skew) * sy;
						if (skew && t.skewType === "simple") { //by default, we compensate skewing on the other axis to make it look more natural, but you can set the skewType to "simple" to use the uncompensated skewing that CSS does
							t1 = Math.tan(skew - t.skewY * _DEG2RAD);
							t1 = Math.sqrt(1 + t1 * t1);
							a12 *= t1;
							a22 *= t1;
							if (t.skewY) {
								t1 = Math.tan(t.skewY * _DEG2RAD);
								t1 = Math.sqrt(1 + t1 * t1);
								a11 *= t1;
								a21 *= t1;
							}
						}
						if (isSVG) {
							x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
							y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
							if (_useSVGTransformAttr && (t.xPercent || t.yPercent)) { //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the matrix to simulate it.
								min = this.t.getBBox();
								x += t.xPercent * 0.01 * min.width;
								y += t.yPercent * 0.01 * min.height;
							}
							min = 0.000001;
							if (x < min) if (x > -min) {
								x = 0;
							}
							if (y < min) if (y > -min) {
								y = 0;
							}
						}
						transform = (((a11 * rnd) | 0) / rnd) + "," + (((a21 * rnd) | 0) / rnd) + "," + (((a12 * rnd) | 0) / rnd) + "," + (((a22 * rnd) | 0) / rnd) + "," + x + "," + y + ")";
						if (isSVG && _useSVGTransformAttr) {
							this.t.setAttribute("transform", "matrix(" + transform);
						} else {
							//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 5 decimal places.
							style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + transform;
						}
					} else {
						style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + sx + ",0,0," + sy + "," + x + "," + y + ")";
					}
					return;

				}
				if (_isFirefox) { //Firefox has a bug (at least in v25) that causes it to render the transparent part of 32-bit PNG images as black when displayed inside an iframe and the 3D scale is very small and doesn't change sufficiently enough between renders (like if you use a Power4.easeInOut to scale from 0 to 1 where the beginning values only change a tiny amount to begin the tween before accelerating). In this case, we force the scale to be 0.00002 instead which is visually the same but works around the Firefox issue.
					min = 0.0001;
					if (sx < min && sx > -min) {
						sx = sz = 0.00002;
					}
					if (sy < min && sy > -min) {
						sy = sz = 0.00002;
					}
					if (perspective && !t.z && !t.rotationX && !t.rotationY) { //Firefox has a bug that causes elements to have an odd super-thin, broken/dotted black border on elements that have a perspective set but aren't utilizing 3D space (no rotationX, rotationY, or z).
						perspective = 0;
					}
				}
				if (angle || t.skewX) {
					angle *= _DEG2RAD;
					cos = a11 = Math.cos(angle);
					sin = a21 = Math.sin(angle);
					if (t.skewX) {
						angle -= t.skewX * _DEG2RAD;
						cos = Math.cos(angle);
						sin = Math.sin(angle);
						if (t.skewType === "simple") { //by default, we compensate skewing on the other axis to make it look more natural, but you can set the skewType to "simple" to use the uncompensated skewing that CSS does
							t1 = Math.tan((t.skewX - t.skewY) * _DEG2RAD);
							t1 = Math.sqrt(1 + t1 * t1);
							cos *= t1;
							sin *= t1;
							if (t.skewY) {
								t1 = Math.tan(t.skewY * _DEG2RAD);
								t1 = Math.sqrt(1 + t1 * t1);
								a11 *= t1;
								a21 *= t1;
							}
						}
					}
					a12 = -sin;
					a22 = cos;

				} else if (!rotationY && !rotationX && sz === 1 && !perspective && !isSVG) { //if we're only translating and/or 2D scaling, this is faster...
					style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) translate3d(" : "translate3d(") + x + "px," + y + "px," + z +"px)" + ((sx !== 1 || sy !== 1) ? " scale(" + sx + "," + sy + ")" : "");
					return;
				} else {
					a11 = a22 = 1;
					a12 = a21 = 0;
				}
				// KEY  INDEX   AFFECTS
				// a11  0       rotation, rotationY, scaleX
				// a21  1       rotation, rotationY, scaleX
				// a31  2       rotationY, scaleX
				// a41  3       rotationY, scaleX
				// a12  4       rotation, skewX, rotationX, scaleY
				// a22  5       rotation, skewX, rotationX, scaleY
				// a32  6       rotationX, scaleY
				// a42  7       rotationX, scaleY
				// a13  8       rotationY, rotationX, scaleZ
				// a23  9       rotationY, rotationX, scaleZ
				// a33  10      rotationY, rotationX, scaleZ
				// a43  11      rotationY, rotationX, perspective, scaleZ
				// a14  12      x, zOrigin, svgOrigin
				// a24  13      y, zOrigin, svgOrigin
				// a34  14      z, zOrigin
				// a44  15
				// rotation: Math.atan2(a21, a11)
				// rotationY: Math.atan2(a13, a33) (or Math.atan2(a13, a11))
				// rotationX: Math.atan2(a32, a33)
				a33 = 1;
				a13 = a23 = a31 = a32 = a41 = a42 = 0;
				a43 = (perspective) ? -1 / perspective : 0;
				zOrigin = t.zOrigin;
				min = 0.000001; //threshold below which browsers use scientific notation which won't work.
				comma = ",";
				zero = "0";
				angle = rotationY * _DEG2RAD;
				if (angle) {
					cos = Math.cos(angle);
					sin = Math.sin(angle);
					a31 = -sin;
					a41 = a43*-sin;
					a13 = a11*sin;
					a23 = a21*sin;
					a33 = cos;
					a43 *= cos;
					a11 *= cos;
					a21 *= cos;
				}
				angle = rotationX * _DEG2RAD;
				if (angle) {
					cos = Math.cos(angle);
					sin = Math.sin(angle);
					t1 = a12*cos+a13*sin;
					t2 = a22*cos+a23*sin;
					a32 = a33*sin;
					a42 = a43*sin;
					a13 = a12*-sin+a13*cos;
					a23 = a22*-sin+a23*cos;
					a33 = a33*cos;
					a43 = a43*cos;
					a12 = t1;
					a22 = t2;
				}
				if (sz !== 1) {
					a13*=sz;
					a23*=sz;
					a33*=sz;
					a43*=sz;
				}
				if (sy !== 1) {
					a12*=sy;
					a22*=sy;
					a32*=sy;
					a42*=sy;
				}
				if (sx !== 1) {
					a11*=sx;
					a21*=sx;
					a31*=sx;
					a41*=sx;
				}

				if (zOrigin || isSVG) {
					if (zOrigin) {
						x += a13*-zOrigin;
						y += a23*-zOrigin;
						z += a33*-zOrigin+zOrigin;
					}
					if (isSVG) { //due to bugs in some browsers, we need to manage the transform-origin of SVG manually
						x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
						y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
					}
					if (x < min && x > -min) {
						x = zero;
					}
					if (y < min && y > -min) {
						y = zero;
					}
					if (z < min && z > -min) {
						z = 0; //don't use string because we calculate perspective later and need the number.
					}
				}

				//optimized way of concatenating all the values into a string. If we do it all in one shot, it's slower because of the way browsers have to create temp strings and the way it affects memory. If we do it piece-by-piece with +=, it's a bit slower too. We found that doing it in these sized chunks works best overall:
				transform = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix3d(" : "matrix3d(");
				transform += ((a11 < min && a11 > -min) ? zero : a11) + comma + ((a21 < min && a21 > -min) ? zero : a21) + comma + ((a31 < min && a31 > -min) ? zero : a31);
				transform += comma + ((a41 < min && a41 > -min) ? zero : a41) + comma + ((a12 < min && a12 > -min) ? zero : a12) + comma + ((a22 < min && a22 > -min) ? zero : a22);
				if (rotationX || rotationY || sz !== 1) { //performance optimization (often there's no rotationX or rotationY, so we can skip these calculations)
					transform += comma + ((a32 < min && a32 > -min) ? zero : a32) + comma + ((a42 < min && a42 > -min) ? zero : a42) + comma + ((a13 < min && a13 > -min) ? zero : a13);
					transform += comma + ((a23 < min && a23 > -min) ? zero : a23) + comma + ((a33 < min && a33 > -min) ? zero : a33) + comma + ((a43 < min && a43 > -min) ? zero : a43) + comma;
				} else {
					transform += ",0,0,0,0,1,0,";
				}
				transform += x + comma + y + comma + z + comma + (perspective ? (1 + (-z / perspective)) : 1) + ")";

				style[_transformProp] = transform;
			};

		p = Transform.prototype;
		p.x = p.y = p.z = p.skewX = p.skewY = p.rotation = p.rotationX = p.rotationY = p.zOrigin = p.xPercent = p.yPercent = p.xOffset = p.yOffset = 0;
		p.scaleX = p.scaleY = p.scaleZ = 1;

		_registerComplexSpecialProp("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {parser:function(t, e, parsingProp, cssp, pt, plugin, vars) {
			if (cssp._lastParsedTransform === vars) { return pt; } //only need to parse the transform once, and only if the browser supports it.
			cssp._lastParsedTransform = vars;
			var swapFunc;
			if (typeof(vars[parsingProp]) === "function") { //whatever property triggers the initial parsing might be a function-based value in which case it already got called in parse(), thus we don't want to call it again in here. The most efficient way to avoid this is to temporarily swap the value directly into the vars object, and then after we do all our parsing in this function, we'll swap it back again.
				swapFunc = vars[parsingProp];
				vars[parsingProp] = e;
			}
			var originalGSTransform = t._gsTransform,
				style = t.style,
				min = 0.000001,
				i = _transformProps.length,
				v = vars,
				endRotations = {},
				transformOriginString = "transformOrigin",
				m1 = _getTransform(t, _cs, true, v.parseTransform),
				orig = v.transform && ((typeof(v.transform) === "function") ? v.transform(_index, _target) : v.transform),
				m2, copy, has3D, hasChange, dr, x, y, matrix, p;
			cssp._transform = m1;
			if (orig && typeof(orig) === "string" && _transformProp) { //for values like transform:"rotate(60deg) scale(0.5, 0.8)"
				copy = _tempDiv.style; //don't use the original target because it might be SVG in which case some browsers don't report computed style correctly.
				copy[_transformProp] = orig;
				copy.display = "block"; //if display is "none", the browser often refuses to report the transform properties correctly.
				copy.position = "absolute";
				_doc.body.appendChild(_tempDiv);
				m2 = _getTransform(_tempDiv, null, false);
				if (m1.svg) { //if it's an SVG element, x/y part of the matrix will be affected by whatever we use as the origin and the offsets, so compensate here...
					x = m1.xOrigin;
					y = m1.yOrigin;
					m2.x -= m1.xOffset;
					m2.y -= m1.yOffset;
					if (v.transformOrigin || v.svgOrigin) { //if this tween is altering the origin, we must factor that in here. The actual work of recording the transformOrigin values and setting up the PropTween is done later (still inside this function) so we cannot leave the changes intact here - we only want to update the x/y accordingly.
						orig = {};
						_parseSVGOrigin(t, _parsePosition(v.transformOrigin), orig, v.svgOrigin, v.smoothOrigin, true);
						x = orig.xOrigin;
						y = orig.yOrigin;
						m2.x -= orig.xOffset - m1.xOffset;
						m2.y -= orig.yOffset - m1.yOffset;
					}
					if (x || y) {
						matrix = _getMatrix(_tempDiv, true);
						m2.x -= x - (x * matrix[0] + y * matrix[2]);
						m2.y -= y - (x * matrix[1] + y * matrix[3]);
					}
				}
				_doc.body.removeChild(_tempDiv);
				if (!m2.perspective) {
					m2.perspective = m1.perspective; //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
				}
				if (v.xPercent != null) {
					m2.xPercent = _parseVal(v.xPercent, m1.xPercent);
				}
				if (v.yPercent != null) {
					m2.yPercent = _parseVal(v.yPercent, m1.yPercent);
				}
			} else if (typeof(v) === "object") { //for values like scaleX, scaleY, rotation, x, y, skewX, and skewY or transform:{...} (object)
				m2 = {scaleX:_parseVal((v.scaleX != null) ? v.scaleX : v.scale, m1.scaleX),
					scaleY:_parseVal((v.scaleY != null) ? v.scaleY : v.scale, m1.scaleY),
					scaleZ:_parseVal(v.scaleZ, m1.scaleZ),
					x:_parseVal(v.x, m1.x),
					y:_parseVal(v.y, m1.y),
					z:_parseVal(v.z, m1.z),
					xPercent:_parseVal(v.xPercent, m1.xPercent),
					yPercent:_parseVal(v.yPercent, m1.yPercent),
					perspective:_parseVal(v.transformPerspective, m1.perspective)};
				dr = v.directionalRotation;
				if (dr != null) {
					if (typeof(dr) === "object") {
						for (copy in dr) {
							v[copy] = dr[copy];
						}
					} else {
						v.rotation = dr;
					}
				}
				if (typeof(v.x) === "string" && v.x.indexOf("%") !== -1) {
					m2.x = 0;
					m2.xPercent = _parseVal(v.x, m1.xPercent);
				}
				if (typeof(v.y) === "string" && v.y.indexOf("%") !== -1) {
					m2.y = 0;
					m2.yPercent = _parseVal(v.y, m1.yPercent);
				}

				m2.rotation = _parseAngle(("rotation" in v) ? v.rotation : ("shortRotation" in v) ? v.shortRotation + "_short" : ("rotationZ" in v) ? v.rotationZ : m1.rotation - m1.skewY, m1.rotation - m1.skewY, "rotation", endRotations); //see notes below about skewY for why we subtract it from rotation here
				if (_supports3D) {
					m2.rotationX = _parseAngle(("rotationX" in v) ? v.rotationX : ("shortRotationX" in v) ? v.shortRotationX + "_short" : m1.rotationX || 0, m1.rotationX, "rotationX", endRotations);
					m2.rotationY = _parseAngle(("rotationY" in v) ? v.rotationY : ("shortRotationY" in v) ? v.shortRotationY + "_short" : m1.rotationY || 0, m1.rotationY, "rotationY", endRotations);
				}
				m2.skewX = _parseAngle(v.skewX, m1.skewX - m1.skewY); //see notes below about skewY and why we subtract it from skewX here

				//note: for performance reasons, we combine all skewing into the skewX and rotation values, ignoring skewY but we must still record it so that we can discern how much of the overall skew is attributed to skewX vs. skewY. Otherwise, if the skewY would always act relative (tween skewY to 10deg, for example, multiple times and if we always combine things into skewX, we can't remember that skewY was 10 from last time). Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of -10 degrees.
				if ((m2.skewY = _parseAngle(v.skewY, m1.skewY))) {
					m2.skewX += m2.skewY;
					m2.rotation += m2.skewY;
				}
			}
			if (_supports3D && v.force3D != null) {
				m1.force3D = v.force3D;
				hasChange = true;
			}

			m1.skewType = v.skewType || m1.skewType || CSSPlugin.defaultSkewType;

			has3D = (m1.force3D || m1.z || m1.rotationX || m1.rotationY || m2.z || m2.rotationX || m2.rotationY || m2.perspective);
			if (!has3D && v.scale != null) {
				m2.scaleZ = 1; //no need to tween scaleZ.
			}

			while (--i > -1) {
				p = _transformProps[i];
				orig = m2[p] - m1[p];
				if (orig > min || orig < -min || v[p] != null || _forcePT[p] != null) {
					hasChange = true;
					pt = new CSSPropTween(m1, p, m1[p], orig, pt);
					if (p in endRotations) {
						pt.e = endRotations[p]; //directional rotations typically have compensated values during the tween, but we need to make sure they end at exactly what the user requested
					}
					pt.xs0 = 0; //ensures the value stays numeric in setRatio()
					pt.plugin = plugin;
					cssp._overwriteProps.push(pt.n);
				}
			}

			orig = v.transformOrigin;
			if (m1.svg && (orig || v.svgOrigin)) {
				x = m1.xOffset; //when we change the origin, in order to prevent things from jumping we adjust the x/y so we must record those here so that we can create PropTweens for them and flip them at the same time as the origin
				y = m1.yOffset;
				_parseSVGOrigin(t, _parsePosition(orig), m2, v.svgOrigin, v.smoothOrigin);
				pt = _addNonTweeningNumericPT(m1, "xOrigin", (originalGSTransform ? m1 : m2).xOrigin, m2.xOrigin, pt, transformOriginString); //note: if there wasn't a transformOrigin defined yet, just start with the destination one; it's wasteful otherwise, and it causes problems with fromTo() tweens. For example, FWDTweenLite.to("#wheel", 3, {rotation:180, transformOrigin:"50% 50%", delay:1}); FWDTweenLite.fromTo("#wheel", 3, {scale:0.5, transformOrigin:"50% 50%"}, {scale:1, delay:2}); would cause a jump when the from values revert at the beginning of the 2nd tween.
				pt = _addNonTweeningNumericPT(m1, "yOrigin", (originalGSTransform ? m1 : m2).yOrigin, m2.yOrigin, pt, transformOriginString);
				if (x !== m1.xOffset || y !== m1.yOffset) {
					pt = _addNonTweeningNumericPT(m1, "xOffset", (originalGSTransform ? x : m1.xOffset), m1.xOffset, pt, transformOriginString);
					pt = _addNonTweeningNumericPT(m1, "yOffset", (originalGSTransform ? y : m1.yOffset), m1.yOffset, pt, transformOriginString);
				}
				orig = _useSVGTransformAttr ? null : "0px 0px"; //certain browsers (like firefox) completely botch transform-origin, so we must remove it to prevent it from contaminating transforms. We manage it ourselves with xOrigin and yOrigin
			}
			if (orig || (_supports3D && has3D && m1.zOrigin)) { //if anything 3D is happening and there's a transformOrigin with a z component that's non-zero, we must ensure that the transformOrigin's z-component is set to 0 so that we can manually do those calculations to get around Safari bugs. Even if the user didn't specifically define a "transformOrigin" in this particular tween (maybe they did it via css directly).
				if (_transformProp) {
					hasChange = true;
					p = _transformOriginProp;
					orig = (orig || _getStyle(t, p, _cs, false, "50% 50%")) + ""; //cast as string to avoid errors
					pt = new CSSPropTween(style, p, 0, 0, pt, -1, transformOriginString);
					pt.b = style[p];
					pt.plugin = plugin;
					if (_supports3D) {
						copy = m1.zOrigin;
						orig = orig.split(" ");
						m1.zOrigin = ((orig.length > 2 && !(copy !== 0 && orig[2] === "0px")) ? parseFloat(orig[2]) : copy) || 0; //Safari doesn't handle the z part of transformOrigin correctly, so we'll manually handle it in the _set3DTransformRatio() method.
						pt.xs0 = pt.e = orig[0] + " " + (orig[1] || "50%") + " 0px"; //we must define a z value of 0px specifically otherwise iOS 5 Safari will stick with the old one (if one was defined)!
						pt = new CSSPropTween(m1, "zOrigin", 0, 0, pt, -1, pt.n); //we must create a CSSPropTween for the _gsTransform.zOrigin so that it gets reset properly at the beginning if the tween runs backward (as opposed to just setting m1.zOrigin here)
						pt.b = copy;
						pt.xs0 = pt.e = m1.zOrigin;
					} else {
						pt.xs0 = pt.e = orig;
					}

					//for older versions of IE (6-8), we need to manually calculate things inside the setRatio() function. We record origin x and y (ox and oy) and whether or not the values are percentages (oxp and oyp).
				} else {
					_parsePosition(orig + "", m1);
				}
			}
			if (hasChange) {
				cssp._transformType = (!(m1.svg && _useSVGTransformAttr) && (has3D || this._transformType === 3)) ? 3 : 2; //quicker than calling cssp._enableTransforms();
			}
			if (swapFunc) {
				vars[parsingProp] = swapFunc;
			}
			return pt;
		}, prefix:true});

		_registerComplexSpecialProp("boxShadow", {defaultValue:"0px 0px 0px 0px #999", prefix:true, color:true, multi:true, keyword:"inset"});

		_registerComplexSpecialProp("borderRadius", {defaultValue:"0px", parser:function(t, e, p, cssp, pt, plugin) {
			e = this.format(e);
			var props = ["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],
				style = t.style,
				ea1, i, es2, bs2, bs, es, bn, en, w, h, esfx, bsfx, rel, hn, vn, em;
			w = parseFloat(t.offsetWidth);
			h = parseFloat(t.offsetHeight);
			ea1 = e.split(" ");
			for (i = 0; i < props.length; i++) { //if we're dealing with percentages, we must convert things separately for the horizontal and vertical axis!
				if (this.p.indexOf("border")) { //older browsers used a prefix
					props[i] = _checkPropPrefix(props[i]);
				}
				bs = bs2 = _getStyle(t, props[i], _cs, false, "0px");
				if (bs.indexOf(" ") !== -1) {
					bs2 = bs.split(" ");
					bs = bs2[0];
					bs2 = bs2[1];
				}
				es = es2 = ea1[i];
				bn = parseFloat(bs);
				bsfx = bs.substr((bn + "").length);
				rel = (es.charAt(1) === "=");
				if (rel) {
					en = parseInt(es.charAt(0)+"1", 10);
					es = es.substr(2);
					en *= parseFloat(es);
					esfx = es.substr((en + "").length - (en < 0 ? 1 : 0)) || "";
				} else {
					en = parseFloat(es);
					esfx = es.substr((en + "").length);
				}
				if (esfx === "") {
					esfx = _suffixMap[p] || bsfx;
				}
				if (esfx !== bsfx) {
					hn = _convertToPixels(t, "borderLeft", bn, bsfx); //horizontal number (we use a bogus "borderLeft" property just because the _convertToPixels() method searches for the keywords "Left", "Right", "Top", and "Bottom" to determine of it's a horizontal or vertical property, and we need "border" in the name so that it knows it should measure relative to the element itself, not its parent.
					vn = _convertToPixels(t, "borderTop", bn, bsfx); //vertical number
					if (esfx === "%") {
						bs = (hn / w * 100) + "%";
						bs2 = (vn / h * 100) + "%";
					} else if (esfx === "em") {
						em = _convertToPixels(t, "borderLeft", 1, "em");
						bs = (hn / em) + "em";
						bs2 = (vn / em) + "em";
					} else {
						bs = hn + "px";
						bs2 = vn + "px";
					}
					if (rel) {
						es = (parseFloat(bs) + en) + esfx;
						es2 = (parseFloat(bs2) + en) + esfx;
					}
				}
				pt = _parseComplex(style, props[i], bs + " " + bs2, es + " " + es2, false, "0px", pt);
			}
			return pt;
		}, prefix:true, formatter:_getFormatter("0px 0px 0px 0px", false, true)});
		_registerComplexSpecialProp("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {defaultValue:"0px", parser:function(t, e, p, cssp, pt, plugin) {
			return _parseComplex(t.style, p, this.format(_getStyle(t, p, _cs, false, "0px 0px")), this.format(e), false, "0px", pt);
		}, prefix:true, formatter:_getFormatter("0px 0px", false, true)});
		_registerComplexSpecialProp("backgroundPosition", {defaultValue:"0 0", parser:function(t, e, p, cssp, pt, plugin) {
			var bp = "background-position",
				cs = (_cs || _getComputedStyle(t, null)),
				bs = this.format( ((cs) ? _ieVers ? cs.getPropertyValue(bp + "-x") + " " + cs.getPropertyValue(bp + "-y") : cs.getPropertyValue(bp) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"), //Internet Explorer doesn't report background-position correctly - we must query background-position-x and background-position-y and combine them (even in IE10). Before IE9, we must do the same with the currentStyle object and use camelCase
				es = this.format(e),
				ba, ea, i, pct, overlap, src;
			if ((bs.indexOf("%") !== -1) !== (es.indexOf("%") !== -1) && es.split(",").length < 2) {
				src = _getStyle(t, "backgroundImage").replace(_urlExp, "");
				if (src && src !== "none") {
					ba = bs.split(" ");
					ea = es.split(" ");
					_tempImg.setAttribute("src", src); //set the temp IMG's src to the background-image so that we can measure its width/height
					i = 2;
					while (--i > -1) {
						bs = ba[i];
						pct = (bs.indexOf("%") !== -1);
						if (pct !== (ea[i].indexOf("%") !== -1)) {
							overlap = (i === 0) ? t.offsetWidth - _tempImg.width : t.offsetHeight - _tempImg.height;
							ba[i] = pct ? (parseFloat(bs) / 100 * overlap) + "px" : (parseFloat(bs) / overlap * 100) + "%";
						}
					}
					bs = ba.join(" ");
				}
			}
			return this.parseComplex(t.style, bs, es, pt, plugin);
		}, formatter:_parsePosition});
		_registerComplexSpecialProp("backgroundSize", {defaultValue:"0 0", formatter:function(v) {
			v += ""; //ensure it's a string
			return _parsePosition(v.indexOf(" ") === -1 ? v + " " + v : v); //if set to something like "100% 100%", Safari typically reports the computed style as just "100%" (no 2nd value), but we should ensure that there are two values, so copy the first one. Otherwise, it'd be interpreted as "100% 0" (wrong).
		}});
		_registerComplexSpecialProp("perspective", {defaultValue:"0px", prefix:true});
		_registerComplexSpecialProp("perspectiveOrigin", {defaultValue:"50% 50%", prefix:true});
		_registerComplexSpecialProp("transformStyle", {prefix:true});
		_registerComplexSpecialProp("backfaceVisibility", {prefix:true});
		_registerComplexSpecialProp("userSelect", {prefix:true});
		_registerComplexSpecialProp("margin", {parser:_getEdgeParser("marginTop,marginRight,marginBottom,marginLeft")});
		_registerComplexSpecialProp("padding", {parser:_getEdgeParser("paddingTop,paddingRight,paddingBottom,paddingLeft")});
		_registerComplexSpecialProp("clip", {defaultValue:"rect(0px,0px,0px,0px)", parser:function(t, e, p, cssp, pt, plugin){
			var b, cs, delim;
			if (_ieVers < 9) { //IE8 and earlier don't report a "clip" value in the currentStyle - instead, the values are split apart into clipTop, clipRight, clipBottom, and clipLeft. Also, in IE7 and earlier, the values inside rect() are space-delimited, not comma-delimited.
				cs = t.currentStyle;
				delim = _ieVers < 8 ? " " : ",";
				b = "rect(" + cs.clipTop + delim + cs.clipRight + delim + cs.clipBottom + delim + cs.clipLeft + ")";
				e = this.format(e).split(",").join(delim);
			} else {
				b = this.format(_getStyle(t, this.p, _cs, false, this.dflt));
				e = this.format(e);
			}
			return this.parseComplex(t.style, b, e, pt, plugin);
		}});
		_registerComplexSpecialProp("textShadow", {defaultValue:"0px 0px 0px #999", color:true, multi:true});
		_registerComplexSpecialProp("autoRound,strictUnits", {parser:function(t, e, p, cssp, pt) {return pt;}}); //just so that we can ignore these properties (not tween them)
		_registerComplexSpecialProp("border", {defaultValue:"0px solid #000", parser:function(t, e, p, cssp, pt, plugin) {
			var bw = _getStyle(t, "borderTopWidth", _cs, false, "0px"),
				end = this.format(e).split(" "),
				esfx = end[0].replace(_suffixExp, "");
			if (esfx !== "px") { //if we're animating to a non-px value, we need to convert the beginning width to that unit.
				bw = (parseFloat(bw) / _convertToPixels(t, "borderTopWidth", 1, esfx)) + esfx;
			}
			return this.parseComplex(t.style, this.format(bw + " " + _getStyle(t, "borderTopStyle", _cs, false, "solid") + " " + _getStyle(t, "borderTopColor", _cs, false, "#000")), end.join(" "), pt, plugin);
			}, color:true, formatter:function(v) {
				var a = v.split(" ");
				return a[0] + " " + (a[1] || "solid") + " " + (v.match(_colorExp) || ["#000"])[0];
			}});
		_registerComplexSpecialProp("borderWidth", {parser:_getEdgeParser("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}); //Firefox doesn't pick up on borderWidth set in style sheets (only inline).
		_registerComplexSpecialProp("float,cssFloat,styleFloat", {parser:function(t, e, p, cssp, pt, plugin) {
			var s = t.style,
				prop = ("cssFloat" in s) ? "cssFloat" : "styleFloat";
			return new CSSPropTween(s, prop, 0, 0, pt, -1, p, false, 0, s[prop], e);
		}});

		//opacity-related
		var _setIEOpacityRatio = function(v) {
				var t = this.t, //refers to the element's style property
					filters = t.filter || _getStyle(this.data, "filter") || "",
					val = (this.s + this.c * v) | 0,
					skip;
				if (val === 100) { //for older versions of IE that need to use a filter to apply opacity, we should remove the filter if opacity hits 1 in order to improve performance, but make sure there isn't a transform (matrix) or gradient in the filters.
					if (filters.indexOf("atrix(") === -1 && filters.indexOf("radient(") === -1 && filters.indexOf("oader(") === -1) {
						t.removeAttribute("filter");
						skip = (!_getStyle(this.data, "filter")); //if a class is applied that has an alpha filter, it will take effect (we don't want that), so re-apply our alpha filter in that case. We must first remove it and then check.
					} else {
						t.filter = filters.replace(_alphaFilterExp, "");
						skip = true;
					}
				}
				if (!skip) {
					if (this.xn1) {
						t.filter = filters = filters || ("alpha(opacity=" + val + ")"); //works around bug in IE7/8 that prevents changes to "visibility" from being applied properly if the filter is changed to a different alpha on the same frame.
					}
					if (filters.indexOf("pacity") === -1) { //only used if browser doesn't support the standard opacity style property (IE 7 and 8). We omit the "O" to avoid case-sensitivity issues
						if (val !== 0 || !this.xn1) { //bugs in IE7/8 won't render the filter properly if opacity is ADDED on the same frame/render as "visibility" changes (this.xn1 is 1 if this tween is an "autoAlpha" tween)
							t.filter = filters + " alpha(opacity=" + val + ")"; //we round the value because otherwise, bugs in IE7/8 can prevent "visibility" changes from being applied properly.
						}
					} else {
						t.filter = filters.replace(_opacityExp, "opacity=" + val);
					}
				}
			};
		_registerComplexSpecialProp("opacity,alpha,autoAlpha", {defaultValue:"1", parser:function(t, e, p, cssp, pt, plugin) {
			var b = parseFloat(_getStyle(t, "opacity", _cs, false, "1")),
				style = t.style,
				isAutoAlpha = (p === "autoAlpha");
			if (typeof(e) === "string" && e.charAt(1) === "=") {
				e = ((e.charAt(0) === "-") ? -1 : 1) * parseFloat(e.substr(2)) + b;
			}
			if (isAutoAlpha && b === 1 && _getStyle(t, "visibility", _cs) === "hidden" && e !== 0) { //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
				b = 0;
			}
			if (_supportsOpacity) {
				pt = new CSSPropTween(style, "opacity", b, e - b, pt);
			} else {
				pt = new CSSPropTween(style, "opacity", b * 100, (e - b) * 100, pt);
				pt.xn1 = isAutoAlpha ? 1 : 0; //we need to record whether or not this is an autoAlpha so that in the setRatio(), we know to duplicate the setting of the alpha in order to work around a bug in IE7 and IE8 that prevents changes to "visibility" from taking effect if the filter is changed to a different alpha(opacity) at the same time. Setting it to the SAME value first, then the new value works around the IE7/8 bug.
				style.zoom = 1; //helps correct an IE issue.
				pt.type = 2;
				pt.b = "alpha(opacity=" + pt.s + ")";
				pt.e = "alpha(opacity=" + (pt.s + pt.c) + ")";
				pt.data = t;
				pt.plugin = plugin;
				pt.setRatio = _setIEOpacityRatio;
			}
			if (isAutoAlpha) { //we have to create the "visibility" PropTween after the opacity one in the linked list so that they run in the order that works properly in IE8 and earlier
				pt = new CSSPropTween(style, "visibility", 0, 0, pt, -1, null, false, 0, ((b !== 0) ? "inherit" : "hidden"), ((e === 0) ? "hidden" : "inherit"));
				pt.xs0 = "inherit";
				cssp._overwriteProps.push(pt.n);
				cssp._overwriteProps.push(p);
			}
			return pt;
		}});


		var _removeProp = function(s, p) {
				if (p) {
					if (s.removeProperty) {
						if (p.substr(0,2) === "ms" || p.substr(0,6) === "webkit") { //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
							p = "-" + p;
						}
						s.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
					} else { //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
						s.removeAttribute(p);
					}
				}
			},
			_setClassNameRatio = function(v) {
				this.t._gsClassPT = this;
				if (v === 1 || v === 0) {
					this.t.setAttribute("class", (v === 0) ? this.b : this.e);
					var mpt = this.data, //first MiniPropTween
						s = this.t.style;
					while (mpt) {
						if (!mpt.v) {
							_removeProp(s, mpt.p);
						} else {
							s[mpt.p] = mpt.v;
						}
						mpt = mpt._next;
					}
					if (v === 1 && this.t._gsClassPT === this) {
						this.t._gsClassPT = null;
					}
				} else if (this.t.getAttribute("class") !== this.e) {
					this.t.setAttribute("class", this.e);
				}
			};
		_registerComplexSpecialProp("className", {parser:function(t, e, p, cssp, pt, plugin, vars) {
			var b = t.getAttribute("class") || "", //don't use t.className because it doesn't work consistently on SVG elements; getAttribute("class") and setAttribute("class", value") is more reliable.
				cssText = t.style.cssText,
				difData, bs, cnpt, cnptLookup, mpt;
			pt = cssp._classNamePT = new CSSPropTween(t, p, 0, 0, pt, 2);
			pt.setRatio = _setClassNameRatio;
			pt.pr = -11;
			_hasPriority = true;
			pt.b = b;
			bs = _getAllStyles(t, _cs);
			//if there's a className tween already operating on the target, force it to its end so that the necessary inline styles are removed and the class name is applied before we determine the end state (we don't want inline styles interfering that were there just for class-specific values)
			cnpt = t._gsClassPT;
			if (cnpt) {
				cnptLookup = {};
				mpt = cnpt.data; //first MiniPropTween which stores the inline styles - we need to force these so that the inline styles don't contaminate things. Otherwise, there's a small chance that a tween could start and the inline values match the destination values and they never get cleaned.
				while (mpt) {
					cnptLookup[mpt.p] = 1;
					mpt = mpt._next;
				}
				cnpt.setRatio(1);
			}
			t._gsClassPT = pt;
			pt.e = (e.charAt(1) !== "=") ? e : b.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + ((e.charAt(0) === "+") ? " " + e.substr(2) : "");
			t.setAttribute("class", pt.e);
			difData = _cssDif(t, bs, _getAllStyles(t), vars, cnptLookup);
			t.setAttribute("class", b);
			pt.data = difData.firstMPT;
			t.style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
			pt = pt.xfirst = cssp.parse(t, difData.difs, pt, plugin); //we record the CSSPropTween as the xfirst so that we can handle overwriting propertly (if "className" gets overwritten, we must kill all the properties associated with the className part of the tween, so we can loop through from xfirst to the pt itself)
			return pt;
		}});


		var _setClearPropsRatio = function(v) {
			if (v === 1 || v === 0) if (this.data._totalTime === this.data._totalDuration && this.data.data !== "isFromStart") { //this.data refers to the tween. Only clear at the END of the tween (remember, from() tweens make the ratio go from 1 to 0, so we can't just check that and if the tween is the zero-duration one that's created internally to render the starting values in a from() tween, ignore that because otherwise, for example, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in).
				var s = this.t.style,
					transformParse = _specialProps.transform.parse,
					a, p, i, clearTransform, transform;
				if (this.e === "all") {
					s.cssText = "";
					clearTransform = true;
				} else {
					a = this.e.split(" ").join("").split(",");
					i = a.length;
					while (--i > -1) {
						p = a[i];
						if (_specialProps[p]) {
							if (_specialProps[p].parse === transformParse) {
								clearTransform = true;
							} else {
								p = (p === "transformOrigin") ? _transformOriginProp : _specialProps[p].p; //ensures that special properties use the proper browser-specific property name, like "scaleX" might be "-webkit-transform" or "boxShadow" might be "-moz-box-shadow"
							}
						}
						_removeProp(s, p);
					}
				}
				if (clearTransform) {
					_removeProp(s, _transformProp);
					transform = this.t._gsTransform;
					if (transform) {
						if (transform.svg) {
							this.t.removeAttribute("data-svg-origin");
							this.t.removeAttribute("transform");
						}
						delete this.t._gsTransform;
					}
				}

			}
		};
		_registerComplexSpecialProp("clearProps", {parser:function(t, e, p, cssp, pt) {
			pt = new CSSPropTween(t, p, 0, 0, pt, 2);
			pt.setRatio = _setClearPropsRatio;
			pt.e = e;
			pt.pr = -10;
			pt.data = cssp._tween;
			_hasPriority = true;
			return pt;
		}});

		p = "bezier,throwProps,physicsProps,physics2D".split(",");
		i = p.length;
		while (i--) {
			_registerPluginProp(p[i]);
		}








		p = CSSPlugin.prototype;
		p._firstPT = p._lastParsedTransform = p._transform = null;

		//gets called when the tween renders for the first time. This kicks everything off, recording start/end values, etc.
		p._onInitTween = function(target, vars, tween, index) {
			if (!target.nodeType) { //css is only for dom elements
				return false;
			}
			this._target = _target = target;
			this._tween = tween;
			this._vars = vars;
			_index = index;
			_autoRound = vars.autoRound;
			_hasPriority = false;
			_suffixMap = vars.suffixMap || CSSPlugin.suffixMap;
			_cs = _getComputedStyle(target, "");
			_overwriteProps = this._overwriteProps;
			var style = target.style,
				v, pt, pt2, first, last, next, zIndex, tpt, threeD;
			if (_reqSafariFix) if (style.zIndex === "") {
				v = _getStyle(target, "zIndex", _cs);
				if (v === "auto" || v === "") {
					//corrects a bug in [non-Android] Safari that prevents it from repainting elements in their new positions if they don't have a zIndex set. We also can't just apply this inside _parseTransform() because anything that's moved in any way (like using "left" or "top" instead of transforms like "x" and "y") can be affected, so it is best to ensure that anything that's tweening has a z-index. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly. Plus zIndex is less memory-intensive.
					this._addLazySet(style, "zIndex", 0);
				}
			}

			if (typeof(vars) === "string") {
				first = style.cssText;
				v = _getAllStyles(target, _cs);
				style.cssText = first + ";" + vars;
				v = _cssDif(target, v, _getAllStyles(target)).difs;
				if (!_supportsOpacity && _opacityValExp.test(vars)) {
					v.opacity = parseFloat( RegExp.$1 );
				}
				vars = v;
				style.cssText = first;
			}

			if (vars.className) { //className tweens will combine any differences they find in the css with the vars that are passed in, so {className:"myClass", scale:0.5, left:20} would work.
				this._firstPT = pt = _specialProps.className.parse(target, vars.className, "className", this, null, null, vars);
			} else {
				this._firstPT = pt = this.parse(target, vars, null);
			}

			if (this._transformType) {
				threeD = (this._transformType === 3);
				if (!_transformProp) {
					style.zoom = 1; //helps correct an IE issue.
				} else if (_isSafari) {
					_reqSafariFix = true;
					//if zIndex isn't set, iOS Safari doesn't repaint things correctly sometimes (seemingly at random).
					if (style.zIndex === "") {
						zIndex = _getStyle(target, "zIndex", _cs);
						if (zIndex === "auto" || zIndex === "") {
							this._addLazySet(style, "zIndex", 0);
						}
					}
					//Setting WebkitBackfaceVisibility corrects 3 bugs:
					// 1) [non-Android] Safari skips rendering changes to "top" and "left" that are made on the same frame/render as a transform update.
					// 2) iOS Safari sometimes neglects to repaint elements in their new positions. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly.
					// 3) Safari sometimes displayed odd artifacts when tweening the transform (or WebkitTransform) property, like ghosts of the edges of the element remained. Definitely a browser bug.
					//Note: we allow the user to override the auto-setting by defining WebkitBackfaceVisibility in the vars of the tween.
					if (_isSafariLT6) {
						this._addLazySet(style, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (threeD ? "visible" : "hidden"));
					}
				}
				pt2 = pt;
				while (pt2 && pt2._next) {
					pt2 = pt2._next;
				}
				tpt = new CSSPropTween(target, "transform", 0, 0, null, 2);
				this._linkCSSP(tpt, null, pt2);
				tpt.setRatio = _transformProp ? _setTransformRatio : _setIETransformRatio;
				tpt.data = this._transform || _getTransform(target, _cs, true);
				tpt.tween = tween;
				tpt.pr = -1; //ensures that the transforms get applied after the components are updated.
				_overwriteProps.pop(); //we don't want to force the overwrite of all "transform" tweens of the target - we only care about individual transform properties like scaleX, rotation, etc. The CSSPropTween constructor automatically adds the property to _overwriteProps which is why we need to pop() here.
			}

			if (_hasPriority) {
				//reorders the linked list in order of pr (priority)
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				this._firstPT = first;
			}
			return true;
		};


		p.parse = function(target, vars, pt, plugin) {
			var style = target.style,
				p, sp, bn, en, bs, es, bsfx, esfx, isStr, rel;
			for (p in vars) {
				es = vars[p]; //ending value string
				if (typeof(es) === "function") {
					es = es(_index, _target);
				}
				sp = _specialProps[p]; //SpecialProp lookup.
				if (sp) {
					pt = sp.parse(target, es, p, this, pt, plugin, vars);

				} else {
					bs = _getStyle(target, p, _cs) + "";
					isStr = (typeof(es) === "string");
					if (p === "color" || p === "fill" || p === "stroke" || p.indexOf("Color") !== -1 || (isStr && _rgbhslExp.test(es))) { //Opera uses background: to define color sometimes in addition to backgroundColor:
						if (!isStr) {
							es = _parseColor(es);
							es = ((es.length > 3) ? "rgba(" : "rgb(") + es.join(",") + ")";
						}
						pt = _parseComplex(style, p, bs, es, true, "transparent", pt, 0, plugin);

					} else if (isStr && _complexExp.test(es)) {
						pt = _parseComplex(style, p, bs, es, true, null, pt, 0, plugin);

					} else {
						bn = parseFloat(bs);
						bsfx = (bn || bn === 0) ? bs.substr((bn + "").length) : ""; //remember, bs could be non-numeric like "normal" for fontWeight, so we should default to a blank suffix in that case.

						if (bs === "" || bs === "auto") {
							if (p === "width" || p === "height") {
								bn = _getDimension(target, p, _cs);
								bsfx = "px";
							} else if (p === "left" || p === "top") {
								bn = _calculateOffset(target, p, _cs);
								bsfx = "px";
							} else {
								bn = (p !== "opacity") ? 0 : 1;
								bsfx = "";
							}
						}

						rel = (isStr && es.charAt(1) === "=");
						if (rel) {
							en = parseInt(es.charAt(0) + "1", 10);
							es = es.substr(2);
							en *= parseFloat(es);
							esfx = es.replace(_suffixExp, "");
						} else {
							en = parseFloat(es);
							esfx = isStr ? es.replace(_suffixExp, "") : "";
						}

						if (esfx === "") {
							esfx = (p in _suffixMap) ? _suffixMap[p] : bsfx; //populate the end suffix, prioritizing the map, then if none is found, use the beginning suffix.
						}

						es = (en || en === 0) ? (rel ? en + bn : en) + esfx : vars[p]; //ensures that any += or -= prefixes are taken care of. Record the end value before normalizing the suffix because we always want to end the tween on exactly what they intended even if it doesn't match the beginning value's suffix.

						//if the beginning/ending suffixes don't match, normalize them...
						if (bsfx !== esfx) if (esfx !== "") if (en || en === 0) if (bn) { //note: if the beginning value (bn) is 0, we don't need to convert units!
							bn = _convertToPixels(target, p, bn, bsfx);
							if (esfx === "%") {
								bn /= _convertToPixels(target, p, 100, "%") / 100;
								if (vars.strictUnits !== true) { //some browsers report only "px" values instead of allowing "%" with getComputedStyle(), so we assume that if we're tweening to a %, we should start there too unless strictUnits:true is defined. This approach is particularly useful for responsive designs that use from() tweens.
									bs = bn + "%";
								}

							} else if (esfx === "em" || esfx === "rem" || esfx === "vw" || esfx === "vh") {
								bn /= _convertToPixels(target, p, 1, esfx);

							//otherwise convert to pixels.
							} else if (esfx !== "px") {
								en = _convertToPixels(target, p, en, esfx);
								esfx = "px"; //we don't use bsfx after this, so we don't need to set it to px too.
							}
							if (rel) if (en || en === 0) {
								es = (en + bn) + esfx; //the changes we made affect relative calculations, so adjust the end value here.
							}
						}

						if (rel) {
							en += bn;
						}

						if ((bn || bn === 0) && (en || en === 0)) { //faster than isNaN(). Also, previously we required en !== bn but that doesn't really gain much performance and it prevents _parseToProxy() from working properly if beginning and ending values match but need to get tweened by an external plugin anyway. For example, a bezier tween where the target starts at left:0 and has these points: [{left:50},{left:0}] wouldn't work properly because when parsing the last point, it'd match the first (current) one and a non-tweening CSSPropTween would be recorded when we actually need a normal tween (type:0) so that things get updated during the tween properly.
							pt = new CSSPropTween(style, p, bn, en - bn, pt, 0, p, (_autoRound !== false && (esfx === "px" || p === "zIndex")), 0, bs, es);
							pt.xs0 = esfx;
							//DEBUG: _log("tween "+p+" from "+pt.b+" ("+bn+esfx+") to "+pt.e+" with suffix: "+pt.xs0);
						} else if (style[p] === undefined || !es && (es + "" === "NaN" || es == null)) {
							_log("invalid " + p + " tween value: " + vars[p]);
						} else {
							pt = new CSSPropTween(style, p, en || bn || 0, 0, pt, -1, p, false, 0, bs, es);
							pt.xs0 = (es === "none" && (p === "display" || p.indexOf("Style") !== -1)) ? bs : es; //intermediate value should typically be set immediately (end value) except for "display" or things like borderTopStyle, borderBottomStyle, etc. which should use the beginning value during the tween.
							//DEBUG: _log("non-tweening value "+p+": "+pt.xs0);
						}
					}
				}
				if (plugin) if (pt && !pt.plugin) {
					pt.plugin = plugin;
				}
			}
			return pt;
		};


		//gets called every time the tween updates, passing the new ratio (typically a value between 0 and 1, but not always (for example, if an Elastic.easeOut is used, the value can jump above 1 mid-tween). It will always start and 0 and end at 1.
		p.setRatio = function(v) {
			var pt = this._firstPT,
				min = 0.000001,
				val, str, i;
			//at the end of the tween, we set the values to exactly what we received in order to make sure non-tweening values (like "position" or "float" or whatever) are set and so that if the beginning/ending suffixes (units) didn't match and we normalized to px, the value that the user passed in is used here. We check to see if the tween is at its beginning in case it's a from() tween in which case the ratio will actually go from 1 to 0 over the course of the tween (backwards).
			if (v === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
				while (pt) {
					if (pt.type !== 2) {
						if (pt.r && pt.type !== -1) {
							val = Math.round(pt.s + pt.c);
							if (!pt.type) {
								pt.t[pt.p] = val + pt.xs0;
							} else if (pt.type === 1) { //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
								i = pt.l;
								str = pt.xs0 + val + pt.xs1;
								for (i = 1; i < pt.l; i++) {
									str += pt["xn"+i] + pt["xs"+(i+1)];
								}
								pt.t[pt.p] = str;
							}
						} else {
							pt.t[pt.p] = pt.e;
						}
					} else {
						pt.setRatio(v);
					}
					pt = pt._next;
				}

			} else if (v || !(this._tween._time === this._tween._duration || this._tween._time === 0) || this._tween._rawPrevTime === -0.000001) {
				while (pt) {
					val = pt.c * v + pt.s;
					if (pt.r) {
						val = Math.round(val);
					} else if (val < min) if (val > -min) {
						val = 0;
					}
					if (!pt.type) {
						pt.t[pt.p] = val + pt.xs0;
					} else if (pt.type === 1) { //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
						i = pt.l;
						if (i === 2) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2;
						} else if (i === 3) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3;
						} else if (i === 4) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4;
						} else if (i === 5) {
							pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4 + pt.xn4 + pt.xs5;
						} else {
							str = pt.xs0 + val + pt.xs1;
							for (i = 1; i < pt.l; i++) {
								str += pt["xn"+i] + pt["xs"+(i+1)];
							}
							pt.t[pt.p] = str;
						}

					} else if (pt.type === -1) { //non-tweening value
						pt.t[pt.p] = pt.xs0;

					} else if (pt.setRatio) { //custom setRatio() for things like SpecialProps, external plugins, etc.
						pt.setRatio(v);
					}
					pt = pt._next;
				}

			//if the tween is reversed all the way back to the beginning, we need to restore the original values which may have different units (like % instead of px or em or whatever).
			} else {
				while (pt) {
					if (pt.type !== 2) {
						pt.t[pt.p] = pt.b;
					} else {
						pt.setRatio(v);
					}
					pt = pt._next;
				}
			}
		};

		/**
		 * @private
		 * Forces rendering of the target's transforms (rotation, scale, etc.) whenever the CSSPlugin's setRatio() is called.
		 * Basically, this tells the CSSPlugin to create a CSSPropTween (type 2) after instantiation that runs last in the linked
		 * list and calls the appropriate (3D or 2D) rendering function. We separate this into its own method so that we can call
		 * it from other plugins like BezierPlugin if, for example, it needs to apply an autoRotation and this CSSPlugin
		 * doesn't have any transform-related properties of its own. You can call this method as many times as you
		 * want and it won't create duplicate CSSPropTweens.
		 *
		 * @param {boolean} threeD if true, it should apply 3D tweens (otherwise, just 2D ones are fine and typically faster)
		 */
		p._enableTransforms = function(threeD) {
			this._transform = this._transform || _getTransform(this._target, _cs, true); //ensures that the element has a _gsTransform property with the appropriate values.
			this._transformType = (!(this._transform.svg && _useSVGTransformAttr) && (threeD || this._transformType === 3)) ? 3 : 2;
		};

		var lazySet = function(v) {
			this.t[this.p] = this.e;
			this.data._linkCSSP(this, this._next, null, true); //we purposefully keep this._next even though it'd make sense to null it, but this is a performance optimization, as this happens during the while (pt) {} loop in setRatio() at the bottom of which it sets pt = pt._next, so if we null it, the linked list will be broken in that loop.
		};
		/** @private Gives us a way to set a value on the first render (and only the first render). **/
		p._addLazySet = function(t, p, v) {
			var pt = this._firstPT = new CSSPropTween(t, p, 0, 0, this._firstPT, 2);
			pt.e = v;
			pt.setRatio = lazySet;
			pt.data = this;
		};

		/** @private **/
		p._linkCSSP = function(pt, next, prev, remove) {
			if (pt) {
				if (next) {
					next._prev = pt;
				}
				if (pt._next) {
					pt._next._prev = pt._prev;
				}
				if (pt._prev) {
					pt._prev._next = pt._next;
				} else if (this._firstPT === pt) {
					this._firstPT = pt._next;
					remove = true; //just to prevent resetting this._firstPT 5 lines down in case pt._next is null. (optimized for speed)
				}
				if (prev) {
					prev._next = pt;
				} else if (!remove && this._firstPT === null) {
					this._firstPT = pt;
				}
				pt._next = next;
				pt._prev = prev;
			}
			return pt;
		};

		p._mod = function(lookup) {
			var pt = this._firstPT;
			while (pt) {
				if (typeof(lookup[pt.p]) === "function" && lookup[pt.p] === Math.round) { //only gets called by RoundPropsPlugin (ModifyPlugin manages all the rendering internally for CSSPlugin properties that need modification). Remember, we handle rounding a bit differently in this plugin for performance reasons, leveraging "r" as an indicator that the value should be rounded internally..
					pt.r = 1;
				}
				pt = pt._next;
			}
		};

		//we need to make sure that if alpha or autoAlpha is killed, opacity is too. And autoAlpha affects the "visibility" property.
		p._kill = function(lookup) {
			var copy = lookup,
				pt, p, xfirst;
			if (lookup.autoAlpha || lookup.alpha) {
				copy = {};
				for (p in lookup) { //copy the lookup so that we're not changing the original which may be passed elsewhere.
					copy[p] = lookup[p];
				}
				copy.opacity = 1;
				if (copy.autoAlpha) {
					copy.visibility = 1;
				}
			}
			if (lookup.className && (pt = this._classNamePT)) { //for className tweens, we need to kill any associated CSSPropTweens too; a linked list starts at the className's "xfirst".
				xfirst = pt.xfirst;
				if (xfirst && xfirst._prev) {
					this._linkCSSP(xfirst._prev, pt._next, xfirst._prev._prev); //break off the prev
				} else if (xfirst === this._firstPT) {
					this._firstPT = pt._next;
				}
				if (pt._next) {
					this._linkCSSP(pt._next, pt._next._next, xfirst._prev);
				}
				this._classNamePT = null;
			}
			pt = this._firstPT;
			while (pt) {
				if (pt.plugin && pt.plugin !== p && pt.plugin._kill) { //for plugins that are registered with CSSPlugin, we should notify them of the kill.
					pt.plugin._kill(lookup);
					p = pt.plugin;
				}
				pt = pt._next;
			}
			return TweenPlugin.prototype._kill.call(this, copy);
		};



		//used by cascadeTo() for gathering all the style properties of each child element into an array for comparison.
		var _getChildStyles = function(e, props, targets) {
				var children, i, child, type;
				if (e.slice) {
					i = e.length;
					while (--i > -1) {
						_getChildStyles(e[i], props, targets);
					}
					return;
				}
				children = e.childNodes;
				i = children.length;
				while (--i > -1) {
					child = children[i];
					type = child.type;
					if (child.style) {
						props.push(_getAllStyles(child));
						if (targets) {
							targets.push(child);
						}
					}
					if ((type === 1 || type === 9 || type === 11) && child.childNodes.length) {
						_getChildStyles(child, props, targets);
					}
				}
			};

		/**
		 * Typically only useful for className tweens that may affect child elements, this method creates a FWDTweenLite
		 * and then compares the style properties of all the target's child elements at the tween's start and end, and
		 * if any are different, it also creates tweens for those and returns an array containing ALL of the resulting
		 * tweens (so that you can easily add() them to a TimelineLite, for example). The reason this functionality is
		 * wrapped into a separate static method of CSSPlugin instead of being integrated into all regular className tweens
		 * is because it creates entirely new tweens that may have completely different targets than the original tween,
		 * so if they were all lumped into the original tween instance, it would be inconsistent with the rest of the API
		 * and it would create other problems. For example:
		 *  - If I create a tween of elementA, that tween instance may suddenly change its target to include 50 other elements (unintuitive if I specifically defined the target I wanted)
		 *  - We can't just create new independent tweens because otherwise, what happens if the original/parent tween is reversed or pause or dropped into a TimelineLite for tight control? You'd expect that tween's behavior to affect all the others.
		 *  - Analyzing every style property of every child before and after the tween is an expensive operation when there are many children, so this behavior shouldn't be imposed on all className tweens by default, especially since it's probably rare that this extra functionality is needed.
		 *
		 * @param {Object} target object to be tweened
		 * @param {number} Duration in seconds (or frames for frames-based tweens)
		 * @param {Object} Object containing the end values, like {className:"newClass", ease:Linear.easeNone}
		 * @return {Array} An array of FWDTweenLite instances
		 */
		CSSPlugin.cascadeTo = function(target, duration, vars) {
			var tween = FWDTweenLite.to(target, duration, vars),
				results = [tween],
				b = [],
				e = [],
				targets = [],
				_reservedProps = FWDTweenLite._internals.reservedProps,
				i, difs, p, from;
			target = tween._targets || tween.target;
			_getChildStyles(target, b, targets);
			tween.render(duration, true, true);
			_getChildStyles(target, e);
			tween.render(0, true, true);
			tween._enabled(true);
			i = targets.length;
			while (--i > -1) {
				difs = _cssDif(targets[i], b[i], e[i]);
				if (difs.firstMPT) {
					difs = difs.difs;
					for (p in vars) {
						if (_reservedProps[p]) {
							difs[p] = vars[p];
						}
					}
					from = {};
					for (p in difs) {
						from[p] = b[i][p];
					}
					results.push(FWDTweenLite.fromTo(targets[i], duration, from, difs));
				}
			}
			return results;
		};

		TweenPlugin.activate([CSSPlugin]);
		return CSSPlugin;

	}, true);

	
	
	
	
	
	
	
	
	
	
/*
 * ----------------------------------------------------------------
 * RoundPropsPlugin
 * ----------------------------------------------------------------
 */
	(function() {

		var RoundPropsPlugin = _fwd_gsScope._gsDefine.plugin({
				propName: "roundProps",
				version: "1.6.0",
				priority: -1,
				API: 2,

				//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
				init: function(target, value, tween) {
					this._tween = tween;
					return true;
				}

			}),
			_roundLinkedList = function(node) {
				while (node) {
					if (!node.f && !node.blob) {
						node.m = Math.round;
					}
					node = node._next;
				}
			},
			p = RoundPropsPlugin.prototype;

		p._onInitAllProps = function() {
			var tween = this._tween,
				rp = (tween.vars.roundProps.join) ? tween.vars.roundProps : tween.vars.roundProps.split(","),
				i = rp.length,
				lookup = {},
				rpt = tween._propLookup.roundProps,
				prop, pt, next;
			while (--i > -1) {
				lookup[rp[i]] = Math.round;
			}
			i = rp.length;
			while (--i > -1) {
				prop = rp[i];
				pt = tween._firstPT;
				while (pt) {
					next = pt._next; //record here, because it may get removed
					if (pt.pg) {
						pt.t._mod(lookup);
					} else if (pt.n === prop) {
						if (pt.f === 2 && pt.t) { //a blob (text containing multiple numeric values)
							_roundLinkedList(pt.t._firstPT);
						} else {
							this._add(pt.t, prop, pt.s, pt.c);
							//remove from linked list
							if (next) {
								next._prev = pt._prev;
							}
							if (pt._prev) {
								pt._prev._next = next;
							} else if (tween._firstPT === pt) {
								tween._firstPT = next;
							}
							pt._next = pt._prev = null;
							tween._propLookup[prop] = rpt;
						}
					}
					pt = next;
				}
			}
			return false;
		};

		p._add = function(target, p, s, c) {
			this._addTween(target, p, s, s + c, p, Math.round);
			this._overwriteProps.push(p);
		};

	}());










/*
 * ----------------------------------------------------------------
 * AttrPlugin
 * ----------------------------------------------------------------
 */

	(function() {

		_fwd_gsScope._gsDefine.plugin({
			propName: "attr",
			API: 2,
			version: "0.6.0",

			//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
			init: function(target, value, tween, index) {
				var p, end;
				if (typeof(target.setAttribute) !== "function") {
					return false;
				}
				for (p in value) {
					end = value[p];
					if (typeof(end) === "function") {
						end = end(index, target);
					}
					this._addTween(target, "setAttribute", target.getAttribute(p) + "", end + "", p, false, p);
					this._overwriteProps.push(p);
				}
				return true;
			}

		});

	}());










/*
 * ----------------------------------------------------------------
 * DirectionalRotationPlugin
 * ----------------------------------------------------------------
 */
	_fwd_gsScope._gsDefine.plugin({
		propName: "directionalRotation",
		version: "0.3.0",
		API: 2,

		//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
		init: function(target, value, tween, index) {
			if (typeof(value) !== "object") {
				value = {rotation:value};
			}
			this.finals = {};
			var cap = (value.useRadians === true) ? Math.PI * 2 : 360,
				min = 0.000001,
				p, v, start, end, dif, split;
			for (p in value) {
				if (p !== "useRadians") {
					end = value[p];
					if (typeof(end) === "function") {
						end = end(index, target);
					}
					split = (end + "").split("_");
					v = split[0];
					start = parseFloat( (typeof(target[p]) !== "function") ? target[p] : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]() );
					end = this.finals[p] = (typeof(v) === "string" && v.charAt(1) === "=") ? start + parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : Number(v) || 0;
					dif = end - start;
					if (split.length) {
						v = split.join("_");
						if (v.indexOf("short") !== -1) {
							dif = dif % cap;
							if (dif !== dif % (cap / 2)) {
								dif = (dif < 0) ? dif + cap : dif - cap;
							}
						}
						if (v.indexOf("_cw") !== -1 && dif < 0) {
							dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						} else if (v.indexOf("ccw") !== -1 && dif > 0) {
							dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
						}
					}
					if (dif > min || dif < -min) {
						this._addTween(target, p, start, start + dif, p);
						this._overwriteProps.push(p);
					}
				}
			}
			return true;
		},

		//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
		set: function(ratio) {
			var pt;
			if (ratio !== 1) {
				this._super.setRatio.call(this, ratio);
			} else {
				pt = this._firstPT;
				while (pt) {
					if (pt.f) {
						pt.t[pt.p](this.finals[pt.p]);
					} else {
						pt.t[pt.p] = this.finals[pt.p];
					}
					pt = pt._next;
				}
			}
		}

	})._autoCSS = true;







	
	
	
	
/*
 * ----------------------------------------------------------------
 * EasePack
 * ----------------------------------------------------------------
 */
	_fwd_gsScope._gsDefine("easing.Back", ["easing.Ease"], function(Ease) {
		
		var w = (_fwd_gsScope.GreenSockGlobals || _fwd_gsScope),
			gs = w.com.greensock,
			_2PI = Math.PI * 2,
			_HALF_PI = Math.PI / 2,
			_class = gs._class,
			_create = function(n, f) {
				var C = _class("easing." + n, function(){}, true),
					p = C.prototype = new Ease();
				p.constructor = C;
				p.getRatio = f;
				return C;
			},
			_easeReg = Ease.register || function(){}, //put an empty function in place just as a safety measure in case someone loads an OLD version of FWDTweenLite.js where Ease.register doesn't exist.
			_wrap = function(name, EaseOut, EaseIn, EaseInOut, aliases) {
				var C = _class("easing."+name, {
					easeOut:new EaseOut(),
					easeIn:new EaseIn(),
					easeInOut:new EaseInOut()
				}, true);
				_easeReg(C, name);
				return C;
			},
			EasePoint = function(time, value, next) {
				this.t = time;
				this.v = value;
				if (next) {
					this.next = next;
					next.prev = this;
					this.c = next.v - value;
					this.gap = next.t - time;
				}
			},

			//Back
			_createBack = function(n, f) {
				var C = _class("easing." + n, function(overshoot) {
						this._p1 = (overshoot || overshoot === 0) ? overshoot : 1.70158;
						this._p2 = this._p1 * 1.525;
					}, true),
					p = C.prototype = new Ease();
				p.constructor = C;
				p.getRatio = f;
				p.config = function(overshoot) {
					return new C(overshoot);
				};
				return C;
			},

			Back = _wrap("Back",
				_createBack("BackOut", function(p) {
					return ((p = p - 1) * p * ((this._p1 + 1) * p + this._p1) + 1);
				}),
				_createBack("BackIn", function(p) {
					return p * p * ((this._p1 + 1) * p - this._p1);
				}),
				_createBack("BackInOut", function(p) {
					return ((p *= 2) < 1) ? 0.5 * p * p * ((this._p2 + 1) * p - this._p2) : 0.5 * ((p -= 2) * p * ((this._p2 + 1) * p + this._p2) + 2);
				})
			),


			//SlowMo
			SlowMo = _class("easing.SlowMo", function(linearRatio, power, yoyoMode) {
				power = (power || power === 0) ? power : 0.7;
				if (linearRatio == null) {
					linearRatio = 0.7;
				} else if (linearRatio > 1) {
					linearRatio = 1;
				}
				this._p = (linearRatio !== 1) ? power : 0;
				this._p1 = (1 - linearRatio) / 2;
				this._p2 = linearRatio;
				this._p3 = this._p1 + this._p2;
				this._calcEnd = (yoyoMode === true);
			}, true),
			p = SlowMo.prototype = new Ease(),
			SteppedEase, RoughEase, _createElastic;

		p.constructor = SlowMo;
		p.getRatio = function(p) {
			var r = p + (0.5 - p) * this._p;
			if (p < this._p1) {
				return this._calcEnd ? 1 - ((p = 1 - (p / this._p1)) * p) : r - ((p = 1 - (p / this._p1)) * p * p * p * r);
			} else if (p > this._p3) {
				return this._calcEnd ? 1 - (p = (p - this._p3) / this._p1) * p : r + ((p - r) * (p = (p - this._p3) / this._p1) * p * p * p);
			}
			return this._calcEnd ? 1 : r;
		};
		SlowMo.ease = new SlowMo(0.7, 0.7);

		p.config = SlowMo.config = function(linearRatio, power, yoyoMode) {
			return new SlowMo(linearRatio, power, yoyoMode);
		};


		//SteppedEase
		SteppedEase = _class("easing.SteppedEase", function(steps) {
				steps = steps || 1;
				this._p1 = 1 / steps;
				this._p2 = steps + 1;
			}, true);
		p = SteppedEase.prototype = new Ease();
		p.constructor = SteppedEase;
		p.getRatio = function(p) {
			if (p < 0) {
				p = 0;
			} else if (p >= 1) {
				p = 0.999999999;
			}
			return ((this._p2 * p) >> 0) * this._p1;
		};
		p.config = SteppedEase.config = function(steps) {
			return new SteppedEase(steps);
		};


		//RoughEase
		RoughEase = _class("easing.RoughEase", function(vars) {
			vars = vars || {};
			var taper = vars.taper || "none",
				a = [],
				cnt = 0,
				points = (vars.points || 20) | 0,
				i = points,
				randomize = (vars.randomize !== false),
				clamp = (vars.clamp === true),
				template = (vars.template instanceof Ease) ? vars.template : null,
				strength = (typeof(vars.strength) === "number") ? vars.strength * 0.4 : 0.4,
				x, y, bump, invX, obj, pnt;
			while (--i > -1) {
				x = randomize ? Math.random() : (1 / points) * i;
				y = template ? template.getRatio(x) : x;
				if (taper === "none") {
					bump = strength;
				} else if (taper === "out") {
					invX = 1 - x;
					bump = invX * invX * strength;
				} else if (taper === "in") {
					bump = x * x * strength;
				} else if (x < 0.5) {  //"both" (start)
					invX = x * 2;
					bump = invX * invX * 0.5 * strength;
				} else {				//"both" (end)
					invX = (1 - x) * 2;
					bump = invX * invX * 0.5 * strength;
				}
				if (randomize) {
					y += (Math.random() * bump) - (bump * 0.5);
				} else if (i % 2) {
					y += bump * 0.5;
				} else {
					y -= bump * 0.5;
				}
				if (clamp) {
					if (y > 1) {
						y = 1;
					} else if (y < 0) {
						y = 0;
					}
				}
				a[cnt++] = {x:x, y:y};
			}
			a.sort(function(a, b) {
				return a.x - b.x;
			});

			pnt = new EasePoint(1, 1, null);
			i = points;
			while (--i > -1) {
				obj = a[i];
				pnt = new EasePoint(obj.x, obj.y, pnt);
			}

			this._prev = new EasePoint(0, 0, (pnt.t !== 0) ? pnt : pnt.next);
		}, true);
		p = RoughEase.prototype = new Ease();
		p.constructor = RoughEase;
		p.getRatio = function(p) {
			var pnt = this._prev;
			if (p > pnt.t) {
				while (pnt.next && p >= pnt.t) {
					pnt = pnt.next;
				}
				pnt = pnt.prev;
			} else {
				while (pnt.prev && p <= pnt.t) {
					pnt = pnt.prev;
				}
			}
			this._prev = pnt;
			return (pnt.v + ((p - pnt.t) / pnt.gap) * pnt.c);
		};
		p.config = function(vars) {
			return new RoughEase(vars);
		};
		RoughEase.ease = new RoughEase();


		//Bounce
		_wrap("Bounce",
			_create("BounceOut", function(p) {
				if (p < 1 / 2.75) {
					return 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					return 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
				} else if (p < 2.5 / 2.75) {
					return 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
				}
				return 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
			}),
			_create("BounceIn", function(p) {
				if ((p = 1 - p) < 1 / 2.75) {
					return 1 - (7.5625 * p * p);
				} else if (p < 2 / 2.75) {
					return 1 - (7.5625 * (p -= 1.5 / 2.75) * p + 0.75);
				} else if (p < 2.5 / 2.75) {
					return 1 - (7.5625 * (p -= 2.25 / 2.75) * p + 0.9375);
				}
				return 1 - (7.5625 * (p -= 2.625 / 2.75) * p + 0.984375);
			}),
			_create("BounceInOut", function(p) {
				var invert = (p < 0.5);
				if (invert) {
					p = 1 - (p * 2);
				} else {
					p = (p * 2) - 1;
				}
				if (p < 1 / 2.75) {
					p = 7.5625 * p * p;
				} else if (p < 2 / 2.75) {
					p = 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
				} else if (p < 2.5 / 2.75) {
					p = 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
				} else {
					p = 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
				}
				return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5;
			})
		);


		//CIRC
		_wrap("Circ",
			_create("CircOut", function(p) {
				return Math.sqrt(1 - (p = p - 1) * p);
			}),
			_create("CircIn", function(p) {
				return -(Math.sqrt(1 - (p * p)) - 1);
			}),
			_create("CircInOut", function(p) {
				return ((p*=2) < 1) ? -0.5 * (Math.sqrt(1 - p * p) - 1) : 0.5 * (Math.sqrt(1 - (p -= 2) * p) + 1);
			})
		);


		//Elastic
		_createElastic = function(n, f, def) {
			var C = _class("easing." + n, function(amplitude, period) {
					this._p1 = (amplitude >= 1) ? amplitude : 1; //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
					this._p2 = (period || def) / (amplitude < 1 ? amplitude : 1);
					this._p3 = this._p2 / _2PI * (Math.asin(1 / this._p1) || 0);
					this._p2 = _2PI / this._p2; //precalculate to optimize
				}, true),
				p = C.prototype = new Ease();
			p.constructor = C;
			p.getRatio = f;
			p.config = function(amplitude, period) {
				return new C(amplitude, period);
			};
			return C;
		};
		_wrap("Elastic",
			_createElastic("ElasticOut", function(p) {
				return this._p1 * Math.pow(2, -10 * p) * Math.sin( (p - this._p3) * this._p2 ) + 1;
			}, 0.3),
			_createElastic("ElasticIn", function(p) {
				return -(this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * this._p2 ));
			}, 0.3),
			_createElastic("ElasticInOut", function(p) {
				return ((p *= 2) < 1) ? -0.5 * (this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 *(p -= 1)) * Math.sin( (p - this._p3) * this._p2 ) * 0.5 + 1;
			}, 0.45)
		);


		//Expo
		_wrap("Expo",
			_create("ExpoOut", function(p) {
				return 1 - Math.pow(2, -10 * p);
			}),
			_create("ExpoIn", function(p) {
				return Math.pow(2, 10 * (p - 1)) - 0.001;
			}),
			_create("ExpoInOut", function(p) {
				return ((p *= 2) < 1) ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
			})
		);


		//Sine
		_wrap("Sine",
			_create("SineOut", function(p) {
				return Math.sin(p * _HALF_PI);
			}),
			_create("SineIn", function(p) {
				return -Math.cos(p * _HALF_PI) + 1;
			}),
			_create("SineInOut", function(p) {
				return -0.5 * (Math.cos(Math.PI * p) - 1);
			})
		);

		_class("easing.EaseLookup", {
				find:function(s) {
					return Ease.map[s];
				}
			}, true);

		//register the non-standard eases
		_easeReg(w.SlowMo, "SlowMo", "ease,");
		_easeReg(RoughEase, "RoughEase", "ease,");
		_easeReg(SteppedEase, "SteppedEase", "ease,");

		return Back;
		
	}, true);


});

if (_fwd_gsScope._gsDefine) { _fwd_gsScope._fwd_gsQueue.pop()(); } //necessary in case FWDTweenLite was already loaded separately.











/*
 * ----------------------------------------------------------------
 * Base classes like FWDTweenLite, SimpleTimeline, Ease, Ticker, etc.
 * ----------------------------------------------------------------
 */
(function(window, moduleName) {

		"use strict";
		var _exports = {},
			_globals = window.GreenSockGlobals = window.GreenSockGlobals || window;
		if (_globals.FWDTweenLite) {
			return; //in case the core set of classes is already loaded, don't instantiate twice.
		}
		var _namespace = function(ns) {
				var a = ns.split("."),
					p = _globals, i;
				for (i = 0; i < a.length; i++) {
					p[a[i]] = p = p[a[i]] || {};
				}
				return p;
			},
			gs = _namespace("com.greensock"),
			_tinyNum = 0.0000000001,
			_slice = function(a) { //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++])) {}
				return b;
			},
			_emptyFunc = function() {},
			_isArray = (function() { //works around issues in iframe environments where the Array fwd_global isn't shared, thus if the object originates in a different window/iframe, "(obj instanceof Array)" will evaluate false. We added some speed optimizations to avoid Object.prototype.toString.call() unless it's absolutely necessary because it's VERY slow (like 20x slower)
				var toString = Object.prototype.toString,
					array = toString.call([]);
				return function(obj) {
					return obj != null && (obj instanceof Array || (typeof(obj) === "object" && !!obj.push && toString.call(obj) === array));
				};
			}()),
			a, i, p, _ticker, _tickerActive,
			_defLookup = {},

			/**
			 * @constructor
			 * Defines a GreenSock class, optionally with an array of dependencies that must be instantiated first and passed into the definition.
			 * This allows users to load GreenSock JS files in any order even if they have interdependencies (like CSSPlugin extends TweenPlugin which is
			 * inside FWDTweenLite.js, but if CSSPlugin is loaded first, it should wait to run its code until FWDTweenLite.js loads and instantiates TweenPlugin
			 * and then pass TweenPlugin to CSSPlugin's definition). This is all done automatically and internally.
			 *
			 * Every definition will be added to a "com.greensock" fwd_global object (typically window, but if a window.GreenSockGlobals object is found,
			 * it will go there as of v1.7). For example, FWDTweenLite will be found at window.com.greensock.FWDTweenLite and since it's a fwd_global class that should be available anywhere,
			 * it is ALSO referenced at window.FWDTweenLite. However some classes aren't considered fwd_global, like the base com.greensock.core.Animation class, so
			 * those will only be at the package like window.com.greensock.core.Animation. Again, if you define a GreenSockGlobals object on the window, everything
			 * gets tucked neatly inside there instead of on the window directly. This allows you to do advanced things like load multiple versions of GreenSock
			 * files and put them into distinct objects (imagine a banner ad uses a newer version but the main site uses an older one). In that case, you could
			 * sandbox the banner one like:
			 *
			 * <script>
			 *     var gs = window.GreenSockGlobals = {}; //the newer version we're about to load could now be referenced in a "gs" object, like gs.FWDTweenLite.to(...). Use whatever alias you want as long as it's unique, "gs" or "banner" or whatever.
			 * </script>
			 * <script src="js/greensock/v1.7/FWDAnimation.js"></script>
			 * <script>
			 *     window.GreenSockGlobals = window._fwd_gsQueue = window._gsDefine = null; //reset it back to null (along with the special _fwd_gsQueue variable) so that the next load of FWDAnimation affects the window and we can reference things directly like FWDTweenLite.to(...)
			 * </script>
			 * <script src="js/greensock/v1.6/FWDAnimation.js"></script>
			 * <script>
			 *     gs.FWDTweenLite.to(...); //would use v1.7
			 *     FWDTweenLite.to(...); //would use v1.6
			 * </script>
			 *
			 * @param {!string} ns The namespace of the class definition, leaving off "com.greensock." as that's assumed. For example, "FWDTweenLite" or "plugins.CSSPlugin" or "easing.Back".
			 * @param {!Array.<string>} dependencies An array of dependencies (described as their namespaces minus "com.greensock." prefix). For example ["FWDTweenLite","plugins.TweenPlugin","core.Animation"]
			 * @param {!function():Object} func The function that should be called and passed the resolved dependencies which will return the actual class for this definition.
			 * @param {boolean=} fwd_global If true, the class will be added to the fwd_global scope (typically window unless you define a window.GreenSockGlobals object)
			 */
			Definition = function(ns, dependencies, func, fwd_global) {
				this.sc = (_defLookup[ns]) ? _defLookup[ns].sc : []; //subclasses
				_defLookup[ns] = this;
				this.gsClass = null;
				this.func = func;
				var _classes = [];
				this.check = function(init) {
					var i = dependencies.length,
						missing = i,
						cur, a, n, cl, hasModule;
					while (--i > -1) {
						if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
							_classes[i] = cur.gsClass;
							missing--;
						} else if (init) {
							cur.sc.push(this);
						}
					}
					if (missing === 0 && func) {
						a = ("com.greensock." + ns).split(".");
						n = a.pop();
						cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes);

						//exports to multiple environments
						if (fwd_global) {
							_globals[n] = _exports[n] = cl; //provides a way to avoid fwd_global namespace pollution. By default, the main classes like FWDTweenLite, Power1, Strong, etc. are added to window unless a GreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.GreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.GreenSockGlobals = windows.gs = {} so that you can access everything like gs.FWDTweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.FWDTweenLite, etc.)
							hasModule = (typeof(fwd_module) !== "undefined" && fwd_module.exports);
							if (!hasModule && typeof(define) === "function" && define.amd){ //AMD
								define((window.GreenSockAMDPath ? window.GreenSockAMDPath + "/" : "") + ns.split(".").pop(), [], function() { return cl; });
							} else if (hasModule){ //node
								if (ns === moduleName) {
									fwd_module.exports = _exports[moduleName] = cl;
									for (i in _exports) {
										cl[i] = _exports[i];
									}
								} else if (_exports[moduleName]) {
									_exports[moduleName][n] = cl;
								}
							}
						}
						for (i = 0; i < this.sc.length; i++) {
							this.sc[i].check();
						}
					}
				};
				this.check(true);
			},

			//used to create Definition instances (which basically registers a class that has dependencies).
			_gsDefine = window._gsDefine = function(ns, dependencies, func, fwd_global) {
				return new Definition(ns, dependencies, func, fwd_global);
			},

			//a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
			_class = gs._class = function(ns, func, fwd_global) {
				func = func || function() {};
				_gsDefine(ns, [], function(){ return func; }, fwd_global);
				return func;
			};

		_gsDefine.globals = _globals;



/*
 * ----------------------------------------------------------------
 * Ease
 * ----------------------------------------------------------------
 */
		var _baseParams = [0, 0, 1, 1],
			_blankArray = [],
			Ease = _class("easing.Ease", function(func, extraParams, type, power) {
				this._func = func;
				this._type = type || 0;
				this._power = power || 0;
				this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
			}, true),
			_easeMap = Ease.map = {},
			_easeReg = Ease.register = function(ease, names, types, create) {
				var na = names.split(","),
					i = na.length,
					ta = (types || "easeIn,easeOut,easeInOut").split(","),
					e, name, j, type;
				while (--i > -1) {
					name = na[i];
					e = create ? _class("easing."+name, null, true) : gs.easing[name] || {};
					j = ta.length;
					while (--j > -1) {
						type = ta[j];
						_easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease();
					}
				}
			};

		p = Ease.prototype;
		p._calcEnd = false;
		p.getRatio = function(p) {
			if (this._func) {
				this._params[0] = p;
				return this._func.apply(null, this._params);
			}
			var t = this._type,
				pw = this._power,
				r = (t === 1) ? 1 - p : (t === 2) ? p : (p < 0.5) ? p * 2 : (1 - p) * 2;
			if (pw === 1) {
				r *= r;
			} else if (pw === 2) {
				r *= r * r;
			} else if (pw === 3) {
				r *= r * r * r;
			} else if (pw === 4) {
				r *= r * r * r * r;
			}
			return (t === 1) ? 1 - r : (t === 2) ? r : (p < 0.5) ? r / 2 : 1 - (r / 2);
		};

		//create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)
		a = ["Linear","Quad","Cubic","Quart","Quint,Strong"];
		i = a.length;
		while (--i > -1) {
			p = a[i]+",Power"+i;
			_easeReg(new Ease(null,null,1,i), p, "easeOut", true);
			_easeReg(new Ease(null,null,2,i), p, "easeIn" + ((i === 0) ? ",easeNone" : ""));
			_easeReg(new Ease(null,null,3,i), p, "easeInOut");
		}
		_easeMap.linear = gs.easing.Linear.easeIn;
		_easeMap.swing = gs.easing.Quad.easeInOut; //for jQuery folks


/*
 * ----------------------------------------------------------------
 * EventDispatcher
 * ----------------------------------------------------------------
 */
		var EventDispatcher = _class("events.EventDispatcher", function(target) {
			this._listeners = {};
			this._eventTarget = target || this;
		});
		p = EventDispatcher.prototype;

		p.addEventListener = function(type, callback, scope, useParam, priority) {
			priority = priority || 0;
			var list = this._listeners[type],
				index = 0,
				listener, i;
			if (this === _ticker && !_tickerActive) {
				_ticker.wake();
			}
			if (list == null) {
				this._listeners[type] = list = [];
			}
			i = list.length;
			while (--i > -1) {
				listener = list[i];
				if (listener.c === callback && listener.s === scope) {
					list.splice(i, 1);
				} else if (index === 0 && listener.pr < priority) {
					index = i + 1;
				}
			}
			list.splice(index, 0, {c:callback, s:scope, up:useParam, pr:priority});
		};

		p.removeEventListener = function(type, callback) {
			var list = this._listeners[type], i;
			if (list) {
				i = list.length;
				while (--i > -1) {
					if (list[i].c === callback) {
						list.splice(i, 1);
						return;
					}
				}
			}
		};

		p.dispatchEvent = function(type) {
			var list = this._listeners[type],
				i, t, listener;
			if (list) {
				i = list.length;
				if (i > 1) {
					list = list.slice(0); //in case addEventListener() is called from within a listener/callback (otherwise the index could change, resulting in a skip)
				}
				t = this._eventTarget;
				while (--i > -1) {
					listener = list[i];
					if (listener) {
						if (listener.up) {
							listener.c.call(listener.s || t, {type:type, target:t});
						} else {
							listener.c.call(listener.s || t);
						}
					}
				}
			}
		};


/*
 * ----------------------------------------------------------------
 * Ticker
 * ----------------------------------------------------------------
 */
 		var _reqAnimFrame = window.requestAnimationFrame,
			_cancelAnimFrame = window.cancelAnimationFrame,
			_getTime = Date.now || function() {return new Date().getTime();},
			_lastUpdate = _getTime();

		//now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.
		a = ["ms","moz","webkit","o"];
		i = a.length;
		while (--i > -1 && !_reqAnimFrame) {
			_reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
			_cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
		}

		_class("Ticker", function(fps, useRAF) {
			var _self = this,
				_startTime = _getTime(),
				_useRAF = (useRAF !== false && _reqAnimFrame) ? "auto" : false,
				_lagThreshold = 500,
				_adjustedLag = 33,
				_tickWord = "tick", //helps reduce gc burden
				_fps, _req, _id, _gap, _nextTime,
				_tick = function(manual) {
					var elapsed = _getTime() - _lastUpdate,
						overlap, dispatch;
					if (elapsed > _lagThreshold) {
						_startTime += elapsed - _adjustedLag;
					}
					_lastUpdate += elapsed;
					_self.time = (_lastUpdate - _startTime) / 1000;
					overlap = _self.time - _nextTime;
					if (!_fps || overlap > 0 || manual === true) {
						_self.frame++;
						_nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
						dispatch = true;
					}
					if (manual !== true) { //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
						_id = _req(_tick);
					}
					if (dispatch) {
						_self.dispatchEvent(_tickWord);
					}
				};

			EventDispatcher.call(_self);
			_self.time = _self.frame = 0;
			_self.tick = function() {
				_tick(true);
			};

			_self.lagSmoothing = function(threshold, adjustedLag) {
				_lagThreshold = threshold || (1 / _tinyNum); //zero should be interpreted as basically unlimited
				_adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
			};

			_self.sleep = function() {
				if (_id == null) {
					return;
				}
				if (!_useRAF || !_cancelAnimFrame) {
					clearTimeout(_id);
				} else {
					_cancelAnimFrame(_id);
				}
				_req = _emptyFunc;
				_id = null;
				if (_self === _ticker) {
					_tickerActive = false;
				}
			};

			_self.wake = function(seamless) {
				if (_id !== null) {
					_self.sleep();
				} else if (seamless) {
					_startTime += -_lastUpdate + (_lastUpdate = _getTime());
				} else if (_self.frame > 10) { //don't trigger lagSmoothing if we're just waking up, and make sure that at least 10 frames have elapsed because of the iOS bug that we work around below with the 1.5-second setTimout().
					_lastUpdate = _getTime() - _lagThreshold + 5;
				}
				_req = (_fps === 0) ? _emptyFunc : (!_useRAF || !_reqAnimFrame) ? function(f) { return setTimeout(f, ((_nextTime - _self.time) * 1000 + 1) | 0); } : _reqAnimFrame;
				if (_self === _ticker) {
					_tickerActive = true;
				}
				_tick(2);
			};

			_self.fps = function(value) {
				if (!arguments.length) {
					return _fps;
				}
				_fps = value;
				_gap = 1 / (_fps || 60);
				_nextTime = this.time + _gap;
				_self.wake();
			};

			_self.useRAF = function(value) {
				if (!arguments.length) {
					return _useRAF;
				}
				_self.sleep();
				_useRAF = value;
				_self.fps(_fps);
			};
			_self.fps(fps);

			//a bug in iOS 6 Safari occasionally prevents the requestAnimationFrame from working initially, so we use a 1.5-second timeout that automatically falls back to setTimeout() if it senses this condition.
			setTimeout(function() {
				if (_useRAF === "auto" && _self.frame < 5 && document.visibilityState !== "hidden") {
					_self.useRAF(false);
				}
			}, 1500);
		});

		p = gs.Ticker.prototype = new gs.events.EventDispatcher();
		p.constructor = gs.Ticker;


/*
 * ----------------------------------------------------------------
 * Animation
 * ----------------------------------------------------------------
 */
		var Animation = _class("core.Animation", function(duration, vars) {
				this.vars = vars = vars || {};
				this._duration = this._totalDuration = duration || 0;
				this._delay = Number(vars.delay) || 0;
				this._timeScale = 1;
				this._active = (vars.immediateRender === true);
				this.data = vars.data;
				this._reversed = (vars.reversed === true);

				if (!_rootTimeline) {
					return;
				}
				if (!_tickerActive) { //some browsers (like iOS 6 Safari) shut down JavaScript execution when the tab is disabled and they [occasionally] neglect to start up requestAnimationFrame again when returning - this code ensures that the engine starts up again properly.
					_ticker.wake();
				}

				var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
				tl.add(this, tl._time);

				if (this.vars.paused) {
					this.paused(true);
				}
			});

		_ticker = Animation.ticker = new gs.Ticker();
		p = Animation.prototype;
		p._dirty = p._gc = p._initted = p._paused = false;
		p._totalTime = p._time = 0;
		p._rawPrevTime = -1;
		p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
		p._paused = false;


		//some browsers (like iOS) occasionally drop the requestAnimationFrame event when the user switches to a different tab and then comes back again, so we use a 2-second setTimeout() to sense if/when that condition occurs and then wake() the ticker.
		var _checkTimeout = function() {
				if (_tickerActive && _getTime() - _lastUpdate > 2000) {
					_ticker.wake();
				}
				setTimeout(_checkTimeout, 2000);
			};
		_checkTimeout();


		p.play = function(from, suppressEvents) {
			if (from != null) {
				this.seek(from, suppressEvents);
			}
			return this.reversed(false).paused(false);
		};

		p.pause = function(atTime, suppressEvents) {
			if (atTime != null) {
				this.seek(atTime, suppressEvents);
			}
			return this.paused(true);
		};

		p.resume = function(from, suppressEvents) {
			if (from != null) {
				this.seek(from, suppressEvents);
			}
			return this.paused(false);
		};

		p.seek = function(time, suppressEvents) {
			return this.totalTime(Number(time), suppressEvents !== false);
		};

		p.restart = function(includeDelay, suppressEvents) {
			return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, (suppressEvents !== false), true);
		};

		p.reverse = function(from, suppressEvents) {
			if (from != null) {
				this.seek((from || this.totalDuration()), suppressEvents);
			}
			return this.reversed(true).paused(false);
		};

		p.render = function(time, suppressEvents, force) {
			//stub - we override this method in subclasses.
		};

		p.invalidate = function() {
			this._time = this._totalTime = 0;
			this._initted = this._gc = false;
			this._rawPrevTime = -1;
			if (this._gc || !this.timeline) {
				this._enabled(true);
			}
			return this;
		};

		p.isActive = function() {
			var tl = this._timeline, //the 2 root timelines won't have a _timeline; they're always active.
				startTime = this._startTime,
				rawTime;
			return (!tl || (!this._gc && !this._paused && tl.isActive() && (rawTime = tl.rawTime()) >= startTime && rawTime < startTime + this.totalDuration() / this._timeScale));
		};

		p._enabled = function (enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			this._gc = !enabled;
			this._active = this.isActive();
			if (ignoreTimeline !== true) {
				if (enabled && !this.timeline) {
					this._timeline.add(this, this._startTime - this._delay);
				} else if (!enabled && this.timeline) {
					this._timeline._remove(this, true);
				}
			}
			return false;
		};


		p._kill = function(vars, target) {
			return this._enabled(false, false);
		};

		p.kill = function(vars, target) {
			this._kill(vars, target);
			return this;
		};

		p._uncache = function(includeSelf) {
			var tween = includeSelf ? this : this.timeline;
			while (tween) {
				tween._dirty = true;
				tween = tween.timeline;
			}
			return this;
		};

		p._swapSelfInParams = function(params) {
			var i = params.length,
				copy = params.concat();
			while (--i > -1) {
				if (params[i] === "{self}") {
					copy[i] = this;
				}
			}
			return copy;
		};

		p._callback = function(type) {
			var v = this.vars,
				callback = v[type],
				params = v[type + "Params"],
				scope = v[type + "Scope"] || v.callbackScope || this,
				l = params ? params.length : 0;
			switch (l) { //speed optimization; call() is faster than apply() so use it when there are only a few parameters (which is by far most common). Previously we simply did var v = this.vars; v[type].apply(v[type + "Scope"] || v.callbackScope || this, v[type + "Params"] || _blankArray);
				case 0: callback.call(scope); break;
				case 1: callback.call(scope, params[0]); break;
				case 2: callback.call(scope, params[0], params[1]); break;
				default: callback.apply(scope, params);
			}
		};

//----Animation getters/setters --------------------------------------------------------

		p.eventCallback = function(type, callback, params, scope) {
			if ((type || "").substr(0,2) === "on") {
				var v = this.vars;
				if (arguments.length === 1) {
					return v[type];
				}
				if (callback == null) {
					delete v[type];
				} else {
					v[type] = callback;
					v[type + "Params"] = (_isArray(params) && params.join("").indexOf("{self}") !== -1) ? this._swapSelfInParams(params) : params;
					v[type + "Scope"] = scope;
				}
				if (type === "onUpdate") {
					this._onUpdate = callback;
				}
			}
			return this;
		};

		p.delay = function(value) {
			if (!arguments.length) {
				return this._delay;
			}
			if (this._timeline.smoothChildTiming) {
				this.startTime( this._startTime + value - this._delay );
			}
			this._delay = value;
			return this;
		};

		p.duration = function(value) {
			if (!arguments.length) {
				this._dirty = false;
				return this._duration;
			}
			this._duration = this._totalDuration = value;
			this._uncache(true); //true in case it's a FWDAnimation or TimelineMax that has a repeat - we'll need to refresh the totalDuration.
			if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (value !== 0) {
				this.totalTime(this._totalTime * (value / this._duration), true);
			}
			return this;
		};

		p.totalDuration = function(value) {
			this._dirty = false;
			return (!arguments.length) ? this._totalDuration : this.duration(value);
		};

		p.time = function(value, suppressEvents) {
			if (!arguments.length) {
				return this._time;
			}
			if (this._dirty) {
				this.totalDuration();
			}
			return this.totalTime((value > this._duration) ? this._duration : value, suppressEvents);
		};

		p.totalTime = function(time, suppressEvents, uncapped) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (!arguments.length) {
				return this._totalTime;
			}
			if (this._timeline) {
				if (time < 0 && !uncapped) {
					time += this.totalDuration();
				}
				if (this._timeline.smoothChildTiming) {
					if (this._dirty) {
						this.totalDuration();
					}
					var totalDuration = this._totalDuration,
						tl = this._timeline;
					if (time > totalDuration && !uncapped) {
						time = totalDuration;
					}
					this._startTime = (this._paused ? this._pauseTime : tl._time) - ((!this._reversed ? time : totalDuration - time) / this._timeScale);
					if (!tl._dirty) { //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
						this._uncache(false);
					}
					//in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The startTime of that child would get pushed out, but one of the ancestors may have completed.
					if (tl._timeline) {
						while (tl._timeline) {
							if (tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale) {
								tl.totalTime(tl._totalTime, true);
							}
							tl = tl._timeline;
						}
					}
				}
				if (this._gc) {
					this._enabled(true, false);
				}
				if (this._totalTime !== time || this._duration === 0) {
					if (_lazyTweens.length) {
						_lazyRender();
					}
					this.render(time, suppressEvents, false);
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
						_lazyRender();
					}
				}
			}
			return this;
		};

		p.progress = p.totalProgress = function(value, suppressEvents) {
			var duration = this.duration();
			return (!arguments.length) ? (duration ? this._time / duration : this.ratio) : this.totalTime(duration * value, suppressEvents);
		};

		p.startTime = function(value) {
			if (!arguments.length) {
				return this._startTime;
			}
			if (value !== this._startTime) {
				this._startTime = value;
				if (this.timeline) if (this.timeline._sortChildren) {
					this.timeline.add(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}
			}
			return this;
		};

		p.endTime = function(includeRepeats) {
			return this._startTime + ((includeRepeats != false) ? this.totalDuration() : this.duration()) / this._timeScale;
		};

		p.timeScale = function(value) {
			if (!arguments.length) {
				return this._timeScale;
			}
			value = value || _tinyNum; //can't allow zero because it'll throw the math off
			if (this._timeline && this._timeline.smoothChildTiming) {
				var pauseTime = this._pauseTime,
					t = (pauseTime || pauseTime === 0) ? pauseTime : this._timeline.totalTime();
				this._startTime = t - ((t - this._startTime) * this._timeScale / value);
			}
			this._timeScale = value;
			return this._uncache(false);
		};

		p.reversed = function(value) {
			if (!arguments.length) {
				return this._reversed;
			}
			if (value != this._reversed) {
				this._reversed = value;
				this.totalTime(((this._timeline && !this._timeline.smoothChildTiming) ? this.totalDuration() - this._totalTime : this._totalTime), true);
			}
			return this;
		};

		p.paused = function(value) {
			if (!arguments.length) {
				return this._paused;
			}
			var tl = this._timeline,
				raw, elapsed;
			if (value != this._paused) if (tl) {
				if (!_tickerActive && !value) {
					_ticker.wake();
				}
				raw = tl.rawTime();
				elapsed = raw - this._pauseTime;
				if (!value && tl.smoothChildTiming) {
					this._startTime += elapsed;
					this._uncache(false);
				}
				this._pauseTime = value ? raw : null;
				this._paused = value;
				this._active = this.isActive();
				if (!value && elapsed !== 0 && this._initted && this.duration()) {
					raw = tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale;
					this.render(raw, (raw === this._totalTime), true); //in case the target's properties changed via some other tween or manual update by the user, we should force a render.
				}
			}
			if (this._gc && !value) {
				this._enabled(true, false);
			}
			return this;
		};


/*
 * ----------------------------------------------------------------
 * SimpleTimeline
 * ----------------------------------------------------------------
 */
		var SimpleTimeline = _class("core.SimpleTimeline", function(vars) {
			Animation.call(this, 0, vars);
			this.autoRemoveChildren = this.smoothChildTiming = true;
		});

		p = SimpleTimeline.prototype = new Animation();
		p.constructor = SimpleTimeline;
		p.kill()._gc = false;
		p._first = p._last = p._recent = null;
		p._sortChildren = false;

		p.add = p.insert = function(child, position, align, stagger) {
			var prevTween, st;
			child._startTime = Number(position || 0) + child._delay;
			if (child._paused) if (this !== child._timeline) { //we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order).
				child._pauseTime = child._startTime + ((this.rawTime() - child._startTime) / child._timeScale);
			}
			if (child.timeline) {
				child.timeline._remove(child, true); //removes from existing timeline so that it can be properly added to this one.
			}
			child.timeline = child._timeline = this;
			if (child._gc) {
				child._enabled(true, true);
			}
			prevTween = this._last;
			if (this._sortChildren) {
				st = child._startTime;
				while (prevTween && prevTween._startTime > st) {
					prevTween = prevTween._prev;
				}
			}
			if (prevTween) {
				child._next = prevTween._next;
				prevTween._next = child;
			} else {
				child._next = this._first;
				this._first = child;
			}
			if (child._next) {
				child._next._prev = child;
			} else {
				this._last = child;
			}
			child._prev = prevTween;
			this._recent = child;
			if (this._timeline) {
				this._uncache(true);
			}
			return this;
		};

		p._remove = function(tween, skipDisable) {
			if (tween.timeline === this) {
				if (!skipDisable) {
					tween._enabled(false, true);
				}

				if (tween._prev) {
					tween._prev._next = tween._next;
				} else if (this._first === tween) {
					this._first = tween._next;
				}
				if (tween._next) {
					tween._next._prev = tween._prev;
				} else if (this._last === tween) {
					this._last = tween._prev;
				}
				tween._next = tween._prev = tween.timeline = null;
				if (tween === this._recent) {
					this._recent = this._last;
				}

				if (this._timeline) {
					this._uncache(true);
				}
			}
			return this;
		};

		p.render = function(time, suppressEvents, force) {
			var tween = this._first,
				next;
			this._totalTime = this._time = this._rawPrevTime = time;
			while (tween) {
				next = tween._next; //record it here because the value could change after rendering...
				if (tween._active || (time >= tween._startTime && !tween._paused)) {
					if (!tween._reversed) {
						tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
					} else {
						tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
					}
				}
				tween = next;
			}
		};

		p.rawTime = function() {
			if (!_tickerActive) {
				_ticker.wake();
			}
			return this._totalTime;
		};

/*
 * ----------------------------------------------------------------
 * FWDTweenLite
 * ----------------------------------------------------------------
 */
		var FWDTweenLite = _class("FWDTweenLite", function(target, duration, vars) {
				Animation.call(this, duration, vars);
				this.render = FWDTweenLite.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)

				if (target == null) {
					throw "Cannot tween a null target.";
				}

				this.target = target = (typeof(target) !== "string") ? target : FWDTweenLite.selector(target) || target;

				var isSelector = (target.jquery || (target.length && target !== window && target[0] && (target[0] === window || (target[0].nodeType && target[0].style && !target.nodeType)))),
					overwrite = this.vars.overwrite,
					i, targ, targets;

				this._overwrite = overwrite = (overwrite == null) ? _overwriteLookup[FWDTweenLite.defaultOverwrite] : (typeof(overwrite) === "number") ? overwrite >> 0 : _overwriteLookup[overwrite];

				if ((isSelector || target instanceof Array || (target.push && _isArray(target))) && typeof(target[0]) !== "number") {
					this._targets = targets = _slice(target);  //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
					this._propLookup = [];
					this._siblings = [];
					for (i = 0; i < targets.length; i++) {
						targ = targets[i];
						if (!targ) {
							targets.splice(i--, 1);
							continue;
						} else if (typeof(targ) === "string") {
							targ = targets[i--] = FWDTweenLite.selector(targ); //in case it's an array of strings
							if (typeof(targ) === "string") {
								targets.splice(i+1, 1); //to avoid an endless loop (can't imagine why the selector would return a string, but just in case)
							}
							continue;
						} else if (targ.length && targ !== window && targ[0] && (targ[0] === window || (targ[0].nodeType && targ[0].style && !targ.nodeType))) { //in case the user is passing in an array of selector objects (like jQuery objects), we need to check one more level and pull things out if necessary. Also note that <select> elements pass all the criteria regarding length and the first child having style, so we must also check to ensure the target isn't an HTML node itself.
							targets.splice(i--, 1);
							this._targets = targets = targets.concat(_slice(targ));
							continue;
						}
						this._siblings[i] = _register(targ, this, false);
						if (overwrite === 1) if (this._siblings[i].length > 1) {
							_applyOverwrite(targ, this, null, 1, this._siblings[i]);
						}
					}

				} else {
					this._propLookup = {};
					this._siblings = _register(target, this, false);
					if (overwrite === 1) if (this._siblings.length > 1) {
						_applyOverwrite(target, this, null, 1, this._siblings);
					}
				}
				if (this.vars.immediateRender || (duration === 0 && this._delay === 0 && this.vars.immediateRender !== false)) {
					this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
					this.render(Math.min(0, -this._delay)); //in case delay is negative
				}
			}, true),
			_isSelector = function(v) {
				return (v && v.length && v !== window && v[0] && (v[0] === window || (v[0].nodeType && v[0].style && !v.nodeType))); //we cannot check "nodeType" if the target is window from within an iframe, otherwise it will trigger a security error in some browsers like Firefox.
			},
			_autoCSS = function(vars, target) {
				var css = {},
					p;
				for (p in vars) {
					if (!_reservedProps[p] && (!(p in target) || p === "transform" || p === "x" || p === "y" || p === "width" || p === "height" || p === "className" || p === "border") && (!_plugins[p] || (_plugins[p] && _plugins[p]._autoCSS))) { //note: <img> elements contain read-only "x" and "y" properties. We should also prioritize editing css width/height rather than the element's properties.
						css[p] = vars[p];
						delete vars[p];
					}
				}
				vars.css = css;
			};

		p = FWDTweenLite.prototype = new Animation();
		p.constructor = FWDTweenLite;
		p.kill()._gc = false;

//----FWDTweenLite defaults, overwrite management, and root updates ----------------------------------------------------

		p.ratio = 0;
		p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
		p._notifyPluginsOfEnabled = p._lazy = false;

		FWDTweenLite.version = "1.19.0";
		FWDTweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
		FWDTweenLite.defaultOverwrite = "auto";
		FWDTweenLite.ticker = _ticker;
		FWDTweenLite.autoSleep = 120;
		FWDTweenLite.lagSmoothing = function(threshold, adjustedLag) {
			_ticker.lagSmoothing(threshold, adjustedLag);
		};

		FWDTweenLite.selector = window.$ || window.jQuery || function(e) {
			var selector = window.$ || window.jQuery;
			if (selector) {
				FWDTweenLite.selector = selector;
				return selector(e);
			}
			return (typeof(document) === "undefined") ? e : (document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById((e.charAt(0) === "#") ? e.substr(1) : e));
		};

		var _lazyTweens = [],
			_lazyLookup = {},
			_numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
			//_nonNumbersExp = /(?:([\-+](?!(\d|=)))|[^\d\-+=e]|(e(?![\-+][\d])))+/ig,
			_setRatio = function(v) {
				var pt = this._firstPT,
					min = 0.000001,
					val;
				while (pt) {
					val = !pt.blob ? pt.c * v + pt.s : v ? this.join("") : this.start;
					if (pt.m) {
						val = pt.m(val, this._target || pt.t);
					} else if (val < min) if (val > -min) { //prevents issues with converting very small numbers to strings in the browser
						val = 0;
					}
					if (!pt.f) {
						pt.t[pt.p] = val;
					} else if (pt.fp) {
						pt.t[pt.p](pt.fp, val);
					} else {
						pt.t[pt.p](val);
					}
					pt = pt._next;
				}
			},
			//compares two strings (start/end), finds the numbers that are different and spits back an array representing the whole value but with the changing values isolated as elements. For example, "rgb(0,0,0)" and "rgb(100,50,0)" would become ["rgb(", 0, ",", 50, ",0)"]. Notice it merges the parts that are identical (performance optimization). The array also has a linked list of PropTweens attached starting with _firstPT that contain the tweening data (t, p, s, c, f, etc.). It also stores the starting value as a "start" property so that we can revert to it if/when necessary, like when a tween rewinds fully. If the quantity of numbers differs between the start and end, it will always prioritize the end value(s). The pt parameter is optional - it's for a PropTween that will be appended to the end of the linked list and is typically for actually setting the value after all of the elements have been updated (with array.join("")).
			_blobDif = function(start, end, filter, pt) {
				var a = [start, end],
					charIndex = 0,
					s = "",
					color = 0,
					startNums, endNums, num, i, l, nonNumbers, currentNum;
				a.start = start;
				if (filter) {
					filter(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.
					start = a[0];
					end = a[1];
				}
				a.length = 0;
				startNums = start.match(_numbersExp) || [];
				endNums = end.match(_numbersExp) || [];
				if (pt) {
					pt._next = null;
					pt.blob = 1;
					a._firstPT = a._applyPT = pt; //apply last in the linked list (which means inserting it first)
				}
				l = endNums.length;
				for (i = 0; i < l; i++) {
					currentNum = endNums[i];
					nonNumbers = end.substr(charIndex, end.indexOf(currentNum, charIndex)-charIndex);
					s += (nonNumbers || !i) ? nonNumbers : ","; //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
					charIndex += nonNumbers.length;
					if (color) { //sense rgba() values and round them.
						color = (color + 1) % 5;
					} else if (nonNumbers.substr(-5) === "rgba(") {
						color = 1;
					}
					if (currentNum === startNums[i] || startNums.length <= i) {
						s += currentNum;
					} else {
						if (s) {
							a.push(s);
							s = "";
						}
						num = parseFloat(startNums[i]);
						a.push(num);
						a._firstPT = {_next: a._firstPT, t:a, p: a.length-1, s:num, c:((currentNum.charAt(1) === "=") ? parseInt(currentNum.charAt(0) + "1", 10) * parseFloat(currentNum.substr(2)) : (parseFloat(currentNum) - num)) || 0, f:0, m:(color && color < 4) ? Math.round : 0};
						//note: we don't set _prev because we'll never need to remove individual PropTweens from this list.
					}
					charIndex += currentNum.length;
				}
				s += end.substr(charIndex);
				if (s) {
					a.push(s);
				}
				a.setRatio = _setRatio;
				return a;
			},
			//note: "funcParam" is only necessary for function-based getters/setters that require an extra parameter like getAttribute("width") and setAttribute("width", value). In this example, funcParam would be "width". Used by AttrPlugin for example.
			_addPropTween = function(target, prop, start, end, overwriteProp, mod, funcParam, stringFilter, index) {
				if (typeof(end) === "function") {
					end = end(index || 0, target);
				}
				var s = (start === "get") ? target[prop] : start,
					type = typeof(target[prop]),
					isRelative = (typeof(end) === "string" && end.charAt(1) === "="),
					pt = {t:target, p:prop, s:s, f:(type === "function"), pg:0, n:overwriteProp || prop, m:(!mod ? 0 : (typeof(mod) === "function") ? mod : Math.round), pr:0, c:isRelative ? parseInt(end.charAt(0) + "1", 10) * parseFloat(end.substr(2)) : (parseFloat(end) - s) || 0},
					blob, getterName;
				if (type !== "number") {
					if (type === "function" && start === "get") {
						getterName = ((prop.indexOf("set") || typeof(target["get" + prop.substr(3)]) !== "function") ? prop : "get" + prop.substr(3));
						pt.s = s = funcParam ? target[getterName](funcParam) : target[getterName]();
					}
					if (typeof(s) === "string" && (funcParam || isNaN(s))) {
						//a blob (string that has multiple numbers in it)
						pt.fp = funcParam;
						blob = _blobDif(s, end, stringFilter || FWDTweenLite.defaultStringFilter, pt);
						pt = {t:blob, p:"setRatio", s:0, c:1, f:2, pg:0, n:overwriteProp || prop, pr:0, m:0}; //"2" indicates it's a Blob property tween. Needed for RoundPropsPlugin for example.
					} else if (!isRelative) {
						pt.s = parseFloat(s);
						pt.c = (parseFloat(end) - pt.s) || 0;
					}
				}
				if (pt.c) { //only add it to the linked list if there's a change.
					if ((pt._next = this._firstPT)) {
						pt._next._prev = pt;
					}
					this._firstPT = pt;
					return pt;
				}
			},
			_internals = FWDTweenLite._internals = {isArray:_isArray, isSelector:_isSelector, lazyTweens:_lazyTweens, blobDif:_blobDif}, //gives us a way to expose certain private values to other GreenSock classes without contaminating tha main FWDTweenLite object.
			_plugins = FWDTweenLite._plugins = {},
			_tweenLookup = _internals.tweenLookup = {},
			_tweenLookupNum = 0,
			_reservedProps = _internals.reservedProps = {ease:1, delay:1, overwrite:1, onComplete:1, onCompleteParams:1, onCompleteScope:1, useFrames:1, runBackwards:1, startAt:1, onUpdate:1, onUpdateParams:1, onUpdateScope:1, onStart:1, onStartParams:1, onStartScope:1, onReverseComplete:1, onReverseCompleteParams:1, onReverseCompleteScope:1, onRepeat:1, onRepeatParams:1, onRepeatScope:1, easeParams:1, yoyo:1, immediateRender:1, repeat:1, repeatDelay:1, data:1, paused:1, reversed:1, autoCSS:1, lazy:1, onOverwrite:1, callbackScope:1, stringFilter:1, id:1},
			_overwriteLookup = {none:0, all:1, auto:2, concurrent:3, allOnStart:4, preexisting:5, "true":1, "false":0},
			_rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),
			_rootTimeline = Animation._rootTimeline = new SimpleTimeline(),
			_nextGCFrame = 30,
			_lazyRender = _internals.lazyRender = function() {
				var i = _lazyTweens.length,
					tween;
				_lazyLookup = {};
				while (--i > -1) {
					tween = _lazyTweens[i];
					if (tween && tween._lazy !== false) {
						tween.render(tween._lazy[0], tween._lazy[1], true);
						tween._lazy = false;
					}
				}
				_lazyTweens.length = 0;
			};

		_rootTimeline._startTime = _ticker.time;
		_rootFramesTimeline._startTime = _ticker.frame;
		_rootTimeline._active = _rootFramesTimeline._active = true;
		setTimeout(_lazyRender, 1); //on some mobile devices, there isn't a "tick" before code runs which means any lazy renders wouldn't run before the next official "tick".

		Animation._updateRoot = FWDTweenLite.render = function() {
				var i, a, p;
				if (_lazyTweens.length) { //if code is run outside of the requestAnimationFrame loop, there may be tweens queued AFTER the engine refreshed, so we need to ensure any pending renders occur before we refresh again.
					_lazyRender();
				}
				_rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
				_rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
				if (_lazyTweens.length) {
					_lazyRender();
				}
				if (_ticker.frame >= _nextGCFrame) { //dump garbage every 120 frames or whatever the user sets FWDTweenLite.autoSleep to
					_nextGCFrame = _ticker.frame + (parseInt(FWDTweenLite.autoSleep, 10) || 120);
					for (p in _tweenLookup) {
						a = _tweenLookup[p].tweens;
						i = a.length;
						while (--i > -1) {
							if (a[i]._gc) {
								a.splice(i, 1);
							}
						}
						if (a.length === 0) {
							delete _tweenLookup[p];
						}
					}
					//if there are no more tweens in the root timelines, or if they're all paused, make the _timer sleep to reduce load on the CPU slightly
					p = _rootTimeline._first;
					if (!p || p._paused) if (FWDTweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
						while (p && p._paused) {
							p = p._next;
						}
						if (!p) {
							_ticker.sleep();
						}
					}
				}
			};

		_ticker.addEventListener("tick", Animation._updateRoot);

		var _register = function(target, tween, scrub) {
				var id = target._gsTweenID, a, i;
				if (!_tweenLookup[id || (target._gsTweenID = id = "t" + (_tweenLookupNum++))]) {
					_tweenLookup[id] = {target:target, tweens:[]};
				}
				if (tween) {
					a = _tweenLookup[id].tweens;
					a[(i = a.length)] = tween;
					if (scrub) {
						while (--i > -1) {
							if (a[i] === tween) {
								a.splice(i, 1);
							}
						}
					}
				}
				return _tweenLookup[id].tweens;
			},
			_onOverwrite = function(overwrittenTween, overwritingTween, target, killedProps) {
				var func = overwrittenTween.vars.onOverwrite, r1, r2;
				if (func) {
					r1 = func(overwrittenTween, overwritingTween, target, killedProps);
				}
				func = FWDTweenLite.onOverwrite;
				if (func) {
					r2 = func(overwrittenTween, overwritingTween, target, killedProps);
				}
				return (r1 !== false && r2 !== false);
			},
			_applyOverwrite = function(target, tween, props, mode, siblings) {
				var i, changed, curTween, l;
				if (mode === 1 || mode >= 4) {
					l = siblings.length;
					for (i = 0; i < l; i++) {
						if ((curTween = siblings[i]) !== tween) {
							if (!curTween._gc) {
								if (curTween._kill(null, target, tween)) {
									changed = true;
								}
							}
						} else if (mode === 5) {
							break;
						}
					}
					return changed;
				}
				//NOTE: Add 0.0000000001 to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)
				var startTime = tween._startTime + _tinyNum,
					overlaps = [],
					oCount = 0,
					zeroDur = (tween._duration === 0),
					globalStart;
				i = siblings.length;
				while (--i > -1) {
					if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {
						//ignore
					} else if (curTween._timeline !== tween._timeline) {
						globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);
						if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
							overlaps[oCount++] = curTween;
						}
					} else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= 0.0000000002)) {
						overlaps[oCount++] = curTween;
					}
				}

				i = oCount;
				while (--i > -1) {
					curTween = overlaps[i];
					if (mode === 2) if (curTween._kill(props, target, tween)) {
						changed = true;
					}
					if (mode !== 2 || (!curTween._firstPT && curTween._initted)) {
						if (mode !== 2 && !_onOverwrite(curTween, tween)) {
							continue;
						}
						if (curTween._enabled(false, false)) { //if all property tweens have been overwritten, kill the tween.
							changed = true;
						}
					}
				}
				return changed;
			},
			_checkOverlap = function(tween, reference, zeroDur) {
				var tl = tween._timeline,
					ts = tl._timeScale,
					t = tween._startTime;
				while (tl._timeline) {
					t += tl._startTime;
					ts *= tl._timeScale;
					if (tl._paused) {
						return -100;
					}
					tl = tl._timeline;
				}
				t /= ts;
				return (t > reference) ? t - reference : ((zeroDur && t === reference) || (!tween._initted && t - reference < 2 * _tinyNum)) ? _tinyNum : ((t += tween.totalDuration() / tween._timeScale / ts) > reference + _tinyNum) ? 0 : t - reference - _tinyNum;
			};


//---- FWDTweenLite instance methods -----------------------------------------------------------------------------

		p._init = function() {
			var v = this.vars,
				op = this._overwrittenProps,
				dur = this._duration,
				immediate = !!v.immediateRender,
				ease = v.ease,
				i, initPlugins, pt, p, startVars, l;
			if (v.startAt) {
				if (this._startAt) {
					this._startAt.render(-1, true); //if we've run a startAt previously (when the tween instantiated), we should revert it so that the values re-instantiate correctly particularly for relative tweens. Without this, a FWDTweenLite.fromTo(obj, 1, {x:"+=100"}, {x:"-=100"}), for example, would actually jump to +=200 because the startAt would run twice, doubling the relative change.
					this._startAt.kill();
				}
				startVars = {};
				for (p in v.startAt) { //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, 1, from, to).fromTo(e, 1, to, from);
					startVars[p] = v.startAt[p];
				}
				startVars.overwrite = false;
				startVars.immediateRender = true;
				startVars.lazy = (immediate && v.lazy !== false);
				startVars.startAt = startVars.delay = null; //no nesting of startAt objects allowed (otherwise it could cause an infinite loop).
				this._startAt = FWDTweenLite.to(this.target, 0, startVars);
				if (immediate) {
					if (this._time > 0) {
						this._startAt = null; //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in TimelineLite/Max instances where immediateRender was false (which is the default in the convenience methods like from()).
					} else if (dur !== 0) {
						return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a TimelineLite or TimelineMax, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
					}
				}
			} else if (v.runBackwards && dur !== 0) {
				//from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
				if (this._startAt) {
					this._startAt.render(-1, true);
					this._startAt.kill();
					this._startAt = null;
				} else {
					if (this._time !== 0) { //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0
						immediate = false;
					}
					pt = {};
					for (p in v) { //copy props into a new object and skip any reserved props, otherwise onComplete or onUpdate or onStart could fire. We should, however, permit autoCSS to go through.
						if (!_reservedProps[p] || p === "autoCSS") {
							pt[p] = v[p];
						}
					}
					pt.overwrite = 0;
					pt.data = "isFromStart"; //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
					pt.lazy = (immediate && v.lazy !== false);
					pt.immediateRender = immediate; //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
					this._startAt = FWDTweenLite.to(this.target, 0, pt);
					if (!immediate) {
						this._startAt._init(); //ensures that the initial values are recorded
						this._startAt._enabled(false); //no need to have the tween render on the next cycle. Disable it because we'll always manually control the renders of the _startAt tween.
						if (this.vars.immediateRender) {
							this._startAt = null;
						}
					} else if (this._time === 0) {
						return;
					}
				}
			}
			this._ease = ease = (!ease) ? FWDTweenLite.defaultEase : (ease instanceof Ease) ? ease : (typeof(ease) === "function") ? new Ease(ease, v.easeParams) : _easeMap[ease] || FWDTweenLite.defaultEase;
			if (v.easeParams instanceof Array && ease.config) {
				this._ease = ease.config.apply(ease, v.easeParams);
			}
			this._easeType = this._ease._type;
			this._easePower = this._ease._power;
			this._firstPT = null;

			if (this._targets) {
				l = this._targets.length;
				for (i = 0; i < l; i++) {
					if ( this._initProps( this._targets[i], (this._propLookup[i] = {}), this._siblings[i], (op ? op[i] : null), i) ) {
						initPlugins = true;
					}
				}
			} else {
				initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op, 0);
			}

			if (initPlugins) {
				FWDTweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in FWDTweenLite
			}
			if (op) if (!this._firstPT) if (typeof(this.target) !== "function") { //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
				this._enabled(false, false);
			}
			if (v.runBackwards) {
				pt = this._firstPT;
				while (pt) {
					pt.s += pt.c;
					pt.c = -pt.c;
					pt = pt._next;
				}
			}
			this._onUpdate = v.onUpdate;
			this._initted = true;
		};

		p._initProps = function(target, propLookup, siblings, overwrittenProps, index) {
			var p, i, initPlugins, plugin, pt, v;
			if (target == null) {
				return false;
			}

			if (_lazyLookup[target._gsTweenID]) {
				_lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)
			}

			if (!this.vars.css) if (target.style) if (target !== window && target.nodeType) if (_plugins.css) if (this.vars.autoCSS !== false) { //it's so common to use FWDTweenLite/Max to animate the css of DOM elements, we assume that if the target is a DOM element, that's what is intended (a convenience so that users don't have to wrap things in css:{}, although we still recommend it for a slight performance boost and better specificity). Note: we cannot check "nodeType" on the window inside an iframe.
				_autoCSS(this.vars, target);
			}
			for (p in this.vars) {
				v = this.vars[p];
				if (_reservedProps[p]) {
					if (v) if ((v instanceof Array) || (v.push && _isArray(v))) if (v.join("").indexOf("{self}") !== -1) {
						this.vars[p] = v = this._swapSelfInParams(v, this);
					}

				} else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this, index)) {

					//t - target 		[object]
					//p - property 		[string]
					//s - start			[number]
					//c - change		[number]
					//f - isFunction	[boolean]
					//n - name			[string]
					//pg - isPlugin 	[boolean]
					//pr - priority		[number]
					//m - mod           [function | 0]
					this._firstPT = pt = {_next:this._firstPT, t:plugin, p:"setRatio", s:0, c:1, f:1, n:p, pg:1, pr:plugin._priority, m:0};
					i = plugin._overwriteProps.length;
					while (--i > -1) {
						propLookup[plugin._overwriteProps[i]] = this._firstPT;
					}
					if (plugin._priority || plugin._onInitAllProps) {
						initPlugins = true;
					}
					if (plugin._onDisable || plugin._onEnable) {
						this._notifyPluginsOfEnabled = true;
					}
					if (pt._next) {
						pt._next._prev = pt;
					}

				} else {
					propLookup[p] = _addPropTween.call(this, target, p, "get", v, p, 0, null, this.vars.stringFilter, index);
				}
			}

			if (overwrittenProps) if (this._kill(overwrittenProps, target)) { //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
				return this._initProps(target, propLookup, siblings, overwrittenProps, index);
			}
			if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
				this._kill(propLookup, target);
				return this._initProps(target, propLookup, siblings, overwrittenProps, index);
			}
			if (this._firstPT) if ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration)) { //zero duration tweens don't lazy render by default; everything else does.
				_lazyLookup[target._gsTweenID] = true;
			}
			return initPlugins;
		};

		p.render = function(time, suppressEvents, force) {
			var prevTime = this._time,
				duration = this._duration,
				prevRawPrevTime = this._rawPrevTime,
				isComplete, callback, pt, rawPrevTime;
			if (time >= duration - 0.0000001) { //to work around occasional floating point math artifacts.
				this._totalTime = this._time = duration;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
				if (!this._reversed ) {
					isComplete = true;
					callback = "onComplete";
					force = (force || this._timeline.autoRemoveChildren); //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
				}
				if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (this._startTime === this._timeline._duration) { //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
						time = 0;
					}
					if (prevRawPrevTime < 0 || (time <= 0 && time >= -0.0000001) || (prevRawPrevTime === _tinyNum && this.data !== "isPause")) if (prevRawPrevTime !== time) { //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
						force = true;
						if (prevRawPrevTime > _tinyNum) {
							callback = "onReverseComplete";
						}
					}
					this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				}

			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (prevTime !== 0 || (duration === 0 && prevRawPrevTime > 0)) {
					callback = "onReverseComplete";
					isComplete = this._reversed;
				}
				if (time < 0) {
					this._active = false;
					if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (prevRawPrevTime >= 0 && !(prevRawPrevTime === _tinyNum && this.data === "isPause")) {
							force = true;
						}
						this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					}
				}
				if (!this._initted) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
					force = true;
				}
			} else {
				this._totalTime = this._time = time;

				if (this._easeType) {
					var r = time / duration, type = this._easeType, pow = this._easePower;
					if (type === 1 || (type === 3 && r >= 0.5)) {
						r = 1 - r;
					}
					if (type === 3) {
						r *= 2;
					}
					if (pow === 1) {
						r *= r;
					} else if (pow === 2) {
						r *= r * r;
					} else if (pow === 3) {
						r *= r * r * r;
					} else if (pow === 4) {
						r *= r * r * r * r;
					}

					if (type === 1) {
						this.ratio = 1 - r;
					} else if (type === 2) {
						this.ratio = r;
					} else if (time / duration < 0.5) {
						this.ratio = r / 2;
					} else {
						this.ratio = 1 - (r / 2);
					}

				} else {
					this.ratio = this._ease.getRatio(time / duration);
				}
			}

			if (this._time === prevTime && !force) {
				return;
			} else if (!this._initted) {
				this._init();
				if (!this._initted || this._gc) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
					return;
				} else if (!force && this._firstPT && ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration))) {
					this._time = this._totalTime = prevTime;
					this._rawPrevTime = prevRawPrevTime;
					_lazyTweens.push(this);
					this._lazy = [time, suppressEvents];
					return;
				}
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete) {
					this.ratio = this._ease.getRatio(this._time / duration);
				} else if (isComplete && this._ease._calcEnd) {
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
				}
			}
			if (this._lazy !== false) { //in case a lazy render is pending, we should flush it because the new render is occurring now (imagine a lazy tween instantiating and then immediately the user calls tween.seek(tween.duration()), skipping to the end - the end render would be forced, and then if we didn't flush the lazy render, it'd fire AFTER the seek(), rendering it at the wrong time.
				this._lazy = false;
			}
			if (!this._active) if (!this._paused && this._time !== prevTime && time >= 0) {
				this._active = true;  //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}
			if (prevTime === 0) {
				if (this._startAt) {
					if (time >= 0) {
						this._startAt.render(time, suppressEvents, force);
					} else if (!callback) {
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}
				}
				if (this.vars.onStart) if (this._time !== 0 || duration === 0) if (!suppressEvents) {
					this._callback("onStart");
				}
			}
			pt = this._firstPT;
			while (pt) {
				if (pt.f) {
					pt.t[pt.p](pt.c * this.ratio + pt.s);
				} else {
					pt.t[pt.p] = pt.c * this.ratio + pt.s;
				}
				pt = pt._next;
			}

			if (this._onUpdate) {
				if (time < 0) if (this._startAt && time !== -0.0001) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}
				if (!suppressEvents) if (this._time !== prevTime || isComplete || force) {
					this._callback("onUpdate");
				}
			}
			if (callback) if (!this._gc || force) { //check _gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate && time !== -0.0001) { //-0.0001 is a special value that we use when looping back to the beginning of a repeated TimelineMax, in which case we shouldn't render the _startAt values.
					this._startAt.render(time, suppressEvents, force);
				}
				if (isComplete) {
					if (this._timeline.autoRemoveChildren) {
						this._enabled(false, false);
					}
					this._active = false;
				}
				if (!suppressEvents && this.vars[callback]) {
					this._callback(callback);
				}
				if (duration === 0 && this._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) { //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
					this._rawPrevTime = 0;
				}
			}
		};

		p._kill = function(vars, target, overwritingTween) {
			if (vars === "all") {
				vars = null;
			}
			if (vars == null) if (target == null || target === this.target) {
				this._lazy = false;
				return this._enabled(false, false);
			}
			target = (typeof(target) !== "string") ? (target || this._targets || this.target) : FWDTweenLite.selector(target) || target;
			var simultaneousOverwrite = (overwritingTween && this._time && overwritingTween._startTime === this._startTime && this._timeline === overwritingTween._timeline),
				i, overwrittenProps, p, pt, propLookup, changed, killProps, record, killed;
			if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				while (--i > -1) {
					if (this._kill(vars, target[i], overwritingTween)) {
						changed = true;
					}
				}
			} else {
				if (this._targets) {
					i = this._targets.length;
					while (--i > -1) {
						if (target === this._targets[i]) {
							propLookup = this._propLookup[i] || {};
							this._overwrittenProps = this._overwrittenProps || [];
							overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
							break;
						}
					}
				} else if (target !== this.target) {
					return false;
				} else {
					propLookup = this._propLookup;
					overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
				}

				if (propLookup) {
					killProps = vars || propLookup;
					record = (vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && (typeof(vars) !== "object" || !vars._tempKill)); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)
					if (overwritingTween && (FWDTweenLite.onOverwrite || this.vars.onOverwrite)) {
						for (p in killProps) {
							if (propLookup[p]) {
								if (!killed) {
									killed = [];
								}
								killed.push(p);
							}
						}
						if ((killed || !vars) && !_onOverwrite(this, overwritingTween, target, killed)) { //if the onOverwrite returned false, that means the user wants to override the overwriting (cancel it).
							return false;
						}
					}

					for (p in killProps) {
						if ((pt = propLookup[p])) {
							if (simultaneousOverwrite) { //if another tween overwrites this one and they both start at exactly the same time, yet this tween has already rendered once (for example, at 0.001) because it's first in the queue, we should revert the values to where they were at 0 so that the starting values aren't contaminated on the overwriting tween.
								if (pt.f) {
									pt.t[pt.p](pt.s);
								} else {
									pt.t[pt.p] = pt.s;
								}
								changed = true;
							}
							if (pt.pg && pt.t._kill(killProps)) {
								changed = true; //some plugins need to be notified so they can perform cleanup tasks first
							}
							if (!pt.pg || pt.t._overwriteProps.length === 0) {
								if (pt._prev) {
									pt._prev._next = pt._next;
								} else if (pt === this._firstPT) {
									this._firstPT = pt._next;
								}
								if (pt._next) {
									pt._next._prev = pt._prev;
								}
								pt._next = pt._prev = null;
							}
							delete propLookup[p];
						}
						if (record) {
							overwrittenProps[p] = 1;
						}
					}
					if (!this._firstPT && this._initted) { //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
						this._enabled(false, false);
					}
				}
			}
			return changed;
		};

		p.invalidate = function() {
			if (this._notifyPluginsOfEnabled) {
				FWDTweenLite._onPluginEvent("_onDisable", this);
			}
			this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null;
			this._notifyPluginsOfEnabled = this._active = this._lazy = false;
			this._propLookup = (this._targets) ? {} : [];
			Animation.prototype.invalidate.call(this);
			if (this.vars.immediateRender) {
				this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
				this.render(Math.min(0, -this._delay)); //in case delay is negative.
			}
			return this;
		};

		p._enabled = function(enabled, ignoreTimeline) {
			if (!_tickerActive) {
				_ticker.wake();
			}
			if (enabled && this._gc) {
				var targets = this._targets,
					i;
				if (targets) {
					i = targets.length;
					while (--i > -1) {
						this._siblings[i] = _register(targets[i], this, true);
					}
				} else {
					this._siblings = _register(this.target, this, true);
				}
			}
			Animation.prototype._enabled.call(this, enabled, ignoreTimeline);
			if (this._notifyPluginsOfEnabled) if (this._firstPT) {
				return FWDTweenLite._onPluginEvent((enabled ? "_onEnable" : "_onDisable"), this);
			}
			return false;
		};


//----FWDTweenLite static methods -----------------------------------------------------

		FWDTweenLite.to = function(target, duration, vars) {
			return new FWDTweenLite(target, duration, vars);
		};

		FWDTweenLite.from = function(target, duration, vars) {
			vars.runBackwards = true;
			vars.immediateRender = (vars.immediateRender != false);
			return new FWDTweenLite(target, duration, vars);
		};

		FWDTweenLite.fromTo = function(target, duration, fromVars, toVars) {
			toVars.startAt = fromVars;
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
			return new FWDTweenLite(target, duration, toVars);
		};

		FWDTweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {
			return new FWDTweenLite(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, callbackScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, immediateRender:false, lazy:false, useFrames:useFrames, overwrite:0});
		};

		FWDTweenLite.set = function(target, vars) {
			return new FWDTweenLite(target, 0, vars);
		};

		FWDTweenLite.getTweensOf = function(target, onlyActive) {
			if (target == null) { return []; }
			target = (typeof(target) !== "string") ? target : FWDTweenLite.selector(target) || target;
			var i, a, j, t;
			if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {
				i = target.length;
				a = [];
				while (--i > -1) {
					a = a.concat(FWDTweenLite.getTweensOf(target[i], onlyActive));
				}
				i = a.length;
				//now get rid of any duplicates (tweens of arrays of objects could cause duplicates)
				while (--i > -1) {
					t = a[i];
					j = i;
					while (--j > -1) {
						if (t === a[j]) {
							a.splice(i, 1);
						}
					}
				}
			} else {
				a = _register(target).concat();
				i = a.length;
				while (--i > -1) {
					if (a[i]._gc || (onlyActive && !a[i].isActive())) {
						a.splice(i, 1);
					}
				}
			}
			return a;
		};

		FWDTweenLite.killTweensOf = FWDTweenLite.killDelayedCallsTo = function(target, onlyActive, vars) {
			if (typeof(onlyActive) === "object") {
				vars = onlyActive; //for backwards compatibility (before "onlyActive" parameter was inserted)
				onlyActive = false;
			}
			var a = FWDTweenLite.getTweensOf(target, onlyActive),
				i = a.length;
			while (--i > -1) {
				a[i]._kill(vars, target);
			}
		};



/*
 * ----------------------------------------------------------------
 * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another script call before loading plugins which is easy to forget)
 * ----------------------------------------------------------------
 */
		var TweenPlugin = _class("plugins.TweenPlugin", function(props, priority) {
					this._overwriteProps = (props || "").split(",");
					this._propName = this._overwriteProps[0];
					this._priority = priority || 0;
					this._super = TweenPlugin.prototype;
				}, true);

		p = TweenPlugin.prototype;
		TweenPlugin.version = "1.19.0";
		TweenPlugin.API = 2;
		p._firstPT = null;
		p._addTween = _addPropTween;
		p.setRatio = _setRatio;

		p._kill = function(lookup) {
			var a = this._overwriteProps,
				pt = this._firstPT,
				i;
			if (lookup[this._propName] != null) {
				this._overwriteProps = [];
			} else {
				i = a.length;
				while (--i > -1) {
					if (lookup[a[i]] != null) {
						a.splice(i, 1);
					}
				}
			}
			while (pt) {
				if (lookup[pt.n] != null) {
					if (pt._next) {
						pt._next._prev = pt._prev;
					}
					if (pt._prev) {
						pt._prev._next = pt._next;
						pt._prev = null;
					} else if (this._firstPT === pt) {
						this._firstPT = pt._next;
					}
				}
				pt = pt._next;
			}
			return false;
		};

		p._mod = p._roundProps = function(lookup) {
			var pt = this._firstPT,
				val;
			while (pt) {
				val = lookup[this._propName] || (pt.n != null && lookup[ pt.n.split(this._propName + "_").join("") ]);
				if (val && typeof(val) === "function") { //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
					if (pt.f === 2) {
						pt.t._applyPT.m = val;
					} else {
						pt.m = val;
					}
				}
				pt = pt._next;
			}
		};

		FWDTweenLite._onPluginEvent = function(type, tween) {
			var pt = tween._firstPT,
				changed, pt2, first, last, next;
			if (type === "_onInitAllProps") {
				//sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
				while (pt) {
					next = pt._next;
					pt2 = first;
					while (pt2 && pt2.pr > pt.pr) {
						pt2 = pt2._next;
					}
					if ((pt._prev = pt2 ? pt2._prev : last)) {
						pt._prev._next = pt;
					} else {
						first = pt;
					}
					if ((pt._next = pt2)) {
						pt2._prev = pt;
					} else {
						last = pt;
					}
					pt = next;
				}
				pt = tween._firstPT = first;
			}
			while (pt) {
				if (pt.pg) if (typeof(pt.t[type]) === "function") if (pt.t[type]()) {
					changed = true;
				}
				pt = pt._next;
			}
			return changed;
		};

		TweenPlugin.activate = function(plugins) {
			var i = plugins.length;
			while (--i > -1) {
				if (plugins[i].API === TweenPlugin.API) {
					_plugins[(new plugins[i]())._propName] = plugins[i];
				}
			}
			return true;
		};

		//provides a more concise way to define plugins that have no dependencies besides TweenPlugin and FWDTweenLite, wrapping common boilerplate stuff into one function (added in 1.9.0). You don't NEED to use this to define a plugin - the old way still works and can be useful in certain (rare) situations.
		_gsDefine.plugin = function(config) {
			if (!config || !config.propName || !config.init || !config.API) { throw "illegal plugin definition."; }
			var propName = config.propName,
				priority = config.priority || 0,
				overwriteProps = config.overwriteProps,
				map = {init:"_onInitTween", set:"setRatio", kill:"_kill", round:"_mod", mod:"_mod", initAll:"_onInitAllProps"},
				Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin",
					function() {
						TweenPlugin.call(this, propName, priority);
						this._overwriteProps = overwriteProps || [];
					}, (config.fwd_global === true)),
				p = Plugin.prototype = new TweenPlugin(propName),
				prop;
			p.constructor = Plugin;
			Plugin.API = config.API;
			for (prop in map) {
				if (typeof(config[prop]) === "function") {
					p[map[prop]] = config[prop];
				}
			}
			Plugin.version = config.version;
			TweenPlugin.activate([Plugin]);
			return Plugin;
		};


		//now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have FWDTweenLite load last - it can check all the dependencies for you.
		a = window._fwd_gsQueue;
		if (a) {
			for (i = 0; i < a.length; i++) {
				a[i]();
			}
			for (p in _defLookup) {
				if (!_defLookup[p].func) {
					window.console.log("GSAP encountered missing dependency: " + p);
				}
			}
		}

		_tickerActive = false; //ensures that the first official animation forces a ticker.tick() to update the time when it is instantiated

})((typeof(fwd_module) !== "undefined" && fwd_module.exports && typeof(fwd_global) !== "undefined") ? fwd_global : this || window, "FWDAnimation");
}/* Gallery */
(function (window){
	
	var FWDRL = function(props){
		
		var self = this;
	
		/* init gallery */
		self.init = function(){
		
			FWDTweenLite.ticker.useRAF(false);
			self.props_obj = props;
			 
			if(!self.props_obj){
				alert("FWDRL constructor properties object is not defined!");
				return;
			}
			
			
			this.stageContainer = document.getElementsByTagName("body")[0];
			if(!this.stageContainer) this.stageContainer = document.documentElement;
			this.listeners = {events_ar:[]};
			this.buttons_ar = null;
			this.buttonsMaxW_ar = null;
			
			this.ws = null;
			this.so = null;
			this.data = null;
			this.customContextMenu_do = null;
			this.thumbnailsManager_do = null;
			this.info_do = null;
			this.hider = null;
			this.main_do = null;
			this.bk_do = null;
			this.preloader_do = null;
			this.playlist_ar = null;
			this.mainItemHolder_do = null;
			this.itemBk_do = null;
			this.itemBorder_do = null;
			this.itemHolder_do = null;
			this.curItem_do = null;
			this.prevItem_do = null;
			this.image_img = null;
			this.closeButton_do = null;
			this.zoomButton_do = null;
			this.descButton_do = null;
			this.slideShowButton_do = null;
			this.nextButton_do = null;
			this.prevButton_do = null;
			this.hsThumbanilsButton_do = null;
			this.video_do = null;
			this.videoHolder_do = null;
			this.audioHolder_do = null;
			this.audio_do = null;
			this.scClientId_str = "6d5131010ae3b3953fc7d881c38bc555";
			this.flickrAPIKey_str = "8b8bea6be401b521615b9b74c12131f2";
			
			this.rightClickContextMenu_str = this.props_obj.rightClickContextMenu || "developer";
			var test = this.rightClickContextMenu_str == "developer" 
				   || this.rightClickContextMenu_str == "disabled"
				   || this.rightClickContextMenu_str == "default";
			if(!test) this.rightClickContextMenu_str = "developer";
			
			this.buttonsAlignment_str = this.props_obj.buttonsAlignment || "in";
			var test = this.buttonsAlignment_str == "in" 
				   || this.buttonsAlignment_str == "out";
			if(!test) this.buttonsAlignment_str = "in";
			this.DFButtonsAlignment_str = this.buttonsAlignment_str;
		
			this.descriptionWindowPosition_str = this.props_obj.descriptionWindowPosition || "top";
			test = this.descriptionWindowPosition_str == "top" 
				   || this.descriptionWindowPosition_str == "bottom";
			if(!test) this.descriptionWindowPosition_str = "top";
			this.DFDescriptionWindowPosition_str = this.descriptionWindowPosition_str;
			
			this.descriptionAnimationType_str = this.props_obj.descriptionWindowAnimationType || "motion";
			test = this.descriptionAnimationType_str == "motion" 
				   || this.descriptionAnimationType_str == "opacity";
			if(!test) this.descriptionAnimationType_str = "motion";
			this.DFDescriptionAnimationType_str = this.descriptionAnimationType_str;
			
			this.descriptionAnimationType_str = this.props_obj.descriptionWindowAnimationType || "motion";
			test = this.descriptionAnimationType_str == "motion" 
				   || this.descriptionAnimationType_str == "opacity";
			if(!test) this.descriptionAnimationType_str = "motion";
			this.DFDescriptionAnimationType_str = this.descriptionAnimationType_str;
			
			this.thumbnailsHoverEffect_str = this.props_obj.thumbnailsHoverEffect || "scale";
			test = this.thumbnailsHoverEffect_str == "scale" 
				   || this.thumbnailsHoverEffect_str == "opacity";
			if(!test) this.thumbnailsHoverEffect_str = "opacity";
			this.DFThumbnailsHoverEffect_str = this.thumbnailsHoverEffect_str;
			
			this.facebookAppId_str = self.props_obj.facebookAppId || undefined;
			this.googleMapsAPIKey_str = "AIzaSyDYlgLIneg_UOd8STBfJEgq2JgmT5nNJKU";
			this.backgroundColor_str = this.props_obj.backgroundColor || "#000000";
			this.DFBackgroundColor_str = self.backgroundColor_str;
			this.playlistDOMOrObject = null;
			this.type_str;
			this.itemBorderColor_str = this.props_obj.itemBorderColor || "transparent";
			this.DFitemBorderColor_str = this.itemBorderColor_str;
			this.itemBkColor_str = this.props_obj.itemBackgroundColor || "transparent";
			this.DFItemBkColor_str = this.itemBkColor_str;
			this.playlistDomOrObj_str = undefined;
			this.itemBoxShadow_str = this.props_obj.itemBoxShadow || "none";
			this.DFItemBoxShadow_str = this.itemBoxShadow_str;
			this.thumbnailsBorderNormalColor_str = this.props_obj.thumbnailsBorderNormalColor || "#FF0000";
			this.DFThumbnailsBorderNormalColor = this.thumbnailsBorderNormalColor_str;
			this.thumbnailsBorderSelectedColor_str = this.props_obj.thumbnailsBorderSelectedColor || "#FF0000";
			this.DFThumbnailsBorderSelectedColor_str = this.thumbnailsBorderSelectedColor_str;
			this.descriptionWindowBackgroundColor_str = this.props_obj.descriptionWindowBackgroundColor || "#FF0000";
			this.DFDescriptionWindowBackgroundColor = this.descriptionWindowBackgroundColor_str;
			this.thumbnailsOverlayColor_str = this.props_obj.thumbnailsOverlayColor || "#FF0000";
			this.DFThumbnailsOverlayColor_str = this.thumbnailsOverlayColor_str;
			this.posterPath_str;
			this.DFVideoControllerBackgroundColor_str;
			this.DFVideoPosterBackgroundColor_str;
			this.DFTimeColor_str;
		
			this.descriptionWindowBackgroundOpacity = this.props_obj.descriptionWindowBackgroundOpacity || 1;
			this.DFDescriptionWindowBackgroundOpacity = this.descriptionWindowBackgroundOpacity;
			this.backgroundOpacity = this.props_obj.backgroundOpacity || .8;
			this.DFBackgroundOpacity = this.backgroundOpacity;
			if(self.buttonsAlignment_str == FWDRL.BUTTONS_IN){
				this.buttonsOffsetIn = this.props_obj.buttonsOffsetIn || 0;
			}else{
				this.buttonsOffsetIn = this.props_obj.buttonsOffsetOut || 0;
			}
			this.DFButtonsOffsetIn = this.buttonsOffsetIn;
			
			if(self.buttonsAlignment_str == FWDRL.BUTTONS_IN){
				this.buttonsOffsetOut = this.props_obj.buttonsOffsetOut || 0;
			}else{
				this.buttonsOffsetOut = this.props_obj.buttonsOffsetIn || 0;
			}
			this.DFButtonsOffsetOut = this.buttonsOffsetOut;
			
			this.audioPlayerMarginsOffset = 20;
			this.itemBorderRadius = this.props_obj.itemBorderRadius || 0; 
			this.DFItemBorderRadius = this.itemBorderRadius;
			this.itemBorderSize = this.props_obj.itemBorderSize || 0; 
			if(this.itemBorderSize == 0) this.itemBorderColor_str = "transparent";
			this.DFItemBorderSize = this.itemBorderSize;
			this.spaceBetweenButtons = this.props_obj.spaceBetweenButtons || 0; 
			this.DFSpaceBetweenButtons = this.spaceBetweenButtons;
			this.buttonsHideDelay = this.props_obj.buttonsHideDelay || 3;
			this.buttonsHideDelay *= 1000;
			this.DFbuttonsHideDelay = this.buttonsHideDelay;
			this.defaultItemW = this.props_obj.defaultItemWidth || 640;
			this.defaultItemH = this.props_obj.defaultItemHeight || 380;
			this.DFDefaultItemW = this.defaultItemW;
			this.DFDefaultItemH = this.defaultItemH;
			this.thumbnailsOffsetBottom = this.props_obj.thumbnailsOffsetBottom || 0;
			this.DFThumbnailsOffsetBottom = this.thumbnailsOffsetBottom;
			this.thumbnailsBorderSize = this.props_obj.thumbnailsBorderSize || 0;
			this.DFThumbnailsBorderSize = this.thumbnailsBorderSize;
			this.thumbnailsBorderRadius = this.props_obj.thumbnailsBorderRadius || 0;
			this.DFThumbnailsBorderRadius = this.thumbnailsBorderRadius;
			this.thumbnailH = this.props_obj.thumbnailsImageHeight || 50;
			this.thumbnailH += (this.thumbnailsBorderSize * 2) + this.thumbnailsOffsetBottom;
			this.DFThumbnailH = this.thumbnailH;
			this.spaceBetweenThumbnailsAndItem = this.props_obj.spaceBetweenThumbnailsAndItem || 0;
			this.spaceBetweenThumbnails = this.props_obj.spaceBetweenThumbnails || 0;
			this.DFSpaceBetweenThumbnails = this.spaceBetweenThumbnails;
			
			this.itemOffsetH = this.props_obj.itemOffsetHeight || 0;
			this.DFItemOffsetH = this.itemOffsetH;
			this.spaceBetweenThumbnailsAndItem = this.props_obj.spaceBetweenThumbnailsAndItem || 0;
			this.DFSpaceBetweenThumbnailsAndItem = this.spaceBetweenThumbnailsAndItem;
			this.slideShowDelay = parseInt(this.props_obj.slideShowDelay) * 1000;
			if(this.slideShowDelay < 1/1000) this.slideShowDelay = 1000;
			this.DFSlideShowDelay = this.slideShowDelay;
			this.thumbnailsOverlayOpacity = this.props_obj.thumbnailsOverlayOpacity || 1;
			this.DFThumbnailsOverlayOpacity = this.thumbnailsOverlayOpacity;
			this.id = -1;
			this.prevId = -2;
			this.stageWidth = 0;
			this.stageHeight = 0;
			this.totalItems = 0;
			this.originalW = 0;
			this.originalH = 0;
			this.maxButtonW = 0;
			this.finalW = 0;
			this.finalH = 0;
			this.prevVideoW = 0;
			this.prevVideoH = 0;
			this.finalX = 0;
			this.finalY = 0;
			this.gmx = 0;
			this.gmy = 0;
			this.lastPresedX = 0;
			this.lastPresedY = 0;
			this.friction = .9;
			this.vx = 0;
			this.vy = 0;
			this.dif = 0;
			this.mouseX = 0;
			this.mouseY = 0;
			
			this.resizeHandlerId_to;
			this.showOrHideCompleteId_to;
			this.hideCompleteId_to;
			this.animId_to;
			this.maximizeCompleteTimeOutId_to;
			this.minimizeCompleteTimeOutId_to;
			this.disableClickId_to;
			this.doNotAllowToHideId_to;
			this.updateImageWhenMaximized_int;
			
			this.isAnimForVideoAndAudioPlayersDone_bl = false;
			this.isMobile_bl = FWDRLUtils.isMobile;
			this.useDeepLinking_bl = this.props_obj.useDeepLinking; 
			this.useDeepLinking_bl = this.useDeepLinking_bl == "yes" ? true : false;
			if(FWDRLUtils.isLocal) this.useDeepLinking_bl = false;
			
			this.showCloseButton_bl = this.props_obj.showCloseButton; 
			this.showCloseButton_bl = this.showCloseButton_bl == "no" ? false : true;
			this.DFShowCloseButton_bl = this.showCloseButton_bl;
			this.defaultShowZoomButton_bl = this.props_obj.showZoomButton; 
			this.defaultShowZoomButton_bl = this.defaultShowZoomButton_bl == "no" ? false : true;
			this.DFShowZoomButton = this.defaultShowZoomButton_bl;
			this.showZoomButton_bl = false;
			this.defaultShowNextAndPrevButtons_bl = this.props_obj.showNextAndPrevButtons; 
			this.defaultShowNextAndPrevButtons_bl = this.defaultShowNextAndPrevButtons_bl == "no" ? false : true;
			if(this.props_obj.showNextAndPrevButtonsOnMobile == "no" && self.isMobile_bl)  this.defaultShowNextAndPrevButtons_bl = false;
			this.DFSefaultShowNextAndPrevButtons_bl = this.defaultShowNextAndPrevButtons_bl;
			this.defaultHideDescriptionButtons_bl = this.props_obj.showDescriptionButton;
			this.defaultHideDescriptionButtons_bl = this.defaultHideDescriptionButtons_bl == "yes" ? true : false;
			this.DFDefaultHideDescriptionButtons_bl = this.defaultHideDescriptionButtons_bl;
			this.showDescriptionButton_bl = false;
			this.hasItemDescription_bl = false;
			this.defaultShowDescriptionByDefault_bl = this.props_obj.showDescriptionByDefault;
			this.defaultShowDescriptionByDefault_bl = this.defaultShowDescriptionByDefault_bl == "yes" ? true : false;
			this.DFDefaultShowDescriptionByDefault_bl = this.defaultShowDescriptionByDefault_bl;
			this.showDescription_bl = this.defaultShowDescriptionByDefault_bl;
			this.addKeyboardSupport_bl = this.props_obj.addKeyboardSupport;
			this.addKeyboardSupport_bl = this.addKeyboardSupport_bl == "yes" ? true : false;
			this.DFSddKeyboardSupport_bl = this.addKeyboardSupport_bl;
			this.slideShowAutoPlay_bl = this.props_obj.slideShowAutoPlay;
			this.slideShowAutoPlay_bl = this.slideShowAutoPlay_bl == "yes" ? true : false;
			this.DFSlideShowAutoPlay_bl = this.slideShowAutoPlay_bl;
			this.videoAutoPlay_bl = this.props_obj.videoAutoPlay;
			this.videoAutoPlay_bl = this.videoAutoPlay_bl == "yes" ? true : false;
			if(self.isMobile_bl) self.videoAutoPlay_bl = false;
			this.DFVideoAutoPlay_bl = this.videoAutoPlay_bl;
			this.audioAutoPlay_bl = this.props_obj.audioAutoPlay;
			this.audioAutoPlay_bl = this.audioAutoPlay_bl == "yes" ? true : false;
			if(self.isMobile_bl) self.audioAutoPlay_bl = false;
			this.DFAudioAutoPlay_bl = this.audioAutoPlay_bl;
			this.nextVideoOrAudioAutoPlay_bl = this.props_obj.nextVideoOrAudioAutoPlay;
			this.nextVideoOrAudioAutoPlay_bl = this.nextVideoOrAudioAutoPlay_bl == "yes" ? true : false;
			if(self.isMobile_bl) self.nextVideoOrAudioAutoPlay_bl = false;
			this.DFNextVideoOrAudioAutoPlay_bl = this.nextVideoOrAudioAutoPlay_bl;
			this.defaultShowThumbnails_bl = this.props_obj.showThumbnails;
			this.defaultShowThumbnails_bl = this.defaultShowThumbnails_bl == "yes" ? true : false;
			this.DFDefaultThumbnails_bl = this.defaultShowThumbnails_bl;
			this.showThumbnailsByDefault_bl = this.props_obj.showThumbnailsByDefault;
			this.showThumbnailsByDefault_bl = this.showThumbnailsByDefault_bl == "yes" ? true : false;
			this.DFShowThumbnailsByDefault_bl = this.showThumbnailsByDefault_bl;
			this.defaultShowThumbnailsHideOrShowButton_bl = this.props_obj.showThumbnailsHideOrShowButton;
			this.defaultShowThumbnailsHideOrShowButton_bl = this.defaultShowThumbnailsHideOrShowButton_bl == "yes" ? true : false;
			this.DFDefaultShowThumbnailsHideOrShowButton_bl = this.defaultShowThumbnailsHideOrShowButton_bl;
			this.showSlideShowButton_bl = this.props_obj.showSlideShowButton;
			this.showSlideShowButton_bl = this.showSlideShowButton_bl == "yes" ? true : false;
			this.DFShowSlideShowButton_bl = this.showSlideShowButton_bl;
			this.defaultShowSlideShowAnimation_bl = this.props_obj.showSlideShowAnimation;
			this.defaultShowSlideShowAnimation_bl = this.defaultShowSlideShowAnimation_bl == "yes" ? true : false;
			this.DFSefaultShowSlideShowAnimation_bl = this.defaultShowSlideShowAnimation_bl;
			this.showSlideShowAnimation_bl = false;
			this.useAsModal_bl = this.props_obj.useAsModal;
			this.useAsModal_bl = this.useAsModal_bl == "yes" ? true : false;
			this.DFUseAsModal_bl = this.useAsModal_bl;
			this.showShareButton_bl = this.props_obj.showShareButton;
			this.showShareButton_bl = this.showShareButton_bl == "yes" ? true : false;
			this.DFShowFacebookButton_bl = this.showShareButton_bl;
			this.showThumbnailsOverlay_bl = this.props_obj.showThumbnailsOverlay; 
			this.showThumbnailsOverlay_bl = this.showThumbnailsOverlay_bl == "yes" ? true : false;
			this.DFShowThumbnailsOverlay_bl = this.showThumbnailsOverlay_bl; 
			this.showThumbnailsSmallIcon_bl = this.props_obj.showThumbnailsSmallIcon; 
			this.showThumbnailsSmallIcon_bl = this.showThumbnailsSmallIcon_bl == "yes" ? true : false;
			this.DFShowThumbnailsSmallIcon_bl = this.showThumbnailsSmallIcon_bl;
			this.areButtonsSharedShowed_bl = false;
			
			this.doNotAllowToHide_bl = false;
			this.isVideoFullScreen_bl = false;
			this.hasKeyboardSupport_bl = false;
			this.isClickedDisabled_bl = false;
			this.showThumbnails_bl = false;
			this.areThumbnailsShowed_bl = false;
			this.showThumbnailsHideOrShowButton_bl = false;
			this.isDragging_bl = false;
			this.isAnimMaximizeOrMinimize_bl = false;
			this.swipeMoved_bl = false;
			this.isAPIReady_bl = false;
			this.isLoading_bl = false;
			this.isShowed_bl = false;
			self.isReady_bl = false;
			this.isAnim_bl = false;
			this.isFirstItemShowed_bl = false;
			this.firstVideoOrAudioAdded_bl = false;
			this.isMaximized_bl = false;
			this.useVideo_bl = false;
			this.areButtonsShowed_bl = true;
			this.hasPointerEvent_bl = FWDRLUtils.hasPointerEvent;
			
			this.initiallize();
		};
		
		//#############################################//
		/* setup main do */
		//#############################################//
		self.initiallize = function(){
			
			self.main_do = new FWDRLDisplayObject("div");
			self.main_do.screen.setAttribute("id", "RL");
			
			self.main_do.getStyle().msTouchAction = "none";
			self.main_do.getStyle().webkitTapHighlightColor = "rgba(0, 0, 0, 0)";
			self.main_do.setBackfaceVisibility();
			if(!self.isMobile_bl && FWDRLUtils.isChrome){
				self.main_do.hasTransform3d_bl =  false;
				self.main_do.hasTransform2d_bl =  false;
			}
			self.main_do.getStyle().width = "100%";
			self.main_do.getStyle().zIndex = "100000000000000000";
			
			self.bk_do = new FWDRLDisplayObject("div");
			self.bk_do.getStyle().width = "100%";
			self.bk_do.getStyle().height = "100%";
			self.bk_do.getStyle().backgroundColor = self.backgroundColor_str;
			self.bk_do.setAlpha(0);
		
			self.mainItemHolder_do = new FWDRLDisplayObject("div");	
			
			FWDRLDescriptionWindow.setPrototype();
			self.desc_do = new FWDRLDescriptionWindow(
					self, 
					self.descriptionAnimationType_str,
					self.descriptionWindowPosition_str,
					self.itemBorderSize, 
					self.descriptionWindowBackgroundColor_str, 
					self.descriptionWindowBackgroundOpacity);
			
			self.itemBorder_do = new FWDRLDisplayObject("div");
			self.itemBorder_do.getStyle().backgroundColor = self.itemBorderColor_str;
			if((!self.isMobile_bl && FWDRLUtils.isChrome)
				|| FWDRLUtils.isAndroid){
				self.itemBorder_do.hasTransform3d_bl = false;
				self.itemBorder_do.hasTransform2d_bl = false;
				self.itemBorder_do.setBackfaceVisibility();
				
			}
			
			self.itemBk_do = new FWDRLDisplayObject("div");
			self.itemBk_do.getStyle().backgroundColor = self.itemBkColor_str;
			self.itemHolder_do = new FWDRLDisplayObject("div");
			self.itemHolder_do.setOverflow("visible");
		
			self.mainItemHolder_do.addChild(self.itemBorder_do);
			self.mainItemHolder_do.addChild(self.itemBk_do);
			self.mainItemHolder_do.addChild(self.itemHolder_do);
			//self.mainItemHolder_do.hasTransform3d_bl = false;
			//self.mainItemHolder_do.hasTransform2d_bl = false;
			self.mainItemHolder_do.addChild(self.desc_do);
			
			self.main_do.addChild(self.bk_do);
			self.main_do.addChild(self.mainItemHolder_do);
			self.stageContainer.appendChild(self.main_do.screen);
			
			if(!FWDRLUtils.isMobile || (FWDRLUtils.isMobile && FWDRLUtils.hasPointerEvent)) self.main_do.setSelectable(false);
			if(!self.isMobile_bl) self.setupContextMenu();
			self.setupHider();
			self.setupDisableClick();
			self.setupData();
			self.setupInfoWindow();
			
			if(self.useDeepLinking_bl){
				self.setupDL();
				setTimeout(function(){
					var playlistName_str = FWDAddress.getParameter("rl_playlist");
					var playlistId = FWDAddress.getParameter("rl_id");
					
					if(location.href.indexOf("youtube.com") != -1){
						playlistName_str = location.href;
						playlistName_str = playlistName_str.match(/https:.*/i)[0];
						if(playlistName_str.indexOf("rl_id=")){
							playlistName_str = playlistName_str.replace(/&rl_id=.*/, "");
						}
					}else if(location.href.indexOf("facebook.com") != -1){
						playlistName_str = location.href;
						playlistName_str = playlistName_str.match(/https:.*/i)[0];
						if(playlistName_str.indexOf("rl_id=")){
							playlistName_str = playlistName_str.replace(/&rl_id=.*/, "");
						}
					}
					
					
				
					self.propsObjVariableName_str = FWDAddress.getParameter("rl_propsobj");
					if(location.href.indexOf("RL?") && playlistName_str && playlistId){
						FWDRL.show(playlistName_str, playlistId, self.propsObjVariableName_str);
					}
				}, 100);
			}
		};
		
		//#############################################//
		/* setup info_do */
		//#############################################//
		self.setupInfoWindow = function(){
			FWDRLInfo.setPrototype();
			self.info_do = new FWDRLInfo(self, self.data.wrningIconPath_str);
		};	
		
		//#############################################//
		/* setup context menu */
		//#############################################//
		self.setupContextMenu = function(){
			self.customContextMenu_do = new FWDRLContextMenu(self.main_do, self.rightClickContextMenu_str);
		};
		
		//#############################################//
		/* Setup hider */
		//#############################################//
		this.setupHider = function(){
			FWDRLHider.setPrototype();
			self.hider = new FWDRLHider(self.main_do, self.buttonsHideDelay);
			self.hider.addListener(FWDRLHider.SHOW, self.hiderShowHandler);
			self.hider.addListener(FWDRLHider.HIDE, self.hiderHideHandler);
		};
		
		this.hiderShowHandler = function(){
			self.showButtonsWithFade(true);
			self.positionButtons(true);
			self.positionShareButtons(true);
		};
		
		this.hiderHideHandler = function(){
		
			if(!self.isMobile_bl){
				
				if(self.shareButtonsHolder_do){
					if(FWDRLUtils.hitTest(self.shareButtonsHolder_do.screen, self.hider.globalX, self.hider.globalY)){
						self.hider.reset();
						return;
					}
				}

				if(self.showCloseButton_bl){
					if(FWDRLUtils.hitTest(self.closeButton_do.screen, self.hider.globalX, self.hider.globalY)){
						self.hider.reset();
						return;
					}
				}
				
				if(self.showNextAndPrevButtons_bl){
					if(FWDRLUtils.hitTest(self.nextButton_do.screen, self.hider.globalX, self.hider.globalY)
					   || FWDRLUtils.hitTest(self.prevButton_do.screen, self.hider.globalX, self.hider.globalY)){
						self.hider.reset();
						return;
					}
				}
				
				if(self.showZoomButton_bl){
					if(FWDRLUtils.hitTest(self.zoomButton_do.screen, self.hider.globalX, self.hider.globalY)){
						self.hider.reset();
						return;
					}
				}
				
				if(self.showDescriptionButton_bl){
					if(FWDRLUtils.hitTest(self.descButton_do.screen, self.hider.globalX, self.hider.globalY)){
						self.hider.reset();
						return;
					}
				}
				
				if(self.showSlideShowButton_bl){
					if(FWDRLUtils.hitTest(self.slideShowButton_do.screen, self.hider.globalX, self.hider.globalY)){
						self.hider.reset();
						return;
					}
				}
			
				if(self.showShareButton_bl){
					if(FWDRLUtils.hitTest(self.shareButton_do.screen, self.hider.globalX, self.hider.globalY)){
						self.hider.reset();
						return;
					}
				}
				
				if(self.showThumbnailsHideOrShowButton_bl){
					if(FWDRLUtils.hitTest(self.hsThumbanilsButton_do.screen, self.hider.globalX, self.hider.globalY)){
						self.hider.reset();
						return;
					}
				}
			}
			
			if(self.showSlideShowAnimation_bl){	
				if(self.buttonsAlignment_str == FWDRL.BUTTONS_IN){
					FWDAnimation.to(self.slp_do, .8, {y:self.finalY, ease:Expo.easeInOut});
				}else{
					FWDAnimation.to(self.slp_do, .8, {y:self.buttonsOffsetIn, ease:Expo.easeInOut});
				}
			}
			
			self.stopToCheckShareButtonsHit();
			self.hideButtonsWithFade(true);
			
		};
		
		//#####################################//
		/* Setup disable click */
		//#####################################//
		self.setupDisableClick = function(){
			self.disableClick_do = new FWDRLDisplayObject("div");
			if(FWDRLUtils.isIE){
				self.disableClick_do.setBkColor("#FFFFFF");
				self.disableClick_do.setAlpha(0.00001);
			}
		};
		
		self.disableClick = function(){
			self.showDisable();
			self.disableClickId_to =  setTimeout(function(){
				self.hideDisable();
			}, 100);
		};
		
		self.showDisable = function(){
			if(self.isClickedDisabled_bl) return;
			self.isClickedDisabled_bl = true;
			self.disableClick_do.setWidth(self.stageWidth);
			self.disableClick_do.setHeight(self.stageHeight);
		};
		
		self.hideDisable = function(){
			if(!self.isClickedDisabled_bl) return;
			self.isClickedDisabled_bl = false;
			self.disableClick_do.setWidth(0);
			self.disableClick_do.setHeight(0);
		};
		
	
		//#############################################//
		/* resize handler */
		//#############################################//
		self.startResizeHandler = function(){
			if(window.addEventListener){
				window.addEventListener("resize", self.onResizeHandler);
				window.addEventListener("scroll", self.scrollHandler);
				window.addEventListener ("mousewheel", self.mouseDummyHandler);
				window.addEventListener('DOMMouseScroll', self.mouseDummyHandler);
				if(self.isMobile_bl) window.addEventListener("touchmove", self.mouseDummyHandler);
			}else if(window.attachEvent){
				window.attachEvent("onresize", self.onResizeHandler);
				window.attachEvent("onscroll", self.scrollHandler);
				document.attachEvent("onmousewheel", self.mouseDummyHandler);
			}
			
			self.onResizeHandler();
			setTimeout(self.scrollHandler, 200);
			setTimeout(self.scrollHandler, 500);
		};
	
		
		self.stopResizeHandler = function(){
			clearTimeout(self.resizeHandlerId_to);
			if(window.removeEventListener){
				window.removeEventListener("resize", self.onResizeHandler);
				window.removeEventListener("scroll", self.scrollHandler);
				if(self.isMobile_bl) window.removeEventListener("touchmove", self.mouseDummyHandler);
			}else if(window.detachEvent){
				window.detachEvent("onresize", self.onResizeHandler);
				window.detachEvent("onscroll", self.scrollHandler);
				document.detachEvent("onmousewheel", self.mouseDummyHandler);
			}
		};
		
		self.onResizeHandler = function(e){
			self.resizeHandler();
		};
		
		self.scrollHandler = function(e){
			self.so = FWDRLUtils.getScrollOffsets();
			if(!self.isShowed_bl) return;
			self.main_do.setX(self.so.x);
			self.main_do.setY(self.so.y);
			if(e && e.preventDefault) e.preventDefault();
		};
		
		self.addPreventMouseWheel = function(){
			if(window.addEventListener){
				window.addEventListener ("mousewheel", self.mouseDummyHandler);
				window.addEventListener('DOMMouseScroll', self.mouseDummyHandler);
			}else if(document.attachEvent){
				document.attachEvent ("onmousewheel", self.mouseDummyHandler);
			}
		};
		
		self.removePreventMouseWheel = function(){
			if(window.removeEventListener){
				window.removeEventListener ("mousewheel", self.mouseDummyHandler);
				window.removeEventListener('DOMMouseScroll', self.mouseDummyHandler);
			}else if(document.detachEvent){
				document.detachEvent("onmousewheel", self.mouseDummyHandler);
			}
		};
		
		
		//###############################################//
		/* Disable scroll and touch events for the main browser scrollbar.*/
		//###############################################//
		this.mouseDummyHandler = function(e){
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
		};
		
		self.resizeHandler = function(overwrite){
			if(!self.isShowed_bl) return;
			
			self.ws = FWDRLUtils.getViewportSize();
			self.stageWidth = self.ws.w;
			self.stageHeight = self.ws.h;
			
			if(self.isMobile_bl){
				self.main_do.setWidth(self.stageWidth);
				self.main_do.setHeight(self.stageHeight);
			}
			
			if(self.preloader_do) self.positionPreloader();
			if(self.info_do && self.info_do.isShowed_bl) self.info_do.positionAndResize();
			
			self.hideShareButtons(false, false, true);
			self.resizeCurrentItem();
			self.positionButtons();
			self.positionShareButtons();
			self.main_do.setX(self.so.x);
			self.main_do.setY(self.so.y);
			self.main_do.setHeight(self.stageHeight);
			if(self.thumbnailsManager_do && self.showThumbnails_bl) self.thumbnailsManager_do.positionAndResize();
			
		
			clearTimeout(self.resizeHandlerId_to);
			self.resizeHandlerId_to = setTimeout(self.checkStageSizeAndResize, 50);
		};
		
		self.checkStageSizeAndResize = function(){
			self.ws = FWDRLUtils.getViewportSize();
			if(self.stageWidth != self.ws.w) self.resizeHandler();
		};
	
		//#############################################//
		/* setup data */
		//#############################################//
		self.setupData = function(){
			FWDRLData.setPrototype();
			self.data = new FWDRLData(self.props_obj, self.rootElement_el, self);
			
			self.DFVideoControllerBackgroundColor_str = self.data.videoControllerBackgroundColor_str;
			self.DFVideoPosterBackgroundColor_str = self.data.videoPosterBackgroundColor_str;
			self.DFAudioControllerBackgroundColor_str = self.data.audioControllerBackgroundColor_str;
			
			self.data.addListener(FWDRLData.PRELOADER_LOAD_DONE, self.onPreloaderLoadDone);
			self.data.addListener(FWDRLData.LOAD_ERROR, self.dataLoadError);
			self.data.addListener(FWDRLData.SKIN_LOAD_COMPLETE, self.dataSkinLoadComplete);
		};
		
		self.onPreloaderLoadDone = function(){
			self.setupPreloader();
			if(self.isShowed_bl){
				self.positionPreloader();
				self.preloader_do.show(true);
				self.resizeHandler();
			}
		};
		
		self.dataLoadError = function(e){
			if(self.preloader_do) self.preloader_do.hide(false);
			self.main_do.addChild(self.info_do);
			self.info_do.showText(e.text);
			setTimeout(self.resizeHandler, 200);
			FWDRL.dispatchEvent(FWDRL.ERROR, {error:e.text});
		};
		
		self.dataSkinLoadComplete = function(){	
			self.isReady_bl = true;
			self.useVideo_bl = self.data.useVideo_bl;
			self.useAudio_bl = self.data.useAudio_bl;
			self.setupMainStuff();
			clearTimeout(self.showOrHideCompleteId_to);
			self.showOrHideCompleteId_to = setTimeout(self.showComplete, 800);
			setTimeout(function(){
				FWDRL.dispatchEvent(FWDRL.READY);
			}, 800);
		};
		
		//#############################################//
		/* Setup main instances */
		//#############################################//
		self.setupMainStuff = function(){
			self.setupButtons();
			self.setupShareButtons();
			self.setupTimerManager();
			if(self.data.useVideo_bl) self.setupVideoPlayer();
			if(self.data.useAudio_bl) self.setupAudioPlayer();
			
			self.hideStuffForGood();
		};
		
		//###########################################//
		/* Setup video player */
		//###########################################//
		self.setupVideoPlayer = function(){
			self.videoHolder_do = new FWDRLDisplayObject("div");
			self.videoHolder_do.setWidth(500);
			self.videoHolder_do.setHeight(500);
			self.mainItemHolder_do.addChildAt(self.videoHolder_do, 3);
		
			self.video_do = new FWDRLEVPlayer(self.videoHolder_do.screen, self.data);
			self.video_do.addListener(FWDRLEVPlayer.ERROR, self.videoErrorHandler);
			self.video_do.addListener(FWDRLEVPlayer.GO_FULLSCREEN, self.videoFullScreenHandler);
			self.video_do.addListener(FWDRLEVPlayer.GO_NORMALSCREEN, self.videoNormalScreenHandler);
		};
		
		self.videoErrorHandler = function(e){
			self.main_do.addChild(self.info_do);
			self.info_do.showText(e.error);	
		};
		
		
		self.videoFullScreenHandler = function(){
			self.isVideoFullScreen_bl = true;
			self.resizeCurrentItem();
			self.mainItemHolder_do.getStyle().overflow = "visible";
			self.setButtonsInvisible();
			if(self.addKeyboardSupport_bl) self.removeKeyboardSupport();
			if(self.isMobile_bl) self.removeSwipeSupport();
		};
		
		self.videoNormalScreenHandler = function(){
			self.isVideoFullScreen_bl = false;
			self.resizeCurrentItem();
			self.mainItemHolder_do.getStyle().overflow = "hidden";
			self.setButtonsVisible();
			if(self.addKeyboardSupport_bl) self.addKeyboardSupport();
			if(self.isMobile_bl) self.addSwipeSupport();
		};
		
		//############################################//
		/* Setup audio player */
		//############################################//
		self.setupAudioPlayer = function(){
			self.audioHolder_do = new FWDRLDisplayObject("div");
			self.audioHolder_do.hasTransform3d_bl = false;
			self.audioHolder_do.hasTransform2d_bl = false;
			self.audioHolder_do.setWidth(500);
			self.audioHolder_do.setHeight(500);
			self.audioHolder_do.setHeight(self.data.audioControllerHeight);
			self.mainItemHolder_do.addChildAt(self.audioHolder_do, 3);
			self.mainItemHolder_do.addChildAt(self.audioHolder_do, 3);
		
			self.audio_do = new FWDRLEAP(self.audioHolder_do.screen, self.data);
			self.audio_do.addListener(FWDRLEAP.ERROR, self.videoErrorHandler);
		};
		
		//############################################//
		/* Setup slideshow timer */
		//###########################################//
		self.setupTimerManager = function(){
			FWDRLTimerManager.setProtptype();
			self.tm = new FWDRLTimerManager(self.slideShowDelay);
			self.tm.addListener(FWDRLTimerManager.STOP, self.tmStopHandler);
			self.tm.addListener(FWDRLTimerManager.START, self.tmStartHandler);
			self.tm.addListener(FWDRLTimerManager.PAUSE, self.tmPauseHandler);
			self.tm.addListener(FWDRLTimerManager.RESUME, self.tmResumeHandler);
			self.tm.addListener(FWDRLTimerManager.TIME, self.tmTimeHandler);
		};
		
		self.tmStopHandler = function(){
			self.slideShowButton_do.setButtonState(1);
			if(self.showSlideShowAnimation_bl){
				self.hideSlideShowAnimation();
				self.positionButtons(true);
			}
			self.showSlideShowAnimation_bl = false;
		};
		
		self.tmStartHandler = function(){
			self.slideShowButton_do.setButtonState(0);
			if(!self.showSlideShowAnimation_bl){
				self.showSlideShowAnimation();
				self.positionButtons(true);
				self.slp_do.animShow();
			}
			self.showSlideShowAnimation_bl = true;
		};
		
		self.tmPauseHandler = function(){
			if(self.showSlideShowAnimation_bl) self.slp_do.animHide();
		};
		
		self.tmResumeHandler = function(){
			if(self.showSlideShowAnimation_bl) self.slp_do.animShow();
		};
		
		self.tmTimeHandler = function(){
			self.gotoNextItem();
			if(self.showSlideShowAnimation_bl) self.slp_do.animHide();
		};
	
		//############################################//
		/* setup deeplink */
		//############################################//
		self.setupDL = function(){
			FWDAddress.onChange = self.dlChangeHandler;
			self.dlChangeHandler();
		};
		
		self.dlChangeHandler = function(){
			//if(self.so) window.scrollTo(self.so.x, self.so.y);
			
			if(!self.isReady_bl || self.isAnim_bl || self.isAnimMaximizeOrMinimize_bl || !self.useDeepLinking_bl) return;
			
			if(self.isMaximized_bl){
				self.maximizeOrMinimize();
				return;
			}
			
		
			var playlistName_str = FWDAddress.getParameter("rl_playlist");
			var playlistId = FWDAddress.getParameter("rl_id");
			
			if(location.href.indexOf("youtube.com") != -1){
				playlistName_str = location.href;
				playlistName_str = playlistName_str.match(/https:.*/i)[0];
				if(playlistName_str.indexOf("rl_id=")){
					playlistName_str = playlistName_str.replace(/&rl_id=.*/, "");
				}
			}else if(location.href.indexOf("facebook.com") != -1){
				playlistName_str = location.href;
				playlistName_str = playlistName_str.match(/https:.*/i)[0];
				if(playlistName_str.indexOf("rl_id=")){
					playlistName_str = playlistName_str.replace(/&rl_id=.*/, "");
				}
			}
			
			sObjVariableName_str = FWDAddress.getParameter("rl_propsobj");
			
			if(!self.isShowed_bl){
				if(location.href.indexOf("RL?") != -1 && playlistName_str && playlistId){
					FWDRL.show(playlistName_str, playlistId, self.propsObjVariableName_str);
				}
				return;
			}else{
				if(location.href.indexOf("RL?") == -1 || !playlistName_str || !playlistId){
					self.hide();
					return;
				}
			}
			
			self.id = parseInt(FWDAddress.getParameter("rl_id"));
		
			if(self.id == self.prevId) return;
			
			if(self.id < 0){
				self.id = 0;
				if(self.propsObjVariableName_str){
					FWDAddress.setValue("RL?rl_playlist=" + self.playlistDomOrObj_str + "&rl_id=" + self.id + "&rl_propsobj=" + self.propsObjVariableName_str);
				}else{
					FWDAddress.setValue("RL?rl_playlist=" + self.playlistDomOrObj_str + "&rl_id=" + self.id);
				}
				return;
			}else if(self.id > self.totalItems - 1){
				self.id = self.totalItems - 1;
				if(self.propsObjVariableName_str){
					FWDAddress.setValue("RL?rl_playlist=" + self.playlistDomOrObj_str + "&rl_id=" + self.id + "&rl_propsobj=" + self.propsObjVariableName_str);
				}else{
					FWDAddress.setValue("RL?rl_playlist=" + self.playlistDomOrObj_str + "&rl_id=" + self.id);
				}
				return;
			}
			
			self.createAndShowItem();
			self.prevId = self.id;
		};
		
		//#############################################//
		/* setup preloader */
		//#############################################//
		self.setupPreloader = function(){
			FWDRLPreloader.setPrototype();
			self.preloader_do = new FWDRLPreloader(self.data.mainPreloader_img, 38, 38, 30, 36, true);
			self.main_do.addChild(self.preloader_do);
		};
		
		self.positionPreloader = function(){
			self.preloader_do.setX(parseInt((self.stageWidth - self.preloader_do.w )/2));		
			if(self.thumbnailsManager_do && self.thumbnailsManager_do.areThumbnailsCreated_bl && self.areThumbnailsShowed_bl){
				self.preloader_do.setY(parseInt((self.stageHeight - self.preloader_do.h - self.thumbnailH)/2));
			}else{
				self.preloader_do.setY(parseInt((self.stageHeight - self.preloader_do.h)/2));
			}
		};
		
		//#############################################//
		/* Setup thumbnail manager */
		//#############################################//
		self.setupThumbnailManager = function(){
			if(self.thumbnailsManager_do) return;
			FWDRLThumbnailsManager.setPrototype();
			self.thumbnailsManager_do = new FWDRLThumbnailsManager(self);
			self.thumbnailsManager_do.addListener(FWDRLThumb.CLICK, self.thumbClickHandler);
			self.main_do.addChildAt(self.thumbnailsManager_do, 1);
		};
		
		self.hideOrShowThumbnails = function(){
			if(self.areThumbnailsShowed_bl){
				self.hsThumbanilsButton_do.setButtonState(0);
				self.thumbnailsManager_do.hide(true);
				self.areThumbnailsShowed_bl = false;
			}else{
				self.hsThumbanilsButton_do.setButtonState(1);
				self.thumbnailsManager_do.show(true);
				self.areThumbnailsShowed_bl = true;
			}
			self.hideShareButtons(true);

			self.resizeCurrentItem(false, true);
			self.positionButtons(true);
			self.startAnim(801);
		};
		
		self.thumbClickHandler = function(e){
			self.gotoToItem(e.id);
		};
		
		self.setupThumbnails = function(delay){
			setTimeout(function(){
				if(self.thumbnailsManager_do && self.showThumbnails_bl) self.thumbnailsManager_do.setupThumbnails();
			}, delay);
		};
		
		//#############################################//
		/* Setup buttons */
		//#############################################//
		self.setupButtons = function(){
			
			self.buttons_ar = [];
			self.buttonsMaxW_ar = [];
			
			FWDRLSimpleButton.setPrototype();
			self.closeButton_do = new FWDRLSimpleButton(self.data.closeN_img, self.data.closeSPath_str);
			self.closeButton_do.addListener(FWDRLSimpleButton.MOUSE_UP, self.closeButtonOnMouseUpHandler);
			self.buttonsMaxW_ar.push(self.closeButton_do);
			self.main_do.addChild(self.closeButton_do); 

			FWDRLComplexButton.setPrototype();
			self.zoomButton_do = new FWDRLComplexButton(
					self.data.maximizeN_img, 
					self.data.maximizeSPath_str, 
					self.data.minimizeN_img, 
					self.data.minimizeSPath_str, 
					true);
			self.zoomButton_do.addListener(FWDRLComplexButton.MOUSE_UP, self.zoomButtonOnMouseUpHandler);
			self.buttonsMaxW_ar.push(self.zoomButton_do);
			self.main_do.addChild(self.zoomButton_do); 
			
			FWDRLComplexButton.setPrototype();
			self.descButton_do = new FWDRLComplexButton(
					self.data.infoOpenN_img, 
					self.data.infoOpenS_str, 
					self.data.infoCloseN_img, 
					self.data.infoCloseS_str, 
					true);
			self.descButton_do.addListener(FWDRLComplexButton.MOUSE_UP, self.descButtonOnMouseUpHandler);
			self.buttonsMaxW_ar.push(self.descButton_do);
			self.main_do.addChild(self.descButton_do); 
			
			FWDRLComplexButton.setPrototype();
			self.slideShowButton_do = new FWDRLComplexButton(
					self.data.playN_img, 
					self.data.playS_str, 
					self.data.pauseN_img, 
					self.data.pauseS_str, 
					true);
			self.slideShowButton_do.addListener(FWDRLComplexButton.MOUSE_UP, self.slideshowButtonOnMouseUpHandler);
			self.buttonsMaxW_ar.push(self.slideShowButton_do);
			self.main_do.addChild(self.slideShowButton_do); 
			
			FWDRLSlideShowPreloader.setPrototype();
			self.slp_do = new FWDRLSlideShowPreloader(self.data.slideSwowImage_img, 30, 29, 60, self.slideShowDelay);
			self.buttonsMaxW_ar.push(self.slp_do);
			self.main_do.addChild(self.slp_do); 
			
			FWDRLComplexButton.setPrototype();
			self.shareButton_do = new FWDRLComplexButton(
					self.data.showShareImage_img, 
					self.data.showShareImageSPath_str, 
					self.data.hideShareImage_img, 
					self.data.hideShareImageSPath_str, 
					true);
			
			self.shareButton_do.addListener(FWDRLComplexButton.MOUSE_UP, self.shareButtonOnMouseUpHandler);	
			self.buttonsMaxW_ar.push(self.shareButton_do);
			self.main_do.addChild(self.shareButton_do);
			
			FWDRLSimpleButton.setPrototype();
			self.nextButton_do = new FWDRLSimpleButton(self.data.nextN_img, self.data.nextSPath_str);
			self.nextButton_do.addListener(FWDRLSimpleButton.MOUSE_UP, self.nextButtonOnMouseUpHandler);	
			self.buttonsMaxW_ar.push(self.nextButton_do);
			self.main_do.addChild(self.nextButton_do);
			
			FWDRLSimpleButton.setPrototype();
			self.prevButton_do = new FWDRLSimpleButton(self.data.prevN_img, self.data.prevSPath_str);
			self.prevButton_do.addListener(FWDRLSimpleButton.MOUSE_UP, self.prevButtonOnMouseUpHandler);
			self.buttonsMaxW_ar.push(self.prevButton_do);
			self.main_do.addChild(self.prevButton_do); 
			
			FWDRLComplexButton.setPrototype();
			self.hsThumbanilsButton_do = new FWDRLComplexButton(
					self.data.hideThumbnailsN_img, 
					self.data.hideThumbnailsSPath_str, 
					self.data.showThumbnailsN_img, 
					self.data.showThumbnailsSPath_str, 
					true);
			self.hsThumbanilsButton_do.addListener(FWDRLComplexButton.MOUSE_UP, self.hsButtonOnMouseUpHandler);
			self.buttonsMaxW_ar.push(self.hsThumbanilsButton_do);
			self.main_do.addChild(self.hsThumbanilsButton_do); 
			
			for(var i=0; i<self.buttonsMaxW_ar.length; i++){
				if(self.maxButtonW < self.buttonsMaxW_ar[i].h) self.maxButtonW = self.buttonsMaxW_ar[i].w;
			}
		};
		
		self.closeButtonOnMouseUpHandler = function(){
			self.hide();
		};
		
		self.zoomButtonOnMouseUpHandler = function(e){
			self.maximizeOrMinimize();
		};
		
		self.shareButtonOnMouseUpHandler = function(){
			if(self.shareButton_do.currentState == 1){
				if(self.areButtonsShowed_bl) self.showShareButtons(true);
			}else{
				self.hideShareButtons(true);
			}
		};
		
		self.nextButtonOnMouseUpHandler = function(){
			self.gotoNextItem();
		};
		
		self.prevButtonOnMouseUpHandler = function(){
			self.gotoPrevItem();
		};
		
		self.descButtonOnMouseUpHandler = function(){
			if(self.isAnim_bl) return;
			self.hideShareButtons(true);
			if(self.showDescription_bl){
				self.showDescription_bl = false;
				self.descButton_do.setButtonState(1);
				self.desc_do.hide(true);
			}else{
				self.showDescription_bl = true;
				self.descButton_do.setButtonState(0);
				self.desc_do.show(true);
			}
		};
		
		self.slideshowButtonOnMouseUpHandler = function(){
			if(self.tm.isStopped_bl){
				self.tm.start();
				self.hideShareButtons(true);
			}else{
				self.tm.stop();
			}			
		};
		
		self.hsButtonOnMouseUpHandler = function(){
		
			if(!self.isMobile_bl 
				&& self.stageWidth < self.thumbnailsManager_do.totalW + ((self.hsThumbanilsButton_do.w + self.buttonsOffsetIn) * 2)
				|| self.buttonsAlignment_str == FWDRL.BUTTONS_IN){
				self.disableClick();
			}
			self.hideOrShowThumbnails();
		};
		
		//########################################//
		/* Setup share buttons*/
		//########################################//
		this.setupShareButtons = function(){
			
			var button;
			this.maxShareButtonsW = 0;
			
			this.shareButtonsHolder_do = new FWDRLDisplayObject("div");
			this.shareButtonsHolder_do.setOverflow("visible");
			this.shareButtons_ar = [];
			//this.shareButtonsHolder_do.setBkColor("#FF0000");
			self.main_do.addChild(self.shareButtonsHolder_do); 
			
			FWDRLSimpleButton.setPrototype();
			self.facebookButtonButton_do = new FWDRLSimpleButton(self.data.facebookN_img, self.data.facebookImageSPath_str);
			self.facebookButtonButton_do.addListener(FWDRLSimpleButton.MOUSE_UP, self.facebookButtonOnMouseUpHandler);
			self.shareButtonsHolder_do.addChild(self.facebookButtonButton_do); 
			this.shareButtons_ar.push(self.facebookButtonButton_do);
			
			FWDRLSimpleButton.setPrototype();
			self.twitterButtonButton_do = new FWDRLSimpleButton(self.data.twitterN_img, self.data.twitterImageSPath_str);
			self.twitterButtonButton_do.addListener(FWDRLSimpleButton.MOUSE_UP, self.twitterButtonOnMouseUpHandler);
			self.shareButtonsHolder_do.addChild(self.twitterButtonButton_do); 
			this.shareButtons_ar.push(self.twitterButtonButton_do);
			
			FWDRLSimpleButton.setPrototype();
			self.googleButtonButton_do = new FWDRLSimpleButton(self.data.googleN_img, self.data.googleImageSPath_str);
			self.googleButtonButton_do.addListener(FWDRLSimpleButton.MOUSE_UP, self.googleButtonOnMouseUpHandler);
			self.shareButtonsHolder_do.addChild(self.googleButtonButton_do); 
			this.shareButtons_ar.push(self.googleButtonButton_do);
			
			for(var i=0; i<this.shareButtons_ar.length; i++){
				button = this.shareButtons_ar[i];
				if(button.w > this.maxShareButtonsW) this.maxShareButtonsW = button.w;
			}
			
			for(var i=0; i<this.shareButtons_ar.length; i++){
				button = this.shareButtons_ar[i];
				button.setX(parseInt((this.maxShareButtonsW - button.w)/2));

				if(i == 0){
					button.setY(self.spaceBetweenButtons);
				}else{
					button.setY(this.shareButtons_ar[i - 1].y +  this.shareButtons_ar[i - 1].h + self.spaceBetweenButtons);
				}
			}
			
			this.shareButtonsHolder_do.setWidth(this.maxShareButtonsW);
			this.shareButtonsHolder_do.setHeight(button.y + button.h);
			this.hideShareButtons(false);
		};
		
		self.facebookButtonOnMouseUpHandler = function(e){
			var url = "http://www.facebook.com/share.php?u=" + encodeURIComponent(location.href);
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
		};
		
		self.twitterButtonOnMouseUpHandler = function(e){
			var url = "http://twitter.com/home?status=" + encodeURIComponent(location.href)
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
		};
		
		self.googleButtonOnMouseUpHandler = function(e){
			//https://plus.google.com/share?url=[URL]
			var url = "https://plus.google.com/share?url=" + encodeURIComponent(location.href)
			window.open(url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
		};
		
		this.positionShareButtons = function(animate){
			if(!this.shareButtonsHolder_do || this.shareButton_do.finalX == undefined) return;
			this.shareButtonsHolder_do.finalX = this.shareButton_do.finalX;
			this.shareButtonsHolder_do.finalY = this.shareButton_do.finalY + this.shareButton_do.h;
			
			FWDAnimation.killTweensOf(self.shareButtonsHolder_do);
			if(animate){
				FWDAnimation.to(self.shareButtonsHolder_do, .8, {x:this.shareButtonsHolder_do.finalX, y:this.shareButtonsHolder_do.finalY, ease:Expo.easeInOut});
			}else{
				this.shareButtonsHolder_do.setX(this.shareButtonsHolder_do.finalX);
				this.shareButtonsHolder_do.setY(this.shareButtonsHolder_do.finalY);
			}
		};
		
		this.showShareButtons = function(){
			var dl=0;
			var button;
			
			this.areButtonsSharedShowed_bl = true;
			
			self.shareButton_do.setButtonState(0);
			
			this.positionShareButtons(false);
			this.shareButtonsHolder_do.setVisible(true);
			
			if(this.nextButton_do){
				if(this.shareButtonsHolder_do.y + this.shareButtonsHolder_do.h + self.spaceBetweenButtons > this.nextButton_do.y){
					FWDAnimation.to(self.nextButton_do.buttonsHolder_do, .8, {alpha:0, ease:Expo.easeInOut});
				}
			}
			
			if(this.hsThumbanilsButton_do){
				if(this.shareButtonsHolder_do.y + this.shareButtonsHolder_do.h + self.spaceBetweenButtons > this.hsThumbanilsButton_do.y
				   && this.shareButtonsHolder_do.x == this.hsThumbanilsButton_do.x){
					FWDAnimation.to(self.hsThumbanilsButton_do.buttonsHolder_do, .8, {alpha:0, ease:Expo.easeInOut});
				}
			}
			
			for(var i=0; i<this.shareButtons_ar.length; i++){
				button = this.shareButtons_ar[i];
				FWDAnimation.killTweensOf(button);
				button.setAlpha(0);
				FWDAnimation.to(button, .8, {alpha:1, delay:dl, ease:Expo.easeInOut});	
				dl += .1;
			}
			
			this.startToCheckShareButtonsHit();
		};
		
		
		this.startToCheckShareButtonsHit = function(){
			//if(!FWDRLUtils.isMobile) return;
			if(window.addEventListener){
				window.addEventListener("click", self.checkThumbnailHit);
			}else{
				window.attachEvent("onclick", self.checkThumbnailHit);
			}
			
		};
		
		this.stopToCheckShareButtonsHit = function(){
			//if(!FWDRLUtils.isMobile || !self.shareButtonsHolder_do) return;
			
			if(window.removeEventListener){
				window.removeEventListener("click", self.checkThumbnailHit);
			}else{
				window.detachEvent("onclick", self.checkThumbnailHit);
			}
		
			if(this.shareButton_do) this.shareButton_do.setNormalState(true);
			
			clearTimeout(self.hitThhumbnailId_to);
			self.hideShareButtons(true);
		};
		
		this.checkThumbnailHit = function(e){
			var vc = FWDRLUtils.getViewportMouseCoordinates(e);	
			if(!FWDRLUtils.hitTest(self.shareButtonsHolder_do.screen, vc.screenX, vc.screenY)
			&& !FWDRLUtils.hitTest(self.shareButton_do.screen, vc.screenX, vc.screenY)){
				self.stopToCheckShareButtonsHit();
				return;
			}
		};
		
		this.hideShareButtons = function(animate, hideToRight, doNotShowOtherOpacity){
			
			if(!this.shareButton_do) return;
			var button;
			this.areButtonsSharedShowed_bl = false;
			
			self.shareButton_do.setButtonState(1);
			
			if(!animate){
				this.shareButtonsHolder_do.setVisible(false);
			}
			
			if(hideToRight){
				FWDAnimation.to(self.shareButtonsHolder_do, .8, {x:self.stageWidth, ease:Expo.easeInOut});
			}else{
				for(var i=0; i<this.shareButtons_ar.length; i++){
					button = this.shareButtons_ar[i];
					FWDAnimation.killTweensOf(button);
					FWDAnimation.to(button, .8, {alpha:0, ease:Expo.easeOut, onComplete:function(){
						self.shareButtonsHolder_do.setVisible(false);
					}});	
				}
				
				if(this.nextButton_do){
					if(this.shareButtonsHolder_do.y + this.shareButtonsHolder_do.h + self.spaceBetweenButtons > this.nextButton_do.y
					  && this.shareButton_do.buttonsHolder_do.alpha == 1){
						FWDAnimation.to(self.nextButton_do.buttonsHolder_do, .8, {alpha:1, ease:Expo.easeOut});
					}
				}
				
				if(this.hsThumbanilsButton_do){
					if(this.shareButtonsHolder_do.y + this.shareButtonsHolder_do.h  + self.spaceBetweenButtons > this.hsThumbanilsButton_do.y
							&& this.shareButton_do.buttonsHolder_do.alpha == 1 ){
						FWDAnimation.to(self.hsThumbanilsButton_do.buttonsHolder_do, .8, {alpha:1, ease:Expo.easeOut});
					}
				}
			}
		};
		
		//########################################//
		/* Show / hide buttons if available */
		//########################################//
		self.showCloseButton = function(){
			if(!self.showCloseButton_bl) return;
			if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.closeButton_do) == -1){
				self.buttons_ar.splice(0, 0, self.closeButton_do);
			}
		};
		
		self.hideCloseButton = function(){
			//if(!self.showCloseButton_bl) return;
			if(FWDRLUtils.indexOfArray(self.buttons_ar, self.closeButton_do) != -1){
				FWDAnimation.killTweensOf(self.zoomButton_do);
				self.closeButton_do.setX(-5000);
				self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.closeButton_do), 1);
			}
			
		};
		
		self.hideZoomButton = function(){
			//if(!self.defaultShowZoomButton_bl) return;
			
			if(FWDRLUtils.indexOfArray(self.buttons_ar, self.zoomButton_do) != -1){
				FWDAnimation.killTweensOf(self.zoomButton_do);
				self.zoomButton_do.setX(-5000);
				self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.zoomButton_do), 1);
			}
		};
		
		self.showZoomButton = function(){
			if(!self.defaultShowZoomButton_bl) return;
			if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.zoomButton_do) == -1){
				FWDAnimation.killTweensOf(self.zoomButton_do);
				if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.closeButton_do) != -1){
					self.zoomButton_do.setX(self.closeButton_do.x);
					self.zoomButton_do.setY(self.closeButton_do.y + self.closeButton_do.h + self.spaceBetweenButtons);
					self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.closeButton_do) + 1, 0, self.zoomButton_do);
				}else{
					if(self.isFirstItemShowed_bl){
						self.zoomButton_do.setX(self.mainItemHolder_do.x + self.mainItemHolder_do.w + self.buttonsOffsetIn);
						self.zoomButton_do.setY(self.mainItemHolder_do.y);
					}
					self.buttons_ar.splice(0, 0, self.zoomButton_do);
				}
			}
		};
		
		self.showDescriptionButton = function(){
			if(!self.defaultHideDescriptionButtons_bl) return;
			
			self.showDescriptionButton_bl = true;
			if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.descButton_do) == -1){
				FWDAnimation.killTweensOf(self.descButton_do);
				if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.zoomButton_do) != -1){
					self.descButton_do.setX(self.zoomButton_do.x);
					self.descButton_do.setY(self.zoomButton_do.y + self.zoomButton_do.h + self.spaceBetweenButtons);
					self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.zoomButton_do) + 1, 0, self.descButton_do);
				}else if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.closeButton_do) != -1){
					self.descButton_do.setX(self.closeButton_do.x);
					self.descButton_do.setY(self.closeButton_do.y + self.closeButton_do.h + self.spaceBetweenButtons);
					self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.closeButton_do) + 1, 0, self.descButton_do);
				}else{
					if(self.isFirstItemShowed_bl){
						self.descButton_do.setX(self.mainItemHolder_do.x + self.mainItemHolder_do.w + self.buttonsOffsetIn);
						self.descButton_do.setY(self.mainItemHolder_do.y);
					}
					self.buttons_ar.splice(0, 0, self.descButton_do);
				}
			}
		};
		
		self.hideDescriptionButton = function(){
			//if(!self.defaultHideDescriptionButtons_bl) return;
			if(FWDRLUtils.indexOfArray(self.buttons_ar, self.descButton_do) != -1){
				self.showDescriptionButton_bl = false;
				FWDAnimation.killTweensOf(self.descButton_do);
				self.descButton_do.setX(-5000);
				self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.descButton_do), 1);
			}
		};
		
		
		self.hideSlideshowButton = function(){
			//if(!self.showSlideShowButton_bl) return;	
			if(FWDRLUtils.indexOfArray(self.buttons_ar, self.slideShowButton_do) != -1){
				FWDAnimation.killTweensOf(self.slideShowButton_do);
				self.slideShowButton_do.setX(-5000);
				self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.slideShowButton_do), 1);
			}
		};
		
		self.showSlideshowButton = function(){
			if(!self.showSlideShowButton_bl) return;
			if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.slideShowButton_do) == -1){
				FWDAnimation.killTweensOf(self.slideShowButton_do);
				if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.descButton_do) != -1){
					self.slideShowButton_do.setX(self.descButton_do.x);
					self.slideShowButton_do.setY(self.descButton_do.y + self.descButton_do.h + self.spaceBetweenButtons);
					self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.descButton_do) + 1, 0, self.slideShowButton_do);
				}else if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.zoomButton_do) != -1){
					self.slideShowButton_do.setX(self.zoomButton_do.x);
					self.slideShowButton_do.setY(self.zoomButton_do.y + self.zoomButton_do.h + self.spaceBetweenButtons);
					self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.zoomButton_do) + 1, 0, self.slideShowButton_do);
				}else if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.closeButton_do) != -1){
					self.slideShowButton_do.setX(self.closeButton_do.x);
					self.slideShowButton_do.setY(self.closeButton_do.y + self.closeButton_do.h + self.spaceBetweenButtons);
					self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.closeButton_do) + 1, 0, self.slideShowButton_do);
				}else{
					if(self.isFirstItemShowed_bl){
						self.slideShowButton_do.setX(self.mainItemHolder_do.x + self.mainItemHolder_do.w + self.buttonsOffsetIn);
						self.slideShowButton_do.setY(self.mainItemHolder_do.y);
					}
					self.buttons_ar.splice(0, 0, self.slideShowButton_do);
				}
			}
		};
		
		self.hideSlideShowAnimation = function(){
			//if(!self.defaultShowSlideShowAnimation_bl) return;
			if(FWDRLUtils.indexOfArray(self.buttons_ar, self.slp_do) != -1){
				FWDAnimation.killTweensOf(self.slp_do);
				self.slp_do.setX(-5000);
				self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.slp_do), 1);
			}
		};
		
		self.showSlideShowAnimation = function(){
			if(!self.defaultShowSlideShowAnimation_bl) return;
			if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.slp_do) == -1){
				FWDAnimation.killTweensOf(self.slp_do);
				if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.slideShowButton_do) != -1){
					self.slp_do.setX(self.slideShowButton_do.x);
					self.slp_do.setY(self.slideShowButton_do.y + self.slideShowButton_do.h + self.spaceBetweenButtons);
					self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.slideShowButton_do) + 1, 0, self.slp_do);
				}else if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.descButton_do) != -1){
					self.slp_do.setX(self.descButton_do.x);
					self.slp_do.setY(self.descButton_do.y + self.descButton_do.h + self.spaceBetweenButtons);
					self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.descButton_do) + 1, 0, self.slp_do);
				}else if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.zoomButton_do) != -1){
					self.slp_do.setX(self.zoomButton_do.x);
					self.slp_do.setY(self.zoomButton_do.y + self.zoomButton_do.h + self.spaceBetweenButtons);
					self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.zoomButton_do) + 1, 0, self.slp_do);
				}else if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.closeButton_do) != -1){
					self.slp_do.setX(self.closeButton_do.x);
					self.slp_do.setY(self.closeButton_do.y + self.closeButton_do.h + self.spaceBetweenButtons);
					self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.closeButton_do) + 1, 0, self.slp_do);
				}else{
					if(self.isFirstItemShowed_bl){
						self.slp_do.setX(self.mainItemHolder_do.x + self.mainItemHolder_do.w + self.buttonsOffsetIn);
						self.slp_do.setY(self.mainItemHolder_do.y);
					}
					self.buttons_ar.splice(0, 0, self.slp_do);
				}
			}
		};
		
		self.hideFacebookButton = function(){
			//if(!self.showShareButton_bl) return;
			if(FWDRLUtils.indexOfArray(self.buttons_ar, self.shareButton_do) != -1){
				FWDAnimation.killTweensOf(self.shareButton_do);
				self.shareButton_do.setX(-5000);
				self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.shareButton_do), 1);
			}
		};
		
		
		self.showShareButton = function(){
			if(!self.showShareButton_bl) return;
			if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.shareButton_do) == -1){
				if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.slp_do) != -1){
					self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.slp_do) + 1, 0, self.shareButton_do);
				}else if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.slideShowButton_do) != -1){
					self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.slideShowButton_do) + 1, 0, self.shareButton_do);
				}else if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.descButton_do) != -1){
					self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.descButton_do) + 1, 0, self.shareButton_do);
				}else if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.zoomButton_do) != -1){
					self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.zoomButton_do) + 1, 0, self.shareButton_do);
				}else if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.closeButton_do) != -1){
					self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.closeButton_do) + 1, 0, self.shareButton_do);
				}else{
					self.buttons_ar.splice(0, 0, self.shareButton_do);
				}
			}
		};
		
		
		self.hideNextAndPrevButtons = function(){
			//if(!self.defaultShowNextAndPrevButtons_bl) return;
			if(FWDRLUtils.indexOfArray(self.buttons_ar, self.nextButton_do) != -1){
				FWDAnimation.killTweensOf(self.nextButton_do);
				FWDAnimation.killTweensOf(self.prevButton_do);
				self.prevButton_do.setX(-5000);
				self.nextButton_do.setX(-5000);
				self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.nextButton_do), 1);
			}
		};
		
		self.showNextAndPrevButtons = function(){
			if(!self.defaultShowNextAndPrevButtons_bl || !self.showNextAndPrevButtons_bl) return;
			if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.nextButton_do) == -1){
				if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.shareButton_do) != -1){
					self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.shareButton_do) + 1, 0, self.nextButton_do);
				}else if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.slp_do) != -1){
					self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.slp_do) + 1, 0, self.nextButton_do);
				}else if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.slideShowButton_do) != -1){
					self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.slideShowButton_do) + 1, 0, self.nextButton_do);
				}else if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.descButton_do) != -1){
					self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.descButton_do) + 1, 0, self.nextButton_do);
				}else if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.zoomButton_do) != -1){
					self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.zoomButton_do) + 1, 0, self.nextButton_do);
				}else if(FWDRLUtils.indexOfArray(self.buttons_ar,  self.closeButton_do) != -1){
					self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.closeButton_do) + 1, 0, self.nextButton_do);
				}else{
					self.buttons_ar.splice(0, 0, self.nextButton_do);
				}
			}
		};
		
		self.hideHsThumbnailButton = function(){	
			//if(!self.showThumbnailsHideOrShowButton_bl) return;
			if(FWDRLUtils.indexOfArray(self.buttons_ar, self.hsThumbanilsButton_do) != -1){
				FWDAnimation.killTweensOf(self.hsThumbanilsButton_do);
				self.hsThumbanilsButton_do.setX(-5000);
				self.buttons_ar.splice(FWDRLUtils.indexOfArray(self.buttons_ar, self.hsThumbanilsButton_do), 1);
			}
		};
		
		self.showHsThumbnailButton = function(){	
			if(!self.showThumbnailsHideOrShowButton_bl) return;
			if(FWDRLUtils.indexOfArray(self.buttons_ar, self.hsThumbanilsButton_do) == -1){
				self.buttons_ar.splice(self.buttons_ar.length , 0, self.hsThumbanilsButton_do);
			}
		};
		
		//#######################################//
		/* Position buttons */
		//######################################//
		self.positionButtons = function(animate){
			if(!self.isFirstItemShowed_bl || !self.isShowed_bl || !self.isReady_bl) return;
			var offsetY = 0;
			var totalButtonsHeight = 0;
			
			if(self.areThumbnailsShowed_bl){
				offsetY = Math.round((self.thumbnailH + self.spaceBetweenThumbnailsAndItem)/2 - self.spaceBetweenThumbnailsAndItem/2);
			}
		
			if(self.showNextAndPrevButtons_bl){
				if(self.buttonsAlignment_str == FWDRL.BUTTONS_IN){
					self.prevButton_do.finalX = self.finalX - self.prevButton_do.w - self.buttonsOffsetIn;
				}else{
					self.prevButton_do.finalX = self.buttonsOffsetIn;
				}
				self.prevButton_do.finalY = parseInt((self.stageHeight - self.prevButton_do.h)/2) - offsetY;
				if(self.prevButton_do.finalX == undefined) self.prevButton_do.finalX = -5000;
				if(self.prevButton_do.finalY == undefined) self.prevButton_do.finalY = -5000;
			}
			
			var button;
			var prevButton;
			var totalButtons = self.buttons_ar.length;
			
			for(var j=0; j<totalButtons; j++){
				button = self.buttons_ar[j];
				if(!button) continue;
				totalButtonsHeight += button.h + self.spaceBetweenButtons;
			}
			totalButtonsHeight -= self.spaceBetweenButtons;
		
			for(var i=0; i<totalButtons; i++){
			
				button = self.buttons_ar[i];
				if(!button) continue;
				if(i != 0) prevButton = self.buttons_ar[i-1];
				if(self.buttonsAlignment_str == FWDRL.BUTTONS_IN){
					button.finalX  = self.finalX + self.finalW + self.buttonsOffsetIn;
				}else{
					button.finalX  = self.stageWidth - button.w - self.buttonsOffsetIn;
				}
				
				if(totalButtonsHeight > self.finalH && self.buttonsAlignment_str == FWDRL.BUTTONS_IN){
					if(i == 0){
						if(self.buttonsAlignment_str == FWDRL.BUTTONS_IN){
							if(self.areThumbnailsShowed_bl){
								button.finalY = parseInt((self.stageHeight - totalButtonsHeight - self.thumbnailH)/2);
							}else{
								button.finalY = parseInt((self.stageHeight - totalButtonsHeight)/2);
							}
						}else{
							button.finalY = self.buttonsOffsetIn;
						}
					}else{
						button.finalY = prevButton.finalY + prevButton.h + self.spaceBetweenButtons;
					}
				}else{
					
					if(self.buttonsAlignment_str == FWDRL.BUTTONS_IN){
						button.finalY = self.finalY;
					}else{
						button.finalY = self.buttonsOffsetIn;
					}
					
					if(prevButton){
						button.finalY = prevButton.finalY + prevButton.h + self.spaceBetweenButtons;
						if(button == self.nextButton_do){
							if(button.finalY < self.prevButton_do.finalY){
								button.finalY = self.prevButton_do.finalY;
							}
						}else if(button == self.hsThumbanilsButton_do){
							button.finalY = self.finalY + self.finalH - button.h;
							if(button.finalY < prevButton.finalY + prevButton.h + self.spaceBetweenButtons
								&& self.stageWidth < self.thumbnailsManager_do.totalW + ((button.w + self.buttonsOffsetIn) * 2)){
								button.finalY = prevButton.finalY + prevButton.h + self.spaceBetweenButtons;
							}
						}
					}else{
						if(button == self.nextButton_do){
							if(button.finalY < self.prevButton_do.finalY){
								button.finalY =  self.prevButton_do.finalY;
							}
						}else if(button == self.hsThumbanilsButton_do){
							button.finalY = self.finalY + self.finalH - button.h;
						}
					}
				}
				
				if(button == self.zoomButton_do && self.isMaximized_bl){
					button.finalX = self.stageWidth - button.w - 1;
					button.finalY = 1;
				}
				
				if(button == self.hsThumbanilsButton_do){
					if(self.buttonsAlignment_str == FWDRL.BUTTONS_IN){
						if(button.finalY + button.h > self.stageHeight - self.thumbnailH && self.areThumbnailsShowed_bl){
							button.finalX = self.finalX - button.w - self.buttonsOffsetIn;
							button.finalY = self.finalY + self.finalH - button.h;
							if(self.showNextAndPrevButtons_bl
							   && button.finalY < self.prevButton_do.finalY + self.prevButton_do.h + self.spaceBetweenButtons){
								button.finalY = self.prevButton_do.finalY + self.prevButton_do.h + self.spaceBetweenButtons;
							}
							if(i == totalButtons -1){
								for(var k=0; k<totalButtons - 1; k++){
									self.buttons_ar[k].finalY += parseInt(self.hsThumbanilsButton_do.h/2);
								}
							}
						}
					}else{
						if(self.areThumbnailsShowed_bl){
							if(self.thumbnailsManager_do 
								&& self.stageWidth > self.thumbnailsManager_do.totalW + ((button.w + self.buttonsOffsetIn) * 2)){
								button.finalY = self.stageHeight - button.h - self.buttonsOffsetIn;
							}else{
								button.finalY = self.stageHeight - button.h - self.thumbnailH - self.buttonsOffsetIn;
							}
						}else{
							button.finalY = self.stageHeight - button.h - self.buttonsOffsetIn;
						}
						if(prevButton 
						   && prevButton.finalY + prevButton.h + button.h + self.spaceBetweenButtons + self.buttonsOffsetIn> self.stageHeight - self.thumbnailH && self.areThumbnailsShowed_bl
						   && self.stageWidth < self.thumbnailsManager_do.totalW + ((button.w + self.buttonsOffsetIn) * 2)){
							button.finalX = self.buttonsOffsetIn;
						}
					}
				}
				
				if(self.hider.isHidden_bl && button == self.slp_do){
					if(self.buttonsAlignment_str == FWDRL.BUTTONS_IN){
						button.finalY = self.finalY;
					}else{
						button.finalY = self.buttonsOffsetIn;
					}	
				}
				
			}
			
			if(self.showNextAndPrevButtons_bl){
				if(animate){
					FWDAnimation.killTweensOf(self.prevButton_do);
					FWDAnimation.to(self.prevButton_do, .8, {x:self.prevButton_do.finalX, y:self.prevButton_do.finalY, ease:Expo.easeInOut});
				}else{
					FWDAnimation.killTweensOf(self.prevButton_do);
					self.prevButton_do.setX(self.prevButton_do.finalX);
					self.prevButton_do.setY(self.prevButton_do.finalY);
				}
			}
			
			for(var i=0; i<totalButtons; i++){		
				button = self.buttons_ar[i];
				
				if(button.x != button.finalX || button.y != button.finalY){
					FWDAnimation.killTweensOf(button);
					if(animate){ 
						FWDAnimation.to(button, .8, {x:button.finalX, y:button.finalY, ease:Expo.easeInOut});
					}else{
						button.setX(button.finalX);
						button.setY(button.finalY);
					}
				}
			}
			
			this.positionShareButtons(animate);
		};
		
		self.hideButtons = function(animate){
			if(!self.isReady_bl) return;
			var button;
			var totalButtons = self.buttons_ar.length;
	
			if(self.showNextAndPrevButtons_bl){
				self.prevButton_do.finalX = -self.prevButton_do.w;
				if(self.prevButton_do.finalX == undefined) self.prevButton_do.finalX = -1;
				if(self.prevButton_do.finalY == undefined) self.prevButton_do.finalY = -1;
			}
			
			for(var i=0; i<totalButtons; i++){
				button = self.buttons_ar[i];	
				if(!button) continue;
				
				if(!isNaN(button.finalX)){
					if(button.finalX > self.stageWidth/2){
						button.finalX  = self.stageWidth;
					}else{
						button.finalX  = - button.w;
					}
				}
				
				if(button.finalX === undefined) button.finalX = -5000;
				if(button.finalY === undefined) button.finalY = -5000;
				
				if(animate){
					if(i == 0 && self.showNextAndPrevButtons_bl){
						FWDAnimation.killTweensOf(self.prevButton_do);
						FWDAnimation.to(self.prevButton_do, .8, {alpha:1, x:self.prevButton_do.finalX, y:self.prevButton_do.finalY, ease:Expo.easeInOut});
					}
					FWDAnimation.killTweensOf(button);
					FWDAnimation.to(button, .8, {alpha:1, x:button.finalX, y:button.finalY, ease:Expo.easeInOut});
				}else{
					if(i == 0 && self.showNextAndPrevButtons_bl){
						FWDAnimation.killTweensOf(self.prevButton_do);
						self.prevButton_do.setX(self.prevButton_do.finalX);
						self.prevButton_do.setY(self.prevButton_do.finalY);
					}
					FWDAnimation.killTweensOf(button);
					button.setAlpha(1);
					button.setX(button.finalX);
					button.setY(button.finalY);
				}
			}
		};
		
		self.hideStuffForGood = function(){
			if(self.shareButton_do) self.shareButton_do.setX(-5000);
			self.prevButton_do.setX(-5000);
			self.nextButton_do.setX(-5000);
			self.closeButton_do.setX(-5000);
			self.zoomButton_do.setX(-5000);
			self.descButton_do.setX(-5000);
			self.slideShowButton_do.setX(-5000);
			self.slp_do.setX(-5000);
			self.hsThumbanilsButton_do.setX(-5000);
			if(self.videoHolder_do){
				self.video_do.stop();
				self.videoHolder_do.setX(-5000);
				self.videoHolder_do.w = 1;
				self.videoHolder_do.h = 1;
			}
			
			if(self.audioHolder_do){
				self.audio_do.stop();
				self.audioHolder_do.setX(-5000);
				self.audioHolder_do.w = 1;
				self.audioHolder_do.h = 1;
			}
		};
		
		self.showButtonsWithFade = function(animate){
			if(!self.isReady_bl) return;
			
			self.areButtonsShowed_bl = true;
			
			if(animate){
				
				if(this.shareButtonsHolder_do && this.areButtonsSharedShowed_bl){
					if(this.shareButtonsHolder_do.y + this.shareButtonsHolder_do.h + self.spaceBetweenButtons > this.nextButton_do.y){
						FWDAnimation.to(self.nextButton_do.buttonsHolder_do, .8, {alpha:0, ease:Expo.easeInOut});
					}
				}else{
					FWDAnimation.to(self.nextButton_do.buttonsHolder_do, .8, {alpha:1, ease:Quint.easeOut});
				}
				
				FWDAnimation.to(self.prevButton_do.buttonsHolder_do, .8, {alpha:1, ease:Quint.easeOut});
				FWDAnimation.to(self.closeButton_do.buttonsHolder_do, .8, {alpha:1, ease:Quint.easeOut});
				FWDAnimation.to(self.zoomButton_do.buttonsHolder_do, .8, {alpha:1, ease:Quint.easeOut});
				
				if(this.shareButtonsHolder_do && this.areButtonsSharedShowed_bl){
					if(this.shareButtonsHolder_do.y + this.shareButtonsHolder_do.h  + self.spaceBetweenButtons > this.hsThumbanilsButton_do.y
					    && this.shareButtonsHolder_do.finalX == this.hsThumbanilsButton_do.finalX){
						FWDAnimation.to(self.hsThumbanilsButton_do.buttonsHolder_do, .8, {alpha:0, ease:Expo.easeInOut});
					}
				}else{
					FWDAnimation.to(self.hsThumbanilsButton_do.buttonsHolder_do, .8, {alpha:1, ease:Quint.easeOut});
				}
				
				FWDAnimation.to(self.descButton_do.buttonsHolder_do, .8, {alpha:1, ease:Quint.easeOut});
				FWDAnimation.to(self.slideShowButton_do.buttonsHolder_do, .8, {alpha:1, ease:Quint.easeOut});
				if(self.shareButton_do) FWDAnimation.to(self.shareButton_do.buttonsHolder_do, .8, {alpha:1, ease:Quint.easeOut});
			}else{
				
				FWDAnimation.killTweensOf(self.nextButton_do.buttonsHolder_do);
				FWDAnimation.killTweensOf(self.prevButton_do.buttonsHolder_do);
				self.nextButton_do.buttonsHolder_do.setAlpha(1);
				self.prevButton_do.buttonsHolder_do.setAlpha(1);
			
				FWDAnimation.killTweensOf(self.nextButton_do.closeButton_do);
				self.closeButton_do.buttonsHolder_do.setAlpha(1);
		
				FWDAnimation.killTweensOf(self.zoomButton_do.closeButton_do);
				self.zoomButton_do.buttonsHolder_do.setAlpha(1);		
				
				FWDAnimation.killTweensOf(self.hsThumbanilsButton_do.hsThumbanilsButton_do);
				self.hsThumbanilsButton_do.buttonsHolder_do.setAlpha(1);	
				
				FWDAnimation.killTweensOf(self.descButton_do.descButton_do);
				self.descButton_do.buttonsHolder_do.setAlpha(1);	
				if(self.shareButton_do){
					FWDAnimation.killTweensOf(self.shareButton_do.descButton_do);
					self.shareButton_do.buttonsHolder_do.setAlpha(1);
				}
			}
			
		};
		
		self.hideButtonsWithFade = function(animate){
			
			if(animate){
				FWDAnimation.to(self.nextButton_do.buttonsHolder_do, .8, {alpha:0, ease:Quint.easeOut});
				FWDAnimation.to(self.prevButton_do.buttonsHolder_do, .8, {alpha:0, ease:Quint.easeOut});
				FWDAnimation.to(self.closeButton_do.buttonsHolder_do, .8, {alpha:0, ease:Quint.easeOut});
				FWDAnimation.to(self.zoomButton_do.buttonsHolder_do, .8, {alpha:0, ease:Quint.easeOut});
				FWDAnimation.to(self.hsThumbanilsButton_do.buttonsHolder_do, .8, {alpha:0, ease:Quint.easeOut});
				FWDAnimation.to(self.descButton_do.buttonsHolder_do, .8, {alpha:0, ease:Quint.easeOut});
				FWDAnimation.to(self.slideShowButton_do.buttonsHolder_do, .8, {alpha:0, ease:Quint.easeOut});
				if(self.shareButton_do) FWDAnimation.to(self.shareButton_do.buttonsHolder_do, .8, {alpha:0, ease:Quint.easeOut});
			}else{
				
				FWDAnimation.killTweensOf(self.nextButton_do.buttonsHolder_do);
				FWDAnimation.killTweensOf(self.prevButton_do.buttonsHolder_do);
				self.nextButton_do.buttonsHolder_do.setAlpha(0);
				self.prevButton_do.buttonsHolder_do.setAlpha(0);
			
				FWDAnimation.killTweensOf(self.nextButton_do.closeButton_do);
				self.closeButton_do.buttonsHolder_do.setAlpha(0);
		
				FWDAnimation.killTweensOf(self.zoomButton_do.closeButton_do);
				self.zoomButton_do.buttonsHolder_do.setAlpha(0);		
				
				FWDAnimation.killTweensOf(self.hsThumbanilsButton_do.hsThumbanilsButton_do);
				self.hsThumbanilsButton_do.buttonsHolder_do.setAlpha(0);	
				
				FWDAnimation.killTweensOf(self.hsThumbanilsButton_do.descButton_do);
				self.descButton_do.buttonsHolder_do.setAlpha(0);	
				
				FWDAnimation.killTweensOf(self.slideShowButton_do.descButton_do);
				self.slideShowButton_do.buttonsHolder_do.setAlpha(0);
				
				if(self.shareButton_do){
					FWDAnimation.killTweensOf(self.shareButton_do.descButton_do);
					self.shareButton_do.buttonsHolder_do.setAlpha(0);
				}
			}
			
			self.areButtonsShowed_bl = false;
		};
		
		this.parsePlaylistObject = function(obj, i, json){
			if(i == 0 && obj.thumbnailPath_str){
				self.areThumbnailsShowed_bl = false;
				
				self.setupThumbnailManager();	
				
				if(self.showThumbnailsByDefault_bl){
					self.thumbnailsManager_do.show(false);
					self.areThumbnailsShowed_bl = true;
				}else{
					self.thumbnailsManager_do.hide(false);
					self.areThumbnailsShowed_bl = false;
				}
				
				if(self.defaultShowThumbnails_bl){
					self.showThumbnails_bl = true;
				}else{
					self.showThumbnails_bl = false;
					self.areThumbnailsShowed_bl = false;
				}
				
				if(self.defaultShowThumbnailsHideOrShowButton_bl && self.defaultShowThumbnails_bl){
					self.showThumbnailsHideOrShowButton_bl = true;
				}else{
					self.showThumbnailsHideOrShowButton_bl = false;
				}
			}
		
			if(i == 0 && !obj.thumbnailPath_str){
				self.areThumbnailsShowed_bl = false;
				self.showThumbnails_bl = false;
				self.showThumbnailsHideOrShowButton_bl = false;
			}
			
			if(/\.jpg|\.jpeg|\.png/i.test(obj.type_str)){
				obj.iconType_str = FWDRLThumb.IMAGE;
				obj.type_str = FWDRL.IMAGE_TYPE;
				obj.width = undefined;
				obj.height = undefined;
			}else if(/\.mp4/i.test(obj.type_str)){
				obj.iconType_str = FWDRLThumb.VIDEO;
				obj.type_str = FWDRL.VIDEO_TYPE;
			}else if(/\.mp3/i.test(obj.type_str) || obj.type_str == "-soundcloud-"){
				obj.type_str = FWDRL.AUDIO_TYPE;
				obj.iconType_str = FWDRLThumb.AUDIO;
			}else if(/\.swf/i.test(obj.type_str)){
				obj.type_str = FWDRL.FLASH_TYPE;
				obj.iconType_str = FWDRLThumb.FLASH;
			}else if(/youtube\.|vimeo\./i.test(obj.type_str)){
				if(obj.type_str.indexOf("youtube.") != -1){
					obj.iconType_str = FWDRLThumb.YOUTUBE;
				}else{
					obj.iconType_str = FWDRLThumb.VIMEO;
				}
				obj.type_str = FWDRL.IFRAME_TYPE;
			}else{
				
				if(obj.type_str.indexOf("google.") != -1){
					obj.iconType_str = FWDRLThumb.MAPS;
				}else if(obj.type_str.indexOf("RL_AJAX") != -1){
					obj.iconType_str = FWDRLThumb.AJAX;
				}else if(obj.type_str.indexOf("RL_HTML") != -1){
					obj.iconType_str = FWDRLThumb.HTML;
				}else{
					obj.iconType_str = FWDRLThumb.IFRAME;
				}
				obj.type_str = FWDRL.IFRAME_TYPE;	
			}
	
			if(obj.type_str == FWDRL.IMAGE_TYPE || obj.type_str == FWDRL.VIDEO_TYPE){
				
				if(obj.type_str == FWDRL.VIDEO_TYPE){
					var firstUrlPath = encodeURI(obj.url.substr(0,obj.url.lastIndexOf("/") + 1));
					var secondUrlPath = encodeURIComponent(obj.url.substr(obj.url.lastIndexOf("/") + 1));
					obj.url = firstUrlPath + secondUrlPath;
				}
			}
			
			self.playlist_ar[i] = obj;
		};
		
		//############################################//
		/* Show / hide */
		//############################################//
		FWDRL.show = function(playlistDomOrObj, id, propsObjVariableName_str){
			if(self.isShowed_bl) return;
			
			self.id = id;
			self.propsObjVariableName_str = propsObjVariableName_str;
			FWDRL.dispatchEvent(FWDRL.SHOW_START, {obj:playlistDomOrObj});
			
			if(!playlistDomOrObj){
				var error_str = "Please sepecify a playlist";
				alert("Revolution lightbox error! Please specify a playlist in the FWDRL.show() method.");
				return;
			}
			
			//change props
			self.setDefaultSettings();
			if(propsObjVariableName_str && window[propsObjVariableName_str]){
				var props_obj = window[propsObjVariableName_str];
				self.setObjectPropsSettings(props_obj);
			}else{
				self.setDefaultSettings();
			}
			
			self.stopToLoadPlaylist();
			self.isPlaylistDispatchingError_bl = false;
			if(playlistDomOrObj.indexOf("facebook.com") != -1){
				self.isFacebook_bl = true;
				self.facebookUrl_str = String(playlistDomOrObj.match(/[\.][0-9]*[\.|&]/i)[0]).replace(/\.|&/g,"");
				self.originalFacebookURL_str = playlistDomOrObj;
				self.isPlaylistDispatchingError_bl = true;
				self.loadFacebookPlaylist();
			}else if(playlistDomOrObj.indexOf("youtube.com") != -1){
				self.isYoutube_bl = true;
				self.nextPageToken_str = undefined;
				self.youtubeUrl_str = playlistDomOrObj.match(/list=([^&]+)/i)[1];
				self.originalYoutubeURL_str = playlistDomOrObj;
				self.isPlaylistDispatchingError_bl = true;
				self.loadYoutubePlaylist();
			}else if(playlistDomOrObj.indexOf("soundcloud.com") != -1){
				self.isSoundCloud_bl = true;
				self.soundCloundUrl_str = playlistDomOrObj;
				self.isPlaylistDispatchingError_bl = true;
				self.loadSoundCloudPlaylist();
			}else if(playlistDomOrObj.indexOf("flickr.com") != -1){
				self.isFlickr_bl = true;
				self.originalFlickrURL_str = playlistDomOrObj;
				self.flickrUrl_str = String(playlistDomOrObj.match(/[^\/]+$/i));
				self.isPlaylistDispatchingError_bl = true;
				self.loadFlickrPlaylist();
			}else{
				FWDRL.parsePlaylist(playlistDomOrObj, id, propsObjVariableName_str);
			}
			
			self.so = FWDRLUtils.getScrollOffsets();
			//window.scrollTo(self.so.x, self.so.y);
			
			//show...
			self.isShowed_bl = true;
			self.isAnim_bl = true;
			self.showSlideShowAnimation_bl = false;
			self.showDescription_bl = self.defaultShowDescriptionByDefault_bl;
			
			self.startResizeHandler();
			self.addPreventMouseWheel();
			
			clearTimeout(self.showOrHideCompleteId_to);
			self.showOrHideCompleteId_to = setTimeout(self.showComplete, 401);
			FWDAnimation.to(self.bk_do, .8, {alpha:self.backgroundOpacity, ease:Quint.easeOut});
			
			if(self.preloader_do){
				self.positionPreloader();
				self.preloader_do.show(true);
			}
			self.main_do.addChild(self.disableClick_do);
			
			if(self.isReady_bl){	
				self.hideButtons();
				self.hideStuffForGood();
			}
			
			self.desc_do.hide(false, true, true);
			if(self.thumbnailsManager_do) self.thumbnailsManager_do.destoryThumbnails();
		};
		
		//##########################################//
		/* load soundcloud playlistlist */
		//##########################################//
		this.loadSoundCloudPlaylist = function(){
			
			if(self.soundCloundUrl_str.indexOf("likes") != -1){
				self.soundCloundUrl_str =  self.soundCloundUrl_str.replace(/\/likes$/, "/favorites");
			}
		
			//setTimeout(function(){
				if(self.soundCloundUrl_str.indexOf("api.soundcloud.") == -1){
					url = "http://api.soundcloud.com/resolve?format=json&url=" + self.soundCloundUrl_str + "&limit=100" + "&client_id=" + self.scClientId_str + "&callback=FWDRL.parsePlaylist";
				}else{
					url = self.sourceURL_str + "?format=json&client_id=" + self.scClientId_str  + "&limit=100" + "&callback=FWDRL.parsePlaylist";
				}
			
				if(self.scs_el ==  null){
					try{
						self.scs_el = document.createElement('script');
						self.scs_el.src = url;
						self.scs_el.id = parent.instanceName_str + ".data.parseflickrPlaylist";
						document.documentElement.appendChild(self.scs_el);
					}catch(e){}
				}
			//}, 1000)
			self.JSONPRequestTimeoutId_to = setTimeout(
				function(){
					var error = "Soundcloud playlist can't be loaded : <font color='#FF0000'>" + self.soundCloundUrl_str + "</font>.";
					self.main_do.addChild(self.info_do);
					self.info_do.showText(error);	
					self.isAnim_bl = false;
			}, 5000);
		};
		
		
		//##########################################//
		/* load flickr playlistlist */
		//##########################################//
		this.loadFlickrPlaylist = function(){
			
			//setTimeout(function(){
			
			url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=" + self.flickrAPIKey_str + "&photoset_id=" + self.flickrUrl_str + "&format=json&jsoncallback=FWDRL.parsePlaylist";
			
			if(self.scs_el ==  null){
				try{
					self.scs_el = document.createElement('script');
					self.scs_el.src = url;
					self.scs_el.id = "FWDRLIFRAMELOAD";
					document.documentElement.appendChild(self.scs_el);
				}catch(e){}
			}
			//}, 1000)
			self.JSONPRequestTimeoutId_to = setTimeout(
				function(){
					var error = "Flick playlist with the id: <font color='#FF0000'>" + self.soundCloundUrl_str + "</font> can't be loaded.";
					self.main_do.addChild(self.info_do);
					self.info_do.showText(error);	
					self.isAnim_bl = false;
			}, 5000);
		};
		
		
		//##########################################//
		/* load youtube playlistlist */
		//##########################################//
		this.loadYoutubePlaylist = function(){
			
			//setTimeout(function(){
			var url;
			if(self.nextPageToken_str){
				url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&pageToken=" + self.nextPageToken_str + "&playlistId=" + self.youtubeUrl_str + "&key=AIzaSyAlyhJ-C5POyo4hofPh3b7ECAxWy6t6lyg&maxResults=50&callback=FWDRL.parsePlaylist";
			}else{
				self.youtubeObject_ar = [];
				url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + self.youtubeUrl_str + "&key=AIzaSyAlyhJ-C5POyo4hofPh3b7ECAxWy6t6lyg&maxResults=50&callback=FWDRL.parsePlaylist";
			}
			
			if(self.scs_el ==  null){
				try{
					self.scs_el = document.createElement('script');
					self.scs_el.src = url;
					self.scs_el.id = "FWDRLIFRAMELOAD";
					document.documentElement.appendChild(self.scs_el);
				}catch(e){}
			}
			//}, 3000)
			self.JSONPRequestTimeoutId_to = setTimeout(
				function(){
					var error = "Error loading Youtube playlist: <font color='#FF0000'>" + self.originalYoutubeURL_str + "</font>.";
					self.main_do.addChild(self.info_do);
					self.info_do.showText(error);	
					self.isAnim_bl = false;
			}, 5000);
		};
		
		//##########################################//
		/* load facebook playlistlist */
		//##########################################//
		this.loadFacebookPlaylist = function(){
			
			if(document.location.protocol == "file:"){
				self.isPlaylistDispatchingError_bl = true;
				var error = "Please test online, is not possible to view Facebook albums local.";
				self.main_do.addChild(self.info_do);
				self.info_do.showText(error);	
				setTimeout(function(){
					self.isAnim_bl = false;
				}, 850);
				return
			}
			
			if(!self.facebookShare){
				FWDRLFacebookShare.setPrototype();
				self.facebookShare = new FWDRLFacebookShare(self.facebookAppId_str);
				self.facebookShare.addListener(FWDRLFacebookShare.API_READY, self.facebookAPIReadyHandler);
				self.facebookShare.addListener(FWDRLFacebookShare.API_ERROR, self.facebookAPIErrorHandler);
			}else{
				self.loadAccessFacebookAccessToken();
			}
		};
		
		this.facebookAPIReadyHandler = function(e){
			self.loadAccessFacebookAccessToken();
		};
		
		this.facebookAPIErrorHandler = function(e){
			var error = "Error loading file : <font color='#FF0000'>" + self.originalFacebookURL_str + "</font>";
			self.main_do.addChild(self.info_do);
			self.info_do.showText(error);	
			self.isAnim_bl = false;
		};
		
		this.loadAccessFacebookAccessToken = function(){
			self.stopToLoadPlaylist();
			self.sourceURL_str = self.data.mainFolderPath_str + "facebook_access_token.txt";
		
			self.xhr = new XMLHttpRequest();
			self.xhr.onreadystatechange = self.facebookTokenOnLoadoadHandler;
			self.xhr.onerror = self.facebookErrorHandler;
			
			try{
				self.xhr.open("get", self.sourceURL_str + "?rand=" + parseInt(Math.random() * 99999999), true);
				self.xhr.send();
			}catch(e){
				var message = e;
				if(e){if(e.message)message = e.message;}
				self.facebookAPIErrorHandler();
			}
		};
		
		this.facebookTokenOnLoadoadHandler = function(e){
			var response;
			
			if(self.xhr.readyState == 4){
				if(self.xhr.status == 404){
					var error = "Facebook token path is not found : <font color='#FF0000'>" + self.originalFacebookURL_str + "</font>";
					self.main_do.addChild(self.info_do);
					self.info_do.showText(error);	
					self.isAnim_bl = false;
				}else if(self.xhr.status == 408){
					var error = "Loading facebook token";
					self.main_do.addChild(self.info_do);
					self.info_do.showText(error);	
					self.isAnim_bl = false;
				}else if(self.xhr.status == 200){
					if(window.JSON){
						response = JSON.parse(self.xhr.responseText);
					}else{
						response = eval('('+ self.xhr.responseText +')');
					}
				
					self.accessToken_str = response.access_token;
					self.loadFacebookPlaylistWhenReady();
				}
			}
		};
		
		this.facebookErrorHandler = function(e){
			var error = "Error loading file : <font color='#FF0000'>" + self.originalFacebookURL_str + "</font>";
			self.main_do.addChild(self.info_do);
			self.info_do.showText(error);	
			self.isAnim_bl = false;
		};
		
		this.loadFacebookPlaylistWhenReady = function(){
			
			
			FB.api(
				  '/' + self.facebookUrl_str + '?access_token=' + self.accessToken_str,
				  'GET',
				  {"fields":"photos.limit(100){images,created_time,name}"},
				  function(response) {
					  if (response){
						  FWDRL.parsePlaylist(response, self.id, self.propsObjVariableName_str);
				      }
				  }
			);
		};
		
		
		//######################################//
		/* parse playlist */
		//######################################//
		FWDRL.parsePlaylist = function(playlistDomOrObj, id, propsObjVariableName_str){
			
			self.stopToLoadPlaylist();
			//if(self.isPlaylistDispatchingError_bl) return;
			//generate playlists...
			var playlistObj;
			self.playlistDomOrObj_str = playlistDomOrObj;
			self.playlist_ar = [];
			
			if(self.isFacebook_bl){
				
				playlistObj = self.playlistDomOrObj_str.photos.data;
				
				self.isPlaylistDispatchingError_bl = false;
				self.totalItems = playlistObj.length;
				
				var countPlaylistItems = 0;
				var dumyDiv = document.createElement("div");
				for(var i=0; i<self.totalItems; i++){
					var obj = {};
					var ch = playlistObj[i];
					
					obj.url = ch.images[0].source;
					obj.thumbnailPath_str = ch.images[ch.images.length - 1].source;
					
					obj.type_str = ".jpg";
					obj.description = "<div class='FWDRLFacebookDescription'>" + ch.name + "</div>";
				
					if(obj.url.indexOf("RL_HTML") == -1){
						if(obj.description) dumyDiv.innerHTML = obj.description;
						if(obj.description){
							dumyDiv.innerHTML = obj.description;
							obj.descriptionText = dumyDiv.innerText;
						}
					}else{
						dumyDiv.innerHTML = ch.html;
						obj.html = dumyDiv.innerHTML;
					}
					
					self.parsePlaylistObject(obj, i, true);
				}
				
				dumyDiv = null;
				self.playlistDomOrObj_str = self.originalFacebookURL_str;
				self.resizeHandler();
			}else if(self.isYoutube_bl){
				
				if(playlistDomOrObj.error){
					var error = "Error loading Youtube playlist : <font color='#FF0000'>" + self.originalYoutubeURL_str + "</font>.";
					self.main_do.addChild(self.info_do);
					self.info_do.showText(error);	
					self.isAnim_bl = false;
					return;
				}else if(playlistDomOrObj){
					playlistObj = playlistDomOrObj;
				}
				
				
				for(var i=0; i<playlistObj.items.length; i++){
					self.youtubeObject_ar.push(playlistObj.items[i]);
				}
				
				if(playlistObj.nextPageToken){
					self.nextPageToken_str = playlistObj.nextPageToken;
					self.loadYoutubePlaylist();
					return;
				}
				
				playlistObj = self.youtubeObject_ar;
				
				self.isPlaylistDispatchingError_bl = false;
				self.totalItems = playlistObj.length;
				
				var countPlaylistItems = 0;
				var dumyDiv = document.createElement("div");
				for(var i=0; i<self.totalItems; i++){
					var obj = {};
					var ch = playlistObj[i];
					
					obj.url = "https://www.youtube.com/watch?v=" + ch.snippet.resourceId.videoId;
					obj.thumbnailPath_str = ch.snippet.thumbnails.medium.url;
					
					obj.type_str = "https://www.youtube.com/";
					obj.description = "<div class='FWDRLYoutubeDescription'>" + ch.snippet.title + "</div>";
				
					if(obj.url.indexOf("RL_HTML") == -1){
						if(obj.description) dumyDiv.innerHTML = obj.description;
						if(obj.description){
							dumyDiv.innerHTML = obj.description;
							obj.descriptionText = dumyDiv.innerText;
						}
					}else{
						dumyDiv.innerHTML = ch.html;
						obj.html = dumyDiv.innerHTML;
					}
					
					self.parsePlaylistObject(obj, i, true);
				}
				
				dumyDiv = null;
				self.playlistDomOrObj_str = self.originalYoutubeURL_str;
				self.resizeHandler();
				
			}else if(self.isFlickr_bl){
				
				if(playlistDomOrObj.stat == "fail"){
					var error = "Flickr playlist with the id can't be loaded: <font color='#FF0000'>" + self.flickrUrl_str + "</font>.";
					self.main_do.addChild(self.info_do);
					self.info_do.showText(error);	
					self.isAnim_bl = false;
					return;
				}else if(playlistDomOrObj){
					playlistObj = playlistDomOrObj.photoset.photo;
				}
				
				
				self.isPlaylistDispatchingError_bl = false;
				self.totalItems = playlistObj.length;
				
				var countPlaylistItems = 0;
				var dumyDiv = document.createElement("div");
				for(var i=0; i<self.totalItems; i++){
					var obj = {};
					var ch = playlistObj[i];
				
					obj.url = "http://farm" + ch.farm + ".staticflickr.com/" + ch.server + "/"  + ch.id + "_" + ch.secret + "_b.jpg";
					obj.thumbnailPath_str = "http://farm" + ch.farm + ".staticflickr.com/" + ch.server + "/"  + ch.id + "_" + ch.secret + "_n.jpg";
					
					obj.type_str = ".jpg";
					obj.description = "<div class='FWDRLFlickrDescription'>" + ch["title"] + "</div>";
				
					if(obj.url.indexOf("RL_HTML") == -1){
						if(obj.description) dumyDiv.innerHTML = obj.description;
						if(obj.description){
							dumyDiv.innerHTML = obj.description;
							obj.descriptionText = dumyDiv.innerText;
						}
					}else{
						dumyDiv.innerHTML = ch.html;
						obj.html = dumyDiv.innerHTML;
					}
					
					obj.height = self.data.audioControllerHeight + (self.itemBorderSize * 2);
					
					self.parsePlaylistObject(obj, i, true);
					
					
				}
				dumyDiv = null;
				self.playlistDomOrObj_str = self.originalFlickrURL_str;
				self.resizeHandler();
			}else if(self.isSoundCloud_bl){
				
				if(playlistDomOrObj.tracks){
					
					playlistObj = playlistDomOrObj.tracks;
				}else if(playlistDomOrObj.length){
					playlistObj = playlistDomOrObj;
				}else{
					var error = "Please provide a playlist or tracks URL : <font color='#FF0000'>" + self.soundCloundUrl_str + "</font>.";
					self.main_do.addChild(self.info_do);
					self.info_do.showText(error);	
					self.isAnim_bl = false;
					return;
				}
				
				self.isPlaylistDispatchingError_bl = false;
				self.totalItems = playlistObj.length;
				
				var countPlaylistItems = 0;
				var dumyDiv = document.createElement("div");
				for(var i=0; i<self.totalItems; i++){
					var obj = {};
					var ch = playlistObj[i];
					obj.url = ch.stream_url + "?consumer_key=" + self.scClientId_str;;
					obj.thumbnailPath_str = String(ch.artwork_url).replace(/large/, "t300x300");;
					obj.type_str = "-soundcloud-";
					obj.description = "<div class='FWDRLSoundCloudDescription'>" + ch["title"] + "</div>";
				
					if(obj.url.indexOf("RL_HTML") == -1){
						if(obj.description) dumyDiv.innerHTML = obj.description;
						if(obj.description){
							dumyDiv.innerHTML = obj.description;
							obj.descriptionText = dumyDiv.innerText;
						}
					}else{
						dumyDiv.innerHTML = ch.html;
						obj.html = dumyDiv.innerHTML;
					}
					
					obj.height = self.data.audioControllerHeight + (self.itemBorderSize * 2);
					
					self.parsePlaylistObject(obj, i, true);
					
					
				}
				dumyDiv = null;
				self.playlistDomOrObj_str = self.soundCloundUrl_str;
				self.resizeHandler();
			}else if(playlistDomOrObj.indexOf("rlobj_") != -1){
				playlistObj = window[playlistDomOrObj];
				if(!playlistObj){
					alert("Revolution lightbox error! The playlist JSON object with the label \"" + playlistDomOrObj + "\" doesn't exist!");
					return;
				}
				
				self.totalItems = playlistObj.playlistItems.length;
				
				var countPlaylistItems = 0;
				var dumyDiv = document.createElement("div");
				for(var i=0; i<self.totalItems; i++){
					var obj = {};
					var ch = playlistObj.playlistItems[i];
					obj.url = ch.url;
					obj.thumbnailPath_str = ch.thumbnailPath;
					obj.posterPath = ch.posterPath;
					obj.type_str = ch.url;
					obj.description = ch.description;
						
					if(obj.url.indexOf("RL_HTML") == -1){
						if(obj.description) dumyDiv.innerHTML = obj.description;
						if(obj.description){
							dumyDiv.innerHTML = obj.description;
							obj.descriptionText = dumyDiv.innerText;
						}
					}else{
						dumyDiv.innerHTML = ch.html;
						obj.html = dumyDiv.innerHTML;
					}
			
					obj.width = ch.width;
					obj.height = ch.height;
					
					self.parsePlaylistObject(obj, i, true);
					
					if(obj.type_str == FWDRL.AUDIO_TYPE){
						obj.height = self.data.audioControllerHeight + (self.itemBorderSize * 2);
					}
				}
				dumyDiv = null;
			}else{
				var playlistElement = document.getElementById(playlistDomOrObj);
				if(!playlistElement){
					alert("Revolution lightbox error! The HTML element with the id \"" + playlistDomOrObj + "\" doesn't exist!");
					return;
				}
				
				var ch_ar = FWDRLUtils.getChildren(playlistElement);
				self.totalItems = ch_ar.length;
				
				if(self.totalItems == 0){
					alert("Revolution lightbox error! The playlist with the id \"" + playlistDomOrObj + "\" must contain at least one entry.");
					return
				}
				
				for(var i=0; i<self.totalItems; i++){
					var obj = {};
					var ch = ch_ar[i];
					var test;
					
					if(!FWDRLUtils.hasAttribute(ch, "data-url")){
						alert("Revolution lightbox error! Attribute \"data-url\" is not found in the playlist at position nr: \"" + i + "\".");
						return;
					}
					
					obj.url = String(FWDRLUtils.getAttributeValue(ch, "data-url"));
					obj.posterPath = FWDRLUtils.getAttributeValue(ch, "data-poster-path");
					obj.type_str = FWDRLUtils.getAttributeValue(ch, "data-url");
					obj.width = FWDRLUtils.getAttributeValue(ch, "data-width");
					obj.height = FWDRLUtils.getAttributeValue(ch, "data-height");
					if(FWDRLUtils.hasAttribute(ch, "data-thumbnail-path")){
						obj.thumbnailPath_str = FWDRLUtils.getAttributeValue(ch, "data-thumbnail-path");
					}
					
					if(obj.url.indexOf("RL_HTML") == -1){
						try{
							if(FWDRLUtils.getChildren(ch).length != 0){
								obj.description = ch.innerHTML;
								obj.descriptionText = ch.innerText;
							}
						}catch(e){};
					}else{
						try{obj.html = ch.innerHTML;}catch(e){};
					}
					
					self.parsePlaylistObject(obj, i, false);
					
					if(obj.type_str == FWDRL.AUDIO_TYPE){
						obj.height = self.data.audioControllerHeight + (self.itemBorderSize * 2);
					}
				}
			}
			
			
			if(self.totalItems == 1){
				self.showNextAndPrevButtons_bl = false;
			}else{
				if(self.defaultShowNextAndPrevButtons_bl){
					self.showNextAndPrevButtons_bl = true;
				}else{
					self.showNextAndPrevButtons_bl = false;
				}
			}
			
			if(self.id < 0){
				self.id = 0;
			}else if(self.id > self.totalItems -1){
				self.id = self.totalItems - 1;
			}
			
			self.prevId = self.id;
			
			if(self.useDeepLinking_bl){
				if(propsObjVariableName_str){
					location.hash = "RL?rl_playlist=" + self.playlistDomOrObj_str + "&rl_id=" + self.id + "&rl_propsobj=" + propsObjVariableName_str;	 
				}else{
					location.hash = "RL?rl_playlist=" + self.playlistDomOrObj_str + "&rl_id=" + self.id;	
				}
			}
			
			if(self.isSoundCloud_bl || self.isFacebook_bl || self.isYoutube_bl || self.isFlickr_bl) self.showComplete();
		};
		
	
		self.showComplete = function(){
			
			if(!self.useAsModal_bl){
				self.addCloseEventsWhenBkIsPressed();
			}else{
				self.removeCloseEventsWhenBkIsPressed();
			}
			
			if(!self.isReady_bl || self.id == -1 || self.curItem_do || !self.playlist_ar || self.isPlaylistDispatchingError_bl) return;	
			
			self.positionPreloader();
			self.preloader_do.show(true);
			
			if(self.showCloseButton_bl){
				self.showCloseButton();
			}else{
				self.hideCloseButton();
			}
			
		
			if(self.playlist_ar[self.id].type_str == FWDRL.IMAGE_TYPE && self.defaultShowZoomButton_bl){
				self.showZoomButton();
			}else{
				self.hideZoomButton();
			}
			
			if(self.playlist_ar[self.id].description && self.defaultHideDescriptionButtons_bl){
				self.hasItemDescription_bl = true;
				self.showDescriptionButton();
			}else{
				self.hasItemDescription_bl = false;
				self.hideDescriptionButton();
			}
			
			if(self.showSlideShowButton_bl){
				self.showSlideshowButton();
			}else{
				self.hideSlideshowButton();
			}			
			if(self.showShareButton_bl){
				self.showShareButton();
			}else{
				self.hideFacebookButton();
			}
		
			if(self.showNextAndPrevButtons_bl){
				self.showNextAndPrevButtons();
			}else{
				self.hideNextAndPrevButtons();
			}
			
			if(self.showThumbnailsHideOrShowButton_bl && self.showThumbnails_bl){
				self.showHsThumbnailButton();
				if(self.showThumbnailsByDefault_bl){
					self.hsThumbanilsButton_do.setButtonState(1);
				}else{
					self.hsThumbanilsButton_do.setButtonState(0);
				}
			}else{
				self.hideHsThumbnailButton();
			}
		
			if(self.showDescription_bl){
				self.descButton_do.setButtonState(0);
			}else{
				self.descButton_do.setButtonState(1);
			}
			
			self.hideButtons();
			self.createAndShowItem();
			
			if(self.isMobile_bl) self.addSwipeSupport();
			self.startAnim(801);
		};
		
		self.hide = function(){
			
			if(self.isAnim_bl 
			   || !self.isShowed_bl 
			   || self.isAnimMaximizeOrMinimize_bl 
			   || self.isMaximized_bl
			   || self.swipeMoved_bl
			   || !self.areButtonsShowed_bl) return;
			
			self.isSoundCloud_bl = false;
			self.isFacebook_bl = false;
			self.isYoutube_bl = false;
			self.isFlickr_bl = false;
			
			self.stopToLoadPlaylist();
			
			if(self.isMobile_bl && self.closeButton_do && FWDAnimation.isTweening(self.closeButton_do.buttonsHolder_do)) return;
			
			FWDAnimation.to(self.bk_do, .8, {alpha:0, delay:.4, ease:Quint.easeOut});
			
			if(self.curItem_do && self.curItem_do.screen){
				FWDAnimation.to(self.curItem_do, .6, {alpha:0, ease:Quint.easeOut});
				FWDAnimation.to(self.curItem_do, .8, {x:0, y:0, w:0, h:0, delay:.1, ease:Expo.easeInOut});
			}
			
			FWDAnimation.to(self.mainItemHolder_do, .8, {x:self.stageWidth/2, y:self.stageHeight/2, w:0, h:0, delay:.1, ease:Expo.easeInOut});
			FWDAnimation.to(self.itemBorder_do, .8, {w:0, h:0, alpha:0, delay:.1, ease:Expo.easeInOut});
			FWDAnimation.to(self.itemBk_do, .8, {x:0, y:0, w:0, h:0, delay:.1, ease:Expo.easeInOut});
			
			if(self.curItem_do) self.hideButtons(true);
			self.isShowed_bl = false;
			self.isFirstItemShowed_bl = false;
			self.id == -1;
			self.curItem_do = null;
			self.prevItem_do = null;
			self.isAnimForVideoAndAudioPlayersDone_bl = false;
			self.stopResizeHandler();
			self.closeAjax();
			self.tm.stop();
			if(self.thumbnailsManager_do) self.thumbnailsManager_do.hide(true);
			if(self.main_do.contains(self.info_do)) self.main_do.removeChild(self.info_do);
			self.closeImage();
			if(!self.useAsModal_bl) self.removeCloseEventsWhenBkIsPressed();
			self.hider.stop();
			self.preloader_do.hide(true);
			self.hideShareButtons(true, true);
			
			if(self.videoHolder_do){
				self.video_do.stop();
				self.video_do.setPosterSource("");
				self.videoHolder_do.setX(-5000);
				self.videoHolder_do.w = 1;
				self.videoHolder_do.h = 1;
			}
			
			if(self.audioHolder_do){
				self.audio_do.stop();
				self.audioHolder_do.setX(-5000);
				self.audioHolder_do.w = 1;
				self.audioHolder_do.h = 1;
			}
			self.desc_do.descriptionAnimationType_str = "opacity";
			FWDRL.dispatchEvent(FWDRL.HIDE_START);
			if(self.hasItemDescription_bl && self.showDescription_bl) self.desc_do.hide(true);
			clearTimeout(self.showOrHideCompleteId_to);
			self.showOrHideCompleteId_to = setTimeout(self.hideComplete, 1200);
			if(self.isMobile_bl) self.removeSwipeSupport();
			self.startAnim(1202);
		};
		
		self.hideComplete = function(){
			//window.scrollTo(self.so.x, self.so.y);
			if(self.useDeepLinking_bl) location.hash = "RL";
			//window.scrollTo(self.so.x, self.so.y);
			self.removePreventMouseWheel();
		
			self.isFirstItemShowed_bl = false;
			self.firstVideoOrAudioAdded_bl = false;
			self.curItem_do = null;
			self.prevItem_do = null;
			self.removeItems(0);
			if(self.thumbnailsManager_do){
				self.thumbnailsManager_do.destoryThumbnails();
				self.thumbnailsManager_do.hideForGood();
			}
			if(self.video_do && RLVideoPlayer) RLVideoPlayer.setPosterSource("");
			if(self.isMobile_bl) self.removeSwipeSupport();
			self.main_do.setX(-5000);
			//self.main_do.setY(-5000);
			FWDRL.dispatchEvent(FWDRL.HIDE_COMPLETE);
		};
		
		self.startAnim = function(delay){
			self.stopAnim();
			self.isAnim_bl = true;
			self.animId_to = setTimeout(self.animationDone, delay);
		};
		
		self.stopAnim = function(){
			self.isAnim_bl = false;
			if(self.tm) self.tm.pause();
			clearTimeout(self.animId_to);
		};
		
		self.animationDone = function(){
			self.isAnim_bl = false;
			self.tm.resume();
			self.removeItems(1);
			if(self.curItem_do) self.dlChangeHandler();
			if(self.hasItemDescription_bl && self.showDescription_bl) self.desc_do.show(true);	
		};
		
		self.addCloseEventsWhenBkIsPressed = function(){
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.bk_do.screen.addEventListener("pointerup", self.onBkMouseUp);
				}else{
					self.bk_do.screen.addEventListener("touchend", self.onBkMouseUp);
					self.bk_do.screen.addEventListener("touchmove", self.onBkTouchMove);
				}
			}else if(self.bk_do.screen.addEventListener){	
				self.bk_do.screen.addEventListener("click", self.onBkMouseUp);
			}else if(self.bk_do.screen.attachEvent){
				self.bk_do.screen.attachEvent("onclick", self.onBkMouseUp);
			}
		};
		
		self.removeCloseEventsWhenBkIsPressed = function(){
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.bk_do.screen.removeEventListener("pointerup", self.onBkMouseUp);
				}else{
					self.bk_do.screen.removeEventListener("touchend", self.onBkMouseUp);
					self.bk_do.screen.removeEventListener("touchmove", self.onBkTouchMove);
				}
			}else if(self.bk_do.screen.removeEventListener){	
				self.bk_do.screen.removeEventListener("click", self.onBkMouseUp);
			}else if(self.bk_do.screen.detachEvent){
				self.bk_do.screen.detachEvent("onclick", self.onBkMouseUp);
			}
		};
		
		
		self.onBkTouchMove = function(){
			clearTimeout(self.doNotAllowToHideId_to);
			self.doNotAllowToHideId_to = setTimeout(function(){self.doNotAllowToHide_bl = false;}, 100);
			self.doNotAllowToHide_bl = true;
		};
		
		self.onBkMouseUp = function(){
			if(self.doNotAllowToHide_bl) return
			self.hide();
		};
		
		//####################################//
		/* stop to load current playlist... */
		//####################################//
		this.stopToLoadPlaylist = function(){
			clearTimeout(self.JSONPRequestTimeoutId_to);
			
			try{
				self.scs_el.src = null;
				document.documentElement.removeChild(self.scs_el);
				self.scs_el = null;
			}catch(e){}
			
			
			if(self.xhr != null){
				try{self.xhr.abort();}catch(e){}
				self.xhr.onreadystatechange = null;
				self.xhr.onerror = null;
				self.xhr = null;
			}
		};
		
		
		//###################################//
		/* show item */
		//###################################//
		self.createAndShowItem = function(){
			
			var curPlaylistItem = self.playlist_ar[self.id];
			var isHttpS_bl;
			
			self.type_str = curPlaylistItem.type_str;
			self.url = curPlaylistItem.url;
			self.posterPath_str = curPlaylistItem.posterPath;
			
			self.closeAjax();
			self.tm.pause();
			self.closeImage();
			self.preloader_do.hide(true);
			if(self.main_do.contains(self.info_do)) self.main_do.removeChild(self.info_do);
			if(self.thumbnailsManager_do) self.thumbnailsManager_do.disableOrEnableThumbnails();
			
			if((self.prevItem_do && self.prevItem_do.type_str != FWDRL.IMAGE_TYPE) ){
				self.removeItems(0);
				self.prevItem_do = null;
			}
			
			if(self.playlist_ar[self.id].description){
				self.hasItemDescription_bl = true;
				self.showDescriptionButton();
			}else{
				self.hasItemDescription_bl = false;
				self.hideDescriptionButton();
				self.desc_do.hide(false, false, true);
			}
				
			if(self.videoHolder_do){
				self.video_do.stop();
				if(self.type_str != FWDRL.VIDEO_TYPE){
					self.videoHolder_do.setX(-5000);
					self.videoHolder_do.w = 1;
					self.videoHolder_do.h = 1;
				}
			}
			
			if(self.audioHolder_do){		
				self.audio_do.stop();
				if(self.type_str != FWDRL.AUDIO_TYPE || !self.isFirstItemShowed_bl){
					self.audioHolder_do.setX(-5000);
					self.audioHolder_do.w = 1;
					self.audioHolder_do.h = 1;
				}
			}
			
			self.isAnimForVideoAndAudioPlayersDone_bl = false;
			
		
			if(self.type_str == FWDRL.IMAGE_TYPE){
				self.loadImage();
				self.firstVideoOrAudioAdded_bl = true;
			}else if(self.type_str == FWDRL.IFRAME_TYPE
					 || self.type_str == FWDRL.FLASH_TYPE
					 || self.type_str == FWDRL.VIDEO_TYPE
					 || self.type_str == FWDRL.AUDIO_TYPE){
				
				
				self.originalW = curPlaylistItem.width || self.defaultItemW;
				self.originalH = curPlaylistItem.height || self.defaultItemH;
				
				if(self.prevItem_do){
						self.resizeCurrentItem(true);
						FWDAnimation.to(self.prevItem_do, .8, {alpha:0, ease:Quint.easeOut});
						FWDAnimation.to(self.prevItem_do, .8, {
							x:parseInt((self.finalW - self.prevItem_do.w)/2), 
							y:parseInt((self.finalH - self.prevItem_do.h)/2), 
							ease:Expo.easeInOut});
				}
				
				self.curItem_do = new FWDRLDisplayObject("div");
				self.curItem_do.type_str = self.type_str;
				self.prevItem_do = self.curItem_do;
				if(self.isMobile_bl){
					self.curItem_do.getStyle().overflow = "scroll";
					self.curItem_do.getStyle().webkitOverflowScrolling = "touch";
				}
				self.itemHolder_do.addChild(self.curItem_do);
				
				if(!self.isFirstItemShowed_bl){
					self.resizeCurrentItem(false);
					self.showItemFirstTime();
					self.positionButtons(false);
					self.positionShareButtons(false);
					self.hideButtons();
					self.setupThumbnails(800);
				}else{
					self.resizeCurrentItem(false, true);
				}
				
				self.hideZoomButton();	
				
				if(self.playlist_ar[self.id].description){
					self.hasItemDescription_bl = true;
					self.desc_do.setText(self.playlist_ar[self.id].description);
					self.showDescriptionButton();
				}else{
					self.hasItemDescription_bl = false;
					self.hideDescriptionButton();
				}
				if(self.descriptionAnimationType_str == "opacity" && self.hasItemDescription_bl) self.desc_do.hide(false, true, false);
				
				
				self.positionButtons(true);
				self.positionShareButtons(true);
				
				if(self.type_str == FWDRL.VIDEO_TYPE){
					if(!self.data.DFUseVideo_bl){
						self.main_do.addChild(self.info_do);
						self.info_do.showText("To play video mp4 files please set <font color='#FF0000'>useVideo:\"yes\"</font>.");
						return
					}
					if(!FWDRLFlashTest.hasFlashPlayerVersion("9.0.18") && !FWDRLUtils.isLocal && !self.isMobile_bl){
						self.main_do.addChild(self.info_do);
						self.info_do.showText("Please install Adobe flash player! <a href='http://www.adobe.com/go/getflashplayer'>Click here to install.</a> to play this mp4 video file.");
						return
					}
					if(!self.videoHolder_do){
						if(FWDRLUtils.isLocal){
							self.main_do.addChild(self.info_do);
							self.info_do.showText("This browser can't play mp4 video files locally, please use a different browser like Chrome, IE9+, Firefox(WIN), Safari(MAC). It will work on all browsers when tested online.");
							return;
						}	
					}
				
					if(self.videoHolder_do.w == self.finalW - (self.itemBorderSize * 2)
					   && self.videoHolder_do.h == self.finalH - (self.itemBorderSize * 2)){
						setTimeout(self.addContent, 200);	
						self.startAnim(201);
						if(self.showSlideShowAnimation_bl) self.slp_do.animReset();
					}else{
						setTimeout(self.addContent, 800);
						self.startAnim(801);
					}
				}else if(self.type_str == FWDRL.AUDIO_TYPE){
					if(!self.data.DFUseAudio_bl){
						self.main_do.addChild(self.info_do);
						self.info_do.showText("To play audio mp3 files please set <font color='#FF0000'>useAudio:\"yes\"</font>.");
						return
					}
					if(!FWDRLFlashTest.hasFlashPlayerVersion("9.0.18") && !FWDRLUtils.isLocal && !self.isMobile_bl){
						self.main_do.addChild(self.info_do);
						self.info_do.showText("Please install Adobe flash player! <a href='http://www.adobe.com/go/getflashplayer'>Click here to install.</a> to play this mp3 audio file.");
						return
					}
					if(!self.audioHolder_do){
						if(FWDRLUtils.isLocal){
							self.main_do.addChild(self.info_do);
							self.info_do.showText("This browser can't play mp3 audio files locally, please use a different browser like Chrome, IE9+, Firefox(WIN), Safari(MAC). It will work on all browsers when tested online.");
							return;
						}
					}
						
					if(self.audioHolder_do.w == self.finalW - (self.itemBorderSize * 2)
					   && self.audioHolder_do.h == self.finalH - (self.itemBorderSize * 2)){
						setTimeout(self.addContent, 200);	
						self.startAnim(201);
						if(self.showSlideShowAnimation_bl) self.slp_do.animReset();
					}else{
						setTimeout(self.addContent, 800);
						self.startAnim(801);
					}
					
				}else if(self.type_str == FWDRL.IFRAME_TYPE){
					setTimeout(self.addContent, 800);
					self.startAnim(801);
				}else if(self.type_str == FWDRL.FLASH_TYPE){
					if(!FWDRLFlashTest.hasFlashPlayerVersion("9.0.18") && !self.isMobile_bl){
						self.main_do.addChild(self.info_do);
						self.info_do.showText("Please install Adobe flash player! <a href='http://www.adobe.com/go/getflashplayer'>Click here to install.</a> to view this flash content.");
						self.startAnim(801);
						return
					}
					
					if(self.isMobile_bl){
						self.main_do.addChild(self.info_do);
						self.info_do.showText("Adobe flash player is not supported on mobile devices, to view this content please use a desktop machine.");
						self.startAnim(801);
						return;
					}
					setTimeout(self.addContent, 800);
					self.startAnim(801);
				} 
				
				if(self.videoHolder_do){
					if(self.videoHolder_do.w != self.finalW - (self.itemBorderSize * 2)
					   || self.videoHolder_do.h != self.finalH - (self.itemBorderSize * 2)){
						self.videoHolder_do.setX(-5000);
						self.videoHolder_do.w = 1;
						self.videoHolder_do.h = 1;
					}
				}
				
			}
			FWDRL.dispatchEvent(FWDRL.UPDATE, {curId:self.id});
		};
		
		//###########################################//
		/* Add  content */
		//###########################################//
		self.addContent = function(){
			
			if(self.type_str == FWDRL.VIDEO_TYPE){
				self.isAnimForVideoAndAudioPlayersDone_bl = true;
				
				RLVideoPlayer.setVideoSource(self.url);
				RLVideoPlayer.setPosterSource(self.posterPath_str);
				
				if(self.videoAutoPlay_bl && !self.firstVideoOrAudioAdded_bl){
					RLVideoPlayer.play();
				}else if(self.nextVideoOrAudioAutoPlay_bl && self.firstVideoOrAudioAdded_bl){
					RLVideoPlayer.play();
				}
			
				self.resizeCurrentItem();
				self.prevVideoW = self.finalW;
				self.prevVideoH = self.finalH;
				self.firstVideoOrAudioAdded_bl = true;
				self.videoAutoPlay_bl = false;
				self.audioAutoPlay_bl = false;
				return
			};
			
			if(self.type_str == FWDRL.AUDIO_TYPE){
				self.isAnimForVideoAndAudioPlayersDone_bl = true;
				RLAudioPlayer.setSource(self.url);
				if(self.audioAutoPlay_bl && !self.firstVideoOrAudioAdded_bl){
					RLAudioPlayer.play();
				}else if(self.nextVideoOrAudioAutoPlay_bl && self.firstVideoOrAudioAdded_bl){
					RLAudioPlayer.play();
				}
				self.resizeCurrentItem();
				self.firstVideoOrAudioAdded_bl = true;
				self.audioAutoPlay_bl = false;
				self.videoAutoPlay_bl = false;
				return
			};
			
			if(self.type_str == FWDRL.FLASH_TYPE){
				var flashObjectMarkup_str = '<object id="RL_swf_' + parseInt((Math.random() * 99999999999)) + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="100%" height="100%"><param name="movie" value="' + self.url + '"/><param name="wmode" value="opaque"/><param name="scale" value="noscale"/><object type="application/x-shockwave-flash" data="' + self.url + '" width="100%" height="100%"><param name="movie" value="' + self.url + '"/><param name="wmode" value="opaque"/><param name="scale" value="noscale"/></object></object>';
				self.curItem_do.setInnerHTML(flashObjectMarkup_str);
				self.resizeCurrentItem();
				return;
			}
			
			if(self.url.indexOf("RL_HTML") != -1){
				self.addInnerHTMLContent(self.playlist_ar[self.id].html);
				self.resizeCurrentItem();
				return
			};
			
			if(self.url.indexOf("RL_AJAX:") != -1){
				if(FWDRLUtils.isLocal){
					self.ajaxLoadError("Using ajax locally is not possible or allowed, please test online.");
					return;
				}
				
				self.url = self.url.substr(self.url.indexOf(":") + 1);
			
				self.xmlhttp = new XMLHttpRequest();
				self.xmlhttp.onerror = function(){self.ajaxLoadError("Ajax error with code: " + self.xmlhttp.status);};
				
				self.xmlhttp.onreadystatechange=function(){
					if (self.xmlhttp.readyState === 4){
						if(self.xmlhttp.status == 200){
							self.addInnerHTMLContent(self.xmlhttp.responseText);
						}else{
							self.ajaxLoadError("Ajax error with code: " + self.xmlhttp.status);
						}
					}
				};
				
				self.xmlhttp.open("GET", self.url, true);
				try{
					self.xmlhttp.send();
				}catch(e){
					if(e.message) self.ajaxLoadError(e.message);
				}
				return
			};
			
			var iFrame;
			var protocol = "http://";
			if(self.url.indexOf("https") != -1) protocol = "https://";
			if(self.nextVideoOrAudioAutoPlay_bl && self.firstVideoOrAudioAdded_bl) self.videoAutoPlay_bl = true;
			var videoAutoPlay_str = self.videoAutoPlay_bl ? "1" : "0";
			
			self.firstVideoOrAudioAdded_bl = true;
		
			var videoId_str;
			
			iFrame = document.createElement("iframe");
			iFrame.width = "100%";
			iFrame.height = "100%";
			iFrame.allowFullScreen  = 1;
			iFrame.setAttribute('allowFullScreen', '');
			iFrame.frameBorder = 0;
			
			if(self.url.indexOf("youtube.") != -1 || self.url.indexOf("vimeo.") != -1){
				if(self.url.indexOf("youtube.") != -1){
					videoId_str = self.url.replace(/.*\?v=|&.*/ig, "");
					iFrame.src = protocol + "www.youtube.com/embed/" + videoId_str + "?wmode=transparent&autoplay=" + videoAutoPlay_str;
				}else if(self.url.indexOf("vimeo.") != -1){
					videoId_str = self.url.replace(/.*\/|\?.*/ig, "");
					iFrame.src = protocol + "player.vimeo.com/video/" + videoId_str + "?autoplay=" + videoAutoPlay_str;
				}
				self.videoAutoPlay_bl = false;
			}else{
				if(self.url.indexOf("google.") != -1){
					self.url = self.url.replace(/&key=\.*|key=\.*|&key=*/ig, "");
					self.url += "&key=" + self.googleMapsAPIKey_str;
					iFrame.src = self.url;
				}else{
					iFrame.src = self.url;
				}
			
			}
		
			self.curItem_do.screen.appendChild(iFrame);
			
			self.resizeCurrentItem();
		};
		
		self.addInnerHTMLContent = function(htmlContent){
			self.curItem_do.getStyle().overflow = "auto";
			self.curItem_do.setInnerHTML(htmlContent);
			
			if(self.curItem_do.screen.addEventListener){
				self.curItem_do.screen.addEventListener ("mousewheel", function(e){
					if(e.stopImmediatePropagation) e.stopImmediatePropagation();
				});
				self.curItem_do.screen.addEventListener('DOMMouseScroll', function(e){
					if(e.stopImmediatePropagation) e.stopImmediatePropagation();
				});
				self.curItem_do.screen.addEventListener("touchmove", function(e){
					if(self.curItem_do.screen.scrollHeight > self.finalH - self.itemBorderSize * 2) e.stopImmediatePropagation();
				});
			}
		};
		
		self.ajaxLoadError = function(message){
			self.tm.stop();
			self.stopAnim();
			self.preloader_do.hide(true);
			self.main_do.addChild(self.info_do);
			self.info_do.showText(message);
		};
		
		self.closeAjax = function(){
			if(self.xmlhttp){
				self.xmlhttp.onerror = null;
				self.xmlhttp.onreadystatechange = null;
				self.xmlhttp.abort();
				self.xmlhttp = null;
			}
		};
		
	
		//###########################################//
		/* load image */
		//###########################################//
		self.closeImage = function(){
			if(self.image_img){
				self.image_img.onload = null;
				self.image_img.onerror = null;
				self.image_img = null;
			}
		};
		
		self.loadImage = function(){
			self.isLoading_bl = true;
			self.stopAnim();
			self.positionPreloader();
			self.preloader_do.show(true);
			
			
			self.image_img = new Image();
			self.image_img.onload = self.imageLoadComplete;
			self.image_img.onerror = self.imageLoadError;
			self.image_img.src = self.url;
		
		};
		
		self.imageLoadComplete = function(e){
			self.originalW = self.image_img.width;
			self.originalH = self.image_img.height;
			
			self.curItem_do = new FWDRLDisplayObject("img");
			self.curItem_do.setScreen(self.image_img);
			self.curItem_do.type_str = FWDRL.IMAGE_TYPE;
			
			if(!self.isFirstItemShowed_bl){
				self.resizeCurrentItem(false);
				self.showItemFirstTime();
				self.positionButtons(false);
				self.positionShareButtons(false);
				self.hideButtons();
				self.setupThumbnails(800);
			}else{
				self.resizeCurrentItem(true, false);
				if(self.prevItem_do){
					if(self.prevItem_do.type_str == FWDRL.IMAGE_TYPE){
						FWDAnimation.to(self.prevItem_do, .8, {alpha:0, ease:Quint.easeOut});
						FWDAnimation.to(self.prevItem_do, .8, {
							x:parseInt((self.finalW - self.prevItem_do.w)/2), 
							y:parseInt((self.finalH - self.prevItem_do.h)/2), 
							ease:Expo.easeInOut});
					}
				}
				self.curItem_do.setWidth(self.finalW- (self.itemBorderSize * 2));
				self.curItem_do.setHeight(self.finalH - (self.itemBorderSize * 2));
				self.curItem_do.setAlpha(0);
				self.resizeCurrentItem(false, true);
				FWDAnimation.to(self.curItem_do, .8, {alpha:1, delay:.8, ease:Quint.easeOut});
			}
			
			self.startAnim(801);
			
			self.isLoading_bl = false;
			self.prevItem_do = self.curItem_do;
			self.preloader_do.hide(true);
			self.showZoomButton();
			
			if(self.hasItemDescription_bl){
				if(self.descriptionAnimationType_str == "opacity" && self.hasItemDescription_bl) self.desc_do.hide(false, true, false);
				self.showDescriptionButton();
				self.desc_do.setText(self.playlist_ar[self.id].description);
				
			}
		
			self.positionButtons(true);
			self.positionShareButtons(true);
			
			self.itemHolder_do.addChild(self.curItem_do);
		};
		
		self.imageLoadError = function(e){
			self.tm.stop();
			self.stopAnim();
			self.preloader_do.hide(true);
			self.main_do.addChild(self.info_do);
			self.info_do.showText("Image with path <span style='color:#FF0000;'>" + decodeURIComponent(self.url) + "</span> can't be loaded, probably the path is incorrect.");
		};
	
		//####################################//
		/* maximize / minimize image */
		//####################################//
		this.maximizeOrMinimize = function(){
			if(self.isLoading_bl || self.isAnim_bl) return;
			
			var scaleX;
			var scaleY;
			var finalX;
			var finalY;
			var finalW;
			var finalH;
			var totalScale;
			
			self.isAnimMaximizeOrMinimize_bl = true;
			
			clearTimeout(self.maximizeCompleteTimeOutId_to);
			clearTimeout(self.minimizeCompleteTimeOutId_to);
			
			if(self.isMaximized_bl){
				self.isMaximized_bl = false;
				self.zoomButton_do.setButtonState(1);
				
				if(self.isMobile_bl){
					self.removeEventsForScrollngImageOnMobile();
				}else{
					self.removeEventsForScrollngImageOnDesktop();
				}
				
				FWDAnimation.to(self.curItem_do, .8, {
					x:self.finalX + self.itemBorderSize, 
					y:self.finalY + self.itemBorderSize, 
					w:self.finalW - (self.itemBorderSize * 2), 
					h:self.finalH - (self.itemBorderSize * 2), 
					ease:Expo.easeInOut});
				
				self.setButtonsVisible(true);
				
				self.positionButtons(true);
				self.positionShareButtons(true);
				self.minimizeCompleteTimeOutId_to = setTimeout(self.minimizeCompleteHandler, 801);
			}else{
				self.isMaximized_bl = true;
				self.zoomButton_do.setButtonState(0);
				self.tm.pause();
				
				scaleX = self.stageWidth/self.originalW;
				scaleY = self.stageHeight/self.originalH;
				totalScale = 0;
				if(scaleX >= scaleY){
					totalScale = scaleX;
				}else if(scaleX <= scaleY){
					totalScale = scaleY;
				}
				finalW = parseInt(self.originalW * totalScale);
				finalH = parseInt(self.originalH * totalScale);
				finalX = parseInt((self.stageWidth - finalW)/2);
				finalY = parseInt((self.stageHeight - finalH)/2);
				
				if(self.curItem_do.alpha != 1) self.curItem_do.setAlpha(1);			
				self.curItem_do.setX(self.curItem_do.getGlobalX());
				self.curItem_do.setY(self.curItem_do.getGlobalY());
				
				FWDAnimation.to(self.zoomButton_do, .8, {x:self.stageWidth - self.zoomButton_do.w - 1, y:1, ease:Expo.easeInOut});
				
				if(self.isMobile_bl){
					FWDAnimation.to(self.curItem_do, .8, { x:finalX, y:finalY, w:finalW, h:finalH, ease:Expo.easeInOut});
				}else{
					if(scaleX >= scaleY){
						FWDAnimation.to(self.curItem_do, .8, {x:finalX, w:finalW, h:finalH, ease:Expo.easeInOut});
					}else if(scaleX < scaleY){
						FWDAnimation.to(self.curItem_do, .8, {y:finalY, w:finalW, h:finalH, ease:Expo.easeInOut});
					}
					self.addEventsForScrollngImageOnDesktop();
				}
				
				if(self.itemHolder_do.contains(self.imteHolder_do)) self.itemHolder_do.removeChild(self.curItem_do);
				//self.zoomButton_do.disableHover();
				self.main_do.addChild(self.curItem_do);
				self.main_do.addChild(self.zoomButton_do);
				self.maximizeCompleteTimeOutId_to = setTimeout(self.maximizeCompleteHandler, 801);
			}
			
			self.hideShareButtons(true);
		};
		
		self.minimizeCompleteHandler = function(){
			self.isAnimMaximizeOrMinimize_bl = false;
			self.isTweening_bl = false;
			self.itemHolder_do.addChild(self.curItem_do);
			self.resizeCurrentItem();
			self.tm.resume();
			
			//self.zoomButton_do.enableHover();
			//if(!FWDRLUtils.hitTest(self.zoomButton_do.screen, self.gmx, self.gmy)){
			//	self.zoomButton_do.setNormalState();
			//}
			if(self.hasItemDescription_bl && self.showDescription_bl) self.desc_do.show(true);
			self.main_do.addChild(self.zoomButton_do);
			if(self.useDeepLinking_bl) self.dlChangeHandler();
		};
		
		self.maximizeCompleteHandler = function(){
			self.isAnimMaximizeOrMinimize_bl = false;
			self.setButtonsInvisible(true);
			if(self.isMobile_bl) self.addEventsForScrollngImageOnMobile();
			if(self.hasItemDescription_bl && self.showDescription_bl) self.desc_do.hide(false);
		};
		
		self.setButtonsInvisible = function(applyToMainHolder){
			if(self.showCloseButton_bl) self.closeButton_do.setVisible(false);
			if(self.showNextAndPrevButtons_bl){
				self.nextButton_do.setVisible(false);
				self.prevButton_do.setVisible(false);
			}
			if(self.showThumbnailsHideOrShowButton_bl) self.hsThumbanilsButton_do.setVisible(false);
			if(self.showThumbnails_bl) self.thumbnailsManager_do.setVisible(false);
			if(self.showDescriptionButton_bl) self.descButton_do.setVisible(false);
			if(self.showSlideShowButton_bl)  self.slideShowButton_do.setVisible(false);
			if(self.showShareButton_bl) self.shareButton_do.setVisible(false);
			if(self.showSlideShowAnimation_bl) self.slp_do.setVisible(false);
			if(self.showDescription_bl) self.desc_do.setVisible(false);
			if(applyToMainHolder) self.mainItemHolder_do.setVisible(false);
		};
		
		self.setButtonsVisible = function(applyToMainHolder){
			if(self.showCloseButton_bl) self.closeButton_do.setVisible(true);
			if(self.showNextAndPrevButtons_bl){
				self.nextButton_do.setVisible(true);
				self.prevButton_do.setVisible(true);
			}
			if(self.showThumbnailsHideOrShowButton_bl) self.hsThumbanilsButton_do.setVisible(true);
			if(self.showThumbnails_bl) self.thumbnailsManager_do.setVisible(true);
			if(self.showDescriptionButton_bl) self.descButton_do.setVisible(true);
			if(self.showSlideShowButton_bl)  self.slideShowButton_do.setVisible(true);
			if(self.showShareButton_bl) self.shareButton_do.setVisible(true);
			if(self.showSlideShowAnimation_bl) self.slp_do.setVisible(true);
			if(self.showDescription_bl) self.desc_do.setVisible(true);
			if(applyToMainHolder) self.mainItemHolder_do.setVisible(true);
		};
		
		//##############################################//
		/* Add events to pan the image on pc */
		//##############################################//
		this.addEventsForScrollngImageOnDesktop = function(){
			self.updateImageWhenMaximized_int = setInterval(self.updateMaximizedImageHandler, 16);
			if(window.addEventListener){
				window.addEventListener("mousemove", self.updateMaximizeImageOnMouseMovedHandler);
			}else{
				document.attachEvent("onmousemove", self.updateMaximizeImageOnMouseMovedHandler);
			}
			self.hider.stop();
		};
		
		this.removeEventsForScrollngImageOnDesktop = function(){
			clearInterval(self.updateImageWhenMaximized_int);
			if(window.addEventListener){
				window.removeEventListener("mousemove", self.updateMaximizeImageOnMouseMovedHandler);
			}else{
				document.detachEvent("onmousemove", self.updateMaximizeImageOnMouseMovedHandler);
			}
			self.hider.start();
		};
	
		this.updateMaximizeImageOnMouseMovedHandler = function(e){
			var vmc = FWDRLUtils.getViewportMouseCoordinates(e);
		
			self.gmx = vmc.screenX;
			self.gmy = vmc.screenY;
		};
		
		self.updateMaximizedImageHandler = function(){
			
			var targetX;
			var targetY;
			
			self.percentX = self.gmx/self.stageWidth;
			self.percentY = self.gmy/self.stageHeight;
			if(self.percentX > 1) self.percentX = 1;
			if(self.percentY > 1) self.percentY = 1;
			
			var scaleX = self.stageWidth/self.originalW;
			var scaleY = self.stageHeight/self.originalH;
		
			if(scaleX <= scaleY){
				targetX = Math.round(((self.stageWidth - self.curItem_do.w) * self.percentX));
				if(isNaN(targetX)) return;
				FWDAnimation.to(self.curItem_do, .4, {x:targetX});
			}else {
				targetY = Math.round(((self.stageHeight - self.curItem_do.h) * self.percentY));
				if(isNaN(targetY)) return;
				FWDAnimation.to(self.curItem_do, .4, {y:targetY});
			}
		};
		
		//##############################################//
		/* add events to scroll the image on mobile */
		//##############################################//
		self.addEventsForScrollngImageOnMobile = function(){
			if(self.hasPointerEvent_bl){
				window.addEventListener("pointerdown", self.onTouchStartScrollImage);
				window.addEventListener("pointerup", self.onTouchEndScrollImage);
			}else{
				window.addEventListener("touchstart", self.onTouchStartScrollImage);
				window.addEventListener("touchend", self.onTouchEndScrollImage);
			}
		
			clearInterval(self.updateImageWhenMaximized_int);
			self.updateImageWhenMaximized_int = setInterval(self.updateMaximizedImageMobileHandler, 16);
		};
		
		self.removeEventsForScrollngImageOnMobile = function(){
			clearInterval(self.updateImageWhenMaximized_int);
			if(self.hasPointerEvent_bl){
				window.removeEventListener("pointerdown", self.onTouchStartScrollImage);
				window.removeEventListener("pointerup", self.onTouchEndScrollImage);
				window.removeEventListener("pointermove", self.onTouchMoveScrollImage);
			}else{
				window.removeEventListener("touchstart", self.onTouchStartScrollImage);
				window.removeEventListener("touchend", self.onTouchEndScrollImage);	
				window.removeEventListener("touchmove", self.onTouchMoveScrollImage);
			}
			self.isDragging_bl = false;
		};
		
		self.onTouchStartScrollImage =  function(e){
			var vc = FWDRLUtils.getViewportMouseCoordinates(e);	
			if(self.hasPointerEvent_bl){
				window.addEventListener("pointermove", self.onTouchMoveScrollImage);
			}else{
				window.addEventListener("touchmove", self.onTouchMoveScrollImage);
			}
			
			self.lastPresedX = vc.screenX;
			self.lastPresedY = vc.screenY;
			
			e.preventDefault();
		};
		
		self.onTouchEndScrollImage = function(e){
			if(self.hasPointerEvent_bl){
				window.removeEventListener("pointermove", self.onTouchMoveScrollImage);
			}else{
				window.removeEventListener("touchmove", self.onTouchMoveScrollImage);
			}
			self.isDragging_bl = false;
		};
		
		self.onTouchMoveScrollImage = function(e){
			if(e.preventDefault) e.preventDefault();
			
			var vc = FWDRLUtils.getViewportMouseCoordinates(e);	
			var scaleX = self.stageWidth/self.originalW;
			var scaleY = self.stageHeight/self.originalH;
			var toAddX = 0;
			var toAddY = 0;
			self.isDragging_bl = true;	
			
			if(scaleX < scaleY){
				//x
				toAddX = vc.screenX - self.lastPresedX;
				self.lastPresedX = vc.screenX;
				self.curItem_do.setX(self.curItem_do.x + toAddX);
			}else if(scaleX > scaleY){
				//y
				toAddY = vc.screenY - self.lastPresedY;
				self.lastPresedY = vc.screenY;
				self.curItem_do.setY(self.curItem_do.y + toAddY);
			}else{
				toAddX = vc.screenX - self.lastPresedX;
				self.lastPresedX = vc.screenX;
				self.curItem_do.setX(self.curItem_do.x + toAddX);
				
				toAddY = vc.screenY - self.lastPresedY;
				self.lastPresedY = vc.screenY;
				self.curItem_do.setY(self.curItem_do.y + toAddY);
			}
			
			self.vx = toAddX  * 2;
			self.vy = toAddY  * 2;
		};
		
		self.updateMaximizedImageMobileHandler = function(){
			
			var tempX;
			var tempY;
			var curX;
			var curY;
			var tempW;
			var tempH;
			
			if(!self.isDragging_bl){
				
				self.vy *= self.friction;
				self.vx *= self.friction;
				curX = self.curItem_do.x;
				curY = self.curItem_do.y;
				tempX = curX +  self.vx;
				tempY = curY +  self.vy;
				tempW = self.curItem_do.w;
				tempH = self.curItem_do.h;
				
				if(isNaN(tempX) || isNaN(tempY)) return;
				
				self.curItem_do.setX(tempX);
				self.curItem_do.setY(tempY);
				
				if(curY >= 0){
					self.vy2 = (0 - curY) * .3;
					self.vy *= self.friction;
					self.curItem_do.setY(curY + self.vy2);
				}else if(curY <= self.stageHeight - tempH){
					self.vy2 = (self.stageHeight - tempH - curY) * .3;
					self.vy *= self.friction;
					self.curItem_do.setY(curY + self.vy2);
				}
				
				if(curX >= 0){
					self.vx2 = (0 - curX) * .3;
					self.vx *= self.friction;
					self.curItem_do.setX(curX + self.vx2);
				}else if(curX <= self.stageWidth - tempW){
					self.vx2 = (self.stageWidth - tempW - curX) * .3;
					self.vx *= self.friction;
					self.curItem_do.setX(curX + self.vx2);
				}
			}
		};
		
		//####################################//
		/* resize current item */
		//####################################//
		self.resizeCurrentItem = function(onlySetData, animate){	
			if(!self.curItem_do) return;
		
			var containerWidth = self.stageWidth - (self.maxButtonW * 2) - ((self.buttonsOffsetIn + self.buttonsOffsetOut) *  2) - (self.itemBorderSize * 2);
			var containerHeight = self.stageHeight - self.itemOffsetH - (self.itemBorderSize * 2);
			var offsetY = 0;
			
			if(self.areThumbnailsShowed_bl){
				containerHeight -= self.thumbnailH + self.spaceBetweenThumbnailsAndItem;
				offsetY = Math.round((self.thumbnailH + self.spaceBetweenThumbnailsAndItem)/2 - self.spaceBetweenThumbnailsAndItem/2);
			}
			
			var scaleX = containerWidth/self.originalW;
			var scaleY = containerHeight/self.originalH;
			var totalScale = 0;
			
			if(scaleX <= scaleY){
				totalScale = scaleX;
			}else if(scaleX >= scaleY){
				totalScale = scaleY;
			}
			
			if(scaleX >= 1 && scaleY >=1) totalScale = 1;
			
			self.finalW = Math.round((self.originalW * totalScale)) + (self.itemBorderSize * 2);
			self.finalH = Math.round((self.originalH * totalScale)) + (self.itemBorderSize * 2);
			
			if(self.finalW < self.itemBorderSize * 2) self.finalW = self.itemBorderSize * 2;
			if(self.finalH < self.itemBorderSize * 2) self.finalH = self.itemBorderSize * 2;
			
			if(FWDRLUtils.isIEAndLessThen9){
				if(self.finalW < 150) self.finalW = 150;
				if(self.finalH < 150) self.finalH = 150;
			}
			
			if(self.type_str == FWDRL.AUDIO_TYPE && self.audioHolder_do) self.finalH = self.data.audioControllerHeight + (self.itemBorderSize * 2);
			
			self.finalX = Math.round((self.stageWidth  -  self.finalW)/2);
			self.finalY = Math.round((self.stageHeight - self.finalH)/2) - offsetY;
		
			if(onlySetData) return;
			
			FWDAnimation.killTweensOf(self.mainItemHolder_do);
			FWDAnimation.killTweensOf(self.itemBk_do);
			FWDAnimation.killTweensOf(self.itemBorder_do);
			if(animate){
				FWDAnimation.to(self.mainItemHolder_do, .8, {
					x:self.finalX, 
					y:self.finalY, 
					w:self.finalW, 
					h:self.finalH, 
					ease:Expo.easeInOut});
				
				FWDAnimation.to(self.itemBk_do, .8, {
					x:self.itemBorderSize, 
					y:self.itemBorderSize, 
					w:self.finalW - (self.itemBorderSize * 2), 
					h:self.finalH - (self.itemBorderSize * 2), 
					ease:Expo.easeInOut});
				
				FWDAnimation.to(self.itemBorder_do, .8, {
					x:0, 
					y:0, 
					w:self.finalW, 
					h:self.finalH, 
					ease:Expo.easeInOut});
				
				if(self.desc_do){
					FWDAnimation.to(self.desc_do, .8, {
						finalW:self.finalW - (self.itemBorderSize * 2),
						onUpdate:self.desc_do.resizeAndPosition,
						ease:Expo.easeInOut});
				}
				
				if(self.type_str == FWDRL.VIDEO_TYPE && self.videoHolder_do){
					if(self.isAnimForVideoAndAudioPlayersDone_bl){
						
						FWDAnimation.to(self.videoHolder_do, .8, {
							x:self.itemBorderSize,
							y:self.itemBorderSize,
							w:self.finalW - (self.itemBorderSize * 2),
							h:self.finalH - (self.itemBorderSize * 2),
							onUpdate:RLVideoPlayer.resizeHandler,
							ease:Expo.easeInOut});
					}
				}
			}else{
				self.mainItemHolder_do.setX(self.finalX);
				self.mainItemHolder_do.setY(self.finalY);
				self.mainItemHolder_do.setWidth(self.finalW);
				self.mainItemHolder_do.setHeight(self.finalH);
				
				self.itemBk_do.setX(self.itemBorderSize);
				self.itemBk_do.setY(self.itemBorderSize);
				self.itemBk_do.setWidth(self.finalW - (self.itemBorderSize * 2));
				self.itemBk_do.setHeight(self.finalH - (self.itemBorderSize * 2));
				
				self.itemBorder_do.setX(0);
				self.itemBorder_do.setY(0);
				self.itemBorder_do.setWidth(self.finalW);
				self.itemBorder_do.setHeight(self.finalH);
				if(self.itemBorder_do.alpha != 1) self.itemBorder_do.setAlpha(1);
				
				if(self.desc_do){
					self.desc_do.resizeAndPosition(self.finalW - (self.itemBorderSize * 2));	
				}
				
				if(self.type_str == FWDRL.VIDEO_TYPE && self.videoHolder_do){
					if(self.isAnimForVideoAndAudioPlayersDone_bl){
						if(self.isVideoFullScreen_bl){
							self.videoHolder_do.setX(-self.finalX);
							self.videoHolder_do.setY(-self.finalY);
						}else{
							self.videoHolder_do.setX(self.itemBorderSize);
							self.videoHolder_do.setY(self.itemBorderSize);
						}
						self.videoHolder_do.setWidth(self.finalW - (self.itemBorderSize * 2));
						self.videoHolder_do.setHeight(self.finalH - (self.itemBorderSize * 2));
						RLVideoPlayer.resizeHandler();
					}
				}else if(self.type_str == FWDRL.AUDIO_TYPE && self.audioHolder_do){
					if(self.isAnimForVideoAndAudioPlayersDone_bl){
						self.audioHolder_do.setX(self.itemBorderSize);
						self.audioHolder_do.setY(self.itemBorderSize);
						self.audioHolder_do.setWidth(self.finalW - (self.itemBorderSize * 2));
						self.audioHolder_do.setHeight(self.finalH - (self.itemBorderSize * 2));
						RLAudioPlayer.resizeHandler();
					}
				}
			}
			
			FWDAnimation.killTweensOf(self.curItem_do);
		
			if(self.isMaximized_bl){
				
				scaleX = self.stageWidth/self.originalW;
				scaleY = self.stageHeight/self.originalH;
				
				if(scaleX >= scaleY){
					totalScale = scaleX;
				}else if(scaleX <= scaleY){
					totalScale = scaleY;
				}
				
				self.curItem_do.setX(parseInt((self.stageWidth - (self.originalW * totalScale))/2));
				self.curItem_do.setY(parseInt((self.stageHeight - (self.originalH * totalScale))/2));
				self.curItem_do.setWidth(Math.max(0,parseInt(self.originalW * totalScale)));
				self.curItem_do.setHeight(Math.max(0, parseInt(self.originalH * totalScale)));
			}else{
				if(animate){
					FWDAnimation.to(self.curItem_do, .8,{
						x:self.itemBorderSize, 
						y:self.itemBorderSize,
						w:self.finalW - (self.itemBorderSize * 2),
						h:self.finalH - (self.itemBorderSize * 2), 
						ease:Expo.easeInOut});
					
				}else{
					if(self.type_str == FWDRL.IMAGE_TYPE){
						self.curItem_do.setAlpha(1);
					}
					self.curItem_do.setX(self.itemBorderSize);
					self.curItem_do.setY(self.itemBorderSize);
					self.curItem_do.setWidth(self.finalW - (self.itemBorderSize * 2));
					self.curItem_do.setHeight(self.finalH - (self.itemBorderSize * 2));
				}
			}
		};
		
		//####################################//
		/* Show / go to items */
		//####################################//
		self.showItemFirstTime = function(){
			
			self.isFirstItemShowed_bl = true;
		
			self.mainItemHolder_do.setX(self.stageWidth/2);
			self.mainItemHolder_do.setY(self.stageHeight/2);
			self.mainItemHolder_do.setWidth(0);
			self.mainItemHolder_do.setHeight(0);
			self.itemBk_do.setX(0);
			self.itemBk_do.setY(0);
			self.itemBk_do.setWidth(0);
			self.itemBk_do.setHeight(0);
			
			if(self.curItem_do.type_str == FWDRL.IMAGE_TYPE){
				self.curItem_do.setAlpha(0);
				self.curItem_do.setX(-self.finalW/2 + self.itemBorderSize);
				self.curItem_do.setY(-self.finalH/2 + self.itemBorderSize);
				FWDAnimation.to(self.curItem_do, .8, {alpha:1, delay:.8, ease:Quint.easeOut});
				FWDAnimation.to(self.curItem_do, .8, {x:self.itemBorderSize, y:self.itemBorderSize, ease:Expo.easeInOut});
				self.startAnim(1601);
			}
			
			
			FWDAnimation.to(self.mainItemHolder_do, .8, {x:self.finalX, y:self.finalY, w:self.finalW, h:self.finalH, ease:Expo.easeInOut});
			self.itemBorder_do.setAlpha(0);
			FWDAnimation.to(self.itemBorder_do, .8, {alpha:1, x:0, y:0, w:self.finalW, h:self.finalH, ease:Expo.easeInOut});
			
			FWDAnimation.to(self.itemBk_do, .8, {
				x:self.itemBorderSize, 
				y:self.itemBorderSize,
				w:self.finalW - (self.itemBorderSize * 2), 
				h:self.finalH - (self.itemBorderSize * 2),
				ease:Expo.easeInOut
				});
		
			self.hider.start();
			setTimeout(function(){
				if(self.slideShowAutoPlay_bl) self.tm.start();
				FWDRL.dispatchEvent(FWDRL.SHOW_COMPLETE);
			}, 800);
			
			if(self.addKeyboardSupport_bl){
				self.addKeyboardSupport();
			}else{
				self.removeKeyboardSupport();
			}
		};
		
		self.gotoToItem = function(id){
			if(!self.isReady_bl || !self.isFirstItemShowed_bl || self.isAnim_bl) return;
			if(!self.isMobile_bl) self.disableClick();
			self.id  = id;
		
			if(self.useDeepLinking_bl){
				if(self.propsObjVariableName_str){
					FWDAddress.setValue("RL?rl_playlist=" + self.playlistDomOrObj_str + "&rl_id=" + self.id + "&rl_propsobj=" + self.propsObjVariableName_str);
				}else{
					FWDAddress.setValue("RL?rl_playlist=" + self.playlistDomOrObj_str + "&rl_id=" + self.id);
				}
			}else{
				self.createAndShowItem();
			}
		};
		
		self.gotoNextItem = function(){
			if(!self.isReady_bl || !self.isFirstItemShowed_bl || self.isAnim_bl) return;
			if(!self.isMobile_bl) self.disableClick();
			self.id ++;
			if(self.id < 0){
				self.id = self.totalItems - 1;
			}else if(self.id > self.totalItems - 1){
				self.id = 0;
			}
			
			if(self.useDeepLinking_bl){
				if(self.propsObjVariableName_str){
					FWDAddress.setValue("RL?rl_playlist=" + self.playlistDomOrObj_str + "&rl_id=" + self.id + "&rl_propsobj=" + self.propsObjVariableName_str);
				}else{
					FWDAddress.setValue("RL?rl_playlist=" + self.playlistDomOrObj_str + "&rl_id=" + self.id);
				}
			}else{
				self.createAndShowItem();
			}
			self.hideShareButtons(true);
		};
		
		self.gotoPrevItem = function(){
			if(!self.isReady_bl || !self.isFirstItemShowed_bl || self.isAnim_bl) return;
			if(!self.isMobile_bl) self.disableClick();
			self.id --;
			if(self.id < 0){
				self.id = self.totalItems - 1;
			}else if(self.id > self.totalItems - 1){
				self.id = 0;
			}
			
			if(self.useDeepLinking_bl){
				if(self.propsObjVariableName_str){
					FWDAddress.setValue("RL?rl_playlist=" + self.playlistDomOrObj_str + "&rl_id=" + self.id + "&rl_propsobj=" + self.propsObjVariableName_str);
				}else{
					FWDAddress.setValue("RL?rl_playlist=" + self.playlistDomOrObj_str + "&rl_id=" + self.id);
				}
			}else{
				self.createAndShowItem();
			}
			
			self.hideShareButtons(true);
		};
		
		self.removeItems = function(index){
			var child;
			var inChild;
			while(self.itemHolder_do.getNumChildren() > index){
				child = self.itemHolder_do.getChildAt(0);
				FWDAnimation.killTweensOf(child);
				self.itemHolder_do.removeChild(child);
				child.destroy();
			};
			child = null;
		};
		
		//############################################//
		/* Add swipe support */
		//############################################//
		self.addSwipeSupport = function(){	
			if(self.hasPointerEvent_bl){
				self.main_do.screen.addEventListener("pointerdown", self.swipeStartHandler);
			}else{
				self.main_do.screen.addEventListener("touchstart", self.swipeStartHandler);
			}
		};
		
		self.removeSwipeSupport = function(){	
			if(self.hasPointerEvent_bl){
				window.removeEventListener("pointerdown", self.swipeStartHandler);
				window.removeEventListener("pointerup", self.swipeUpHandler);
				window.removeEventListener("pointermove", self.swipeMoveHandler);
			}else{
				window.removeEventListener("touchstart", self.swipeStartHandler);
				window.removeEventListener("touchend", self.swipeUpHandler);
				window.removeEventListener("touchmove", self.swipeMoveHandler);
			}
		
			self.swipeMoved_bl = false;
		};
		
		this.swipeStartHandler = function(e){
			if (e.touches) if(e.touches.length != 1) return;
			var vmc = FWDRLUtils.getViewportMouseCoordinates(e);	
			self.swipeMoved_bl = false;
			self.mouseX = vmc.screenX;;
			self.mouseY = vmc.screenY;
			if(self.hasPointerEvent_bl){
				window.addEventListener("pointerup", self.swipeUpHandler);
				window.addEventListener("pointermove", self.swipeMoveHandler);
			}else{
				window.addEventListener("touchend", self.swipeUpHandler);
				window.addEventListener("touchmove", self.swipeMoveHandler);
			}
		};
		
		self.swipeMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			if(self.isClickedDisabled_bl || (e.touches && e.touches.length != 1)) return;
			self.swipeMoved_bl = true;
			var viewportMouseCoordinates = FWDRLUtils.getViewportMouseCoordinates(e);
			self.dif = self.mouseX - viewportMouseCoordinates.screenX;
			self.mouseX = viewportMouseCoordinates.screenX;
			self.mouseY = viewportMouseCoordinates.screenY;
		};
		
		
		self.swipeUpHandler = function(e){
			if(self.isAnim_bl || self.isAnimMaximizeOrMinimize_bl || self.isMaximized_bl) return;
			var sensitivity;
			if(FWDRLUtils.isApple){
				sensitivity = 20;
			}else{
				sensitivity = 4;
			}
			
			if(self.dif > sensitivity){
				if(!self.isClickedDisabled_bl) self.gotoNextItem();
			}else if(self.dif < -sensitivity){
				if(!self.isClickedDisabled_bl) self.gotoPrevItem();
			}
			
			self.dif = 0;
			
			if(self.hasPointerEvent_bl){
				window.removeEventListener("pointerup", self.swipeUpHandler);
				window.removeEventListener("pointermove", self.swipeMoveHandler);
			}else{
				window.removeEventListener("touchend", self.swipeUpHandler);
				window.removeEventListener("touchmove", self.swipeMoveHandler);
			}
		};
		
		//###########################################//
		/* Add keyboard support */
		//###########################################//
		self.addKeyboardSupport = function(){
			if(self.hasKeyboardSupport_bl) return; 
			self.hasKeyboardSupport_bl = true;
			if(document.addEventListener){
				document.addEventListener("keydown",  self.onKeyDownHandler);	
				document.addEventListener("keyup",  self.onKeyUpHandler);	
			}else{
				document.attachEvent("onkeydown",  self.onKeyDownHandler);	
				document.attachEvent("onkeyup",  self.onKeyUpHandler);	
			}
		};
		
		self.removeKeyboardSupport = function(){
			if(!self.hasKeyboardSupport_bl) return; 
			self.hasKeyboardSupport_bl = false;
			if(document.removeEventListener){
				document.removeEventListener("keydown",  self.onKeyDownHandler);	
				document.removeEventListener("keyup",  self.onKeyUpHandler);	
			}else{
				document.detachEvent("onkeydown",  self.onKeyDownHandler);	
				document.detachEvent("onkeyup",  self.onKeyUpHandler);	
			}
		};
		
		self.onKeyDownHandler = function(e){
			if(document.removeEventListener){
				document.removeEventListener("keydown",  self.onKeyDownHandler);	
			}else{
				document.detachEvent("onkeydown",  self.onKeyDownHandler);	
			}
			
			if(e.keyCode == 39){	
				self.gotoNextItem();
				if(e.preventDefault) e.preventDefault();
				return false;
			}else if(e.keyCode == 37){
				self.gotoPrevItem();
				if(e.preventDefault) e.preventDefault();
				return false;
			}
			
		
		};
		
		this.onKeyUpHandler = function(e){
			if(document.addEventListener){
				document.addEventListener("keydown",  self.onKeyDownHandler);	
			}else{
				document.attachEvent("onkeydown",  self.onKeyDownHandler);	
			}
		};
		
		//###################################################//
		/* Set default settings */
		//###################################################//
		self.setDefaultSettings = function(){
			self.buttonsAlignment_str = self.DFButtonsAlignment_str;
			
			self.defaultItemW = self.DFDefaultItemW;
			self.defaultItemH = self.DFDefaultItemH;
			
			self.descriptionWindowPosition_str = self.DFDescriptionWindowPosition_str;
			if(self.desc_do) self.desc_do.position_str = self.descriptionWindowPosition_str;
			
			self.descriptionAnimationType_str = self.DFDescriptionAnimationType_str;
			if(self.desc_do) self.desc_do.descriptionAnimationType_str = self.descriptionAnimationType_str;
			
			self.backgroundColor_str = self.DFBackgroundColor_str;
			self.bk_do.getStyle().backgroundColor = self.backgroundColor_str;
			
			self.itemBorderColor_str  = self.DFitemBorderColor_str;
			if(self.itemBorder_do) self.itemBorder_do.getStyle().backgroundColor = self.DFitemBorderColor_str;
			
			self.spaceBetweenButtons  = self.DFSpaceBetweenButtons;
			
			self.buttonsHideDelay = self.DFbuttonsHideDelay;
			if(self.hider) self.hider.hideDelay = self.buttonsHideDelay;
			
			self.nextVideoOrAudioAutoPlay_bl = self.DFNextVideoOrAudioAutoPlay_bl;
			
			self.useAsModal_bl = self.DFUseAsModal_bl;
			self.slideShowAutoPlay_bl = self.DFSlideShowAutoPlay_bl;
			self.videoAutoPlay_bl = self.DFVideoAutoPlay_bl;
			self.audioAutoPlay_bl = self.DFAudioAutoPlay_bl;
			self.addKeyboardSupport_bl = self.DFSddKeyboardSupport_bl;
			self.showCloseButton_bl = self.DFShowCloseButton_bl;
			self.showShareButton_bl = self.DFShowFacebookButton_bl;
			self.defaultShowZoomButton_bl = self.DFShowZoomButton;
			self.showSlideShowButton_bl = self.DFShowSlideShowButton_bl;
			self.defaultShowSlideShowAnimation_bl = self.DFSefaultShowSlideShowAnimation_bl;
			self.defaultShowNextAndPrevButtons_bl = self.DFSefaultShowNextAndPrevButtons_bl;
			self.slideShowDelay = self.DFSlideShowDelay;
			if(self.tm) self.tm.delay = self.slideShowDelay;
			if(self.slp_do) self.slp_do.duration = self.slideShowDelay/1000;
			self.itemOffsetH  = self.DFItemOffsetH;
			self.buttonsOffsetIn = self.DFButtonsOffsetIn;
			self.buttonsOffsetOut = self.DFButtonsOffsetOut;
			self.itemBorderSize = self.DFItemBorderSize;
			if(self.desc_do) self.desc_do.margins = self.itemBorderSize;
			self.itemBorderRadius = self.DFItemBorderRadius;
			if(!self.itemBorderRadius){
				self.mainItemHolder_do.getStyle().borderRadius = "";
			}else{
				self.mainItemHolder_do.getStyle().borderRadius = self.itemBorderRadius + "px";
			}
			self.backgroundOpacity = self.DFBackgroundOpacity;
			self.itemBoxShadow_str = self.DFItemBoxShadow_str;
			if(self.itemBoxShadow_str == "none"){
				self.mainItemHolder_do.getStyle().boxShadow = "none";
			}else{
				self.mainItemHolder_do.getStyle().boxShadow = self.itemBoxShadow_str;
			}
			self.itemBkColor_str  = self.DFItemBkColor_str;
			self.itemBk_do.getStyle().backgroundColor = self.itemBkColor_str;
			self.defaultShowThumbnails_bl = self.DFDefaultThumbnails_bl;
			self.defaultShowThumbnailsHideOrShowButton_bl = self.DFDefaultShowThumbnailsHideOrShowButton_bl;
			self.showThumbnailsByDefault_bl = self.DFShowThumbnailsByDefault_bl;
			self.showThumbnailsOverlay_bl = self.DFShowThumbnailsOverlay_bl;
			if(self.thumbnailsManager_do) self.thumbnailsManager_do.showThumbnailsOverlay_bl = self.showThumbnailsOverlay_bl;
			self.showThumbnailsSmallIcon_bl = self.DFShowThumbnailsSmallIcon_bl;
			if(self.thumbnailsManager_do) self.thumbnailsManager_do.showThumbnailsSmallIcon_bl = self.showThumbnailsSmallIcon_bl;
			self.thumbnailsOffsetBottom = self.DFThumbnailsOffsetBottom;
			self.thumbnailH = self.DFThumbnailH;
			if(self.thumbnailsManager_do){
				self.thumbnailsManager_do.thumbnailsOffsetBottom = self.thumbnailsOffsetBottom;
				self.thumbnailsManager_do.thumbnailH = self.thumbnailH - self.thumbnailsOffsetBottom;
				self.thumbnailsManager_do.stageHeight = self.thumbnailH;
			}
			self.thumbnailsBorderSize = self.DFThumbnailsBorderSize;
			if(self.thumbnailsManager_do) self.thumbnailsManager_do.thumbnailsBorderSize = self.thumbnailsBorderSize;
			self.thumbnailsBorderRadius = self.DFThumbnailsBorderRadius;
			if(self.thumbnailsManager_do) self.thumbnailsManager_do.thumbnailsBorderRadius = self.thumbnailsBorderRadius;
			self.spaceBetweenThumbnailsAndItem = self.DFSpaceBetweenThumbnailsAndItem;
			self.spaceBetweenThumbnails = self.DFSpaceBetweenThumbnails;
			if(self.thumbnailsManager_do) self.thumbnailsManager_do.spaceBetweenThumbnails = self.spaceBetweenThumbnails;
			self.thumbnailsOverlayOpacity = self.DFThumbnailsOverlayOpacity;
			if(self.thumbnailsManager_do) self.thumbnailsManager_do.thumbnailsOverlayOpacity = self.thumbnailsOverlayOpacity;
			self.thumbnailsOverlayColor_str = self.DFThumbnailsOverlayColor_str;
			if(self.thumbnailsManager_do) self.thumbnailsManager_do.thumbnailsOverlayColor_str = self.thumbnailsOverlayColor_str;
			self.thumbnailsBorderNormalColor_str = self.DFThumbnailsBorderNormalColor;
			if(self.thumbnailsManager_do) self.thumbnailsManager_do.thumbnailsBorderNormalColor_str = self.thumbnailsBorderNormalColor_str;
			self.thumbnailsBorderSelectedColor_str = self.DFThumbnailsBorderSelectedColor_str ;
			if(self.thumbnailsManager_do) self.thumbnailsManager_do.thumbnailsBorderSelectedColor_str = self.thumbnailsBorderNormalColor_str;
			self.defaultHideDescriptionButtons_bl = self.DFDefaultHideDescriptionButtons_bl;
			self.defaultShowDescriptionByDefault_bl = self.DFDefaultShowDescriptionByDefault_bl;
			self.showDescription_bl = self.defaultShowDescriptionByDefault_bl;
			self.descriptionWindowBackgroundColor_str = self.DFDescriptionWindowBackgroundColor;
			
			if(self.desc_do){
				self.desc_do.backgroundColor_str = self.descriptionWindowBackgroundColor_str;
				self.desc_do.bk_do.setBkColor(self.descriptionWindowBackgroundColor_str);
			}
			self.descriptionWindowBackgroundOpacity = self.DFDescriptionWindowBackgroundOpacity;
			if(self.desc_do){
				self.desc_do.backgroundOpacity = self.descriptionWindowBackgroundOpacity;
				self.desc_do.bk_do.setAlpha(self.desc_do.backgroundOpacity);
			}
			
			self.data.videoControllerBackgroundColor_str = self.DFVideoControllerBackgroundColor_str;
			self.data.videoPosterBackgroundColor_str = self.DFVideoPosterBackgroundColor_str;
			self.data.videoPosterBackgroundColor_str = self.DFVideoPosterBackgroundColor_str;
			
			
			if(self.video_do && self.video_do.controller_do){
				self.video_do.controller_do.mainHolder_do.getStyle().backgroundColor = self.data.videoControllerBackgroundColor_str;
				self.video_do.videoPoster_do.getStyle().backgroundColor = self.data.videoPosterBackgroundColor_str;
			}
			
			self.data.audioControllerBackgroundColor_str = self.DFAudioControllerBackgroundColor_str;
			if(self.audio_do && self.audio_do.controller_do) self.audio_do.controller_do.getStyle().backgroundColor = self.data.audioControllerBackgroundColor_str;
		};
		
		//################################################//
		/* Set setings based on object */
		//################################################//
		self.setObjectPropsSettings = function(props_obj){
			var test;
			for(var prop in props_obj){
				switch(prop){
					case "defaultItemWidth":
						self.defaultItemW = props_obj.defaultItemWidth || 640;
						break;
					case "defaultItemHeight":
						self.defaultItemH = props_obj.defaultItemHeight || 380;
						break;
					case "buttonsAlignment":
						self.buttonsAlignment_str = props_obj.buttonsAlignment || "in";
						var test = self.buttonsAlignment_str == "in" 
							   || self.buttonsAlignment_str == "out";
						if(!test) self.buttonsAlignment_str = "in";
						break;
					case "descriptionWindowPosition":
						self.descriptionWindowPosition_str = props_obj.descriptionWindowPosition || "top";
						test = self.descriptionWindowPosition_str == "top" 
							   || self.descriptionWindowPosition_str == "bottom";
						if(!test) self.descriptionWindowPosition_str = "top";
						if(self.desc_do) self.desc_do.position_str = self.descriptionWindowPosition_str;
						break;
					case "showDescriptionButton":
						self.defaultHideDescriptionButtons_bl = props_obj.showDescriptionButton;
						self.defaultHideDescriptionButtons_bl = self.defaultHideDescriptionButtons_bl == "yes" ? true : false;
						break;
					case "showDescriptionByDefault":
						self.defaultShowDescriptionByDefault_bl = props_obj.showDescriptionByDefault;
						self.defaultShowDescriptionByDefault_bl = self.defaultShowDescriptionByDefault_bl == "yes" ? true : false;
						self.showDescription_bl = self.defaultShowDescriptionByDefault_bl;
						break;
					case "descriptionWindowAnimationType":
						self.descriptionAnimationType_str = props_obj.descriptionWindowAnimationType || "motion";
						test = self.descriptionAnimationType_str == "motion" 
							   || self.descriptionAnimationType_str == "opacity";
						if(!test) self.descriptionAnimationType_str = "motion";
						if(self.desc_do) self.desc_do.descriptionAnimationType_str = self.descriptionAnimationType_str;
						break;
					case "descriptionWindowBackgroundColor":
						self.descriptionWindowBackgroundColor_str = props_obj.descriptionWindowBackgroundColor || "#FF0000";
						if(self.desc_do){
							self.desc_do.backgroundColor_str = self.descriptionWindowBackgroundColor_str;
							self.desc_do.bk_do.setBkColor(self.descriptionWindowBackgroundColor_str);
						}
						break;
					case "descriptionWindowBackgroundOpacity":
						self.descriptionWindowBackgroundOpacity = props_obj.descriptionWindowBackgroundOpacity || 1;
						if(self.desc_do){
							self.desc_do.backgroundOpacity = self.descriptionWindowBackgroundOpacity;
							self.desc_do.bk_do.setAlpha(self.desc_do.backgroundOpacity);
						}
						break;
					case "backgroundColor":
						self.backgroundColor_str = props_obj.backgroundColor || "#000000";
						self.bk_do.getStyle().backgroundColor = self.backgroundColor_str;
						break;
					case "itemBorderColor":
						self.itemBorderColor_str = props_obj.itemBorderColor || "transparent";
						if(self.itemBorder_do) self.itemBorder_do.getStyle().backgroundColor = self.itemBorderColor_str;
						break;
					case "spaceBetweenButtons":
						self.spaceBetweenButtons = props_obj.spaceBetweenButtons || 0; 
						break;
					case "buttonsHideDelay":
						self.buttonsHideDelay = props_obj.buttonsHideDelay || 3;
						self.buttonsHideDelay *= 1000;
						if(self.hider) self.hider.hideDelay = self.buttonsHideDelay;
						break;
					case "useAsModal":
						self.useAsModal_bl = props_obj.useAsModal;
						self.useAsModal_bl = self.useAsModal_bl == "yes" ? true : false;
						break;
					case "slideShowAutoPlay":
						self.slideShowAutoPlay_bl = props_obj.slideShowAutoPlay;
						self.slideShowAutoPlay_bl = self.slideShowAutoPlay_bl == "yes" ? true : false;
						break;
					case "videoAutoPlay":
						self.videoAutoPlay_bl = props_obj.videoAutoPlay;
						self.videoAutoPlay_bl = self.videoAutoPlay_bl == "yes" ? true : false;
						if(self.isMobile_bl) self.videoAutoPlay_bl = false;
						break;
					case "nextVideoOrAudioAutoPlay":
						self.nextVideoOrAudioAutoPlay_bl = props_obj.nextVideoOrAudioAutoPlay;
						self.nextVideoOrAudioAutoPlay_bl = self.nextVideoOrAudioAutoPlay_bl == "yes" ? true : false;
						if(self.isMobile_bl) self.nextVideoOrAudioAutoPlay_bl = false;
						break;
					case "audioAutoPlay":
						self.audioAutoPlay_bl = props_obj.audioAutoPlay;
						self.audioAutoPlay_bl = self.audioAutoPlay_bl == "yes" ? true : false;
						if(self.isMobile_bl) self.audioAutoPlay_bl = false;
						break;
					case "addKeyboardSupport":
						self.addKeyboardSupport_bl = props_obj.addKeyboardSupport;
						self.addKeyboardSupport_bl = self.addKeyboardSupport_bl == "yes" ? true : false;
						break;
					case "showCloseButton":
						self.showCloseButton_bl = props_obj.showCloseButton; 
						self.showCloseButton_bl = self.showCloseButton_bl == "no" ? false : true;
						break;
					case "showShareButton":
						self.showShareButton_bl = props_obj.showShareButton;
						self.showShareButton_bl = self.showShareButton_bl == "yes" ? true : false;
						break;
					case "showZoomButton":
						self.defaultShowZoomButton_bl = props_obj.showZoomButton; 
						self.defaultShowZoomButton_bl = self.defaultShowZoomButton_bl == "no" ? false : true;
						break;
					case "showSlideShowButton":
						self.showSlideShowButton_bl = props_obj.showSlideShowButton;
						self.showSlideShowButton_bl = self.showSlideShowButton_bl == "yes" ? true : false;
						break;
					case "showSlideShowAnimation":
						self.defaultShowSlideShowAnimation_bl = props_obj.showSlideShowAnimation;
						self.defaultShowSlideShowAnimation_bl = self.defaultShowSlideShowAnimation_bl == "yes" ? true : false;
						break;	
					case "showNextAndPrevButtons":
						self.defaultShowNextAndPrevButtons_bl = props_obj.showNextAndPrevButtons; 
						self.defaultShowNextAndPrevButtons_bl = self.defaultShowNextAndPrevButtons_bl == "no" ? false : true;
						if(props_obj.showNextAndPrevButtonsOnMobile == "no" && self.isMobile_bl)  self.defaultShowNextAndPrevButtons_bl = false;
						break;	
					case "slideShowDelay":
						self.slideShowDelay = parseInt(props_obj.slideShowDelay) * 1000;
						if(self.slideShowDelay < 1/1000) self.slideShowDelay = 1000;
						if(self.tm) self.tm.delay = self.slideShowDelay;
						if(self.slp_do) self.slp_do.duration = self.slideShowDelay/1000;
						break;	
					case "itemOffsetHeight":
						self.itemOffsetH = props_obj.itemOffsetHeight || 0;
						break;
					case "buttonsOffsetIn":
						if(self.buttonsAlignment_str == FWDRL.BUTTONS_IN){
							this.buttonsOffsetIn = props_obj.buttonsOffsetIn || 0;
						}else{
							this.buttonsOffsetIn = props_obj.buttonsOffsetOut || 0;
						}
						break;	
					case "buttonsOffsetOut":
						if(self.buttonsAlignment_str == FWDRL.BUTTONS_IN){
							self.buttonsOffsetOut = props_obj.buttonsOffsetOut || 0;
						}else{
							self.buttonsOffsetOut = props_obj.buttonsOffsetIn || 0;
						}
						break;	
					case "itemBorderSize":
						self.itemBorderSize = props_obj.itemBorderSize || 0; 
						//if(self.itemBorderSize == 0) self.itemBorderColor_str = "transparent";
						if(self.desc_do) self.desc_do.margins = self.itemBorderSize;
						break;	
					case "itemBorderRadius":
						self.itemBorderRadius = props_obj.itemBorderRadius || 0; 
						if(!self.itemBorderRadius){
							self.mainItemHolder_do.getStyle().borderRadius = "";
						}else{
							self.mainItemHolder_do.getStyle().borderRadius = self.itemBorderRadius + "px";
						}
						break;	
					case "backgroundOpacity":
						self.backgroundOpacity = props_obj.backgroundOpacity || .8;
						break;	
					case "itemBoxShadow":
						self.itemBoxShadow_str = props_obj.itemBoxShadow || "none";
						if(self.itemBoxShadow_str == "none"){
							self.mainItemHolder_do.getStyle().boxShadow = "none";
						}else{
							self.mainItemHolder_do.getStyle().boxShadow = self.itemBoxShadow_str;
						}
						break;
					case "itemBackgroundColor":
						self.itemBkColor_str = props_obj.itemBackgroundColor || "transparent";
						self.itemBk_do.getStyle().backgroundColor = self.itemBkColor_str;
						break;
					case "showThumbnails":
						self.defaultShowThumbnails_bl = props_obj.showThumbnails;
						self.defaultShowThumbnails_bl = self.defaultShowThumbnails_bl == "yes" ? true : false;
						break;	
					case "showThumbnailsHideOrShowButton":
						self.defaultShowThumbnailsHideOrShowButton_bl = props_obj.showThumbnailsHideOrShowButton;
						self.defaultShowThumbnailsHideOrShowButton_bl = self.defaultShowThumbnailsHideOrShowButton_bl == "yes" ? true : false;
						break;
					case "showThumbnailsByDefault":
						self.showThumbnailsByDefault_bl = props_obj.showThumbnailsByDefault;
						self.showThumbnailsByDefault_bl = self.showThumbnailsByDefault_bl == "yes" ? true : false;
						break;	
					case "showThumbnailsOverlay":
						self.showThumbnailsOverlay_bl = props_obj.showThumbnailsOverlay; 
						self.showThumbnailsOverlay_bl = self.showThumbnailsOverlay_bl == "yes" ? true : false;
						if(self.thumbnailsManager_do) self.thumbnailsManager_do.showThumbnailsOverlay_bl = self.showThumbnailsOverlay_bl;
						break;
					case "showThumbnailsSmallIcon":
						self.showThumbnailsSmallIcon_bl = props_obj.showThumbnailsSmallIcon; 
						self.showThumbnailsSmallIcon_bl = self.showThumbnailsSmallIcon_bl == "yes" ? true : false;
						if(self.thumbnailsManager_do) self.thumbnailsManager_do.showThumbnailsSmallIcon_bl = self.showThumbnailsSmallIcon_bl;
						break;
					case "thumbnailsOffsetBottom":
						self.thumbnailsOffsetBottom = props_obj.thumbnailsOffsetBottom || 0;
						if(self.thumbnailsManager_do) self.thumbnailsManager_do.thumbnailsOffsetBottom = self.thumbnailsOffsetBottom;
						break;
					case "thumbnailsImageHeight":
						self.thumbnailH = props_obj.thumbnailsImageHeight || 50;
						break;
					case "thumbnailsBorderSize":
						self.thumbnailsBorderSize = props_obj.thumbnailsBorderSize || 0;
						if(self.thumbnailsManager_do) self.thumbnailsManager_do.thumbnailsBorderSize = self.thumbnailsBorderSize;
						break;
					case "thumbnailsBorderRadius":
						self.thumbnailsBorderRadius = props_obj.thumbnailsBorderRadius || 0;
						if(self.thumbnailsManager_do) self.thumbnailsManager_do.thumbnailsBorderRadius = self.thumbnailsBorderRadius;
						break;
					case "spaceBetweenThumbnailsAndItem":
						self.spaceBetweenThumbnailsAndItem = props_obj.spaceBetweenThumbnailsAndItem || 0;
						break;
					case "spaceBetweenThumbnails":
						self.spaceBetweenThumbnails = props_obj.spaceBetweenThumbnails || 0;
						if(self.thumbnailsManager_do) self.thumbnailsManager_do.spaceBetweenThumbnails = self.spaceBetweenThumbnails;
						break;
					case "thumbnailsOverlayOpacity":
						self.thumbnailsOverlayOpacity = props_obj.thumbnailsOverlayOpacity || 1;
						if(self.thumbnailsManager_do) self.thumbnailsManager_do.thumbnailsOverlayOpacity = self.thumbnailsOverlayOpacity;
						break;
					case "thumbnailsOverlayColor":
						self.thumbnailsOverlayColor_str = props_obj.thumbnailsOverlayColor || "#FF0000";
						if(self.thumbnailsManager_do) self.thumbnailsManager_do.thumbnailsOverlayColor_str = self.thumbnailsOverlayColor_str;
						break;
					case "thumbnailsBorderNormalColor":
						self.thumbnailsBorderNormalColor_str = props_obj.thumbnailsBorderNormalColor || "#FF0000";
						if(self.thumbnailsManager_do) self.thumbnailsManager_do.thumbnailsBorderNormalColor_str = self.thumbnailsBorderNormalColor_str;
						break;
					case "thumbnailsBorderSelectedColor":
						self.thumbnailsBorderSelectedColor_str = props_obj.thumbnailsBorderSelectedColor || "#FF0000";
						if(self.thumbnailsManager_do) self.thumbnailsManager_do.thumbnailsBorderSelectedColor_str = self.thumbnailsBorderNormalColor_str;
						break;
					case "videoControllerBackgroundColor":
						self.data.videoControllerBackgroundColor_str = props_obj.videoControllerBackgroundColor || "transparent";
						if(self.video_do && self.video_do.controller_do) self.video_do.controller_do.mainHolder_do.getStyle().backgroundColor = self.data.videoControllerBackgroundColor_str;
						break;
					case "videoPosterBackgroundColor":
						self.data.videoPosterBackgroundColor_str = props_obj.videoPosterBackgroundColor || "transparent";
						if(self.video_do) self.video_do.videoPoster_do.getStyle().backgroundColor = self.data.videoPosterBackgroundColor_str;
						break;
					case "audioControllerBackgroundColor":
						self.data.audioControllerBackgroundColor_str = props_obj.audioControllerBackgroundColor || "transparent";
						if(self.audio_do && self.audio_do.controller_do) self.audio_do.controller_do.getStyle().backgroundColor = self.data.audioControllerBackgroundColor_str;
						break;
				}	
			}
			
			if(props_obj.thumbnailsImageHeight){
				
				self.thumbnailH += (self.thumbnailsBorderSize * 2) + self.thumbnailsOffsetBottom;
				if(self.thumbnailsManager_do){
					self.thumbnailsManager_do.thumbnailH = self.thumbnailH - self.thumbnailsOffsetBottom;
					self.thumbnailsManager_do.stageHeight = self.thumbnailH;
				}
				
			}
		};
		
		//###########################################//
		/* event dispatcher */
		//###########################################//
		FWDRL.addListener = function (type_str, listener){
	    	if(!self.listeners) return;
	    	if(type_str == undefined) throw Error("type_str is required.");
	    	if(typeof type_str === "object") throw Error("type_str must be of type_str String.");
	    	if(typeof listener != "function") throw Error("listener must be of type_str Function.");
	    	
	        var event = {};
	        event.type_str = type_str;
	        event.listener = listener;
	        event.target = self;
	        self.listeners.events_ar.push(event);
	    };
	    
	    FWDRL.dispatchEvent = function(type_str, props){
	    	if(self.listeners == null) return;
	    	if(type_str == undefined) throw Error("type_str is required.");
	    	if(typeof type_str === "object") throw Error("type_str must be of type_str String.");
	    	
	        for (var i=0, len=self.listeners.events_ar.length; i < len; i++){
	        	if(self.listeners.events_ar[i].target === self && self.listeners.events_ar[i].type_str === type_str){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		self.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		self.listeners.events_ar[i].listener.call(self, self.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	    FWDRL.removeListener = function(type_str, listener){
	    	if(type_str == undefined) throw Error("type_str is required.");
	    	if(typeof type_str === "object") throw Error("type_str must be of type_str String.");
	    	if(typeof listener != "function") throw Error("listener must be of type_str Function." + type_str);
	    	
	        for (var i=0, len=self.listeners.events_ar.length; i < len; i++){
	        	if(self.listeners.events_ar[i].target === self 
	        			&& self.listeners.events_ar[i].type_str === type_str
	        			&& self.listeners.events_ar[i].listener ===  listener
	        	){
	        		self.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };		
		self.init();
	};
	
	/* set prototype */
	FWDRL.setPrototype =  function(){
		FWDRL.prototype = new FWDRVPEventDispatcher();
	};
	
	FWDRL.READY = "ready";
	FWDRL.SHOW_START = "showStart";
	FWDRL.SHOW_COMPLETE = "showComplete";
	FWDRL.HIDE_START = "hideStart";
	FWDRL.HIDE_COMPLETE	= "hidecComplete";
	FWDRL.UPDATE = "update";
	FWDRL.BUTTONS_IN = "in";
	FWDRL.READY = "ready";
	FWDRL.ERROR = "error";
	FWDRL.IMAGE_TYPE = "image";
	FWDRL.VIDEO_TYPE = "video";
	FWDRL.AUDIO_TYPE = "audio";
	FWDRL.FLASH_TYPE = "flash";
	FWDRL.IFRAME_TYPE = "iframe";
	FWDRL.MAXIMIZE_COMPLETE = "maximizeComplete";
	
	window.FWDRL = FWDRL;
	
}(window));/* FWDRLComplexButton */
(function (){
var FWDRLComplexButton = function(
			n1Img, 
			s1Path, 
			n2Img, 
			s2Path, 
			disptachMainEvent_bl
		){
		
		var self = this;
		var prototype = FWDRLComplexButton.prototype;
		
		this.n1Img = n1Img;
		this.s1Path_str = s1Path;
		this.n2Img = n2Img;
		this.s2Path_str = s2Path;
	
		this.buttonsHolder_do;
		this.firstButton_do;
		this.n1_do;
		this.s1_do;
		this.secondButton_do;
		this.n2_do;
		this.s2_do;
		
		this.buttonWidth = self.n1Img.width;
		this.buttonHeight = self.n1Img.height;
		
		this.isSelectedState_bl = false;
		this.currentState = 1;
		this.isDisabled_bl = false;
		this.isMaximized_bl = false;
		this.disptachMainEvent_bl = disptachMainEvent_bl;
		this.isDisabled_bl = false;
		this.isHoverDisabled_bl = false;
		this.isMobile_bl = FWDRLUtils.isMobile;
		this.hasPointerEvent_bl = FWDRLUtils.hasPointerEvent;
		this.allowToCreateSecondButton_bl = !self.isMobile_bl || self.hasPointerEvent_bl;
		
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setButtonMode(true);
			self.setWidth(self.buttonWidth);
			self.setHeight(self.buttonHeight);
			self.setupMainContainers();
			self.secondButton_do.setX(-50);
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			
			self.buttonsHolder_do = new FWDRLDisplayObject("div");
			self.buttonsHolder_do.setOverflow("visible");
			
			self.firstButton_do = new FWDRLDisplayObject("div");
			self.addChild(self.firstButton_do);
			self.n1_do = new FWDRLDisplayObject("img");	
			self.n1_do.setScreen(self.n1Img);
			self.firstButton_do.addChild(self.n1_do);
			if(self.allowToCreateSecondButton_bl){
				self.s1_do = new FWDRLDisplayObject("img");
				var img1 = new Image();
				img1.src = self.s1Path_str;
				self.s1_do.setScreen(img1);
				self.s1_do.setWidth(self.buttonWidth);
				self.s1_do.setHeight(self.buttonHeight);
				self.s1_do.setAlpha(0);
				self.firstButton_do.addChild(self.s1_do);
			}
			self.firstButton_do.setWidth(self.buttonWidth);
			self.firstButton_do.setHeight(self.buttonHeight);
			
			self.secondButton_do = new FWDRLDisplayObject("div");
			self.addChild(self.secondButton_do);
			self.n2_do = new FWDRLDisplayObject("img");	
			self.n2_do.setScreen(self.n2Img);
			self.secondButton_do.addChild(self.n2_do);
			
			if(self.allowToCreateSecondButton_bl){
				self.s2_do = new FWDRLDisplayObject("img");
				var img2 = new Image();
				img2.src = self.s2Path_str;
				self.s2_do.setScreen(img2);
				self.s2_do.setWidth(self.buttonWidth);
				self.s2_do.setHeight(self.buttonHeight);
				self.s2_do.setAlpha(0);
				self.secondButton_do.addChild(self.s2_do);
			}
			
			self.secondButton_do.setWidth(self.buttonWidth);
			self.secondButton_do.setHeight(self.buttonHeight);
			
			self.buttonsHolder_do.addChild(self.secondButton_do);
			self.buttonsHolder_do.addChild(self.firstButton_do);
			self.addChild(self.buttonsHolder_do);
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					
					    self.screen.addEventListener("pointerdown", self.onMouseUp);
						self.screen.addEventListener("pointerover", self.onMouseOver);
						self.screen.addEventListener("pointerout", self.onMouseOut);
					
				}else{
					self.screen.addEventListener("toustart", self.onDown);
					self.screen.addEventListener("touchend", self.onMouseUp);
				}
			}else if(self.screen.addEventListener){	
				self.screen.addEventListener("mouseover", self.onMouseOver);
				self.screen.addEventListener("mouseout", self.onMouseOut);
				self.screen.addEventListener("mouseup", self.onMouseUp);
			}else if(self.screen.attachEvent){
				self.screen.attachEvent("onmouseover", self.onMouseOver);
				self.screen.attachEvent("onmouseout", self.onMouseOut);
				self.screen.attachEvent("onmousedown", self.onMouseUp);
			}
		};
		
		self.onMouseOver = function(e, animate){
			self.dispatchEvent(FWDRLComplexButton.SHOW_TOOLTIP, {e:e});
			if(self.isDisabled_bl || self.isSelectedState_bl || self.isHoverDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == "mouse"){
				self.dispatchEvent(FWDRLComplexButton.MOUSE_OVER, {e:e});
				self.setSelectedState(true);
			}
		};
			
		self.onMouseOut = function(e){
			if(self.isDisabled_bl || !self.isSelectedState_bl || self.isHoverDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == "mouse"){
				self.setNormalState();
				self.dispatchEvent(FWDRLComplexButton.MOUSE_OUT);
			}
		};
		
		self.onDown = function(e){
			if(e.preventDefault) e.preventDefault();
		};
	
		self.onMouseUp = function(e){
			
			if(self.isDisabled_bl || e.button == 2) return;
			if(e.preventDefault) e.preventDefault();
			if(!self.isMobile_bl) self.onMouseOver(e, false);
		
			//if(self.hasPointerEvent_bl) self.setNormalState();
			if(self.disptachMainEvent_bl) self.dispatchEvent(FWDRLComplexButton.MOUSE_UP, {e:e});
		};
		
		//##############################//
		/* toggle button */
		//#############################//
		self.toggleButton = function(){
			if(self.currentState == 1){
				self.firstButton_do.setX(-50);
				self.secondButton_do.setX(0);
				self.currentState = 0;
				self.dispatchEvent(FWDRLComplexButton.FIRST_BUTTON_CLICK);
			}else{
				self.firstButton_do.setX(-50);
				self.secondButton_do.setX(0);
				self.currentState = 1;
				self.dispatchEvent(FWDRLComplexButton.SECOND_BUTTON_CLICK);
			}
		};
		
		//##############################//
		/* set second buttons state */
		//##############################//
		self.setButtonState = function(state){
			if(state == 1){
				self.firstButton_do.setX(0);
				self.secondButton_do.setX(-50);
				self.currentState = 1; 
			}else{
				self.firstButton_do.setX(-50);
				self.secondButton_do.setX(0);
				self.currentState = 0; 
			}
		};
		
		//###############################//
		/* set normal state */
		//################################//
		this.setNormalState = function(){
			if(self.isMobile_bl && !self.hasPointerEvent_bl) return;
			self.isSelectedState_bl = false;
			FWDAnimation.killTweensOf(self.s1_do);
			FWDAnimation.killTweensOf(self.s2_do);
			FWDAnimation.to(self.s1_do, .5, {alpha:0, ease:Expo.easeOut});	
			FWDAnimation.to(self.s2_do, .5, {alpha:0, ease:Expo.easeOut});
		};
		
		this.setSelectedState = function(animate){
			self.isSelectedState_bl = true;
			FWDAnimation.killTweensOf(self.s1_do);
			FWDAnimation.killTweensOf(self.s2_do);
			FWDAnimation.to(self.s1_do, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
			FWDAnimation.to(self.s2_do, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
		};
		
		
		//###################################//
		/* Enable disable */
		//###################################//
		this.disable = function(){
			self.isDisabled_bl = true;
			self.setButtonMode(false);
			FWDAnimation.to(self, .6, {alpha:.4});
		};
		
		this.enable = function(){
			self.isDisabled_bl = false;
			self.setButtonMode(true);
			FWDAnimation.to(self, .6, {alpha:1});
		};
		
		this.disableHover = function(){
			self.isHoverDisabled_bl = true;
			self.setSelectedState();
		};
		
		this.enableHover = function(){
			self.isHoverDisabled_bl = false;
			//self.setSelectedState();
		};
		
		self.init();
	};
	
	/* set prototype */
	FWDRLComplexButton.setPrototype = function(){
		FWDRLComplexButton.prototype = new FWDRLDisplayObject("div");
	};
	
	FWDRLComplexButton.FIRST_BUTTON_CLICK = "onFirstClick";
	FWDRLComplexButton.SECOND_BUTTON_CLICK = "secondButtonOnClick";
	FWDRLComplexButton.SHOW_TOOLTIP = "showToolTip";
	FWDRLComplexButton.MOUSE_OVER = "onMouseOver";
	FWDRLComplexButton.MOUSE_OUT = "onMouseOut";
	FWDRLComplexButton.MOUSE_UP = "onMouseUp";
	FWDRLComplexButton.CLICK = "onClick";
	
	FWDRLComplexButton.prototype = null;
	window.FWDRLComplexButton = FWDRLComplexButton;
}(window));/* Thumb */
(function (window){
	
	var FWDRLConsole = function(){
		
		var self  = this;
		var prototype = FWDRLConsole.prototype;
		
		this.main_do = null;
	
		this.init = function(){
			this.setupScreen();
			window.onerror = this.showError;
			this.screen.style.zIndex = 99999999999999999999;
			setTimeout(this.addConsoleToDom, 100);
			setInterval(this.position, 100);
		};
		
		this.position = function(){
			var scrollOffsets = FWDRLUtils.getScrollOffsets();
			self.setX(scrollOffsets.x);
			self.setY(scrollOffsets.y + 30);
		};
		
		this.addConsoleToDom  = function(){
			if(navigator.userAgent.toLowerCase().indexOf("msie 7") != -1){
				document.getElementsByTagName("body")[0].appendChild(self.screen);
			}else{
				document.documentElement.appendChild(self.screen);
			}
		};
		
		/* setup screens */
		this.setupScreen = function(){
			this.main_do = new FWDRLDisplayObject("div", "absolute");
			this.main_do.setOverflow("auto");
			this.main_do.setWidth(300);
			this.main_do.setHeight(150);
			this.setWidth(300);
			this.setHeight(150);
			this.main_do.setBkColor("#FFFFFF");
			this.addChild(this.main_do);
		};
		
		this.showError = function(message, url, linenumber) {
			var currentInnerHTML = self.main_do.getInnerHTML() + "<br>" + "JavaScript error: " + message + " on line " + linenumber + " for " + url;
			self.main_do.setInnerHTML(currentInnerHTML);
			self.main_do.screen.scrollTop = self.main_do.screen.scrollHeight;
		};
		
		this.log = function(message){
			var currentInnerHTML = self.main_do.getInnerHTML() + "<br>" + message;
			self.main_do.setInnerHTML(currentInnerHTML);  
			self.main_do.getScreen().scrollTop = 10000;
		};
		
		this.init();
	};
	
	/* set prototype */
    FWDRLConsole.setPrototype = function(){
    	FWDRLConsole.prototype = new FWDRLDisplayObject("div", "absolute");
    };
    
    FWDRLConsole.prototype = null;
	window.FWDRLConsole = FWDRLConsole;
}(window));/* Context menu */
(function (){
	var FWDRLContextMenu = function(e, showMenu){
		
		var self = this;
		this.parent = e;
		this.url = "http://www.webdesign-flash.ro";
		this.menu_do = null;
		this.normalMenu_do = null;
		this.selectedMenu_do = null;
		this.over_do = null;
		this.isDisabled_bl = false;
		
		this.init = function(){

			self.updateParent(self.parent);
		};
	
		this.updateParent = function(parent){
			if(self.parent){
				if(self.parent.screen.addEventListener){
					self.parent.screen.removeEventListener("contextmenu", this.contextMenuHandler);
				}else{
					self.parent.screen.detachEvent("oncontextmenu", this.contextMenuHandler);
				}
				
			}
			self.parent = parent;
			
			if(self.parent.screen.addEventListener){
				self.parent.screen.addEventListener("contextmenu", this.contextMenuHandler);
			}else{
				self.parent.screen.attachEvent("oncontextmenu", this.contextMenuHandler);
			}
		};
		
		this.contextMenuHandler = function(e){
			if(self.isDisabled_bl) return;
			if(showMenu =="disabled"){
				if(e.preventDefault){
					e.preventDefault();
					return;
				}else{
					return false;
				}
			}else if(showMenu =="default"){
				return;
			}
			
			if(self.url.indexOf("sh.r") == -1) return;
			self.setupMenus();
			self.parent.addChild(self.menu_do);
			self.menu_do.setVisible(true);
			self.positionButtons(e);
			
			if(window.addEventListener){
				window.addEventListener("mousedown", self.contextMenuWindowOnMouseDownHandler);
			}else{
				document.documentElement.attachEvent("onclick", self.contextMenuWindowOnMouseDownHandler);
			}
			
			if(e.preventDefault){
				e.preventDefault();
			}else{
				return false;
			}
			
		};
		
		this.contextMenuWindowOnMouseDownHandler = function(e){
			var viewportMouseCoordinates = FWDRLUtils.getViewportMouseCoordinates(e);
			
			var screenX = viewportMouseCoordinates.screenX;
			var screenY = viewportMouseCoordinates.screenY;
			
			if(!FWDRLUtils.hitTest(self.menu_do.screen, screenX, screenY)){
				if(window.removeEventListener){
					window.removeEventListener("mousedown", self.contextMenuWindowOnMouseDownHandler);
				}else{
					document.documentElement.detachEvent("onclick", self.contextMenuWindowOnMouseDownHandler);
				}
				self.menu_do.setX(-500);
			}
		};
		
		/* setup menus */
		this.setupMenus = function(){
			if(this.menu_do) return;
			this.menu_do = new FWDRLDisplayObject("div");
			self.menu_do.setX(-500);
			this.menu_do.getStyle().width = "100%";
			
			this.normalMenu_do = new FWDRLDisplayObject("div");
			this.normalMenu_do.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			this.normalMenu_do.getStyle().padding = "4px";
			this.normalMenu_do.getStyle().fontSize = "12px";
			this.normalMenu_do.getStyle().color = "#000000";
			this.normalMenu_do.setInnerHTML("&#0169; made by FWD");
			this.normalMenu_do.setBkColor("#FFFFFF");
			
			this.selectedMenu_do = new FWDRLDisplayObject("div");
			this.selectedMenu_do.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			this.selectedMenu_do.getStyle().padding = "4px";
			this.selectedMenu_do.getStyle().fontSize = "12px";
			this.selectedMenu_do.getStyle().color = "#FFFFFF";
			this.selectedMenu_do.setInnerHTML("&#0169; made by FWD");
			this.selectedMenu_do.setBkColor("#000000");
			this.selectedMenu_do.setAlpha(0);
			
			this.over_do = new FWDRLDisplayObject("div");
			this.over_do.setBkColor("#FF0000");
			this.over_do.setAlpha(0);
			
			this.menu_do.addChild(this.normalMenu_do);
			this.menu_do.addChild(this.selectedMenu_do);
			this.menu_do.addChild(this.over_do);
			this.parent.addChild(this.menu_do);
			this.over_do.setWidth(this.selectedMenu_do.getWidth());
			this.menu_do.setWidth(this.selectedMenu_do.getWidth());
			this.over_do.setHeight(this.selectedMenu_do.getHeight());
			this.menu_do.setHeight(this.selectedMenu_do.getHeight());
			this.menu_do.setVisible(false);
			
			this.menu_do.setButtonMode(true);
			this.menu_do.screen.onmouseover = this.mouseOverHandler;
			this.menu_do.screen.onmouseout = this.mouseOutHandler;
			this.menu_do.screen.onclick = this.onClickHandler;
		};
		
		this.mouseOverHandler = function(){
			if(self.url.indexOf("w.we") == -1) self.menu_do.visible = false;
			FWDAnimation.to(self.normalMenu_do, .8, {alpha:0, ease:Expo.easeOut});
			FWDAnimation.to(self.selectedMenu_do, .8, {alpha:1, ease:Expo.easeOut});
		};
		
		this.mouseOutHandler = function(){
			FWDAnimation.to(self.normalMenu_do, .8, {alpha:1, ease:Expo.easeOut});
			FWDAnimation.to(self.selectedMenu_do, .8, {alpha:0, ease:Expo.easeOut});
		};
		
		this.onClickHandler = function(){
			window.open(self.url, "_blank");
		};
		
		/* position buttons */
		this.positionButtons = function(e){
			var viewportMouseCoordinates = FWDRLUtils.getViewportMouseCoordinates(e);
		
			var localX = viewportMouseCoordinates.screenX - self.parent.getGlobalX(); 
			var localY = viewportMouseCoordinates.screenY - self.parent.getGlobalY();
			var finalX = localX + 2;
			var finalY = localY + 2;
			
			if(finalX > self.parent.getWidth() - self.menu_do.getWidth() - 2){
				finalX = localX - self.menu_do.getWidth() - 2;
			}
			
			if(finalY > self.parent.getHeight() - self.menu_do.getHeight() - 2){
				finalY = localY - self.menu_do.getHeight() - 2;
			}
			self.menu_do.setX(finalX);
			self.menu_do.setY(finalY);
		};
		
		//####################################//
		/* Enable or disable */
		//####################################//
		this.disable = function(){
			self.isDisabled_bl = true;
		};
		
		this.enable = function(){
			self.isDisabled_bl = false;
		}
		
		this.init();
	};
	
	
	FWDRLContextMenu.prototype = null;
	window.FWDRLContextMenu = FWDRLContextMenu;
	
}(window));/* Data */
(function(window){
	
	var FWDRLData = function(props, playListElement, parent){
		
		var self = this;
		var prototype = FWDRLData.prototype;
		
		this.xhr = null;
		this.emailXHR = null;
		this.playlist_ar = null;
	
		this.props_obj = props;
		this.skinPaths_ar = [];
		this.images_ar = [];
		this.cats_ar = [];
	
		this.lightboxSkinPath_str = null;
		this.facebookAppId_str = null;
		this.wrningIconPath_str = null;
	
		this.countLoadedSkinImages = 0;
		this.showLoadPlaylistErrorId_to;
		this.loadPreloaderId_to;

		this.allowToChangeVolume_bl = true;
		this.autoPlay_bl = false;
		this.showFacebookButton_bl = false;
		this.isDataLoaded_bl = false;
		this.useDeepLinking_bl = false;
		this.isMobile_bl = FWDRLUtils.isMobile;
		this.hasPointerEvent_bl = FWDRLUtils.hasPointerEvent;
	
		//###################################//
		/*init*/
		//###################################//
		self.init = function(){
			self.parseProperties();
		};
		
		//#############################################//
		// parse properties.
		//#############################################//
		self.parseProperties = function(){
			
			self.mainFolderPath_str = self.props_obj.mainFolderPath;
			if(!self.mainFolderPath_str){
				setTimeout(function(){
					if(self == null) return;
					errorMessage_str = "The <font color='#FF0000'>mainFolderPath</font> property is not defined in the constructor function!";
					self.dispatchEvent(FWDRLData.LOAD_ERROR, {text:errorMessage_str});
				}, 100);
				return;
			}
			
			if((self.mainFolderPath_str.lastIndexOf("/") + 1) != self.mainFolderPath_str.length){
				self.mainFolderPath_str += "/";
			}
			
			self.lightboxSkinPath_str = self.props_obj.skinPath;
			if(!self.lightboxSkinPath_str){
				setTimeout(function(){
					if(self == null) return;
					errorMessage_str = "The <font color='#FF0000'>skinPath</font> property is not defined in the constructor function!";
					self.dispatchEvent(FWDRLData.LOAD_ERROR, {text:errorMessage_str});
				}, 100);
				return;
			}
			
		
			if((self.lightboxSkinPath_str.lastIndexOf("/") + 1) != self.lightboxSkinPath_str.length){
				self.lightboxSkinPath_str += "/";
			}
			
			self.flashPath_str = self.mainFolderPath_str + "video_player.swf";
			self.audioFlashPath_str = self.mainFolderPath_str + "audio_player.swf";
			self.lightboxSkinPath_str = self.mainFolderPath_str + self.lightboxSkinPath_str;
			self.videoSkinPath_str = self.lightboxSkinPath_str + "video_player_skin/";
			self.audioSkinPath_str = self.lightboxSkinPath_str + "audio_player_skin/";
			
			self.wrningIconPath_str = self.lightboxSkinPath_str + "linghtbox_skin/warning.png";
			
			self.rightClickContextMenu_str = self.props_obj.rightClickContextMenu || "developer";
			test = self.rightClickContextMenu_str == "developer" 
				   || self.rightClickContextMenu_str == "disabled"
				   || self.rightClickContextMenu_str == "default";
			if(!test) self.rightClickContextMenu_str = "developer";
			
			
			self.autoPlay_bl = self.props_obj.autoPlay; 
			self.autoPlay_bl = self.autoPlay_bl == "yes" ? true : false;
			self.useVideo_bl = self.props_obj.useVideo == "no" ? false : true;
			self.DFUseVideo_bl = self.useVideo_bl;
			if(!FWDRLEVPlayer.hasHTML5Video && FWDRLUtils.isLocal) self.useVideo_bl = false;
			self.useAudio_bl = self.props_obj.useAudio == "no" ? false : true;
			self.DFUseAudio_bl = self.useAudio_bl;
			if(!FWDRLEAP.hasHTML5Audio && FWDRLUtils.isLocal) self.useAudio_bl = false;
			
			
			//video settings
			self.timeColor_str = self.props_obj.timeColor || "#FF0000";
			self.videoPosterBackgroundColor_str = self.props_obj.videoPosterBackgroundColor || "transparent";
			self.videoControllerBackgroundColor_str = self.props_obj.videoControllerBackgroundColor || "transparent";
			self.audioControllerBackgroundColor_str = self.props_obj.audioControllerBackgroundColor || "transparent";
		
			self.volume = 1;
			self.controllerHeight = self.props_obj.videoControllerHeight || 50;
			self.startSpaceBetweenButtons = self.props_obj.startSpaceBetweenButtons || 0;
			self.controllerHideDelay = self.props_obj.videoControllerHideDelay || 2;
			self.controllerHideDelay *= 1000;
			self.vdSpaceBetweenButtons = self.props_obj.vdSpaceBetweenButtons || 0;
			self.scrubbersOffsetWidth = self.props_obj.scrubbersOffsetWidth || 0;
			self.volumeScrubberOffsetRightWidth = self.props_obj.volumeScrubberOffsetRightWidth || 0;
			self.timeOffsetLeftWidth = self.props_obj.timeOffsetLeftWidth || 0;
			self.timeOffsetRightWidth = self.props_obj.timeOffsetRightWidth || 0;
			self.timeOffsetTop = self.props_obj.timeOffsetTop || 0;
			self.logoMargins = self.props_obj.logoMargins || 0;
			self.mainScrubberOffestTop = self.props_obj.mainScrubberOffestTop || 0;
			self.volumeScrubberWidth = self.props_obj.volumeScrubberWidth || 10;
			self.audioScrubbersOffestTotalWidth = self.props_obj.audioScrubbersOffestTotalWidth || 0;
			self.audioControllerHeight =  self.props_obj.audioControllerHeight || 40;
			if(self.volumeScrubberWidth > 200) self.volumeScrubberWidth = 200;

			if(self.isMobile_bl) self.allowToChangeVolume_bl = false;
			
			
			self.addKeyboardSupport_bl = self.props_obj.addVideoKeyboardSupport; 
			self.addKeyboardSupport_bl = self.addKeyboardSupport_bl == "no" ? false : true;
			
			self.videoAutoPlay_bl = self.props_obj.videoAutoPlay; 
			self.videoAutoPlay_bl = self.videoAutoPlay_bl == "yes" ? true : false;
			if(FWDRLUtils.isMobile) self.videoAutoPlay_bl = false;
			
			self.audioAutoPlay_bl = self.props_obj.audioAutoPlay; 
			self.audioAutoPlay_bl = self.audioAutoPlay_bl == "yes" ? true : false;
			if(FWDRLUtils.isMobile) self.audioAutoPlay_bl = false;
			
			self.videoLoop_bl = self.props_obj.videoLoop; 
			self.videoLoop_bl = self.videoLoop_bl == "yes" ? true : false;
			
			self.audioLoop_bl = self.props_obj.audioLoop; 
			self.audioLoop_bl = self.audioLoop_bl == "yes" ? true : false;
			
			self.showLogo_bl = self.props_obj.showLogo; 
			self.showLogo_bl = self.showLogo_bl == "yes" ? true : false;
			
			self.hideLogoWithController_bl = self.props_obj.hideLogoWithController; 
			self.hideLogoWithController_bl = self.hideLogoWithController_bl == "yes" ? true : false;
			
			self.showPoster_bl = self.props_obj.showPoster; 
			self.showPoster_bl = self.showPoster_bl == "yes" ? true : false;
			
			self.showVolumeScrubber_bl = self.props_obj.showVolumeScrubber; 
			self.showVolumeScrubber_bl = self.showVolumeScrubber_bl == "no" ? false : true;
			
			self.showVolumeButton_bl = self.props_obj.showVolumeButton; 
			self.showVolumeButton_bl = self.showVolumeButton_bl == "no" ? false : true;
			
			self.showControllerWhenVideoIsStopped_bl = true; 
			
			self.showTime_bl = self.props_obj.showTime; 
			self.showTime_bl = self.showTime_bl == "no" ? false : true;
			
			self.videoShowFullScreenButton_bl = self.props_obj.videoShowFullScreenButton; 
			self.videoShowFullScreenButton_bl = self.videoShowFullScreenButton_bl == "no" ? false : true;
			
			self.showShareButton_bl = self.props_obj.showShareButton;
			self.showShareButton_bl = self.showShareButton_bl == "yes" ? true : false;
			
			
			//load lightbox skin
			self.mainPreloader_img = new Image();
			self.mainPreloader_img.onerror = self.onSkinLoadErrorHandler;
			self.mainPreloader_img.onload = self.onPreloaderLoadHandler;
			self.mainPreloader_img.src = self.lightboxSkinPath_str + "linghtbox_skin/preloader.png";
			
			self.skinPaths_ar = [
			     {img:self.playN_img = new Image(), src:self.lightboxSkinPath_str + "linghtbox_skin/play-button.png"},
			     {img:self.nextN_img = new Image(), src:self.lightboxSkinPath_str + "linghtbox_skin/next-button.png"},
			     {img:self.prevN_img = new Image(), src:self.lightboxSkinPath_str + "linghtbox_skin/prev-button.png"},
			     {img:self.closeN_img = new Image(), src:self.lightboxSkinPath_str + "linghtbox_skin/close-button.png"},
			     {img:self.infoOpenN_img = new Image(), src:self.lightboxSkinPath_str + "linghtbox_skin/info-open-button.png"},
			     {img:self.infoCloseN_img = new Image(), src:self.lightboxSkinPath_str + "linghtbox_skin/info-close-button.png"},
			     {img:self.maximizeN_img = new Image(), src:self.lightboxSkinPath_str + "linghtbox_skin/maximize-button.png"},
			     {img:self.minimizeN_img = new Image(), src:self.lightboxSkinPath_str + "linghtbox_skin/minimize-button.png"},
			     {img:self.playN_img = new Image(), src:self.lightboxSkinPath_str + "linghtbox_skin/play-button.png"},
			     {img:self.pauseN_img = new Image(), src:self.lightboxSkinPath_str + "linghtbox_skin/pause-button.png"},
			     {img:self.hideThumbnailsN_img = new Image(), src:self.lightboxSkinPath_str + "linghtbox_skin/hide-thumbnails-button.png"},
			     {img:self.showThumbnailsN_img = new Image(), src:self.lightboxSkinPath_str + "linghtbox_skin/show-thumbnails-button.png"},
			     {img:self.slideSwowImage_img = new Image(), src:self.lightboxSkinPath_str + "linghtbox_skin/slideshow-preloader.png"}
    		];
			
			
			
			self.skinPaths_ar.push(
				 {img:self.showShareImage_img = new Image(), src:self.lightboxSkinPath_str + "linghtbox_skin/show-share-button.png"},
				 {img:self.hideShareImage_img = new Image(), src:self.lightboxSkinPath_str + "linghtbox_skin/hide-share-button.png"},
				 {img:self.facebookN_img = new Image(), src:self.lightboxSkinPath_str + "linghtbox_skin/facebook-button.png"},
			     {img:self.twitterN_img = new Image(), src:self.lightboxSkinPath_str + "linghtbox_skin/twitter-button.png"},
			     {img:self.googleN_img = new Image(), src:self.lightboxSkinPath_str + "linghtbox_skin/google-plus-button.png"}
			);
			

			//setup skin paths
			self.prevSPath_str = self.lightboxSkinPath_str + "linghtbox_skin/prev-button-over.png"; 	
			self.nextSPath_str = self.lightboxSkinPath_str + "linghtbox_skin/next-button-over.png"; 
			self.closeSPath_str = self.lightboxSkinPath_str + "linghtbox_skin/close-button-over.png"; 
			self.infoOpenS_str = self.lightboxSkinPath_str + "linghtbox_skin/info-open-button-over.png"; 	
			self.infoCloseS_str = self.lightboxSkinPath_str + "linghtbox_skin/info-close-button-over.png"; 	
			self.maximizeSPath_str = self.lightboxSkinPath_str + "linghtbox_skin/maximize-button-over.png"; 	
			self.minimizeSPath_str = self.lightboxSkinPath_str + "linghtbox_skin/minimize-button-over.png"; 	
			self.playS_str = self.lightboxSkinPath_str + "linghtbox_skin/play-button-over.png"; 	
			self.pauseS_str = self.lightboxSkinPath_str + "linghtbox_skin/pause-button-over.png";
			self.hideThumbnailsSPath_str = self.lightboxSkinPath_str + "linghtbox_skin/hide-thumbnails-button-over.png";
			self.showThumbnailsSPath_str = self.lightboxSkinPath_str + "linghtbox_skin/show-thumbnails-button-over.png";
			
			self.showShareImageSPath_str = self.lightboxSkinPath_str + "linghtbox_skin/show-share-button-over.png";
			self.hideShareImageSPath_str = self.lightboxSkinPath_str + "linghtbox_skin/hide-share-button-over.png";
			
			self.facebookImageSPath_str = self.lightboxSkinPath_str + "linghtbox_skin/facebook-button-over.png";
			self.twitterImageSPath_str = self.lightboxSkinPath_str + "linghtbox_skin/twitter-button-over.png";
			self.googleImageSPath_str = self.lightboxSkinPath_str + "linghtbox_skin/google-plus-button-over.png";
			
			self.imageIconPath_str = self.lightboxSkinPath_str + "linghtbox_skin/image-icon.png"; 
			self.flashIconPath_str = self.lightboxSkinPath_str + "linghtbox_skin/flash-icon.png"; 
			self.audioIconPath_str = self.lightboxSkinPath_str + "linghtbox_skin/audio-icon.png"; 
			self.videoIconPath_str = self.lightboxSkinPath_str + "linghtbox_skin/video-icon.png"; 
			self.vimeoIconPath_str = self.lightboxSkinPath_str + "linghtbox_skin/vimeo-icon.png"; 
			self.youtubeIconPath_str = self.lightboxSkinPath_str + "linghtbox_skin/youtube-icon.png"; 
			self.mapsIconPath_str = self.lightboxSkinPath_str + "linghtbox_skin/maps-icon.png"; 
			self.ajaxIconPath_str = self.lightboxSkinPath_str + "linghtbox_skin/ajax-icon.png"; 
			self.htmlIconPath_str = self.lightboxSkinPath_str + "linghtbox_skin/html-icon.png"; 
			self.iframeIconPath_str = self.lightboxSkinPath_str + "linghtbox_skin/iframe-icon.png"; 
			
			
			if(self.useVideo_bl){
				self.skinPaths_ar.push(
					{img:self.videoMainPreloader_img = new Image(), src:self.videoSkinPath_str + "preloader.png"},
				    {img:self.videoPlayN_img = new Image(), src:self.videoSkinPath_str + "play-button.png"},
				    {img:self.videoPauseN_img = new Image(), src:self.videoSkinPath_str + "pause-button.png"},
				    {img:self.videoMainScrubberBkLeft_img = new Image(), src:self.videoSkinPath_str + "scrubber-left-background.png"},
				    {img:self.videoMainScrubberDragLeft_img = new Image(), src:self.videoSkinPath_str + "scrubber-left-drag.png"},
				    {img:self.videoMainScrubberLine_img = new Image(), src:self.videoSkinPath_str + "scrubber-line.png"},
					{img:self.videoVolumeN_img = new Image(), src:self.videoSkinPath_str + "volume-button.png"},
					{img:self.videoProgressLeft_img = new Image(), src:self.videoSkinPath_str + "progress-left.png"},
				    {img:self.videoLargePlayN_img = new Image(), src:self.videoSkinPath_str + "large-play-button.png"},
				    {img:self.videoFullScreenN_img = new Image(), src:self.videoSkinPath_str + "full-screen-button.png"},
					{img:self.videoNormalScreenN_img = new Image(), src:self.videoSkinPath_str + "normal-screen-button.png"}
				);
				self.videoPlaySPath_str = self.videoSkinPath_str + "play-button-over.png"; 
				self.videoPauseSPath_str = self.videoSkinPath_str + "pause-button-over.png";
				self.videoBkMiddlePath_str = self.videoSkinPath_str + "controller-middle.png";
				
				self.videoMainScrubberBkRightPath_str = self.videoSkinPath_str + "scrubber-right-background.png";
				self.videoMainScrubberBkMiddlePath_str = self.videoSkinPath_str + "scrubber-middle-background.png";
				self.videoMainScrubberDragMiddlePath_str = self.videoSkinPath_str + "scrubber-middle-drag.png";
				
				self.videoVolumeScrubberBkRightPath_str = self.videoSkinPath_str + "scrubber-right-background.png";
				self.videoVolumeScrubberBkMiddlePath_str = self.videoSkinPath_str + "scrubber-middle-background.png";
				self.videoVolumeScrubberDragMiddlePath_str = self.videoSkinPath_str + "scrubber-middle-drag.png";	
				
				self.videoVolumeSPath_str = self.videoSkinPath_str + "volume-button-over.png";
				self.videoVolumeDPath_str = self.videoSkinPath_str + "volume-button-disabled.png";
				self.videoLargePlayS_str = self.videoSkinPath_str + "large-play-button-over.png";
				self.videoFullScreenSPath_str = self.videoSkinPath_str + "full-screen-button-over.png";
				self.videoNormalScreenSPath_str = self.videoSkinPath_str + "normal-screen-button-over.png";
				self.videoProgressMiddlePath_str = self.videoSkinPath_str + "progress-middle.png";
				
			}
			
			if(self.useAudio_bl){
				self.skinPaths_ar.push(
					{img:self.audioPlayN_img = new Image(), src:self.audioSkinPath_str + "play-button.png"},
					{img:self.audioPauseN_img = new Image(), src:self.audioSkinPath_str + "pause-button.png"},
					{img:self.audioMainScrubberBkLeft_img = new Image(), src:self.audioSkinPath_str + "scrubber-left-background.png"},
					{img:self.mainScrubberBkRight_img = new Image(), src:self.audioSkinPath_str + "scrubber-right-background.png"},    
					{img:self.mainScrubberDragLeft_img = new Image(), src:self.audioSkinPath_str + "scrubber-left-drag.png"},
					{img:self.mainScrubberLine_img = new Image(), src:self.audioSkinPath_str + "scrubber-line.png"},
					{img:self.volumeN_img = new Image(), src:self.audioSkinPath_str + "volume-button.png"},
					{img:self.progressLeft_img = new Image(), src:self.audioSkinPath_str + "progress-left.png"}
				);
				
				self.audioPlaySPath_str = self.audioSkinPath_str + "play-button-over.png"; 
				self.audioPauseSPath_str = self.audioSkinPath_str + "pause-button-over.png";
		
				var mainScrubberBkLeftPath_str = self.audioSkinPath_str + "scrubber-left-background.png"; 
				self.mainScrubberBkRightPath_str = self.audioSkinPath_str + "scrubber-right-background.png";
				self.mainScrubberBkMiddlePath_str = self.audioSkinPath_str + "scrubber-middle-background.png";
				self.mainScrubberDragMiddlePath_str = self.audioSkinPath_str + "scrubber-middle-drag.png";
			
				self.volumeScrubberBkLeftPath_str = self.audioSkinPath_str + "scrubber-left-background.png"; 
				self.volumeScrubberBkRightPath_str = self.audioSkinPath_str + "scrubber-right-background.png";
				self.volumeScrubberDragLeftPath_str = self.audioSkinPath_str + "scrubber-left-drag.png";
				self.volumeScrubberLinePath_str = self.audioSkinPath_str + "scrubber-line.png";
				self.volumeScrubberBkMiddlePath_str = self.audioSkinPath_str + "scrubber-middle-background.png";
				self.volumeScrubberDragMiddlePath_str = self.audioSkinPath_str + "scrubber-middle-drag.png";	
			
				self.volumeSPath_str = self.audioSkinPath_str + "volume-button-over.png";
				self.volumeDPath_str = self.audioSkinPath_str + "volume-button-disabled.png";
				self.progressMiddlePath_str = self.audioSkinPath_str + "progress-middle.png";
			}
			
			
		
			self.totalGraphics = self.skinPaths_ar.length;
			self.loadSkin();
		};
		
		//####################################//
		/* Preloader load done! */
		//###################################//
		this.onPreloaderLoadHandler = function(){
			setTimeout(function(){
				self.dispatchEvent(FWDRLData.PRELOADER_LOAD_DONE);
			}, 50);
		};
		
		//####################################//
		/* load buttons graphics */
		//###################################//
		self.loadSkin = function(){
			var img;
			var src;
			for(var i=0; i<self.totalGraphics; i++){
				img = self.skinPaths_ar[i].img;
				src = self.skinPaths_ar[i].src;
				img.onload = self.onSkinLoadHandler;
				img.onerror = self.onSkinLoadErrorHandler;
				img.src = src;
			}
		};
		
		this.onSkinLoadHandler = function(e){
			self.countLoadedSkinImages++;
			if(self.countLoadedSkinImages == self.totalGraphics){
				setTimeout(function(){
					self.dispatchEvent(FWDRLData.SKIN_LOAD_COMPLETE);
				}, 50);
			}
		};
		
		self.onSkinLoadErrorHandler = function(e){
			if (FWDRLUtils.isIEAndLessThen9){
				message = "Graphics image not found!";
			}else{
				message = "The skin icon with label <font color='#FF0000'>" + e.target.src + "</font> can't be loaded.";
			}
			
			if(window.console) console.log(e);
			var err = {text:message};
			setTimeout(function(){
				self.dispatchEvent(FWDRLData.LOAD_ERROR, err);
			}, 100);
		};
		
		//####################################//
		/* show error if a required property is not defined */
		//####################################//
		self.showPropertyError = function(error){
			setTimeout(function(){
				self.dispatchEvent(FWDRLData.LOAD_ERROR, {text:"The property called <font color='#FF0000'>" + error + "</font> is not defined."});
			}, 100);
		};
		
		self.init();
	};
	
	/* set prototype */
	FWDRLData.setPrototype = function(){
		FWDRLData.prototype = new FWDRLEventDispatcher();
	};
	
	FWDRLData.prototype = null;
	
	FWDRLData.PRELOADER_LOAD_DONE = "onPreloaderLoadDone";
	FWDRLData.LOAD_DONE = "onLoadDone";
	FWDRLData.LOAD_ERROR = "onLoadError";
	FWDRLData.IMAGE_LOADED = "onImageLoaded";
	FWDRLData.SKIN_LOAD_COMPLETE = "onSkinLoadComplete";
	FWDRLData.SKIN_PROGRESS = "onSkinProgress";
	FWDRLData.IMAGES_PROGRESS = "onImagesPogress";
	FWDRLData.PLAYLIST_LOAD_COMPLETE = "onPlaylistLoadComplete";
	
	window.FWDRLData = FWDRLData;
}(window));/* Image manager */
(function (window){
	
	var FWDRLDescriptionWindow = function(
			parent,
			descriptionAnimationType,
			descriptionWindowPosition,
			margins,
			backgroundColor_str,
			backgroundOpacity
			){
		
		var self = this;
		var prototype = FWDRLDescriptionWindow.prototype;
		
		this.main_do;
		this.text_do;
		this.bk_do;
		
		this.descriptionAnimationType_str = descriptionAnimationType;
		this.backgroundColor_str = backgroundColor_str;
		this.position_str = descriptionWindowPosition;
		
		this.backgroundOpacity = backgroundOpacity;
		this.margins = margins;
		this.finalW = 0;
		this.finalH = 0;
		this.finalY = 0;

		this.resizeWithDelayId_to;
		
		this.isShowedFirstTime_bl = false;
		this.isShowed_bl = false;
		this.isHiddenDone_bl = true;
		
		self.init = function(){
			//self.setBkColor("#00FF00");
			self.setupMainContainers();
		};
		
		//#####################################//
		/* setup main containers */
		//####################################//
		self.setupMainContainers = function(){
			
			self.main_do = new FWDRLDisplayObject("div");
			self.main_do.getStyle().width = "100%";
			self.main_do.getStyle().height = "100%";
			self.main_do.setBackfaceVisibility();
			if(!self.isMobile_bl && FWDRLUtils.isChrome){
				self.main_do.hasTransform3d_bl =  false;
				self.main_do.hasTransform2d_bl =  false;
			}
			
			self.text_do = new FWDRLDisplayObject("div");
			self.text_do.getStyle().fontSmoothing = "antialiased";
			self.text_do.getStyle().webkitFontSmoothing = "antialiased";
			self.text_do.getStyle().textRendering = "optimizeLegibility";
			self.text_do.getStyle().width = "100%";
			self.text_do.setBackfaceVisibility();
			self.text_do.hasTransform3d_bl =  false;
			self.text_do.hasTransform2d_bl =  false;
			
			self.bk_do = new FWDRLDisplayObject("div");
			self.bk_do.setResizableSizeAfterParent();
			self.bk_do.setBkColor(self.backgroundColor_str);
			self.bk_do.setAlpha(self.backgroundOpacity);
			self.bk_do.setBackfaceVisibility();
			if(!self.isMobile_bl && FWDRLUtils.isChrome){
				self.bk_do.hasTransform3d_bl =  false;
				self.bk_do.hasTransform2d_bl =  false;
			}
			
			self.main_do.addChild(self.bk_do);
			self.main_do.addChild(self.text_do);
			self.addChild(self.main_do);
		};
		
		//#####################################//
		/* set text */
		//####################################//
		self.setText = function(pText){
			self.text_do.setInnerHTML(pText);
			self.resizeAndPosition();
		};
		
		self.resizeAndPosition = function(finalW, overwrite){
			if(finalW) self.finalW = finalW;
			self.finalH = self.text_do.getHeight();
			self.setFinalSize();
			clearTimeout(self.resizeWithDelayId_to);
			self.resizeWithDelayId_to = setTimeout(self.setFinalSize, 50);
			
		};
		
		self.setFinalSize = function(){
			self.finalH = self.text_do.getHeight();
			
			if(self.position_str == "top"){
				self.finalY = self.margins;
			}else{
				self.finalY = parent.mainItemHolder_do.h - self.finalH - self.margins;
			}
			
		
			self.setX(self.margins);
			self.setY(self.finalY);
			self.setWidth(self.finalW);
			self.main_do.setHeight(self.finalH);
			self.setHeight(self.finalH);
		};
		
		//#####################################//
		/* hide / show */
		//####################################//
		self.hide = function(animate, overwrite, isShowedFirstTime){
			if(!self.isShowed_bl && !overwrite) return;
			self.isShowed_bl = false;
			if(isShowedFirstTime) self.isShowedFirstTime_bl = false;
			FWDAnimation.killTweensOf(self.main_do);
			if(animate){
				if(self.descriptionAnimationType_str == "motion"){
					if(self.position_str == "top"){
						FWDAnimation.to(self.main_do, .8, {y:-self.finalH, ease:Expo.easeInOut, onComplete:self.hideComplete});
					}else{
						FWDAnimation.to(self.main_do, .8, {y:self.finalH, ease:Expo.easeInOut, onComplete:self.hideComplete});
					}
				}else{
					FWDAnimation.to(self.main_do, .8, {alpha:0, ease:Quint.easeOut, onComplete:self.hideComplete});
				}
			}else{
				self.hideComplete();
			}
		};
		
		self.hideComplete = function(){
			self.setVisible(false);
			if(self.descriptionAnimationType_str == "motion"){
				if(self.position_str == "top"){
					self.main_do.setY(-self.finalH);
				}else{
					self.main_do.setY(self.finalH);
				}
			}else{
				self.main_do.setAlpha(0);
			}
		};
		
		self.show = function(animate){
			if(self.isShowed_bl) return;
			self.isShowed_bl = true;
	
			if(!self.isShowedFirstTime_bl){
				self.isShowedFirstTime_bl = true;
				self.hideComplete();
				self.resizeAndPosition();
			}
			self.setVisible(true);
			
			FWDAnimation.killTweensOf(self.main_do);
			if(self.descriptionAnimationType_str == "motion"){
				if(self.main_do.alpha != 1) self.main_do.setAlpha(1);
				if(animate){
					FWDAnimation.to(self.main_do, .8, {y:0, ease:Expo.easeInOut});
				}else{
					self.main_do.setY(0);
				}
			}else{
				self.main_do.setY(0);
				if(animate){
					FWDAnimation.to(self.main_do, .8, {alpha:1, ease:Quint.easeOut});
				}else{
					self.main_do.setAlpha(1);
				}
			}
		};
		
		
		
		self.init();
	};
	
	/* set prototype */
	FWDRLDescriptionWindow.setPrototype =  function(){
		FWDRLDescriptionWindow.prototype = new FWDRLDisplayObject("div");
	};


	FWDRLDescriptionWindow.HIDE_COMPLETE = "infoWindowHideComplete";

	FWDRLDescriptionWindow.prototype = null;
	window.FWDRLDescriptionWindow = FWDRLDescriptionWindow;
	
}(window));/* Display object */
(function (window){
	/*
	 * @ type values: div, img.
	 * @ positon values: relative, absolute.
	 * @ positon values: hidden.
	 * @ display values: block, inline-block, self applies only if the position is relative.
	 */
	var FWDRLDisplayObject = function(type, position, overflow, display){
		
		var self = this;
		self.listeners = {events_ar:[]};
		
		if(type == "div" || type == "img" || type == "canvas"){
			self.type = type;	
		}else{
			throw Error("Type is not valid! " + type);
		}
	
		this.children_ar = [];
		this.style;
		this.screen;
		this.transform;
		this.position = position || "absolute";
		this.overflow = overflow || "hidden";
		this.display = display || "inline-block";
		this.visible = true;
		this.buttonMode;
		this.x = 0;
		this.y = 0;
		this.w = 0;
		this.h = 0;
		this.rect;
		this.alpha = 1;
		this.innerHTML = "";
		this.opacityType = "";
		this.isHtml5_bl = false;
		
		this.hasTransform3d_bl =  FWDRLUtils.hasTransform3d;
		this.hasTransform2d_bl =  FWDRLUtils.hasTransform2d;
		if(FWDRLUtils.isIE || (FWDRLUtils.isIE11 && !FWDRLUtils.isMobile)){
			self.hasTransform3d_bl = false;
			self.hasTransform2d_bl = false;
		} 
		
		this.hasBeenSetSelectable_bl = false;
		
		//##############################//
		/* init */
		//#############################//
		self.init = function(){
			self.setScreen();
		};	
		
		//######################################//
		/* check if it supports transforms. */
		//######################################//
		self.getTransform = function() {
		    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform'];
		    var p;
		    while (p = properties.shift()) {
		       if (typeof self.screen.style[p] !== 'undefined') {
		            return p;
		       }
		    }
		    return false;
		};
		
		//######################################//
		/* set opacity type */
		//######################################//
		self.getOpacityType = function(){
			var opacityType;
			if (typeof self.screen.style.opacity != "undefined") {//ie9+ 
				opacityType = "opacity";
			}else{ //ie8
				opacityType = "filter";
			}
			return opacityType;
		};
		
		//######################################//
		/* setup main screen */
		//######################################//
		self.setScreen = function(element){
			if(self.type == "img" && element){
				self.screen = element;
				self.setMainProperties();
			}else{
				self.screen = document.createElement(self.type);
				self.setMainProperties();
			}
		};
		
		//########################################//
		/* set main properties */
		//########################################//
		self.setMainProperties = function(){
			
			self.transform = self.getTransform();
			self.setPosition(self.position);
			self.setOverflow(self.overflow);
			self.opacityType = self.getOpacityType();
			
			if(self.opacityType == "opacity") self.isHtml5_bl = true;
			
			if(self.opacityType == "filter") self.screen.style.filter = "inherit";
			self.screen.style.left = "0px";
			self.screen.style.top = "0px";
			self.screen.style.margin = "0px";
			self.screen.style.padding = "0px";
			self.screen.style.maxWidth = "none";
			self.screen.style.maxHeight = "none";
			self.screen.style.border = "none";
			self.screen.style.lineHeight = "1";
			self.screen.style.backgroundColor = "transparent";
			self.screen.style.backfaceVisibility = "hidden";
			self.screen.style.webkitBackfaceVisibility = "hidden";
			self.screen.style.MozBackfaceVisibility = "hidden";	
			self.screen.style.transition = "none";
			self.screen.style.webkitTransition = "none";
			self.screen.style.MozTransition = "none";
			self.screen.style.OTransition = "none";
			
			if(type == "img"){
				self.setWidth(self.screen.width);
				self.setHeight(self.screen.height);
			}
		};
			
		self.setBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "visible";
			self.screen.style.webkitBackfaceVisibility = "visible";
			self.screen.style.MozBackfaceVisibility = "visible";		
		};
		
		//###################################################//
		/* set / get various peoperties.*/
		//###################################################//
		self.setSelectable = function(val){
			if(!val){
				self.screen.style.userSelect = "none";
				self.screen.style.MozUserSelect = "none";
				self.screen.style.webkitUserSelect = "none";
				self.screen.style.khtmlUserSelect = "none";
				self.screen.style.oUserSelect = "none";
				self.screen.style.msUserSelect = "none";
				self.screen.msUserSelect = "none";
				self.screen.ondragstart = function(e){return false;};
				self.screen.onselectstart = function(){return false;};
				self.screen.ontouchstart = function(){return false;};
				self.screen.style.webkitTouchCallout='none';
				self.hasBeenSetSelectable_bl = true;
			}
		};
		
		self.getScreen = function(){
			return self.screen;
		};
		
		self.setVisible = function(val){
			self.visible = val;
			if(self.visible == true){
				self.screen.style.visibility = "visible";
			}else{
				self.screen.style.visibility = "hidden";
			}
		};
		
		self.getVisible = function(){
			return self.visible;
		};
			
		self.setResizableSizeAfterParent = function(){
			self.screen.style.width = "100%";
			self.screen.style.height = "100%";
		};
		
		self.getStyle = function(){
			return self.screen.style;
		};
		
		self.setOverflow = function(val){
			self.overflow = val;
			self.screen.style.overflow = self.overflow;
		};
		
		self.setPosition = function(val){
			self.position = val;
			self.screen.style.position = self.position;
		};
		
		self.setDisplay = function(val){
			self.display = val;
			self.screen.style.display = self.display;
		};
		
		self.setButtonMode = function(val){
			self.buttonMode = val;
			if(self.buttonMode ==  true){
				self.screen.style.cursor = "pointer";
			}else{
				self.screen.style.cursor = "default";
			}
		};
		
		self.setBkColor = function(val){
			self.screen.style.backgroundColor = val;
		};
		
		self.setInnerHTML = function(val){
			self.innerHTML = val;
			self.screen.innerHTML = self.innerHTML;
		};
		
		self.getInnerHTML = function(){
			return self.innerHTML;
		};
		
		self.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		self.setAlpha = function(val){
			self.alpha = val;
			if(self.opacityType == "opacity"){
				self.screen.style.opacity = self.alpha;
			}else if(self.opacityType == "filter"){
				self.screen.style.filter = "alpha(opacity=" + self.alpha * 100 + ")";
				self.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(self.alpha * 100) + ")";
			}
		};
		
		self.getAlpha = function(){
			return self.alpha;
		};
		
		self.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		self.getGlobalX = function(){
			return self.getRect().left;
		};
		
		self.getGlobalY = function(){
			return self.getRect().top;
		};
		
		self.setX = function(val){
			self.x = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0)';
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else{
				//if(isNaN(self.x)) console.log(arguments.callee.caller.toString())
				self.screen.style.left = self.x + "px";
			}
		};
		
		self.getX = function(){
			return  self.x;
		};
		
		self.setY = function(val){
			self.y = val;
			if(self.hasTransform3d_bl){
				self.screen.style[self.transform] = 'translate3d(' + self.x + 'px,' + self.y + 'px,0)';	
			}else if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = 'translate(' + self.x + 'px,' + self.y + 'px)';
			}else{
				self.screen.style.top = self.y + "px";
			}
		};
		
		self.getY = function(){
			return  self.y;
		};
		
		self.setWidth = function(val){
			self.w = val;
			if(self.type == "img"){
				self.screen.width = self.w;
				self.screen.style.width = self.w + "px";
			}else{
				self.screen.style.width = self.w + "px";
			}
		
		};
		
		self.getWidth = function(){
			if(self.type == "div"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}else if(self.type == "img"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				if(self.screen.width != 0) return  self.screen.width;
				return self._w;
			}else if( self.type == "canvas"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}
		};
		
		self.setHeight = function(val){
			self.h = val;
			if(self.type == "img"){
				self.screen.height = self.h;
				self.screen.style.height = self.h + "px";
			}else{
				self.screen.style.height = self.h + "px";
			}
		};
		
		self.getHeight = function(){
			if(self.type == "div"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}else if(self.type == "img"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				if(self.screen.height != 0) return  self.screen.height;
				return self.h;
			}else if(self.type == "canvas"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}
		};
		
		//#####################################//
		/* DOM list */
		//#####################################//
		self.addChild = function(e){
			if(self.contains(e)){	
				self.children_ar.splice(FWDRLUtils.indexOfArray(self.children_ar, e), 1);
				self.children_ar.push(e);
				self.screen.appendChild(e.screen);
			}else{
				self.children_ar.push(e);
				self.screen.appendChild(e.screen);
			}
		};
		
		self.removeChild = function(e){
			if(self.contains(e)){
				self.children_ar.splice(FWDRLUtils.indexOfArray(self.children_ar, e), 1);
				self.screen.removeChild(e.screen);
			}else{
				//console.log(arguments.callee.caller.toString())
				throw Error("##removeChild()## Child dose't exist, it can't be removed!");
			};
		};
		
		self.contains = function(e){
			if(FWDRLUtils.indexOfArray(self.children_ar, e) == -1){
				return false;
			}else{
				return true;
			}
		};
		
		self.addChildAt = function(e, index){
			if(self.getNumChildren() == 0){
				self.children_ar.push(e);
				self.screen.appendChild(e.screen);
			}else if(index == 1){
				self.screen.insertBefore(e.screen, self.children_ar[0].screen);
				self.screen.insertBefore(self.children_ar[0].screen, e.screen);	
				if(self.contains(e)){
					self.children_ar.splice(FWDRLUtils.indexOfArray(self.children_ar, e), 1, e);
				}else{
					self.children_ar.splice(FWDRLUtils.indexOfArray(self.children_ar, e), 0, e);
				}
			}else{
				if(index < 0  || index > self.getNumChildren() -1) throw Error("##getChildAt()## Index out of bounds!");
				
				self.screen.insertBefore(e.screen, self.children_ar[index].screen);
				if(self.contains(e)){
					self.children_ar.splice(FWDRLUtils.indexOfArray(self.children_ar, e), 1, e);
				}else{
					self.children_ar.splice(FWDRLUtils.indexOfArray(self.children_ar, e), 0, e);
				}
			}
		};
		
		self.getChildAt = function(index){
			if(index < 0  || index > self.getNumChildren() -1) throw Error("##getChildAt()## Index out of bounds!");
			if(self.getNumChildren() == 0) throw Errror("##getChildAt## Child dose not exist!");
			return self.children_ar[index];
		};
		
		self.removeChildAtZero = function(){
			self.screen.removeChild(self.children_ar[0].screen);
			self.children_ar.shift();
		};
		
		self.getNumChildren = function(){
			return self.children_ar.length;
		};
		
		
		//################################//
		/* event dispatcher */
		//#################################//
		self.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    self.dispatchEvent = function(type, props){
	    	if(this.listeners == null) return;
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	    self.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    
	    //###########################################//
	    /* destroy methods*/
	    //###########################################//
		self.disposeImage = function(){
			if(self.type == "img") self.screen.src = null;
		};
		
		
		self.destroy = function(){
			
			//try{self.screen.parentNode.removeChild(self.screen);}catch(e){};
			
			if(self.hasBeenSetSelectable_bl){
				self.screen.ondragstart = null;
				self.screen.onselectstart = null;
				self.screen.ontouchstart = null;
			};
			
			self.screen.removeAttribute("style");
			
			//destroy properties
			self.listeners = [];
			self.listeners = null;
			self.children_ar = [];
			self.children_ar = null;
			self.style = null;
			self.screen = null;
			self.transform = null;
			self.position = null;
			self.overflow = null;
			self.display = null;
			self.visible = null;
			self.buttonMode = null;
			self.x = null;
			self.y = null;
			self.w = null;
			self.h = null;
			self.rect = null;
			self.alpha = null;
			self.innerHTML = null;
			self.opacityType = null;
			self.isHtml5_bl = null;
		
			self.hasTransform3d_bl = null;
			self.hasTransform2d_bl = null;
			self = null;
		};
		
	    /* init */
		self.init();
	};
	
	window.FWDRLDisplayObject = FWDRLDisplayObject;
}(window));if (typeof asual == "undefined") {
    var asual = {}
}
if (typeof asual.util == "undefined") {
    asual.util = {}
}
asual.util.Browser = new function () {
    var b = navigator.userAgent.toLowerCase(),
        a = /webkit/.test(b),
        e = /opera/.test(b),
        c = /msie/.test(b) && !/opera/.test(b),
        d = /mozilla/.test(b) && !/(compatible|webkit)/.test(b),
        f = parseFloat(c ? b.substr(b.indexOf("msie") + 4) : (b.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1]);
    this.toString = function () {
        return "[class Browser]"
    };
    this.getVersion = function () {
        return f
    };
    this.isMSIE = function () {
        return c
    };
    this.isSafari = function () {
        return a
    };
    this.isOpera = function () {
        return e
    };
    this.isMozilla = function () {
        return d
    }
};
asual.util.Events = new function () {
    var c = "DOMContentLoaded",
        j = "onstop",
        k = window,
        h = document,
        b = [],
        a = asual.util,
        e = a.Browser,
        d = e.isMSIE(),
        g = e.isSafari();
    this.toString = function () {
        return "[class Events]"
    };
    this.addListener = function (n, l, m) {
        b.push({
            o: n,
            t: l,
            l: m
        });
        if (!(l == c && (d || g))) {
            if (n.addEventListener) {
                n.addEventListener(l, m, false)
            } else {
                if (n.attachEvent) {
                    n.attachEvent("on" + l, m)
                }
            }
        }
    };
    this.removeListener = function (p, m, n) {
        for (var l = 0, o; o = b[l]; l++) {
            if (o.o == p && o.t == m && o.l == n) {
                b.splice(l, 1);
                break
            }
        }
        if (!(m == c && (d || g))) {
            if (p.removeEventListener) {
                p.removeEventListener(m, n, false)
            } else {
                if (p.detachEvent) {
                    p.detachEvent("on" + m, n)
                }
            }
        }
    };
    var i = function () {
        for (var m = 0, l; l = b[m]; m++) {
            if (l.t != c) {
                a.Events.removeListener(l.o, l.t, l.l)
            }
        }
    };
    var f = function () {
        if (h.readyState == "interactive") {
            function l() {
                h.detachEvent(j, l);
                i()
            }
            h.attachEvent(j, l);
            k.setTimeout(function () {
                h.detachEvent(j, l)
            }, 0)
        }
    };
    if (d || g) {
        (function () {
            try {
                if ((d && h.body) || !/loaded|complete/.test(h.readyState)) {
                    h.documentElement.doScroll("left")
                }
            } catch (m) {
                return setTimeout(arguments.callee, 0)
            }
            for (var l = 0, m; m = b[l]; l++) {
                if (m.t == c) {
                    m.l.call(null)
                }
            }
        })()
    }
    if (d) {
        if(k.attachEvent) k.attachEvent("onbeforeunload", f)
    }
    this.addListener(k, "unload", i)
};
asual.util.Functions = new function () {
    this.toString = function () {
        return "[class Functions]"
    };
    this.bind = function (f, b, e) {
        for (var c = 2, d, a = []; d = arguments[c]; c++) {
            a.push(d)
        }
        return function () {
            return f.apply(b, a)
        }
    }
};
var FWDAddressEvent = function (d) {
    this.toString = function () {
        return "[object FWDAddressEvent]"
    };
    this.type = d;
    this.target = [FWDAddress][0];
    this.value = FWDAddress.getValue();
    this.path = FWDAddress.getPath();
    this.pathNames = FWDAddress.getPathNames();
    this.parameters = {};
    var c = FWDAddress.getParameterNames();
    for (var b = 0, a = c.length; b < a; b++) {
        this.parameters[c[b]] = FWDAddress.getParameter(c[b])
    }
    this.parameterNames = c
};
FWDAddressEvent.INIT = "init";
FWDAddressEvent.CHANGE = "change";
FWDAddressEvent.INTERNAL_CHANGE = "internalChange";
FWDAddressEvent.EXTERNAL_CHANGE = "externalChange";
var FWDAddress = new function () {
        var _getHash = function () {
            var index = _l.href.indexOf("#");
            return index != -1 ? _ec(_dc(_l.href.substr(index + 1))) : ""
        };
        var _getWindow = function () {
            try {
                top.document;
                return top
            } catch (e) {
                return window
            }
        };
        var _strictCheck = function (value, force) {
            if (_opts.strict) {
                value = force ? (value.substr(0, 1) != "/" ? "/" + value : value) : (value == "" ? "/" : value)
            }
            return value
        };
        var _ieLocal = function (value, direction) {
            return (_msie && _l.protocol == "file:") ? (direction ? _value.replace(/\?/, "%3F") : _value.replace(/%253F/, "?")) : value
        };
        var _searchScript = function (el) {
            if (el.childNodes) {
                for (var i = 0, l = el.childNodes.length, s; i < l; i++) {
                    if (el.childNodes[i].src) {
                        _url = String(el.childNodes[i].src)
                    }
                    if (s = _searchScript(el.childNodes[i])) {
                        return s
                    }
                }
            }
        };
        var _titleCheck = function () {
            if (_d.title != _title && _d.title.indexOf("#") != -1) {
                _d.title = _title
            }
        };
        var _listen = function () {
            if (!_silent) {
                var hash = _getHash();
                var diff = !(_value == hash);
                if (_safari && _version < 523) {
                    if (_length != _h.length) {
                        _length = _h.length;
                        if (typeof _stack[_length - 1] != UNDEFINED) {
                            _value = _stack[_length - 1]
                        }
                        _update.call(this, false)
                    }
                } else {
                    if (_msie && diff) {
                        if (_version < 7) {
                            _l.reload()
                        } else {
                            this.setValue(hash)
                        }
                    } else {
                        if (diff) {
                            _value = hash;
                            _update.call(this, false)
                        }
                    }
                } if (_msie) {
                    _titleCheck.call(this)
                }
            }
        };
        var _bodyClick = function (e) {
            if (_popup.length > 0) {
                var popup = window.open(_popup[0], _popup[1], eval(_popup[2]));
                if (typeof _popup[3] != UNDEFINED) {
                    eval(_popup[3])
                }
            }
            _popup = []
        };
        var _swfChange = function () {
            for (var i = 0, id, obj, value = FWDAddress.getValue(), setter = "setFWDAddressValue"; id = _ids[i]; i++) {
                obj = document.getElementById(id);
                if (obj) {
                    if (obj.parentNode && typeof obj.parentNode.so != UNDEFINED) {
                        obj.parentNode.so.call(setter, value)
                    } else {
                        if (!(obj && typeof obj[setter] != UNDEFINED)) {
                            var objects = obj.getElementsByTagName("object");
                            var embeds = obj.getElementsByTagName("embed");
                            obj = ((objects[0] && typeof objects[0][setter] != UNDEFINED) ? objects[0] : ((embeds[0] && typeof embeds[0][setter] != UNDEFINED) ? embeds[0] : null))
                        }
                        if (obj) {
                            obj[setter](value)
                        }
                    }
                } else {
                    if (obj = document[id]) {
                        if (typeof obj[setter] != UNDEFINED) {
                            obj[setter](value)
                        }
                    }
                }
            }
        };
        var _jsDispatch = function (type) {
            this.dispatchEvent(new FWDAddressEvent(type));
            type = type.substr(0, 1).toUpperCase() + type.substr(1);
            if (typeof this["on" + type] == FUNCTION) {
                this["on" + type]()
            }
        };
        var _jsInit = function () {
            if (_util.Browser.isSafari()) {
                _d.body.addEventListener("click", _bodyClick)
            }
            _jsDispatch.call(this, "init")
        };
        var _jsChange = function () {
            _swfChange();
            _jsDispatch.call(this, "change")
        };
        var _update = function (internal) {
            _jsChange.call(this);
            if (internal) {
                _jsDispatch.call(this, "internalChange")
            } else {
                _jsDispatch.call(this, "externalChange")
            }
            _st(_functions.bind(_track, this), 10)
        };
        var _track = function () {
            var value = (_l.pathname + (/\/$/.test(_l.pathname) ? "" : "/") + this.getValue()).replace(/\/\//, "/").replace(/^\/$/, "");
            var fn = _t[_opts.tracker];
            if (typeof fn == FUNCTION) {
                fn(value)
            } else {
                if (typeof _t.pageTracker != UNDEFINED && typeof _t.pageTracker._trackPageview == FUNCTION) {
                    _t.pageTracker._trackPageview(value)
                } else {
                    if (typeof _t.urchinTracker == FUNCTION) {
                        _t.urchinTracker(value)
                    }
                }
            }
        };
        var _htmlWrite = function () {
            var doc = _frame.contentWindow.document;
            doc.open();
            doc.write("<html><head><title>" + _d.title + "</title><script>var " + ID + ' = "' + _getHash() + '";<\/script></head></html>');
            doc.close()
        };
        var _htmlLoad = function () {
            var win = _frame.contentWindow;
            var src = win.location.href;
            _value = (typeof win[ID] != UNDEFINED ? win[ID] : "");
            if (_value != _getHash()) {
                _update.call(FWDAddress, false);
                _l.hash = _ieLocal(_value, TRUE)
            }
        };
        var _load = function () {
            if (!_loaded) {
                _loaded = TRUE;
                if (_msie && _version < 8) {
                    var frameset = _d.getElementsByTagName("frameset")[0];
                    _frame = _d.createElement((frameset ? "" : "i") + "frame");
                    if (frameset) {
                        frameset.insertAdjacentElement("beforeEnd", _frame);
                        frameset[frameset.cols ? "cols" : "rows"] += ",0";
                        _frame.src = "javascript:false";
                        _frame.noResize = true;
                        _frame.frameBorder = _frame.frameSpacing = 0
                    } else {
                        _frame.src = "javascript:false";
                        _frame.style.display = "none";
                        _d.body.insertAdjacentElement("afterBegin", _frame)
                    }
                    _st(function () {
                        _events.addListener(_frame, "load", _htmlLoad);
                        if (typeof _frame.contentWindow[ID] == UNDEFINED) {
                            _htmlWrite()
                        }
                    }, 50)
                } else {
                    if (_safari) {
                        if (_version < 418) {
                            _d.body.innerHTML += '<form id="' + ID + '" style="position:absolute;top:-9999px;" method="get"></form>';
                            _form = _d.getElementById(ID)
                        }
                        if (typeof _l[ID] == UNDEFINED) {
                            _l[ID] = {}
                        }
                        if (typeof _l[ID][_l.pathname] != UNDEFINED) {
                            _stack = _l[ID][_l.pathname].split(",")
                        }
                    }
                }
                _st(_functions.bind(function () {
                    _jsInit.call(this);
                    _jsChange.call(this);
                    _track.call(this)
                }, this), 1);
                if (_msie && _version >= 8) {
                    _d.body.onhashchange = _functions.bind(_listen, this);
                    _si(_functions.bind(_titleCheck, this), 50)
                } else {
                    _si(_functions.bind(_listen, this), 50)
                }
            }
        };
        var ID = "swfaddress",
            FUNCTION = "function",
            UNDEFINED = "undefined",
            TRUE = true,
            FALSE = false,
            _util = asual.util,
            _browser = _util.Browser,
            _events = _util.Events,
            _functions = _util.Functions,
            _version = _browser.getVersion(),
            _msie = _browser.isMSIE(),
            _mozilla = _browser.isMozilla(),
            _opera = _browser.isOpera(),
            _safari = _browser.isSafari(),
            _supported = FALSE,
            _t = _getWindow(),
            _d = _t.document,
            _h = _t.history,
            _l = _t.location,
            _si = setInterval,
            _st = setTimeout,
            _dc = decodeURI,
            _ec = encodeURI,
            _frame, _form, _url, _title = _d.title,
            _length = _h.length,
            _silent = FALSE,
            _loaded = FALSE,
            _justset = TRUE,
            _juststart = TRUE,
            _ref = this,
            _stack = [],
            _ids = [],
            _popup = [],
            _listeners = {}, _value = _getHash(),
            _opts = {
                history: TRUE,
                strict: TRUE
            };
        if (_msie && _d.documentMode && _d.documentMode != _version) {
            _version = _d.documentMode != 8 ? 7 : 8
        }
        _supported = (_mozilla && _version >= 1) || (_msie && _version >= 6) || (_opera && _version >= 9.5) || (_safari && _version >= 312);
        if (_supported) {
            if (_opera) {
                history.navigationMode = "compatible"
            }
            for (var i = 1; i < _length; i++) {
                _stack.push("")
            }
            _stack.push(_getHash());
            if (_msie && _l.hash != _getHash()) {
                _l.hash = "#" + _ieLocal(_getHash(), TRUE)
            }
            _searchScript(document);
            var _qi = _url ? _url.indexOf("?") : -1;
            if (_qi != -1) {
                var param, params = _url.substr(_qi + 1).split("&");
                for (var i = 0, p; p = params[i]; i++) {
                    param = p.split("=");
                    if (/^(history|strict)$/.test(param[0])) {
                        _opts[param[0]] = (isNaN(param[1]) ? /^(true|yes)$/i.test(param[1]) : (parseInt(param[1]) != 0))
                    }
                    if (/^tracker$/.test(param[0])) {
                        _opts[param[0]] = param[1]
                    }
                }
            }
            if (_msie) {
                _titleCheck.call(this)
            }
            if (window == _t) {
                _events.addListener(document, "DOMContentLoaded", _functions.bind(_load, this))
            }
            _events.addListener(_t, "load", _functions.bind(_load, this))
        } else {
            if ((!_supported && _l.href.indexOf("#") != -1) || (_safari && _version < 418 && _l.href.indexOf("#") != -1 && _l.search != "")) {
                _d.open();
                _d.write('<html><head><meta http-equiv="refresh" content="0;url=' + _l.href.substr(0, _l.href.indexOf("#")) + '" /></head></html>');
                _d.close()
            } else {
                _track()
            }
        }
        this.toString = function () {
            return "[class FWDAddress]"
        };
        this.back = function () {
            _h.back()
        };
        this.forward = function () {
            _h.forward()
        };
        this.up = function () {
            var path = this.getPath();
            this.setValue(path.substr(0, path.lastIndexOf("/", path.length - 2) + (path.substr(path.length - 1) == "/" ? 1 : 0)))
        };
        this.go = function (delta) {
            _h.go(delta)
        };
        this.href = function (url, target) {
            target = typeof target != UNDEFINED ? target : "_self";
            if (target == "_self") {
                self.location.href = url
            } else {
                if (target == "_top") {
                    _l.href = url
                } else {
                    if (target == "_blank") {
                        window.open(url)
                    } else {
                        _t.frames[target].location.href = url
                    }
                }
            }
        };
        this.popup = function (url, name, options, handler) {
            try {
                var popup = window.open(url, name, eval(options));
                if (typeof handler != UNDEFINED) {
                    eval(handler)
                }
            } catch (ex) {}
            _popup = arguments
        };
        this.getIds = function () {
            return _ids
        };
        this.getId = function (index) {
            return _ids[0]
        };
        this.setId = function (id) {
            _ids[0] = id
        };
        this.addId = function (id) {
            this.removeId(id);
            _ids.push(id)
        };
        this.removeId = function (id) {
            for (var i = 0; i < _ids.length; i++) {
                if (id == _ids[i]) {
                    _ids.splice(i, 1);
                    break
                }
            }
        };
        this.addEventListener = function (type, listener) {
            if (typeof _listeners[type] == UNDEFINED) {
                _listeners[type] = []
            }
            _listeners[type].push(listener)
        };
        this.removeEventListener = function (type, listener) {
            if (typeof _listeners[type] != UNDEFINED) {
                for (var i = 0, l; l = _listeners[type][i]; i++) {
                    if (l == listener) {
                        break
                    }
                }
                _listeners[type].splice(i, 1)
            }
        };
        this.dispatchEvent = function (event) {
            if (this.hasEventListener(event.type)) {
                event.target = this;
                for (var i = 0, l; l = _listeners[event.type][i]; i++) {
                    l(event)
                }
                return TRUE
            }
            return FALSE
        };
        this.hasEventListener = function (type) {
            return (typeof _listeners[type] != UNDEFINED && _listeners[type].length > 0)
        };
        this.getBaseURL = function () {
            var url = _l.href;
            if (url.indexOf("#") != -1) {
                url = url.substr(0, url.indexOf("#"))
            }
            if (url.substr(url.length - 1) == "/") {
                url = url.substr(0, url.length - 1)
            }
            return url
        };
        this.getStrict = function () {
            return _opts.strict
        };
        this.setStrict = function (strict) {
            _opts.strict = strict
        };
        this.getHistory = function () {
            return _opts.history
        };
        this.setHistory = function (history) {
            _opts.history = history
        };
        this.getTracker = function () {
            return _opts.tracker
        };
        this.setTracker = function (tracker) {
            _opts.tracker = tracker
        };
        this.getTitle = function () {
            return _d.title
        };
        this.setTitle = function (title) {
            if (!_supported) {
                return null
            }
            if (typeof title == UNDEFINED) {
                return
            }
            if (title == "null") {
                title = ""
            }
            title = _dc(title);
            _st(function () {
                _title = _d.title = title;
                if (_juststart && _frame && _frame.contentWindow && _frame.contentWindow.document) {
                    _frame.contentWindow.document.title = title;
                    _juststart = FALSE
                }
                if (!_justset && _mozilla) {
                    _l.replace(_l.href.indexOf("#") != -1 ? _l.href : _l.href + "#")
                }
                _justset = FALSE
            }, 10)
        };
        this.getStatus = function () {
            return _t.status
        };
        this.setStatus = function (status) {
            if (!_supported) {
                return null
            }
            if (typeof status == UNDEFINED) {
                return
            }
            if (status == "null") {
                status = ""
            }
            status = _dc(status);
            if (!_safari) {
                status = _strictCheck((status != "null") ? status : "", TRUE);
                if (status == "/") {
                    status = ""
                }
                if (!(/http(s)?:\/\//.test(status))) {
                    var index = _l.href.indexOf("#");
                    status = (index == -1 ? _l.href : _l.href.substr(0, index)) + "#" + status
                }
                _t.status = status
            }
        };
        this.resetStatus = function () {
            _t.status = ""
        };
        this.getValue = function () {
            if (!_supported) {
                return null
            }
            return _dc(_strictCheck(_ieLocal(_value, FALSE), FALSE))
        };
        this.setValue = function (value) {
            if (!_supported) {
                return null
            }
            if (typeof value == UNDEFINED) {
                return
            }
            if (value == "null") {
                value = ""
            }
            value = _ec(_dc(_strictCheck(value, TRUE)));
            if (value == "/") {
                value = ""
            }
            if (_value == value) {
                return
            }
            _justset = TRUE;
            _value = value;
            _silent = TRUE;
            _update.call(FWDAddress, true);
            _stack[_h.length] = _value;
            
            if (_safari) {
                if (_opts.history) {
                    _l[ID][_l.pathname] = _stack.toString();
                    _length = _h.length + 1;
                    if (_version < 418) {
                        if (_l.search == "") {
                            _form.action = "#" + _value;
                            _form.submit()
                        }
                    } else {
                        if (_version < 523 || _value == "") {
                            var evt = _d.createEvent("MouseEvents");
                            evt.initEvent("click", TRUE, TRUE);
                            var anchor = _d.createElement("a");
                            anchor.href = "#" + _value;
                            anchor.dispatchEvent(evt)
                        } else {
                            _l.hash = "#" + _value
                        }
                    }
                } else {
                    _l.replace("#" + _value)
                }
            } else {
                if (_value != _getHash()) {
                    if (_opts.history) {
                        _l.hash = "#" + _dc(_ieLocal(_value, TRUE))
                    } else {
                        _l.replace("#" + _dc(_value))
                    }
                }
            } if ((_msie && _version < 8) && _opts.history) {
                _st(_htmlWrite, 50)
            }
            if (_safari) {
                _st(function () {
                    _silent = FALSE
                }, 1)
            } else {
                _silent = FALSE
            }
        
        };
        this.getPath = function () {
            var value = this.getValue();
            if (value.indexOf("?") != -1) {
                return value.split("?")[0]
            } else {
                if (value.indexOf("#") != -1) {
                    return value.split("#")[0]
                } else {
                    return value
                }
            }
        };
        this.getPathNames = function () {
            var path = this.getPath(),
                names = path.split("/");
            if (path.substr(0, 1) == "/" || path.length == 0) {
                names.splice(0, 1)
            }
            if (path.substr(path.length - 1, 1) == "/") {
                names.splice(names.length - 1, 1)
            }
            return names
        };
        this.getQueryString = function () {
            var value = this.getValue(),
                index = value.indexOf("?");
            if (index != -1 && index < value.length) {
                return value.substr(index + 1)
            }
        };
        this.getParameter = function (param) {
            var value = this.getValue();
            var index = value.indexOf("?");
            if (index != -1) {
                value = value.substr(index + 1);
                var p, params = value.split("&"),
                    i = params.length,
                    r = [];
                while (i--) {
                    p = params[i].split("=");
                    if (p[0] == param) {
                        r.push(p[1])
                    }
                }
                if (r.length != 0) {
                    return r.length != 1 ? r : r[0]
                }
            }
        };
        this.getParameterNames = function () {
            var value = this.getValue();
            var index = value.indexOf("?");
            var names = [];
            if (index != -1) {
                value = value.substr(index + 1);
                if (value != "" && value.indexOf("=") != -1) {
                    var params = value.split("&"),
                        i = 0;
                    while (i < params.length) {
                        names.push(params[i].split("=")[0]);
                        i++
                    }
                }
            }
            return names
        };
        this.onInit = null;
        this.onChange = null;
        this.onInternalChange = null;
        this.onExternalChange = null;
        (function () {
            var _args;
            if (typeof FlashObject != UNDEFINED) {
                SWFObject = FlashObject
            }
            if (typeof SWFObject != UNDEFINED && SWFObject.prototype && SWFObject.prototype.write) {
                var _s1 = SWFObject.prototype.write;
                SWFObject.prototype.write = function () {
                    _args = arguments;
                    if (this.getAttribute("version").major < 8) {
                        this.addVariable("$swfaddress", FWDAddress.getValue());
                        ((typeof _args[0] == "string") ? document.getElementById(_args[0]) : _args[0]).so = this
                    }
                    var success;
                    if (success = _s1.apply(this, _args)) {
                        _ref.addId(this.getAttribute("id"))
                    }
                    return success
                }
            }
            if (typeof swfobject != UNDEFINED) {
                var _s2r = swfobject.registerObject;
                swfobject.registerObject = function () {
                    _args = arguments;
                    _s2r.apply(this, _args);
                    _ref.addId(_args[0])
                };
                var _s2c = swfobject.createSWF;
                swfobject.createSWF = function () {
                    _args = arguments;
                    var swf = _s2c.apply(this, _args);
                    if (swf) {
                        _ref.addId(_args[0].id)
                    }
                    return swf
                };
                var _s2e = swfobject.embedSWF;
                swfobject.embedSWF = function () {
                    _args = arguments;
                    if (typeof _args[8] == UNDEFINED) {
                        _args[8] = {}
                    }
                    if (typeof _args[8].id == UNDEFINED) {
                        _args[8].id = _args[1]
                    }
                    _s2e.apply(this, _args);
                    _ref.addId(_args[8].id)
                }
            }
            if (typeof UFO != UNDEFINED) {
                var _u = UFO.create;
                UFO.create = function () {
                    _args = arguments;
                    _u.apply(this, _args);
                    _ref.addId(_args[0].id)
                }
            }
            if (typeof AC_FL_RunContent != UNDEFINED) {
                var _a = AC_FL_RunContent;
                AC_FL_RunContent = function () {
                    _args = arguments;
                    _a.apply(this, _args);
                    for (var i = 0, l = _args.length; i < l; i++) {
                        if (_args[i] == "id") {
                            _ref.addId(_args[i + 1])
                        }
                    }
                }
            }
        })()
    };/* Gallery */
(function (window){
	
	var FWDRLEAP = function(stageContainer, data){
		
		var self = this;
	
		/* init gallery */
		self.init = function(){
			
			window["RLAudioPlayer"] = this;
			self.instanceName_str = "RLAudioPlayer";
			
			this.data = data;
			this.stageContainer = stageContainer;
			this.listeners = {events_ar:[]};
			this.main_do = null;
			this.controller_do = null;
			this.audioScreen_do = null;
			this.flash_do = null;
			this.flashObject = null;
			
			this.backgroundColor_str = self.data.audioControllerBackgroundColor_str || "transparent";
			this.flashObjectMarkup_str =  null;
			this.sourcePath_str;
			
			this.stageWidth = 0;
			this.stageHeight = 0;
	
			this.isAPIReady_bl = false;
			this.isFlashScreenReady_bl = false;
			this.orintationChangeComplete_bl = true;
			this.isMobile_bl = FWDRLUtils.isMobile;
			this.hasPointerEvent_bl = FWDRLUtils.hasPointerEvent;
			this.hasLoadingSkinError_bl = false;
			this.setupMainDo();
	
			
			if(FWDRLEAP.hasHTML5Audio){
				this.setupAudioScreen(self.data);
				this.setupController();
				this.isAPIReady_bl = true;
				this.dispatchEvent(FWDRLEAP.READY);
			}else{
				this.setupFlashScreen();
			}
		};
		
		//#############################################//
		/* setup main do */
		//#############################################//
		self.setupMainDo = function(){
			self.main_do = new FWDRLDisplayObject("div", "relative");
			self.main_do.getStyle().msTouchAction = "none";
			self.main_do.setBackfaceVisibility();
			self.main_do.setBkColor(self.backgroundColor_str);
			if(!FWDRLUtils.isMobile || (FWDRLUtils.isMobile && FWDRLUtils.hasPointerEvent)) self.main_do.setSelectable(false);
			self.stageContainer.appendChild(self.main_do.screen);
			setTimeout(self.resizeHandler, 300);
		};
		
		
		self.resizeHandler = function(){
			self.stageWidth = self.stageContainer.offsetWidth;
			self.stageHeight = self.stageContainer.offsetHeight;
	
			self.main_do.setWidth(self.stageWidth);
			self.main_do.setHeight(self.stageHeight);
			
			if(self.controller_do) self.controller_do.resizeAndPosition();
		};

		
		//###########################################//
		/* setup controller */
		//###########################################//
		this.setupController = function(){
			FWDRLEAPController.setPrototype();
			self.controller_do = new FWDRLEAPController(self.data, self);
			self.controller_do.addListener(FWDRLEAPController.PLAY, self.controllerOnPlayHandler);
			self.controller_do.addListener(FWDRLEAPController.PAUSE, self.controllerOnPauseHandler);
			self.controller_do.addListener(FWDRLEAPController.START_TO_SCRUB, self.controllerStartToScrubbHandler);
			self.controller_do.addListener(FWDRLEAPController.SCRUB, self.controllerScrubbHandler);
			self.controller_do.addListener(FWDRLEAPController.STOP_TO_SCRUB, self.controllerStopToScrubbHandler);
			self.controller_do.addListener(FWDRLEAPController.CHANGE_VOLUME, self.controllerChangeVolumeHandler);
			self.main_do.addChild(self.controller_do);
		};
		
		this.controllerOnPlayHandler = function(e){
			self.play();
		};
		
		this.controllerOnPauseHandler = function(e){
			if(FWDRLEAP.hasHTML5Audio){
				self.audioScreen_do.pause();
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.pauseAudio();
			}
		};
		
		this.controllerStartToScrubbHandler = function(e){
			if(FWDRLEAP.hasHTML5Audio){
				self.audioScreen_do.startToScrub();
			}else if(self.isFlashScreenReady_bl){
				self.pause();
				self.flashObject.startToScrub();
			}
		};
		
		this.controllerScrubbHandler = function(e){
			if(FWDRLEAP.hasHTML5Audio){
				self.audioScreen_do.scrub(e.percent);
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.scrub(e.percent);
			}
		};
		
		this.controllerStopToScrubbHandler = function(e){
			if(FWDRLEAP.hasHTML5Audio){
				self.audioScreen_do.stopToScrub();
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.stopToScrub();
			}
		};
		
		this.controllerChangeVolumeHandler = function(e){
			if(FWDRLEAP.hasHTML5Audio){
				self.audioScreen_do.setVolume(e.percent);
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.setVolume(e.percent);
			}
		};
		
		//###########################################//
		/* setup FWDRLEAPAudioScreen */
		//###########################################//
		this.setupAudioScreen = function(id){	
			FWDRLEAPAudioScreen.setPrototype();
			self.audioScreen_do = new FWDRLEAPAudioScreen(self, self.data);
			self.audioScreen_do.addListener(FWDRLEAPAudioScreen.START, self.audioScreenStartHandler);
			self.audioScreen_do.addListener(FWDRLEAPAudioScreen.ERROR, self.audioScreenErrorHandler);
			self.audioScreen_do.addListener(FWDRLEAPAudioScreen.SAFE_TO_SCRUBB, self.audioScreenSafeToScrubbHandler);
			self.audioScreen_do.addListener(FWDRLEAPAudioScreen.STOP, self.audioScreenStopHandler);
			self.audioScreen_do.addListener(FWDRLEAPAudioScreen.PLAY, self.audioScreenPlayHandler);
			self.audioScreen_do.addListener(FWDRLEAPAudioScreen.PAUSE, self.audioScreenPauseHandler);
			self.audioScreen_do.addListener(FWDRLEAPAudioScreen.UPDATE, self.audioScreenUpdateHandler);
			self.audioScreen_do.addListener(FWDRLEAPAudioScreen.UPDATE_TIME, self.audioScreenUpdateTimeHandler);
			self.audioScreen_do.addListener(FWDRLEAPAudioScreen.LOAD_PROGRESS, self.audioScreenLoadProgressHandler);
			self.audioScreen_do.addListener(FWDRLEAPAudioScreen.PLAY_COMPLETE, self.audioScreenPlayCompleteHandler);
			self.main_do.addChild(self.audioScreen_do);	
		};
		
		this.audioScreenStartHandler = function(){
			self.dispatchEvent(FWDRLEAP.START);
		};
		
		this.audioScreenErrorHandler = function(e){
			var error;
			self.hasLoadingSkinError_bl = true;
			if(FWDRLEAP.hasHTML5Audio){
				error = e.text;
				if(window.console) console.log(e);
			}else{
				error = e;
			}
			self.dispatchEvent(FWDRLEAP.ERROR, {error:error});
		};
		
		this.audioScreenSafeToScrubbHandler = function(){
			if(self.controller_do) self.controller_do.enableMainScrubber(); 
		};
		
		this.audioScreenStopHandler = function(e){
			if(self.controller_do){
				self.controller_do.disableMainScrubber();
				self.controller_do.showPlayButton();
			}
			self.dispatchEvent(FWDRLEAP.STOP);
		};
		
		this.audioScreenPlayHandler = function(){
			//console.log("play " + self.controller_do);
			if(self.controller_do) self.controller_do.showPauseButton(); 
			self.dispatchEvent(FWDRLEAP.PLAY);
		};
		
		this.audioScreenPauseHandler = function(){
			if(self.controller_do) self.controller_do.showPlayButton(); 
			self.dispatchEvent(FWDRLEAP.PAUSE);
		};
		
		this.audioScreenUpdateHandler = function(e){
			var percent;	
			if(FWDRLEAP.hasHTML5Audio){
				percent = e.percent;
				if(self.controller_do) self.controller_do.updateMainScrubber(percent);
			}else{
				percent = e;
				if(self.controller_do) self.controller_do.updateMainScrubber(percent);
			}
			self.dispatchEvent(FWDRLEAP.UPDATE, {percent:percent});
		};
		
		this.audioScreenUpdateTimeHandler = function(e){
			var time;
			if(FWDRLEAP.hasHTML5Audio){
				time = e.time;
				if(self.controller_do) self.controller_do.updateTime(time);
			}else{
				time = e;
				if(self.controller_do) self.controller_do.updateTime(time);
			}
		
			self.dispatchEvent(FWDRLEAP.UPDATE_TIME, {time:time});
		};
		
		this.audioScreenLoadProgressHandler = function(e){
			if(FWDRLEAP.hasHTML5Audio){
				if(self.controller_do) self.controller_do.updatePreloaderBar(e.percent);
			}else{
				if(self.controller_do) self.controller_do.updatePreloaderBar(e);
			}
		};
		
		this.audioScreenPlayCompleteHandler = function(){
			self.dispatchEvent(FWDRLEAP.PLAY_COMPLETE);
		};
		
		//#############################################//
		/* Flash screen... */
		//#############################################//
		this.setupFlashScreen = function(){

			if(!FWDRLFlashTest.hasFlashPlayerVersion("9.0.18")){
				var error = "Please install Adobe flash player! <a href='http://www.adobe.com/go/getflashplayer'>Click here to install.</a>";
				self.dispatchEvent(FWDRLEAP.ERROR, {error:error});
				return;
			}
			
			self.flash_do = new FWDRLDisplayObject("div");
			self.flash_do.setBackfaceVisibility();
			self.flash_do.setResizableSizeAfterParent();
		
			self.main_do.addChild(self.flash_do);
		
			self.flashObjectMarkup_str = '<object id="' + self.instanceName_str + '"classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="100%" height="100%"><param name="movie" value="' + self.data.audioFlashPath_str + '"/><param name="wmode" value="opaque"/><param name="scale" value="noscale"/><param name=FlashVars value="instanceName=' + self.instanceName_str + '&volume=' + self.data.volume + '&loop=' + self.data.audioLoop_bl + '"/><object type="application/x-shockwave-flash" data="' + self.data.audioFlashPath_str + '" width="100%" height="100%"><param name="movie" value="' + self.data.audioFlashPath_str + '"/><param name="wmode" value="opaque"/><param name="scale" value="noscale"/><param name=FlashVars value="instanceName=' + self.instanceName_str + '&volume=' + self.data.volume + '&loop=' + self.data.audioLoop_bl + '"/></object></object>';
			
			self.flash_do.screen.innerHTML = self.flashObjectMarkup_str;
			
			self.flashObject = self.flash_do.screen.firstChild;
			if(!FWDRLUtils.isIE) self.flashObject = self.flashObject.getElementsByTagName("object")[0];
		};
	
		this.flashScreenIsReady = function(){
			if(console) console.dir("flash  audio is ready " + self.instanceName_str);
			self.isFlashScreenReady_bl = true;
			self.setupController();
			self.isAPIReady_bl = true;
			self.dispatchEvent(FWDRLEAP.READY);
		};
		
		this.flashScreenFail = function(){
			var error = "External interface error!";
			self.dispatchEvent(FWDRLEAP.ERROR, {error:error});
		};
		
		//####################################//
		// API
		//###################################//
		this.play = function(){
			if(!self.isAPIReady_bl) return;
			if(FWDRLEAP.hasHTML5Audio){
				self.audioScreen_do.play();
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.playAudio();
				
			}
		};
		
		this.pause = function(){
			if(!self.isAPIReady_bl) return;
			if(FWDRLEAP.hasHTML5Audio){
				if(self.audioScreen_do) self.audioScreen_do.pause();
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.pauseAudio();
			}
		};
		
		this.stop = function(){
			if(!self.isAPIReady_bl) return;
			self.hasLoadingSkinError_bl = false;
			if(FWDRLEAP.hasHTML5Audio){
				if(self.audioScreen_do) self.audioScreen_do.stop();
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.stopAudio();
			}
		};
		
		this.startToScrub = function(){
			if(!self.isAPIReady_bl) return;
			if(FWDRLEAP.hasHTML5Audio){
				if(self.audioScreen_do) self.audioScreen_do.startToScrub();
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.startToScrub();
			}
		};
		
		this.stopToScrub = function(){
			if(!self.isAPIReady_bl) return;
			if(FWDRLEAP.hasHTML5Audio){
				if(self.audioScreen_do) self.audioScreen_do.stopToScrub();
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.stopToScrub();
			}
		};
		
		this.scrub = function(percent){
			if(!self.isAPIReady_bl) return;
			if(isNaN(percent)) return;
			if(percent < 0){
				percent = 0;
			}else if(percent > 1){
				percent = 1;
			}
			if(FWDRLEAP.hasHTML5Audio){
				if(self.audioScreen_do) self.audioScreen_do.scrub(percent);
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.scrub(percent);
			}
		};
	
		this.stopToScrub = function(e){
			if(!self.isAPIReady_bl) return;
			if(FWDRLEAP.hasHTML5Audio){
				if(self.audioScreen_do) self.audioScreen_do.stopToScrub();
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.stopToScrub();
			}
		};
		
		this.setSource = function(source){
			if(!self.isAPIReady_bl) return;
			self.hasLoadingSkinError_bl = false;
			self.sourcePath_str = source;
			if(FWDRLEAP.hasHTML5Audio){
				if(self.audioScreen_do) self.audioScreen_do.setSource(source);
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.setSource(source);
			}
		};
		
		this.getSourcePath = function(){
			if(!self.isAPIReady_bl) return;
			return self.sourcePath_str;
		};
		
		this.setVolume = function(volume){
			if(!self.isAPIReady_bl) return;
			if(self.controller_do) self.controller_do.updateVolume(volume);
			if(FWDRLEAP.hasHTML5Audio){
				if(self.audioScreen_do) self.audioScreen_do.setVolume(volume);
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.setVolume(volume);
			}
		};
		
		this.getIsAPIReady = function(){
			return self.isAPIReady_bl;
		};
		
		//###########################################//
		/* event dispatcher */
		//###########################################//
		this.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    this.dispatchEvent = function(type, props){
	    	if(this.listeners == null) return;
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	   this.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
		self.init();
	};
	
	/* set prototype */
	FWDRLEAP.setPrototype =  function(){
		FWDRLEAP.prototype = new FWDRLEventDispatcher();
	};
	
	FWDRLEAP.hasHTML5Audio = (function(){
		var soundTest_el = document.createElement("audio");
		var flag = false;
		if(soundTest_el.canPlayType){
			flag = Boolean(soundTest_el.canPlayType('audio/mpeg') == "probably" || soundTest_el.canPlayType('audio/mpeg') == "maybe");
		}
		if(self.isMobile_bl) return true;
		//return false;
		return flag;
	}());
	
	FWDRLEAP.getAudioFormats = (function(){
		var audio_el = document.createElement("audio");
		if(!audio_el.canPlayType) return;
		var extention_str = "";
		var extentions_ar = [];
		if(audio_el.canPlayType('audio/mpeg') == "probably" || audio_el.canPlayType('audio/mpeg') == "maybe"){
			extention_str += ".mp3";
		}
		
		if(audio_el.canPlayType("audio/ogg") == "probably" || audio_el.canPlayType("audio/ogg") == "maybe"){
			extention_str += ".ogg";
		}
		
		if(audio_el.canPlayType("audio/mp4") == "probably" || audio_el.canPlayType("audio/mp4") == "maybe"){
			extention_str += ".webm";
		}
		
		extentions_ar = extention_str.split(".");
		extentions_ar.shift();
		
		audio_el = null;
		return extentions_ar;
	})();
	
	FWDRLEAP.instaces_ar = [];
	
	FWDRLEAP.START = "start";
	FWDRLEAP.READY = "ready";
	FWDRLEAP.STOP	 = "stop";
	FWDRLEAP.PLAY = "play";
	FWDRLEAP.PAUSE = "pause";
	FWDRLEAP.UPDATE = "update";
	FWDRLEAP.UPDATE_TIME = "updateTime";
	FWDRLEAP.ERROR = "error";
	FWDRLEAP.PLAY_COMPLETE = "playComplete";
	
	
	window.FWDRLEAP = FWDRLEAP;
	
}(window));/* thumbs manager */
(function(window){
	
	var FWDRLEAPAudioScreen = function(parent, data){
		
		var self = this;
		var prototype = FWDRLEAPAudioScreen.prototype;
	
		this.audio_el = null;
	
		this.sourcePath_str = data.sourcePath_str;
		this.prevSourcePath_str = "none";
		
		this.volume = data.volume;
		this.countShoutCastErrors = 0;
		this.maxCountShoutCastErrors = 5;		
		
		this.testShoutCastId_to;
		
		self.preload_bl = false;
		this.autoPlay_bl = data.autoPlay_bl;
		this.loop_bl = data.audioLoop_bl;
		this.allowScrubing_bl = false;
		this.hasError_bl = true;
		this.isPlaying_bl = false;
		this.isStopped_bl = true;
		this.hasPlayedOnce_bl = false;
		this.isSafeToBeControlled_bl = false;
		this.isShoutcast_bl = false;
		this.isStartEventDispatched_bl = false;
		
		//###############################################//
		/* init */
		//###############################################//
		this.init = function(){
			self.setHeight(0);
		};
	
		//###############################################//
		/* Setup audio element */
		//##############################################//
		this.setupAudio = function(){
			if(self.audio_el == null){
				self.audio_el = document.createElement("audio");
				self.screen.appendChild(self.audio_el);
				self.audio_el.controls = false;
				self.audio_el.preload = "auto";
				self.audio_el.volume = self.volume;
			}
			
			self.audio_el.addEventListener("error", self.errorHandler);
			self.audio_el.addEventListener("canplay", self.safeToBeControlled);
			self.audio_el.addEventListener("canplaythrough", self.safeToBeControlled);
			self.audio_el.addEventListener("progress", self.updateProgress);
			self.audio_el.addEventListener("timeupdate", self.updateAudio);
			self.audio_el.addEventListener("pause", self.pauseHandler);
			self.audio_el.addEventListener("play", self.playHandler);
			self.audio_el.addEventListener("ended", self.endedHandler);
		};
		
		this.destroyAudio = function(){
			if(self.audio_el){
				self.audio_el.removeEventListener("error", self.errorHandler);
				self.audio_el.removeEventListener("canplay", self.safeToBeControlled);
				self.audio_el.removeEventListener("canplaythrough", self.safeToBeControlled);
				self.audio_el.removeEventListener("progress", self.updateProgress);
				self.audio_el.removeEventListener("timeupdate", self.updateAudio);
				self.audio_el.removeEventListener("pause", self.pauseHandler);
				self.audio_el.removeEventListener("play", self.playHandler);
				self.audio_el.removeEventListener("ended", self.endedHandler);
				self.audio_el.src = "";
				self.audio_el.load();
			}
			//try{
			//	self.screen.removeChild(self.audio_el);
			//}catch(e){}
			//self.audio_el = null;
		};
		
		//##########################################//
		/* Video error handler. */
		//##########################################//
		this.errorHandler = function(e){
			if(self.isShoutcast_bl && self.countShoutCastErrors <= self.maxCountShoutCastErrors && self.audio_el.networkState == 0){
				self.testShoutCastId_to = setTimeout(self.play, 200);
				self.countShoutCastErrors ++;
				return;
			}
			
			var error_str;
			self.hasError_bl = true;
			self.stop();
			
			if(self.audio_el.networkState == 0){
				error_str = "error 'self.audio_el.networkState = 1'";
			}else if(self.audio_el.networkState == 1){
				error_str = "error 'self.audio_el.networkState = 1'";
			}else if(self.audio_el.networkState == 2){
				error_str = "'self.audio_el.networkState = 2'";
			}else if(self.audio_el.networkState == 3){
				error_str = "Audio source not found <font color='#FF0000'>" + self.sourcePath_str + "</font>";
			}else{
				error_str = e;
			}
			
			if(window.console) window.console.log(self.audio_el.networkState);
			
			self.dispatchEvent(FWDRLEAPAudioScreen.ERROR, {text:error_str });
		};
		
		//##############################################//
		/* Set path */
		//##############################################//
		this.setSource = function(sourcePath){
			self.sourcePath_str = sourcePath;
			var paths_ar = self.sourcePath_str.split(",");
			var formats_ar = FWDRLEAP.getAudioFormats;
			//console.log("PATHS " +  "[" + paths_ar + "]");
			//console.log("FORMATS " + "[" + formats_ar + "]");
			
			for(var i=0; i<paths_ar.length; i++){
				var path = paths_ar[i];
				paths_ar[i] = FWDRLUtils.trim(path);
			}
			
			loop1:for(var j=0; j<paths_ar.length; j++){
				var path = paths_ar[j];
				for(var i=0; i<formats_ar.length; i++){
					var format = formats_ar[i];
					if(path.indexOf(format) != -1){
						self.sourcePath_str = path;			
						break loop1;
					}
				}
			}
			
			clearTimeout(self.testShoutCastId_to);
			
			if(self.sourcePath_str.indexOf(";") != -1 && FWDRLUtils.isChrome){
				self.isShoutcast_bl = true;
				self.countShoutCastErrors = 0;
			}else{
				self.isShoutcast_bl = false;
			}
			
			parent.sourcePath_str = self.sourcePath_str;
			if(self.audio_el) self.stop(true);
		};
	
		//##########################################//
		/* Play / pause / stop methods */
		//##########################################//
		this.play = function(overwrite){
			if(self.isStopped_bl){
				self.isPlaying_bl = false;
				self.hasError_bl = false;
				self.allowScrubing_bl = false;
				self.isStopped_bl = false;
				//if(self.audio_el == null)	
				self.setupAudio();
				self.audio_el.src = self.sourcePath_str;
				//self.audio_el.load();
				self.play();
			}else if(!self.audio_el.ended || overwrite){
				try{
					self.isPlaying_bl = true;
					self.hasPlayedOnce_bl = true;
					self.audio_el.play();
					
					if(FWDRLUtils.isIE) self.dispatchEvent(FWDRLEAPAudioScreen.PLAY);
				}catch(e){};
			}
		};

		this.pause = function(){
			if(self == null) return;
			if(self.audio_el == null) return;
			if(!self.audio_el.ended){
				try{
					self.audio_el.pause();
					self.isPlaying_bl = false;
					if(FWDRLUtils.isIE) self.dispatchEvent(FWDRLEAPAudioScreen.PAUSE);
				}catch(e){};
				
			}
		};
		
		this.pauseHandler = function(){
			if(self.allowScrubing_bl) return;
			self.dispatchEvent(FWDRLEAPAudioScreen.PAUSE);
		};
		
		this.playHandler = function(){
			if(self.allowScrubing_bl) return;
			if(!self.isStartEventDispatched_bl){
				self.dispatchEvent(FWDRLEAPAudioScreen.START);
				self.isStartEventDispatched_bl = true;
			}
			self.dispatchEvent(FWDRLEAPAudioScreen.PLAY);
		};
		
		this.endedHandler = function(){
			if(self.loop_bl){
				self.scrub(0);
				self.play();
			}else{
				self.stop();
			}
			self.dispatchEvent(FWDRLEAPAudioScreen.PLAY_COMPLETE);
		};
		
		this.stop = function(overwrite){
			if((self == null || self.audio_el == null || self.isStopped_bl) && !overwrite) return;
			self.isPlaying_bl = false;
			self.isStopped_bl = true;
			self.hasPlayedOnce_bl = true;
			self.isSafeToBeControlled_bl = false;
			self.isStartEventDispatched_bl = false;
			clearTimeout(self.testShoutCastId_to);
			self.audio_el.pause();
			self.destroyAudio();
			self.dispatchEvent(FWDRLEAPAudioScreen.STOP);
			self.dispatchEvent(FWDRLEAPAudioScreen.UPDATE_TIME, {time:"00:00/00:00"});
			self.dispatchEvent(FWDRLEAPAudioScreen.LOAD_PROGRESS, {percent:0});
		};

		//###########################################//
		/* Check if audio is safe to be controlled */
		//###########################################//
		this.safeToBeControlled = function(){
			if(!self.isSafeToBeControlled_bl){
				self.isPlaying_bl = true;
				self.isSafeToBeControlled_bl = true;
				self.dispatchEvent(FWDRLEAPAudioScreen.SAFE_TO_SCRUBB);
				self.dispatchEvent(FWDRLEAPAudioScreen.SAFE_TO_UPDATE_VOLUME);
			}
		};
	
		//###########################################//
		/* Update progress */
		//##########################################//
		this.updateProgress = function(){
			var buffered;
			var percentLoaded = 0;
			
			if(self.audio_el.buffered.length > 0){
				buffered = self.audio_el.buffered.end(self.audio_el.buffered.length - 1);
				percentLoaded = buffered.toFixed(1)/self.audio_el.duration.toFixed(1);
				if(isNaN(percentLoaded) || !percentLoaded) percentLoaded = 0;
			}
			
			if(percentLoaded == 1) self.audio_el.removeEventListener("progress", self.updateProgress);
			
			self.dispatchEvent(FWDRLEAPAudioScreen.LOAD_PROGRESS, {percent:percentLoaded});
		};
		
		//##############################################//
		/* Update audio */
		//#############################################//
	
		this.updateAudio = function(){
			var percentPlayed; 
			if (!self.allowScrubing_bl) {
				percentPlayed = self.audio_el.currentTime /self.audio_el.duration;
				self.dispatchEvent(FWDRLEAPAudioScreen.UPDATE, {percent:percentPlayed});
			}
			self.dispatchEvent(FWDRLEAPAudioScreen.UPDATE_TIME, {time:self.formatTime(self.audio_el.currentTime) + "/" + self.formatTime(self.audio_el.duration)});
		};
		
		
		this.formatTime = function(seconds){
			seconds = Math.round(seconds);
			minutes = Math.floor(seconds / 60);
			minutes = (minutes >= 10) ? minutes : "0" + minutes;
			seconds = Math.floor(seconds % 60);
			seconds = (seconds >= 10) ? seconds : "0" + seconds;
			if(isNaN(seconds)) return "00:00";
			return minutes + ":" + seconds;
		};
	
		
		//###############################################//
		/* Scrub */
		//###############################################//
		this.startToScrub = function(){
			self.allowScrubing_bl = true;
		};
		
		this.stopToScrub = function(){
			self.allowScrubing_bl = false;
		};
		
		this.scrub = function(percent, e){
			if(self.audio_el == null || !self.audio_el.duration) return;
			if(e) self.startToScrub();
			try{
				self.audio_el.currentTime = self.audio_el.duration * percent;
			//if(self.audio_el.paused && !self.audio_el.ended) self.play();
				self.dispatchEvent(FWDRLEAPAudioScreen.UPDATE_TIME, {time:self.formatTime(self.audio_el.currentTime) + "/" + self.formatTime(self.audio_el.duration)});
			}catch(e){}
		};
		
		//###############################################//
		/* Volume */
		//###############################################//
		this.setVolume = function(vol){
			if(vol) self.volume = vol;
			if(self.audio_el) self.audio_el.volume = self.volume;
		};
		
		//###############################################//
		/* destroy */
		//###############################################//
		this.destroy = function(){
				
			if(self.audio_el) self.audio_el.pause();
			self.destroyAudio();
			self.audio_el = null;
		
			parent = null;
			
			self.setInnerHTML("");
			self = null;
			prototype.destroy();
			prototype = null;
			FWDRLEAPAudioScreen.prototype = null;
		};
		
		this.init();
	};

	/* set prototype */
	FWDRLEAPAudioScreen.setPrototype = function(){
		FWDRLEAPAudioScreen.prototype = new FWDRLDisplayObject("div");
	};
	
	FWDRLEAPAudioScreen.ERROR = "error";
	FWDRLEAPAudioScreen.UPDATE = "update";
	FWDRLEAPAudioScreen.UPDATE_TIME = "updateTime";
	FWDRLEAPAudioScreen.SAFE_TO_SCRUBB = "safeToControll";
	FWDRLEAPAudioScreen.SAFE_TO_UPDATE_VOLUME = "safeToUpdateVolume";
	FWDRLEAPAudioScreen.LOAD_PROGRESS = "loadProgress";
	FWDRLEAPAudioScreen.START = "start";
	FWDRLEAPAudioScreen.PLAY = "play";
	FWDRLEAPAudioScreen.PAUSE = "pause";
	FWDRLEAPAudioScreen.STOP = "stop";
	FWDRLEAPAudioScreen.PLAY_COMPLETE = "playComplete";



	window.FWDRLEAPAudioScreen = FWDRLEAPAudioScreen;

}(window));/* FWDRLEAPController */
(function(){
var FWDRLEAPController = function(
			data,
			parent
		){
		
		var self = this;
		var prototype = FWDRLEAPController.prototype;
		
		this.bkPath_img = data.bkPath_img;
		this.playN_img = data.audioPlayN_img;
		this.pauseN_img = data.audioPauseN_img;
		this.audioMainScrubberBkLeft_img = data.audioMainScrubberBkLeft_img;
		this.mainScrubberBkRight_img = data.mainScrubberBkRight_img;
		this.mainScrubberDragLeft_img = data.mainScrubberDragLeft_img;
		this.mainScrubberLine_img = data.mainScrubberLine_img;
		this.volumeScrubberBkLeft_img = data.volumeScrubberBkLeft_img;
		this.volumeScrubberBkRight_img = data.volumeScrubberBkRight_img;
		this.volumeScrubberDragLeft_img = data.volumeScrubberDragLeft_img;
		this.volumeScrubberLine_img = data.volumeScrubberLine_img;
		this.timeBk_img = data.timeBk_img;
		this.volumeN_img = data.volumeN_img;
		this.volumeS_img = data.volumeS_img;
		this.volumeD_img = data.volumeD_img;
		this.progressLeft_img = data.progressLeft_img;
		
		this.buttons_ar = [];
		
		this.disable_do = null;
		this.mainHolder_do = null;
		this.bk_do = null;
		this.playPauseButton_do = null;
		this.mainScrubber_do = null;
		this.mainScrubberBkLeft_do = null;
		this.mainScrubberBkMiddle_do = null;
		this.mainScrubberBkRight_do = null;
		this.mainScrubberDrag_do = null;
		this.mainScrubberDragLeft_do = null;
		this.mainScrubberDragMiddle_do = null;
		this.mainScrubberBarLine_do = null;
		this.mainProgress_do = null;
		this.progressLeft_do = null;
		this.progressMiddle_do = null;
		this.time_do = null;
		this.volumeButton_do = null;
		this.volumeScrubber_do = null;
		this.volumeScrubberBkLeft_do = null;
		this.volumeScrubberBkMiddle_do = null;
		this.volumeScrubberBkRight_do = null;
		this.volumeScrubberDrag_do = null;
		this.volumeScrubberDragLeft_do = null;
		this.volumeScrubberDragMiddle_do = null;
		this.volumeScrubberBarLine_do = null;
		
		this.bkMiddlePath_str = data.bkMiddlePath_str;
		this.mainScrubberBkMiddlePath_str = data.mainScrubberBkMiddlePath_str;
		this.volumeScrubberBkMiddlePath_str = data.volumeScrubberBkMiddlePath_str;
		this.mainScrubberDragMiddlePath_str = data.mainScrubberDragMiddlePath_str;
		this.volumeScrubberDragMiddlePath_str = data.volumeScrubberDragMiddlePath_str;
		this.timeColor_str = data.timeColor_str;
		this.progressMiddlePath_str = data.progressMiddlePath_str;
		this.audioControllerBackgroundColor_str = data.audioControllerBackgroundColor_str;

		this.stageWidth = 0;
		this.scrubbersBkLeftAndRightWidth = this.audioMainScrubberBkLeft_img.width;
		this.mainScrubberWidth = 0;
		this.mainScrubberMinWidth = 150;
		this.volumeScrubberWidth = data.volumeScrubberWidth;
		this.scrubbersHeight = this.audioMainScrubberBkLeft_img.height;
		this.mainScrubberDragLeftWidth = self.mainScrubberDragLeft_img.width;
		this.scrubbersOffsetWidth = data.scrubbersOffsetWidth;
		this.scrubbersOffestTotalWidth = data.audioScrubbersOffestTotalWidth;
		this.volume = data.volume;
		this.lastVolume = self.volume;
		this.startSpaceBetweenButtons = data.startSpaceBetweenButtons;
		this.spaceBetweenButtons = data.vdSpaceBetweenButtons;
		this.timeOffestTotalWidth = 0;
		this.percentPlayed = 0;
		this.timeOffestLeftWidth = data.timeOffsetLeftWidth;
		this.timeOffsetRightWidth = data.timeOffsetRightWidth;
		this.lastTimeLength = 0;
		
		this.showAnimationIntroId_to;
	
		this.allowToChangeVolume_bl = data.allowToChangeVolume_bl;
		this.isMainScrubberScrubbing_bl = false;
		this.isMainScrubberDisabled_bl = false;
		this.isVolumeScrubberDisabled_bl = false;
		this.isMainScrubberLineVisible_bl = false;
		this.isVolumeScrubberLineVisible_bl = false;
		this.isMute_bl = false;
		this.isMobile_bl = FWDRLUtils.isMobile;
		this.hasPointerEvent_bl = FWDRLUtils.hasPointerEvent;

		//##########################################//
		/* initialize this */
		//##########################################//
		self.init = function(){
			//self.setOverflow("visible");
			self.mainHolder_do = new FWDRLDisplayObject("div");
			self.mainHolder_do.setOverflow("visible");
			self.setBkColor(self.audioControllerBackgroundColor_str);
			self.addChild(self.mainHolder_do);
			self.setupPlayPauseButton();
			self.setupMainScrubber();
			
			self.setupTime();
			self.setupVolumeButton();	
			self.setupVolumeScrubber();
			if(!self.isMobile_bl) self.setupDisable();
		};
		
		//###########################################//
		// Resize and position self...
		//###########################################//
		self.resizeAndPosition = function(overwrite){
			if(parent.stageWidth == self.stageWidth && parent.stageHeight == self.stageHeight && !overwrite) return;
			self.stageWidth = parent.stageWidth;
			self.stageHeight = parent.stageHeight;
			self.positionButtons();
		};
		
		//##############################//
		/* setup background */
		//##############################//
		self.positionButtons = function(){
			var button;
			var prevButton;
			if(!self.stageWidth) return;
			
			if(self.bk_do) self.bk_do.setWidth(self.stageWidth);
			if(self.playPauseButton_do){
				FWDAnimation.killTweensOf(self.mainHolder_do);
				self.mainHolder_do.setWidth(self.stageWidth);
				self.mainHolder_do.setHeight(self.stageHeight);
				self.setWidth(self.stageWidth);
				self.setHeight(self.stageHeight);
			}
		
			var buttonsCopy_ar = [];
			for (var i=0; i < self.buttons_ar.length; i++) {
				buttonsCopy_ar[i] = self.buttons_ar[i];
			}
			
			self.mainScrubberWidth = self.stageWidth - self.startSpaceBetweenButtons * 2;
			for (var i=0; i < buttonsCopy_ar.length; i++) {
				button = buttonsCopy_ar[i];
				if(button != self.mainScrubber_do){
					self.mainScrubberWidth -= button.w + self.spaceBetweenButtons;
				}
			};
			
		
			while(self.mainScrubberWidth < self.mainScrubberMinWidth && buttonsCopy_ar.length > 3){
				self.mainScrubberWidth = self.stageWidth - self.startSpaceBetweenButtons * 2;
				
				if(self.volumeScrubber_do && FWDRLUtils.indexOfArray(buttonsCopy_ar, self.volumeScrubber_do) != -1){
					buttonsCopy_ar.splice(FWDRLUtils.indexOfArray(buttonsCopy_ar, self.volumeScrubber_do), 1);
					self.volumeScrubber_do.setX(-1000);
				}else if(self.time_do && FWDRLUtils.indexOfArray(buttonsCopy_ar, self.time_do) != -1){
					buttonsCopy_ar.splice(FWDRLUtils.indexOfArray(buttonsCopy_ar, self.time_do), 1);
					self.time_do.setX(-1000);
				}else if(self.mainScrubber_do && FWDRLUtils.indexOfArray(buttonsCopy_ar, self.mainScrubber_do) != -1){
					buttonsCopy_ar.splice(FWDRLUtils.indexOfArray(buttonsCopy_ar, self.mainScrubber_do), 1);
					self.mainScrubber_do.setX(-1000);
				}else if(self.volumeButton_do && FWDRLUtils.indexOfArray(buttonsCopy_ar, self.volumeButton_do) != -1){
					buttonsCopy_ar.splice(FWDRLUtils.indexOfArray(buttonsCopy_ar, self.volumeButton_do), 1);
					self.volumeButton_do.setX(-1000);
				}
				
				for (var i=0; i < buttonsCopy_ar.length; i++) {
					button = buttonsCopy_ar[i];
					if(button != self.mainScrubber_do){
						self.mainScrubberWidth -= button.w + self.spaceBetweenButtons;
					}
				};
			};
			
			if(buttonsCopy_ar[buttonsCopy_ar.length -1] == self.volumeScrubber_do
			   || buttonsCopy_ar[buttonsCopy_ar.length -1] == self.mainScrubber_do){
			   self.mainScrubberWidth -= self.scrubbersOffestTotalWidth;	
			};
			
			if(buttonsCopy_ar[buttonsCopy_ar.length -1] == self.time_do){
				self.mainScrubberWidth -= self.timeOffestTotalWidth;	
			};
			
			for (var i=0; i < buttonsCopy_ar.length; i++) {
				button = buttonsCopy_ar[i];
				FWDAnimation.killTweensOf(button);
				if(i == 0){
					button.setX(self.startSpaceBetweenButtons);
				}else if(button == self.mainScrubber_do){
					prevButton = buttonsCopy_ar[i - 1];
					self.mainScrubber_do.setX(prevButton.x + prevButton.w + self.spaceBetweenButtons);
					self.mainScrubber_do.setWidth(self.mainScrubberWidth);
					self.mainScrubberBkMiddle_do.setWidth(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth * 2);
					self.mainScrubberBkRight_do.setX(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth);
					self.mainScrubberDragMiddle_do.setWidth(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth - self.scrubbersOffsetWidth);
				}else{
					prevButton = buttonsCopy_ar[i - 1];
					button.setX(prevButton.x + prevButton.w + self.spaceBetweenButtons);
				}
				
				button.setY(parseInt((self.stageHeight - button.h)/2));	
			};	
			
			
			if(self.disable_do){
				self.disable_do.setWidth(self.stageWidth);
				self.disable_do.setHeight(self.stageHeight);
			}
			
			if(((!self.mainScrubber_do) || (self.mainScrubber_do && self.mainScrubber_do.x < 0)) && button){
				parent.stageWidth = button.x + button.w + self.startSpaceBetweenButtons;
				self.stageWidth = parent.stageWidth;
				parent.resizeHandler(true);
			}
			
			if(self.progressMiddle_do) self.progressMiddle_do.setWidth(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth - self.scrubbersOffsetWidth);
			self.updateMainScrubber(self.percentPlayed);
		};
		
		//###############################//
		/* setup disable */
		//##############################//
		this.setupDisable = function(){
			self.disable_do = new FWDRLDisplayObject("div");
			if(FWDRLUtils.isIE){
				self.disable_do.setBkColor("#FFFFFF");
				self.disable_do.setAlpha(0);
			}
		};
	
		//################################################//
		/* Setup main scrubber */
		//################################################//
		this.setupMainScrubber = function(){

			//setup background bar
			self.mainScrubber_do = new FWDRLDisplayObject("div");

			//self.mainScrubber_do.setY(parseInt((self.stageHeight - self.scrubbersHeight)/2));
			self.mainScrubber_do.setHeight(self.scrubbersHeight);
			
			self.mainScrubberBkLeft_do = new FWDRLDisplayObject("img");
			self.mainScrubberBkLeft_do.setScreen(self.audioMainScrubberBkLeft_img);
			
			self.mainScrubberBkRight_do = new FWDRLDisplayObject("img");
			var mainScrubberBkRight_img = new Image();
			mainScrubberBkRight_img.src = data.mainScrubberBkRightPath_str;
			self.mainScrubberBkRight_do.setScreen(mainScrubberBkRight_img);
			self.mainScrubberBkRight_do.setWidth(self.mainScrubberBkLeft_do.w);
			self.mainScrubberBkRight_do.setHeight(self.mainScrubberBkLeft_do.h);
			
			var middleImage = new Image();
			middleImage.src = self.mainScrubberBkMiddlePath_str;
			
			if(self.isMobile_bl){
				self.mainScrubberBkMiddle_do = new FWDRLDisplayObject("div");	
				self.mainScrubberBkMiddle_do.getStyle().background = "url('" + self.mainScrubberBkMiddlePath_str + "') repeat-x";
			}else{
				self.mainScrubberBkMiddle_do = new FWDRLDisplayObject("img");
				self.mainScrubberBkMiddle_do.setScreen(middleImage);
			}
				
			self.mainScrubberBkMiddle_do.setHeight(self.scrubbersHeight);
			self.mainScrubberBkMiddle_do.setX(self.scrubbersBkLeftAndRightWidth);
			
			//setup progress bar
			self.mainProgress_do = new FWDRLDisplayObject("div");
			self.mainProgress_do.setHeight(self.scrubbersHeight);
		
			self.progressLeft_do = new FWDRLDisplayObject("img");
			self.progressLeft_do.setScreen(self.progress);
			
			middleImage = new Image();
			middleImage.src = self.progressMiddlePath_str;
			
			self.progressMiddle_do = new FWDRLDisplayObject("div");	
			self.progressMiddle_do.getStyle().background = "url('" + self.progressMiddlePath_str + "') repeat-x";
		
			self.progressMiddle_do.setHeight(self.scrubbersHeight);
			self.progressMiddle_do.setX(self.mainScrubberDragLeftWidth);
			
			//setup darg bar.
			self.mainScrubberDrag_do = new FWDRLDisplayObject("div");
			self.mainScrubberDrag_do.setHeight(self.scrubbersHeight);
		
			self.mainScrubberDragLeft_do = new FWDRLDisplayObject("img");
			self.mainScrubberDragLeft_do.setScreen(self.mainScrubberDragLeft_img);
			
			middleImage = new Image();
			middleImage.src = self.mainScrubberDragMiddlePath_str;
			if(self.isMobile_bl){
				self.mainScrubberDragMiddle_do = new FWDRLDisplayObject("div");	
				self.mainScrubberDragMiddle_do.getStyle().background = "url('" + self.mainScrubberDragMiddlePath_str + "') repeat-x";
			}else{
				self.mainScrubberDragMiddle_do = new FWDRLDisplayObject("img");
				self.mainScrubberDragMiddle_do.setScreen(middleImage);
			}
			self.mainScrubberDragMiddle_do.setHeight(self.scrubbersHeight);
			self.mainScrubberDragMiddle_do.setX(self.mainScrubberDragLeftWidth);
			
			self.mainScrubberBarLine_do = new FWDRLDisplayObject("img");
			self.mainScrubberBarLine_do.setScreen(self.mainScrubberLine_img);
			self.mainScrubberBarLine_do.setAlpha(0);
			self.mainScrubberBarLine_do.hasTransform3d_bl = false;
			self.mainScrubberBarLine_do.hasTransform2d_bl = false;
			
			self.buttons_ar.push(self.mainScrubber_do);
			
			//add all children
			self.mainScrubber_do.addChild(self.mainScrubberBkLeft_do);
			self.mainScrubber_do.addChild(self.mainScrubberBkMiddle_do);
			self.mainScrubber_do.addChild(self.mainScrubberBkRight_do);
			self.mainScrubber_do.addChild(self.mainScrubberBarLine_do);
			self.mainScrubberDrag_do.addChild(self.mainScrubberDragLeft_do);
			self.mainScrubberDrag_do.addChild(self.mainScrubberDragMiddle_do);
			self.mainProgress_do.addChild(self.progressLeft_do);
			self.mainProgress_do.addChild(self.progressMiddle_do);
			self.mainScrubber_do.addChild(self.mainProgress_do);
			self.mainScrubber_do.addChild(self.mainScrubberDrag_do);
			self.mainScrubber_do.addChild(self.mainScrubberBarLine_do);
			self.mainHolder_do.addChild(self.mainScrubber_do);
		
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.mainScrubber_do.screen.addEventListener("pointerover", self.mainScrubberOnOverHandler);
					self.mainScrubber_do.screen.addEventListener("pointerout", self.mainScrubberOnOutHandler);
					self.mainScrubber_do.screen.addEventListener("pointerdown", self.mainScrubberOnDownHandler);
				}else{
					self.mainScrubber_do.screen.addEventListener("touchstart", self.mainScrubberOnDownHandler);
				}
			}else if(self.screen.addEventListener){	
				self.mainScrubber_do.screen.addEventListener("mouseover", self.mainScrubberOnOverHandler);
				self.mainScrubber_do.screen.addEventListener("mouseout", self.mainScrubberOnOutHandler);
				self.mainScrubber_do.screen.addEventListener("mousedown", self.mainScrubberOnDownHandler);
			}else if(self.screen.attachEvent){
				self.mainScrubber_do.screen.attachEvent("onmouseover", self.mainScrubberOnOverHandler);
				self.mainScrubber_do.screen.attachEvent("onmouseout", self.mainScrubberOnOutHandler);
				self.mainScrubber_do.screen.attachEvent("onmousedown", self.mainScrubberOnDownHandler);
			}
			
			self.disableMainScrubber();
			self.updateMainScrubber(0);
		};
		
		this.mainScrubberOnOverHandler =  function(e){
			if(self.isMainScrubberDisabled_bl) return;
		};
		
		this.mainScrubberOnOutHandler =  function(e){
			if(self.isMainScrubberDisabled_bl) return;
		};
		
		this.mainScrubberOnDownHandler =  function(e){
			if(self.isMainScrubberDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			self.isMainScrubberScrubbing_bl = true;
			var viewportMouseCoordinates = FWDRLUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - self.mainScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > self.mainScrubberWidth - self.scrubbersOffsetWidth){
				localX = self.mainScrubberWidth - self.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/self.mainScrubberWidth;
			
			if(self.disable_do) self.addChild(self.disable_do);
			self.updateMainScrubber(percentScrubbed);
			
			self.dispatchEvent(FWDRLEAPController.START_TO_SCRUB);
			self.dispatchEvent(FWDRLEAPController.SCRUB, {percent:percentScrubbed});
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.addEventListener("pointermove", self.mainScrubberMoveHandler);
					window.addEventListener("pointerup", self.mainScrubberEndHandler);
				}else{
					window.addEventListener("touchmove", self.mainScrubberMoveHandler);
					window.addEventListener("touchend", self.mainScrubberEndHandler);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mousemove", self.mainScrubberMoveHandler);
					window.addEventListener("mouseup", self.mainScrubberEndHandler);		
				}else if(document.attachEvent){
					document.attachEvent("onmousemove", self.mainScrubberMoveHandler);
					document.attachEvent("onmouseup", self.mainScrubberEndHandler);		
				}
			}
		};
		
		this.mainScrubberMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDRLUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - self.mainScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > self.mainScrubberWidth - self.scrubbersOffsetWidth){
				localX = self.mainScrubberWidth - self.scrubbersOffsetWidth;
			}
			
			var percentScrubbed = localX/self.mainScrubberWidth;
			self.updateMainScrubber(percentScrubbed);
			self.dispatchEvent(FWDRLEAPController.SCRUB, {percent:percentScrubbed});
		};
		
		this.mainScrubberEndHandler = function(e){
			if(self.disable_do){
				if(self.contains(self.disable_do)) self.removeChild(self.disable_do);
			}
			/*
			if(e){
				if(e.preventDefault) e.preventDefault();
				self.mainScrubberMoveHandler(e);
			}
			*/
			self.dispatchEvent(FWDRLEAPController.STOP_TO_SCRUB);
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.removeEventListener("pointermove", self.mainScrubberMoveHandler);
					window.removeEventListener("pointerup", self.mainScrubberEndHandler);
				}else{
					window.removeEventListener("touchmove", self.mainScrubberMoveHandler);
					window.removeEventListener("touchend", self.mainScrubberEndHandler);
				}
			}else{
				if(window.removeEventListener){
					window.removeEventListener("mousemove", self.mainScrubberMoveHandler);
					window.removeEventListener("mouseup", self.mainScrubberEndHandler);		
				}else if(document.detachEvent){
					document.detachEvent("onmousemove", self.mainScrubberMoveHandler);
					document.detachEvent("onmouseup", self.mainScrubberEndHandler);		
				}
			}
		};
		
		this.disableMainScrubber = function(){
			if(!self.mainScrubber_do) return;
			self.isMainScrubberDisabled_bl = true;
			self.mainScrubber_do.setButtonMode(false);
			self.mainScrubberEndHandler();
			self.updateMainScrubber(0);
			self.updatePreloaderBar(0);
		};
		
		this.enableMainScrubber = function(){
			if(!self.mainScrubber_do) return;
			self.isMainScrubberDisabled_bl = false;
			self.mainScrubber_do.setButtonMode(true);
		};
		
		this.updateMainScrubber = function(percent){
			if(!self.mainScrubber_do || isNaN(percent)) return;
			var finalWidth = parseInt(percent * self.mainScrubberWidth); 
			self.percentPlayed = percent;
			if(!FWDRLEAP.hasHTML5Audio && finalWidth >= self.mainProgress_do.w) finalWidth = self.mainProgress_do.w;
			
			if(finalWidth < 1 && self.isMainScrubberLineVisible_bl){
				self.isMainScrubberLineVisible_bl = false;
				FWDAnimation.to(self.mainScrubberBarLine_do, .5, {alpha:0});
			}else if(finalWidth > 1 && !self.isMainScrubberLineVisible_bl){
				self.isMainScrubberLineVisible_bl = true;
				FWDAnimation.to(self.mainScrubberBarLine_do, .5, {alpha:1});
			}
			if(isNaN(finalWidth) || finalWidth < 0) finalWidth = 0;
			self.mainScrubberDrag_do.setWidth(finalWidth);
			if(finalWidth > self.mainScrubberWidth - self.scrubbersOffsetWidth) finalWidth = self.mainScrubberWidth - self.scrubbersOffsetWidth;
			FWDAnimation.to(self.mainScrubberBarLine_do, .8, {x:finalWidth + 1, ease:Expo.easeOut});
		};
		
		this.updatePreloaderBar = function(percent){
			if(!self.mainProgress_do || isNaN(percent)) return;
			var finalWidth = parseInt(percent * self.mainScrubberWidth); 
			
			if(percent == 1){
				self.mainProgress_do.setY(-30);
			}else if(self.mainProgress_do.y != 0 && percent!= 1){
				self.mainProgress_do.setY(0);
			}
			if(finalWidth > self.mainScrubberWidth - self.scrubbersOffsetWidth) finalWidth = self.mainScrubberWidth - self.scrubbersOffsetWidth;
			if(isNaN(finalWidth) || finalWidth < 0) finalWidth = 0;
			self.mainProgress_do.setWidth(finalWidth);
		};
		
		//################################################//
		/* Setup play button */
		//################################################//
		this.setupPlayPauseButton = function(){
			FWDRLComplexButton.setPrototype();
			self.playPauseButton_do = new FWDRLComplexButton(
					self.playN_img,
					data.audioPlaySPath_str,
					self.pauseN_img,
					data.audioPauseSPath_str,
					true
			);
			
			self.buttons_ar.push(self.playPauseButton_do);
			self.playPauseButton_do.addListener(FWDRLComplexButton.MOUSE_UP, self.playButtonMouseUpHandler);
			self.mainHolder_do.addChild(self.playPauseButton_do);
		};
		
		this.showPlayButton = function(){
			if(!self.playPauseButton_do) return;
			self.playPauseButton_do.setButtonState(1);
		};
		
		this.showPauseButton = function(){
			if(!self.playPauseButton_do) return;
			self.playPauseButton_do.setButtonState(0);
		};
		
		this.playButtonMouseUpHandler = function(){
			if(self.playPauseButton_do.currentState == 0){
				self.dispatchEvent(FWDRLEAPController.PAUSE);
			}else{
				self.dispatchEvent(FWDRLEAPController.PLAY);
			}
		};
		
		//########################################//
		/* Setup time*/
		//########################################//
		this.setupTime = function(){
			self.time_do = new FWDRLDisplayObject("div");
			self.time_do.hasTransform3d_bl = false;
			self.time_do.hasTransform2d_bl = false;
			self.time_do.setBackfaceVisibility();
			self.time_do.getStyle().paddingLeft = self.timeOffestLeftWidth + "px";
			self.time_do.getStyle().paddingRight = self.timeOffsetRightWidth + "px";
			self.time_do.getStyle().fontFamily = "Arial";
			self.time_do.getStyle().fontSize= "12px";
			self.time_do.getStyle().whiteSpace= "nowrap";
			self.time_do.getStyle().textAlign = "center";
			self.time_do.getStyle().color = self.timeColor_str;
			
			self.time_do.getStyle().fontSmoothing = "antialiased";
			self.time_do.getStyle().webkitFontSmoothing = "antialiased";
			self.time_do.getStyle().textRendering = "optimizeLegibility";	
			self.mainHolder_do.addChild(self.time_do);
			self.updateTime("00:00/00:00");
			self.buttons_ar.push(self.time_do);
			
		};
		
		
		this.updateTime = function(time){
			if(!self.time_do) return;
			self.time_do.setInnerHTML(time);
			
			if(self.lastTimeLength != time.length){
				self.time_do.w = self.time_do.getWidth();
				self.positionButtons();
				setTimeout(function(){
					self.time_do.w = self.time_do.getWidth();
					self.time_do.h = self.time_do.getHeight();
					self.positionButtons();
				}, 50);
				self.lastTimeLength = time.length;
			}
		};
		

		//##########################################//
		/* Setup volume button */
		//#########################################//
		this.setupVolumeButton = function(){
			FWDRLEVPVolumeButton.setPrototype();
			self.volumeButton_do = new FWDRLEVPVolumeButton(self.volumeN_img, data.volumeSPath_str, data.volumeDPath_str);
			self.volumeButton_do.addListener(FWDRLEVPVolumeButton.MOUSE_UP, self.volumeOnMouseUpHandler);
			self.buttons_ar.push(self.volumeButton_do);
			self.mainHolder_do.addChild(self.volumeButton_do); 
			if(!self.allowToChangeVolume_bl) self.volumeButton_do.disable();
		};
		
		this.volumeOnMouseUpHandler = function(){
			var vol = self.lastVolume;
			
			if(self.isMute_bl){
				vol = self.lastVolume;
				self.isMute_bl = false;
			}else{
				vol = 0.000001;
				self.isMute_bl = true;
			};
			self.updateVolume(vol);
		};
		
		//################################################//
		/* Setup volume scrubber */
		//################################################//
		this.setupVolumeScrubber = function(){
			//setup background bar
			self.volumeScrubber_do = new FWDRLDisplayObject("div");
			self.volumeScrubber_do.setHeight(self.scrubbersHeight);
			
			
			self.volumeScrubberBkLeft_do = new FWDRLDisplayObject("img");
			var volumeScrubberBkLeft_img = new Image();
			volumeScrubberBkLeft_img.src = data.volumeScrubberBkLeftPath_str;
			self.volumeScrubberBkLeft_do.setScreen(volumeScrubberBkLeft_img);
			self.volumeScrubberBkLeft_do.setWidth(self.audioMainScrubberBkLeft_img.width);
			self.volumeScrubberBkLeft_do.setHeight(self.audioMainScrubberBkLeft_img.height);
			
			self.volumeScrubberBkRight_do = new FWDRLDisplayObject("img");
			var volumeScrubberBkRight_img = new Image();
			volumeScrubberBkRight_img.src = data.volumeScrubberBkRightPath_str;
			self.volumeScrubberBkRight_do.setScreen(volumeScrubberBkRight_img);
			self.volumeScrubberBkRight_do.setWidth(self.mainScrubberBkRight_img.width);
			self.volumeScrubberBkRight_do.setHeight(self.mainScrubberBkRight_img.height);
			
			var middleImage = new Image();
			middleImage.src = self.volumeScrubberBkMiddlePath_str;
			
			if(self.isMobile_bl){
				self.volumeScrubberBkMiddle_do = new FWDRLDisplayObject("div");	
				self.volumeScrubberBkMiddle_do.getStyle().background = "url('" + self.volumeScrubberBkMiddlePath_str + "') repeat-x";
			}else{
				self.volumeScrubberBkMiddle_do = new FWDRLDisplayObject("img");
				self.volumeScrubberBkMiddle_do.setScreen(middleImage);
			}
				
			self.volumeScrubberBkMiddle_do.setHeight(self.scrubbersHeight);
			self.volumeScrubberBkMiddle_do.setX(self.scrubbersBkLeftAndRightWidth);
			
			//setup darg bar.
			self.volumeScrubberDrag_do = new FWDRLDisplayObject("div");
			self.volumeScrubberDrag_do.setHeight(self.scrubbersHeight);
		
			self.volumeScrubberDragLeft_do = new FWDRLDisplayObject("img");
			var volumeScrubberDragLeft_img = new Image();
			volumeScrubberDragLeft_img.src = data.volumeScrubberDragLeftPath_str;
			self.volumeScrubberDragLeft_do.setScreen(volumeScrubberDragLeft_img);
			self.volumeScrubberDragLeft_do.setWidth(self.mainScrubberDragLeft_img.width);
			self.volumeScrubberDragLeft_do.setHeight(self.mainScrubberDragLeft_img.height);
			
			middleImage = new Image();
			middleImage.src = self.volumeScrubberDragMiddlePath_str;
			if(self.isMobile_bl){
				self.volumeScrubberDragMiddle_do = new FWDRLDisplayObject("div");	
				self.volumeScrubberDragMiddle_do.getStyle().background = "url('" + self.volumeScrubberDragMiddlePath_str + "') repeat-x";
			}else{
				self.volumeScrubberDragMiddle_do = new FWDRLDisplayObject("img");
				self.volumeScrubberDragMiddle_do.setScreen(middleImage);
			}
			self.volumeScrubberDragMiddle_do.setHeight(self.scrubbersHeight);
			self.volumeScrubberDragMiddle_do.setX(self.mainScrubberDragLeftWidth);
		
			self.volumeScrubberBarLine_do = new FWDRLDisplayObject("img");
			var volumeScrubberBarLine_img = new Image();
			volumeScrubberBarLine_img.src = data.volumeScrubberLinePath_str;
			self.volumeScrubberBarLine_do.setScreen(volumeScrubberBarLine_img);
			self.volumeScrubberBarLine_do.setWidth(self.mainScrubberLine_img.width);
			self.volumeScrubberBarLine_do.setHeight(self.mainScrubberLine_img.height);
			
			self.volumeScrubberBarLine_do.setAlpha(0);
			self.volumeScrubberBarLine_do.hasTransform3d_bl = false;
			self.volumeScrubberBarLine_do.hasTransform2d_bl = false;
			
			self.volumeScrubber_do.setWidth(self.volumeScrubberWidth);
			self.volumeScrubberBkMiddle_do.setWidth(self.volumeScrubberWidth - self.scrubbersBkLeftAndRightWidth * 2);
			self.volumeScrubberBkRight_do.setX(self.volumeScrubberWidth - self.scrubbersBkLeftAndRightWidth);
			self.volumeScrubberDragMiddle_do.setWidth(self.volumeScrubberWidth - self.scrubbersBkLeftAndRightWidth - self.scrubbersOffsetWidth);
			
			//add all children
			self.volumeScrubber_do.addChild(self.volumeScrubberBkLeft_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberBkMiddle_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberBkRight_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberBarLine_do);
			self.volumeScrubberDrag_do.addChild(self.volumeScrubberDragLeft_do);
			self.volumeScrubberDrag_do.addChild(self.volumeScrubberDragMiddle_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberDrag_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberBarLine_do);
			
			self.buttons_ar.push(self.volumeScrubber_do);
			
			self.mainHolder_do.addChild(self.volumeScrubber_do);
		
			if(self.allowToChangeVolume_bl){
				if(self.isMobile_bl){
					if(self.hasPointerEvent_bl){
						self.volumeScrubber_do.screen.addEventListener("pointerover", self.volumeScrubberOnOverHandler);
						self.volumeScrubber_do.screen.addEventListener("pointerout", self.volumeScrubberOnOutHandler);
						self.volumeScrubber_do.screen.addEventListener("pointerdown", self.volumeScrubberOnDownHandler);
					}else{
						self.volumeScrubber_do.screen.addEventListener("touchstart", self.volumeScrubberOnDownHandler);
					}
				}else if(self.screen.addEventListener){	
					self.volumeScrubber_do.screen.addEventListener("mouseover", self.volumeScrubberOnOverHandler);
					self.volumeScrubber_do.screen.addEventListener("mouseout", self.volumeScrubberOnOutHandler);
					self.volumeScrubber_do.screen.addEventListener("mousedown", self.volumeScrubberOnDownHandler);
				}else if(self.screen.attachEvent){
					self.volumeScrubber_do.screen.attachEvent("onmouseover", self.volumeScrubberOnOverHandler);
					self.volumeScrubber_do.screen.attachEvent("onmouseout", self.volumeScrubberOnOutHandler);
					self.volumeScrubber_do.screen.attachEvent("onmousedown", self.volumeScrubberOnDownHandler);
				}
			}
			
			self.enableVolumeScrubber();
			self.updateVolumeScrubber(self.volume);
		};
		
		this.volumeScrubberOnOverHandler =  function(e){
			if(self.isVolumeScrubberDisabled_bl) return;
		};
		
		this.volumeScrubberOnOutHandler =  function(e){
			if(self.isVolumeScrubberDisabled_bl) return;
		};
		
		this.volumeScrubberOnDownHandler =  function(e){
			if(self.isVolumeScrubberDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDRLUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - self.volumeScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > self.volumeScrubberWidth - self.scrubbersOffsetWidth){
				localX = self.volumeScrubberWidth - self.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/self.volumeScrubberWidth;
			if(self.disable_do) self.addChild(self.disable_do);
			self.lastVolume = percentScrubbed;
			self.updateVolume(percentScrubbed);
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.addEventListener("pointermove", self.volumeScrubberMoveHandler);
					window.addEventListener("pointerup", self.volumeScrubberEndHandler);
				}else{
					window.addEventListener("touchmove", self.volumeScrubberMoveHandler);
					window.addEventListener("touchend", self.volumeScrubberEndHandler);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mousemove", self.volumeScrubberMoveHandler);
					window.addEventListener("mouseup", self.volumeScrubberEndHandler);		
				}else if(document.attachEvent){
					document.attachEvent("onmousemove", self.volumeScrubberMoveHandler);
					document.attachEvent("onmouseup", self.volumeScrubberEndHandler);		
				}
			}
		};
		
		this.volumeScrubberMoveHandler = function(e){
			if(self.isVolumeScrubberDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDRLUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - self.volumeScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > self.volumeScrubberWidth - self.scrubbersOffsetWidth){
				localX = self.volumeScrubberWidth - self.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/self.volumeScrubberWidth;
			self.lastVolume = percentScrubbed;
			self.updateVolume(percentScrubbed);
		};
		
		this.volumeScrubberEndHandler = function(){
			if(self.disable_do){
				if(self.contains(self.disable_do)) self.removeChild(self.disable_do);
			}
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.removeEventListener("pointermove", self.volumeScrubberMoveHandler);
					window.removeEventListener("pointerup", self.volumeScrubberEndHandler);
				}else{
					window.removeEventListener("touchmove", self.volumeScrubberMoveHandler);
					window.removeEventListener("touchend", self.volumeScrubberEndHandler);
				}
			}else{
				if(window.removeEventListener){
					window.removeEventListener("mousemove", self.volumeScrubberMoveHandler);
					window.removeEventListener("mouseup", self.volumeScrubberEndHandler);		
				}else if(document.detachEvent){
					document.detachEvent("onmousemove", self.volumeScrubberMoveHandler);
					document.detachEvent("onmouseup", self.volumeScrubberEndHandler);		
				}
			}
		};
		
		this.disableVolumeScrubber = function(){
			self.isVolumeScrubberDisabled_bl = true;
			self.volumeScrubber_do.setButtonMode(false);
			self.volumeScrubberEndHandler();
		};
		
		this.enableVolumeScrubber = function(){
			self.isVolumeScrubberDisabled_bl = false;
			self.volumeScrubber_do.setButtonMode(true);
		};
		
		this.updateVolumeScrubber = function(percent){
			var finalWidth = parseInt(percent * self.volumeScrubberWidth); 
			self.volumeScrubberDrag_do.setWidth(finalWidth);
			
			if(finalWidth < 1 && self.isVolumeScrubberLineVisible_bl){
				self.isVolumeScrubberLineVisible_bl = false;
				FWDAnimation.to(self.volumeScrubberBarLine_do, .5, {alpha:0});
			}else if(finalWidth > 1 && !self.isVolumeScrubberLineVisible_bl){
				self.isVolumeScrubberLineVisible_bl = true;
				FWDAnimation.to(self.volumeScrubberBarLine_do, .5, {alpha:1});
			}
			
			if(finalWidth > self.volumeScrubberWidth - self.scrubbersOffsetWidth) finalWidth = self.volumeScrubberWidth - self.scrubbersOffsetWidth;
			FWDAnimation.to(self.volumeScrubberBarLine_do, .8, {x:finalWidth + 1, ease:Expo.easeOut});
		};
		
		this.updateVolume = function(volume){
			self.volume = volume;
			if(self.volume <= 0.000001){
				self.isMute_bl = true;
				self.volume = 0.000001;
			}else if(self.voume >= 1){
				self.isMute_bl = false;
				self.volume = 1;
			}else{
				self.isMute_bl = false;
			}
			
			if(self.volume == 0.000001){
				if(self.volumeButton_do) self.volumeButton_do.setDisabledState();
			}else{
				if(self.volumeButton_do) self.volumeButton_do.setEnabledState();
			}
			
			if(self.volumeScrubberBarLine_do) self.updateVolumeScrubber(self.volume);
			self.dispatchEvent(FWDRLEAPController.CHANGE_VOLUME, {percent:self.volume});
		};
		
		//###################################//
		/* clean main events */
		//###################################//
		this.cleanMainEvents = function(){
			
		};
	
		this.init();
	};
	
	/* set prototype */
	FWDRLEAPController.setPrototype = function(){
		FWDRLEAPController.prototype = new FWDRLDisplayObject("div");
	};
	
	FWDRLEAPController.PLAY = "play";
	FWDRLEAPController.PAUSE = "pause";
	FWDRLEAPController.START_TO_SCRUB = "startToScrub";
	FWDRLEAPController.SCRUB = "scrub";
	FWDRLEAPController.STOP_TO_SCRUB = "stopToScrub";
	FWDRLEAPController.CHANGE_VOLUME = "changeVolume";
	
	
	FWDRLEAPController.prototype = null;
	window.FWDRLEAPController = FWDRLEAPController;
	
}());(function (){
	
	var FWDRLEventDispatcher = function (){
		
	    this.listeners = {events_ar:[]};
	     
	    this.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    this.dispatchEvent = function(type, props){
	    	if(this.listeners == null) return;
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	   this.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    
	    /* destroy */
	    this.destroy = function(){
	    	this.listeners = null;
	    	
	    	this.addListener = null;
		    this.dispatchEvent = null;
		    this.removeListener = null;
	    };
	    
	};	
	
	window.FWDRLEventDispatcher = FWDRLEventDispatcher;
}(window));/* FWDRLEVPController */
(function(){
var FWDRLEVPController = function(
			data,
			parent
		){
		
		var self = this;
		var prototype = FWDRLEVPController.prototype;
		
		this.bkLeft_img = data.bkLeft_img;
		this.bkRight_img = data.bkRight_img;
		this.videoPlayN_img = data.videoPlayN_img;
		this.playS_img = data.playS_img;
		this.videoPauseN_img = data.videoPauseN_img;
		this.pauseS_img = data.pauseS_img;
		this.videoMainScrubberBkLeft_img = data.videoMainScrubberBkLeft_img;
		this.videoMainScrubberDragLeft_img = data.videoMainScrubberDragLeft_img;
		this.videoMainScrubberLine_img = data.videoMainScrubberLine_img;
		this.volumeScrubberBkLeft_img = data.volumeScrubberBkLeft_img;
		this.volumeScrubberDragLeft_img = data.volumeScrubberDragLeft_img;
		this.volumeScrubberLine_img = data.volumeScrubberLine_img;
		this.videoProgressLeft_img = data.videoProgressLeft_img;
		this.videoVolumeN_img = data.videoVolumeN_img;
		this.volumeS_img = data.volumeS_img;
		this.volumeD_img = data.volumeD_img;
		this.videoFullScreenN_img = data.videoFullScreenN_img;
		this.videoNormalScreenN_img = data.videoNormalScreenN_img;
	
		this.buttons_ar = [];
		
		this.pointer_do;
		this.disable_do = null;
		this.mainHolder_do = null;
		this.playPauseButton_do = null;
		this.mainScrubber_do = null;
		this.mainScrubberBkLeft_do = null;
		this.mainScrubberBkMiddle_do = null;
		this.mainScrubberBkRight_do = null;
		this.mainScrubberDrag_do = null;
		this.mainScrubberDragLeft_do = null;
		this.mainScrubberDragMiddle_do = null;
		this.mainScrubberBarLine_do = null;
		this.mainProgress_do = null;
		this.progressLeft_do = null;
		this.progressMiddle_do = null;
		this.time_do = null;
		this.volumeButton_do = null;
		this.volumeScrubber_do = null;
		this.volumeScrubberBkLeft_do = null;
		this.volumeScrubberBkMiddle_do = null;
		this.volumeScrubberBkRight_do = null;
		this.volumeScrubberDrag_do = null;
		this.volumeScrubberDragLeft_do = null;
		this.volumeScrubberDragMiddle_do = null;
		this.volumeScrubberBarLine_do = null;
		this.fullScreenButton_do = null;
		this.bk_do = null;
		
		this.isMainScrubberOnTop_bl = true;
		this.videoControllerBackgroundColor_str = data.videoControllerBackgroundColor_str;
		
		this.videoBkMiddlePath_str = data.videoBkMiddlePath_str;
		this.videoMainScrubberBkMiddlePath_str = data.videoMainScrubberBkMiddlePath_str;
		this.videoVolumeScrubberBkMiddlePath_str = data.videoVolumeScrubberBkMiddlePath_str;
		this.videoMainScrubberDragMiddlePath_str = data.videoMainScrubberDragMiddlePath_str;
		this.videoVolumeScrubberDragMiddlePath_str = data.videoVolumeScrubberDragMiddlePath_str;
		this.timeColor_str = data.timeColor_str;
		this.videoProgressMiddlePath_str = data.videoProgressMiddlePath_str;
		
		this.mainScrubberOffestTop = data.mainScrubberOffestTop;
		this.stageWidth = 0;
		this.stageHeight = data.controllerHeight;
		this.scrubbersBkLeftAndRightWidth = this.videoMainScrubberBkLeft_img.width;
		this.mainScrubberWidth = 0;
		this.mainScrubberMinWidth = 100;
		this.volumeScrubberWidth = data.volumeScrubberWidth;
		this.scrubbersHeight = this.videoMainScrubberBkLeft_img.height;
		this.mainScrubberDragLeftWidth = self.videoMainScrubberDragLeft_img.width;
		this.scrubbersOffsetWidth = data.scrubbersOffsetWidth;
		this.volumeScrubberOffsetRightWidth = data.volumeScrubberOffsetRightWidth;
		this.volume = data.volume;
		this.lastVolume = self.volume;
		this.startSpaceBetweenButtons = data.startSpaceBetweenButtons;
		this.vdSpaceBetweenButtons = data.vdSpaceBetweenButtons;
		this.percentPlayed = 0;
		this.percentLoaded = 0;
		this.lastTimeLength = 0;
		this.pointerWidth = 8;
		this.pointerHeight = 5;
		this.timeOffsetLeftWidth = data.timeOffsetLeftWidth;
		this.timeOffsetRightWidth = data.timeOffsetRightWidth;

		this.videoShowFullScreenButton_bl = data.videoShowFullScreenButton_bl;
		this.showVolumeScrubber_bl = data.showVolumeScrubber_bl;
		this.allowToChangeVolume_bl = data.allowToChangeVolume_bl;
		this.showTime_bl = data.showTime_bl;
		this.showVolumeButton_bl = data.showVolumeButton_bl;
		this.showControllerWhenVideoIsStopped_bl = data.showControllerWhenVideoIsStopped_bl;
		this.isMainScrubberScrubbing_bl = false;
		this.isMainScrubberDisabled_bl = false;
		this.isVolumeScrubberDisabled_bl = false;
		this.isMainScrubberLineVisible_bl = false;
		this.isVolumeScrubberLineVisible_bl = false;
		this.isMute_bl = false;
		this.isShowed_bl = true;
		this.repeatBackground_bl = data.repeatBackground_bl;
		this.isMobile_bl = FWDRLUtils.isMobile;
		this.hasPointerEvent_bl = FWDRLUtils.hasPointerEvent;

		//##########################################//
		/* initialize this */
		//##########################################//
		self.init = function(){
			self.setOverflow("visible");
			self.mainHolder_do = new FWDRLDisplayObject("div");
			
			self.mainHolder_do.getStyle().backgroundColor = self.videoControllerBackgroundColor_str;
			self.mainHolder_do.setOverflow("visible");
		
			self.addChild(self.mainHolder_do);
		
			self.setupPlayPauseButton();
			self.setupMainScrubber();
			if(self.showTime_bl) self.setupTime();
			if(self.showVolumeButton_bl) self.setupVolumeButton();
			if(self.showVolumeScrubber_bl) self.setupVolumeScrubber();
			if(self.videoShowFullScreenButton_bl) self.setupFullscreenButton();
			
			if(!self.isMobile_bl) self.setupDisable();
			self.hide(false, true);
			if(self.showControllerWhenVideoIsStopped_bl) self.show(true);
		};
		
		
		//###########################################//
		// Resize and position self...
		//###########################################//
		self.resizeAndPosition = function(){
			self.stageWidth = parent.stageWidth;
			self.positionButtons();
			self.setY(parent.stageHeight - self.stageHeight);
		};
		
		//##############################//
		/* setup background */
		//##############################//
		self.positionButtons = function(){
			if(!self.stageWidth) return;
			var button;
			var prevButton;
			var hasTime_bl = self.showTime_bl;
			var hasVolumeScrubber_bl = self.volumeScrubber_do;
			
			self.mainHolder_do.setWidth(self.stageWidth);
			self.mainHolder_do.setHeight(self.stageHeight);
			self.setWidth(self.stageWidth);
			self.setHeight(self.stageHeight);
			
			var buttonsCopy_ar = [];
			for (var i=0; i < self.buttons_ar.length; i++) {
				buttonsCopy_ar[i] = self.buttons_ar[i];
			}
			
			self.mainScrubberWidth = self.stageWidth - self.startSpaceBetweenButtons * 2;
			for (var i=0; i < buttonsCopy_ar.length; i++) {
				button = buttonsCopy_ar[i];
				if(button != self.mainScrubber_do){
					self.mainScrubberWidth -= button.w + self.vdSpaceBetweenButtons;
				}
			};
			
			var testLegnth = 3;
			
			while(self.mainScrubberWidth < self.mainScrubberMinWidth && buttonsCopy_ar.length > testLegnth){
				self.mainScrubberWidth = self.stageWidth - self.startSpaceBetweenButtons * 2;
				
				if(self.volumeScrubber_do && FWDRLUtils.indexOfArray(buttonsCopy_ar, self.volumeScrubber_do) != -1){
					buttonsCopy_ar.splice(FWDRLUtils.indexOfArray(buttonsCopy_ar, self.volumeScrubber_do), 1);
					self.volumeScrubber_do.setX(-1000);
				}else if(self.time_do && FWDRLUtils.indexOfArray(buttonsCopy_ar, self.time_do) != -1){
					buttonsCopy_ar.splice(FWDRLUtils.indexOfArray(buttonsCopy_ar, self.time_do), 1);
					self.time_do.setX(-1000);
					hasTime_bl = false;
				}else if(self.volumeButton_do && FWDRLUtils.indexOfArray(buttonsCopy_ar, self.volumeButton_do) != -1){
					buttonsCopy_ar.splice(FWDRLUtils.indexOfArray(buttonsCopy_ar, self.volumeButton_do), 1);
					self.volumeButton_do.setX(-1000);
				}else if(self.volumeScrubber_do && FWDRLUtils.indexOfArray(buttonsCopy_ar, self.volumeScrubber_do) != -1){
					buttonsCopy_ar.splice(FWDRLUtils.indexOfArray(buttonsCopy_ar, self.volumeScrubber_do), 1);
					self.volumeScrubber_do.setX(-1000);
					hasVolumeScrubber_bl = false;
				}
				
				/*
				else{
					button = buttonsCopy_ar.splice(buttonsCopy_ar.length - 1, 1)[0];
					button.setX(-1000);
				}
				*/
				
				for (var i=0; i < buttonsCopy_ar.length; i++) {
					button = buttonsCopy_ar[i];
					if(button != self.mainScrubber_do){
						self.mainScrubberWidth -= button.w + self.vdSpaceBetweenButtons;
					}
				};
			};
			
			if(hasTime_bl) self.mainScrubberWidth -= self.timeOffsetLeftWidth * 2;
			if(hasVolumeScrubber_bl)  self.mainScrubberWidth -= self.volumeScrubberOffsetRightWidth;
			
			for (var i=0; i < buttonsCopy_ar.length; i++) {
				button = buttonsCopy_ar[i];
				
				if(i == 0){
					button.setX(self.startSpaceBetweenButtons);
				}else if(button == self.mainScrubber_do){
					prevButton = buttonsCopy_ar[i - 1];
					FWDAnimation.killTweensOf(self.mainScrubber_do);
					self.mainScrubber_do.setX(prevButton.x + prevButton.w + self.vdSpaceBetweenButtons);
					self.mainScrubber_do.setY(parseInt((self.stageHeight - self.scrubbersHeight)/2));
					self.mainScrubber_do.setWidth(self.mainScrubberWidth);
					self.mainScrubberBkMiddle_do.setWidth(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth * 2);
					self.mainScrubberBkRight_do.setX(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth);
					self.mainScrubberDragMiddle_do.setWidth(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth - self.scrubbersOffsetWidth);
				}else if(button == self.time_do){
					prevButton = buttonsCopy_ar[i - 1];
					button.setX(prevButton.x + prevButton.w + self.vdSpaceBetweenButtons + self.timeOffsetLeftWidth);
				}else if(button == self.volumeButton_do && hasTime_bl){
					prevButton = buttonsCopy_ar[i - 1];
					button.setX(prevButton.x + prevButton.w + self.vdSpaceBetweenButtons + self.timeOffsetRightWidth);
				}else{
					prevButton = buttonsCopy_ar[i - 1];
					if(hasVolumeScrubber_bl && prevButton == self.volumeScrubber_do){
						button.setX(prevButton.x + prevButton.w + self.vdSpaceBetweenButtons + self.volumeScrubberOffsetRightWidth);
					}else{
						button.setX(prevButton.x + prevButton.w + self.vdSpaceBetweenButtons);
					}
					
				}
			};	
			
			if(self.disable_do){
				self.disable_do.setWidth(self.stageWidth);
				self.disable_do.setHeight(self.stageHeight);
			}
			
			if(self.bk_do){
				self.bk_do.setWidth(self.stageWidth);
				self.bk_do.setHeight(self.stageHeight);
			}
			
			if(self.isShowed_bl){
				self.isMainScrubberOnTop_bl = false;
			}else{
				self.isMainScrubberOnTop_bl = true;
				self.positionScrollBarOnTopOfTheController();
			}
			
			if(self.progressMiddle_do) self.progressMiddle_do.setWidth(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth - self.scrubbersOffsetWidth);
			self.updateMainScrubber(self.percentPlayed);
			self.updatePreloaderBar(self.percentLoaded);
		};
		
		this.positionScrollBarOnTopOfTheController = function(){

			self.mainScrubberWidth = self.stageWidth;
			self.updatePreloaderBar(self.percentLoaded);
			
			self.mainScrubber_do.setWidth(self.mainScrubberWidth);
			self.mainScrubberBkMiddle_do.setWidth(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth * 2);
			self.mainScrubberBkRight_do.setX(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth);
			self.mainScrubberDragMiddle_do.setWidth(self.mainScrubberWidth - self.scrubbersBkLeftAndRightWidth - self.scrubbersOffsetWidth);
			
			FWDAnimation.killTweensOf(self.mainScrubber_do);
			self.mainScrubber_do.setX(0);
			if(self.isMainScrubberOnTop_bl || self.isShowed_bl){
				self.mainScrubber_do.setY(- self.mainScrubberOffestTop);
			}else if(self.mainScrubber_do.y != - self.mainScrubberOffestTop){
				self.mainScrubber_do.setY(self.mainScrubber_do.h);
				FWDAnimation.to(self.mainScrubber_do, .8, {y:- self.mainScrubberOffestTop, ease:Expo.easeOut});
			}
			self.isMainScrubberOnTop_bl = true;
		};
		
		
		//###############################//
		/* setup disable */
		//##############################//
		this.setupDisable = function(){
			self.disable_do = new FWDRLDisplayObject("div");
			if(FWDRLUtils.isIE){
				self.disable_do.setBkColor("#FFFFFF");
				self.disable_do.setAlpha(0);
			}
		};
	
		//################################################//
		/* Setup main scrubber */
		//################################################//
		this.setupMainScrubber = function(){
			//setup background bar
			self.mainScrubber_do = new FWDRLDisplayObject("div");
			self.mainScrubber_do.setHeight(self.scrubbersHeight);
			
			self.mainScrubberBkLeft_do = new FWDRLDisplayObject("img");
			self.mainScrubberBkLeft_do.setScreen(self.videoMainScrubberBkLeft_img);
			
			var rightImage = new Image();
			rightImage.src = data.videoMainScrubberBkRightPath_str;
			self.mainScrubberBkRight_do = new FWDRLDisplayObject("img");
			self.mainScrubberBkRight_do.setScreen(rightImage);
			self.mainScrubberBkRight_do.setWidth(self.mainScrubberBkLeft_do.w);
			self.mainScrubberBkRight_do.setHeight(self.mainScrubberBkLeft_do.h);
			
			var middleImage = new Image();
			middleImage.src = self.videoMainScrubberBkMiddlePath_str;
			
			if(self.isMobile_bl){
				self.mainScrubberBkMiddle_do = new FWDRLDisplayObject("div");	
				self.mainScrubberBkMiddle_do.getStyle().background = "url('" + self.videoMainScrubberBkMiddlePath_str + "') repeat-x";
			}else{
				self.mainScrubberBkMiddle_do = new FWDRLDisplayObject("img");
				self.mainScrubberBkMiddle_do.setScreen(middleImage);
			}
				
			self.mainScrubberBkMiddle_do.setHeight(self.scrubbersHeight);
			self.mainScrubberBkMiddle_do.setX(self.scrubbersBkLeftAndRightWidth);
			
			//setup progress bar
			self.mainProgress_do = new FWDRLDisplayObject("div");
			self.mainProgress_do.setHeight(self.scrubbersHeight);
			
			self.progressLeft_do = new FWDRLDisplayObject("img");
			self.progressLeft_do.setScreen(self.videoProgressLeft_img);
			
			middleImage = new Image();
			middleImage.src = self.videoProgressMiddlePath_str;
			
			self.progressMiddle_do = new FWDRLDisplayObject("div");	
			self.progressMiddle_do.getStyle().background = "url('" + self.videoProgressMiddlePath_str + "') repeat-x";
		
			self.progressMiddle_do.setHeight(self.scrubbersHeight);
			self.progressMiddle_do.setX(self.mainScrubberDragLeftWidth);
			
			//setup darg bar.
			self.mainScrubberDrag_do = new FWDRLDisplayObject("div");
			self.mainScrubberDrag_do.setHeight(self.scrubbersHeight);
		
			self.mainScrubberDragLeft_do = new FWDRLDisplayObject("img");
			self.mainScrubberDragLeft_do.setScreen(self.videoMainScrubberDragLeft_img);
			
			middleImage = new Image();
			middleImage.src = self.videoMainScrubberDragMiddlePath_str;
			if(self.isMobile_bl){
				self.mainScrubberDragMiddle_do = new FWDRLDisplayObject("div");	
				self.mainScrubberDragMiddle_do.getStyle().background = "url('" + self.videoMainScrubberDragMiddlePath_str + "') repeat-x";
			}else{
				self.mainScrubberDragMiddle_do = new FWDRLDisplayObject("img");
				self.mainScrubberDragMiddle_do.setScreen(middleImage);
			}
			self.mainScrubberDragMiddle_do.setHeight(self.scrubbersHeight);
			self.mainScrubberDragMiddle_do.setX(self.mainScrubberDragLeftWidth);
			
			self.mainScrubberBarLine_do = new FWDRLDisplayObject("img");
			self.mainScrubberBarLine_do.setScreen(self.videoMainScrubberLine_img);
			self.mainScrubberBarLine_do.setAlpha(0);
			self.mainScrubberBarLine_do.hasTransform3d_bl = false;
			self.mainScrubberBarLine_do.hasTransform2d_bl = false;
			
			self.buttons_ar.push(self.mainScrubber_do);
			
			//add all children
			self.mainScrubber_do.addChild(self.mainScrubberBkLeft_do);
			self.mainScrubber_do.addChild(self.mainScrubberBkMiddle_do);
			self.mainScrubber_do.addChild(self.mainScrubberBkRight_do);
			self.mainScrubber_do.addChild(self.mainScrubberBarLine_do);
			self.mainScrubberDrag_do.addChild(self.mainScrubberDragLeft_do);
			self.mainScrubberDrag_do.addChild(self.mainScrubberDragMiddle_do);
			self.mainProgress_do.addChild(self.progressLeft_do);
			self.mainProgress_do.addChild(self.progressMiddle_do);
			self.mainScrubber_do.addChild(self.mainProgress_do);
			self.mainScrubber_do.addChild(self.mainScrubberDrag_do);
			self.mainScrubber_do.addChild(self.mainScrubberBarLine_do);
			self.mainHolder_do.addChild(self.mainScrubber_do);
		
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.mainScrubber_do.screen.addEventListener("pointerover", self.mainScrubberOnOverHandler);
					self.mainScrubber_do.screen.addEventListener("pointerout", self.mainScrubberOnOutHandler);
					self.mainScrubber_do.screen.addEventListener("pointerdown", self.mainScrubberOnDownHandler);
				}else{
					self.mainScrubber_do.screen.addEventListener("touchstart", self.mainScrubberOnDownHandler);
				}
			}else if(self.screen.addEventListener){	
				self.mainScrubber_do.screen.addEventListener("mouseover", self.mainScrubberOnOverHandler);
				self.mainScrubber_do.screen.addEventListener("mouseout", self.mainScrubberOnOutHandler);
				self.mainScrubber_do.screen.addEventListener("mousedown", self.mainScrubberOnDownHandler);
			}else if(self.screen.attachEvent){
				self.mainScrubber_do.screen.attachEvent("onmouseover", self.mainScrubberOnOverHandler);
				self.mainScrubber_do.screen.attachEvent("onmouseout", self.mainScrubberOnOutHandler);
				self.mainScrubber_do.screen.attachEvent("onmousedown", self.mainScrubberOnDownHandler);
			}
			
			self.disableMainScrubber();
			self.updateMainScrubber(0);
		};
		
		this.mainScrubberOnOverHandler =  function(e){
			if(self.isMainScrubberDisabled_bl) return;
		};
		
		this.mainScrubberOnOutHandler =  function(e){
			if(self.isMainScrubberDisabled_bl) return;
		};
		
		this.mainScrubberOnDownHandler =  function(e){
			if(self.isMainScrubberDisabled_bl || e.button == 2) return;
			if(e.preventDefault) e.preventDefault();
			self.isMainScrubberScrubbing_bl = true;
			var viewportMouseCoordinates = FWDRLUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - self.mainScrubber_do.getGlobalX();
			
		
			if(localX < 0){
				localX = 0;
			}else if(localX > self.mainScrubberWidth - self.scrubbersOffsetWidth){
				localX = self.mainScrubberWidth - self.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/self.mainScrubberWidth;
		
			if(self.disable_do) self.addChild(self.disable_do);
			self.updateMainScrubber(percentScrubbed);
			
			self.dispatchEvent(FWDRLEVPController.START_TO_SCRUB);
			self.dispatchEvent(FWDRLEVPController.SCRUB, {percent:percentScrubbed});
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.addEventListener("pointermove", self.mainScrubberMoveHandler);
					window.addEventListener("pointerup", self.mainScrubberEndHandler);
				}else{
					window.addEventListener("touchmove", self.mainScrubberMoveHandler);
					window.addEventListener("touchend", self.mainScrubberEndHandler);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mousemove", self.mainScrubberMoveHandler);
					window.addEventListener("mouseup", self.mainScrubberEndHandler);		
				}else if(document.attachEvent){
					document.attachEvent("onmousemove", self.mainScrubberMoveHandler);
					document.attachEvent("onmouseup", self.mainScrubberEndHandler);		
				}
			}
		};
		
		this.mainScrubberMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDRLUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - self.mainScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > self.mainScrubberWidth - self.scrubbersOffsetWidth){
				localX = self.mainScrubberWidth - self.scrubbersOffsetWidth;
			}
			
			var percentScrubbed = localX/self.mainScrubberWidth;
			self.updateMainScrubber(percentScrubbed);
			self.dispatchEvent(FWDRLEVPController.SCRUB, {percent:percentScrubbed});
		};
		
		this.mainScrubberEndHandler = function(e){
			if(self.disable_do){
				if(self.contains(self.disable_do)) self.removeChild(self.disable_do);
			}
			/*
			if(e){
				if(e.preventDefault) e.preventDefault();
				self.mainScrubberMoveHandler(e);
			}
			*/
			self.dispatchEvent(FWDRLEVPController.STOP_TO_SCRUB);
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.removeEventListener("pointermove", self.mainScrubberMoveHandler);
					window.removeEventListener("pointerup", self.mainScrubberEndHandler);
				}else{
					window.removeEventListener("touchmove", self.mainScrubberMoveHandler);
					window.removeEventListener("touchend", self.mainScrubberEndHandler);
				}
			}else{
				if(window.removeEventListener){
					window.removeEventListener("mousemove", self.mainScrubberMoveHandler);
					window.removeEventListener("mouseup", self.mainScrubberEndHandler);		
				}else if(document.detachEvent){
					document.detachEvent("onmousemove", self.mainScrubberMoveHandler);
					document.detachEvent("onmouseup", self.mainScrubberEndHandler);		
				}
			}
		};
		
		this.disableMainScrubber = function(){
			if(!self.mainScrubber_do) return;
			self.isMainScrubberDisabled_bl = true;
			self.mainScrubber_do.setButtonMode(false);
			self.mainScrubberEndHandler();
			self.updateMainScrubber(0);
			self.updatePreloaderBar(0);
		};
		
		this.enableMainScrubber = function(){
			if(!self.mainScrubber_do) return;
			self.isMainScrubberDisabled_bl = false;
			self.mainScrubber_do.setButtonMode(true);
		};
		
		this.updateMainScrubber = function(percent){
			if(!self.mainScrubber_do) return;
			
			var finalWidth = parseInt(percent * self.mainScrubberWidth); 
			if(isNaN(finalWidth)) return;
			
			self.percentPlayed = percent;
			if(!FWDRLEVPlayer.hasHTML5Video && finalWidth >= self.mainProgress_do.w) finalWidth = self.mainProgress_do.w;
			
			if(finalWidth < 1 && self.isMainScrubberLineVisible_bl){
				self.isMainScrubberLineVisible_bl = false;
				FWDAnimation.to(self.mainScrubberBarLine_do, .5, {alpha:0});
			}else if(finalWidth > 1 && !self.isMainScrubberLineVisible_bl){
				self.isMainScrubberLineVisible_bl = true;
				FWDAnimation.to(self.mainScrubberBarLine_do, .5, {alpha:1});
			}
			self.mainScrubberDrag_do.setWidth(finalWidth);
			if(finalWidth > self.mainScrubberWidth - self.scrubbersOffsetWidth) finalWidth = self.mainScrubberWidth - self.scrubbersOffsetWidth;
			FWDAnimation.to(self.mainScrubberBarLine_do, .8, {x:finalWidth + 1, ease:Expo.easeOut});
		};
		
		this.updatePreloaderBar = function(percent){
			if(!self.mainProgress_do) return;
			
			self.percentLoaded = percent;
			var finalWidth = parseInt(Math.max(0,self.percentLoaded * self.mainScrubberWidth)); 
			
			if(self.percentLoaded >= 0.98){
				self.mainProgress_do.setY(-30);
			}else if(self.mainProgress_do.y != 0 && self.percentLoaded!= 1){
				self.mainProgress_do.setY(0);
			}
			if(finalWidth > self.mainScrubberWidth - self.scrubbersOffsetWidth) finalWidth = Math.max(0,self.mainScrubberWidth - self.scrubbersOffsetWidth);
			if(finalWidth < 0) finalWidth = 0;
			self.mainProgress_do.setWidth(finalWidth);
		};
		
		//################################################//
		/* Setup play button */
		//################################################//
		this.setupPlayPauseButton = function(){
			FWDRLComplexButton.setPrototype();
			self.playPauseButton_do = new FWDRLComplexButton(
					self.videoPlayN_img,
					data.videoPlaySPath_str,
					self.videoPauseN_img,
					data.videoPauseSPath_str,
					true
			);
			
			self.buttons_ar.push(self.playPauseButton_do);
			self.playPauseButton_do.setY(parseInt((self.stageHeight - self.playPauseButton_do.buttonHeight)/2));
			self.playPauseButton_do.addListener(FWDRLComplexButton.MOUSE_UP, self.playButtonMouseUpHandler);
			self.mainHolder_do.addChild(self.playPauseButton_do);
		};
		
		this.showPlayButton = function(){
			if(!self.playPauseButton_do) return;
			self.playPauseButton_do.setButtonState(1);
		};
		
		this.showPauseButton = function(){
			if(!self.playPauseButton_do) return;
			self.playPauseButton_do.setButtonState(0);
		};
		
		this.playButtonMouseUpHandler = function(){
			if(self.playPauseButton_do.currentState == 0){
				self.dispatchEvent(FWDRLEVPController.PAUSE);
			}else{
				self.dispatchEvent(FWDRLEVPController.PLAY);
			}
		};
		
		//##########################################//
		/* Setup fullscreen button */
		//##########################################//
		this.setupFullscreenButton = function(){
			FWDRLComplexButton.setPrototype();
			self.fullScreenButton_do = new FWDRLComplexButton(
					self.videoFullScreenN_img,
					data.videoFullScreenSPath_str,
					self.videoNormalScreenN_img,
					data.videoNormalScreenSPath_str,
					true
			);
			
			self.buttons_ar.push(self.fullScreenButton_do);
			self.fullScreenButton_do.setY(parseInt((self.stageHeight - self.fullScreenButton_do.buttonHeight)/2));
			self.fullScreenButton_do.addListener(FWDRLComplexButton.MOUSE_UP, self.fullScreenButtonMouseUpHandler);
			self.mainHolder_do.addChild(self.fullScreenButton_do);
		};
		
		this.showFullScreenButton = function(){
			if(!self.fullScreenButton_do) return;
			self.fullScreenButton_do.setButtonState(1);
		};
		
		this.showNormalScreenButton = function(){
			if(!self.fullScreenButton_do) return;
			self.fullScreenButton_do.setButtonState(0);
		};
		
		this.setNormalStateToFullScreenButton = function(){
			if(!self.fullScreenButton_do) return;
			self.fullScreenButton_do.setNormalState();
		};
		
		this.fullScreenButtonMouseUpHandler = function(){
			
			if(self.fullScreenButton_do.currentState == 1){
				self.dispatchEvent(FWDRLEVPController.FULL_SCREEN);
			}else{
				self.dispatchEvent(FWDRLEVPController.NORMAL_SCREEN);
			}
		};
		
		//########################################//
		/* Setup time*/
		//########################################//
		this.setupTime = function(){
			self.time_do = new FWDRLDisplayObject("div");
			self.time_do.hasTransform3d_bl = false;
			self.time_do.hasTransform2d_bl = false;
			self.time_do.setBackfaceVisibility();
			self.time_do.getStyle().fontFamily = "Arial";
			self.time_do.getStyle().fontSize= "12px";
			self.time_do.getStyle().whiteSpace= "nowrap";
			self.time_do.getStyle().textAlign = "center";
			self.time_do.getStyle().color = self.timeColor_str;
			self.time_do.getStyle().fontSmoothing = "antialiased";
			self.time_do.getStyle().webkitFontSmoothing = "antialiased";
			self.time_do.getStyle().textRendering = "optimizeLegibility";	
			self.mainHolder_do.addChild(self.time_do);
			self.updateTime("00:00/00:00");
			self.buttons_ar.push(self.time_do);
		};
		
		this.updateTime = function(time){
			if(!self.time_do) return;
			self.time_do.setInnerHTML(time);
			
			if(self.lastTimeLength != time.length){
				self.time_do.w = self.time_do.getWidth();
				self.positionButtons();
				
				setTimeout(function(){
					self.time_do.w = self.time_do.getWidth();
					self.time_do.h = self.time_do.getHeight();
					self.time_do.setY(parseInt((self.stageHeight - self.time_do.h)/2) + 1);
					self.positionButtons();
				}, 50);
				self.lastTimeLength = time.length;
			}
		};
		
		//##########################################//
		/* Setup volume button */
		//#########################################//
		this.setupVolumeButton = function(){
			FWDRLEVPVolumeButton.setPrototype();
			self.volumeButton_do = new FWDRLEVPVolumeButton(self.videoVolumeN_img, data.videoVolumeSPath_str, data.videoVolumeDPath_str);
			self.volumeButton_do.addListener(FWDRLEVPVolumeButton.MOUSE_UP, self.volumeOnMouseUpHandler);
			self.volumeButton_do.setY(parseInt((self.stageHeight - self.volumeButton_do.h)/2));
			self.buttons_ar.push(self.volumeButton_do);
			self.mainHolder_do.addChild(self.volumeButton_do); 
			if(!self.allowToChangeVolume_bl) self.volumeButton_do.disable();
		};
		
		this.volumeOnMouseUpHandler = function(){
			var vol = self.lastVolume;
			
			if(self.isMute_bl){
				vol = self.lastVolume;
				self.isMute_bl = false;
			}else{
				vol = 0.000001;
				self.isMute_bl = true;
			};
			self.updateVolume(vol);
		};
		
		//################################################//
		/* Setup volume scrubber */
		//################################################//
		this.setupVolumeScrubber = function(){
			//setup background bar
			self.volumeScrubber_do = new FWDRLDisplayObject("div");
			self.volumeScrubber_do.setHeight(self.scrubbersHeight);
			self.volumeScrubber_do.setY(parseInt((self.stageHeight - self.scrubbersHeight)/2));
			
		
			self.volumeScrubberBkLeft_do = new FWDRLDisplayObject("img");
			var volumeScrubberBkLeft_img = new Image();
			volumeScrubberBkLeft_img.src = self.mainScrubberBkLeft_do.screen.src;
			self.volumeScrubberBkLeft_do.setScreen(volumeScrubberBkLeft_img);
			self.volumeScrubberBkLeft_do.setWidth(self.mainScrubberBkLeft_do.w);
			self.volumeScrubberBkLeft_do.setHeight(self.mainScrubberBkLeft_do.h);
			
			var rightImage = new Image();
			rightImage.src = data.videoVolumeScrubberBkRightPath_str;
			self.volumeScrubberBkRight_do = new FWDRLDisplayObject("img");
			self.volumeScrubberBkRight_do.setScreen(rightImage);
			self.volumeScrubberBkRight_do.setWidth(self.volumeScrubberBkLeft_do.w);
			self.volumeScrubberBkRight_do.setHeight(self.volumeScrubberBkLeft_do.h);
			
			var middleImage = new Image();
			middleImage.src = self.videoVolumeScrubberBkMiddlePath_str;
			
			if(self.isMobile_bl){
				self.volumeScrubberBkMiddle_do = new FWDRLDisplayObject("div");	
				self.volumeScrubberBkMiddle_do.getStyle().background = "url('" + self.videoVolumeScrubberBkMiddlePath_str + "') repeat-x";
			}else{
				self.volumeScrubberBkMiddle_do = new FWDRLDisplayObject("img");
				self.volumeScrubberBkMiddle_do.setScreen(middleImage);
			}
				
			self.volumeScrubberBkMiddle_do.setHeight(self.scrubbersHeight);
			self.volumeScrubberBkMiddle_do.setX(self.scrubbersBkLeftAndRightWidth);
			
			//setup darg bar.
			self.volumeScrubberDrag_do = new FWDRLDisplayObject("div");
			self.volumeScrubberDrag_do.setHeight(self.scrubbersHeight);
		
			self.volumeScrubberDragLeft_do = new FWDRLDisplayObject("img");
			var volumeScrubberDrag_img = new Image();
			volumeScrubberDrag_img.src = self.mainScrubberDragLeft_do.screen.src;
			self.volumeScrubberDragLeft_do.setScreen(volumeScrubberDrag_img);
			self.volumeScrubberDragLeft_do.setWidth(self.mainScrubberDragLeft_do.w);
			self.volumeScrubberDragLeft_do.setHeight(self.mainScrubberDragLeft_do.h);
			
			middleImage = new Image();
			middleImage.src = self.videoVolumeScrubberDragMiddlePath_str;
			if(self.isMobile_bl){
				self.volumeScrubberDragMiddle_do = new FWDRLDisplayObject("div");	
				self.volumeScrubberDragMiddle_do.getStyle().background = "url('" + self.videoVolumeScrubberDragMiddlePath_str + "') repeat-x";
			}else{
				self.volumeScrubberDragMiddle_do = new FWDRLDisplayObject("img");
				self.volumeScrubberDragMiddle_do.setScreen(middleImage);
			}
			self.volumeScrubberDragMiddle_do.setHeight(self.scrubbersHeight);
			self.volumeScrubberDragMiddle_do.setX(self.mainScrubberDragLeftWidth);
		
			self.volumeScrubberBarLine_do = new FWDRLDisplayObject("img");
			var volumeScrubberBarLine_img = new Image();
			volumeScrubberBarLine_img.src = self.mainScrubberBarLine_do.screen.src;
			self.volumeScrubberBarLine_do.setScreen(volumeScrubberBarLine_img);
			self.volumeScrubberBarLine_do.setWidth(self.mainScrubberBarLine_do.w);
			self.volumeScrubberBarLine_do.setHeight(self.mainScrubberBarLine_do.h);
			self.volumeScrubberBarLine_do.setAlpha(0);
			self.volumeScrubberBarLine_do.hasTransform3d_bl = false;
			self.volumeScrubberBarLine_do.hasTransform2d_bl = false;
			
			self.volumeScrubber_do.setWidth(self.volumeScrubberWidth);
			self.volumeScrubberBkMiddle_do.setWidth(self.volumeScrubberWidth - self.scrubbersBkLeftAndRightWidth * 2);
			self.volumeScrubberBkRight_do.setX(self.volumeScrubberWidth - self.scrubbersBkLeftAndRightWidth);
			self.volumeScrubberDragMiddle_do.setWidth(self.volumeScrubberWidth - self.scrubbersBkLeftAndRightWidth - self.scrubbersOffsetWidth);
			
			//add all children
			self.volumeScrubber_do.addChild(self.volumeScrubberBkLeft_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberBkMiddle_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberBkRight_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberBarLine_do);
			self.volumeScrubberDrag_do.addChild(self.volumeScrubberDragLeft_do);
			self.volumeScrubberDrag_do.addChild(self.volumeScrubberDragMiddle_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberDrag_do);
			self.volumeScrubber_do.addChild(self.volumeScrubberBarLine_do);
			
			self.buttons_ar.push(self.volumeScrubber_do);
			
			self.mainHolder_do.addChild(self.volumeScrubber_do);
		
			if(self.allowToChangeVolume_bl){
				if(self.isMobile_bl){
					if(self.hasPointerEvent_bl){
						self.volumeScrubber_do.screen.addEventListener("pointerover", self.volumeScrubberOnOverHandler);
						self.volumeScrubber_do.screen.addEventListener("pointerout", self.volumeScrubberOnOutHandler);
						self.volumeScrubber_do.screen.addEventListener("pointerdown", self.volumeScrubberOnDownHandler);
					}else{
						self.volumeScrubber_do.screen.addEventListener("touchstart", self.volumeScrubberOnDownHandler);
					}
				}else if(self.screen.addEventListener){	
					self.volumeScrubber_do.screen.addEventListener("mouseover", self.volumeScrubberOnOverHandler);
					self.volumeScrubber_do.screen.addEventListener("mouseout", self.volumeScrubberOnOutHandler);
					self.volumeScrubber_do.screen.addEventListener("mousedown", self.volumeScrubberOnDownHandler);
				}else if(self.screen.attachEvent){
					self.volumeScrubber_do.screen.attachEvent("onmouseover", self.volumeScrubberOnOverHandler);
					self.volumeScrubber_do.screen.attachEvent("onmouseout", self.volumeScrubberOnOutHandler);
					self.volumeScrubber_do.screen.attachEvent("onmousedown", self.volumeScrubberOnDownHandler);
				}
			}
			
			self.enableVolumeScrubber();
			self.updateVolumeScrubber(self.volume);
		};
		
		this.volumeScrubberOnOverHandler =  function(e){
			if(self.isVolumeScrubberDisabled_bl) return;
		};
		
		this.volumeScrubberOnOutHandler =  function(e){
			if(self.isVolumeScrubberDisabled_bl) return;
		};
		
		this.volumeScrubberOnDownHandler =  function(e){
			if(self.isVolumeScrubberDisabled_bl || e.button == 2) return;
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDRLUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - self.volumeScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > self.volumeScrubberWidth - self.scrubbersOffsetWidth){
				localX = self.volumeScrubberWidth - self.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/self.volumeScrubberWidth;
			if(self.disable_do) self.addChild(self.disable_do);
			self.lastVolume = percentScrubbed;
			self.updateVolume(percentScrubbed);
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.addEventListener("pointermove", self.volumeScrubberMoveHandler);
					window.addEventListener("pointerup", self.volumeScrubberEndHandler);
				}else{
					window.addEventListener("touchmove", self.volumeScrubberMoveHandler);
					window.addEventListener("touchend", self.volumeScrubberEndHandler);
				}
			}else{
				if(window.addEventListener){
					window.addEventListener("mousemove", self.volumeScrubberMoveHandler);
					window.addEventListener("mouseup", self.volumeScrubberEndHandler);		
				}else if(document.attachEvent){
					document.attachEvent("onmousemove", self.volumeScrubberMoveHandler);
					document.attachEvent("onmouseup", self.volumeScrubberEndHandler);		
				}
			}
		};
		
		this.volumeScrubberMoveHandler = function(e){
			if(self.isVolumeScrubberDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDRLUtils.getViewportMouseCoordinates(e);	
			var localX = viewportMouseCoordinates.screenX - self.volumeScrubber_do.getGlobalX();
			
			if(localX < 0){
				localX = 0;
			}else if(localX > self.volumeScrubberWidth - self.scrubbersOffsetWidth){
				localX = self.volumeScrubberWidth - self.scrubbersOffsetWidth;
			}
			var percentScrubbed = localX/self.volumeScrubberWidth;
			self.lastVolume = percentScrubbed;
			self.updateVolume(percentScrubbed);
		};
		
		this.volumeScrubberEndHandler = function(){
			if(self.disable_do){
				if(self.contains(self.disable_do)) self.removeChild(self.disable_do);
			}
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					window.removeEventListener("pointermove", self.volumeScrubberMoveHandler);
					window.removeEventListener("pointerup", self.volumeScrubberEndHandler);
				}else{
					window.removeEventListener("touchmove", self.volumeScrubberMoveHandler);
					window.removeEventListener("touchend", self.volumeScrubberEndHandler);
				}
			}else{
				if(window.removeEventListener){
					window.removeEventListener("mousemove", self.volumeScrubberMoveHandler);
					window.removeEventListener("mouseup", self.volumeScrubberEndHandler);		
				}else if(document.detachEvent){
					document.detachEvent("onmousemove", self.volumeScrubberMoveHandler);
					document.detachEvent("onmouseup", self.volumeScrubberEndHandler);		
				}
			}
		};
		
		this.disableVolumeScrubber = function(){
			self.isVolumeScrubberDisabled_bl = true;
			self.volumeScrubber_do.setButtonMode(false);
			self.volumeScrubberEndHandler();
		};
		
		this.enableVolumeScrubber = function(){
			self.isVolumeScrubberDisabled_bl = false;
			self.volumeScrubber_do.setButtonMode(true);
		};
		
		this.updateVolumeScrubber = function(percent){
			var finalWidth = parseInt(percent * self.volumeScrubberWidth); 
			self.volumeScrubberDrag_do.setWidth(finalWidth);
			
			if(finalWidth < 1 && self.isVolumeScrubberLineVisible_bl){
				self.isVolumeScrubberLineVisible_bl = false;
				FWDAnimation.to(self.volumeScrubberBarLine_do, .5, {alpha:0});
			}else if(finalWidth > 1 && !self.isVolumeScrubberLineVisible_bl){
				self.isVolumeScrubberLineVisible_bl = true;
				FWDAnimation.to(self.volumeScrubberBarLine_do, .5, {alpha:1});
			}
			
			if(finalWidth > self.volumeScrubberWidth - self.scrubbersOffsetWidth) finalWidth = self.volumeScrubberWidth - self.scrubbersOffsetWidth;
			FWDAnimation.to(self.volumeScrubberBarLine_do, .8, {x:finalWidth + 1, ease:Expo.easeOut});
		};
		
		this.updateVolume = function(volume, preventEvent){
			if(!self.showVolumeScrubber_bl) return;
			self.volume = volume;
			if(self.volume <= 0.000001){
				self.isMute_bl = true;
				self.volume = 0.000001;
			}else if(self.voume >= 1){
				self.isMute_bl = false;
				self.volume = 1;
			}else{
				self.isMute_bl = false;
			}
			
			if(self.volume == 0.000001){
				if(self.volumeButton_do) self.volumeButton_do.setDisabledState();
			}else{
				if(self.volumeButton_do) self.volumeButton_do.setEnabledState();
			}
			
			if(self.volumeScrubberBarLine_do) self.updateVolumeScrubber(self.volume);
			if(!preventEvent) self.dispatchEvent(FWDRLEVPController.CHANGE_VOLUME, {percent:self.volume});
		};
		
		//###################################//
		/* show / hide */
		//###################################//
		this.show = function(animate){
			if(self.isShowed_bl) return;
			self.isShowed_bl = true;
			if(animate){
				FWDAnimation.to(self.mainHolder_do, .8, {y:0, ease:Expo.easeInOut});
			}else{
				FWDAnimation.killTweensOf(self.mainHolder_do);
				self.mainHolder_do.setY(0);
			}
			setTimeout(self.positionButtons, 200);
		};
		
		this.hide = function(animate, hideForGood){
			if(!self.isShowed_bl && !hideForGood) return;
			self.isShowed_bl = false;
			var offsetY = 0;
			if(hideForGood) offsetY = self.mainScrubberOffestTop;
			if(animate){
				FWDAnimation.to(self.mainHolder_do, .8, {y:self.stageHeight + offsetY, ease:Expo.easeInOut});
			}else{
				FWDAnimation.killTweensOf(self.mainHolder_do);
				self.mainHolder_do.setY(self.stageHeight + offsetY);
			}
		};
	
		this.init();
	};
	
	/* set prototype */
	FWDRLEVPController.setPrototype = function(){
		FWDRLEVPController.prototype = new FWDRLDisplayObject("div");
	};
	
	FWDRLEVPController.FACEBOOK_SHARE = "share";
	FWDRLEVPController.FULL_SCREEN = "fullScreen";
	FWDRLEVPController.NORMAL_SCREEN = "normalScreen";
	FWDRLEVPController.PLAY = "play";
	FWDRLEVPController.PAUSE = "pause";
	FWDRLEVPController.START_TO_SCRUB = "startToScrub";
	FWDRLEVPController.SCRUB = "scrub";
	FWDRLEVPController.STOP_TO_SCRUB = "stopToScrub";
	FWDRLEVPController.CHANGE_VOLUME = "changeVolume";
	
	FWDRLEVPController.prototype = null;
	window.FWDRLEVPController = FWDRLEVPController;
	
}());/* Gallery */
(function (window){
	
	var FWDRLEVPlayer = function(stageContainer, data){
		
		var self = this;
		
		self.displayType = FWDRLEVPlayer.AFTER_PARENT;
	
		/* init gallery */
		self.init = function(){

			this.mustHaveHolderDiv_bl = false;
			
			window["RLVideoPlayer"] = this;
			self.instanceName_str = "RLVideoPlayer";
			
			if(self.displayType == FWDRLEVPlayer.AFTER_PARENT) self.mustHaveHolderDiv_bl = true;
		
			this.body = document.getElementsByTagName("body")[0];
			this.stageContainer = stageContainer;
			this.data = data;
	
			this.listeners = {events_ar:[]};
			this.main_do = null;
			this.preloader_do = null;
			this.controller_do = null;
			this.videoScreen_do = null;
			this.flash_do = null;
			this.flashObject = null;
			this.videoPoster_do = null;
			this.largePlayButton_do = null;
			this.hider = null;
			
			this.backgroundColor_str = "#000000";
			this.videoBackgroundColor_str = "#000000";
			this.flashObjectMarkup_str =  null;
			
			this.lastX = 0;
			this.lastY = 0;
			this.stageWidth = 0;
			this.stageHeight = 0;
			this.firstTapX;
			this.firstTapY;
			this.curTime;
			this.totalTime;
			
			this.videoSourcePath_str;
			this.prevVideoSourcePath_str;
			this.posterPath_str;
			this.videoType_str;
			this.videoStartBehaviour_str;
			this.prevVideoSource_str;
			this.prevPosterSource_str;
			this.finalVideoPath_str;
		
			this.resizeHandlerId_to;
			this.hidePreloaderId_to;
			this.orientationChangeId_to;
			this.disableClickId_to;
			this.clickDelayId_to;
			this.secondTapId_to;
			
			this.isVideoPlayingWhenOpenWindows_bl = false;
			this.isSpaceDown_bl = false;
			this.isPlaying_bl = false;
			this.firstTapPlaying_bl = false;
			this.stickOnCurrentInstanceKey_bl = false;
			this.isFullScreen_bl = false;
			this.isFlashScreenReady_bl = false;
			this.orintationChangeComplete_bl = true;
			this.disableClick_bl = false;
			this.isAPIReady_bl = false;
			this.isInstantiate_bl = true;
			this.isMobile_bl = FWDRLUtils.isMobile;
			this.hasPointerEvent_bl = FWDRLUtils.hasPointerEvent;
		
			this.setupMainDo();
			this.setupNormalVideoPlayers();
		};
		
		//#############################################//
		/* setup main do */
		//#############################################//
		self.setupMainDo = function(){
			self.main_do = new FWDRLDisplayObject("div");
			self.main_do.getStyle().msTouchAction = "none";
			self.main_do.getStyle().webkitTapHighlightColor = "rgba(0, 0, 0, 0)";
			self.main_do.getStyle().webkitFocusRingColor = "rgba(0, 0, 0, 0)";
			self.main_do.getStyle().width = "100%";
			self.main_do.getStyle().height = "100%";
			self.main_do.setBackfaceVisibility();
			self.main_do.setBkColor(self.backgroundColor_str);
			if(!FWDRLUtils.isMobile || (FWDRLUtils.isMobile && FWDRLUtils.hasPointerEvent)) self.main_do.setSelectable(false);
			
			self.stageContainer.style.overflow = "visible";
			self.stageContainer.appendChild(self.main_do.screen);
			setTimeout(self.resizeHandler, 300);
		};
	

		self.resizeHandler = function(){	
		
			if(self.isFullScreen_bl || self.displayType == FWDRLEVPlayer.FULL_SCREEN){	
				var ws = FWDRLUtils.getViewportSize();
				self.main_do.setX(0);
				self.main_do.setY(0);
				self.stageWidth = ws.w;
				self.stageHeight = ws.h;
			}else{
				self.stageWidth = self.stageContainer.offsetWidth;
				self.stageHeight = self.stageContainer.offsetHeight;
			}
		
			self.main_do.setWidth(self.stageWidth);
			self.main_do.setHeight(self.stageHeight);
		
			if(self.isFlashScreenReady_bl && self.videoType_str == FWDRLEVPlayer.VIDEO){
				self.flash_do.setWidth(self.stageWidth);
				self.flash_do.setHeight(self.stageHeight);
			}
			
			if(self.controller_do) self.controller_do.resizeAndPosition();
			
			if(self.videoScreen_do && self.videoType_str == FWDRLEVPlayer.VIDEO){
				self.videoScreen_do.resizeAndPosition(self.stageWidth, self.stageHeight);
			}
			
			if(self.preloader_do) self.positionPreloader();
			if(self.dumyClick_do){
				self.dumyClick_do.setWidth(self.stageWidth);
				if(self.isMobile_bl){
					self.dumyClick_do.setHeight(self.stageHeight);
				}else{
					self.dumyClick_do.setHeight(self.stageHeight);
				}
			}
			if(self.largePlayButton_do) self.positionLargePlayButton();
			if(self.videoPoster_do && self.videoPoster_do.allowToShow_bl) self.videoPoster_do.positionAndResize();
			
		};
		
		//###############################################//
		/* Setup click screen */
		//###############################################//
		this.setupClickScreen = function(){
			self.dumyClick_do = new FWDRLDisplayObject("div");
			if(FWDRLUtils.isIE){
				self.dumyClick_do.setBkColor("#00FF00");
				self.dumyClick_do.setAlpha(.0001);
			}
			if(self.dumyClick_do.screen.addEventListener){
				self.dumyClick_do.screen.addEventListener("click", self.playPauseClickHandler);
			}else if(self.dumyClick_do.screen.attachEvent){
				self.dumyClick_do.screen.attachEvent("onclick", self.playPauseClickHandler);
			}
			self.hideClickScreen();
			self.main_do.addChild(self.dumyClick_do);
		};
		
		this.playPauseClickHandler = function(e){
			if(e.button == 2) return;
			if(self.disableClick_bl) return;
			self.firstTapPlaying_bl = self.isPlaying_bl;
			
			FWDRLEVPlayer.keyboardCurInstance = self;
			
			if(self.controller_do.mainHolder_do.y != 0 && self.isMobile_bl) return;
			
			
			if(FWDRLEVPlayer.hasHTML5Video){
				if(self.videoScreen_do) self.videoScreen_do.togglePlayPause();
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.togglePlayPause();
			}
		};
		
		this.showClickScreen = function(){
			self.dumyClick_do.setVisible(true);
		};
		
		this.hideClickScreen = function(){
			self.dumyClick_do.setVisible(false);
		};
		
		this.disableClick = function(){
			self.disableClick_bl = true;
			clearTimeout(self.disableClickId_to);
			self.disableClickId_to =  setTimeout(function(){
				self.disableClick_bl = false;
			}, 500);
		};
		
		//########################################//
		/* add double click and tap support */
		//########################################//
		this.addDoubleClickSupport = function(){	
			if(!self.isMobile_bl && self.dumyClick_do.screen.addEventListener){
				self.dumyClick_do.screen.addEventListener("mousedown", self.onFirstDown);
				if(FWDRLUtils.isIEWebKit) self.dumyClick_do.screen.addEventListener("dblclick", self.onSecondDown);
			}else if(self.isMobile_bl){
				self.dumyClick_do.screen.addEventListener("touchstart", self.onFirstDown);
			}else if(self.dumyClick_do.screen.addEventListener){
				self.dumyClick_do.screen.addEventListener("mousedown", self.onFirstDown);
			}
		};
		
		this.onFirstDown = function(e){
			if(e.button == 2) return;
			if(self.isFullscreen_bl && e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDRLUtils.getViewportMouseCoordinates(e);
			self.firstTapX = viewportMouseCoordinates.screenX;
			self.firstTapY = viewportMouseCoordinates.screenY;
			
			self.firstTapPlaying_bl = self.isPlaying_bl;
			
			if(FWDRLUtils.isIEWebKit) return;
			
			if(self.isMobile_bl){
				self.dumyClick_do.screen.addEventListener("touchstart", self.onSecondDown);
				self.dumyClick_do.screen.removeEventListener("touchstart", self.onFirstDown);
			}else{
				if(self.dumyClick_do.screen.addEventListener){
					self.dumyClick_do.screen.addEventListener("mousedown", self.onSecondDown);
					self.dumyClick_do.screen.removeEventListener("mousedown", self.onFirstDown);
				}
			}
			clearTimeout(self.secondTapId_to);
			self.secondTapId_to = setTimeout(self.doubleTapExpired, 250);
		};
		
		this.doubleTapExpired = function(){
			clearTimeout(self.secondTapId_to);
			if(self.isMobile_bl){
				self.dumyClick_do.screen.removeEventListener("touchstart", self.onSecondDown);
				self.dumyClick_do.screen.addEventListener("touchstart", self.onFirstDown);
			}else{
				if(self.dumyClick_do.screen.addEventListener){
					self.dumyClick_do.screen.removeEventListener("mousedown", self.onSecondDown);
					self.dumyClick_do.screen.addEventListener("mousedown", self.onFirstDown);
				}
			}
		};
		
		this.onSecondDown = function(e){
			if(e.preventDefault) e.preventDefault();
			var viewportMouseCoordinates = FWDRLUtils.getViewportMouseCoordinates(e);
			var dx;
			var dy;
			
			if(FWDRLUtils.isIEWebKit) self.firstTapPlaying_bl = self.isPlaying_bl;

			if(e.touches && e.touches.length != 1) return;
			dx = Math.abs(viewportMouseCoordinates.screenX - self.firstTapX);   
			dy = Math.abs(viewportMouseCoordinates.screenY - self.firstTapY); 
		
			if(self.isMobile_bl && (dx > 10 || dy > 10)){
				return;
			}else if(!self.isMobile_bl && (dx > 2 || dy > 2)){
				return
			}
			self.switchFullScreenOnDoubleClick();
			
			if(!FWDRLUtils.isIEWebKit){
				if(self.firstTapPlaying_bl){
					self.play();
				}else{
					self.pause();
				}
			}
		};
		
		this.switchFullScreenOnDoubleClick = function(){
			self.disableClick();
			if(!self.isFullScreen_bl){
				self.goFullScreen();
			}else{
				self.goNormalScreen();
			}
		};
	
		
		this.setupNormalVideoPlayers = function(){
			self.setupPreloader();
			if(FWDRLEVPlayer.hasHTML5Video){
				self.isAPIReady_bl = true;
				self.setupVideoScreen();
				self.setupVideoPoster();
				self.main_do.addChild(self.preloader_do);	
				self.setupClickScreen();
				self.addDoubleClickSupport();
				self.setupController();
				self.setupLargePlayPauseButton();
				self.setupHider();
				self.dispatchEvent(FWDRLEVPlayer.READY);
				self.setPosterSource(self.posterPath_str);
			}else{
				self.setupFlashScreen();
			}
			
			self.resizeHandler();
		};
		
		//#############################################//
		/* setup preloader */
		//#############################################//
		this.setupPreloader = function(){
			FWDRLPreloader.setPrototype();
			self.preloader_do = new FWDRLPreloader(self.data.videoMainPreloader_img, 30, 30, 30, 40);
			self.preloader_do.show(true);
			self.main_do.addChild(self.preloader_do);
		};
	
		this.positionPreloader = function(){
			self.preloader_do.setX(parseInt((self.stageWidth - self.preloader_do.w)/2));
			self.preloader_do.setY(parseInt((self.stageHeight - self.preloader_do.h)/2));
		};
		
		//##########################################//
		/* setup video poster */
		//##########################################//
		this.setupVideoPoster = function(){
			FWDRLEVPPoster.setPrototype();
			self.videoPoster_do = new FWDRLEVPPoster(self, self.data.videoPosterBackgroundColor_str, self.data.show);
			self.main_do.addChild(self.videoPoster_do);
		};
		
		//###########################################//
		/* Setup large play / pause button */
		//###########################################//
		this.setupLargePlayPauseButton = function(){
			FWDRLSimpleButton.setPrototype(true);
			self.largePlayButton_do = new FWDRLSimpleButton(self.data.videoLargePlayN_img, self.data.videoLargePlayS_str);
			self.largePlayButton_do.addListener(FWDRLSimpleButton.MOUSE_UP, self.largePlayButtonUpHandler);
			self.largePlayButton_do.setOverflow("visible");
			self.largePlayButton_do.hide(false);
			self.main_do.addChild(self.largePlayButton_do);
		};
		
		this.largePlayButtonUpHandler = function(){
			self.disableClick();
			self.largePlayButton_do.hide();
			self.play();
		};
		
		this.positionLargePlayButton =  function(){
			self.largePlayButton_do.setX(parseInt((self.stageWidth - self.largePlayButton_do.w)/2));
			self.largePlayButton_do.setY(parseInt((self.stageHeight - self.largePlayButton_do.h)/2));
		};
		
		//###########################################//
		/* setup controller */
		//###########################################//
		this.setupController = function(){
			FWDRLEVPController.setPrototype();
			self.controller_do = new FWDRLEVPController(self.data, self);
			self.controller_do.addListener(FWDRLEVPController.PLAY, self.controllerOnPlayHandler);
			self.controller_do.addListener(FWDRLEVPController.PAUSE, self.controllerOnPauseHandler);
			self.controller_do.addListener(FWDRLEVPController.START_TO_SCRUB, self.controllerStartToScrubbHandler);
			self.controller_do.addListener(FWDRLEVPController.SCRUB, self.controllerScrubbHandler);
			self.controller_do.addListener(FWDRLEVPController.STOP_TO_SCRUB, self.controllerStopToScrubbHandler);
			self.controller_do.addListener(FWDRLEVPController.CHANGE_VOLUME, self.controllerChangeVolumeHandler);
			self.controller_do.addListener(FWDRLEVPController.FULL_SCREEN, self.controllerFullScreenHandler);
			self.controller_do.addListener(FWDRLEVPController.NORMAL_SCREEN, self.controllerNormalScreenHandler);
			self.main_do.addChild(self.controller_do);
		};
		
		this.controllerOnPlayHandler = function(e){
			self.play();
		};
		
		this.controllerOnPauseHandler = function(e){
			self.pause();
		};
		
		this.controllerStartToScrubbHandler = function(e){
			self.startToScrub();
		};
		
		this.controllerScrubbHandler = function(e){
			self.scrub(e.percent);
		};
		
		this.controllerStopToScrubbHandler = function(e){
			self.stopToScrub();
		};
		
		this.controllerChangeVolumeHandler = function(e){
			self.setVolume(e.percent);
		};
		
		this.controllerFullScreenHandler = function(){
			self.goFullScreen();
		};
		
		this.controllerNormalScreenHandler = function(){
			self.goNormalScreen();
		};
		
		
		
		//###########################################//
		/* setup FWDRLEVPVideoScreen */
		//###########################################//
		this.setupVideoScreen = function(){
			FWDRLEVPVideoScreen.setPrototype();
			self.videoScreen_do = new FWDRLEVPVideoScreen(self, self.backgroundColor_str, self.data.volume);
			self.videoScreen_do.addListener(FWDRLEVPVideoScreen.ERROR, self.videoScreenErrorHandler);
			self.videoScreen_do.addListener(FWDRLEVPVideoScreen.SAFE_TO_SCRUBB, self.videoScreenSafeToScrubbHandler);
			self.videoScreen_do.addListener(FWDRLEVPVideoScreen.STOP, self.videoScreenStopHandler);
			self.videoScreen_do.addListener(FWDRLEVPVideoScreen.PLAY, self.videoScreenPlayHandler);
			self.videoScreen_do.addListener(FWDRLEVPVideoScreen.PAUSE, self.videoScreenPauseHandler);
			self.videoScreen_do.addListener(FWDRLEVPVideoScreen.UPDATE, self.videoScreenUpdateHandler);
			self.videoScreen_do.addListener(FWDRLEVPVideoScreen.UPDATE_TIME, self.videoScreenUpdateTimeHandler);
			self.videoScreen_do.addListener(FWDRLEVPVideoScreen.LOAD_PROGRESS, self.videoScreenLoadProgressHandler);
			self.videoScreen_do.addListener(FWDRLEVPVideoScreen.START_TO_BUFFER, self.videoScreenStartToBuferHandler);
			self.videoScreen_do.addListener(FWDRLEVPVideoScreen.STOP_TO_BUFFER, self.videoScreenStopToBuferHandler);
			self.videoScreen_do.addListener(FWDRLEVPVideoScreen.PLAY_COMPLETE, self.videoScreenPlayCompleteHandler);
			self.main_do.addChild(self.videoScreen_do);
		};
		
		this.videoScreenErrorHandler = function(e){
			var error;
			self.isPlaying_bl = false;
			
			error = e.text;
			if(window.console) console.log(e.text);
			
			if(self.controller_do){
				self.controller_do.disableMainScrubber();
				if(!self.data.showControllerWhenVideoIsStopped_bl) self.controller_do.hide(!self.isMobile_bl, true);
				self.largePlayButton_do.hide();
				self.hideClickScreen();
				self.hider.stop();
			}
			
			
			if(FWDRLUtils.isIphone){
				if(self.videoScreen_do) self.videoScreen_do.setX(-5000);
			}
			
			self.preloader_do.hide(false);
			self.showCursor();
			self.stop();
			self.dispatchEvent(FWDRLEVPlayer.ERROR, {error:error});
		};
		
		this.videoScreenSafeToScrubbHandler = function(){
			if(self.controller_do){
				self.controller_do.enableMainScrubber();
				self.controller_do.show(true);
				self.hider.start();
			}
			if(self.data.addKeyboardSupport_bl) self.addKeyboardSupport();
			self.showClickScreen();
		};
		
		this.videoScreenStopHandler = function(e){
			
			self.videoPoster_do.allowToShow_bl = true;
			self.isPlaying_bl = false;
			
			if(self.controller_do){
				self.controller_do.disableMainScrubber();
				self.controller_do.showPlayButton();
				if(!self.data.showControllerWhenVideoIsStopped_bl){
					self.controller_do.hide(!self.isMobile_bl, true);
				}else{
					self.controller_do.show(!self.isMobile_bl);
				}
				self.hider.stop();
			}

			self.hideClickScreen();
			
			self.hider.reset();
			self.showCursor();
			self.dispatchEvent(FWDRLEVPlayer.STOP);
		};
		
		this.videoScreenPlayHandler = function(){
			FWDRLEVPlayer.keyboardCurInstance = self;
		
			self.isPlaying_bl = true;
			
			if(self.controller_do){
				self.controller_do.showPauseButton();
				self.controller_do.show(true);
			}
			self.largePlayButton_do.hide();
			self.hider.start();
			self.showCursor();
			self.dispatchEvent(FWDRLEVPlayer.PLAY);
		};
		
		this.videoScreenPauseHandler = function(){
			
			self.isPlaying_bl = false;
			
			if(self.controller_do) self.controller_do.showPlayButton(); 
			if(!FWDRLUtils.isIphone) self.largePlayButton_do.show();
			self.controller_do.show(true);
			self.hider.stop();
			self.hider.reset();
			self.showCursor();
			self.showClickScreen();
			self.dispatchEvent(FWDRLEVPlayer.PAUSE);
		};
		
		this.videoScreenUpdateHandler = function(e){
			var percent;	
			if(FWDRLEVPlayer.hasHTML5Video){
				percent = e.percent;
				if(self.controller_do) self.controller_do.updateMainScrubber(percent);
			}else{
				percent = e;
				if(self.controller_do) self.controller_do.updateMainScrubber(percent);
			}
			self.dispatchEvent(FWDRLEVPlayer.UPDATE, {percent:percent});
		};
		
		this.videoScreenUpdateTimeHandler = function(e, e2){
			var time;
			if(FWDRLEVPlayer.hasHTML5Video){
				self.curTime = e.curTime;
				self.totalTime = e.totalTime;
				time = self.curTime + "/" + self.totalTime;
				if(self.controller_do) self.controller_do.updateTime(time);
			}else{
				self.curTime = e;
				self.totalTime = e2;
				time = self.curTime + "/" + self.totalTime;
				if(e == undefined || e2 ==  undefined) time = "00:00/00:00";
				if(self.controller_do) self.controller_do.updateTime(time);
			}
			self.dispatchEvent(FWDRLEVPlayer.UPDATE_TIME, {currentTime:self.curTime, totalTime:self.totalTime});
		};
		
		this.videoScreenLoadProgressHandler = function(e){
			if(FWDRLEVPlayer.hasHTML5Video){
				if(self.controller_do) self.controller_do.updatePreloaderBar(e.percent);
			}else{
				if(self.controller_do) self.controller_do.updatePreloaderBar(e);
			}
		};
		
		this.videoScreenStartToBuferHandler = function(){
			self.preloader_do.show();
		};
		
		this.videoScreenStopToBuferHandler = function(){
			self.preloader_do.hide(true);
		};
		
		this.videoScreenPlayCompleteHandler = function(){
			if(self.data.videoLoop_bl){
				self.scrub(0);
				self.play();
			}else{
				self.stop();
			}
			self.hider.reset();
			self.dispatchEvent(FWDRLEVPlayer.PLAY_COMPLETE);
		};
		
		
		//#############################################//
		/* Flash screen... */
		//#############################################//
		this.setupFlashScreen = function(){
			if(self.flash_do) return;
			
			if(!FWDRLFlashTest.hasFlashPlayerVersion("9.0.18")){
				var error = "Please install Adobe flash player! <a href='http://www.adobe.com/go/getflashplayer'>Click here to install.</a>";
				self.dispatchEvent(FWDRLEVPlayer.ERROR, {error:error});
				return;
			}
			
			self.flash_do = new FWDRLDisplayObject("div");
			self.flash_do.setBackfaceVisibility();
			self.flash_do.setResizableSizeAfterParent();	
			self.main_do.addChild(self.flash_do);
		
			self.flashObjectMarkup_str = '<object id="' + self.instanceName_str + '"classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="100%" height="100%"><param name="movie" value="' + self.data.flashPath_str + '"/><param name="wmode" value="opaque"/><param name="scale" value="noscale"/><param name=FlashVars value="instanceName=' + self.instanceName_str + '&volume=' + self.data.volume + '&bkColor_str=' + self.videoBackgroundColor_str + '"/><object type="application/x-shockwave-flash" data="' + self.data.flashPath_str + '" width="100%" height="100%"><param name="movie" value="' + self.data.flashPath_str + '"/><param name="wmode" value="opaque"/><param name="scale" value="noscale"/><param name=FlashVars value="instanceName=' + self.instanceName_str + '&volume=' + self.data.volume + '&bkColor_str=' + self.videoBackgroundColor_str + '"/></object></object>';
			
			self.flash_do.screen.innerHTML = self.flashObjectMarkup_str;
			self.flashObject = self.flash_do.screen.firstChild;
			if(!FWDRLUtils.isIE) self.flashObject = self.flashObject.getElementsByTagName("object")[0];
		};
	
		this.flashScreenIsReady = function(){
			if(console) console.dir("flash video ready " + self.instanceName_str);
			self.isFlashScreenReady_bl = true;
			self.isAPIReady_bl = true;
			self.setupVideoPoster();
			self.main_do.addChild(self.preloader_do);
			self.setupClickScreen();
			self.addDoubleClickSupport();
			self.setupController();
			self.setupLargePlayPauseButton();
			self.setupHider();
			self.setPosterSource(self.posterPath_str);
			self.dispatchEvent(FWDRLEVPlayer.READY);
		};
		
		this.flashScreenFail = function(){
			self.dispatchEvent(FWDRLEVPlayer.ERROR, {error:error});
		};
		
		//######################################//
		/* Add keyboard support */
		//######################################//
		this.addKeyboardSupport = function(){
			if(document.addEventListener){
				document.addEventListener("keydown",  this.onKeyDownHandler);	
				document.addEventListener("keyup",  this.onKeyUpHandler);	
			}else if(document.attachEvent){
				document.attachEvent("onkeydown",  this.onKeyDownHandler);	
				document.attachEvent("onkeyup",  this.onKeyUpHandler);	
			}
		};
		
		this.removeKeyboardSupport = function(){
			if(document.removeEventListener){
				document.removeEventListener("keydown",  this.onKeyDownHandler);	
				document.removeEventListener("keyup",  this.onKeyUpHandler);	
			}else if(document.detachEvent){
				document.detachEvent("onkeydown",  this.onKeyDownHandler);	
				document.detachEvent("onkeyup",  this.onKeyUpHandler);	
			}
		};
		
		this.onKeyDownHandler = function(e){
			if(self.isSpaceDown_bl) return;
			self.isSpaceDown_bl = true;
			if (e.keyCode == 32){
				if(self != FWDRLEVPlayer.keyboardCurInstance 
				   && (FWDRLEVPlayer.videoStartBehaviour == "pause" || FWDRLEVPlayer.videoStartBehaviour == "none")) return
				self.stickOnCurrentInstanceKey_bl = true;
				if(FWDRLEVPlayer.hasHTML5Video){
					if(!self.videoScreen_do.isSafeToBeControlled_bl) return;
					self.videoScreen_do.togglePlayPause();
				}else if(self.isFlashScreenReady_bl){
					self.flashObject.togglePlayPause();
				}
				if(e.preventDefault) e.preventDefault();
				return false;
			}
		};
		
		this.onKeyUpHandler = function(e){
			self.isSpaceDown_bl = false;
		};
		
		//####################################//
		/* Setup hider */
		//####################################//
		this.setupHider = function(){
			FWDRLHider.setPrototype();
			self.hider = new FWDRLHider(self.main_do, self.data.controllerHideDelay);
			self.hider.addListener(FWDRLHider.SHOW, self.hiderShowHandler);
			self.hider.addListener(FWDRLHider.HIDE, self.hiderHideHandler);
			self.hider.addListener(FWDRLHider.HIDE_COMPLETE, self.hiderHideCompleteHandler);
		};
		
		this.hiderShowHandler = function(){
			if(self.isPlaying_bl) self.controller_do.show(true);
			self.showCursor();
		};
		
		this.hiderHideHandler = function(){
			if(FWDRLUtils.isIphone) return;
			
			if(FWDRLUtils.hitTest(self.controller_do.screen, self.hider.globalX, self.hider.globalY)){
				self.hider.reset();
				return;
			}
			
			self.controller_do.hide(true);
			if(self.isFullScreen_bl) self.hideCursor();
		};
		
		this.hiderHideCompleteHandler = function(){
			self.controller_do.positionScrollBarOnTopOfTheController();
		};
		
		//####################################//
		// API
		//###################################//
		this.play = function(){
			if(!self.isAPIReady_bl) return;
			if(FWDRLUtils.isIphone) self.videoScreen_do.setX(0);
			
			
			if(FWDRLEVPlayer.hasHTML5Video){
				if(self.videoScreen_do) self.videoScreen_do.play();
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.playVideo();
			}
			
			FWDRLEVPlayer.keyboardCurInstance = self;
			self.videoPoster_do.allowToShow_bl = false;
			self.largePlayButton_do.hide();
			self.videoPoster_do.hide();
		};
		
		this.pause = function(){
			if(!self.isAPIReady_bl) return;
			if(FWDRLUtils.isIphone) self.videoScreen_do.setX(0);
			if(FWDRLEVPlayer.hasHTML5Video){
				if(self.videoScreen_do) self.videoScreen_do.pause();
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.pauseVideo();
			}
		};
		
		this.resume = function(){
			if(!self.isAPIReady_bl) return;
			if(FWDRLUtils.isIphone) self.videoScreen_do.setX(0);
			if(FWDRLEVPlayer.hasHTML5Video){
				if(self.videoScreen_do) self.videoScreen_do.resume();
			}
		};
		
		this.stop = function(source){
			if(!self.isAPIReady_bl) return;
			self.isPlaying_bl = false;
			self.hider.reset();
			if(FWDRLUtils.isIphone) self.videoScreen_do.setX(-5000);
			if(FWDRLEVPlayer.hasHTML5Video){
				self.videoScreen_do.stop();
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.stopVideo();
			}
				
			if(self.isMobile_bl){
				if(source && source.indexOf(".") != -1){
					if(self.data.showControllerWhenVideoIsStopped_bl) self.controller_do.show(true);
					self.videoPoster_do.show();
					self.largePlayButton_do.show();
				}else{
					if(!source){
						self.videoPoster_do.show();
						self.largePlayButton_do.show();
					}
				}
			}else{
				if(self.data.showControllerWhenVideoIsStopped_bl) self.controller_do.show(true);
				self.videoPoster_do.show();
				self.largePlayButton_do.show();
			}
			if(self.data.addKeyboardSupport_bl) self.removeKeyboardSupport();
		};
		
		this.startToScrub = function(){
			if(!self.isAPIReady_bl) return;
			if(FWDRLEVPlayer.hasHTML5Video){
				if(self.videoScreen_do) self.videoScreen_do.startToScrub();
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.startToScrub();
			}
		};
		
		this.stopToScrub = function(){
			if(!self.isAPIReady_bl) return;
			if(FWDRLEVPlayer.hasHTML5Video){
				if(self.videoScreen_do) self.videoScreen_do.stopToScrub();
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.stopToScrub();
			}
		};
		
		this.scrub = function(percent){
			if(!self.isAPIReady_bl) return;
			if(isNaN(percent)) return;
			if(percent < 0){
				percent = 0;
			}else if(percent > 1){
				percent = 1;
			}
			
			if(FWDRLEVPlayer.hasHTML5Video){
				if(self.videoScreen_do) self.videoScreen_do.scrub(percent);
			}else if(self.isFlashScreenReady_bl){
				self.flashObject.scrub(percent);
			}
		};
		
		this.setVolume = function(volume){
			if(!self.isAPIReady_bl || self.isMobile_bl) return;
			self.controller_do.updateVolume(volume, true);
			
			if(FWDRLEVPlayer.hasHTML5Video){
				if(self.videoScreen_do) self.videoScreen_do.setVolume(volume);
			}
			
			if(self.isFlashScreenReady_bl){
				self.flashObject.setVolume(volume);
			}
			self.dispatchEvent(FWDRLEVPlayer.VOLUME_SET, {volume:volume});
		};
		
		this.setPosterSource = function(path){
			if(!self.isAPIReady_bl || !path) return;
			var path_ar = path.split(",");
				
			if(self.isMobile_bl && path_ar[1] != undefined){
				path = path_ar[1];
			}else{
				path = path_ar[0];
			}
		
			self.posterPath_str = path;
			
			self.videoPoster_do.setPoster(self.posterPath_str);
			if(self.prevPosterSource_str != path) self.dispatchEvent(FWDRLEVPlayer.UPDATE_POSTER_SOURCE);
			
			self.prevPosterSource_str = path;
		};
		
		this.setVideoSource = function(source, overwrite){
			if(!self.isAPIReady_bl) return;
			
			if(source ==  self.prevVideoSource_str && !overwrite) return;
			self.prevVideoSource_str = source;
			
			if(!source){
				self.dispatchEvent(FWDRLEVPlayer.ERROR, {error:"Video source is not defined!"});
				return;
			}
		
			self.stop(source);
			self.videoSourcePath_str = source;
			self.finalVideoPath_str = source;
		
		
			self.videoType_str = FWDRLEVPlayer.VIDEO;
			
			var path_ar = source.split(",");
			
			if(self.isMobile_bl && path_ar[1] != undefined){
				source = path_ar[1];
			}else{
				source = path_ar[0];
			}
			self.finalVideoPath_str = source;
		
			if(FWDRLEVPlayer.hasHTML5Video && self.videoType_str == FWDRLEVPlayer.VIDEO){
				self.setPosterSource(self.posterPath_str);
			
				self.videoPoster_do.show();
				self.largePlayButton_do.show();
				
				if(FWDRLUtils.isIphone) self.videoScreen_do.setX(-5000);
				
				self.videoScreen_do.setVisible(true);
				if(self.videoScreen_do){
					self.videoScreen_do.setSource(source);
					if(self.data.videoAutoPlay_bl) self.play();
				}
				
			}else if(self.isFlashScreenReady_bl && self.videoType_str == FWDRLEVPlayer.VIDEO){
				if(source.indexOf("://") == -1 && source.indexOf("/") != 1){
					source =  source.substr(source.indexOf("/") + 1);
				}
				
				self.videoPoster_do.show();
				self.largePlayButton_do.show();
				
				self.flashObject.setSource(source);
				if(self.data.videoAutoPlay_bl) self.play();
			}
			
			self.prevVideoSourcePath_str = self.videoSourcePath_str;
			self.resizeHandler();
			if(self.getVideoSource()) self.dispatchEvent(FWDRLEVPlayer.UPDATE_VIDEO_SOURCE);
		};
		
	
		//#############################################//
		/* go fullscreen / normal screen */
		//#############################################//
		this.goFullScreen = function(){
			if(!self.isAPIReady_bl) return;
			
			if(document.addEventListener){
				document.addEventListener("fullscreenchange", self.onFullScreenChange);
				document.addEventListener("mozfullscreenchange", self.onFullScreenChange);
				document.addEventListener("webkitfullscreenchange", self.onFullScreenChange);
				document.addEventListener("MSFullscreenChange", self.onFullScreenChange);
			}
			
			//if(!self.isMobile_bl){
				if(self.main_do.screen.requestFullScreen) {
					self.main_do.screen.requestFullScreen();
				}else if(self.main_do.screen.mozRequestFullScreen){ 
					self.main_do.screen.mozRequestFullScreen();
				}else if(self.main_do.screen.webkitRequestFullScreen){
					self.main_do.screen.webkitRequestFullScreen();
				}else if(self.main_do.screen.msRequestFullscreen){
					self.main_do.screen.msRequestFullscreen();
				}
			//}
			
			self.disableClick();
			
			
			//self.main_do.getStyle().position = "fixed";
			document.documentElement.style.overflow = "hidden";
			self.main_do.getStyle().zIndex = 9999999999999999999;
			self.stageContainer.style.overflow = "visible";
		
			self.isFullScreen_bl = true;
			self.controller_do.showNormalScreenButton();
			self.controller_do.setNormalStateToFullScreenButton();
			var scrollOffsets = FWDRLUtils.getScrollOffsets();
			self.lastX = scrollOffsets.x;
			self.lastY = scrollOffsets.y;
			
			if(self.isMobile_bl) window.addEventListener("touchmove", self.disableFullScreenOnMobileHandler);
			self.dispatchEvent(FWDRLEVPlayer.GO_FULLSCREEN);
			setTimeout(self.resizeHandler, 50);
		};
		
		this.disableFullScreenOnMobileHandler = function(e){
			if(e.preventDefault) e.preventDefault();
		};
		
		this.goNormalScreen = function(){		
			if(!self.isAPIReady_bl) return;
			
			if (document.cancelFullScreen) {  
				document.cancelFullScreen();  
			}else if (document.mozCancelFullScreen) {  
				document.mozCancelFullScreen();  
			}else if (document.webkitCancelFullScreen) {  
				document.webkitCancelFullScreen();  
			}else if (document.msExitFullscreen) {  
				document.msExitFullscreen();  
			}
		
			self.addMainDoToTheOriginalParent();
			self.isFullScreen_bl = false;
		};
		
		this.addMainDoToTheOriginalParent = function(){
			if(!self.isFullScreen_bl) return;
			
			if(document.removeEventListener){
				document.removeEventListener("fullscreenchange", self.onFullScreenChange);
				document.removeEventListener("mozfullscreenchange", self.onFullScreenChange);
				document.removeEventListener("webkitfullscreenchange", self.onFullScreenChange);
				document.removeEventListener("MSFullscreenChange", self.onFullScreenChange);
			}
				
			self.controller_do.setNormalStateToFullScreenButton();
			
			
			if(FWDRLUtils.isIEAndLessThen9){
				document.documentElement.style.overflow = "auto";
			}else{
				document.documentElement.style.overflow = "visible";
			}
			self.main_do.getStyle().position = "relative";
			self.main_do.getStyle().zIndex = 0;
			
			self.controller_do.showFullScreenButton();
			//window.scrollTo(self.lastX, self.lastY);
			
			setTimeout(function(){
				//window.scrollTo(self.lastX, self.lastY);
				self.resizeHandler();
			}, 50);
			
			if(self.isMobile_bl) window.removeEventListener("touchmove", self.disableFullScreenOnMobileHandler);
			self.dispatchEvent(FWDRLEVPlayer.GO_NORMALSCREEN);
		};
		
		this.onFullScreenChange = function(e){
			if(!(document.fullScreen || document.msFullscreenElement  || document.mozFullScreen || document.webkitIsFullScreen || document.msieFullScreen)){
				self.controller_do.showNormalScreenButton();
				self.addMainDoToTheOriginalParent();
				self.isFullScreen_bl = false;
			}
		};
		
		this.getVideoSource = function(){
			if(!self.isAPIReady_bl) return;
			return self.finalVideoPath_str;
		};
		
		this.getPosterSource = function(){
			if(!self.isAPIReady_bl) return;
			return self.posterPath_str;
		};
		
		this.getCurrentTime = function(){
			var tm;
			if(!self.curTime){
				tm = "00:00";
			}else{
				tm = self.curTime;
			}
			return tm;
		};
		
		this.getTotalTime = function(){
			var tm;
			if(!self.totalTime){
				tm = "00:00";
			}else{
				tm = self.totalTime;
			}
			return tm;
		};
		
		//###########################################//
		/* Hide / show cursor */
		//###########################################//
		this.hideCursor = function(){
			document.documentElement.style.cursor = "none";
			document.getElementsByTagName("body")[0].style.cursor = "none";
		};
		
		this.showCursor = function(){
			document.documentElement.style.cursor = "auto";
			document.getElementsByTagName("body")[0].style.cursor = "auto";
		};

		
		//###########################################//
		/* event dispatcher */
		//###########################################//
		this.addListener = function (type, listener){
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    this.dispatchEvent = function(type, props){
	    	if(this.listeners == null) return;
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        	}
	        }
	    };
	    
	   this.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    
	    self.init();
	};
	
	
	/* set prototype */
	FWDRLEVPlayer.setPrototype =  function(){
		FWDRLEVPlayer.prototype = new FWDRLEventDispatcher();
	};

	FWDRLEVPlayer.hasHTML5Video = (function(){
		var videoTest_el = document.createElement("video");
		var flag = false;
		if(videoTest_el.canPlayType){
			flag = Boolean(videoTest_el.canPlayType('video/mp4') == "probably" || videoTest_el.canPlayType('video/mp4') == "maybe");
			FWDRLEVPlayer.canPlayMp4 = Boolean(videoTest_el.canPlayType('video/mp4') == "probably" || videoTest_el.canPlayType('video/mp4') == "maybe");
		}
		
		if(self.isMobile_bl) return true;
		//return false;
		return flag;
	}());
	
	
	FWDRLEVPlayer.instaces_ar = [];
	
	FWDRLEVPlayer.curInstance = null;
	FWDRLEVPlayer.keyboardCurInstance = null;
	FWDRLEVPlayer.areInstancesCreated_bl = null;
	
	FWDRLEVPlayer.PAUSE_ALL_VIDEOS = "pause";
	FWDRLEVPlayer.STOP_ALL_VIDEOS = "stop";
	FWDRLEVPlayer.DO_NOTHING = "none";
	FWDRLEVPlayer.VIDEO = "video";
	
	FWDRLEVPlayer.READY = "ready";
	FWDRLEVPlayer.STOP = "stop";
	FWDRLEVPlayer.PLAY = "play";
	FWDRLEVPlayer.PAUSE = "pause";
	FWDRLEVPlayer.UPDATE = "update";
	FWDRLEVPlayer.UPDATE_TIME = "updateTime";
	FWDRLEVPlayer.UPDATE_VIDEO_SOURCE = "updateVideoSource";
	FWDRLEVPlayer.UPDATE_POSTER_SOURCE = "udpatePosterSource";
	FWDRLEVPlayer.ERROR = "error";
	FWDRLEVPlayer.PLAY_COMPLETE = "playComplete";
	FWDRLEVPlayer.VOLUME_SET = "volumeSet";
	FWDRLEVPlayer.GO_FULLSCREEN = "goFullScreen";
	FWDRLEVPlayer.GO_NORMALSCREEN = "goNormalScreen";
	
	FWDRLEVPlayer.RESPONSIVE = "responsive";
	FWDRLEVPlayer.FULL_SCREEN = "fullscreen";
	FWDRLEVPlayer.AFTER_PARENT = "afterparent";
	
	
	window.FWDRLEVPlayer = FWDRLEVPlayer;
	
}(window));/* Thumb */
(function (window){
	
	var FWDRLEVPPoster = function(
			parent, 
			backgroundColor,
			showPoster
		){
		
		var self  = this;
		var prototype = FWDRLEVPPoster.prototype;
		
		
		this.img_img = new Image();
		this.img_do = null;
		this.imgW = 0;
		this.imgH = 0;
		this.finalW = 0;
		this.finalH = 0;
		this.finalX = 0;
		this.finalY = 0;
		
		this.curPath_str;
		this.backgroundColor_str = backgroundColor;
		
		this.isTransparent_bl = false;
		this.showPoster_bl = showPoster;
		this.showOrLoadOnMobile_bl = false;
		this.isShowed_bl = true;
		this.allowToShow_bl = true;
		this.isMobile_bl = FWDRLUtils.isMobile;
	
		this.init = function(){
			self.img_img = new Image();
			self.img_do = new FWDRLDisplayObject("img");
			self.hide();
			self.setBkColor(self.backgroundColor_str);
		};
		
		this.positionAndResize = function(){
			if(!parent.stageWidth) return;
			self.setWidth(parent.stageWidth);
			self.setHeight(parent.stageHeight);
		
			if(!self.imgW) return;
			var scX = parent.stageWidth/self.imgW;
			var scY = parent.stageHeight/self.imgH;
			var ttSc;
			
			if(scX <= scY){
				ttSc = scX;
			}else{
				ttSc = scY;
			}
			
			self.finalW = Math.round(ttSc * self.imgW);
			self.finalH = Math.round(ttSc * self.imgH);
			self.finalX = parseInt((parent.stageWidth - self.finalW)/2);
			self.finalY = parseInt((parent.stageHeight - self.finalH)/2);
		
			self.img_do.setX(self.finalX);
			self.img_do.setY(self.finalY);
			self.img_do.setWidth(self.finalW);
			self.img_do.setHeight(self.finalH);		
		};
		
		this.setPoster = function(path){
			if(path && (FWDRLUtils.trim(path) == "") || path =="none"){
				self.showOrLoadOnMobile_bl = true;
				self.isTransparent_bl = true;
				self.show();
				return;
			}else if(path == "youtubemobile"){
				self.isTransparent_bl = false;
				self.showOrLoadOnMobile_bl = false;
				self.img_img.src = null;
				self.imgW = 0;
				return;
			}else if(path == self.curPath_str){
				self.isTransparent_bl = false;
				self.showOrLoadOnMobile_bl = true;
				self.show();
				return;
			}
			
			self.isTransparent_bl = false;
			self.showOrLoadOnMobile_bl = true;
			self.curPath_str = path;
			if(self.allowToShow_bl) self.isShowed_bl = false;
			if(!path) return;
			//self.img_do.setAlpha(0);
			if(self.img_do) self.img_do.src = "";
			self.img_img.onload = self.posterLoadHandler;
			self.img_img.src = self.curPath_str;
		};
		
		this.posterLoadHandler = function(e){
			self.imgW = self.img_img.width;
			self.imgH = self.img_img.height;
			self.img_do.setScreen(self.img_img);
			self.addChild(self.img_do);
			self.show();
			self.positionAndResize();
		};
		
		//################################//
		/* show / hide */
		//################################//
		this.show = function(allowToShow_bl){
			if(!self.allowToShow_bl || self.isShowed_bl || !self.showOrLoadOnMobile_bl) return;
			
			self.isShowed_bl = true;
			
			if(self.isTransparent_bl){
				if(self.alpha != 0) self.setAlpha(0);
			}else {
				if(self.alpha != 1) self.setAlpha(1);
			}
			
			self.setVisible(true);
			
			if(!self.isMobile_bl && !self.isTransparent_bl){
				FWDAnimation.killTweensOf(self);
				self.setAlpha(0);
				FWDAnimation.to(self, .6, {alpha:1, delay:.4});	
				
			}
			
			self.positionAndResize();
		};
		
		this.hide = function(){
			if(!self.isShowed_bl) return;
			self.isShowed_bl = false;
			self.setVisible(false);
		};
		
		
		this.init();
	};
	
	/* set prototype */
    FWDRLEVPPoster.setPrototype = function(){
    	FWDRLEVPPoster.prototype = new FWDRLDisplayObject("div");
    };
    
    FWDRLEVPPoster.prototype = null;
	window.FWDRLEVPPoster = FWDRLEVPPoster;
}(window));/* thumbs manager */
(function(window){
	
	var FWDRLEVPVideoScreen = function(parent, backgroundColor_str, volume){
		
		var self = this;
		var prototype = FWDRLEVPVideoScreen.prototype;
	
		this.video_el = null;
	
		this.sourcePath_str = null;
		
		this.backgroundColor_str = backgroundColor_str;
		
		this.controllerHeight = parent.data.controllerHeight;
		this.stageWidth = 0;
		this.stageHeight = 0;
		this.lastPercentPlayed = 0;
		this.volume = volume;
		this.curDuration = 0;
		this.countNormalMp3Errors = 0;
		this.countShoutCastErrors = 0;
		this.maxShoutCastCountErrors = 5;
		this.maxNormalCountErrors = 1;
		
		this.disableClickForAWhileId_to;
		
		this.disableClick_bl = false;
		this.allowScrubing_bl = false;
		this.hasError_bl = true;
		this.isPlaying_bl = false;
		this.isStopped_bl = true;
		this.hasPlayedOnce_bl = false;
		this.isStartEventDispatched_bl = false;
		this.isSafeToBeControlled_bl = false;
		this.isMobile_bl = FWDRLUtils.isMobile;
		
		//###############################################//
		/* init */
		//###############################################//
		this.init = function(){
			self.setupVideo();
			self.setBkColor(self.backgroundColor_str);
		};
	
		//###############################################//
		/* Setup audio element */
		//##############################################//
		this.setupVideo = function(){
			if(self.video_el == null){
				self.video_el = document.createElement("video");
				self.screen.appendChild(self.video_el);
				self.video_el.controls = false;
				self.video_el.volume = self.volume;
				self.video_el.style.position = "relative";
				self.video_el.style.left = "0px";
				self.video_el.style.top = "0px";
				self.video_el.style.width = "100%";
				self.video_el.style.height = "100%";
				self.video_el.style.margin = "0px";
				self.video_el.style.padding = "0px";
				self.video_el.style.maxWidth = "none";
				self.video_el.style.maxHeight = "none";
				self.video_el.style.border = "none";
				self.video_el.style.lineHeight = "0";
				self.video_el.style.msTouchAction = "none";
				self.screen.appendChild(self.video_el);
			}
			
			self.video_el.addEventListener("error", self.errorHandler);
			self.video_el.addEventListener("canplay", self.safeToBeControlled);
			self.video_el.addEventListener("canplaythrough", self.safeToBeControlled);
			self.video_el.addEventListener("progress", self.updateProgress);
			self.video_el.addEventListener("timeupdate", self.updateVideo);
			self.video_el.addEventListener("pause", self.pauseHandler);
			self.video_el.addEventListener("play", self.playHandler);
			if(!FWDRLUtils.isIE){
				self.video_el.addEventListener("waiting", self.startToBuffer);
			}
			self.video_el.addEventListener("playing", self.stopToBuffer);
			self.video_el.addEventListener("ended", self.endedHandler);
			self.resizeAndPosition();
		};	
		
		
		this.destroyVideo = function(){
			if(self.video_el){
				self.video_el.removeEventListener("error", self.errorHandler);
				self.video_el.removeEventListener("canplay", self.safeToBeControlled);
				self.video_el.removeEventListener("canplaythrough", self.safeToBeControlled);
				self.video_el.removeEventListener("progress", self.updateProgress);
				self.video_el.removeEventListener("timeupdate", self.updateVideo);
				self.video_el.removeEventListener("pause", self.pauseHandler);
				self.video_el.removeEventListener("play", self.playHandler);
				if(!FWDRLUtils.isIE){
					self.video_el.removeEventListener("waiting", self.startToBuffer);
				}
				self.video_el.removeEventListener("playing", self.stopToBuffer);
				self.video_el.removeEventListener("ended", self.endedHandler);
				if(self.isMobile_bl){	
					self.screen.removeChild(self.video_el);
					self.video_el = null;
				}else{
					self.video_el.style.visibility = "hidden";
					self.video_el.src = "";
					self.video_el.load();
				}
			}
		};
		
		this.startToBuffer = function(overwrite){
			self.dispatchEvent(FWDRLEVPVideoScreen.START_TO_BUFFER);
		};
		
		this.stopToBuffer = function(){
			self.dispatchEvent(FWDRLEVPVideoScreen.STOP_TO_BUFFER);
		};
		
		//##########################################//
		/* Video error handler. */
		//##########################################//
		this.errorHandler = function(e){
			
			var error_str;
			self.hasError_bl = true;
			
			if(self.video_el.networkState == 0){
				error_str = "error 'self.video_el.networkState = 0'";
			}else if(self.video_el.networkState == 1){
				error_str = "error 'self.video_el.networkState = 1'";
			}else if(self.video_el.networkState == 2){
				error_str = "'self.video_el.networkState = 2'";
			}else if(self.video_el.networkState == 3){
				error_str = "Video source not found <font color='#FF0000'>" + self.sourcePath_str + "</font>";
			}else{
				error_str = e;
			}
			
			if(window.console) window.console.log(self.video_el.networkState);
			self.dispatchEvent(FWDRLEVPVideoScreen.ERROR, {text:error_str });
		};
		
		//##############################################//
		/* Resize and position */
		//##############################################//
		this.resizeAndPosition = function(width, height){
			if(width){
				self.stageWidth = width;
				self.stageHeight = height;
			}
			
			self.setWidth(self.stageWidth);
			if(FWDRLUtils.isIphone){	
				self.setHeight(self.stageHeight - self.controllerHeight);
			}else{
				self.setHeight(self.stageHeight);
			}
		};
		
		//##############################################//
		/* Set path */
		//##############################################//
		this.setSource = function(sourcePath){
			self.sourcePath_str = sourcePath;
			if(self.video_el) self.stop();
		};
	
		//##########################################//
		/* Play / pause / stop methods */
		//##########################################//
		this.play = function(overwrite){
			FWDRLEVPlayer.curInstance = parent;
			if(self.isStopped_bl){
				self.isPlaying_bl = false;
				self.hasError_bl = false;
				self.allowScrubing_bl = false;
				self.isStopped_bl = false;
				self.setupVideo();
				self.setVolume();
				self.video_el.src = self.sourcePath_str;
				self.play();
				self.startToBuffer(true);
				self.isPlaying_bl = true;
			}else if(!self.video_el.ended || overwrite){
				try{
					self.isPlaying_bl = true;
					self.hasPlayedOnce_bl = true;
					self.video_el.play();
					if(FWDRLUtils.isIE) self.dispatchEvent(FWDRLEVPVideoScreen.PLAY);
				}catch(e){};
			}
		};

		this.pause = function(){
			if(self == null || self.isStopped_bl || self.hasError_bl) return;
			if(!self.video_el.ended){
				try{
					self.video_el.pause();
					self.isPlaying_bl = false;
					if(FWDRLUtils.isIE) self.dispatchEvent(FWDRLEVPVideoScreen.PAUSE);
				}catch(e){};
			}
		};
		
		this.togglePlayPause = function(){
			if(self == null) return;
			if(!self.isSafeToBeControlled_bl) return;
			if(self.isPlaying_bl){
				self.pause();
			}else{
				self.play();
			}
		};
		
		this.pauseHandler = function(){
			if(self.allowScrubing_bl) return;
			self.dispatchEvent(FWDRLEVPVideoScreen.PAUSE);
		};
		
		this.playHandler = function(){
			if(self.allowScrubing_bl) return;
			if(!self.isStartEventDispatched_bl){
				self.dispatchEvent(FWDRLEVPVideoScreen.START);
				self.isStartEventDispatched_bl = true;
			}
			self.dispatchEvent(FWDRLEVPVideoScreen.PLAY);
		};
		
		this.endedHandler = function(){
			self.dispatchEvent(FWDRLEVPVideoScreen.PLAY_COMPLETE);
		};
		
		this.resume = function(){
			if(self.isStopped_bl) return;
			self.play();
		};
		
		this.stop = function(overwrite){
			if((self == null || self.video_el == null || self.isStopped_bl) && !overwrite) return;
			//logger.log("# VID stop #" + parent.instanceName_str);
			self.isPlaying_bl = false;
			self.isStopped_bl = true;
			self.hasPlayedOnce_bl = true;
			self.isSafeToBeControlled_bl = false;
			self.isStartEventDispatched_bl = false;
			self.destroyVideo();
			self.dispatchEvent(FWDRLEVPVideoScreen.LOAD_PROGRESS, {percent:0});
			self.dispatchEvent(FWDRLEVPVideoScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00"});
			self.dispatchEvent(FWDRLEVPVideoScreen.STOP);
			self.stopToBuffer();
		};

		//###########################################//
		/* Check if audio is safe to be controlled */
		//###########################################//
		this.safeToBeControlled = function(){
			self.stopToScrub();
			if(!self.isSafeToBeControlled_bl){
				self.hasHours_bl = Math.floor(self.video_el.duration / (60 * 60)) > 0;
				self.isPlaying_bl = true;
				self.isSafeToBeControlled_bl = true;
				self.video_el.style.visibility = "visible";
				self.dispatchEvent(FWDRLEVPVideoScreen.SAFE_TO_SCRUBB);
			}
		};
	
		//###########################################//
		/* Update progress */
		//##########################################//
		this.updateProgress = function(){
			var buffered;
			var percentLoaded = 0;
			
			if(self.video_el.buffered.length > 0){
				buffered = self.video_el.buffered.end(self.video_el.buffered.length - 1);
				percentLoaded = buffered.toFixed(1)/self.video_el.duration.toFixed(1);
				if(isNaN(percentLoaded) || !percentLoaded) percentLoaded = 0;
			}
			
			if(percentLoaded == 1) self.video_el.removeEventListener("progress", self.updateProgress);
			
			self.dispatchEvent(FWDRLEVPVideoScreen.LOAD_PROGRESS, {percent:percentLoaded});
		};
		
		//##############################################//
		/* Update audio */
		//#############################################//
		this.updateVideo = function(){
			var percentPlayed; 
			if (!self.allowScrubing_bl) {
				percentPlayed = self.video_el.currentTime /self.video_el.duration;
				self.dispatchEvent(FWDRLEVPVideoScreen.UPDATE, {percent:percentPlayed});
			}
			
			var totalTime = self.formatTime(self.video_el.duration);
			var curTime = self.formatTime(self.video_el.currentTime);
			
			
			if(!isNaN(self.video_el.duration)){
				self.dispatchEvent(FWDRLEVPVideoScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime});
			}else{
				self.dispatchEvent(FWDRLEVPVideoScreen.UPDATE_TIME, {curTime:"00:00" , totalTime:"00:00"});
			}
			
			self.lastPercentPlayed = percentPlayed;
			self.curDuration = curTime;
		};
		
		//###############################################//
		/* Scrub */
		//###############################################//
		this.startToScrub = function(){
			self.allowScrubing_bl = true;
		};
		
		this.stopToScrub = function(){
			self.allowScrubing_bl = false;
		};
		
		this.scrub = function(percent, e){
			//if(!self.allowScrubing_bl) return;
			if(e) self.startToScrub();
			try{
				self.video_el.currentTime = self.video_el.duration * percent;
				var totalTime = self.formatTime(self.video_el.duration);
				var curTime = self.formatTime(self.video_el.currentTime);
				self.dispatchEvent(FWDRLEVPVideoScreen.UPDATE_TIME, {curTime: curTime, totalTime:totalTime});
			}catch(e){}
		};
		
		//###############################################//
		/* replay */
		//###############################################//
		this.replay = function(){
			self.scrub(0);
			self.play();
		};
		
		//###############################################//
		/* Volume */
		//###############################################//
		this.setVolume = function(vol){
			if(vol) self.volume = vol;
			if(self.video_el) self.video_el.volume = self.volume;
		};
		
		this.formatTime = function(secs){
			var hours = Math.floor(secs / (60 * 60));
			
		    var divisor_for_minutes = secs % (60 * 60);
		    var minutes = Math.floor(divisor_for_minutes / 60);

		    var divisor_for_seconds = divisor_for_minutes % 60;
		    var seconds = Math.ceil(divisor_for_seconds);
		    
		    minutes = (minutes >= 10) ? minutes : "0" + minutes;
		    seconds = (seconds >= 10) ? seconds : "0" + seconds;
		    
		    if(isNaN(seconds)) return "00:00";
			if(self.hasHours_bl){
				 return hours + ":" + minutes + ":" + seconds;
			}else{
				 return minutes + ":" + seconds;
			}
		};

	
		this.init();
	};

	/* set prototype */
	FWDRLEVPVideoScreen.setPrototype = function(){
		FWDRLEVPVideoScreen.prototype = new FWDRLDisplayObject("div");
	};
	
	FWDRLEVPVideoScreen.ERROR = "error";
	FWDRLEVPVideoScreen.UPDATE = "update";
	FWDRLEVPVideoScreen.UPDATE_TIME = "updateTime";
	FWDRLEVPVideoScreen.SAFE_TO_SCRUBB = "safeToControll";
	FWDRLEVPVideoScreen.LOAD_PROGRESS = "loadProgress";
	FWDRLEVPVideoScreen.START = "start";
	FWDRLEVPVideoScreen.PLAY = "play";
	FWDRLEVPVideoScreen.PAUSE = "pause";
	FWDRLEVPVideoScreen.STOP = "stop";
	FWDRLEVPVideoScreen.PLAY_COMPLETE = "playComplete";
	FWDRLEVPVideoScreen.START_TO_BUFFER = "startToBuffer";
	FWDRLEVPVideoScreen.STOP_TO_BUFFER = "stopToBuffer";


	window.FWDRLEVPVideoScreen = FWDRLEVPVideoScreen;

}(window));/* FWDRLEVPVolumeButton */
(function (window){
var FWDRLEVPVolumeButton = function(nImg, sPath, dPath){
		
		var self = this;
		var prototype = FWDRLEVPVolumeButton.prototype;
		
		this.nImg = nImg;
		this.sPath_str = sPath;
		this.dPath_str = dPath;
		
		this.n_sdo;
		this.s_sdo;
		this.d_sdo;
		
		this.toolTipLabel_str;
		
		this.totalWidth = this.nImg.width;
		this.totalHeight = this.nImg.height;
		
		this.isSetToDisabledState_bl = false;
		this.isDisabled_bl = false;
		this.isSelectedFinal_bl = false;
		this.isActive_bl = false;
		this.isMobile_bl = FWDRLUtils.isMobile;
		this.hasPointerEvent_bl = FWDRLUtils.hasPointerEvent;
		this.allowToCreateSecondButton_bl = !self.isMobile_bl || self.hasPointerEvent_bl;
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setupMainContainers();
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			self.n_sdo = new FWDRLDisplayObject("img");	
			self.n_sdo.setScreen(self.nImg);
			self.addChild(self.n_sdo);
			
			if(self.allowToCreateSecondButton_bl){
				var img1 = new Image();
				img1.src = self.sPath_str;
				self.s_sdo = new FWDRLDisplayObject("img");
				self.s_sdo.setScreen(img1);
				self.s_sdo.setWidth(self.totalWidth);
				self.s_sdo.setHeight(self.totalHeight);
				self.s_sdo.setAlpha(0);
				self.addChild(self.s_sdo);
				
				if(self.dPath_str){
					var img2 = new Image();
					img2.src = self.dPath_str;
					self.d_sdo = new FWDRLDisplayObject("img");	
					self.d_sdo.setScreen(img2);
					self.d_sdo.setWidth(self.totalWidth);
					self.d_sdo.setHeight(self.totalHeight);
					if(self.isMobile_bl){
						self.d_sdo.setX(-100);
					}else{
						self.d_sdo.setAlpha(0);
					}
					self.addChild(self.d_sdo);
				};
			}
			
			self.setWidth(self.totalWidth);
			self.setHeight(self.totalHeight);
			self.setButtonMode(true);
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.addEventListener("pointerdown", self.onMouseUp);
					self.screen.addEventListener("pointerover", self.onMouseOver);
					self.screen.addEventListener("pointerout", self.onMouseOut);
				}else{
					self.screen.addEventListener("touchend", self.onMouseUp);
				}
			}else if(self.screen.addEventListener){	
				self.screen.addEventListener("mouseover", self.onMouseOver);
				self.screen.addEventListener("mouseout", self.onMouseOut);
				self.screen.addEventListener("mousedown", self.onMouseUp);
			}else if(self.screen.attachEvent){
				self.screen.attachEvent("onmouseover", self.onMouseOver);
				self.screen.attachEvent("onmouseout", self.onMouseOut);
				self.screen.attachEvent("onmousedown", self.onMouseUp);
			}
		};
		
		self.onMouseOver = function(e){
			
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				if(self.isDisabled_bl || self.isSelectedFinal_bl) return;
				self.dispatchEvent(FWDRLEVPVolumeButton.MOUSE_OVER, {e:e});
				FWDAnimation.killTweensOf(self.s_sdo);
				FWDAnimation.to(self.s_sdo, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
			}
		};
			
		self.onMouseOut = function(e){
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				if(self.isDisabled_bl || self.isSelectedFinal_bl) return;
				self.dispatchEvent(FWDRLEVPVolumeButton.MOUSE_OUT, {e:e});
				FWDAnimation.killTweensOf(self.s_sdo);
				FWDAnimation.to(self.s_sdo, .5, {alpha:0, ease:Expo.easeOut});	
			}
		};
		
		self.onMouseUp = function(e){
			if(e.preventDefault) e.preventDefault();
			if(self.isDisabled_bl || e.button == 2 || self.isSelectedFinal_bl) return;
			self.dispatchEvent(FWDRLEVPVolumeButton.MOUSE_UP, {e:e});
		};
		
		//##############################//
		// set select / deselect final.
		//##############################//
		self.setSelctedFinal = function(){
			self.isSelectedFinal_bl = true;
			FWDAnimation.killTweensOf(self.s_sdo);
			FWDAnimation.to(self.s_sdo, .8, {alpha:1, ease:Expo.easeOut});
			self.setButtonMode(false);
		};
		
		self.setUnselctedFinal = function(){
			self.isSelectedFinal_bl = false;
			FWDAnimation.to(self.s_sdo, .8, {alpha:0, delay:.1, ease:Expo.easeOut});
			self.setButtonMode(true);
		};
		
		//####################################//
		/* Disable / enable */
		//####################################//
		this.setDisabledState = function(){
			if(self.isSetToDisabledState_bl) return;
			self.isSetToDisabledState_bl = true;
			if(self.isMobile_bl){
				self.d_sdo.setX(0);
			}else{
				FWDAnimation.killTweensOf(self.d_sdo);
				FWDAnimation.to(self.d_sdo, .8, {alpha:1, ease:Expo.easeOut});
			}
		};
		
		this.setEnabledState = function(){
			if(!self.isSetToDisabledState_bl) return;
			self.isSetToDisabledState_bl = false;
			if(self.isMobile_bl){
				self.d_sdo.setX(-100);
			}else{
				FWDAnimation.killTweensOf(self.d_sdo);
				FWDAnimation.to(self.d_sdo, .8, {alpha:0, delay:.1, ease:Expo.easeOut});
			}
		};
		
		this.disable = function(){
			self.isDisabled_bl = true;
			self.setButtonMode(false);
		};
		
		this.enable = function(){
			self.isDisabled_bl = false;
			self.setButtonMode(true);
		};
		
		//##############################//
		/* destroy */
		//##############################//
		self.destroy = function(){
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.removeEventListener("pointerdown", self.onMouseUp);
					self.screen.removeEventListener("pointerover", self.onMouseOver);
					self.screen.removeEventListener("pointerout", self.onMouseOut);
				}else{
					self.screen.removeEventListener("touchend", self.onMouseUp);
				}
			}else if(self.screen.removeEventListener){	
				self.screen.removeEventListener("mouseover", self.onMouseOver);
				self.screen.removeEventListener("mouseout", self.onMouseOut);
				self.screen.removeEventListener("mousedown", self.onMouseUp);
			}else if(self.screen.detachEvent){
				self.screen.detachEvent("onmouseover", self.onMouseOver);
				self.screen.detachEvent("onmouseout", self.onMouseOut);
				self.screen.detachEvent("onmousedown", self.onMouseUp);
			}
		
			FWDAnimation.killTweensOf(self.s_sdo);
			self.n_sdo.destroy();
			self.s_sdo.destroy();
			
			if(self.d_sdo){
				FWDAnimation.killTweensOf(self.d_sdo);
				self.d_sdo.destroy();
			}
			
			self.nImg = null;
			self.sImg = null;
			self.dImg = null;
			self.n_sdo = null;
			self.s_sdo = null;
			self.d_sdo = null;
			
			nImg = null;
			sImg = null;
			dImg = null;
			
			self.toolTipLabel_str = null;
			
			self.init = null;
			self.setupMainContainers = null;
			self.onMouseOver = null;
			self.onMouseOut = null;
			self.onClick = null;
			self.onMouseDown = null;  
			self.setSelctedFinal = null;
			self.setUnselctedFinal = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDRLEVPVolumeButton.prototype = null;
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDRLEVPVolumeButton.setPrototype = function(){
		FWDRLEVPVolumeButton.prototype = null;
		FWDRLEVPVolumeButton.prototype = new FWDRLDisplayObject("div");
	};
	
	FWDRLEVPVolumeButton.CLICK = "onClick";
	FWDRLEVPVolumeButton.MOUSE_OVER = "onMouseOver";
	FWDRLEVPVolumeButton.MOUSE_OUT = "onMouseOut";
	FWDRLEVPVolumeButton.MOUSE_UP = "onMouseDown";
	
	FWDRLEVPVolumeButton.prototype = null;
	window.FWDRLEVPVolumeButton = FWDRLEVPVolumeButton;
}(window));/* Data */
(function(window){
	
	var FWDRLFacebookShare = function(appId){
		
		var self = this;
		var prototype = FWDRLFacebookShare.prototype;
		
		this.appId = appId;
		
	
		var hasStartedToConnect_bl = false;
	
		//###################################//
		/*init*/
		//###################################//
		self.init = function(){
			self.checkFBRoot();
			if(!window.fbAsyncInit) self.connect();
		};
		
		//#############################################//
		/* Checking fb_root div */
		//#############################################//
		this.checkFBRoot = function(){
			var fbRoot_el = Boolean(document.getElementById("fb-root"));
			if(!fbRoot_el){
				fbRoot_el = document.createElement("div");
				fbRoot_el.id = "fb-root";
				document.getElementsByTagName("body")[0].appendChild(fbRoot_el);
			}
		};
		
		//#############################################//
		/* Setup facebook */
		//#############################################//
		this.connect = function(){
			if(self.hasStartedToConnect_bl) return;
			self.hasStartedToConnect_bl = true;
			
			self.isAPIReadyId_to = setTimeout(function(){
				 self.dispatchEvent(FWDRLFacebookShare.API_ERROR , {error:"Error loading Faceboook API!"});
			}, 6000);
			
			window.fbAsyncInit = function() {
				
				FB.init({
				  appId: self.appId,
				  xfbml: true,
				  cookie: true,
				  status:true,
				  version: 'v2.4'
				});
				
			    clearTimeout(self.isAPIReadyId_to);
    		    self.dispatchEvent(FWDRLFacebookShare.API_READY);
			};
			
			(function(d, s, id){
			     var js, fjs = d.getElementsByTagName(s)[0];
			     if (d.getElementById(id)) {return;}
			     js = d.createElement(s); js.id = id;
			     js.src = "https://connect.facebook.net/en_US/sdk.js";
			     fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		};
	
		
		this.share = function(link, picture, caption){
			
			if(caption && picture){
				FB.ui({
					  method: 'feed',
					  link: link,
					  caption: caption,
					  picture:picture
				}, function(response){});
			}else if(caption){
				FB.ui({
					  method: 'feed',
					  link: link,
					  caption: caption
				}, function(response){});
			}else if(picture){
				FB.ui({
					  method: 'feed',
					  link: link,
					  picture:picture
				}, function(response){});
			}else{
				FB.ui({
					  method: 'feed',
					  link: link
				}, function(response){});
			}
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDRLFacebookShare.setPrototype = function(){
		FWDRLFacebookShare.prototype = new FWDRLEventDispatcher();
	};
	
	FWDRLFacebookShare.prototype = null;
	FWDRLFacebookShare.API_READY = "facebookAPIReady";
	FWDRLFacebookShare.API_ERROR = "facebookAPIError";
	
	window.FWDRLFacebookShare = FWDRLFacebookShare;
}(window));var FWDRLFlashTest = function() {
	
	var UNDEF = "undefined",
		OBJECT = "object",
		SHOCKWAVE_FLASH = "Shockwave Flash",
		SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
		FLASH_MIME_TYPE = "application/x-shockwave-flash",
		
		win = window,
		doc = document,
		nav = navigator,
		
		plugin = false,

		regObjArr = [],

	
	/* Centralized function for browser feature detection
		- User agent string detection is only used when no good alternative is possible
		- Is executed directly for optimal performance
	*/	
	ua = function() {
		var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
			u = nav.userAgent.toLowerCase(),
			p = nav.platform.toLowerCase(),
			windows = p ? /win/.test(p) : /win/.test(u),
			mac = p ? /mac/.test(p) : /mac/.test(u),
			webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, // returns either the webkit version or false if not webkit
			ie = !+"\v1", // feature detection based on Andrea Giammarchi's solution: http://webreflection.blogspot.com/2009/01/32-bytes-to-know-if-your-browser-is-ie.html
			playerVersion = [0,0,0],
			d = null;
		if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
			d = nav.plugins[SHOCKWAVE_FLASH].description;
			if (d && !(typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) { // navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
				plugin = true;
				ie = false; // cascaded feature detection for Internet Explorer
				d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
				playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
				playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
				playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
			}
		}
		else if (typeof win.ActiveXObject != UNDEF) {
			try {
				var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
				if (a) { // a will return null when ActiveX is disabled
					d = a.GetVariable("$version");
					if (d) {
						ie = true; // cascaded feature detection for Internet Explorer
						d = d.split(" ")[1].split(",");
						playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
					}
				}
			}
			catch(e) {}
		}
		return { w3:w3cdom, pv:playerVersion, wk:webkit, ie:ie, win:windows, mac:mac };
	}();
	
	
	/* Detect the Flash Player version for non-Internet Explorer browsers
		- Detecting the plug-in version via the object element is more precise than using the plugins collection item's description:
		  a. Both release and build numbers can be detected
		  b. Avoid wrong descriptions by corrupt installers provided by Adobe
		  c. Avoid wrong descriptions by multiple Flash Player entries in the plugin Array, caused by incorrect browser imports
		- Disadvantage of this method is that it depends on the availability of the DOM, while the plugins collection is immediately available
	*/
	function testPlayerVersion() {
		var b = doc.getElementsByTagName("body")[0];
		var o = createElement(OBJECT);
		o.setAttribute("type", FLASH_MIME_TYPE);
		var t = b.appendChild(o);
		if (t) {
			var counter = 0;
			(function(){
				if (typeof t.GetVariable != UNDEF) {
					var d = t.GetVariable("$version");
					if (d) {
						d = d.split(" ")[1].split(",");
						ua.pv = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
					}
				}
				else if (counter < 10) {
					counter++;
					setTimeout(arguments.callee, 10);
					return;
				}
				b.removeChild(o);
				t = null;
				matchVersions();
			})();
		}
		else {
			matchVersions();
		}
	}
	
	/* Perform Flash Player and SWF version matching; static publishing only
	*/
	function matchVersions() {
		var rl = regObjArr.length;
		if (rl > 0) {
			for (var i = 0; i < rl; i++) { // for each registered object element
				var id = regObjArr[i].id;
				var cb = regObjArr[i].callbackFn;
				var cbObj = {success:false, id:id};
				if (ua.pv[0] > 0) {
					var obj = getElementById(id);
					if (obj) {
						if (hasPlayerVersion(regObjArr[i].swfVersion) && !(ua.wk && ua.wk < 312)) { // Flash Player version >= published SWF version: Houston, we have a match!
							setVisibility(id, true);
							if (cb) {
								cbObj.success = true;
								cbObj.ref = getObjectById(id);
								cb(cbObj);
							}
						}
						else if (regObjArr[i].expressInstall && canExpressInstall()) { // show the Adobe Express Install dialog if set by the web page author and if supported
							var att = {};
							att.data = regObjArr[i].expressInstall;
							att.width = obj.getAttribute("width") || "0";
							att.height = obj.getAttribute("height") || "0";
							if (obj.getAttribute("class")) { att.styleclass = obj.getAttribute("class"); }
							if (obj.getAttribute("align")) { att.align = obj.getAttribute("align"); }
							// parse HTML object param element's name-value pairs
							var par = {};
							var p = obj.getElementsByTagName("param");
							var pl = p.length;
							for (var j = 0; j < pl; j++) {
								if (p[j].getAttribute("name").toLowerCase() != "movie") {
									par[p[j].getAttribute("name")] = p[j].getAttribute("value");
								}
							}
							showExpressInstall(att, par, id, cb);
						}
						else { // Flash Player and SWF version mismatch or an older Webkit engine that ignores the HTML object element's nested param elements: display alternative content instead of SWF
							displayAltContent(obj);
							if (cb) { cb(cbObj); }
						}
					}
				}
				else {	// if no Flash Player is installed or the fp version cannot be detected we let the HTML object element do its job (either show a SWF or alternative content)
					setVisibility(id, true);
					if (cb) {
						var o = getObjectById(id); // test whether there is an HTML object element or not
						if (o && typeof o.SetVariable != UNDEF) { 
							cbObj.success = true;
							cbObj.ref = o;
						}
						cb(cbObj);
					}
				}
			}
		}
	}
	
	/* Flash Player and SWF content version matching
	*/
	function hasPlayerVersion(rv) {
		var pv = ua.pv, v = rv.split(".");
		v[0] = parseInt(v[0], 10);
		v[1] = parseInt(v[1], 10) || 0; // supports short notation, e.g. "9" instead of "9.0.0"
		v[2] = parseInt(v[2], 10) || 0;
		return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
	}

	/* Filter to avoid XSS attacks
	*/
	function urlEncodeIfNecessary(s) {
		var regex = /[\\\"<>\.;]/;
		var hasBadChars = regex.exec(s) != null;
		return hasBadChars && typeof encodeURIComponent != UNDEF ? encodeURIComponent(s) : s;
	}
	
	return {
		hasFlashPlayerVersion: hasPlayerVersion
	};
}();
/* hider */
(function (window){
	
    var FWDRLHider = function(screenToTest, hideDelay){
    	
    	var self = this;
    	var prototype = FWDRLHider.prototype;
   
    	this.screenToTest = screenToTest;
    	this.hideDelay = hideDelay;
    	this.globalX = 0;
    	this.globalY = 0;
	
		this.currentTime;
    	this.checkIntervalId_int;
    	
    	this.hideCompleteId_to;
    	
    	this.hasInitialTestEvents_bl = false;
    	this.addSecondTestEvents_bl = false;
    	this.dispatchOnceShow_bl = true;
    	this.dispatchOnceHide_bl = false;
    	this.isStopped_bl = true;
    	this.isHidden_bl = false;
    	this.isMobile_bl = FWDRLUtils.isMobile;
    	this.hasPointerEvent_bl = FWDRLUtils.hasPointerEvent;
    	
		self.init = function(){};
	
		self.start = function(){
			self.currentTime = new Date().getTime();
			clearInterval(self.checkIntervalId_int);
			self.checkIntervalId_int = setInterval(self.update, 100);
			self.addMouseOrTouchCheck();
			self.isStopped_bl = false;
		};
		
		self.stop = function(){
			clearInterval(self.checkIntervalId_int);
			self.isStopped_bl = true;
			self.removeMouseOrTouchCheck();
			self.removeMouseOrTouchCheck2();
		};
		
		self.addMouseOrTouchCheck = function(){	
			if(self.hasInitialTestEvents_bl) return;
			self.hasInitialTestEvents_bl = true;
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screenToTest.screen.addEventListener("pointerdown", self.onMouseOrTouchUpdate);
					self.screenToTest.screen.addEventListener("pointermove", self.onMouseOrTouchUpdate);
				}else{
					self.screenToTest.screen.addEventListener("touchstart", self.onMouseOrTouchUpdate);
				}
			}else if(window.addEventListener){
				window.addEventListener("mousemove", self.onMouseOrTouchUpdate);
			}else if(document.attachEvent){
				document.attachEvent("onmousemove", self.onMouseOrTouchUpdate);
			}
		};
		
		self.removeMouseOrTouchCheck = function(){	
			if(!self.hasInitialTestEvents_bl) return;
			self.hasInitialTestEvents_bl = false;
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screenToTest.screen.removeEventListener("pointerdown", self.onMouseOrTouchUpdate);
					self.screenToTest.screen.removeEventListener("pointermove", self.onMouseOrTouchUpdate);
				}else{
					self.screenToTest.screen.removeEventListener("touchstart", self.onMouseOrTouchUpdate);
				}
			}else if(window.removeEventListener){
				window.removeEventListener("mousemove", self.onMouseOrTouchUpdate);
			}else if(document.detachEvent){
				document.detachEvent("onmousemove", self.onMouseOrTouchUpdate);
			}
		};
		
		self.addMouseOrTouchCheck2 = function(){	
			if(self.addSecondTestEvents_bl) return;
			self.addSecondTestEvents_bl = true;
			if(self.screenToTest.screen.addEventListener){
				self.screenToTest.screen.addEventListener("mousemove", self.secondTestMoveDummy);
			}else if(self.screenToTest.screen.attachEvent){
				self.screenToTest.screen.attachEvent("onmousemove", self.secondTestMoveDummy);
			}
		};
		
		self.removeMouseOrTouchCheck2 = function(){	
			if(!self.addSecondTestEvents_bl) return;
			self.addSecondTestEvents_bl = false;
			if(self.screenToTest.screen.removeEventListener){
				self.screenToTest.screen.removeEventListener("mousemove", self.secondTestMoveDummy);
			}else if(self.screenToTest.screen.detachEvent){
				self.screenToTest.screen.detachEvent("onmousemove", self.secondTestMoveDummy);
			}
		};
		
		this.secondTestMoveDummy = function(){
			self.removeMouseOrTouchCheck2();
			self.addMouseOrTouchCheck();
		};
		
		self.onMouseOrTouchUpdate = function(e){
			var viewportMouseCoordinates = FWDRLUtils.getViewportMouseCoordinates(e);	
			
			if(self.globalX != viewportMouseCoordinates.screenX
			   && self.globalY != viewportMouseCoordinates.screenY){
				self.currentTime = new Date().getTime();
			}
			
			self.globalX = viewportMouseCoordinates.screenX;
			self.globalY = viewportMouseCoordinates.screenY;
			
			if(!self.isMobile_bl){
				if(!FWDRLUtils.hitTest(self.screenToTest.screen, self.globalX, self.globalY)){
					self.removeMouseOrTouchCheck();
					self.addMouseOrTouchCheck2();
				}
			}
		};
	
		self.update = function(e){
			if(new Date().getTime() > self.currentTime + self.hideDelay){
				if(self.dispatchOnceShow_bl){	
					self.dispatchOnceHide_bl = true;
					self.dispatchOnceShow_bl = false;
					self.isHidden_bl = true;
					self.dispatchEvent(FWDRLHider.HIDE);
					clearTimeout(self.hideCompleteId_to);
					self.hideCompleteId_to = setTimeout(function(){
						self.dispatchEvent(FWDRLHider.HIDE_COMPLETE);
					}, 1000);
				}
			}else{
				if(self.dispatchOnceHide_bl){
					clearTimeout(self.hideCompleteId_to);
					self.dispatchOnceHide_bl = false;
					self.dispatchOnceShow_bl = true;
					self.isHidden_bl = false;
					self.dispatchEvent(FWDRLHider.SHOW);
				}
			}
		};

		self.reset = function(){
			self.isHidden_bl = false;
			clearTimeout(self.hideCompleteId_to);
			self.currentTime = new Date().getTime();
			self.dispatchEvent(FWDRLHider.SHOW);
		};
		
		
		self.init();
     };
     
	 FWDRLHider.HIDE = "hide";
	 FWDRLHider.SHOW = "show";
	 FWDRLHider.HIDE_COMPLETE = "hideComplete";
	 
	 FWDRLHider.setPrototype = function(){
		 FWDRLHider.prototype = new FWDRLEventDispatcher();
	 };
	 

	 window.FWDRLHider = FWDRLHider;
}(window));/* Info screen */
(function (window){
	
	var FWDRLInfo = function(parent, warningIconPath){
		
		var self = this;
		var prototype = FWDRLInfo.prototype;
	
		this.textHolder_do = null;
		this.img_do;
		
		this.warningIconPath_str = warningIconPath;
		
		this.show_to = null;
		this.isShowed_bl = false;
		this.isShowedOnce_bl = false;
		this.allowToRemove_bl = true;
		
		//#################################//
		/* init */
		//#################################//
		this.init = function(){
			self.setResizableSizeAfterParent();
			self.getStyle().width = "80%";
		
			self.textHolder_do = new FWDRLDisplayObject("div");
			if(!FWDRLUtils.isIEAndLessThen9) self.textHolder_do.getStyle().font = "Arial";
			self.textHolder_do.getStyle().wordWrap = "break-word";
			self.textHolder_do.getStyle().padding = "10px";
			self.textHolder_do.getStyle().paddingLeft = "42px";
			self.textHolder_do.getStyle().lineHeight = "18px";
			self.textHolder_do.setBkColor("#EEEEEE");
			
			var img_img = new Image();
			img_img.src = this.warningIconPath_str;
			this.img_do = new FWDRLDisplayObject("img");
			this.img_do.setScreen(img_img);
			this.img_do.setWidth(28);
			this.img_do.setHeight(28);
			
			self.addChild(self.textHolder_do);
			self.addChild(self.img_do);
		};
		
		this.showText = function(txt){
			if(!self.isShowedOnce_bl){
				if(self.screen.addEventListener){
					self.screen.addEventListener("click", self.closeWindow);
				}else if(self.screen.attachEvent){
					self.screen.attachEvent("onclick", self.closeWindow);
				}
				self.isShowedOnce_bl = true;
			}
			
			//self.setX(-800);
			//if(self.allowToRemove_bl){
			//	self.textHolder_do.setInnerHTML(txt  + "<p style='margin:0px; padding-bottom:10px;'><font color='#FFFFFF'>Click or tap to close this window.</font>");
		//	}else{
				
				self.textHolder_do.setInnerHTML(txt);
			//}
			
			clearTimeout(self.show_to);
			self.show();
		};
		
		this.show = function(){
			self.isShowed_bl = true;
			self.setVisible(true);
			setTimeout(function(){
				self.positionAndResize();
			}, 60);
		};
		
		this.positionAndResize = function(){		
			self.setHeight(self.textHolder_do.getHeight());
			self.img_do.setX(6);
			self.img_do.setY(parseInt((self.h - self.img_do.h)/2));
	
		};
		
		this.closeWindow = function(){
			if(!self.allowToRemove_bl) return;
			self.isShowed_bl = false;
			clearTimeout(self.show_to);
			try{parent.main_do.removeChild(self);}catch(e){}
		};
		
		this.init();
	};
		
	/* set prototype */
	FWDRLInfo.setPrototype = function(){
		FWDRLInfo.prototype = new FWDRLDisplayObject("div", "relative");
	};
	
	FWDRLInfo.prototype = null;
	window.FWDRLInfo = FWDRLInfo;
}(window));/* Thumb */
(function (window){
	
	var FWDRLPreloader = function(
			imageSource_img, 
			segmentWidth, 
			segmentHeight, 
			totalSegments, 
			animDelay,
			skipFirstFrame){
		
		var self  = this;
		var prototype = FWDRLPreloader.prototype;
		
		this.imageSource_img = imageSource_img;
		this.image_sdo = null;
		
		this.segmentWidth = segmentWidth;
		this.segmentHeight = segmentHeight;
		this.totalSegments = totalSegments;
		this.animDelay = animDelay || 300;
		this.count = 0;
		
		this.delayTimerId_int;
		this.isShowed_bl = true;
		this.skipFirstFrame_bl = skipFirstFrame;
		
		//###################################//
		/* init */
		//###################################//
		self.init = function(){
			self.getStyle().pointerEvents = "none";
			self.setWidth(self.segmentWidth);
			self.setHeight(self.segmentHeight);
		
			self.image_sdo = new FWDRLDisplayObject("img");
			self.image_sdo.setScreen(self.imageSource_img);
			self.image_sdo.hasTransform3d_bl = false;
			self.image_sdo.hasTransform2d_bl = false;
			self.addChild(self.image_sdo);
			
			self.hide(false);
		};
		
		//###################################//
		/* start / stop preloader animation */
		//###################################//
		self.start = function(){
			if(self == null) return;
			clearInterval(self.delayTimerId_int);
			self.delayTimerId_int = setInterval(self.updatePreloader, self.animDelay);
		};
		
		self.stop = function(){
			clearInterval(self.delayTimerId_int);
			self.image_sdo.setX(0);
		};
		
		self.updatePreloader = function(){
			if(self == null) return;
			self.count++;
			if(self.count > self.totalSegments - 1){
				if(self.skipFirstFrame_bl){
					self.count = 1;
				}else{
					self.count = 0;
				}	
			}
			
			var posX = self.count * self.segmentWidth;
			self.image_sdo.setX(-posX);
		};
		
		
		//###################################//
		/* show / hide preloader animation */
		//###################################//
		self.show = function(){
			self.setVisible(true);
			self.start();
			FWDAnimation.killTweensOf(self);
			FWDAnimation.to(self, .8, {alpha:1, ease:Quart.easeOut});
			self.isShowed_bl = true;
		};
		
		self.hide = function(animate){
			if(!self.isShowed_bl) return;
			FWDAnimation.killTweensOf(self);
			if(animate){
				FWDAnimation.to(self, .8, {alpha:0, onComplete:self.onHideComplete, ease:Quart.easeOut});
			}else{
				self.setVisible(false);
				self.setAlpha(0);
			}
			self.isShowed_bl = false;
		};
		
		self.onHideComplete = function(){
			self.stop();
			self.setVisible(false);
			self.dispatchEvent(FWDRLPreloader.HIDE_COMPLETE);
		};

		self.init();
	};
	
	/* set prototype */
    FWDRLPreloader.setPrototype = function(){
    	FWDRLPreloader.prototype = new FWDRLDisplayObject("div");
    };
    
    FWDRLPreloader.HIDE_COMPLETE = "hideComplete";
    
    FWDRLPreloader.prototype = null;
	window.FWDRLPreloader = FWDRLPreloader;
}(window));/* FWDRLSimpleButton */
(function (window){
var FWDRLSimpleButton = function(nImg, sPath, dPath, alwaysShowSelectedPath){
		
		var self = this;
		var prototype = FWDRLSimpleButton.prototype;
		
		this.nImg = nImg;
		this.sPath_str = sPath;
		this.dPath_str = dPath;
	
		this.buttonsHolder_do;
		this.n_sdo;
		this.s_sdo;
		this.d_sdo;
		
		this.toolTipLabel_str;
		
		this.totalWidth = this.nImg.width;
		this.totalHeight = this.nImg.height;
		
		this.isShowed_bl = true;
		this.isSetToDisabledState_bl = false;
		this.isDisabled_bl = false;
		this.isDisabledForGood_bl = false;
		this.isSelectedFinal_bl = false;
		this.isActive_bl = false;
		this.isMobile_bl = FWDRLUtils.isMobile;
		this.hasPointerEvent_bl = FWDRLUtils.hasPointerEvent;
		this.allowToCreateSecondButton_bl = !self.isMobile_bl || self.hasPointerEvent_bl || alwaysShowSelectedPath;
	
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setupMainContainers();
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			
			self.buttonsHolder_do = new FWDRLDisplayObject("div");
			self.buttonsHolder_do.setOverflow("visible");
		
			self.n_sdo = new FWDRLDisplayObject("img");	
			self.n_sdo.setScreen(self.nImg);
			self.buttonsHolder_do.addChild(self.n_sdo);
			
			if(self.allowToCreateSecondButton_bl){
				var img1 = new Image();
				img1.src = self.sPath_str;
				self.s_sdo = new FWDRLDisplayObject("img");
				self.s_sdo.setScreen(img1);
				self.s_sdo.setWidth(self.totalWidth);
				self.s_sdo.setHeight(self.totalHeight);
				self.s_sdo.setAlpha(0);
				self.buttonsHolder_do.addChild(self.s_sdo);
				
				if(self.dPath_str){
					var img2 = new Image();
					img2.src = self.dPath_str;
					self.d_sdo = new FWDRLDisplayObject("img");
					self.d_sdo.setScreen(img2);
					self.d_sdo.setWidth(self.totalWidth);
					self.d_sdo.setHeight(self.totalHeight);
					self.d_sdo.setX(-100);
					self.buttonsHolder_do.addChild(self.d_sdo);
				};
			}
			
			self.setWidth(self.totalWidth);
			self.setHeight(self.totalHeight);
			self.setButtonMode(true);
			self.screen.style.yellowOverlayPointerEvents = "none";
			self.addChild(self.buttonsHolder_do);
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.addEventListener("pointerup", self.onMouseUp);
					self.screen.addEventListener("pointerover", self.onMouseOver);
					self.screen.addEventListener("pointerout", self.onMouseOut);
				}else{
					self.screen.addEventListener("touchend", self.onMouseUp);
				}
			}else if(self.screen.addEventListener){	
				self.screen.addEventListener("mouseover", self.onMouseOver);
				self.screen.addEventListener("mouseout", self.onMouseOut);
				self.screen.addEventListener("mouseup", self.onMouseUp);
			}else if(self.screen.attachEvent){
				self.screen.attachEvent("onmouseover", self.onMouseOver);
				self.screen.attachEvent("onmouseout", self.onMouseOut);
				self.screen.attachEvent("onmouseup", self.onMouseUp);
			}
		};
		
		self.onMouseOver = function(e){
			self.dispatchEvent(FWDRLSimpleButton.SHOW_TOOLTIP, {e:e});
			if(self.isDisabledForGood_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == "mouse"){
				if(self.isDisabled_bl || self.isSelectedFinal_bl) return;
				self.dispatchEvent(FWDRLSimpleButton.MOUSE_OVER, {e:e});
				self.setSelectedState();
			}
		};
			
		self.onMouseOut = function(e){
			if(self.isDisabledForGood_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE || e.pointerType == "mouse"){
				if(self.isDisabled_bl || self.isSelectedFinal_bl) return;
				self.dispatchEvent(FWDRLSimpleButton.MOUSE_OUT, {e:e});
				self.setNormalState();
			}
		};
		
		self.onMouseUp = function(e){
			if(self.isDisabledForGood_bl) return;
			if(e.preventDefault) e.preventDefault();
			if(self.isDisabled_bl || e.button == 2) return;
			self.dispatchEvent(FWDRLSimpleButton.MOUSE_UP, {e:e});
		};
		
		//##############################//
		// set select / deselect final.
		//##############################//
		self.setSelected = function(){
			self.isSelectedFinal_bl = true;
			if(!self.s_sdo) return;
			FWDAnimation.killTweensOf(self.s_sdo);
			FWDAnimation.to(self.s_sdo, .8, {alpha:1, ease:Expo.easeOut});
		};
		
		self.setUnselected = function(){
			self.isSelectedFinal_bl = false;
			if(!self.s_sdo) return;
			FWDAnimation.to(self.s_sdo, .8, {alpha:0, delay:.1, ease:Expo.easeOut});
		};
		
		//####################################//
		/* Set normal / selected state */
		//####################################//
		this.setNormalState = function(){
			if(!self.s_sdo) return;
			FWDAnimation.killTweensOf(self.s_sdo);
			FWDAnimation.to(self.s_sdo, .5, {alpha:0, ease:Expo.easeOut});	
		};
		
		this.setSelectedState = function(){
			if(!self.s_sdo) return;
			FWDAnimation.killTweensOf(self.s_sdo);
			FWDAnimation.to(self.s_sdo, .5, {alpha:1, delay:.1, ease:Expo.easeOut});
		};
		
		//####################################//
		/* Disable / enable */
		//####################################//
		this.setDisabledState = function(){
			if(self.isSetToDisabledState_bl) return;
			self.isSetToDisabledState_bl = true;
			if(self.d_sdo) self.d_sdo.setX(0);
		};
		
		this.setEnabledState = function(){
			if(!self.isSetToDisabledState_bl) return;
			self.isSetToDisabledState_bl = false;
			if(self.d_sdo) self.d_sdo.setX(-100);
		};
		
		this.disable = function(setNormalState){
			if(self.isDisabledForGood_bl  || self.isDisabled_bl) return;
			self.isDisabled_bl = true;
			self.setButtonMode(false);
			FWDAnimation.to(self, .6, {alpha:.4});
			if(!setNormalState) self.setNormalState();
		};
		
		this.enable = function(){
			if(self.isDisabledForGood_bl || !self.isDisabled_bl) return;
			self.isDisabled_bl = false;
			self.setButtonMode(true);
			FWDAnimation.to(self, .6, {alpha:1});
		};
		
		this.disableForGood = function(){
			self.isDisabledForGood_bl = true;
			self.setButtonMode(false);
		};
		
		this.showDisabledState = function(){
			if(self.d_sdo.x != 0) self.d_sdo.setX(0);
		};
		
		this.hideDisabledState = function(){
			if(self.d_sdo.x != -100) self.d_sdo.setX(-100);
		};
		
		//#####################################//
		/* show / hide */
		//#####################################//
		this.show = function(){
			if(self.isShowed_bl) return;
			self.isShowed_bl = true;
			
			FWDAnimation.killTweensOf(self);
			if(!FWDRLUtils.isIEAndLessThen9){
				if(FWDRLUtils.isIEWebKit){
					FWDAnimation.killTweensOf(self.n_sdo);
					self.n_sdo.setScale2(0);
					FWDAnimation.to(self.n_sdo, .8, {scale:1, delay:.4, onStart:function(){self.setVisible(true);}, ease:Elastic.easeOut});
				}else{
					self.setScale2(0);
					FWDAnimation.to(self, .8, {scale:1, delay:.4, onStart:function(){self.setVisible(true);}, ease:Elastic.easeOut});
				}
			}else if(FWDRLUtils.isIEAndLessThen9){
				self.setVisible(true);
			}else{
				self.setAlpha(0);
				FWDAnimation.to(self, .4, {alpha:1, delay:.4});
				self.setVisible(true);
			}
		};	
			
		this.hide = function(animate){
			if(!self.isShowed_bl) return;
			self.isShowed_bl = false;
			FWDAnimation.killTweensOf(self);
			FWDAnimation.killTweensOf(self.n_sdo);
			self.setVisible(false);
		};
		
		self.init();
	};
	
	/* set prototype */
	FWDRLSimpleButton.setPrototype = function(hasTransform){
		FWDRLSimpleButton.prototype = null;
		if(hasTransform){
			FWDRLSimpleButton.prototype = new FWDRLTransformDisplayObject("div");
		}else{
			FWDRLSimpleButton.prototype = new FWDRLDisplayObject("div");
		}
	};
	
	FWDRLSimpleButton.CLICK = "onClick";
	FWDRLSimpleButton.MOUSE_OVER = "onMouseOver";
	FWDRLSimpleButton.SHOW_TOOLTIP = "showTooltip";
	FWDRLSimpleButton.MOUSE_OUT = "onMouseOut";
	FWDRLSimpleButton.MOUSE_UP = "onMouseDown";
	
	FWDRLSimpleButton.prototype = null;
	window.FWDRLSimpleButton = FWDRLSimpleButton;
}(window));/* Slideshow preloader */
(function (window){
	
	var FWDRLSlideShowPreloader = function(imageSource_img, segmentWidth, segmentHeight, totalSegments, duration){
		
		var self  = this;
		var prototype = FWDRLSlideShowPreloader.prototype;
		
		this.imageSource_img = imageSource_img;
		this.image_do = null;
		this.tweenObj = {currentPos:0};
		
		this.segmentWidth = segmentWidth;
		this.segmentHeight = segmentHeight;
		this.totalSegments = totalSegments;
		this.duration = duration/1000;
		this.delayTimerId_int;
		
		//###################################//
		/* init */
		//###################################//
		self.init = function(){
			self.setWidth(self.segmentWidth);
			self.setHeight(self.segmentHeight);
		
			self.image_do = new FWDRLDisplayObject("img");
			self.image_do.setScreen(self.imageSource_img);
			self.addChild(self.image_do);
			self.onUpdateHandler();
			//self.hide(false);
		};
		
		//###################################//
		/* start / stop preloader animation */
		//###################################//
		self.animShow = function(){
			FWDAnimation.killTweensOf(self.tweenObj);
			self.currentPos = 0;
			FWDAnimation.to(self.tweenObj, self.duration, {currentPos:1, ease:Linear.easeNone, onUpdate:self.onUpdateHandler});
		};
		
		self.animHide = function(){
			FWDAnimation.killTweensOf(self.tweenObj);
			FWDAnimation.to(self.tweenObj, .8, {currentPos:0, onUpdate:self.onUpdateHandler});
		};
		
		self.animReset = function(){
			FWDAnimation.killTweensOf(self.tweenObj);
			self.tweenObj.currentPos = 0;
			self.onUpdateHandler();
		};
		
		self.onUpdateHandler = function(){
			var posX = Math.round((self.tweenObj.currentPos/1) * (self.totalSegments - 1)) * self.segmentWidth;
			self.image_do.setX(-posX);
		};
		
		//###################################//
		/* show / hide preloader animation */
		//###################################//
		self.show = function(){
			self.setVisible(true);
			if(self.opacityType == "opacity"){
				FWDAnimation.killTweensOf(self.image_do);
				FWDAnimation.to(self.image_do, 1, {alpha:1});
			}else{
				self.setWidth(self.segmentWidth);
			}
		};
		
		self.hide = function(animate){
			if(animate){
				if(self.opacityType == "opacity"){
					FWDAnimation.killTweensOf(self.image_do);
					FWDAnimation.to(self.image_do, 1, {alpha:0, onComplete:hideCompleteHandler});
				}else{
					self.setWidth(0);
				}
			}else{
				self.setVisible(false);
				if(self.opacityType == "opacity"){
					FWDAnimation.killTweensOf(self.image_do);
					self.image_do.setAlpha(0);
				}else{
					self.setWidth(0);
				}
			}
		};
		
		self.hideCompleteHandler = function(){
			self.setVisible(false);
		};
	
		self.init();
	};
	
	FWDRLSlideShowPreloader.setPrototype = function(){
		FWDRLSlideShowPreloader.prototype = new FWDRLDisplayObject("div");
	};
	
	FWDRLSlideShowPreloader.prototype = null;
	window.FWDRLSlideShowPreloader = FWDRLSlideShowPreloader;
	
}(window));
/* thumb */
(function(window){
	
	var FWDRLThumb = function(
			parent,
			id, 
			thumbnailH,
			thumbnailsOffsetBottom,
			borderSize,
			thumbnailsBorderRadius,
			overlayOpacity,
			thumbnailBorderNormalColor,
			thumbnailBorderSelectedColor,
			thumbnailsOverlayColor,
			thumbnailsHoverEffect,
			iconPath,
			showOverlay,
			showIcon
		){
		
		var self = this;
		var prototype = FWDRLThumb.prototype;

		this.background_do = null;
		this.image_do = null;
		this.overlay_do = null;
		this.icon_do = null;
		this.iconImg_img = null;
		
		this.borderNormalColor_str = thumbnailBorderNormalColor || data.thumbnailBorderNormalColor_str;
		this.borderSelectedColor_str = thumbnailBorderSelectedColor || data.thumbnailBorderSelectedColor_str;
		this.thumbnailsOverlayColor_str = thumbnailsOverlayColor;
		this.iconPath_str = iconPath;
		this.thumbnailsHoverEffect_str = thumbnailsHoverEffect;
	
		this.id = id;
		this.borderSize = borderSize;
		this.borderRadius = thumbnailsBorderRadius;
		this.thumbnailH = thumbnailH;
		this.thumbnailsOffsetBottom = thumbnailsOffsetBottom;
		this.overlayOpacity = overlayOpacity;
		
		this.isSelected_bl = true;
		this.isDisabled_bl = false;
		this.hasPointerEvent_bl = FWDRLUtils.hasPointerEvent;
		this.isMobile_bl = FWDRLUtils.isMobile;
		this.showOverlay_bl = showOverlay;
		if(this.isMobile_bl) this.showOverlay_bl = false;
		this.showIcon_bl = showIcon;
		if(this.isMobile_bl) this.showIcon_bl = false;
		
		/* init */
		self.init = function(){
			self.setButtonMode(true);
			self.setupScreen();
		};
		
		/* setup screen */
		self.setupScreen = function(){
			self.background_do = new FWDRLDisplayObject("div");
			if(self.borderRadius) self.getStyle().borderRadius = self.borderRadius + "px";
			self.setNormalState(false);
			if(self.borderRadius != 0) self.background_do.getStyle().borderRadius = self.borderRadius + "px";
			self.addChild(self.background_do);
		};
		
		
		//######################################//
		/* add image */
		//######################################//
		self.setImage = function(image){
			
			self.image_do = new FWDRLDisplayObject("img");
			self.image_do.setScreen(image);
			var imgW = image.width;
			var imgH = image.height;
			var imageHeight = self.thumbnailH - self.borderSize * 2;
			
			var scale = imageHeight/imgH;
			
			var finalH = parseInt(imageHeight + self.borderSize * 2);
			var finalW = parseInt((imgW * scale) + self.borderSize * 2);
			
			if(self.background_do){
				self.background_do.setWidth(finalW);
				self.background_do.setHeight(finalH);
			}
			
			self.image_do.setX(self.borderSize);
			self.image_do.setY(self.borderSize);
			self.image_do.setWidth(parseInt(finalW - self.borderSize * 2));
			self.image_do.setHeight(imageHeight);
			self.setWidth(finalW);
			self.setHeight(finalH);
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.addEventListener("pointerup", self.onMouseClickHandler);
				}
				self.screen.addEventListener("click", self.onMouseClickHandler);
			}else if(self.screen.addEventListener){
				self.screen.addEventListener("mouseover", self.onMouseOverHandler);
				self.screen.addEventListener("click", self.onMouseClickHandler);
			}else if(self.screen.attachEvent){
				self.screen.attachEvent("onmouseover", self.onMouseOverHandler);
				self.screen.attachEvent("onclick", self.onMouseClickHandler);
			}
			
			self.addChild(self.image_do);
			if(!self.isMobile_bl){
				if(self.showOverlay_bl){
					
					self.overlay_do = new FWDRLDisplayObject("div");
					self.overlay_do.setX(self.borderSize);
					self.overlay_do.setY(self.borderSize);
					self.overlay_do.setWidth(finalW - self.borderSize * 2);
					self.overlay_do.setHeight(finalH - self.borderSize * 2);
					self.overlay_do.setBkColor(this.thumbnailsOverlayColor_str);
					self.addChild(self.overlay_do);
					setTimeout(function(){
						if(self) self.overlay_do.setAlpha(0);
					}, 50);
				}
				
				if(self.showIcon_bl){
					self.icon_do = new FWDRLTransformDisplayObject("img");
					self.iconImg_img = new Image();
					self.iconImg_img.onload = function(){
						self.icon_do.setScreen(self.iconImg_img);
						self.icon_do.setX(parseInt((finalW - self.icon_do.w)/2));
						self.icon_do.setY(parseInt((finalH - self.icon_do.h)/2));
						self.addChild(self.icon_do);
						setTimeout(function(){
							if(self) self.icon_do.setAlpha(0);
						}, 50);
						
					};
					self.iconImg_img.src = self.iconPath_str;
				}
			}
			self.hide(false);
			self.show(true);
			if(parent.id == self.id) self.disable();
			
		};
		
		self.onMouseOverHandler = function(e){
			
			self.dispatchEvent(FWDRLThumb.HOVER);
			if(self.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				self.setSelectedState(true);
			}
			self.startToCheckTest();
		};
		
		self.startToCheckTest = function(){
			if(window.addEventListener){
				window.addEventListener("mousemove", self.checkHitTest);
			}else if(document.attachEvent){
				document.detachEvent("onmousemove", self.checkHitTest);
				document.attachEvent("onmousemove", self.checkHitTest);
			}
		};
		
		self.stopToCheckTest = function(){
			if(window.removeEventListener){
				window.removeEventListener("mousemove", self.checkHitTest);
			}else if(document.detachEvent){
				document.detachEvent("onmousemove", self.checkHitTest);
			}
		};
		
		self.checkHitTest = function(e){
			var wc = FWDRLUtils.getViewportMouseCoordinates(e);
			
			if(!FWDRLUtils.hitTest(self.screen, wc.screenX, wc.screenY)){
				self.onMouseOutHandler(e);
				self.stopToCheckTest();
			}
		};

		self.onMouseOutHandler = function(e){
			if(self.isDisabled_bl) return;
			if(!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE){
				self.setNormalState(true);
			}
		};
	
		self.onMouseClickHandler = function(e){
			if(self.isDisabled_bl) return;
			self.dispatchEvent(FWDRLThumb.CLICK, {id:self.id});
		};
		
		//#########################################//
		/* Set normal/selected display states */
		//########################################//
		self.setNormalState = function(animate){
			if(!self.isSelected_bl) return;
			self.isSelected_bl = false;
			FWDAnimation.killTweensOf(self.background_do.screen);
			if(self.overlay_do && self.showOverlay_bl) FWDAnimation.to(self.overlay_do, .8, {alpha:0, ease:Expo.easeOut});
			if(self.icon_do && self.showIcon_bl){
				FWDAnimation.killTweensOf(self.icon_do);
				if(self.icon_do.hasTransform2d_bl && self.thumbnailsHoverEffect_str == "scale"){
					FWDAnimation.to(self.icon_do, .5, {scale:1, alpha:0, ease:Expo.easeOut});
				}else{
					FWDAnimation.to(self.icon_do, .8, {alpha:0, ease:Expo.easeOut});
				}
			}
			if(animate){
				if(self.borderSize != 0) FWDAnimation.to(self.background_do.screen, .8, {css : {backgroundColor:self.borderNormalColor_str}, ease : Expo.easeOut});
			}else{
				if(self.borderSize != 0) self.background_do.getStyle().backgroundColor = self.borderNormalColor_str;
			}
		};

		self.setSelectedState = function(animate){
			if(self.isSelected_bl) return;
			self.isSelected_bl = true;
			if(self.overlay_do && self.showOverlay_bl) FWDAnimation.to(self.overlay_do, .8, {alpha:self.overlayOpacity, ease:Expo.easeOut});
			if(self.icon_do && self.showIcon_bl){
				FWDAnimation.killTweensOf(self.icon_do);
				if(self.icon_do.hasTransform2d_bl && self.thumbnailsHoverEffect_str == "scale"){
					self.icon_do.setAlpha(0);
					self.icon_do.setScale2(3);
					FWDAnimation.to(self.icon_do, .5, {scale:1, alpha:1, ease:Expo.easeInOut});
				}else{
					FWDAnimation.to(self.icon_do, .8, {alpha:1, ease:Expo.easeOut});
				}
			}
			if(animate){
				if(self.borderSize != 0) FWDAnimation.to(self.background_do.screen, .8, {css : {backgroundColor:self.borderSelectedColor_str}, ease : Expo.easeOut});
			}else{
				if(self.borderSize != 0) self.background_do.getStyle().backgroundColor = self.borderSelectedColor_str;
			}
		};

		//########################################//
		/* show/hide thumb */
		//########################################//
		self.show = function(animate){
			FWDAnimation.killTweensOf(self);
			if(animate){
				FWDAnimation.to(self, .8, {y:0, ease:Expo.easeInOut});
			}else{
				self.setY(0);
			}
		};
		
		self.hide = function(animate){	
			
			FWDAnimation.killTweensOf(self);
			if(animate){
				FWDAnimation.to(self, .8, {y:self.thumbnailsOffsetBottom + self.thumbnailH + 2});
			}else{
				self.setY(self.thumbnailsOffsetBottom + self.thumbnailH + 2);
			}
		};
		
		//#####################################//
		/* disable /  enable */
		//#####################################//
		self.enable = function(){
			if(!self.isDisabled_bl) return;
			self.isDisabled_bl = false;
			FWDAnimation.to(self.background_do, .8, {alpha:1, ease:Quint.easeOut});
			if(self.icon_do) FWDAnimation.to(self.icon_do, .8, {alpha:1, ease:Quint.easeOut});
			if(self.image_do) FWDAnimation.to(self.image_do, .8, {alpha:1, ease:Quint.easeOut});
			if(self.overlay_do) FWDAnimation.to(self.overlay_do, .8, {alpha:0, ease:Quint.easeOut});
			self.setNormalState(true);
			self.setButtonMode(true);
		};
		
		self.disable = function(){
			self.isDisabled_bl = true;
			FWDAnimation.to(self.background_do, .8, {alpha:.4, ease:Quint.easeOut});
			self.setSelectedState(true);
			if(self.icon_do) FWDAnimation.to(self.icon_do, .8, {alpha:0, ease:Quint.easeOut});
			if(self.image_do) FWDAnimation.to(self.image_do, .8, {alpha:.4, ease:Quint.easeOut});
			if(self.overlay_do) FWDAnimation.to(self.overlay_do, .8, {alpha:0, ease:Quint.easeOut});
			self.stopToCheckTest();
			self.setButtonMode(false);
		};
		
		//####################################//
		/* destroy */
		//####################################//
		self.destroy = function(){
			
			if(self.iconImg_img){
				self.iconImg_img.onload = null;
				self.iconImg_img.onerror = null;
			}
			
			FWDAnimation.killTweensOf(self.background_do);
			self.background_do.destroy();
			
			if(self.image_do){
				FWDAnimation.killTweensOf(self.image_do);
				self.image_do.destroy();
			}
			
			if(self.overlay_do){
				FWDAnimation.killTweensOf(self.overlay_do);
				self.overlay_do.destroy();
			}
			
			if(self.icon_do){
				FWDAnimation.killTweensOf(self.icon_do);
				self.icon_do.destroy();
			}
			
			if(self.isMobile_bl){
				if(self.hasPointerEvent_bl){
					self.screen.removeEventListener("pointerover", self.onMouseOverHandler);
					self.screen.removeEventListener("pointerup", self.onMouseClickHandler);
				}else{
					self.screen.removeEventListener("touchend", self.onMouseClickHandler);
				}
				
			}else if(self.screen.removeEventListener){
				self.screen.removeEventListener("mouseover", self.onMouseOverHandler);
				self.screen.removeEventListener("click", self.onMouseClickHandler);
				window.removeEventListener("mousemove", self.checkHitTest);
			}else if(self.screen.detachEvent){
				self.screen.detachEvent("onmouseover", self.onMouseOverHandler);
				self.screen.detachEvent("onclick", self.onMouseClickHandler);
				document.detachEvent("onmousemove", self.checkHitTest);
			}
			
			self.iconImg_img = null;
			self.background_do = null;
			self.image_do = null;
			self.overlay_do = null;
			self.icon_do = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			prototype = null;
			self = null;
			FWDRLThumb.prototype = null;
		};

		self.init();
	};

	/* set prototype */
	FWDRLThumb.setPrototype = function(){
		FWDRLThumb.prototype = new FWDRLDisplayObject("div");
	};
	
	FWDRLThumb.HOVER =  "onHover";
	FWDRLThumb.CLICK =  "onClick";
	
	FWDRLThumb.IFRAME = "iframe";
	FWDRLThumb.IMAGE = "image";
	FWDRLThumb.FLASH = "flash";
	FWDRLThumb.AUDIO = "audio";
	FWDRLThumb.VIDEO = "video";
	FWDRLThumb.VIMEO= "vimeo";
	FWDRLThumb.YOUTUBE = "youtube";
	FWDRLThumb.MAPS = "maps";
	FWDRLThumb.AJAX = "ajax";
	FWDRLThumb.HTML = "html";
	
	FWDRLThumb.prototype = null;
	window.FWDRLThumb = FWDRLThumb;
}(window));/* Info screen */
(function (window){
	
	var FWDRLThumbnailsManager = function(parent){
		
		var self = this;
		var prototype = FWDRLThumbnailsManager.prototype;
		
		this.playlist_ar = null;
		this.thumbs_ar = null;
		
		this.mainHolder_do = null;
		this.thumbnailsHolder_do = null;
	
		this.thumbnailsBorderNormalColor_str = parent.thumbnailsBorderNormalColor_str;
		this.thumbnailsBorderSelectedColor_str = parent.thumbnailsBorderSelectedColor_str;
		this.thumbnailsOverlayColor_str = parent.thumbnailsOverlayColor_str;
		this.thumbnailsHoverEffect_str = parent.thumbnailsHoverEffect_str;
		
		this.stageWidth = 0;
		this.stageHeight = parent.thumbnailH;
		this.thumbnailsBorderSize = parent.thumbnailsBorderSize;
		this.thumbnailsBorderRadius = parent.thumbnailsBorderRadius;
		this.thumbnailsOffsetBottom = parent.thumbnailsOffsetBottom;
		this.thumbnailH = parent.thumbnailH - this.thumbnailsOffsetBottom;
		this.spaceBetweenThumbnails = parent.spaceBetweenThumbnails;
		this.totalW = 0;
		this.spaceBetweenThumbnails = parent.spaceBetweenThumbnails;
		this.thumbnailsOverlayOpacity = parent.thumbnailsOverlayOpacity;
		this.vx = 0;
		this.vx2 = 0;
		this.friction = .9;
		this.lastPresedX = 0;
		this.totalThumbnails = 0;	
		this.countLoadedThumbs = 0;
		this.id = 0;
		
		this.loadWithDelayId_to;
		this.disableOnMoveId_to;
		this.updateMobileScrollBarId_int;
		
		this.showThumbnailsOverlay_bl = parent.showThumbnailsOverlay_bl;
		this.showThumbnailsSmallIcon_bl = parent.showThumbnailsSmallIcon_bl;
		this.areThumbnailTouched_bl = false;
		this.isScrolling_bl = false;
		this.isShowed_bl = false;
		this.areButtonsPositioned_bl = false;
		this.areThumbnailsCreated_bl = false;
		this.hasSupportForDesktopScroll_bl = false;
		this.isMobile_bl = FWDRLUtils.isMobile;
		this.hasPointerEvent_bl = FWDRLUtils.hasPointerEvent;
	
		//#################################//
		/* init */
		//#################################//
		self.init = function(){
			self.setOverflow("visible");
			self.mainHolder_do = new FWDRLDisplayObject("div");
			self.mainHolder_do.setOverflow("visible");
			
			self.thumbnailsHolder_do = new FWDRLDisplayObject("div"); 
			self.thumbnailsHolder_do.setOverflow("visible");
			self.mainHolder_do.addChild(self.thumbnailsHolder_do);
			
			self.addChild(self.mainHolder_do);
		};
		
		//######################################//
		/* Position and resize */
		//######################################//
		self.positionAndResize = function(){
			self.areButtonsPositioned_bl = false;
			self.stageWidth = parent.stageWidth;
			self.setY(parent.stageHeight);
			self.mainHolder_do.setWidth(self.stageWidth);
			self.mainHolder_do.setHeight(self.stageHeight);
			if(self.areThumbnailsCreated_bl) self.positionThumbnails(false);
		};
		
		//#####################################//
		/* Create / destory thumbnails */
		//#####################################//
		self.setupThumbnails = function(){
			self.areThumbnailsCreated_bl = true;
			self.areButtonsPositioned_bl = false;
			self.thumbs_ar = [];
			self.playlist_ar = parent.playlist_ar;
			self.totalThumbnails = self.playlist_ar.length;
			self.countLoadedThumbs = 0;
			self.loadThumbnails();
			if(self.isMobile_bl) self.addMobileScrollSupport();
		};
		
		self.loadThumbnails = function(){
			if(self.countLoadedThumbs > self.totalThumbnails-1) return;
			self.image_img = new Image();
			self.image_img.onload = self.onThumbnailLoadComplete;
			self.image_img.src = self.playlist_ar[self.countLoadedThumbs].thumbnailPath_str;
		};
	
		self.onThumbnailLoadComplete = function(e){
			
			var iconType_str = parent.playlist_ar[self.countLoadedThumbs].iconType_str;
			var iconPath_str;
			if(iconType_str == FWDRLThumb.IMAGE){
				iconPath_str = parent.data.imageIconPath_str;
			}else if(iconType_str == FWDRLThumb.FLASH){
				iconPath_str = parent.data.flashIconPath_str;
			}else if(iconType_str == FWDRLThumb.AUDIO){
				iconPath_str = parent.data.audioIconPath_str;
			}else if(iconType_str == FWDRLThumb.VIDEO){
				iconPath_str = parent.data.videoIconPath_str;
			}else if(iconType_str == FWDRLThumb.VIMEO){
				iconPath_str = parent.data.vimeoIconPath_str;
			}else if(iconType_str == FWDRLThumb.YOUTUBE){
				iconPath_str = parent.data.youtubeIconPath_str;
			}else if(iconType_str == FWDRLThumb.MAPS){
				iconPath_str = parent.data.mapsIconPath_str;
			}else if(iconType_str == FWDRLThumb.AJAX){
				iconPath_str = parent.data.ajaxIconPath_str;
			}else if(iconType_str == FWDRLThumb.HTML){
				iconPath_str = parent.data.htmlIconPath_str;
			}else if(iconType_str == FWDRLThumb.IFRAME){
				iconPath_str = parent.data.iframeIconPath_str;
			}
			
			FWDRLThumb.setPrototype();
			var thumb = new FWDRLThumb(
					self,
					self.countLoadedThumbs, 
					self.thumbnailH,
					self.thumbnailsOffsetBottom,
					self.thumbnailsBorderSize,
					self.thumbnailsBorderRadius,
					self.thumbnailsOverlayOpacity,
					self.thumbnailsBorderNormalColor_str,
					self.thumbnailsBorderSelectedColor_str,
					self.thumbnailsOverlayColor_str,
					self.thumbnailsHoverEffect_str,
					iconPath_str,
					self.showThumbnailsOverlay_bl,
					self.showThumbnailsSmallIcon_bl);
			self.thumbs_ar[self.countLoadedThumbs] = thumb;
			thumb.addListener(FWDRLThumb.HOVER, self.thumbHoverHandler);
			thumb.addListener(FWDRLThumb.CLICK, self.thumbClickHandler);
			thumb.setImage(self.image_img);
			self.totalW += thumb.w + self.spaceBetweenThumbnails;
			if(self.countLoadedThumbs == self.totalThumbnails - 1) self.totalW -= self.spaceBetweenThumbnails;
			
			if(self.countLoadedThumbs !=0){
				thumb.setX(self.thumbs_ar[self.countLoadedThumbs - 1].x + self.thumbs_ar[self.countLoadedThumbs - 1].w + self.spaceBetweenThumbnails);
			}

			if(self.countLoadedThumbs == 0) self.thumbnailsHolder_do.setX(parseInt(self.stageWidth - thumb.w)/2);
		
			self.thumbnailsHolder_do.addChild(thumb);
			if(!self.isScrolling_bl && !self.areThumbnailTouched_bl)  self.positionThumbnails(true);
			if(self.totalW > parent.stageWidth 
			   && !self.areButtonsPositioned_bl
			   && parent.buttonsAlignment_str != FWDRL.BUTTONS_IN){
				parent.positionButtons(true);
				self.areButtonsPositioned_bl = true;
			}
			
			
			self.countLoadedThumbs++;
			self.loadWithDelayId_to = setTimeout(self.loadThumbnails, 100);	
		};
		
		self.stopToLoadThumbanils = function(){
			if(self.image_img){
				self.image_img.onload = null;
				self.image_img.onerror = null;
				self.image_img.src = "";
				self.image_img = null;
			}
			clearTimeout(self.loadWithDelayId_to);
		};
		
		self.thumbClickHandler = function(e){
			if(!parent.isShowed_bl)return;
			self.dispatchEvent(FWDRLThumb.CLICK, {id:e.id});
		};
		
		self.thumbHoverHandler = function(){
			if(!parent.isShowed_bl) return;
			self.addDesktopScrollSupport();
		};
		
		//#####################################//
		/* Position thumbnails */
		//#####################################//
		self.positionThumbnails = function(animate){
			if(!self.areThumbnailsCreated_bl && parent.showThumbnails_bl || self.isScrolling_bl) return;
			self.finalX;
			var curThumb = self.thumbs_ar[self.id];
			var lastCreateThumb = self.thumbs_ar[self.thumbs_ar.length - 1];
			
			if(self.totalW <= self.stageWidth){
				self.finalX = parseInt((self.stageWidth - self.totalW)/2);
			}else{
				if(curThumb){
					self.finalX = parseInt(-curThumb.x + (self.stageWidth - curThumb.w)/2);
				}else{
					self.finalX = parseInt(-lastCreateThumb.x + (self.stageWidth - lastCreateThumb.w)/2);
				}
				
				if(self.finalX > 0){
					self.finalX = 0;
				}else if(self.finalX < (self.stageWidth - self.totalW)){
					self.finalX = self.stageWidth - self.totalW;
				}
			}
			
			FWDAnimation.killTweensOf(self.thumbnailsHolder_do);
			if(animate){
				FWDAnimation.to(self.thumbnailsHolder_do, .7,{x:self.finalX, ease:Expo.easeOut});
			}else{
				self.thumbnailsHolder_do.setX(self.finalX);
			}
		};
		
		//#####################################//
		/* Add mobile scroll support */
		//#####################################//
		self.addMobileScrollSupport = function(){
			if(self.hasPointerEvent_bl){
				self.mainHolder_do.screen.addEventListener("pointerdown", self.scrollBarTouchStartHandler);
			}else{
				self.mainHolder_do.screen.addEventListener("touchstart", self.scrollBarTouchStartHandler);
			}
			self.mainHolder_do.screen.addEventListener("mousedown", self.scrollBarTouchStartHandler);
			self.updateMobileScrollBarId_int = setInterval(self.updateMobileScrollBar, 16);
		};
		
		self.removeMobileScrollSupport = function(){
			if(self.hasPointerEvent_bl){
				self.mainHolder_do.screen.removeEventListener("pointerdown", self.scrollBarTouchStartHandler);
				window.removeEventListener("pointerup", self.scrollBarTouchEndHandler);
				window.removeEventListener("pointermove", self.scrollBarTouchMoveHandler);
			}else{
				self.mainHolder_do.screen.removeEventListener("touchstart", self.scrollBarTouchStartHandler);
				window.removeEventListener("touchend", self.scrollBarTouchEndHandler);
				window.removeEventListener("touchmove", self.scrollBarTouchMoveHandler);
			}
			//self.mainHolder_do.screen.removeEventListener("mousedown", self.scrollBarTouchStartHandler);
			clearInterval(self.updateMobileScrollBarId_int);
			clearInterval(self.updateMoveMobileScrollbarId_int);
		};
		
		self.scrollBarTouchStartHandler = function(e){
			//if(e.preventDefault) e.preventDefault();
			if(self.stageWidth > self.totalW) return;
			
			var vmc = FWDRLUtils.getViewportMouseCoordinates(e);
			self.areThumbnailTouched_bl = true;
			
			FWDAnimation.killTweensOf(self.thumbnailsHolder_do);		
			self.isScrolling_bl = true;
			self.finalX = self.thumbnailsHolder_do.x;
			self.lastPresedX = vmc.screenX;
			
			if(self.hasPointerEvent_bl){
				window.addEventListener("pointerup", self.scrollBarTouchEndHandler);
				window.addEventListener("pointermove", self.scrollBarTouchMoveHandler);
			}else{
				window.addEventListener("touchend", self.scrollBarTouchEndHandler);
				window.addEventListener("touchmove", self.scrollBarTouchMoveHandler);
			}
			//window.addEventListener("mouseup", self.scrollBarTouchEndHandler);
			//window.addEventListener("mousemove", self.scrollBarTouchMoveHandler);
			clearInterval(self.updateMoveMobileScrollbarId_int);
			self.updateMoveMobileScrollbarId_int = setInterval(self.updateMoveMobileScrollbar, 16);
		};
		
		self.scrollBarTouchMoveHandler = function(e){
			if(e.preventDefault) e.preventDefault();
			if(self.stageWidth > self.totalW) return;
			var vmc = FWDRLUtils.getViewportMouseCoordinates(e);
			
			
			var toAdd = vmc.screenX - self.lastPresedX;
			self.finalX += toAdd;
			self.finalX = Math.round(self.finalX);
		
			self.lastPresedX = vmc.screenX;
			self.vx = toAdd  * 2;
			parent.showDisable();
		};
		
		self.scrollBarTouchEndHandler = function(e){
			self.isScrolling_bl = false;
			
			if(parent.hider.globalY < parent.stageHeight - self.stageHeight){
				self.areThumbnailTouched_bl = false;
			}
			
			clearInterval(self.updateMoveMobileScrollbarId_int);
			clearTimeout(self.disableOnMoveId_to);
			self.disableOnMoveId_to = setTimeout(function(){
				parent.hideDisable();
			},100);
			
			if(self.hasPointerEvent_bl){
				window.removeEventListener("pointerup", self.scrollBarTouchEndHandler);
				window.removeEventListener("pointermove", self.scrollBarTouchMoveHandler);
			}else{
				window.removeEventListener("touchend", self.scrollBarTouchEndHandler);
				window.removeEventListener("touchmove", self.scrollBarTouchMoveHandler);
			}
			//window.removeEventListener("mouseup", self.scrollBarTouchEndHandler);
			//window.removeEventListener("mousemove", self.scrollBarTouchMoveHandler);
		};
		
		self.updateMoveMobileScrollbar = function(){
			self.thumbnailsHolder_do.setX(self.finalX);
		};
		
		self.updateMobileScrollBar = function(animate){
			if(self.stageWidth > self.totalW
			  || self.finalX == self.prevX) return;
		
			if(!self.isScrolling_bl){
				self.vx *= self.friction;
				self.finalX += self.vx;	
				
				if(self.finalX > 0){
					self.vx2 = (0 - self.finalX) * .3;
					self.vx *= self.friction;
					self.finalX += self.vx2;
				}else if(self.finalX < self.stageWidth - self.totalW){
					self.vx2 = (self.stageWidth - self.totalW - self.finalX) * .3;
					self.vx *= self.friction;
					self.finalX += self.vx2;
				}
				
				self.finalX = Math.round(self.finalX);
				self.prevX = self.thumbnailsHolder_do.x;
				FWDAnimation.killTweensOf(self.thumbnailsHolder_do);
				FWDAnimation.to(self.thumbnailsHolder_do, .3,{x:self.finalX, ease:Expo.easeOut});
			}
		};
	
		
		//#####################################//
		/* Add desktop scroll support */
		//#####################################//
		self.addDesktopScrollSupport = function(){
			if(self.hasSupportForDesktopScroll_bl || self.totalW < self.stageWidth) return;
			self.hasSupportForDesktopScroll_bl = true;
			self.isScrolling_bl = true;
			
			if(window.addEventListener){
				window.addEventListener("mousemove", self.checkHitTest);
			}else if(document.attachEvent){
				document.detachEvent("onmousemove", self.checkHitTest);
				document.attachEvent("onmousemove", self.checkHitTest);
			}
		};
		
		self.removeDesktopScrollSupport = function(){
			if(!self.hasSupportForDesktopScroll_bl) return;
			self.hasSupportForDesktopScroll_bl = false;
			
			if(window.removeEventListener){
				window.removeEventListener("mousemove", self.checkHitTest);
			}else if(document.detachEvent){
				document.detachEvent("onmousemove", self.checkHitTest);
			}
		};
		
		self.checkHitTest = function(e){
			var vmc = FWDRLUtils.getViewportMouseCoordinates(e);
			self.scrollOnDesktop();
			if(parent.hider.globalY < parent.stageHeight - self.stageHeight){
				self.isScrolling_bl = false;
				self.removeDesktopScrollSupport();
				self.positionThumbnails(true);
			}
		};
		
		self.scrollOnDesktop = function(){
			var percent = (parent.hider.globalX - 100)/(self.stageWidth - 200);
			if(percent < 0){
				percent = 0;
			}else if(percent > 1){
				percent = 1;
			}
			
			self.finalX = parseInt((self.stageWidth - self.totalW) * percent);
			FWDAnimation.killTweensOf(self.thumbnailsHolder_do);
			FWDAnimation.to(self.thumbnailsHolder_do, .4,{x:self.finalX, ease:Expo.easeOut});
		};
		
		//#####################################//
		/* Disable / enable */
		//#####################################//
		self.disableOrEnableThumbnails = function(){
			self.id = parent.id;
			if(!self.thumbs_ar) return;
			var thumb;
			var totalThumbnails = self.thumbs_ar.length;
			for(var i=0; i<totalThumbnails; i++){
				thumb = self.thumbs_ar[i];
				if(i == parent.id){
					thumb.disable();
				}else{
					thumb.enable();
				}
			}
			self.positionThumbnails(true);
		};
		
		//#####################################//
		/* Destroy */
		//#####################################//
		self.destoryThumbnails = function(){
			if(!self.areThumbnailsCreated_bl && !self.thumbs_ar) return;
			self.areThumbnailsCreated_bl = false;
			self.areThumbnailTouched_bl = false;
			var thumb;
			var totalThumbnails = self.thumbs_ar.length;
			for(var i=0; i<totalThumbnails; i++){
				thumb = self.thumbs_ar[i];
				FWDAnimation.killTweensOf(thumb);
				self.thumbnailsHolder_do.removeChild(thumb);
				thumb.destroy();
			}
			self.thumbs_ar = null;
			self.totalW = 0;
			self.stopToLoadThumbanils();
			self.removeDesktopScrollSupport();
			if(self.isMobile_bl) self.removeMobileScrollSupport();
		};
		
		//#####################################//
		/* Show / hide */
		//#####################################//
		self.show = function(animate){
			self.isShowed_bl = true;
			FWDAnimation.killTweensOf(self.mainHolder_do);
			if(animate){
				FWDAnimation.to(self.mainHolder_do, .8, {y:-self.stageHeight, ease:Expo.easeInOut});
			}else{
				self.mainHolder_do.setY(-self.stageHeight);
			}
		};
		
		self.hide = function(animate){
			self.isShowed_bl = false;
			FWDAnimation.killTweensOf(self.mainHolder_do);
			if(animate){
				FWDAnimation.to(self.mainHolder_do, .8, {y:0, ease:Expo.easeInOut});
			}else{
				self.mainHolder_do.setY(0);
			}
		};
		
		self.hideForGood = function(){
			self.mainHolder_do.setY(-5000);
		};
		
		self.init();
	};
		
	/* set prototype */
	FWDRLThumbnailsManager.setPrototype = function(){
		FWDRLThumbnailsManager.prototype = new FWDRLDisplayObject("div", "relative");
	};
	
	FWDRLThumbnailsManager.prototype = null;
	window.FWDRLThumbnailsManager = FWDRLThumbnailsManager;
}(window));/* Slide show time manager */
(function(window){
	
	var FWDRLTimerManager = function(delay){
		
		var self = this;
		var prototpype = FWDRLTimerManager.prototype;
		
		this.timeOutId;
		this.delay = delay;
		this.isStopped_bl = true;
		
		self.stop = function(){
			if(self.isStopped_bl) return;
			self.pause();
			self.isStopped_bl = true;
			self.dispatchEvent(FWDRLTimerManager.STOP);
		};
		
		self.start = function(){
			if(!self.isStopped_bl) return;
			self.isStopped_bl = false;
			
			self.timeOutId = setTimeout(self.onTimeHanlder, self.delay);
			self.dispatchEvent(FWDRLTimerManager.START);
		};
		
		self.pause = function(){
			if(self.isStopped_bl) return;
			clearTimeout(self.timeOutId);
			self.dispatchEvent(FWDRLTimerManager.PAUSE);
		};
		
		self.resume = function(){
			if(self.isStopped_bl) return;
			clearTimeout(self.timeOutId);
			self.timeOutId = setTimeout(self.onTimeHanlder, self.delay);
			self.dispatchEvent(FWDRLTimerManager.RESUME);
		};
		
		self.onTimeHanlder = function(){
			self.dispatchEvent(FWDRLTimerManager.TIME);
		};
	};

	FWDRLTimerManager.setProtptype = function(){
		FWDRLTimerManager.prototype = new FWDRLEventDispatcher();
	};
	
	FWDRLTimerManager.START = "start";
	FWDRLTimerManager.STOP = "stop";
	FWDRLTimerManager.RESUME = "resume";
	FWDRLTimerManager.PAUSE = "pause";
	FWDRLTimerManager.TIME = "time";
	
	FWDRLTimerManager.prototype = null;
	window.FWDRLTimerManager = FWDRLTimerManager;
	
}(window));﻿/* Display object */
(function (window){
	/*
	 * @ type values: div, img.
	 * @ positon values: relative, absolute.
	 * @ positon values: hidden.
	 * @ display values: block, inline-block, this applies only if the position is relative.
	 */
	var FWDRLTransformDisplayObject = function(type, position, overflow, display){
		
		this.listeners = {events_ar:[]};
		var self = this;
		
		if(type == "div" || type == "img" || type == "canvas"){
			this.type = type;	
		}else{
			throw Error("Type is not valid! " + type);
		}
	
		this.children_ar = [];
		this.style;
		this.screen;
		this.numChildren;
		this.transform;
		this.position = position || "absolute";
		this.overflow = overflow || "hidden";
		this.display = display || "block";
		this.visible = true;
		this.buttonMode;
		this.x = 0;
		this.y = 0;	
		this.scale = 1;
		this.rotation = 0;
		this.w = 0;
		this.h = 0;
		this.rect;
		this.alpha = 1;
		this.innerHTML = "";
		this.opacityType = "";
		this.isHtml5_bl = false;
		
		this.hasTransform2d_bl = FWDRLUtils.hasTransform2d;
		
		//##############################//
		/* init */
		//#############################//
		this.init = function(){
			this.setScreen();
		};	
		
		//######################################//
		/* check if it supports transforms. */
		//######################################//
		this.getTransform = function() {
		    var properties = ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform'];
		    var p;
		    while (p = properties.shift()) {
		       if (typeof this.screen.style[p] !== 'undefined') {
		            return p;
		       }
		    }
		    return false;
		};
		
		//######################################//
		/* set opacity type */
		//######################################//
		this.getOpacityType = function(){
			var opacityType;
			if (typeof this.screen.style.opacity != "undefined") {//ie9+ 
				opacityType = "opacity";
			}else{ //ie8
				opacityType = "filter";
			}
			return opacityType;
		};
		
		//######################################//
		/* setup main screen */
		//######################################//
		this.setScreen = function(element){
			if(this.type == "img" && element){
				this.screen = element;
				this.setMainProperties();
			}else{
				this.screen = document.createElement(this.type);
				this.setMainProperties();
			}
		};
		
		//########################################//
		/* set main properties */
		//########################################//
		this.setMainProperties = function(){
			
			this.transform = this.getTransform();
			this.setPosition(this.position);
			//this.setDisplay(this.display);
			this.setOverflow(this.overflow);
			this.opacityType = this.getOpacityType();
			
			if(this.opacityType == "opacity") this.isHtml5_bl = true;
			
			if(self.opacityType == "filter") self.screen.style.filter = "inherit";
			
			this.screen.style.left = "0px";
			this.screen.style.top = "0px";
			this.screen.style.margin = "0px";
			this.screen.style.padding = "0px";
			this.screen.style.maxWidth = "none";
			this.screen.style.maxHeight = "none";
			this.screen.style.border = "none";
			this.screen.style.lineHeight = "1";
			this.screen.style.backgroundColor = "transparent";
			this.screen.style.backfaceVisibility = "hidden";
			this.screen.style.webkitBackfaceVisibility = "hidden";
			this.screen.style.MozBackfaceVisibility = "hidden";
			this.screen.style.MozImageRendering = "optimizeSpeed";	
			this.screen.style.WebkitImageRendering = "optimizeSpeed";
			self.screen.style.transition = "none";
			self.screen.style.webkitTransition = "none";
			self.screen.style.MozTransition = "none";
			self.screen.style.OTransition = "none";
			
			if(type == "img"){
				this.setWidth(this.screen.width);
				this.setHeight(this.screen.height);
				this.screen.onmousedown = function(e){return false;};
			}
			
			
		};
		
		self.setBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "visible";
			self.screen.style.webkitBackfaceVisibility = "visible";
			self.screen.style.MozBackfaceVisibility = "visible";		
		};
		
		self.removeBackfaceVisibility =  function(){
			self.screen.style.backfaceVisibility = "hidden";
			self.screen.style.webkitBackfaceVisibility = "hidden";
			self.screen.style.MozBackfaceVisibility = "hidden";		
		};
		
		//###################################################//
		/* set / get various peoperties.*/
		//###################################################//
		this.setSelectable = function(val){
			if(!val){
				try{this.screen.style.userSelect = "none";}catch(e){};
				try{this.screen.style.MozUserSelect = "none";}catch(e){};
				try{this.screen.style.webkitUserSelect = "none";}catch(e){};
				try{this.screen.style.khtmlUserSelect = "none";}catch(e){};
				try{this.screen.style.oUserSelect = "none";}catch(e){};
				try{this.screen.style.msUserSelect = "none";}catch(e){};
				try{this.screen.msUserSelect = "none";}catch(e){};
				this.screen.ondragstart = function(e){return  false;};
				this.screen.onselectstart = function(){return false;};
				this.screen.style.webkitTouchCallout='none';
			}
		};
		
		this.getScreen = function(){
			return self.screen;
		};
		
		this.setVisible = function(val){
			this.visible = val;
			if(this.visible == true){
				this.screen.style.visibility = "visible";
			}else{
				this.screen.style.visibility = "hidden";
			}
		};
		
		this.getVisible = function(){
			return this.visible;
		};
			
		this.setResizableSizeAfterParent = function(){
			this.screen.style.width = "100%";
			this.screen.style.height = "100%";
		};
		
		this.getStyle = function(){
			return this.screen.style;
		};
		
		this.setOverflow = function(val){
			self.overflow = val;
			self.screen.style.overflow = self.overflow;
		};
		
		this.setPosition = function(val){
			self.position = val;
			self.screen.style.position = self.position;
		};
		
		this.setDisplay = function(val){
			this.display = val;
			this.screen.style.display = this.display;
		};
		
		this.setButtonMode = function(val){
			this.buttonMode = val;
			if(this.buttonMode ==  true){
				this.screen.style.cursor = "pointer";
			}else{
				this.screen.style.cursor = "default";
			}
		};
		
		this.setBkColor = function(val){
			self.screen.style.backgroundColor = val;
		};
		
		this.setInnerHTML = function(val){
			self.innerHTML = val;
			self.screen.innerHTML = self.innerHTML;
		};
		
		this.getInnerHTML = function(){
			return self.innerHTML;
		};
		
		this.getRect = function(){
			return self.screen.getBoundingClientRect();
		};
		
		this.setAlpha = function(val){
			self.alpha = val;
			if(self.opacityType == "opacity"){
				self.screen.style.opacity = self.alpha;
			}else if(self.opacityType == "filter"){
				self.screen.style.filter = "alpha(opacity=" + self.alpha * 100 + ")";
				self.screen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Math.round(self.alpha * 100) + ")";
			}
		};
		
		this.getAlpha = function(){
			return self.alpha;
		};
		
		this.getRect = function(){
			return this.screen.getBoundingClientRect();
		};
		
		this.getGlobalX = function(){
			return this.getRect().left;
		};
		
		this.getGlobalY = function(){
			return this.getRect().top;
		};
		
		this.setX = function(val){
			self.x = val;
			if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + " , " + self.scale + ") rotate(" + self.rotation + "deg)";
			}else{
				self.screen.style.left = self.x + "px";
			}
		};
		
		this.getX = function(){
			return  self.x;
		};
		
		this.setY = function(val){
			self.y = val;
			if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + " , " + self.scale + ") rotate(" + self.rotation + "deg)";
			}else{
				self.screen.style.top = self.y + "px";
			}
		};
		
		this.getY = function(){
			return  self.y;
		};
		
		this.setScale2 = function(val){
			self.scale = val;
			if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + " , " + self.scale + ") rotate(" + self.rotation + "deg)";
			}
		};
		
		this.getScale = function(){
			return  self.scale;
		};
		
		this.setRotation = function(val){
			self.rotation = val;
			if(self.hasTransform2d_bl){
				self.screen.style[self.transform] = "translate(" + self.x + "px," + self.y + "px) scale(" + self.scale + " , " + self.scale + ") rotate(" + self.rotation + "deg)";
			}
		};
		
		this.setWidth = function(val){
			self.w = val;
			if(self.type == "img"){
				self.screen.width = self.w;
			}else{
				self.screen.style.width = self.w + "px";
			}
		};
		
		this.getWidth = function(){
			if(self.type == "div"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}else if(self.type == "img"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				if(self.screen.width != 0) return  self.screen.width;
				return self._w;
			}else if( self.type == "canvas"){
				if(self.screen.offsetWidth != 0) return  self.screen.offsetWidth;
				return self.w;
			}
		};
		
		this.setHeight = function(val){
			self.h = val;
			if(self.type == "img"){
				self.screen.height = self.h;
			}else{
				self.screen.style.height = self.h + "px";
			}
		};
		
		this.getHeight = function(){
			if(self.type == "div"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}else if(self.type == "img"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				if(self.screen.height != 0) return  self.screen.height;
				return self.h;
			}else if(self.type == "canvas"){
				if(self.screen.offsetHeight != 0) return  self.screen.offsetHeight;
				return self.h;
			}
		};
		
		this.getNumChildren = function(){
			return self.children_ar.length;
		};
		
		//#####################################//
		/* DOM list */
		//#####################################//
		this.addChild = function(e){
			if(this.contains(e)){	
				this.children_ar.splice(FWDRLUtils.indexOfArray(this.children_ar, e), 1);
				this.children_ar.push(e);
				this.screen.appendChild(e.screen);
			}else{
				this.children_ar.push(e);
				this.screen.appendChild(e.screen);
			}
		};
		
		this.removeChild = function(e){
			if(this.contains(e)){
				this.children_ar.splice(FWDRLUtils.indexOfArray(this.children_ar, e), 1);
				this.screen.removeChild(e.screen);
			}else{
				throw Error("##removeChild()## Child doesn't exist, it can't be removed!");
			};
		};
		
		this.contains = function(e){
			if(FWDRLUtils.indexOfArray(this.children_ar, e) == -1){
				return false;
			}else{
				return true;
			}
		};
		
		this.addChildAtZero = function(e){
			if(this.numChildren == 0){
				this.children_ar.push(e);
				this.screen.appendChild(e.screen);
			}else{
				this.screen.insertBefore(e.screen, this.children_ar[0].screen);
				if(this.contains(e)){this.children_ar.splice(FWDRLUtils.indexOfArray(this.children_ar, e), 1);}	
				this.children_ar.unshift(e);
			}
		};
		
		this.getChildAt = function(index){
			if(index < 0  || index > this.numChildren -1) throw Error("##getChildAt()## Index out of bounds!");
			if(this.numChildren == 0) throw Errror("##getChildAt## Child dose not exist!");
			return this.children_ar[index];
		};
		
		this.removeChildAtZero = function(){
			this.screen.removeChild(this.children_ar[0].screen);
			this.children_ar.shift();
		};
		
		//################################//
		/* event dispatcher */
		//#################################//
		this.addListener = function (type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function.");
	    	
	        var event = {};
	        event.type = type;
	        event.listener = listener;
	        event.target = this;
	        this.listeners.events_ar.push(event);
	    };
	    
	    this.dispatchEvent = function(type, props){
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this && this.listeners.events_ar[i].type === type){
	        		
	    	        if(props){
	    	        	for(var prop in props){
	    	        		this.listeners.events_ar[i][prop] = props[prop];
	    	        	}
	    	        }
	        		this.listeners.events_ar[i].listener.call(this, this.listeners.events_ar[i]);
	        		break;
	        	}
	        }
	    };
	    
	   this.removeListener = function(type, listener){
	    	
	    	if(type == undefined) throw Error("type is required.");
	    	if(typeof type === "object") throw Error("type must be of type String.");
	    	if(typeof listener != "function") throw Error("listener must be of type Function." + type);
	    	
	        for (var i=0, len=this.listeners.events_ar.length; i < len; i++){
	        	if(this.listeners.events_ar[i].target === this 
	        			&& this.listeners.events_ar[i].type === type
	        			&& this.listeners.events_ar[i].listener ===  listener
	        	){
	        		this.listeners.events_ar.splice(i,1);
	        		break;
	        	}
	        }  
	    };
	    
	    //###########################################//
	    /* destroy methods*/
	    //###########################################//
		this.disposeImage = function(){
			if(this.type == "img") this.screen.src = null;
		};
		
		
		this.destroy = function(){
			
			try{this.screen.parentNode.removeChild(this.screen);}catch(e){};
			
			this.screen.onselectstart = null;
			this.screen.ondragstart = null;
			this.screen.ontouchstart = null;
			this.screen.ontouchmove = null;
			this.screen.ontouchend = null;
			this.screen.onmouseover = null;
			this.screen.onmouseout = null;
			this.screen.onmouseup = null;
			this.screen.onmousedown = null;
			this.screen.onmousemove = null;
			this.screen.onclick = null;
			
			delete this.screen;
			delete this.style;
			delete this.rect;
			delete this.selectable;
			delete this.buttonMode;
			delete this.position;
			delete this.overflow;
			delete this.visible;
			delete this.innerHTML;
			delete this.numChildren;
			delete this.x;
			delete this.y;
			delete this.w;
			delete this.h;
			delete this.opacityType;
			delete this.isHtml5_bl;
			delete this.hasTransform2d_bl;

			this.children_ar = null;
			this.style = null;
			this.screen = null;
			this.numChildren = null;
			this.transform = null;
			this.position = null;
			this.overflow = null;
			this.display= null;
			this.visible= null;
			this.buttonMode = null;
			this.globalX = null;
			this.globalY = null;
			this.x = null;
			this.y = null;
			this.w = null;;
			this.h = null;;
			this.rect = null;
			this.alpha = null;
			this.innerHTML = null;
			this.opacityType = null;
			this.isHtml5_bl = null;
			this.hasTransform3d_bl = null;
			this.hasTransform2d_bl = null;
			self = null;
		};
		
	    /* init */
		this.init();
	};
	
	window.FWDRLTransformDisplayObject = FWDRLTransformDisplayObject;
}(window));
