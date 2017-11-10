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
		geometry: 'assets/woman_pose1_body.obj',
        texture: 'assets/woman_body.png',
        material: {
            emissive: [.1, .05, .05],
            shininess: 20,
        },
	});
    model.body = model.addGeometry({
		geometry: 'assets/woman_pose1_highHeels.obj',
        texture: 'assets/material_suede.jpg',
	});

    var panel = page.addAsset({
        position: [1, 1, -5],
    });

    var pants = true;
    var onSetClothMaterial = function(caller) {
        if (caller === undefined) {
            caller = this;
        }

        pants = !pants;
        if (model.pants) {
            model.pants.destroy();
        }
        if (pants) {
            model.pants = model.addGeometry({
        		geometry: 'assets/woman_pose1_pants.obj',
                texture: caller.material.map,
                material: {
                    emissive: caller.material.emissive,
                    shininess: caller.material.shininess,
                    normalMap: caller.material.normalMap,
                },
        	});
        }
        if (model.skirt) {
            model.skirt.destroy();
        }
        if (!pants) {
            model.skirt = model.addGeometry({
        		geometry: 'assets/woman_pose1_skirt.obj',
                texture: caller.material.map,
                material: {
                    emissive: caller.material.emissive,
                    shininess: caller.material.shininess,
                    normalMap: caller.material.normalMap,
                },
        	});
        }
        if (model.jacket) {
            model.jacket.destroy();
        }
        model.jacket = model.addGeometry({
    		geometry: 'assets/woman_pose1_jacket.obj',
            texture: caller.material.map,
            material: {
                emissive: caller.material.emissive,
                shininess: caller.material.shininess,
                normalMap: caller.material.normalMap,
            },
    	});
        if (model.blouse) {
            model.blouse.destroy();
        }
        model.blouse = model.addGeometry({
    		geometry: 'assets/woman_pose1_j_blouse.obj',
            texture: 'assets/material_white.jpg',
            material: {
                emissive: [.05, .05, .1],
                shininess: 10,
                normalMap: 'assets/material_velvet_normal.jpg',
            },
    	});
    };

    var defaultMaterial = panel.addButton({
        texture: 'assets/material_red_satin.jpg',
        position: [0, .3, 0],
        size: .2,
        material: {
            emissive: [.1,.1,.1],
            shininess: 10,
            normalMap: undefined,
            map: 'assets/material_red_satin.jpg',
        },
        onClick: onSetClothMaterial,
    });
    panel.addButton({
        texture: 'assets/material_red_velvet.jpg',
        size: .2,
        material: {
            emissive: [.1,.1,.1],
            shininess: 15,
            normalMap: 'assets/material_velvet_normal.jpg',
            map: 'assets/material_red_velvet.jpg',
        },
        onClick: onSetClothMaterial,
    });
    panel.addButton({
        texture: 'assets/material_suede.jpg',
        position: [0, -.3, 0],
        size: .2,
        material: {
            emissive: [.1,.1,.1],
            shininess: 5,
            normalMap: 'assets/material_suede_normal.jpg',
            map: 'assets/material_suede.jpg',
        },
        onClick: onSetClothMaterial,
    });
    panel.addButton({
        texture: 'assets/material_blue_satin.jpg',
        position: [0, -.6, 0],
        size: .2,
        material: {
            emissive: [.05,.05,.1],
            shininess: 5,
            normalMap: 'assets/material_suede_normal.jpg',
            map: 'assets/material_blue_satin.jpg',
        },
        onClick: onSetClothMaterial,
    });

    onSetClothMaterial(defaultMaterial);

	return page;
});
