PEEKS.registerPage('example', function(scene) {
    var page = new PEEKS.Asset({
        category: 'entertainment',
        gyroscope: 'off',
    });

    page.addVideo({
        url: '/examples/example-movie.mp4',
        position: [0, 0, -3],
        rotation: [0, 0, 0],
        size: [4.8, 2.4, 1],
    });

    return page;
});

PEEKS.start(window, 'example');
