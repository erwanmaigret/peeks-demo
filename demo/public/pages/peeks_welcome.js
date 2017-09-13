PEEKS.registerPage('peeks_welcome', function() {
	var page = new PEEKS.Asset();
	page.addPage('peeks_background');
	page.addPage('peeks_search');
	page.addPage('peeks_history');

	var pane = page.addPage('peeks_recommendations');
	pane.animate({
		duration: 2,
		begin: [1, 0, 0],
		end: [0, 0, 0]
	});

	page.addPage('peeks_toolbar');
	return page;
});
