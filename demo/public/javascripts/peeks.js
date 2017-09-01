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
		this.parent = null;
		this.children = [];
	}
	Object.assign(Node.prototype, EventDispatcher.prototype,
		{
			add: function (node) {
				node.parent = this;
				this.children[ this.children.length ] = node;
				return node;
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
		this.geomertryUrl = '';
		this.bounds = {
			x0: -.5,
			y0: -.5,
			z0: -.5,
			x1: .5,
			y1: .5,
			z1: .5,
		};
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

			setPosition: function ( x, y, z ) {
				if (x) this.position[0] = x;
				if (y) this.position[1] = y;
				if (z) this.position[2] = z;

				// When set from the outside we update the initial value too
				this.initialPosition = this.position.slice();
			},

			setRotation: function ( x, y, z ) {
				if (x) this.rotation[0] = x;
				if (y) this.rotation[1] = y;
				if (z) this.rotation[2] = z;

				// When set from the outside we update the initial value too
				this.initialRotation = this.rotation.slice();
			},

			setSize: function(width, height, depth) {
				if (width) 	this.size[0] = width;
				if (height)	this.size[1] = height;
				if (depth)	this.size[2] = depth;

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

			setGeometry: function(url) {
				this.geometryUrl = url;
			},

			update: function(time) {
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

	function Scene( ) {
		Asset.call( this );
		this.camera = this.add(new Camera());
	}
	Scene.prototype = Object.assign(Object.create( Asset.prototype ),
		{
			constructor: Scene,

			onMouseMove: function (event) {
				logDebug('onMouseMove');
			},

			onMouseDown: function (event) {
				logDebug('onMouseDown');
			},

			onMouseUp: function (event) {
				logDebug('onMouseUp');
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
						this.parent[this.attribute][0] += p[0];
						this.parent[this.attribute][1] += p[1];
						this.parent[this.attribute][2] += p[2];
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
