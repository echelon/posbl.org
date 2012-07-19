
// TODO: Deprecate and remove. 
var OLDcoords = [
	// Layer one
	[0, 0, 0],
	[0, 0, 1],
	[0, 0, -1],
	[0, 1, 0],
	[0, 1, 1],
	[0, 1, -1],
	[0, -1, 0],
	[0, -1, 1],
	[0, -1, -1],
	// Layer two 
	[1, 0, 0],
	[1, 0, 1],
	[1, 0, -1],
	[1, 1, 0],
	[1, 1, 1],
	[1, 1, -1],
	[1, -1, 0],
	[1, -1, 1],
	[1, -1, -1],
	// Layer three 
	[-1, 0, 0],
	[-1, 0, 1],
	[-1, 0, -1],
	[-1, 1, 0],
	[-1, 1, 1],
	[-1, 1, -1],
	[-1, -1, 0],
	[-1, -1, 1],
	[-1, -1, -1],
];


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

var Rubik = function()
{
	/**
	 * All of the 27 blocks in the Rubik cube. 
	 */
	this.blocks = [];

	/**
	 * Pointers to all 27 blocks in the 3D Rubik cube.
	 * This maintains spatial organization. 
	 */
	this.rubik = [[[null, null, null],
					[null, null, null],
					[null, null, null]],
				 [[null, null, null],
					[null, 0, null], // '0' is center
					[null, null, null]],
				 [[null, null, null],
					[null, null, null],
					[null, null, null]]
	];

	/**
	 * Color constants
	 */
	var COLORS = [
		0xffffff,
		0xbbbbbb,
		0x555555,
		0xcc0000,
	]

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
			overdraw: true,
			transparent: true,
			//blending: THREE.AdditiveBlending,
			//blending: THREE.NormalBlending,
			blending: THREE.SubtractiveBlending,
			//blending: THREE.AdditiveAlphaBlending,
			opacity: 0.9,
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

		// Reset the Object Matrix.
		// TODO: Better way? 
		// TODO: Needed? 
		this.resetObjectMatrix = function() {
			this.object.matrix = new THREE.Matrix4();
		}

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




	/********************** REST OF CTOR ****************/ 


	// Create the blocks. 
	for(var i = 0; i < 27; i++) {
		// XXX/TEMP: Set color of layers so it's easier to debug
		/*var color = 0;
		if(i < 9) {
			color = COLORS[0];
		}
		else if(i < 18) {
			color = COLORS[2];
		}
		else {
			color = COLORS[4];
		}*/

		var color = randItem(COLORS);

		var block = new Block(color);
		block.add(scene);
		block.object.updateMatrix();

		block.position.x = OLDcoords[i][0];
		block.position.y = OLDcoords[i][1];
		block.position.z = OLDcoords[i][2];
		
		this.blocks.push(block);
	}

	this.init = function() 
	{
		var i = 0;
		for(var x = 0; x < 3; x++) {
			for(var y = 0; y < 3; y++) {
				for(var z = 0; z < 3; z++) {
					// Place in data structure
					this.rubik[x][y][z] = this.blocks[i];
					i++;
				}
			}
		}
	}

	this.init();

	/**
	 * Position blocks in the 'rubik' 3D vector. 
	 */	
	this.position = function()
	{
		var i = 0;
		for(var x = 0; x < 3; x++) {
			for(var y = 0; y < 3; y++) {
				for(var z = 0; z < 3; z++) {
					// Give initial OpenGL position
					block = this.rubik[x][y][z];
					var coords = {
						x: 210 * (x-1),
						y: 210 * (y-1),
						z: 210 * (z-1)
					}
					
					// Reset root stack matrix to identity, then
					// translate. 
					block.matrixStack[0]
						.identity()
						.translate(coords);

					// XXX: Probably a good thing to do for added
					// certainty. This will remove any 'tweening' 
					// stacks.
					// XXX: OR actually, bad... once rotation of cube 
					// faces becomes important. 
					while(block.matrixStack.length >= 2) {
						block.matrixStack.pop();
					}
				}
			}
		}
	}

	this.position();

	// TODO: uninstall the animation.
	this.startRandomAnimation = function() {
		var self = this;

		// Random rubik movement.
		setInterval(function() {
			switch(Math.round(rand(0, 10))) {
				case 0:
					self.rotate_x1();
					break;
				case 1:
					self.rotate_x2();
					break;
				case 2:
					self.rotate_x3();
					break;
				case 3:
					self.rotate_y1();
					break;
				case 4:
					self.rotate_y2();
					break;
				case 5:
					self.rotate_y3();
					break;
				case 6:
					self.rotate_z1();
					break;
				case 7:
					self.rotate_z2();
					break;
				case 8:
					self.rotate_z3();
					break;
			}
		}, 1000);
	}

	this.patternStage = 0;

	// TODO: uninstall the animation.
	this.startPatternAnimation = function() {
		var self = this;

		// Random rubik movement.
		setInterval(function() {
			switch(self.patternStage) {
				case 0:
					self.rotate_x1();
					break;
				case 1:
					self.rotate_x2();
					break;
				case 2:
					self.rotate_x3();
					break;
				case 3:
					self.rotate_y1();
					break;
				case 4:
					self.rotate_y2();
					break;
				case 5:
					self.rotate_y3();
					break;
				case 6:
					self.rotate_z1();
					break;
				case 7:
					self.rotate_z2();
					break;
				case 8:
					self.rotate_z3();
					break;
			}
			self.patternStage = (self.patternStage + 1) % 9;
		}, 1000);
	}


	/**
	 * Position Blocks
	 * XXX: MUST CALL IN RENDER LOOP. 
	 * TODO: Rename rotMat. 
	 * TODO: Better (documented) way to send translations to render loop
	 */ 
	this.render = function(rotMat) {
		var block;

		for(var i = 0; i < this.blocks.length; i++) {
			block = this.blocks[i];

			block.pushMat(rotMat)

			block.object.updateMatrix();
			block.applyMats();

			block.popMat();
		}
	}

	/* =================== ANIMATION CODE ===================== */

	// Mark all as non-rotating. 
	this._rotateReset = function() 
	{
		for(var i = 0; i < this.blocks.length; i++) {
			this.blocks[i].isRotating = false;
		}
	}

	// Install new matrix in rotating blocks' stacks
	this._installMatrices = function()
	{
		// Push a new matrix. 
		// Must be popped?  OR NO?
		for(var i = 0; i < this.blocks.length; i++) {
			var block = this.blocks[i];
			if(!block.isRotating) {
				continue;
			}
			block.pushMat(new THREE.Matrix4());
		}
	}

	this._installTween = function(newAngle, oldAngle, axis, callback)
	{
		var self = this;

		new TWEEN.Tween(oldAngle)
			.to(newAngle, 900)
			.easing(TWEEN.Easing.Elastic.Out)
			.onUpdate(function() {
				for(var i = 0; i < self.blocks.length; i++) {
					var block = self.blocks[i];
					if(!block.isRotating) {
						continue;
					}
					var mat = new THREE.Matrix4();

					switch(axis) {
						case 'x':
							mat.rotateX(oldAngle.x);
							break;
						case 'y':
							mat.rotateY(oldAngle.y);
							break;
						case 'z':
							mat.rotateZ(oldAngle.z);
							break;
					}

					block.setTopMat(mat);
				}
			})
			.onComplete(function() {
				// Clear rotation statuses
				for(var i = 0; i < self.blocks.length; i++) {
					var block = self.blocks[i];
					if(!block.isRotating) {
						continue;
					}
					// XXX: Method 1
					// XXX: Consider keeping this. 
					// XXX: Pop the mat we pushed. 
					//block.popMat(); // XXX: Temp comment out
				}

				// XXX: Method 2
				// Reposition everything in OpenGL with respect to the new
				// Rubik 3D vector positions. (Literally rebuilds everything)
				callback();
				rubik.position();

				self._rotateLock = false;
			})
			.start();
	}


	/* =================== ROTATION GROUPS ==================== */

	/**
	 * XXX/NOTE: This is highly ammenable to automation 
	 * if I don't hardcode the indices. I want to wait until I have
	 * face textures and possibly reverse-direction rotation done before
	 * I reduce this down to an embarassingly smaller set of lines
	 */

	// Prevent simultaneous rotations 
	this._rotateLock = false;

	this.rotate_x1 = function()
	{
		var self = this;

		if(this._rotateLock) { return; }
		this._rotateLock = true;
		
		var oldAngle = {x: 0, y:0, z:0};
		var newAngle = {
			x: oldAngle.x + Math.PI/2, 
			y: oldAngle.y + Math.PI/2, 
			z: oldAngle.z + Math.PI/2
		};

		this._rotateReset();

		// Mark x1 rotational group as rotating. 
		this.rubik[0][0][0].isRotating = true;
		this.rubik[0][0][1].isRotating = true;
		this.rubik[0][0][2].isRotating = true;
		this.rubik[0][1][0].isRotating = true;
		this.rubik[0][1][1].isRotating = true;
		this.rubik[0][1][2].isRotating = true;
		this.rubik[0][2][0].isRotating = true;
		this.rubik[0][2][1].isRotating = true;
		this.rubik[0][2][2].isRotating = true;

		// Swap cube assignments on callback.
		var swapCubes = function() {
			var t;
			t = self.rubik[0][2][0];
			self.rubik[0][2][0] = self.rubik[0][0][0];
			self.rubik[0][0][0] = self.rubik[0][0][2];
			self.rubik[0][0][2] = self.rubik[0][2][2];
			self.rubik[0][2][2] = t;

			t = self.rubik[0][2][1];
			self.rubik[0][2][1] = self.rubik[0][1][0];
			self.rubik[0][1][0] = self.rubik[0][0][1];
			self.rubik[0][0][1] = self.rubik[0][1][2];
			self.rubik[0][1][2] = t;
		}

		this._installMatrices();
		this._installTween(newAngle, oldAngle, 'x', swapCubes);
	}

	this.rotate_x2 = function()
	{
		var self = this;

		if(this._rotateLock) { return; }
		this._rotateLock = true;
		
		var oldAngle = {x: 0, y:0, z:0};
		var newAngle = {
			x: oldAngle.x + Math.PI/2, 
			y: oldAngle.y + Math.PI/2, 
			z: oldAngle.z + Math.PI/2
		};

		this._rotateReset();

		// Mark x2 rotational group as rotating. 
		this.rubik[1][0][0].isRotating = true;
		this.rubik[1][0][1].isRotating = true;
		this.rubik[1][0][2].isRotating = true;
		this.rubik[1][1][0].isRotating = true;
		this.rubik[1][1][1].isRotating = true;
		this.rubik[1][1][2].isRotating = true;
		this.rubik[1][2][0].isRotating = true;
		this.rubik[1][2][1].isRotating = true;
		this.rubik[1][2][2].isRotating = true;

		// Swap cube assignments on callback.
		var swapCubes = function() {
			var t;
			t = self.rubik[1][2][2];
			self.rubik[1][2][2] = self.rubik[1][2][0];
			self.rubik[1][2][0] = self.rubik[1][0][0];
			self.rubik[1][0][0] = self.rubik[1][0][2];
			self.rubik[1][0][2] = t;

			t = self.rubik[1][1][2];
			self.rubik[1][1][2] = self.rubik[1][2][1];
			self.rubik[1][2][1] = self.rubik[1][1][0];
			self.rubik[1][1][0] = self.rubik[1][0][1];
			self.rubik[1][0][1] = t;
		}

		this._installMatrices();
		this._installTween(newAngle, oldAngle, 'x', swapCubes);
	}

	this.rotate_x3 = function()
	{
		var self = this;

		if(this._rotateLock) { return; }
		this._rotateLock = true;
		
		var oldAngle = {x: 0, y:0, z:0};
		var newAngle = {
			x: oldAngle.x + Math.PI/2, 
			y: oldAngle.y + Math.PI/2, 
			z: oldAngle.z + Math.PI/2
		};

		this._rotateReset();

		// Mark x3 rotational group as rotating. 
		self.rubik[2][0][0].isRotating = true;
		self.rubik[2][0][1].isRotating = true;
		self.rubik[2][0][2].isRotating = true;
		self.rubik[2][1][0].isRotating = true;
		self.rubik[2][1][1].isRotating = true;
		self.rubik[2][1][2].isRotating = true;
		self.rubik[2][2][0].isRotating = true;
		self.rubik[2][2][1].isRotating = true;
		self.rubik[2][2][2].isRotating = true;

		// Swap cube assignments on callback.
		var swapCubes = function() {
			var t;
			t = self.rubik[2][2][0];
			self.rubik[2][2][0] = self.rubik[2][0][0];
			self.rubik[2][0][0] = self.rubik[2][0][2];
			self.rubik[2][0][2] = self.rubik[2][2][2];
			self.rubik[2][2][2] = t;

			t = self.rubik[2][1][2];
			self.rubik[2][1][2] = self.rubik[2][2][1];
			self.rubik[2][2][1] = self.rubik[2][1][0];
			self.rubik[2][1][0] = self.rubik[2][0][1];
			self.rubik[2][0][1] = t;
		}

		this._installMatrices();
		this._installTween(newAngle, oldAngle, 'x', swapCubes);
	}

	this.rotate_y1 = function()
	{
		var self = this;

		if(this._rotateLock) { return; }
		this._rotateLock = true;
		
		var oldAngle = {x: 0, y:0, z:0};
		var newAngle = {
			x: oldAngle.x + Math.PI/2, 
			y: oldAngle.y + Math.PI/2, 
			z: oldAngle.z + Math.PI/2
		};

		this._rotateReset();

		// Mark y1 rotational group as rotating. 
		this.rubik[0][2][0].isRotating = true;
		this.rubik[0][2][1].isRotating = true;
		this.rubik[0][2][2].isRotating = true;
		this.rubik[1][2][0].isRotating = true;
		this.rubik[1][2][1].isRotating = true;
		this.rubik[1][2][2].isRotating = true;
		this.rubik[2][2][0].isRotating = true;
		this.rubik[2][2][1].isRotating = true;
		this.rubik[2][2][2].isRotating = true;

		// Swap cube assignments on callback.
		var swapCubes = function() {
			var t;
			t = self.rubik[0][2][0];
			self.rubik[0][2][0] = self.rubik[2][2][0];
			self.rubik[2][2][0] = self.rubik[2][2][2];
			self.rubik[2][2][2] = self.rubik[0][2][2];
			self.rubik[0][2][2] = t;

			t = self.rubik[0][2][1];
			self.rubik[0][2][1] = self.rubik[1][2][0];
			self.rubik[1][2][0] = self.rubik[2][2][1];
			self.rubik[2][2][1] = self.rubik[1][2][2];
			self.rubik[1][2][2] = t;
		}

		this._installMatrices();
		this._installTween(newAngle, oldAngle, 'y', swapCubes);
	}

	this.rotate_y2 = function()
	{
		var self = this;

		if(this._rotateLock) { return; }
		this._rotateLock = true;
		
		var oldAngle = {x: 0, y:0, z:0};
		var newAngle = {
			x: oldAngle.x + Math.PI/2, 
			y: oldAngle.y + Math.PI/2, 
			z: oldAngle.z + Math.PI/2
		};

		this._rotateReset();

		// Mark y2 rotational group as rotating. 
		this.rubik[0][1][0].isRotating = true;
		this.rubik[0][1][1].isRotating = true;
		this.rubik[0][1][2].isRotating = true;
		this.rubik[1][1][0].isRotating = true;
		this.rubik[1][1][1].isRotating = true;
		this.rubik[1][1][2].isRotating = true;
		this.rubik[2][1][0].isRotating = true;
		this.rubik[2][1][1].isRotating = true;
		this.rubik[2][1][2].isRotating = true;

		// Swap cube assignments on callback.
		var swapCubes = function() {
			var t;
			t = self.rubik[0][1][0];
			self.rubik[0][1][0] = self.rubik[2][1][0];
			self.rubik[2][1][0] = self.rubik[2][1][2];
			self.rubik[2][1][2] = self.rubik[0][1][2];
			self.rubik[0][1][2] = t;

			t = self.rubik[0][1][1];
			self.rubik[0][1][1] = self.rubik[1][1][0];
			self.rubik[1][1][0] = self.rubik[2][1][1];
			self.rubik[2][1][1] = self.rubik[1][1][2];
			self.rubik[1][1][2] = t;
		}

		this._installMatrices();
		this._installTween(newAngle, oldAngle, 'y', swapCubes);
	}

	this.rotate_y3 = function()
	{
		var self = this;

		if(this._rotateLock) { return; }
		this._rotateLock = true;
		
		var oldAngle = {x: 0, y:0, z:0};
		var newAngle = {
			x: oldAngle.x + Math.PI/2, 
			y: oldAngle.y + Math.PI/2, 
			z: oldAngle.z + Math.PI/2
		};

		this._rotateReset();

		// Mark y3 rotational group as rotating. 
		this.rubik[0][0][0].isRotating = true;
		this.rubik[0][0][1].isRotating = true;
		this.rubik[0][0][2].isRotating = true;
		this.rubik[1][0][0].isRotating = true;
		this.rubik[1][0][1].isRotating = true;
		this.rubik[1][0][2].isRotating = true;
		this.rubik[2][0][0].isRotating = true;
		this.rubik[2][0][1].isRotating = true;
		this.rubik[2][0][2].isRotating = true;

		// Swap cube assignments on callback.
		var swapCubes = function() {
			var t;
			t = self.rubik[0][0][0];
			self.rubik[0][0][0] = self.rubik[2][0][0];
			self.rubik[2][0][0] = self.rubik[2][0][2];
			self.rubik[2][0][2] = self.rubik[0][0][2];
			self.rubik[0][0][2] = t;

			t = self.rubik[0][0][1];
			self.rubik[0][0][1] = self.rubik[1][0][0];
			self.rubik[1][0][0] = self.rubik[2][0][1];
			self.rubik[2][0][1] = self.rubik[1][0][2];
			self.rubik[1][0][2] = t;
		}

		this._installMatrices();
		this._installTween(newAngle, oldAngle, 'y', swapCubes);
	}

	this.rotate_z1 = function()
	{
		var self = this;

		if(this._rotateLock) { return; }
		this._rotateLock = true;
		
		var oldAngle = {x: 0, y:0, z:0};
		var newAngle = {
			x: oldAngle.x + Math.PI/2, 
			y: oldAngle.y + Math.PI/2, 
			z: oldAngle.z + Math.PI/2
		};

		this._rotateReset();

		// Mark z1 rotational group as rotating. 
		this.rubik[0][0][2].isRotating = true;
		this.rubik[0][1][2].isRotating = true;
		this.rubik[0][2][2].isRotating = true;
		this.rubik[1][0][2].isRotating = true;
		this.rubik[1][1][2].isRotating = true;
		this.rubik[1][2][2].isRotating = true;
		this.rubik[2][0][2].isRotating = true;
		this.rubik[2][1][2].isRotating = true;
		this.rubik[2][2][2].isRotating = true;

		// Swap cube assignments on callback.
		var swapCubes = function() {
			var t;
			t = self.rubik[0][2][2];
			self.rubik[0][2][2] = self.rubik[2][2][2];
			self.rubik[2][2][2] = self.rubik[2][0][2];
			self.rubik[2][0][2] = self.rubik[0][0][2];
			self.rubik[0][0][2] = t;

			t = self.rubik[1][2][2];
			self.rubik[1][2][2] = self.rubik[2][1][2];
			self.rubik[2][1][2] = self.rubik[1][0][2];
			self.rubik[1][0][2] = self.rubik[0][1][2];
			self.rubik[0][1][2] = t;
		}

		this._installMatrices();
		this._installTween(newAngle, oldAngle, 'z', swapCubes);
	}

	this.rotate_z2 = function()
	{
		var self = this;

		if(this._rotateLock) { return; }
		this._rotateLock = true;
		
		var oldAngle = {x: 0, y:0, z:0};
		var newAngle = {
			x: oldAngle.x + Math.PI/2, 
			y: oldAngle.y + Math.PI/2, 
			z: oldAngle.z + Math.PI/2
		};

		this._rotateReset();

		// Mark z2 rotational group as rotating. 
		this.rubik[0][0][1].isRotating = true;
		this.rubik[0][1][1].isRotating = true;
		this.rubik[0][2][1].isRotating = true;
		this.rubik[1][0][1].isRotating = true;
		this.rubik[1][1][1].isRotating = true;
		this.rubik[1][2][1].isRotating = true;
		this.rubik[2][0][1].isRotating = true;
		this.rubik[2][1][1].isRotating = true;
		this.rubik[2][2][1].isRotating = true;

		// Swap cube assignments on callback.
		var swapCubes = function() {
			var t;
			t = self.rubik[0][2][1];
			self.rubik[0][2][1] = self.rubik[2][2][1];
			self.rubik[2][2][1] = self.rubik[2][0][1];
			self.rubik[2][0][1] = self.rubik[0][0][1];
			self.rubik[0][0][1] = t;

			t = self.rubik[1][2][1];
			self.rubik[1][2][1] = self.rubik[2][1][1];
			self.rubik[2][1][1] = self.rubik[1][0][1];
			self.rubik[1][0][1] = self.rubik[0][1][1];
			self.rubik[0][1][1] = t;
		}

		this._installMatrices();
		this._installTween(newAngle, oldAngle, 'z', swapCubes);
	}

	this.rotate_z3 = function()
	{
		var self = this; 

		if(this._rotateLock) { return; }
		this._rotateLock = true;
		
		var oldAngle = {x: 0, y:0, z:0};
		var newAngle = {
			x: oldAngle.x + Math.PI/2, 
			y: oldAngle.y + Math.PI/2, 
			z: oldAngle.z + Math.PI/2
		};

		this._rotateReset();

		// Mark z3 rotational group as rotating. 
		this.rubik[0][0][0].isRotating = true;
		this.rubik[0][1][0].isRotating = true;
		this.rubik[0][2][0].isRotating = true;
		this.rubik[1][0][0].isRotating = true;
		this.rubik[1][1][0].isRotating = true;
		this.rubik[1][2][0].isRotating = true;
		this.rubik[2][0][0].isRotating = true;
		this.rubik[2][1][0].isRotating = true;
		this.rubik[2][2][0].isRotating = true;

		// Swap cube assignments on callback.
		var swapCubes = function() {
			var t;
			t = self.rubik[0][2][0];
			self.rubik[0][2][0] = self.rubik[2][2][0];
			self.rubik[2][2][0] = self.rubik[2][0][0];
			self.rubik[2][0][0] = self.rubik[0][0][0];
			self.rubik[0][0][0] = t;

			t = self.rubik[1][2][0];
			self.rubik[1][2][0] = self.rubik[2][1][0];
			self.rubik[2][1][0] = self.rubik[1][0][0];
			self.rubik[1][0][0] = self.rubik[0][1][0];
			self.rubik[0][1][0] = t;
		}

		this._installMatrices();
		this._installTween(newAngle, oldAngle, 'z', swapCubes);
	}
}
