PEEKS.registerPage('peeks.home', function() {
	var page = new PEEKS.Asset();

    var canvas = page.addCanvas();

    canvas.addTextButton({
        label: 'Peeks SDK',
        position: [0, 0, 0],
        size: [.9, .15, 1],
        fontSize: 40,
    }).animate({
        duration: 3,
        delay: 2,
        begin: [10, 0, 0],
        end: [0, 0, 0],
        attribute: 'position'
    });

    canvas.addView({
        position: [0, .1],
        size: [4, 1, 1],
    }).animate({
        duration: 2,
        delay: 1,
        begin: [1, 1, 1],
        end: [1, .003, 1],
        attribute: 'size'
    }).animate({
        duration: 2,
        delay: 1,
        begin: [0, .5, 0],
        end: [0, 0, 0],
        attribute: 'position'
    });

    canvas.addView({
        position: [0, -.1],
        size: [4, 1, 1],
    }).animate({
        duration: 2,
        delay: 2,
        begin: [1, 1, 1],
        end: [1, .003, 1],
        attribute: 'size'
    }).animate({
        duration: 2,
        delay: 2,
        begin: [0, -.5, 0],
        end: [0, 0, 0],
        attribute: 'position'
    });

	return page;
});
