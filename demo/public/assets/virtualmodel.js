function createVirtualModal(page, position) {
    var femaleHigh = page.addAsset({
        position: position,
    });

    var model = femaleHigh.addAsset({
        position: [0, -1, -2.9],
        onClick: 'animateRotate90',
        size: .013,
        onFocus: '',
    });

    model.mannequin = {
    };

    var mannequin = model.mannequin;

    var panel = femaleHigh.addAsset({
        position: [.5, 1, -3],
    });
    var panel2 = femaleHigh.addAsset({
        position: [-.5, 1, -3],
    });

    var outfit = "pants";
    var size = "M";
    var skin = [1, 1, 1];
    var modelName = "woman";
    var pose = "pose1";
    var fabric = undefined;

    var getGeometryUrl = function (part) {
        return "/assets/" + modelName + "_" + pose + "_" + size + "_" + part + ".obj";
    };

    var updateGeometry = function(node, mesh, properties, visible) {
        if (node === undefined) {
            node = model.addGeometry({ geometry: getGeometryUrl(mesh) });
        }
        node.setProperties(properties);
        node.setVisible(visible !== undefined ? visible : true);
        return node;
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

        mannequin.body = updateGeometry(mannequin.body, "body", {
            texture: '/assets/woman_body.png',
            color: skin,
            material: {
                emissive: [.1, .05, .05],
                shininess: 20,
            },
        });

        mannequin.shoes = updateGeometry(mannequin.shoes, "highHeels", {
            texture: '/assets/material_suede.jpg',
            material: { type: "velvet" },
        });

        mannequin.body = updateGeometry(mannequin.body, "body", {
            texture: '/assets/woman_body.png',
            color: skin,
            material: {
                emissive: [.1, .05, .05],
                shininess: 20,
            },
        });

        mannequin.pants = updateGeometry(mannequin.pants, "pants", {
            texture: fabric.map,
            material: fabric,
        }, outfit === 'pants');

        mannequin.skirt = updateGeometry(mannequin.skirt, "skirt", {
            texture: fabric.map,
            material: fabric,
        }, outfit === 'skirt');

        mannequin.jacket = updateGeometry(mannequin.jacket, "jacket", {
            texture: fabric.map,
            material: fabric,
        }, outfit === 'pants' || outfit === 'skirt');

        mannequin.blouse = updateGeometry(mannequin.blouse, "j_blouse", {
            texture: '/assets/material_white.jpg',
            material: {
                type: 'velvet',
                emissive: [.05, .05, .1],
                shininess: 10,
                normalMap: '/assets/material_suede_normal.jpg',
            },
        }, outfit === 'pants' || outfit === 'skirt');

        mannequin.underwear = updateGeometry(mannequin.underwear, "underwear", {
            texture: fabric.map === '/assets/material_dark.jpg'
                ? '/assets/woman_underwear_transparency.png'
                : fabric.map,
            alpha: fabric.map === '/assets/material_dark.jpg'
                ? .7
                : 1,
            material: fabric.map === '/assets/material_dark.jpg'
                ? undefined
                : fabric,
        }, outfit === 'underwear');

        mannequin.iris = updateGeometry(mannequin.iris, "iris", {
            texture: '/assets/woman_iris.png',
        });

        mannequin.sclera = updateGeometry(mannequin.sclera, "sclera", {
            texture: '/assets/woman_sclera.png',
            material: {
                alphaMap: '/assets/woman_sclera_alpha.png'
            }
        });
    };

    panel2.addRoundTextButton({
        position: [0, 0, 0],
		size: .15,
        label: 'M',
        fontSize: 60,
        vm: {
            size: 'M'
        },
        onClick: onSetClothMaterial,
    });

    panel2.addRoundTextButton({
        position: [0, .2, 0],
        size: .15,
        label: 'L',
        fontSize: 60,
        vm: {
            size: 'L'
        },
        onClick: onSetClothMaterial,
    });


    panel2.addTextButton({
        position: [0, -.5, 0],
		size: .15,
        label: 'Underwear',
        fontSize: 60,
        vm: {
            outfit: 'underwear'
        },
        onClick: onSetClothMaterial,
    });

    panel2.addTextButton({
        position: [0, -.7, 0],
		size: .15,
        label: 'Pants',
        fontSize: 60,
        vm: {
            outfit: 'pants'
        },
        onClick: onSetClothMaterial,
    });

    panel2.addTextButton({
        position: [0, -.9, 0],
		size: .15,
        label: 'Skirt',
        fontSize: 60,
        vm: {
            outfit: 'skirt'
        },
        onClick: onSetClothMaterial,
    });


    var defaultMaterial = panel.addButton({
        texture: '/assets/material_red_satin.jpg',
        position: [0, .15, 0],
        size: .1,
        material: {
            type: 'velvet',
            emissive: [.1,.1,.1],
            shininess: 10,
            normalMap: undefined,
            map: '/assets/material_red_satin.jpg',
        },
        onClick: onSetClothMaterial,
    });
    panel.addButton({
        texture: '/assets/material_red_velvet.jpg',
        size: .1,
        material: {
            emissive: [.1,0,0],
            shininess: 2,
            normalMap: '/assets/material_velvet_normal.jpg',
            map: '/assets/material_red_velvet.jpg',
        },
        onClick: onSetClothMaterial,
    });
    panel.addButton({
        texture: '/assets/material_suede.jpg',
        position: [0, -.15, 0],
        size: .1,
        material: {
            type: 'velvet',
            emissive: [.1,.1,.1],
            shininess: 5,
            normalMap: '/assets/material_suede_normal.jpg',
            map: '/assets/material_suede.jpg',
            specularMap: '/assets/material_red_satin.jpg',
        },
        onClick: onSetClothMaterial,
    });
    panel.addButton({
        texture: '/assets/material_blue_satin.jpg',
        position: [0, -.3, 0],
        size: .1,
        material: {
            type: 'velvet',
            emissive: [.05,.05,.1],
            shininess: 5,
            normalMap: '/assets/material_suede_normal.jpg',
            map: '/assets/material_blue_satin.jpg',
        },
        onClick: onSetClothMaterial,
    });
    panel.addButton({
        texture: '/assets/material_white.jpg',
        position: [0, -.45, 0],
        size: .1,
        material: {
            emissive: [.1,.0,.0],
            shininess: 2,
            normalMap: '/assets/material_velvet_normal.jpg',
            map: '/assets/material_white.jpg',
        },
        onClick: onSetClothMaterial,
    });
    panel.addButton({
        texture: '/assets/material_dark.jpg',
        position: [0, -.6, 0],
        size: .1,
        material: {
            type: 'velvet',
            emissive: [.0,.0,.1],
            shininess: 5,
            map: '/assets/material_dark.jpg',
        },
        onClick: onSetClothMaterial,
    });

    panel.addButton({
        texture: '/assets/woman_body.png',
        position: [0, -.9, 0],
        color: [1, 1, 1],
        size: .1,
        textureRepeat: [.15, .15],
        vm: {
            skin: [1, 1, 1],
        },
        onClick: onSetClothMaterial,
    });
    panel.addButton({
        texture: '/assets/woman_body.png',
        position: [0, -1.05, 0],
        color: [1, 1, 0.6],
        size: .1,
        textureRepeat: [.15, .15],
        vm: {
            skin: [1, 1, .75],
        },
        onClick: onSetClothMaterial,
    });
    panel.addButton({
        texture: '/assets/woman_body.png',
        position: [0, -1.2, 0],
        color: [.45, .45, .45],
        size: .1,
        textureRepeat: [.15, .15],
        vm: {
            skin: [.45, .45, .45],
        },
        onClick: onSetClothMaterial,
    });

    onSetClothMaterial(defaultMaterial);

    return femaleHigh;
}

PEEKS.registerPage('virtualmodel', function() {
    var page = new PEEKS.Asset({
        category: 'white',
    });

    createVirtualModal(page, [0, 0, 0]);

	return page;
});
