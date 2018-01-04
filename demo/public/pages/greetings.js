PEEKS.registerPage('greetings', function() {
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
    page.addSiteMapItem('QUOTES/3', { icon: 'http://52.25.54.6/?url=http://www.agingbutdangerous.com/wp-content/uploads/2015/12/happy-new-year-2015-design-free-wallpaper.jpg'});
    page.addSiteMapItem('QUOTES/4', { icon: 'http://52.25.54.6/?url=http://www.agingbutdangerous.com/wp-content/uploads/2015/12/new-year-post.jpg'});
    page.addSiteMapItem('STICKERS', { icon: 'http://52.25.54.6/?url=http://www.line-stickers.com/wp-content/uploads/2017/05/LINE-Happy-New-Year-.png'});
    page.addSiteMapItem('STICKERS/1', { icon: 'http://52.25.54.6/?url=http://www.line-stickers.com/wp-content/uploads/2017/05/LINE-Happy-New-Year-.png'});
    page.addSiteMapItem('STICKERS/2', { icon: 'http://52.25.54.6/?url=http://www.line-stickers.com/wp-content/uploads/2017/05/LINE-Happy-New-Year-.png'});
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
            style: 'email',
            onUpdate: function(text) {
            },
            onEnter: function(text) {
                var link = "mailto:"+ text
                    + "?subject=" + escape("You received a card in Virtual Reality")
                    + "&body=" + "https://www.peeks.io/wishes";
                window.location.href = link;
            },
        });
    };

    var subMenuY = .3;
    var highlightsY = 0;

    var menuPopup;

    var onHome = function(path) {
        page.setSiteMapMenuPath('');
        page.setSiteMapPath('QUOTES');
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
                var button = asset.addButton({
                    image: getAsset(image),
                    path: item.path,
                    valign: 'bottom',
                    onClick: onSend,
                });
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
