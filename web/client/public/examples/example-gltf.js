PEEKS.registerPage('example', function(scene) {
    var page = new PEEKS.Asset({
        gyroscope: 'off',
        backgroundImage: '/examples/example-bg-360.jpg',
    });

    page.addMesh({
        geometry: '/examples/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',
        position: [0, 0, -3],
        rotation: [0, 90, 0],
        size: 1,
        onClick: 'animateRotate90',
    });

    return page;
});

PEEKS.start(window, 'example');
