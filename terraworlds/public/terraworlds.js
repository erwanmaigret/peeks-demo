PEEKS.registerPage('Terraworlds', function() {
	var page = new PEEKS.Asset({
        category: 'white',
    });

    page.setAttr('fontColor', page.getAttr('colorDark'));

    var tool = {};

    var cubeSize = 1;
    var cubeColor = [0, 1, 0];
    var cubeImage ='/images/minecraft_stone.jpg';
    var cubeRepeat = [3, 3];
    var onClick = function() {
        if (tool.image) {
            this.addButton({
                position: [0, 0, .1],
                viewBgColor: cubeColor,
                image: tool.image,
                imageRepeat: [tool.tiles, tool.tiles],
                onClick: onClick,
                size: cubeSize,
                sides: 'front',
            });
        } else {
            if (!this.isRoot) {
                this.destroy();
            }
        }
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
                isRoot: true,
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

    var canvas = page.addCanvas({
        valign: 'top',
    });

    var tools = [];
    var addTool = function(icon, image, tiles) {
        var button = canvas.addButton({
            position: [-.5 + tools.length * .1, .45],
    		size: .08,
            image: icon,
            onClick: function() {
                tool.image = image;
                tool.tiles = tiles;
            },
        });
        tools.push(button);
    }

    addTool('/images/minecraft_wood.jpg', '/images/minecraft_wood.jpg', 2);
    addTool('/images/minecraft_craftingtable.jpg', '/images/minecraft_craftingtable.jpg', 1);
    addTool('/images/minecraft_stone.jpg', '/images/minecraft_stone.jpg', 3);
    addTool('/images/minecraft_dirt.jpg', '/images/minecraft_dirt.jpg', 1);
    addTool('/images/minecraft_wood.jpg', undefined, 1);
    tools[0].onClick();

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
