PEEKS.registerPage('peeks_toolbar', function() {
	var page = new PEEKS.Asset();

	var canvas = page.addCanvas();

    canvas.addView({
		position: [0, -.44],
		size: [1, .12, 1],
		alpha: .2,
	});

    canvas.addRoundIconButton({
		icon: 'ui/icon_previous.png',
		position: [-.4, -.44],
		size: .1,
		onClick: 'loadPreviousPage',
	})

    canvas.addRoundIconButton({
		icon: 'ui/icon_next.png',
		position: [-.2, -.44],
		size: .1,
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

    canvas.addRoundTextButton({
        position: [.4, -.44],
		size: .1,
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
    canvas.addRoundIconButton({
		icon: 'ui/icon_gyroscope.png',
		position: [.2, -.44],
		size: .1,
		onClick: function() { peeks.toggleGyroscope(); },
	});

    canvas.addText({
        position: [0, -.44],
        text: 'PEEKS',
        fontSize: 48,
    }).addAttrAlias('fontColor', 'colorMedium');

	canvas.animate({
		duration: 1,
		delay: .2,
		begin: [0, -.3, 0],
		end: [0, 0, 0],
		attribute: 'position'
	});

	return page;
});
