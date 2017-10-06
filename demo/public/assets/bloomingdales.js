PEEKS.registerPage('bloomingdales', function() {
	var page = new PEEKS.Asset({
        fontColor: [0, 0, 0]
    });

    page.setAttr('bgColor', [1, 1, 1]);

    page.scrap('https://www.bloomingdales.com');

    page.addPage('peeks_toolbar');

    return page;
});
