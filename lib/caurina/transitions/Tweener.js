/**
 * Tweener Class
 * converted from Google's Tweener
 */

/**
 * Tweener
 * Transition controller for movieclips, sounds, textfields and other objects
 *
 * @author		Zeh Fernando, Nate Chatellier, Arthur Debert
 * @version		1.31.71
 */

/*
Licensed under the MIT License

Copyright (c) 2006-2007 Zeh Fernando and Nate Chatellier

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

http://code.google.com/p/tweener/
http://code.google.com/p/tweener/wiki/License
*/

/**
 * AuxFunctions Class
 */
function AuxFunctions() {
	this._constructor()
}
AuxFunctions.prototype._constructor = function() {
	throw new Error("This has been defined by Tweener as a static class and should not be instantiated");
}
AuxFunctions.extend(Object);
/**
 * Gets the R (xx0000) bits from a number
 *
 * @param		p_num				Number		Color number (ie, 0xffff00)
 * @return							Number		The R value
 */
AuxFunctions.numberToR = function(p_num) {
	// The initial & is meant to crop numbers bigger than 0xffffff
	return (p_num & 0xff0000) >> 16;
}

/**
 * Gets the G (00xx00) bits from a number
 *
 * @param		p_num				Number		Color number (ie, 0xffff00)
 * @return							Number		The G value
 */
AuxFunctions.numberToG = function(p_num) {
	return (p_num & 0xff00) >> 8;
}

/**
 * Gets the B (0000xx) bits from a number
 *
 * @param		p_num				Number		Color number (ie, 0xffff00)
 * @return							Number		The B value
 */
AuxFunctions.numberToB = function(p_num) {
	return (p_num & 0xff);
}

/**
 * Checks whether a string is on an array
 *
 * @param		p_string			String		String to search for
 * @param		p_array				Array		Array to be searched
 * @return							Boolean		Whether the array contains the string or not
 */
AuxFunctions.isInArray = function(p_string, p_array) {
	var l = p_array.length;
	for (var i = 0; i < l; i++) {
		if (p_array[i] == p_string) return true;
	}
	return false;
}

/**
 * Returns the number of properties an object has
 *
 * @param		p_object			Object		Target object with a number of properties
 * @return							Number		Number of total properties the object has
 */
AuxFunctions.getObjectLength = function(p_object) {
	var totalProperties = 0;
	for (var pName in p_object) totalProperties ++;
	return totalProperties;
}

/* Takes a variable number of objects as parameters and "adds" their properties, from left to right. If a latter object defines a property as null, it will be removed from the final object
* @param		args				Object(s)	A variable number of objects
* @return							Object		An object with the sum of all paremeters added as properties.
*/
AuxFunctions.concatObjects = function(){
	var args = arguments;
	
	var finalObject = {};
	var currentObject;
	for (var i = 0; i < args.length; i++){
		currentObject = args[i];
		for (var prop in currentObject){
			if (currentObject[prop] == null){
				// delete in case is null
				delete finalObject[prop];
			}else{
				finalObject[prop] = currentObject[prop];
			}
		}
	}
	return finalObject;
}

/**
 * TweenListObj Class
 */
/**
 * The tween list object. Stores all of the properties and information that pertain to individual tweens.
 *
 * @author		Nate Chatellier, Zeh Fernando
 * @version		1.0.4
 * @private
 */

// ==================================================================================================================================
// CONSTRUCTOR function -------------------------------------------------------------------------------------------------------------

/**
 * Initializes the basic TweenListObj.
 *
 * @param	p_scope				Object		Object affected by this tweening
 * @param	p_timeStart			Number		Time when this tweening should start
 * @param	p_timeComplete		Number		Time when this tweening should end
 * @param	p_useFrames			Boolean		Whether or not to use frames instead of time
 * @param	p_transition		Function	Equation to control the transition animation
 */
function TweenListObj(p_scope, p_timeStart, p_timeComplete, p_useFrames, p_transition, p_transitionParams) {
	this._construct(p_scope, p_timeStart, p_timeComplete, p_useFrames, p_transition, p_transitionParams);
}
TweenListObj.prototype._construct = function(p_scope, p_timeStart, p_timeComplete, p_useFrames, p_transition, p_transitionParams) {
	this.scope					// Object affected by this tweening
	this.properties				// List of properties that are tweened (PropertyInfoObj instances)
		// .valueStart							// Initial value of the property
		// .valueComplete						// The value the property should have when completed
	this.timeStart				// Time when this tweening should start
	this.timeComplete			// Time when this tweening should end
	this.useFrames				// Whether or not to use frames instead of time
	this.transition				// Equation to control the transition animation
	this.transitionParams		// Additional parameters for the transition
	this.onStart				// Function to be executed on the object when the tween starts (once)
	this.onUpdate				// Function to be executed on the object when the tween updates (several times)
	this.onComplete				// Function to be executed on the object when the tween completes (once)
	this.onOverwrite			// Function to be executed on the object when the tween is overwritten
	this.onError				// Function to be executed if an error is thrown when tweener exectues a callback (onComplete, onUpdate etc)
	this.onStartParams			// Array of parameters to be passed for the event
	this.onUpdateParams			// Array of parameters to be passed for the event
	this.onCompleteParams		// Array of parameters to be passed for the event
	this.onOverwriteParams		// Array of parameters to be passed for the event
	this.onStartScope			// Scope in which the event function is ran
	this.onUpdateScope			// Scope in which the event function is ran
	this.onCompleteScope		// Scope in which the event function is ran
	this.onOverwriteScope		// Scope in which the event function is ran
	this.onErrorScope			// Scope in which the event function is ran
	this.rounded				// Use rounded values when updating
	this.isPaused				// Whether or not this tween is paused
	this.timePaused				// Time when this tween was paused
	this.isCaller				// Whether or not this tween is a "caller" tween
	this.count					// Number of times this caller should be called
	this.timesCalled			// How many times the caller has already been called ("caller" tweens only)
	this.waitFrames				// Whether or not this caller should wait at least one frame for each call execution ("caller" tweens only)
	this.skipUpdates			// How many updates should be skipped (default = 0; 1 = update-skip-update-skip...)
	this.updatesSkipped			// How many updates have already been skipped
	this.hasStarted				// Whether or not this tween has already started

	this.scope				=	p_scope;
	this.timeStart			=	p_timeStart;
	this.timeComplete		=	p_timeComplete;
	this.useFrames			=	p_useFrames;
	this.transition			=	p_transition;
	this.transitionParams	=	p_transitionParams;

	// Other default information
	this.properties		=	new Object();
	this.isPaused		=	false;
	this.timePaused		=	undefined;
	this.isCaller		=	false;
	this.updatesSkipped	=	0;
	this.timesCalled		=	0;
	this.skipUpdates		=	0;
	this.hasStarted		=	false;
}


// ==================================================================================================================================
// OTHER functions ------------------------------------------------------------------------------------------------------------------

/**
 * Clones this tweening and returns the new TweenListObj
 *
 * @param	omitEvents		Boolean			Whether or not events such as onStart (and its parameters) should be omitted
 * @return					TweenListObj	A copy of this object
 */
TweenListObj.prototype.clone = function(omitEvents) {
	var nTween = new TweenListObj(this.scope, this.timeStart, this.timeComplete, this.useFrames, this.transition, this.transitionParams);
	nTween.properties = new Array();
	for (var pName in this.properties) {
		nTween.properties[pName] = this.properties[pName].clone();
	}
	nTween.skipUpdates = this.skipUpdates;
	nTween.updatesSkipped = this.updatesSkipped;
	if (!omitEvents) {
		nTween.onStart = this.onStart;
		nTween.onUpdate = this.onUpdate;
		nTween.onComplete = this.onComplete;
		nTween.onOverwrite = this.onOverwrite;
		nTween.onError = this.onError;
		nTween.onStartParams = this.onStartParams;
		nTween.onUpdateParams = this.onUpdateParams;
		nTween.onCompleteParams = this.onCompleteParams;
		nTween.onOverwriteParams = this.onOverwriteParams;
		nTween.onStartScope = this.onStartScope;
		nTween.onUpdateScope = this.onUpdateScope;
		nTween.onCompleteScope = this.onCompleteScope;
		nTween.onOverwriteScope = this.onOverwriteScope;
		nTween.onErrorScope = this.onErrorScope;
	}
	nTween.rounded = this.rounded;
	nTween.isPaused = this.isPaused;
	nTween.timePaused = this.timePaused;
	nTween.isCaller = this.isCaller;
	nTween.count = this.count;
	nTween.timesCalled = this.timesCalled;
	nTween.waitFrames = this.waitFrames;
	nTween.hasStarted = this.hasStarted;

	return nTween;
}

/**
 * Returns this object described as a String.
 *
 * @return					String		The description of this object.
 */
