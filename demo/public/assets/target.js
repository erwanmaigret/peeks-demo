PEEKS.registerPage('Target', function() {
	var page = new PEEKS.Asset({
        fontColor: [0, 0, 0],
        bgColor: [1, 1, 1],
        category: 'white',
        title: 'Target'
    });

	var panel = page.addAsset();

    var screen = page.addScreen({
        radius: 5,
    });

    var assetFirst = 1;
    var assetLast = 18;
    for (var assetI = assetFirst; assetI <= assetLast; assetI++) {
        var panel = screen.addAsset({
            position: [-1 + assetI * 2 / (1 + assetLast - assetFirst), 0, 0],
        });

        panel.addButton({
            image: 'images/target_featured_' + assetI.toString() + '.jpeg',
            //imageDetour: true,
            //onClick: showInfo,
        });
    }

	page.addPage('peeks_toolbar');

	return page;
});
