PEEKS.registerPage('Target', function() {
	var page = new PEEKS.Asset({
        fontColor: [0, 0, 0],
        bgColor: [1, 1, 1],
        category: 'white',
        title: 'Target'
    });

	var panel = page.addAsset();

    var screen = page.addScreen({
        radius: 5,
    });

	page.addPage('peeks_toolbar');

    var imagePath = 'https://target.scene7.com/is/image/Target/';
    var siteMap = [
        {
            name: 'clothing',
            image: '53451-160411_1460383116963',
            items: [
                {   name: "women's clothing", image: '52690603',
                    items: [
                        { name: "dresses", image: '52922424',
                            items: [
                                { name: "maxi", image: '52833477',
                                    items: [
                                        { name: " ", image: '52833477' },
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
    ];

    var currentPath = '';
    var currentItems = [];

    var onClick = function() {
        currentPath = currentPath + "/" + this.path;
        refresh();
    };

    var refresh = function() {
        // Remove previous items
        var itemCount = currentItems.length;
        for (var itemI = 0; itemI < itemCount; itemI++) {
            currentItems[itemI].destroy();
        }
        currentItems = [];

        var paths = currentPath.split('/');
        var items = siteMap;
        for (var pathI = 1; pathI < paths.length; pathI++) {
            for (var itemI = 0; itemI < items.length; itemI++) {
                if (items[itemI].name === paths[pathI]) {
                    items = items[itemI].items;
                    break;
                }
            }
        }

        if (items) {
            var itemCount = items.length;
            for (var itemI = 0; itemI < itemCount; itemI++) {
                var item = items[itemI];
                var button = screen.addButton({
                    position: [itemI * 2 / itemCount, 0, 0],
                    image: imagePath + item.image,
                    path: item.name,
                    onClick: onClick,
                })
                button.addText({
                    position: [0, -.6, .1],
                    fontSize: 80,
                    text: item.name,
                });
                currentItems.push(button);
            }
        }
    };

    refresh();

	return page;
});
