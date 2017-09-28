PEEKS.registerPage('terraworlds', function() {
	var page = new PEEKS.Asset();

	page.setAttr('bgColor', [.2, .2, .4]);

	var size = 15;
	for (var x = -size; x < size; x++) {
		for (var z = -size; z < size; z++) {
			page.addButton({
				position: [x, -1, z],
				rotation: [90, 0, 0],
				size: .97,
				onClick: function() {
                    this.setAttr('viewBgColor', [.2, 1, .2]);
				}
			}).animate({
				duration: 2 + Math.random() * 2,
				delay: .5 + Math.random() * .5,
				p0: [0, 0, 0],
				p1: [0, -.3, 0],
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
