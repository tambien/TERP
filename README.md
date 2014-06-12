TERP is a minimal interpolation library which is AMD compatible for normalizing, scaling and mapping values.

##scale

```scale``` is the core TERP method. It accepts 3-6 inputs
 
 With 3 or 4 arguments, the input is assumed to be between 0 and 1. 

```javascript
/**
 *  @param {number} input
 *  @param {number} outputMin	
 *	@param {number} outputMax
 *  @param {number=} exponent (optional exponent which will change the interpolation curve)
 * 
 *  @return {number} 
 */
```

examples: 
```javascript
	TERP.scale(.5, 100, 200); 
	//returns 150

	TERP.scale(.5, 100, 200, 2) 
	// returns 125
```

 With 5 or 6 arguments, the input the second and third arguments define the input range

```javascript
/**
 *  @param {number} input
 *	@param {number} inputMin
 *	@param {number} inputMax
 *  @param {number} outputMin	
 *	@param {number} outputMax
 *  @param {number=} exponent (optional exponent which will change the interpolation curve)
 * 
 *  @return {number} 
 */
```

examples: 
```javascript
	TERP.scale(50, 0, 100, 100, 1000, 2); 
	//returns 325

	TERP.scale(-1, -2, 0, 0, 1000); 
	//returns 500
```

##map

```map``` is just like scale, but will clip the output to the output range

##normalize

```normalize``` normalize will scale an input within an input range to 0-1

```javascript
/**
 *  @param  {number} input 
 *  @param  {number} inputMin 
 *  @param  {number} inputMax 
 *  @return {number} 
 */
```

#Arrays

There are array version of each of those functions. 

```normalizeArray```, ```scaleArray```, and ```mapArray``` are the same as the above functions, but take an array as their first argument and return an array of the same length as the first argument with each of the values interpolated. 

```normalizeArray``` can accept one argument, in which case it will set the inputMin and inputMax to the smallest and largest values in the array. 

```javascript
//with one argument:
TERP.normalizeArray([1, 2, 3, 4, 5]); 
// returns [0, .4, .6, .8, 1];

//with three arguments:
TERP.normalizeArray([1, 2, 3, 4, 5], 0, 10); 
// returns [0, .2, .3, .4, 5];


