
// TODO: RandInt function. 
var rand = function(a, b) {
	return a + (b - a) *Math.random();
}

// TODO: Deprecate
var randomImage = function() {
	return IMAGES[Math.floor(Math.random()*IMAGES.length)];
}

var MatrixStack = function()
{
	this.stack = [new THREE.Matrix4()];

	this.push = function(mat) {
		this.stack.push(mat);
	}

	this.pushNew = function() {
		this.stack.push(this.top().clone());
	}

	this.pop = function(mat) {
		// FIXME: BAD POLICY
		if(this.stack.length <= 1) {
			console.log("Cannot pop root matrix");
			return this.stack[0];
		}
		return this.stack.pop(mat);
	}

	this.top = function() {
		return this.stack[this.stack.length - 1];
	}
}
