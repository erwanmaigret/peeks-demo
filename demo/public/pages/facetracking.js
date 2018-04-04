PEEKS.TrackerFace = function() {
    this.position = [0, 0, 0];
    this.size = [1, 1, 1];
    this.lastUpdateTime = 0;
}

PEEKS.TrackerFace.prototype.update = function(position, size) {
    var time = (new Date()).getTime();
    var weight = (this.lastUpdateTime === 0) ? 1 : ((5 * (time - this.lastUpdateTime) / 1000));
    if (weight > 1) {
        weight = 1;
    }
    this.position = [
        this.position[0] * (1 - weight) + position[0] * weight,
        this.position[1] * (1 - weight) + position[1] * weight,
        this.position[2] * (1 - weight) + position[2] * weight
    ];
    this.size = [
        this.size[0] * (1 - weight / 2) + size[0] * weight / 2,
        this.size[1] * (1 - weight / 2) + size[1] * weight / 2,
        this.size[2] * (1 - weight / 2) + size[2] * weight / 2
    ];
    this.lastUpdateTime = time;
}

PEEKS.Tracker = function(video, image) {
    if (image) {
        var width = image.width;
        var height = image.height;

        if (width !== 0 && height !== 0) {
            this.videoCapture = new cv.VideoCapture(video);
            this.srcMat = new cv.Mat(image.height, image.width, cv.CV_8UC4);
            this.grayMat = new cv.Mat(image.height, image.width, cv.CV_8UC1);
            this.faceClassifier = new cv.CascadeClassifier();
            this.faceClassifier.load('haarcascade_frontalface_default.xml');
        }
    }

    this.trackedFaces = [];
}

PEEKS.Tracker.prototype.updateFace = function(faceI, position, size) {
    while (faceI >= this.trackedFaces.length) {
        this.trackedFaces.push(new PEEKS.TrackerFace());
    }
    var face = this.trackedFaces[faceI];
    this.trackedFaces[faceI].isHidden = false;
    face.update(position, size);
}

PEEKS.Tracker.prototype.update = function(video, image) {
    this.srcMat.data.set(image.data);
    cv.cvtColor(this.srcMat, this.grayMat, cv.COLOR_RGBA2GRAY);

    this.faces = [];
    this.eyes = [];
    var size;
    var faceVect = new cv.RectVector();
    var faceMat = new cv.Mat();

    cv.pyrDown(this.grayMat, faceMat);
    if (image.width > 320) {
        cv.pyrDown(faceMat, faceMat);
    }
    size = faceMat.size();

    this.faceClassifier.detectMultiScale(faceMat, faceVect);

    for (var i = 0; i < this.trackedFaces.length; i++) {
        this.trackedFaces[i].isHidden = true;
    }

    var imageWidth = faceMat.size().width;
    var imageHeight = faceMat.size().height;
    var faceCount = faceVect.size();
    var xFactor = (imageWidth > imageHeight) ? imageWidth / imageHeight : 1;
    var yFactor = (imageWidth < imageHeight) ? imageHeight / imageWidth : 1;
    var faceI = 0;
    for (var i = 0; i < faceCount; i++) {
        var face = faceVect.get(i);
        var facePosition = [
            xFactor * (-(face.x + face.width / 2) / imageWidth + .5),
            yFactor * (-(face.y + face.height / 2) / imageHeight + .5), 0];
        var faceSize = [
            xFactor * face.width / imageWidth,
            yFactor * face.height / imageHeight, 1];

        if (faceSize[0] > .07 && faceSize[1] > .07) {
            this.faces.push({
                position: facePosition,
                size: faceSize,
            });

            this.updateFace(faceI++, facePosition, faceSize);
        }
    }
    faceMat.delete();
    faceVect.delete();

    return true;
}

PEEKS.registerPage('peeks.demo.facetracking', function(scene) {
	var page = new PEEKS.Asset({
        backgroundImage: '',
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
