PEEKS.registerPage('Face', function(scene) {
	var page = new PEEKS.Asset({
        backgroundImage: '/images/bg_360_place.jpg',
    });

    if (scene) {
        scene.setArMode(true);

        var objectTracker = new tracking.ObjectTracker(['face'/*, 'eye', 'mouth'*/]);
        objectTracker.on('track', function(event) {
            if (event.data.length === 0) {
            } else {
                event.data.forEach(function(rect) {
                    console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
                });
            }
        });
        scene.arImage.tracker = objectTracker;
    };

    page.onUpdate = function() {
    };

	return page;
});
