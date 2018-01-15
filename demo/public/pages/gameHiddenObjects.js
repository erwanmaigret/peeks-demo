PEEKS.registerPage('gameHiddenObjects', function() {
	var page = new PEEKS.Asset({
        backgroundImage: '/images/bg_360_place.jpg',
    });

    var panel = page.addAsset({
        position: [0, 0, -3],
    });

    panel.addImage({
        position: [0, 0, -.01],
        size: 4,
        image: 'https://fr.louisvuitton.com/images/is/image/lv/1/VE_DI3_L/louis-vuitton--1051_LV_NOW_COURCHEVEL2017_1_DI3.jpg',
    });

    var onValidateObject = function() {
        this.animate({
            duration: 2,
            delay: .2,
            begin: [0, 0, 0],
            end: [0, -1, 0],
            attribute: 'position'
        });
    };

    var addObject = function(position) {
        panel.addButton({
            position: position,
            size: .1,
            image: 'http://us.louisvuitton.com/images/is/image/lv/1/PP_VP_AS/louis-vuitton--FESK91FLD001_PM2_Front%20view.jpg',
            imageDetour: true,
            onClick: onValidateObject,
        });
    }

    addObject([0, 0, 0]);
    addObject([1, 0, 0]);
    addObject([-1, 0, 0]);

	return page;
});
