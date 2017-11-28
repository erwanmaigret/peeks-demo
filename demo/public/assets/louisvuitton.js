PEEKS.registerPage('louisvuitton', function() {
	var page = new PEEKS.Asset({
        fontColor: [0, 0, 0],
        fontColorBold: [0, 0, 0],
        fontOutlineStyle: '',
        fontName: 'Helvetica Neue',
        bgColor: [1, 1, 1],
        category: 'white',
        groundImage: '/ui/gradient_radial.png',
        groundImageRepeat: 1,
        backgroundImage: '/ui/gradient.png',
    });

	var panel = page.addAsset();

    var screen = page.addScreen({
        radius: 5,
    });

    page.setAssetPath('https://target.scene7.com/is/image/Target/');

    page.addSiteMapItem('clothing', { icon: '53451-160411_1460383116963'} );
    page.addSiteMapItem("clothing/women's clothing", { icon: '52690603'} );
    page.addSiteMapItem("boys' shoes", { icon: '53452-160411_1460402111660'} );
    page.addSiteMapItem('Promotions');
    page.addSiteMapItem("Promotions/Our Black Friday deals", { description: "Get a sneak peek now", icon: '2017_NovWk2_HP_StoryBlocks_v1_21103877-171101_1509556671597'} );
    page.addSiteMapItem("Promotions/20% off trees, wreaths & lights", { description: "Get your Christmas decor now", icon: '2017_NovWk2_HP_StoryBlocks_v1_03103877-171026_1509030239564'} );

    var imagePath = 'https://target.scene7.com/is/image/Target/';

    page.setSiteMapMenuPath('');
    page.setSiteMapPath('Promotions');

    var currentItems = [];

    page.onUpdateSiteMapPath = function() {
        refresh();
    };

    var onClick = function() {
        if (page.siteMapPathIsLeaf(this.path)) {
            page.setSiteMapPath(this.path);
        } else {
            page.setSiteMapMenuPath(this.path);
        }
        refresh();
    };

    var onToggleProduct = function() {
        if (this.productPane === undefined) {
            var productPane = this.parent.addView({
                position: [0, .75, -.1],
                size: [.8, .4, 1],
                viewBgColor: [.96, .96, .96],
            });

            var product = this.product;
            if (product) {
                var url = 'https://redsky.target.com/v2/pdp/tcin/' + product;
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var data = JSON.parse(this.responseText);

                        productPane.addText({
                            viewBgColor: page.fontColorBold,
                            position: [0, .4, .01],
                            size: [.9, .2, 1],
                            fontSize: 52,
                            fontColor: [.3, .3, .3],
                            text: data.product.item.product_brand.brand,
                        });

                        productPane.addText({
                            viewBgColor: page.fontColorBold,
                            position: [-.3, -.3, .01],
                            size: [.3, .2, 1],
                            fontSize: 52,
                            fontColor: [.3, .3, .3],
                            text: data.product.price.listPrice.formattedPrice,
                        });
                    }
                };
                xhttp.open("GET", url, true);
                xhttp.send();
            }

            productPane.addText({
                viewBgColor: page.fontColorBold,
                position: [0, .2, .01],
                size: [.3, .2, 1],
                fontSize: 42,
                fontColor: [.3, .3, .3],
                text: 'sizes',
            });

            for (var i = 0; i < 5; i++) {
                productPane.addButton({
                    position: [-.36 + .18 * i, .0, .01],
                    size: [.15, .2, 1],
                    viewBgColor: [1, 1, 1],
                }).addText({
                    position: [0, 0, .01],
                    fontSize: 52,
                    fontColor: [.3, .3, .3],
                    text: (6 + i * 2).toString(),
                });
            }

            productPane.addButton({
                viewBgColor: page.fontColorBold,
                position: [.2, -.3, .01],
                size: [.4, .2, 1],
            }).addText({
                position: [0, 0, .01],
                fontSize: 52,
                fontColor: [1, 1, 1],
                text: 'add to cart',
            });

            productPane.animate({
                duration: .6,
                delay: .5,
                begin: [0, -1, 0],
                end: [0, 0, 0],
                attribute: 'position'
            });

            this.productPane = productPane;
        } else {
            this.productPane.destroy();
            this.productPane = undefined;
        }
    };

    var subMenuY = .3;
    var highlightsY = 0;

    var menuPopup;

    var onHome = function(path) {
        page.setSiteMapMenuPath('');
        page.setSiteMapPath('Promotions');
        refresh();
    };

    var refresh = function() {
        //
        // Remove previous items
        //

        var itemCount = currentItems.length;
        for (var itemI = 0; itemI < itemCount; itemI++) {
            currentItems[itemI].destroy();
        }
        currentItems = [];

        //
        // Update elements
        //

        var itemCountMax = 18;
        var itemStep = .055;

        var items = page.querySiteMapMenuAssets();

        // Current navigation level
        if (items) {
            var itemCount = items.length;
            for (var itemI = 0; itemI < itemCount; itemI++) {
                var item = items[itemI];
                var xIndex = itemI;
                var yOffset = subMenuY;
                while (xIndex >= 9) {
                    yOffset += .2;
                    xIndex -= 9;
                }
                var xOffset = (xIndex % 2 === 0) ? (-xIndex * itemStep) : (xIndex + 1) * itemStep;
                var asset = screen.addAsset({
                    position: [xOffset, yOffset, 0],
                    size: .4,
                });
                var button = asset.addButton({
                    image: item.image ? imagePath + item.image : undefined,
                    path: item.path,
                    onClick: onClick,
                })
                asset.addText({
                    position: [0, -.6, .1],
                    fontSize: 80,
                    text: item.name,
                    path: item.path,
                    onClick: onClick,
                });
                currentItems.push(asset);
            }
        }

        items = page.querySiteMapAssets();
        if (items) {
            var itemCount = items.length;
            for (var itemI = 0; itemI < itemCount; itemI++) {
                var item = items[itemI];
                var asset = screen.addAsset({
                    position: [(itemI % 2 === 0) ? (-itemI * itemStep) : (itemI + 1) * itemStep, highlightsY, 0],
                });
                var image = item.image;
                var imageBack = item.isProduct ? item.image + '_Alt01' : undefined;
                var button = asset.addButton({
                    image: image ? imagePath + image : undefined,
                    imageBack: imageBack ? imagePath + imageBack : undefined,
                    path: item.path,
                    valign: 'bottom',
                    onClick: item.isProduct ? 'animateFlip' : undefined,
                });
                var yOffset = -.6
                if (item.isProduct) {
                    asset.addText({
                        position: [0, yOffset, .1],
                        fontSize: 40,
                        text: 'details',
                        product: item.icon,
                        onClick: onToggleProduct,
                    });
                    yOffset -= .2;
                } else {
                    if (item.name) {
                        asset.addText({
                            position: [0, yOffset, .1],
                            fontSize: 64,
                            fontColor: page.fontColorBold,
                            text: item.name,
                        });
                        yOffset -= .1;
                    }
                    if (item.description) {
                        asset.addText({
                            position: [0, yOffset, .1],
                            fontSize: 40,
                            text: item.description,
                        });
                        yOffset -= .1;
                    }
                }
                currentItems.push(asset);
            }
        }
    };

    onHome();

    var canvas = page.addCanvas({
        valign: 'bottom',
    });

    canvas.addView({
        position: [0, -.45],
        size: [1, .12, 1],
        viewBgColor: [1, 1, 1],
        alpha: .9,
    });

    canvas.addView({
        position: [0, -.45],
        size: [1, .12, 1],
        viewBgColor: [1, 1, 1],
        alpha: .9,
    });

    canvas.addButton({
        image: '/ui/icon_menu.png',
        position: [-.45, -.45],
        size: .07,
        color: page.fontColorBold,
        onClick: 'onShowSiteMapMenu',
    });

    canvas.addButton({
        image: '/ui/icon_vr.png',
        position: [.45, -.45],
        size: .08,
        color: page.fontColorBold,
        onClick: function() { peeks.toggleVrMode(); },
    });

    canvas.addText({
        position: [0, -.45],
        fontSize: 28,
        text: 'search',
        fontColor: [.3, .3, .3],
        size: .08,
        onClick: 'searchPage',
    })


	return page;
});