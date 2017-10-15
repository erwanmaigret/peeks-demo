PEEKS.registerPage('music', function() {
    var page = new PEEKS.Asset({
    });

    page.setAttr('bgColor', [.8, .8, 1]);

    page.addExternalView('https://www.uniqlo.com/');

    page.addPage('peeks_toolbar');

	return page;
});
