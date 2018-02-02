function addTracker(scene) {
    var arView = scene.getArView();
    var tracker = new tracking.ObjectTracker(['face']);
    //var tracker = new tracking.ObjectTracker(['face'/*, 'eye', 'mouth'*/]);
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    tracker.on('track', function(event) {
        if (event.data.length >= 1) {
            if (!arView.bbox) {
                arView.bbox = arView.addView({
                   alpha: .8,
               });
            }

            var rect = event.data[0];
            var position = [ (rect.x) / this.canvas.width - .5,
                            -(rect.y + rect.height / 2) / this.canvas.height + .5,
                            0];
            var size = [rect.width / this.canvas.width,
                        rect.height / this.canvas.height,
                        1];
            //size = [.1, .1 ,.1];

            // Avoid false positive due to bad tracking and only accept in
            //  the 80% center square of the image
            if (Math.abs(position[0]) < .4 &&
                Math.abs(position[1]) < .4) {

                arView.bbox.setPosition(position);
                arView.bbox.setSize(size);
            }
        }
    });
    scene.setTracker(tracker);
}

function clearTracker(scene) {
    var tracker = scene.getTracker();
    var arView = scene.getArView();
    if (tracker && arView) {
        if (arView.bbox) {
            arView.bbox.destroy();
            arView.bbox = undefined;
        }
        scene.setTracker(null);
    }
}

PEEKS.registerPage('Face', function(scene) {
	var page = new PEEKS.Asset({
        backgroundImage: '',
        gyroscope: 'off',
    });

    if (scene) {
        scene.setArMode(true);
        var arView = scene.getArView();
        if (arView) {
            arView.addStateButton({
                name: 'faceTrackingButton',
                image: '/images/icon_face_tracking.png',
                position: [0, -.43],
                size: .1,
                onButtonStateChange: function(state) {
                    if (state) {
                        addTracker(scene);
                    } else {
                        clearTracker(scene);
                    }
                },
            });
        }
    };

	return page;
});
