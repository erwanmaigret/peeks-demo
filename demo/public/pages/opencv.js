PEEKS.registerPage('peeks.demo.opencv', function() {
	var page = new PEEKS.Asset({
    });

    // Simple image processing
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

    // OpenCV image processing
    /*
    page.addImage({
        position:[0, 0, -3],
        size: 2,
        image: 'https://dev.peeks.io/images/bg_360_canyon.jpg',
        onImageLoaded: function(imageData) {
            var pix = imageData.data;
            for (var i = 0, n = pix.length; i < n; i += 4) {
                pix[i] = pix[i + 1] = pix[i + 2];
            }

            console.log(imageData);
            return true;
        }
    });
    */

	return page;
});
