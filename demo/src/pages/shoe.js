function createAsset(page, position) {
    var femaleHigh = page.addAsset({
        position: position,
    });

    var model = femaleHigh.addAsset({
        position: [0, 0, -2],
        rotation: [0, -110, 0],
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
        });
        mannequin.boot_buckle = updateGeometry(mannequin.boot_buckle, "buckle", {
            texture: '/assets/frye_boot_diffuse.jpg',
        });
        mannequin.boot_inside = updateGeometry(mannequin.boot_inside, "inside", {
            texture: '/assets/material_suede.jpg',
        });
        mannequin.boot_sole = updateGeometry(mannequin.boot_sole, "sole", {
            texture: '/assets/frye_sole.jpg',
        });
        mannequin.boot_sole_top = updateGeometry(mannequin.boot_sole_top, "sole_top", {
            texture: '/assets/frye_sole.jpg',
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
            type: 'velvet',
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
            bumpMap: '/assets/frye_boot_bump.jpg',
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

    onSetClothMaterial(defaultMaterial);

    return femaleHigh;
}

PEEKS.registerPage('shoe', function() {
    var page = new PEEKS.Asset({
        category: 'white',
        bgColor: [226/255, 220/255, 209/255],
        gyroscope: 'off',
    });

    createAsset(page, [0, 0, 0]);

	return page;
});
