PEEKS.registerPage('Fortinet', function() {
	var page = new PEEKS.Asset({
        fontColor: [0, 0, 0],
        fontColorBold: [197/255, 1/255, 0],
        fontOutlineStyle: '',
        fontName: 'Helvetica Neue',
        bgColor: [1, 1, 1],
        category: 'white',
        //groundImage: 'ui/icon_dot.png',
        //groundImageRepeat: 50,
        //groundImageColor: [225/255, 255/255, 252/255],
        //groundImageColor: [141/255, 201/255, 195/255],
        groundImage: 'ui/gradient_radial.png',
        groundImageRepeat: 1,
        backgroundImage: 'ui/gradient.png',
        // title: 'Target'
    });

	var panel = page.addAsset();

    var screen = page.addScreen({
        radius: 5,
    });

    var canvas = page.addCanvas({
        valign: 'bottom',
    });

    canvas.addView({
        position: [0, -.45],
        size: [1, .12, 1],
        viewBgColor: [1, 1, 1],
        alpha: .9,
    });

    canvas.addButton({
        image: 'images/target_icon_menu.png',
        position: [-.45, -.45],
        size: .08,
        onClick: 'onShowSiteMapMenu',
    });

    canvas.addButton({
        image: 'ui/icon_vr.png',
        position: [.45, -.45],
        size: .08,
        color: page.fontColorBold,
        onClick: function() { peeks.toggleVrMode(); },
    });

    canvas.addText({
        position: [0, -.45],
        fontSize: 28,
        text: 'search',
        fontColor: [.3, .3, .3],
        size: .08,
        onClick: 'searchPage',
    });

	return page;
});
