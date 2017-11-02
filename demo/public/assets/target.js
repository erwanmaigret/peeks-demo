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
                {
                    name: "women's clothing",
                    image: '53451-160411_1460383139759',
                },
            ]
        },
        {
            name: 'shoes',
            image: '53451-160411_1460383139759',
        },
        {
            name: 'accessories',
            image: '53451-160411_1460383161792',
        },
        {
            name: 'home',
            image: '61480-160630_1467310167162',
        },
        {
            name: 'furniture',
            image: '53476-160411_1460402362708',
        },
        {
            name: 'patio & garden',
            image: '53476-160411_1460402380575',
        },
        {
            name: 'luggage',
            image: '57687-160505_1462459899971',
        },
        {
            name: 'all baby',
            image: '53452-160411_1460402021722',
        },
        {
            name: 'baby clothing',
            image: '53452-160411_1460402035275',
        },
        {
            name: 'baby shoes',
            image: '53452-160411_1460402051043',
        },
        {
            name: "girls' clothing",
            image: '53452-160411_1460402129559',
        },
        {
            name: "girls' shoes",
            image: '53452-160411_1460402148576',
        },
        {
            name: "boys' clothing",
            image: '53452-160411_1460402089694',
        },
        {
            name: "boys' shoes",
            image: '53452-160411_1460402111660',
        },
    ];

    var currentPath = '';

    var items = siteMap;
    //items = siteMap[0].items;
    var itemCount = items.length;
    for (var itemI = 0; itemI < itemCount; itemI++) {
        var item = items[itemI];
        screen.addButton({
            position: [itemI * 2 / itemCount, 0, 0],
            image: imagePath + item.image,
        }).addText({
            position: [0, -.6, .1],
            fontSize: 80,
            text: item.name,
        });
    }

	return page;
});
