Terp is a minimal interpolation library. 

#API

```javascript
TERP.lin | exp | log (
	input, //the input to scale
	rangeMin, 
	rangeMax, 
	outputMin,
	outputMax,
	clip, //(optional) clip the values to the output range
);


or if the input is between 0-1
```javascript
TERP.lin | exp | log (
	input, //the input to scale
	outputMin,
	outputMax,
	clip, //(optional) clip the values to the output range
);
```