PEEKS.registerPage('peeks.demo', function() {
	var page = new PEEKS.Asset();

    page.addRecommendationsView();

	page.addPage('peeks.toolbar');
	return page;
});
