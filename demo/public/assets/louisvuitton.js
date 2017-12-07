PEEKS.registerPage('louisvuitton', function() {
	var page = new PEEKS.Asset({
        fontColor: [0, 0, 0],
        fontColorBold: [191/255, 166/255, 154/255],
        fontOutlineStyle: '',
        fontName: 'Helvetica Neue',
        bgColor: [1, 1, 1],
        category: 'white',
        groundImage: '/ui/gradient_radial.png',
        groundImageRepeat: 1,
        backgroundImage: '/ui/gradient.png',
        backgroundImageColor: [224/255, 219/255, 213/255],
    });

	var balloonsAsset = page.addAsset();
    var otherAssets = page.addAsset();

    var screen = page.addScreen({
        radius: 5,
    });

    var canvas = page.addCanvas({
        valign: 'bottom',
    });

    var foreground = page.addAsset();

    var imagePath = 'http://us.louisvuitton.com/images/is/image/lv/1/';

    page.setAssetPath(imagePath);

    page.addSiteMapItem('LV NOW');
    page.addSiteMapItem('WORLD OF LOUIS VUITTON');
    page.addSiteMapItem('WOMEN');
    page.addSiteMapItem('WOMEN/GIFT INSPIRATIONS');
    page.addSiteMapItem('WOMEN/GIFT INSPIRATIONS/HOME DECOR');
    page.addSiteMapItem('WOMEN/GIFT INSPIRATIONS/TIMELESS PIECES');
    page.addSiteMapItem('WOMEN/GIFT INSPIRATIONS/FASHION FORWARD');
    page.addSiteMapItem('WOMEN/GIFT INSPIRATIONS/ULTIMATE LUXURY');
    page.addSiteMapItem('WOMEN/GIFT INSPIRATIONS/PERSONALIZATION');
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS');
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS/Boucher');
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS/Da Vinci');
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS/Fragonard');
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS/Gauguin');
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS/Manet');
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS/Monet');
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS/Rubens');
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS/Turner');
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS/Van Gogh');
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS/ALL MASTERS');
    page.addSiteMapItem('WOMEN/FASHION SHOWS');
    page.addSiteMapItem('WOMEN/FASHION SHOWS/SPRING-SUMMER 2018');
    page.addSiteMapItem('WOMEN/FASHION SHOWS/CRUISE 2018 SHOW');
    page.addSiteMapItem('WOMEN/FASHION SHOWS/Fall-Winter 2017 Show');
    page.addSiteMapItem('WOMEN/FASHION SHOWS/FASHION SHOW SELECTION');
    page.addSiteMapItem('WOMEN/FASHION SHOWS/NICOLAS GHESQUIERE');
    page.addSiteMapItem('WOMEN/HANDBAGS');
    page.addSiteMapItem('WOMEN/HANDBAGS/NEW THIS SEASON');
    page.addSiteMapItem('WOMEN/HANDBAGS/ALL HANDBAGS');
    page.addSiteMapItem('WOMEN/HANDBAGS/NEVERFULL ALMA & SPEEDY');
    page.addSiteMapItem('WOMEN/HANDBAGS/ICONS');
    page.addSiteMapItem('WOMEN/HANDBAGS/TOP HANDLES');
    page.addSiteMapItem('WOMEN/HANDBAGS/SHOULDER BAGS');
    page.addSiteMapItem('WOMEN/HANDBAGS/CROSS BODY BAGS');
    page.addSiteMapItem('WOMEN/HANDBAGS/TOTES');
    page.addSiteMapItem('WOMEN/HANDBAGS/BACKPACKS');
    page.addSiteMapItem('WOMEN/HANDBAGS/HOBOS');
    page.addSiteMapItem('WOMEN/HANDBAGS/CLUTCHES & EVENING');
    page.addSiteMapItem('WOMEN/HANDBAGS/MINI BAGS');
    page.addSiteMapItem('WOMEN/HANDBAGS/FASHION SHOWS');
    page.addSiteMapItem('WOMEN/SMALL LEATHER GOODS');
    page.addSiteMapItem('WOMEN/SMALL LEATHER GOODS/ALL COLLECTIONS');
    page.addSiteMapItem('WOMEN/SMALL LEATHER GOODS/WALLETS');
    page.addSiteMapItem('WOMEN/SMALL LEATHER GOODS/KEY & CARD HOLDERS');
    page.addSiteMapItem('WOMEN/SMALL LEATHER GOODS/TECHNICAL CASES');
    page.addSiteMapItem('WOMEN/TRAVEL');
    page.addSiteMapItem('WOMEN/TRAVEL/ALL COLLECTIONS');
    page.addSiteMapItem('WOMEN/TRAVEL/Horizon Collection');
    page.addSiteMapItem('WOMEN/TRAVEL/ROLLING LUGGAGE');
    page.addSiteMapItem('WOMEN/TRAVEL/SOFTSIDED LUGGAGE');
    page.addSiteMapItem('WOMEN/TRAVEL/HARDSIDED LUGGAGE');
    page.addSiteMapItem('WOMEN/TRAVEL/TRAVEL ACCESSORIES');
    page.addSiteMapItem('WOMEN/ACCESSORIES');
    page.addSiteMapItem('WOMEN/ACCESSORIES/SCARVES, SHAWLS & MORE');
    page.addSiteMapItem('WOMEN/ACCESSORIES/FASHION JEWELRY');
    page.addSiteMapItem('WOMEN/ACCESSORIES/LEATHER BRACELETS');
    page.addSiteMapItem('WOMEN/ACCESSORIES/BELTS');
    page.addSiteMapItem('WOMEN/ACCESSORIES/SUNGLASSES');
    page.addSiteMapItem('WOMEN/ACCESSORIES/KEY HOLDERS, BAG CHARMS & MORE');
    page.addSiteMapItem('WOMEN/ACCESSORIES/HOME DECOR');
    page.addSiteMapItem('WOMEN/READY-TO-WEAR');
    page.addSiteMapItem('WOMEN/READY-TO-WEAR/View by Look');
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/View by Look/1", { icon: 'PP_VP_AS/louis-vuitton--FESK91FLD001_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem('WOMEN/READY-TO-WEAR/Leathers');
    page.addSiteMapItem('WOMEN/READY-TO-WEAR/Furs');
    page.addSiteMapItem('WOMEN/READY-TO-WEAR/Jackets and Coats');
    page.addSiteMapItem('WOMEN/READY-TO-WEAR/Dresses');
    page.addSiteMapItem('WOMEN/READY-TO-WEAR/Tops');
    page.addSiteMapItem('WOMEN/READY-TO-WEAR/Skirts');
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/1", { icon: 'PP_VP_AS/louis-vuitton--FESK91FLD001_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/2", { icon: 'PP_VP_AS/louis-vuitton--FESK90GBS702_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/3", { icon: 'PP_VP_AS/louis-vuitton--FESK91GFA006_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/4", { icon: 'PP_VP_AS/louis-vuitton--FESK91XHE900_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/4", { icon: 'PP_VP_AS/louis-vuitton--FDJB05DRH900_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/5", { icon: 'PP_VP_AS/louis-vuitton--FEJB01FGK650_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/6", { icon: 'PP_VP_AS/louis-vuitton--FESK13FUQ506_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/7", { icon: 'PP_VP_AS/louis-vuitton--FESK11XHE900_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/8", { icon: 'PP_VP_AS/louis-vuitton--FDSK26DRX900_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/9", { icon: 'PP_VP_AS/louis-vuitton--FDSK26DZH811_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/10", { icon: 'PP_VP_AS/louis-vuitton--FDSK34DRT651_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/11", { icon: 'PP_VP_AS/louis-vuitton--FDSK34DTL900_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/12", { icon: 'PP_VP_AS/louis-vuitton--FESK91FLD001_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem('WOMEN/READY-TO-WEAR/Pants');
    page.addSiteMapItem('WOMEN/READY-TO-WEAR/Swimwear');
    page.addSiteMapItem('WOMEN/SHOES');
    page.addSiteMapItem('WOMEN/SHOES/ALL COLLECTIONS');
    page.addSiteMapItem('WOMEN/SHOES/BOOTS & BOOTIES');
    page.addSiteMapItem('WOMEN/SHOES/PUMPS');
    page.addSiteMapItem('WOMEN/SHOES/FLATS');
    page.addSiteMapItem('WOMEN/SHOES/SNEAKERS');
    page.addSiteMapItem('WOMEN/SHOES/SANDALS');
    page.addSiteMapItem('WOMEN/JEWELRY & TIMEPIECES');
    page.addSiteMapItem('WOMEN/JEWELRY & TIMEPIECES/LOUIS VUITTON FOR UNICEF');
    page.addSiteMapItem('WOMEN/JEWELRY & TIMEPIECES/HIGH JEWELRY');
    page.addSiteMapItem('WOMEN/JEWELRY & TIMEPIECES/FINE JEWELRY');
    page.addSiteMapItem('WOMEN/JEWELRY & TIMEPIECES/TIMEPIECES');
    page.addSiteMapItem('WOMEN/FRAGRANCES');
    page.addSiteMapItem('WOMEN/FRAGRANCES/DISCOVER THE COLLECTION');
    page.addSiteMapItem('WOMEN/FRAGRANCES/UNIVERSE');
    page.addSiteMapItem('WOMEN/FRAGRANCES/SAVOIR-FAIRE');
    page.addSiteMapItem('WOMEN/BOOKS & WRITING');
    page.addSiteMapItem('WOMEN/BOOKS & WRITING/AGENDAS & COVERS');
    page.addSiteMapItem('WOMEN/BOOKS & WRITING/WRITING');
    page.addSiteMapItem('WOMEN/BOOKS & WRITING/WOMEN/BOOKS');
    page.addSiteMapItem('WOMEN/PERSONALIZATION');
    page.addSiteMapItem('WOMEN/PERSONALIZATION/My LV World Tour');
    page.addSiteMapItem('WOMEN/PERSONALIZATION/MON MONOGRAM');
    page.addSiteMapItem('WOMEN/PERSONALIZATION/HOTSTAMPING');
    page.addSiteMapItem('WOMEN/PERSONALIZATION/My LV Tambour');
    page.addSiteMapItem('MEN');

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
                /*
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
                */
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
        page.setSiteMapPath('WOMEN/READY-TO-WEAR/Skirts');
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
                var imageBack = item.isProduct ? item.image.replace('_PM2_Front', '_PM1_Other') : undefined;
                var button = asset.addButton({
                    image: image ? imagePath + image : undefined,
                    imageBack: imageBack ? imagePath + imageBack : undefined,
                    imageDetour: true,
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

    canvas.addView({
        position: [0, -.45],
        size: [1, .12, 1],
        viewBgColor: [0, 0, 0],
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
        fontColor: [1, 1, 1],
        size: .08,
        onClick: 'searchPage',
    })

    var balloons = [];

    var createBalloon = function(name, x, z) {
        var rotation = [0, 0, 0];
        if (name === '1') {
            rotation = [90, 0, 0];
        } else if (name === '2') {
            rotation = [-90, 0, 0];
        } else if (name === '3') {
            rotation = [90, 90, 0];
        } else if (name === '4') {
            rotation = [90, 0, 0];
        }
        return balloonsAsset.addMesh({
            geometry: '/assets/balloon_' + name + '.obj',
            position: [x, 0, z],
            size: .02,
            color: PEEKS.color.hsl(Math.random(), 1, .6),
            rotation: rotation,
            material: {
                normalMap: '/assets/balloon.jpg',
                shininess: 50,
                reflectivity: 3,
            }
        });
    }

    var createBalloons = function() {
        balloons.push(createBalloon('1', -3, -6));
        balloons.push(createBalloon('2', -2.5, -7));
        balloons.push(createBalloon('3', -2, -6));
        balloons.push(createBalloon('4', -1.5, -7));
        balloons.push(createBalloon('1', -1, -6));
        balloons.push(createBalloon('2', -0.5, -7));
        balloons.push(createBalloon('3', 0, -6));
        balloons.push(createBalloon('4', .5, -7));
        balloons.push(createBalloon('1', 1, -6));
        balloons.push(createBalloon('2', 1.5, -7));
        balloons.push(createBalloon('3', 2, -6));
        balloons.push(createBalloon('4', 2.5, -7));
        balloons.push(createBalloon('1', 3, -6));
    }

    var playBalloons = false;

    var rewindAnimation = function() {
        if (playBalloons) {
            this.clearAnimations();
            releaseBalloon(this);
        } else {
            this.destroy();
        }
    }

    var releaseBalloon = function(balloon) {
        balloon.animate({
            duration: 4 + Math.random() * 10,
            begin: [0, 0, 0],
            end: [0, 180, 0],
            attribute: 'rotation',
        });
        balloon.animate({
            duration: 6 + Math.random() * 4,
            delay: Math.random() * 6,
            begin: [0, 10, 0],
            end: [0, -6, 0],
            attribute: 'position',
            onEnd: rewindAnimation,
        });
    }

    var releaseBalloons = function() {
        playBalloons = true;
        for (var balloonI = 0; balloonI < balloons.length; balloonI++) {
            releaseBalloon(balloons[balloonI]);
        }
        balloons = [];
    }

    createBalloons();

    var shoppingBag = otherAssets.addMesh({
        geometry: '/assets/lv_shopping_bag.obj',
        texture: '/assets/lv_shopping_bag.jpg',
        position: [2, -2, -5],
        size: 2,
        rotation: [0, -50, 0],
    });

    var entranceOpen = function () {
        this.onClick = undefined;
        doorLeft.animate({
            duration: 10,
            delay: 0,
            begin: [0, 0, 0],
            end: [-10, 0, 0],
            attribute: 'position'
        });
        doorRight.animate({
            duration: 10,
            delay: 0,
            begin: [0, 0, 0],
            end: [10, 0, 0],
            attribute: 'position'
        });
        releaseBalloons();
        var positionSrc = this.position;
        var positionTarget = shoppingBag.position;
        var rotationSrc = this.rotation;
        var rotationTarget = shoppingBag.rotation;
        this.animate({
            duration: 2,
            delay: 2,
            begin: [0, 0, 0],
            end: [
                positionTarget[0] - positionSrc[0],
                positionTarget[1] - positionSrc[1] + 1,
                positionTarget[2] - positionSrc[2]
            ],
            attribute: 'position',
        });
        this.animate({
            duration: 2.5,
            delay: 1,
            begin: [0, 0, 0],
            end: [
                rotationTarget[0],
                rotationTarget[1],
                rotationTarget[2]
            ],
            attribute: 'rotation',
        });
        this.animate({
            duration: .5,
            delay: 3.6,
            begin: [0, 0, 0],
            end: [0, -1, 0],
            attribute: 'position',
        });
    }
    var entrance = foreground.addAsset({
        size: 1,
        position: [0, 0, -3],
    });
    var doorLeft = entrance.addAsset({
        position: [-2, 0, 0],
    });
    var doorLeftPane = doorLeft.addView({
        position: [1, 0, 0],
        viewBgColor: [0, 0, 0],
        size: [2, 4, 2],
    });
    otherAssets.addMesh({
        geometry: '/assets/lv_logo.obj',
        position: [0, -.3, -2],
        size: .023,
        color: page.backgroundImageColor,
        material: {
            shininess: 50,
            reflectivity: 2,
        },
        rotation: [0, 0, 0],
        onClick: entranceOpen,
        onFocus: function() {},
    });

    var doorRight = entrance.addAsset({
        position: [2, 0, 0],
    });
    var doorRightPane = doorRight.addView({
        position: [-1, 0, 0],
        viewBgColor: [0, 0, 0],
        size: [2, 4, 2],
    });

	return page;
});
