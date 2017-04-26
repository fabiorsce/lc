package ro.fwd{
	
	import flash.display.Sprite;
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.display.StageScaleMode;
	import flash.display.StageAlign;
	import flash.external.ExternalInterface;
	import flash.system.System;
	import flash.system.Security;
	import flash.display.LoaderInfo;
	import flash.utils.setTimeout;
	
	
	public class Main extends MovieClip{
		
		private var _videoScreen:VideoScreen;
		private var _self;
		
		private var _bgshape:Sprite;
		private var _bkColor:uint;
		private var _instanceName_str:String = null;
		private var _sourcePath_str:String = null;
		
		private var _volume = 1;
		
		private var _addPausePlayClickSupport:Boolean = false;
		
		public function Main(){
			 Security.allowDomain("*");
    		 Security.allowInsecureDomain("*");
			 stage.scaleMode = StageScaleMode.NO_SCALE;
			 stage.align = StageAlign.TOP_LEFT;	
			 
			 _self = this;
			 
			 if(this.stage){
				 this.init();
			 }else{
				 addEventListener(Event.ADDED_TO_STAGE, init, false, 0, true);
			 }
		}
		
		private function init(){
			this.focusRect = false;
			this._instanceName_str = LoaderInfo(this.root.loaderInfo).parameters.instanceName;
			this._volume = Number(LoaderInfo(this.root.loaderInfo).parameters.volume);
			var tempColor = String(LoaderInfo(this.root.loaderInfo).parameters.bkColor_str);
			
			try{
				tempColor = "0x" + tempColor.substr(1);
				this._bkColor = uint(tempColor);
			}catch(e:Error){
				this._bkColor = 0;
			}
			this._bkColor = 0;
			
			stage.addEventListener(Event.RESIZE, onResize);
			
			this._bgshape = new Sprite();
			this._bgshape.graphics.beginFill(this._bkColor);
			this._bgshape.graphics.drawRect(0,0,stage.stageWidth, stage.stageHeight);
			addChildAt(this._bgshape, 0);
				
			//txt.text =  String(this._volume + " " + this._instanceName_str);
			//_videoScreen = new VideoScreen(.2);
			//this.setSource("http://www.webdesign-flash.ro/ht/rvp/start/content/videos/fwd.mp4")
			//this.playVideo();
			_self._videoScreen = new VideoScreen(this._volume);
			this.addChild(this._videoScreen);
			_self._videoScreen.addEventListener(VideoScreenEvent.START, _self.startHandler);
			_self._videoScreen.addEventListener(VideoScreenEvent.ERROR, _self.errorHandler);
			_self._videoScreen.addEventListener(VideoScreenEvent.STOP, _self.stopHandler);
			_self._videoScreen.addEventListener(VideoScreenEvent.SAFE_TO_SCRUBB, _self.safeToScrubbHandler);
			_self._videoScreen.addEventListener(VideoScreenEvent.PAUSE, _self.pauseHandler);
			_self._videoScreen.addEventListener(VideoScreenEvent.PLAY, _self.playHandler);
			_self._videoScreen.addEventListener(VideoScreenEvent.UPDATE_TIME, _self.updateTimeHandler);
			_self._videoScreen.addEventListener(VideoScreenEvent.UPDATE, _self.updateHandler);
			_self._videoScreen.addEventListener(VideoScreenEvent.LOAD_PROGRESS, _self.progressHandler);
			_self._videoScreen.addEventListener(VideoScreenEvent.STOP_TO_BUFFER, _self.stopToBufferHandler);
			_self._videoScreen.addEventListener(VideoScreenEvent.START_TO_BUFFER, _self.startToBufferHandler);
			_self._videoScreen.addEventListener(VideoScreenEvent.VIDEO_COMPLETE, _self.soundCompleteHandler)
	
			addExternalCallBacks();
			ExternalInterface.call(_self._instanceName_str + ".flashScreenIsReady");
		}
		
		private function onResize(e:Event){
			this._bgshape.width = stage.width + 1000;
			this._bgshape.height = stage.height;
			_videoScreen.positionAndResize();
		}
		
		private function addExternalCallBacks(){
			try{
				ExternalInterface.addCallback("playVideo", playVideo);
			}catch(e:Error){
				ExternalInterface.call(this._instanceName_str + ".flashScreenFail");
				return;
			}
	
			ExternalInterface.addCallback("pauseVideo", pauseVideo);
			ExternalInterface.addCallback("stopVideo", stopVideo);
			ExternalInterface.addCallback("setSource", setSource);
			ExternalInterface.addCallback("startToScrub", startToScrub);
			ExternalInterface.addCallback("stopToScrub", stopToScrub);
			ExternalInterface.addCallback("scrub", scrub);
			ExternalInterface.addCallback("replayVideo", replayVideo);
			ExternalInterface.addCallback("setVolume", setVolume);
			ExternalInterface.addCallback("isAudioPlaying", isAudioPlaying);
			ExternalInterface.addCallback("isVideoStopped", isVideoStopped);
			ExternalInterface.addCallback("togglePlayPause", togglePlayPause);
		}
		
		//###########################################//
		//API
		//###########################################//
		public function setSource(param){
			this._videoScreen.setSource(param);
		}
		
		public function playVideo(){
			this._videoScreen.play();
		}
		
		public function pauseVideo(){
			this._videoScreen.pause();
		}
		
		public function stopVideo(){
			this._videoScreen.stop();
		}
		
		public function startToScrub(){
			this._videoScreen.startToScrub();
		}
		
		public function stopToScrub():void{
			this._videoScreen.stopToScrub();
		}
		
		public function scrub(percent:Number){
			this._videoScreen.scrub(percent);
		}
		
		public function replayVideo(){
			this._videoScreen.replay();
		}
		
		public function setVolume(percent:Number){
			this._videoScreen.setVolume(percent);
		}
		
		public function isAudioPlaying():Boolean{
			return this._videoScreen.isPlaying_bl;
		}
		
		public function isVideoStopped():Boolean{
			return !this._videoScreen.isOpened_bl;
		}
		
		public function togglePlayPause():void{
			this._videoScreen.togglePlayPause();
		};
		
		//#############################################//
		//EVENT HANDLERS
		//#############################################//
		private function startHandler(e){
			ExternalInterface.call(this._instanceName_str + ".videoScreenSatrtHandler");
		}
		
		private function errorHandler(e){
			 ExternalInterface.call(this._instanceName_str + ".videoScreenErrorHandler", e.text);
		}
		
		private function updateTimeHandler(e){
			ExternalInterface.call(this._instanceName_str + ".videoScreenUpdateTimeHandler", e.text, e.text2);
		}
		
		private function updateHandler(e){
			ExternalInterface.call(this._instanceName_str + ".videoScreenUpdateHandler", e.nr);
		}
		
		private function progressHandler(e){
			ExternalInterface.call(this._instanceName_str + ".videoScreenLoadProgressHandler", e.nr);
		}
		
		private function safeToScrubbHandler(e){
			ExternalInterface.call(this._instanceName_str + ".videoScreenSafeToScrubbHandler");
		}
		
		private function stopHandler(e){
			ExternalInterface.call(this._instanceName_str + ".videoScreenStopHandler");
			ExternalInterface.call(this._instanceName_str + ".videoScreenUpdateTimeHandler", "00:00/00:00");
		}
	
		private function playHandler(e){
			ExternalInterface.call(this._instanceName_str + ".videoScreenPlayHandler");
		}
		
		private function pauseHandler(e){
			ExternalInterface.call(this._instanceName_str + ".videoScreenPauseHandler");
		}
		
		private function stopToBufferHandler(e){
			ExternalInterface.call(this._instanceName_str + ".videoScreenStopToBuferHandler");
		}
		
		private function startToBufferHandler(e){
			ExternalInterface.call(this._instanceName_str + ".videoScreenStartToBuferHandler");
		}
		
		private function soundCompleteHandler(e){
			ExternalInterface.call(this._instanceName_str + ".videoScreenPlayCompleteHandler");
		}
	}
}