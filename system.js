
// TODO: RandInt function. 
var rand = function(a, b) {
	return a + (b - a) *Math.random();
}

// TODO: Deprecate
var randomImage = function() {
	return IMAGES[Math.floor(Math.random()*IMAGES.length)];
}

// TODO: Support maps. 
var randItem = function(list) {
	return list[Math.floor(rand(0, list.length))];
}
