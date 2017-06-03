'use strict'

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
 * 1) Inheritence effected my layout in such a way that the classes
 * below are not in alphabetical order
 *
 * 2) I wrote the inheritance for this project (basically a collection
 * of several I found on the web) so it may be a bit messy. This has
 * since been migrated to es6
 *
 * 3) Yes this is a combination of Flex and Flash parts, written from my
 * own interpretation of how those parts work conceptually.
 */

/**
 * Comment style - mix between ASDoc(AS3) and Javadoc(Java)
 *
 * ASDoc comments: http://livedocs.adobe.com/flex/3/html/help.html?content=asdoc_3.html
 * Javadoc comments: http://en.wikipedia.org/wiki/Javadoc
 * 
 * Param
 * @param [name]:[type]
 * eg. @param param1:String
 *
 * Return
 * @return:[type] Description of the return
 * eg. @return:String Returns a string.
 */

try{
	// setup simple namespace
	var com = {};
	com.flanvas = {};
	com.flanvas.core = {};
	com.flanvas.display = {};
	com.flanvas.events = {};
	com.flanvas.filters = {};
	com.flanvas.managers = {};
	com.flanvas.media = {};
	com.flanvas.net = {};
	com.flanvas.system = {};
	com.flanvas.text = {};
	com.flanvas.ui = {};

	function importFrom(url) {
		document.write('<script src="'+url+'" type="text/javascript"></script>');
	}
	
	//////////////////////////
	//// STATIC FUNCTIONS ////
	//////////////////////////
	
	com.flanvas.net.navigateToURL = function(request, p_window) {
		if(request === undefined) throw new ArgumentError('navigateToURL requires a URLRequest.');
		if(p_window === undefined) p_window = null;
		
		window.open(request.url, p_window);
	}
	
	
	/////////////////
	//// CLASSES ////
	/////////////////
	
	/**
	 * Instruction Class
	 */
	com.flanvas.core.Instruction = {};
	com.flanvas.core.Instruction.ARC = "arc";
	com.flanvas.core.Instruction.BEGINPATH = "beginPath";
	com.flanvas.core.Instruction.BEZIERCURVETO = "bezierCurveTo";
	com.flanvas.core.Instruction.CLIP = "clip";
	com.flanvas.core.Instruction.CLOSEPATH = "closePath";
	com.flanvas.core.Instruction.FILL = "fill";
	com.flanvas.core.Instruction.FILLSTYLE = "fillStyle";
	com.flanvas.core.Instruction.LINECAP = "lineCap";
	com.flanvas.core.Instruction.LINEJOIN = "lineJoin";
	com.flanvas.core.Instruction.LINETO = "lineTo";
	com.flanvas.core.Instruction.LINEWIDTH = "lineWidth";
	com.flanvas.core.Instruction.MITERLIMIT = "miterLimit";
	com.flanvas.core.Instruction.MOVETO = "moveTo";
	com.flanvas.core.Instruction.QUADRATICCURVETO = "quadraticCurveTo";
	com.flanvas.core.Instruction.STROKE = "stroke";
	com.flanvas.core.Instruction.STROKESTYLE = "strokestyle";
	com.flanvas.core.Instruction.TEXTFIELD = "textfield";
	var Instruction = com.flanvas.core.Instruction;
	
	/**
	 * ListCollectionView Class
	 */
	class ListCollectionView extends Object {
		constructor(list) {
			super();

			this._list = list;
			this._localIndex = 0;
			
			this.__defineGetter__('length', function() {
				return this._list.length;
			});
			this.__defineGetter__('list', function() {
				return this._list
			});
			this.__defineSetter__('list', function() {
				throw new Error('not implemented yet');
			});
			this.__defineGetter__('sort', function() {
				throw new Error('not implemented yet');
			});
			this.__defineSetter__('sort', function() {
				throw new Error('not implemented yet');
			});
		}
	}
	ListCollectionView.prototype.addAll = function(addList) {
		throw new Error('not implemented yet');
	}
	ListCollectionView.prototype.addAllAt = function(addList, index) {
		throw new Error('not implemented yet');
	}
	ListCollectionView.prototype.addItem = function(p_item) {
		throw new Error('not implemented yet');
	}
	ListCollectionView.prototype.addItemAt = function(addList, index) {
		throw new Error('not implemented yet');
	}
	ListCollectionView.prototype.contains = function(p_item) {
		for(var i in this._list) {
			if(this._list[i] == p_item) return true;
		}
		return false;
	}
	ListCollectionView.prototype.createCursor = function() {
		throw new Error('not implemented yet');
	}
	ListCollectionView.prototype.disableAutoUpdate = function() {
		throw new Error('not implemented yet');
	}
	ListCollectionView.prototype.enableAutoUpdate = function() {
		throw new Error('not implemented yet');
	}
	ListCollectionView.prototype.getItemAt = function(index, prefetch) {
		if(prefetch === undefined) prefetch = 0;
		throw new Error('not implemented yet');
	}
	ListCollectionView.prototype.getItemIndex = function(p_item) {
		for(var i in this._list) {
			if(this._list[i] == p_item) return i;
		}
		
		return null;
	}
	ListCollectionView.prototype.initialized = function(p_document, id) {
		throw new Error('not implemented yet');
	}
	ListCollectionView.prototype.itemUpdated = function(p_item, property, oldValue, newValue) {
		throw new Error('not implemented yet');
	}
	ListCollectionView.prototype.refresh = function() {
		throw new Error('not implemented yet');
	}
	ListCollectionView.prototype.removeAll = function() {
		while(this._list.length) this._list.pop();
	}
	ListCollectionView.prototype.removeItemAt = function(index) {
		if(!this._list[index]) throw new Error('There is no item at that specified index');
		else this._list.splice(index, 1);
	}
	ListCollectionView.prototype.setItemAt = function(p_item, index) {
		if(!this._list[index]) throw new Error('There is no item at that specified index');
		else this._list[index] = p_item;
	}
	
	/**
	 * ArrayCollection Class
	 */
	var ArrayCollection = class extends ListCollectionView {
		constructor() {
			super();

			this.source = arr;
		}
	}
	
	/**
	 * FocusManager Class
	 */
	com.flanvas.managers.FocusManager = class {
		constructor(container) {
			this._container = container;
			this._focus = container;
		}
	}
	com.flanvas.managers.FocusManager.prototype.getFocus = function() {
		return this._focus;
	}
	com.flanvas.managers.FocusManager.prototype.setFocus = function(component) {
		if(this._focus && this._focus != component) this._focus.dispatchEvent(new com.flanvas.events.FocusEvent(com.flanvas.events.FocusEvent.FOCUS_OUT));
		this._focus = component;
		this._focus.dispatchEvent(new com.flanvas.events.FocusEvent(com.flanvas.events.FocusEvent.FOCUS_IN));
	}
	
	/**
	 * Capabilities class
	 */
	com.flanvas.system.Capabilities = class {};
	com.flanvas.system.Capabilities.__defineGetter__('os', function() {
		return navigator.appVersion;
	});
	
	/**
	 * BitmapData Class
	 */
	var BitmapData = class extends Object {
		constructor(width, height, transparent, fillColor) {
			this._alpha = 1.0;
			this._imageData = undefined;
			this._source = undefined;
			
			this.__defineGetter__('alpha', function() {
				return this._alpha;
			});
			this.__defineSetter__('alpha', function(val) {
				this._alpha = +val;
				var spread = 4;
				for(var i = 0; i < this._imageData.data.length / spread; ++i) {
					this._imageData.data[i*spread + 3] = this._alpha * 255;
				}
			});
			this.__defineGetter__('height', function() {
				if(this._imageData) return this._imageData.height;
				return 0;
			});
			this.__defineGetter__('width', function() {
				if(this._imageData) return this._imageData.width;
				return 0;
			});
		}
	}
	BitmapData.prototype.draw = function(source) {
		this._source = source;
		var ctx = stage.ctx;
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
	 * Error Class
	 */
	class Error extends Object {
		constructor(msg) {
			super();

			this._msg;
		
			try {
				// need to trip the try/catch in order to get an error stack
				just.tripping.the = "try/catch block";
			} catch(e) {
				var agent = navigator.userAgent.toLowerCase();
				var arr = String(e.stack).split('\n');
				
				if(agent.indexOf("firefox") > -1) {
					arr.pop();
				}
				if (agent.indexOf("chrome") > -1) {
					arr.shift();
				}

				arr.shift();
				arr.shift();
				arr.unshift(msg);
				this._msg = arr.join("\n-> ");
			}
		}

		toString() {
			return this._msg;
		}
	}
	
	/**
	 * ArgumentError class
	 */
	class ArgumentError extends Error {}
	
	/**
	 * Rect Class
	 */
	class Rectangle extends Object {
		constructor(x, y, width, height) {
			super();

			if(x === undefined) x = 0;
			if(y === undefined) y = 0;
			if(width === undefined) width = 0;
			if(height === undefined) height = 0;
			
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		}
	}

	/**
	 * com.flanvas.events.EventDispatcher Class
	 * Have to declare this class out of order because it's the top level custom class :(
	 */
	com.flanvas.events.EventDispatcher = class extends Object {
		constructor() {
			super();

			this._interval_id = undefined;
			this._listeners = [];
			
			var self = this;
			if(_f) _f.intervalManager.addEventListener(Event.ENTER_FRAME, function(event) {
				self.dispatchEvent(new Event(Event.ENTER_FRAME));
			});
		}

		addEventListener(type, listener, useCapture, priority) {
			if(!type) throw new ArgumentError("parameter type must be specified");
			if(!listener) throw new ArgumentError("parameter listener must be specified");
			if(useCapture === undefined) useCapture = false;
			if(isNaN(priority)) priority = 0;
				else if(priority < 0) throw new ArgumentError("parameter priority must be a valid integer");

			window.oncontextmenu = null; // enable right click by default
			
			// check for duplicate listeners
			for(var i = 0; i < this._listeners.length; ++i) {
				var obj = this._listeners[i];
				if((obj.type == type) && (obj.listener == listener)) return null;

				if(obj.type == MouseEvent.RIGHT_CLICK
				|| obj.type == MouseEvent.RIGHT_MOUSE_DOWN
				|| obj.type == MouseEvent.RIGHT_MOUSE_UP)
					window.oncontextmenu = function() { return false; } // disable context menu if listening for right click
			}
			
			this._listeners.push({
				"type":type, 
				"listener":listener,
				"useCapture":useCapture,
				"priority":priority,
				"target":null,
				"currentTarget":this,
			});
			
			// put higher numbers first
			this._listeners.sort(function(a, b) {
				return b.priority - a.priority;
			});
		}
	}
	/**
	 * using the capture phase doesn't actually work yet..
	 */
	com.flanvas.events.EventDispatcher.prototype.dispatchEvent = function(event) {
		if(!event.target) event.target = this;
		
		for(var i in this._listeners) {
			var listener = this._listeners[i];
			
			if((listener.type == event.type)) {
				event.currentTarget = listener.currentTarget;
				if(listener.listener instanceof Array) {
					listener.listener[0][listener.listener[1]].call(listener.listener[0], event);
				} else {
					listener.listener.call(event.currentTarget, event);
				}
			}
		}
		
		// fire bubbling events AFTER the original event has been fired.
		if(event.bubbles) {
			if(this.parent) this.parent.dispatchEvent(event);
		}
	}
	com.flanvas.events.EventDispatcher.prototype.removeEventListener = function(type, listener) {
		for(var i = 0; i < this._listeners.length; ++i) {
			var obj = this._listeners[i]
			if((obj.type == type) && (obj.listener == listener)) {
				this._listeners.splice(i, 1);
				return 0;
			}
		}
		return 1;
	}
	
	/**
	 * BitmapFilter
	 */
	com.flanvas.filters.BitmapFilter = class extends Object {}
	com.flanvas.filters.BitmapFilter.prototype.instruct = function(str) {
		eval('var ctx = stage.canvas.getContext(stage._context)');
		eval(str);
		if(_f.traceDraw) trace(str);
	}
	
	/**
	 * DropShadowFilter
	 */
	com.flanvas.filters.DropShadowFilter = class extends com.flanvas.filters.BitmapFilter {
		constructor(color, blur, offsetX, offsetY) {
			super();

			if(!color) color = 'rgb(0,0,0)';
			if(!blur) blur = 2.0;
			if(!offsetX) offsetX = 5.0;
			if(!offsetY) offsetY = 5.0;
			
			this._blur = blur;
			this._color = color;
			this._offsetX = offsetX;
			this._offsetY = offsetY;
			
			this.__defineGetter__('blur', function(val) {
				this._blur = +val;
			});
			this.__defineSetter__('blur', function() {
				return this._blur;
			});
			this.__defineGetter__('color', function() {
				return this._color;
			});
			this.__defineSetter__('color', function(val) {
				this._color = val;
			});
			this.__defineGetter__('offsetX', function() {
				return this._offsetX;
			});
			this.__defineSetter__('offsetX', function(val) {
				this._offsetX = +val;
			});
			this.__defineGetter__('offsetY', function() {
				return this._offsetY;
			});
			this.__defineSetter__('offsetY', function(val) {
				this._offsetX = +val;
			});
		}
	}
	com.flanvas.filters.DropShadowFilter.prototype.drawSelf = function() {
		this.instruct('ctx.shadowOffsetX = this._offsetX;');
		this.instruct('ctx.shadowOffsetY = this._offsetY;');
		this.instruct('ctx.shadowBlur = this._blur;');
		this.instruct('ctx.shadowColor = this._color;');
	}
	
	/**
	 * DisplayObject Class
	 */
	com.flanvas.display.DisplayObject = class extends com.flanvas.events.EventDispatcher {
		constructor() {
			super();

			this._alpha = 1.0;
			/**
			 * stores the Rect which is the absloute bounds of the box. 
			 * This box ends when there is no longer visual data for the object.
			*/
			this._boundingBox = new Rectangle(Infinity, Infinity, -Infinity, -Infinity);
			/**
			 * When the bounds are validated, no bounding box is re-drawn.
			 * Bounds need validation otherwise a bounding box will appear to be wrong when
			 * a DisplayObject has be rotated. This happens because rotation does not trigger
			 * a general validation so boundsValidated was born for this purpose.
			 */
			this._boundsValidated = false;
			this._filters = [];
			this._last_mouse_down_time = undefined;
			this._mask = undefined;
			this._mouse_x = 0;
			this._mouse_y = 0;
			this._name = "";
			/** 
			 * The Source Offset is the offset from 0,0 for the source context of a display item.
			 * For example: When a circle is drawn, 3/4 of the circle is draw outside the visible
			 * area of the source context. the Source Offset allows the context to grow in size, but
			 * keep the relative position of the 0,0 for the object.
			 */
			this._sourceOffset = new Point(Infinity, Infinity);
			this._rotation = 0;
			this._root = undefined;
			this._stage = undefined;
			this._scale_x = 1.0;
			this._scale_y = 1.0;
			this._show_bounding_box = false;
			this._show_origin = false;
			/**
			 * _source holds the source context (canvas element) for the original drawing of this item.
			 * The _source is only changed when drawing requires "validation" (changing color, adding graphics, etc)
			 */
			this._source = Utils.virtualContext(false);
			this._transform;
			this._x = 0;
			this._y = 0;
			this._validated = false;
			
			this.parent = undefined;
			this.visible = true;
			
			var self = this;
			this.__defineGetter__('absAlpha', function() {
				if(this.parent) return this.parent.absAlpha * this.alpha;
				return this.alpha;
			});
			this.__defineGetter__('absNumChildren', function() {
			});
			this.__defineGetter__('absDepth', function() {
			});
			this.__defineGetter__('absRotation', function() {
				if(this.parent) return this.parent.absRotation + this.rotation;
				return this.rotation;
			});
			this.__defineGetter__('absScaleX', function() {
				if(this.parent) return this.parent.absScaleX * this.scaleX;
				return this.scaleX;
			});
			this.__defineGetter__('absScaleY', function() {
				if(this.parent) return this.parent.absScaleY * this.scaleY;
				return this.scaleY;
			});
			this.__defineGetter__('absX', function() {
				var dx = this.x;// + this.parent.absScaleX;
				if(this.parent) {
					var dy = this.y;// + this.parent.absScaleY;
					// incorporate parent's rotation
					var ld2p = Math.sqrt(dx*dx + dy*dy); // local
					var gang = this.parent.absRotation / 180 * Math.PI; // global total rotation for parent
					var latan2 = Math.atan2(dy, dx); // local atan2 rads
					
					//local
					return this.parent.absX + Math.cos(latan2 + gang) * ld2p;
				}
				return dx;
			});
			this.__defineGetter__('absY', function() {
				var dy = this.y;// + this.parent.absScaleY;
				if(this.parent) {
					// incorporate parent's rotation
					var dx = this.x;// + this.parent.absScaleX;
					var ld2p = Math.sqrt(dx*dx + dy*dy); // local
					var gang = this.parent.absRotation / 180 * Math.PI; // global total rotation for parent
					var latan2 = Math.atan2(dy, dx); // local atan2 rads
					
					//local
					return this.parent.absY + Math.sin(latan2 + gang) * ld2p;
				}
				return dy;
			});
			this.__defineGetter__('alpha', function() {
				return self._alpha;
			});
			this.__defineSetter__('alpha', function(val) {
				if(isNaN(val)) throw new ArgumentError("Value must be a Number.");
				
				self._alpha = +val;
				self.invalidate();
			});
			this.__defineGetter__('drawBoundingBox', function() {
				return this._show_bounding_box;
			});
			this.__defineSetter__('drawBoundingBox', function(bool) {
				this._show_bounding_box = bool;
				this.invalidate();
			});
			/**
			 * This allows the developer / designer to see the origin
			 * of the DisplayObject they are working with
			 */
			this.__defineGetter__('drawOrigin', function() {
				return self._show_origin;
			});
			this.__defineSetter__('drawOrigin', function(bool) {
				self._show_origin = bool;
				self.invalidate();
			});
			this.__defineGetter__('filters', function() {
				return this._filters;
			});
			this.__defineSetter__('filters', function(arr) {
				this._filters = arr;
				self.invalidate();
			});
			this.__defineGetter__('height', function() {
				if(this._boundingBox.width > -Infinity) return this._boundingBox.width * this.absScaleX;

				//when height is not immediately available via the bounding box, use this as a plan b
				var r = new Rectangle(0, 0, 0, 0);
				if(self._children) {
					for(var c = 0; c < self._children.length; ++c) {
						if(self._children[c].y < r.y) r.y = self._children[c].y;
						if(self._children[c].y + self._children[c].height > r.height) r.height = self._children[c].y + self._children[c].height;
					}
				}
				
				if(self.graphics._points) {
					for(var p = 0; p < self.graphics._points.length; ++p) {
						var pt = self.graphics._points[p];
						var rp = self.pp(pt.x, pt.y);
						if(rp.y - self.absY < r.y) r.y = rp.y - self.absY;
						if(rp.y - self.absY > r.height) r.height = rp.y - self.absY;
					}
				}

				return r.height * self.absScaleY;
			});
			this.__defineSetter__('height', function(val) {
				if(isNaN(val)) throw new ArgumentError("Height must be a Number.");
				if(this.height > 0) {
					this._source.height = +val;
					this.scaleY = +val / this.height;
				} else this.scaleY = 0;
				self.invalidate();
			});
			this.__defineGetter__('mask', function() {
				return this._mask;
			});
			this.__defineSetter__('mask', function(obj) {
				this._mask = obj;
				
			});
			this.__defineGetter__('mouseX', function() {
				return this.stage.mouseX - this.absX;
			});
			this.__defineGetter__('mouseY', function() {
				return this.stage.mouseY - this.absY;
			});
			this.__defineGetter__('name', function(val) {
				return self._name;
			});
			this.__defineSetter__('name', function(val) {
				if(self.parent && self.name) self.parent[self.name] = undefined;
				self._name = val;
				if(self.parent) self.parent[self.name] = self;
			});
			this.__defineGetter__('root', function() {
				return self._root;
			});
			this.__defineGetter__('rotation', function() {
				return self._rotation;
			});
			this.__defineSetter__('rotation', function(val) {
				self._rotation = +val;
				this._boundsValidated = false;
			});
			this.__defineGetter__('stage', function() {
				return self._stage;
			});
			this.__defineGetter__('transform', function() {
				return self._transform;
			});
			this.__defineSetter__('transform', function(obj) {
				obj._displayObject = this;
				this._transform = obj;
				this._boundsValidated = false;
			});
			this.__defineGetter__('x', function() {
				if(this.parent) return this._x * this.parent.absScaleX;
				return this._x;
			});
			this.__defineSetter__('x', function(val) {
				self._x = +val;
				this._boundsValidated = false;
			});
			this.__defineGetter__('y', function() {
				if(this.parent) return this._y * this.parent.absScaleY;
				return this._y;
			});
			this.__defineSetter__('y', function(val) {
				self._y = +val;
				this._boundsValidated = false;
			});
			this.__defineGetter__('width', function() {
				if(this._boundingBox.width > -Infinity) return this._boundingBox.width * this.absScaleX;

				//when width is not immediately available via the bounding box, use this as a plan b
				var r = new Rectangle(0, 0, 0, 0);
				if(this._children) {
					for(var c = 0; c < this._children.length; ++c) {
						if(this._children[c].x < r.x) r.x = this._children[c].x;
						if(this._children[c].x + this._children[c].width > r.width) r.width = this._children[c].x + this._children[c].width;
					}
				}
				
				if(this.graphics._points) {
					for(var p = 0; p < this.graphics._points.length; ++p) {
						var pt = this.graphics._points[p];
						var rp = this.pp(pt.x, pt.y);
						if(rp.x - this.absX < r.x) r.x = rp.x - this.absX;
						if(rp.x - this.absX > r.width) r.width = rp.x - this.absX;
					}
				}
				
				return r.width * this.absScaleX;
			});
			this.__defineSetter__('width', function(val) {
				if(isNaN(val)) throw new ArgumentError("value must be a number");
				if(this.width > 0) {
					this._source.width = +val;
					this.scaleX = +val / this.width;
				} else this.scaleX = 0;
				this.invalidate();
			});
			this.__defineGetter__('scaleX', function() {
				return this._scale_x;
			});
			this.__defineSetter__('scaleX', function(val) {
				if(isNaN(val) || !isFinite(val)) throw new ArgumentError("value must be a number");
				this._scale_x = +val;
				this.invalidate();
			});
			this.__defineGetter__('scaleY', function() {
				return this._scale_y;
			});
			this.__defineSetter__('scaleY', function(val) {
				if(isNaN(val)) throw new ArgumentError("value must be a number");
				this._scale_y = +val;
				this.invalidate();
			});
			
			this.name = _f.genId();
			
			this.graphics = new Graphics();
			this.graphics.displayObject = this;
			
			var self = this;
			this.addEventListener(Event.ADDED_TO_STAGE, function(event) {
				self._root = _f;
				self._stage = _f.stage;
			});
			this.addEventListener(Event.REMOVED, function(event) {
				self._root = undefined;
				self.parent[event.target.name] = undefined;
			});
			this.addEventListener(Event.REMOVED_FROM_STAGE, function(event) {
				self.parent = undefined;	
			});

			this.transform = new Transform();

			//this.drawOrigin = true;
			//this.drawBoundingBox = true;
			//this.drawStageObjects = true;
		}
	}
	com.flanvas.display.DisplayObject.prototype.drawSelf = function() {
		if(this.visible && this.root) {
			var arr = this.graphics.data;
			//var ctx = _f.stage.ctx;
			var ctx = this._source.getContext("2d");
			
			// draw graphics
			if(this.visible)  {
				if(!this._validated) {
					// validate this item.
					this._validated = true;

					/**
					 * I'm using this to define gradients used by SVG
					 */
					for(var i in Graphics.gradients) {
						for(var ii in Graphics.gradients[i]) {
							try {
								var lave = Graphics.gradients[i][ii];
								eval(lave);
							} catch(e) {
								new Error(e);
							}
						}
					}
					
					// draw filters
					for(i in this.filters) {
						this.filters[i].drawSelf();
						if(_f.traceDraw) trace(this.filters[i]._instructions[j]);
					}

					this.updateSourceOffset(); // this will take an object with multiple dras and still find the correct source offset
					this.updateBoundingBox();

					/**
					 * before the new draw, make sure the sources are snug and concise
					 */
					this._source.width = this._boundingBox.width;
					this._source.height = this._boundingBox.height;

					for(var i in arr) {
						try {
							if(arr[i] instanceof Array) {
								var cmd = arr[i][0];
								switch(cmd) {
									case Instruction.ARC:
										// offset.x < x + radius
										var radius = arr[i][3];

										// [Instruction.ARC, x, y, radius, start_angle, end_angle, anti_clockwise]

										// before using transforms
										//var pt = this.pp(arr[i][1], arr[i][2]);
										ctx.arc(0 + radius, 0 + radius, radius, arr[i][4], arr[i][5], arr[i][6]);
										//ctx.arc(this._sourceOffset.x + arr[i][1], this._sourceOffset.y + arr[i][2], arr[i][3], arr[i][4], arr[i][5], arr[i][6]);
									break;
									case Instruction.BEGINPATH:
										// [Instruction.BEGINPATH]
										ctx.beginPath();
									break;
									case Instruction.BEZIERCURVETO:
										// [Instruction.BEZIERCURVETO, cp1x, cp1y, cp2x, cp2y, x, y]
										var cp1 = this.pp(arr[i][1], arr[i][2]);
										var cp2 = this.pp(arr[i][3], arr[i][4]);
										var pt = this.pp(arr[i][5], arr[i][6]);
										ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, pt.x, pt.y);

										//ctx.bezierCurveTo(arr[i][1], arr[i][2], arr[i][3], arr[i][4], arr[i][5], arr[i][6]);
									break;
									case Instruction.CLIP:
										// [Instruction.CLIP]
										ctx.clip();
									break;
									case Instruction.CLOSEPATH:
										// [Instruction.CLOSEPATH]
										ctx.closePath();
									break;
									case Instruction.FILL:
										// [Instruction.FILL]
										ctx.fill();
									break;
									case Instruction.FILLSTYLE:
										// [Instruction.FILLSTYLE, Utils.rgba(val)]
										ctx.fillStyle = this.graphics.compileStyle(arr[i][1]);
									break;
									case Instruction.LINECAP:
										// [Instruction.LINECAP, val]
										ctx.lineCap = arr[i][1];
									break;
									case Instruction.LINEJOIN:
										// [Instruction.LINEJOIN]
										ctx.lineJoin = arr[i][1];
									break;
									case Instruction.LINETO:
										// [Instruction.LINETO, x, y]
										//var pt = this.pp(arr[i][1], arr[i][2]);
										//ctx.lineTo(pt.x, pt.y);
										
										//ctx.lineTo(arr[i][1], arr[i][2]);

										var x = arr[i][1];
										var y = arr[i][2];

										x -= this._sourceOffset.x;
										y -= this._sourceOffset.y;

										ctx.lineTo(x, y);
									break;
									case Instruction.LINEWIDTH:
										// [Instruction.LINEWIDTH, val]
										var w = arr[i][1];

										ctx.lineWidth = w;
									break;
									case Instruction.MITERLIMIT:
										// [Instruction.MITERLIMIT, val]
										ctx.miterLimit = arr[i][1];
									break;
									case Instruction.MOVETO:
										// [Instruction.MOVETO, x, y]
										
										//var pt = this.pp(arr[i][1], arr[i][2]);
										//ctx.moveTo(pt.x, pt.y);

										//ctx.moveTo(arr[i][1] - this._sourceOffset.x, arr[i][2] - this._sourceOffset.y);

										var x = arr[i][1];
										var y = arr[i][2];
										//this.name == "boxu3" ? trace(x, this._sourceOffset, this._sourceOffset.x, x - this._sourceOffset.x) :0;

										x -= this._sourceOffset.x;
										y -= this._sourceOffset.y;

										ctx.moveTo(x, y);
									break;
									case Instruction.QUADRATICCURVETO:
										// [Instruction.QUADRATICCURVETO, cpx, cpy, x, y]
										var cp = pp(arr[i][1], arr[i][2]);
										var pt = pp(arr[i][3], arr[i][4]);
										ctx.quadraticCurveTo(cp.x, cp.y, pt.x, pt.y);
									break;
									case Instruction.STROKE:
									// [Instruction.STROKE]
										ctx.stroke();
									break;
									case Instruction.STROKESTYLE:
									// [Instruction.STROKESTYLE, val]
										ctx.strokeStyle = this.graphics.compileStyle(arr[i][1]);
									break;
									case Instruction.TEXTFIELD:
										// [Instruction.TEXTFIELD]
										if(this.background) {
											ctx.fillStyle = this.backgroundColor;
											//ctx.fillRect(this.absX, this.absY, this.width + com.flanvas.text.TextField.PADDING.top + com.flanvas.text.TextField.PADDING.bottom, this.height + com.flanvas.text.TextField.PADDING.top + com.flanvas.text.TextField.PADDING.bottom);
											ctx.fillRect(0, 0, this.width + this.padding.left + this.padding.right, this.height + this.padding.top + this.padding.bottom);
										}
										if(this.border) {
											ctx.strokeStyle = this.borderColor;
											ctx.lineWidth = 1;
											//ctx.strokeRect(this.absX, this.absY, this.width + com.flanvas.text.TextField.PADDING.left + com.flanvas.text.TextField.PADDING.right, this.height + com.flanvas.text.TextField.PADDING.top + com.flanvas.text.TextField.PADDING.bottom);
											ctx.strokeRect(0, 0, this.width + this.padding.left + this.padding.right, this.height + this.padding.top + this.padding.bottom);
										}
										
										ctx.font = this.font;
										ctx.fillStyle = this.graphics.compileStyle(this.textColor);
										ctx.textAlign = this.autoSize;
										
										/**
										 * #warning This part needs mas work. Not the proper way to wrap text
										 */
										var text_Arr = this.text.split('\n');
										if(text_Arr.length > 1) {
											for(j = 0; j < text_Arr.length; ++j) {
												//ctx.fillText(text_Arr[j], this.absX + com.flanvas.text.TextField.PADDING.left, this.absY + this.height + (this.size * j), this.width);
												ctx.fillText(text_Arr[j], this.padding.left, this.height + (this.size * j), this.width);
											}
										} else {
											// no wrap
											//ctx.fillText(this.text, this.absX + com.flanvas.text.TextField.PADDING.left, this.absY + this.height, this.width);
											ctx.fillText(this.text, 0 - this._sourceOffset.x, this.height, this.width);
										}
									
										if(this._cursor_visible) {
											var w = this.absX + ctx.measureText(this.text.substr(0, this.caretIndex)).width + this.padding.left;
											ctx.beginPath();
											ctx.moveTo(w, this.padding.top);
											ctx.lineTo(w, this.height - this.padding.top);
											ctx.closePath();
											ctx.stroke();
										}
									break;
								}
								
								if(stage.drawStageObjects) {
									try {
										document.replaceChild(document.getElementById(this.name), this._source);
									} catch(e) {
										var self = this;
										this._source.setAttribute("id", this.name);
										var defaultStyle = function() {
											self._source.setAttribute("style", "display:block; border:1px dotted gray; margin:2px 0; padding:5px;");
										};
										this._source.addEventListener("mouseover", function(){
											self._source.setAttribute("style", "display:block; border:none; margin:3px 1px; padding:5px;");
										});
										this._source.addEventListener("mouseout", defaultStyle);
										defaultStyle();
										document.body.appendChild(this._source);
									}
								}
							} else {
								eval(arr[i]);
							}
							if(_f.traceDraw) trace(arr[i]);
						} catch(e) {
							throw new Error(e.print + "; " + arr[i]);
						}
					}
				} else {
					// just draw the existing DisplayObject
					if(this._source.height > 0 && this._source.width > 0) {
						// TODO m11 through m22 will need to be used for transformation changes.
						var m11,m12,m21,m22,x,y;
						m11 = this.absScaleX;
						m12 = 0;
						m21 = 0;
						m22 = this.absScaleY;
						x = this.x;// - this._sourceOffset.x;
						y = this.y;// - this._sourceOffset.y;

						
						if(this.parent) {
							// incorporate parent's rotation
							var dx = this.x;
							var dy = this.y;
							var ld2p = Math.sqrt(dx*dx + dy*dy); // local
							var gang = this.parent.absRotation / 180 * Math.PI; // global total rotation (not including this)
							var latan2 = Math.atan2(dy, dx); // local atan2 rads
							
							// adding local rot with parent+ rot to get the total rotation
							x = this.parent.absX + Math.cos(latan2 + gang) * ld2p;				
							y = this.parent.absY + Math.sin(latan2 + gang) * ld2p;
						}
						
						_f.stage.ctx.save();
						// #warning establish a valid transform (similar to as3)
						_f.stage.ctx.setTransform(m11,m12,m21,m22,x,y);
						_f.stage.ctx.rotate(this.absRotation * Math.PI / 180);
						_f.stage.ctx.drawImage(this._source, this._sourceOffset.x, this._sourceOffset.y);
						_f.stage.ctx.restore();
					}
				}
				
				try {
					this._is_mouse_in_path = ctx.isPointInPath(this.stage.mouseX, this.stage.mouseY);
				} catch(e) {
					throw new Error(e);
				}
				
				// clean up all colors and strokes for so items drawn next don't get confused.
				// Note- I added this because shadows were being added to everything
				ctx.fillStyle = "rgba(0,0,0,0)";
				ctx.strokeStyle = "rgba(0,0,0,0)";
				ctx.shadowColor = "rgba(0,0,0,0)";
			}
			
			if(this.visible) {
				/**
				 * continue the drawing command to all the children
				 * AFTER this object has drawn. This way children will 
				 * be displayed over the top of the parent.
				 * 
				 * only applies to DisplayObjectContainer subclasses.
				 */
				for(var i = 0; i < this.numChildren; ++i) this.getChildAt(i).drawSelf();

				var ctx = stage.ctx;
				
				/** 
				 * allows the developer to set a flag which shows the bounding box by
				 * representation of red lines resembline a box.
				 */
				!this._boundsValidated && this.updateBoundingBox();
				if(this.drawBoundingBox) {
					var size = 1;

					var d = [];
					var r = [];
					var xx, yy, xxw, yyh;

					xx = this.absX + this._boundingBox.x;
					yy = this.absY + this._boundingBox.y;
					xxw = this.absX + this._boundingBox.x + this._boundingBox.width;
					yyh = this.absY + this._boundingBox.y + this._boundingBox.height;

					ctx.lineWidth = 1;
					ctx.strokeStyle = "rgb(255,0,0)";
					ctx.beginPath();
					ctx.moveTo(xx, yy);
					ctx.lineTo(xxw, yy);
					ctx.lineTo(xxw, yyh);
					ctx.lineTo(xx, yyh);
					ctx.lineTo(xx, yy);
					ctx.stroke();
				}

				/**
				 * allows the developer to set a flag which shows the origin (0, 0) by
				 * representation of a small black +
				 */
				if(this.drawOrigin) {
					var size = 3;

					ctx.globalCompositeOperation = "xor";
					ctx.lineWidth = 1;
					ctx.strokeStyle = "rgb(0,0,0)";
					ctx.beginPath();
					ctx.moveTo(this.absX, this.absY - size);
					ctx.lineTo(this.absX, this.absY + size);
					ctx.moveTo(this.absX - size, this.absY);
					ctx.lineTo(this.absX + size, this.absY);
					ctx.stroke();
					ctx.globalCompositeOperation = "source-over";
				}
			}
		}
	}
	com.flanvas.display.DisplayObject.prototype.getBounds = function() {
		var r = new Rectangle(0, 0, 0, 0);

		if(this.graphics._points) {
			for(var p = 0; p < this.graphics._points.length; ++p) {
				var pt = this.graphics._points[p];
				var rp = this.pp(pt.x, pt.y);
				if(rp.x - this.absX < r.x) r.x = rp.x - this.absX;
				if(rp.x - this.absX > r.width) r.width = rp.x - this.absX;
				if(rp.y - self.absY < r.y) r.y = rp.y - self.absY;
				if(rp.y - self.absY > r.height) r.height = rp.y - self.absY;
			}
		}

		return r;
	}
	com.flanvas.display.DisplayObject.prototype.globalToLocal = function(point) {
		if(!(point instanceof Point)) throw new ArgumentError("A Point is required.");
		var pt = new Point(point.x - this.absX, point.y - this.absY);
		pt.oldx = point.x;
		pt.absx = this.absX;
		return pt;
	}
	com.flanvas.display.DisplayObject.prototype.hitTestPoint = function(x, y, shapeFlag) {
		if(shapeFlag === undefined) shapeFlag = false;

		if(!shapeFlag) {
			if(x > this._boundingBox.x
			&& x < this.width + this._boundingBox.x
			&& y > this._boundingBox.y
			&& y < this.height + this._boundingBox.y) {
				return true;
			}
		} else {
			throw new Error("Performing a hit test by pixel has not been implemented yet.");
		}

		return false;
	}
	com.flanvas.display.DisplayObject.prototype.invalidate = function() {
		this._validated = false;
	}
	com.flanvas.display.DisplayObject.prototype.localToGlobal = function(point) {
		if(point === undefined) throw new ArgumentError("A Point is required");
		return new Point(point.x + this.absX, point.y + this.absY);
	}
	// 
	/**
	 * pp is short for Presentation Point
	 * 
	 * Takes an x and y inside the object and spits out a point
	 * that has been effect by all the properties of the object
	 * such as parents location, scale and rotation
	 */
	com.flanvas.display.DisplayObject.prototype.pp = function(x, y) {
		var to_x = x, to_y = y;
		var o = this;
		while(o) {
			var ang, hyp, rads;
		
			rads = Math.atan2(y, x);
			// this next line was commented out when rotation started using ctx.rotate
			//rads += o.rotation / 180 * Math.PI;
			
			//hyp = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
			// below is a little faster
			hyp = Math.sqrt(x*x + y*y);
			
			to_x = hyp * Math.cos(rads) * o.scaleX;
			to_y = hyp * Math.sin(rads) * o.scaleY;
			
			to_x += o.x;
			to_y += o.y;
			
			o = o.parent;
		}
		
		// !! move this to an array of [x,y] as it will be a bit faster
		var r = {'x':to_x, 'y':to_y};

		// code below was messing up relative path instructions for SVG
		/*if(this._sourceOffset.x == Infinity) {
			this._sourceOffset.x = this.x;
			throw new Error("A source offset property is Infinity");
		}
		if(this._sourceOffset.y == Infinity) {
			this._sourceOffset.y = this.y;
			throw new Error("A source offset property is Infinity");
		}
		r.x += this._sourceOffset.x;
		r.y += this._sourceOffset.y;*/

		return r;
	}
	com.flanvas.display.DisplayObject.prototype.updateBoundingBox = function() {
		this._boundsValidated = true;
		this._boundingBox = new Rectangle(Infinity, Infinity, -Infinity, -Infinity);

		for(var i = 0; i < this.graphics.data.length; ++i) {
			var arr = this.graphics.data[i];
			var cmd = arr[0];
			switch(cmd) {
				case Instruction.ARC:
					// [Instruction.ARC, x, y, radius, start_angle, end_angle, anti_clockwise]
					var x = arr[1];
					var y = arr[2];
					var radius = arr[3];
					if(x - radius * this.absScaleX < this._boundingBox.x) this._boundingBox.x = x - radius * this.absScaleX;
					if(y - radius * this.absScaleY < this._boundingBox.y) this._boundingBox.y = y - radius * this.absScaleY;
					if(radius*2 * this.absScaleX > this._boundingBox.width) this._boundingBox.width = radius*2 * this.absScaleX;
					if(radius*2 * this.absScaleY > this._boundingBox.height) this._boundingBox.height = radius*2 * this.absScaleY;

					//if(this.name == "circ0") trace(x, y);
				break;
				case Instruction.BEGINPATH:
					// [Instruction.BEGINPATH]
				break;
				case Instruction.BEZIERCURVETO:
					// [Instruction.BEZIERCURVETO, cp1x, cp1y, cp2x, cp2y, x, y]
				break;
				case Instruction.LINECAP:
					// [Instruction.LINECAP, val]
				break;
				case Instruction.LINEJOIN:
					// [Instruction.LINEJOIN]
				break;
				break;
				case Instruction.LINEWIDTH:
					// [Instruction.LINEWIDTH, val]
					var w = arr[1];

					if(w > this._boundingBox.width) this._boundingBox.width = w;
					if(w > this._boundingBox.height) this._boundingBox.height = w;
				break;
				case Instruction.MITERLIMIT:
					// [Instruction.MITERLIMIT, val]
				break;
				case Instruction.LINETO:
					// [Instruction.LINETO, x, y]
				case Instruction.MOVETO:
					// [Instruction.MOVETO, x, y]
					var x = arr[1];
					var y = arr[2];
					var d = Math.sqrt(x*x + y*y); // distance to point from 0,0
					var r = Math.atan2(y, x) + (this.absRotation / 180 * Math.PI);// radians to the point from 0,0

					x = Math.cos(r) * d;
					y = Math.sin(r) * d;

					if(x < this._boundingBox.x) this._boundingBox.x = x;
					if(y < this._boundingBox.y) this._boundingBox.y = y;
					//if(Math.abs(x) > this._boundingBox.width) this._boundingBox.width = Math.abs(x);
					//if(Math.abs(y) > this._boundingBox.height) this._boundingBox.height = Math.abs(y);
				break;
				case Instruction.QUADRATICCURVETO:
					// [Instruction.QUADRATICCURVETO, cpx, cpy, x, y]
				break;
				case Instruction.STROKE:
					// [Instruction.STROKE]
				break;
				case Instruction.STROKESTYLE:
					// [Instruction.STROKESTYLE, val]
				break;
				case Instruction.TEXTFIELD:
					// [Instruction.TEXTFIELD]
					var ctx = Utils.virtualContext();
					ctx.font = this.font;
					var w = ctx.measureText(this.text).width;
					var h = +this.size.replace(/\D/g, ''); // get the line height
					var m = this.size.match(/\n/g);
					if(m && m.length > 0) h *= m.length;
					h += this.padding.bottom;
					
					// !! THE NEXT TWO LINES ARE PROBABLY WRONG
					this._boundingBox.x = 0;
					this._boundingBox.y = 0;

					if(w > this._boundingBox.width) this._boundingBox.width = w;
					if(h > this._boundingBox.height) this._boundingBox.height = h;

					ctx = null;
				break;
			}
		}

		// find the longest lines inside the graphics to decide bounding box width and height
		for(var i = 0; i < this.graphics._points.length; ++i) {
			var ptA = this.graphics._points[i];
			for(var j = 0; j < this.graphics._points.length; ++j) {
				var ptB = this.graphics._points[j];
				var xA = ptA.x - this._sourceOffset.x;
				var yA = ptA.y - this._sourceOffset.y;
				var xB = ptB.x - this._sourceOffset.x;
				var yB = ptB.y - this._sourceOffset.y;
				var d = Math.sqrt(Math.pow(xB - xA, 2) + Math.pow(yB - yA, 2)); // distance from ptA to ptB
				var r = Math.atan2(yB - yA, xB - xA) + (this.absRotation / 180 * Math.PI);// radians regarding the relationship of ptA and ptB
				
				if(Math.abs(Math.cos(r) * d) * this.absScaleX > this._boundingBox.width) this._boundingBox.width = Math.abs(Math.cos(r) * d) * this.absScaleX;
				if(Math.abs(Math.sin(r) * d) * this.absScaleY > this._boundingBox.height) this._boundingBox.height = Math.abs(Math.sin(r) * d) * this.absScaleY;
			}
		}
	}
	/**
	 * This updates the offset for drawing (different than the origin).
	 * This is needed since a circle is drawn from the center so you have to set a drawing off set of the radius.
	 * The same will need to be done for awkward shapes. Anything that has a drawing center other than top-left
	 */
	com.flanvas.display.DisplayObject.prototype.updateSourceOffset = function() {
		this._sourceOffset = new Point(Infinity, Infinity);

		for(var i = 0; i < this.graphics._data.length; ++i) {
			var arr = this.graphics._data[i];
			var cmd = arr[0];
			switch(cmd) {
				case Instruction.ARC:
					// [Instruction.ARC, x, y, radius, start_angle, end_angle, anti_clockwise]
					var x = arr[1], y = arr[2], radius = arr[3];
					if(x - radius < this._sourceOffset.x) this._sourceOffset.x = x - radius;
					if(y - radius < this._sourceOffset.y) this._sourceOffset.y = y - radius;
				break;
				case Instruction.BEGINPATH:
					// [Instruction.BEGINPATH]
				break;
				case Instruction.BEZIERCURVETO:
					// [Instruction.BEZIERCURVETO, cp1x, cp1y, cp2x, cp2y, x, y]
				break;
				case Instruction.LINECAP:
					// [Instruction.LINECAP, val]
				break;
				case Instruction.LINEJOIN:
					// [Instruction.LINEJOIN]
				break;
				break;
				case Instruction.LINEWIDTH:
					// [Instruction.LINEWIDTH, val]
				break;
				case Instruction.MITERLIMIT:
					// [Instruction.MITERLIMIT, val]
				break;
				case Instruction.LINETO:
					// [Instruction.LINETO, x, y]
				case Instruction.MOVETO:
					// [Instruction.MOVETO, x, y]
					var x = arr[1];
					var y = arr[2];

					if(x < this._sourceOffset.x) this._sourceOffset.x = x;
					if(y < this._sourceOffset.y) this._sourceOffset.y = y;

					//if(this.name == "boxu3") trace(this._sourceOffset, this._sourceOffset.x);
				break;
				case Instruction.QUADRATICCURVETO:
					// [Instruction.QUADRATICCURVETO, cpx, cpy, x, y]
				break;
				case Instruction.STROKE:
					// [Instruction.STROKE]
				break;
				case Instruction.STROKESTYLE:
					// [Instruction.STROKESTYLE, val]
				break;
				case Instruction.TEXTFIELD:
					// [Instruction.TEXTFIELD]

					var ctx = Utils.virtualContext();
					ctx.font = this.font;
					var w = ctx.measureText(this.text).width;

					switch(this.autoSize) {
						case com.flanvas.text.TextFieldAutoSize.LEFT:
						case com.flanvas.text.TextFieldAutoSize.NONE:
						case com.flanvas.text.TextFieldAutoSize.START:
							if(0 < this._sourceOffset.x) this._sourceOffset.x = 0;
						break;
						case com.flanvas.text.TextFieldAutoSize.CENTER:
							if(0-w/2 < this._sourceOffset.x) this._sourceOffset.x = 0-w/2;
							// #warning work height
						break;
						case com.flanvas.text.TextFieldAutoSize.RIGHT:
						case com.flanvas.text.TextFieldAutoSize.END:
							if(0-w < this._sourceOffset.x) this._sourceOffset.x = 0-w;
						break;
					}

					if(0 < this._sourceOffset.y) this._sourceOffset.y = 0;

					ctx = null;
					// delete ctx;
				break;
			}
		}
	}
	var DisplayObject = com.flanvas.display.DisplayObject;
	
	/**
	 * Transform Class
	 */
	var Transform = class {
		constructor() {
			this._displayObject;
			
			this.__defineGetter__('colorTransform', function() {
				return this._colorTransform;
			});
			this.__defineSetter__('colorTransform', function(obj) {
				obj._transform = this;
				this._colorTransform = obj;
			});

			this.colorTransform = new ColorTransform();
		}
	}
	
	/**
	 * ColorTransform Class
	 */
	var ColorTransform = class {
		constructor() {
			this._transform;
			this._color = undefined;
			
			this.__defineGetter__('color', function() {
				return this._color;
			});
			this.__defineSetter__('color', function(val) {
				this._color = Utils.rgba(val);
				
				var s = this._transform._displayObject._source.getContext("2d");
				s.fillStyle = this._color;
				s.fillRect(0, 0, s.width, s.height);
				s.fill();
			});
		}
	}
	
	/**
	 * Bitmap Class
	 */
	com.flanvas.display.Bitmap = class extends com.flanvas.display.DisplayObject {
		constructor(bitmapData) {
			this._bitmapData = bmpd;
			this._shear = {};
			
			this.__defineGetter__('bitmapData', function() {
				return this._bitmapData;
			});
			this.__defineSetter__('bitmapData', function(obj) {
				if(obj === undefined) throw new ArgumentError("obj must be defined");
				this._bitmapData = obj;
			});
			this.__defineGetter__('height', function() {
				return this.bitmapData.height * this.absScaleY;
			});
			this.__defineGetter__('width', function() {
				return this.bitmapData.width * this.absScaleX;
			});
			this.__defineGetter__('presentationData', function() {
				if(this.absAlpha != this.bitmapData.alpha) this.bitmapData.alpha = this.absAlpha;
				
				return this.bitmapData._imageData;
			});
			
			this.graphics.instruction("try{ ctx.drawImage(this.presentationData, 0, 0, this.presentationData.width, this.presentationData.height, this.absX, this.absY, this.width, this.height); } catch(e) {}");
			this.graphics.instruction("if(this._shear.m11) ctx.transform(this._shear.m11, this._shear.m12, this._shear.m21, this._shear.m22, 0, 0);");
		}
	}
	com.flanvas.display.Bitmap.prototype.shear = function() {
		// m21 controls the overall skew
		this._shear.m11 = 1;
		this._shear.m12 = 0;
		this._shear.m21 = 1;
		this._shear.m22 = 1;
		
		
		//stage.canvas.getContext(stage._context).transform(m11, m12, m21, m22, dx, dy);
	}
	var Bitmap = com.flanvas.display.Bitmap;
	
	/**
	 * InteractiveObject Class
	 */
	com.flanvas.display.InteractiveObject = class extends com.flanvas.display.DisplayObject {
		constructor() {
			super();

			this._is_mouse_in_path = false;
			this._mouse_enabled = true;

			this.__defineGetter__('mouseEnabled', function() {
				return this._mouse_enabled;
			});
			this.__defineSetter__('mouseEnabled', function(bool) {
				this._mouse_enabled = bool;
			});
			
			var self = this;
			this.addEventListener(FocusEvent.FOCUS_IN, function(event) {});
			this.addEventListener(FocusEvent.FOCUS_OUT, function(event) {});
			this.addEventListener(MouseEvent.MOUSE_DOWN, function(event) {
				self._last_mouse_down_time = Utils.getTimer();
			});
			this.addEventListener(MouseEvent.MOUSE_UP, function(event) {
				if(self._last_mouse_down_time + 200 > Utils.getTimer()) self.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false, this.mouseX, this.mouseY));
			});
			this.addEventListener(MouseEvent.ROLL_OUT, function(event) {
				if(self.buttonMode && self.useHandCursor) {
					document.body.style.cursor = 'default';
				}
			});
			this.addEventListener(MouseEvent.ROLL_OVER, function(event) {
				if(self.buttonMode && self.useHandCursor) {
					document.body.style.cursor = 'pointer';
				}
			});
		}
	}
	com.flanvas.display.InteractiveObject.prototype.isMouseTarget = function() {
		if(!this.mouseEnabled) return false;
		//if(this._is_mouse_in_path) return true;

		if(this.numChildren <= 0) return this.hitTestPoint(this.mouseX, this.mouseY, false);

		for(var i = 0; i < this.numChildren; ++i) {
			var c = this.getChildAt(i);
			if(c.isMouseTarget()) return c;
			//if(c.hitTestPoint(c.mouseX, c.mouseY, false)) return c;
		}
		
		return false;
	}
	var InteractiveObject = com.flanvas.display.InteractiveObject;
	
	/** 
	 * TextFieldAutoSize Class
	 */
	com.flanvas.text.TextFieldAutoSize = {};
	com.flanvas.text.TextFieldAutoSize.NONE = 'none';
	com.flanvas.text.TextFieldAutoSize.LEFT = 'left';
	com.flanvas.text.TextFieldAutoSize.CENTER = 'center';
	com.flanvas.text.TextFieldAutoSize.RIGHT = 'right';
	com.flanvas.text.TextFieldAutoSize.START = 'start';
	com.flanvas.text.TextFieldAutoSize.END = 'end';
	var TextFieldAutoSize = com.flanvas.text.TextFieldAutoSize;
	
	/**
	 * TextFieldType Class
	 */
	com.flanvas.text.TextFieldType = {};
	com.flanvas.text.TextFieldType.DYNAMIC = 'dynamic';
	com.flanvas.text.TextFieldType.INPUT = 'input';
	var TextFieldType = com.flanvas.text.TextFieldType;
	
	/**
	 * TextField Class
	 */
	com.flanvas.text.TextField = class extends com.flanvas.display.InteractiveObject {
		constructor() {
			super();

			this._activate_cursor_interval_id = undefined;
			this._autoSize = com.flanvas.text.TextFieldAutoSize.START;
			this._background = false;
			this._backgroundColor = 'rgb(255,255,255)';
			this._border = false;
			this._border_color = 'rgb(0,0,0)';
			this._caret_index = 0;
			this._cursor_visible = false;
			this._font = 'Arial';
			this._height = 100;
			this._word_wrap = false;
			this._selection = undefined;
			this._size = '12px';
			this._text = [''];
			this._textColor = 'rgb(0,0,0)';
			this._type = TextFieldType.DYNAMIC;
			this._width = 100;
			
			this.__defineGetter__('autoSize', function() {
				return this._autoSize;
			});
			this.__defineSetter__('autoSize', function(str) {
				if(!str) throw new Error('The value must be a valid string.');
				
				// NONE and START are the same
				if(str == com.flanvas.text.TextFieldAutoSize.NONE) str = com.flanvas.text.TextFieldAutoSize.START;
				
				this._autoSize = str;
			});
			this.__defineSetter__('border', function(val) {
				this._border = val;
			});
			this.__defineGetter__('border', function() {
				return this._border;
			});
			this.__defineSetter__('borderColor', function(val) {
				this._border_color = val;
				this.invalidate();
			});
			this.__defineGetter__('borderColor', function() {
				return this._border_color;
			});
			this.__defineGetter__('caretIndex', function() {
				return this._caret_index;
			});
			this.__defineGetter__('font', function() {
				if(this.size) return this.size + ' ' + this._font;
				return this._font;
			});
			this.__defineSetter__('font', function(val) {
				this._font = val;
			});
			this.__defineGetter__('height', function() {
				switch(this.autoSize) {
					case TextFieldAutoSize.LEFT:
					case TextFieldAutoSize.RIGHT:
					case TextFieldAutoSize.CENTER:
					case TextFieldAutoSize.NONE:
					case TextFieldAutoSize.START:
					case TextFieldAutoSize.END:
						//return +(this.size.replace(/px/,'')) + com.flanvas.text.TextField.PADDING.top + com.flanvas.text.TextField.PADDING.bottom;
						return +this.size.replace(/px/,'');
				}
				return this._height;
			});
			this.__defineSetter__('height', function(val) {
				this._height = +val;
				this.invalidate();
			});
			this.__defineGetter__('length', function() {
				return this._text.length;
			});
			this.__defineGetter__('padding', function() {
				var obj = {};
				var s = +this.size.replace(/px/,'');
				obj.top = s * com.flanvas.text.TextField.PADDING.top;
				obj.right = s * com.flanvas.text.TextField.PADDING.right;
				obj.bottom = s * com.flanvas.text.TextField.PADDING.bottom;
				obj.left = s * com.flanvas.text.TextField.PADDING.left;
				return obj;
			});
			this.__defineGetter__('size', function() {
				return this._size;
			});
			this.__defineSetter__('size', function(val) {
				this._size = val;
				this.invalidate();
			});
			this.__defineGetter__('text', function() {
				return this._text.join('');
			});
			this.__defineSetter__('text', function(str) {
				this._text = [str];
				this.invalidate();
				this.dispatchEvent(new Event(Event.CHANGE));
			});
			this.__defineGetter__('textColor', function() {
				return this._textColor;
			});
			this.__defineSetter__('textColor', function(val) {
				this._textColor = Utils.rgba(val);
				this.invalidate();
			});
			this.__defineGetter__('type', function() {
				return this._type;
			});
			this.__defineSetter__('type', function(val) {
				this._type = val;
				switch(this._type) {
					case TextFieldType.DYNAMIC:
						this.mouseEnabled = false;
					break;
					case TextFieldType.INPUT:
					break;
				}
				this.invalidate();
			});
			this.__defineSetter__('x', function(val) {
				switch(this._autoSize) {
					case TextFieldAutoSize.LEFT:
					case TextFieldAutoSize.RIGHT:
					case TextFieldAutoSize.CENTER:
					case TextFieldAutoSize.NONE:
					case TextFieldAutoSize.START:
					case TextFieldAutoSize.END:
					break;
				}
				
				this._x = +val;
			});
			this.__defineGetter__('width', function() {
				/**
				 * For now, START and END are matched to LEFT and RIGHT to save time
				 */
				if(this._width) return this._width;

				switch(this.autoSize) {
					case com.flanvas.text.TextFieldAutoSize.NONE:
						return 100;
						//return this.super.width;
					break;
					case com.flanvas.text.TextFieldAutoSize.LEFT:
					case com.flanvas.text.TextFieldAutoSize.START:
					case com.flanvas.text.TextFieldAutoSize.CENTER:
					case com.flanvas.text.TextFieldAutoSize.RIGHT:
					case com.flanvas.text.TextFieldAutoSize.END:
						var ctx = Utils.virtualContext();
						ctx.font = this.font;
						var w = ctx.measureText(this.text).width;
						ctx = null;
						// delete ctx;
						return w;
					break;
				}	
			});
			this.__defineSetter__('width', function(val) {
				this._width = +val;
				this.invalidate();
			});
			this.__defineGetter__('wordWrap', function() {
				return this._word_wrap;
			});
			this.__defineSetter__('wordWrap', function(val) {
				this._word_wrap = Boolean(val);
				this.invalidate();
			});
			
			this.graphics.instruction([Instruction.TEXTFIELD]);
			
			var self = this;
			this.addEventListener(com.flanvas.events.FocusEvent.FOCUS_IN, function(event) {
				if(self.type == com.flanvas.text.TextFieldType.INPUT) {
					self.addEventListener(com.flanvas.events.KeyboardEvent.KEY_DOWN, self.captureKey);
					self.activateCursor();
				}
			});
			this.addEventListener(com.flanvas.events.FocusEvent.FOCUS_OUT, function(event) {
				self.removeEventListener(com.flanvas.events.KeyboardEvent.KEY_DOWN, self.captureKey);
				self.activateCursor(false);
			});
			this.addEventListener(com.flanvas.events.MouseEvent.ROLL_OUT, function(event) {
				document.body.style.cursor = 'default';
			});
			this.addEventListener(com.flanvas.events.MouseEvent.ROLL_OVER, function(event) {
				if(this.type == com.flanvas.text.TextFieldType.INPUT) document.body.style.cursor = 'text';
			});
			this.addEventListener(com.flanvas.events.MouseEvent.CLICK, function(event) {
				var ctx = Utils.virtualContext();
				var diff = 999999999;
				
				loop:
				for(i = 0; i < this.text.length; ++i) {
					/**
					 * 1.2 is the reverse offset of the perecent that the cursor is usually
					 * off by. In all actuality, after calcs are complete, the cursor ends
					 * up being 80% of where it would normally be (which is what I wanted).
					 */
					var w = ctx.measureText(this.text.substr(0, i)).width * 1.2;
					if(Math.abs(w - event.localX) < diff) {
						diff = Math.abs(w - event.localX);
						this._caret_index = i;
					} else break loop;
				}

				ctx = null;
				// delete ctx;
			});
		}
	}
	com.flanvas.text.TextField.PADDING = {top:0.25,right:0.25,bottom:0.25,left:0.25}; // done in percentages (of the size in px)
	com.flanvas.text.TextField.prototype._wordWrap = function() {
		if(this.autoSize != com.flanvas.text.TextFieldAutoSize.NONE) {
			var vc = Utils.virtualContext();
			this._text = [this._text.join('')];
			
			/**
			 * Brings first eligable word up from the next sibling row
			 */
			var bringWordUp = function(r) {
				if(this._text[r+1]) {
					var lr = this._text[r+1].split(/\s+/);
					var word = lr.unshift();
					this._text[r] = this._text[r].concat([word]).join('');
					this._text[r+1] = lr.join('');
				}
			}
			var moveWordDown = function(r) {
				var lr = [];
				if(this._text[r+1]) {
					lr = this._text[r+1];
				}
				
				var hr = this._text[r].split(/\s+/);
				var word = [hr.pop()];
				this._text[r] = hr.join('');
				this._text[r+1] = word.concat(lr).join('');
			}
			
			var row = 0;
			
			loop:
			while(true) {
				while(vc.measureText(this._text[row]).width < this.width) bringWordUp(row);
				while(vc.measureText(this._text[row]).width > this.width) moveWordDown(row);
				++row;
				if(row >= this._text.length) break loop;
			}
			
			vc = null;
			// delete vc;
		}
	}
	com.flanvas.text.TextField.prototype.activateCursor = function(bool) {
		if(bool === undefined) bool = true;
		
		clearInterval(this._activate_cursor_interval_id);
		
		if(this.type == TextFieldType.INPUT) {
			if(bool) {
				var self = this;
				this._activate_cursor_interval_id = setInterval(function(){self.cursorVisibilityToggle()}, 500);
			} else {
				this._cursor_visible = false;
			}
		}
	}
	com.flanvas.text.TextField.prototype.appendText = function(str) {
		this.text = this._text.concat([str]);
	}
	com.flanvas.text.TextField.prototype.captureKey = function(event) {
		var self = this;
		
		var nonMacCopy = ((com.flanvas.system.Capabilities.os.toLowerCase().indexOf('mac') < 0) && event.controlKey && !commandKey);
		var macCopy = ((com.flanvas.system.Capabilities.os.toLowerCase().indexOf('mac') > -1) && event.commandKey && !event.controlKey);
		
		function insertTextAt(index, str) {
			self.text = self.text.substr(0, index) + str + self.text.substr(index);
			var c = self.caretIndex + str.length;
			self.setSelection(c, c);
		}
		
		switch(event.keyCode) {
			case com.flanvas.ui.Keyboard.ALTERNATE:
			case com.flanvas.ui.Keyboard.CAPSLOCK:
			case com.flanvas.ui.Keyboard.ESCAPE:
			case com.flanvas.ui.Keyboard.CONTROL:
			case com.flanvas.ui.Keyboard.TAB:
				//insertTextAt(this.caretIndex, '    ');
				break;
			case com.flanvas.ui.Keyboard.BACKSPACE:
				var s = this.caretIndex - 1;
				if(s < 0) s = 0;
				this.text = this.text.substr(0, s) + this.text.substr(this.caretIndex);
				this.setSelection(s, s);
				break;
			case com.flanvas.ui.Keyboard.LEFT:
				this.setSelection(this.carentIndex - 1, this.caretIndex - 1);
				break;
			case com.flanvas.ui.Keyboard.RIGHT:
				this.setSelection(this.carentIndex + 1, this.caretIndex + 1);
				break;
			case com.flanvas.ui.Keyboard.UP:
			case com.flanvas.ui.Keyboard.DOWN:
				break;
			case com.flanvas.ui.Keyboard.V:
				if(nonMacCopy || macCopy) {
					if(window.clipboardData) {
						insertAtText(this.caretIndex, window.clipboardData.getData('text'));
					} else {
						console.warn('Paste has not been implemented for this browser.');
					}
					break;
				}
			case com.flanvas.ui.Keyboard.C:
			case com.flanvas.ui.Keyboard.X:
				if(nonMacCopy || macCopy) {
					if(window.clipboardData) {
						window.clipboardData.setData('text', this.text.substr(this.caretIndex));
					} else {
						console.warn('Copy has not been implemented for this browser.');
					}
				}
			default:
				var char = String.fromCharCode(event.charCode);
				insertTextAt(this.caretIndex, char);
				break;
		}
	}
	com.flanvas.text.TextField.prototype.cursorVisibilityToggle = function() {
		this._cursor_visible = !this._cursor_visible;
	}
	com.flanvas.text.TextField.prototype.replaceText = function(beginIndex, endIndex, newText) {
		
	}
	com.flanvas.text.TextField.prototype.setSelection = function(beginIndex, endIndex) {
		if(beginIndex != endIndex) {
			this._selection = {beginIndex:beginIndex, endIndex:endIndex};
		}
		
		this._caret_index = endIndex;
	}
	com.flanvas.text.TextField.prototype.toString = function() {
		return '[Object TextField]';
	}
	var TextField = com.flanvas.text.TextField;
	
	
	/**
	 * DisplayObjectContainer Class
	 */
	com.flanvas.display.DisplayObjectContainer = class extends com.flanvas.display.InteractiveObject {
		constructor() {
			super();

			this._children = [];
			this._uid = _f.genUid(this);
			
			this.__defineGetter__('numChildren', function() {
				return this._children.length;
			});
			
			this.addEventListener(Event.ADDED_TO_STAGE, function(event) {
				for(var i = 0; i < event.target.numChildren; ++i) {
					event.target.getChildAt(i).dispatchEvent(new Event(Event.ADDED_TO_STAGE));
				}
			});
			this.addEventListener(Event.REMOVED, function(event) {
				if(self.stage) self.dispatchEvent(new Event(Event.REMOVED_FROM_STAGE));
			});
			this.addEventListener(Event.REMOVED_FROM_STAGE, function(event) {
				for(var i = 0; i < event.target.numChildren; ++i) {
					event.target.getChildAt(i).dispatchEvent(new Event(Event.REMOVED_FROM_STAGE));
				}
			});
		}
	}
	com.flanvas.display.DisplayObjectContainer.prototype.addChild = function(child) {
		return this.addChildAt(child, this.numChildren);
	}
	com.flanvas.display.DisplayObjectContainer.prototype.addChildAt = function(child, id) {
		child.parent = this;
		
		if(child.name == "") child.name = this.genInstanceName(child.name);
		else this[child.name] = child;
		
		// Place on correct layer
		this._children.splice(id, 0, child);
		
		child.dispatchEvent(new Event(Event.ADDED));
		if(this.root) child.dispatchEvent(new Event(Event.ADDED_TO_STAGE));
		
		return child;
	}
	com.flanvas.display.DisplayObjectContainer.prototype.genInstanceName = function(val) {
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
			if(this._children[i].name == name) throw new Error("DisplayObjectContainer->genInstanceName; The child name of " + name + " is already taken");
		}
		
		return name;
	}
	com.flanvas.display.DisplayObjectContainer.prototype.getChildAt = function(id) {
		if(this._children[id]) return this._children[id];
		return null;
	}
	com.flanvas.display.DisplayObjectContainer.prototype.getChildIndex = function(obj) {
		for(var i = 0; i < this._children.length; ++i) {
			if(this._children[i] == obj) return i;
		}
		return null;
	}
	com.flanvas.display.DisplayObjectContainer.prototype.removeChild = function(obj) {
		for(var i in this._children) {
			if(this._children[i] == obj) {
				this._children.splice(i, 1);
				if(obj.stage) obj.dispatchEvent(new Event(Event.REMOVED_FROM_STAGE));
			}
		}
	}
	com.flanvas.display.DisplayObjectContainer.prototype.removeChildAt = function(id) {
		this.removeChild(this.getChildAt(id));
	}
	var DisplayObjectContainer = com.flanvas.display.DisplayObjectContainer;
	
	/**
	 * Graphics Class
	 */
	class Graphics extends Object {
		constructor() {
			super();

			this._data = [];
			this._displayObject = undefined;
			this._fill_style = [];
			/**
			 * Used to keep track of open paths on the current object.
			 * set to true on "beginPath()"
			 * set to false on "closePath()"
			 */
			this._open_path = false;
			this._points = [];
			this._stroke_style = [];
			
			this.__defineGetter__('data', function() {
				return this._data;
			});
			this.__defineGetter__('displayObject', function() {
				return this._displayObject;
			});
			this.__defineSetter__('displayObject', function(obj) {
				if(obj === undefined) throw new ArgumentError("obj must be a valid DisplayObject.");
				this._displayObject = obj
			});
		}
	}
	/**
	 * the following gradients-related code was meant to be, and needs to remain static for now
	 * @param id:String the ID of the gradient from SVG (or other).
	 * @param arr:Array the drawing instructions for this gradient.
	 * @param obj:DisplayObject The display object that the gradient is being saved for.
	 */
	Graphics.gradients = [];
	Graphics.registerGradient = function(id, arr, obj) {
		Graphics.gradients[id] = arr;
		obj.invalidate();
	}
	Graphics.prototype.addColorStop = function(id, position, color) {
		this.instruction(id + ".addColorStop("+position+",'"+color+"');");
	}
	Graphics.prototype.arc = function(x, y, radius, start_angle, end_angle, anti_clockwise) {
		if(start_angle === undefined) start_angle = 0;
		if(end_angle === undefined) end_angle = Math.PI * 2;
		if(anti_clockwise === undefined) anti_clockwise = false;
		
		this.instruction([Instruction.ARC, x, y, radius, start_angle, end_angle, anti_clockwise]);
	}
	Graphics.prototype.beginFill = function(color, alpha) {
		if(!color) color = 0x000000;
		if(!alpha) alpha = 1.0;
		
		this.fillStyle(color);
		this.displayObject.alpha = alpha;
	}
	Graphics.prototype.beginGradientFill = function(type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
		if(!type) throw new ArgumentError("type must be defined. eg GradientType.LINEAR or GradientType.RADIAL");
		if(!color) throw new ArgumentError("colors must be an array of colors. eg [0xff0000, 0x0000ff]");
		if(!alphas) throw new ArgumentError("alphas must be an array of alpha values. eg [1.0, 0.0]");
		if(!ratios) throw new ArgumentError("ratios must be an array of color distribution ratios. eg [0x00, 0xff]");
		if(matrix === undefined) matrix = null;
		if(!spreadMethod) spreadMethod = SpreadMethod.PAD;
		if(!interpolationMethod) interpolationMethod = InterpolationMethod.RGB;
		if(focalPointRatio === undefined) focalPointRatio = 0;
	}
	Graphics.prototype.beginPath = function() {
		if(this._open_path) console.warn("-- It is advised that you close one path before continuing another --");
		
		this.instruction([Instruction.BEGINPATH]);
		this._open_path = true;
	}
	Graphics.prototype.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
		this.instruction([Instruction.BEZIERCURVETO, cp1x, cp1y, cp2x, cp2y, x, y]);
		this._points.push(new Point(x, y));
	}
	Graphics.prototype.clear = function() {
		this._data = [];
		this._points = [];
	}
	Graphics.prototype.clip = function() {
		this.instruction([Instruction.CLIP]);
	}
	Graphics.prototype.closePath = function() {
		this._open_path = false;
		this.instruction([Instruction.CLOSEPATH]);
	}
	/**
	 * compiles a style to make it match whatever tint/alpha is currently in the clip.
	 */
	Graphics.prototype.compileStyle = function(val) {
		// make sure val is a string so that .replace works on it.
		if(!(val instanceof String)) {
			val = String(val);
		}
		
		var obj = {r:0,g:0,b:0,a:1}
		
		// remove quotes
		//val = val.replace(/'|"/g, '');
		
		/*
		// if rgb, convert to rgba
		if(val.replace(/rgb\s*\(.*\)/, 'true') == 'true') {
			eval(val.replace(/rgb\s*\(\s*(.*)\s*,\s*(.*)\s*,\s*(.*)\s*\)/,'obj.r=$1;obj.g=$2;obj.b=$3;'));
		}
		
		// if rgba, make sure the alpha of the color matches the current alpha of the current object
		if(val.replace(/rgba\s*\(.*\)/, 'true') == 'true') {
			eval(val.replace(/rgba\s*\(\s*(.*)\s*,\s*(.*)\s*,\s*(.*)\s*,\s*(.*)\s*\)/,'obj.r=$1;obj.g=$2;obj.b=$3;obj.a=$4;'));
		}
		*/
		
		if(this._displayObject.transform.colorTransform.color) {
			val = '#' + this._displayObject.transform.colorTransform.color;
		}
		
		var arr = val.replace(/.*\((.*)\)/, '$1').split(',');
		obj.r = arr[0];
		obj.g = arr[1];
		obj.b = arr[2];
		if(arr.length == 4) obj.a = arr[3];
		
		return 'rgba('+obj.r+','+obj.g+','+obj.b+','+(obj.a*this._displayObject.absAlpha)+')';
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
	Graphics.prototype.drawCircle = function(x, y, radius) {
		if((x === undefined) || (x == Number.NaN)) throw new ArgumentError("x value must be a Number");
		if((y === undefined) || (y == Number.NaN)) throw new ArgumentError("y value must be a Number");
		if((radius === undefined) || (radius == Number.NaN)) throw new ArgumentError("radius value must be a Number");
		
		this.beginPath();
		this.arc(x, y, radius);
		this.closePath();
	}
	Graphics.prototype.drawEllipse = function(x, y, width, height) {
		if((x === undefined) || (x == Number.NaN)) throw new ArgumentError("x value must be a Number");
		if((y === undefined) || (y == Number.NaN)) throw new ArgumentError("y value must be a Number");
		if((width === undefined) || (width == Number.NaN)) throw new ArgumentError("width value must be a Number");
		if((width === undefined) || (width == Number.NaN)) throw new ArgumentError("height value must be a Number");
		
		var hB = (width / 2) * .5522848;
        var vB = (height / 2) * .5522848;
		var eX = x + width;
		var eY = y + height;
		var mX = x + width / 2;
		var mY = y + height / 2;
		
		this.beginPath();
		this.moveTo(x, mY);
        this.bezierCurveTo(x, mY - vB, mX - hB, y, mX, y);
        this.bezierCurveTo(mX + hB, y, eX, mY - vB, eX, mY);
        this.bezierCurveTo(eX, mY + vB, mX + hB, eY, mX, eY);
        this.bezierCurveTo(mX - hB, eY, x, mY + vB, x, mY);
		this.closePath();
		
		/*
		ellipse:function(aX, aY, aWidth, aHeight){
			var hB = (aWidth / 2) * .5522848,
				vB = (aHeight / 2) * .5522848,
				eX = aX + aWidth,
				eY = aY + aHeight,
				mX = aX + aWidth / 2,
				mY = aY + aHeight / 2;
			this.moveTo(aX, mY);
			this.bezierCurveTo(aX, mY - vB, mX - hB, aY, mX, aY);
			this.bezierCurveTo(mX + hB, aY, eX, mY - vB, eX, mY);
			this.bezierCurveTo(eX, mY + vB, mX + hB, eY, mX, eY);
			this.bezierCurveTo(mX - hB, eY, aX, mY + vB, aX, mY);
			this.closePath();
		},
		*/
	}
	Graphics.prototype.drawRect = function(x, y, width, height) {
		if((x === undefined) || (x == Number.NaN)) throw new ArgumentError("x value must be a Number");
		if((y === undefined) || (y == Number.NaN)) throw new ArgumentError("y value must be a Number");
		if((width === undefined) || (width == Number.NaN)) throw new ArgumentError("width value must be a Number");
		if((height === undefined) || (height == Number.NaN)) throw new ArgumentError("height value must be a Number");
		
		/**
		 * If a path is already open, close it and open another after the rectangle is drawn.
		 */
		var prev_open = this._open_path;
		if(this._open_path) this.closePath();
		if(!this._open_path) this.beginPath();
		this.moveTo(x, y);
		this.lineTo(x + width, y);
		this.lineTo(x + width, y + height);
		this.lineTo(x, y + height);
		this.lineTo(x, y);
		if(this._open_path) this.closePath();
		if(prev_open) this.beginPath();
	}
	Graphics.prototype.endFill = function() {
		this.fill();
	}
	Graphics.prototype.fill = function() {
		//this.instruction("ctx.fill();");
		this.instruction([Instruction.FILL]);
	}
	Graphics.prototype.fillStyle = function(val) {
		if(!val) val = 'rgb(0,0,0)';
		
		//this.instruction('ctx.fillStyle = this.graphics.compileStyle("' + Utils.rgba(val) + '");');
		this.instruction([Instruction.FILLSTYLE, Utils.rgba(val)]);
		
		return val;
	}
	Graphics.prototype.instruction = function(val, level) {
		if(!isNaN(level)) {
			try {
				this._data[level] = val;
			} catch(e) {
				throw new Error("Invalid level of " + level);
			}
		} else {
			this._data.push(val);
		}

		if(this.displayObject) this.displayObject.invalidate();
	}
	Graphics.prototype.lineCap = function(val) {
		if(val === undefined) throw new ArgumentError("you must specify a value");
		this.instruction([Instruction.LINECAP, val]);
	}
	Graphics.prototype.lineJoin = function(val) {
		if(val === undefined) throw new ArgumentError("you must specify a value");
		this.instruction([Instruction.LINEJOIN, val]);
	}
	Graphics.prototype.lineStyle = function(thickness, color, alpha, scaleMode, caps, joints, miterLimit) {
		if(isNaN(thickness)) throw new ArgumentError("thickness must be a valid Number");
		if(thickness < 0) throw new ArgumentError("thickness cannot be a negative Number");
		if(!color) color = "#000000";
		if(!alpha) alpha = 1.0;
		//if(scaleMode === undefined) scaleMode = LineScaleMode.NORMAL;
		if(scaleMode) throw new Error("scaleMode has not been implemented yet");
		if(!caps) caps = CapStyle.BUTT;
		if(!joints) joints = JointStyle.MITER;
		if(!miterLimit) miterLimit = 3;
		
		/** 
		 * assemble the actual line.
		 */
		this.lineWidth(thickness);
		this.strokeStyle(color);
		this.alpha = alpha;
		// this.scaleMode = scaleMode
		this.lineCap(caps);
		this.lineJoin(joints);
		this.miterLimit(miterLimit);
	}
	Graphics.prototype.lineTo = function(x, y) {
		if(isNaN(x)) throw new ArgumentError("x value must be a Number");
		if(isNaN(y)) throw new ArgumentError("y value must be a Number");
		
		this.instruction([Instruction.LINETO, x, y]);

		this._points.push(new Point(x, y));
	}
	Graphics.prototype.lineWidth = function(val) {
		if(val === undefined) val = 1;
		//this.instruction("ctx.lineWidth = " + val + ";");
		this.instruction([Instruction.LINEWIDTH, val]);
	}
	Graphics.prototype.miterLimit = function(val) {
		if(isNaN(val)) throw new ArgumentError("Value must be a Number.");
		if(val) {
			//this.instruction("ctx.miterLimit = " + val + ";");
			this.instruction([Instruction.MITERLIMIT, val]);
		}
	}
	/**
	 * moves the drawing element to the x and y specified.
	 */
	Graphics.prototype.moveTo = function(x, y) {
		if(isNaN(x)) throw new ArgumentError("Graphics->moveTo; x value must be a Number");
		if(isNaN(y)) throw new ArgumentError("Graphics->moveTo; y value must be a Number");
		
		this.instruction([Instruction.MOVETO, x, y]);
		
		this._points.push(new Point(x, y));
	}
	/**
	 * returns the points maintained by the system. These points are added with functions like
	 * lineto and arc, etc.. These points are used to calculate the potential width/height
	 * of a DisplayObject
	 */
	Graphics.prototype.points = function(start, end) {
		var arr = this._points;
		if((end !== undefined) && !isNaN(end)) arr = arr.slice(start, end);
		if(start !== undefined && !isNaN(start)) arr = arr.slice(start);
		
		return arr;
	}
	Graphics.prototype.quadraticCurveTo = function(cpx, cpy, x, y) {
		//this.instruction("ctx.quadraticCurveTo(pp("+cpx+","+cpy+").x,pp("+cpx+","+cpy+").y,pp("+x+","+y+").x,pp("+x+","+y+").y);");
		this.instruction([Instruction.QUADRATICCURVETO, cpx, cpy, x, y]);
		
		this._points.push(new Point(cpx, cpy));
		this._points.push(new Point(x, y));
	}
	Graphics.prototype.rawMark = function(x, y) {
		this.beginFill(0xff0000);
		this.drawCircle(x, y, 2.5);
		this.endFill();
	}
	Graphics.prototype.stroke = function() {
		//this.instruction("ctx.stroke();");
		this.instruction([Instruction.STROKE]);
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
		if(val !== undefined) {
			val = Utils.rgba(val);
			this.instruction([Instruction.STROKESTYLE, val]);
		}
		
		return val;
	}
	
	/**
	 * Sprite Class
	 */
	com.flanvas.display.Sprite = class extends com.flanvas.display.DisplayObjectContainer {
		constructor() {
			super();

			this._buttonMode = false;
			this._dragBounds = undefined;
			this._mouseDownProps = undefined;
			this._useHandCursor = false;
			
			this.__defineGetter__('buttonMode', function() {
				return this._buttonMode;
			});
			this.__defineSetter__('buttonMode', function(bool) {
				this._buttonMode = bool;
			});
			this.__defineGetter__('useHandCursor', function() {
				return this._useHandCursor;
			});
			this.__defineSetter__('useHandCursor', function(bool) {
				this._useHandCursor = bool;
			});
		}
	}
	com.flanvas.display.Sprite.prototype.dragMouseMoveHandler = function(event) {
		this.x = this.mouseX - this._mouseDownProps.x;
		this.y = this.mouseY - this._mouseDownProps.y;
		
		if(bounds) {
			if(this.x < bounds.x) this.x = bounds.x;
			else if(this.x > bounds.x + bounds.width) this.x = bounds.x + bounds.width;
			if(this.x < bounds.y) this.x = bounds.y;
			else if(this.y > bounds.y + bounds.height) this.y = bounds.y + bounds.height;
		}
	}
	com.flanvas.display.Sprite.prototype.startDrag = function(lockCenter, bounds) {
		if(lockCenter === undefined) lockCenter = false;
		
		if(lockCenter) this.mouseDownProps = {x:this.x + this.width / 2, y:this.y + this.height / 2};
		else this.mouseDownProps = {x:this.mouseX, y:this.mouseY};
		
		if(bounds) this._dragBounds = bounds;
		else bounds = undefined;
		
		this.addEventListener(MouseEvent.MOUSE_MOVE, this.dragMouseMoveHandler);
	}
	com.flanvas.display.Sprite.prototype.stopDrag = function() {
		this.removeEventListener(MouseEvent.MOUSE_MOVE, this.dragMouseMoveHandler);
	}
	com.flanvas.text.TextField.prototype.toString = function() {
		return '[Object Sprite]';
	}
	var Sprite = com.flanvas.display.Sprite;
	
	/**
	 * URLRequest Class
	 */
	var URLRequest = class extends Object {
		constructor(url) {
			super();

			this.url = url;
		}
	}
	
	com.flanvas.core.FlanvasSprite = class extends Sprite {}
	
	com.flanvas.core.UIComponent = class extends com.flanvas.core.FlanvasSprite {}
	
	/**
	 * Loader Class
	 */
	var Loader = class extends DisplayObjectContainer {
		constructor() {
			super();

			this._content = undefined;
		
			this.contentLoaderInfo = new LoaderInfo(this);
		
			this.__defineGetter__('content', function() {
				return this._content;
			});
		}
	}
	Loader.prototype.load = function(request) {
		if(request.substr) throw new Error("The request must be a URLRequest, not a String.");
		this.contentLoaderInfo.load(request);
	}
	Loader.prototype.process = function() {
		switch(this.contentLoaderInfo.contentType) {
			case 'image/png':
			case 'image/gif':
			case 'image/jpg':
			case 'image/jpeg':
				this._content = this.addChild(this.contentLoaderInfo.content);
			break;
			case 'image/svg+xml':
				var o = new Svg();
				o.parseXml(this.contentLoaderInfo.content);
				this._content = this.addChild(o);
			break;
			default:
				throw new Error('Unknown content type ' + this.contentLoaderInfo.contentType);
			break;
		}
	}
	
	/**
	 * URLLoaderDataFormat Class
	 */
	com.flanvas.net.URLLoaderDataFormat = {};
	com.flanvas.net.URLLoaderDataFormat.BINARY = "binary";
	com.flanvas.net.URLLoaderDataFormat.TEXT = "text";
	com.flanvas.net.URLLoaderDataFormat.VARIABLES = "variables";
	
	/**
	 * URLLoader Class
	 */
	com.flanvas.net.URLLoader = class extends com.flanvas.events.EventDispatcher {
		constructor(resource) {
			super();

			this._data = undefined;
			this._dataFormat = undefined;
			
			this.__defineGetter__('data', function() {
				return this._data;
			});
			this.__defineGetter__('dataFormat', function() {
				return this._dataFormat;
			});
			
			if(resource) this.load(resource);
		}
	}
	com.flanvas.net.URLLoader.prototype.load = function(resource) {
		var self = this;
		var onReadyStateChange = function() {
			if(this.readyState == 4) {
				if(this.reponseXML) self._data = this.responseXML;
				else if(this.responseText) self._data = this.responseText
				else if(this.responseBody) self._data = this.responseBody;
				
				var type = Utils.stripContentType(this);
				switch(type) {
					case 'image/svg':
					case 'image/svg+xml':
					case 'text/xml':
						self._dataFormat = com.flanvas.net.URLLoaderDataFormat.TEXT;
						if(this.responseText) {
							// data came in as text, but needs to be xml
							self._data = Utils.strToXml(this.responseText);

						}
					break;
					default:
						self._dataFormat = type;
					break;
				}
				self.dispatchEvent(new Event(Event.COMPLETE));
			}
		}
		
		Utils.xhr(resource.url, onReadyStateChange);
	}
	
	/**
	 * LoaderInfo Class
	 */
	class LoaderInfo extends com.flanvas.events.EventDispatcher {
		constructor(loaderObj) {
			super();

			this._content_type = undefined;
			this._content = undefined;
			this._loader = loaderObj;
			this._loader_url = undefined;
			this._url = undefined;
			
			this.__defineGetter__('content', function() {
				return this._content;
			});
			this.__defineGetter__('contentType', function() {
				return this._content_type;
			});
			this.__defineGetter__('loader', function() {
				return this._loader;
			});
			this.__defineGetter__('loaderURL', function() {
				return this._loader_url;
			});
			this.__defineGetter__('url', function() {
				return this._url;
			});
		}
	}
	LoaderInfo.prototype.load = function(request) {
		this._loader_url = request.url;
		
		var self = this;
		var onReadyStateChange = function() {
			if(this.readyState == 4) {
				self._content_type = Utils.stripContentType(this);
				switch(self.contentType) {
					case 'text/html;charset=utf-8':
						var url = String(self._loader_url);
						switch(url.substr(url.lastIndexOf('.'))) {
							case '.svg':
								self.handleSvg(this);
							break;
						}
					break;
					
					case 'image/gif':
					case 'image/jpg':
					case 'image/jpeg':
					case 'image/png':
						var img = new Image();
						img.onload = function() {
							var bmpd = new BitmapData(img.width, img.height);
							bmpd.draw(img);
							
							var bmp = new Bitmap(bmpd);
							
							self._content = bmp;
							self.loader.process();
							self.dispatchEvent(new Event(Event.COMPLETE));
						}
						img.src = request.url;
					break;
					case 'image/svg+xml':
						self.handleSvg(this);
						break;
					default:
						throw new Error('Not sure what to do with content-type of ' + self.contentType);
					break;
				}
			}
		}
		
		Utils.xhr(this._loader_url, onReadyStateChange);
	}
	LoaderInfo.prototype.handleSvg = function(doc) {
		this._content = (new DOMParser()).parseFromString(doc.responseText, "text/xml");
		this.loader.process();
		this.dispatchEvent(new Event(Event.COMPLETE));
	}
	
	/**
	 * com.flanvas.media.Sound Class
	 */
	com.flanvas.media.Sound = class extends com.flanvas.events.EventDispatcher {
		constructor(stream) {
			super();

			this._audio = undefined;
			this._context(stream);
		}

		_context(stream) {
			this._audio;
			
			if(stream) this._audio = new Audio(stream);
		}
	}
	com.flanvas.media.Sound.prototype.load = function(stream) {
		this._audio = new Audio(stream);
	}
	com.flanvas.media.Sound.prototype.play = function() {
		this._audio.play();
	}
	var Sound = com.flanvas.media.Sound;
	
	var Svg = class extends Sprite {
		constructor() {
			super();

			this.svgInstanceName = undefined;
		}
	}
	
	Svg.loadClass = function(resource, class_name, func) {
		var l = new com.flanvas.net.URLLoader();
		l.addEventListener(Event.COMPLETE, function(event) {
			// setup the class in memory
			var ns_Seg = class_name.split('.');
			
			for(j in ns_Seg) {
				var v = '';
				for(k = 0; k < j; ++k) {
					v += ns_Seg[k];
					if(k < j) v += '.';
				}
				v += ns_Seg[j];
				
				var isv = '';
				if(v.indexOf('.') < 0) isv = 'var ';
				
				eval('if(!'+v+')'+isv+''+v+'={};');
			}
			
			// setup the actual class declaration
			if(class_name) {
				eval(class_name + '=function(){this._construct()}');
				eval(class_name + '.prototype._construct=function(){this.parseXml(Utils.strToXml(\''+Utils.xmlToStr(event.target.data)+'\'));}');
				eval(class_name + '.e/xtend(Svg);');	
			}
			
			if(func) eval('func('+class_name+');');
		});
		l.load(resource);
	}
	Svg.parsePoints = function(str) {
		if(String(str).indexOf(',') == -1) str = String(str).replace(/(\d+[.]\d+|\d+),(\d+[.]\d+|\d+)\D+/g, '$1,$2');
		var arr = str.split(' ');
		var ret = [];
		for(var i in arr) {
			if(arr[i]) ret.push(arr[i]);
		}
		
		return ret;
	}
	Svg.parseStyle = function(style) {
		if(style == "none") {
			return undefined;
		} else if(style.indexOf("url") >= 0) {
			var lhash = style.indexOf('#') + 1;
			var rparen = style.lastIndexOf(')');
			style = style.substr(lhash, rparen - lhash);
		}
		
		return style;
	}
	Svg.parseStroke = function(node) {
		var o = {};
		if(node.hasAttribute('stroke-width')) o.width = +node.attributes.getNamedItem('stroke-width').value;
		else o.width = 0;
		if(node.hasAttribute('stroke-miterLimit')) o.miterLimit = +node.attributes.getNamedItem('stroke-miterLimit').value;
		else o.miterLimit = 0;
		if(node.hasAttribute('opacity')) o.opacity = +node.attributes.getNamedItem('opacity').value;
		else o.opacity = 1.0;
		if(node.hasAttribute('stroke')) {
			o.style = Svg.parseStyle(node.attributes.getNamedItem('stroke').value);
			if(o.width <= 0) o.width = 1;
		} else o.style = "'#000000'";
		
		return o;
	}
	Svg.prototype.addChildAtPath = function(child, path) {
		child.invalidate();
		if(path === undefined) return this.addChild(child);
		
		var arr = path.split(".");
		if(arr[arr.length - 1] == "") {
			/**
			 * instance has a parent, but not a name because the last index
			 * is an empty string. It is an empty string because we split by "."
			 * so the "." was converted to "" in the process
			 */
			eval("this." + path + "addChild(child);");
		} else {
			/**
			 * instance has a parent and/or instance name
			 */
			var p = path.substr(0, path.lastIndexOf('.'));
			if(p) p = "." + p + ".";
			if(!p) p = ".";
			
			child.name = arr[arr.length - 1];
			eval("this" + p + "addChild(child);");
		}
		
		return child;
	}
	/**
	 * Returns which object is going to be the parent (if it already exists)
	 * of the child path given.
	 * eg. A path of stage.child1.child2 would returen the object at stage.child1
	 */
	Svg.prototype.futureParent = function(path) {
		if((path == "") || (path === undefined)) return this;
		//if(path === undefined) throw new Error("Svg->futureParent; path must be defined";
		
		path = path.substr(0, path.lastIndexOf('.'));
		if(path) path = '.' + path;
		
		var child;
		
		try {
			eval("child = this" + path);
		} catch(e) {
			throw new Error(e);
			return this;
		}
		if(child) return child;
	}
	Svg.prototype.parseXml = function(xml) {
		// because this function gets called out of scope, it needs it's own try/catch
		// try {
			var self = this;
			var control_Points = [];
			
			parse_loop:
			for(var i = 0; i < xml.childNodes.length; ++i) {
				/**
				 * instance_name is set to undefined because there was problems with it not resetting
				 * and carrying the same instance_names to other clips (thus multiple clips using the
				 * same instance name)
				 */
				var node, instance_name = undefined, class_name;
				node = xml.childNodes[i];
				if(node.hasAttribute) {
					if(node.hasAttribute('instance-name')) {
						instance_name = node.attributes.getNamedItem('instance-name').value;
						
						if(node instanceof SVGSVGElement) self.svgInstanceName = instance_name;
					}
				}

				if(self.svgInstanceName && !(node instanceof SVGSVGElement)) {
					var nam = '';
					if(instance_name) nam = instance_name;
					instance_name = self.svgInstanceName + '.' + nam;
				}
				
				switch(node.nodeName) {
					case 'circle':
						//<circle opacity="0.2" fill="#FFFFFF" cx="49.154" cy="64.154" r="37.154"/>
						var cx, cy, r, opacity = 1.0, fill, stroke;
						cx = +node.attributes.getNamedItem("cx").value;
						cy = +node.attributes.getNamedItem("cy").value;
						r = +node.attributes.getNamedItem("r").value;
						if(node.hasAttribute('opacity')) opacity = +node.attributes.getNamedItem("opacity").value;
						if(node.hasAttribute('fill')) fill = Svg.parseStyle(node.attributes.getNamedItem("fill").value);
						stroke = Svg.parseStroke(node);
						
						var p = this.futureParent(instance_name);
						var pt = p.globalToLocal(new Point(cx, cy));
						var o = new Sprite();
						o.x = pt.x;
						o.y = pt.y;
						
						o.graphics.fillStyle(fill);
						if(stroke.width) o.graphics.lineStyle(stroke.width, stroke.style, stroke.opacity, null, null, null, stroke.miterLimit);
						if(opacity) o.alpha = opacity;
						
						o.graphics.drawCircle(0, 0, r);
						
						o.graphics.fill();
						if(stroke.width) o.graphics.stroke();
						
						self.addChildAtPath(o, instance_name);
					break;
					case 'defs':
						//
					break;
					case 'ellipse':
						var cx, cy, rx, ry;
						if(node.hasAttribute('cx')) cx = +node.attributes.getNamedItem('cx').value;
						if(node.hasAttribute('cy')) cy = +node.attributes.getNamedItem('cy').value;
						if(node.hasAttribute('rx')) rx = +node.attributes.getNamedItem('rx').value;
						if(node.hasAttribute('ry')) ry = +node.attributes.getNamedItem('ry').value;
						
						var p = this.futureParent(instance_name);
						var pt = p.globalToLocal(new Point(cx, cy));
						var o = new Sprite();
						o.x = pt.x;
						o.y = pt.y;
						
						if(fill) o.graphics.fillStyle(fill);
						if(stroke.width) o.graphics.lineStyle(stroke.width, stroke.style, stroke.opacity, null, null, null, stroke.miterLimit);
						if(opacity) o.alpha = opacity;
						
						o.graphics.drawEllipse(0, 0, rx * 2, ry * 2);
						
						if(fill) o.graphics.fill();
						if(stroke.width) o.graphics.stroke();
						
						self.addChildAtPath(o, instance_name);
					break;
					case 'g':
						this.parseXml(node);
					break;
					case 'line':
						var fill = Svg.parseStyle(node.attributes.getNamedItem("fill").value);
						var stroke = Svg.parseStroke(node);
						var x1 = +node.attributes.getNamedItem("x1").value;
						var y1 = +node.attributes.getNamedItem("y1").value;
						var x2 = +node.attributes.getNamedItem("x2").value;
						var y2 = +node.attributes.getNamedItem("y2").value;
						
						var p = this.futureParent(instance_name);
						var pt = p.globalToLocal(new Point(x1, y1));
						var o = new Sprite();
						o.x = pt.x;
						o.y = pt.y;
						
						// if(dashArray) - no instruction for this yet
						//o.graphics.lineCap(lineCap);
						//o.graphics.lineJoin(lineJoin);
						//o.graphics.lineWidth = lineWidth;
						if(fill && (fill != "none")) o.graphics.fillStyle(fill);
						o.graphics.beginPath();
						if(stroke.width) o.graphics.lineStyle(stroke.width, stroke.style, stroke.opacity, null, null, null, stroke.miterLimit);
						o.graphics.moveTo(0, 0);
						o.graphics.lineTo(x2 - x1, y2 - y1);
						if(stroke.width) o.graphics.stroke();

						//this.height = stroke.width;
						//this.width = stroke.width;

						self.addChildAtPath(o, instance_name);
						//self.addChild(o);
					break;
					case 'linearGradient':
						var arr = [];
						
						var id = node.attributes.getNamedItem('id').value;
						var x1 = +node.attributes.getNamedItem("x1").value;
						var x2 = +node.attributes.getNamedItem("x2").value;
						var y1 = +node.attributes.getNamedItem("y1").value;
						var y2 = +node.attributes.getNamedItem("y2").value;
						
						//self._instructions.push('var ' + id + ' = ctx.createLinearGradient('+x1+','+y1+','+x2+','+y2+');');
						arr.push('var ' + id + ' = ctx.createLinearGradient('+x1+','+y1+','+x2+','+y2+')');
						//arr.push("createLinearGradient('"+id+"',"+x1+","+y1+","+x2+","+y2+");");
						
						for(var n = 0; n < node.childNodes.length; ++n) {
							var stope = node.childNodes[n];
							switch(stope.nodeName) {
								case 'stop':
									var pos = stope.attributes.getNamedItem('offset').value;
									var color = String(stope.attributes.getNamedItem('style').value);
									color = color.replace('stop-color:', '');
									//self._instructions.push(id + ".addColorStop("+pos+",'"+color+"');");
									//arr.push("addColorStop('"+id+"',"+pos+",'"+color+"');");
									arr.push(id + ".addColorStop("+pos+",'"+color+"');");
								break;
							}
						}

						Graphics.registerGradient(id, arr, this);
					break;
					case 'path':
						var fill, stroke, opacity = 1.0;
						if(node.hasAttribute('fill')) fill = Svg.parseStyle(node.attributes.getNamedItem("fill").value);
						stroke = Svg.parseStroke(node);
						if(node.hasAttribute('opacity')) opacity = +node.attributes.getNamedItem("opacity").value;
						var d = node.attributes.getNamedItem("d").value;
						
						// some svg has spaces in it, lets take those out for now.
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
						
						var p = this.futureParent(instance_name);
						var o = new Sprite();
						
						o.graphics.beginPath();
						if(fill) o.graphics.fillStyle(fill);
						if(stroke.width) o.graphics.lineStyle(stroke.width, stroke.style, stroke.opacity, null, null, null, stroke.miterLimit);
						if(opacity) o.alpha = opacity;
						
						for(var k = 0; k < d.length; ++k) {
							var code = String(String(d[k]).substr(0, 1));
							
							// make an array of all the points and cast all points as numbers
							pt = null;
							var pt = String(String(d[k]).substr(1)).split(',');
							for(var m = 0; m < pt.length; m++) {
								try {
									pt[m] = +pt[m];
								} catch (e) {
									throw new Error(e + "; Svg->parseXML->'path'; " + pt[m])
								}
							}
							//console.log(instance_name, pt.slice());
							
							// keep the last documented point handy (for relative draw instructions)
							var lp = o.graphics.points(-1)[0];
							if(!lp) lp = new Point(0, 0);
							
							// keep the last documented control point handy too
							var lcp;
							if(control_Points.length) lcp = control_Points[control_Points.length - 1];

							// Upper case is for a Absolute draw while lower case is for a relative draw (relative to the ending of the last draw, not the 0,0)
							switch(code) {
								// move to
								case 'M':
									var pt = p.globalToLocal(new Point(pt[0], pt[1]));
									o.x = pt.x;
									o.y = pt.y;
									o.graphics.moveTo(0, 0);
								break;
								case 'm':
									o.x = pt[0];
									o.y = pt[1];
									o.graphics.moveTo(0, 0);
								break;
								// line to
								case 'L':
									var L = p.globalToLocal(new Point(pt[0] - o.x, pt[1] - o.y));
									o.graphics.lineTo(L.x, L.y);
								break;
								case 'l':
									var l = this.pp(lp.x + pt[0], lp.y + pt[1]);
									o.graphics.lineTo(l.x, l.y);
								break;
								// horizontal line to
								case 'H':
									var L = p.globalToLocal(new Point(pt[0] - o.x, 0));
									o.graphics.lineTo(L.x, lp.y);
								break;
								case 'h':
									var h = this.pp(lp.x + pt[0], lp.y);
									o.graphics.lineTo(h.x, h.y);
								break;
								// vertical line to
								case 'V':
									var L = p.globalToLocal(new Point(0, pt[0] - o.y));
									o.graphics.lineTo(lp.x, L.y);
								break;
								case 'v':
									var v = this.pp(lp.x, lp.y + pt[0]);
									o.graphics.lineTo(v.x, v.y);
								break;
								// curve to
								case 'C':
									var C0 = p.globalToLocal(new Point(pt[0] - o.x, pt[1] - o.y));
									var C1 = p.globalToLocal(new Point(pt[2] - o.x, pt[3] - o.y));
									var C2 = p.globalToLocal(new Point(pt[4] - o.x, pt[5] - o.y));
									pt = [c0.x,c0.y,c1.x,c1.y,c2.x,c2.y];
									
									o.graphics.bezierCurveTo(pt[0], pt[1], pt[2], pt[3], pt[4], pt[5]);
									control_Points.push(C0);
									control_Points.push(C1);
								break;
								case 'c':
									var c0 = new Point(lp.x + pt[0], lp.y + pt[1]);
									var c1 = new Point(lp.x + pt[2], lp.y + pt[3]);
									var c2 = new Point(lp.x + pt[4], lp.y + pt[5]);
									pt = [c0.x,c0.y,c1.x,c1.y,c2.x,c2.y];
									
									o.graphics.lineTo(pt[4], pt[5]); // use this for pseudo-curve (testing)
									//o.graphics.bezierCurveTo(pt[0], pt[1], pt[2], pt[3], pt[4], pt[5]);
									control_Points.push(c0);
									control_Points.push(c1);
								break;
								// smooth curve to
								case 'S':
									var S0 = p.globalToLocal(new Point(pt[0] - o.x, pt[1] - o.y));
									var S1 = p.globalToLocal(new Point(pt[2] - o.x, pt[3] - o.y));
									
									var cp = new Point(lp.x + (lcp.x - lp.x) * -1, lp.y + (lcp.y - lp.y) * -1);
									pt = [S0.x,S0.y,S1.x,S1.y];
									
									o.graphics.bezierCurveTo(cp.x, cp.y, pt[0], pt[1], pt[2], pt[3]);
									control_Points.push(cp);
									control_Points.push(S0);
								break;
								case 's':
									var s0 = new Point(lp.x + pt[0], lp.y + pt[1]);
									var s1 = new Point(lp.x + pt[2], lp.y + pt[3]);
									
									var cp = new Point(lp.x + (lcp.x - lp.x) * -1, lp.y + (lcp.y - lp.y) * -1);
									pt = [s0.x,s0.y,s1.x,s1.y];
									
									o.graphics.bezierCurveTo(cp.x, cp.y, pt[0], pt[1], pt[2], pt[3]);
									control_Points.push(cp);
									control_Points.push(s0);
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
									if(isNaN(code)) throw new Error("\"path\" unkown code " + code);
								break;
							}
						}

						if(fill) o.graphics.fill();
						if(stroke.width) o.graphics.stroke();

						self.addChildAtPath(o, instance_name);
						//self.addChild(o);
					break;
					case 'polygon':
						// <polygon fill="url(#SVGID_2_)" stroke="#000000" points="76.785,169.127 48.016,154.937 20.017,170.59 24.623,138.844 
						// 1.083,117.052 32.699,111.624 46.149,82.501 61.083,110.892 92.936,114.686 70.549,137.661 "/>
						// <polygon opacity="0.45" fill="#FFFFFF" points="128.72,11.861 23.568,12 16.717,30 135.445,30 "/>
						var points = Svg.parsePoints(node.attributes.getNamedItem('points').value);
						
						var fill, stroke, opacity;
						if(node.hasAttribute('opacity')) opacity = +node.attributes.getNamedItem('opacity').value;
						if(node.hasAttribute('fill')) fill = Svg.parseStyle(node.attributes.getNamedItem('fill').value);
						if(node.hasAttribute('stroke')) stroke = Svg.parseStyle(node.attributes.getNamedItem('stroke').value);
						
						var o = new Sprite();
						
						if(opacity) o.alpha = opacity;
						if(fill) o.graphics.fillStyle(fill);
						if(stroke) o.graphics.strokeStyle(stroke);
						
						o.graphics.beginPath();
						
						for(var set = 0; set < points.length; ++set) {
							var pt = String(points[set]).split(',');
							var x = +pt[0], y = +pt[1];

							/**
							 * the first point is a moveTo and the rest are lineTo
							 */
							if(set == 0) {
								o.graphics.moveTo(x, y);
							} else o.graphics.lineTo(x, y);
						}
						
						o.graphics.closePath();
						if(stroke) o.graphics.stroke();
						if(fill) o.graphics.fill();
						
						self.addChildAtPath(o, instance_name);
						//self.addChild(o);
					break;
					case 'polyline':
						//var dashArray;
						//if(node.hasAttribute("stroke-dasharray")) dashArray = node.attributes.getNamedItem("stroke-dasharray").value;
						var fill, stroke;
						if(node.hasAttribute('fill')) fill = Svg.parseStyle(node.attributes.getNamedItem("fill").value);
						stroke = Svg.parseStroke(node);
						var points = Svg.parsePoints(node.attributes.getNamedItem("points").value);
						
						
						var p = this.futureParent(instance_name);
						var o = new Sprite();
						
						/**
						 * add code to enable dashed lines
						 */
						// if(dashArray) - no instruction for this yet
						
						if(fill) o.graphics.fillStyle(fill);
						if(stroke.width) o.graphics.lineStyle(stroke.width, stroke.style, stroke.opacity, null, null, null, stroke.miterLimit);
						
						o.graphics.beginPath();
						for(var j = 0; j < points.length; ++j) {
							var pt = String(points[j]).split(',');
							if((pt[0] != null) && (pt[1] != null)) {
								pt = p.globalToLocal(new Point(pt[0], pt[1]));
								if(j > 0) {
									o.graphics.lineTo(pt.x, pt.y);
								} else {
									o.graphics.moveTo(pt.x, pt.y);
								}
							} 
						}
						
						if(fill) o.graphics.fill();
						if(stroke.width) o.graphics.stroke();
						
						self.addChildAtPath(o, instance_name);
					break;
					case 'radialGradient':
						var arr = [];
						
						var id = node.attributes.getNamedItem('id').value;
						var cx, cy, r, fx = 0, fy = 0;
						if(node.hasAttribute("cx")) cx = +node.attributes.getNamedItem("cx").value;
						if(node.hasAttribute("cy")) cy = +node.attributes.getNamedItem("cy").value;
						if(node.hasAttribute("r")) r = +node.attributes.getNamedItem("r").value;
						if(node.hasAttribute("fx")) fx = +node.attributes.getNamedItem("fx").value;
						if(node.hasAttribute("fy")) fy = +node.attributes.getNamedItem("fy").value;
						
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
						
						//self._instructions.push('var ' + id + ' = ctx.createRadialGradient('+x1+','+y1+','+r1+','+x2+','+y2+','+r2+');');
						//o.graphics.createRadialGradient(id, x1, y1, r1, x2, y2, r2);
						//arr.push("o.graphics.createRadialGradient('"+id+"',"+x1+","+y1+","+r1+","+x2+","+y2+","+r2+");");
						arr.push('var ' + id + ' = ctx.createRadialGradient('+x1+','+y1+','+r1+','+x2+','+y2+','+r2+');');
						
						for(var n = 0; n < node.childNodes.length; ++n) {
							var stope = node.childNodes[n];
							switch(stope.nodeName) {
								case 'stop':
									var pos = stope.attributes.getNamedItem('offset').value;
									var color = stope.attributes.getNamedItem('style').value;
									color = color.replace('stop-color:', '');
									//self._instructions.push(id + ".addColorStop("+pos+",'"+color+"');");
									//o.graphics.addColorStop(id, pos, color);
									//arr.push("o.graphics.addColorStop('"+id+"',"+pos+",'"+color+"');");
									arr.push(id + ".addColorStop("+pos+",'"+color+"');");
								break;
							}
						}
						
						Graphics.registerGradient(id, arr, this);
					break;
					case 'rect':
						var x1 = 0, y1 = 0;
						if(node.hasAttribute('x')) x1 = +node.attributes.getNamedItem('x').value;
						if(node.hasAttribute('y')) y1 = +node.attributes.getNamedItem('y').value;
						var x2 = x1 + +(node.attributes.getNamedItem('width').value);
						var y2 = y1 + +(node.attributes.getNamedItem('height').value);
						var opacity = 1.0, stroke, strokeWidth, fill;
						if(node.hasAttribute('opacity')) opacity = +node.attributes.getNamedItem("opacity").value;
						if(node.hasAttribute('stroke')) stroke = Svg.parseStyle(node.attributes.getNamedItem('stroke').value);
						if(node.hasAttribute('stroke-width')) strokeWidth = +node.attributes.getNamedItem('stroke-width').value;
						if(node.hasAttribute('fill')) fill = Svg.parseStyle(node.attributes.getNamedItem('fill').value);
						else fill = 'rgb(0,0,0)';
						
						var o = new Sprite();
						o.x = x1;
						o.y = y1;
						
						o.alpha = opacity;
						if(fill) o.graphics.fillStyle(fill);
						if(stroke) o.graphics.strokeStyle(stroke);
						o.graphics.drawRect(0,0,x2 - x1,y2 - y1);
						if(fill) o.graphics.fill();
						if(stroke) o.graphics.stroke();
						
						self.addChildAtPath(o, instance_name);
					break;
					case 'svg':
						if(instance_name) {
							var vb;
							if(node.hasAttribute('viewBox')) vb = node.attributes.getNamedItem('viewBox').value.split(' ');
							
							var o = new Sprite();
							o.name = instance_name;
							o.x = 0 - vb[0];
							o.y = 0 - vb[1];
							this.addChildAtPath(o, instance_name);
						}
						self.parseXml(node);
					break;
					case 'text':
						// <text instance-name="fullNameTxt" transform="matrix(1 0 0 1 63.5342 21.1387)" fill="#464646" font-family="'Arial-BoldMT'" font-size="12">{fullNameTxt}</text>
						var t = new com.flanvas.text.TextField();
						
						var transform;
						if(node.hasAttribute('transform')) transform = node.attributes.getNamedItem('transform').value;
						if(node.hasAttribute('font-size')) t.size = node.attributes.getNamedItem('font-size').value;
						if(node.hasAttribute('font-family')) t.font = node.attributes.getNamedItem('font-family').value;
						if(node.hasAttribute('fill')) t.textColor = Utils.rgba(node.attributes.getNamedItem('fill').value);
						if(node.firstChild.data) t.text = node.firstChild.data;
						
						for(var ti = 0; ti < node.childNodes.length; ++ti) {
							var tin = node.childNodes[ti];
							if(tin instanceof SVGTSpanElement) {
								if(tin.hasAttribute('font-size')) t.size = tin.attributes.getNamedItem('font-size').value;
								if(tin.hasAttribute('font-family')) t.font = tin.attributes.getNamedItem('font-family').value;
								if(tin.hasAttribute('fill')) t.textColor = Utils.rgba(tin.attributes.getNamedItem('fill').value);
								if(t.text) t.appendText('\n');
								t.appendText(tin.firstChild.data);
							}
						}
						
						if(transform) {
							if(transform.indexOf('matrix') >= 0) {
								/**
								 * apparently, ff likes to add commas during replace sometimes ?
								 * to combat this, I added the "replace(/,/g,'')" code
								 */
								var arr = transform.replace(/.*\((.*)\)/, '$1').replace(/,/g,'').split(' ');
								t.rotation = arr[0] * arr[1] + arr[2] * arr[3];
								t.x = arr[4] - com.flanvas.text.TextField.PADDING.left;
								t.y = arr[5] - t.size - com.flanvas.text.TextField.PADDING.top;
							}
						}
						
						self.addChildAtPath(t, instance_name);
					break;
					default:
						if(String(node.nodeName).substr(0, 1) != "#") throw new Error("no type match for: " + node.nodeName);
					break;
				}
			}
		// } catch(e) {
		// 	// we may be completely out of scope and 'throw' isn't working here so we're console.warning instead
		// 	throw new Error(e);
		// }
	}
	
	/**
	 * Event Class
	 */
	com.flanvas.events.Event = class extends Object {
		constructor(type, bubbles, cancelable) {
			super();

			if(bubbles === undefined) bubbles = false;
			if(cancelable === undefined) cancelable = false;
			
			this.bubbles = bubbles;
			this.cancelable = cancelable;
			this.type = type;
			this.target = undefined;
		}
	}
	com.flanvas.events.Event.ADDED = "added";
	com.flanvas.events.Event.ADDED_TO_STAGE = "added_to_stage";
	com.flanvas.events.Event.CHANGE = "change";
	com.flanvas.events.Event.COMPLETE = "complete";
	com.flanvas.events.Event.ENTER_FRAME = "enter_frame";
	com.flanvas.events.Event.REMOVED = "removed";
	com.flanvas.events.Event.REMOVED_FROM_STAGE = "removed_from_stage";
	var Event = com.flanvas.events.Event;
	
	/**
	 * com.flanvas.events.FocusEvent Class
	 */
	com.flanvas.events.FocusEvent = class extends com.flanvas.events.Event {
		constructor(type, bubbles, cancelable) {
			super(type, bubbles, cancelable);
		}
	}
	com.flanvas.events.FocusEvent.FOCUS_IN = 'focus_in';
	com.flanvas.events.FocusEvent.FOCUS_OUT = 'focus_out';
	var FocusEvent = com.flanvas.events.FocusEvent;
	
	/**
	 * com.flanvas.ui.Keyboard
	 */
	com.flanvas.ui.Keyboard = {};
	com.flanvas.ui.Keyboard._capsLock;
	com.flanvas.ui.Keyboard._numLock;
	com.flanvas.ui.Keyboard.A = 65;
	com.flanvas.ui.Keyboard.B = 66;
	com.flanvas.ui.Keyboard.C = 67;
	com.flanvas.ui.Keyboard.D = 68;
	com.flanvas.ui.Keyboard.E = 69;
	com.flanvas.ui.Keyboard.F = 70;
	com.flanvas.ui.Keyboard.G = 71;
	com.flanvas.ui.Keyboard.H = 72;
	com.flanvas.ui.Keyboard.I = 73;
	com.flanvas.ui.Keyboard.J = 74;
	com.flanvas.ui.Keyboard.K = 75;
	com.flanvas.ui.Keyboard.L = 76;
	com.flanvas.ui.Keyboard.M = 77;
	com.flanvas.ui.Keyboard.N = 78;
	com.flanvas.ui.Keyboard.O = 79;
	com.flanvas.ui.Keyboard.P = 80;
	com.flanvas.ui.Keyboard.Q = 81;
	com.flanvas.ui.Keyboard.R = 82;
	com.flanvas.ui.Keyboard.S = 83;
	com.flanvas.ui.Keyboard.T = 84;
	com.flanvas.ui.Keyboard.U = 85;
	com.flanvas.ui.Keyboard.V = 86;
	com.flanvas.ui.Keyboard.W = 87;
	com.flanvas.ui.Keyboard.X = 88;
	com.flanvas.ui.Keyboard.Y = 89;
	com.flanvas.ui.Keyboard.Z = 90;
	com.flanvas.ui.Keyboard.ALTERNATE = 18;
	com.flanvas.ui.Keyboard.BACKQUOTE = 192;
	com.flanvas.ui.Keyboard.BACKSLASH = 220;
	com.flanvas.ui.Keyboard.BACKSPACE = 8;
	com.flanvas.ui.Keyboard.CAPSLOCK = 20;
	com.flanvas.ui.Keyboard.COMMA = 188;
	com.flanvas.ui.Keyboard.COMAND = 15;
	com.flanvas.ui.Keyboard.CONTROL = 17;
	com.flanvas.ui.Keyboard.INSERT = 45;
	com.flanvas.ui.Keyboard.DELETE = 46;
	com.flanvas.ui.Keyboard.DOWN = 40;
	com.flanvas.ui.Keyboard.END = 35;
	com.flanvas.ui.Keyboard.ENTER = 13;
	com.flanvas.ui.Keyboard.EQUAL = 187;
	com.flanvas.ui.Keyboard.ESCAPE = 27;
	com.flanvas.ui.Keyboard.F1 = 112;
	com.flanvas.ui.Keyboard.F2 = 113;
	com.flanvas.ui.Keyboard.F3 = 114;
	com.flanvas.ui.Keyboard.F4 = 115;
	com.flanvas.ui.Keyboard.F5 = 116;
	com.flanvas.ui.Keyboard.F6 = 117;
	com.flanvas.ui.Keyboard.F7 = 118;
	com.flanvas.ui.Keyboard.F8 = 119;
	com.flanvas.ui.Keyboard.F9 = 120;
	com.flanvas.ui.Keyboard.F10 = 121;
	com.flanvas.ui.Keyboard.F11 = 122;
	com.flanvas.ui.Keyboard.F12 = 123;
	com.flanvas.ui.Keyboard.F13 = 124;
	com.flanvas.ui.Keyboard.F14 = 125;
	com.flanvas.ui.Keyboard.HOME = 36;
	com.flanvas.ui.Keyboard.INSERT = 45;
	com.flanvas.ui.Keyboard.LEFT = 37;
	com.flanvas.ui.Keyboard.LEFTBRACKET = 219;
	com.flanvas.ui.Keyboard.MINUS = 189;
	com.flanvas.ui.Keyboard.NUMBER_0 = 48;
	com.flanvas.ui.Keyboard.NUMBER_1 = 49;
	com.flanvas.ui.Keyboard.NUMBER_2 = 50;
	com.flanvas.ui.Keyboard.NUMBER_3 = 51;
	com.flanvas.ui.Keyboard.NUMBER_4 = 52;
	com.flanvas.ui.Keyboard.NUMBER_5 = 53;
	com.flanvas.ui.Keyboard.NUMBER_6 = 54;
	com.flanvas.ui.Keyboard.NUMBER_7 = 55;
	com.flanvas.ui.Keyboard.NUMBER_8 = 56;
	com.flanvas.ui.Keyboard.NUMBER_9 = 57;
	com.flanvas.ui.Keyboard.NUMPAD = 21;
	com.flanvas.ui.Keyboard.NUMPAD_0 = 96;
	com.flanvas.ui.Keyboard.NUMPAD_1 = 97;
	com.flanvas.ui.Keyboard.NUMPAD_2 = 98;
	com.flanvas.ui.Keyboard.NUMPAD_3 = 99;
	com.flanvas.ui.Keyboard.NUMPAD_4 = 100;
	com.flanvas.ui.Keyboard.NUMPAD_5 = 101;
	com.flanvas.ui.Keyboard.NUMPAD_6 = 102;
	com.flanvas.ui.Keyboard.NUMPAD_7 = 103;
	com.flanvas.ui.Keyboard.NUMPAD_8 = 104;
	com.flanvas.ui.Keyboard.NUMPAD_9 = 105;
	com.flanvas.ui.Keyboard.NUMPAD_ADD = 107;
	com.flanvas.ui.Keyboard.NUMPAD_DECIMAL = 110;
	com.flanvas.ui.Keyboard.NUMPAD_DIVIDE = 111;
	com.flanvas.ui.Keyboard.NUMPAD_ENTER = 108;
	com.flanvas.ui.Keyboard.NUMPAD_MULTIPLY = 106;
	com.flanvas.ui.Keyboard.NUMPAD_SUBTRACT = 109;
	com.flanvas.ui.Keyboard.PAGE_DOWN = 34;
	com.flanvas.ui.Keyboard.PAGE_UP = 33;
	com.flanvas.ui.Keyboard.PERIOD = 190;
	com.flanvas.ui.Keyboard.QUOTE = 222;
	com.flanvas.ui.Keyboard.RIGHT = 39;
	com.flanvas.ui.Keyboard.RIGHTBRACKET = 221;
	com.flanvas.ui.Keyboard.SEMICOLON = 186;
	com.flanvas.ui.Keyboard.SHIFT = 16;
	com.flanvas.ui.Keyboard.SLASH = 191;
	com.flanvas.ui.Keyboard.SPACE = 32;
	com.flanvas.ui.Keyboard.TAB = 9;
	com.flanvas.ui.Keyboard.UP = 38;
	
	com.flanvas.ui.Keyboard.__defineGetter__('capsLock', function() {
		return com.flanvas.ui.Keyboard._capsLock;
	});
	com.flanvas.ui.Keyboard.__defineGetter__('numLock', function() {
		return com.flanvas.ui.Keyboard._numLock;
	});
	
	var Keyboard = com.flanvas.ui.Keyboard;
	
	
	/**
	 * KeyboardEvent
	 */
	com.flanvas.events.KeyboardEvent = class extends com.flanvas.events.Event {
		constructor(type, bubbles, cancelable, charCodeValue, keyCodeValue, keyLocationValue, ctrlKeyValue, altKeyValue, shiftKeyValue, controlKeyValue, commandKeyValue) {
			super(type, bubbles, cancelable);

			this._charCode = undefined;
			this._commandKey = false;
			this._controlKey = false;
			this._keyCode = undefined;
			
			if(charCodeValue) this._charCode = charCodeValue;
			if(commandKeyValue) this._commandKey = commandKeyValue;
			if(controlKeyValue) this._controlKey = controlKeyValue;
			if(keyCodeValue) this._keyCode = keyCodeValue;
			
			this.__defineGetter__('charCode', function() {
				return this._charCode;
			});
			this.__defineGetter__('commandKey', function() {
				return this._commandKey;
			});
			this.__defineGetter__('controlKey', function() {
				return this._controlKey;
			});
			this.__defineGetter__('keyCode', function() {
				return this._keyCode;
			});
		}
	}
	com.flanvas.events.KeyboardEvent.KEY_DOWN = 'key_down';
	com.flanvas.events.KeyboardEvent.KEY_UP = 'key_up';
	var KeyboardEvent = com.flanvas.events.KeyboardEvent;
	
	/**
	 * IntervalManager Class
	 */
	class IntervalManager extends com.flanvas.events.EventDispatcher {
		constructor() {
			super();

			var d = new Date();
			this._current_id = 0;
			this._fps = 0;
			this._fps_throttle = [];
			this._interval = setInterval("_f.intervalManager.update()", 10);
			this._intervals = new Array();
			this._last_time = 0;
			this._start_time = d.getTime();
			
			this.__defineGetter__('fps', function() {
				return this._fps;
			});
		}
	}
	IntervalManager.prototype.clearInterval = function(id) {
		for(var i in this._intervals) {
			if(this._intervals[i].id == id) {
				this._intervals.splice(i, 1);
				return 0;
			}
		}
		return 1;
	}
	IntervalManager.prototype.setInterval = function(func, delay) {
		this._intervals.push({"id":++this._current_id, "func":func, "delay":delay, "last_run":Utils.getTimer()})
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
			if(Utils.getTimer() > this._last_time + (1000 / (_f.stage.fps + avg * 2))) {
				//if(_f.traceDiv && _f.clearTraceOnFrame) trace("", true);
				if(_f.stage.canvas) { // without this, small errors cause a console mess
					this.dispatchEvent(new Event(Event.ENTER_FRAME));
					
					this._fps = 1000 / (Utils.getTimer() - this._last_time);
					this._last_time = Utils.getTimer();
					while(this._fps_throttle.length > 10) this._fps_throttle.pop();
					
					// throttling needs more work. it only half helps.
					this._fps_throttle.unshift(_f.stage.fps - this.fps);
				}
			}
		}
		
		for(var i in this._intervals) {
			var o = this._intervals[i];
			if(Utils.getTimer() > o.last_run + o.delay) {
				o.func();
				o.last_run = Utils.getTimer();
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
	 * com.flanvas.events.MouseEvent Class
	 */
	com.flanvas.events.MouseEvent = class extends com.flanvas.events.Event {
		constructor(type, bubbles, cancelable, localX, localY, relatedObject, ctrlKey, altKey, shiftKey, buttonDown, delta, commandKey, controlKey, clickCount) {
			super(type, bubbles, cancelable);

			if(bubbles === undefined) bubbles = true;

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
	}
	com.flanvas.events.MouseEvent.CLICK = "click";
	com.flanvas.events.MouseEvent.MOUSE_DOWN = "mouseDown";
	com.flanvas.events.MouseEvent.MOUSE_MOVE = "mouseMove";
	com.flanvas.events.MouseEvent.MOUSE_UP = "mouseUp";
	com.flanvas.events.MouseEvent.ROLL_OUT = "rollOut";
	com.flanvas.events.MouseEvent.ROLL_OVER = "rollOver";
	com.flanvas.events.MouseEvent.RIGHT_CLICK = "rightClick";
	com.flanvas.events.MouseEvent.RIGHT_MOUSE_DOWN = "rightMouseDown";
	com.flanvas.events.MouseEvent.RIGHT_MOUSE_UP = "rightMouseUp";
	var MouseEvent = com.flanvas.events.MouseEvent;
	
	/**
	 * Stage Class
	 */
	com.flanvas.display.Stage = class extends DisplayObjectContainer {
		constructor() {
			super();

			this._canvas = undefined;
			this._context = "2d";
			this._currentMouseTarget = undefined;
			this._draw_stage_objects = false;
			this._focusManager = new com.flanvas.managers.FocusManager(this);
			this._fps = 24;
			this._lastKeyDownEvent = undefined;
			this._stage_height = undefined;
			this._stage_width = undefined;
			this._keyboard_attached = false;
			
			var self = this;
			this.__defineGetter__('canvas', function() {
				return this._canvas;
			});
			this.__defineSetter__('canvas', function(obj) {
				this._canvas = obj;
				
				var mousePos = function(x, y) {
					/**
					 * subtract the offsets to get the actual mouse props for the canvas
					 * after the canvas recieves modified x/y etc
					 */
					self._mouse_x = x - self.canvas.offsetLeft;
					self._mouse_y = y - self.canvas.offsetTop;
				}
				
				if((new RegExp('iphone|ipod|ipad', 'i')).test(navigator.userAgent)) {
				//if(navigator.userAgent.match(/iphone|ipod|ipad/i)) {
					//enables "mouse" for iphone
					var touchType = function(event) {
						if(event.targetTouches[0]) return "targetTouches";
							else if(event.changedTouches[0]) return "changedTouches";
						return "touches";
					}
					
					this.canvas.addEventListener('touchstart', function(event) {
						var tt = touchType(event);
						mousePos(event[tt][0].clientX, event[tt][0].clientY);
						self._currentMouseTarget.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_DOWN));
					});
					this.canvas.addEventListener('touchmove', function(event) {
						var tt = touchType(event);
						mousePos(event[tt][0].clientX, event[tt][0].clientY);
						var t = self.findMouseTarget();
						//self._currentMouseTarget = t;
						t.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_MOVE));
					});
					this.canvas.addEventListener('touchend', function(event) {
						var tt = touchType(event);
						mousePos(event[tt][0].clientX, event[tt][0].clientY);
						self._currentMouseTarget.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_UP));
					});
				} else {
					// regular mouse listening

					var wbtmet = function(which) { // which button to mouse event type
						switch(event.which) {
							case 1:
								// default
							break;
							case 3:
								return MouseEvent.RIGHT_MOUSE_DOWN;
							break;
						}

						return MouseEvent.MOUSE_DOWN;
					}

					this.canvas.addEventListener('mousedown', function(event) {
						mousePos(event.pageX, event.pageY);
						self.focus = self._currentMouseTarget;
						var met = wbtmet(event.which);
						self._currentMouseTarget.dispatchEvent(new MouseEvent(met));
					}, false);
					this.canvas.addEventListener('mousemove', function(event) {
						event.stopPropagation();
						mousePos(event.pageX, event.pageY);
						var t = self.findMouseTarget();
						self._currentMouseTarget = t;
						t.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_MOVE));
					}, false);
					this.canvas.addEventListener('mouseup', function(event) {
						mousePos(event.pageX, event.pageY);
						var met = wbtmet(event.which);
						self._currentMouseTarget.dispatchEvent(new MouseEvent(met));
					}, false);
					this.canvas.addEventListener('contextMenu', function(event) {
						mousePos(event.pageX, event.pageY);
						self._currentMouseTarget.dispatchEvent(new MouseEvent(MouseEvent.RIGHT_MOUSE_CLICK));
					})
				}
				
				/**
				 * I'm storing the keydown event for use with the keypress event because neither
				 * the keyDownEvent nor the keyPressEvent contains both the correct 
				 * event.charCode and event.keyCode (if both are contained, one is incorrect).
				 * I'm sure there's a problem somewhere with doing this, but it's working
				 * so far.
				 */
				this.keyDownHandler = function(event) {
					event.stopPropagation();
					//event.preventDefault();
					self._lastKeyDownEvent = event;
				}
				this.keyUpHandler = function(event) {
					event.stopPropagation();
					//event.preventDefault();
					event = new com.flanvas.events.KeyboardEvent(com.flanvas.events.KeyboardEvent.KEY_UP, null, null, event.charCode, event.keyCode, null, event.ctrlKey, event.altKey, event.shiftKey, event.ctrlKey, event.metaKey);
					self.focus.dispatchEvent(event);
				}
				this.keyPressHandler = function(event) {
					event.stopPropagation();
					//event.preventDefault();
					event = new com.flanvas.events.KeyboardEvent(com.flanvas.events.KeyboardEvent.KEY_DOWN, null, null, event.charCode, self._lastKeyDownEvent.keyCode, null, event.ctrlKey, event.altKey, event.shiftKey, event.ctrlKey, event.metaKey);
					self.focus.dispatchEvent(event);
				}

				document.addEventListener('click', function(event) {
					if(event.target === self._canvas) {
						if(!self._keyboard_attached) {
							document.addEventListener('keydown', self.keyDownHandler, false);
							document.addEventListener('keypress', self.keyPressHandler, false);
							document.addEventListener('keyup', self.keyUpHandler, false);
							self._keyboard_attached = true;
						}
					} else {
						document.removeEventListener('keydown', self.keyDownHandler);
						document.removeEventListener('keypress', self.keyPressHandler);
						document.removeEventListener('keyup', self.keyUpHandler);
						self._keyboard_attached = false;
					}
				}, false);
				
				this.dispatchEvent(new Event(Stage.CANVAS_SET));
			});
			this.__defineGetter__('ctx', function() {
				return this.canvas.getContext(this._context);
			});
			this.__defineGetter__('drawStageObjects', function() {
				return self._draw_stage_objects;
			});
			this.__defineSetter__('drawStageObjects', function(bool) {
				self._draw_stage_objects = bool;
				self.invalidate();
			});
			this.__defineGetter__('focus', function() {
				return this._focusManager.getFocus();
			});
			this.__defineSetter__('focus', function(component) {
				this._focusManager.setFocus(component);
			});
			this.__defineGetter__('fps', function() {
				return this._fps;
			});
			this.__defineSetter__('fps', function(val) {
				this._fps = +val;
			});
			this.__defineGetter__('mouseX', function() {
				return this._mouse_x;
			});
			this.__defineGetter__('mouseY', function() {
				return this._mouse_y;
			});
			this.__defineGetter__('stageHeight', function() {
				return this._canvas.height;
			});
			this.__defineGetter__('stageWidth', function() {
				return this._canvas.width;
			});
			
			this.addEventListener(Event.ENTER_FRAME, function(event) {
				event.target.clear();
				/**
				 * start the drawing sequence, which is propagated downward 
				 * to every item in the display list
				 */
				event.target.drawSelf();
				
				/**
				 * process roll_over / roll_out stuff
				 * we process these here because a mouse_move is not always happening when a roll_over happens due
				 * to the fact that an item may animate to be underneath the mouse.
				 */
				var t = event.target.findMouseTarget();
				//if(!this._currentMouseTarget) this._currentMouseTarget = t;
				if(this._currentMouseTarget != t) {
					if(this._currentMouseTarget) this._currentMouseTarget.dispatchEvent(new MouseEvent(MouseEvent.ROLL_OUT));
					this._currentMouseTarget = t;
					this._currentMouseTarget.dispatchEvent(new MouseEvent(MouseEvent.ROLL_OVER));
				}
			});
		}

		clear() {
			// clears the canvas
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}
	com.flanvas.display.Stage.CANVAS_SET = "canvas_set";
	// com.flanvas.display.Stage = class extends DisplayObjectContainer {}
	/*
	 * reduntant function which finds the object which the mouse
	 * is on
	 */
	com.flanvas.display.Stage.prototype.findMouseTarget = function(obj) {
		if(obj === undefined) obj = this;

		// on no children close w/out processing.
		if(!obj.numChildren) return obj;

		for(var i = obj.numChildren - 1; i >= 0; --i) {
			try {
				if(obj.getChildAt(i).isMouseTarget()) return this.findMouseTarget(obj.getChildAt(i));
			} catch(e) {
				throw new Error("child is not an DisplayObject");
			}
		}
		
		return obj;
	}
	var Stage = com.flanvas.display.Stage;
	
	/**
	 * MainTimeline Class
	 */
	class MainTimeline extends com.flanvas.events.EventDispatcher {
		constructor() {
			super();

			MainTimeline.instance = this;
			this._instance_count = 0;
			this._instance_log = [];
			this._stage = undefined;
			
			//this.clearTraceOnFrame = true;
			this.intervalManager = new IntervalManager();
			this.traceDiv = undefined;
			this.traceDraw = false;
			
			this.__defineGetter__('stage', function() {
				return this._stage;
			});
		}
	}
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
	 * PROBABLY GOING TO REMOVE THIS (enables lazy programming)
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
		this._stage = obj;
		this.stage.dispatchEvent(new Event(Event.ADDED_TO_STAGE));
	}
	
	/**
	 * Point Class
	 */
	// class Point { // doesn't work ??
	var Point = class {
		constructor(x, y) {
			if(isNaN(x)) throw new ArgumentError("x must be a Number.");
			if(isNaN(y)) throw new ArgumentError("y must be a Number.");
			
			this.x = +x;
			this.y = +y;
		}
	}
	
	/**
	 * Utils Class
	 */
	// function Utils() {}
	class Utils extends Object {}
	Utils.getTimer = function() {
		var d = new Date();
		return d.getTime() - _f.intervalManager._start_time;
	}
	Utils.stripContentType = function(doc) {
		try {
			var str = doc.getAllResponseHeaders();
			var keyword = "Content-Type: ";
		} catch (e) {
			throw new Error("Is the image on a different domain? " + e);
		}
		
		if(str.indexOf(keyword) < 0) {
			throw new Error("No content-type specified for the loaded document. Is the URL correct? Or maybe a crossdomain policy is getting in the way?");
		}
		
		str = str.substr(str.indexOf(keyword) + keyword.length);
		str = str.substr(0, str.indexOf('\n'));
		str = str.replace(/\n|\r| /gm,'');
		//if(str.indexOf(';')) str = str.substr(0, str.indexOf(';'));
		
		return str;
	}
	/**
	 * @param url:String The URL you want to have loaded via XHR
	 * @param func:Function the function you want to be assigned to onreadystatechange
	 */
	Utils.xhr = function(url, func) {
		var doc;
		
		if (window.XMLHttpRequest) {
			doc = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			doc = new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		doc.open("GET", url, true);
		
		var self = this;
		doc.onreadystatechange = func;
		
		doc.send(null);
	}
	/**
	 * Plug in any color format and get back rgba
	 */
	Utils.rgba = function(val) {
		var obj = {r:0,g:0,b:0,a:1.0};
		
		// remove quotes if found.
		if(isNaN(val)) val = String(val).replace(/'|"/g, '');
		
		// is hexidecimal eg 0xRRGGBB
		if(!isNaN(val)) {
			val = val.toString(16);
			while(val.length < 6) val = "0" + val;
			// convert to hex, which will be converted in the next logic statment
			val = "#" + val;
		}
		
		// is #RGB or #RRGGBB or RRGGBBAA
		// if val is a hex, convert to rgb
		var hash = val.indexOf('#');
		if(hash >= 0) {
			val = val.substr(hash + 1);
			
			if(val.length < 4) {
				// #RGB
				obj.r = parseInt(val.substr(0, 1) + val.substr(0, 1), 16);
				obj.g = parseInt(val.substr(1, 1) + val.substr(1, 1), 16);
				obj.b = parseInt(val.substr(2, 1) + val.substr(2, 1), 16);
			} else if(val.length < 7) {
				// #RRGGBB
				obj.r = parseInt(val.substr(0, 2), 16);
				obj.g = parseInt(val.substr(2, 2), 16);
				obj.b = parseInt(val.substr(4, 2), 16);
			} else {
				// #RRGGBBAA
				obj.r = parseInt(val.substr(0, 2), 16);
				obj.g = parseInt(val.substr(2, 2), 16);
				obj.b = parseInt(val.substr(4, 2), 16);
				obj.a = parseInt(val.substr(6, 2), 16) / 255;
			}
		}
		
		// is "black"
		switch(val) {
			case 'red':
				obj.r = 255;
			break;
			case 'green':
				obj.g = 255;
			break;
			case 'blue':
				obj.b = 255;
			break;
			case 'black':
			break;
			case 'white':
				obj.r = 255;
				obj.g = 255;
				obj.b = 255;
			break;
		}
		
		// is "rgba(0,0,0,1)"
		if(val.indexOf('rgba') >= 0) return val;
		
		// is "rgb(0,0,0)"
		if(val.indexOf('rgb') >= 0) return val;
		
		// if alpha is 1
		if(this.a >= 1.0) return 'rgb(' + obj.r + ',' + obj.g + ',' + obj.b + ')';
		
		// if alpha is not 1
		return 'rgba(' + obj.r + ',' + obj.g + ',' + obj.b + ',' + obj.a + ')';
	}
	/**
	 * Converts text to xml thanks to a script from:
	 * http://www.hiteshagrawal.com/javascript/convert-xml-document-to-string-in-javascript
	 */
	Utils.strToXml = function(str) {
		if (window.ActiveXObject) {
			xml = new ActiveXObject("Microsoft.XMLDOM");
			xml.async = "false";
			xml.loadXML(str);
			return xml;
		} else {
			return (new DOMParser()).parseFromString(str,"text/xml");
		}
	}
	/**
	 * Converts xml to text
	 */
	Utils.xmlToStr = function(xml) {
		var str = '';
		
		if(window.ActiveXObject) {
			str = xml.xml;
		} else {
			str = (new XMLSerializer()).serializeToString(xml);
		}
		
		return str.replace(/'/g,'').replace(/\n|\r|\v|\t|\f|\0/g,'');
	}
	/**
	 * creates a canvas that can be used or disposed
	 * @param ctx:Boolean returns a canvas on false and returns a context on true. default is true.
	 *
	 * @return:* Returns a Canvas or Canvas.context depending on @ctx
	 */
	Utils.virtualContext = function(ctx) {
		if(ctx === undefined) ctx = true;
		if(ctx) return document.createElement('canvas').getContext('2d');
		return document.createElement('canvas');
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
		console.warn(str);
	}
	
	var _f = new MainTimeline();
	_f.VERSION = "0.033";
	var stage = new com.flanvas.display.Stage();
	_f.setStage(stage);
	
	/*
	function trace() {
		try {
			console.log(arguments);
		} catch(e) {
			if(_f.traceDiv) {
				if(clear) {
					_f.traceDiv.innerHTML = '';
				}
				_f.traceDiv.innerHTML = _f.traceDiv.innerHTML + param + "<br>";
			} else {
				//console.warn(param);
			}
		}
	}
	*/
	function trace() {
		if(console) console.log.apply(console, arguments);
		else {
			var str = "";
			for(var i = 0; i < arguments.length; ++i) {
				str += arguments[i];
				if(i != arguments.length - 1) str += ", "; 
			}
			console.warn(str);
		}
	}
} catch(e) {
	console.error(e);
	// throw new Error("Flanvas Error: " + e);
}