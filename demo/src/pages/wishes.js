PEEKS.registerPage('wishes', function() {
	var page = new PEEKS.Asset({
        fontColor: [0, 0, 0],
        fontColorBold: [191/255, 166/255, 154/255],
        fontOutlineStyle: '',
        fontName: 'Helvetica Neue',
        bgColor: [1, 1, 1],
        category: 'white',
        groundImage: '/ui/gradient_radial.png',
        groundImageRepeat: 1,
        backgroundImage: '/ui/gradient.png',
        backgroundImageColor: [224/255, 219/255, 213/255],
    });

	var balloonsAsset = page.addAsset();
    var otherAssets = page.addAsset();

    var screen = page.addScreen({
        radius: 5,
    });

    var canvas = page.addCanvas({
        valign: 'bottom',
    });

    var foreground = page.addAsset();

    var imagePath = '';

    http://flags.fmcdn.net/data/flags/w1160/gb.png

    page.setAssetPath(imagePath);
    page.addSiteMapItem('QUOTES', { icon: 'http://52.25.54.6/?url=http://fypcoachkaren.com/blog/wp-content/uploads/2014/12/New-Year-Quote.jpg'});
    page.addSiteMapItem('QUOTES/1', { icon: 'http://52.25.54.6/?url=https://heavyeditorial.files.wordpress.com/2015/12/poems-new-years-10.jpg'});
    page.addSiteMapItem('QUOTES/2', { icon: 'http://52.25.54.6/?url=http://fypcoachkaren.com/blog/wp-content/uploads/2014/12/New-Year-Quote.jpg'});
    page.addSiteMapItem('FLAGS', { icon: 'http://52.25.54.6/?url=http://flags.fmcdn.net/data/flags/w1160/gb.png'});
    page.addSiteMapItem('FLAGS/GB', { icon: 'http://52.25.54.6/?url=http://flags.fmcdn.net/data/flags/w1160/gb.png'});
    page.addSiteMapItem('FLAGS/FR', { icon: 'http://52.25.54.6/?url=http://flags.fmcdn.net/data/flags/w1160/fr.png'});
    var currentItems = [];

    page.onUpdateSiteMapPath = function() {
        refresh();
    };

    var onClick = function() {
        if (page.siteMapPathIsLeaf(this.path)) {
            page.setSiteMapPath(this.path);
        } else {
            page.setSiteMapMenuPath(this.path);
        }
        refresh();
    };

    var onSend = function() {
        var onUpdate = function () {

        };

        this.getScene().showKeyboard({
            onUpdate: function(text) {
                console.log(text);
            },
            onEnter: function(text) {
                console.log('end: ' + text);
            },
        });
    };

    var subMenuY = .3;
    var highlightsY = 0;

    var menuPopup;

    var onHome = function(path) {
        page.setSiteMapMenuPath('');
        page.setSiteMapPath('STAMPS');
        refresh();
    };

    var getAsset = function(path) {
        if (path) {
            if (path.search('http') === -1) {
                path = imagePath + path;
            }
        }
        return path;
    };

    var refresh = function() {
        //
        // Remove previous items
        //

        var itemCount = currentItems.length;
        for (var itemI = 0; itemI < itemCount; itemI++) {
            currentItems[itemI].destroy();
        }
        currentItems = [];

        //
        // Update elements
        //

        var itemCountMax = 18;
        var itemStep = .055;

        var items = page.querySiteMapMenuAssets();

        // Current navigation level
        if (items) {
            var itemCount = items.length;
            for (var itemI = 0; itemI < itemCount; itemI++) {
                var item = items[itemI];
                var xIndex = itemI;
                var yOffset = subMenuY;
                while (xIndex >= 8) {
                    yOffset += .2;
                    xIndex -= 8;
                }
                var xOffset = (xIndex % 2 === 0) ? (-xIndex * itemStep) : (xIndex + 1) * itemStep;
                var asset = screen.addAsset({
                    position: [xOffset, yOffset, 0],
                    size: .4,
                });
                var image = getAsset(item.image);
                var button = asset.addButton({
                    image: image,
                    path: item.path,
                    imageDetour: true,
                    alpha: image ? 1 : 0,
                    onClick: onClick,
                })
                asset.addText({
                    position: [0, -.6, .1],
                    fontSize: 80,
                    text: item.name,
                    path: item.path,
                    onClick: onClick,
                });
                currentItems.push(asset);
            }
        }

        items = page.querySiteMapAssets();

        if (items) {
            var itemCount = items.length;
            for (var itemI = 0; itemI < itemCount; itemI++) {
                var item = items[itemI];
                var asset = screen.addAsset({
                    position: [(itemI % 2 === 0) ? (-itemI * itemStep) : (itemI + 1) * itemStep, highlightsY, 0],
                });
                var image = item.image;
                var imageBack = item.isProduct ? item.image.replace('_PM2_Front', '_PM1_Other') : undefined;
                var button = asset.addButton({
                    image: getAsset(image),
                    imageBack: getAsset(imageBack),
                    imageDetour: true,
                    path: item.path,
                    valign: 'bottom',
                    onClick: onSend,
                });
                var yOffset = -.6
                if (item.isProduct) {
                    asset.addText({
                        position: [0, yOffset, .1],
                        fontSize: 40,
                        text: 'details',
                        product: item.icon,
                        onClick: function() {},
                    });
                    yOffset -= .2;
                } else {
                    if (item.name) {
                        asset.addText({
                            position: [0, yOffset, .1],
                            fontSize: 64,
                            fontColor: page.fontColorBold,
                            text: item.name,
                        });
                        yOffset -= .1;
                    }
                    if (item.description) {
                        asset.addText({
                            position: [0, yOffset, .1],
                            fontSize: 40,
                            text: item.description,
                        });
                        yOffset -= .1;
                    }
                }
                currentItems.push(asset);
            }
        }
    };

    onHome();

    canvas.addView({
        position: [0, -.45],
        size: [1, .12, 1],
        viewBgColor: [0, 0, 0],
    });

    canvas.addButton({
        image: '/ui/icon_menu.png',
        position: [-.45, -.45],
        size: .07,
        color: page.fontColorBold,
        onClick: 'onShowSiteMapMenu',
    });

    /*
    canvas.addButton({
        image: '/ui/icon_vr.png',
        position: [.45, -.45],
        size: .08,
        color: page.fontColorBold,
        onClick: function() { peeks.toggleVrMode(); },
    });
    */

    canvas.addText({
        position: [0, -.45],
        fontSize: 28,
        text: 'search',
        fontColor: [1, 1, 1],
        size: .08,
        onClick: 'searchPage',
    })

	return page;
});
