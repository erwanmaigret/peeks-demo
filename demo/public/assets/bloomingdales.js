PEEKS.registerPage('bloomingdales', function() {
	var page = new PEEKS.Asset({
        fontColor: [0, 0, 0]
    });

    page.setAttr('bgColor', [1, 1, 1]);

    var url = 'https://www.bloomingdales.com';

    var canvasCenter = page.addCanvas({
        valign: 'top',
    });

    var loading = canvasCenter.addText({
        size: 1.5,
        text: 'Loading ' + url + '...',
        fontSize: 30,
    });

    var canvas = page.addCanvas({
        valign: 'top',
    });

    var billboard = page.addAsset();
    var itemCount = 0;

    var imageCount = 0;
    var addItem = function(label, href) {
        var x = itemCount - 1;
        var y = Math.floor(itemCount);
        if (y % 2 === 0) {
            y = -y / 2;
        } else {
            y = (y + 1) / 2;
        }
        var rotation = [1.5, y, 0];
        var pivot = billboard.addAsset({
            rotation: [rotation[0] * 8, rotation[1] * 10, rotation[2] * 10],
            rotationOrder: 'YXZ',
        });
        var button = pivot.addTextButtonThin({
            label: label,
            position: [0, 0, -2],
            rotation: [0, 0, 0],
            size: [.3, .1, 1],
            fontSize: 20,
            onClick: function() {
                if (this.href) {
                    var win = window.open(this.href, '_blank');
                    win.focus();
                }
            }
        });
        button.href = href;
        button.animateInFromFar(itemCount * .1);
        itemCount++;
    };
    var addItemPrevious = function(label, href) {
        var x = itemCount % 3 - 1;
        var y = 3 + Math.floor(itemCount / 3);
        if (y % 2 === 0) {
            y = -y / 2;
        } else {
            y = (y + 1) / 2;
        }
        var rotation = [x, y, 0];
        var pivot = billboard.addAsset({
            rotation: [rotation[0] * 8, rotation[1] * 10, rotation[2] * 10],
            rotationOrder: 'YXZ',
        });
        var button = pivot.addTextButtonThin({
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
        button.animateInFromFar(itemCount * .1);
        itemCount++;
    };

    var imageY = .25;

    var addImage = function(width, height, url) {
        width = width * .0015;
        height = height * .0015;
        page.addImage({
            image: 'http://35.161.135.124/?url=' + url,
            position: [0, imageY, -5],
            size: [width, height, 1],
        }).animateInFromFar(imageCount * .1);

        imageCount++;

        imageY -= height;
    }

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
            if (data.source.img && data.source.img.length > 0) {
                for (var itemI = 0; itemI < data.source.img.length; itemI++) {
                    var item = data.source.img[itemI];
                    addImage(item.width, item.height, item.src);
                }
            }

            loading.destroy();
        }
    };
    xhttp.open("GET",
        "/scrap?uri=" + encodeURI(url),
        true);
    xhttp.send();

	return page;
});
