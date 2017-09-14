PEEKS.registerPage('terraworlds', function() {
	var page = new PEEKS.Asset();

	page.setBgColor(0, 0, .1);

	page.addImage({
		image: 'images/floor_cyber.jpg',
		imageRepeat: [10, 10],
		position: [0, -1, 0],
		rotation: [-90, 0, 0],
		size: 7.5,
	});

	page.addGeometry({
		geometry: 'assets/vr_controller_vive_1_5.obj',
		texture: 'assets/vr_controller_vive_1_5.png',
		position: [1, 0, 0],
		rotation: [80, -30, 0],
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
		position: [-1, 0, 0],
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
