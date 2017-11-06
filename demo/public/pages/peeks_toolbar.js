PEEKS.registerPage('peeks_toolbar', function() {
	var page = new PEEKS.Asset();

	var canvas = page.addCanvas({
        valign: 'bottom',
    });

    var height = -.44;

    canvas.addView({
		position: [0, height],
		size: [1, .12, 1],
        viewBgColor: [.3, .3, .3],
		alpha: 0,
	});

    canvas.addRoundIconButton({
		icon: 'ui/icon_previous.png',
		position: [-.45, height],
		size: .08,
		onClick: 'loadPreviousPage',
	})

    canvas.addRoundIconButton({
		icon: 'ui/icon_next.png',
        position: [-.35, height],
		size: .08,
		onClick: 'loadNextPage',
	});

    canvas.addRoundTextButton({
        position: [-.25, height],
		size: .08,
        label: '2D',
        fontSize: 40,
        onClick: function() { peeks.open2D(); },
    });

    canvas.addRoundTextButton({
        position: [.35, height],
		size: .08,
        label: 'AR',
        fontSize: 40,
        onClick: function() { peeks.toggleArMode(); },
    });

    canvas.addRoundTextButton({
        position: [.45, height],
		size: .08,
        label: 'VR',
        fontSize: 40,
        onClick: function() { peeks.toggleVrMode(); },
    });

    canvas.addRoundIconButton({
		icon: 'ui/icon_gyroscope.png',
		position: [.25, height],
		size: .08,
		onClick: function() { peeks.toggleGyroscope(); },
	});

    canvas.addButton({
        image: 'ui/icon_peeks.png',
        position: [0, height],
        size: [.2, .1, 1],
    }).addAttrAlias('color', 'fontColor');

	canvas.animate({
		duration: 1,
		delay: .2,
		begin: [0, -.3, 0],
		end: [0, 0, 0],
		attribute: 'position'
	});

	return page;
});
