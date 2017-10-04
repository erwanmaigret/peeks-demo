PEEKS.registerPage('bloomingdales', function() {
	var page = new PEEKS.Asset({
//        fontColor: [0, 0, 0],
    });

    page.setAttr('bgColor', [.8, .9, .8]);

    var canvasCenter = page.addCanvas({
        valign: 'top',
    });

    var loading = canvasCenter.addText({
        size: 1.5,
        text: 'Analyzing website...',
        fontSize: 30,
    });

    var canvas = page.addCanvas({
        valign: 'top',
    });

    var billboard = page.addAsset();
    var itemCount = 0;

    var addItem = function(label, href) {
        var rotation = [0, 0, 0];
        switch (itemCount) {
            case 0: rotation = [0, 0, 0]; break;
            case 1: rotation = [0, 1, 0]; break;
            case 2: rotation = [0, -1, 0]; break;
            case 3: rotation = [1, 0, 0]; break;
            case 4: rotation = [1, 1, 0]; break;
            case 5: rotation = [1, -1, 0]; break;
            case 6: rotation = [-1, 0, 0]; break;
            case 7: rotation = [-1, 1, 0]; break;
            case 8: rotation = [-1, -1, 0]; break;
            case 9: rotation = [0, 2, 0]; break;
            case 10: rotation = [1, 2, 0]; break;
            case 11: rotation = [-1, 2, 0]; break;
            case 12: rotation = [0, -2, 0]; break;
            case 13: rotation = [1, -2, 0]; break;
            case 14: rotation = [-1, -2, 0]; break;
        }
        var pivot = billboard.addAsset({
            rotation: [rotation[0] * 8, rotation[1] * 10, rotation[2] * 10],
            rotationOrder: 'YXZ',
        });
        var button = pivot.addTextButton({
            label: label,
            position: [0, 0, -2],
            rotation: [0, 0, 0],
            size: [.3, .2, 1],
            fontSize: 20,
            onClick: function() {
                if (this.href) {
                    var win = window.open(this.href, '_blank');
                    win.focus();
                }
            }
        });
        button.href = href;
        button.animate({
            duration: .5,
            delay: itemCount * .1,
            begin: [0, 0, -100],
            end: [0, 0, 0],
            attribute: 'position'
        });
        itemCount++;
    };

    page.addPage('peeks_toolbar');

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            if (data.peeks.title) {
                canvas.addText({
                    position: [0, .45, 0],
                    size: 1.5,
                    text: data.peeks.title,
                    fontSize: 30,
                }).animate({
                    duration: 1,
                    begin: [0, .5, 0],
                    end: [0, 0, 0],
                    attribute: 'position'
                });
            }
            if (data.peeks.menu && data.peeks.menu.length > 0) {
                for (var menuI = 0; menuI < data.peeks.menu.length; menuI++) {
                    var menu = data.peeks.menu[menuI];
                    if (menu.label) {
                        addItem(menu.label, menu.href);
                    }
                }
            }

            loading.destroy();
        }
    };
    xhttp.open("GET",
        "/scrap?uri=" + encodeURI('https://www.bloomingdales.com'),
        true);
    xhttp.send();

	return page;
});
