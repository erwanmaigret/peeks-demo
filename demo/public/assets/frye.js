PEEKS.registerPage('frye', function() {
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

    var imagePath = 'https://s003.osstatic.net/s/FRYE/store/productimages/master/';

    page.setAssetPath(imagePath);

    page.addSiteMapItem('GIFTS', { icon: '76374_black_f.jpg'} );
    page.addSiteMapItem('GIFTS/FEATURES', { icon: '76374_black_f.jpg'} );
    page.addSiteMapItem('NEW', { icon: '76374_black_f.jpg'} );
    page.addSiteMapItem('WOMEN', { icon: '76374_black_f.jpg'} );
    page.addSiteMapItem('WOMEN/FEATURES', { icon: '76374_black_f.jpg'} );
    page.addSiteMapItem('WOMEN/FEATURES/BOOTS', { icon: '76374_black_f.jpg'} );
    page.addSiteMapItem('WOMEN/COLLECTIONS', { icon: '76374_black_f.jpg'} );
    page.addSiteMapItem('WOMEN/BOOTS', { icon: '76374_black_f.jpg'} );
    page.addSiteMapItem('WOMEN/SHOES', { icon: '76374_black_f.jpg'} );
    page.addSiteMapItem('WOMEN/SHOES/ALL SHOES', { icon: '76374_black_f.jpg'} );
    page.addSiteMapItem('WOMEN/SHOES/ALL SHOES/1', { icon: '76373_dusty_rose', isProduct: true });
    page.addSiteMapItem('WOMEN/SHOES/FLATS', { icon: '76374_black_f.jpg'} );
    page.addSiteMapItem('WOMEN/SHOES/HEELS', { icon: '76374_black_f.jpg'} );
    page.addSiteMapItem('WOMEN/SHOES/HEELS/1', { icon: '76373_dusty_rose', isProduct: true });
    page.addSiteMapItem('WOMEN/SHOES/HEELS/2', { icon: '76374_black', isProduct: true });
    page.addSiteMapItem('WOMEN/SHOES/SANDALS', { icon: '76374_black_f.jpg'} );
    page.addSiteMapItem('WOMEN/SHOES/SNEAKERS', { icon: '76374_black_f.jpg'} );
    page.addSiteMapItem('WOMEN/BAGS', { icon: '76374_black_f.jpg'} );
    page.addSiteMapItem('WOMEN/ACCESSORIES', { icon: '76374_black_f.jpg'} );
    page.addSiteMapItem('MEN', { icon: '76374_black_f.jpg'} );
    page.addSiteMapItem('MELISSA', { icon: '76374_black_f.jpg'} );
    page.addSiteMapItem('BAGS', { icon: '76374_black_f.jpg'} );
    page.addSiteMapItem('ACCESSORIES', { icon: '76374_black_f.jpg'} );
    page.addSiteMapItem('KIDS', { icon: '76374_black_f.jpg'} );
    page.addSiteMapItem('SALE', { icon: '76374_black_f.jpg'} );

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
        page.setSiteMapPath('WOMEN/SHOES/HEELS');
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
                var image = item.image + (item.isProduct ? '_l.jpg' : '');
                var imageBack = item.isProduct ? item.image + '_f.jpg' : undefined;
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
