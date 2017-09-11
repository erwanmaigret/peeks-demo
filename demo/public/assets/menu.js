PEEKS.registerPage('menu', function() {
	var page = new PEEKS.Asset();

	page.addImage({
		image: 'images/floor_wood.jpg',
		imageRepeat: [10, 10],
		position: [0, -1, 0],
		rotation: [-90, 0, 0],
		size: 20,
	});

	page.addButton({
		image: 'ui/icon_clothes.png',
		position: [-1.5, 0, 0],
		size: .95,
		onClick: 'loadPage',
		onClickArgs: ['bloomingdales'],
	});

	page.addButton({
		image: 'ui/icon_games.png',
		position: [-.5, 0, 0],
		size: .95,
		onClick: 'loadPage',
		onClickArgs: ['terraworlds'],
	});

	page.addButton({
		image: 'ui/icon_travel.png',
		position: [.5, 0, 0],
		size: .95,
	});

	page.addButton({
		image: 'ui/icon_videos.png',
		position: [1.5, 0, 0],
		size: .95,
	});

	var canvas = page.addCanvas();

	canvas.addButton({
		image: 'ui/icon_reload.png',
		position: [-.45, .45],
		size: .08,
		onClick: function() { },
	})

	canvas.addButton({
		image: 'ui/icon_previous.png',
		position: [-.35, .45],
		size: .08,
		onClick: 'loadPreviousPage',
	})

	canvas.addButton({
		image: 'ui/icon_next.png',
		position: [-.25, .45],
		size: .08,
		onClick: 'loadNextPage',
	})

	canvas.addButton({
		image: 'ui/icon_ar.png',
		position: [.45, .45],
		size: .08,
		onClick: function() { peeks.toggleArMode(); },
	});

	canvas.addButton({
		image: 'ui/icon_peeks.png',
		position: [0, -.45],
		size: .2,
	});

	return page;
});
