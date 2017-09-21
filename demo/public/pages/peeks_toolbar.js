PEEKS.registerPage('peeks_toolbar', function() {
	var page = new PEEKS.Asset();

	var canvas = page.addCanvas();

    /*
	canvas.addButton({
		image: 'ui/icon_reload.png',
		position: [-.35, -.45],
		size: .08,
		onClick: function() { },
	})
    */

	canvas.addButton({
		image: 'ui/icon_previous.png',
		position: [-.25, -.45],
		size: .08,
		onClick: 'loadPreviousPage',
	})

	canvas.addButton({
		image: 'ui/icon_next.png',
		position: [-.15, -.45],
		size: .08,
		onClick: 'loadNextPage',
	})

    canvas.addButton({
		image: 'ui/icon_ar.png',
		position: [.25, -.45],
		size: .08,
		onClick: function() { peeks.toggleArMode(); },
	});

    canvas.addButton({
		image: 'ui/icon_gyroscope.png',
		position: [.15, -.45],
		size: .08,
		onClick: function() { peeks.toggleGyroscope(); },
	});

	canvas.addButton({
		image: 'ui/icon_peeks.png',
		position: [0, -.45],
		size: .2,
	});

	canvas.animate({
		duration: 1,
		delay: .2,
		begin: [0, -.3, 0],
		end: [0, 0, 0],
		attribute: 'position'
	});

	return page;
});
