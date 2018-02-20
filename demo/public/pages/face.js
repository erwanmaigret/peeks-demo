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
            this.eyeClassifier = new cv.CascadeClassifier();
            this.eyeClassifier.load('haarcascade_eye.xml');
        }
    }

    this.trackedFaces = [];
}

// Prepare faces for updates
PEEKS.Tracker.prototype.updateStart = function() {

}

// Cleanup undetected faces
PEEKS.Tracker.prototype.updateEnd = function() {

}

// Update the most appropriate face
PEEKS.Tracker.prototype.updateFace = function(faceI, position, size) {
    while (faceI >= this.trackedFaces.length) {
        this.trackedFaces.push(new PEEKS.TrackerFace());
    }
    var face = this.trackedFaces[faceI];
    this.trackedFaces[faceI].isHidden = false;
    face.update(position, size);
}

PEEKS.Tracker.prototype.update = function(video, image) {
    this.updateStart();

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

        if (faceSize[0] > .2 && faceSize[1] > .2) {
            this.faces.push({
                position: facePosition,
                size: faceSize,
            });

            this.updateFace(faceI++, facePosition, faceSize);
        }

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

    this.updateEnd();

    return true;
}

var assetDb = [
    {
        image: '/assets/asset_glasses_1.png',
        position: [0, .15, 0],
        size: .82,
    },
    {
        image: '/assets/asset_shirt_2.png',
        position: [.05, -1.75, 0],
        size: 2.8,
    },
    {
        image: '/assets/glasses/glasses_photo1.png',
        position: [0, .1, 0],
        size: .8,
    },
    {
        image: '/assets/asset_moustache_2.png',
        position: [0, -.15, 0],
        size: .7,
    },
    {
        image: '/assets/asset_glasses_5.png',
        position: [0, .15, 0],
        size: .82,
    },
    {
        image: '/assets/asset_hat_4.png',
        position: [0, .65, 0],
        size: 1.3,
    },
    {
        image: '/assets/asset_glasses_4.png',
        position: [0, .15, 0],
        size: .82,
    },
    {
        image: '/assets/asset_moustache_1.png',
        position: [0, -.15, 0],
        size: .7,
    },
    /*
    {
        image: '/assets/asset_headset_1.png',
        position: [0, .15, 0],
        size: .9,
    },
    */
    {
        image: '/assets/asset_glasses_3.png',
        position: [0, .15, 0],
        size: .82,
    },
    {
        image: '/assets/asset_glasses_5.png',
        position: [0, .15, 0],
        size: .82,
    },
    {
        image: '/assets/asset_hat_2.png',
        position: [0, .65, 0],
        size: 1.6,
    },
    {
        image: '/assets/asset_glasses_2.png',
        position: [0, .15, 0],
        size: .82,
    },
    {
        image: '/assets/asset_hat_1.png',
        position: [0, .6, 0],
        size: 1.2,
    },
    {
        image: '/assets/asset_glasses_1.png',
        position: [0, .15, 0],
        size: .82,
    },
    {
        image: '/assets/asset_shirt_1.png',
        position: [.05, -1.8, 0],
        size: 3.2,
    },
    /*
    {
        image: '/assets/asset_beard_1.png',
        position: [0, -.25, 0],
        size: 0.7,
    },*/
    {
        image: '/assets/asset_bowtie_1.png',
        position: [0, -.7, 0],
        size: .6,
    },




    /*
    {
        geometry: '/assets/glasses_2_frame_front.obj',
        rotation: [0, -90, 0],
        position: [0, -.05, 0],
        size: .13,
    },
    */
    /*
    {
        geometry: '/assets/glasses/glasses1_frame.obj',
        rotation: [0, 0, 0],
        position: [0, .1, 0],
        size: 5,
    },
    */
    /*
    {
        image: '/assets/glasses/glasses_photo2.png',
        position: [0, .1, 0],
        size: .75,
    },*/
];

PEEKS.registerPage('Face', function(scene) {
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

    var head;
    var faces = [];
    var canvas;

    if (scene) {
        scene.setArMode(true);
        var arView = scene.getArView();
        if (arView) {
            var tracking = true;
            /*
            arView.addStateButton({
                name: 'faceTrackingButton',
                image: '/images/icon_face_tracking.png',
                position: [.42, .42],
                size: .1,
                onButtonStateChange: function(state) {
                    tracking = state;
                },
            }).setButtonState(true);
            */

            var video = scene.DOMarGetElement();
            if (video) {
                var timerStart = (new Date()).getTime();
                var assetI = 0;
                PEEKS.addExtensionListener('cv', function(cv) {
                    page.onUpdate = function() {
                        var timerEnd = (new Date()).getTime();
                        if ((timerEnd - timerStart) > 10000) {
                            // Reset geometries every 5 seconds
                            timerStart = timerEnd;
                            for (var faceI = 0; faceI < faces.length; faceI++) {
                                faces[faceI].destroy();
                            }
                            faces = [];
                        }
                        if (tracking) {
                            var imageData = scene.getArImageData();
                            if (this.updateTracker(video, imageData)) {
                                var faceCount = this.tracker.trackedFaces.length;
                                var faceAssetCount = faces.length;
                                var faceI = 0;
                                while (faceI < faceCount || faceI < faceAssetCount) {
                                    if (faceI >= faceCount) {
                                        faces[faceI].hide();
                                    } else {
                                        if (faceI >= faceAssetCount) {
                                            faces.push(canvas.addAsset());
                                            if (assetDb[assetI].geometry) {
                                                faces[faceI].addMesh(assetDb[assetI]);
                                            } else {
                                                faces[faceI].addImage(assetDb[assetI]);
                                            }
                                            assetI++;
                                            if (assetI >= assetDb.length) {
                                                assetI = 0;
                                            }
                                        } else {
                                            if (this.tracker.trackedFaces[faceI].isHidden) {
                                                faces[faceI].hide();
                                            } else {
                                                faces[faceI].show();
                                            }
                                        }
                                        faces[faceI].setPosition(this.tracker.trackedFaces[faceI].position);
                                        faces[faceI].setSize(this.tracker.trackedFaces[faceI].size);
                                    }
                                    faceI++;
                                }
                            }
                        }
                    };
                });
            }
        }
    };

    canvas = page.addCanvas();

    /*
    page.addMesh({
        geometry: '/assets/glasses/glasses.obj',
        // rotation: [0, -90, 0],
        position: [0, 0, -3],
        size: 3,
    });
    */
    page.addImage({
        image: '/assets/glasses/glasses_photo1.png',
    });


	return page;
});
