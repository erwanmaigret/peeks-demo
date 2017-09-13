PEEKS.registerPage('peeks_background', function() {
	var page = new PEEKS.Asset();

	page.addImage({
		image: 'images/peeks_background.jpg',
		position: [0, 0, -15],
		rotation: [0, 0, 0],
		size: 20,
	});

	return page;
});
