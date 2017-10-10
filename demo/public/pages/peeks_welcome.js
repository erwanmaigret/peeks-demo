PEEKS.registerPage('peeks_welcome', function() {
	var page = new PEEKS.Asset();
	page.addPage('peeks_background');
	//page.addPage('peeks_search');
	//page.addPage('peeks_history');
    page.addPage('peeks_recommendations');
	page.addPage('peeks_toolbar');
	return page;
});
