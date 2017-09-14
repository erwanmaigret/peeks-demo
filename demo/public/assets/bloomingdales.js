PEEKS.registerPage('bloomingdales', function() {
	var page = new PEEKS.Asset();

	page.addImage({
		image: 'images/wall_bricks.jpg',
		imageRepeat: [3, 3],
		position: [0, 0, -10.1],
		rotation: [0, 0, 0],
		size: 21,
	});

	page.addImage({
		image: 'images/wall_bricks.jpg',
		imageRepeat: [3, 3],
		position: [-10, 0, 0],
		rotation: [0, 90, 0],
		size: 21,
	});

	page.addImage({
		image: 'images/wall_bricks.jpg',
		imageRepeat: [3, 3],
		position: [10, 0, 0],
		rotation: [0, -90, 0],
		size: 21,
	});

	page.addImage({
		image: 'images/bloomingdales_logo.png',
		position: [0, 2.5, -4],
		size: [4, .8, 1],
	});

	page.addGeometry({
		geometry: 'assets/ball_chair.obj',
		position: [-2, -1, 0],
		rotation: [0, 45, 0],
	});

	page.addImage({
		image: 'images/floor_wood.jpg',
		imageRepeat: [10, 10],
		position: [0, -1, 0],
		rotation: [-90, 0, 0],
		size: 20,
	});

	// Imported from Bloomingdales website:
	var assets = [
		['9427112_fpx.jpeg', '9427113_fpx.jpeg'],
		['9477418_fpx.jpeg', '9477419_fpx.jpeg'],
		['9513483_fpx.jpeg', '9513484_fpx.jpeg'],
		['9579778_fpx.jpeg', '9579779_fpx.jpeg'],
		['9617416_fpx.jpeg', '9617417_fpx.jpeg'],
	];

	for (var assetI = 0; assetI < assets.length; assetI++) {
		page.addButton({
			image: 'images/' + assets[assetI][0],
			imageBack: 'images/' + assets[assetI][1],
			position: [assetI - assets.length / 2 + .5, 0, -3],
			rotation: [0, 0, 0],
			size: [1, 1.2, 1],
			onClick: 'animateFlip',
		}).animate({
			duration: 1 + Math.random() * 2,
			delay: 1 + Math.random() * 3,
			begin: [0, -2, 0],
			end: [0, 0, 0],
			attribute: 'position'
		});
	}

	for (var x = 1; x <= 4; x++) {
		var position = [(-2.5 + x) * 2, 0, 0];
		page.addImage({
			image: 'images/dress' + x.toString() + '.png',
			position: position,
			rotation: [0, 0, 0],
			size: [1,1.5, 1],
		}).animate({
			duration: 1 + Math.random() * 2,
			delay: 1 + Math.random() * 3,
			begin: [0, -2, 0],
			end: [0, 0, 0],
			attribute: 'position'
		});
	}

	page.addPage('peeks_toolbar');

	return page;
});
