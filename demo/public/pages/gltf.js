PEEKS.registerPage('peeks.demo.gltf', function() {
	var page = new PEEKS.Asset({
        category: 'canyon',
    });

    page.addMesh({
        geometry: '/assets/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',
        position: [0, 0, -3],
        rotation: [0, 90, 0],
        size: 1,
        onClick: 'animateRotate90',
    });

	return page;
});
