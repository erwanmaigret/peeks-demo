PEEKS.registerPage('Target', function() {
	var page = new PEEKS.Asset({
        fontColor: [0, 0, 0],
        fontColorBold: [197/255, 1/255, 0],
        fontOutlineStyle: '',
        fontName: 'Helvetica Neue',
        bgColor: [1, 1, 1],
        category: 'white',
        //groundImage: 'ui/icon_dot.png',
        //groundImageRepeat: 50,
        //groundImageColor: [225/255, 255/255, 252/255],
        //groundImageColor: [141/255, 201/255, 195/255],
        groundImage: 'ui/gradient_radial.png',
        groundImageRepeat: 1,
        backgroundImage: 'ui/gradient.png',
        // title: 'Target'
    });

	var panel = page.addAsset();

    var screen = page.addScreen({
        radius: 5,
    });

    page.setAssetPath('https://target.scene7.com/is/image/Target/');

    page.addSiteMapItem('clothing', { icon: '53451-160411_1460383116963'} );
    page.addSiteMapItem("clothing/women's clothing", { icon: '52690603'} );
    page.addSiteMapItem("clothing/women's clothing/dresses", { icon: '52922424'} );
    page.addSiteMapItem("clothing/women's clothing/dresses/maxi", { icon: '52833477'} );
    page.addSiteMapItem("clothing/women's clothing/dresses/maxi/1", { icon: '52840296', isProduct: true } );
    page.addSiteMapItem("clothing/women's clothing/dresses/maxi/2", { icon: '52760285', isProduct: true} );
    page.addSiteMapItem("clothing/women's clothing/dresses/maxi/3", { icon: '52833477', isProduct: true} );
    page.addSiteMapItem("clothing/women's clothing/dresses/maxi/4", { icon: '52654414', isProduct: true} );
    page.addSiteMapItem("clothing/women's clothing/dresses/maxi/5", { icon: '52722444', isProduct: true} );
    page.addSiteMapItem("clothing/women's clothing/dresses/maxi/6", { icon: '52132992', isProduct: true} );
    page.addSiteMapItem("clothing/women's clothing/dresses/maxi/7", { icon: '52760285', isProduct: true} );
    page.addSiteMapItem("clothing/women's clothing/dresses/maxi/8", { icon: '52589309', isProduct: true} );
    page.addSiteMapItem("clothing/women's clothing/dresses/maxi/9", { icon: '52090041', isProduct: true} );
    page.addSiteMapItem("clothing/women's clothing/dresses/maxi/10", { icon: '52840296', isProduct: true} );
    page.addSiteMapItem("clothing/women's clothing/dresses/maxi/11", { icon: '52237779', isProduct: true} );
    page.addSiteMapItem("clothing/women's clothing/dresses/maxi/12", { icon: '52363084', isProduct: true} );
    page.addSiteMapItem("clothing/women's clothing/dresses/maxi/13", { icon: '52722288', isProduct: true} );
    page.addSiteMapItem("clothing/women's clothing/dresses/maxi/14", { icon: '52380730', isProduct: true} );
    page.addSiteMapItem("clothing/women's clothing/dresses/maxi/15", { icon: '52090019', isProduct: true} );
    page.addSiteMapItem("clothing/women's clothing/dresses/maxi/16", { icon: '52535884', isProduct: true} );
    page.addSiteMapItem("clothing/women's clothing/dresses/fit & flare", { icon: '52841027'} );
    page.addSiteMapItem("clothing/women's clothing/dresses/shirt", { icon: '52568060'} );
    page.addSiteMapItem("clothing/women's clothing/dresses/t-shirt", { icon: '52939367'} );
    page.addSiteMapItem("clothing/women's clothing/dresses/shift", { icon: '52514130'} );
    page.addSiteMapItem("clothing/women's clothing/dresses/jumpsuits & rompers", { icon: '52722404'} );
    page.addSiteMapItem("clothing/women's clothing/dresses/floral", { icon: '51962176'} );
    page.addSiteMapItem("clothing/women's clothing/dresses/ruffle detail", { icon: '52050580'} );
    page.addSiteMapItem("clothing/women's clothing/dresses/midi", { icon: '51980268'} );
    page.addSiteMapItem("clothing/women's clothing/juniors", { icon: '52760000'} );
    page.addSiteMapItem("clothing/women's clothing/maternity", { icon: '52648512'} );
    page.addSiteMapItem("clothing/women's clothing/plus size clothing", { icon: '52845920'} );
    page.addSiteMapItem("clothing/women's clothing/new arrivals", { icon: '52509758'} );
    page.addSiteMapItem("clothing/women's clothing/activewear", { icon: '52044488'} );
    page.addSiteMapItem("clothing/women's clothing/athleisure", { icon: '51014419'} );
    page.addSiteMapItem("clothing/women's clothing/coats & jackets", { icon: '52922427'} );
    page.addSiteMapItem("clothing/women's clothing/jumpsuits & rompers", { icon: '52722404'} );
    page.addSiteMapItem("clothing/women's clothing/leggings", { icon: '51002014'} );
    page.addSiteMapItem("clothing/women's clothing/pajamas & robes", { icon: '52809347'} );
    page.addSiteMapItem("clothing/women's clothing/pants", { icon: '52922490'} );
    page.addSiteMapItem("clothing/men's clothing", { icon: '52507016'} );
    page.addSiteMapItem("clothing/girl's clothing", { icon: '52595777'} );
    page.addSiteMapItem("clothing/boys's clothing", { icon: '52373399'} );
    page.addSiteMapItem("clothing/toddler clothing", { icon: '52706606'} );
    page.addSiteMapItem("clothing/baby clothing", { icon: '52376100'} );
    page.addSiteMapItem("clothing/school uniforms", { icon: '52383471'} );
    page.addSiteMapItem("clothing/adaptive clothing", { icon: '52724490'} );
    page.addSiteMapItem("clothing/family outfits", { icon: '52804140'} );
    page.addSiteMapItem("shoes", { icon: '53451-160411_1460383139759'} );
    page.addSiteMapItem("accessories", { icon: '53451-160411_1460383161792'} );
    page.addSiteMapItem("home", { icon: '61480-160630_1467310167162'} );
    page.addSiteMapItem("furniture", { icon: '53476-160411_1460402362708'} );
    page.addSiteMapItem("patio & garden", { icon: '53476-160411_1460402380575'} );
    page.addSiteMapItem("luggage", { icon: '57687-160505_1462459899971'} );
    page.addSiteMapItem("all baby", { icon: '53452-160411_1460402021722'} );
    page.addSiteMapItem("baby clothing", { icon: '53452-160411_1460402035275'} );
    page.addSiteMapItem("baby shoes", { icon: '53452-160411_1460402051043'} );
    page.addSiteMapItem("girls' clothing", { icon: '53452-160411_1460402129559'} );
    page.addSiteMapItem("girls' shoes", { icon: '53452-160411_1460402148576'} );
    page.addSiteMapItem("boys' clothing", { icon: '53452-160411_1460402089694'} );
    page.addSiteMapItem("boys' shoes", { icon: '53452-160411_1460402111660'} );
    page.addSiteMapItem('Promotions');
    page.addSiteMapItem("Promotions/Our Black Friday deals", { description: "Get a sneak peek now", icon: '2017_NovWk2_HP_StoryBlocks_v1_21103877-171101_1509556671597'} );
    page.addSiteMapItem("Promotions/20% off trees, wreaths & lights", { description: "Get your Christmas decor now", icon: '2017_NovWk2_HP_StoryBlocks_v1_03103877-171026_1509030239564'} );
    page.addSiteMapItem("Promotions/20% off shoes", { description: "Save on styles & sizes for the family", icon: '2017_NovWk2_HP_StoryBlocks_v1_05103877-171025_1508964273152'} );
    page.addSiteMapItem("Promotions/Xbox One X is here", { description: "The world’s most powerful console yet", icon: '2017_NovWk2_HP_StoryBlocks_v1_08103877-171024_1508869525494'} );
    page.addSiteMapItem("Promotions/Gather & gobble", { description: "Find all you need for your Thanksgiving feast", icon: 'C-000437-01-046_THR_CROP_2544_MetalGarland103876-171030_1509398096992'} );
    page.addSiteMapItem("Promotions/Friendsgiving edition", { icon: 'TF_friendsgiving_HP103876-171027_1509126668125'} );
    page.addSiteMapItem("Promotions/PJs for the whole crew", { icon: '2017_NovWk2_HP_StoryBlocks_v1_03103876-171019_1508446147822'} );
    page.addSiteMapItem("Featured");
    page.addSiteMapItem("Featured/Thanksgiving", { icon: 'thanksgiving97188-171025_1508960298143'} );
    page.addSiteMapItem("Featured/Christmas", { icon: 'christmas97188-171025_1508962692123'} );
    page.addSiteMapItem("Featured/Kids' gifting", { icon: 'KidsGifts-icon98553-171005_1507224706616'} );
    page.addSiteMapItem("Featured/Gift Ideas", { icon: '10-22_KidsGifting-CatBrowse-14105040-171024_1508883169598'} );
    page.addSiteMapItem("Featured/Target Finds", { icon: 'finds105040-171025_1508959860693'} );
    page.addSiteMapItem("Featured/Clothing", { icon: 'clothing97188-171019_1508445409180'} );
    page.addSiteMapItem("Featured/Shoes", { icon: 'shoes97188-171025_1508966363467'} );
    page.addSiteMapItem("Featured/Accessories", { icon: 'accessories97188-171027_1509114673981'} );
    page.addSiteMapItem("Featured/Baby", { icon: 'baby97188-171025_1508965179518'} );
    page.addSiteMapItem("Featured/Home", { icon: 'home97188-171019_1508445579038'} );
    page.addSiteMapItem("Featured/Furniture", { icon: 'furniture97188-171025_1508965473814'} );
    page.addSiteMapItem("Featured/Kitchen", { icon: 'kitchen97188-171019_1508445075384'} );
    page.addSiteMapItem("Featured/Electronics", { icon: 'electronics97188-171025_1508966407077'} );
    page.addSiteMapItem("Featured/Toys", { icon: 'toys97188-171025_1508966907610'} );
    page.addSiteMapItem("Featured/Entertainment", { icon: 'entertainment97188-171019_1508447521853'} );
    page.addSiteMapItem("Featured/Beauty", { icon: 'beauty97188-171025_1508965241734'} );
    page.addSiteMapItem("Featured/Deals", { icon: 'deals97188-171020_1508510709891'} );
    page.addSiteMapItem("Featured/Clearance", { icon: 'clearance97188-171020_1508525411214'} );

    var imagePath = 'https://target.scene7.com/is/image/Target/';
    var siteMapOld = [
        {
            name: 'clothing',
            image: '53451-160411_1460383116963',
            items: [
                {   name: "women's clothing", image: '52690603',
                    items: [
                        {   name: "dresses", image: '52922424',
                            items: [
                                {   name: "maxi", image: '52833477',
                                    highlightItems: [
                                        { name: " ", product: '52840296' },
                                        { name: " ", product: '52760285' },
                                        { name: " ", product: '52833477' },
                                        { name: " ", product: '52654414' },
                                        { name: " ", product: '52722444' },
                                        { name: " ", product: '52132992' },
                                        { name: " ", product: '52760285' },
                                        { name: " ", product: '52589309' },
                                        { name: " ", product: '52090041' },
                                        { name: " ", product: '52840296' },
                                        { name: " ", product: '52237779' },
                                        { name: " ", product: '52363084' },
                                        { name: " ", product: '52722288' },
                                        { name: " ", product: '52380730' },
                                        { name: " ", product: '52090019' },
                                        { name: " ", product: '52535884' },
                                    ]
                                },
                                { name: "fit & flare", image: '52841027',
                                    highlightItems: [
                                        { name: " ", product: '52760288' },
                                        { name: " ", product: '52687571' },
                                        { name: " ", product: '52688047' },
                                        { name: " ", product: '52765475' },
                                        { name: " ", product: '52840416' },
                                        { name: " ", product: '52841028' },
                                        { name: " ", product: '52841027' },
                                        { name: " ", product: '52966315' },
                                        { name: " ", product: '52840417' },
                                        { name: " ", product: '52782497' },
                                        { name: " ", product: '52840652' },
                                        { name: " ", product: '52840538' },
                                        { name: " ", product: '52767349' },
                                        { name: " ", product: '52840418' },
                                    ]
                                },
                                { name: "shirt", image: '52568060',
                                    highlightItems: [
                                        { name: " ", product: '52833477' },
                                        { name: " ", product: '52654414' },
                                        { name: " ", product: '52722444' },
                                        { name: " ", product: '52132992' },
                                        { name: " ", product: '52760285' },
                                        { name: " ", product: '52589309' },
                                        { name: " ", product: '52090041' },
                                        { name: " ", product: '52840296' },
                                        { name: " ", product: '52237779' },
                                        { name: " ", product: '52363084' },
                                        { name: " ", product: '52722288' },
                                        { name: " ", product: '52380730' },
                                        { name: " ", product: '52090019' },
                                        { name: " ", product: '52535884' },
                                    ]
                                },
                                { name: "t-shirt", image: '52939367',
                                    highlightItems: [
                                        { name: " ", product: '52833477' },
                                        { name: " ", product: '52654414' },
                                        { name: " ", product: '52722444' },
                                        { name: " ", product: '52132992' },
                                        { name: " ", product: '52760285' },
                                        { name: " ", product: '52589309' },
                                        { name: " ", product: '52090041' },
                                        { name: " ", product: '52840296' },
                                        { name: " ", product: '52237779' },
                                        { name: " ", product: '52363084' },
                                        { name: " ", product: '52722288' },
                                        { name: " ", product: '52380730' },
                                        { name: " ", product: '52090019' },
                                        { name: " ", product: '52535884' },
                                    ]
                                },
                                { name: "shift", image: '52514130',
                                    highlightItems: [
                                        { name: " ", product: '52833477' },
                                        { name: " ", product: '52654414' },
                                        { name: " ", product: '52722444' },
                                        { name: " ", product: '52132992' },
                                        { name: " ", product: '52760285' },
                                        { name: " ", product: '52589309' },
                                        { name: " ", product: '52090041' },
                                        { name: " ", product: '52840296' },
                                        { name: " ", product: '52237779' },
                                        { name: " ", product: '52363084' },
                                        { name: " ", product: '52722288' },
                                        { name: " ", product: '52380730' },
                                        { name: " ", product: '52090019' },
                                        { name: " ", product: '52535884' },
                                    ]
                                },
                                { name: "jumpsuits & rompers", image: '52722404',
                                    highlightItems: [
                                        { name: " ", product: '52833477' },
                                        { name: " ", product: '52654414' },
                                        { name: " ", product: '52722444' },
                                        { name: " ", product: '52132992' },
                                        { name: " ", product: '52760285' },
                                        { name: " ", product: '52589309' },
                                        { name: " ", product: '52090041' },
                                        { name: " ", product: '52840296' },
                                        { name: " ", product: '52237779' },
                                        { name: " ", product: '52363084' },
                                        { name: " ", product: '52722288' },
                                        { name: " ", product: '52380730' },
                                        { name: " ", product: '52090019' },
                                        { name: " ", product: '52535884' },
                                    ]
                                },
                                { name: "floral", image: '51962176',
                                    highlightItems: [
                                        { name: " ", product: '52833477' },
                                        { name: " ", product: '52654414' },
                                        { name: " ", product: '52722444' },
                                        { name: " ", product: '52132992' },
                                        { name: " ", product: '52760285' },
                                        { name: " ", product: '52589309' },
                                        { name: " ", product: '52090041' },
                                        { name: " ", product: '52840296' },
                                        { name: " ", product: '52237779' },
                                        { name: " ", product: '52363084' },
                                        { name: " ", product: '52722288' },
                                        { name: " ", product: '52380730' },
                                        { name: " ", product: '52090019' },
                                        { name: " ", product: '52535884' },
                                    ]
                                },
                                { name: "ruffle detail", image: '52050580',
                                    highlightItems: [
                                        { name: " ", product: '52833477' },
                                        { name: " ", product: '52654414' },
                                        { name: " ", product: '52722444' },
                                        { name: " ", product: '52132992' },
                                        { name: " ", product: '52760285' },
                                        { name: " ", product: '52589309' },
                                        { name: " ", product: '52090041' },
                                        { name: " ", product: '52840296' },
                                        { name: " ", product: '52237779' },
                                        { name: " ", product: '52363084' },
                                        { name: " ", product: '52722288' },
                                        { name: " ", product: '52380730' },
                                        { name: " ", product: '52090019' },
                                        { name: " ", product: '52535884' },
                                    ]
                                },
                                { name: "midi", image: '51980268',
                                    highlightItems: [
                                        { name: " ", product: '52833477' },
                                        { name: " ", product: '52654414' },
                                        { name: " ", product: '52722444' },
                                        { name: " ", product: '52132992' },
                                        { name: " ", product: '52760285' },
                                        { name: " ", product: '52589309' },
                                        { name: " ", product: '52090041' },
                                        { name: " ", product: '52840296' },
                                        { name: " ", product: '52237779' },
                                        { name: " ", product: '52363084' },
                                        { name: " ", product: '52722288' },
                                        { name: " ", product: '52380730' },
                                        { name: " ", product: '52090019' },
                                        { name: " ", product: '52535884' },
                                    ]
                                },
                            ]
                        },
                        { name: "juniors", image: '52760000', },
                        { name: "maternity", image: '52648512', },
                        { name: "plus size clothing", image: '52845920', },
                        { name: "new arrivals", image: '52509758', },
                        { name: "activewear", image: '52044488', },
                        { name: "athleisure", image: '51014419', },
                        { name: "coats & jackets", image: '52922427', },
                        // Images with CORS issues on load, why is it so?
                        // { name: "intimates", image: '51909861', },
                        // { name: "jeans", image: '51909861', },
                        { name: "jumpsuits & rompers", image: '52722404', },
                        { name: "leggings", image: '51002014', },
                        { name: "pajamas & robes", image: '52809347', },
                        { name: "pants", image: '52922490', },
                    ]
                },
                { name: "men's clothing", image: '52507016', },
                { name: "girl's clothing", image: '52595777', },
                { name: "boys's clothing", image: '52373399', },
                { name: "toddler clothing", image: '52706606', },
                { name: "baby clothing", image: '52376100', },
                { name: "school uniforms", image: '52383471', },
                { name: "adaptive clothing", image: '52724490', },
                { name: "family outfits", image: '52804140', },
            ]
        },
        { name: 'shoes', image: '53451-160411_1460383139759', },
        { name: 'accessories', image: '53451-160411_1460383161792', },
        { name: 'home', image: '61480-160630_1467310167162', },
        { name: 'furniture', image: '53476-160411_1460402362708', },
        { name: 'patio & garden', image: '53476-160411_1460402380575', },
        { name: 'luggage', image: '57687-160505_1462459899971', },
        { name: 'all baby', image: '53452-160411_1460402021722', },
        { name: 'baby clothing', image: '53452-160411_1460402035275', },
        { name: 'baby shoes', image: '53452-160411_1460402051043', },
        { name: "girls' clothing", image: '53452-160411_1460402129559', },
        { name: "girls' shoes", image: '53452-160411_1460402148576', },
        { name: "boys' clothing", image: '53452-160411_1460402089694', },
        { name: "boys' shoes", image: '53452-160411_1460402111660', },
        { name: "Featured",
            items: [
                { name: "Thanksgiving", image: 'thanksgiving97188-171025_1508960298143', },
                { name: "Christmas", image: 'christmas97188-171025_1508962692123', },
                { name: "Kids' gifting", image: 'KidsGifts-icon98553-171005_1507224706616', },
                { name: "Gift Ideas", image: '10-22_KidsGifting-CatBrowse-14105040-171024_1508883169598', },
                { name: "Target Finds", image: 'finds105040-171025_1508959860693', },
                { name: "Clothing", image: 'clothing97188-171019_1508445409180', },
                { name: "Shoes", image: 'shoes97188-171025_1508966363467', },
                { name: "Accessories", image: 'accessories97188-171027_1509114673981', },
                { name: "Baby", image: 'baby97188-171025_1508965179518', },
                { name: "Home", image: 'home97188-171019_1508445579038', },
                { name: "Furniture", image: 'furniture97188-171025_1508965473814', },
                { name: "Kitchen", image: 'kitchen97188-171019_1508445075384', },
                { name: "Electronics", image: 'electronics97188-171025_1508966407077', },
                { name: "Toys", image: 'toys97188-171025_1508966907610', },
                { name: "Entertainment", image: 'entertainment97188-171019_1508447521853', },
                { name: "Beauty", image: 'beauty97188-171025_1508965241734', },
                { name: "Deals", image: 'deals97188-171020_1508510709891', },
                { name: "Clearance", image: 'clearance97188-171020_1508525411214', },
            ],
        },
        { name: "Promotions",
            highlightItems: [
                {
                    name: "Our Black Friday deals",
                    description: "Get a sneak peek now.",
                    image: '2017_NovWk2_HP_StoryBlocks_v1_21103877-171101_1509556671597',
                },
                {
                    name: "20% off trees, wreaths & lights",
                    description: "Get your Christmas decor now.",
                    image: '2017_NovWk2_HP_StoryBlocks_v1_03103877-171026_1509030239564',
                },
                {
                    name: "20% off shoes",
                    description: "Save on styles & sizes for the family.",
                    image: '2017_NovWk2_HP_StoryBlocks_v1_05103877-171025_1508964273152',
                },
                {
                    name: "Xbox One X is here",
                    description: "The world’s most powerful console yet.",
                    image: '2017_NovWk2_HP_StoryBlocks_v1_08103877-171024_1508869525494',
                },
                {
                    name: "Gather & gobble",
                    description: "Find all you need for your Thanksgiving feast.",
                    image: 'C-000437-01-046_THR_CROP_2544_MetalGarland103876-171030_1509398096992',
                },
                {
                    name: "Friendsgiving edition",
                    description: "",
                    image: 'TF_friendsgiving_HP103876-171027_1509126668125',
                },
                {
                    name: "PJs for the whole crew",
                    description: "",
                    image: '2017_NovWk2_HP_StoryBlocks_v1_03103876-171019_1508446147822',
                },
            ],
        },
    ];

    page.setSiteMapMenuPath('');
    page.setSiteMapPath('Promotions');

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

    var onToggleProduct = function() {
        if (this.productPane === undefined) {
            var productPane = this.parent.addView({
                position: [0, .75, -.1],
                size: [.8, .4, 1],
                viewBgColor: [.96, .96, .96],
            });

            var product = this.product;
            if (product) {
                var url = 'https://redsky.target.com/v2/pdp/tcin/' + product;
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var data = JSON.parse(this.responseText);

                        productPane.addText({
                            viewBgColor: page.fontColorBold,
                            position: [0, .4, .01],
                            size: [.9, .2, 1],
                            fontSize: 52,
                            fontColor: [.3, .3, .3],
                            text: data.product.item.product_brand.brand,
                        });

                        productPane.addText({
                            viewBgColor: page.fontColorBold,
                            position: [-.3, -.3, .01],
                            size: [.3, .2, 1],
                            fontSize: 52,
                            fontColor: [.3, .3, .3],
                            text: data.product.price.listPrice.formattedPrice,
                        });
                    }
                };
                xhttp.open("GET", url, true);
                xhttp.send();
            }

            productPane.addText({
                viewBgColor: page.fontColorBold,
                position: [0, .2, .01],
                size: [.3, .2, 1],
                fontSize: 42,
                fontColor: [.3, .3, .3],
                text: 'sizes',
            });

            for (var i = 0; i < 5; i++) {
                productPane.addButton({
                    position: [-.36 + .18 * i, .0, .01],
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
                position: [.2, -.3, .01],
                size: [.4, .2, 1],
            }).addText({
                position: [0, 0, .01],
                fontSize: 52,
                fontColor: [1, 1, 1],
                text: 'add to cart',
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

    var subMenuY = .3;
    var highlightsY = 0;

    var menuPopup;

    var onHome = function(path) {
        page.setSiteMapMenuPath('');
        page.setSiteMapPath('Promotions');
        refresh();
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
                while (xIndex >= 9) {
                    yOffset += .2;
                    xIndex -= 9;
                }
                var xOffset = (xIndex % 2 === 0) ? (-xIndex * itemStep) : (xIndex + 1) * itemStep;
                var asset = screen.addAsset({
                    position: [xOffset, yOffset, 0],
                    size: .4,
                });
                var button = asset.addButton({
                    image: item.image ? imagePath + item.image : undefined,
                    path: item.path,
                    onClick: onClick,
                })
                asset.addText({
                    position: [0, -.6, .1],
                    fontSize: 80,
                    text: item.name,
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
                var imageBack = item.isProduct ? item.image + '_Alt01' : undefined;
                var button = asset.addButton({
                    image: image ? imagePath + image : undefined,
                    imageBack: imageBack ? imagePath + imageBack : undefined,
                    path: item.path,
                    valign: 'bottom',
                    onClick: item.isProduct ? 'animateFlip' : undefined,
                });
                var yOffset = -.6
                if (item.isProduct) {
                    asset.addText({
                        position: [0, yOffset, .1],
                        fontSize: 40,
                        text: 'details',
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
                currentItems.push(asset);
            }
        }
    };

    onHome();

    var canvas = page.addCanvas({
        valign: 'bottom',
    });

    canvas.addView({
        position: [0, -.45],
        size: [1, .12, 1],
        viewBgColor: [1, 1, 1],
        alpha: .9,
    });

    canvas.addButton({
        image: 'images/target_icon_logo.png',
        position: [-.45, -.45],
        size: .08,
        onClick: onHome,
    });

    canvas.addButton({
        image: 'images/target_icon_menu.png',
        position: [-.35, -.45],
        size: .08,
        onClick: 'onShowSiteMapMenu',
    });

    canvas.addButton({
        image: 'images/target_icon_account.png',
        position: [.25, -.45],
        size: .08,
    });

    canvas.addButton({
        image: 'images/target_icon_cart.png',
        position: [.35, -.45],
        size: .08,
    });

    canvas.addButton({
        image: 'ui/icon_vr.png',
        position: [.45, -.45],
        size: .08,
        color: page.fontColorBold,
        onClick: function() { peeks.toggleVrMode(); },
    });

    canvas.addText({
        position: [0, -.45],
        fontSize: 28,
        text: 'search',
        fontColor: [.3, .3, .3],
        size: .08,
        onClick: 'searchPage',
    })


	return page;
});
