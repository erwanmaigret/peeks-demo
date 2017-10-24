PEEKS.registerPage('videos', function() {
    var page = new PEEKS.Asset({
        category: 'entertainment',
        title: 'HBO',
    });

    page.addExternalView('https://www.hbo.com/');

    page.addPage('peeks_toolbar');

	return page;
});
