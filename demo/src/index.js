/*
window.fbAsyncInit = function() {
  FB.init({
    appId      : '1641014236148586',
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
require('./peeks_three.js');

require("./pages/assets.js");
require("./pages/fashion.js");
