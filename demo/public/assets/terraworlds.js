PEEKS.registerPage('terraworlds', function() {
	var page = new PEEKS.Asset({
        colorDark:   [.2, 0.2 , 0.5],
        colorLight:  [.6, 0.6 , 0.8],
    });

    page.setAttr('bgColor', page.getAttr('colorDark'));
    page.setAttr('fontColor', page.getAttr('colorDark'));

    var cubeSize = 1;
    var cubeColor = [0,0,0];
    var onClick = function()
    {
        this.addButton({
            position: [0, 0, -1],
            viewBgColor: [Math.random(),Math.random(),Math.random()],
            onClick: onClick,
            size: cubeSize,
        });
        this.addButton({
            position: [0, -.5, -.5],
            rotation: [90, 0, 0],
            viewBgColor: [Math.random(),Math.random(),Math.random()],
            onClick: onClick,
            size: cubeSize,
        });
        this.addButton({
            position: [0, .5, -.5],
            rotation: [90, 0, 0],
            viewBgColor: [Math.random(),Math.random(),Math.random()],
            onClick: onClick,
            size: cubeSize,
        });
        /*
        this.addButton({
            position: [0, 0, 0],
            viewBgColor: [Math.random(),Math.random(),Math.random()],
            onClick: onClick,
            size: cubeSize,
        });
        */
        this.addButton({
            position: [0.5, 0, -.5],
            rotation: [0, 90, 0],
            viewBgColor: [Math.random(),Math.random(),Math.random()],
            onClick: onClick,
            size: cubeSize,
        });
        this.addButton({
            position: [-0.5, 0, -.5],
            rotation: [0, 90, 0],
            viewBgColor: [Math.random(),Math.random(),Math.random()],
            onClick: onClick,
            size: cubeSize,
        });
    };

	var size = 15;
	for (var x = -size; x < size; x++) {
		for (var z = -size; z < size; z++) {
			page.addButton({
                position: [x, -1, z],
				rotation: [90, 0, 0],
				size: .97,
				onClick: onClick,
			}).animate({
				duration: .1 + Math.random() * 1,
				delay: .5 + Math.random() * .5,
				p0: [0, 0, 0],
				p1: [10, -.3,0],
				p2: [-15, 4, 0],
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
