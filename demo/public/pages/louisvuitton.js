var analytics = function (event, action, params) {
    return;

    console.log(event + ': ' + action + (params ? params.toString() : ''));

    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://52.25.54.6:9000/peeks/analytics/', true);
    xhr.setRequestHeader("Authorization", "Basic ZXJ3YW46ZXJ3QG4xMjM=");
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {//Call a function when the state changes.
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            console.log('done');
            consold.log(xhr);
            // Request finished. Do processing here.
        }
    }
    xhr.send(
        //{"title":"test","action":"xhr" , "timeEpoc":"1212"}
        //'{"title":"firstMessage","action":"scroll left" , "timeEpoc":"1212"}'
        "foo=bar&lorem=ipsum"
    );
};

PEEKS.Screen.prototype.onLayout = function() {
    if (this.currentItems === undefined) {
        this.currentItems = [];
    }

    var page = this.getPage();

    var getAsset = function(path) {
        if (path) {
            if (path.search('http') === -1) {
                path = imagePath + path;
            }
        }
        return path;
    };

    var screen = this;
    var onClick = function() {
        if (page.siteMapPathIsLeaf(this.path)) {
            page.setSiteMapPath(this.path);
        } else {
            page.setSiteMapMenuPath(this.path);
        }
        screen.onLayout();
    };

    var onPageClick = function() {
        if (this.page) {
            page.getScene().loadPage(this.page);
        }
    };

    var onToggleProduct = function() {
        if (this.productPane === undefined) {
            var productPane = this.parent.addView({
                position: [0, .75, -.1],
                size: [.8, .4, 1],
                viewBgColor: [.96, .96, .96],
            });

            productPane.addText({
                viewBgColor: page.fontColorBold,
                position: [0, .3, .01],
                size: [.3, .2, 1],
                fontSize: 42,
                fontColor: [.3, .3, .3],
                text: 'Sizes',
            });

            for (var i = 0; i < 5; i++) {
                productPane.addButton({
                    position: [-.36 + .18 * i, .1, .01],
                    size: [.15, .2, 1],
                    viewBgColor: [1, 1, 1],
                }).addText({
                    position: [0, 0, .01],
                    fontSize: 52,
                    fontColor: [.3, .3, .3],
                    text: (6 + i * 2).toString(),
                });
            }

            productPane.addButton({
                viewBgColor: page.fontColorBold,
                position: [0, -.3, .01],
                size: [.4, .2, 1],
            }).addText({
                position: [0, 0, .01],
                fontSize: 52,
                fontColor: [0, 0, 0],
                text: 'try on',
                onClick: function() {
                    page.getScene().loadPage('peeks.demo.mannequin');
                }
            });

            productPane.animate({
                duration: .6,
                delay: .5,
                begin: [0, -1, 0],
                end: [0, 0, 0],
                attribute: 'position'
            });

            this.productPane = productPane;
        } else {
            this.productPane.destroy();
            this.productPane = undefined;
        }
    };

    // Remove previous items
    var itemCount = this.currentItems.length;
    for (var itemI = 0; itemI < itemCount; itemI++) {
        this.currentItems[itemI].destroy();
    }
    this.currentItems = [];

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
            var yOffset = .3;
            while (xIndex >= 8) {
                yOffset += .2;
                xIndex -= 8;
            }
            var xOffset = (xIndex % 2 === 0) ? (-xIndex * itemStep) : (xIndex + 1) * itemStep;
            var asset = this.addAsset({
                position: [xOffset, yOffset, 0],
                size: .4,
            });
            var image = this.getAssetPath(item.image);
            var shelve = asset.addView({
                position: [0, -0.5, 0],
                rotation: [-90, 0, 0],
                size: [2.5, 1, 1],
                viewBgColor: page.colorDark,
            });
            /* Support
            shelve.addView({
                position: [0, .1, .25],
                rotation: [90, 0, 0],
                size: [.01, .5, 1],
                viewBgColor: page.colorDark,
            });
            */
            var label = shelve.addView({
                position: [0, -.5, -.15],
                rotation: [90, 0, 0],
                size: [1, .3, 1],
                viewBgColor: page.colorDark,
            });
            shelve.addView({
                position: [0, -.51, 0],
                rotation: [90, 0, 0],
                size: [1, .01, 1],
                viewBgColor: page.colorLight,
            });
            var button = asset.addButton({
                image: image,
                path: item.path,
                imageDetour: true,
                alpha: image ? 1 : 0,
                onClick: onClick,
            })
            label.addText({
                position: [0, 0, .1],
                fontSize: 60,
                size: [.3, .1, 1],
                fontColor: page.colorLight,
                text: item.name,
                path: item.path,
                onClick: onClick,
            });

            this.currentItems.push(asset);
        }
    }

    items = page.querySiteMapAssets();

    if (items) {
        var itemCount = items.length;
        for (var itemI = 0; itemI < itemCount; itemI++) {
            var item = items[itemI];
            var asset = this.addAsset({
                position: [(itemI % 2 === 0) ? (-itemI * itemStep) : (itemI + 1) * itemStep, 0, 0],
            });
            var image = item.image;
            var imageBack = item.isProduct ? item.image.replace('_PM2_Front', '_PM1_Other') : undefined;
            var button = asset.addButton({
                image: this.getAssetPath(image),
                imageBack: this.getAssetPath(imageBack),
                imageDetour: true,
                path: item.path,
                valign: 'bottom',
                page: item.page,
                onClick: item.isProduct ? 'animateFlip' : onPageClick,
            });
            var yOffset = -.6
            if (item.isProduct) {
                asset.addText({
                    position: [0, yOffset, .1],
                    fontSize: 64,
                    text: 'details',
                    fontColor: page.fontColorBold,
                    product: item.icon,
                    onClick: onToggleProduct,
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
            this.currentItems.push(asset);
        }
    }
};

PEEKS.registerPage('louisvuitton', function() {
    var useEntranceAnimation = false;
    var useBalloons = false;

	var page = new PEEKS.Page({
        fontColor: [0, 0, 0],
        fontColorBold: [191/255, 166/255, 154/255],
        fontOutlineStyle: '',
        fontName: 'Helvetica Neue',
        bgColor: [1, 1, 1],
        colorLight: [1, .85, 0],
        colorDark: [.1, .05, 0],
        category: 'white',
        //groundImage: '/peeks/gradient_radial.png',
        groundImage: '/assets/lv_ground.jpg',
        groundImageRepeat: 80,
        backgroundImage: '/peeks/gradient.png',
        backgroundImageColor: [224/255, 219/255, 213/255],
    });

    page.analytics = analytics;

    page.analytics('event', 'loadpage');

    var colorGold = page.colorLight;
    var colorDark = page.colorDark;

	var balloonsAsset = page.addAsset();
    var otherAssets = page.addAsset();

    var screen = page.addScreen({
        radius: 5,
    });

    var canvas = page.addCanvas({
        valign: 'bottom',
    });

    var foreground = page.addAsset();

    var imagePath = 'http://52.25.54.6/?url=http://us.louisvuitton.com/images/is/image/lv/1/';

    page.setAssetPath(imagePath);
    page.addSiteMapItem('LV NOW', { icon: 'PP_VP_AS/VE_FB_VISUAL9_L/louis-vuitton--909_MONUMENTA_01_VISUAL9.jpg'});
    page.addSiteMapItem('Games', { icon: 'VE_DI3_L/louis-vuitton--1053_Lv_Now_FONDATIONLOUISVUITTONETREMODERNELEMoMAAPARIS_1_DI3.jpg'});
    page.addSiteMapItem("Games/Hidden Objects", { icon: 'VE_DI3_L/louis-vuitton--1053_Lv_Now_FONDATIONLOUISVUITTONETREMODERNELEMoMAAPARIS_1_DI3.jpg', page: 'gameHiddenObjects' } );
    page.addSiteMapItem("Games/Puzzle", { icon: 'VE_DI3_L/louis-vuitton--1053_Lv_Now_FONDATIONLOUISVUITTONETREMODERNELEMoMAAPARIS_4_DI3.jpg', page: 'gameMatch3' } );
    page.addSiteMapItem('WOMEN', { icon: 'VE_VISUAL4_M/louis-vuitton--Cruise18_Look_01_VISUAL4.jpg'});
    page.addSiteMapItem('WOMEN/READY-TO-WEAR', { icon: 'PP_VP_AS/louis-vuitton--FESK91FLD001_PM2_Front%20view.jpg'});
    page.addSiteMapItem('WOMEN/READY-TO-WEAR/Skirts', { icon: 'PP_VP_AS/louis-vuitton--FESK91FLD001_PM2_Front%20view.jpg'});
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/1", { icon: 'PP_VP_AS/louis-vuitton--FESK91FLD001_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/2", { icon: 'PP_VP_AS/louis-vuitton--FESK90GBS702_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/3", { icon: 'PP_VP_AS/louis-vuitton--FESK91GFA006_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/4", { icon: 'PP_VP_AS/louis-vuitton--FESK91XHE900_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/4", { icon: 'PP_VP_AS/louis-vuitton--FDJB05DRH900_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/5", { icon: 'PP_VP_AS/louis-vuitton--FEJB01FGK650_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/6", { icon: 'PP_VP_AS/louis-vuitton--FESK13FUQ506_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/7", { icon: 'PP_VP_AS/louis-vuitton--FESK11XHE900_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/8", { icon: 'PP_VP_AS/louis-vuitton--FDSK26DRX900_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/9", { icon: 'PP_VP_AS/louis-vuitton--FDSK26DZH811_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/10", { icon: 'PP_VP_AS/louis-vuitton--FDSK34DRT651_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/11", { icon: 'PP_VP_AS/louis-vuitton--FDSK34DTL900_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem("WOMEN/READY-TO-WEAR/Skirts/12", { icon: 'PP_VP_AS/louis-vuitton--FESK91FLD001_PM2_Front%20view.jpg', isProduct: true } );
    page.addSiteMapItem('WOMEN/READY-TO-WEAR/Leathers', { icon: 'PP_VP_L/louis-vuitton-cashmere-suede-calfskin-blazer-with-studs-ready-to-wear--FELJ97GCV822_PM2_Front%20view.jpg'});
    page.addSiteMapItem('WOMEN/READY-TO-WEAR/Furs', { icon: 'PP_VP_L/louis-vuitton-black-cross-and-leopard-print-mink-gilet-ready-to-wear--FELC81DIF002_PM2_Front%20view.jpg'});
    page.addSiteMapItem('WOMEN/READY-TO-WEAR/Jackets and Coats', { icon: 'PP_VP_L/louis-vuitton-tree-motif-jacquard-blazer-ready-to-wear--FEJA59FLD001_PM2_Front%20view.jpg'});
    page.addSiteMapItem('WOMEN/READY-TO-WEAR/Dresses', { icon: 'PP_VP_L/louis-vuitton-sequin-embroidered-dress-ready-to-wear--FEDB93FYC720_PM2_Front%20view.jpg'});
    page.addSiteMapItem('WOMEN/READY-TO-WEAR/Tops', { icon: 'PP_VP_L/louis-vuitton-cotton-poplin-shirt-with-stripe-details-ready-to-wear--FEBL90FQN651_PM2_Front%20view.jpg'});
    page.addSiteMapItem('WOMEN/READY-TO-WEAR/Pants', { icon: 'PP_VP_L/louis-vuitton-wool-mohair-pants-with-side-bands-ready-to-wear--FEPA89FIT90T_PM2_Front%20view.jpg'});
    page.addSiteMapItem('WOMEN/READY-TO-WEAR/Swimwear', { icon: 'PP_VP_L/louis-vuitton-printed-bikini-top-ready-to-wear--FESW01GBK506_PM2_Front%20view.jpg'});
    page.addSiteMapItem('WOMEN/GIFT INSPIRATIONS', { icon: 'PP_VP_L/louis-vuitton-christmas-monogram-flowers-home-decor--GI0194_PM2_Front%20view.jpg'});
    page.addSiteMapItem('WOMEN/GIFT INSPIRATIONS/HOME DECOR');
    page.addSiteMapItem('WOMEN/GIFT INSPIRATIONS/TIMELESS PIECES');
    page.addSiteMapItem('WOMEN/GIFT INSPIRATIONS/FASHION FORWARD');
    page.addSiteMapItem('WOMEN/GIFT INSPIRATIONS/ULTIMATE LUXURY');
    page.addSiteMapItem('WOMEN/GIFT INSPIRATIONS/PERSONALIZATION');
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS', { icon: 'PP_VP_L/louis-vuitton-speedy-30-masters-lv-x-koons--M43353_PM2_Front%20view.jpg'});
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS/Boucher');
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS/Da Vinci');
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS/Fragonard');
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS/Gauguin');
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS/Manet');
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS/Monet');
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS/Rubens');
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS/Turner');
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS/Van Gogh');
    page.addSiteMapItem('WOMEN/MASTERS LV X KOONS/ALL MASTERS');
    page.addSiteMapItem('WOMEN/FASHION SHOWS', { icon: 'VE_VISUAL4_M/louis-vuitton--Cruise18_Look_01_VISUAL4.jpg'});
    page.addSiteMapItem('WOMEN/FASHION SHOWS/SPRING-SUMMER 2018');
    page.addSiteMapItem('WOMEN/FASHION SHOWS/CRUISE 2018 SHOW');
    page.addSiteMapItem('WOMEN/FASHION SHOWS/Fall-Winter 2017 Show');
    page.addSiteMapItem('WOMEN/FASHION SHOWS/FASHION SHOW SELECTION');
    page.addSiteMapItem('WOMEN/FASHION SHOWS/NICOLAS GHESQUIERE');
    page.addSiteMapItem('WOMEN/HANDBAGS', { icon: 'PP_VP_L/louis-vuitton-lockme-backpack-mini-lockme-handbags--M54575_PM2_Front%20view.jpg'});
    page.addSiteMapItem('WOMEN/HANDBAGS/NEW THIS SEASON');
    page.addSiteMapItem('WOMEN/HANDBAGS/ALL HANDBAGS');
    page.addSiteMapItem('WOMEN/HANDBAGS/NEVERFULL ALMA & SPEEDY');
    page.addSiteMapItem('WOMEN/HANDBAGS/ICONS');
    page.addSiteMapItem('WOMEN/HANDBAGS/TOP HANDLES');
    page.addSiteMapItem('WOMEN/HANDBAGS/SHOULDER BAGS');
    page.addSiteMapItem('WOMEN/HANDBAGS/CROSS BODY BAGS');
    page.addSiteMapItem('WOMEN/HANDBAGS/TOTES');
    page.addSiteMapItem('WOMEN/HANDBAGS/BACKPACKS');
    page.addSiteMapItem('WOMEN/HANDBAGS/HOBOS');
    page.addSiteMapItem('WOMEN/HANDBAGS/CLUTCHES & EVENING');
    page.addSiteMapItem('WOMEN/HANDBAGS/MINI BAGS');
    page.addSiteMapItem('WOMEN/HANDBAGS/FASHION SHOWS');
    page.addSiteMapItem('WOMEN/SMALL LEATHER GOODS', { icon: 'PP_VP_L/louis-vuitton-cl%C3%A9mence-wallet-epi-small-leather-goods--M60913_PM2_Front%20view.jpg'});
    page.addSiteMapItem('WOMEN/SMALL LEATHER GOODS/ALL COLLECTIONS');
    page.addSiteMapItem('WOMEN/SMALL LEATHER GOODS/WALLETS');
    page.addSiteMapItem('WOMEN/SMALL LEATHER GOODS/KEY & CARD HOLDERS');
    page.addSiteMapItem('WOMEN/SMALL LEATHER GOODS/TECHNICAL CASES');
    page.addSiteMapItem('WOMEN/TRAVEL', { icon: 'PP_VP_L/louis-vuitton-all-in-mm-monogram-travel--M47029_PM2_Front%20view.jpg'});
    page.addSiteMapItem('WOMEN/TRAVEL/ALL COLLECTIONS');
    page.addSiteMapItem('WOMEN/TRAVEL/Horizon Collection');
    page.addSiteMapItem('WOMEN/TRAVEL/ROLLING LUGGAGE');
    page.addSiteMapItem('WOMEN/TRAVEL/SOFTSIDED LUGGAGE');
    page.addSiteMapItem('WOMEN/TRAVEL/HARDSIDED LUGGAGE');
    page.addSiteMapItem('WOMEN/TRAVEL/TRAVEL ACCESSORIES');
    page.addSiteMapItem('WOMEN/ACCESSORIES', { icon: 'PP_VP_AS/louis-vuitton--FESK91FLD001_PM2_Front%20view.jpg'});
    page.addSiteMapItem('WOMEN/ACCESSORIES/SCARVES, SHAWLS & MORE');
    page.addSiteMapItem('WOMEN/ACCESSORIES/FASHION JEWELRY');
    page.addSiteMapItem('WOMEN/ACCESSORIES/LEATHER BRACELETS');
    page.addSiteMapItem('WOMEN/ACCESSORIES/BELTS');
    page.addSiteMapItem('WOMEN/ACCESSORIES/SUNGLASSES');
    page.addSiteMapItem('WOMEN/ACCESSORIES/KEY HOLDERS, BAG CHARMS & MORE');
    page.addSiteMapItem('WOMEN/ACCESSORIES/HOME DECOR');
    page.addSiteMapItem('WOMEN/SHOES', { icon: 'PP_VP_L/louis-vuitton-matchmake-pump-shoes--AEKE1JPC02_PM2_Front%20view.jpg'});
    page.addSiteMapItem('WOMEN/SHOES/ALL COLLECTIONS');
    page.addSiteMapItem('WOMEN/SHOES/BOOTS & BOOTIES');
    page.addSiteMapItem('WOMEN/SHOES/PUMPS');
    page.addSiteMapItem('WOMEN/SHOES/FLATS');
    page.addSiteMapItem('WOMEN/SHOES/SNEAKERS');
    page.addSiteMapItem('WOMEN/SHOES/SANDALS');
    page.addSiteMapItem('WOMEN/JEWELRY & TIMEPIECES', { icon: 'PP_VP_L/louis-vuitton-color-blossom-star-pendant-pink-gold-and-white-mother-of-pearl-jewelry-timepieces--Q93521_PM2_Front%20view.jpg'});
    page.addSiteMapItem('WOMEN/JEWELRY & TIMEPIECES/LOUIS VUITTON FOR UNICEF');
    page.addSiteMapItem('WOMEN/JEWELRY & TIMEPIECES/HIGH JEWELRY');
    page.addSiteMapItem('WOMEN/JEWELRY & TIMEPIECES/FINE JEWELRY');
    page.addSiteMapItem('WOMEN/JEWELRY & TIMEPIECES/TIMEPIECES');
    page.addSiteMapItem('WOMEN/FRAGRANCES', { icon: 'PP_VP_L/louis-vuitton-rose-des-vents-gift-inspirations--LP0005_PM2_Front%20view.jpg'});
    page.addSiteMapItem('WOMEN/FRAGRANCES/DISCOVER THE COLLECTION');
    page.addSiteMapItem('WOMEN/FRAGRANCES/UNIVERSE');
    page.addSiteMapItem('WOMEN/FRAGRANCES/SAVOIR-FAIRE');
    page.addSiteMapItem('WOMEN/BOOKS & WRITING', { icon: 'PP_VP_L/louis-vuitton-small-ring-agenda-cover-monogram-books-writing--R20005_PM2_Front%20view.jpg'});
    page.addSiteMapItem('WOMEN/BOOKS & WRITING/AGENDAS & COVERS');
    page.addSiteMapItem('WOMEN/BOOKS & WRITING/WRITING');
    page.addSiteMapItem('WOMEN/BOOKS & WRITING/WOMEN/BOOKS');
    page.addSiteMapItem('WOMEN/PERSONALIZATION', { icon: 'PP_VP_L/louis-vuitton--P00176_PM1_Back%20view.jpg'});
    page.addSiteMapItem('WOMEN/PERSONALIZATION/My LV World Tour');
    page.addSiteMapItem('WOMEN/PERSONALIZATION/MON MONOGRAM');
    page.addSiteMapItem('WOMEN/PERSONALIZATION/HOTSTAMPING');
    page.addSiteMapItem('WOMEN/PERSONALIZATION/My LV Tambour');
    page.addSiteMapItem('WORLD OF LOUIS VUITTON', { icon: 'VE_DI3_L/louis-vuitton--LV_Now_LVTHEBOOKGIFTS_1_DI3.jpg'});
    page.addSiteMapItem('MEN', { icon: 'VE_VISUAL4_M/louis-vuitton--Men_Precollection_SS18_LOOK01_VISUAL4.jpg'});
    page.addSiteMapItem('HOME', { icon: 'VE_DI3_L/louis-vuitton-masters--Masters_Monet_Seydoux_DI3.jpg'});
    page.addSiteMapItem("HOME/MASTERS", { icon: 'VE_DI3_L/louis-vuitton-masters--Masters_Monet_Seydoux_DI3.jpg' } );
    page.addSiteMapItem("HOME/VOLEZ VOGUEZ VOYAGEZ", { icon: 'VE_DI3_L/louis-vuitton-volez-voguez-voyagez--WOLV_HSF_VVV_New_York_Expo_DI3.jpg' } );
    page.addSiteMapItem("HOME/LEATHER ESSENTIALS", { icon: 'VE_DI1_L/louis-vuitton-leather-essentials--HP_US_Pushes5_M51202_DI1.jpg' } );
    page.addSiteMapItem("HOME/THE ART OF GIFTING", { icon: 'VE_DI1_L/louis-vuitton-the-art-of-gifting--Lv_Now_THEARTOFGIFTING_DI1.jpg' } );
    page.addSiteMapItem("HOME/MEN'S BAGS", { icon: 'VE_DI1_L/louis-vuitton-men%E2%80%99s-bags--HP_US_Pushes7_M34408_DI1.jpg' } );

    page.onUpdateSiteMapPath = function() {
        screen.onLayout();
    };

    var menuPopup;

    var onHome = function(path) {
        page.setSiteMapMenuPath('');
        page.setSiteMapPath('HOME');
        screen.onLayout();
    };

    onHome();

    canvas.addView({
        position: [0, -.45],
        size: [1, .12, 1],
        viewBgColor: [0, 0, 0],
    });

    canvas.addButton({
        image: '/peeks/icon_menu.png',
        position: [-.45, -.45],
        size: .07,
        color: page.fontColorBold,
        onClick: 'onShowSiteMapMenu',
    });

    canvas.addButton({
        image: '/peeks/icon_vr.png',
        position: [.45, -.45],
        size: .08,
        color: page.fontColorBold,
        onClick: function() { peeks.toggleVrMode(); },
    });

    canvas.addText({
        position: [0, -.45],
        fontSize: 28,
        text: 'search',
        fontColor: [1, 1, 1],
        size: .08,
        onClick: 'searchPage',
    })

    var balloons = [];

    var createBalloon = function(name, x, z) {
        var rotation = [0, 0, 0];
        if (name === '1') {
            rotation = [90, 0, 0];
        } else if (name === '2') {
            rotation = [-90, 0, 0];
        } else if (name === '3') {
            rotation = [90, 90, 0];
        } else if (name === '4') {
            rotation = [90, 0, 0];
        }
        return balloonsAsset.addMesh({
            geometry: '/assets/balloon_' + name + '.obj',
            position: [x, 0, z],
            size: .02,
            color: PEEKS.color.hsl(Math.random(), 1, .6),
            rotation: rotation,
            material: {
                normalMap: '/assets/balloon.jpg',
                shininess: 50,
                reflectivity: 3,
            }
        });
    }

    var createBalloons = function() {
        if (!useBalloons) {
            return;
        }

        balloons.push(createBalloon('1', -3, -6));
        balloons.push(createBalloon('2', -2.5, -7));
        balloons.push(createBalloon('3', -2, -6));
        balloons.push(createBalloon('4', -1.5, -7));
        balloons.push(createBalloon('1', -1, -6));
        balloons.push(createBalloon('2', -0.5, -7));
        balloons.push(createBalloon('3', 0, -6));
        balloons.push(createBalloon('4', .5, -7));
        balloons.push(createBalloon('1', 1, -6));
        balloons.push(createBalloon('2', 1.5, -7));
        balloons.push(createBalloon('3', 2, -6));
        balloons.push(createBalloon('4', 2.5, -7));
        balloons.push(createBalloon('1', 3, -6));
    }

    var playBalloons = false;

    var rewindAnimation = function() {
        // Just play once
        this.destroy();
        return;

        if (playBalloons) {
            if (this.rewindCount === undefined) {
                this.rewindCount = 0;
            }
            this.rewindCount++;

            if (this.rewindCount < 1) {
                this.clearAnimations();
                releaseBalloon(this);
            }
        } else {
            this.destroy();
        }
    }

    var releaseBalloon = function(balloon) {
        if (!useBalloons) {
            return;
        }

        balloon.animate({
            duration: 4 + Math.random() * 10,
            begin: [0, 0, 0],
            end: [0, 180, 0],
            attribute: 'rotation',
        });
        balloon.animate({
            duration: 6 + Math.random() * 4,
            delay: Math.random() * 6,
            begin: [0, 10, 0],
            end: [0, -6, 0],
            attribute: 'position',
            onEnd: rewindAnimation,
        });
    }

    var releaseBalloons = function() {
        playBalloons = true;
        for (var balloonI = 0; balloonI < balloons.length; balloonI++) {
            releaseBalloon(balloons[balloonI]);
        }
        balloons = [];
    }

    createBalloons();

    var shoppingBag = otherAssets.addMesh({
        geometry: '/assets/lv_shopping_bag.obj',
        texture: '/assets/lv_shopping_bag.jpg',
        position: [2, -2, -5],
        size: 2,
        rotation: [0, -50, 0],
    });

    var entranceOpen = function () {
        this.onClick = 'animateFlip';
        doorLeft.animate({
            duration: 10,
            delay: 0,
            begin: [0, 0, 0],
            end: [-10, 0, 0],
            attribute: 'position'
        });
        doorRight.animate({
            duration: 10,
            delay: 0,
            begin: [0, 0, 0],
            end: [10, 0, 0],
            attribute: 'position'
        });
        releaseBalloons();
        var positionSrc = this.position;
        var positionTarget = shoppingBag.position;
        var rotationSrc = this.rotation;
        var rotationTarget = shoppingBag.rotation;
        this.animate({
            duration: 2,
            delay: 2,
            begin: [0, 0, 0],
            end: [
                0 - positionSrc[0],
                //positionTarget[1] - positionSrc[1],
                3 - positionSrc[1],
                -4 - positionSrc[2]
            ],
            attribute: 'position',
        });
        this.animate({
            duration: 2.5,
            delay: 1,
            begin: [0, 0, 0],
            end: [30, 360, 0],
            attribute: 'rotation',
        });
    }
    var entrance = foreground.addAsset({
        size: 1,
        position: [0, 0, -3],
    });
    var doorLeft = entrance.addAsset({
        position: [-2, 0, 0],
    });
    var doorLeftPane = doorLeft.addView({
        position: [1, 0, 0],
        viewBgColor: colorDark,
        size: [2, 4, 2],
    });
    doorLeftPane.addView({
        position: [0, .01, .01],
        viewBgColor: colorGold,
        size: [1, .002, 1],
    });
    doorLeftPane.addView({
        position: [0, -.01, .01],
        viewBgColor: colorGold,
        size: [1, .002, 1],
    });
    var lvLogo = otherAssets.addMesh({
        geometry: '/assets/lv_logo.obj',
        position: [0, -.3, -2],
        size: .015,
        color: colorGold,
        material: {
            shininess: 50,
            reflectivity: 2,
        },
        rotation: [0, 0, 0],
        onClick: entranceOpen,
        onFocusStart: function () {},
        onFocusEnd: function () {},
    });
    lvLogo.addMesh({
        geometry: '/assets/lv_logo_bg.obj',
        color: colorDark,
        material: {
            shininess: 50,
            reflectivity: 2,
        },
    });
    lvLogo.addMesh({
        geometry: '/assets/lv_logo_ring.obj',
        color: colorGold,
    });

    var doorRight = entrance.addAsset({
        position: [2, 0, 0],
    });
    var doorRightPane = doorRight.addView({
        position: [-1, 0, 0],
        viewBgColor: colorDark,
        size: [2, 4, 2],
    });
    doorRightPane.addView({
        position: [0, .01, .01],
        viewBgColor: colorGold,
        size: [1, .002, 1],
    });
    doorRightPane.addView({
        position: [0, -.01, .01],
        viewBgColor: colorGold,
        size: [1, .002, 1],
    });

    if (!useEntranceAnimation) {
        lvLogo.onClick();
    }

	return page;
});
