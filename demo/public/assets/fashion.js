PEEKS.registerPage('2D Assets', function() {
	var page = new PEEKS.Asset({
        fontColor: [0, 0, 0],
        category: 'fashion',
    });

	// Imported from Bloomingdales website:
	var assets = [
		['9427112_fpx.png', '9427113_fpx.png'],
		['9477418_fpx.png', '9477419_fpx.png'],
		['9513483_fpx.png', '9513484_fpx.png'],
		['9579778_fpx.png', '9579779_fpx.png'],
		['9617416_fpx.png', '9617417_fpx.png'],
		['9427112_fpx.png', '9427113_fpx.png'],
		['9477418_fpx.png', '9477419_fpx.png'],
		['9513483_fpx.png', '9513484_fpx.png'],
		['9579778_fpx.png', '9579779_fpx.png'],
		['9617416_fpx.png', '9617417_fpx.png'],
		['9427112_fpx.png', '9427113_fpx.png'],
		['9477418_fpx.png', '9477419_fpx.png'],
		['9513483_fpx.png', '9513484_fpx.png'],
		['9579778_fpx.png', '9579779_fpx.png'],
		['9617416_fpx.png', '9617417_fpx.png'],
		['9427112_fpx.png', '9427113_fpx.png'],
		['9477418_fpx.png', '9477419_fpx.png'],
		['9513483_fpx.png', '9513484_fpx.png'],
	];

	var panel = page.addAsset();

    var hideInfo = function () {
        var infoPage = this.parent;
        infoPage.animate({
            duration: 1,
            begin: [0, 0, 0],
            end: [0, -.6, 0],
            attribute: 'position'
        });
        infoPage.parent.assetPage.infoVisible = false;
    };

    var showInfo = function () {
        var asset = this.parent;
        if (asset) {
            if (this.infoVisible) {
                this.animateFlip();
            } else {
                this.infoVisible = true;

                asset.assetPage = this;
                if (asset.infoPage === undefined) {
                    asset.infoPage = asset.addAsset({
                        position: [0, 0, -.2],
                    });
                    var pane = asset.infoPage.addButton({
                        size: 1,
                        alpha: 0,
                        onClick: hideInfo,
                    });
                    pane.addText({
                		position: [0, 0, .1],
                		text: 'Product Name',
                        textAlign: 'center',
                        fontSize: 40
                	});
                }
                asset.infoPage.animate({
                    duration: 1,
                    begin: [0, 0, 0],
                    end: [0, .6, 0],
                    attribute: 'position'
                });
            }
        }
    };

    var screen = page.addScreen({
        radius: 3,
    });

    for (var assetI = 0; assetI < assets.length; assetI++) {
        var panel = screen.addAsset({
            position: [-1 + assetI * 2 / assets.length, 0, 0],
        });

        panel.addButton({
            image: 'images/' + assets[assetI][0],
            imageBack: 'images/' + assets[assetI][1],
            //position: [-1 + assetI * 2 / assets.length, 0, 0],
            onClick: showInfo,
        });
    }

	page.addPage('peeks_toolbar');

	return page;
});
