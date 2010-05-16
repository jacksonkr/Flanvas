/**
 * Copyright (c) 2010 Jackson Rollins <rollins.jackson@gmail.com>
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE. 
 * 
 * Except as contained in this notice, the name(s) of the above 
 * copyright holders shall not be used in advertising or otherwise 
 * to promote the sale, use or other dealings in this Software 
 * without prior written authorization.
 *
 /*
 
/**
 * NOTES
 *
 * 1) Inheritence effected my layout in such that the classes
 * below are not necessarily in alphabetical order
 *
 * 2) I wrote the inheritance for this project (basically a collection
 * of several I found on the web) so it may be a bit messy. 
 * 
 * 3) Please email me to update the documentation where it sucks.
 *
 */

/**
 * Recieved ideas for inheritence from the web (google)
 */
Function.prototype.extend = function(c) {
	var funcToStr = function(str) {
		var head = String(str);
		head = head.substr(0, head.indexOf('\n'));
		head = head.substr(head.indexOf('(') + 1);
		head = head.substr(0, head.lastIndexOf(')'));
		
		var bod = String(str);
		bod = bod.substr(bod.indexOf('\n') + 1);
		bod = bod.substr(0, bod.lastIndexOf('}'));
		return {"head":head, "str":bod};
	}
	
	if(c.name != "Object") {
		var f1 = funcToStr(c.prototype._construct);
		var f2 = funcToStr(this.prototype._construct);
		
		var h = f2.head || f1.head;
		
		eval('this.prototype._construct = function('+f2.head+') {\n'+f1.str+f2.str+'}');
	}
	
	var old = this.prototype;
	
	for(var i in c.prototype) {
		if(i != "_construct") this.prototype[i] = c.prototype[i];
	}
	//this.prototype.super = c;
	this.prototype.constructor = old.constructor;
	
	this.prototype.toString = function() {
		return "[Object " + this.constructor.name + "]";
	}
}

/////////////////
//// CLASSES ////
/////////////////

/**
 * BitmapData Class
 */
function BitmapData(width, height, transparent, fillColor) {
	this._construct(width, height, transparent, fillColor);
}
BitmapData.prototype._construct = function(width, height, transparent, fillColor) {
	this._alpha = 1.0;
	this._imageData = undefined;
	this._source = undefined;
}
BitmapData.extend(Object);
BitmapData.prototype.alpha = function(val) {
	if((val !== undefined) && (val != this._alpha)) {
		this._alpha = val;
		var spread = 4;
		for(var i = 0; i < this._imageData.data.length / spread; ++i) {
			this._imageData.data[i*spread + 3] = this._alpha * 255;
		}
	}
	
	return this._alpha;
}
BitmapData.prototype.draw = function(source) {
	this._source = source;
	var ctx = stage.ctx();
	if(source instanceof HTMLImageElement) {
		/*
		ctx.save();
		ctx.drawImage(source, 0, 0);
		ctx.restore();
		this._source = ctx.getImageData(source.x, source.y, source.width, source.height); 
		*/
		this._source = source;
	}
	this._imageData = this._source;
}
BitmapData.prototype.height = function(val) {
	if(val !== undefined) {
		// modify scaleX
	}
	
	if(this._imageData) return this._imageData.height;
	return 0;
}
BitmapData.prototype.width = function(val) {
	if(val !== undefined) {
		// modify scaleX
	}
	
	if(this._imageData) return this._imageData.width;
	return 0;
}

/**
 * CapStyle Class
 */
var CapStyle = {};
CapStyle.BUTT = "butt";
CapStyle.NONE = CapStyle.BUTT;
CapStyle.ROUND = "round";
CapStyle.SQUARE = "square";

/** 
 * JointStyle Class
 */
var JointStyle = {};
JointStyle.MITER = "miter";
JointStyle.ROUND = "round";
JointStyle.BEVEL = "bevel";

/**
 * Rect Class
 */
function Rectangle(x, y, width, height) {
	this._construct(x, y, width, height);
}
Rectangle.prototype._construct = function(x, y, width, height) {
	if(x === undefined) x = 0;
	if(y === undefined) y = 0;
	if(width === undefined) width = 0;
	if(height === undefined) height = 0;
	
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}
Rectangle.extend(Object);

/**
 * EventDispatcher Class
 * Have to declare this class out of order because it's the top level custom class :(
 */
function EventDispatcher() {
	this._construct();
}
EventDispatcher.prototype._construct = function() {
	this._interval_id = undefined;
	this._listeners = [];
	
	var ptr = this;
	if(_f) _f.intervalManager.addEventListener(Event.ENTER_FRAME, function(event) {
		ptr.dispatchEvent(new Event(Event.ENTER_FRAME));
	});
}
EventDispatcher.extend(Object);
EventDispatcher.prototype.addEventListener = function(type, func) {
	//"target":EventDispatcher.prototype.addEventListener.callee
	
	// check for duplicate listeners
	for(var i = 0; i < this._listeners.length; ++i) {
		var evt = this._listeners[i];
		if(evt.type == type && evt.func == func) return null;
	}
	this._listeners.push({"type":type, "func":func, "target":this});
}
EventDispatcher.prototype.dispatchEvent = function(event) {
	if(!event.target) event.target = this;
	
	for(var i in this._listeners) {
		var listener = this._listeners[i];
		
		if((listener.type == event.type) && (listener.target == this)) {
			//listener.func(listener);
			//event.target = listener.target;
			
			event.currentTarget = this;
			listener.func(event);
		}
	}
	
	// fire bubbling events AFTER the original event has been fired.
	if(event.bubbles) {
		if(listener.target.parent) listener.target.parent.dispatchEvent(event);
	}
}
EventDispatcher.prototype.removeEventListener = function(type, func) {
	for(var i = 0; i < this._listeners.length; ++i) {
		var obj = this._listeners[i]
		if((obj.type == type) && (obj.func == func)) {
			this._listeners.splice(i, 1);
			return 0;
		}
	}
	return 1;
}

/**
 * DisplayObject
 */
