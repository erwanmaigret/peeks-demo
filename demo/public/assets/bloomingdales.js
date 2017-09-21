PEEKS.registerPage('bloomingdales', function() {
	var page = new PEEKS.Asset();

	page.addImage({
		image: 'images/wall_bricks.jpg',
		imageRepeat: [3, 3],
		position: [0, 0, -10.1],
		rotation: [0, 0, 0],
		size: 21,
	});

	page.addImage({
		image: 'images/wall_bricks.jpg',
		imageRepeat: [3, 3],
		position: [-10, 0, 0],
		rotation: [0, 90, 0],
		size: 21,
	});

	page.addImage({
		image: 'images/wall_bricks.jpg',
		imageRepeat: [3, 3],
		position: [10, 0, 0],
		rotation: [0, -90, 0],
		size: 21,
	});

    /*
	page.addImage({
		image: 'images/bloomingdales_logo.png',
		position: [0, 1, -5],
		size: [2, .4, .5],
	});
    */

	/*
	page.addGeometry({
		geometry: 'assets/ball_chair.obj',
		position: [-2, -1, 0],
		rotation: [0, 45, 0],
	});
	*/

	page.addImage({
		image: 'images/floor_wood.jpg',
		imageRepeat: [10, 10],
		position: [0, -1, 0],
		rotation: [-90, 0, 0],
		size: 20,
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
            end: [.4, 0, 0],
            attribute: 'position'
        });
        infoPage.parent.assetPage.animate({
            duration: 1,
            begin: [0, 0, 0],
            end: [-.4, 0, 0],
            attribute: 'position'
        });;
        infoPage.parent.assetPage.infoVisible = false;
    };

    var showInfo = function () {
        var asset = this.parent;
        if (asset) {
            if (this.infoVisible) {
                this.animateFlip();
            } else {
                this.infoVisible = true;

                this.animate({
                    duration: 1,
                    begin: [0, 0, 0],
                    end: [.4, 0, 0],
                    attribute: 'position'
                });

                asset.assetPage = this;
                if (asset.infoPage === undefined) {
                    asset.infoPage = asset.addAsset({
                        position: [0, 0, -.1],
                        size: .6,
                    });
                    var pane = asset.infoPage.addButton({
                        size: 1,
                        alpha: 0,
                        onClick: hideInfo,
                    });
                    pane.addImage({
                		position: [0, -.2, .1],
                        size: 1,
                        image: 'images/bloomingdales_product_card.png',
                	});
                    pane.addText({
                		position: [0, .4, .1],
                        size: 1,
                		text: 'Product Name',
                        textAlign: 'center',
                        fontSize: 18
                	});
                    /*
                    pane.addText({
                		position: [.1, .3, .1],
                        size: 1,
                		text: 'Product description',
                        textAlign: 'left',
                        fontSize: 12
                	});
                    */
                }
                asset.infoPage.animate({
                    duration: 1,
                    begin: [0, 0, 0],
                    end: [-.4, 0, 0],
                    attribute: 'position'
                });
            }
        }
    };

	for (var assetI = 0; assetI < assets.length; assetI++) {
		var pivot = panel.addAsset({
			rotation: [0, (assetI - assets.length / 2) * 20, 0]
		});

        if (assetI === 8) {
            pivot.addGeometry({
                geometry: 'assets/shoes_1.obj',
                texture: 'assets/shoes_1.jpg',
                position: [0, -.5, -4],
                rotation: [0, 40, 0],
                size: .02,
                onClick: `animateFlip`,
            });
        } else {
            var asset = pivot.addAsset({
    			position: [0, 0, -4],
    		});
    		asset.addButton({
    			image: 'images/' + assets[assetI][0],
    			imageBack: 'images/' + assets[assetI][1],
    			rotation: [0, 0, 0],
    			size: [1, 1.2, 1],
    			onClick: showInfo,
    		});
        }
	}

    var entranceAnimation = true;
    if (entranceAnimation) {
    	panel.animate({
    		duration: 3,
    		begin: [0, -100, 0],
    		end: [0, 0, 0],
    		attribute: 'rotation'
    	});
    }

	/*
	for (var x = 1; x <= 4; x++) {
		var position = [(-2.5 + x) * 2, 0, 0];
		page.addImage({
			image: 'images/dress' + x.toString() + '.png',
			position: position,
			rotation: [0, 0, 0],
			size: [1,1.5, 1],
		}).animate({
			duration: 1 + Math.random() * 2,
			delay: 1 + Math.random() * 3,
			begin: [0, -2, 0],
			end: [0, 0, 0],
			attribute: 'position'
		});
	}
	*/

    var canvas = page.addCanvas();
    canvas.addImage({
        image: 'images/bloomingdales_banner.png',
        position: [0, .45],
        size: [.8, .2, 1],
    });
	page.addPage('peeks_toolbar');

	return page;
});
