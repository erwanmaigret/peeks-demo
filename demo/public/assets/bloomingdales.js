PEEKS.registerPage('bloomingdales', function() {
	var page = new PEEKS.Asset({
        title: 'Bloomingdales',
        category: 'fashion',
    });

    page.addExternalView('https://www.bloomingdales.com');

    page.addPage('peeks_toolbar');

    return page;
});
