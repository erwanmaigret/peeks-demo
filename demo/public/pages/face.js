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
                position: [.42, .42],
                size: .1,
                onButtonStateChange: function(state) {
                    if (state) {
                        addTracker(scene);
                    } else {
                        clearTracker(scene);
                    }
                },
            });

            var video = scene.DOMarGetElement();
            if (video) {
                PEEKS.addExtensionListener('cv', function(cv) {
                    var videoCapture = new cv.VideoCapture(video);
                    var videoWidth = video.width;
                    var videoHeight = video.height;
                    if (videoWidth > 0 && videoHeight > 0) {
                        var srcMat = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC4);
                        var grayMat = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC1);

                        var faceClassifier = new cv.CascadeClassifier();
                        faceClassifier.load('haarcascade_frontalface_default.xml');

                        var eyeClassifier = new cv.CascadeClassifier();
                        eyeClassifier.load('haarcascade_eye.xml');

                        var canvasInput = document.createElement('canvas');
                        canvasInput.width = videoWidth;
                        canvasInput.height = videoHeight;
                        var canvasInputCtx = canvasInput.getContext('2d');
                        page.onUpdate = function() {
                            canvasInputCtx.drawImage(video, 0, 0, videoWidth, videoHeight);
                            let imageData = scene.getArImageData();
                            srcMat.data.set(imageData.data);
                            cv.cvtColor(srcMat, grayMat, cv.COLOR_RGBA2GRAY);

                            let faces = [];
                            let eyes = [];
                            let size;
                            let faceVect = new cv.RectVector();
                            let faceMat = new cv.Mat();
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
                            for (let i = 0; i < faceVect.size(); i++) {
                                let face = faceVect.get(i);
                                faces.push(new cv.Rect(face.x, face.y, face.width, face.height));
                                if (trackEyes) {
                                    let eyeVect = new cv.RectVector();
                                    let eyeMat = faceMat.roi(face);
                                    eyeClassifier.detectMultiScale(eyeMat, eyeVect);
                                    for (let i = 0; i < eyeVect.size(); i++) {
                                        let eye = eyeVect.get(i);
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
                });
            }
        }
    };

	return page;
});
