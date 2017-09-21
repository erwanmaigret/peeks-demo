var loadTexture = function(material, textureUrl, textureRepeat)
{
	if (textureUrl != '') {
		var loader = new THREE.TextureLoader();

		loader.setCrossOrigin(null);

		material.map = loader.load(textureUrl);

		// Don't mind not POT textures
		material.map.minFilter = THREE.LinearMipMapLinearFilter;

		material.map.wrapS = THREE.RepeatWrapping;
		material.map.wrapT = THREE.RepeatWrapping;
		if (textureRepeat) {
			material.map.repeat.set(textureRepeat[0], textureRepeat[1]);
		}
	}
}

var setObjectQuaternion = function(quaternion, alpha, beta, gamma, orient) {

		var zee = new THREE.Vector3( 0, 0, 1 );

		var euler = new THREE.Euler();

		var q0 = new THREE.Quaternion();

		var q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis

			euler.set( beta, alpha, - gamma, 'YXZ' ); // 'ZXY' for the device, but 'YXZ' for us

			quaternion.setFromEuler( euler ); // orient the device

			quaternion.multiply( q1 ); // camera looks out the back of the device, not the top

			quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) ); // adjust for screen orientation

	}

PEEKS.Asset.prototype.threeSynchXform = function(threeObject) {
	if (threeObject === undefined) {
		threeObject = this.threeObject;
	}

	if (threeObject) {
		if (this.position) {
			threeObject.position.x = this.position[0];
			threeObject.position.y = this.position[1];
			threeObject.position.z = this.position[2];

			threeObject.rotation.x = THREE.Math.degToRad(this.rotation[0]);
			threeObject.rotation.y = THREE.Math.degToRad(this.rotation[1]);
			threeObject.rotation.z = THREE.Math.degToRad(this.rotation[2]);
			threeObject.rotation.order = this.rotationOrder;

			threeObject.scale.x = this.size[0];
			threeObject.scale.y = this.size[1];
			threeObject.scale.z = this.size[2];
		}

        var camera = this.getCamera();
        if (this === camera) {
            var scene = this.getScene();
            if (scene && scene.deviceOrientation !== undefined) {
                var alpha = scene.deviceOrientation[2];
                		var beta = scene.deviceOrientation[0];
                        var gamma = scene.deviceOrientation[1];
                		var orient = 0;
                        threeObject.rotation.order = 'YXZ';
                        //setObjectQuaternion( threeObject.quaternion, alpha, beta, gamma, orient );
                        setObjectQuaternion( threeObject.quaternion,
                            THREE.Math.degToRad(alpha),
                            THREE.Math.degToRad(beta),
                            THREE.Math.degToRad(gamma),
                            0);
                        //threeObject.alpha = alpha;



/*                threeObject.rotation.order = 'YXZ';
                //threeObject.rotation.order = 'XYZ';



    	        threeObject.rotation.x = THREE.Math.degToRad(scene.orientation[0]);
    			threeObject.rotation.y = THREE.Math.degToRad(scene.orientation[1]);
    			threeObject.rotation.z = THREE.Math.degToRad(scene.orientation[2]);
                threeObject.parent.rotation.x = THREE.Math.degToRad(-90);
                threeObject.parent.rotation.x = THREE.Math.degToRad(0);
    			threeObject.parent.rotation.y = THREE.Math.degToRad(0);
    			threeObject.parent.rotation.z = THREE.Math.degToRad(0);
                */
            }
        } else if (this.type == 'Canvas') {
			this.threeObjectPivot.position.x = camera.position[0];
			this.threeObjectPivot.position.y = camera.position[1];
			this.threeObjectPivot.position.z = camera.position[2];
			this.threeObjectPivot.rotation.order = camera.rotationOrder;
			this.threeObjectPivot.rotation.x = THREE.Math.degToRad(camera.rotation[0]);
			this.threeObjectPivot.rotation.y = THREE.Math.degToRad(camera.rotation[1]);
			this.threeObjectPivot.rotation.z = THREE.Math.degToRad(camera.rotation[2]);
			threeObject.position.z -= 2;
		}
	}
}

