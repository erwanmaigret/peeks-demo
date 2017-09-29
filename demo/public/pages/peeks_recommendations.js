PEEKS.registerPage('peeks_recommendations', function() {
	var page = new PEEKS.Asset();

	var canvas = page.addCanvas();

	var pane = canvas.addView({
		position: [.2, -.05],
		size: [.6, .6, 1],
		alpha: .2,
	});

	pane.addTextButton({
        label: 'FASHION',
		position: [-.25, -.25, 0],
		size: .4,
		onClick: 'loadPage',
		onClickArgs: ['bloomingdales'],
	});

	pane.addTextButton({
        label: 'GAME',
		position: [-.25, .25, 0],
		size: .4,
		onClick: 'loadPage',
		onClickArgs: ['terraworlds'],
	});

	pane.addTextButton({
		label: 'TRAVEL',
		position: [.25, -.25, 0],
		size: .4,
	});

    pane.addTextButton({
        label: 'VIDEOS',
		position: [.25, .25, 0],
		size: .4,
	});

	return page;
});
