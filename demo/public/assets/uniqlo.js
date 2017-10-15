PEEKS.registerPage('uniqlo', function() {
    var page = new PEEKS.Asset({
        title: 'UNIQLO',
        category: 'fashion',
    });

    page.setAttr('bgColor', [.8, .8, 1]);

    page.addExternalView('https://www.uniqlo.com/');

    page.addPage('peeks_toolbar');

	return page;
});
