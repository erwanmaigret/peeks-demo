PEEKS.registerPage('Face', function(scene) {
	var page = new PEEKS.Asset({
        backgroundImage: '/images/bg_360_place.jpg',
    });

    var canvas = page.addCanvas();

    var face = canvas.addImage({
        image: '/assets/hat_1.png',
        size: .5,
    });

    if (scene) {
        var objectTracker = new tracking.ObjectTracker(['face'/*, 'eye', 'mouth'*/]);
        objectTracker.on('track', function(event) {
            if (event.data.length >= 1) {
                var rect = event.data[0];
                var position = [rect.x / this.canvas.width - .5,
                                -rect.y / this.canvas.height + .5,
                                0];

                // Avoid false positive due to bad tracking and only accept in
                //  the 80% center square of the image
                if (Math.abs(position[0]) < .4 &&
                    Math.abs(position[1]) < .4) {

                    face.setPosition(position);
                }
            }
        });

        scene.setTracker(objectTracker);
    };

    page.onUpdate = function() {
        //this.getTracker
    };

	return page;
});