PEEKS.Asset.prototype.threeSynchVideoTexture = function() {
	var threeObject = this.threeObject;
	if (threeObject && this.useVideoTexture) {
		var video;
		var scene = this.getScene();
		if (scene) {
			var video = scene.getVideo();
			var window = scene.window;
			var navigator = window.navigator;
			if (video && navigator) {
				if (threeObject.material &&
					(threeObject.material.map === null ||
						threeObject.material.map !== video.texture))
				{
					if (!video.texture) {
						video.texture = new THREE.Texture(video);
                        video.texture.minFilter = THREE.NearestFilter;
                        video.texture.magFilter = THREE.NearestFilter;
						navigator.getUserMedia = (
							navigator.getUserMedia ||
							navigator.webkitGetUserMedia ||
							navigator.mozGetUserMedia ||
							navigator.msGetUserMedia
						);
						if (navigator.getUserMedia) {
							var facingMode = "user";
							var constraints = {
							  audio: false,
							  video: {
							   facingMode: facingMode
							  }
							};
							navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
							  video.srcObject = stream;
								video.play();
							});
						} else {
							 this.error("getUserMedia not supported");
						}
					}
					threeObject.material.map = video.texture;
				}

				if (video.texture && video.readyState === video.HAVE_ENOUGH_DATA) {
					video.texture.needsUpdate = true;
					return true;
				}
			}
		}
	}

	return false;
}

PEEKS.Asset.prototype.threeGetVisibility = function() {
	if (this.visible) {
		if (this.threeObject && this.useVideoTexture) {
			return this.threeSynchVideoTexture();
		} else {
			return true;
		}
	} else {
		return false;
	}
}

PEEKS.Scene.prototype.onRender = function() {
	this.threeSynch();
	if (this.page) {
		var bgColor = this.page.bgColor;
		if (bgColor === undefined) {
			bgColor = [1, 1, 1];
		}
		this.three.renderer.setClearColor(
			new THREE.Color(
				bgColor[0],
				bgColor[1],
				bgColor[2]),
			1);
	}
	this.camera.threeSynch(this.three.camera);
	this.three.renderer.render(this.three.scene, this.three.camera);
},

PEEKS.Asset.prototype.threeSynch = function(threeObject) {
	if (!this.threeObject) {
		if (this.primitive) {
			var isScreenSpace = false;
			var parent = this;
			while (parent) {
				if (parent.type === 'Canvas') {
					isScreenSpace = true;
					break;
				}
				parent = parent.parent;
			}

			if (this.primitive == PEEKS.Asset.PrimitivePlane) {
				if (this.geometryUrl) {
					this.threeObject = new THREE.Object3D();

					var manager = new THREE.LoadingManager();
						manager.onProgress = function ( item, loaded, total ) {
						console.log( item, loaded, total );
					};

					var onProgress = function ( xhr ) {
						if ( xhr.lengthComputable ) {
							var percentComplete = xhr.loaded / xhr.total * 100;
							console.log( Math.round(percentComplete, 2) + '% downloaded' );
						}
					};

					var onError = function ( xhr ) {
					};

					var node = this.threeObject;
					var textureUrl = this.textureUrl;
					var loader = new THREE.OBJLoader( manager );
					loader.load(this.geometryUrl, function ( object ) {
						node.add(object);

						if (textureUrl != '') {
							var url = textureUrl;
							var loader = new THREE.TextureLoader();
							if (/^data:/.test(textureUrl)) {
								loader.setCrossOrigin(url);
							} else {
								loader.setCrossOrigin('');
							}
							object.texture = loader.load(url);
							object.traverse( function ( child ) {
								if ( child instanceof THREE.Mesh ) {
									child.material.map = object.texture;
									child.material.emissive.r = .2;
									child.material.emissive.g = .2;
									child.material.emissive.b = .3;
								}
							} );
						}
					}, onProgress, onError );
				} else {
					var backSide;

					if (this.textureBackUrl !== "") {
						var geometry = new THREE.PlaneGeometry(1, 1);
						var material = new THREE.MeshBasicMaterial({
							color: 0xffffff,
							transparent: true,
							side: THREE.FrontSide,
						});
						backSide = new THREE.Mesh(geometry, material);
						backSide.rotation.y = THREE.Math.degToRad(180);
						loadTexture(material, this.textureBackUrl, this.textureRepeat);
					}

					var geometry = new THREE.PlaneGeometry(1, 1);
					var material = new THREE.MeshBasicMaterial({
						color: 0xffffff,
						transparent: true,
						side: backSide ? THREE.FrontSide : THREE.DoubleSide,
						depthTest: isScreenSpace ? false : true,
					});

					var plane = new THREE.Mesh(geometry, material);
					this.threeObject = plane;

					if (this.text) {
						textTexture = this.createTextTexture();
						if (textTexture) {
							var texture = new THREE.Texture(textTexture.canvas);
							texture.needsUpdate = true;
							texture.premultiplyAlpha = true;
							material.map = texture;
						}
					} else {
						loadTexture(material, this.textureUrl, this.textureRepeat);
					}

					if (backSide) {
						this.threeObject.add(backSide);
					}
				}
			} else {
				this.threeObject = new THREE.Object3D();
			}

			this.updateLayout();
		} else {
			this.threeObject = new THREE.Object3D();
		}
		this.threeObjectPivot = new THREE.Object3D();
		this.threeObjectPivot.add(this.threeObject);

		this.threeObject.peeksAsset = this;
	}

	this.threeSynchVideoTexture();

	var visible = this.threeGetVisibility();
	this.threeObject.visible = this.threeGetVisibility();

	if (threeObject === undefined) {
		threeObject = this.threeObject;
	}

	if (!threeObject.visible) {
		// Skip any operations on such objects
		return;
	}

	this.threeSynchXform(threeObject);

	if (threeObject.material) {
		var color = this.color;
		if (this.textureUrl === undefined || this.textureUrl === "") {
			if (this.viewBgColor) {
				color = this.viewBgColor;
			}
		}
		if (color) {
			threeObject.material.color.r = color[0];
			threeObject.material.color.g = color[1];
			threeObject.material.color.b = color[2];
		}
		if (this.alpha !== undefined) {
			threeObject.material.opacity = this.alpha;
		}
	}

	for (var childI = 0; childI < this.children.length; childI++) {
		var child = this.children[childI];
		if (!child.threeObject) {
			child.threeSynch();
			this.threeObject.add(child.threeObjectPivot);
		} else {
			child.threeSynch();
		}
	}

	return this.threeObject;
}

