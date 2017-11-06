PEEKS.registerPage('SporTrade', function() {
	var page = new PEEKS.Asset({
        //fontColor: [0, 0, 0],
        //fontColorBold: [197/255, 1/255, 0],
        //bgColor: [1, 1, 1],
        category: 'soccer',
    });

    var screen = page.addScreen({
        radius: 5,
    });

    var getBetProperty = function(bet, property) {
        switch (property) {
            case 'total':
                return bet.total || 1;
            case 'ranking':
                return bet.ranking || 1;
            default:
                return 0;
        }
    };

/*
https://medias.lequipe.fr/logo-football/374/300?20171103151418
*/
    var bets = [
        { name: 'PSG', logo: '26', total: 2 },
        { name: 'OM', logo: '6' },
        { name: 'OL', logo: '22' },
        { name: 'As Monaco', logo: '25' },
        { name: 'FCG Bordeaux', logo: '18' },
        { name: 'FC Nantes', logo: '15' },
        { name: 'EA Guingamp', logo: '37' },
        { name: 'SCO Angers', logo: '374' },
        { name: 'Toulouse FC', logo: '12' },
        { name: 'Amiens SC', logo: '44' },
        { name: 'RC Strasbourg', logo: '13' },
        { name: 'Lille OSC', logo: '43' },
        { name: 'AS Saint-Etienne', logo: '38' },
        { name: 'Dijon FCO', logo: '202' },
        { name: 'FC Metz', logo: '20' },
        { name: 'SM Caen', logo: '41' },
        { name: 'Montpellier HSC', logo: '17' },
        { name: 'ESTAC', logo: '30' },
        { name: 'OGC Nice', logo: '46' },
        { name: 'Stade Rennais FC', logo: '14' },
    ];

    var itemCount = bets.length;
    var items = bets;
    for (var itemI = 0; itemI < itemCount; itemI++) {
        var item = items[itemI];
        var asset = screen.addAsset({
            position: [itemI * 2 / itemCount, -.1, 0],
            size: 1,
        });
        /*
        var button = asset.addButton({
            image: item.image ? imagePath + item.image : undefined,
            path: item.name,
            onClick: onClick,
        })
        */

        asset.addView({
            position: [0, 0, -.3],
            size: [.8, 1, 1],
            alpha: .3,
            viewBgColor: [0, 0, 0],
        });

        if (item.logo) {
            asset.addButton({
                image: 'http://52.25.54.6/?url=https://medias.lequipe.fr/logo-football/' + item.logo + '/300',
                size:.5,
                position: [0, .5, -.1],
            });
        }
        asset.addText({
            position: [0, 0, 0],
            fontSize: 80,
            text: item.name,
        });
        asset.addText({
            position: [0, -.1, .01],
            fontSize: 40,
            text: 'classement: ' + getBetProperty(item, 'ranking'),
        });
        asset.addText({
            position: [0, -.2, .02],
            fontSize: 40,
            text: 'total: ' + getBetProperty(item, 'total'),
        });
    }

	page.addPage('peeks_toolbar');

	return page;
});