function DisplayObject() {
	this._construct();
}
DisplayObject.prototype._construct = function() {
	this._alpha = 1.0;
	this._contested_height = undefined;
	this._contested_width = undefined;
	this._scale_x = 1.0;
	this._scale_y = 1.0;
	
	this.name = _f.genId();
	this.parent = undefined;
	this.root = undefined;
	this.rotation = 0;
	this.visible = true;
	this.x = 0;
	this.y = 0;
	
	this.graphics = new Graphics();
	this.graphics.displayObject = this;
	
	this.addEventListener(Event.ADDED_TO_STAGE, function(event) {
		event.target.root = _f;
	});
}
DisplayObject.extend(EventDispatcher);
DisplayObject.prototype.absAlpha = function() {
	if(this.parent) return this.parent.absAlpha() * Number(this.alpha());
	return Number(this.alpha());
}
DisplayObject.prototype.absRotation = function() {
	if(this.parent) return this.parent.absRotation() + this.rotation;
	return this.rotation;
}
DisplayObject.prototype.absScaleX = function() {
	if(this.parent) return this.parent.absScaleX() * Number(this.scaleX());
	return Number(this.scaleX());
}
DisplayObject.prototype.absScaleY = function() {
	if(this.parent) return this.parent.absScaleY() * Number(this.scaleY());
	return Number(this.scaleY());
}
DisplayObject.prototype.absX = function() {
	if(this.parent) return this.parent.absX() + Number(this.x);
	return Number(this.x);
}
DisplayObject.prototype.absY = function() {
	if(this.parent) return this.parent.absY() + Number(this.y);
	return Number(this.y);
}
DisplayObject.prototype.alpha = function(val) {
	if(!isNaN(val)) {
		this._alpha = val;
	}
	
	return this._alpha;
}
// short for Presentation Point
DisplayObject.prototype.pp = function(x, y) {
	/**
	 * Takes an x and y inside the object and spits out a point
	 * that has been effect by all the properties of the object
	 * such as parents location, scale and rotation
	 */
	 
	//this.instruction("ctx.lineTo(this.absX() + this.scaleX() * Math.cos((this.absRotation() + " + pt.ang + ") / 180 * Math.PI) * " + pt.hyp + ", this.absY() + this.scaleY() * Math.sin((this.absRotation() + " + pt.ang + ") / 180 * Math.PI) * " + pt.hyp + ")");
	
	var ang, hyp_x, hyp_y, x, y, rads;
	
	rads = Math.atan2(y, x);
	rads += this.rotation / 180 * Math.PI;
	
	hyp_x = hyp_y = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
	hyp_x *= this.scaleX();
	hyp_y *= this.scaleY();
	
	ang = rads / Math.PI * 180;
	
	//o.x = Math.cos(o.rads) * o.hyp_x;
	//o.y = Math.sin(o.rads) * o.hyp_y;
	
	x = this.absX() + this.absScaleX() * Math.cos((this.absRotation() + ang) / 180 * Math.PI) * + hyp_x;
	y = this.absY() + this.absScaleY() * Math.sin((this.absRotation() + ang) / 180 * Math.PI) * + hyp_y;
	
	return {'x':x, 'y':y};
}
DisplayObject.prototype.drawSelf = function() {
	if(this.visible && this.root) {
		var arr = this.graphics.data();
		var ctx = _f.stage.ctx();
		for(var i in arr) {
			try {
				eval(arr[i]);
				if(_f.trace_draw) trace(arr[i]);
			} catch(e) {
				throw "DisplayObject->drawSelf; " + e + "; " + arr[i];
			}
		}
		
		try {
			this._mouse_in_path = ctx.isPointInPath(this.absMouseX(), this.absMouseY());
		} catch(e) {}
		
		/**
		 * continue the drawing command to all the children
		 * AFTER this has drawn. 
		 * This way children will show on top.
		 * 
		 * only applies to DisplayObjectContainer subclasses.
		 */
		if(this.numChildren) {
			for(var i = 0; i < this.numChildren(); ++i) {
				this.getChildAt(i).drawSelf();
			}
		}
	}
}
DisplayObject.prototype.globalToLocal = function(point) {
	if(point === undefined) throw "DisplayObject->globalToLocal; a point is required";
	var pt = new Point(point.x - Number(this.absX()), point.y - Number(this.absY()));
	pt.oldx = point.x;
	pt.absx = this.absX();
	dump(pt);
	return pt;
}
DisplayObject.prototype.height = function(val) {
	if(val !== undefined) {
		// modify the scaleY property (not implemented yet)
		this.scaleY(val / this.height());
	}
	
	var r = new Rectangle(0, 0, 0, 0);
	if(this._children) {
		for(var c = 0; c < this._children.length; ++c) {
			if(this._children[c].y < r.y) r.y = this._children[c].y;
			if(this._children[c].y + this._children[c].height() > r.height) r.height = this._children[c].y + this._children[c].height();
		}
	}
	
	if(this.graphics._points) {
		for(var p = 0; p < this.graphics._points.length; ++p) {
			var pt = this.graphics._points[p];
			var rp = this.pp(pt.x, pt.y);
			if(rp.y - this.absY() < r.y) r.y = rp.y - this.absY();
			if(rp.y - this.absY() > r.height) r.height = rp.y - this.absY();
		}
	}
	
	return r.height * this.absScaleY();
}
DisplayObject.prototype.localToGlobal = function(point) {
	if(point === undefined) throw "DisplayObject->localToGlobal; a point is required";
	return new Point(point.x + Number(this.absX()), point.y + Number(this.absY()));
}
DisplayObject.prototype.width = function(val) {
	if(val !== undefined) {
		// modify the scaleX property (not implemented yet)
		this.scaleX(val / this.width());
	}
	
	var r = new Rectangle(0, 0, 0, 0);
	if(this._children) {
		for(var c = 0; c < this._children.length; ++c) {
			if(this._children[c].x < r.x) r.x = this._children[c].x;
			if(this._children[c].x + this._children[c].width() > r.width) r.width = this._children[c].x + this._children[c].width();
		}
	}
	
	if(this.graphics._points) {
		for(var p = 0; p < this.graphics._points.length; ++p) {
			var pt = this.graphics._points[p];
			var rp = this.pp(pt.x, pt.y);
			if(rp.x - this.absX() < r.x) r.x = rp.x - this.absX();
			if(rp.x - this.absX() > r.width) r.width = rp.x - this.absX();
		}
	}
	
	return r.width * this.absScaleX();
}
DisplayObject.prototype.scaleX = function(val) {
	if(val !== undefined) {
		this._scale_x = val;
	}
	
	return Number(this._scale_x);
}
DisplayObject.prototype.scaleY = function(val) {
	if(val !== undefined) {
		this._scale_y = val;
	}
	
	return Number(this._scale_y);
}

/**
 * Bitmap Class
 */
function Bitmap(bitmapData) {
	this._construct(bitmapData);
}
Bitmap.prototype._construct = function(bitmapData) {
	this._bitmapData = bitmapData;
	
	//if(bitmapData) this.graphics.instruction("try{ ctx.putImageData(this.presentationData(), this.absX() * this.absScaleX(), this.absY() * this.absScaleY(), this.absX(), this.absY() * this.absScaleY()); } catch(e) {}");
	
	if(bitmapData) this.graphics.instruction("try{ ctx.drawImage(this.presentationData(), 0, 0, this.presentationData().width, this.presentationData().height, this.absX(), this.absY(), this.width(), this.height()); } catch(e) {}");
}
Bitmap.extend(DisplayObject);
Bitmap.prototype.bitmapData = function(obj) {
	if(obj !== undefined) {
		this._bitmapData = obj;
	}
	return this._bitmapData;
}
Bitmap.prototype.height = function(val) {
	if(val) {
		// not available to change the width yet.
		// should only effect scaleY when implemented
	}
	return this._bitmapData.height() * this.absScaleY();
}
Bitmap.prototype.width = function(val) {
	if(val) {
		// not available to change the width yet.
		// should only effect scaleX when implemented
	}
	
	return this._bitmapData.width() * this.absScaleX();
}
Bitmap.prototype.presentationData = function() {
	if(this.absAlpha() != this.bitmapData().alpha) this._bitmapData.alpha(this.absAlpha());
	
	return this.bitmapData()._imageData;
}

/**
 * InteractiveObject
 */
