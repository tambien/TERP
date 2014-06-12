(function (root, factory) {
	//can run with or without requirejs
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define(function () {
			var TERP = factory();
			return TERP;
		});
	} else if (typeof root.TERP !== "function") {
		//make Tone public
		root.TERP = factory(root);
	}
} (this, function () {

	var TERP = {
		/**
		 *  normalizes (0-1) a number between inputMin and inputMax
		 *  @param  {number} inputMin 
		 *  @param  {number} inputMax 
		 *  @return {number} 
		 */
		normalize : function(input, inputMin, inputMax){
			return (input - inputMin) / (inputMax - inputMin);
		},
		/**
		 *  interpolates a normalized number to between the outputMin and outputMax
		 *  @param  {number} input   
		 *  @param  {number} outputMin
		 *  @param  {number} outputMax
		 *  @return {number}           
		 */
		interpolate : function(input, outputMin, outputMax){
			return input * (outputMax - outputMin) + outputMin;
		},
		/**
		 *  if 3 or 4 inputs:
		 *  	scales the value from 0-1 range to the output range
	 	 *  	with an optional exponent
	 	 *  	
		 *  if 5 or 6 inputs:
		 *  	scales the value from the input range to the output range
		 *  	with an optional exponent
		 *
		 *  @return {number} 
		 */
		scale : function(){
			var argLen = arguments.length;
			var input = arguments[0];
			var normalized, exped;
			if (argLen === 3) {
				return TERP.interpolate(input, arguments[1], arguments[2]);
			} else if (argLen === 4){
				exped = Math.pow(input, arguments[3]);
				return TERP.interpolate(exped, arguments[1], arguments[2]);
			} else if (argLen === 5){
				normalized = TERP.normalize(input, arguments[1], arguments[2]);
				return TERP.interpolate(normalized, arguments[3], arguments[4]);
			} else if (argLen === 6){
				normalized = TERP.normalize(input, arguments[1], arguments[2]);
				exped = Math.pow(normalized, arguments[5]);
				return TERP.interpolate(exped, arguments[3], arguments[4]);
			} else {
				console.error("scale accepts 3 - 6 arguments");
			}
		},
		/**
		 *  like scale, but clips the output to the output range
		 *  @return {number} 
		 */
		map : function(){
			var interped = TERP.scale.apply(TERP, arguments);
			//clip the output
			var argLen = arguments.length;
			var clipMin, clipMax;
			if (argLen === 3 || argLen === 4){
				clipMin = Math.min(arguments[1], arguments[2]);
				clipMax = Math.max(arguments[1], arguments[2]);
			} else if (argLen === 5 || argLen === 6){
				clipMin = Math.min(arguments[3], arguments[4]);
				clipMax = Math.max(arguments[3], arguments[4]);
			}
			//clip the output
			if (interped > clipMax){
				return clipMax;
			} else if (interped < clipMin){
				return clipMin;
			} else {
				return interped;
			}
		}	
	};

	return TERP;
}));