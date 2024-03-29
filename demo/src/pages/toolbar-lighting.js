PEEKS.registerPage('peeks.toolbar.lighting', function() {
    var page = new PEEKS.Asset();

    var canvas = page.addCanvas({
        valign: 'top',
    });

    canvas.addButton({
        image: '/peeks/icon_light.png',
        position: [-.4, .45],
        size: .07,
        color: page.fontColorBold,
        onClick: function() {
            this.getScene().getLight(0).toggleVisible();
            this.setColor(this.getScene().getLight(0).getVisible() ? [1, 1, 1] : [.2, .2, .2]);
        },
    });
    canvas.addButton({
        image: '/peeks/icon_light.png',
        position: [-.3, .45],
        size: .07,
        color: page.fontColorBold,
        onClick: function() {
            this.getScene().getLight(1).toggleVisible();
            this.setColor(this.getScene().getLight(1).getVisible() ? [1, 1, 1] : [.2, .2, .2]);
        },
    });
    canvas.addButton({
        image: '/peeks/icon_light.png',
        position: [-.2, .45],
        size: .07,
        color: page.fontColorBold,
        onClick: function() {
            this.getScene().getLight(2).toggleVisible();
            this.setColor(this.getScene().getLight(2).getVisible() ? [1, 1, 1] : [.2, .2, .2]);
        },
    });

	return page;
});
