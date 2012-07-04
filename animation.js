
// Prevent simultaneous rotations 
var ROTATE_LOCK = false;

var oldAngle = {x: 0, y:0, z:0};

/* ========================================================== */

// Mark all as non-rotating. 
var rotateReset = function() 
{
	for(var i = 0; i < blocks.length; i++) {
		blocks[i].isRotating = false;
	}
}

// Install new matrix in rotating blocks' stacks
var installMatrices = function()
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

var installTween = function(newAngle, axis)
{
	new TWEEN.Tween(oldAngle)
		.to(newAngle, 600)
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
			// Lock to prevent two tweens at once. 
			lock = false;

			// TODO: Do this immediately from now on. 
			setTimeout(function() {
				for(var i = 0; i < blocks.length; i++) {
					var block = blocks[i];
					if(!block.isRotating) {
						continue;
					}
					// XXX: Method 1
					// XXX: Pop the mat we pushed. 
					//block.popMat(); // XXX: Temp comment out
				}
				// XXX: Method 2
				// Reposition everything. 
				//rubik.position(); // XXX COMMENTED OUT COMMENTED OUT TEMP
			}, 600);
		})
		.start();
}

// XXX/NOTE : Will get out of alignment if called again before 
// animation finishes
var lock = false;
function move() 
{
	rotate_x1();
}


