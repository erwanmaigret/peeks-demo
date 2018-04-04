PEEKS.registerPage('example', function(scene) {
    var page = new PEEKS.Asset({
        gyroscope: 'off',
    });

    page.initTracker = function(video, imageData) {
        if (imageData && !page.tracker) {
            page.tracker = new PEEKS.Tracker(video, imageData);
        }

        return page.tracker !== undefined;
    };

    page.updateTracker = function(video, imageData) {
        this.initTracker(video, imageData);
        if (this.tracker) {
            return this.tracker.update(video, imageData);
        }
    };

    var canvas = page.addCanvas();

    var face = canvas.addAsset({ position: [0, -.4], size: .1 });
    face.addView({ alpha: .5 });

    if (scene) {
        scene.setArMode(true);
        var arView = scene.getArView();
        if (arView) {
            var video = scene.DOMarGetElement();
            if (video) {
                PEEKS.addExtensionListener('cv', function(cv) {
                    page.onUpdate = function() {
                        if (this.updateTracker(video, scene.getArImageData())) {
                            if (this.tracker.trackedFaces.length > 0) {
                                face.setPosition(this.tracker.trackedFaces[0].position);
                                face.setSize(this.tracker.trackedFaces[0].size);
                            }
                        }
                    };
                });
            }
        }
    };

    return page;
});

PEEKS.start(window, 'example');
