PEEKS.Asset.prototype.threeSynch = function() {
	if (!this.threeNode) {
		var geometry = new THREE.PlaneGeometry( 1, 1 );
		var material = new THREE.MeshBasicMaterial( {color: 0xaaaaaa, side: THREE.DoubleSide} );
		var plane = new THREE.Mesh( geometry, material );
		this.threeNode = plane;
	}

	return this.threeNode;
}
