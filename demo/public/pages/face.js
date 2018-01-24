PEEKS.registerPage('Face', function() {
	var page = new PEEKS.Asset({
        backgroundImage: '/images/bg_360_place.jpg',
    });

    var colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);

    colors.on('track', function(event) {
        if (event.data.length === 0) {
            console.log('???');
            // No colors were detected in this frame.
        } else {
            event.data.forEach(function(rect) {
            console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
            });
        }
    });
    tracking.track('#myVideo', colors);

	return page;
});