TweenListObj.prototype.toString = function() {
	var returnStr = "\n[TweenListObj ";
	returnStr += "scope:" + String(this.scope);
	returnStr += ", properties:";
	var isFirst = true;
	for (var i in this.properties) {
		if (!isFirst) returnStr += ",";
		returnStr += "[name:"+this.properties[i].name;
		returnStr += ",valueStart:"+this.properties[i].valueStart;
		returnStr += ",valueComplete:"+this.properties[i].valueComplete;
		returnStr += "]";
		isFirst = false;
	}
	returnStr += ", timeStart:" + String(this.timeStart);
	returnStr += ", timeComplete:" + String(this.timeComplete);
	returnStr += ", useFrames:" + String(this.useFrames);
	returnStr += ", transition:" + String(this.transition);
	returnStr += ", transitionParams:" + String(this.transitionParams);

	if (this.skipUpdates)		returnStr += ", skipUpdates:"		+ String(this.skipUpdates);
	if (this.updatesSkipped)		returnStr += ", updatesSkipped:"	+ String(this.updatesSkipped);

	if (Boolean(this.onStart))			returnStr += ", onStart:"			+ String(this.onStart);
	if (Boolean(this.onUpdate))			returnStr += ", onUpdate:"			+ String(this.onUpdate);
	if (Boolean(this.onComplete))		returnStr += ", onComplete:"		+ String(this.onComplete);
	if (Boolean(this.onOverwrite))		returnStr += ", onOverwrite:"		+ String(this.onOverwrite);
	if (Boolean(this.onError))			returnStr += ", onError:"			+ String(this.onError);
	
	if (this.onStartParams)		returnStr += ", onStartParams:"		+ String(this.onStartParams);
	if (this.onUpdateParams)		returnStr += ", onUpdateParams:"	+ String(this.onUpdateParams);
	if (this.onCompleteParams)	returnStr += ", onCompleteParams:"	+ String(this.onCompleteParams);
	if (this.onOverwriteParams)	returnStr += ", onOverwriteParams:" + String(this.onOverwriteParams);

	if (this.onStartScope)		returnStr += ", onStartScope:"		+ String(this.onStartScope);
	if (this.onUpdateScope)		returnStr += ", onUpdateScope:"		+ String(this.onUpdateScope);
	if (this.onCompleteScope)	returnStr += ", onCompleteScope:"	+ String(this.onCompleteScope);
	if (this.onOverwriteScope)	returnStr += ", onOverwriteScope:"	+ String(this.onOverwriteScope);
	if (this.onErrorScope)		returnStr += ", onErrorScope:"		+ String(this.onErrorScope);

	if (this.rounded)			returnStr += ", rounded:"			+ String(this.rounded);
	if (this.isPaused)			returnStr += ", isPaused:"			+ String(this.isPaused);
	if (this.timePaused)			returnStr += ", timePaused:"		+ String(this.timePaused);
	if (this.isCaller)			returnStr += ", isCaller:"			+ String(this.isCaller);
	if (this.count)				returnStr += ", count:"				+ String(this.count);
	if (this.timesCalled)		returnStr += ", timesCalled:"		+ String(this.timesCalled);
	if (this.waitFrames)			returnStr += ", waitFrames:"		+ String(this.waitFrames);
	if (this.hasStarted)			returnStr += ", hasStarted:"		+ String(this.hasStarted);
	
	returnStr += "]\n";
	return returnStr;
}

/**
 * Checks if p_obj "inherits" properties from other objects, as set by the "base" property. Will create a new object, leaving others intact.
 * o_bj.base can be an object or an array of objects. Properties are collected from the first to the last element of the "base" filed, with higher
 * indexes overwritting smaller ones. Does not modify any of the passed objects, but makes a shallow copy of all properties.
 *
 * @param		p_obj		Object				Object that should be tweened: a movieclip, textfield, etc.. OR an array of objects
 * @return					Object				A new object with all properties from the p_obj and p_obj.base.
 */

TweenListObj.makePropertiesChain = function(p_obj) {
	// Is this object inheriting properties from another object?
	var baseObject = p_obj.base;
	if(baseObject){
		// object inherits. Are we inheriting from an object or an array
		var chainedObject = {};
		var chain;
		if (baseObject instanceof Array){
			// Inheritance chain is the base array
			chain = [];
			// make a shallow copy
			for (var k = 0 ; k< baseObject.length; k++) chain.push(baseObject[k]);
		}else{
			// Only one object to be added to the array
			chain = [baseObject];
		}
		// add the final object to the array, so it's properties are added last
		chain.push(p_obj);
		var currChainObj;
		// Loops through each object adding it's property to the final object
		var len = chain.length;
		for(var i = 0; i < len ; i ++){
			if(chain[i]["base"]){
				// deal with recursion: watch the order! "parent" base must be concatenated first!
				currChainObj = AuxFunctions.concatObjects( makePropertiesChain(chain[i]["base"] ), chain[i]);
			}else{
				currChainObj = chain[i] ;
			}
			chainedObject = AuxFunctions.concatObjects(chainedObject, currChainObj );
		}
		if( chainedObject["base"]){
			delete chainedObject["base"];
		}
		return chainedObject;
	}else{
		// No inheritance, just return the object it self
		return p_obj;
	}
}

/**
 * PropertyInfoObj Class
 */

// ==================================================================================================================================
// CONSTRUCTOR function -------------------------------------------------------------------------------------------------------------

/**
 * Initializes the basic PropertyInfoObj.
 *
 * @param	p_valueStart		Number		Starting value of the tweening (null if not started yet)
 * @param	p_valueComplete		Number		Final (desired) property value
 */
function PropertyInfoObj(p_valueStart, p_valueComplete, p_originalValueComplete, p_arrayIndex, p_extra, p_isSpecialProperty, p_modifierFunction, p_modifierParameters) {
	this._construct(p_valueStart, p_valueComplete, p_originalValueComplete, p_arrayIndex, p_extra, p_isSpecialProperty, p_modifierFunction, p_modifierParameters);
}
PropertyInfoObj.prototype._construct = function(p_valueStart, p_valueComplete, p_originalValueComplete, p_arrayIndex, p_extra, p_isSpecialProperty, p_modifierFunction, p_modifierParameters) {
	this.valueStart				// Starting value of the tweening (null if not started yet)
	this.valueComplete			// Final desired value
	this.originalValueComplete	// Final desired value as declared initially
	this.arrayIndex				// Index (if this is an array item)
	this.extra					// Additional parameters, used by some special properties
	this.isSpecialProperty		// Whether or not this is a special property instead of a direct one
	this.hasModifier			// Whether or not it has a modifier function
	this.modifierFunction		// Modifier function, if any
	this.modifierParameters		// Additional array of modifier parameters
	
	this.valueStart				=	p_valueStart;
	this.valueComplete			=	p_valueComplete;
	this.originalValueComplete	=	p_originalValueComplete;
	this.arrayIndex				=	p_arrayIndex;
	this.extra					=	p_extra;
	this.isSpecialProperty		=	p_isSpecialProperty;
	this.hasModifier			=	Boolean(p_modifierFunction);
	this.modifierFunction 		=	p_modifierFunction;
	this.modifierParameters		=	p_modifierParameters;
}
PropertyInfoObj.extend(Object);

// ==================================================================================================================================
// OTHER functions ------------------------------------------------------------------------------------------------------------------

/**
 * Clones this property info and returns the new PropertyInfoObj
 *
 * @param	omitEvents		Boolean			Whether or not events such as onStart (and its parameters) should be omitted
 * @return 					TweenListObj	A copy of this object
 */
PropertyInfoObj.prototype.clone = function() {
	var nProperty = new PropertyInfoObj(valueStart, valueComplete, originalValueComplete, arrayIndex, extra, isSpecialProperty, modifierFunction, modifierParameters);
	return nProperty;
}

/**
 * Returns this object described as a String.
 *
 * @return 					String		The description of this object.
 */
PropertyInfoObj.prototype.toString = function() {
	var returnStr = "\n[PropertyInfoObj ";
	returnStr += "valueStart:" + String(valueStart);
	returnStr += ", ";
	returnStr += "valueComplete:" + String(valueComplete);
	returnStr += ", ";
	returnStr += "originalValueComplete:" + String(originalValueComplete);
	returnStr += ", ";
	returnStr += "arrayIndex:" + String(arrayIndex);
	returnStr += ", ";
	returnStr += "extra:" + String(extra);
	returnStr += ", ";
	returnStr += "isSpecialProperty:" + String(isSpecialProperty);
	returnStr += ", ";
	returnStr += "hasModifier:" + String(hasModifier);
	returnStr += ", ";
	returnStr += "modifierFunction:" + String(modifierFunction);
	returnStr += ", ";
	returnStr += "modifierParameters:" + String(modifierParameters);
	returnStr += "]\n";
	return returnStr;
}

/**
 * Equations Class
 */

/**
 * Equations
 * Main equations for the Tweener class
 *
 * @author		Zeh Fernando, Nate Chatellier
 * @version		1.0.2
 */

/*
Disclaimer for Robert Penner's Easing Equations license:

TERMS OF USE - EASING EQUATIONS

Open source under the BSD License.

Copyright © 2001 Robert Penner
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    * Neither the name of the author nor the names of contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

function Equations() {
	this._construct();
}

/**
 * There's no constructor.
 * @private
 */
Equations.prototype._construct = function() {
	throw new Error("Equations is a static class and should not be instantiated.")
}

/**
 * Registers all the equations to the Tweener class, so they can be found by the direct string parameters.
 * This method doesn't actually have to be used - equations can always be referenced by their full function
 * names. But "registering" them make them available as their shorthand string names.
 */
