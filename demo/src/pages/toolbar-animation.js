PEEKS.registerPage('peeks.toolbar.animation', function(scene) {
    var page = new PEEKS.Asset();

    var canvas = page.addCanvas({
        valign: 'top',
    });

    var play = canvas.addButton({
        image: '/peeks/icon_play.png',
        position: [0, .45],
        size: .07,
        color: page.fontColorBold,
        onClick: function() {
            this.getScene().play();
            pause.show();
            play.hide();
        },
    });

    var pause = canvas.addButton({
        image: '/peeks/icon_pause.png',
        position: [0, .45],
        size: .07,
        color: page.fontColorBold,
        onClick: function() {
            this.getScene().pause();
            play.show();
            pause.hide();
        },
    });

    play.hide();

	return page;
});
