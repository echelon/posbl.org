
// Prevent simultaneous rotations 
var ROTATE_LOCK = false;

var rotate_x1 = function()
{
	if(ROTATE_LOCK) { return; }
	ROTATE_LOCK = true;
	
	var oldAngle = {x: 0, y:0, z:0};
	var newAngle = {
		x: oldAngle.x + Math.PI/2, 
		y: oldAngle.y + Math.PI/2, 
		z: oldAngle.z + Math.PI/2
	};

	rotateReset();

	// Mark x1 rotational group as rotating. 
	rubik.rubik[0][0][0].isRotating = true;
	rubik.rubik[0][0][1].isRotating = true;
	rubik.rubik[0][0][2].isRotating = true;
	rubik.rubik[0][1][0].isRotating = true;
	rubik.rubik[0][1][1].isRotating = true;
	rubik.rubik[0][1][2].isRotating = true;
	rubik.rubik[0][2][0].isRotating = true;
	rubik.rubik[0][2][1].isRotating = true;
	rubik.rubik[0][2][2].isRotating = true;

	// Swap cube assignments on callback.
	var swapCubes = function() {
		var t;
		t = rubik.rubik[0][2][0];
		rubik.rubik[0][2][0] = rubik.rubik[0][0][0];
		rubik.rubik[0][0][0] = rubik.rubik[0][0][2];
		rubik.rubik[0][0][2] = rubik.rubik[0][2][2];
		rubik.rubik[0][2][2] = t;

		t = rubik.rubik[0][2][1];
		rubik.rubik[0][2][1] = rubik.rubik[0][1][0];
		rubik.rubik[0][1][0] = rubik.rubik[0][0][1];
		rubik.rubik[0][0][1] = rubik.rubik[0][1][2];
		rubik.rubik[0][1][2] = t;
	}

	installMatrices();
	installTween(newAngle, oldAngle, 'x', swapCubes);
}

var rotate_x2 = function()
{
	if(ROTATE_LOCK) { return; }
	ROTATE_LOCK = true;
	
	var oldAngle = {x: 0, y:0, z:0};
	var newAngle = {
		x: oldAngle.x + Math.PI/2, 
		y: oldAngle.y + Math.PI/2, 
		z: oldAngle.z + Math.PI/2
	};

	rotateReset();

	// Mark x2 rotational group as rotating. 
	rubik.rubik[1][0][0].isRotating = true;
	rubik.rubik[1][0][1].isRotating = true;
	rubik.rubik[1][0][2].isRotating = true;
	rubik.rubik[1][1][0].isRotating = true;
	rubik.rubik[1][1][1].isRotating = true;
	rubik.rubik[1][1][2].isRotating = true;
	rubik.rubik[1][2][0].isRotating = true;
	rubik.rubik[1][2][1].isRotating = true;
	rubik.rubik[1][2][2].isRotating = true;

	// Swap cube assignments on callback.
	var swapCubes = function() {
		var t;
		t = rubik.rubik[1][2][2];
		rubik.rubik[1][2][2] = rubik.rubik[1][2][0];
		rubik.rubik[1][2][0] = rubik.rubik[1][0][0];
		rubik.rubik[1][0][0] = rubik.rubik[1][0][2];
		rubik.rubik[1][0][2] = t;

		t = rubik.rubik[1][1][2];
		rubik.rubik[1][1][2] = rubik.rubik[1][2][1];
		rubik.rubik[1][2][1] = rubik.rubik[1][1][0];
		rubik.rubik[1][1][0] = rubik.rubik[1][0][1];
		rubik.rubik[1][0][1] = t;
	}

	installMatrices();
	installTween(newAngle, oldAngle, 'x', swapCubes);
}

var rotate_x3 = function()
{
	if(ROTATE_LOCK) { return; }
	ROTATE_LOCK = true;
	
	var oldAngle = {x: 0, y:0, z:0};
	var newAngle = {
		x: oldAngle.x + Math.PI/2, 
		y: oldAngle.y + Math.PI/2, 
		z: oldAngle.z + Math.PI/2
	};

	rotateReset();

	// Mark x3 rotational group as rotating. 
	rubik.rubik[2][0][0].isRotating = true;
	rubik.rubik[2][0][1].isRotating = true;
	rubik.rubik[2][0][2].isRotating = true;
	rubik.rubik[2][1][0].isRotating = true;
	rubik.rubik[2][1][1].isRotating = true;
	rubik.rubik[2][1][2].isRotating = true;
	rubik.rubik[2][2][0].isRotating = true;
	rubik.rubik[2][2][1].isRotating = true;
	rubik.rubik[2][2][2].isRotating = true;

	// Swap cube assignments on callback.
	var swapCubes = function() {
		var t;
		t = rubik.rubik[2][2][0];
		rubik.rubik[2][2][0] = rubik.rubik[2][0][0];
		rubik.rubik[2][0][0] = rubik.rubik[2][0][2];
		rubik.rubik[2][0][2] = rubik.rubik[2][2][2];
		rubik.rubik[2][2][2] = t;

		t = rubik.rubik[2][1][2];
		rubik.rubik[2][1][2] = rubik.rubik[2][2][1];
		rubik.rubik[2][2][1] = rubik.rubik[2][1][0];
		rubik.rubik[2][1][0] = rubik.rubik[2][0][1];
		rubik.rubik[2][0][1] = t;
	}

	installMatrices();
	installTween(newAngle, oldAngle, 'x', swapCubes);
}