Equations.init = function() {
	Tweener.registerTransition("easenone",			Equations.easeNone);
	Tweener.registerTransition("linear",			Equations.easeNone);		// mx.transitions.easing.None.easeNone
	
	Tweener.registerTransition("easeinquad",		Equations.easeInQuad);	// mx.transitions.easing.Regular.easeIn
	Tweener.registerTransition("easeoutquad",		Equations.easeOutQuad);	// mx.transitions.easing.Regular.easeOut
	Tweener.registerTransition("easeinoutquad",		Equations.easeInOutQuad);	// mx.transitions.easing.Regular.easeInOut
	Tweener.registerTransition("easeoutinquad",		Equations.easeOutInQuad);
	
	Tweener.registerTransition("easeincubic",		Equations.easeInCubic);
	Tweener.registerTransition("easeoutcubic",		Equations.easeOutCubic);
	Tweener.registerTransition("easeinoutcubic",	Equations.easeInOutCubic);
	Tweener.registerTransition("easeoutincubic",	Equations.easeOutInCubic);
	
	Tweener.registerTransition("easeinquart",		Equations.easeInQuart);
	Tweener.registerTransition("easeoutquart",		Equations.easeOutQuart);
	Tweener.registerTransition("easeinoutquart",	Equations.easeInOutQuart);
	Tweener.registerTransition("easeoutinquart",	Equations.easeOutInQuart);
	
	Tweener.registerTransition("easeinquint",		Equations.easeInQuint);
	Tweener.registerTransition("easeoutquint",		Equations.easeOutQuint);
	Tweener.registerTransition("easeinoutquint",	Equations.easeInOutQuint);
	Tweener.registerTransition("easeoutinquint",	Equations.easeOutInQuint);
	
	Tweener.registerTransition("easeinsine",		Equations.easeInSine);
	Tweener.registerTransition("easeoutsine",		Equations.easeOutSine);
	Tweener.registerTransition("easeinoutsine",		Equations.easeInOutSine);
	Tweener.registerTransition("easeoutinsine",		Equations.easeOutInSine);
	
	Tweener.registerTransition("easeincirc",		Equations.easeInCirc);
	Tweener.registerTransition("easeoutcirc",		Equations.easeOutCirc);
	Tweener.registerTransition("easeinoutcirc",		Equations.easeInOutCirc);
	Tweener.registerTransition("easeoutincirc",		Equations.easeOutInCirc);
	
	Tweener.registerTransition("easeinexpo",		Equations.easeInExpo);		// mx.transitions.easing.Strong.easeIn
	Tweener.registerTransition("easeoutexpo", 		Equations.easeOutExpo);		// mx.transitions.easing.Strong.easeOut
	Tweener.registerTransition("easeinoutexpo", 	Equations.easeInOutExpo);		// mx.transitions.easing.Strong.easeInOut
	Tweener.registerTransition("easeoutinexpo", 	Equations.easeOutInExpo);
	
	Tweener.registerTransition("easeinelastic", 	Equations.easeInElastic);		// mx.transitions.easing.Elastic.easeIn
	Tweener.registerTransition("easeoutelastic", 	Equations.easeOutElastic);	// mx.transitions.easing.Elastic.easeOut
	Tweener.registerTransition("easeinoutelastic", 	Equations.easeInOutElastic);	// mx.transitions.easing.Elastic.easeInOut
	Tweener.registerTransition("easeoutinelastic", 	Equations.easeOutInElastic);
	
	Tweener.registerTransition("easeinback", 		Equations.easeInBack);		// mx.transitions.easing.Back.easeIn
	Tweener.registerTransition("easeoutback", 		Equations.easeOutBack);		// mx.transitions.easing.Back.easeOut
	Tweener.registerTransition("easeinoutback", 	Equations.easeInOutBack);		// mx.transitions.easing.Back.easeInOut
	Tweener.registerTransition("easeoutinback", 	Equations.easeOutInBack);
	
	Tweener.registerTransition("easeinbounce", 		Equations.easeInBounce);		// mx.transitions.easing.Bounce.easeIn
	Tweener.registerTransition("easeoutbounce", 	Equations.easeOutBounce);		// mx.transitions.easing.Bounce.easeOut
	Tweener.registerTransition("easeinoutbounce", 	Equations.easeInOutBounce);	// mx.transitions.easing.Bounce.easeInOut
	Tweener.registerTransition("easeoutinbounce", 	Equations.easeOutInBounce);
}

// ==================================================================================================================================
// TWEENING EQUATIONS functions -----------------------------------------------------------------------------------------------------
// (the original equations are Robert Penner's work as mentioned on the disclaimer)

/**
 * Easing equation function for a simple linear tweening, with no easing.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeNone = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	return c*t/d + b;
}

/**
 * Easing equation function for a quadratic (t^2) easing in: accelerating from zero velocity.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeInQuad = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	return c*(t/=d)*t + b;
}

/**
 * Easing equation function for a quadratic (t^2) easing out: decelerating to zero velocity.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeOutQuad = function(t, b, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	return -c *(t/=d)*(t-2) + b;
}

/**
 * Easing equation function for a quadratic (t^2) easing in/out: acceleration until halfway, then deceleration.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeInOutQuad = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	if ((t/=d/2) < 1) return c/2*t*t + b;
	return -c/2 * ((--t)*(t-2) - 1) + b;
}

/**
 * Easing equation function for a quadratic (t^2) easing out/in: deceleration until halfway, then acceleration.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeOutInQuad = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	if (t < d/2) return easeOutQuad (t*2, b, c/2, d, p_params);
	return easeInQuad((t*2)-d, b+c/2, c/2, d, p_params);
}

/**
 * Easing equation function for a cubic (t^3) easing in: accelerating from zero velocity.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeInCubic = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	return c*(t/=d)*t*t + b;
}

/**
 * Easing equation function for a cubic (t^3) easing out: decelerating from zero velocity.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeOutCubic = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	return c*((t=t/d-1)*t*t + 1) + b;
}

/**
 * Easing equation function for a cubic (t^3) easing in/out: acceleration until halfway, then deceleration.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeInOutCubic = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	if ((t/=d/2) < 1) return c/2*t*t*t + b;
	return c/2*((t-=2)*t*t + 2) + b;
}

/**
 * Easing equation function for a cubic (t^3) easing out/in: deceleration until halfway, then acceleration.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeOutInCubic = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	if (t < d/2) return easeOutCubic (t*2, b, c/2, d, p_params);
	return easeInCubic((t*2)-d, b+c/2, c/2, d, p_params);
}

/**
 * Easing equation function for a quartic (t^4) easing in: accelerating from zero velocity.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeInQuart = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	return c*(t/=d)*t*t*t + b;
}

/**
 * Easing equation function for a quartic (t^4) easing out: decelerating from zero velocity.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeOutQuart = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	return -c * ((t=t/d-1)*t*t*t - 1) + b;
}

/**
 * Easing equation function for a quartic (t^4) easing in/out: acceleration until halfway, then deceleration.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeInOutQuart = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
	return -c/2 * ((t-=2)*t*t*t - 2) + b;
}

/**
 * Easing equation function for a quartic (t^4) easing out/in: deceleration until halfway, then acceleration.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeOutInQuart = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	if (t < d/2) return easeOutQuart (t*2, b, c/2, d, p_params);
	return easeInQuart((t*2)-d, b+c/2, c/2, d, p_params);
}

/**
 * Easing equation function for a quintic (t^5) easing in: accelerating from zero velocity.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeInQuint = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	return c*(t/=d)*t*t*t*t + b;
}

/**
 * Easing equation function for a quintic (t^5) easing out: decelerating from zero velocity.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeOutQuint = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	return c*((t=t/d-1)*t*t*t*t + 1) + b;
}

/**
 * Easing equation function for a quintic (t^5) easing in/out: acceleration until halfway, then deceleration.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeInOutQuint = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
	return c/2*((t-=2)*t*t*t*t + 2) + b;
}

/**
 * Easing equation function for a quintic (t^5) easing out/in: deceleration until halfway, then acceleration.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeOutInQuint = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	if (t < d/2) return easeOutQuint (t*2, b, c/2, d, p_params);
	return easeInQuint((t*2)-d, b+c/2, c/2, d, p_params);
}

/**
 * Easing equation function for a sinusoidal (sin(t)) easing in: accelerating from zero velocity.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeInSine = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
}

/**
 * Easing equation function for a sinusoidal (sin(t)) easing out: decelerating from zero velocity.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeOutSine = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	return c * Math.sin(t/d * (Math.PI/2)) + b;
}

/**
 * Easing equation function for a sinusoidal (sin(t)) easing in/out: acceleration until halfway, then deceleration.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeInOutSine = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
}

/**
 * Easing equation function for a sinusoidal (sin(t)) easing out/in: deceleration until halfway, then acceleration.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeOutInSine = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	if (t < d/2) return easeOutSine (t*2, b, c/2, d, p_params);
	return easeInSine((t*2)-d, b+c/2, c/2, d, p_params);
}

/**
 * Easing equation function for an exponential (2^t) easing in: accelerating from zero velocity.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeInExpo = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b - c * 0.001;
}

/**
 * Easing equation function for an exponential (2^t) easing out: decelerating from zero velocity.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeOutExpo = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	return (t==d) ? b+c : c * 1.001 * (-Math.pow(2, -10 * t/d) + 1) + b;
}

/**
 * Easing equation function for an exponential (2^t) easing in/out: acceleration until halfway, then deceleration.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeInOutExpo = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	if (t==0) return b;
	if (t==d) return b+c;
	if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b - c * 0.0005;
	return c/2 * 1.0005 * (-Math.pow(2, -10 * --t) + 2) + b;
}

/**
 * Easing equation function for an exponential (2^t) easing out/in: deceleration until halfway, then acceleration.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeOutInExpo = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	if (t < d/2) return easeOutExpo (t*2, b, c/2, d, p_params);
	return easeInExpo((t*2)-d, b+c/2, c/2, d, p_params);
}

/**
 * Easing equation function for a circular (sqrt(1-t^2)) easing in: accelerating from zero velocity.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeInCirc = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
}

/**
 * Easing equation function for a circular (sqrt(1-t^2)) easing out: decelerating from zero velocity.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeOutCirc = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
}

/**
 * Easing equation function for a circular (sqrt(1-t^2)) easing in/out: acceleration until halfway, then deceleration.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeInOutCirc = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
	return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
}

/**
 * Easing equation function for a circular (sqrt(1-t^2)) easing out/in: deceleration until halfway, then acceleration.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeOutInCirc = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	if (t < d/2) return easeOutCirc (t*2, b, c/2, d, p_params);
	return easeInCirc((t*2)-d, b+c/2, c/2, d, p_params);
}

/**
 * Easing equation function for an elastic (exponentially decaying sine wave) easing in: accelerating from zero velocity.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @param a		Amplitude.
 * @param p		Period.
 * @return		The correct value.
 */
