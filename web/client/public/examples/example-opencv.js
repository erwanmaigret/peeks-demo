PEEKS.registerPage('example', function(scene) {
    var page = new PEEKS.Asset({});

    var canvas = page.addCanvas();

    PEEKS.addExtensionListener('cv', function(cv) {
    });

    return page;
});

PEEKS.start(window, 'example');
