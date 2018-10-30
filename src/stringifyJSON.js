// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
	return recurseObj(obj, '');
};

var recurseObj = function(thingy, endString) {
	
	//checks if it is an object
	if (typeof thingy === 'object' && !Array.isArray(thingy) && thingy !== null) {
		return addObj(thingy, endString);

	//checks if it's an array
	} else if (Array.isArray(thingy)) {
		return addArr(thingy, endString);

	//everything else
	} else {
		endString += addThis(thingy, endString);
	}

	return endString;
};

//adds quotes for strings 
var addThis = function(thingToAdd, endAdd) {
	if (typeof thingToAdd === "string") {
		endAdd += '"' + thingToAdd + '"';
	} else {
		endAdd += thingToAdd;
	}
	return endAdd;
}

var addObj = function(objToAdd, endObjStr) {
	endObjStr += '{';
	var tempObjStr = '';
	Object.keys(objToAdd).forEach(function(key) {
		if (typeof objToAdd[key] !== 'function' && typeof objToAdd[key] !== 'undefined') {
			tempObjStr += recurseObj(key, '') + ':' + recurseObj(objToAdd[key], '') + ',';			
		}
	});
	tempObjStr = tempObjStr.slice(0,-1);	//deletes last comma
	endObjStr += tempObjStr + '}';
	return endObjStr;
}

var addArr = function(arrToAdd, endArrStr) {
	endArrStr += '['
	var tempArrStr = '';
	arrToAdd.forEach(function(ele) {
		tempArrStr += recurseObj(ele, '') + ',';
	});
	tempArrStr = tempArrStr.slice(0,-1);	//deletes last comma
	endArrStr += tempArrStr + ']';
	return endArrStr;
}

//top level loop to go through all items in objects
//CHECK if the item inside is an object, run THAT through a loop (recurse??)
//if it is NOT an object, an array, then what
//an array of objects? an object of arrays? 
//if it is NOT an object or array we just add the item to the string. 
//Simple??? 

/*covers:
	String
	boolean
	null
	arrays
	arrays inside arrays
	objects
	objects in objects
	arrays in objects
*/