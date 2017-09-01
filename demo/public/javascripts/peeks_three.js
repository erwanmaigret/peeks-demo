PEEKS.Asset.prototype.threeSynch = function(threeNode) {
	if (!this.threeNode) {
		if (this.primitive) {
			if (this.primitive == PEEKS.Asset.PrimitivePlane) {
				if (this.geometryUrl) {
					this.threeNode = new THREE.Object3D();

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

					var node = this.threeNode;
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
									// This does not work just yet, we need to figure out
									//	how to properly setup a simple textured model
									// So far the texture is loading but does not get
									//	to render if just attached like this below:
									// child.material.map = object.texture;
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
					this.threeNode = plane;

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
				this.threeNode = new THREE.Object3D();
			}

			this.updateLayout();

			if (this.threeNode.material) {
				this.threeNode.material.color.r = this.color[0];
				this.threeNode.material.color.g = this.color[1];
				this.threeNode.material.color.b = this.color[2];
			}
		} else {
			this.threeNode = new THREE.Object3D();
		}
	}

	if (threeNode === undefined) {
		threeNode = this.threeNode;
	}

	if (this.position) {
		threeNode.position.x = this.position[0];
		threeNode.position.y = this.position[1];
		threeNode.position.z = this.position[2];

		threeNode.rotation.x = THREE.Math.degToRad(this.rotation[0]);
		threeNode.rotation.y = THREE.Math.degToRad(this.rotation[1]);
		threeNode.rotation.z = THREE.Math.degToRad(this.rotation[2]);

		threeNode.scale.x = this.size[0];
		threeNode.scale.y = this.size[1];
		threeNode.scale.z = this.size[2];
	}

	for (var childI = 0; childI < this.children.length; childI++) {
		var child = this.children[childI];
		if (!child.threeNode) {
			this.threeNode.add(child.threeGetNode());
		} else {
			child.threeSynch();
		}
	}

	return this.threeNode;
}

PEEKS.Asset.prototype.threeGetNode = function() {
	this.threeSynch();
	return this.threeNode;
}
