PEEKS.registerPage('assets', function() {
    var page = new PEEKS.Asset({
        title: 'Assets',
        category: 'fashion',
    });

    page.addPage('peeks_toolbar');

    page.addGeometry({
		geometry: 'assets/converse.obj',
		texture: 'assets/converse.jpg',
		position: [-1, 0, -5],
		rotation: [0, 0, 0],
		size: .1,
	});

    page.addGeometry({
		geometry: 'assets/lacoste_polo_shirt.obj',
		texture: 'assets/lacoste_polo_shirt.jpg',
        position: [1, 0, -5],
		rotation: [-90, 0, 0],
		size: .02,
	});

	return page;
});
