PEEKS.registerPage('travel', function() {
    var page = new PEEKS.Asset({
    });

    page.addExternalView('http://www.hbo.com/');

    page.addPage('peeks_toolbar');

	return page;
});
