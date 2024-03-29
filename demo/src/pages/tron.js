PEEKS.registerPage('peeks.demo.tron', function() {
    var gridImage = '/images/floor_network.jpg';
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
            page.getCamera().speed = 10;
            this.destroy();
        }
    });

    var moto;
    var offsetFromCamera = [0, -1, -4];

    page.onUpdate = function() {
        var p1 = this.getScene().computeOffsetFromCamera(offsetFromCamera);

        if (moto == undefined) {
            moto = page.addMesh({
                geometry: '/assets/tron_moto.obj',
                size: .02,
                rotation: [0, 180, 0],
                position: p1,
            });
            moto.trail = {
                lastPosition: p1.slice(),
                points: [],
            };
        }

        moto.setPosition(p1);

        var p0 = moto.trail.lastPosition;
        var offsetV2 = [p1[0] - p0[0], p1[2] - p0[2]];

        var distance = Math.sqrt(offsetV2[0] * offsetV2[0] + offsetV2[1] * offsetV2[1]);
        if (distance > .02) {
            moto.trail.lastPosition = p1.slice();
            moto.trail.points.push(p1.slice());
            if (moto.trail.ribbons !== undefined) {
                moto.trail.ribbons.destroy();
            }
            moto.trail.ribbons = page.addAsset();
            moto.trail.ribbons.addRibbon({position: [0, .2, 0], points: moto.trail.points });
            moto.trail.ribbons.addRibbon({position: [0, .25, 0], points: moto.trail.points });
            moto.trail.ribbons.addRibbon({position: [0, .3, 0], points: moto.trail.points });
        }

        if (moto.trail.points.length >= 2) {
            var shift = moto.trail.points.length >= 10 ? 10 : moto.trail.points.length;
            var a = moto.trail.points[moto.trail.points.length - shift];
            var b = moto.trail.points[moto.trail.points.length - 1];
            var dir = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
            var length = Math.sqrt(dir[0] * dir[0] + dir[1] * dir[1] + dir[2] * dir[2])
            dir = [dir[0] / length, dir[1] / length, dir[2] / length];
            var cos = dir[0];
            var sign =  dir[2] < 0 ? 1 : -1;
            moto.setRotation([0, 90 + sign * Math.acos(cos) * 180 / Math.PI, 0]);
        }
    };

	return page;
});
