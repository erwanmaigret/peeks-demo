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
		geometry: 'assets/vr_controller_vive_1_5.obj',
		texture: 'assets/vr_controller_vive_1_5.png',
		position: [1.5, 0, 0],
		size: 3,
	}).animate({
		duration: 10,
		begin: [0, 0, 0],
		end: [360, 360, 360],
		attribute: 'rotation',
		loop: true
	});

	page.addGeometry({
		geometry: 'assets/ball_chair.obj',
		position: [-2, -1, 0],
		rotation: [0, 45, 0],
	});

	page.addButton({
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
		page.addImage({
			image: 'images/' + assets[assetI][0],
			imageBack: 'images/' + assets[assetI][1],
			position: [assetI - assets.length / 2 + .5, 0, -3],
			rotation: [0, 0, 0],
			size: [1, 1.2, 1],
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

	canvas.animate({
		duration: 2,
		delay: 4,
		begin: [-5, 0, -2],
		end: [0, 0, 0],
		attribute: 'position'
	});
	canvas.animate({
		duration: 1,
		delay: 5,
		begin: [0, 0, 20],
		end: [0, 0, 0],
		attribute: 'rotation'
	});

	return page;
});
