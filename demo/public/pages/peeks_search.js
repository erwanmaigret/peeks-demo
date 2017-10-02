PEEKS.registerPage('peeks_search', function() {
	var page = new PEEKS.Asset();

    var canvas = page.addCanvas({
        valign: 'top',
    });

	var pane = canvas.addView({
		position: [0, .4],
		size: [1, .2, 1],
		alpha: .2,
	});

	pane.addTextButton({
        label: 'Search PEEKS or type URL',
		position: [0, 0],
		size: [.5, .22, 1],
        fontSize: 24,
	});

    pane.addRoundTextButton({
        fontSize: 40,
        label: '-',
		position: [-.45, .3],
		size: [.05, .25, 1],
	});
    pane.addRoundTextButton({
        fontSize: 40,
        label: '-',
		position: [-.45, -.3],
		size: [.05, .25, 1],
	});
    pane.addRoundTextButton({
        fontSize: 40,
        label: '-',
		position: [.45, .3],
		size: [.05, .25, 1],
	});
    pane.addRoundTextButton({
        fontSize: 40,
        label: '?',
		position: [.45, 0],
		size: [.05, .25, 1],
	});
    pane.addRoundTextButton({
        fontSize: 40,
        label: '-',
		position: [.45, -.3],
		size: [.05, .25, 1],
	});

	return page;
});
