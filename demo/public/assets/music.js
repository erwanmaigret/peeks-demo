PEEKS.registerPage('music', function() {
    var page = new PEEKS.Asset({
    });

    page.addExternalView('https://www.uniqlo.com/');

    page.addPage('peeks_toolbar');

	return page;
});
