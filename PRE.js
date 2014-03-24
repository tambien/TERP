/*
	pass in an array of objects

	var vals = new PRE([
	{
		value : {anything},
		position : {number},
	},
	{
		value : {anything},
		position : {number},
	}]);

	vals.get(.1);
*/
var PRE = function(values){
	//validate the values
	this.values = values.sort(function(a, b){
		return a.position - b.position;
	});
}

//insert a value at a position
PRE.prototype.set = function(value, position){
	var newVal = {
		value: value,
		position : position
	}
	for (var i = 0; i < this.values.length; i++){
		var val = this.values[i];
		if (val.position > newVal.position){
			this.values.splice(i, 0, newVal);
			break;
		}
	}
}

//@returns {number}
PRE.prototype.get = function(position){
	//get the value on both sides of the position
	var low = null;
	var high = null;
	for (var i = 0; i < this.values.length; i++){
		var val = this.values[i];
		if (val.position < position){
			low = val;
		} else if (val.position > position){
			high = val;
			break;
		} else {
			return val.value;
		}
	}
	if (high && low){
		return TERP.lin(position, low.position, high.position, low.value, high.value);
	} else {
		if (high){
			return high.value;
		} else if (low){
			return low.value;
		} else {
			return 0;
		}
	}
}
