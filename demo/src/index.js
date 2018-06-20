/*
window.fbAsyncInit = function() {
    FB.init({
      appId      : '291105648095036',
      xfbml      : true,
      version    : 'v3.0'
    });
    FB.AppEvents.logPageView();
  //FB.getLoginStatus(function(response) {
  //      console.log(response);
      //statusChangeCallback(response);
  //});
  FB.login(function(response) {
      if (response.authResponse) {
          console.log(response);
       console.log('Welcome!  Fetching your information.... ');
       FB.api('/me', function(response) {
         console.log('Good to see you, ' + response.name + '.');
       });
      } else {
       console.log('User cancelled login or did not fully authorize.');
      }
  }, {scope: 'public_profile,email,publish_actions'});
  FB.ui({
    method: 'share',
    link: 'https://dev.peeks.io/',
    //source: 'https://dev.peeks.io/assets/glb/tree.glb',
    source: 'https://dev.peeks.io/assets/converse.jpg',
    //picture: 'https://dev.peeks.io/assets/converse.jpg',
    thumbnail: 'https://dev.peeks.io/assets/converse.jpg',
//    method: 'share',
//    href: 'https://dev.peeks.io/assets/glb/tree.glb',
    caption: 'this is a test',
  }, function(response){});
  console.log(FB);
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

 */


require('./peeks.js');
require('./config.js');
require('./pages/toolbar.js');
require('./pages/toolbar-animation.js');
require('./pages/toolbar-lighting.js');
require('./pages/debug.js');
require('./pages/demo.js');
require('./pages/home.js');

require('./peeks.tracking.js');

var global = Function('return this')();

global.THREE = require('./three.js');
require('./three/loaders/GLTFLoader.js');
require('./three/loaders/OBJLoader.js');
require("./three/shaders/ShaderSkin.js");
require("./three/shaders/shaders/BleachBypassShader.js");
require("./three/shaders/shaders/ConvolutionShader.js");
require("./three/shaders/shaders/CopyShader.js");
require("./three/shaders/postprocessing/EffectComposer.js");
require("./three/shaders/postprocessing/RenderPass.js");
require("./three/shaders/postprocessing/BloomPass.js");
require("./three/shaders/postprocessing/TexturePass.js");
require("./three/shaders/postprocessing/ShaderPass.js");
require("./three/shaders/postprocessing/MaskPass.js");
require("./three/shaders/Detector.js");
require("./three/shaders/libs/stats.min.js");
require('./peeks_three.js');

require("./pages/assets.js");
require("./pages/fashion.js");