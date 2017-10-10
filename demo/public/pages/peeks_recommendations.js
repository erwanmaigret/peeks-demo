PEEKS.registerPage('peeks_recommendations', function() {
	var page = new PEEKS.Asset();

	var canvas = page.addCanvas();

	var pane = canvas.addView({
		position: [0, -.05],
		size: [1, .6, 1],
		alpha: .2,
	});

	pane.addTextButton({
        label: 'FASHION',
        position: [0, .4, 0],
		size: [.9, .15, 1],
		onClick: 'loadPage',
		onClickArgs: ['fashion'],
        fontSize: 40,
	}).animate({
		duration: .5,
        delay: .5,
		begin: [-90, 0, 0],
		end: [0, 0, 0],
        attribute: 'rotation'
	});

    pane.addTextButton({
        label: 'Bloomingdales',
		position: [0, .2, 0],
		size: [.9, .15, 1],
        onClick: 'loadPage',
		onClickArgs: ['bloomingdales'],
        fontSize: 40,
	}).animate({
		duration: .5,
        delay: 0.8,
		begin: [-90, 0, 0],
		end: [0, 0, 0],
        attribute: 'rotation'
	});

	pane.addTextButton({
        label: 'GAME',
        position: [0, .0, 0],
		size: [.9, .15, 1],
		onClick: 'loadPage',
		onClickArgs: ['terraworlds'],
        fontSize: 40,
	}).animate({
		duration: .5,
        delay: 1.1,
		begin: [-90, 0, 0],
		end: [0, 0, 0],
        attribute: 'rotation'
	});

    pane.addTextButton({
		label: 'TRAVEL',
        position: [0, -.2, 0],
		size: [.9, .15, 1],
        fontSize: 40,
        onClick: 'loadPage',
		onClickArgs: ['travel'],
	}).animate({
		duration: .5,
        delay: 1.4,
		begin: [-90, 0, 0],
		end: [0, 0, 0],
        attribute: 'rotation'
	});

    pane.addTextButton({
		label: 'TEST',
        position: [0, -.4, 0],
		size: [.9, .15, 1],
        fontSize: 40,
        onClick: 'loadPage',
		onClickArgs: ['peeks_test'],
	}).animate({
		duration: .5,
        delay: 1.7,
		begin: [-90, 0, 0],
		end: [0, 0, 0],
        attribute: 'rotation'
	});

	return page;
});
