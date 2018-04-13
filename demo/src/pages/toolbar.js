PEEKS.registerPage('peeks.toolbar', function() {
    var page = new PEEKS.Asset();

    var canvas = page.addCanvas({
        valign: 'bottom',
    });

    //var height = -.44;

    /*
    // These should be dynamic based on the navigation, and only apply
    // when in a FullScreen mode

    canvas.addRoundIconButton({
		icon: '/ui/icon_previous.png',
		position: [-.45, height],
		size: .08,
		onClick: 'loadPreviousPage',
	})

    canvas.addRoundIconButton({
		icon: '/ui/icon_next.png',
        position: [-.35, height],
		size: .08,
		onClick: 'loadNextPage',
	});
    */

    canvas.addButton({
        image: '/ui/icon_vr.png',
        position: [.45, -.45],
        size: .08,
        color: page.fontColorBold,
        onClick: function() { peeks.toggleVrMode(); },
    });

    /*
        canvas.addRoundIconButton({
            icon: '/ui/icon_gyroscope.png',
            position: [.35, height],
            size: .08,
            onClick: function() { this.getScene().toggleGyroscope(); },
        });

        canvas.addTextButton({
            position: [0, height],
            fontSize: 40,
            text: 'search',
            size: .08,
            onClick: 'searchPage',
        })
    */

	canvas.animate({
		duration: 1,
		delay: 1,
		begin: [0, -1, 0],
		end: [0, 0, 0],
		attribute: 'position'
	});

	return page;
});
