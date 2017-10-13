PEEKS.registerPage('terraworlds', function() {
	var page = new PEEKS.Asset({
        colorDark:   [.2, 0.2 , 0.5],
        colorLight:  [.6, 0.6 , 0.8],
    });

    page.setAttr('bgColor', page.getAttr('colorDark'));
    page.setAttr('fontColor', page.getAttr('colorDark'));

    var cubeSize = 1;
    var cubeColor = [0, 1, 0];
    var cubeImage ='images/minecraft_stone.jpg';
    var cubeRepeat = [3, 3];
    var onClick = function()
    {
        this.addButton({
            position: [0, 0, -1],
            viewBgColor: cubeColor,
            image: cubeImage,
            imageRepeat: cubeRepeat,
            onClick: onClick,
            size: cubeSize,
        });
        this.addButton({
            position: [0, -.5, -.5],
            rotation: [90, 0, 0],
            viewBgColor: cubeColor,
            image: cubeImage,
            imageRepeat: cubeRepeat,
            onClick: onClick,
            size: cubeSize,
        });
        this.addButton({
            position: [0, .5, -.5],
            rotation: [90, 0, 0],
            viewBgColor: cubeColor,
            image: cubeImage,
            imageRepeat: cubeRepeat,
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
            viewBgColor: cubeColor,
            image: cubeImage,
            imageRepeat: cubeRepeat,
            onClick: onClick,
            size: cubeSize,
        });
        this.addButton({
            position: [-0.5, 0, -.5],
            rotation: [0, 90, 0],
            viewBgColor: cubeColor,
            image: cubeImage,
            imageRepeat: cubeRepeat,
            onClick: onClick,
            size: cubeSize,
        });
    };

	var size = 15;
	for (var x = -size; x < size; x++) {
		for (var z = -size; z < size; z++) {
			page.addButton({
                position: [x / 2, -1, z / 2],
				rotation: [90, 0, 0],
                //size: .97,
                sides: 'both',
                size: .5,
				onClick: onClick,
			}).animate({
				duration: 2 + Math.random() * 1,
				delay: .5 + Math.random() * .5,
				p0: [0, 0, 0],
				p1: [10, .3,0],
				p2: [-15, -4, 0],
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

    var canvas = page.addCanvas({
        valign: 'top',
    });

    canvas.addRoundTextButton({
        position: [.15, .45],
		size: .08,
        label: 'W',
        fontSize: 40,
        onClick: function() {
            cubeImage = 'images/minecraft_wood.jpg';
            cubeRepeat = [2, 2];
        },
    });

    canvas.addRoundTextButton({
        position: [-.15, .45],
		size: .08,
        label: 'C',
        fontSize: 40,
        onClick: function() {
            cubeImage = 'images/minecraft_craftingtable.jpg';
            cubeRepeat = [1, 1];
        },
    });

    canvas.addRoundTextButton({
        position: [0, .45],
		size: .08,
        label: 'S',
        fontSize: 40,
        onClick: function() {
            cubeImage = 'images/minecraft_stone.jpg';
            cubeRepeat = [3, 3];
        },
    });
    canvas.addRoundTextButton({
        position: [-.3, .45],
        size: .08,
        label: 'G',
        fontSize: 40,
        onClick: function() {
            cubeImage = 'images/minecraft_dirt.jpg';
            cubeRepeat = [1, 1];
        },
    });
	return page;
});
