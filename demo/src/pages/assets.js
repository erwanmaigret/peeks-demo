PEEKS.registerPage('peeks.demo.assets', function() {
    var page = new PEEKS.Asset({
        category: 'fashion',
    });

    page.addPage('peeks.toolbar');

    page.addCurvedPanel({
        size: 5,
        texture: '/images/logo_lacoste.png',
        rotation: [20, 0, 0],
    });

    page.addCurvedPanel({
        size: 5,
        texture: '/images/logo_converse.png',
        position: [0, 1],
        rotation: [0, 30, 0],
    });

    page.addCurvedPanel({
        size: 5,
        texture: '/images/logo_converse.png',
        position: [0, 1],
        rotation: [0, -30, 0],
    });

    page.addMesh({
		geometry: '/assets/converse.obj',
		texture: '/assets/converse.jpg',
		position: [-1, 0, -3],
		rotation: [0, 0, 0],
		size: .05,
        onClick: 'animateRotate90',
	});

    page.addAsset({
        position: [0, .5, -3],
        onClick: 'animateRotate90',
    }).addMesh({
		geometry: '/assets/lacoste_polo_shirt.obj',
		texture: '/assets/lacoste_polo_shirt.jpg',
        rotation: [-90, 0, 0],
		size: .02,
	});

    page.addMesh({
        geometry: '/assets/black_leather_shoes.obj',
        texture: '/assets/black_leather_shoes.png',
        position: [1.5, 0, -3],
        rotation: [0, 200, 0],
        size: .1,
        onClick: 'animateRotate90',
    });

	return page;
});
