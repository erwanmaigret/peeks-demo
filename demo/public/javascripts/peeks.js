(function (global, factory) {
		typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.PEEKS = global.PEEKS || {})));
}(this, (function (exports) {

	'use strict';

	// General logging, 2 == info, 3 == warning, 4 == error
	var logLevel = 2;
	function setLogLevel(level) {
		logLevel = level;
	};
	function logSuperDebug(message) {
		if (logLevel <= 0) {
			console.log("Peeks.IO SUPER DEBUG: " + message);
		}
	};
	function logDebug(message) {
		if (logLevel <= 1) {
			console.log("Peeks.IO DEBUG: " + message);
		}
	};
	function logInfo(message) {
		if (logLevel <= 2) {
			console.log("Peeks.IO INFO: " + message);
		}
	};
	function logWarning(message) {
		if (logLevel <= 3) {
			console.log("Peeks.IO WARNING: " + message);
		}
	};
	function logError(message) {
		if (logLevel <= 4) {
			console.log("Peeks.IO ERROR: " + message);
		}
	};

	var startTime = Date.now();

	var utils = {};

	utils.mathMin = function(v1, v2) {
		return v1 > v2 ? v2 : v1;
	}

	utils.v2Distance = function (v1, v2) {
		var x = v2[0] - v1[0];
		var y = v2[1] - v1[1];
		return Math.sqrt(x * x + y * y);
	};

	var scene;

	function EventDispatcher() {}
		Object.assign( EventDispatcher.prototype, {
			addEventListener: function ( type, listener ) {
				if ( this._listeners === undefined ) this._listeners = {};
				var listeners = this._listeners;
				if ( listeners[ type ] === undefined ) {
					listeners[ type ] = [];
				}
				if ( listeners[ type ].indexOf( listener ) === - 1 ) {
					listeners[ type ].push( listener );
				}
			},
			hasEventListener: function ( type, listener ) {
				if ( this._listeners === undefined ) return false;
				var listeners = this._listeners;
				return listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1;
			},
			removeEventListener: function ( type, listener ) {
				if ( this._listeners === undefined ) return;
				var listeners = this._listeners;
				var listenerArray = listeners[ type ];
				if ( listenerArray !== undefined ) {
					var index = listenerArray.indexOf( listener );
					if ( index !== - 1 ) {
						listenerArray.splice( index, 1 );
					}
				}
			},
			dispatchEvent: function ( event ) {
				if ( this._listeners === undefined ) return;
				var listeners = this._listeners;
				var listenerArray = listeners[ event.type ];
				if ( listenerArray !== undefined ) {
					event.target = this;
					var array = listenerArray.slice( 0 );
					for ( var i = 0, l = array.length; i < l; i ++ ) {
						array[ i ].call( this, event );
					}
				}
			}
		}
	);

	// Root class
	function Node() {
		this.name = '';
		this.type = 'Node';
		this.children = [];
	}
	Object.assign(Node.prototype, EventDispatcher.prototype,
		{
			add: function (node) {
				node.parent = this;
				this.children[ this.children.length ] = node;
				return node;
			},

			addButton: function (params) {
				var asset = new PEEKS.Plane();
				if (params.image) asset.setTexture(params.image);
				if (params.imageRepeat) asset.textureRepeat = params.imageRepeat;
				if (params.position) asset.setPosition(params.position);
				if (params.rotation) asset.setRotation(params.rotation);
				if (params.size) asset.setSize(params.size);
				if (params.onClick) asset.onClick = params.onClick;
				return this.add(asset);
			},

			addImage: function (params) {
				var asset = new PEEKS.Plane();
				asset.needsTransition = true;
				if (params.image) asset.setTexture(params.image);
				if (params.imageRepeat) asset.textureRepeat = params.imageRepeat;
				if (params.position) asset.setPosition(params.position);
				if (params.rotation) asset.setRotation(params.rotation);
				if (params.size) asset.setSize(params.size);
				return this.add(asset);
			},

			addGeometry: function (params) {
				var asset = new PEEKS.Plane();
				if (params.geometry) asset.setGeometry(params.geometry);
				if (params.texture) asset.setTexture(params.texture);
				if (params.position) asset.setPosition(params.position);
				if (params.rotation) asset.setRotation(params.rotation);
				if (params.size) asset.setSize(params.size);
				return this.add(asset);
			},

			animate: function (params) {
				return this.add(new PEEKS.Animation(params));
			},
		}
	);

	// Asset
	function Asset() {
		Node.call(this);
		this.position = [0, 0, 0];
		this.rotation = [0, 0, 0];
		this.size = [1, 1, 1];
		this.updateInitial();
		this.color = [.7, .7, .7]; // Default color is grey, not white
		this.type = 'Asset';
		this.time = 0;
		this.primitive = Asset.PrimitiveNone;
		this.textureUrl = '';
		this.textureRepeat = [1, 1];
		this.geomertryUrl = '';
		this.bounds = {
			x0: -.5,
			y0: -.5,
			z0: -.5,
			x1: .5,
			y1: .5,
			z1: .5,
		};
		this.visible = true;
		this.needsTransition = false;
	}

	Asset.PrimitiveNone = 0;
	Asset.PrimitivePlane = 1;

	Asset.prototype = Object.assign(Object.create( Node.prototype ),
		{
			constructor: Asset,

			resetToInitial: function() {
				this.position = this.initialPosition.slice();
				this.rotation = this.initialRotation.slice();
				this.size = this.initialSize.slice();
			},

			updateInitial: function() {
				this.initialPosition = this.position.slice();
				this.initialRotation = this.rotation.slice();
				this.initialSize = this.size.slice();
			},

			setPosition: function (x, y, z) {
				if (typeof x === "number") {
					if (x) this.position[0] = x;
					if (y) this.position[1] = y;
					if (z) this.position[2] = z;
				} else {
					this.position = x;
				}

				// When set from the outside we update the initial value too
				this.initialPosition = this.position.slice();
			},

			setRotation: function (x, y, z) {
				if (typeof x === "number") {
					if (x) this.rotation[0] = x;
					if (y) this.rotation[1] = y;
					if (z) this.rotation[2] = z;
				} else {
					this.rotation = x;
				}

				// When set from the outside we update the initial value too
				this.initialRotation = this.rotation.slice();
			},

			setSize: function(width, height, depth) {
				if (width !== undefined) {
					if (typeof width === "number") {
						this.size[0] = width;
						if (height) {
							this.size[1] = height;
						} else {
							this.size[1] = width;
						}
						if (depth) {
							this.size[2] = depth;
						} else if (!height) {
							this.size[2] = width;
						}
					} else {
						this.size = arguments[0];
					}
				}

				// When set from the outside we update the initial value too
				this.initialSize = this.size.slice();
			},

			setColor: function(red, green, blue) {
				if (red) 		this.color[0] = red;
				if (green) 	this.color[1] = green;
				if (blue) 	this.color[2] = blue;
			},

			setTexture: function(url) {
				this.textureUrl = url;
			},

			setUseVideoTexture: function() {
				this.useVideoTexture = true;
			},

			setGeometry: function(url) {
				this.geometryUrl = url;
			},

			update: function(time) {
				if (time == undefined) {
					time = (Date.now() - startTime) / 1000;
				}

				if (this.needsTransition) {
					this.needsTransition = false;
				}

				this.time = time;
				this.resetToInitial();
				for (var childI = 0; childI < this.children.length; childI++) {
					this.children[childI].update(time);
				}
			},

			updateLayout: function() {
				if (this.layout) {
					var bounds = this.getParentBounds();
					var sx = bounds.x1 - bounds.x0;

					this.size[0] = bounds.x1 - bounds.x0;
					this.size[1] = bounds.y1 - bounds.y0;
					this.size[2] = bounds.z1 - bounds.z0;

					// Finish computing the layout info from there
					this.position[1] = 0;
					this.position[2] = -5;

					// Until we get to support animated layout we'll keep this forcing
					// update of initial state
					this.updateInitial();
				}
			},

			getParentBounds: function() {
				if (this.parent) {
					return this.parent.getBounds();
				} else {
					return this.getBounds();
				}
			},

			getBounds: function() {
				if (this.bounds) {
					// This can be set explicitly in case we don't want to assotiate it
					//	with the scale
					return this.bounds;
				} else {
					return {
						x0: -this.size[0] / 2,
						y0: -this.size[1] / 2,
						z0: -this.size[2] / 2,
						x1: this.size[0] / 2,
						y1: this.size[1] / 2,
						z1: this.size[2] / 2,
					};
				}
			},

			getScene: function() {
				var scene = this;
				while (scene && scene.type != 'Scene') {
					scene = scene.parent;
				}
				return scene;
			},

			show: function() {
				this.visible = true;
			},

			hide: function() {
				this.visible = false;
			},

			toggleVisible: function() {
				this.visible = !this.visible;
			},
		}
	);

	function Camera( ) {
		Asset.call(this);
	}
	Camera.prototype = Object.assign(Object.create( Asset.prototype ),
		{
			constructor: Camera,
		}
	);

	function Scene() {
		Asset.call(this);
		this.camera = this.add(new Camera());
		this.mouseDownTime = 0;
		this.type = 'Scene';
		this.arAsset = this.add(new PEEKS.Asset());
	}
	Scene.prototype = Object.assign(Object.create( Asset.prototype ),
		{
			constructor: Scene,

			convertMouse: function(mouseX, mouseY, window) {
			  var rect = this.domElement.getBoundingClientRect();
			  var x = mouseX;
			  var y = mouseY;
			  var pointX = x - rect.left;
			  var pointY = y - rect.top;

			  if (window) {
			    return [pointX, -pointY];
			  } else {
			    pointX = pointX / rect.width;
			    pointY = pointY / rect.height;
			    return [pointX * 2 - 1, -pointY * 2 + 1];
			  }
			},

			getMouse: function(event, window) {
				if (event.touches) {
					if (event.touches.length > 0) {
						return this.convertMouse(event.touches[0].clientX, event.touches[0].clientY, window);
					} else {
						return this.convertMouse(0, 0, window);
					}
				} else {
					return this.convertMouse(event.clientX, event.clientY, window);
				}
			},

			onPickNode: function(mouse) {
				logDebug('onPickNode');
			},

			onMouseMove: function (event) {
				// logDebug('onMouseMove');
			},

			onMouseDown: function (event) {
				logDebug('onMouseDown');
				this.mouseDown = this.getMouse(event);
				this.mouseDownTime = this.time;
			},

			onMouseUp: function (event) {
				logDebug('onMouseUp');
				this.mouseUp = this.getMouse(event);
				this.mouseUpTime = this.time;
				if (utils.v2Distance(this.mouseUp, this.mouseDown) < .05 &&
				(this.mouseUpTime - this.mouseDownTime) < .3) {

					this.onClick(event);
				}
			},

			onClick: function (event) {
				logDebug('onClick');

				var asset = this.onPickNode(this.getMouse(event));
				if (asset) {
					if (asset.onClick) {
						if (typeof asset.onClick === 'string') {
							var onClick = asset[asset.onClick];
							onClick.call(asset);
						} else {
							asset.onClick();
						}
					} else {
						asset.animate({
							duration: 2,
							delay: this.time,
							begin: [0, 0, 0],
							end: [0, 360, 0],
							attribute: 'rotation'
						});
					}
				}
			},

			onKeyDown: function (event) {
				logDebug('onKeyDown');
				var manipFactor = event.shiftKey ? .1 : 1;
				var animAttribute;
				var animValue;
				switch (event.keyCode) {
					case 37: { // Arrow Left
						if (event.altKey) {
							animAttribute = 'rotation';
							animValue = [0, manipFactor * 20, 0];
						} else {
							animAttribute = 'position';
							animValue = [-manipFactor, 0, 0];
						}
		        break;
		      }
					case 38: { // Arrow Up
						if (event.altKey) {
							animAttribute = 'rotation';
							animValue = [manipFactor * 20, 0, 0];
						} else {
							animAttribute = 'position';
							animValue = [0, 0, -manipFactor];
						}
		        break;
		      }
					case 39: { // Arrow Right
						if (event.altKey) {
							animAttribute = 'rotation';
							animValue = [0, -manipFactor * 20, 0];
						} else {
							animAttribute = 'position';
							animValue = [manipFactor, 0, 0];
						}
		        break;
		      }
					case 40: { // Arrow Down
						if (event.altKey) {
							animAttribute = 'rotation';
							animValue = [-manipFactor * 20, 0, 0];
						} else {
							animAttribute = 'position';
							animValue = [0, 0, manipFactor];
						}
		        break;
		      }
				}

				var target = this.camera;
				if (target) {
					if (animAttribute && animValue) {
						target.add(new PEEKS.Animation({
							duration: 1,
							delay: this.time,
							begin: [0, 0, 0],
							end: animValue,
							attribute: animAttribute
						}));
					}
				}
			},

			onKeyUp: function (event) {
				logDebug('onKeyUp');
			},

			onMouseWheel: function (event) {
				logDebug('onMouseWheel');
			},

			onStart: function () {
			},

			onAnimate: function () {
			},

			onSynch: function () {
			},

			getVideo: function() {
				return this.video;
			},

			toggleArMode: function() {
				this.setArMode(!this.arMode);
			},

			setArMode: function(state) {
				if (state === undefined) {
					state = true;
				}
				if (state) {
					if (!this.arImage) {
						var asset = new PEEKS.Plane();
				    asset.setPosition(0, 2, -10);
				    asset.setSize(10);
				    asset.setUseVideoTexture(true);
				    this.arAsset.add(asset);
						this.arImage = asset;
					}
					this.arImage.show();
				} else {
					if (this.arImage) {
						this.arImage.hide();
					}
				}
				this.arMode = state;
			},

			start: function (window) {
				this.window = window;
				var document = window.document;

				logDebug('Scene.start');

				this.onStart();

				scene = this;

				if (document) {
					document.body.appendChild( scene.domElement );
			    document.addEventListener('mousemove', function(event) { scene.onMouseMove(event); });
			    document.addEventListener('mousedown', function(event) { if (event.target.nodeName === 'CANVAS') { scene.onMouseDown(event); } });
			    document.addEventListener('mouseup', function(event) { scene.onMouseUp(event); });
			    document.addEventListener('keydown', function(event) { scene.onKeyDown(event); });
			    document.addEventListener('keyup', function(event) { scene.onKeyUp(event); });
			    document.addEventListener('mousewheel', function(event) { if (event.target.nodeName === 'CANVAS') { scene.onMouseWheel(event); } });
			    document.addEventListener('MozMousePixelScroll', function(event) { if (event.target.nodeName === 'CANVAS') { scene.onMouseWheel(event); } });
			    document.addEventListener('touchstart', function(event) { if (event.target.nodeName === 'CANVAS') { scene.onMouseDown(event); } } );
			    document.addEventListener('touchend', function(event) { scene.onMouseUp(event); } );
			    document.addEventListener('touchmove', function(event) { scene.onMouseMove(event); } );

					this.video = document.createElement('video');
					this.video.width = 400;
					this.video.height = 400;
					this.video.autoplay = true;
					this.video.texture = undefined;
				}

				scene.three.scene.add(scene.threeGetNode());

				var animate = function () {
					requestAnimationFrame(animate);

					scene.update();
					scene.threeSynch();

					scene.camera.threeSynch(scene.three.camera);
					scene.three.renderer.render(scene.three.scene, scene.three.camera);
				};

				animate();
			},
		}
	);

	function Plane( ) {
		Asset.call( this );
		this.primitive = Asset.PrimitivePlane;
	}
	Plane.prototype = Object.assign(Object.create( Asset.prototype ),
		{
			constructor: Plane,
		}
	);

	function Animation(data) {
		Asset.call( this );
		this.startTime = 0;
		this.duration = 10;
		this.delay = 0;
		this.attribute = 'position';
		this.loop = false;

		// Assign all passed in attributes
		if (data.duration) this.duration = data.duration;
		if (data.delay) this.delay = data.delay;

		if (data.begin) this.p0 = data.begin;
		if (data.end) this.p3 = data.end;
		if (data.p0) this.p0 = data.p0;
		if (data.p1) this.p1 = data.p1;
		if (data.p2) this.p2 = data.p2;
		if (data.p3) this.p3 = data.p3;

		if (!this.p0) {
			this.p0 = [0, 0, 0];
		}
		if (!this.p3) {
			this.p3 = [0, 0, 0];
		}
		if (!this.p1) {
			this.p1 = [
				this.p0[0] * 2 / 3 + this.p3[0] / 3,
				this.p0[1] * 2 / 3 + this.p3[1] / 3,
				this.p0[2] * 2 / 3 + this.p3[2] / 3
			];
		}
		if (!this.p2) {
			this.p2 = [
				this.p0[0] * 1 / 3 + this.p3[0] * 2 / 3,
				this.p0[1] * 1 / 3 + this.p3[1] * 2 / 3,
				this.p0[2] * 1 / 3 + this.p3[2] * 2 / 3
			];
		}

		if (data.attribute) this.attribute = data.attribute;

		if (data.loop) {
			this.loop = data.loop;
		}

		if (data.interpolate) {
			this.interpolate = data.interpolate;
		} else {
			if (this.loop) {
				this.interpolate = Animation.InterpolateLinear;
			} else {
				this.interpolate = Animation.InterpolateEaseInOut;
			}
		}
	}

	Animation.InterpolateLinear = 0;
	Animation.InterpolateEaseInOut = 1;
	Animation.InterpolateEaseIn = 2;
	Animation.InterpolateEaseOut = 3;

	Animation.prototype = Object.assign(Object.create( Asset.prototype ),
		{
			constructor: Animation,

			interpolateEaseIn: function(p) {
			  return p * p;
			},
			interpolateEaseOut: function(p) {
			  return -(p * (p - 2));
			},
			interpolateEaseInOut: function(p) {
			  if (p < 0.5) return 2 * p * p;
			  else return (-2 * p * p) + (4 * p) - 1;
			},

			update: function(time) {
				var t = 0;
				var startTime = this.startTime + this.delay;
				var endTime = startTime + this.duration;
				if (time <= startTime) {
					t = 0;
				} else if (time >= endTime) {
					if (this.loop) {
						while (time > endTime) {
							time -= this.duration;
						}
						t = (time - startTime) / this.duration;
					} else {
						t = 1;
					}
				} else {
					t = (time - startTime) / this.duration;
				}
				switch (this.interpolate) {
					case Animation.InterpolateLinear: break;
					case Animation.InterpolateEaseInOut: t = this.interpolateEaseInOut(t); break;
					case Animation.InterpolateEaseIn: t = this.interpolateEaseIn(t); break;
					case Animation.InterpolateEaseOut: t = this.interpolateEaseOut(t); break;
				}

				var k0 = (1 - t) * (1 - t) * (1 - t);
				var k1 = 3 * (1 - t) * (1 - t) * t;
				var k2 = 3 * (1 - t) * t * t;
				var k3 = t * t * t;

				var p = [
					k0 * this.p0[0] + k1 * this.p1[0] + k2 * this.p2[0] + k3 * this.p3[0],
					k0 * this.p0[1] + k1 * this.p1[1] + k2 * this.p2[1] + k3 * this.p3[1],
					k0 * this.p0[2] + k1 * this.p1[2] + k2 * this.p2[2] + k3 * this.p3[2],
				];

				if (this.parent) {
					if (this.parent[this.attribute]) {
						if (this.attribute === 'size') {
							this.parent[this.attribute][0] *= p[0];
							this.parent[this.attribute][1] *= p[1];
							this.parent[this.attribute][2] *= p[2];
						} else {
							this.parent[this.attribute][0] += p[0];
							this.parent[this.attribute][1] += p[1];
							this.parent[this.attribute][2] += p[2];
						}
					}
				}
			},
		}
	);

	exports.EventDispatcher = EventDispatcher;
	exports.Node = Node;
	exports.Asset = Asset;
	exports.Scene = Scene;
	exports.Camera = Camera;
	exports.Plane = Plane;
	exports.Animation = Animation;

	exports.setLogLevel = setLogLevel;

	Object.defineProperty(exports, '__esModule', { value: true });
})));
