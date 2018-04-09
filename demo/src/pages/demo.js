PEEKS.registerPage('peeks.demo', function() {
	var page = new PEEKS.Asset();

    page.backgroundImage = '/images/bg_360_canyon.jpg',

    page.addRecommendationsView();

	page.addPage('peeks.toolbar');
	return page;
});
