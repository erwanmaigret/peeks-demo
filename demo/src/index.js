require('./peeks.js');
require('./pages/toolbar.js');
require('./pages/toolbar-lighting.js');
require('./pages/debug.js');
require('./pages/demo.js');
require('./pages/home.js');

require('./peeks.tracking.js');

var global = Function('return this')();

global.THREE = require('./three.js');
require('./three/loaders/GLTFLoader.js');
require('./three/loaders/OBJLoader.js');
require('./peeks_three.js');

require("./pages/assets.js");
require("./pages/fashion.js");
