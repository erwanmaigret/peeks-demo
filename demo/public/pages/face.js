function PeeksTracker(video, image) {
    if (image) {
        var width = image.width;
        var height = image.height;

        if (width !== 0 && height !== 0) {
            var tracker = {
                init: PeeksTrackerInit,
                update: PeeksTrackerUpdate,
            };
            tracker.init(video, image);
            return tracker;
        }
    }
}

function PeeksTrackerInit(video, image) {
    this.videoCapture = new cv.VideoCapture(video);
    this.srcMat = new cv.Mat(image.height, image.width, cv.CV_8UC4);
    this.grayMat = new cv.Mat(image.height, image.width, cv.CV_8UC1);
    this.faceClassifier = new cv.CascadeClassifier();
    this.faceClassifier.load('haarcascade_frontalface_default.xml');
    this.eyeClassifier = new cv.CascadeClassifier();
    this.eyeClassifier.load('haarcascade_eye.xml');
}

function PeeksTrackerUpdate(video, image) {
    this.srcMat.data.set(image.data);
    cv.cvtColor(this.srcMat, this.grayMat, cv.COLOR_RGBA2GRAY);

    this.faces = [];
    this.eyes = [];
    var size;
    var faceVect = new cv.RectVector();
    var faceMat = new cv.Mat();
    var trackEyes = false;
    if (trackEyes) {
        cv.pyrDown(this.grayMat, faceMat);
        size = faceMat.size();
    } else {
        cv.pyrDown(this.grayMat, faceMat);
        if (image.width > 320) {
            cv.pyrDown(faceMat, faceMat);
        }
        size = faceMat.size();
    }
    this.faceClassifier.detectMultiScale(faceMat, faceVect);

    imageWidth = faceMat.size().width;
    imageHeight = faceMat.size().height;
    var faceCount = faceVect.size() > 1 ? 1 : faceVect.size();
    for (var i = 0; i < faceCount; i++) {
        var face = faceVect.get(i);
        this.faces.push({
            position: [
                (face.x + face.width / 2) / imageWidth - .5,
                -(face.y + face.height / 2) / imageHeight + .5,
                0],
            size: [
                face.width / imageWidth,
                face.height / imageHeight,
                1],
        });

        /*
        if (trackEyes) {
            var eyeVect = new cv.RectVector();
            var eyeMat = faceMat.roi(face);
            eyeClassifier.detectMultiScale(eyeMat, eyeVect);
            for (var i = 0; i < eyeVect.size(); i++) {
                var eye = eyeVect.get(i);
                this.eyes.push(new cv.Rect(face.x + eye.x, face.y + eye.y, eye.width, eye.height));
            }
            eyeMat.delete();
            eyeVect.delete();
        }
        */
    }
    faceMat.delete();
    faceVect.delete();

    return true;
}

PEEKS.registerPage('Face', function(scene) {
	var page = new PEEKS.Asset({
        backgroundImage: '',
        gyroscope: 'off',
    });

    page.initTracker = function(video, imageData) {
        if (imageData && !page.tracker) {
            page.tracker = PeeksTracker(video, imageData);
        }

        return page.tracker !== undefined;
    };

    page.updateTracker = function(video, imageData) {
        this.initTracker(video, imageData);
        if (this.tracker) {
            return this.tracker.update(video, imageData);
        }
    };

    if (scene) {
        scene.setArMode(true);
        var arView = scene.getArView();
        if (arView) {
            var tracking = false;
            arView.addStateButton({
                name: 'faceTrackingButton',
                image: '/images/icon_face_tracking.png',
                position: [.42, .42],
                size: .1,
                onButtonStateChange: function(state) {
                    tracking = state;
                },
            }).setButtonState(true);

            var video = scene.DOMarGetElement();
            if (video) {
                PEEKS.addExtensionListener('cv', function(cv) {
                    page.onUpdate = function() {
                        if (tracking) {
                            var imageData = scene.getArImageData();
                            if (this.updateTracker(video, imageData)) {
                                var faceCount = this.tracker.faces.length;
                                faceCount = faceCount > 1 ? 1 : faceCount;
                                for (var i = 0; i < faceCount; i++) {
                                    if (!arView.faceMask) {
                                        arView.faceMask = arView.addRing();
                                    }

                                    arView.faceMask.setPosition(this.tracker.faces[i].position);
                                    arView.faceMask.setSize(this.tracker.faces[i].size);
                                }
                            }
                        }
                    };
                });
            }
        }
    };

	return page;
});
