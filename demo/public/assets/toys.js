PEEKS.registerPage('toys', function() {
    var page = new PEEKS.Asset({
    });

    page.setAttr('bgColor', [.8, .8, 1]);

    page.addExternalView('https://www.theweeknd.com/');

    page.addPage('peeks_toolbar');

	return page;
});
