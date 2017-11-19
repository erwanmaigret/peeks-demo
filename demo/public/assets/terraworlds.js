PEEKS.registerPage('terraworlds', function() {
	var page = new PEEKS.Asset({
//        colorDark:   [.2, 0.2 , 0.5],
//        colorLight:  [.6, 0.6 , 0.8],
        category: 'white',
    });

    page.setAttr('fontColor', page.getAttr('colorDark'));

    var cubeSize = 1;
    var cubeColor = [0, 1, 0];
    var cubeImage ='/images/minecraft_stone.jpg';
    var cubeRepeat = [3, 3];
    var onClick = function()
    {
        this.addButton({
            position: [0, 0, 1],
            viewBgColor: cubeColor,
            image: cubeImage,
            imageRepeat: cubeRepeat,
            onClick: onClick,
            size: cubeSize,
            sides: 'front',
        });
        this.addButton({
            position: [0, -.5, .5],
            rotation: [90, 0, 0],
            viewBgColor: cubeColor,
            image: cubeImage,
            imageRepeat: cubeRepeat,
            onClick: onClick,
            size: cubeSize,
            sides: 'front',
        });
        this.addButton({
            position: [0, .5, .5],
            rotation: [-90, 0, 0],
            viewBgColor: cubeColor,
            image: cubeImage,
            imageRepeat: cubeRepeat,
            onClick: onClick,
            size: cubeSize,
            sides: 'front',
        });
        this.addButton({
            position: [0.5, 0, .5],
            rotation: [0, 90, 0],
            viewBgColor: cubeColor,
            image: cubeImage,
            imageRepeat: cubeRepeat,
            onClick: onClick,
            size: cubeSize,
            sides: 'front',
        });
        this.addButton({
            position: [-0.5, 0, .5],
            rotation: [0, -90, 0],
            viewBgColor: cubeColor,
            image: cubeImage,
            imageRepeat: cubeRepeat,
            onClick: onClick,
            size: cubeSize,
            sides: 'front',
        });
    };

	var size = 15;
	for (var x = -size; x < size; x++) {
		for (var z = -size; z < size; z++) {
			page.addButton({
                position: [x / 2, -1, z / 2],
				rotation: [-90, 0, 0],
                viewBgColor: [.3, .5, .2],
                //size: .97,
                sides: 'front',
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

	page.addPage('peeks_toolbar');

    var canvas = page.addCanvas({
        valign: 'top',
    });

    canvas.addButton({
        position: [.1, .45],
		size: .08,
        image: '/images/minecraft_wood.jpg',
        onClick: function() {
            cubeImage = '/images/minecraft_wood.jpg';
            cubeRepeat = [2, 2];
        },
    });

    canvas.addButton({
        position: [-.1, .45],
		size: .08,
        image: '/images/minecraft_craftingtable.jpg',
        onClick: function() {
            cubeImage = '/images/minecraft_craftingtable.jpg';
            cubeRepeat = [1, 1];
        },
    });

    canvas.addButton({
        position: [.3, .45],
		size: .08,
        image: '/images/minecraft_stone.jpg',
        onClick: function() {
            cubeImage = '/images/minecraft_stone.jpg';
            cubeRepeat = [3, 3];
        },
    });
    canvas.addButton({
        position: [-.3, .45],
        size: .08,
        image: '/images/minecraft_dirt.jpg',
        onClick: function() {
            cubeImage = '/images/minecraft_dirt.jpg';
            cubeRepeat = [1, 1];
        },
    });

    page.onLoad = function () {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                function (position) {
                    console.log("Latitude: " + position.coords.latitude);
                    console.log("longitude: " + position.coords.longitude);
                }
            );
        } else {
            console.log("No geolocation");
        }
    };

    page.onUnload = function () {
    };

    page.onUpdate = function () {
    };

	return page;
});
