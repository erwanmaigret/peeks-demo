PEEKS.registerPage('Target', function() {
	var page = new PEEKS.Asset({
        fontColor: [0, 0, 0],
        fontColorBold: [197/255, 1/255, 0],
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
                                        { name: " ", image: '52833477', imageBack: '52654414' },
                                        { name: " ", image: '52654414' },
                                        { name: " ", image: '52722444' },
                                        { name: " ", image: '52132992' },
                                        { name: " ", image: '52760285' },
                                        { name: " ", image: '52589309' },
                                        { name: " ", image: '52090041' },
                                        { name: " ", image: '52840296' },
                                        { name: " ", image: '52237779' },
                                        { name: " ", image: '52363084' },
                                        { name: " ", image: '52722288' },
                                        { name: " ", image: '52380730' },
                                        { name: " ", image: '52090019' },
                                        { name: " ", image: '52535884' },
                                    ]
                                },
                                { name: "fit & flare", image: '52841027' },
                                { name: "shirt", image: '52568060' },
                                { name: "t-shirt", image: '52939367' },
                                { name: "shift", image: '52514130' },
                                { name: "jumpsuits & rompers", image: '52722404' },
                                { name: "floral", image: '51962176' },
                                { name: "ruffle detail", image: '52050580' },
                                { name: "midi", image: '51980268' },
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
                { name: "Buy 2, get 1 free", image: '2017_NovWk1_HP_storyBlock_Friday_v1_03104302-171018_1508353657352', },
                { name: "Call of Duty WWII", image: '2017_NovWk1_HP_storyBlock_Friday_v1_05104302-171018_1508346246139', },
                { name: "Free $10 gift card", image: '2017_NovWk1_HP_6pks_v2_07104303-171019_1508435415282', },
                { name: "Slumber party", image: '2017_NovWk1_HP_storyBlock_Friday_v1_08104299-171017_1508280336220', },
                { name: "30% off rugs", image: '2017_NovWk1_HP_6pks_v2_03104303-171018_1508344324158', },
                { name: "Hearth & Hand™ with Magnolia", image: '2017_NovWk1_HP_storyBlock_Friday_v1_13104299-171017_1508280389874', },
            ],
        },
    ];

    var currentPath = '/Featured';
    var currentItems = [];
    var currentHighlight = siteMap[siteMap.length - 1].highlightItems;

    var onClickRoot = function() {
        currentPath = '/' + this.path;
        refresh();
    };

    var onClick = function() {
        currentPath = currentPath + "/" + this.path;
        refresh();
    };

    var onClickProduct = function() {
        if (this.product === undefined) {
            this.product = this.parent.addView({
                position: [0, .7, -.01],
                size: [.8, .4, 1],
                viewBgColor: [.96, .96, .96],
            });

            this.product.addButton({
                viewBgColor: page.fontColorBold,
                position: [0, -.3, .1],
                size: [.4, .15, 1],
            }).addText({
                position: [0, 0, .01],
                fontSize: 40,
                fontColor: [1, 1, 1],
                text: 'add to cart',
            });
        }
    };

    var menuY = .5;
    var subMenuY = .3;
    var highlightsY = 0;

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

        // Global navigation items
        var items = siteMap;
        if (items) {
            var itemCount = items.length;
            for (var itemI = 0; itemI < itemCount; itemI++) {
                var item = items[itemI];
                var button = screen.addText({
                    position: [(itemI % 2 === 0) ? (-itemI * itemStep) : (itemI + 1) * itemStep, menuY, 0],
                    fontSize: 80,
                    text: item.name,
                    path: item.name,
                    onClick: onClickRoot,
                });
                currentItems.push(button);
            }
        }

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
                var asset = screen.addAsset({
                    position: [(itemI % 2 === 0) ? (-itemI * itemStep) : (itemI + 1) * itemStep, subMenuY, 0],
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
                var button = asset.addButton({
                    image: item.image ? imagePath + item.image : undefined,
                    imageBack: item.imageBack ? imagePath + item.imageBack : undefined,
                    path: item.name,
                    onClick: onClickProduct,
                });
                asset.addText({
                    position: [0, -.6, .1],
                    fontSize: 80,
                    text: item.name,
                });
                currentItems.push(asset);
            }
        }
    };

    refresh();

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
    });

    canvas.addButton({
        image: 'images/target_icon_menu.png',
        position: [-.35, -.45],
        size: .08,
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
