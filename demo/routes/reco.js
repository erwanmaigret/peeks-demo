var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var data = { pages: [] };

    data.pages.push({ name: 'Zappos', url: 'https://www.zappos.com' });
    data.pages.push({ name: 'Galeries Lafayette', url: 'https://www.galerieslafayette.com/' });
    //data.pages.push({ name: 'Lowes', url: 'https://www.lowes.com/' });
    //data.pages.push({ name: 'Groupon', url: 'https://www.groupon.fr' });
    data.pages.push({ name: 'Hollisterco', url: 'https://www.hollisterco.com/' });

    // To dig:
    //data.pages.push({ name: 'QoQaCh', url: 'https://www.qoqa.ch/' });
    //data.pages.push({ name: 'Superdry', url: 'https://www.superdry.com/' });
    //data.pages.push({ name: 'Abercrombie', url: 'https://www.abercrombie.com/' });
    //data.pages.push({ name: 'Fortinet', url: 'http://www.fortinet.com/' });
    //data.pages.push({ name: 'OldNavy', url: 'http://www.oldnavy.com' });
    //data.pages.push({ name: 'Zara', url: 'https://www.zara.com/' });
    //data.pages.push({ name: 'Banana Replublic', url: 'http://www.bananarepublic.com' });
    //data.pages.push({ name: 'Boost', url: 'http://www.boots.com/' });
    //data.pages.push({ name: 'Vente Privee', url: 'http://vente-privee.com' });

    // To explore:
    //data.pages.push({ name: 'H&M', url: 'http://www.hm.com/' });
    //data.pages.push({ name: 'Olympique Marseille', url: 'https://www.om.net/' });

    // css parsing issue:
    //data.pages.push({ name: 'Frys', url: 'https://www.frys.com/' });
    //data.pages.push({ name: 'Victoria Secret', url: 'https://www.victoriassecret.com/' });

    // CORS issues:
    //data.pages.push({ name: 'Boohoo', url: 'http://www.boohoo.com/' });
    //data.pages.push({ name: 'Charlotte Russe', url: 'http://www.charlotterusse.com/' });
    //data.pages.push({ name: 'Etsy', url: 'https://www.etsy.com/' });
    //data.pages.push({ name: 'UNIQLO', url: 'https://www.uniqlo.com/' });
    //data.pages.push({name: 'HBO', url: 'https://www.hbo.com/' });
    //data.pages.push({ name: 'Awesome Stuff', url: 'https://awesomestufftobuy.com/' });
    //data.pages.push({ name: 'GAP', url: 'http://www.gap.com/' });
    //data.pages.push({ name: 'RVCA', url: 'https://www.rvca.com/' });
    //data.pages.push({ name: 'Walgreens', url: 'https://www.walgreens.com' });

    // Restricted
    //data.pages.push({ name: 'TamTam', url: 'www.princessetamtam.com' });
    //data.pages.push({ name: 'Bloomingdales', url: 'www.bloomingdales.com' });
    //data.pages.push({ name: 'Amazon', url: 'https://www.amazon.com/' });
    //data.pages.push({ name: 'Barbara', url: 'http://www.barbara.fr/' });

    data.pages.push({ name: '2D Assets' });
    data.pages.push({ name: '3D Assets' });
    data.pages.push({ name: 'Terra Worlds' });

    res.send(JSON.stringify(data));
});

module.exports = router;
