PEEKS.registerPage('clothes', function() {
    var page = new PEEKS.Asset({
        category: 'shopping',
        title: 'Etsy',
    });

    page.addExternalView('https://www.etsy.com/');

    page.addPage('peeks_toolbar');

	return page;
});
