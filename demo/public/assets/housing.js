PEEKS.registerPage('housing', function() {
    var page = new PEEKS.Asset({
    });

    page.addExternalView('https://www.theweeknd.com/');

    page.addPage('peeks_toolbar');

	return page;
});