PEEKS.Asset.prototype.threeGetNode = function() {
	this.threeSynch();
	return this.threeObject;
}

PEEKS.Asset.prototype.onUnload = function() {
	if (this.threeObjectPivot) {
		if (this.threeObjectPivot.parent) {
			this.threeObjectPivot.parent.remove(this.threeObjectPivot);
		}
		delete this.threeObjectPivot;
		delete this.threeObject;
	}
}

PEEKS.Scene.prototype.onPickNode = function(mouse) {
	var raycaster = new THREE.Raycaster();
	raycaster.setFromCamera(new THREE.Vector3(mouse[0], mouse[1], 0), this.three.camera);
	var objects = raycaster.intersectObjects(this.threeObject.children, true);
	for (var objectI = 0; objectI < objects.length; objectI++) {
		var object = objects[objectI].object;
		while (object) {
			if (object.peeksAsset && object.peeksAsset.onClick !== undefined) {
				if (object.peeksAsset !== this) {
					return object.peeksAsset;
				}
			}
			object = object.parent;
		}
	}

	// Second pass for default click if handled
	for (var objectI = 0; objectI < objects.length; objectI++) {
		var object = objects[objectI].object;
		while (object) {
			if (object.peeksAsset) {
				if (object.peeksAsset !== this) {
					return object.peeksAsset;
				}
			}
			object = object.parent;
		}
	}
}

PEEKS.Scene.prototype.onResize = function() {
    var width = (this.width) ? this.width : 500;
	var height = (this.height) ? this.height : 500;
    this.three.camera.aspect = width / height;
    this.three.camera.updateProjectionMatrix();
    this.three.renderer.setSize(width, height);
}

PEEKS.Scene.prototype.onStart = function() {
	this.three = {};

	var scene = new THREE.Scene();
	var ambient = new THREE.AmbientLight( 0x101030 );
	scene.add( ambient );
	var directionalLight = new THREE.DirectionalLight( 0xffeedd );
	directionalLight.position.set( 0, 0, 1 );
	scene.add( directionalLight );

    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.sortObjects = false;
	renderer.setClearColor(0xffffff, 1);

	var camera = new THREE.PerspectiveCamera( 30, 1, 0.1, 1000 );

	this.three.scene = scene;
	this.three.camera = camera;
	this.three.renderer = renderer;
	this.domElement = this.three.renderer.domElement;

    // For camera debug and added pivot
    //var cameraHelper = new THREE.CameraHelper( camera );
    //scene.add( cameraHelper );
    //var camPivot = new THREE.Object3D();
    //scene.add(camPivot);
    //camPivot.add(camera);
    //camPivot.rotation.x = THREE.Math.degToRad(10);

    this.three.scene.add(this.threeGetNode());

    this.onResize();
}
