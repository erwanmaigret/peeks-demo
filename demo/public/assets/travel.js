PEEKS.registerPage('travel', function() {
    var page = new PEEKS.Asset({
    });

    page.setAttr('bgColor', [0, 0, 0]);

    page.addExternalView('http://www.hbo.com/');

    page.addPage('peeks_toolbar');

	return page;
});
