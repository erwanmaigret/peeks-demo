PEEKS.registerPage('Peeks', function() {
	var page = new PEEKS.Asset();

    page.addRecommendationsView();

	page.addPage('peeks_toolbar');
	return page;
});
