// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

//You should use document.body, element.childNodes, and element.classList

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
	return recurse(className, [], document.body);
};

var recurse = function(className, classElements, myElement) {
	for (var i in myElement.classList) {
		if (myElement.classList[i] === className) {
			classElements.push(myElement);
			break;
		}
	}
	myElement.childNodes.forEach(function(anElement) {
		classElements.concat(recurse(className, classElements, anElement));
	});
	return classElements;
};
