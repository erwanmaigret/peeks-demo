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

	exports.EventDispatcher = EventDispatcher;
	exports.Node = Node;
	exports.Asset = Asset;
	exports.Scene = Scene;
	exports.Plane = Plane;

	Object.defineProperty(exports, '__esModule', { value: true });
})));
