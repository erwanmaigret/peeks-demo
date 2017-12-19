require('./peeks.js');

var global = Function('return this')();

global.THREE = require('./three.js');
require('./three/loaders/OBJLoader.js');
require('./three/renderers/CSS3DRenderer.js');
require('./peeks_three.js');
