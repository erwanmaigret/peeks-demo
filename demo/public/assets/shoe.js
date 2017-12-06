function createAsset(page, position) {
    var femaleHigh = page.addAsset({
        position: position,
    });

    var model = femaleHigh.addAsset({
        position: [0, 0, -2.9],
        rotation: [0, -90, 0],
        onClick: 'animateRotate90',
        size: .03,
        onFocus: '',
    });

    model.mannequin = {
    };

    var mannequin = model.mannequin;

    var panel = femaleHigh.addAsset({
        position: [.5, 1, -3],
    });

    var outfit = "pants";
    var size = "M";
    var sizeDefault = "M";
    var chestSize = "M";
    var breastSize = "M";
    var hipsSize = "M";
    var skin = [1, 1, 1];
    var modelName = "woman";
    var pose = "pose1";
    var poseDefault = "pose1";
    var fabric = undefined;

    var getGeometryUrl = function (part) {
        return "/assets/frye_boot" + (part !== "" ? "_" + part : "") + ".obj";
//        return "/assets/" + modelName + "_" + pose + "_" + part +
//            (size ? size : "") +
//            ".obj";
    };

    var updateGeometry = function(node, mesh, properties) {
        if (node === undefined) {
            node = model.addMesh({
                geometry: getGeometryUrl(mesh, poseDefault),
                position: [-20, -20, 20],
            });
        }
        node.setProperties(properties);
        return node;
    };

    var onSetClothMaterial = function(caller) {
        if (caller === undefined) {
            caller = this;
        }
        if (caller.material !== undefined) {
            fabric = caller.material;
        }

        mannequin.boot = updateGeometry(mannequin.boot, "", {
            texture: fabric.map,
            material: fabric,
        });
        mannequin.boot_buckle = updateGeometry(mannequin.boot_buckle, "buckle", {
            texture: fabric.map,
            material: fabric,
        });
        mannequin.boot_buckle = updateGeometry(mannequin.boot_buckle, "buckle", {
            texture: '/assets/frye_boot_diffuse.jpg',
            material: fabric,
        });
        mannequin.boot_inside = updateGeometry(mannequin.boot_inside, "inside", {
            texture: fabric.map,
            material: fabric,
        });
        mannequin.boot_sole = updateGeometry(mannequin.boot_sole, "sole", {
            texture: '/assets/frye_sole.jpg',
            material: fabric,
        });
        mannequin.boot_sole_top = updateGeometry(mannequin.boot_sole_top, "sole_top", {
            texture: fabric.map,
            material: fabric,
        });
    };

    var canvas = page.addCanvas({valign: 'top'});
    var y = .45;
    canvas.addText({
        position: [.35, y, 0],
        text: 'Finish',
        fontSize: 40,
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
    canvas.addDisc({
        texture: '/assets/material_nubuk.jpg',
        position: [.4, y, 0],
        size: .05,
        material: {
            emissive: [.1,0,0],
            shininess: 2,
            map: '/assets/material_nubuk.jpg',
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
    var defaultMaterial = canvas.addDisc({
        texture: '/assets/frye_boot_diffuse.jpg',
        position: [.3, y, 0],
        size: .05,
        material: {
            emissive: [.1,.0,.0],
            shininess: 2,
            map: '/assets/frye_boot_diffuse.jpg',
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

    onSetClothMaterial(defaultMaterial);

    return femaleHigh;
}

PEEKS.registerPage('shoe', function() {
    var page = new PEEKS.Asset({
        category: 'white',
        bgColor: [.8, .8, .7],
        gyroscope: 'off',
    });

    createAsset(page, [0, 0, 0]);

	return page;
});