Equations.easeInElastic = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	if (t==0) return b;
	if ((t/=d)==1) return b+c;
	var p = !Boolean(p_params) || isNaN(p_params.period) ? d*.3 : p_params.period;
	var s;
	var a = !Boolean(p_params) || isNaN(p_params.amplitude) ? 0 : p_params.amplitude;
	if (!Boolean(a) || a < Math.abs(c)) {
		a = c;
		s = p/4;
	} else {
		s = p/(2*Math.PI) * Math.asin (c/a);
	}
	return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
}

/**
 * Easing equation function for an elastic (exponentially decaying sine wave) easing out: decelerating from zero velocity.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @param a		Amplitude.
 * @param p		Period.
 * @return		The correct value.
 */
Equations.easeOutElastic = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	if (t==0) return b;
	if ((t/=d)==1) return b+c;
	var p = !Boolean(p_params) || isNaN(p_params.period) ? d*.3 : p_params.period;
	var s;
	var a = !Boolean(p_params) || isNaN(p_params.amplitude) ? 0 : p_params.amplitude;
	if (!Boolean(a) || a < Math.abs(c)) {
		a = c;
		s = p/4;
	} else {
		s = p/(2*Math.PI) * Math.asin (c/a);
	}
	return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
}

/**
 * Easing equation function for an elastic (exponentially decaying sine wave) easing in/out: acceleration until halfway, then deceleration.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @param a		Amplitude.
 * @param p		Period.
 * @return		The correct value.
 */
Equations.easeInOutElastic = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	if (t==0) return b;
	if ((t/=d/2)==2) return b+c;
	var p = !Boolean(p_params) || isNaN(p_params.period) ? d*(.3*1.5) : p_params.period;
	var s;
	var a = !Boolean(p_params) || isNaN(p_params.amplitude) ? 0 : p_params.amplitude;
	if (!Boolean(a) || a < Math.abs(c)) {
		a = c;
		s = p/4;
	} else {
		s = p/(2*Math.PI) * Math.asin (c/a);
	}
	if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
}

/**
 * Easing equation function for an elastic (exponentially decaying sine wave) easing out/in: deceleration until halfway, then acceleration.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @param a		Amplitude.
 * @param p		Period.
 * @return		The correct value.
 */
Equations.easeOutInElastic = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	if (t < d/2) return easeOutElastic (t*2, b, c/2, d, p_params);
	return easeInElastic((t*2)-d, b+c/2, c/2, d, p_params);
}

/**
 * Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2) easing in: accelerating from zero velocity.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @param s		Overshoot ammount: higher s means greater overshoot (0 produces cubic easing with no overshoot, and the default value of 1.70158 produces an overshoot of 10 percent).
 * @return		The correct value.
 */
Equations.easeInBack = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	var s = !Boolean(p_params) || isNaN(p_params.overshoot) ? 1.70158 : p_params.overshoot;
	return c*(t/=d)*t*((s+1)*t - s) + b;
}

/**
 * Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2) easing out: decelerating from zero velocity.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @param s		Overshoot ammount: higher s means greater overshoot (0 produces cubic easing with no overshoot, and the default value of 1.70158 produces an overshoot of 10 percent).
 * @return		The correct value.
 */
Equations.easeOutBack = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	var s = !Boolean(p_params) || isNaN(p_params.overshoot) ? 1.70158 : p_params.overshoot;
	return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
}

/**
 * Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2) easing in/out: acceleration until halfway, then deceleration.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @param s		Overshoot ammount: higher s means greater overshoot (0 produces cubic easing with no overshoot, and the default value of 1.70158 produces an overshoot of 10 percent).
 * @return		The correct value.
 */
Equations.easeInOutBack = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	var s = !Boolean(p_params) || isNaN(p_params.overshoot) ? 1.70158 : p_params.overshoot;
	if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
	return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
}

/**
 * Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2) easing out/in: deceleration until halfway, then acceleration.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @param s		Overshoot ammount: higher s means greater overshoot (0 produces cubic easing with no overshoot, and the default value of 1.70158 produces an overshoot of 10 percent).
 * @return		The correct value.
 */
Equations.easeOutInBack = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	if (t < d/2) return easeOutBack (t*2, b, c/2, d, p_params);
	return easeInBack((t*2)-d, b+c/2, c/2, d, p_params);
}

/**
 * Easing equation function for a bounce (exponentially decaying parabolic bounce) easing in: accelerating from zero velocity.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeInBounce = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	return c - easeOutBounce (d-t, 0, c, d) + b;
}

/**
 * Easing equation function for a bounce (exponentially decaying parabolic bounce) easing out: decelerating from zero velocity.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeOutBounce = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	if ((t/=d) < (1/2.75)) {
		return c*(7.5625*t*t) + b;
	} else if (t < (2/2.75)) {
		return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
	} else if (t < (2.5/2.75)) {
		return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
	} else {
		return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
	}
}

/**
 * Easing equation function for a bounce (exponentially decaying parabolic bounce) easing in/out: acceleration until halfway, then deceleration.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeInOutBounce = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	if (t < d/2) return easeInBounce (t*2, 0, c, d) * .5 + b;
	else return easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
}

/**
 * Easing equation function for a bounce (exponentially decaying parabolic bounce) easing out/in: deceleration until halfway, then acceleration.
 *
 * @param t		Current time (in frames or seconds).
 * @param b		Starting value.
 * @param c		Change needed in value.
 * @param d		Expected easing duration (in frames or seconds).
 * @return		The correct value.
 */
Equations.easeOutInBounce = function(t, b, c, d, p_params) {
	if(p_params === undefined) p_params = null;
	
	if (t < d/2) return easeOutBounce (t*2, b, c/2, d, p_params);
	return easeInBounce((t*2)-d, b+c/2, c/2, d, p_params);
}


/**
 * Tweener Class
 */
 