var rotate_y1 = function()
{
	if(ROTATE_LOCK) { return; }
	ROTATE_LOCK = true;
	
	var oldAngle = {x: 0, y:0, z:0};
	var newAngle = {
		x: oldAngle.x + Math.PI/2, 
		y: oldAngle.y + Math.PI/2, 
		z: oldAngle.z + Math.PI/2
	};

	rotateReset();

	// Mark y1 rotational group as rotating. 
	rubik.rubik[0][2][0].isRotating = true;
	rubik.rubik[0][2][1].isRotating = true;
	rubik.rubik[0][2][2].isRotating = true;
	rubik.rubik[1][2][0].isRotating = true;
	rubik.rubik[1][2][1].isRotating = true;
	rubik.rubik[1][2][2].isRotating = true;
	rubik.rubik[2][2][0].isRotating = true;
	rubik.rubik[2][2][1].isRotating = true;
	rubik.rubik[2][2][2].isRotating = true;

	// Swap cube assignments on callback.
	var swapCubes = function() {
		var t;
		t = rubik.rubik[0][2][0];
		rubik.rubik[0][2][0] = rubik.rubik[2][2][0];
		rubik.rubik[2][2][0] = rubik.rubik[2][2][2];
		rubik.rubik[2][2][2] = rubik.rubik[0][2][2];
		rubik.rubik[0][2][2] = t;

		t = rubik.rubik[0][2][1];
		rubik.rubik[0][2][1] = rubik.rubik[1][2][0];
		rubik.rubik[1][2][0] = rubik.rubik[2][2][1];
		rubik.rubik[2][2][1] = rubik.rubik[1][2][2];
		rubik.rubik[1][2][2] = t;
	}

	installMatrices();
	installTween(newAngle, oldAngle, 'y', swapCubes);
}

var rotate_y2 = function()
{
	if(ROTATE_LOCK) { return; }
	ROTATE_LOCK = true;
	
	var oldAngle = {x: 0, y:0, z:0};
	var newAngle = {
		x: oldAngle.x + Math.PI/2, 
		y: oldAngle.y + Math.PI/2, 
		z: oldAngle.z + Math.PI/2
	};

	rotateReset();

	// Mark y2 rotational group as rotating. 
	rubik.rubik[0][1][0].isRotating = true;
	rubik.rubik[0][1][1].isRotating = true;
	rubik.rubik[0][1][2].isRotating = true;
	rubik.rubik[1][1][0].isRotating = true;
	rubik.rubik[1][1][1].isRotating = true;
	rubik.rubik[1][1][2].isRotating = true;
	rubik.rubik[2][1][0].isRotating = true;
	rubik.rubik[2][1][1].isRotating = true;
	rubik.rubik[2][1][2].isRotating = true;

	// Swap cube assignments on callback.
	var swapCubes = function() {
		var t;
		t = rubik.rubik[0][1][0];
		rubik.rubik[0][1][0] = rubik.rubik[2][1][0];
		rubik.rubik[2][1][0] = rubik.rubik[2][1][2];
		rubik.rubik[2][1][2] = rubik.rubik[0][1][2];
		rubik.rubik[0][1][2] = t;

		t = rubik.rubik[0][1][1];
		rubik.rubik[0][1][1] = rubik.rubik[1][1][0];
		rubik.rubik[1][1][0] = rubik.rubik[2][1][1];
		rubik.rubik[2][1][1] = rubik.rubik[1][1][2];
		rubik.rubik[1][1][2] = t;
	}

	installMatrices();
	installTween(newAngle, oldAngle, 'y', swapCubes);
}

var rotate_y3 = function()
{
	if(ROTATE_LOCK) { return; }
	ROTATE_LOCK = true;
	
	var oldAngle = {x: 0, y:0, z:0};
	var newAngle = {
		x: oldAngle.x + Math.PI/2, 
		y: oldAngle.y + Math.PI/2, 
		z: oldAngle.z + Math.PI/2
	};

	rotateReset();

	// Mark y3 rotational group as rotating. 
	rubik.rubik[0][0][0].isRotating = true;
	rubik.rubik[0][0][1].isRotating = true;
	rubik.rubik[0][0][2].isRotating = true;
	rubik.rubik[1][0][0].isRotating = true;
	rubik.rubik[1][0][1].isRotating = true;
	rubik.rubik[1][0][2].isRotating = true;
	rubik.rubik[2][0][0].isRotating = true;
	rubik.rubik[2][0][1].isRotating = true;
	rubik.rubik[2][0][2].isRotating = true;

	// Swap cube assignments on callback.
	var swapCubes = function() {
		var t;
		t = rubik.rubik[0][0][0];
		rubik.rubik[0][0][0] = rubik.rubik[2][0][0];
		rubik.rubik[2][0][0] = rubik.rubik[2][0][2];
		rubik.rubik[2][0][2] = rubik.rubik[0][0][2];
		rubik.rubik[0][0][2] = t;

		t = rubik.rubik[0][0][1];
		rubik.rubik[0][0][1] = rubik.rubik[1][0][0];
		rubik.rubik[1][0][0] = rubik.rubik[2][0][1];
		rubik.rubik[2][0][1] = rubik.rubik[1][0][2];
		rubik.rubik[1][0][2] = t;
	}

	installMatrices();
	installTween(newAngle, oldAngle, 'y', swapCubes);
}


