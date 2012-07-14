
// Based on 1BD1.pdb
var POSITIONS = [
	-14.290, 1.968, 11.705, // 1
	-14.107, 3.082, 12.638, // 2
	-12.616, 3.326, 12.709, // 3
	-12.009, 2.067, 12.902, // 4
	-11.940, 3.869, 11.443, // 5
	-11.536, 5.205, 11.751, // 6
	-10.838, 2.891, 11.061, // 7
	-10.661, 2.225, 12.395, // 8
	-10.223, 0.834, 12.445, // 9
	-8.948,  0.594, 13.005, // 10
	-8.211,   1.491,  13.406,
	-8.557,  -0.724,  13.070,
	-9.368,  -1.723,  12.650,
	-8.886,  -2.972,  12.747,
	-10.638,  -1.425,  12.056,
	-11.037,  -0.150,  12.019,
	-11.308,   6.217,  10.551,
	-11.553,   7.453,  11.222,
	-11.784,   5.373,   9.387,
	 -9.684,   6.146,  10.429,
	 -8.720,   6.421,  11.496,
	 -7.398,   5.949,  10.939,
	 -7.357,   4.537,  10.902,
	 -7.146,   6.316,   9.468,
	 -5.812,   6.765,   9.269,
	 -7.427,   5.029,   8.715,
	 -6.809,   4.027,   9.667,
	 -7.170,   2.623,   9.540,
	 -6.282,   1.718,  10.134,
	 -5.287,   2.105,  10.762,
	 -6.572,   0.382,  10.121,
	 -7.715,  -0.071,   9.537,
	 -7.900,  -1.374,   9.527,
	 -8.582,   0.836,   8.883,
	 -8.290,   2.136,   8.930,
	 -5.445,   8.249,   9.300,
	 -5.947,   9.046,  10.408,
	-5.425 ,  8.748 ,  7.907,
	 -3.819,   8.073,   9.661,
	 -3.362,   7.797,  11.008,
	 -2.077,   7.048,  10.837,
	 -2.311,   5.763,  10.292,
	-1.016 ,  7.670 ,  9.891,
	 0.235 ,  7.642 , 10.600,
	-1.101 ,  6.862 ,  8.597,
	-1.601 ,  5.529 ,  9.055,
	-2.635 ,  4.907 ,  8.221,
	-3.564 ,  5.493 ,  7.422,
	-4.350 ,  4.652 ,  6.824,
	-3.955 ,  3.426 ,  7.350,
	-4.421 ,  2.116 ,  7.138,
	-5.442 ,  1.807 ,  6.330,
	-3.670 ,  1.175 ,  7.742,
	-2.642 ,  1.392 ,  8.572,
	-2.183 ,  2.610 ,  8.862,
	-2.870 ,  3.569 ,  8.190,
	 1.695 ,  8.129 , 10.081,
	 2.491 ,  7.894 , 11.303,
	 1.479 ,  9.457 ,  9.546,
	 2.044 ,  7.104 ,  9.048,
	 2.539 ,  5.812 ,  9.459,
	 2.808 ,  5.004 ,  8.202,
	 1.510 ,  4.598 ,  7.714,
	 3.483 ,  5.661 ,  7.014,
	 4.395 ,  4.774 ,  6.395,
	 2.295 ,  6.000 ,  6.090,
	 1.578 ,  4.657 ,  6.296,
	 0.272 ,  4.598 ,  5.670,
	-0.398 ,  5.631 ,  5.086,
	-1.522 ,  5.261 ,  4.501,
	-1.558 ,  3.880 ,  4.700,
	-2.500 ,  2.863 ,  4.336,
	-3.557 ,  3.082 ,  3.714,
	-2.111 ,  1.583 ,  4.669,
	-0.966 ,  1.315 ,  5.331,
	-0.760 ,  0.054 ,  5.695,
	-0.094 ,  2.220 ,  5.751,
	-0.412 ,  3.459 ,  5.394,
	 5.995 ,  5.029 ,  6.277,
	 6.272 ,  5.615 ,  7.490,
	 6.048 ,  5.957 ,  5.110,
	 6.388 ,  3.515 ,  5.988,
	5.988  , 2.516  , 6.949,
	 5.747 ,  1.208 ,  6.227,
	 4.428 ,  1.218 ,  5.692,
	 6.713 ,  0.956 ,  5.079,
	 7.130 , -0.415 ,  5.023,
	 5.936 ,  1.402 ,  3.826,
	 4.511 ,  1.068 ,  4.255,
	3.519  , 1.935  , 3.580,
	 3.481 ,  3.278 ,  3.381,
	 2.427 ,  3.724 ,  2.799,
	1.708  , 2.554  , 2.572,
	 0.427 ,  2.353 ,  1.981,
	-0.299 ,  3.242 ,  1.540,
	 0.071 ,  1.025 ,  1.910,
	 0.795 ,  0.013 ,  2.432,
	 0.270 , -1.188 ,  2.327,
	 1.982 ,  0.148 ,  3.026,
	 2.348 ,  1.455 ,  3.039,
	 7.903 , -1.366 ,  3.845,
	 8.750 , -2.167 ,  4.756,
	 8.479 , -0.403 ,  2.886,
	 6.710 , -2.156 ,  3.291,
	 5.553 , -2.822 ,  3.789,
	 4.774 , -3.523 ,  2.666,
	 3.844 , -2.671 ,  2.028,
	5.646  ,-4.134  , 1.540,
	 5.211 , -5.475 ,  1.291,
	 5.501 , -3.153 ,  0.389,
	 4.112 , -2.618 ,  0.600,
	 3.924 , -1.203 ,  0.252,
	 2.710 , -0.930 , -0.376,
	 1.930 , -1.863 , -0.616,
	 2.439 ,  0.380 , -0.663,
	 3.290 ,  1.359 , -0.386,
	 2.952 ,  2.608 , -0.691,
	 4.560 ,  1.065 ,  0.221,
	 4.844 , -0.212 ,  0.513,
	 6.038 , -6.668 ,  0.523,
	 5.510 , -7.871 ,  1.151,
	 7.265 , -6.064 ,  0.137,
	 5.130 , -6.502 , -0.942,
	 3.666 , -6.472 , -0.846,
	 3.214 , -6.018 , -2.227,
	 3.385 , -4.649 , -2.364,
	 4.061 , -6.625 , -3.369,
	 3.287 , -7.614 , -4.034,
	 4.461 , -5.434 , -4.246,
	 3.607 , -4.313 , -3.776,
	 4.144 , -2.962 , -3.680,
	 3.368 , -1.932 , -4.202,
	 2.306 , -2.218 , -4.768,
	 3.824 , -0.647 , -4.034,
	 4.976 , -0.385 , -3.384,
	 5.377 ,  0.874 , -3.222,
	 5.775 , -1.440 , -2.877,
	 5.288 , -2.707 , -2.989,
	 3.754 , -8.452 , -5.282,
	 2.919 , -9.579 , -5.110,
	 5.199 , -8.621 , -5.303,
	 3.240 , -7.665 , -6.638,
	 1.833 , -7.420 , -6.896,
	 1.792 , -6.449 , -8.053,
	 2.296 , -5.180 , -7.733,
	 2.647 , -6.933 , -9.229,
	 1.859 , -6.783 ,-10.417,
	 3.881 , -6.072 , -9.157,
	 3.238 , -4.764 , -8.703,
	 4.157 , -3.801 , -8.128,
	3.774  ,-2.457  ,-8.196,
	 2.745 , -2.098 , -8.765,
	 4.566 , -1.509 , -7.617,
	 5.719 , -1.876 , -6.977,
	6.393  ,-0.964  ,-6.488,
	 6.103 , -3.253 , -6.902,
	 7.385 , -3.699 , -6.224,
	 5.296 , -4.178 , -7.484,
	 0.949 , -7.795 ,-11.235,
	 0.173 , -8.636 ,-10.292,
	 1.977 , -8.641 ,-11.891,
	-0.032 , -7.053 ,-12.146,
	-0.929 , -6.118 ,-11.527,
	-1.156 , -4.978 ,-12.501,
	-0.108 , -4.050 ,-12.373,
	-1.101 , -5.220 ,-14.003,
	-1.831 , -4.124 ,-14.585,
	 0.330 , -5.098 ,-14.439,
	 0.779 , -3.982 ,-13.515,
	 2.179 , -4.081 ,-13.002,
	 2.965 , -5.187 ,-12.927,
	 4.131 , -4.958 ,-12.395,
	 4.131 , -3.630 ,-12.031,
	 5.122 , -2.773 ,-11.496,
	 6.179 , -3.128 ,-11.002,
	 4.762 , -1.476 ,-11.369,
	 3.529 , -1.017 ,-11.754,
	 3.206 ,  0.280 ,-11.630,
	 2.595 , -1.761 ,-12.358,
	 2.940 , -3.072 ,-12.470,
	-2.449 , -4.438 ,-16.084,
	-3.770 , -3.844 ,-16.028,
	-2.339 , -5.809 ,-16.417,
	-1.370 , -3.416 ,-16.856,
	-1.654 , -2.019 ,-16.610,
	-0.479 , -1.216 ,-17.170,
	 0.610 , -1.402 ,-16.311,
	-0.044 , -1.659 ,-18.557,
	-0.307 , -0.668 ,-19.574,
	1.441  ,-1.917 ,-18.479,
	 1.799 , -1.443 ,-17.101,
	 2.842 , -2.314 ,-16.523,
	 3.013 , -3.660 ,-16.563,
	 4.069 , -4.117 ,-15.991,
	 4.661 , -2.934 ,-15.493,
	 5.859 , -2.717 ,-14.750,
	 6.675 , -3.541 , -14.345,
	 6.123 , -1.379 , -14.507,
	5.266  ,-0.372 , -14.880,
	 5.690 ,  0.821 , -14.535,
	 4.122 , -0.510 ,-15.527,
	 3.890 , -1.817 ,-15.795
]

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
			blending: THREE.AdditiveBlending,
			//blending: THREE.NormalBlending,
			//blending: THREE.AdditiveAlphaBlending,
			//blending: THREE.SubtractiveBlending,
			opacity: 0.9,
			//wireframe: true
		});

		this.object = new THREE.Mesh(
			new THREE.CubeGeometry(rad, rad, rad),
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
		this.matrixStack = [this.object.matrix.clone()];

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


	var size = 15;

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
		if(i > 500) {
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
			atom.matrixStack[0]
				.identity()
				.translate(coords);

			// XXX: Probably a good thing to do for added
			// certainty. This will remove any 'tweening' 
			// stacks.
			// XXX: OR actually, bad... once rotation of cube 
			// faces becomes important. 
			while(atom.matrixStack.length >= 2) {
				atom.matrixStack.pop();
			}
		}
	}

	this.position(15);

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
	this.render = function(rotMat) {
		var atom;

		for(var i = 0; i < this.atoms.length; i++) {
			atom = this.atoms[i];

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
