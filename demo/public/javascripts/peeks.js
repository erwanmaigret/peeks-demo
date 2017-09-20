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

	utils.v2Distance = function (v1, v2) {
		var x = v2[0] - v1[0];
		var y = v2[1] - v1[1];
		return Math.sqrt(x * x + y * y);
	};

	utils.v3 = function(x, y, z) {
	    if (arguments.length === 3) {
	        return [x, y, z];
	    } else if (arguments.length === 1) {
	        if (arguments[0].length === 3) {
	            return [arguments[0][0], arguments[0][1], arguments[0][2]];
	        } else {
	            return [arguments[0], arguments[0], arguments[0]];
	        }
	    } else {
	      return [0, 0, 0];
	    }
	};

	utils.hex2rgb = function(h) {
	    if (h.charAt(0) === "#") h = h.substring(1,9);
	    var a = [parseInt(h.substring(0,2),16)/255, parseInt(h.substring(2,4),16)/255, parseInt(h.substring(4,6),16)/255];
	    if(h.length > 6) a.push(parseInt(h.substring(6,8),16)/255);
	    return a;
	};

	utils.color = function() {
	    if (arguments.length === 3) {
	        return utils.v3(arguments[0], arguments[1], arguments[2]);
	    } else if (arguments.length === 1) {
	        if (typeof arguments[0] === 'string' || arguments[0] instanceof String) {
	            var rgb = utils.hex2rgb(arguments[0]);
	            if (rgb.length === 3) {
	                return utils.v3(rgb);
	            }
	        } else if (arguments[0].length === 3) {
	            return utils.v3(arguments[0]);
	        } else {
	            return utils.v3(arguments);
	        }
	    }
	};

	var mainScene;

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
				node.applyCss(node, true);
				return node;
			},

			addPage: function (name) {
				var page = PEEKS.loadPage(name);
				if (page) {
					this.add(page);
				} else {
					logDebug('Can not add missing page ' + name);
				}
				return page;
			},

			destroy: function () {
				this.unload();
				var parent = this.parent;
				if (parent) {
					delete this.parent;
					for (var childI = 0; childI < parent.children.length; childI++) {
							if (parent.children[childI] === this) {
								parent.children.splice(childI, 1);
								break;
							}
					}
				}
			},

			unload: function () {
				this.onUnload();
			},

			addCanvas: function (params) {
				var asset = new PEEKS.Canvas();
				return this.add(asset);
			},

			addButton: function (params) {
				var asset = this.addImage(params);
				if (params) {
					if (params.onClick) {
						asset.onClick = params.onClick;
					} else {
						// Assign default empty callback so it's clickable
						asset.onClick = function () {};
					}
					if (params.onClickArgs) asset.onClickArgs = params.onClickArgs;
				}
				return asset;
			},

			addImage: function (params) {
				var asset = this.addView(params);
				if (params) {
					if (params.image) asset.setTexture(params.image);
					if (params.imageBack) asset.setTextureBack(params.imageBack);
					if (params.imageRepeat) asset.textureRepeat = params.imageRepeat;
				}
				return asset;
			},

			addText: function (params) {
				var asset = this.addView(params);
				if (params) {
					if (params.text) asset.text = params.text;
				}
				return asset;
			},

			applyCss: function(asset, recurse) {
				if (this.parent) {
					this.parent.applyCss(asset);
				}
				if (recurse) {
					for (var childI = 0; childI < this.children.length; childI++) {
						this.children[childI].applyCss(this.children[childI], true);
					}
				}
				if (this.parent) {
					this.parent.applyCss(asset);
				}
				if (this.css) {
					if (this.css.bgColor && asset.bgColor === undefined) {
						asset.bgColor = utils.color.apply(this, this.css.bgColor);
					}
					if (this.css.viewBgColor && asset.viewBgColor === undefined) {
						asset.viewBgColor = utils.color.apply(this, this.css.viewBgColor);
					}
				}
			},

			initAsset: function (asset, params) {
				this.applyCss(this);
				asset.needsTransition = true;
				if (params) {
					if (params.position) asset.setPosition(params.position);
					if (params.rotation) asset.setRotation(params.rotation);
					if (params.size) asset.setSize(params.size);
					if (params.color) asset.setColor(params.color);
					if (params.bgColor) asset.setBgColor(params.bgColor);
					if (params.alpha) asset.alpha = params.alpha;
				}
			},

			addView: function (params) {
				var asset = new PEEKS.Plane();
				this.initAsset(asset, params);
				return this.add(asset);
			},

			addAsset: function (params) {
				var asset = new PEEKS.Asset();
				this.initAsset(asset, params);
				return this.add(asset);
			},

			addGeometry: function (params) {
				var asset = new PEEKS.Plane();
				if (params) {
					if (params.geometry) asset.setGeometry(params.geometry);
					if (params.texture) asset.setTexture(params.texture);
					this.initAsset(asset, params);
					}
				return this.add(asset);
			},

			animate: function (params) {
				var anim = this.add(new PEEKS.Animation(params));
                if (!anim.delay && this.time !== undefined) {
                    anim.delay = this.time;
                }
			},

			superDebug: function(message) {
				logSuperDebug(message);
			},
			debug: function(message) {
				logDebug(message);
			},
			info: function(message) {
				logInfo(message);
			},
			warn: function(message) {
				logWarning(message);
			},
			error: function(message) {
				logError(message);
			},
		}
	);

	// Asset
	function Asset() {
		Node.call(this);
		this.position = [0, 0, 0];
		this.rotation = [0, 0, 0];
		this.rotationOrder = 'XYZ';
		this.size = [1, 1, 1];
		this.updateInitial();
		this.color = [1, 1, 1];
		this.type = 'Asset';
		this.time = 0;
		this.primitive = Asset.PrimitiveNone;
		this.textureUrl = '';
		this.textureBackUrl = '';
		this.textureRepeat = [1, 1];
		this.geomertryUrl = '';
		this.bounds = { x0: -.5, y0: -.5, z0: -.5, x1: .5, y1: .5, z1: .5 };
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
					if (arguments.length > 0) {
						if (arguments[0].length == 2) {
							this.position = [arguments[0][0], arguments[0][1], 0];
						} else if (arguments[0].length == 3) {
							this.position = arguments[0].slice();
						}
					}
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

			setColor: function(color) {
				this.color = utils.color.apply(this, arguments);
			},

			setBgColor: function(color) {
				this.bgColor = utils.color.apply(this, arguments);
			},

			setViewBgColor: function(color) {
				this.viewBgColor = utils.color.apply(this, arguments);
			},

			createTextTexture: function(fontAsset, rect, color, size, text) {
				var document = this.getDocument();
				if (document) {
					var texture = {};
					texture.canvas = document.createElement('canvas');
					texture.context = texture.canvas.getContext('2d');
					var canvasWidth = 256;
					var canvasHeight = 256;
					texture.canvas.width = canvasWidth;
					texture.canvas.height = canvasHeight;
					texture.context.clearRect(0, 0, canvasWidth, canvasHeight);
					texture.context.font = `${size.toString()}px Arial`;
				  texture.context.fillStyle = 'rgba(' +
				    Math.round(color[0] * 255) + ',' +
				    Math.round(color[1] * 255) + ',' +
				    Math.round(color[2] * 255) + ',' +
				    color[3] + ')';
					var width = texture.context.measureText(text).width;
					var height = size * 4/3;
					var xOffset = (canvasWidth - width) / 2;
					var yOffset = (canvasHeight - height) / 2 + (height / 2);
				  texture.context.fillText(text, xOffset, yOffset);
					return texture;
				} else {
					this.logError("Can't draw text in empty texture");
				}
			},

			setTexture: function(url) {
				this.textureUrl = url;
			},

			setTextureBack: function(url) {
				this.textureBackUrl = url;
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

			render: function() {
				this.onRender();
			},

			onRender: function() {
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

			getDocument: function() {
				var scene = this.getScene();
				if (scene && scene.window) {
					return scene.window.document;
				}
			},

			getCamera: function() {
				var scene = this.getScene();
				if (scene) {
					return scene.camera;
				}
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

			animateFlip: function() {
				this.animate({
					duration: 1,
					delay: this.time,
					begin: [0, 0, 0],
					end: [0, 180, 0],
					attribute: 'rotation'
				});
			},

			animateClick: function() {
				this.animate({
					duration: .4,
					delay: this.time,
					p0: [1, 1, 1],
					p1: [1.1, 1.1, 1.1],
					p2: [1.1, 1.1, 1.1],
					p3: [1, 1, 1],
					attribute: 'size'
				});
				this.animate({
					duration: .5,
					delay: this.time,
					p0: [0, 0, 0],
					p1: [0, 0, 5],
					p2: [0, 0, -5],
					p3: [0, 0, 0],
					attribute: 'rotation'
				});
			},
		}
	);

	function Camera( ) {
		Asset.call(this);
		this.rotationOrder = 'ZYX';
	}
	Camera.prototype = Object.assign(Object.create( Asset.prototype ),
		{
			constructor: Camera,

			animateIntro: function() {
				var animSpeed = 2;
				this.animate({
					duration: 10 / animSpeed,
					begin: [0, 0, 16],
					end: [0, 0, 0]
				});
				this.animate({
					duration: 9 / animSpeed,
					delay: 1,
					p0: [0, 0, 0],
					p1: [0, 40, 10],
					p2: [0, -40, -10],
					p3: [0, 0, 0],
					attribute: 'rotation'
				});
			}
		}
	);

	var pages = {};
	function registerPage(name, ctor) {
		pages[name] = ctor;
	}

	function loadPage(name) {
		if (pages[name]) {
			var page = pages[name]();
			page.name = name;
			return page;
		} else {
			logError("Can't load unregistered page " + name);
		}
	}

	function Scene() {
		Asset.call(this);
		this.camera = this.add(new Camera());
		this.mouseDownTime = 0;
		this.type = 'Scene';
		this.arAsset = this.add(new PEEKS.Asset());
		this.pagesHistory = ['peeks_welcome']; // Make this the default first page
		this.pageIndex = 0;
		this.css = {
			viewBgColor: [.8, .8, 1],
			bgColor: [1, 1, 1],
		};
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
					}
				} else {
					return this.convertMouse(event.clientX, event.clientY, window);
				}
			},

			onPickNode: function(mouse) {
				logDebug('onPickNode');
			},

			onMouseMove: function (event) {
				event.preventDefault();
				// logDebug('onMouseMove');

				if (this.mouseDown) {
					this.mouseMove = this.getMouse(event);
					this.mouseMoveTime = this.time;
					this.mouseDownCanClick = false;

					var mouseMove = utils.v2Distance(this.mouseMove, this.mouseDown);
					if (mouseMove > .01) {
						this.mouseDownCanClick = false;
						if (this.mouseDownCameraRotation) {
							this.camera.setRotation(
								this.mouseDownCameraRotation[0] - (this.mouseMove[1] - this.mouseDown[1]) * 45,
								this.mouseDownCameraRotation[1] + (this.mouseMove[0] - this.mouseDown[0]) * 45,
								this.mouseDownCameraRotation[2]
							);
						}
					}
				}
			},

			onMouseDown: function (event) {
				event.preventDefault();
				logDebug('onMouseDown');
				this.mouseDown = this.getMouse(event);
				this.mouseDownCameraRotation = this.camera.rotation;
				this.mouseDownCanClick = true;
				this.mouseDownTime = this.time;
			},

			onMouseUp: function (event) {
				event.preventDefault();
				logDebug('onMouseUp');
				if (this.mouseDown) {
					if (this.mouseDownCanClick) {
						this.mouseUp = this.getMouse(event);
						if (this.mouseUp === undefined) {
							this.mouseUp = this.mouseMove;
						}
						if (this.mouseUp === undefined) {
							this.mouseUp = this.mouseDown;
						}
						this.mouseUpTime = this.time;
						if (utils.v2Distance(this.mouseUp, this.mouseDown) < .05 &&
							(this.mouseUpTime - this.mouseDownTime) < .3)
						{
							this.onClick(this.mouseUp);
						}
					}
					delete this.mouseDown;
				}
			},

			onClick: function (mouse) {
				logDebug('onClick');

				var asset = this.onPickNode(mouse);
				if (asset) {
					if (asset.onClick) {
						asset[`animateClick`]();
						if (typeof asset.onClick === 'string') {
							var onClick = asset[asset.onClick];
							if (onClick) {
								onClick.apply(asset, asset.onClickArgs);
							} else {
								onClick = this[asset.onClick];
								if (onClick) {
									onClick.apply(this, asset.onClickArgs);
								}
							}
						} else {
							asset.onClick();
						}
					}
				}
			},

			onKeyDown: function (event) {
				event.preventDefault();

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
				event.preventDefault();
				logDebug('onKeyUp');
			},

			onMouseWheel: function (event) {
				event.preventDefault();
				logDebug('onMouseWheel');
			},

            onStart: function () {
			},

            onResize: function () {
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

			loadPage: function(page) {
				if (typeof page === 'string') {
					var name = page;
					if (pages[name]) {
						if (this.page) {
							logError("Unloading current page");
							this.page.destroy();
						}
						logError("Registering " + name);
						var page = loadPage(name);
						this.add(page);
						this.page = page;

						this.pageIndex++;
						if (this.pageIndex < (this.pagesHistory.length - 1)) {
							this.pagesHistory.push(name);
						} else {
							this.pagesHistory[this.pageIndex] = name;
						}
					} else {
						logError("Can't load unregistered page " + name);
					}
				} else {
					var pageIndex = page;
					if (pageIndex >= 0 && pageIndex < this.pagesHistory.length) {
						var name = this.pagesHistory[pageIndex];
						if (this.page) {
							logError("Unloading current page");
							this.page.destroy();
						}
						var page = loadPage(name);
						this.add(page);
						this.page = page;
						this.pageIndex = pageIndex;
					}
				}

				this.resetCamera();
			},

			loadPreviousPage: function() {
				if (this.pageIndex > 0) {
					this.loadPage(this.pageIndex - 1);
				}
			},

			loadNextPage: function() {
				if (this.pageIndex < (this.pagesHistory.length - 1)) {
					this.loadPage(this.pageIndex + 1);
				}
			},

			resetCamera: function (animate) {
				this.camera.destroy();
				this.camera = this.add(new Camera());

				this.camera.setPosition([0, 0, 0]);
				if (animate) {
					this.camera.animateIntro();
				}
			},

			start: function (window, animate) {
				this.resetCamera(animate);
				this.window = window;
                this.width = this.window.innerWidth;
                this.height = this.window.innerHeight;

				logDebug('Scene.start');

				this.onStart();

				mainScene = this;

                var document = window.document;
				if (document) {
					document.body.appendChild( mainScene.domElement );

                    document.addEventListener('mousemove',
                        function(event) {
                            mainScene.onMouseMove(event);
                        });

                    document.addEventListener('mousedown',
                        function(event) {
                            if (event.target.nodeName === 'CANVAS') {
                                mainScene.onMouseDown(event);
                            }
                        });

                    document.addEventListener('mouseup',
                        function(event) {
                            mainScene.onMouseUp(event);
                        });

                    document.addEventListener('keydown',
                        function(event) {
                            mainScene.onKeyDown(event);
                        });

                    document.addEventListener('keyup',
                        function(event) {
                            mainScene.onKeyUp(event);
                        });

                    document.addEventListener('mousewheel',
                        function(event) {
                            if (event.target.nodeName === 'CANVAS') {
                                mainScene.onMouseWheel(event);
                            }
                        });

                    document.addEventListener('MozMousePixelScroll',
                        function(event) {
                            if (event.target.nodeName === 'CANVAS') {
                                mainScene.onMouseWheel(event);
                            }
                        });

                    document.addEventListener('touchstart',
                        function(event) {
                            if (event.target.nodeName === 'CANVAS') {
                                mainScene.onMouseDown(event);
                            }
                        });

                    document.addEventListener('touchend',
                        function(event) {
                            mainScene.onMouseUp(event);
                        });

                    document.addEventListener('touchmove',
                        function(event) {
                            mainScene.onMouseMove(event);
                        });

					this.video = document.createElement('video');
					this.video.width = 400;
					this.video.height = 400;
					this.video.autoplay = true;
					this.video.setAttribute('autoplay', '');
					this.video.setAttribute('muted', '');
					this.video.setAttribute('playsinline', '');
				}

				var animate = function () {
                    if (mainScene) {
    					requestAnimationFrame(animate);

                        if (mainScene.width !== mainScene.window.innerWidth ||
                            mainScene.height !== mainScene.window.innerHeight)
                        {
                            mainScene.width = mainScene.window.innerWidth;
                            mainScene.height = mainScene.window.innerHeight;

                            mainScene.onResize();
                        }

    					mainScene.update();
    					mainScene.render();
                    }
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

	function Canvas() {
		Asset.call(this);
		this.name = "Canvas";
		this.type = "Canvas";
	}
	Canvas.prototype = Object.assign(Object.create(Asset.prototype),
		{
			constructor: Canvas,
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
	exports.Canvas = Canvas;
	exports.Plane = Plane;
	exports.Animation = Animation;

	exports.setLogLevel = setLogLevel;
	exports.registerPage = registerPage;
	exports.loadPage = loadPage;

	Object.defineProperty(exports, '__esModule', { value: true });
})));