Tweener.__tweener_controller__;		// Used to ensure the stage copy is always accessible (garbage collection)	
Tweener._engineExists = false;			// Whether or not the engine is currently running
Tweener._inited = false;				// Whether or not the class has been initiated
Tweener._currentTime;					// The current time. This is generic for all tweenings for a "time grid" based update
Tweener._currentTimeFrame;				// The current frame. Used on frame-based tweenings
Tweener._tweenList;					// List of active tweens
Tweener._timeScale = 1;				// Time scale (default = 1)
Tweener._transitionList;				// List of "pre-fetched" transition functions
Tweener._specialPropertyList;			// List of special properties
Tweener._specialPropertyModifierList;	// List of special property modifiers
Tweener._specialPropertySplitterList;	// List of special property splitters
function Tweener() {
	this._construct();
}
Tweener.prototype._construct = function() {
	throw new Error("Tweener is a static class and should not be instantiated.");
}
Tweener.extend(Object);
Tweener.addTween = function(p_scopes, p_parameters) {
	if(p_scopes === undefined) p_scopes = null;
	if(p_parameters === undefined) p_parameters = null;
	
	if (!Boolean(p_scopes)) return false;

	var i, j, istr;

	var rScopes; // List of objects to tween
	
	if (p_scopes instanceof Array) {
		// The first argument is an array
		rScopes = p_scopes.concat();
	} else {
		// The first argument(s) is(are) object(s)
		rScopes = [p_scopes];
	}

	// make properties chain ("inheritance")
	var p_obj = TweenListObj.makePropertiesChain(p_parameters);

	// Creates the main engine if it isn't active
	if (!Tweener._inited) Tweener.init();
	if (!Tweener._engineExists || !Boolean(Tweener.__tweener_controller__)) Tweener.startEngine(); // Quick fix for Flash not resetting the vars on double ctrl+enter...

	// Creates a "safer", more strict tweening object
	var rTime = (isNaN(p_obj.time) ? 0 : p_obj.time); // Real time
	var rDelay = (isNaN(p_obj.delay) ? 0 : p_obj.delay); // Real delay

	// Creates the property list; everything that isn't a hardcoded variable
	var rProperties = new Array(); // Object containing a list of PropertyInfoObj instances
	var restrictedWords = {time:true, delay:true, useFrames:true, skipUpdates:true, transition:true, transitionParams:true, onStart:true, onUpdate:true, onComplete:true, onOverwrite:true, onError:true, rounded:true, onStartParams:true, onUpdateParams:true, onCompleteParams:true, onOverwriteParams:true, onStartScope:true, onUpdateScope:true, onCompleteScope:true, onOverwriteScope:true, onErrorScope:true};
	var modifiedProperties = new Object();
	for (istr in p_obj) {
		if (!restrictedWords[istr]) {
			// It's an additional pair, so adds
			if (Tweener._specialPropertySplitterList[istr]) {
				// Special property splitter
				var splitProperties = Tweener._specialPropertySplitterList[istr].splitValues(p_obj[istr], Tweener._specialPropertySplitterList[istr].parameters);
				for (i = 0; i < splitProperties.length; i++) {
					if (Tweener._specialPropertySplitterList[splitProperties[i].name]) {
						var splitProperties2 = Tweener._specialPropertySplitterList[splitProperties[i].name].splitValues(splitProperties[i].value, Tweener._specialPropertySplitterList[splitProperties[i].name].parameters);
						for (j = 0; j < splitProperties2.length; j++) {
							rProperties[splitProperties2[j].name] = {valueStart:undefined, valueComplete:splitProperties2[j].value, arrayIndex:splitProperties2[j].arrayIndex, isSpecialProperty:false};
						}
					} else {
						rProperties[splitProperties[i].name] = {valueStart:undefined, valueComplete:splitProperties[i].value, arrayIndex:splitProperties[i].arrayIndex, isSpecialProperty:false};
					}
				}
			} else if (Tweener._specialPropertyModifierList[istr] != undefined) {
				// Special property modifier
				var tempModifiedProperties = Tweener._specialPropertyModifierList[istr].modifyValues(p_obj[istr]);
				for (i = 0; i < tempModifiedProperties.length; i++) {
					modifiedProperties[tempModifiedProperties[i].name] = {modifierParameters:tempModifiedProperties[i].parameters, modifierFunction:Tweener._specialPropertyModifierList[istr].getValue};
				}
			} else {
				// Regular property or special property, just add the property normally
				rProperties[istr] = {valueStart:undefined, valueComplete:p_obj[istr]};
			}
		}
	}

	// Verifies whether the properties exist or not, for warning messages
	for (istr in rProperties) {
		if (Tweener._specialPropertyList[istr] != undefined) {
			rProperties[istr].isSpecialProperty = true;
		} else {
			if (rScopes[0][istr] == undefined) {
				Tweener.printError("The property '" + istr + "' doesn't seem to be a normal object property of " + String(rScopes[0]) + " or a registered special property.");
			}
		}
	}

	// Adds the modifiers to the list of properties
	for (istr in modifiedProperties) {
		if (rProperties[istr] != undefined) {
			rProperties[istr].modifierParameters = modifiedProperties[istr].modifierParameters;
			rProperties[istr].modifierFunction = modifiedProperties[istr].modifierFunction;
		}
		
	}

	var rTransition; // Real transition

	if (typeof p_obj.transition == "string") {
		// String parameter, transition names
		var trans = p_obj.transition.toLowerCase();
		rTransition = Tweener._transitionList[trans];
	} else {
		// Proper transition function
		rTransition = p_obj.transition;
	}
	if (!Boolean(rTransition)) rTransition = Tweener._transitionList["easeoutexpo"];

	var nProperties;
	var nTween;
	var myT;

	for (i = 0; i < rScopes.length; i++) {
		// Makes a copy of the properties
		nProperties = new Object();
		for (istr in rProperties) {
			nProperties[istr] = new PropertyInfoObj(rProperties[istr].valueStart, rProperties[istr].valueComplete, rProperties[istr].valueComplete, rProperties[istr].arrayIndex, {}, rProperties[istr].isSpecialProperty, rProperties[istr].modifierFunction, rProperties[istr].modifierParameters);
		}
		
		if (p_obj.useFrames == true) {
			nTween = new TweenListObj(
				/* scope			*/	rScopes[i],
				/* timeStart		*/	Tweener._currentTimeFrame + (rDelay / Tweener._timeScale),
				/* timeComplete		*/	Tweener._currentTimeFrame + ((rDelay + rTime) / Tweener._timeScale),
				/* useFrames		*/	true,
				/* transition		*/	rTransition,
										p_obj.transitionParams
			);
		} else {
			nTween = new TweenListObj(
				/* scope			*/	rScopes[i],
				/* timeStart		*/	Tweener._currentTime + ((rDelay * 1000) / Tweener._timeScale),
				/* timeComplete		*/	Tweener._currentTime + (((rDelay * 1000) + (rTime * 1000)) / Tweener._timeScale),
				/* useFrames		*/	false,
				/* transition		*/	rTransition,
										p_obj.transitionParams
			);
		}

		nTween.properties			=	nProperties;
		nTween.onStart				=	p_obj.onStart;
		nTween.onUpdate				=	p_obj.onUpdate;
		nTween.onComplete			=	p_obj.onComplete;
		nTween.onOverwrite			=	p_obj.onOverwrite;
		nTween.onError			    =	p_obj.onError;
		nTween.onStartParams		=	p_obj.onStartParams;
		nTween.onUpdateParams		=	p_obj.onUpdateParams;
		nTween.onCompleteParams		=	p_obj.onCompleteParams;
		nTween.onOverwriteParams	=	p_obj.onOverwriteParams;
		nTween.onStartScope			=	p_obj.onStartScope;
		nTween.onUpdateScope		=	p_obj.onUpdateScope;
		nTween.onCompleteScope		=	p_obj.onCompleteScope;
		nTween.onOverwriteScope		=	p_obj.onOverwriteScope;
		nTween.onErrorScope			=	p_obj.onErrorScope;
		nTween.rounded				=	p_obj.rounded;
		nTween.skipUpdates			=	p_obj.skipUpdates;

		// Remove other tweenings that occur at the same time
		Tweener.removeTweensByTime(nTween.scope, nTween.properties, nTween.timeStart, nTween.timeComplete);

		// And finally adds it to the list
		Tweener._tweenList.push(nTween);

		// Immediate update and removal if it's an immediate tween -- if not deleted, it executes at the end of this frame execution
		if (rTime == 0 && rDelay == 0) {
			myT = Tweener._tweenList.length-1;
			Tweener.updateTweenByIndex(myT);
			Tweener.removeTweenByIndex(myT);
		}
	}

	return true;
}

// A "caller" is like this: [          |     |  | ||] got it? :)
// this function is crap - should be fixed later/extend on addTween()

/**
 * Adds a new caller tweening.
 *
 * @param		(first-n param)		Object that should be tweened: a movieclip, textfield, etc.. OR an array of objects
 * @param		(last param)		Object containing the specified parameters in any order, as well as the properties that should be tweened and their values
 * @param		.time				Number				Time in seconds or frames for the tweening to take (defaults 2)
 * @param		.delay				Number				Delay time (defaults 0)
 * @param		.count				Number				Number of times this caller should be called
 * @param		.transition			String/Function		Type of transition equation... (defaults to "easeoutexpo")
 * @param		.onStart			Function			Event called when tween starts
 * @param		.onUpdate			Function			Event called when tween updates
 * @param		.onComplete			Function			Event called when tween ends
 * @param		.waitFrames			Boolean				Whether to wait (or not) one frame for each call
 * @return							<code>true</code> if the tween was successfully added, <code>false</code> if otherwise.
 */
Tweener.addCaller = function(p_scopes, p_parameters) {
	if(p_scopes === undefined) p_scopes = null;
	if(p_parameters === undefined) p_parameters = null;
	
	if (!Boolean(p_scopes)) return false;

	var i;

	var rScopes; // List of objects to tween
	if (p_scopes instanceof Array) {
		// The first argument is an array
		rScopes = p_scopes.concat();
	} else {
		// The first argument(s) is(are) object(s)
		rScopes = [p_scopes];
	}

	var p_obj = p_parameters;

	// Creates the main engine if it isn't active
	if (!Tweener._inited) init();
	if (!Tweener._engineExists || !Boolean(Tweener.__tweener_controller__)) startEngine(); // Quick fix for Flash not resetting the vars on double ctrl+enter...

	// Creates a "safer", more strict tweening object
	var rTime = (isNaN(p_obj.time) ? 0 : p_obj.time); // Real time
	var rDelay = (isNaN(p_obj.delay) ? 0 : p_obj.delay); // Real delay

	var rTransition; // Real transition
	if (typeof p_obj.transition == "string") {
		// String parameter, transition names
		var trans = p_obj.transition.toLowerCase();
		rTransition = Tweener._transitionList[trans];
	} else {
		// Proper transition function
		rTransition = p_obj.transition;
	}
	if (!Boolean(rTransition)) rTransition = Tweener._transitionList["easeoutexpo"];

	var nTween;
	var myT;
	for (i = 0; i < rScopes.length; i++) {
		
		if (p_obj.useFrames == true) {
			nTween = new TweenListObj(
				/* scope			*/	rScopes[i],
				/* timeStart		*/	Tweener._currentTimeFrame + (rDelay / Tweener._timeScale),
				/* timeComplete		*/	Tweener._currentTimeFrame + ((rDelay + rTime) / Tweener._timeScale),
				/* useFrames		*/	true,
				/* transition		*/	rTransition,
										p_obj.transitionParams
			);
		} else {
			nTween = new TweenListObj(
				/* scope			*/	rScopes[i],
				/* timeStart		*/	Tweener._currentTime + ((rDelay * 1000) / Tweener._timeScale),
				/* timeComplete		*/	Tweener._currentTime + (((rDelay * 1000) + (rTime * 1000)) / Tweener._timeScale),
				/* useFrames		*/	false,
				/* transition		*/	rTransition,
										p_obj.transitionParams
			);
		}

		nTween.properties			=	null;
		nTween.onStart				=	p_obj.onStart;
		nTween.onUpdate				=	p_obj.onUpdate;
		nTween.onComplete			=	p_obj.onComplete;
		nTween.onOverwrite			=	p_obj.onOverwrite;
		nTween.onStartParams		=	p_obj.onStartParams;
		nTween.onUpdateParams		=	p_obj.onUpdateParams;
		nTween.onCompleteParams		=	p_obj.onCompleteParams;
		nTween.onOverwriteParams	=	p_obj.onOverwriteParams;
		nTween.onStartScope			=	p_obj.onStartScope;
		nTween.onUpdateScope		=	p_obj.onUpdateScope;
		nTween.onCompleteScope		=	p_obj.onCompleteScope;
		nTween.onOverwriteScope		=	p_obj.onOverwriteScope;
		nTween.onErrorScope			=	p_obj.onErrorScope;
		nTween.isCaller				=	true;
		nTween.count				=	p_obj.count;
		nTween.waitFrames			=	p_obj.waitFrames;

		// And finally adds it to the list
		Tweener._tweenList.push(nTween);

		// Immediate update and removal if it's an immediate tween -- if not deleted, it executes at the end of this frame execution
		if (rTime == 0 && rDelay == 0) {
			myT = Tweener._tweenList.length-1;
			Tweener.updateTweenByIndex(myT);
			Tweener.removeTweenByIndex(myT);
		}
	}

	return true;
}

