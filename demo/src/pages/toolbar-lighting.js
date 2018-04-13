PEEKS.registerPage('peeks.toolbar.lighting', function() {
    var page = new PEEKS.Asset();

    var canvas = page.addCanvas({
        valign: 'top',
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
        image: '/ui/icon_light.png',
        position: [-.4, .45],
        size: .07,
        color: page.fontColorBold,
        onClick: function() {
            this.getScene().getLight(0).toggleVisible();
            this.setColor(this.getScene().getLight(0).getVisible() ? [1, 1, 1] : [.2, .2, .2]);
        },
    });
    canvas.addButton({
        image: '/ui/icon_light.png',
        position: [-.3, .45],
        size: .07,
        color: page.fontColorBold,
        onClick: function() {
            this.getScene().getLight(1).toggleVisible();
            this.setColor(this.getScene().getLight(1).getVisible() ? [1, 1, 1] : [.2, .2, .2]);
        },
    });
    canvas.addButton({
        image: '/ui/icon_light.png',
        position: [-.2, .45],
        size: .07,
        color: page.fontColorBold,
        onClick: function() {
            this.getScene().getLight(2).toggleVisible();
            this.setColor(this.getScene().getLight(2).getVisible() ? [1, 1, 1] : [.2, .2, .2]);
        },
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

	return page;
});
