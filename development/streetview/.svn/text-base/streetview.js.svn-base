function StreetView() {
	this._construct();
}
StreetView.CURLER = "http://flanvas.com/development/streetview/curler.php"
StreetView.prototype._construct = function() {
	StreetView.instance = this;
	
	this.panoram = this.addChild(new Panoram());
	this.panoram.panoid("6kh7I1glen4erUzLF3ApLQ");
	
	this.ui = this.addChild(new Loader());
	this.ui.x = 40;
	this.ui.y = 40;
	this.ui.contentLoaderInfo.addEventListener(Event.COMPLETE, function(event) {
		//
	})
	this.ui.load(new URLRequest("assets/ui.svg"));
	
	
	// destroy existing images. remove listeners and clear memory.
}
StreetView.extend(DisplayObjectContainer);

function Panoram() {
	this._construct();
}
/**
 * The bg panoram (low quality) needs to be this many pixels
 * bigger in order to make up with the high quality images
 */
Panoram.BG_WIDTH_DIFF = 500;
Panoram.IMAGE_COUNT_X = 7;
Panoram.IMAGE_COUNT_Y = 3;
Panoram.IMAGE_WIDTH = 512;
Panoram.IMAGE_HEIGHT = 512;
Panoram.prototype._construct = function() {
	Panoram.instance = this;
	
	this._bgImg = this.addChild(new Loader());
	this._degrees_horizontal = 0;
	this._degrees_vertical = 0;
	this._panoid = undefined;
	this._zoom = 3;
	
	this.clickProps = undefined;
	this.image_Data = [];
	
	// build image_Data array;
	for(var tx = 0; tx < Panoram.IMAGE_COUNT_X; ++tx) {
		var arr = [];
		for(var ty = 0; ty < Panoram.IMAGE_COUNT_Y; ++ty) {
			arr.push([]);
		}
		this.image_Data.push(arr);
	}
	
	this.degreesH(180);
	this.degreesV(180);
	
	this.addEventListener(Event.ENTER_FRAME, ptr.enterFrameHandler);
	this.addEventListener(MouseEvent.MOUSE_DOWN, ptr.mouseDownHandler);
}
Panoram.extend(DisplayObjectContainer);
/**
 * The whole panaramic picture is a bit over 360 degrees in view.
 * This gives an approximate width/height of the 360 panoramic (some width cut off).
 */
Panoram.prototype.centers = function() {
	var x, y;
	if(this.panoProps().width) x = 0 - (this.panoProps().width / 2 - stage.stageWidth() / 2);
		else x = 0;
	if(this.panoProps().height) y = 0 - (this.panoProps().height / 2 - stage.stageHeight() / 2);
		else y = 0;
	
	return {'x':x,'y':y}
}
Panoram.prototype.panoProps = function() {
	var o = {};
	
	var w_cut = 260, h_cut = 0;
	o.width = Panoram.IMAGE_COUNT_X * Panoram.IMAGE_WIDTH - w_cut;
	o.height = Panoram.IMAGE_COUNT_Y * Panoram.IMAGE_HEIGHT - h_cut;
	
	return o;
}
Panoram.prototype.degreesH = function(val) {
	if(!isNaN(val)) {
		while(val < 0) val = 360 + val;
		this._degrees_horizontal = val % 360;
		
		var x = (stage.stageWidth() * 0.5) - this._degrees_horizontal / 360 * this.panoProps().width;
		this.x = x;
	}
	
	trace(this._degrees_horizontal, true);
	return this._degrees_horizontal;
}
Panoram.prototype.degreesV = function(val) {
	if(!isNaN(val)) {
		if(val < 0) val = 0;
		if(val > 360) val = 360;
		this._degrees_vertical = val;
		
		var y = (stage.stageHeight() * 0.5) - this._degrees_vertical / 360 * this.panoProps().height;
		this.y = y;
	}
	
	return this._degrees_vertical;
}
Panoram.prototype.enterFrameHandler = function(event) {
	event.target.imageRollCall();
}
/**
 * quiz the image objects to see if they have been loaded yet.
 * If an image has been loaded then don't do anything.
 * If an image has not been loaded, load it and display it.
 */
Panoram.prototype.imageRollCall = function() {
	for(var x in this.image_Data) {
		for(var y in this.image_Data[x]) {
			if(!this.image_Data[x][y].url) this.image_Data[x][y] = this.addChild(new PanoramImage(this, x, y));
			if(!this.image_Data[x][y].active && this.image_Data[x][y].isInView()) {
				this.image_Data[x][y].selfLoad();
			}
			this.image_Data[x][y].dynamicMove();
		}
	}
}
Panoram.prototype.mouseDownHandler = function(event) {
	Panoram.instance.saveClickProps();
	stage.addEventListener(MouseEvent.MOUSE_MOVE, Panoram.instance.mouseMoveHandler);
	stage.addEventListener(MouseEvent.MOUSE_UP, Panoram.instance.mouseUpHandler);
}
Panoram.prototype.mouseMoveHandler = function(event) {
	var xd = Panoram.instance.clickProps.x + (stage.mouseX() - Panoram.instance.clickProps.mouse_x);
	var yd = Panoram.instance.clickProps.y + (stage.mouseY() - Panoram.instance.clickProps.mouse_y);
	Panoram.instance.translateXY(xd, yd);
}
Panoram.prototype.mouseUpHandler = function(event) {
	stage.removeEventListener(MouseEvent.MOUSE_MOVE, Panoram.instance.mouseMoveHandler);
	stage.removeEventListener(MouseEvent.MOUSE_UP, Panoram.instance.mouseUpHandler);
}
Panoram.prototype.panoid = function(val) {
	if(val !== undefined) {
		this._panoid = val;
		this.updateBgImg();
	}
	return this._panoid;
}
Panoram.prototype.saveClickProps = function() {
	Panoram.instance.clickProps = {
		'x':Panoram.instance.x,
		'y':Panoram.instance.y,
		'mouse_x':stage.mouseX(),
		'mouse_y':stage.mouseY(),
		'degrees_h':Panoram.instance.degreesH(),
		'degrees_v':Panoram.instance.degreesV()
	};
}
/**
 * convert x/y to degrees and assign values to degree funcs
 */
