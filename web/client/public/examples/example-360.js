PEEKS.registerPage('example', function(scene) {
    var page = new PEEKS.Asset({
        gyroscope: 'off',
        backgroundImage: '/examples/example-bg-360.jpg',
    });

    return page;
});

PEEKS.start(window, 'example');
