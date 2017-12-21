PEEKS.registerPage('kirkwood', function() {
	var page = new PEEKS.Asset({
        fontColor: [0, 0, 0],
        fontColorBold: [0/255, 0/255, 0/255],
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

    var imagePath = 'http://52.25.54.6/?url=https://www.nicholaskirkwood.com/wp-content/uploads/';
    var siteMap = [
        {
            name: 'NEWS',
            image: '2017/11/Eva-Fehren-featured-image-1.jpg',
        },
        { name: "PROMOTIONS",
            highlightItems: [
                {
                    name: 'NEWS',
                    image: '2017/11/Eva-Fehren-featured-image-1.jpg',
                },
                {
                    name: 'COLLECTIONS',
                    image: '2016/10/3Bulgari-x-NK-collection-RESIZED.jpg',
                },
                {
                    name: 'BULGARI X NICHOLAS KIRKWOOD',
                    image: '2016/10/IMG_4125836x648.jpg',
                },
                {
                    name: '#MYKIRKWOODS',
                    image: '2016/10/IMG_4125836x648.jpg',
                },
            ],
        },
    ];

    var currentPath = '';
    var currentItems = [];
    var currentHighlight = [];

    var onClickRoot = function() {
        currentPath = '/' + this.path;
        onToggleMenu();
        refresh();
    };

    var onClick = function() {
        currentPath = currentPath + "/" + this.path;
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
        if (path) {
            currentPath = path;
        } else {
            currentPath = "";
        }
        currentHighlight = siteMap[siteMap.length - 1].highlightItems;
        refresh();
    };

    var onToggleMenu = function() {
        if (menuPopup === undefined) {
            menuPopup = page.addAsset();

            sphere = menuPopup.addSphere({
                //image: backgroundFilename,
                position: [0, 0, 0],
                rotation: [0, 0, 0],
                sides: 'back',
                size: 4,
                alpha: .96,
                onClick: onToggleMenu,
            });

            menuScreen = menuPopup.addScreen({
                radius: 3,
            });

            var itemCountMax = 18;
            var itemStep = .055;

            var items = siteMap;
            if (items) {
                var itemCount = items.length;
                for (var itemI = 0; itemI < itemCount; itemI++) {
                    var item = items[itemI];
                    var xIndex = itemI;
                    var yOffset = .2;
                    while (xIndex >= 3) {
                        yOffset -= .1;
                        xIndex -= 3;
                    }
                    var xOffset = (xIndex % 2 === 0) ? (-xIndex * itemStep) : (xIndex + 1) * itemStep;
                    var asset = menuScreen.addButton({
                        position: [.5, yOffset, 0],
                        size: [.5, .2, 1],
                        path: item.name,
                        viewBgColor: [.98, .98, .98],
                        onClick: onClickRoot,
                    }).animate({
                        duration: .6,
                        delay: 0,
                        begin: [0, 0, 0],
                        end: [xOffset - .5, 0, 0],
                        attribute: 'position'
                    });
                    var button = asset.addText({
                        position: [0, 0, .01],
                        fontSize: 48,
                        text: item.name,
                    });
                    currentItems.push(button);
                }
            }
        } else {
            menuPopup.destroy();
            menuPopup = undefined;
        }
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

        var paths = currentPath.split('/');
        var items = siteMap;
        for (var pathI = 1; pathI < paths.length; pathI++) {
            for (var itemI = 0; itemI < items.length; itemI++) {
                if (items[itemI].name === paths[pathI]) {
                    if (items[itemI].highlightItems) {
                        currentHighlight = items[itemI].highlightItems;
                    } else {
                        items = items[itemI].items;
                    }
                    break;
                }
            }
        }

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
                    path: item.name,
                    onClick: onClick,
                })
                asset.addText({
                    position: [0, -.6, .1],
                    fontSize: 80,
                    text: item.name,
                });
                currentItems.push(asset);
            }
        }

        // Highlights
        items = currentHighlight;
        if (items) {
            var itemCount = items.length;
            for (var itemI = 0; itemI < itemCount; itemI++) {
                var item = items[itemI];
                var asset = screen.addAsset({
                    position: [(itemI % 2 === 0) ? (-itemI * itemStep) : (itemI + 1) * itemStep, highlightsY, 0],
                });
                var image = item.product ? item.product : item.image;
                var imageBack = item.product ? item.product + '_Alt01' : undefined;
                var button = asset.addButton({
                    image: image ? imagePath + image : undefined,
                    imageBack: imageBack ? imagePath + imageBack : undefined,
                    path: item.name,
                    valign: 'bottom',
                    onClick: item.product ? 'animateFlip' : undefined,
                });
                var yOffset = -.6
                if (item.product) {
                    asset.addText({
                        position: [0, yOffset, .1],
                        fontSize: 40,
                        text: 'details',
                        product: item.product ? item.product : undefined,
                        onClick: onToggleProduct,
                    });
                    yOffset -= .2;
                }
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

    canvas.addButton({
        image: '/images/target_icon_logo.png',
        position: [-.45, -.45],
        size: .08,
        onClick: onHome,
    });

    canvas.addButton({
        image: '/images/target_icon_menu.png',
        position: [-.35, -.45],
        size: .08,
        onClick: onToggleMenu,
    });

    canvas.addButton({
        image: '/images/target_icon_account.png',
        position: [.25, -.45],
        size: .08,
    });

    canvas.addButton({
        image: '/images/target_icon_cart.png',
        position: [.35, -.45],
        size: .08,
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
    })


	return page;
});
