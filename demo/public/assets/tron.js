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
                points: [],
            };
        }

        var p0 = moto.trail.lastPosition;
        var offsetV2 = [p1[0] - p0[0], p1[2] - p0[2]];
        var distance = Math.sqrt(offsetV2[0] * offsetV2[0] + offsetV2[1] * offsetV2[1]);
        if (distance > .02) {
            moto.trail.lastPosition = p1.slice();
            moto.trail.points.push(p1.slice());
            if (moto.trail.ribbons !== undefined) {
                moto.trail.ribbons.destroy();
            }
            var position = this.getScene().computeOffsetFromCamera(offsetFromCamera);
            moto.trail.ribbons = page.addAsset();
            moto.trail.ribbons.addRibbon({
                position: [0, .2, 0],
                points: moto.trail.points,
            });
            moto.trail.ribbons.addRibbon({
                position: [0, .1, 0],
                points: moto.trail.points,
            });
            moto.trail.ribbons.addRibbon({
                position: [0, 0, 0],
                points: moto.trail.points,
            });
        }
    };

	return page;
});
