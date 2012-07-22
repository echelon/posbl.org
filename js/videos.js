/**
 * Install Youtube video thumbnail animations and links
 */
var installVideos = function()
{
	var div = $('#videos');
	div.html('');

	var makeUrl = function(id, num) {
		return 'http://img.youtube.com/vi/' + id + '/' + num + '.jpg';
	}

	var setFrame = function(img, frame) {
		var id = $(img).data('id');
		$(img).attr('src', makeUrl(id, frame));
		$(img).data('state', frame);
	}

	var nextFrame = function(img) {
		var state = parseInt($(img).data('state'));
		var next = (state) % 3 + 1;
		setFrame(img, next);
	}

	for(var i = 0; i < VIDEOS.length; i++) {
		var video = VIDEOS[i];

		var img = $('<img src="' + makeUrl(video, 1) + '">')
			.data('state', 1)
			.data('id', video)
			.mouseenter(function() {
				var that = this;
				nextFrame(that);
				$(this).addClass('hover')
					.data('interval', 
						setInterval(function(){ nextFrame(that); }, 600));
			})
			.mouseleave(function() {
				clearInterval($(this).data('interval'));
				setFrame(this, 1);
				$(this).removeClass('hover');
			});

		div.append($('<a href="http://youtube.com/watch?v=' + video + '"></a>')
					.append(img));
	}
}

/**
 * Install presentations
 */
var installPresentations = function()
{
	var div = $('#presentations');
	div.html('');

	for(var i = 0; i < PRESENTATIONS.length; i++) {
		var pre = PRESENTATIONS[i];

		var item = $('<div>')
			.addClass('item')
			.append($('<div>')
					.addClass('itemimg')
					.append($('<a>')
						.attr('href', pre.url)
						.html($('<img>')
							.attr('src', pre.img)
						)
					)
			)
			.append($('<div>')
					.addClass('itemdesc')
					.append($('<div>')
						.addClass('itemtitle')
						.append($('<a>')
							.html(pre.title)
							.attr('href', pre.url)
						)
						.append(' ')
						.append($('<span>')
							.addClass('itemdate')
							.html(pre.date)
						)
					)
					.append(pre.descr)
			);

		div.append(item);
	}
}
