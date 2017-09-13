PEEKS.registerPage('peeks_recommendations', function() {
	var page = new PEEKS.Asset();

	var canvas = page.addCanvas();

	var pane = canvas.addView({
		position: [.2, -.05],
		size: [.6, .6, 1],
		alpha: .2,
	});

	pane.addButton({
		image: 'ui/icon_clothes.png',
		position: [-.25, -.25, 0],
		size: .45,
		onClick: 'loadPage',
		onClickArgs: ['bloomingdales'],
	});

	pane.addButton({
		image: 'ui/icon_games.png',
		position: [-.25, .25, 0],
		size: .45,
		onClick: 'loadPage',
		onClickArgs: ['terraworlds'],
	});

	pane.addButton({
		image: 'ui/icon_travel.png',
		position: [.25, -.25, 0],
		size: .45,
	});

	pane.addButton({
		image: 'ui/icon_videos.png',
		position: [.25, .25, 0],
		size: .45,
	});

	return page;
});
