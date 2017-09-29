PEEKS.registerPage('peeks_toolbar', function() {
	var page = new PEEKS.Asset();

	var canvas = page.addCanvas();

    canvas.addView({
		position: [0, -.45],
		size: [1, .1, 1],
		alpha: .5,
	});

    canvas.addIconButton({
		icon: 'ui/icon_previous.png',
		position: [-.25, -.45],
		size: .08,
		onClick: 'loadPreviousPage',
	})

    canvas.addIconButton({
		icon: 'ui/icon_next.png',
		position: [-.15, -.45],
		size: .08,
		onClick: 'loadNextPage',
	})

    /*
    canvas.addButton({
		image: 'ui/icon_ar.png',
		position: [.25, -.45],
		size: .08,
		onClick: function() { peeks.toggleArMode(); },
	});
    */

    canvas.addTextButton({
        position: [.25, -.45],
		size: .08,
        label: 'AR',
        onClick: function() { peeks.toggleArMode(); },
    });

/*
    canvas.addButton({
		image: 'ui/icon_gyroscope.png',
		position: [.15, -.45],
		size: .08,
		onClick: function() { peeks.toggleGyroscope(); },
	});
*/
    canvas.addIconButton({
		icon: 'ui/icon_gyroscope.png',
		position: [.15, -.45],
		size: .08,
		onClick: function() { peeks.toggleGyroscope(); },
	});

    canvas.addText({
        position: [0, -.45],
        text: 'PEEKS',
        fontSize: 48,
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
