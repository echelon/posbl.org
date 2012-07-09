
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

	/* =================== ANIMATION CODE ===================== */

	var oldAngle = {x: 0, y:0, z:0}; // TODO: DEPRECATE? 

	// Swap rubik spots
	// TODO/FIXME: Unused? If so, remove
	this.swapPlaces = function(r1, r2)
	{
		var b1 = this.rubik[r1.x][r1.y][r1.z];
		var b2 = this.rubik[r2.x][r2.y][r2.z];

		this.rubik[r1.x][r1.y][r1.z] = b1;
		this.rubik[r2.x][r2.y][r2.z] = b2;
	}

	// Mark all as non-rotating. 
	this.rotateReset = function() 
	{
		for(var i = 0; i < blocks.length; i++) {
			blocks[i].isRotating = false;
		}
	}

	// Install new matrix in rotating blocks' stacks
	this.installMatrices = function()
	{
		// Push a new matrix. 
		// Must be popped?  OR NO?
		for(var i = 0; i < blocks.length; i++) {
			var block = blocks[i];
			if(!block.isRotating) {
				continue;
			}
			block.pushMat(new THREE.Matrix4());
		}
	}

	this.installTween = function(newAngle, oldAngle, axis, callback)
	{
		var self = this;

		new TWEEN.Tween(oldAngle)
			.to(newAngle, 900)
			.easing(TWEEN.Easing.Elastic.Out)
			.onUpdate(function() {
				for(var i = 0; i < blocks.length; i++) {
					var block = blocks[i];
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
				for(var i = 0; i < blocks.length; i++) {
					var block = blocks[i];
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

		this.rotateReset();

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

		this.installMatrices();
		this.installTween(newAngle, oldAngle, 'x', swapCubes);
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

		this.rotateReset();

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

		this.installMatrices();
		this.installTween(newAngle, oldAngle, 'x', swapCubes);
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

		this.rotateReset();

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

		this.installMatrices();
		this.installTween(newAngle, oldAngle, 'x', swapCubes);
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

		this.rotateReset();

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

		this.installMatrices();
		this.installTween(newAngle, oldAngle, 'y', swapCubes);
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

		this.rotateReset();

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

		this.installMatrices();
		this.installTween(newAngle, oldAngle, 'y', swapCubes);
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

		this.rotateReset();

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

		this.installMatrices();
		this.installTween(newAngle, oldAngle, 'y', swapCubes);
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

		this.rotateReset();

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

		this.installMatrices();
		this.installTween(newAngle, oldAngle, 'z', swapCubes);
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

		this.rotateReset();

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

		this.installMatrices();
		this.installTween(newAngle, oldAngle, 'z', swapCubes);
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

		this.rotateReset();

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

		this.installMatrices();
		this.installTween(newAngle, oldAngle, 'z', swapCubes);
	}
}
