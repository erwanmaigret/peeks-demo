PEEKS.registerPage('Target', function() {
	var page = new PEEKS.Asset({
        fontColor: [0, 0, 0],
        fontColorBold: [197/255, 1/255, 0],
        fontOutlineStyle: '',
        fontName: 'Helvetica Neue',
        bgColor: [1, 1, 1],
        category: 'white',
        //groundImage: 'ui/icon_dot.png',
        //groundImageRepeat: 50,
        //groundImageColor: [225/255, 255/255, 252/255],
        //groundImageColor: [141/255, 201/255, 195/255],
        groundImage: 'ui/gradient_radial.png',
        groundImageRepeat: 1,
        backgroundImage: 'ui/gradient.png',
        // title: 'Target'
    });

	var panel = page.addAsset();

    var screen = page.addScreen({
        radius: 5,
    });

    var imagePath = 'https://target.scene7.com/is/image/Target/';
    var siteMap = [
        {
            name: 'clothing',
            image: '53451-160411_1460383116963',
            items: [
                {   name: "women's clothing", image: '52690603',
                    items: [
                        {   name: "dresses", image: '52922424',
                            items: [
                                {   name: "maxi", image: '52833477',
                                    highlightItems: [
                                        { name: " ", product: '52840296' },
                                        { name: " ", product: '52760285' },
                                        { name: " ", product: '52833477' },
                                        { name: " ", product: '52654414' },
                                        { name: " ", product: '52722444' },
                                        { name: " ", product: '52132992' },
                                        { name: " ", product: '52760285' },
                                        { name: " ", product: '52589309' },
                                        { name: " ", product: '52090041' },
                                        { name: " ", product: '52840296' },
                                        { name: " ", product: '52237779' },
                                        { name: " ", product: '52363084' },
                                        { name: " ", product: '52722288' },
                                        { name: " ", product: '52380730' },
                                        { name: " ", product: '52090019' },
                                        { name: " ", product: '52535884' },
                                    ]
                                },
                                { name: "fit & flare", image: '52841027',
                                    highlightItems: [
                                        { name: " ", product: '52760288' },
                                        { name: " ", product: '52687571' },
                                        { name: " ", product: '52688047' },
                                        { name: " ", product: '52765475' },
                                        { name: " ", product: '52840416' },
                                        { name: " ", product: '52841028' },
                                        { name: " ", product: '52841027' },
                                        { name: " ", product: '52966315' },
                                        { name: " ", product: '52840417' },
                                        { name: " ", product: '52782497' },
                                        { name: " ", product: '52840652' },
                                        { name: " ", product: '52840538' },
                                        { name: " ", product: '52767349' },
                                        { name: " ", product: '52840418' },
                                    ]
                                },
                                { name: "shirt", image: '52568060',
                                    highlightItems: [
                                        { name: " ", product: '52833477' },
                                        { name: " ", product: '52654414' },
                                        { name: " ", product: '52722444' },
                                        { name: " ", product: '52132992' },
                                        { name: " ", product: '52760285' },
                                        { name: " ", product: '52589309' },
                                        { name: " ", product: '52090041' },
                                        { name: " ", product: '52840296' },
                                        { name: " ", product: '52237779' },
                                        { name: " ", product: '52363084' },
                                        { name: " ", product: '52722288' },
                                        { name: " ", product: '52380730' },
                                        { name: " ", product: '52090019' },
                                        { name: " ", product: '52535884' },
                                    ]
                                },
                                { name: "t-shirt", image: '52939367',
                                    highlightItems: [
                                        { name: " ", product: '52833477' },
                                        { name: " ", product: '52654414' },
                                        { name: " ", product: '52722444' },
                                        { name: " ", product: '52132992' },
                                        { name: " ", product: '52760285' },
                                        { name: " ", product: '52589309' },
                                        { name: " ", product: '52090041' },
                                        { name: " ", product: '52840296' },
                                        { name: " ", product: '52237779' },
                                        { name: " ", product: '52363084' },
                                        { name: " ", product: '52722288' },
                                        { name: " ", product: '52380730' },
                                        { name: " ", product: '52090019' },
                                        { name: " ", product: '52535884' },
                                    ]
                                },
                                { name: "shift", image: '52514130',
                                    highlightItems: [
                                        { name: " ", product: '52833477' },
                                        { name: " ", product: '52654414' },
                                        { name: " ", product: '52722444' },
                                        { name: " ", product: '52132992' },
                                        { name: " ", product: '52760285' },
                                        { name: " ", product: '52589309' },
                                        { name: " ", product: '52090041' },
                                        { name: " ", product: '52840296' },
                                        { name: " ", product: '52237779' },
                                        { name: " ", product: '52363084' },
                                        { name: " ", product: '52722288' },
                                        { name: " ", product: '52380730' },
                                        { name: " ", product: '52090019' },
                                        { name: " ", product: '52535884' },
                                    ]
                                },
                                { name: "jumpsuits & rompers", image: '52722404',
                                    highlightItems: [
                                        { name: " ", product: '52833477' },
                                        { name: " ", product: '52654414' },
                                        { name: " ", product: '52722444' },
                                        { name: " ", product: '52132992' },
                                        { name: " ", product: '52760285' },
                                        { name: " ", product: '52589309' },
                                        { name: " ", product: '52090041' },
                                        { name: " ", product: '52840296' },
                                        { name: " ", product: '52237779' },
                                        { name: " ", product: '52363084' },
                                        { name: " ", product: '52722288' },
                                        { name: " ", product: '52380730' },
                                        { name: " ", product: '52090019' },
                                        { name: " ", product: '52535884' },
                                    ]
                                },
                                { name: "floral", image: '51962176',
                                    highlightItems: [
                                        { name: " ", product: '52833477' },
                                        { name: " ", product: '52654414' },
                                        { name: " ", product: '52722444' },
                                        { name: " ", product: '52132992' },
                                        { name: " ", product: '52760285' },
                                        { name: " ", product: '52589309' },
                                        { name: " ", product: '52090041' },
                                        { name: " ", product: '52840296' },
                                        { name: " ", product: '52237779' },
                                        { name: " ", product: '52363084' },
                                        { name: " ", product: '52722288' },
                                        { name: " ", product: '52380730' },
                                        { name: " ", product: '52090019' },
                                        { name: " ", product: '52535884' },
                                    ]
                                },
                                { name: "ruffle detail", image: '52050580',
                                    highlightItems: [
                                        { name: " ", product: '52833477' },
                                        { name: " ", product: '52654414' },
                                        { name: " ", product: '52722444' },
                                        { name: " ", product: '52132992' },
                                        { name: " ", product: '52760285' },
                                        { name: " ", product: '52589309' },
                                        { name: " ", product: '52090041' },
                                        { name: " ", product: '52840296' },
                                        { name: " ", product: '52237779' },
                                        { name: " ", product: '52363084' },
                                        { name: " ", product: '52722288' },
                                        { name: " ", product: '52380730' },
                                        { name: " ", product: '52090019' },
                                        { name: " ", product: '52535884' },
                                    ]
                                },
                                { name: "midi", image: '51980268',
                                    highlightItems: [
                                        { name: " ", product: '52833477' },
                                        { name: " ", product: '52654414' },
                                        { name: " ", product: '52722444' },
                                        { name: " ", product: '52132992' },
                                        { name: " ", product: '52760285' },
                                        { name: " ", product: '52589309' },
                                        { name: " ", product: '52090041' },
                                        { name: " ", product: '52840296' },
                                        { name: " ", product: '52237779' },
                                        { name: " ", product: '52363084' },
                                        { name: " ", product: '52722288' },
                                        { name: " ", product: '52380730' },
                                        { name: " ", product: '52090019' },
                                        { name: " ", product: '52535884' },
                                    ]
                                },
                            ]
                        },
                        { name: "juniors", image: '52760000', },
                        { name: "maternity", image: '52648512', },
                        { name: "plus size clothing", image: '52845920', },
                        { name: "new arrivals", image: '52509758', },
                        { name: "activewear", image: '52044488', },
                        { name: "athleisure", image: '51014419', },
                        { name: "coats & jackets", image: '52922427', },
                        // Images with CORS issues on load, why is it so?
                        // { name: "intimates", image: '51909861', },
                        // { name: "jeans", image: '51909861', },
                        { name: "jumpsuits & rompers", image: '52722404', },
                        { name: "leggings", image: '51002014', },
                        { name: "pajamas & robes", image: '52809347', },
                        { name: "pants", image: '52922490', },
                    ]
                },
                { name: "men's clothing", image: '52507016', },
                { name: "girl's clothing", image: '52595777', },
                { name: "boys's clothing", image: '52373399', },
                { name: "toddler clothing", image: '52706606', },
                { name: "baby clothing", image: '52376100', },
                { name: "school uniforms", image: '52383471', },
                { name: "adaptive clothing", image: '52724490', },
                { name: "family outfits", image: '52804140', },
            ]
        },
        { name: 'shoes', image: '53451-160411_1460383139759', },
        { name: 'accessories', image: '53451-160411_1460383161792', },
        { name: 'home', image: '61480-160630_1467310167162', },
        { name: 'furniture', image: '53476-160411_1460402362708', },
        { name: 'patio & garden', image: '53476-160411_1460402380575', },
        { name: 'luggage', image: '57687-160505_1462459899971', },
        { name: 'all baby', image: '53452-160411_1460402021722', },
        { name: 'baby clothing', image: '53452-160411_1460402035275', },
        { name: 'baby shoes', image: '53452-160411_1460402051043', },
        { name: "girls' clothing", image: '53452-160411_1460402129559', },
        { name: "girls' shoes", image: '53452-160411_1460402148576', },
        { name: "boys' clothing", image: '53452-160411_1460402089694', },
        { name: "boys' shoes", image: '53452-160411_1460402111660', },
        { name: "Featured",
            items: [
                { name: "Thanksgiving", image: 'thanksgiving97188-171025_1508960298143', },
                { name: "Christmas", image: 'christmas97188-171025_1508962692123', },
                { name: "Kids' gifting", image: 'KidsGifts-icon98553-171005_1507224706616', },
                { name: "Gift Ideas", image: '10-22_KidsGifting-CatBrowse-14105040-171024_1508883169598', },
                { name: "Target Finds", image: 'finds105040-171025_1508959860693', },
                { name: "Clothing", image: 'clothing97188-171019_1508445409180', },
                { name: "Shoes", image: 'shoes97188-171025_1508966363467', },
                { name: "Accessories", image: 'accessories97188-171027_1509114673981', },
                { name: "Baby", image: 'baby97188-171025_1508965179518', },
                { name: "Home", image: 'home97188-171019_1508445579038', },
                { name: "Furniture", image: 'furniture97188-171025_1508965473814', },
                { name: "Kitchen", image: 'kitchen97188-171019_1508445075384', },
                { name: "Electronics", image: 'electronics97188-171025_1508966407077', },
                { name: "Toys", image: 'toys97188-171025_1508966907610', },
                { name: "Entertainment", image: 'entertainment97188-171019_1508447521853', },
                { name: "Beauty", image: 'beauty97188-171025_1508965241734', },
                { name: "Deals", image: 'deals97188-171020_1508510709891', },
                { name: "Clearance", image: 'clearance97188-171020_1508525411214', },
            ],
        },
        { name: "Promotions",
            highlightItems: [
                {
                    name: "Our Black Friday deals are here",
                    description: "Get a sneak peek now.",
                    image: '2017_NovWk2_HP_StoryBlocks_v1_21103877-171101_1509556671597',
                },
                {
                    name: "20% off trees, wreaths & lights*",
                    description: "Get your Christmas decor now. Yule be happy you did.",
                    image: '2017_NovWk2_HP_StoryBlocks_v1_03103877-171026_1509030239564',
                },
                {
                    name: "20% off shoes*",
                    description: "Through Wednesday, save on styles & sizes for the family.",
                    image: '2017_NovWk2_HP_StoryBlocks_v1_05103877-171025_1508964273152',
                },
                {
                    name: "Xbox One X is here",
                    description: "The world’s most powerful console yet, offering true 4K gaming.",
                    image: '2017_NovWk2_HP_StoryBlocks_v1_08103877-171024_1508869525494',
                },
                {
                    name: "Gather & gobble",
                    description: "Find all you need for your Thanksgiving feast & get tips from our entertaining expert, Camille Styles.",
                    image: 'C-000437-01-046_THR_CROP_2544_MetalGarland103876-171030_1509398096992',
                },
                {
                    name: "Friendsgiving edition",
                    description: "",
                    image: 'TF_friendsgiving_HP103876-171027_1509126668125',
                },
                {
                    name: "PJs for the whole crew",
                    description: "",
                    image: '2017_NovWk2_HP_StoryBlocks_v1_03103876-171019_1508446147822',
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
                        fontSize: 48,
                        text: item.name,
                    });
                    yOffset -= .2;
                }
                currentItems.push(asset);
            }
        }
    };

    // For testing:
    onHome("/clothing/women's clothing/dresses/maxi");
    //onHome();

    var canvas = page.addCanvas({
        valign: 'bottom',
    });

    canvas.addView({
        position: [0, -.45],
        size: [1, .12, 1],
        viewBgColor: [1, 1, 1],
        alpha: 1,
    });

    canvas.addButton({
        image: 'images/target_icon_logo.png',
        position: [-.45, -.45],
        size: .08,
        onClick: onHome,
    });

    canvas.addButton({
        image: 'images/target_icon_menu.png',
        position: [-.35, -.45],
        size: .08,
        onClick: onToggleMenu,
    });

    canvas.addButton({
        image: 'images/target_icon_account.png',
        position: [.25, -.45],
        size: .08,
    });

    canvas.addButton({
        image: 'images/target_icon_cart.png',
        position: [.35, -.45],
        size: .08,
    });

    canvas.addButton({
        image: 'ui/icon_vr.png',
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
