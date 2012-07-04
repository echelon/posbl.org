/**
 * Color constants
 */
var COLORS = {
	red:	0xcc0000,
	green:	0x00cc00,
	blue:	0x0000ff,
	white:	0xdddddd,
	orange: 0xffff00,
	yellow: 0xff00ff,
	black:	0x555555, // XXX: Remove later.
}

/**
 * Block class.
 * TODO: Better parameterization -- use object w/ named params. 
 */
var Block = function(color, size)
{
	/**
	 * CTOR
	 */

	var randColor = function() {
		var colors = [
			0x990000, 0xcc0000, 0xff0000, // reds
			0x009900, 0x00cc00, 0x00ff00, // greens
			0x000099, 0x0000cc, 0x0000ff, // blues
			0x999900, 0xcccc00, 0xffff00, // yellows
			0x990099, 0xcc00cc, 0xff00ff, // fushias 
			0x009999, 0x00cccc, 0x00ffff, // cyans
			0x999999, 0xcccccc // greys
		]
		return colors[Math.floor(rand(0, colors.length))];
	}

	var sz = size || 200;
	var c = color || randColor();

	/**
	 * Object Members
	 */

	this.mat = new THREE.MeshBasicMaterial({
		color: c,
		//overdraw: true,
		//transparent: true,
		//blending: THREE.AdditiveBlending,
		//blending: THREE.NormalBlending,
		//blending: THREE.SubtractiveBlending,
		//blending: THREE.AdditiveAlphaBlending,
		//opacity: 0.9,
		//wireframe: true
	});

	this.object = new THREE.Mesh(
		new THREE.CubeGeometry(sz, sz, sz),
		this.mat
	);

	this.object.castShadow = true;
	this.object.receiveShadow = true;
	this.object.matrixAutoUpdate = false;

	// If the block is being animated
	this.isMoving = false; 

	// The position of the block in the fully assembled cube.
	// Each dimension is either [-1, 0, 1]
	// The coordinate {x=0, y=0, z=0} is the center block. 
	this.position = {
		x: 0,
		y: 0,
		z: 0
	};

	// A temporary matrix stack. XXX/TESTING
	this.matrixStack = [this.object.matrix.clone()];

	/**
	 * Methods 
	 */

	this.add = function(scene) {
		scene.add(this.object);
	}

	/**
	 * Matrix stack operations.
	 */

	this.pushMat = function(mat) {
		this.matrixStack.push(mat);
	}

	this.popMat = function() {
		if(this.matrixStack.length <= 1) {
			return;
		}
		return this.matrixStack.pop();
	}

	this.topMat = function() {
		return this.matrixStack[this.matrixStack.length -1];
	}

	// Set the top matrix (but not root)
	this.setTopMat = function(mat) {
		if(this.matrixStack.length <= 1) {
			return;
		}
		this.matrixStack[this.matrixStack.length - 1] = mat;
	}

	// TODO: Don't multiply by self. Try this first.
	this.applyMats = function() {
		this.object.matrix = new THREE.Matrix4();
		for(var i = this.matrixStack.length - 1; i >= 0; i--) {
			var mat = this.matrixStack[i];
			this.object.matrix.multiplySelf(mat);
		}
	}
}

