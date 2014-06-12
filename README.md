TERP is a minimal interpolation library which is AMD compatible for normalizing, interpolating, scaling and mapping values.

#API

```scale``` is the core TERP method. It accepts 3-6 inputs
 
 With 3 or 4 arguments, the input is assumed to be between 0 and 1. 

```javascript
/**
 *  @param {number} input
 *  @param {number} outputMin	
 *	@param {number} outputMax
 *  @param {number=} exponent (optinal exponent which will change the interpolation curve)
 * 
 *  @return {number} 
 */
```

examples: 
```javascript
	TERP.scale(.5, 100, 200); //returns 150
	TERP.scale(.5, 100, 200, 2) // returns 125
```

 With 5 or 6 arguments, the input the second and third arguments define the input range

```javascript
/**
 *  @param {number} input
 *	@param {number} inputMin
 *	@param {number} inputMax
 *  @param {number} outputMin	
 *	@param {number} outputMax
 *  @param {number=} exponent (optinal exponent which will change the interpolation curve)
 * 
 *  @return {number} 
 */
```

examples: 
```javascript
	TERP.scale(50, 0, 100, 100, 1000, 2); //returns 325
	TERP.scale(-1, -2, 0, 0, 1000); //returns 500
```