Panoram.prototype.translateXY = function(x, y) {
	//var h = ((this.x + x) - this.centers().x) / this.centers().x * Math.PI - (Math.PI / 2);
	
	// first, figure out the percentage of how far we are in to the picture.
	var h = (x - stage.stageWidth() * 0.5) / this.panoProps().width * -360;
	//var h = (x / this.centers().x) * 180;
	//trace(h);
	//var v = (y / this.centers().y) * 180;
	var v = (y - stage.stageHeight() * 0.5) / this.panoProps().height * -360;
	
	this.degreesH(h);
	this.degreesV(v);
}
Panoram.prototype.updateBgImg = function() {
	var url = StreetView.CURLER + "?url=http://cbk1.google.com/cbk%3Foutput=tile%26zoom=0%26x=0%26y=0%26cb_client=maps_sv%26fover=2%26onerr=3%26v=4";
	url += "%26panoid=" + this._panoid;
	
	var ptr = this;
	this._bgImg.contentLoaderInfo.addEventListener(Event.COMPLETE, function(event) {
		ptr._bgImg.width(Panoram.IMAGE_COUNT_X * Panoram.IMAGE_WIDTH + Panoram.BG_WIDTH_DIFF);
		ptr._bgImg.scaleY(ptr._bgImg.scaleX());
	});
	this._bgImg.load(new URLRequest(url));
}
Panoram.prototype.zoom = function(val) {
	if(val !== undefined) {
		this._zoom = val;
	}
	return this._zoom;
}

/**
 * There are several "sub" images to each Panoram. Each image
 * is contained by a PanoramImage class
 */
function PanoramImage(panoramObj, id_x, id_y) {
	this._construct(panoramObj, id_x, id_y);
}
PanoramImage.prototype._construct = function(panoramObj, id_x, id_y) {
	// set to active as SOON as you start loading.
	this.active = false;
	this.id_x = id_x;
	this.id_y = id_y;
	this.url = StreetView.CURLER + "?url=http://cbk2.google.com/cbk%3Foutput=tile%26zoom="+panoramObj.zoom()+"%26x="+this.id_x+"%26y="+this.id_y+"%26cb_client=maps_sv%26fover=2%26onerr=3%26v=4%26panoid="+panoramObj.panoid();
	
	this.default_x = id_x * Panoram.IMAGE_WIDTH;
	this.default_y = id_y * Panoram.IMAGE_HEIGHT;
	this.x = this.default_x;
	this.y = this.default_y;
}
PanoramImage.extend(Loader);
/** 
 * some images need to be dynamically moved around to make sure
 * there are no white spaces. This adds the feel that you are looking
 * at a continuous image.
 * eg. when you are at 0 horiz degree there will be white space
 * on the left side. the images near 360 need to dynamically move
 * to be right next to 0.
 */
PanoramImage.prototype.dynamicMove = function() {
	this.x = this.default_x;
	
	var spread;
	if(Panoram.instance.degreesH() < 180) {
		spread = stage.stageWidth() + stage.stageWidth() / 2;
		if(this.default_x > Panoram.instance.panoProps().width - spread) {
			this.x = this.default_x - Panoram.instance.panoProps().width;
		}
	} else if(Panoram.instance.degreesH() > 180) {
		spread = stage.stageWidth() / 2;
		if(this.default_x < 0 + spread) {
			this.x = this.default_x + Panoram.instance.panoProps().width;
		}
	}
}
PanoramImage.prototype.isInView = function() {
	if(this.parent) {
		var bool_x = ((this.parent.x + this.x >= 0) && (this.parent.x + this.x < stage.stageWidth()));
		var bool_w = ((this.parent.x + this.x + Panoram.IMAGE_WIDTH >= 0) && (this.parent.x + this.x + Panoram.IMAGE_WIDTH < stage.stageWidth()));
		var bool_y = ((this.parent.y + this.y >= 0) && (this.parent.y + this.y < stage.stageHeight()));
		var bool_h = ((this.parent.y + this.y + Panoram.IMAGE_HEIGHT >= 0) && (this.parent.y + this.y + Panoram.IMAGE_HEIGHT < stage.stageHeight()));
		
		//if(bool_x && bool_y) {
		if((bool_x || bool_w) && (bool_y || bool_h)) {
			return true;
		}
	}
	
	return false;
}
PanoramImage.prototype.selfLoad = function() {
	this.active = true;
	
	//this.alpha(0.5);
	this.load(new URLRequest(this.url));
}
