require('./peeks.js');
require('./peeks_toolbar.js');
require('./peeks_demo.js');
require('./peeks_main.js');

var global = Function('return this')();

global.THREE = require('./three.js');
require('./three/loaders/OBJLoader.js');
require('./peeks_three.js');

require('./tracking/tracking-min.js');
require('./tracking/data/eye-min.js');
require('./tracking/data/face-min.js');
require('./tracking/data/mouth-min.js');

require("./pages/assets.js");
require("./pages/fashion.js");
require("./pages/mannequin.js");
require("./pages/shoe.js");
require("./pages/sportrade.js");
require("./pages/tron.js");
require("./pages/movie.js");