function InteractiveObject() {
	this._construct();
}
InteractiveObject.prototype._construct = function() {
	this._abs_mouse_x = undefined;
	this._abs_mouse_y = undefined;
	this._lastMouseMove = {'x':0, 'y':0};
	this._mouse_is_over = undefined;
	this._mouse_in_path = false;
	this._potential_click = false;
	
	var ptr = this;
	if(stage) {
		if(stage._canvas) {
			/**
			 * I use this to make sure I have the relative mouse
			 * position at ALL times. I use this info for dispatching
			 * mouse events at the proper times.
			 */
			var reposition;
			
			// bool is to check if flanvas is running on an iphone/ipod/ipad
			if((new RegExp('iphone|ipod|ipad', 'i')).test(navigator.userAgent)) {
				var touchType = function(event) {
					if(event.targetTouches[0]) return "targetTouches";
						else if(event.changedTouches[0]) return "changedTouches";
					return "touches";
				}
				reposition = function(event, touch) {
					stage._abs_mouse_x = event.layerX;
					stage._abs_mouse_y = event.layerY;
					
					var tt = touchType(event);
					ptr._abs_mouse_x = event[tt][0].clientX;
					ptr._abs_mouse_y = event[tt][0].clientY;
				}
				stage._canvas.addEventListener('touchstart', function(event) {
					reposition(event);
					if(ptr.isMouseEventWorthy()) {
						var tt = touchType(event);
						ptr._potential_click = true;
						ptr.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_DOWN, true, false, event[tt][0].clientX, event[tt][0].clientY));
					}
				});
				stage._canvas.addEventListener('touchmove', function(event) {
					reposition(event);
				});
				stage._canvas.addEventListener('touchend', function(event) {
					reposition(event);
					if(ptr.isMouseEventWorthy()) {
						var tt = touchType(event);
						ptr.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_UP, true, false, event[tt][0].clientX, event[tt][0].clientY));
						if(ptr._potential_click) {
							ptr._potential_click = false;
							ptr.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false, event[tt][0].clientX, event[tt][0].clientY));
						}
					}
				});
			} else {
				reposition = function(event) {
					stage._abs_mouse_x = event.layerX;
					stage._abs_mouse_y = event.layerY;
					ptr._abs_mouse_x = event.layerX;
					ptr._abs_mouse_y = event.layerY;
				}
				stage._canvas.addEventListener('mousedown', function(event) {
					reposition(event);
					if(ptr.isMouseEventWorthy()) {
						ptr._potential_click = true;
						ptr.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_DOWN, true, false, event.layerX, event.layerY));	
					}
				}, false);
				stage._canvas.addEventListener('mousemove', function(event) {
					reposition(event);
				}, false);
				stage._canvas.addEventListener('mouseup', function(event) {
					reposition(event);
					if(ptr.isMouseEventWorthy()) {
						ptr.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_UP, true, false, event.layerX, event.layerY));	
						if(ptr._potential_click) {
							ptr._potential_click = false;
							ptr.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false, event.layerX, event.layerY));	
						}
					}
				}, false);
			}
		} else {
			stage.addEventListener(Stage.CANVAS_SET, function(event) {
				// can't remember why I put this in here :(
				alert('InteractiveObject->_construct;');
			});
		}
		
		this.addEventListener(Event.ENTER_FRAME, function(event) {
			event.target.testMouseMove();
		});
	}
}
InteractiveObject.extend(DisplayObject);
InteractiveObject.prototype.absMouseX = function() {
	return this._abs_mouse_x;
}
InteractiveObject.prototype.absMouseY = function() {
	return this._abs_mouse_y;
}
InteractiveObject.prototype.isMouseEventWorthy = function() {
	if(this._mouse_in_path) {
		for(var i = 0; i < this._children.length; ++i) {
			if(this._children[i].isMouseEventWorthy) {
				if(this._children[i].isMouseEventWorthy()) return false;
			}
		}
		return true;
	}
	return false;
}
InteractiveObject.prototype.lastMove = function() {
	this._lastMouseMove = {'x':this._abs_mouse_x, 'y':this._abs_mouse_y};
}
InteractiveObject.prototype.mouseIsOut = function() {
	if(this._mouse_is_over) {
		this._mouse_is_over = false;
		this._potential_click = false;
		this.dispatchEvent(new MouseEvent(MouseEvent.ROLL_OUT));
	}
}
InteractiveObject.prototype.mouseIsOver = function() {
	if(!this._mouse_is_over) {
		this._mouse_is_over = true;
		//this.lastMove();
		this.dispatchEvent(new MouseEvent(MouseEvent.ROLL_OVER));
	}
}
InteractiveObject.prototype.mouseX = function() {
	//return this.parent.mouseX() - this.x;
	return this._abs_mouse_x - this.absX();
}
InteractiveObject.prototype.mouseY = function() {
	//return this.parent.mouseY() - this.y;
	return this._abs_mouse_y - this.absY();
}
InteractiveObject.prototype.testMouseMove = function() {
	if(this.isMouseEventWorthy()) {
		//type, bubbles, cancelable, localX, localY, relatedObject, ctrlKey, altKey, shiftKey, buttonDown, delta, commandKey, controlKey, clickCount
		this.mouseIsOver();
		if((this._abs_mouse_x != this._lastMouseMove.x) || (this._abs_mouse_y != this._lastMouseMove.y)) {
			this.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_MOVE, true, false, this._abs_mouse_x, this.abs_mouse_y, this));
			this.lastMove();
		}
	} else {
		this.mouseIsOut();
	}
}

/**
 * DisplayObjectContainer
 */
function DisplayObjectContainer() {
	this._construct();
}
DisplayObjectContainer.prototype._construct = function() {
	this._children = [];
	this._uid = _f.genUid(this);
	
	/*
	var ptr = this;
	_f.intervalManager.addEventListener(Event.ENTER_FRAME, function(event) {
		for(var i in ptr._children) {
			ptr._children[i].dispatchEvent(new Event(Event.ENTER_FRAME));
		}
	});
	*/
	this.addEventListener(Event.ENTER_FRAME, function(event) {
		for(var i = 0; i < event.target.numChildren(); ++i) {
			event.target.getChildAt(i).dispatchEvent(new Event(Event.ENTER_FRAME));
		}
	});
	this.addEventListener(Event.ADDED_TO_STAGE, function(event) {
		for(var i = 0; i < event.target.numChildren(); ++i) {
			event.target.getChildAt(i).dispatchEvent(new Event(Event.ADDED_TO_STAGE));
		}
	});
}
DisplayObjectContainer.extend(InteractiveObject);
DisplayObjectContainer.prototype.addChild = function(child) {
	return this.addChildAt(child, this.numChildren());
}
DisplayObjectContainer.prototype.addChildAt = function(child, id) {
	child.parent = this;
	child.name = this.genInstanceName(child.name);
	this._children.splice(id, 0, child);
	
	child.dispatchEvent(new Event(Event.ADDED));
	if(this.root) child.dispatchEvent(new Event(Event.ADDED_TO_STAGE));
	
	return child;
}
DisplayObjectContainer.prototype.genInstanceName = function(val) {
	/**
	 * if they didn't specify a name, generate a new one.
	 * if the name is already taken, throw an error
	 */
	var name = '';
	if(val) {
		name = val;
	} else {
		name = "instance" + _f.genId();
	}
	
	for(var i = 0; i < this._children.length; ++i) {
		if(this._children[i].name == name) throw "DisplayObjectContainer->genInstanceName; The child name of " + name + " is already taken";
	}
	
	return name;
}
DisplayObjectContainer.prototype.getChildAt = function(id) {
	if(this._children[id]) return this._children[id];
	return null;
}
DisplayObjectContainer.prototype.getChildIndex = function(obj) {
	for(var i = 0; i < this._children.length; ++i) {
		if(this._children[i] == obj) return i;
	}
	return null;
}
DisplayObjectContainer.prototype.numChildren = function() {
	return this._children.length;
}
DisplayObjectContainer.prototype.removeChild = function(obj) {
	for(var i in this._children) {
		if(this._children[i] == obj) {
			this._children.splice(i, 1);
			obj.root = undefined;
			obj.parent = undefined;
		}
	}
}

/**
 * Graphics Class
 */
