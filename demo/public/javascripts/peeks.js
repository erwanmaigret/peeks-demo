(function (global, factory) {
		typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.PEEKS = global.PEEKS || {})));
}(this, (function (exports) {

	'use strict';

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
	Object.assign( Node.prototype, EventDispatcher.prototype,
		{
			add: function ( node ) {
				node.parent = this;
				this.children[ this.children.length ] = node;
			},
		}
	);

	// Asset
	function Asset( ) {
		Node.call( this );
		this.position = [0, 0, 0];
		this.rotation = [0, 0, 0];
		this.size = [1, 1, 1];
		this.color = [.7, .7, .7]; // Default color is grey, not white
		this.type = 'Asset';
		this.primitive = Asset.PrimitiveNone;
		this.textureUrl = '';
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

			setPosition: function ( x, y, z ) {
				if (x) this.position[0] = x;
				if (y) this.position[1] = y;
				if (z) this.position[2] = z;
			},

			setRotation: function ( x, y, z ) {
				if (x) this.rotation[0] = x;
				if (y) this.rotation[1] = y;
				if (z) this.rotation[2] = z;
			},

			setSize: function(width, height, depth) {
				if (width) 	this.size[0] = width;
				if (height)	this.size[1] = height;
				if (depth)	this.size[2] = depth;
			},

			setColor: function(red, green, blue) {
				if (red) 		this.color[0] = red;
				if (green) 	this.color[1] = green;
				if (blue) 	this.color[2] = blue;
			},

			setTexture: function(url) {
				this.textureUrl = url;
			},

			update: function(time) {
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

	function Scene( ) {
		Asset.call( this );
	}
	Scene.prototype = Object.assign(Object.create( Asset.prototype ),
		{
			constructor: Scene,
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

	function Animation( data ) {
		Asset.call( this );
		this.startTime = 0;
		this.duration = 10;
		this.p0 = [0, 0, 0];
		this.p1 = [1, 0, 0];
		this.p2 = [2, 1, 0];
		this.p3 = [2, 2, 0];
		if (data.duration) this.duration = data.duration;
		if (data.p0) this.p0 = data.p0;
		if (data.p1) this.p1 = data.p1;
		if (data.p2) this.p2 = data.p2;
		if (data.p3) this.p3 = data.p3;
		this.track = 't';
	}
	Animation.prototype = Object.assign(Object.create( Asset.prototype ),
		{
			constructor: Animation,

			update: function(time) {
				var t = 0;
				if (time < this.startTime) {
					t = 0;
				} else if (time > (this.startTime + this.duration)) {
					t = 1;
				} else {
					t = (time - this.startTime) / this.duration;
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
					if (this.track == 't') {
						this.parent.position = p;
					}
				}
			},
		}
	);

	exports.EventDispatcher = EventDispatcher;
	exports.Node = Node;
	exports.Asset = Asset;
	exports.Scene = Scene;
	exports.Plane = Plane;
	exports.Animation = Animation;

	Object.defineProperty(exports, '__esModule', { value: true });
})));
