// XXX/NOTE : Will get out of alignment if called again before 
// animation finishes
var oldAngle = {x: 0, y:0, z:0};
var lock = false;
function move() 
{
	if(lock) {
		return;
	}
	lock = true;

	var block = blocks[0];

	//var oldAngle = {x: 0, y:0, z:0};
	var newAngle = {
		x: oldAngle.x + Math.PI/2, 
		y: oldAngle.y + Math.PI/2, 
		z: oldAngle.z + Math.PI/2
	};

	//matStack.pushNew();
	//var mat = matStack.top();

	// Push a new matrix. 
	// Must be popped?  OR NO?
	for(var i = 0; i < blocks.length; i++) {
		var block = blocks[i];
		if(!block.isRotating) {
			continue;
		}
		block.pushMat(new THREE.Matrix4());
	}

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

				switch(ROTATE_TYPE) {
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
				rubik.position();
			}, 600);
		})
		.start();
}


