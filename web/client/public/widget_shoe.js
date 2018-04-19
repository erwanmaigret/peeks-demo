PEEKS.registerPage('widget_shoe', function() {
    var page = new PEEKS.Asset({
        bgColor: [226/255, 220/255, 209/255],
        gyroscope: 'off',
    });

    var model = page.addAsset({
        position: [0, 0, -2],
        rotation: [0, 20, 0],
        onClick: 'animateRotate90',
        size: .035,
        onFocusStart: function () {},
        onFocusEnd: function () {},
    });

    var assetPath = "/assets/";

    var getGeometryUrl = function (part) {
        return assetPath + "frye_boot" + (part !== "" ? "_" + part : "") + ".obj";
    };

    var addGeometry = function(mesh, properties) {
        var node = model.addMesh({
            geometry: getGeometryUrl(mesh),
            position: [-20, -20, 20],
        });
        node.setProperties(properties);
        return node;
    };

    addGeometry("", {
        texture: assetPath + 'frye_boot_diffuse.jpg',
        material: {
            reflectivity: .2,
            shininess: 15,
            emissive: [0,.0,.0],
            specular: [.1, .1, .1],
            bumpMap: assetPath + 'frye_boot_bump.jpg',
            bumpScale: .005,
        },
    });

    addGeometry("buckle", { texture: assetPath + 'frye_boot_diffuse.jpg' });
    addGeometry("sole", { texture: assetPath + 'frye_sole.jpg' });
    addGeometry("sole_top", { texture: assetPath + 'frye_sole.jpg' });

    return page;
});
