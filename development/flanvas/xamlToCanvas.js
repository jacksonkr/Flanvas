// This is opensource code (no EULA) written by Jackson Rollins > jacksonkr.com

function dump(obj) {
	var x = "";
	for(var i in obj) {
		x += i + ", "
	}
	alert(x);
}

function XamlToCanvas() {
	this.library = new Array();
	this.stage = new Array();
	
	var thisPtr = this;
	
	/**
	 * selects an item from the library to be drawn on the specified canvas
	 */
	this.attachItem = function(canvasCtx, id) {
		var obj = this.findItem(id);
		if(obj) {
			// C - absolute path
			// L - line to
			// M - move to
			
			// draw the item on the specified canvas
			var ref = {};
			$(obj).find("Viewbox").each(function() {
				
			})
			
			/*
			for(var j in obj.data) {
				switch(obj.data[j].code) {
					case "C":
					break;
					case "L":
					break;
					case "M":
						//alert(obj.data[j].value);
					break;
					default:
						throw "XamlToCanvas->attachItem; no switch case for code " + obj.data[j].code;
					break;
				}
			}
			*/
			this.stage.push(ref);
		} else {
			throw "XamlToCanvas->attachItem; No item found with the id: " + id;
		}
	}
	this.findItem = function(id) {
		for(var i in this.library) {
			if(this.library[i].id == id) {
				return this.library[i];
			}
		}
		return null;
	}
	/**
	 * adds an item in to the library
	 */
	this.libraryItem = function(id, data) {
		if(!this.findItem(id)) {
			this.library.push({"id":id, "data":data});
		}
	}
	/**
	 * load the xaml. Once the xaml is loaded, put the object in to the library
	 */
	this.loadItem = function(url) {
		if($) {
			$.ajax({
				type: "GET",
				url: url,
				dataType: "xml",
				error: function(request, status, error) {
					throw "XamlToCanvas->loadItem; Error loading the xml file:" + error;
				},
				success: function(xml) {
					var slash = url.lastIndexOf("/") + 1;
					var id = url.substr(slash, url.lastIndexOf(".") - slash); 
					
					//var o = new XamlToInstructions(xml);
					//thisPtr.libraryItem(id, o.data);
					thisPtr.libraryItem(id, xml);
				}
			});
		} else {
			throw "XamlToCanvas->loadItem; jquery wasn't found";
		}
	}
}

/**
 * class - converts XAML in to an array of instructions
 */
function XamlToInstructions(xaml) {
	this.data = new Array();
	var thisPtr = this;
	
	this.parseCanvas = function(element) {
		$(element).children().each(function() {
			switch(this.nodeName) {
				case "Canvas":
					thisPtr.parseCanvas(this);
				break;
				case "Path":
					if($(this).attr("Data")) {
						thisPtr.makeInstructions($(this).attr("Data"));
					} else {
						throw "XamlToInstructions->parseCanvas; no valid attr for Path eg. <Path Data=\"[data]\"";	
					}
				break;
				default:
					throw "XamlToInstructions->parseCanvas; don't know what to do with type: " + obj.nodeName;
				break;
			}
		});
	}
	this.parseViewbox = function(element) {
		$(element).children().each(function() {
			switch(this.nodeName) {
				case "Canvas":
					thisPtr.parseCanvas(this);
				break;
				default:
					throw "XamlToInstructions->parseViewbox; don't know what to do with type: " + this.nodeName;
				break;
			}
		});
	}
	this.makeInstructions = function(str) {
		var arr = str.split(" ");	
		
		for(var i = 0; i < arr.length; ++i) {
			switch(arr[i]) {
				case "C":
					thisPtr.data.push({"code":"C", "value":[arr[++i],arr[++i],arr[++i]]});
				break;
				case "L":
					thisPtr.data.push({"code":"L", "value":arr[++i]});
				break;
				case "M":
					thisPtr.data.push({"code":"M", "value":arr[++i]});
				break;
				case "F1":
				case "Z":
				break;
				default:
					throw "XamlToInstructions->makeInstructions; unaccounted for: " + arr[i];
				break;
			}
		}
	}
	
	// constructor
	$(xaml).each(function(){
		$(this).children().each(function(i) {
			switch(this.nodeName) {
				case "Viewbox":
					thisPtr.parseViewbox(this);
				break;
				default:
					throw "XmlToInstructions->Constructer(); Don't know what to do with node type " + this.nodeName;
				break;
			}
		});
	});
}

