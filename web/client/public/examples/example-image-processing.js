PEEKS.registerPage('example', function(scene) {
    var page = new PEEKS.Asset({
        category: 'entertainment',
    });

    page.addImage({
        position:[0, 0, -3],
        size: 2,
        image: 'https://dev.peeks.io/images/bg_360_canyon.jpg',
        onImageLoaded: function(imageData) {
            var pix = imageData.data;
            for (var i = 0, n = pix.length; i < n; i += 4) {
                pix[i] = 255 - pix[i];
                pix[i + 1] = 255 - pix[i + 1];
                pix[i + 2] = 255 - pix[i + 2];
            }

            return true;
        }
    });

    return page;
});

PEEKS.start(window, 'example');
