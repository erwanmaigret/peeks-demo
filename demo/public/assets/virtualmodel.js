PEEKS.registerPage('VirtualModel', function() {
    var page = new PEEKS.Asset({
        category: 'white',
    });

    page.addPage('peeks_toolbar');

    var femaleHigh = page.addAsset({
        position: [0, 0, 0],
    });

    var model = femaleHigh.addAsset({
        position: [0, -1, -2.9],
        onClick: 'animateRotate90',
        size: .013,
        onFocus: '',
    });

    var panel = femaleHigh.addAsset({
        position: [1, 1, -5],
    });
    var panel2 = femaleHigh.addAsset({
        position: [-1, 1, -5],
    });

    var outfit = "pants";
    var size = "M";
    var skin = [1, 1, 1];
    var modelName = "woman";
    var pose = "pose1";
    var fabric = undefined;

    var getGeometryUrl = function (part) {
        return "assets/" + modelName + "_" + pose + "_" + size + "_" + part + ".obj";
    };

    var onSetClothMaterial = function(caller) {
        if (caller === undefined) {
            caller = this;
        }
        if (caller.material !== undefined) {
            fabric = caller.material;
        }
        if (caller.vm !== undefined) {
            if (caller.vm.size !== undefined) {
                size = caller.vm.size;
            }
            if (caller.vm.outfit !== undefined) {
                outfit = caller.vm.outfit;
            }
            if (caller.vm.skin !== undefined) {
                skin = caller.vm.skin;
            }
        }

        if (model.body) {
            model.body.destroy();
        }
        if (model.shoes) {
            model.shoes.destroy();
        }
        if (model.pants) {
            model.pants.destroy();
        }
        if (model.skirt) {
            model.skirt.destroy();
        }
        if (model.jacket) {
            model.jacket.destroy();
        }
        if (model.blouse) {
            model.blouse.destroy();
        }
        if (model.underwear) {
            model.underwear.destroy();
        }

        model.body = model.addGeometry({
            geometry: getGeometryUrl("body"),
            texture: 'assets/woman_body.png',
            color: skin,
            material: {
                emissive: [.1, .05, .05],
                shininess: 20,
            },
        });
        model.shoes = model.addGeometry({
            geometry: getGeometryUrl("highHeels"),
            texture: 'assets/material_suede.jpg',
        });

        if (outfit === 'pants') {
            model.pants = model.addGeometry({
        		geometry: getGeometryUrl("pants"),
                texture: fabric.map,
                material: {
                    emissive: fabric.emissive,
                    shininess: fabric.shininess,
                    normalMap: fabric.normalMap,
                },
        	});
        }
        if (outfit === 'skirt') {
            model.skirt = model.addGeometry({
        		geometry: getGeometryUrl("skirt"),
                texture: fabric.map,
                material: {
                    emissive: fabric.emissive,
                    shininess: fabric.shininess,
                    normalMap: fabric.normalMap,
                },
        	});
        }

        if (outfit === 'pants' || outfit === 'skirt') {
            model.jacket = model.addGeometry({
        		geometry: getGeometryUrl("jacket"),
                texture: fabric.map,
                material: {
                    emissive: fabric.emissive,
                    shininess: fabric.shininess,
                    normalMap: fabric.normalMap,
                },
            });
            model.blouse = model.addGeometry({
        		geometry: getGeometryUrl("j_blouse"),
                texture: 'assets/material_white.jpg',
                material: {
                    emissive: [.05, .05, .1],
                    shininess: 10,
                    normalMap: 'assets/material_suede_normal.jpg',
                },
            });
        }

        if (outfit === 'underwear') {
            model.underwear = model.addGeometry({
        		geometry: getGeometryUrl("underwear"),
                texture: fabric.map === 'assets/material_dark.jpg'
                    ? 'assets/woman_underwear_transparency.png'
                    : fabric.map,
                alpha: fabric.map === 'assets/material_dark.jpg'
                    ? .7
                    : 1,
                material: {
                    emissive: fabric.emissive,
                    shininess: fabric.shininess,
                    normalMap: fabric.normalMap,
                },
            });
        }
    };

    panel2.addRoundTextButton({
        position: [0, 0, 0],
		size: .3,
        label: 'M',
        fontSize: 120,
        vm: {
            size: 'M'
        },
        onClick: onSetClothMaterial,
    });

    panel2.addRoundTextButton({
        position: [0, .4, 0],
        size: .3,
        label: 'L',
        fontSize: 120,
        vm: {
            size: 'L'
        },
        onClick: onSetClothMaterial,
    });


    panel2.addTextButton({
        position: [0, -1, 0],
		size: .3,
        label: 'Underwear',
        fontSize: 120,
        vm: {
            outfit: 'underwear'
        },
        onClick: onSetClothMaterial,
    });

    panel2.addTextButton({
        position: [0, -1.4, 0],
		size: .3,
        label: 'Pants',
        fontSize: 120,
        vm: {
            outfit: 'pants'
        },
        onClick: onSetClothMaterial,
    });

    panel2.addTextButton({
        position: [0, -1.8, 0],
		size: .3,
        label: 'Skirt',
        fontSize: 120,
        vm: {
            outfit: 'skirt'
        },
        onClick: onSetClothMaterial,
    });


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
    panel.addButton({
        texture: 'assets/material_white.jpg',
        position: [0, -.9, 0],
        size: .2,
        material: {
            emissive: [.1,.0,.0],
            shininess: 2,
            normalMap: 'assets/material_velvet_normal.jpg',
            map: 'assets/material_white.jpg',
        },
        onClick: onSetClothMaterial,
    });
    panel.addButton({
        texture: 'assets/material_dark.jpg',
        position: [0, -1.2, 0],
        size: .2,
        material: {
            emissive: [.0,.0,.1],
            shininess: 5,
            map: 'assets/material_dark.jpg',
        },
        onClick: onSetClothMaterial,
    });

    panel.addButton({
        texture: 'assets/woman_body.png',
        position: [0, -1.8, 0],
        color: [1, 1, 1],
        size: .2,
        textureRepeat: [.15, .15],
        vm: {
            skin: [1, 1, 1],
        },
        onClick: onSetClothMaterial,
    });
    panel.addButton({
        texture: 'assets/woman_body.png',
        position: [0, -2.1, 0],
        color: [1, 1, 0.6],
        size: .2,
        textureRepeat: [.15, .15],
        vm: {
            skin: [1, 1, .75],
        },
        onClick: onSetClothMaterial,
    });
    panel.addButton({
        texture: 'assets/woman_body.png',
        position: [0, -2.4, 0],
        color: [.45, .45, .45],
        size: .2,
        textureRepeat: [.15, .15],
        vm: {
            skin: [.45, .45, .45],
        },
        onClick: onSetClothMaterial,
    });

    /*
    var woman2 = page.addAsset({
        position: [1, 0, 0],
    });

    var model2 = woman2.addAsset({
        position: [0, -1.2, -3],
        onClick: 'animateRotate90',
        onFocus: '',
        size: .013,
    });

    model2.addGeometry({
		geometry: 'assets/woman2_arms.obj',
        texture: 'assets/woman2_Body-D.jpg',
        material: {
            normalMap: 'assets/woman2_Body-N.jpg',
        },
	});
    model2.addGeometry({
		geometry: 'assets/woman2_hair.obj',
        texture: 'assets/woman2_Hair-D.jpg',
        material: {
            normalMap: 'assets/woman2_Hair-N.jpg',
        },
	});
    model2.addGeometry({
		geometry: 'assets/woman2_clothes.obj',
        texture: 'assets/woman2_Body-D.jpg',
        material: {
            normalMap: 'assets/woman2_Body-N.jpg',
        },
	});
    model2.addGeometry({
		geometry: 'assets/woman2_eyes.obj',
        texture: 'assets/woman2_Head-D.jpg',
        material: {
            normalMap: 'assets/woman2_Head-N.jpg',
        },
	});
    model2.addGeometry({
		geometry: 'assets/woman2_head.obj',
        texture: 'assets/woman2_Head-D.jpg',
        material: {
            normalMap: 'assets/woman2_Head-N.jpg',
        },
	});
    */

    onSetClothMaterial(defaultMaterial);

	return page;
});
