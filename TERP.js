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

	/**
	 *  applies a funct to each number in arr
	 *  @param  {Array<number} arr   
	 *  @param  {Array<number>} args  arguments to be applied to funct
	 *  @param  {function} funct 
	 *  @return {Array<number>}       maps each of the values in ret to each of the outputs
	 */
	function applyToArray(arr, args, funct){
		var ret = new Array(arr.length);
		for (var i = 0; i < arr.length; i++){
			args[0] = arr[i];
			ret[i] = funct.apply(TERP, args);
		}
		return ret;	
	}

	/**
	 *  interpolates a normalized number to between the outputMin and outputMax
	 *  @param  {number} input   
	 *  @param  {number} outputMin
	 *  @param  {number} outputMax
	 *  @return {number}           
	 */
	function interpolate(input, outputMin, outputMax){
		return input * (outputMax - outputMin) + outputMin;
	}

	var TERP = {
		/**
		 *  normalizes (0-1) a number between inputMin and inputMax
		 *  @param 	{number} input 
		 *  @param  {number} inputMin 
		 *  @param  {number} inputMax 
		 *  @return {number} 
		 */
		normalize : function(input, inputMin, inputMax){
			return (input - inputMin) / (inputMax - inputMin);
		},
		/**
		 *  if 3 or 4 inputs, assumes the input range is between 0-1
		 *  	
	 	 *  @param {number} input
 		 *  @param {number} outputMin	
 		 *	@param {number} outputMax
 		 *  @param {number=} exponent (optional exponent which will change the interpolation curve)
	 	 *  	
		 *  if 5 or 6 inputs:
		 *  
		 *  @param {number} input
		 *	@param {number} inputMin
		 *	@param {number} inputMax
		 *  @param {number} outputMin	
		 *	@param {number} outputMax
		 *  @param {number=} exponent (optional exponent which will change the interpolation curve)
		 *
		 *  @return {number} 
		 */
		scale : function(){
			var argLen = arguments.length;
			var input = arguments[0];
			var normalized, exped;
			if (argLen === 3) {
				return interpolate(input, arguments[1], arguments[2]);
			} else if (argLen === 4){
				exped = Math.pow(input, arguments[3]);
				return interpolate(exped, arguments[1], arguments[2]);
			} else if (argLen === 5){
				normalized = TERP.normalize(input, arguments[1], arguments[2]);
				return interpolate(normalized, arguments[3], arguments[4]);
			} else if (argLen === 6){
				normalized = TERP.normalize(input, arguments[1], arguments[2]);
				exped = Math.pow(normalized, arguments[5]);
				return interpolate(exped, arguments[3], arguments[4]);
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
		},
		/**
		 *  like scale, but accepts an array
		 *  @return {array<number>} an array of the same size 
		 */
		scaleArray : function(){
			var input = arguments[0];
			var args = Array.prototype.slice.call(arguments, 0);
			return applyToArray(input, args, TERP.scale);
		},
		/**
		 *  like map, but accepts an array
		 *  @return {array<number>} an array of the same size 
		 */
		mapArray : function(){
			var input = arguments[0];
			var args = Array.prototype.slice.call(arguments, 0);
			return applyToArray(input, args, TERP.map);
		},
		/**
		 *  like normalize, but accepts an array
		 *  if there is only one argument, the inputMin and inputMax 
		 *  	are determined by the smallest and largest values of the array.
		 *  @return {array<number>} an array of the same size 
		 */
		normalizeArray : function(){
			var input = arguments[0];
			var args = Array.prototype.slice.call(arguments, 0);
			if (args.length === 1){
				args[1] = Math.min.apply(Math, input);
				args[2] = Math.max.apply(Math, input);
			}
			return applyToArray(input, args, TERP.normalize);
		}
	};

	return TERP;
}));