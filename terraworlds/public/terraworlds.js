function onClickTile() {
    if (this.game.tool.image) {
        this.addButton({
            position: [0, 0, .1],
            image: this.game.tool.image,
            imageRepeat: [this.game.tool.tiles, this.game.tool.tiles],
            onClick: onClickTile,
            sides: 'front',
            game: this.game,
        });
    } else {
        if (!this.isRoot) {
            this.destroy();
        }
    }
};

function addTile(game, x, y, z) {
    var tile = game.addButton({
        position: [x / 2, -1, z / 2],
        rotation: [-90, 0, 0],
        viewBgColor: [.3, .3, .3],
        sides: 'front',
        size: .5,
        onClick: onClickTile,
        isRoot: true,
    });
    tile.game = game;
};

PEEKS.registerPage('Terraworlds', function() {
	var page = new PEEKS.Asset({
        category: 'white',
    });

    var game = page;

    page.setAttr('fontColor', page.getAttr('colorDark'));

    var tool = {};
    game.tool = tool;

	var size = 15;
	for (var x = -size; x < size; x++) {
		for (var z = -size; z < size; z++) {
            addTile(game, x, 0, z);
        }
	}

    var canvas = page.addCanvas({
        valign: 'top',
    });

    var tools = [];
    game.tools = tools;
    game.setTool = function(tool) {
        if (!game.toolSelection) {
            var border = canvas.addImage({
                position: [0, 0],
                size: .08,
                image: '/images/tool_selection.png',
            });
            game.toolSelection = border;
        }

        for (var toolI = 0; toolI < game.tools.length; toolI++) {
            var toolCurrent = game.tools[toolI];
            if (toolCurrent.border) {
                toolCurrent.border.animate({
                    duration: .3,
                    begin: [1, 1, 1],
                    end: [0.5, 0.5, 0.5],
                    attribute: 'size'
                });
                toolCurrent.border = undefined;
            }
        }

        var toolPosition = tool.getAttr('position');
        var currentPosition = game.toolSelection.getAttr('position');
        game.toolSelection.animate({
            duration: .3,
            begin: [0, 0, 0],
            end: [
                toolPosition[0] - currentPosition[0],
                toolPosition[1] - currentPosition[1],
                toolPosition[2] - currentPosition[2]
            ],
            attribute: 'position'
        });
    };

    game.addTool = function(icon, image, tiles) {
        var button = canvas.addButton({
            position: [-.5 + tools.length * .1, .45],
    		size: .08,
            image: icon,
            game: game,
            onFocus: "",
            onClick: function() {
                game.setTool(this);
                tool.image = image;
                tool.tiles = tiles;
            },
        });
        tools.push(button);
    }

    game.addTool('/images/minecraft_wood.jpg', '/images/minecraft_wood.jpg', 2);
    game.addTool('/images/minecraft_craftingtable.jpg', '/images/minecraft_craftingtable.jpg', 1);
    game.addTool('/images/minecraft_stone.jpg', '/images/minecraft_stone.jpg', 3);
    game.addTool('/images/minecraft_dirt.jpg', '/images/minecraft_dirt.jpg', 1);
    game.addTool('/images/icon_trash.png', undefined, 1);
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
