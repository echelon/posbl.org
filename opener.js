
/**
 * Initialize.
 */
var init = function() 
{

	$('#main a').click(function() {
		openDiv();
	});
	$('.close a').click(function() {
		closeDiv();
	});

}

// XXX: Better put this elsewhere!
var INTERVAL = null;
var ANIMATION = null;

var openDiv = function()
{
	var div = $('#hidden')
		.width(0)
		.height(0)
		.addClass('opening')
		.appendTo('body')
		.show();

	var valInit = {width: 0, height: 0};
	var valFinal = {width: 500, height: 500};
	var time = 1500;

	var ANIMATION = new TWEEN.Tween(valInit)
		.to(valFinal, time)
		.easing(TWEEN.Easing.Elastic.Out)
		.onUpdate(function() {
			div.width(this.width)
				.height(this.height);
		})
		.onComplete(function() {
			clearInterval(INTERVAL);

			// Just to make sure it worked.
			div.width(valFinal.width)
				.height(valFinal.height);
		})
		.start();

	INTERVAL = setInterval(function() { TWEEN.update(); }, 1);
}

var closeDiv = function()
{
	clearInterval(INTERVAL);

	if(ANIMATION) {
		ANIMATION.stop();
		delete ANIMATION;
	}

	$('#hidden').hide();
}
