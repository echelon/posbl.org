// TODO: RandInt function. 
var rand = function(a, b) {
	return a + (b - a) *Math.random();
}

// TODO: Support maps. 
var randItem = function(list) {
	return list[Math.floor(rand(0, list.length))];
}

var Molecule = function()
{
	/**
	 * All of the atoms in the molecule
	 */
	this.atoms = [];

	/**
	 * Color constants
	 */
	var COLORS = [
		0xcc0000,
		0xbbbbbb,
		0xffffff,
		0x555555,
	]

	/**
	 * Atom class.
	 * TODO: Better parameterization: use object w/ named params. 
	 */
	var Atom = function(color, size)
	{
		/**
		 * CTOR
		 */

		var rad = size || 200;
		var c = color || 0xffffff;

		/**
		 * Object Members
		 */

		this.mat = new THREE.MeshBasicMaterial({
			color: c,
			overdraw: true,
			transparent: true,
			doubleSided: true,
			//blending: THREE.AdditiveBlending,
			//blending: THREE.NormalBlending,
			//blending: THREE.AdditiveAlphaBlending,
			blending: THREE.SubtractiveBlending,
			opacity: 0.9,
			//wireframe: true
		});

		this.object = new THREE.Mesh(
			//new THREE.CubeGeometry(rad, rad, rad),
			new THREE.PlaneGeometry(rad, rad),
			this.mat
		);

		// TODO: Relative atom position in molecule. 
		// TODO: How to represent this? 
		this.position = {
			x: 0,
			y: 0,
			z: 0
		};

		this.object.castShadow = true;
		this.object.receiveShadow = true;
		this.object.matrixAutoUpdate = false;

		// Reset the Object Matrix.
		// TODO: Better way? 
		// TODO: Needed? 
		this.resetObjectMatrix = function() {
			this.object.matrix = new THREE.Matrix4();
		}

		// A temporary matrix stack. XXX/TESTING
		this.matrixStack = [
			this.object.matrix.clone(), // XXX: Testing two
			this.object.matrix.clone()
		];

		// Add the atom to the scene
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


	var size = 30;

	var atomColors = {
		'C': 0x555555,
		'H': 0xeeeeee,
		'O': 0x990000,
		'N': 0x000099,
		'P': 0x990099,
	};

	for(var i = 0; i < ATOMS.length/4; i++) 
	{
		/*if(i % 5 == 0) {
			continue;
		}*/
		if(i > 700) {
			break;
		}
		var color = atomColors[ATOMS[i*4+3]];
		var atom = new Atom(color, size);
		atom.add(scene); // TODO: Remove global
		atom.object.updateMatrix();
		atom.position.x = ATOMS[i*4];
		atom.position.z = ATOMS[i*4+1];
		atom.position.y = ATOMS[i*4+2];
		this.atoms.push(atom);
	}

	this.init = function() 
	{
	}

	this.init();

	/**
	 * Position blocks in the 'rubik' 3D vector. 
	 */	
	this.position = function(scale)
	{
		var sc = scale || 50;

		for(var i = 0; i < this.atoms.length; i++) {
			var atom = this.atoms[i];
			var coords = {
				x: sc * atom.position.x,
				y: sc * atom.position.y,
				z: sc * atom.position.z
			}
			// Reset root stack matrix to identity, then
			// translate. 
			atom.matrixStack[1]
				.identity()
				.translate(coords);

			// XXX: Probably a good thing to do for added
			// certainty. This will remove any 'tweening' 
			// stacks.
			// XXX: OR actually, bad... once rotation of cube 
			// faces becomes important. 
			// XXX XXX XXX XXX -- temporarily commented out (DNA)
			/*while(atom.matrixStack.length >= 2) {
				atom.matrixStack.pop();
			}*/
		}
	}

	this.position(20);

	// TODO: uninstall the animation.
	this.startRandomAnimation = function() {
		/*var self = this;

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
		}, 1000);*/
	}

	this.patternStage = 0;

	// TODO: uninstall the animation.
	this.startPatternAnimation = function() {
		/*var self = this;

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
		}, 1000);*/
	}


	/**
	 * Position Blocks
	 * XXX: MUST CALL IN RENDER LOOP. 
	 * TODO: Rename rotMat. 
	 * TODO: Better (documented) way to send translations to render loop
	 */ 
	this.render = function(rotMat, y) {
		var atom;

		var z = y;

		for(var i = 0; i < this.atoms.length; i++) {
			atom = this.atoms[i];

			atom.matrixStack[0]
				.identity()
				.rotateX(z * 2)
				.rotateY(z * 4)
				.rotateZ(z * 3);

			z += Math.PI;

			atom.pushMat(rotMat);

			atom.object.updateMatrix();
			atom.applyMats();

			atom.popMat();
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
