require('./peeks.js');
require('./pages/toolbar.js');
require('./pages/demo.js');
require('./pages/home.js');

var global = Function('return this')();

global.THREE = require('./three.js');
require('./three/loaders/OBJLoader.js');
require('./peeks_three.js');

require("./pages/assets.js");
require("./pages/fashion.js");
require("./pages/mannequin.js");
require("./pages/shoe.js");
require("./pages/movie.js");