/**
 * Remove an specified tweening of a specified object the tweening list, if it conflicts with the given time.
 *
 * @param		p_scope				Object						List of objects affected
 * @param		p_properties		Object 						List of properties affected (PropertyInfoObj instances)
 * @param		p_timeStart			Number						Time when the new tween starts
 * @param		p_timeComplete		Number						Time when the new tween ends
 * @return							Boolean						Whether or not it actually deleted something
 */
Tweener.removeTweensByTime = function(p_scope, p_properties, p_timeStart, p_timeComplete) {
	var removed = false;
	var removedLocally;

	var i;
	var tl = Tweener._tweenList.length;
	var pName;

	for (i = 0; i < tl; i++) {
		if (Boolean(Tweener._tweenList[i]) && p_scope == Tweener._tweenList[i].scope) {
			// Same object...
			if (p_timeComplete > Tweener._tweenList[i].timeStart && p_timeStart < Tweener._tweenList[i].timeComplete) {
				// New time should override the old one...
				removedLocally = false;
				for (pName in Tweener._tweenList[i].properties) {
					if (Boolean(p_properties[pName])) {
						// Same object, same property
						// Finally, remove this old tweening and use the new one
						if (Boolean(Tweener._tweenList[i].onOverwrite)) {
							var eventScope = Boolean(Tweener._tweenList[i].onOverwriteScope) ? Tweener._tweenList[i].onOverwriteScope : Tweener._tweenList[i].scope;
							try {
								Tweener._tweenList[i].onOverwrite.apply(eventScope, Tweener._tweenList[i].onOverwriteParams);
							} catch(e) {
								Tweener.handleError(Tweener._tweenList[i], e, "onOverwrite");
							}
						}
						Tweener._tweenList[i].properties[pName] = undefined;
						delete Tweener._tweenList[i].properties[pName];
						removedLocally = true;
						removed = true;
					}
				}
				if (removedLocally) {
					// Verify if this can be deleted
					if (AuxFunctions.getObjectLength(Tweener._tweenList[i].properties) == 0) Tweener.removeTweenByIndex(i);
				}
			}
		}
	}

	return removed;
}

/**
 * Remove tweenings from a given object from the tweening list.
 *
 * @param		p_tween				Object		Object that must have its tweens removed
 * @param		(2nd-last params)	Object		Property(ies) that must be removed
 * @return							Boolean		Whether or not it successfully removed this tweening
 */
Tweener.removeTweens = function() {
	var args = arguments;
	var p_scope = arguments.unshift();
	
	// Create the property list
	var properties = new Array();
	var i;
	for (i = 0; i < args.length; i++) {
		if (typeof(args[i]) == "string" && !AuxFunctions.isInArray(args[i], properties)) properties.push(args[i]);
	}
	// Call the affect function on the specified properties
	return Tweener.affectTweens(Tweener.removeTweenByIndex, p_scope, properties);
}


/**
 * Remove all tweenings from the engine.
 *
 * @return					<code>true</code> if it successfully removed any tweening, <code>false</code> if otherwise.
 */
Tweener.removeAllTweens = function() {
	if (!Boolean(Tweener._tweenList)) return false;
	var removed = false;
	var i;
	for (i = 0; i<Tweener._tweenList.length; i++) {
		Tweener.removeTweenByIndex(i);
		removed = true;
	}
	return removed;
}

/**
 * Pause tweenings for a given object.
 *
 * @param		p_scope				Object that must have its tweens paused
 * @param		(2nd-last params)	Property(ies) that must be paused
 * @return					<code>true</code> if it successfully paused any tweening, <code>false</code> if otherwise.
 */
Tweener.pauseTweens = function() {
	var args = arguments;
	var p_scope = args.unshift();
	
	// Create the property list
	var properties = new Array();
	var i;
	for (i = 0; i < args.length; i++) {
		if (typeof(args[i]) == "string" && !AuxFunctions.isInArray(args[i], properties)) properties.push(args[i]);
	}
	// Call the affect function on the specified properties
	return Tweener.affectTweens(Tweener.pauseTweenByIndex, p_scope, properties);
}

/**
 * Pause all tweenings on the engine.
 *
 * @return					<code>true</code> if it successfully paused any tweening, <code>false</code> if otherwise.
 * @see #Tweener.resumeAllTweens()
 */
Tweener.pauseAllTweens = function() {
	if (!Boolean(Tweener._tweenList)) return false;
	var paused = false;
	var i;
	for (i = 0; i < Tweener._tweenList.length; i++) {
		Tweener.pauseTweenByIndex(i);
		paused = true;
	}
	return paused;
}

/**
 * Resume tweenings from a given object.
 *
 * @param		p_scope				Object		Object that must have its tweens resumed
 * @param		(2nd-last params)	Object		Property(ies) that must be resumed
 * @return							Boolean		Whether or not it successfully resumed something
 */
Tweener.resumeTweens = function() {
	var args = arguments;
	var p_scope = args.unshift();
	
	// Create the property list
	var properties = new Array();
	var i;
	for (i = 0; i < args.length; i++) {
		if (typeof(args[i]) == "string" && !AuxFunctions.isInArray(args[i], properties)) properties.push(args[i]);
	}
	// Call the affect function on the specified properties
	return Tweener.affectTweens(Tweener.resumeTweenByIndex, p_scope, properties);
}

/**
 * Resume all tweenings on the engine.
 *
 * @return <code>true</code> if it successfully resumed any tweening, <code>false</code> if otherwise.
 * @see #pauseAllTweens()
 */
Tweener.resumeAllTweens = function() {
	if (!Boolean(Tweener._tweenList)) return false;
	var resumed = false;
	var i;
	for (i = 0; i < Tweener._tweenList.length; i++) {
		Tweener.resumeTweenByIndex(i);
		resumed = true;
	}
	return resumed;
}

/**
 * Do some generic action on specific tweenings (pause, resume, remove, more?)
 *
 * @param		p_function			Function	Function to run on the tweenings that match
 * @param		p_scope				Object		Object that must have its tweens affected by the function
 * @param		p_properties		Array		Array of strings that must be affected
 * @return							Boolean		Whether or not it successfully affected something
 */
Tweener.affectTweens = function(p_affectFunction, p_scope, p_properties) {
	var affected = false;
	var i;

	if (!Boolean(Tweener._tweenList)) return false;

	for (i = 0; i < Tweener._tweenList.length; i++) {
		if (Tweener._tweenList[i] && Tweener._tweenList[i].scope == p_scope) {
			if (p_properties.length == 0) {
				// Can affect everything
				p_affectFunction(i);
				affected = true;
			} else {
				// Must check whether this tween must have specific properties affected
				var affectedProperties = new Array();
				var j;
				for (j = 0; j < p_properties.length; j++) {
					if (Boolean(Tweener._tweenList[i].properties[p_properties[j]])) {
						affectedProperties.push(p_properties[j]);
					}
				}
				if (affectedProperties.length > 0) {
					// This tween has some properties that need to be affected
					var objectProperties = AuxFunctions.getObjectLength(Tweener._tweenList[i].properties);
					if (objectProperties == affectedProperties.length) {
						// The list of properties is the same as all properties, so affect it all
						p_affectFunction(i);
						affected = true;
					} else {
						// The properties are mixed, so split the tween and affect only certain specific properties
						var slicedTweenIndex = Tweener.splitTweens(i, affectedProperties);
						p_affectFunction(slicedTweenIndex);
						affected = true;
					}
				}
			}
		}
	}
	return affected;
}

/**
 * Splits a tweening in two
 *
 * @param		p_tween				Number		Object that must have its tweens split
 * @param		p_properties		Array		Array of strings containing the list of properties that must be separated
 * @return							Number		The index number of the new tween
 */
