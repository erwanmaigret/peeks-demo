PEEKS.registerPage('travel', function() {
    var page = new PEEKS.Asset({
    });

    page.setAttr('bgColor', [0, 0, 0]);
    page.addPage('peeks_toolbar');

	return page;
});
