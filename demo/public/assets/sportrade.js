PEEKS.registerPage('sportrade', function() {
	var page = new PEEKS.Asset({
        category: 'soccer',
        gyroscope: 'off',
    });

    page.setAssetPath('http://52.25.54.6/?url=https://medias.lequipe.fr/logo-football/');

    page.addSiteMapItem('WC 2018', { icon: 'https://upload.wikimedia.org/wikipedia/fr/thumb/f/f7/FIFA_World_Cup_2018_Logo.png/200px-FIFA_World_Cup_2018_Logo.png', description: 'Mars 2018'} );
    page.addSiteMapItem("Ligue1 2019", { icon: '/assets/sportrade_icon_france_ligue1.png', description: 'Juin 2018'} );
    page.addSiteMapItem("Ligue1 2019/PSG", { icon: '26/300'} );
    page.addSiteMapItem("Ligue1 2019/OM", { icon: '6/300'} );
    page.addSiteMapItem("Ligue1 2019/OL", { icon: '22/300' } );
    page.addSiteMapItem("Ligue1 2019/As Monaco", { icon: '25/300' } );
    page.addSiteMapItem("Ligue1 2019/FCG Bordeaux", { icon: '18/300' } );
    page.addSiteMapItem("Ligue1 2019/FC Nantes", { icon: '15/300' } );
    page.addSiteMapItem("Ligue1 2019/EA Guingamp", { icon: '37/300' } );
    page.addSiteMapItem("Ligue1 2019/SCO Angers", { icon: '374/300' } );
    page.addSiteMapItem("Ligue1 2019/Toulouse FC", { icon: '12/300' } );
    page.addSiteMapItem("Ligue1 2019/Amiens SC", { icon: '44/300' } );
    page.addSiteMapItem("Ligue1 2019/RC Strasbourg", { icon: '13/300' } );
    page.addSiteMapItem("Ligue1 2019/Lille OSC", { icon: '43/300' } );
    page.addSiteMapItem("Ligue1 2019/AS Saint-Etienne", { icon: '38/300' } );
    page.addSiteMapItem("Ligue1 2019/Dijon FCO", { icon: '202/300' } );
    page.addSiteMapItem("Ligue1 2019/FC Metz", { icon: '20/300' } );
    page.addSiteMapItem("Ligue1 2019/SM Caen", { icon: '41/300' } );
    page.addSiteMapItem("Ligue1 2019/Montpellier HSC", { icon: '17/300' } );
    page.addSiteMapItem("Ligue1 2019/ESTAC", { icon: '30/300' } );
    page.addSiteMapItem("Ligue1 2019/OGC Nice", { icon: '46/300' } );
    page.addSiteMapItem("Ligue1 2019/Stade Rennais FC", { icon: '14/300' } );
    page.addSiteMapItem("Ligue1 2020", { icon: '/assets/sportrade_icon_france_ligue1.png', description: 'Juin 2019'} );

    page.setSiteMapMenuPath('');

    page.onUpdateSiteMapPath = function() {
        refresh();
    };

    var onClick = function() {
        if (page.querySiteMapItemAssets(this.path).length > 0) {
            page.setSiteMapMenuPath(this.path);
            refresh();
        }
    };

    var screen = undefined;

    var refresh = function() {
        if (screen) {
            screen.destroy();
        }
        screen = page.addScreen({
            radius: 4,
        });

        var items = page.querySiteMapMenuAssets();
        if (items) {
            var itemCount = items.length;
            for (var itemI = 0; itemI < itemCount; itemI++) {
                var item = items[itemI];
                var xIndex = itemI;
                var yOffset = 0;
                while (xIndex >= 20) {
                    yOffset += .2;
                    xIndex -= 9;
                }
                var xOffset = (xIndex % 2 === 0) ? (-xIndex / 20) : (xIndex + 1) / 20;
                var asset = screen.addAsset({
                    position: [xOffset, yOffset, 0],
                    size: .4,
                });
                asset.addView({
                    position: [0, -1, -.3],
                    size: [1.4, 2, 1],
                    alpha: .3,
                    viewBgColor: [0, 0, 0],
                });

                var button = asset.addButton({
                    image: item.image ? page.getAssetPath(item.image) : undefined,
                    path: item.path,
                    onClick: onClick,
                });
                var yOffset = -1;
                if (item.name) {
                    asset.addText({
                        position: [0, yOffset, .05],
                        fontSize: 64,
                        text: item.name,
                    });
                    yOffset -= .4;
                }
                if (item.description) {
                    asset.addText({
                        position: [0, yOffset, .1],
                        fontSize: 40,
                        text: item.description,
                    });
                    yOffset -= .4;
                }
            }
        }
    }

    refresh();

	return page;
});
