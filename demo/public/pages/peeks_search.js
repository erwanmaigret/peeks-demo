PEEKS.registerPage('peeks_search', function() {
	var page = new PEEKS.Asset();

	var canvas = page.addCanvas();

	var pane = canvas.addView({
		position: [0, .4],
		size: [1, .2, 1],
		alpha: .2,
	});

	pane.addButton({
		position: [0, 0],
		size: [.6, .2, 1],
	});

	pane.addButton({
		position: [-.45, .3],
		size: [.05, .25, 1],
	});
	pane.addButton({
		position: [-.45, -.3],
		size: [.05, .25, 1],
	});
	pane.addButton({
		position: [.45, .3],
		size: [.05, .25, 1],
	});
	pane.addButton({
		position: [.45, 0],
		size: [.05, .25, 1],
	});
	pane.addButton({
		position: [.45, -.3],
		size: [.05, .25, 1],
	});

	return page;
});