function Graphics() {
	this._construct();
}
Graphics.prototype._construct = function() {
	this._data = [];
	this._fill_style = undefined;
	this._stroke_style = undefined;
	this._points = [];
	
	this.displayObject = undefined;
}
Graphics.extend(Object);
Graphics.prototype.addColorStop = function(id, position, color) {
	this.instruction(id + ".addColorStop("+position+",'"+color+"');");
}
Graphics.prototype.arc = function(x, y, radius, start_angle, end_angle, anti_clockwise) {
	if(start_angle === undefined) start_angle = 0;
	if(end_angle === undefined) end_angle = Math.PI * 2;
	if(anti_clockwise === undefined) anti_clockwise = false;
	
	//this.instruction("ctx.arc(200, 200, 50, 0, Math.PI * 2, false);");
	this.instruction("ctx.arc(this.absX() + "+x+",this.absY() + "+y+","+radius+",this.absRotation() + "+start_angle+",this.absRotation() + "+end_angle+","+anti_clockwise+");");
}
Graphics.prototype.beginPath = function() {
	this.instruction("ctx.beginPath();");
}
Graphics.prototype.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
	this.instruction("ctx.bezierCurveTo(this.pp("+cp1x+","+cp1y+").x,this.pp("+cp1x+","+cp1y+").y,this.pp("+cp2x+","+cp2y+").x,this.pp("+cp2x+","+cp2y+").y,this.pp("+x+","+y+").x,this.pp("+x+","+y+").y);");
	this._points.push(new Point(cp1x, cp1y));
	this._points.push(new Point(cp2x, cp2y));
	this._points.push(new Point(x, y));
}
Graphics.prototype.clear = function() {
	this._data = [];
	this._points = [];
}
Graphics.prototype.closePath = function() {
	this.instruction("ctx.closePath();");
}
Graphics.prototype.createLinearGradient = function(id, x1, y1, x2, y2) {
	this.instruction("var " + id + " = ctx.createLinearGradient("+x1+","+y1+","+x2+","+y2+");");
}
Graphics.prototype.createRadialGradient = function(id, x1, y1, r1, x2, y2, r2) {
	this.instruction("var " + id + " = ctx.createRadialGradient("+x1+","+y1+","+r1+","+x2+","+y2+","+r2+");");
}
Graphics.prototype.curveTo = function(controlX, controlY, anchorX, anchorY) {
	this.quadraticCurveTo(controlX, controlY, anchorX, anchorY);
}
Graphics.prototype.data = function() {
	return this._data;
}
Graphics.prototype.drawCircle = function(x, y, radius) {
	if((x === undefined) || (x == Number.NaN)) throw "Graphics->drawCircle; x value must be a Number";
	if((y === undefined) || (y == Number.NaN)) throw "Graphics->drawCircle; y value must be a Number";
	if((radius === undefined) || (radius == Number.NaN)) throw "Graphics->drawCircle; radius value must be a Number";
	
	this.beginPath();
	this.arc(x, y, radius);
	this.closePath();
}
Graphics.prototype.drawRect = function(x, y, width, height) {
	if((x === undefined) || (x == Number.NaN)) throw "Graphics->drawRect; x value must be a Number";
	if((y === undefined) || (y == Number.NaN)) throw "Graphics->drawRect; y value must be a Number";
	if((width === undefined) || (width == Number.NaN)) throw "Graphics->drawRect; width value must be a Number";
	if((height === undefined) || (height == Number.NaN)) throw "Graphics->drawRect; height value must be a Number";
	
	this.beginPath();
	this.moveTo(x, y);
	this.lineTo(x + width, y);
	this.lineTo(x + width, y + height);
	this.lineTo(x, y + height);
	this.lineTo(x, y);
	this.closePath();
}
Graphics.prototype.fill = function() {
	this.instruction("ctx.fill();");
}
Graphics.prototype.fillStyle = function(val) {
	if(val !== undefined) this.styleParseIn(val, "_fill_style");
	
	return this.styleParseOut("_fill_style");
}
Graphics.prototype.instruction = function(val) {
	this._data.push(val);
}
Graphics.prototype.lineCap = function(val) {
	if(val === undefined) throw "Graphics->lineCap; you must specify a value";
	this.instruction("ctx.lineCap = '" + val + "';");
}
Graphics.prototype.lineJoin = function(val) {
	if(val === undefined) throw "Graphics->lineJoin; you must specify a value"
	this.instruction("ctx.lineJoin = '" + val + "';");
}
Graphics.prototype.lineStyle = function(thickness, color, alpha, scaleMode, caps, joints, miterLimit) {
	if(thickness === undefined) throw "Graphics->lineStyle; thickness must be a valid Number";
	if(!color) color = "#000000";
	if(!alpha) alpha = 1.0;
	//if(scaleMode === undefined) scaleMode = LineScaleMode.NORMAL;
	if(scaleMode) throw "Graphics->lineStyle; scaleMode has not been implemented yet";
	if(!caps) caps = CapStyle.BUTT;
	if(!joints) joints = JointStyle.MITER;
	if(!miterLimit) miterLimit = 3;
	
	this.instruction("ctx.lineWidth = " + thickness);
	this.strokeStyle(color);
	this.alpha = alpha;
	//scale mode
	this.lineCap(caps);
	this.lineJoin(joints);
	this.miterLimit(miterLimit);
}
Graphics.prototype.lineTo = function(x, y) {
	if((x === undefined) || (x == Number.NaN)) throw "Graphics->lineTo; x value must be a Number";
	if((y === undefined) || (x == Number.NaN)) throw "Graphics->lineTo; y value must be a Number";
	
	this.instruction("ctx.lineTo(this.pp("+x+","+y+").x, this.pp("+x+","+y+").y)");
	this._points.push(new Point(x, y));
}
Graphics.prototype.lineWidth = function(val) {
	if(val === undefined) val = 1;
	this.instruction("ctx.lineWidth = " + val + ";");
}
Graphics.prototype.miterLimit = function(val) {
	if(val === undefined) throw "Graphics->miterLimit; you must specify a value"
	if(val) this.instruction("ctx.miterLimit = " + val + ";");
}
/**
 * moves the drawing element to the x and y specified.
 */
Graphics.prototype.moveTo = function(x, y) {
	if((x === undefined) || (x == Number.NaN)) throw "Graphics->moveTo; x value must be a Number";
	if((y === undefined) || (x == Number.NaN)) throw "Graphics->moveTo; y value must be a Number";
	
	this.instruction("ctx.moveTo(this.pp("+x+","+y+").x, this.pp("+x+","+y+").y)");
	this._points.push(new Point(x, y));
	}
/**
 * returns the points maintained by the system. These points are added with functions like
 * lineto and arc, etc.. These points are used to calculate the potential width/height
 * of a DisplayObject
 */
