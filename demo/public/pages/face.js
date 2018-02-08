function PeeksTracker(width, height) {
    if (width !== 0 && height !== 0) {
        var tracker = {
            init: PeeksTrackerInit,
            update: PeeksTrackerUpdate,
        };
        tracker.init(width, height);
        return tracker;
    }
}


function PeeksTrackerInit(width, height) {
    this.videoCapture;
    this.srcMat;
    this.grayMat;
    this.faceClassifier;
    this.eyeClassifier;
}

function PeeksTrackerUpdate(image) {
    return true;
}

PEEKS.registerPage('Face', function(scene) {
	var page = new PEEKS.Asset({
        backgroundImage: '',
        gyroscope: 'off',
    });

    page.initTracker = function(imageData) {
        if (imageData && !page.tracker) {
            page.tracker = PeeksTracker();
        }

        return page.tracker !== undefined;
    };

    page.updateTracker = function(imageData) {
        this.initTracker(imageData);
        if (this.tracker) {
            return this.tracker.update(imageData);
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
                    var videoCapture;
                    var srcMat;
                    var grayMat;
                    var faceClassifier;
                    var eyeClassifier;
                    page.onUpdate = function() {
                        if (tracking) {
                            var imageData = scene.getArImageData();
                            if (this.updateTracker(imageData)) {
                                var videoWidth = imageData.width;
                                var videoHeight = imageData.height;
                                if (videoCapture === undefined) {
                                    videoCapture = new cv.VideoCapture(video);
                                    srcMat = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC4);
                                    grayMat = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC1);
                                    faceClassifier = new cv.CascadeClassifier();
                                    faceClassifier.load('haarcascade_frontalface_default.xml');
                                    eyeClassifier = new cv.CascadeClassifier();
                                    eyeClassifier.load('haarcascade_eye.xml');
                                }

                                srcMat.data.set(imageData.data);
                                cv.cvtColor(srcMat, grayMat, cv.COLOR_RGBA2GRAY);

                                var faces = [];
                                var eyes = [];
                                var size;
                                var faceVect = new cv.RectVector();
                                var faceMat = new cv.Mat();
                                var trackEyes = false;
                                if (trackEyes) {
                                    cv.pyrDown(grayMat, faceMat);
                                    size = faceMat.size();
                                } else {
                                    cv.pyrDown(grayMat, faceMat);
                                    if (videoWidth > 320) {
                                        cv.pyrDown(faceMat, faceMat);
                                    }
                                    size = faceMat.size();
                                }
                                faceClassifier.detectMultiScale(faceMat, faceVect);

                                var faceCount = faceVect.size() > 1 ? 1 : faceVect.size();
                                for (var i = 0; i < faceCount; i++) {
                                    var face = faceVect.get(i);
                                    faces.push(new cv.Rect(face.x, face.y, face.width, face.height));

                                    if (!arView.faceMask) {
                                        arView.faceMask = arView.addRing();
                                    }

                                    imageWidth = faceMat.size().width;
                                    imageHeight = faceMat.size().height;
                                    var position = [ (face.x + face.width / 2) / imageWidth - .5,
                                                    -(face.y + face.height / 2) / imageHeight + .5,
                                                    0];
                                    var size = [face.width / imageWidth,
                                                face.height / imageHeight,
                                                1];

                                    arView.faceMask.setPosition(position);
                                    arView.faceMask.setSize(size);

                                    if (trackEyes) {
                                        var eyeVect = new cv.RectVector();
                                        var eyeMat = faceMat.roi(face);
                                        eyeClassifier.detectMultiScale(eyeMat, eyeVect);
                                        for (var i = 0; i < eyeVect.size(); i++) {
                                            var eye = eyeVect.get(i);
                                            eyes.push(new cv.Rect(face.x + eye.x, face.y + eye.y, eye.width, eye.height));
                                        }
                                        eyeMat.delete();
                                        eyeVect.delete();
                                    }
                                }
                                faceMat.delete();
                                faceVect.delete();
                            }
                        }
                    };
                });
            }
        }
    };

	return page;
});
