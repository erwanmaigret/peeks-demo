PEEKS.Asset.prototype.threeSynch = function(threeObject) {
	if (!this.threeObject) {
		if (this.primitive) {
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
					var geometry = new THREE.PlaneGeometry(1, 1);
					var material = new THREE.MeshBasicMaterial({
						color: 0xffffff,
						transparent: true
					});
					var plane = new THREE.Mesh(geometry, material);
					this.threeObject = plane;

					if (this.textureUrl != '') {
						var url = this.textureUrl;
						var loader = new THREE.TextureLoader();
						if (/^data:/.test(this.textureUrl)) {
							loader.setCrossOrigin(url);
						} else {
							loader.setCrossOrigin('');
						}
						material.map = loader.load(url);
						// Don't mind not POT textures
						material.map.minFilter = THREE.LinearFilter;
					}
				}
			} else {
				this.threeObject = new THREE.Object3D();
			}

			this.updateLayout();

			if (this.threeObject.material) {
				this.threeObject.material.color.r = this.color[0];
				this.threeObject.material.color.g = this.color[1];
				this.threeObject.material.color.b = this.color[2];
			}
		} else {
			this.threeObject = new THREE.Object3D();
		}

		this.threeObject.peeksAsset = this;
	}

	if (threeObject === undefined) {
		threeObject = this.threeObject;
	}

	if (this.useVideoTexture) {
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
							navigator.getUserMedia ({ video: true },
								function(localMediaStream) {
									video.src = window.URL.createObjectURL(localMediaStream);
								},
								function(err) {
									 this.error("The following error occured: " + err);
								}
						 	);
						} else {
							 this.error("getUserMedia not supported");
						}
					}
					threeObject.material.map = video.texture;
				}

				if (video.texture &&
					video.readyState === video.HAVE_ENOUGH_DATA) {
					video.texture.needsUpdate = true;
				}
			}
		}
	}

	if (this.position) {
		threeObject.position.x = this.position[0];
		threeObject.position.y = this.position[1];
		threeObject.position.z = this.position[2];

		threeObject.rotation.x = THREE.Math.degToRad(this.rotation[0]);
		threeObject.rotation.y = THREE.Math.degToRad(this.rotation[1]);
		threeObject.rotation.z = THREE.Math.degToRad(this.rotation[2]);

		threeObject.scale.x = this.size[0];
		threeObject.scale.y = this.size[1];
		threeObject.scale.z = this.size[2];
	}

	for (var childI = 0; childI < this.children.length; childI++) {
		var child = this.children[childI];
		if (!child.threeObject) {
			this.threeObject.add(child.threeGetNode());
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

PEEKS.Scene.prototype.onPickNode = function(mouse) {
	var raycaster = new THREE.Raycaster();
	raycaster.setFromCamera(new THREE.Vector3(mouse[0], mouse[1], 0), this.three.camera);
	var intersectedObjects = raycaster.intersectObjects(this.threeObject.children, true);
	if (intersectedObjects.length > 0) {
		return intersectedObjects[0].object.peeksAsset;
	}
}

PEEKS.Scene.prototype.onStart = function() {
	this.three = {};

	var renderWidth = 800;
	var renderHeight = 400;

	var scene = new THREE.Scene();
	var ambient = new THREE.AmbientLight( 0x101030 );
	scene.add( ambient );
	var directionalLight = new THREE.DirectionalLight( 0xffeedd );
	directionalLight.position.set( 0, 0, 1 );
	scene.add( directionalLight );

	var camera = new THREE.PerspectiveCamera( 55, renderWidth/renderHeight, 0.1, 1000 );

	var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	renderer.sortObjects = false;
	renderer.setClearColor( 0x000000, 0 );
	renderer.setSize( renderWidth, renderHeight );

	this.three.scene = scene;
	this.three.camera = camera;
	this.three.renderer = renderer;
	this.domElement = this.three.renderer.domElement;
}
