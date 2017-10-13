PEEKS.registerPage('peeks_recommendations', function() {
	var page = new PEEKS.Asset();

	var canvas = page.addCanvas();

	var pane = canvas.addView({
		position: [0, -.05],
		size: [1, .6, 1],
        viewBgColor: [.3, .3, .3],
		alpha: 0,
	});

    var fontSize = 50;
    var animDuration = .5;
    var animDelay = .3;
    var animItemDelay = .15;
    var itemCount = 0;

	pane.addTextButton({
        label: 'FASHION',
        position: [0, .4, 0],
		size: [.9, .15, 1],
		onClick: 'loadPage',
		onClickArgs: ['fashion'],
        fontSize: fontSize,
	}).animate({
		duration: animDuration,
        delay: animDelay + animItemDelay * itemCount,
		begin: [-90, 0, 0],
		end: [0, 0, 0],
        attribute: 'rotation'
	});

    itemCount++;

    pane.addTextButton({
        label: 'Bloomingdales',
		position: [0, .2, 0],
		size: [.9, .15, 1],
        onClick: 'loadPage',
		onClickArgs: ['bloomingdales'],
        fontSize: fontSize,
	}).animate({
        duration: animDuration,
        delay: animDelay + animItemDelay * itemCount,
		begin: [-90, 0, 0],
		end: [0, 0, 0],
        attribute: 'rotation'
	});

    itemCount++;

	pane.addTextButton({
        label: 'GAME',
        position: [0, .0, 0],
		size: [.9, .15, 1],
		onClick: 'loadPage',
		onClickArgs: ['terraworlds'],
        fontSize: fontSize,
	}).animate({
        duration: animDuration,
        delay: animDelay + animItemDelay * itemCount,
		begin: [-90, 0, 0],
		end: [0, 0, 0],
        attribute: 'rotation'
	});

    itemCount++;

    pane.addTextButton({
		label: 'TRAVEL',
        position: [0, -.2, 0],
		size: [.9, .15, 1],
        fontSize: fontSize,
        onClick: 'loadPage',
		onClickArgs: ['travel'],
	}).animate({
        duration: animDuration,
        delay: animDelay + animItemDelay * itemCount,
		begin: [-90, 0, 0],
		end: [0, 0, 0],
        attribute: 'rotation'
	});

    itemCount++;

    pane.addTextButton({
		label: 'TEST',
        position: [0, -.4, 0],
		size: [.9, .15, 1],
        fontSize: fontSize,
        onClick: 'loadPage',
		onClickArgs: ['peeks_test'],
	}).animate({
        duration: animDuration,
        delay: animDelay + animItemDelay * itemCount,
		begin: [-90, 0, 0],
		end: [0, 0, 0],
        attribute: 'rotation'
	});

	return page;
});
