PEEKS.registerPage('tron', function() {
	var page = new PEEKS.Asset({
        fontColor: [1, 1, 1],
        fontColorBold: [197/255, 1/255, 0],
        fontOutlineStyle: '',
        fontName: 'Helvetica Neue',
        bgColor: [0, 0, 0],
        category: '',
        groundImage: 'images/floor_network.jpg',
        groundImageRepeat: 200,
        groundImageAlpha: 1,
        navigation: 'vehicle',
        cameraSpeed: 1,
        //groundImageRepeat: 50,
        //groundImageColor: [225/255, 255/255, 252/255],
        //groundImageColor: [141/255, 201/255, 195/255],
        //backgroundImage: 'ui/gradient.png',
        // title: 'Target'
    });

	var panel = page.addAsset();

    var canvas = page.addCanvas();

    canvas.addTextButton({
        fontSize: 40,
        text: 'go',
        onClick: function() {
            page.getCamera().speed = 1;
            this.destroy();
        }
    });

	return page;
});
