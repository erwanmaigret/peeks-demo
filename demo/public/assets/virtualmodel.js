PEEKS.registerPage('VirtualModel', function() {
    var page = new PEEKS.Asset({
        category: 'fashion',
    });

    page.addPage('peeks_toolbar');

    var model = page.addAsset({
        position: [0, -1.2, -3],
        onClick: 'animateRotate90',
        size: .015,
    });

    model.body = model.addGeometry({
		geometry: 'assets/woman_body.obj',
        texture: 'assets/woman_body.png',
	});
    model.blouse = model.addGeometry({
		geometry: 'assets/woman_j_blouse.obj',
	});
    model.jacket = model.addGeometry({
		geometry: 'assets/woman_jacket.obj',
        texture: 'assets/material_red_satin.jpg',
	});
    model.skirt = model.addGeometry({
		geometry: 'assets/woman_skirt.obj',
        texture: 'assets/material_red_satin.jpg',
	});


    var panel = page.addAsset({
        position: [2, 1, -5],
    });

    var onSetClothMaterial = function() {
        model.skirt.destroy();
        model.skirt = model.addGeometry({
    		geometry: 'assets/woman_skirt.obj',
            texture: this.getTexture(),
    	});
        model.jacket.destroy();
        model.jacket = model.addGeometry({
    		geometry: 'assets/woman_jacket.obj',
            texture: this.getTexture(),
    	});
    };

    panel.addButton({
        texture: 'assets/material_red_satin.jpg',
        position: [0, .3, 0],
        size: .2,
        onClick: onSetClothMaterial,
    });
    panel.addButton({
        texture: 'assets/material_red_velvet.jpg',
        size: .2,
        onClick: onSetClothMaterial,
    });
    panel.addButton({
        texture: 'assets/material_suede.jpg',
        position: [0, -.3, 0],
        size: .2,
        onClick: onSetClothMaterial,
    });

	return page;
});
