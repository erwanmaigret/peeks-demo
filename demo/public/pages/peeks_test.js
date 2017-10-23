PEEKS.registerPage('peeks_test', function() {
    var page = new PEEKS.Asset({
    });

    page.setAttr('bgColor', [0, 0, 0]);

    //page.addExternalView('http://www.forever21.com/');
    //page.addExternalView('https://www.etsy.com/');

    var screen = page.addScreen();

    screen.addRoundIconButton({
        icon: 'ui/icon_gyroscope.png',
        position: [0, 0],
        size: 1,
    });

    screen.addRoundIconButton({
        icon: 'ui/icon_gyroscope.png',
        position: [.1, 0],
        size: 1,
    });

    screen.addRoundIconButton({
        icon: 'ui/icon_gyroscope.png',
        position: [.2, 0],
        size: 1,
    });

    screen.addRoundIconButton({
        icon: 'ui/icon_gyroscope.png',
        position: [.3, 0],
        size: 1,
    });

    screen.addRoundIconButton({
        icon: 'ui/icon_gyroscope.png',
        position: [-.1, 0],
        size: 1,
    });

    screen.addRoundIconButton({
        icon: 'ui/icon_gyroscope.png',
        position: [-.2, 0],
        size: 1,
    });

    screen.addRoundIconButton({
        icon: 'ui/icon_gyroscope.png',
        position: [-.3, 0],
        size: 1,
    });

    screen.addRoundIconButton({
        icon: 'ui/icon_gyroscope.png',
        position: [0, .25],
        size: 1,
    });

    screen.addRoundIconButton({
        icon: 'ui/icon_gyroscope.png',
        position: [.25, .25],
        size: 1,
    });

    page.addPage('peeks_toolbar');

	return page;
});
