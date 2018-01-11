PEEKS.registerPage('gameMatch3', function() {
	var page = new PEEKS.Asset({
    });

    var grid = page.addAsset({
        position: [0, 0, -3],
    });

    var gridWidth = 4;
    var gridHeight = 3;
    var tileOffset = .2;
    var tileSize = .25;

    var onClick = function() {
        this.animateFlip();
    };

    var createTile = function(position) {
        var tile = grid.addAsset({
            position: [
                (position[0] - gridWidth / 2) * tileOffset,
                (position[1] - gridHeight / 2) * tileOffset,
                0],
        });
        tile.addButton({
            image: 'http://us.louisvuitton.com/images/is/image/lv/1/PP_VP_AS/louis-vuitton--FESK91FLD001_PM2_Front%20view.jpg',
            size: tileSize,
            imageDetour: true,
            onClick: onClick,
        });
    };

    var tiles = [];
    for (var gridX = 0; gridX < gridWidth; gridX++) {
        for (var gridY = 0; gridY < gridHeight; gridY++) {
            createTile([gridX, gridY]);
        }
    }

	return page;
});
