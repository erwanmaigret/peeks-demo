PEEKS.registerPage('peeks.debug', function(scene) {
    var page = new PEEKS.Asset({
        fontOutlineStyle: '',
        fontColor: [0, 0, 0],
    });

    var canvas = page.addCanvas({
    });

    var canvasBottom = page.addCanvas({
        valign: 'bottom',
    });

    var canvasTop = page.addCanvas({
        valign: 'top',
    });
    var borderColor = [.3, .9, .3];
    var borderAlpha = .6;
    var borderSize = .02;
    // Borders markers
    canvasBottom.addView({
        position: [0, -.5 + borderSize / 2],
        size: [1, borderSize, 1],
        viewBgColor: borderColor,
        alpha: borderAlpha,
    });
    canvasTop.addView({
        position: [0, .5 - borderSize / 2],
        size: [1, borderSize, 1],
        viewBgColor: borderColor,
        alpha: borderAlpha,
    });
    canvas.addView({
        position: [-.5 + borderSize / 2, 0],
        size: [borderSize, 1, 1],
        viewBgColor: borderColor,
        alpha: borderAlpha,
    });
    canvas.addView({
        position: [.5 - borderSize / 2, 0],
        size: [borderSize, 1, 1],
        viewBgColor: borderColor,
        alpha: borderAlpha,
    });

    var height = -.46;
    canvasBottom.addView({
        position: [0, height],
        size: [1, .04, 1],
        viewBgColor: [1, 1, 1],
        alpha: .5,
    });
    if (scene) {
        scene.onLog = function (level, message) {
            if (canvasBottom.textEntry !== undefined) {
                canvasBottom.textEntry.destroy();
            }
            canvasBottom.textEntry = canvasBottom.addText({
                position: [0, height],
                fontSize: 24,
                text: message,
                textAlign: 'left',
                size: [.96, .1, 1],
            });
        };
    }

	return page;
});
