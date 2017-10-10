PEEKS.registerPage('peeks_test', function() {
    var page = new PEEKS.Asset({
    });

    page.setAttr('bgColor', [0, 0, 0]);

    //page.addExternalView('http://www.forever21.com/');
    page.addExternalView('https://www.etsy.com/');

    page.addPage('peeks_toolbar');

	return page;
});
