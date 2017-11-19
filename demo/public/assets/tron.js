PEEKS.registerPage('tron', function() {
    var gridImage = 'images/floor_network.jpg';
    var gridRepeat = 200;

	var page = new PEEKS.Asset({
        fontColor: [1, 1, 1],
        fontOutlineStyle: '',
        fontName: 'Helvetica Neue',
        bgColor: [0, 0, 0],
        category: '',
        groundImage: gridImage,
        groundImageRepeat: gridRepeat,
        navigation: 'vehicle',
    });

    var canvas = page.addCanvas();

    canvas.addTextButton({
        fontSize: 40,
        text: 'go',
        onClick: function() {
            page.getCamera().speed = 1;
            this.destroy();
        }
    });

    var moto;
    var offsetFromCamera = [0, -1, -4];

    page.onUpdate = function() {
        var p1 = this.getScene().computeOffsetFromCamera(offsetFromCamera);

        if (moto == undefined) {
            moto = this.getScene().getCamera().addGeometry({
                geometry: 'assets/tron_moto.obj',
                size: .02,
                rotation: [0, 180, 0],
                position: offsetFromCamera,
            });
            moto.trail = {
                lastPosition: p1.slice(),
            };
        }

        var p0 = moto.trail.lastPosition;
        var distance = Math.sqrt(
            (p0[0] - p1[0]) * (p0[0] - p1[0]) +
            (p0[2] - p1[2]) * (p0[2] - p1[2])
        );

        if (distance > 1) {
            moto.trail.lastPosition = p1.slice();
            var position = this.getScene().computeOffsetFromCamera(offsetFromCamera);
            page.addRing({
                position: position,
                size: .1,
            });
        }
    };

	return page;
});
