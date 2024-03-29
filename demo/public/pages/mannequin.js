function createMannequin(page) {
    var femaleHigh = page.addAsset();

    var model = femaleHigh.addAsset({
        onClick: 'animateRotate90',
        size: .013,
        onFocusStart: function () {},
        onFocusEnd: function () {},
    });

    model.mannequin = {
    };

    var mannequin = model.mannequin;

    var outfit = "skirt";
    var size = "M";
    var chestSize = "M";
    var breastSize = "M";
    var hipsSize = "M";
    var skin = [1.1, 1.1, 1.4];
    var modelName = "woman";
    var pose = "pose1";
    var poseDefault = "pose1";
    var fabric = undefined;

    var getGeometryUrl = function (part, pose, size) {
        return "/assets/" + modelName + "_" + pose + "_" + part +
            (size ? size : "") +
            ".obj";
    };

    var updateGeometry = function(node, mesh, properties, visible) {
        if (node === undefined) {
            node = model.addMesh({ geometry: getGeometryUrl(mesh, poseDefault) });
        }
        node.initShapeWeights();
        var hipsWeight =
            (hipsSize === 'XS') ? -1
            : (hipsSize === 'S') ? -.5
            : (hipsSize === 'M') ? 0
            : (hipsSize === 'L') ? .5
            : (hipsSize === 'XL') ? 1
            : 0;
        var breastWeight =
            (breastSize === 'XS') ? -1
            : (breastSize === 'S') ? -.5
            : (breastSize === 'M') ? 0
            : (breastSize === 'L') ? .5
            : (breastSize === 'XL') ? 1
            : 0;
        var chestWeight =
            (chestSize === 'XS') ? -1
            : (chestSize === 'S') ? -.5
            : (chestSize === 'M') ? 0
            : (chestSize === 'L') ? .5
            : (chestSize === 'XL') ? 1
            : 0;
        if (mesh === 'jacket' ||
            mesh === 'j_blouse' ||
            mesh === 'pants' ||
            mesh === 'skirt' ||
            mesh === 'underwear' ||
            mesh === 'body')
        {
            if (hipsWeight !== 0) {
                node.setShape(pose + '_hips_1_1', getGeometryUrl(mesh, pose, '_hips_1_1'), hipsWeight);
            }
            if (breastWeight !== 0) {
                node.setShape(pose + '_breast_1_1', getGeometryUrl(mesh, pose, '_spine1_1_1'), breastWeight);
            }
            if (chestWeight !== 0) {
                node.setShape(pose + '_chest_1_1', getGeometryUrl(mesh, pose, '_spine2_1_1'), chestWeight);
            }
        }
        node.validateShapeWeights();
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
            if (caller.vm.breastSize !== undefined) {
                breastSize = caller.vm.breastSize;
            }
            if (caller.vm.chestSize !== undefined) {
                chestSize = caller.vm.chestSize;
            }
            if (caller.vm.hipsSize !== undefined) {
                hipsSize = caller.vm.hipsSize;
            }
            if (caller.vm.outfit !== undefined) {
                outfit = caller.vm.outfit;
            }
            if (caller.vm.skin !== undefined) {
                skin = caller.vm.skin;
            }
        }

        mannequin.shoes = updateGeometry(mannequin.shoes, "highHeels", {
            texture: '/assets/material_suede.jpg',
            material: { type: "velvet" },
        });

        mannequin.hair = updateGeometry(mannequin.hair, "hair", {
            texture: '/assets/woman_hair_diffuse.png',
            color: [.7, .4, .1],
            material: {
                emissive: [.05, .05, .05],
                reflectivity: 10,
                shininess: 20,
                bumpMap: '/assets/woman_hair_normal.png',
                bumpScale: .01,
             },
        });
        mannequin.hair.setPosition([0, 10, 0]);

        mannequin.body = updateGeometry(mannequin.body, "body", {
            texture: '/assets/woman_body.png',
            color: skin,
            material: {
                emissive: [.0, .0, .0],
                reflectivity: .1,
                shininess: .1,
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

    var canvas = page.addCanvas({valign: 'top'});
    var y = .45;
    canvas.addText({
        position: [.35, y, 0],
        text: 'Fabric',
        fontSize: 30,
        fontOutlineStyle: '',
    });
    canvas.addView({
        position: [.35, y - .03, 0],
        size: [.2, .001, 1],
    });
    y-= .08;
    canvas.addDisc({
        texture: '/assets/material_red_satin.jpg',
        position: [.3, y, 0],
        size: .05,
        material: {
            type: 'velvet',
            emissive: [.1,.1,.1],
            shininess: 10,
            normalMap: undefined,
            map: '/assets/material_red_satin.jpg',
        },
        onClick: onSetClothMaterial,
    });
    var defaultMaterial = canvas.addDisc({
        texture: '/assets/material_red_velvet.jpg',
        position: [.4, y, 0],
        size: .05,
        material: {
            emissive: [0,0,0],
            shininess: 10,
            //bumpMap: '/assets/material_velvet_normal.jpg',
            //bumpScale: .03,
            normalMap: '/assets/material_velvet_normal.jpg',
            normalScale: [3, 3],
            textureRepeat: [2, 2],
            //bumpScale: .03,
            map: '/assets/material_red_velvet.jpg',
        },
        onClick: onSetClothMaterial,
    });
    y-= .08;
    canvas.addDisc({
        texture: '/assets/material_suede.jpg',
        position: [.3, y, 0],
        size: .05,
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
    canvas.addDisc({
        texture: '/assets/material_blue_satin.jpg',
        position: [.4, y, 0],
        size: .05,
        material: {
            type: 'velvet',
            emissive: [.05,.05,.1],
            shininess: 5,
            normalMap: '/assets/material_suede_normal.jpg',
            map: '/assets/material_blue_satin.jpg',
        },
        onClick: onSetClothMaterial,
    });
    y-= .08;
    canvas.addDisc({
        texture: '/assets/material_white.jpg',
        position: [.3, y, 0],
        size: .05,
        material: {
            emissive: [.1,.0,.0],
            shininess: 2,
            normalMap: '/assets/material_velvet_normal.jpg',
            map: '/assets/material_white.jpg',
            textureRepeat: [2, 2],
        },
        onClick: onSetClothMaterial,
    });
    canvas.addDisc({
        texture: '/assets/material_dark.jpg',
        position: [.4, y, 0],
        size: .05,
        material: {
            type: 'velvet',
            emissive: [.0,.0,.1],
            shininess: 5,
            map: '/assets/material_dark.jpg',
        },
        onClick: onSetClothMaterial,
    });

    y-= .2;
    canvas.addText({
        position: [.35, y, 0],
        text: 'Skin',
        fontSize: 30,
        fontOutlineStyle: '',
    });
    canvas.addView({
        position: [.35, y - .03, 0],
        size: [.2, .001, 1],
    });
    y-= .08;
    canvas.addDisc({
        texture: '/assets/woman_body.png',
        position: [.3, y, 0],
        size: .05,
        color: [1.1, 1.1, 1.4],
        textureRepeat: [.15, .15],
        vm: {
            skin: [1.1, 1.1, 1.4],
        },
        onClick: onSetClothMaterial,
    });
    canvas.addDisc({
        texture: '/assets/woman_body.png',
        position: [.4, y, 0],
        size: .05,
        color: [1, 1, 1],
        textureRepeat: [.15, .15],
        vm: {
            skin: [1, 1, 1],
        },
        onClick: onSetClothMaterial,
    });
    y-= .08;
    canvas.addDisc({
        texture: '/assets/woman_body.png',
        position: [.3, y, 0],
        size: .05,
        color: [1, 1, 0.7],
        textureRepeat: [.15, .15],
        vm: {
            skin: [1, 1, 0.7],
        },
        onClick: onSetClothMaterial,
    });
    canvas.addDisc({
        texture: '/assets/woman_body.png',
        position: [.4, y, 0],
        size: .05,
        color: [.3, .3, .3],
        textureRepeat: [.15, .15],
        vm: {
            skin: [.4, .4, .4],
        },
        onClick: onSetClothMaterial,
    });

    var addSizes = function(parent, x, y, part) {
        var fontSize = 30;
        parent.addTextButton({
            position: [x - .1, y, 0],
            size: .1,
            label: 'XS',
            fontSize: fontSize,
            vm: {},
            onClick: onSetClothMaterial,
        }).vm[part + "Size"] = 'XS';
        parent.addTextButton({
            position: [x - .05, y, 0],
            size: .1,
            label: 'S',
            fontSize: fontSize,
            vm: {},
            onClick: onSetClothMaterial,
        }).vm[part + "Size"] = 'S';
        parent.addTextButton({
            position: [x, y, 0],
            size: .1,
            label: 'M',
            fontSize: fontSize,
            vm: {},
            onClick: onSetClothMaterial,
        }).vm[part + "Size"] = 'M';
        parent.addTextButton({
            position: [x + .05, y, 0],
            size: .1,
            label: 'L',
            fontSize: fontSize,
            vm: {},
            onClick: onSetClothMaterial,
        }).vm[part + "Size"] = 'L';
        parent.addTextButton({
            position: [x + .1, y, 0],
            size: .1,
            label: 'XL',
            fontSize: fontSize,
            vm: {
                size: 'L',
            },
            onClick: onSetClothMaterial,
        }).vm[part + "Size"] = 'XL';
    }

    var y = .45;

    canvas.addText({
        position: [-.35, y, 0],
        text: 'Breast',
        fontSize: 30,
        fontOutlineStyle: '',
    });
    y-= .05;
    addSizes(canvas, -.35, y, 'chest');
    y-= .08;
    canvas.addText({
        position: [-.35, y, 0],
        text: 'Waist',
        fontSize: 30,
        fontOutlineStyle: '',
    });
    y-= .05;
    addSizes(canvas, -.35, y, 'breast');
    y-= .08;
    canvas.addText({
        position: [-.35, y, 0],
        text: 'Hips',
        fontSize: 30,
        fontOutlineStyle: '',
    });
    y-= .05;
    addSizes(canvas, -.35, y, 'hips');

    y-= .2;

    canvas.addText({
        position: [-.35, y, 0],
        text: 'Outfit',
        fontSize: 30,
        fontOutlineStyle: '',
    });
    canvas.addView({
        position: [-.35, y - .03, 0],
        size: [.2, .001, 1],
    });
    y-= .08;
    canvas.addTextButton({
        position: [-.35, y, 0],
		size: .15,
        label: 'Underwear',
        fontSize: 35,
        vm: {
            outfit: 'underwear'
        },
        onClick: onSetClothMaterial,
    });
    y-= .08;
    canvas.addTextButton({
        position: [-.35, y, 0],
		size: .15,
        label: 'Pants',
        fontSize: 35,
        vm: {
            outfit: 'pants'
        },
        onClick: onSetClothMaterial,
    });
    y-= .08;
    canvas.addTextButton({
        position: [-.35, y, 0],
		size: .15,
        label: 'Skirt',
        fontSize: 35,
        vm: {
            outfit: 'skirt'
        },
        onClick: onSetClothMaterial,
    });


    onSetClothMaterial(defaultMaterial);

    return femaleHigh;
}

PEEKS.registerPage('peeks.demo.mannequin', function() {
    var page = new PEEKS.Asset({
        category: 'white',
        gyroscope: 'off',
        bgColor: [44/255, 45/255, 46/255],
    });

    var mannequin = createMannequin(page);
    // Stand-up
    mannequin.setPosition([0, -1, -2.9]);
    // Face zoom
    //mannequin.setPosition([0, -2, -0.8]);
    //mannequin.setRotation([0, -30, 0]);

    page.addLight({
        lightType: 'ambient',
        intensity: .4,
    });
    page.addLight({
        position: [1, 1, 1],
        intensity: .7,
    });
    page.addLight({
        position: [-1, .5, 1],
        intensity: .4,
    });


	return page;
});
