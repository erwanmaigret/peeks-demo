PEEKS.registerPage('peeks_welcome', function() {
	var page = new PEEKS.Asset();
    page.addPage('peeks_recommendations');
	page.addPage('peeks_toolbar');
	return page;
});
