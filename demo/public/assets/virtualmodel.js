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
    model.body = model.addGeometry({
		geometry: 'assets/woman_body.obj',
        texture: 'assets/woman_body.png',
	});
    model.underwear_pants = model.addGeometry({
		geometry: 'assets/woman_underwear_pants.obj',
	});
    model.underwear_lif = model.addGeometry({
		geometry: 'assets/woman_underwear_lif.obj',
	});
    model.underwear_stripes = model.addGeometry({
		geometry: 'assets/woman_underwear_stripes.obj',
	});



    var panel = page.addAsset({
        position: [2, 1, -5],
    });

    var onSetClothMaterial = function() {
        if (model.skirt) {
            model.skirt.destroy();
        }
        model.skirt = model.addGeometry({
    		geometry: 'assets/woman_skirt.obj',
            texture: this.getTexture(),
    	});
        if (model.jacket) {
            model.jacket.destroy();
        }
        model.jacket = model.addGeometry({
    		geometry: 'assets/woman_jacket.obj',
            texture: this.getTexture(),
    	});
        if (model.blouse) {
            model.blouse.destroy();
        }
        model.blouse = model.addGeometry({
    		geometry: 'assets/woman_j_blouse.obj',
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
