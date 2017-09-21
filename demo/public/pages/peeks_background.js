PEEKS.registerPage('peeks_background', function() {
	var page = new PEEKS.Asset();

	page.addButton({
		image: 'images/bg_meadow_1.jpg',
		position: [0, 0, -15],
		rotation: [0, 0, 0],
		size: 15,
        onClick: function() {
            if (this.fgImage === undefined) {
                this.addButton({
            		image: 'images/bg_library_1.jpg',
            		position: [0, 0, .1],
                    onClick: function() {
                        this.destroy();
                    },
                });
            }
        },
	});

	return page;
});
