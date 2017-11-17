PEEKS.registerPage('Fortinet', function() {
	var page = new PEEKS.Asset({
        fontColor: [1, 1, 1],
        fontColorBold: [197/255, 1/255, 0],
        fontOutlineStyle: '',
        fontName: 'Helvetica Neue',
        bgColor: [0, 0, 0],
        category: '',
        groundImage: 'images/floor_network.jpg',
        groundImageRepeat: 200,
        groundImageAlpha: 1,
        //groundImageRepeat: 50,
        //groundImageColor: [225/255, 255/255, 252/255],
        //groundImageColor: [141/255, 201/255, 195/255],
        //backgroundImage: 'ui/gradient.png',
        // title: 'Target'
    });

	var panel = page.addAsset();

    var canvas = page.addCanvas({
        valign: 'top',
    });

    canvas.addText({
        position: [-.45, .4],
        fontSize: 100,
        text: 'F',
    }).animate({
        duration: 1,
        delay: 4,
        begin: [1.5, 0, 0],
        end: [0, 0, 0],
        attribute: 'position'
    });

    canvas.addText({
        position: [-.38, .4],
        fontSize: 100,
        fontColor: page.fontColorBold,
        text: 'O',
    }).animate({
        duration: 1,
        delay: 4.25,
        begin: [1.5, 0, 0],
        end: [0, 0, 0],
        attribute: 'position'
    });

    canvas.addText({
        position: [-.17, .4],
        fontSize: 100,
        text: 'RTINET',
    }).animate({
        duration: 1,
        delay: 4.5,
        begin: [1.5, 0, 0],
        end: [0, 0, 0],
        attribute: 'position'
    });

    var onProductInfo = function () {
        var pane = this.parent.addView({
            position: [0, 1, 0],
            size: [1.5, 1, 1],
            alpha: .3,
            viewBgColor: [1, 1, 1],
        }).animate({
            duration: 1,
            begin: [0, 6, 0],
            end: [0, 0, 0],
            attribute: 'position'
        });
        pane.addText({
            position: [0, .25, .1],
            fontSize: 160,
            text: 'Data Center',
        });
        pane.addText({
            position: [0, -.25, .1],
            fontSize: 120,
            text: 'XXX',
        });
    }

    var delay = 2;
    delay = 0;
    var addStorage = function(position) {
        var asset = page.addAsset({
            position: position,
        });
        asset.addGeometry({
            geometry: 'assets/network_raid-nas.obj',
            texture: 'assets/network_raid-nas.jpg',
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            size: .05,
            onClick: onProductInfo,
        });
        asset.animate({
            duration: 1,
            delay: 2 + delay,
            begin: [0, -2, 0],
            end: [0, 0, 0],
            attribute: 'position'
        });
        delay += .3;
    }

    addStorage([-2, -1, -7]);
    addStorage([-1, -1, -9]);
    addStorage([1, -1, -9]);
    addStorage([2, -1, -7]);

    var entranceOpen = function () {
        doorLeft.animate({
            duration: 2,
            delay: 0,
            begin: [0, 0, 0],
            end: [0, 90, 0],
            attribute: 'rotation'
        });
        doorRight.animate({
            duration: 2,
            delay: 0,
            begin: [0, 0, 0],
            end: [0, -90, 0],
            attribute: 'rotation'
        });
    }
    var entrance = page.addAsset({
        size: 1,
    });
    var doorLeft = entrance.addAsset({
        position: [-2, -.7, -3],
    });
    var doorLeftPane = doorLeft.addView({
        position: [1, 0, 0],
        viewBgColor: [.2, .2, .2],
        size: 2,
    });
    doorLeftPane.addTextButton({
        position: [0, 0, .01],
        fontSize: 400,
        text: 'D',
        size: .2,
        onClick: entranceOpen
    });
    var doorRight = entrance.addAsset({
        position: [2, -.7, -3],
    });
    var doorRightPane = doorRight.addView({
        position: [-1, 0, 0],
        viewBgColor: [.18, .18, .18],
        size: 2,
    });
    doorRightPane.addTextButton({
        position: [0, 0, .01],
        fontSize: 400,
        text: 'X',
        size: .2,
        onClick: entranceOpen
    });

	return page;
});
