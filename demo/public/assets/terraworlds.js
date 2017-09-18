PEEKS.registerPage('terraworlds', function() {
	var page = new PEEKS.Asset();

	page.setBgColor(0, 0, .1);

	var size = 20;
	for (var x = -size; x < size; x++) {
		for (var z = -size; z < size; z++) {
			page.addButton({
				position: [x, -1, z],
				rotation: [90, 0, 0],
				size: .9,
				onClick: function() {
					this.setViewBgColor(.2, 1, .2);
				}
			}).animate({
				duration: 3 + Math.random() * 4,
				delay: Math.random() * 3,
				p0: [0, 0, 0],
				p1: [0, -.5, 0],
				p2: [0, -.1, 0],
				p3: [0, 0, 0],
				attribute: 'position',
				//loop: true
			});
		}
	}

	page.addGeometry({
		geometry: 'assets/vr_controller_vive_1_5.obj',
		texture: 'assets/vr_controller_vive_1_5.png',
		position: [1, 0, -5],
		rotation: [80, -30, 10],
		size: 5,
	}).animate({
		duration: 7,
		delay: 3,
		p0: [0, 0, 0],
		p1: [30, 30, 0],
		p2: [-30, -30, 0],
		p3: [0, 0, 0],
		attribute: 'rotation',
		loop: true
	});

	page.addGeometry({
		geometry: 'assets/vr_controller_vive_1_5.obj',
		texture: 'assets/vr_controller_vive_1_5.png',
		position: [-1, 0, -5],
		rotation: [80, 30, 0],
		size: 5,
	}).animate({
		duration: 6,
		p0: [0, 0, 0],
		p1: [30, -30, 0],
		p2: [-10, 30, 0],
		p3: [0, 0, 0],
		attribute: 'rotation',
		loop: true
	});

	page.addPage('peeks_toolbar');

	return page;
});