Graphics.prototype.points = function(start, end) {
	if((end !== undefined) && !isNaN(end)) arr = this._points.splice(start, end);
	if(start !== undefined && !isNaN(start)) arr = this._points.splice(start);
	
	return this._points;
}
Graphics.prototype.quadraticCurveTo = function(cpx, cpy, x, y) {
	this.instruction("ctx.quadraticCurveTo(pp("+cpx+","+cpy+").x,pp("+cpx+","+cpy+").y,pp("+x+","+y+").x,pp("+x+","+y+").y);");
	this._points.push(new Point(cpx, cpy));
	this._points.push(new Point(x, y));
}
Graphics.prototype.stroke = function() {
	this.instruction("ctx.stroke();");
}
Graphics.prototype.strokeRect = function(x, y, x2, y2) {
	var width = x2 - x;
	var height = y2 - y;
	
	this.beginPath();
	this.moveTo(x, y);
	this.lineTo(x + width, y);
	this.lineTo(x + width, y + height);
	this.lineTo(x, y + height);
	this.lineTo(x, y);
	this.closePath();
	this.stroke();
}
Graphics.prototype.strokeStyle = function(val) {
	if(val !== undefined) this.styleParseIn(val, "_stroke_style");
	
	return this.styleParseOut("_stroke_style");
}
Graphics.prototype.styleParseIn = function(val, type) {
	var func = "fillStyle";
	if(type == "_stroke_style") func = "strokeStyle";
	
	// remove quotes if found.
	if(isNaN(val)) val = String(val).replace(/'|"/g, '');
	
	// if the val is a number, convert it to hex
	if(!isNaN(val)) {
		val = "#" + val.toString(16);
	}
	
	// if val is a hex, convert to rgb
	var hash = val.indexOf('#');
	if(hash >= 0) {
		val = Utils.hexToRgba(val.substr(hash));
	}
	
	this[type] = val;
	if(String(this[func]()).substr(0, 3) == "rgb") this.instruction("ctx['"+func+"'] = this.graphics['"+func+"']();");
		else this.instruction("ctx['"+func+"'] = "+this[func]()+";");
		//this._data.push("ctx.fillStyle = SVGID_1_");
}
Graphics.prototype.styleParseOut = function(type) {
	var lparen = this[type].indexOf('(') + 1;
	var rparen = this[type].lastIndexOf(')')
	var goods = this[type].substr(lparen, rparen - lparen);
	var arr = goods.split(',');
	var s = undefined;
	
	var ret;
	switch(arr.length) {
		// id
		case 1:
			ret = this[type];
			break;
		// 'rgb'
		case 3:
			s = 'rgba(' + arr[0] + ',' + arr[1] + ',' + arr[2] + ',' + this.displayObject.alpha() + ')';
			ret = String(s);
			break;
		// 'rgba'
		case 4:
			s = 'rgba(' + arr[0] + ',' + arr[1] + ',' + arr[2] + ',' + Number(arr[3]) * this.displayObject.alpha() + ')';
			ret = String(s);
			break;
		default:
			throw 'Graphics->fillStyle; Unidentified fillStyle of' + this[type];
			break;
	}
	
	return ret;
}

/**
 * Sprite Class
 */
function Sprite() {
	this._construct();
}
Sprite.extend(DisplayObjectContainer);

/**
 * URLRequest Class
 */
function URLRequest(url) {
	this.url = url;
}
URLRequest.extend(Object);

/**
 * Loader Class
 */
function Loader() {
	this._construct();
}
Loader.prototype._construct = function() {
	this._content = undefined;
	
	this.contentLoaderInfo = new LoaderInfo();
	this.contentLoaderInfo.loader = this;
}
Loader.extend(DisplayObjectContainer);
Loader.prototype.content = function() {
	return this._content;
}
Loader.prototype.load = function(request) {
	this.contentLoaderInfo.load(request);
}
Loader.prototype.process = function() {
	switch(this.contentLoaderInfo.contentType) {
		case "image/png":
		case "image/gif":
		case "image/jpg":
		case "image/jpeg":
			/**
			 * add mouse tracking for images
			 */
			this.addEventListener(Event.ENTER_FRAME, function(event) {
				var x_pass = ((event.target.mouseX() > 0) && (event.target.mouseX() < event.target.width()));
				var y_pass = ((event.target.mouseY() > 0) && (event.target.mouseY() < event.target.width()));
				if(x_pass && y_pass) event.target._mouse_in_path = true;
					else event.target._mouse_in_path = false;
			});
			this._content = this.addChild(this.contentLoaderInfo.content());
		break;
		case "image/svg+xml":
			var o = new Svg(this.contentLoaderInfo.content());
			this._content = this.addChild(o);
		break;
		default:
			throw 'Loader->process; Unknown content type ' + this.contentLoaderInfo.contentType;
		break;
	}
}

/**
 * LoaderInfo Class
 */
function LoaderInfo() {
	this._construct();
}
LoaderInfo.prototype._construct = function() {
	this._content = undefined;
	
	// the Loader object which created this object. Set by the Loader object;
	this.loader = undefined;
}
LoaderInfo.extend(EventDispatcher);
LoaderInfo.prototype.content = function() {
	return this._content;
}
LoaderInfo.prototype.load = function(request) {
	this.loaderURL = request.url;
	this.url = request.url;
	
	var stripContentType = function() {
		var str = doc.getAllResponseHeaders();
		var keyword = "Content-Type: ";
		
		if(str.indexOf(keyword) < 0) {
			throw "LoaderInfo->load; No content-type specified for the loaded document. Is the URL correct?";
		}
		
		str = str.substr(str.indexOf(keyword) + keyword.length);
		str = str.substr(0, str.indexOf('\n'));
		str = str.replace(/\n|\r| /gm,'');
		
		return str;
	}
	
	var doc;
	
	if (window.XMLHttpRequest) {
		doc = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		doc = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	doc.open("GET", request.url, true);
	
	var ptr = this;
	doc.onreadystatechange = function() {
		if(doc.readyState == 4) {
			ptr.contentType = stripContentType();
			switch(ptr.contentType) {
				case "image/gif":
				case "image/jpg":
				case "image/jpeg":
				case "image/png":
					var img = new Image();
					img.onload = function() {
						var bmpd = new BitmapData(img.width, img.height);
						bmpd.draw(img);
						
						var bmp = new Bitmap(bmpd);
						
						ptr._content = bmp;
						ptr.loader.process();
						ptr.dispatchEvent(new Event(Event.COMPLETE));
					}
					img.src = request.url;
				break;
				case "image/svg+xml":
					// pretty sure text/svg is the wrong content type. haven't tested this post-update
					ptr._content = (new DOMParser()).parseFromString(doc.responseText, "text/xml");
					ptr.loader.process();
					ptr.dispatchEvent(new Event(Event.COMPLETE));
					break;
				default:
					throw 'LoaderInfo->load; Not sure what to do with content-type of ' + ptr.contentType;
				break;
			}
		}
	}
	
	doc.send(null);
}

function Svg(xml) {
	this._construct(xml);
}
Svg.prototype._construct = function(xml) {
	this.xml = xml;
	this.parseXml(this.xml);
}
Svg.extend(DisplayObjectContainer);
Svg.parseStyle = function(style) {
	if(style == "none") {
		return undefined;
	} else if(style.indexOf("url") >= 0) {
		var lhash = style.indexOf('#') + 1;
		var rparen = style.lastIndexOf(')');
		style = style.substr(lhash, rparen - lhash);
		
		/*
		for(var r in gradients[style]) {
			eval(gradients[style][r]);
		}
		*/
	}
	
	return style;
}
Svg.parseStroke = function(node) {
	var o = {};
	if(node.hasAttribute('stroke')) o.style = Svg.parseStyle(node.attributes.getNamedItem('stroke').value);
		else o.style = "'#000000'";
	if(node.hasAttribute('stroke-width')) o.width = node.attributes.getNamedItem('stroke-width').value;
		else o.width = 0;
	if(node.hasAttribute('stroke-miterLimit')) o.miterLimit = node.attributes.getNamedItem('stroke-miterLimit').value;
		else o.miterLimit = 0;
	if(node.hasAttribute('opacity')) o.opacity = node.attributes.getNamedItem('opacity').value;
		else o.opacity = 1.0;
	
	return o;
}
Svg.prototype.parseXml = function(xml) {
	var ptr = this;
	
	for(var i = 0; i < xml.childNodes.length; ++i) {
		var node = xml.childNodes[i];
		switch(node.nodeName) {
			case "circle":
				//<circle opacity="0.2" fill="#FFFFFF" cx="49.154" cy="64.154" r="37.154"/>
				var cx, cy, r, opacity = 1.0, fill, stroke;
				cx = Number(node.attributes.getNamedItem("cx").value);
				cy = Number(node.attributes.getNamedItem("cy").value);
				r = Number(node.attributes.getNamedItem("r").value);
				if(node.hasAttribute('opacity')) opacity = node.attributes.getNamedItem("opacity").value;
				if(node.hasAttribute('fill')) fill = Svg.parseStyle(node.attributes.getNamedItem("fill").value);
				stroke = Svg.parseStroke(node);
				
				var o = new Sprite();
				o.x = cx;
				o.y = cy;
				
				if(fill) o.graphics.fillStyle(fill);
				if(stroke.width) o.graphics.lineStyle(stroke.width, stroke.style, stroke.opacity, null, null, null, stroke.miterLimit);
				if(opacity) o.alpha(opacity);
				
				o.graphics.drawCircle(0, 0, r);
				
				if(fill) o.graphics.fill();
				if(stroke.width) o.graphics.stroke();
				
				ptr.addChild(o);
			break;
			case "defs":
				//
			break;
			case "line":
				var fill = Svg.parseStyle(node.attributes.getNamedItem("fill").value);
				var stroke = Svg.parseStroke(node);
				var x1 = node.attributes.getNamedItem("x1").value;
				var y1 = node.attributes.getNamedItem("y1").value;
				var x2 = node.attributes.getNamedItem("x2").value;
				var y2 = node.attributes.getNamedItem("y2").value;
				
				var o = new Sprite();
				o.x = x1;
				o.y = y1;
				
				// if(dashArray) - no instruction for this yet
				o.graphics.lineCap(lineCap);
				o.graphics.lineJoin(lineJoin);
				o.graphics.lineWidth(lineWidth);
				
				if(fill != "none") o.graphics.fillStyle(fill);
				o.graphics.beginPath();
				if(stroke.width) o.graphics.lineStyle(stroke.width, stroke.style, stroke.opacity, null, null, null, stroke.miterLimit);
				o.graphics.moveTo(0, 0);
				o.graphics.lineTo(x2 - x1, y2 - y1);
				if(stroke.width) o.graphics.stroke();
				
				ptr.addChild(o);
			break;
			case "linearGradient":
				var arr = [];
				
				var id = node.attributes.getNamedItem('id').value;
				var x1 = node.attributes.getNamedItem("x1").value;
				var x2 = node.attributes.getNamedItem("x2").value;
				var y1 = node.attributes.getNamedItem("y1").value;
				var y2 = node.attributes.getNamedItem("y2").value;
				
				//ptr._instructions.push('var ' + id + ' = ctx.createLinearGradient('+x1+','+y1+','+x2+','+y2+');');
				arr.push("o.graphics.createLinearGradient('"+id+"',"+x1+","+y1+","+x2+","+y2+");");
				
				for(var n = 0; n < node.childNodes.length; ++n) {
					var stope = node.childNodes[n];
					switch(stope.nodeName) {
						case "stop":
							var pos = stope.attributes.getNamedItem('offset').value;
							var color = String(stope.attributes.getNamedItem('style').value);
							color = color.replace('stop-color:', '');
							//ptr._instructions.push(id + ".addColorStop("+pos+",'"+color+"');");
							arr.push("o.graphics.addColorStop('"+id+"',"+pos+",'"+color+"');");
						break;
					}
				}
			break;
			case "path":
				var fill, stroke;
				if(node.hasAttribute('fill')) fill = Svg.parseStyle(node.attributes.getNamedItem("fill").value);
				stroke = Svg.parseStroke(node);
				var d = node.attributes.getNamedItem("d").value;
				
				// fix data
				d = d.replace(/\s|\n|\r/g,' ');
				for(var m = 0; m < d.length; ++m) {
					// check for the minus sign and put a comma infront of it if needs be
					if((d[m] == '-') && !isNaN(d[m - 1])) {
						d = d.substr(0, m) + ',' + d.substr(m);
					}
					// add spacing where needed to make a valid array.split()
					if(isNaN(d[m]) && (d[m] != '.') && (d[m] != '-') && (d[m] != ',') && (m > 0)) {
						d = d.substr(0, m) + ' ' + d.substr(m);
						++m;
					}
				}
				d = d.split(' ');
				
				var o = new Sprite();
				
				o.graphics.beginPath();
				if(fill) o.graphics.fillStyle(fill);
				if(stroke.width) o.graphics.lineStyle(stroke.width, stroke.style, stroke.opacity, null, null, null, stroke.miterLimit);
				if(opacity) o.alpha(opacity);
				
				for(var k = 0; k < d.length; ++k) {
					var code = String(String(d[k]).substr(0, 1));
					var pt = String(String(d[k]).substr(1)).split(',');
					switch(code) {
						// move to
						case 'M':
						case 'm':
							o.x = pt[0];
							o.y = pt[1];
							o.graphics.moveTo(0, 0);
						break;
						// line to
						case 'L':
							var L = o.globalToLocal(new Point(pt[0], pt[1]));
							dump(L);
							pt[0] = L.x;
							pt[1] = L.y;
						case 'l':
							o.graphics.lineTo(pt[0], pt[1]);
						// horizontal line to
						break;
						case 'H':
						case 'h':
							//dump(o.graphics.points(-1)[0]);
						break;
						// vertical line to
						case 'V':
						case 'v':
						break;
						// curve to
						case 'C':
							var C0 = o.globalToLocal(new Point(pt[0], pt[1]));
							var C1 = o.globalToLocal(new Point(pt[2], pt[3]));
							var C2 = o.globalToLocal(new Point(pt[4], pt[4]));
							pt[0] = C0.x;
							pt[1] = C0.y;
							pt[2] = C1.x;
							pt[3] = C1.y;
							pt[4] = C2.x;
							pt[5] = C2.y;
						case 'c':
							//alert(pt);
							//o.graphics.lineTo(pt[4], pt[5]);
						break;
						// smooth curve to
						case 'S':
						case 's':
							//o.graphics.bezierCurveTo(pt[0], pt[1], pt[2], pt[3], pt[4], pt[5]);
						break;
						// quadratic belzier curve
						case 'Q':
						case 'q':
							//o.graphics.quadraticCurveTo(pt[0], pt[1], pt[2], pt[3]);
						break;
						// smooth quad belzier curveto
						case 'T':
						case 't':
						break;
						// elliptical arc
						case 'A':
						case 'a':
							//o.graphics.arcTo(pt[0], pt[1], pt[2], pt[3], pt[4], pt[5], pt[6]);
						break;
						// close path
						case 'Z':
						case 'z':
							o.graphics.closePath();
						break;
						default:
							if(isNaN(code)) throw "Svg->parseXml; \"path\" unkown code " + code;
						break;
					}
				}
				
				if(fill) o.graphics.fill();
				if(stroke.width) o.graphics.stroke();
				
				ptr.addChild(o);
				
				/**
				 * the data is really weird and won't parse correctly. going to get a better
				 * understanding of this one before I continue.
				 * <path fill="none" stroke="#000000" stroke-width="2" d="M105.893,34.21c0,0,25.282,13.034,34.502,13.034
				 * c9.221,0,34.502-13.034,34.502-13.034"/>
				 */
			break;
			case "polygon":
				// <polygon fill="url(#SVGID_2_)" stroke="#000000" points="76.785,169.127 48.016,154.937 20.017,170.59 24.623,138.844 
				// 1.083,117.052 32.699,111.624 46.149,82.501 61.083,110.892 92.936,114.686 70.549,137.661 "/>
				var points = node.attributes.getNamedItem('points').value;
				points = String(points).split(' ');
				var fill, stroke;
				if(node.hasAttribute('fill')) fill = Svg.parseStyle(node.attributes.getNamedItem('fill').value);
				if(node.hasAttribute('stroke')) stroke = Svg.parseStyle(node.attributes.getNamedItem('stroke').value);
				
				if(fill) o.graphics.fillStyle(fill);
				if(stroke) o.graphics.strokeStyle(stroke);
				
				var o = new Sprite();
				
				o.graphics.beginPath();
				for(var q = 0; q < points.length; ++q) {
					var pt = String(points[q]).split(',');
					
					if(q > 0) o.graphics.lineTo(pt[0], pt[1]);
						else o.graphics.moveTo(pt[0], pt[1]);
				}
				
				o.graphics.closePath();
				if(stroke) o.graphics.stroke();
				if(fill) o.graphics.fill();
				
				ptr.addChild(o);
			break;
			case "polyline":
				//var dashArray;
				//if(node.hasAttribute("stroke-dasharray")) dashArray = node.attributes.getNamedItem("stroke-dasharray").value;
				var fill, stroke;
				if(node.hasAttribute('fill')) fill = Svg.parseStyle(node.attributes.getNamedItem("fill").value);
				stroke = Svg.parseStroke(node);
				var points = String(node.attributes.getNamedItem("points").value).split(' ');
				
				var x1 = 0; y1 = 0;
				
				var o = new Sprite();
				o.x = x1;
				o.y = y1;
				
				// if(dashArray) - no instruction for this yet
				
				if(fill) o.graphics.fillStyle(fill);
				if(stroke.width) o.graphics.lineStyle(stroke.width, stroke.style, stroke.opacity, null, null, null, stroke.miterLimit);
				
				o.graphics.beginPath();
				for(var j = 0; j < points.length; ++j) {
					var pt = String(points[j]).split(',');
					if((pt[0] != null) && (pt[1] != null)) {
						if(j > 0) {
							o.graphics.lineTo(pt[0] - x1, pt[1] - y1);
						} else {
							o.graphics.moveTo(pt[0] - x1, pt[1] - y1);
						}
					} 
				}
				
				if(fill) o.graphics.fill();
				if(stroke.width) o.graphics.stroke();
				ptr.addChild(o);
			break;
			case "radialGradient":
				var arr = [];
				
				var id = node.attributes.getNamedItem('id').value;
				var cx, cy, r, fx = 0, fy = 0;
				if(node.hasAttribute("cx")) cx = node.attributes.getNamedItem("cx").value;
				if(node.hasAttribute("cy")) cy = node.attributes.getNamedItem("cy").value;
				if(node.hasAttribute("r")) r = node.attributes.getNamedItem("r").value;
				if(node.hasAttribute("fx")) fx = node.attributes.getNamedItem("fx").value;
				if(node.hasAttribute("fy")) fy = node.attributes.getNamedItem("fy").value;
				
				var x1 = cx;
				var y1 = cy;
				var r1 = 0;
				var x2 = cx;
				var y2 = cy;
				var r2 = r;
				
				var gt;
				if(node.hasAttribute('gradientTransform')) gt = node.attributes.getNamedItem('gradientTransform').value;
				
				if((!fx || !fy) && gt) {
					var lp = gt.indexOf('(') + 1;
					var rp = gt.lastIndexOf(')');
					gt = gt.substr(lp, rp - lp);
					gt = gt.split(', ');
				}
				
				//ptr._instructions.push('var ' + id + ' = ctx.createRadialGradient('+x1+','+y1+','+r1+','+x2+','+y2+','+r2+');');
				//o.graphics.createRadialGradient(id, x1, y1, r1, x2, y2, r2);
				arr.push("o.graphics.createRadialGradient('"+id+"',"+x1+","+y1+","+r1+","+x2+","+y2+","+r2+");");
				
				for(var n = 0; n < node.childNodes.length; ++n) {
					var stope = node.childNodes[n];
					switch(stope.nodeName) {
						case "stop":
							var pos = stope.attributes.getNamedItem('offset').value;
							var color = stope.attributes.getNamedItem('style').value;
							color = color.replace('stop-color:', '');
							//ptr._instructions.push(id + ".addColorStop("+pos+",'"+color+"');");
							//o.graphics.addColorStop(id, pos, color);
							arr.push("o.graphics.addColorStop('"+id+"',"+pos+",'"+color+"');");
						break;
					}
				}
				
				gradients[id] = arr;
			break;
			case "rect":
				var x1 = 0, y1 = 0;
				if(node.hasAttribute('x')) x1 = Number(node.attributes.getNamedItem('x').value);
				if(node.hasAttribute('y')) y1 = Number(node.attributes.getNamedItem('y').value);
				var x2 = x1 + Number(node.attributes.getNamedItem('width').value);
				var y2 = y1 + Number(node.attributes.getNamedItem('height').value);
				var stroke, strokeWidth, fill;
				if(node.hasAttribute('stroke')) stroke = Svg.parseStyle(node.attributes.getNamedItem('stroke').value);
				if(node.hasAttribute('stroke-width')) strokeWidth = node.attributes.getNamedItem('stroke-width').value;
				if(node.hasAttribute('fill')) fill = Svg.parseStyle(node.attributes.getNamedItem('fill').value);
				
				
				var o = new Sprite();
				o.x = x1;
				o.y = y1;
				
				if(fill) o.graphics.fillStyle(fill);
				if(stroke) o.graphics.strokeStyle(stroke);
				o.graphics.drawRect(0,0,x2 - x1,y2 - y1);
				if(fill) o.graphics.fill();
				if(stroke) o.graphics.stroke();
				
				ptr.addChild(o);
			break;
			case "svg":
				ptr.parseXml(node);
			break;
			case "text":
				//
			break;
			default:
				if(String(node.nodeName).substr(0, 1) != "#") throw("Svg->parseXml; no type match for: " + node.nodeName);
			break;
		}
	}
}

/**
 * Event Class
 */
Event.ADDED = "added";
Event.ADDED_TO_STAGE = "added_to_stage";
Event.COMPLETE = "complete";
Event.ENTER_FRAME = "enter_frame";
function Event(type, bubbles, cancelable) {
	this._construct(type, bubbles, cancelable);
}
Event.prototype._construct = function(type, bubbles, cancelable) {
	if(bubbles === undefined) bubbles = false;
	if(cancelable === undefined) cancelable = false;
	
	this.bubbles = bubbles;
	this.cancelable = cancelable;
	this.type = type;
	this.target = undefined;
}
Event.extend(Object);

/* *
 * IntervalManager Class
 */
IntervalManager.instance = undefined;
function IntervalManager() {
	this._construct();
}
IntervalManager.prototype._construct = function() {
	var d = new Date();
	this._current_id = 0;
	this._fps_throttle = [];
	this._interval = setInterval("_f.intervalManager.update()", 10);
	this._intervals = new Array();
	this._last_time = 0;
	this._start_time = d.getTime();
	
	this.fps = 0;
}
IntervalManager.extend(EventDispatcher);
IntervalManager.prototype.clearInterval = function(id) {
	for(var i in this._intervals) {
		if(this._intervals[i].id == id) {
			this._intervals.splice(i, 1);
			return 0;
		}
	}
	return 1;
}
IntervalManager.prototype.getTimer = function() {
	var d = new Date();
	return d.getTime() - this._start_time;
}
IntervalManager.prototype.setInterval = function(func, delay) {
	this._intervals.push({"id":++this._current_id, "func":func, "delay":delay, "last_run":this.getTimer()})
}
IntervalManager.prototype.throttleAverage = function() {
	var total = 0;
	for(var i in this._fps_throttle) {
		total += this._fps_throttle[i];
	}
	return total/this._fps_throttle.length;
}
IntervalManager.prototype.update = function() {
	var avg = this.throttleAverage() || 0;
	if(_f.stage) {
		if(this.getTimer() > this._last_time + (1000 / (_f.stage.fps + avg * 2))) {
			if(_f.clear_trace_on_frame) trace("", true);
			this.dispatchEvent(new Event(Event.ENTER_FRAME));
			
			this.fps = Number(1000 / (this.getTimer() - this._last_time));
			this._last_time = this.getTimer();
			while(this._fps_throttle.length > 10) {
				this._fps_throttle.pop();
			}
			// throttling needs more work. it's only half helps.
			this._fps_throttle.unshift(Number(_f.stage.fps - this.fps));
		}
	}
	
	for(var i in this._intervals) {
		var o = this._intervals[i];
		if(this.getTimer() > o.last_run + o.delay) {
			o.func();
			o.last_run = this.getTimer();
		}
	}
}

/**
 * LineCap Class
 */
function LineCap() {}
LineCap.BUTT = "butt";
LineCap.ROUND = "round";
LineCap.SQUARE = "square";

/**
 * LineJoin Class
 */
function LineJoin() {}
LineJoin.ROUND = "round";
LineJoin.BEVEL = "bevel";
LineJoin.MITER = "miter";

/**
 * MouseEvent Class
 */
function MouseEvent(type, bubbles, cancelable, localX, localY, relatedObject, ctrlKey, altKey, shiftKey, buttonDown, delta, commandKey, controlKey, clickCount) {
	this._construct(type, bubbles, cancelable, localX, localY, relatedObject, ctrlKey, altKey, shiftKey, buttonDown, delta, commandKey, controlKey, clickCount);
}
MouseEvent.prototype._construct = function(type, bubbles, cancelable, localX, localY, relatedObject, ctrlKey, altKey, shiftKey, buttonDown, delta, commandKey, controlKey, clickCount) {
	if(localX === undefined) localX = undefined;
	if(localY === undefined) localY = undefined;
	if(relatedObject === undefined) relatedObject = null;
	if(ctrlKey === undefined) ctrlKey = false;
	if(altKey === undefined) altKey = false;
	if(shiftKey === undefined) shiftKey = false;
	if(buttonDown === undefined) buttonDown = false;
	if(delta === undefined) delta = 0;
	if(commandKey === undefined) commandKey = false;
	if(controlKey === undefined) controlKey = false;
	if(clickCount === undefined) clickCount = false;
	
	this.localX = localX;
	this.localY = localY;
	this.relatedObject = relatedObject;
	this.ctrlKey = ctrlKey;
	this.altKey = altKey;
	this.shiftKey = shiftKey;
	this.buttonDown = buttonDown;
	this.delta = delta;
	this.commandKey = commandKey;
	this.controlKey = controlKey;
	this.clickCount = clickCount;
}
MouseEvent.extend(Event);
MouseEvent.CLICK = "click";
MouseEvent.MOUSE_DOWN = "mouse_down";
MouseEvent.MOUSE_MOVE = "mouse_move";
MouseEvent.MOUSE_UP = "mouse_up";
MouseEvent.ROLL_OUT = "roll_out";
MouseEvent.ROLL_OVER = "roll_over";

/**
 * Stage Class
 */
Stage.CANVAS_SET = "canvas_set";
function Stage() {
	this._construct();
}
Stage.prototype._construct = function() {
	this._canvas = undefined;
	this._context = "2d";
	this._mouse_x = 0;
	this._mouse_y = 0;
	this._stage_height = undefined;
	this._stage_width = undefined;
	this.fps = 0;
	
	this.addEventListener(Event.ENTER_FRAME, function(event) {
		event.target.clear();
		/**
		 * start the drawing sequence, which is propagated downward to every child
		 */
		event.target.drawSelf();
	});
}
Stage.extend(DisplayObjectContainer);
Stage.prototype.clear = function () {
	var ctx = this.ctx();
	
	// clears the canvas
	ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
}
Stage.prototype.ctx = function() {
	return this._canvas.getContext(this._context);
}
Stage.prototype.setCanvas = function(canvas) {
	this._canvas = canvas;
	this._stage_width = canvas.width;
	this._stage_height = canvas.height;
	
	this.dispatchEvent(new Event(Stage.CANVAS_SET));
}
Stage.prototype.stageHeight = function() {
	return this._stage_height;
}
Stage.prototype.stageWidth = function() {
	return this._stage_width;
}

/**
 * MainTimeline Class
 */
function MainTimeline() {
	this._construct();
}
MainTimeline.prototype._construct = function() {
	MainTimeline.instance = this;
	this._instance_count = 0;
	this._instance_log = [];
	
	this.clear_trace_on_frame = true;
	this.intervalManager = new IntervalManager();
	this.stage = undefined;
	this.trace_div = undefined;
	this.trace_draw = false;
}
MainTimeline.extend(EventDispatcher);
MainTimeline.prototype.genId = function() {
	return "instance" + String(++this._instance_count);
}
MainTimeline.prototype.getObjByUid = function(uid) {
	if(this._instance_log[uid]) {
		return this._instance_log[uid];
	}
	return null;
}
/**
 * generate unique id which works anywhere from the main timeline.
 **/
MainTimeline.prototype.genUid = function(obj) {
	var len = 12;
	var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
	var uid = undefined;
	
	loop:
	while(true) {
		uid = '';
		while(uid.length < len) {
			uid += chars.substr(Math.floor(Math.random() * chars.length), 1);
		}
		
		var neue = true;
		for(var i = 0; i < this._instance_log.length; ++i) {
			if(this._instance_log[i].uid == uid) neue = false;
		}
		if(neue) break loop;
	}
	
	this._instance_log[uid] = obj;
	return uid;
}
MainTimeline.prototype.setStage = function(obj) {
	this.stage = obj;
	this.stage.dispatchEvent(new Event(Event.ADDED_TO_STAGE));
}

/**
 * Point Class
 */
function Point(x, y) {
	this._construct(x, y);
}
Point.prototype._construct = function(x, y) {
	if(x === undefined) x = 0;
	if(y === undefined) y = 0;
	
	this.x = Number(x);
	this.y = Number(y);
}

/**
 * Utils Class
 */
function Utils() {}
Utils.extend(Object);
Utils.hexToRgba = function(hex) {
	hex = hex.substr(1);
	rgb = {
		"r":parseInt(hex.substr(0, 2), 16), 
		"g":parseInt(hex.substr(2, 2), 16), 
		"b":parseInt(hex.substr(4, 2), 16), 
		"a":parseInt(hex.substr(6, 2), 16) / 255
		}
	if(!rgb.a) rgb.a = 1.0;
	//alert(hex +", " + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + rgb.a);
	return '"rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + rgb.a + ')"';
}
Utils.shortHex = function(hex) {
	return "#" + hex.substr(3);
}

/**
 * helpful functions
 */
function dump(obj, funcs) {
	if(funcs === undefined) funcs = true;
	
	var str = "";
	if(obj instanceof Array) {
		str += "array(\n";
		for(var i in obj) {
			str += "\t" + i + ": " + obj[i] + ",\n";
		}
		str += ")";
	} else {
		for(var i in obj) {
			try {
				if(obj[i] instanceof Function) {
					if(funcs) str += i + "()\n";
				} else {
					str += i + ": " + String(obj[i]).substr(0, 50) + "\n";
					//str += obj[i];
				}
			} catch(e) {}
		}
	}
	alert(str);
}
function trace(param, clear) {
	if(_f.trace_div) {
		var o = document.getElementById(_f.trace_div);
		
		if(o) {
			if(clear) {
				o.innerHTML = '';
			}
			o.innerHTML = o.innerHTML + param + "<br>";
		} else {
			//alert(param);
		}
	}
}

var _f = new MainTimeline();
var stage = new Stage();
_f.setStage(stage);