Tweener.splitTweens = function(p_tween, p_properties) {
	// First, duplicates
	var originalTween = Tweener._tweenList[p_tween];
	var newTween = originalTween.clone(false);

	// Now, removes tweenings where needed
	var i;
	var pName;

	// Removes the specified properties from the old one
	for (i = 0; i < p_properties.length; i++) {
		pName = p_properties[i];
		if (Boolean(originalTween.properties[pName])) {
			originalTween.properties[pName] = undefined;
			delete originalTween.properties[pName];
		}
	}

	// Removes the unspecified properties from the new one
	var found;
	for (pName in newTween.properties) {
		found = false;
		for (i = 0; i < p_properties.length; i++) {
			if (p_properties[i] == pName) {
				found = true;
				break;
			}
		}
		if (!found) {
			newTween.properties[pName] = undefined;
			delete newTween.properties[pName];
		}
	}

	// If there are empty property lists, a cleanup is done on the next Tweener.updateTweens() cycle
	Tweener._tweenList.push(newTween);
	return (Tweener._tweenList.length - 1);
	
}

// ==================================================================================================================================
// ENGINE functions -----------------------------------------------------------------------------------------------------------------

/**
 * Updates all existing tweenings.
 *
 * @return							Boolean		FALSE if no update was made because there's no tweening (even delayed ones)
 */
Tweener.updateTweens = function() {
	if (Tweener._tweenList.length == 0) return false;
	var i;
	for (i = 0; i < Tweener._tweenList.length; i++) {
		// Looping throught each Tweening and updating the values accordingly
		if (Tweener._tweenList[i] == undefined || !Tweener._tweenList[i].isPaused) {
			if (!Tweener.updateTweenByIndex(i)) Tweener.removeTweenByIndex(i);
			if (Tweener._tweenList[i] == null) {
				Tweener.removeTweenByIndex(i, true);
				i--;
			}
		}
	}

	return true;
}

/**
 * Remove a specific tweening from the tweening list.
 *
 * @param		p_tween				Number		Index of the tween to be removed on the tweenings list
 * @return							Boolean		Whether or not it successfully removed this tweening
 */
Tweener.removeTweenByIndex = function(i, p_finalRemoval) {
	if(p_finalRemoval === undefined) p_finalRemoval = false;
	
	Tweener._tweenList[i] = null;
	if (p_finalRemoval) Tweener._tweenList.splice(i, 1);
	return true;
}

/**
 * Pauses a specific tween.
 *
 * @param		p_tween				Number		Index of the tween to be paused
 * @return							Boolean		Whether or not it successfully paused this tweening
 */
Tweener.pauseTweenByIndex = function(p_tween) {
	var tTweening = Tweener._tweenList[p_tween];	// Shortcut to this tweening
	if (tTweening == null || tTweening.isPaused) return false;
	tTweening.timePaused = Tweener.getCurrentTweeningTime(tTweening);
	tTweening.isPaused = true;

	return true;
}

/**
 * Resumes a specific tween.
 *
 * @param		p_tween				Number		Index of the tween to be resumed
 * @return							Boolean		Whether or not it successfully resumed this tweening
 */
Tweener.resumeTweenByIndex = function(p_tween) {
	var tTweening = Tweener._tweenList[p_tween];	// Shortcut to this tweening
	if (tTweening == null || !tTweening.isPaused) return false;
	var cTime = Tweener.getCurrentTweeningTime(tTweening);
	tTweening.timeStart += cTime - tTweening.timePaused;
	tTweening.timeComplete += cTime - tTweening.timePaused;
	tTweening.timePaused = undefined;
	tTweening.isPaused = false;

	return true;
}

/**
 * Updates a specific tween.
 *
 * @param		i					Number		Index (from the tween list) of the tween that should be updated
 * @return							Boolean		FALSE if it's already finished and should be deleted, TRUE if otherwise
 */
Tweener.updateTweenByIndex = function(i) {
	var tTweening = Tweener._tweenList[i];	// Shortcut to this tweening

	if (tTweening == null || !Boolean(tTweening.scope)) return false;

	var isOver = false;		// Whether or not it's over the update time
	var mustUpdate;			// Whether or not it should be updated (skipped if false)

	var nv					// New value for each property

	var t;					// current time (frames, seconds)
	var b;					// beginning value
	var c;					// change in value
	var d; 					// duration (frames, seconds)

	var pName;				// Property name, used in loops
	var eventScope;			// Event scope, used to call functions

	// Shortcut stuff for speed
	var tScope;				// Current scope
	var cTime = Tweener.getCurrentTweeningTime(tTweening);
	var tProperty;			// Property being checked

	if (cTime >= tTweening.timeStart) {
		// Can already start

		tScope = tTweening.scope;

		if (tTweening.isCaller) {
			// It's a 'caller' tween
			do {
				t = ((tTweening.timeComplete - tTweening.timeStart)/tTweening.count) * (tTweening.timesCalled+1);
				b = tTweening.timeStart;
				c = tTweening.timeComplete - tTweening.timeStart;
				d = tTweening.timeComplete - tTweening.timeStart;
				nv = tTweening.transition(t, b, c, d);

				if (cTime >= nv) {
					if (Boolean(tTweening.onUpdate)) {
						eventScope = Boolean(tTweening.onUpdateScope) ? tTweening.onUpdateScope : tScope;
						try {
							tTweening.onUpdate.apply(eventScope, tTweening.onUpdateParams);
						} catch(e) {
							Tweener.handleError(tTweening, e, "onUpdate");
						}
					}

					tTweening.timesCalled++;
					if (tTweening.timesCalled >= tTweening.count) {
						isOver = true;
						break;
					}
					if (tTweening.waitFrames) break;
				}

			} while (cTime >= nv);
		} else {
			// It's a normal transition tween

			mustUpdate = tTweening.skipUpdates < 1 || !tTweening.skipUpdates || tTweening.updatesSkipped >= tTweening.skipUpdates;

			if (cTime >= tTweening.timeComplete) {
				isOver = true;
				mustUpdate = true;
			}

			if (!tTweening.hasStarted) {
				// First update, read all default values (for proper filter tweening)
				if (Boolean(tTweening.onStart)) {
					eventScope = Boolean(tTweening.onStartScope) ? tTweening.onStartScope : tScope;
					try {
						tTweening.onStart.apply(eventScope, tTweening.onStartParams);
					} catch(e) {
						Tweener.handleError(tTweening, e, "onStart");
					}
				}
				var pv;
				for (pName in tTweening.properties) {
					if (tTweening.properties[pName].isSpecialProperty) {
						// It's a special property, tunnel via the special property function
						if (Boolean(Tweener._specialPropertyList[pName].preProcess)) {
							tTweening.properties[pName].valueComplete = Tweener._specialPropertyList[pName].preProcess(tScope, Tweener._specialPropertyList[pName].parameters, tTweening.properties[pName].originalValueComplete, tTweening.properties[pName].extra);
						}
						pv = Tweener._specialPropertyList[pName].getValue(tScope, Tweener._specialPropertyList[pName].parameters, tTweening.properties[pName].extra);
					} else {
						// Directly read property
						pv = tScope[pName];
					}
					tTweening.properties[pName].valueStart = isNaN(pv) ? tTweening.properties[pName].valueComplete : pv;
				}
				mustUpdate = true;
				tTweening.hasStarted = true;
			}

			if (mustUpdate) {
				for (pName in tTweening.properties) {
					tProperty = tTweening.properties[pName];

					if (isOver) {
						// Tweening time has finished, just set it to the final value
						nv = tProperty.valueComplete;
					} else {
						if (tProperty.hasModifier) {
							// Modified
							t = cTime - tTweening.timeStart;
							d = tTweening.timeComplete - tTweening.timeStart;
							nv = tTweening.transition(t, 0, 1, d, tTweening.transitionParams);
							nv = tProperty.modifierFunction(tProperty.valueStart, tProperty.valueComplete, nv, tProperty.modifierParameters);
						} else {
							// Normal update
							t = cTime - tTweening.timeStart;
							b = tProperty.valueStart;
							c = tProperty.valueComplete - tProperty.valueStart;
							d = tTweening.timeComplete - tTweening.timeStart;
							nv = tTweening.transition(t, b, c, d, tTweening.transitionParams);
						}
					}

					if (tTweening.rounded) nv = Math.round(nv);
					if (tProperty.isSpecialProperty) {
						// It's a special property, tunnel via the special property method
						Tweener._specialPropertyList[pName].setValue(tScope, nv, Tweener._specialPropertyList[pName].parameters, tTweening.properties[pName].extra);
					} else {
						// Directly set property
						tScope[pName] = nv;
					}
				}

				tTweening.updatesSkipped = 0;

				if (Boolean(tTweening.onUpdate)) {
					eventScope = Boolean(tTweening.onUpdateScope) ? tTweening.onUpdateScope : tScope;
					try {
						tTweening.onUpdate.apply(eventScope, tTweening.onUpdateParams);
					} catch(e) {
						Tweener.handleError(tTweening, e, "onUpdate");
					}
				}
			} else {
				tTweening.updatesSkipped++;
			}
		}

		if (isOver && Boolean(tTweening.onComplete)) {
			eventScope = Boolean(tTweening.onCompleteScope) ? tTweening.onCompleteScope : tScope;
			try {
				tTweening.onComplete.apply(eventScope, tTweening.onCompleteParams);
			} catch(e) {
				Tweener.handleError(tTweening, e, "onComplete");
			}
		}

		return (!isOver);
	}

	// On delay, hasn't started, so returns true
	return (true);

}

/**
 * Initiates the Tweener--should only be ran once.
 */
