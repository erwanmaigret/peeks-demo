PEEKS.registerPage('peeks_toolbar', function() {
    var page = new PEEKS.Asset();

    var canvas = page.addCanvas({
        valign: 'bottom',
    });

    var height = -.44;

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

    canvas.addRoundTextButton({
        position: [.45, height],
		size: .08,
        label: 'AR',
        fontSize: 40,
        onClick: function() { this.getScene().toggleArMode(); },
    });

    if (PEEKS.isPhone()) {
        canvas.addRoundIconButton({
    		icon: '/ui/icon_gyroscope.png',
    		position: [.35, height],
    		size: .08,
    		onClick: function() { this.getScene().toggleGyroscope(); },
    	});
    } else {
        canvas.addRoundTextButton({
            position: [.35, height],
    		size: .08,
            label: 'VR',
            fontSize: 40,
            onClick: function() { this.getScene().toggleVrMode(); },
        });
    }

    canvas.addTextButton({
        position: [0, height],
        fontSize: 40,
        text: 'search',
        size: .08,
        onClick: 'searchPage',
    })

	canvas.animate({
		duration: 1,
		delay: .2,
		begin: [0, -.3, 0],
		end: [0, 0, 0],
		attribute: 'position'
	});

	return page;
});
