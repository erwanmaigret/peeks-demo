PEEKS.registerPage('peeks_history', function() {
	var page = new PEEKS.Asset();

	var canvas = page.addCanvas();

	var pane = canvas.addView({
		position: [-.4, -.05],
		size: [.2, .6, 1],
		alpha: .2,
	});

    pane.addRoundTextButton({
        fontSize: 40,
        label: '1',
		position: [0, .35],
		size: [.6, .2, 1],
	});

    pane.addRoundTextButton({
        fontSize: 40,
        label: '2',
		position: [0, .12],
		size: [.6, .2, 1],
	});

    pane.addRoundTextButton({
        fontSize: 40,
        label: '3',
		position: [0, -.12],
		size: [.6, .2, 1],
	});

    pane.addRoundTextButton({
        fontSize: 40,
        label: '4',
		position: [0, -.35],
		size: [.6, .2, 1],
	});

	return page;
});