Tweener.init = function(rest) {
	var rest = arguments;
	
	Tweener._inited = true;

	// Registers all default equations
	Tweener._transitionList = new Object();
	Equations.init();

	// Registers all default special properties
	Tweener._specialPropertyList = new Object();
	Tweener._specialPropertyModifierList = new Object();
	Tweener._specialPropertySplitterList = new Object();
}

/**
 * Adds a new function to the available transition list "shortcuts".
 *
 * @param		p_name				String		Shorthand transition name
 * @param		p_function			Function	The proper equation function
 */
Tweener.registerTransition = function(p_name, p_function) {
	if (!Tweener._inited) init();
	Tweener._transitionList[p_name] = p_function;
}

/**
 * Adds a new special property to the available special property list.
 *
 * @param		p_name				Name of the "special" property.
 * @param		p_getFunction		Function that gets the value.
 * @param		p_setFunction		Function that sets the value.
 */
Tweener.registerSpecialProperty = function(p_name, p_getFunction, p_setFunction, p_parameters, p_preProcessFunction) {
	if(p_parameters === undefined) p_parameters = null;
	if(p_preProcessFunction === undefined) p_preProcessFunction = null;
	
	if (!Tweener._inited) init();
	var sp = new SpecialProperty(p_getFunction, p_setFunction, p_parameters, p_preProcessFunction);
	Tweener._specialPropertyList[p_name] = sp;
}

/**
 * Adds a new special property modifier to the available modifier list.
 *
 * @param		p_name				Name of the "special" property modifier.
 * @param		p_modifyFunction	Function that modifies the value.
 * @param		p_getFunction		Function that gets the value.
 */
Tweener.registerSpecialPropertyModifier = function(p_name, p_modifyFunction, p_getFunction) {
	if (!Tweener._inited) init();
	var spm = new SpecialPropertyModifier(p_modifyFunction, p_getFunction);
	Tweener._specialPropertyModifierList[p_name] = spm;
}

/**
 * Adds a new special property splitter to the available splitter list.
 *
 * @param		p_name				Name of the "special" property splitter.
 * @param		p_splitFunction		Function that splits the value.
 */
Tweener.registerSpecialPropertySplitter = function(p_name, p_splitFunction, p_parameters) {
	if(p_preProcessFunction === undefined) p_preProcessFunction = null;
	
	if (!Tweener._inited) init();
	var sps = new SpecialPropertySplitter(p_splitFunction, p_parameters);
	Tweener._specialPropertySplitterList[p_name] = sps;
}

/**
 * Starts the Tweener class engine. It is supposed to be running every time a tween exists.
 */
Tweener.startEngine = function() {
	Tweener._engineExists = true;
	Tweener._tweenList = new Array();
	
	// no MovieClip class in flanvas yet, using Sprite
	//Tweener.__tweener_controller__ = new MovieClip();
	Tweener.__tweener_controller__ = new Sprite();
	Tweener.__tweener_controller__.addEventListener(Event.ENTER_FRAME, Tweener.onEnterFrame);
	
	Tweener._currentTimeFrame = 0;
	Tweener.updateTime();
}

/**
 * Stops the Tweener class engine.
 */
Tweener.stopEngine = function() {
	Tweener._engineExists = false;
	Tweener._tweenList = null;
	Tweener._currentTime = 0;
	Tweener._currentTimeFrame = 0;
	Tweener.__tweener_controller__.removeEventListener(Event.ENTER_FRAME, Tweener.onEnterFrame);
	Tweener.__tweener_controller__ = null;
}

/**
 * Updates the time to enforce time grid-based updates.
 */
Tweener.updateTime = function() {
	Tweener._currentTime = Utils.getTimer();
}

/**
 * Updates the current frame count
 */
Tweener.updateFrame = function() {
	Tweener._currentTimeFrame++;
}

/**
 * Ran once every frame. It's the main engine; updates all existing tweenings.
 */
Tweener.onEnterFrame = function(e) {
	Tweener.updateTime();
	Tweener.updateFrame();
	var hasUpdated = false;
	hasUpdated = Tweener.updateTweens();
	if (!hasUpdated) Tweener.stopEngine();	// There's no tweening to update or wait, so it's better to stop the engine
}

/**
 * Sets the new time scale.
 *
 * @param		p_time				Number		New time scale (0.5 = slow, 1 = normal, 2 = 2x fast forward, etc)
 */
Tweener.setTimeScale = function(p_time) {
	var i;
	var cTime;

	if (isNaN(p_time)) p_time = 1;
	if (p_time < 0.00001) p_time = 0.00001;
	if (p_time != Tweener._timeScale) {
		if (Tweener._tweenList != null) {
			// Multiplies all existing tween times accordingly
			for (i = 0; i<Tweener._tweenList.length; i++) {
				cTime = Tweener.getCurrentTweeningTime(Tweener._tweenList[i]);
				Tweener._tweenList[i].timeStart = cTime - ((cTime - Tweener._tweenList[i].timeStart) * Tweener._timeScale / p_time);
				Tweener._tweenList[i].timeComplete = cTime - ((cTime - Tweener._tweenList[i].timeComplete) * Tweener._timeScale / p_time);
				if (Tweener._tweenList[i].timePaused != undefined) Tweener._tweenList[i].timePaused = cTime - ((cTime - Tweener._tweenList[i].timePaused) * Tweener._timeScale / p_time);
			}
		}
		// Sets the new timescale value (for new tweenings)
		Tweener._timeScale = p_time;
	}
}


// ==================================================================================================================================
// AUXILIARY functions --------------------------------------------------------------------------------------------------------------

/**
 * Finds whether or not an object has any tweening.
 *
 * @param		p_scope		Target object.
 * @return					<code>true</code> if there's a tweening occuring on this object (paused, delayed, or active), <code>false</code> if otherwise.
 */
Tweener.isTweening = function(p_scope) {
	if (!Boolean(Tweener._tweenList)) return false;
	var i;

	for (i = 0; i<Tweener._tweenList.length; i++) {
		if (Boolean(Tweener._tweenList[i]) && Tweener._tweenList[i].scope == p_scope) {
			return true;
		}
	}
	return false;
}

/**
 * Returns an array containing a list of the properties being tweened for this object.
 *
 * @param		p_scope		Target object.
 * @return					Total number of properties being tweened (including delayed or paused tweens).
 */
Tweener.getTweens = function(p_scope) {
	if (!Boolean(Tweener._tweenList)) return [];
	var i;
	var pName;
	var tList = new Array();

	for (i = 0; i<Tweener._tweenList.length; i++) {
		if (Boolean(Tweener._tweenList[i]) && Tweener._tweenList[i].scope == p_scope) {
			for (pName in Tweener._tweenList[i].properties) tList.push(pName);
		}
	}
	return tList;
}

/**
 * Returns the number of properties being tweened for a given object.
 *
 * @param		p_scope		Target object.
 * @return					Total number of properties being tweened (including delayed or paused tweens).
 */
Tweener.getTweenCount = function(p_scope) {
	if (!Boolean(Tweener._tweenList)) return 0;
	var i;
	var c = 0;

	for (i = 0; i<Tweener._tweenList.length; i++) {
		if (Boolean(Tweener._tweenList[i]) && Tweener._tweenList[i].scope == p_scope) {
			c += AuxFunctions.getObjectLength(Tweener._tweenList[i].properties);
		}
	}
	return c;
}


/* Handles errors when Tweener executes any callbacks (onStart, onUpdate, etc)
*  If the TweenListObj specifies an <code>onError</code> callback it well get called, passing the <code>Error</code> object and the current scope as parameters. If no <code>onError</code> callback is specified, it will trace a stackTrace.
*/
Tweener.handleError = function(pTweening, pError, pCallBackName) {
	// do we have an error handler?
	if (Boolean(pTweening.onError) && (pTweening.onError instanceof Function)){
		// yup, there's a handler. Wrap this in a try catch in case the onError throws an error itself.
		var eventScope = Boolean(pTweening.onErrorScope) ? pTweening.onErrorScope : pTweening.scope;
		try {
			pTweening.onError.apply(eventScope, [pTweening.scope, pError]);
		} catch (metaError){
			Tweener.printError(String(pTweening.scope) + " raised an error while executing the 'onError' handler. Original error:\n " + pError.getStackTrace() +  "\nonError error: " + metaError.getStackTrace());
		}
	} else {
		// no handler, simply trace the stack trace:
		if (!Boolean(pTweening.onError)){
			Tweener.printError(String(pTweening.scope) + " raised an error while executing the '" + pCallBackName + "'handler. \n" + pError.getStackTrace() );
		}
	}
}

/**
 * Get the current tweening time (no matter if it uses frames or time as basis), given a specific tweening
 *
 * @param		p_tweening				TweenListObj		Tween information
 */
Tweener.getCurrentTweeningTime = function(p_tweening) {
	return p_tweening.useFrames ? Tweener._currentTimeFrame : Tweener._currentTime;
}

/**
 * Return the current tweener version
 *
 * @return							String		The number of the current Tweener version
 */
Tweener.getVersion = function() {
	return "AS3 1.31.71";
}


// ==================================================================================================================================
// DEBUG functions ------------------------------------------------------------------------------------------------------------------

/**
 * Output an error message
 *
 * @param		p_message				String		The error message to output
 */
Tweener.printError = function(p_message) {
	//
	//trace("## [Tweener] Error: "+p_message);
	throw new Error("## [Tweener] Error: "+p_message);
}