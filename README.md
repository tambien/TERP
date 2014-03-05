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
```

or if the input is between 0-1
```javascript
TERP.lin | exp | log (
	input, //the input to scale
	outputMin,
	outputMax,
	clip, //(optional) clip the values to the output range
);
```

#Examples
```javascript
TERP.lin(.1, 400, 900); //returns 450

TERP.exp(20, 12, 300, 0, 1000) // returns 0.7716049382716049

TERP.log(300, 1.1, 250.1, 0, 1000) // returns 1072.0150156728134
TERP.log(300, 1.1, 250.1, 0, 1000, true) // returns 1000
```
