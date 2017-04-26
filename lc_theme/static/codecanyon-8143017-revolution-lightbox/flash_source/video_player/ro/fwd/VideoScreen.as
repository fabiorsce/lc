package ro.fwd{
	
	import flash.display.Sprite;
	import flash.net.URLRequest;	
	import flash.media.SoundTransform;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.utils.setInterval;
	import flash.utils.clearInterval;
	import flash.media.Video;
	import flash.net.NetStream;
	import flash.net.NetConnection;
	import flash.utils.Timer;
	import flash.events.NetStatusEvent;
	import flash.events.TimerEvent;
	import flash.events.MouseEvent;

	public class VideoScreen extends Sprite {
		
		private var _self:VideoScreen;
		
		private var _channel
		
		private var _ns:NetStream;
		private var _nc:NetConnection;
		private var _client:Object;
		private var _video:Video;
		private var _soundTransform:SoundTransform;
		private var _checkVideoDimmensions_tm:Timer;
		private var _checkLoadingTimer:Timer;
		private var _updateTimer:Timer;
		
		public var sourcePath_str = null;
		
		public var volume:Number=0;//the curretn volume
		private var _percentPlayed:Number;
		private var _position:Number;
		private var _duration:Number;
		private var _percentLoaded:Number;
		private var _videoW:Number;
		private var _videoH:Number;
		private var _lastScrubbedLocation:Number;
		
		private var _checkVideoDimmensionsId_int:int;
		private var _updateUpdateId_int:int;
		private var _updateProgressId_int:int;
		private var _safeToBeControllerId_int:int;
		
		public var dispatchSafeToUpdateVolume_bl:Boolean = false;
		public var isPlaying_bl:Boolean=false
		public var isOpened_bl:Boolean = false;
		private var _allowScrubing_bl:Boolean = false;//used for allowing the scrubbing
		private var _hasError_bl:Boolean = false;
		private var _isStartEventDispatched_bl:Boolean = false;
		
		//constructor
		public function VideoScreen(volume:Number =0) {
			_self = this;
			this.volume = volume;
			this.createNetConnections();
			this.setupSoundTransform();
			this.setupCheckLoadingProgressTimer();
			this.setupCheckVideoDimmensionsTimer();
			this.setupUpdateTimer();
		}
		
		//#################################################//
		/* Position and resize */
		//#################################################//
		public function positionAndResize():void{
			if(_video == null) return;
			if(stage == null) return;
						var scaleX:Number = stage.stageWidth/this._videoW;
			var scaleY:Number = stage.stageHeight/this._videoH;
			var totalScale:Number;
			
			if(scaleX <= scaleY){
				totalScale = scaleX;
			}else if(scaleX > scaleY){
				totalScale = scaleY;
			}
			
			this._video.width = ( this._videoW * totalScale);
			this._video.height = ( this._videoH * totalScale);
			this._video.x = Math.round((stage.stageWidth - this._video.width)/2); 
			this._video.y = Math.round((stage.stageHeight - this._video.height)/2); 
		}
		
		//#################################################//
		// Net stream and net connections 
		//#################################################//
		private function createNetConnections():void{
			this._nc =  new NetConnection();
			this._nc.connect(null);
		}
		
		private function createNetStream():void{
			if(this._ns != null){
				try{this._ns.close()}catch(e:Error){};
				this._ns.removeEventListener(NetStatusEvent.NET_STATUS, onNetStatus);
				this._ns = null;
			}
			this._ns =  new NetStream(_nc);
			this._ns.addEventListener(NetStatusEvent.NET_STATUS, onNetStatus);
		}
		
		/** @description When data is recived from the _ns we dispach some events and set the current state. */
		private function onNetStatus(e:NetStatusEvent):void{
			//trace(e.info.code);
			var messageError:String;
			if(e.info.code == "NetStream.Play.StreamNotFound"){
				this._hasError_bl = true;
				messageError = "Source not found <font color='#FFFFFF'>" + this.sourcePath_str + "</font>" + e.info.code;
				this.cleanEventsAndIntervals();
				this.dispatchEvent(new VideoScreenEvent(VideoScreenEvent.ERROR, messageError));
			}else if(e.info.code == "NetStream.Play.Failed"){
				this._hasError_bl = true;
				messageError = "<font color='#FF0000'>Something is wrong! -- NetStream.Play.Failed --<br></font>" + e.info.code;
				this.cleanEventsAndIntervals();
				this.dispatchEvent(new VideoScreenEvent(VideoScreenEvent.ERROR, messageError));
			}else if(e.info.code == "NetStream.Play.FileStructureInvalid"){
				this._hasError_bl = true;
				messageError = "<font color='#FF0000'>SOMETHING IS WRONG.<br> -- NetStream.Play.FileStructureInvalid -- </font>" + e.info.code;
				this.cleanEventsAndIntervals();
				this.dispatchEvent(new VideoScreenEvent(VideoScreenEvent.ERROR, messageError));
			}else if (e.info.code  == "NetStream.Buffer.Full") {
				dispatchEvent(new VideoScreenEvent(VideoScreenEvent.STOP_TO_BUFFER));
				//dispatchEvent(new VideoScreenEvent(VideoScreenEvent.PLAY));
				this.isPlaying_bl = true;
			}else if (e.info.code  == "NetStream.Buffer.Empty") {
				if(this.isPlaying_bl && !this._allowScrubing_bl){
					dispatchEvent(new VideoScreenEvent(VideoScreenEvent.START_TO_BUFFER));
				}
			}else if(e.info.code  == "NetStream.Seek.Notify"){	
				if(this.isPlaying_bl && !this._allowScrubing_bl){
					dispatchEvent(new VideoScreenEvent(VideoScreenEvent.START_TO_BUFFER));
				}
			}else if(e.info.code  == "NetStream.Seek.InvalidTime"){	
				dispatchEvent(new VideoScreenEvent(VideoScreenEvent.START_TO_BUFFER));
			}else if(e.info.code  == "NetStream.Play.Start"){	
				this.startToCheckVideoDimmension();
			}else if (e.info.code  == "NetStream.Play.Stop") {
				if(!this._hasError_bl){
				 	dispatchEvent(new VideoScreenEvent(VideoScreenEvent.VIDEO_COMPLETE));
				}
				dispatchEvent(new VideoScreenEvent(VideoScreenEvent.STOP_TO_BUFFER));
			}
		}
		
		//###################################//
		//Setup meta data.
		//###################################//
		private function createMetadata():void{
			this._client = null;
			this._client =  new Object();
			this._client.onMetaData = setData;
			this._ns.client = this._client;
		}

		private function setData(obj:Object):void {
			//trace("METADATA video visible " + _video.visible);
			this._duration = obj.duration;
		}
		
		//###################################//
		//Setup sound transform.
		//###################################//
		private function setupSoundTransform():void{
		  this._soundTransform = new SoundTransform();
		}
		
		
		//########################################//
		// Setup video
		//########################################//
		private function setupVideo():void{
			this.stop();
			this.createNetStream();
			this.createMetadata();
			this.createVideo();
			this.setVolume(this.volume);
			this.stopToCheckLoadingProgress();
			this.stopToCheckUpdateTimer();
			this._ns.play(this.sourcePath_str);
		}
		
		//#########################################################################//
		/* Check video width */
		//#########################################################################//
		private function setupCheckVideoDimmensionsTimer():void{
			_checkVideoDimmensions_tm =  new Timer(100,0);
		}
	
		private function startToCheckVideoDimmension():void{
			_checkVideoDimmensions_tm.addEventListener(TimerEvent.TIMER,checkVideoWidthAndHeight);
			_checkVideoDimmensions_tm.start();
		}
		
		private function stopToCheckVideoDimmension():void{
			_checkVideoDimmensions_tm.removeEventListener(TimerEvent.TIMER,checkVideoWidthAndHeight);
			_checkVideoDimmensions_tm.stop();
		}
	
		private function checkVideoWidthAndHeight(e:TimerEvent):void{
			
			if(this._video.videoWidth == 0 || this._video.videoHeight == 0) return;
			
			this._videoW = this._video.videoWidth;
			this._videoH  = this._video.videoHeight;
			this._video.width = this._videoW;
			this._video.height = this._videoH;
			this.isOpened_bl = true;
			this.visible = true;
			
			this.positionAndResize();	
			this.stopToCheckVideoDimmension();
			this.startToCheckLoadingProgress();
			this.startToCheckUpdateTimer();	
			
			dispatchEvent(new VideoScreenEvent(VideoScreenEvent.PLAY));
			this.dispatchEvent(new VideoScreenEvent(VideoScreenEvent.SAFE_TO_SCRUBB));
			this.dispatchEvent(new VideoScreenEvent(VideoScreenEvent.STOP_TO_BUFFER));
			this.dispatchEvent(new VideoScreenEvent(VideoScreenEvent.SAFE_TO_UPDATE_VOLUME));
		}
		
		//################################################//
		/* Check progress */
		//#################################################//
		private function setupCheckLoadingProgressTimer():void{
			_checkLoadingTimer =  new Timer(500,0);
		}
		
		private function startToCheckLoadingProgress():void{
			_checkLoadingTimer.addEventListener(TimerEvent.TIMER,checkLoadingProgress);
			_checkLoadingTimer.start();
		}
		
		private function stopToCheckLoadingProgress():void{
			_checkLoadingTimer.removeEventListener(TimerEvent.TIMER,checkLoadingProgress);
			_checkLoadingTimer.stop();
		}
		
		private function checkLoadingProgress(e:TimerEvent):void{	
			this._percentLoaded = this._ns.bytesLoaded/this._ns.bytesTotal;
			if(this._percentLoaded == 1){
				this..stopToCheckLoadingProgress();
			}
			trace(_percentLoaded);
			this.dispatchEvent(new VideoScreenEvent(VideoScreenEvent.LOAD_PROGRESS, "", "", this._percentLoaded));
		}
		
		//################################################//
		/* Check updates */
		//#################################################//
		private function setupUpdateTimer():void{
			_updateTimer =  new Timer(500,0);
		}
		
		private function startToCheckUpdateTimer():void{
			_updateTimer.addEventListener(TimerEvent.TIMER, checkUpdateTimer);
			_updateTimer.start();
		}
		
		private function stopToCheckUpdateTimer():void{
			_updateTimer.stop();
			_updateTimer.removeEventListener(TimerEvent.TIMER, checkUpdateTimer);
		}
		
		private function checkUpdateTimer(e:TimerEvent):void {
			if(isNaN(this._ns.time) || isNaN(this._duration)) return;
			this._percentPlayed = this._ns.time /this._duration;
			if (!this._allowScrubing_bl) {
				dispatchEvent(new VideoScreenEvent(VideoScreenEvent.UPDATE,"" , "", this._percentPlayed));
			}
			
			var curTime =  String(_self.formatTime(this._ns.time));
			var totalTime =  String(_self.formatTime(this._duration));
			
			this.dispatchEvent(new VideoScreenEvent(VideoScreenEvent.UPDATE_TIME, curTime, totalTime));
		}
		
		//##############################################//
		/* Create /  destroy video. */
		//##############################################//
		private function createVideo():void{
			this._video =  new Video();
		   	//this._video.smoothing = true;
		   
			this._video.attachNetStream(this._ns);
			this.addChild(this._video);
		}
		
		private function destroyVideo():void{
			try{
				this.removeChild(_video);
				this._video.clear();
			}catch(e:Error){}	
			
			try{
				this._ns.close();
			}catch(e:Error){}	
			
			this._video = null;
		}
		
		
		//#############################################//
		//Public methods
		//#############################################//
		public function setSource(sourcePath:String){
			this._hasError_bl = false;
			this.sourcePath_str = sourcePath;
			this.stop();
		};
		
		public function pause():void{
			if(!this.isPlaying_bl || this.isOpened_bl == false || this._hasError_bl) return;
			this.stopToCheckUpdateTimer();
			this._ns.pause();
			this.isPlaying_bl = false;
			dispatchEvent(new VideoScreenEvent(VideoScreenEvent.PAUSE));
		}
		
		public function stop(){
			this.dispatchEvent(new VideoScreenEvent(VideoScreenEvent.UPDATE_TIME, "00:00", "00:00"));
			this.dispatchEvent(new VideoScreenEvent(VideoScreenEvent.LOAD_PROGRESS, "", "", 0));
			this.dispatchEvent(new VideoScreenEvent(VideoScreenEvent.STOP));
			if(this._video == null) return;
			this.isPlaying_bl = false;
			this.isOpened_bl = false;
			this._allowScrubing_bl = false;
			this.isPlaying_bl = false;
			this._allowScrubing_bl = false;
			this._videoW = 0;
			this._videoH = 0;
			this._percentLoaded = 0;
			this.visible = false;
			this.destroyVideo();
			this.cleanEventsAndIntervals();
		};
		
		public function play():void{
			if(this._video == null){
				this.setupVideo();
			}else{
				if(this.isPlaying_bl == true || this.isOpened_bl == false) return;
				this.isPlaying_bl = true;
				this._ns.resume();
				this.startToCheckUpdateTimer();	
				dispatchEvent(new VideoScreenEvent(VideoScreenEvent.PLAY));
			}
		}
		
		public function startToScrub():void{
			if(this._video == null) return;
			this._ns.pause();
			this._ns.seek(this._lastScrubbedLocation);
			this._allowScrubing_bl = true;
		}
		
		public function stopToScrub():void{
			if(this._video == null) return;
			this._ns.seek(this._lastScrubbedLocation);
			if(this.isPlaying_bl){
				this._ns.resume();
				this.startToCheckUpdateTimer();	
				if(!this.isOpened_bl) dispatchEvent(new VideoScreenEvent(VideoScreenEvent.PLAY));
			}
			this._allowScrubing_bl = false;
		}
		
		public function scrub(percent:Number=0):void{
			if(this._video == null) return;
			this._lastScrubbedLocation = percent * this._duration;
			_ns.seek(this._lastScrubbedLocation);
		}
		
		public function replay():void{
			if(this._video == null || !this.isOpened_bl) return;
			this._ns.seek(0);
			this._ns.resume();
		}
		
		//##########################################//
		//set volume
		//##########################################//
		public function setVolume(vol:Number):void{
			this.volume = vol;
			if(this._soundTransform == null || this._ns == null) return;
			this._soundTransform.volume = this.volume;
			this._ns.soundTransform = _soundTransform;
		}
		
		public function togglePlayPause(e:MouseEvent = null):void{
			if(!this.isOpened_bl) return;
			if(this.isPlaying_bl){
				this.pause();
			}else{
				this.play();
			}	
		}
		
		//#############################################//
		// Fromat time
		//#############################################//
		public function formatTime(seconds){
			var hours = Math.floor(seconds / (60 * 60));
			
		    var divisor_for_minutes = seconds % (60 * 60);
		    var minutes = Math.floor(divisor_for_minutes / 60);

		    var divisor_for_seconds = divisor_for_minutes % 60;
		    var seconds = Math.ceil(divisor_for_seconds);
		    
		    minutes = (minutes >= 10) ? minutes : "0" + minutes;
		    seconds = (seconds >= 10) ? seconds : "0" + seconds;
			
			if(hours > 0){
				 return hours + ":" + minutes + ":" + seconds;
			}else{
				 return minutes + ":" + seconds;
			}
		};
		
		//###############################################//
		//clean all
		//###############################################//
		private function cleanEventsAndIntervals(){
			this.stopToCheckLoadingProgress();
			this.stopToCheckUpdateTimer();
			this.stopToCheckVideoDimmension();
		};
	}
}