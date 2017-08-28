PEEKS.Asset.prototype.threeSynch = function() {
	if (!this.threeNode) {
		if (this.primitive) {
			if (this.primitive == PEEKS.Asset.PrimitivePlane) {
				var geometry = new THREE.PlaneGeometry( 1, 1 );
				var material = new THREE.MeshBasicMaterial( {color: 0xaaaaaa, transparent: true} );
				var plane = new THREE.Mesh( geometry, material );
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

	if (this.position) {
		this.threeNode.position.x = this.position[0];
		this.threeNode.position.y = this.position[1];
		this.threeNode.position.z = this.position[2];

		this.threeNode.rotation.x = THREE.Math.degToRad(this.rotation[0]);
		this.threeNode.rotation.y = THREE.Math.degToRad(this.rotation[1]);
		this.threeNode.rotation.z = THREE.Math.degToRad(this.rotation[2]);

		this.threeNode.scale.x = this.size[0];
		this.threeNode.scale.y = this.size[1];
		this.threeNode.scale.z = this.size[2];
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
