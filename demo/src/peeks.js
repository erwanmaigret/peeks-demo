var animationSpeed = 1;
function setAnimationSpeed(speed) {
	animationSpeed = speed;
};

// General logging, 2 == info, 3 == warning, 4 == error
var logLevel = 2;
function setLogLevel(level) {
	logLevel = level;
};
function logVerboseOk() {
    return logLevel <= 0;
}
function logVerbose(message) {
	if (logVerboseOk()) {
		console.log("Peeks (verbose): " + message);
	}
};
function logDebug(message) {
	if (logLevel <= 1) {
		console.log("Peeks (debug): " + message);
	}
};
function logInfo(message) {
	if (logLevel <= 2) {
		console.log("Peeks (info): " + message);
	}
};
function logWarning(message) {
	if (logLevel <= 3) {
		console.log("Peeks (warning): " + message);
	}
};
function logError(message) {
	if (logLevel <= 4) {
		console.log("Peeks (error): " + message);
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
    } else if (arguments.length === 2) {
        // use the first value if defined or the 2nd (default) otherwise
        return arguments[0] || arguments[1];
    } else {
      return [0, 0, 0];
    }
};

utils.v4 = function(x, y, z, w) {
    if (arguments.length === 3) {
        return [x, y, z, 0];
    } else if (arguments.length === 4) {
        return [x, y, z, w];
    } else if (arguments.length === 1) {
        if (arguments[0].length === 3) {
            return [
                arguments[0][0],
                arguments[0][1],
                arguments[0][2]
            ];
        } else if (arguments[0].length === 4) {
	        return [
                arguments[0][0],
                arguments[0][1],
                arguments[0][2],
                arguments[0][3]
            ];
        } else {
            return [arguments[0], arguments[0], arguments[0], 0];
        }
    } else {
      return [0, 0, 0, 0];
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
    } else if (arguments.length === 4) {
        return utils.v4(arguments[0], arguments[1], arguments[2], arguments[3]);
    } else if (arguments.length === 1) {
        if (typeof arguments[0] === 'string' || arguments[0] instanceof String) {
            var rgb = utils.hex2rgb(arguments[0]);
            if (rgb.length === 3) {
                return utils.v3(rgb);
            } else {
                return utils.v4(rgb);
            }
        } else if (arguments[0].length === 3) {
            return utils.v3(arguments[0]);
        } else if (arguments[0].length === 4) {
            return utils.v4(arguments[0]);
        } else {
            return utils.v3(arguments);
        }
    } else {
        return [0, 0, 0];
    }
};

utils.math = {
    euclideanModulo: function (n, m) {
        return ((n % m) + m) % m;
    },
    clamp: function (value, min, max) {
        return Math.max(min, Math.min(max, value));
    },
};

utils.color.hsl = function (h, s, l) {
    function hue2rgb( p, q, t ) {
        if ( t < 0 ) t += 1;
        if ( t > 1 ) t -= 1;
        if ( t < 1 / 6 ) return p + ( q - p ) * 6 * t;
        if ( t < 1 / 2 ) return q;
        if ( t < 2 / 3 ) return p + ( q - p ) * 6 * ( 2 / 3 - t );
        return p;
    }

    // h,s,l ranges are in 0.0 - 1.0
    h = utils.math.euclideanModulo( h, 1 );
    s = utils.math.clamp( s, 0, 1 );
    l = utils.math.clamp( l, 0, 1 );

    if ( s === 0 ) {
        return [l, l, l];
    } else {
        var p = l <= 0.5 ? l * ( 1 + s ) : l + s - ( l * s );
        var q = ( 2 * l ) - p;
        return [
            hue2rgb( q, p, h + 1 / 3 ),
            hue2rgb( q, p, h ),
            hue2rgb( q, p, h - 1 / 3 )
        ];
    }
};

utils.rgba = function() {
    if (arguments.length === 3) {
        return utils.v4(arguments[0], arguments[1], arguments[2], 1);
    } else if (arguments.length === 4) {
        return utils.v4(arguments[0], arguments[1], arguments[2], arguments[3]);
    } else if (arguments.length === 1) {
        if (typeof arguments[0] === 'string' || arguments[0] instanceof String) {
            return utils.v4(utils.hex2rgb(arguments[0]));
        } else if (arguments[0].length === 3) {
            return utils.v4(arguments[0]);
        } else if (arguments[0].length === 4) {
            return utils.v4(arguments[0]);
        } else {
            return utils.v4(arguments);
        }
    } else {
        return [0, 0, 0, 0];
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
	this.type = 'Node';
	this.children = [];
}
Object.assign(Node.prototype, EventDispatcher.prototype,
	{
		add: function (node) {
			node.parent = this;
            node.time = this.time;
			this.children[ this.children.length ] = node;
			return node;
		},

		addPage: function (name) {
			var page = PEEKS.navigateToPage(name);
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
            while (this.children.length > 0) {
                this.children[0].destroy();
            }
		},

		unload: function () {
			this.onUnload();
		},

		addCanvas: function (params) {
			var asset = new PEEKS.Canvas();
			this.applyParams(asset, params);
            return this.add(asset);
		},

        addScreen: function (params) {
			var asset = new PEEKS.Screen();
			this.applyParams(asset, params);
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

        addStateButton: function (params) {
            var asset = this.addButton(params);
            asset.onClick = function() {
                this.toggleButtonState();
            };
            return asset;
        },

        toggleButtonState: function() {
            this.setButtonState(!this.buttonPressed);
        },

        getButtonState: function() {
            return this.buttonPressed;
        },

        setButtonState: function(state) {
            var previousState = this.buttonPressed || false;
            this.buttonPressed = state;
            if (this.buttonPressed !== previousState) {
                if (this.onButtonStateChange) {
                    this.onButtonStateChange(this.buttonPressed);
                }
            }

            // Update the look of the icon
            if (this.buttonPressed) {
                if (!this.selectionIcon) {
                    this.selectionIcon = this.addImage({
                        image:getAsset('images/icon_selected.png')
                    });
                }
            } else {
                if (this.selectionIcon) {
                    this.selectionIcon.destroy();
                    this.selectionIcon = undefined;
                }
            }
        },

        addCube: function (params) {
			var asset = this.addButton(params);
            asset.primitive = Asset.PrimitiveCube;
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

        addRibbon: function (params) {
			var asset = this.addAsset(params);
            asset.primitive = Asset.PrimitiveRibbon;
			return asset;
		},

        addSphere: function (params) {
			var asset = this.addImage(params);
            asset.primitive = Asset.PrimitiveSphere;
			return asset;
		},

        addCurvedPanel: function (params) {
			var asset = this.addButton(params);
            asset.primitive = Asset.PrimitiveCurvedPanel;
            asset.sides = 'back';
			return asset;
		},

        addRing: function (params) {
            var asset = this.addView(params);
            asset.primitive = Asset.PrimitiveRing;
			return asset;
		},

        addDisc: function (params) {
            var asset = this.addView(params);
            asset.primitive = Asset.PrimitiveDisc;
			return asset;
		},

        addSquare: function (params) {
            var asset = this.addAsset(params);
            asset.addView({position: [0, 0, 0]});
			return asset;
		},

        addTextButton: function (params) {
            var asset = this.addButton(params);
            asset.addAttrAlias('viewBgColor', 'colorWhite');
            asset.addAttrAlias('alpha', 'buttonBgAlpha');
            asset.alpha = 0;

            asset.addText({
                position: [0, 0, .01],
            }).addAttrAlias('text', 'label');

            return asset;
        },

        addRoundTextButton: function (params) {
            var asset = this.addButton(params);
            //asset.addAttrAlias('viewBgColor', 'colorWhite');
            //asset.addAttrAlias('alpha', 'buttonBgAlpha');
            asset.primitive = Asset.PrimitiveCircle;
            asset.addAttrAlias('viewBgColor', 'fontColor');

            asset.addText({
                position: [0, 0, .01],
            }).addAttrAlias('text', 'label');

            return asset;
        },

        addIconButton: function (params) {
            var asset = this.addButton(params);
            asset.addAttrAlias('viewBgColor', 'fontColor');
            asset.addAttrAlias('alpha', 'buttonBgAlpha');

            asset.addImage({
                image: params.icon,
            }).addAttrAlias('color', 'fontColor');

            return asset;
        },

        addRoundIconButton: function (params) {
            var asset = this.addIconButton(params);
            asset.primitive = Asset.PrimitiveCircle;

            return asset;
        },

        addVideo: function (params) {
            var asset = this.addButton(params);
			asset.useVideoTexture = true;
            if (params) {
				if (params.url) asset.videoUrl = params.url;
			}
            asset.onClick = function() {
                if (this.video) {
                    if (this.isPlaying) {
                        this.isPlaying = false;
                        this.video.pause();
                    } else {
                        this.isPlaying = true;
                        this.video.play();
                    }
                }
            };
			return asset;
        },

        DOMcreateElementVideo: function(name) {
            this.video = document.createElement(name || 'video');
            this.video.autoplay = true;
            this.video.setAttribute('autoplay', '');
            this.video.setAttribute('playsinline', '');
            if (this.videoUrl === undefined) {
                this.video.width = 512;
                this.video.height = 512;
                this.video.setAttribute('muted', '');
                this.video.setAttribute('id', 'peeksCamera');
            } else {
                var ratio = this.size[0] / this.size[1];
                this.video.width = 512;
                this.video.height = 512 / ratio;
            }
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

        toString: function () {
            var string = this.type;
            if (this.textureUrl) string += ' ' + this.textureUrl;
            if (this.text) string += ' "' + this.text + '"';
            if (this.label) string += ' "' + this.label + '"';
            return string;
		},

		addText: function (params) {
			var asset = this.addView(params);
            this.applyParams(asset, params);
			return asset;
		},

        applyParams: function(asset, params) {
            if (params) {
                for (var key in params) {
                    var setterName = "set" + key.charAt(0).toUpperCase() + key.slice(1);
                    if (asset[setterName] !== undefined) {
                        asset[setterName].call(asset, params[key]);
                    } else {
                        asset[key] = params[key];
                    }
                }
            }
        },

        setAttr: function(name, value) {
            this[name] = value;
        },

        getAttrColor: function(name, value) {
            return utils.color.apply(this, this.getAttr(name, value));
        },

        getAttrRgba: function(name, value) {
            return utils.rgba.apply(this, this.getAttr(name, value));
        },

        getAttr: function(name, value) {
            if (this.style && this.style[name] !== undefined) {
                return this.style[name];
            } else if (this[name] !== undefined) {
                return this[name];
            }

            var alias = this.attrAliases && this.attrAliases[name];
            if (alias) {
                return this.getAttr(alias, value);
            }

            if (this.parent) {
                return this.parent.getAttr(name, value);
            } else {
                return value;
            }
        },

        addAttrAlias: function(name, alias) {
            if (this.attrAliases === undefined) {
                this.attrAliases = {};
            }

            this.attrAliases[name] = alias;

            // For chained calls
            return this;
        },

        initAsset: function (asset, params) {
            this.applyParams(asset, params);
		},

		addView: function (params) {
			var asset = new PEEKS.Plane();
			this.initAsset(asset, params);
			return this.add(asset);
		},

        progressStart: function (message) {
            this.progressStop();

            this.progress = this.addCanvas({
            });

            this.progress.addText({
                size: 1.5,
                text: message,
                fontSize: 30,
            });
        },

        progressStop: function (message) {
            if (this.progress) {
                this.progress.destroy();
                delete this.progress;
            }
        },

        addExternalView: function (url) {
            var page = this.addAsset();
            page.url = url;

            this.url = url;

            page.progressStart('Loading...');

            var menuScreen = page.addScreen({
                radius: 2,
            });

            var screen = page.addScreen({
                radius: 5,
            });

            var itemCount = 0;

            var imageCount = 0;
            var addItem = function(label, href) {
                if (itemCount >= 20) {
                    return;
                }

                var x = Math.floor(itemCount);
                if (x % 2 === 0) {
                    x = -x / 2;
                } else {
                    x = (x + 1) / 2;
                }

                var button = menuScreen.addTextButton({
                    label: label,
                    position: [x / 10, .25, 0],
                    size: [1, .1, 1],
                    fontSize: (label.length > 20) ? 20 : 40,
                    onClick: function() {
                        if (this.href) {
                            var parent = page.parent;
                            if (parent) {
                                parent.addExternalView(this.href);
                                page.destroy();
                            } else {
                                var win = window.open(this.href, '_blank');
                                win.focus();
                            }
                        }
                    }
                });
                button.href = href;
                button.animateInFromFar(itemCount * .1);
                itemCount++;
            };

            var addImage = function(width, height, url, href) {
                if (imageCount >= 20) {
                    return;
                }

                var x = Math.floor(imageCount);
                if (x % 2 === 0) {
                    x = -x / 2;
                } else {
                    x = (x + 1) / 2;
                }
                var button = screen.addButton({
                    image: url,
                    imageDetour: true,
                    position: [x / 10, 0, 0],
                    onClick: function() {
                        if (this.href) {
                            var parent = page.parent;
                            if (parent) {
                                parent.addExternalView(this.href);
                                page.destroy();
                            } else {
                                var win = window.open(this.href, '_blank');
                                win.focus();
                            }
                        }
                    }
                });
                button.href = href;
                //button.animateInFromFar(imageCount * .1);
                imageCount++;
            }

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var data = JSON.parse(this.responseText);
                    if (data.peeks.menu && data.peeks.menu.length > 0) {
                        for (var menuI = 0; menuI < data.peeks.menu.length; menuI++) {
                            var menu = data.peeks.menu[menuI];
                            if (menu.label) {
                                addItem(menu.label, menu.href);
                            }
                        }
                    }
                    if (data.peeks.img && data.peeks.img.length > 0) {
                        for (var itemI = 0; itemI < data.peeks.img.length; itemI++) {
                            var item = data.peeks.img[itemI];
                            addImage(item.width, item.height, item.src, item.href);
                        }
                    }

                    page.progressStop();
                }
            };
            xhttp.open("GET",
                "/scrap?uri=" + encodeURI(url),
                true);
            xhttp.send();
        },

        addRecommendationsView: function () {
            var canvas = this.addCanvas();

            var pane = canvas.addView({
                position: [0, 0],
                size: [1, .6, 1],
                viewBgColor: [.3, .3, .3],
                alpha: 0,
            });

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var data = JSON.parse(this.responseText);

                    var itemCount = 0;
                    if (data && data.pages) {
                        var openPage = function() {
                            if (this.page) {
                                console.log(this.page);
                                if (this.page.url) {
                                    var win = window.open(this.page.url, '_blank');
                                    win.focus();
                                } else if (this.page.page) {
                                    navigateToPage(this.page.page, this);
                                }
                            }
                        };

                        for (var pageI in data.pages) {
                            var page = data.pages[pageI];

                            if (pages[page.name] === undefined) {
                                PEEKS.registerPage({
                                    name: page.name,
                                    url: page.url,
                                });
                            }

                            var fontSize = 50;
                            var animDuration = .5;
                            var animDelay = .3;
                            var animItemDelay = .15;

                            pane.addTextButton({
                                label: page.name,
                                position: [0, .6 - itemCount * .2, 0],
                                size: [.9, .15, 1],
                                onClick: openPage,
                                fontSize: fontSize,
                            }).animate({
                                duration: animDuration,
                                delay: animDelay + animItemDelay * itemCount,
                                begin: [-90, 0, 0],
                                end: [0, 0, 0],
                                attribute: 'rotation'
                            }).page = page;

                            itemCount++;
                        }
                    }
                }
            };
            xhttp.open("GET", "/reco", true);
            xhttp.send();
        },

        getSiteMap: function() {
            if (this.siteMap === undefined) {
                this.siteMap = {
                    menuPath: '',
                    path: '',
                    items: {},
                }
            }
            return this.siteMap;
		},

        setSiteMapMenuPath: function(path) {
            this.getSiteMap().menuPath = path;
        },

        getSiteMapMenuPath: function(path) {
            return this.getSiteMap().menuPath;
        },

        setSiteMapPath: function(path) {
            this.getSiteMap().path = path;
        },

        getSiteMapPath: function(path) {
            return this.getSiteMap().path;
        },

        addSiteMapItem: function(path, content) {
            this.getSiteMap().items[path] = content || {};
		},

        siteMapPathIsLeaf: function(path) {
            var items = this.querySiteMapItemAssets(path);
            if (items.length === 0) {
                return true;
            } else {
                return this.querySiteMapItemAssets(items[0].path).length === 0;
            }
        },

        querySiteMapItem: function (path, item, deep) {
            if (this.siteMap !== undefined) {
                if (item === undefined) {
                    item = this.siteMap.items[path];
                    if (item !== undefined) {
                        return this.querySiteMapItem(path, item, true);
                    }
                } else {
                    var value = {
                    };

                    for (var itemElement in item) {
                        value[itemElement] = item[itemElement];
                    }

                    value.path = path;
                    value.name = item.name || path.split('/').pop();
                    value.description = item.description;
                    value.image = item.icon;
                    value.items = deep ? this.querySiteMapItemAssets(path) : undefined;

                    return value;
                }
            }
        },

        querySiteMapMenuAssets: function (filter) {
            return this.querySiteMapItemAssets(this.getSiteMapMenuPath(), filter);
        },

        querySiteMapAssets: function () {
            return this.querySiteMapItemAssets(this.getSiteMapPath());
        },

        querySiteMapItemAssets: function (path, filter) {
            var assets = [];
            var pathPrefix =
                path !== undefined && path !== ''
                ? path + '/'
                : '';
            for (var key in this.siteMap.items) {
                if (filter && filter !== '' && key.split('/').pop().toLowerCase().search(filter.toLowerCase()) === -1) {
                    continue;
                }
                if (pathPrefix + key.split('/').pop() === key) {
                    assets.push(this.querySiteMapItem(key, this.siteMap.items[key]));
                }
            }
            return assets;
        },

        setAssetPath: function(path) {
            this.assetPath = path;
		},

        getAssetPath: function(url) {
            if (url) {
                var assetPath = assetPath || this.getPage().assetPath;
                if (url.search('://') !== -1 || url.substr(0, 1) === '/') {
                    return url;
                } else {
                    return assetPath + url;
                }
            }
		},

		addAsset: function (params) {
			var asset = new PEEKS.Asset();
			this.initAsset(asset, params);
			return this.add(asset);
		},

		addMesh: function (params) {
			var asset = new PEEKS.Plane();
            asset.primitive = Asset.PrimitiveMesh;
			if (params) {
                asset.name = params.geometry;
				if (params.geometry) asset.setGeometry(params.geometry);
				if (params.texture) asset.setTexture(params.texture);
				this.initAsset(asset, params);
			}
			return this.add(asset);
		},

        initShapeWeights: function() {
            for (var name in this.shapes) {
                if (this.shapes.hasOwnProperty(name)) {
                    this.shapes[name].weightSet = false;
                }
            }
        },

        validateShapeWeights: function() {
            for (var name in this.shapes) {
                if (this.shapes.hasOwnProperty(name)) {
                    var shape = this.shapes[name];
                    if (!shape.weightSet) {
                        if (shape.weightEnd !== 0) {
                            shape.weightSetTime = this.time || 0;
                            shape.weightStart = shape.weightEval;
                            shape.weightEnd = 0;
                            shape.weight = 0;
                        }
                    }
                }
            }
        },

        setShape: function (name, path, weight) {
            if (this.shapes === undefined) {
                this.shapes = {};
            }
            if (this.shapes[name] === undefined) {
                var shape = this.addMesh({ geometry: path });
                shape.name = name;
                shape.hide();
                shape.weightCurrent = 0;
                this.weight = 0;
                this.shapes[name] = shape;
            }
            var weight = weight || 0;
            if (this.shapes[name].weightEnd !== weight) {
                this.shapes[name].weightSetTime = this.time || 0;
                this.shapes[name].weightStart = this.weight;
                this.shapes[name].weightEnd = weight;
            }
            this.shapes[name].weight = weight;
            this.shapes[name].weightSet = true;
		},

        setProperties: function (params) {
            this.applyParams(this, params);
            this.materialNeedsUpdate = true;
        },

		animate: function (params) {
			var anim = this.add(new PEEKS.Animation(params));
            this.initAsset(anim, params);
            if (this.time !== 0) {
                // Evaluate right away in case the animation
                //  is created during an animation loop so it takes
                //  effect immediatelly
                anim.update(this.time);
            }
            return this;
		},

		verbose: function(message) {
			logVerbose(message);
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
function Asset(params) {
	Node.call(this);
    if (params) {
        this.initAsset(this, params);
    }
	this.position = [0, 0, 0];
    this.rotation = [0, 0, 0];
    this.pivotRotation = [0, 0, 0];
	this.rotationOrder = 'XYZ';
	this.size = [1, 1, 1];
	this.updateInitial();
	this.type = 'Asset';
	this.time = 0;
	this.primitive = Asset.PrimitiveNone;
	this.textureUrl = '';
	this.textureBackUrl = '';
	this.textureRepeat = [1, 1];
	this.geomertryUrl = '';
	this.visible = true;
}

Asset.PrimitiveNone = 0;
Asset.PrimitivePlane = 1;
Asset.PrimitiveCube = 2;
Asset.PrimitiveDisc = 3;
Asset.PrimitiveRing = 4;
Asset.PrimitiveCircle = 5;
Asset.PrimitiveSphere = 6;
Asset.PrimitiveCurvedPanel = 7;
Asset.PrimitiveRibbon = 8;
Asset.PrimitiveMesh = 9;
Asset.PrimitiveAnimation = 10;

Asset.prototype = Object.assign(Object.create( Node.prototype ),
	{
		constructor: Asset,

        isInCanvas: function() {
            var parent = this;
            while (parent) {
                if (parent.type === 'Canvas') {
                    return true;
                }
                parent = parent.parent;
            }
            return false;
		},

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

        getPropagatedSize: function() {
            var size = this.size.slice();
            var node = this.parent;
            while (node) {
                size[0] *= node.size[0];
                size[1] *= node.size[1];
                size[2] *= node.size[2];
                node = node.parent;
            }
            return size;
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

        measureText: function(aFont, aSize, aChars, aOptions) {
            // if you do pass aOptions.ctx, keep in mind that the ctx properties will be changed and not set back. so you should have a devoted canvas for this
            // if you dont pass in a width to aOptions, it will return it to you in the return object
            // the returned width is Math.ceil'ed

            aOptions = aOptions || {};
            aOptions.range = aOptions.range || 3; // multiples the aSize by this much

            if (aChars === '') {
                // no characters, so obviously everything is 0
                return {
                    relativeBot: 0,
                    relativeTop: 0,
                    height: 0,
                    width: 0
                };
                // otherwise i will get IndexSizeError: Index or size is negative or greater than the allowed amount error somewhere below
            }

            var can;
            var ctx;
            if (!aOptions.canAndCtx) {
                can = document.createElement('canvas');
                can.mozOpaque = 'true'; // improved performanceo on firefox i guess
                ctx = can.getContext('2d');

                // can.style.position = 'absolute';
                // can.style.zIndex = 10000;
                // can.style.left = 0;
                // can.style.top = 0;
                // document.body.appendChild(can);
            } else {
                can = aOptions.canAndCtx.can;
                ctx = aOptions.canAndCtx.ctx;
            }

            var w = aOptions.width;
            if (!w) {
                ctx.textBaseline = 'alphabetic';
                ctx.textAlign = 'left';
                ctx.font = aFont;
                w = ctx.measureText(aChars).width;
            }

            w = Math.ceil(w); // needed as i use w in the calc for the loop, it needs to be a whole number

            // must set width/height, as it wont paint outside of the bounds
            can.width = w;
            can.height = aSize * aOptions.range;

            ctx.font = aFont; // need to set the .font again, because after changing width/height it makes it forget for some reason
            ctx.textBaseline = 'alphabetic';
            ctx.textAlign = 'left';

            ctx.fillStyle = 'white';

            var avgOfRange = (aOptions.range + 1) / 2;
            var yBaseline = Math.ceil(aSize * avgOfRange);

            ctx.fillText(aChars, 0, yBaseline);

            var yEnd = aSize * aOptions.range;

            var data = ctx.getImageData(0, 0, w, yEnd).data;

            var botBound = -1;
            var topBound = -1;

            // measureHeightY:
            for (var y=0; y<=yEnd; y++) {
                for (var x = 0; x < w; x += 1) {
                    var n = 4 * (w * y + x);
                    var r = data[n];
                    var g = data[n + 1];
                    var b = data[n + 2];
                    // var a = data[n + 3];

                    if (r+g+b > 0) { // non black px found
                        if (topBound == -1) {
                            topBound = y;
                        }
                        botBound = y; // break measureHeightY; // dont break measureHeightY ever, keep going, we till yEnd. so we get proper height for strings like "`." or ":" or "!"
                        break;
                    }
                }
            }

            return {
                relativeBot: botBound - yBaseline, // relative to baseline of 0 // bottom most row having non-black
                relativeTop: topBound - yBaseline, // relative to baseline of 0 // top most row having non-black
                height: (botBound - topBound) + 1,
                width: w// EDIT: comma has been added to fix old broken code.
            };
        },

        createTextTexture: function() {
			var document = this.getDocument();
			if (document) {
                var size = 2 * this.getAttr('fontSize');
                var text = this.getAttr('text');
                var color = this.getAttrRgba('fontColor');
                var texture = {};
				texture.canvas = document.createElement('canvas');
				texture.context = texture.canvas.getContext('2d');
                var font = size.toString() + 'px ' + this.getAttr('fontName');
                texture.context.font = font;
                var measure = this.measureText(font, size, text);
				var width = measure.width;
                var height = measure.height;
                var canvasWidth = 2;
                var canvasHeight = 2;
                while (canvasWidth < width) {
                    canvasWidth *= 2;
                }
                while (canvasHeight < height) {
                    canvasHeight *= 2;
                }
                canvasHeight *= 2;
				texture.canvas.width = canvasWidth;
				texture.canvas.height = canvasHeight;
                texture.context.clearRect(0, 0, canvasWidth, canvasHeight);
                var yOffset = (canvasHeight - height) / 2 + (height / 2);
                var xOffset;
                switch (this.textAlign) {
                    case 'left': {
                        xOffset = 0;
                        break;
                    }
                    case 'right': {
                        xOffset = canvasWidth - width;
                        break;
                    }
                    default: {
                        xOffset = (canvasWidth - width) / 2;
                        break;
                    }
                }
                // Force it to be centered and let the caller adjust position if needed
                xOffset = (canvasWidth - width) / 2;
                yOffset = canvasHeight / 2;

                var bgColor = this.getAttrRgba('fontBgColor');
                texture.context.fillStyle = 'rgba(' +
                    Math.round(bgColor[0] * 255) + ',' +
                    Math.round(bgColor[1] * 255) + ',' +
                    Math.round(bgColor[2] * 255) + ',' +
                    Math.round(bgColor[3] * 255) + ')';
                texture.context.fillRect(xOffset, yOffset + measure.relativeTop, width, height);

                // Set it again now to make sure it's properly applied
                //  previous operations will have reset this value
                texture.context.font = font;
                texture.context.fillStyle = 'rgba(' +
                    Math.round(color[0] * 255) + ',' +
                    Math.round(color[1] * 255) + ',' +
                    Math.round(color[2] * 255) + ',' +
                    Math.round(color[3] * 255) + ')';
                texture.context.fillText(text, xOffset, yOffset);

                // Always have an outline so text are always readable
                var outlineStyle = this.getAttr('fontOutlineStyle');
                if (outlineStyle && outlineStyle !== '') {
                    texture.context.strokeStyle = outlineStyle;
                    texture.context.lineWidth = 2;
                    texture.context.strokeText(text, xOffset, yOffset);
                }

                var fontScale = this.getPropagatedSize();
                var scale = 1;
                if (fontScale[0] > fontScale[1]) {
                    scale = 1 / fontScale[0];
                } else {
                    scale = 1 / fontScale[1];
                }

                texture.textSize = [width * scale, height * scale];
                texture.size = [canvasWidth * scale, canvasHeight * scale];
                texture.relativeTop = measure.relativeTop * scale;
                texture.relativeBot = measure.relativeBot * scale;
				return texture;
			} else {
				this.logError("Can't draw text in empty texture");
			}
		},

		getTexture: function() {
			return this.textureUrl;
		},

        setTexture: function(url) {
			this.textureUrl = url;
            return this;
		},

		setTextureBack: function(url) {
			this.textureBackUrl = url;
		},

		setGeometry: function(url) {
			this.geometryUrl = url;
		},

        onUpdate: function() {
        },

		update: function(time) {
			if (time == undefined) {
				time = (Date.now() - startTime) / 1000;
			}

            this.onUpdate(time);

            this.timeLast = this.time;
			this.time = time;
			this.resetToInitial();
			for (var childI = 0; childI < this.children.length; childI++) {
				this.children[childI].update(time);
			}

            if (this.speed !== undefined && this.speed !== 0 && this.timeLast !== undefined) {
                if (this.speedOffset === undefined) {
                    this.speedOffset = [0, 0, 0];
                }

                var camera = this.getCamera();
                if (this === camera) {
                    var zOffset = -this.speed * (time - this.timeLast);
                    var offset = this.getScene().onGetCameraTranslation([0, 0, zOffset]);
                    this.speedOffset = [
                        this.speedOffset[0] + offset[0],
                        this.speedOffset[1] + offset[1],
                        this.speedOffset[2] + offset[2]
                    ];
                }
            }

            if (this.speedOffset !== undefined) {
                this.position[0] += this.speedOffset[0];
                this.position[1] += this.speedOffset[1];
                this.position[2] += this.speedOffset[2];
            }

            if (this.shapes) {
                for (var shapeName in this.shapes) {
                    if (this.shapes.hasOwnProperty(shapeName)) {
                        var shape = this.shapes[shapeName];
                        if (shape.weight !== shape.weightEval) {
                            var duration = this.time - shape.weightSetTime;
                            var blend = (duration > .5) ? 1 : duration / .5;
                            shape.weightEval = blend * shape.weightEnd + (1 - blend) * shape.weightStart;
                        }
                    }
                }
            }
		},

        raise: function(method) {
            if (method) {
                if (typeof method === 'string') {
                    method = this[method] || this.getScene()[method];
                }
                if (method) {
                    method.apply(this);
                }
            }
        },

		render: function() {
			this.onRender();
		},

        onRender: function() {
		},

        onUpdateSiteMapPath: function() {
		},

        getScene: function() {
			var scene = this;
			while (scene && scene.type != 'Scene') {
				scene = scene.parent;
			}
			return scene;
		},

        getPage: function() {
            var page = this;
			while (page && page.type != 'Page') {
				page = page.parent;
			}
			return page;
		},

        getScreen: function() {
			var screen = this;
			while (screen && screen.type != 'Screen') {
				screen = screen.parent;
			}
			return screen;
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

        setVisible: function(visible) {
			this.visible = visible;
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
				begin: [0, 0, 0],
				end: [0, 180, 0],
				attribute: 'rotation'
			});
		},

        animateRotate90: function() {
			this.animate({
                duration: 1,
                begin: [0, 0, 0],
                end: [0, 90, 0],
				attribute: 'rotation'
			});
		},

        animateFocusStart: function() {
            this.animate({
				duration: .3,
                begin: [1, 1, 1],
                end: [1.05, 1.05, 1.05],
				attribute: 'size'
			});
            this.animate({
				duration: .3,
                begin: [0, 0, 0],
                end: [0, 0, 0.001],
				attribute: 'position'
			});
		},

        animateFocusEnd: function() {
            this.animate({
				duration: .3,
                begin: [1, 1, 1],
                end: [1 / 1.05, 1 / 1.05, 1 / 1.05],
				attribute: 'size'
			});
            this.animate({
				duration: .3,
                begin: [0, 0, 0],
                end: [0, 0, -0.001],
				attribute: 'position'
			});
		},

        animateClick: function() {
			this.animate({
				duration: .4,
				p0: [1, 1, 1],
				p1: [1.1, 1.1, 1.1],
				p2: [1.1, 1.1, 1.1],
				p3: [1, 1, 1],
				attribute: 'size'
			});
            /*
			this.animate({
				duration: .5,
				p0: [0, 0, 0],
				p1: [0, 0, 5],
				p2: [0, 0, -5],
				p3: [0, 0, 0],
				attribute: 'rotation'
			});
            */
		},

        animateInFromFar: function(delay) {
            if (delay === undefined) {
                delay = 0;
            }
            this.animate({
                duration: .5,
                delay: delay,
                begin: [0, 0, -100],
                end: [0, 0, 0],
                attribute: 'position'
            });
        },

        clearAnimations: function() {
            for (var childI = this.children.length - 1; childI >= 0;
                childI--)
            {
                if (this.children[childI].primitive ===
                    Asset.PrimitiveAnimation)
                {
                    this.children.splice(childI, 1);
                    break;
                }
            }
        },

        clearChildren: function() {
            while (this.children.length > 0) {
                this.children[0].destroy();
            }
        },
	}
);

function Camera( ) {
	Asset.call(this);
    this.rotationOrder = 'ZYX';
    this.type = 'Camera';
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

var extensions = {
};

function registerExtension(name, extension, onLoad) {
    if (extensions[name] === undefined) {
        extensions[name] = {
            listeners: [],
        };

        if (name === 'cv') {
            loadScript("/js/cv/wasm/opencv.js", function() { } );
        }
    }

    if (onLoad) {
        if (extensions[name].extension) {
            onLoad(extensions[name].extension);
        } else {
            extensions[name].listeners.push(onLoad);
        }
    }

    if (extension && extensions[name].extension === undefined) {
        extensions[name].extension = extension;
        for (var listenerI = 0; listenerI < extensions[name].listeners.length; listenerI++) {
            extensions[name].listeners[listenerI](extension);
        }
    }
}

function getExtension(name) {
    return registerExtension(name).extension;
}

function addExtensionListener(name, listener) {
    return registerExtension(name, undefined, listener);
}

function cvSupported() {
    if (!window.WebAssembly) {
        console.log("Your web browser doesn't support WebAssembly");
        return false;
    }

    return true;
}

var pages = {};
function registerPage(name, ctor) {
    if (ctor) {
        pages[name] = ctor;
    } else {
        var params = name;
        var pageName = params.name;
        var pageCategory = params.category || 'fashion';
        var pageUrl = params.url || '';

        registerPage(pageName, function() {
        	var page = new PEEKS.Asset({
                title: pageName,
                category: pageCategory || 'fashion',
            });

            page.addExternalView(pageUrl);

            page.addPage('peeks.toolbar');

            return page;
        });
    }
}

function loadScript(src, callback)
{
    var read = false;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.onload = script.onreadystatechange = function() {
        if (!read && (!this.readyState || this.readyState == 'complete')) {
            read = true;
            if (callback) {
                callback();
            }
        }
    };
    var node = document.getElementsByTagName('script')[0];
    node.parentNode.insertBefore(script, node);
}

function start(domElement, page) {
    var peeks = new PEEKS.Scene();
    peeks.start(domElement, page);
}

function getAsset(name) {
    //return "http://52.25.54.6/?url=http://dev.peeks.io/" + name;
    return "https://dev.peeks.io/" + name;
}

window.dataLayer = window.dataLayer || [];
var doAnalytics = true;
function analytics() {
    if (doAnalytics) {
        dataLayer.push(arguments);
    }
}

function navigateToPage(name, scene) {
	if (pages[name]) {
		var page = pages[name](scene);
		page.name = name;

        if (page.onLoad) {
            logDebug('Calling onLoad on page ' + name);
            page.onLoad(scene);
        }

		return page;
	} else {
		logError("Can't load unregistered page " + name);
	}
}

function isPhone() {
    var userAgent = navigator.userAgent.toLowerCase();
    var value =
        userAgent.search('iphone') !== -1 ||
        userAgent.search('ipod') !== -1 ||
        userAgent.search('android') !== -1;
    return value;
}

function Scene() {
	Asset.call(this);
	this.camera = this.add(new Camera());
	this.mouseDownTime = 0;
	this.type = 'Scene';
    this.ground = this.add(new PEEKS.Asset());
    this.background = this.add(new PEEKS.Asset());
    this.arAsset = this.add(new PEEKS.Asset());

    var userAgent = navigator.userAgent.toLowerCase();
    this.isPhone =
        userAgent.search('iphone') !== -1 ||
        userAgent.search('ipod') !== -1 ||
        userAgent.search('android') !== -1;

    this.gyroscope = this.isPhone;
    this.vrMode = false;

	this.pagesHistory = []; // Make this the default first page
	this.pageIndex = -1;
	this.style = {
        viewBgColor: [1, 1, 1],
        viewBgAlpha: .2,
        buttonBgAlpha: 1,
        bgColor: [0, 0, 0],
        fontSize: 12,
        fontBgColor: [1, 1, 1, 0],
        fontColor: [1, 1, 1],
        fontName: 'Futura',
        fontOutlineStyle: 'grey',
        valign: 'center',
        align: 'center',
        colorDark:   [   0 / 255, 100 / 255,   0 / 255],
        //colorMedium: [  81 / 255, 200 / 255,  100 / 255],
        colorMedium:  [ 255 / 255, 255 / 255, 255 / 255],
        colorLight:  [ 173 / 255, 255 / 255, 223 / 255],
        colorBlack:  [   0 / 255,   0 / 255,   0 / 255],
        colorGrey:   [  80 / 255,  80 / 255,  80 / 255],
        colorWhite:  [ 255 / 255, 255 / 255, 255 / 255],
	};
}
Scene.prototype = Object.assign(Object.create( Asset.prototype ),
	{
		constructor: Scene,

        convertMouse: function(mouseX, mouseY) {
            var rect = this.domElement.getBoundingClientRect();
            var x = mouseX;
            var y = mouseY;
            var pointX = x - rect.left;
            var pointY = y - rect.top;
            pointX = pointX / rect.width;
            pointY = pointY / rect.height;
            if (this.isVrMode()) {
                if (pointX > .5) {
                    pointX -= .5;
                }
                pointX *= 2;
            }
            return [pointX * 2 - 1, -pointY * 2 + 1];
		},

        isVrMode: function() {
            return this.vrMode;
        },

        isGyroMode: function() {
            return this.isVrMode() || this.gyroscope;
        },

		getMouse: function(event) {
            if (event === undefined) {
                return [0, 0];
            } else if (event.touches) {
				if (event.touches.length > 0) {
					return this.convertMouse(event.touches[0].clientX, event.touches[0].clientY);
				}
			} else {
				return this.convertMouse(event.clientX, event.clientY);
			}
		},

		onPickNode: function(mouse) {
            analytics('event', 'scene.onPickNode');
			logDebug('onPickNode');
		},

        computeOffsetFromCamera: function(offset) {
            var offset = this.onGetCameraTranslation(offset);
            return [
                this.camera.position[0] + offset[0],
                this.camera.position[1] + offset[1],
                this.camera.position[2] + offset[2]
            ];
        },

        getCameraQuaternion: function() {
            return this.onGetCameraQuaternion();
        },

        onGetCameraQuaternion: function() {
            return [0, 0, 0, 1];
        },

        onGetCameraTranslation: function(translation) {
            return [
                translation[0],
                translation[1],
                translation[2]
            ];
        },

        touchPinch: function(event) {
            if (event.targetTouches && event.changedTouches) {
                if (event.targetTouches.length == 2 &&
                    event.changedTouches.length == 2)
                {
                    var p0 = this.convertMouse(
                        event.touches[0].clientX,
                        event.touches[0].clientY);
                    var p1 = this.convertMouse(
                        event.touches[1].clientX,
                        event.touches[1].clientY);
                    var distance = Math.sqrt(
                        (p0[0] - p1[0]) * (p0[0] - p1[0]) +
                        (p0[1] - p1[1]) * (p0[1] - p1[1]));

                    if (this.mousePinchStartDistance === 0) {
                        this.mousePinchStartDistance = distance;
                        this.mousePinchStartPosition = this.camera.position.slice();
                    } else {
                        distance = this.mousePinchStartDistance - distance;

                        this.camera.setPosition(this.mousePinchStartPosition);

                        var offset =
                            this.onGetCameraTranslation([0, 0, distance * 2]);

                        this.camera.setPosition([
                            this.mousePinchStartPosition[0] + offset[0],
                            this.mousePinchStartPosition[1] + offset[1],
                            this.mousePinchStartPosition[2] + offset[2]
                        ]);
                    }

                    this.mouseDownCanMove = false;
                    return true;
                }
            }
        },

        onFocusChange: function (event) {
            var asset = this.onPickNode(this.getMouse(event));
            if (this.assetOver) {
                if (asset !== this.assetOver) {
                    if (this.assetOver.onFocus !== undefined) {
                        // should apply this custom focus method yet TBD
                    } else {
                        this.assetOver.animateFocusEnd();
                    }
                    delete this.assetOver;
                }
            }
            if (asset && asset.onClick && asset !== this.assetOver) {
                this.assetOver = asset;
                if (asset.onFocus !== undefined) {
                    // should apply this custom focus method yet TBD
                } else {
                    asset.animateFocusStart();
                }
            }
        },

		onMouseMove: function (event) {
			if (this.mouseDown) {
                event.preventDefault();
                if (this.touchPinch(event)) {
                    this.mouseDownCanClick = false;
                }

                if (this.mouseDownCanMove) {
					this.mouseMove = this.getMouse(event);
					this.mouseMoveTime = this.time;
					var mouseMove = utils.v2Distance(this.mouseMove, this.mouseDown);
					if (mouseMove > .01) {
						this.mouseDownCanClick = false;
						if (this.mouseDownCameraRotation) {
							this.camera.initialRotation = [
								this.mouseDownCameraRotation[0] -
                                    (this.mouseMove[1] - this.mouseDown[1]) * 45,
								this.mouseDownCameraRotation[1] +
                                    (this.mouseMove[0] - this.mouseDown[0]) * 45,
								this.mouseDownCameraRotation[2]
							];
						}
					}
                }
			} else if (!this.isVrMode()) {
                this.onFocusChange(event);
            }
		},

		onMouseDown: function (event) {
			logVerbose('onMouseDown');
            event.preventDefault();

			this.mouseDown = this.getMouse(event);
			this.mouseDownCameraRotation = this.camera.initialRotation.slice();
            this.mouseDownCanClick = true;
            this.mouseDownCanMove = true;
            this.mousePinchStartDistance = 0;
			this.mouseDownTime = this.time;

            if (this.isVrMode()) {
                this.onMouseUp(event);
            }
		},

		onMouseUp: function (event) {
			if (this.mouseDown) {
                logVerbose('onMouseUp');
                event.preventDefault();
				if (this.mouseDownCanClick) {
					this.mouseUp = this.getMouse(event);
					if (this.mouseUp === undefined) {
						this.mouseUp = this.mouseMove;
					}
					if (this.mouseUp === undefined) {
						this.mouseUp = this.mouseDown;
					}

                    this.mouseUpTime = this.time;

                    var mouseDown = this.mouseDown;
                    var mouseUp = this.mouseUp;
                    var delay = this.mouseUpTime - this.mouseDownTime;
                    if (this.isVrMode()) {
                        mouseDown = [0, 0];
                        mouseUp = [0, 0];
                        // VR devices are less responsive on click than
                        //  regular finger tap
                        delay *= 4;
                    }
                    var distance = utils.v2Distance(mouseUp, mouseDown);
                    if (distance < .05 && delay < .3) {
						this.onClick(mouseUp);
					}
				}
				delete this.mouseDown;
                delete this.mouseMove;
			}
		},

		onClick: function (mouse) {
			var asset = this.onPickNode(mouse);
			if (asset) {
                analytics('event', 'scene.onClick');
    			logDebug('onClick' + (asset.name ? (' on ' + asset.name) : ''));

				if (asset.onClick) {
					//asset[`animateClick`]();
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

                return true;
			}
		},

		onKeyDown: function (event) {
            analytics('event', 'scene.onKeyDown');
            logDebug('onKeyDown');

			event.preventDefault();

			var manipFactor = event.shiftKey ? .1 : 1;
			var animAttribute;
			var animValue;
            var isVehicle = this.page && this.page.navigation === 'vehicle';
			switch (event.keyCode) {
				case 37: { // Arrow Left
					if (event.altKey) {
                        animAttribute = 'position';
						animValue = this.onGetCameraTranslation([-manipFactor, 0, 0]);
					} else {
                        animAttribute = 'rotation';
						animValue = [0, manipFactor * 20, 0];
					}
                    break;
                }
				case 38: { // Arrow Up
                    var isPosition = event.altKey;
                    if (isVehicle) isPosition = !isPosition;
					if (isPosition) {
                        animAttribute = 'position';
						animValue = this.onGetCameraTranslation([0, 0, -manipFactor]);
					} else {
                        animAttribute = 'rotation';
						animValue = [manipFactor * 20, 0, 0];
					}
    		        break;
    		    }
				case 39: { // Arrow Right
					if (event.altKey) {
                        animAttribute = 'position';
						animValue = this.onGetCameraTranslation([manipFactor, 0, 0]);
					} else {
                        animAttribute = 'rotation';
						animValue = [0, -manipFactor * 20, 0];
					}
    		        break;
    		    }
				case 40: { // Arrow Down
                    var isPosition = event.altKey;
                    if (isVehicle) isPosition = !isPosition;
					if (isPosition) {
                        animAttribute = 'position';
						animValue = this.onGetCameraTranslation([0, 0, manipFactor]);
					} else {
                        animAttribute = 'rotation';
						animValue = [-manipFactor * 20, 0, 0];
					}
    		        break;
    		    }
			}

			var target = this.camera;
			if (target) {
				if (animAttribute && animValue) {
					target.add(new PEEKS.Animation({
						duration: 1,
						begin: [0, 0, 0],
						end: animValue,
						attribute: animAttribute
					}));
				}
			}
		},

		onKeyUp: function (event) {
            analytics('event', 'scene.onKeyUp');
			logDebug('onKeyUp');
            event.preventDefault();
		},

		onMouseWheel: function (event) {
            logDebug('onMouseWheel');
			event.preventDefault();
            var position = this.camera.position;
            var offset = this.onGetCameraTranslation([0, 0, event.deltaY * .01]);
            this.camera.setPosition([
                position[0] + offset[0],
                position[1] + offset[1],
                position[2] + offset[2]
            ]);
		},

        onStart: function () {
		},

        onResize: function () {
		},

		onAnimate: function () {
		},

		onSynch: function () {
		},

        getPage: function() {
			return this.page;
		},

        toggleGyroscope: function() {
            analytics('event', 'scene.toggleGyroscope');
			this.gyroscope = !this.gyroscope;
		},

        toggleArMode: function() {
            analytics('event', 'scene.toggleArMode');
			this.setArMode(!this.arMode);
		},

        open2D: function() {
            if (this.page && this.page.url) {
                var win = window.open(this.page.url, '_blank');
                win.focus();
            }
		},

        onShowSiteMapMenu: function() {
            this.showSiteMapMenu();
        },

        showSiteMapMenu: function(filter) {
            if (this.page && this.page.siteMapMenu === undefined) {
                analytics('event', 'scene.showSiteMapMenu');
                this.page.siteMapMenu = this.page.addAsset();
            }
            this.refreshSiteMapMenu(filter);
        },

        refreshSiteMapMenu: function(filter) {
            if (this.page && this.page.siteMapMenu) {
                var page = this.page;

                var onClose = function() {
                    page.getScene().hideKeyboard();
                    page.getScene().hideSiteMapMenu();
                    page.onUpdateSiteMapPath();
                };

                var onClickSiteMapItem = function() {
                    if (page.siteMapPathIsLeaf(this.path)) {
                        page.setSiteMapPath(this.path);
                    } else {
                        page.setSiteMapMenuPath(this.path);
                    }
                    analytics('event', 'scene.onClickSiteMapMenuItem');
                    onClose();
                };

                var animateIn = true;
                if (this.page.siteMapMenu.items) {
                    for (var itemI = 0; itemI < this.page.siteMapMenu.items.length; itemI++) {
                        this.page.siteMapMenu.items[itemI].destroy();
                    }
                    animateIn = false;
                }

                this.page.siteMapMenu.items = [];

                var sphere = page.siteMapMenu.addSphere({
                    position: [0, 0, 0],
                    rotation: [0, 0, 0],
                    sides: 'back',
                    size: 4,
                    alpha: .96,
                    onClick: onClose,
                });
                this.page.siteMapMenu.items.push(sphere);

                var menuScreen = page.siteMapMenu.addScreen({
                    radius: 3,
                });
                this.page.siteMapMenu.items.push(menuScreen);

                var itemStep = .055;

                var items = this.page.querySiteMapMenuAssets(filter);
                if (items) {
                    var itemCount = items.length;
                    for (var itemI = 0; itemI < itemCount; itemI++) {
                        var item = items[itemI];
                        var xIndex = itemI;
                        var yOffset = .2;
                        while (xIndex >= 3) {
                            yOffset -= .1;
                            xIndex -= 3;
                        }
                        var xOffset = (xIndex % 2 === 0) ? (-xIndex * itemStep) : (xIndex + 1) * itemStep;
                        var asset = menuScreen.addButton({
                            position: [animateIn ? .5 : xOffset, yOffset, 0],
                            size: [.5, .2, 1],
                            path: item.path,
                            viewBgColor: [.98, .98, .98],
                            alpha: 0,
                            onClick: onClickSiteMapItem,
                        });

                        asset.addText({
                            position: [0, 0, .01],
                            fontSize: 48,
                            text: item.name,
                        });

                        if (animateIn) {
                            asset.animate({
                                duration: .6,
                                delay: 0,
                                begin: [0, 0, 0],
                                end: [xOffset - .5, 0, 0],
                                attribute: 'position'
                            });
                        }
                    }
                }
            }
        },

        hideSiteMapMenu: function() {
            if (this.page && this.page.siteMapMenu) {
                analytics('event', 'scene.hideSiteMapMenu');
                this.page.siteMapMenu.destroy();
                this.page.siteMapMenu = undefined;
            }
        },

        showKeyboard: function(params) {
            if (params === undefined) {
                    params = {};
            }

            analytics('event', 'scene.showKeyboard');

            if (this.keyboard === undefined) {
                this.keyboard = this.addAsset();

                var canvas = this.keyboard.addCanvas({
                    valign: 'bottom',
                });

                var bg = canvas.addView({
                    position: [0, -.35],
                    size: [1, .3, 1],
                    viewBgColor: [0, 0, 0],
                });

                var fontSize = 28;

                bg.textInput = '';

                var onRefresh = function () {
                    if (bg.textEntry !== undefined) {
                        bg.textEntry.destroy();
                    }
                    bg.textEntry = bg.addText({
                        position: [
                            0,
                            .5 - (0 + .5) / keys.length
                        ],
                        fontSize: fontSize,
                        fontOutlineStyle: '',
                        fontColor: bg.textInput === '' ? [.4, .4, .4] : [1, 1, 1],
                        text: bg.textInput !== ''
                            ? bg.textInput
                            : (params.style === 'email')
                                ? '<enter email>'
                                : '<type some text>',
                        size: [1, 1 / keys.length, 1],
                    });
                    if (params.onUpdate) {
                        params.onUpdate.call(bg.getScene(), bg.textInput);
                    }
                };

                var onBack = function () {
                    if (bg.textInput.length > 0) {
                        bg.textInput = bg.textInput.substring(
                            0, bg.textInput.length - 1);
                    }
                    onRefresh();
                };

                var onEnterPressed = function () {
                    if (params.onEnter) {
                        params.onEnter.call(bg.getScene(), bg.textInput);
                    }
                    this.getScene().hideKeyboard();
                };

                var onShift = function () {
                    for (var widgetI = 0;
                        widgetI < bg.keyWidgets.length;
                        widgetI++)
                    {
                        bg.keyWidgets[widgetI].animateFlip();
                    }
                };

                var onAdd = function (key) {
                    if (key === undefined && this !== undefined) {
                        key = this.input;
                    }
                    bg.textInput = bg.textInput + key;
                    onRefresh();
                };

                var keys = [
                    [],
                    [
                        '',
                        { text: '1', textBack: '!'},
                        { text: '2', textBack: '@'},
                        { text: '3', textBack: '#'},
                        { text: '4', textBack: '$'},
                        { text: '5', textBack: '%'},
                        { text: '6', textBack: '^'},
                        { text: '7', textBack: '&'},
                        { text: '8', textBack: '*'},
                        { text: '9', textBack: '('},
                        { text: '0', textBack: ')'},
                        '',
                        '',
                        '',
                    ],
                    [
                        '',
                        { text: 'q', textBack: 'Q'},
                        { text: 'w', textBack: 'W'},
                        { text: 'e', textBack: 'E'},
                        { text: 'r', textBack: 'R'},
                        { text: 't', textBack: 'T'},
                        { text: 'y', textBack: 'Y'},
                        { text: 'u', textBack: 'U'},
                        { text: 'i', textBack: 'I'},
                        { text: 'o', textBack: 'O'},
                        { text: 'p', textBack: 'P'},
                        { label: 'back', onClick: onBack },
                        '',
                        '',
                    ],
                    [
                        '',
                        { text: 'a', textBack: 'A'},
                        { text: 's', textBack: 'S'},
                        { text: 'd', textBack: 'D'},
                        { text: 'f', textBack: 'F'},
                        { text: 'g', textBack: 'G'},
                        { text: 'h', textBack: 'H'},
                        { text: 'j', textBack: 'J'},
                        { text: 'k', textBack: 'K'},
                        { text: 'l', textBack: 'L'},
                        { text: ';', textBack: ':'},
                        { text: "'", textBack: '"'},
                        {
                            label: (params.style === 'email')
                                ? 'send'
                                : 'enter',
                            onClick: onEnterPressed
                        },
                        '',
                    ],
                    [
                        '',
                        { text: 'z', textBack: 'Z'},
                        { text: 'x', textBack: 'X'},
                        { text: 'c', textBack: 'C'},
                        { text: 'v', textBack: 'V'},
                        { text: 'b', textBack: 'B'},
                        { text: 'n', textBack: 'N'},
                        { text: 'm', textBack: 'M'},
                        { text: ',', textBack: '<'},
                        { text: '.', textBack: '>'},
                        { text: '/', textBack: '?'},
                        '',
                        '',
                        '',
                    ],
                    [
                        '', '', '',
                        { label: 'shift', onClick: onShift },
                        '',
                        { label: 'space', text: ' ', },
                        (params.style === 'email') ? { text: '@', } : '',
                        { text: 'v', onClick: 'hideKeyboard' },
                        '', '', '',
                    ],
                ];

                bg.keyWidgets = [];

                var fontColor = [.8, .8, .8];

                for (var y = 0; y < keys.length; y++) {
                    var row = keys[y];
                    for (var x = 0; x < row.length; x++) {
                        var entry = row[x];
                        var text = undefined;
                        var label = undefined;
                        var textBack = undefined;
                        var onClick = undefined;
                        if (typeof(entry) === 'string') {
                            text = entry;
                            label = entry;
                        } else {
                            text = entry.text;
                            label = entry.label || text;
                            textBack = entry.textBack;
                            onClick = entry.onClick;
                        }

                        if (onClick === undefined &&
                            text !== undefined &&
                            text.length === 1)
                        {
                            onClick = onAdd;
                        }
                        var shift = (y % 2) === 0 ? .5 : 0;
                        var widget = bg.addTextButton({
                            position: [
                                (x + .5 + shift) / row.length - .5,
                                .5 - (y + .5) / keys.length
                            ],
                            fontSize: fontSize,
                            fontColor: fontColor,
                            input: text,
                            text: label,
                            size: [1 / row.length, .9 * 1 / keys.length, 1],
                            onClick: onClick,
                        });
                        if (entry.textBack) {
                            widget.addTextButton({
                                rotation: [0, 180, 0],
                                fontSize: fontSize,
                                fontColor: fontColor,
                                input: entry.textBack,
                                text: entry.textBack,
                                onClick: onClick,
                            });
                            bg.keyWidgets.push(widget);
                        }
                    }
                }
                onRefresh();
                bg.animate({
                    duration: .5,
                    begin: [0, -.3, 0],
                    end: [0, 0, 0],
                    attribute: 'position'
                })
            }
		},

        hideKeyboard: function() {
            if (this.keyboard) {
                analytics('event', 'scene.hideKeyboard');
                this.keyboard.destroy();
                this.keyboard = undefined;
            }

            // In case:
            this.hideSiteMapMenu();
		},

        getArView: function() {
            return this.arView;
        },

        getArImageData: function() {
            if (this.arView && this.arView.video) {
                if (this.arView.canvas === undefined) {
                    this.arView.canvas = document.createElement('canvas');
                    this.arView.canvas.width = this.arView.video.width;
                    this.arView.canvas.height = this.arView.video.height;
                }

                if (this.arView.canvasUpdated) {
                    var context = this.arView.canvas.getContext('2d');
                    this.arView.canvasUpdated = false;
                    return context.getImageData(0, 0, this.arView.canvas.width, this.arView.canvas.height);
                }
            }
        },

		setArMode: function(state) {
			if (state === undefined) {
				state = true;
			}
            if (state === this.arMode) {
                return;
            }
			if (state) {
                this.DOMarGetElement();
				this.arView.show();
			} else {
				if (this.arView) {
					this.arView.hide();
				}
			}
			this.arMode = state;
            if (this.arMode) {
                analytics('event', 'scene.setArModeOn');
                this.setVrMode(false);
            } else {
                analytics('event', 'scene.setArModeOff');
            }
            this.gyroscope = this.arMode;
		},

        DOMarGetElement: function() {
            if (!this.arView) {
                var canvas = this.arAsset.addCanvas({
                    // Leave it centered, this is if we want it bottom aligned
                    //valign: 'bottom',
                });
                var asset = new PEEKS.Plane();
                asset.useVideoTexture = true;
                canvas.add(asset);
                this.arView = canvas;
                this.arView.name = 'AR View';
                this.arView.videoAsset = asset;

                // Create it right away so it's immediatelly available
                this.arView.DOMcreateElementVideo();

                // Allow to play/pause the camera on click
                /*
                this.arView.onClick = function() {
                    this.videoAsset.stopVideoTexture = !this.videoAsset.stopVideoTexture;
                }
                */
                this.arView.onFocus = function() {}
            }
            return this.arView.video;
        },

        toggleVrMode: function() {
			this.setVrMode(!this.vrMode);
		},

        setVrMode: function(state) {
            if (!this.isFullScreen) {
                // Forbid VRMode when in a widget
                state = false;
            }

			if (state === undefined) {
				state = true;
			}
            if (state === this.vrMode) {
                return;
            }
			this.vrMode = state;
            if (this.vrMode) {
                analytics('event', 'scene.setVrModeOn');
                this.setArMode(false);
            } else {
                analytics('event', 'scene.setVrModeOff');
            }
            this.gyroscope = this.vrMode;
		},

		loadPage: function(page) {
            this.hideKeyboard();
			if (typeof page === 'string') {
				var name = page;
                if (pages[name] === undefined) {
                    name = "Peeks";
                }
				if (pages[name]) {
					if (this.page) {
						logError("Unloading current page");
						this.page.destroy();
					}
                    analytics('event', 'scene.loadPage', {'name': name} );
					logDebug("Loading " + name);
					var page = navigateToPage(name, this);
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
					var page = navigateToPage(name, this);
						this.add(page);
						this.page = page;
						this.pageIndex = pageIndex;
				}
			}

            if (this.page) {
                if (this.groundImage) {
                    this.groundImage.destroy();
                    delete this.groundImage;
                }

                if (this.page.gyroscope === 'off') {
                    this.gyroscope = false;
                }

                var category = this.page.getAttr('category');
                var groundFilename = this.page.groundImage;
                var repeat = 50;
                var groundColor = [1, 1, 1];
                var groundAlpha = 1;
                if (groundFilename === undefined) {
                    if (category === 'fashion') {
                        groundFilename = getAsset('images/floor_marble_1.jpg');
                        //groundColor = [.4, .4, .4];
                    } else if (category === 'shopping') {
                        groundFilename = getAsset('images/floor_marble_4.jpg');
                    } else if (category === 'entertainment') {
                        groundFilename = getAsset('images/floor_dot_1.jpg');
                    }
                } else {
                    if (this.page.groundImageRepeat) {
                        repeat = this.page.groundImageRepeat;
                    }
                    if (this.page.groundImageColor) {
                        groundColor = this.page.groundImageColor;
                    }
                    if (this.page.groundImageAlpha) {
                        groundAlpha = this.page.groundImageAlpha;
                    }
                }
                if (groundFilename) {
                    this.groundImage = this.ground.addImage({
                        image: groundFilename,
                        imageRepeat: [repeat, repeat],
                        position: [0, -2, 0],
                        rotation: [-90, 0, 0],
                        size: 100,
                        color: groundColor,
                        alpha: groundAlpha,
                    });
                }

                if (this.backgroundImage) {
                    this.backgroundImage.destroy();
                    delete this.backgroundImage;
                }
                var backgroundFilename = page.backgroundImage;
                var backgroundColor = page.backgroundImageColor || [1, 1, 1];
                if (backgroundFilename === undefined) {
                    if (category === 'fashion') {
                        backgroundFilename = getAsset('images/bg_360_place.jpg');
                    } else if (category === 'winter') {
                        backgroundFilename = getAsset('images/bg_360_winter.jpg');
                    } else if (category === 'shopping') {
                        backgroundFilename = getAsset('images/bg_360_interior2.jpg');
                    } else if (category === 'entertainment') {
                        backgroundFilename = getAsset('images/bg_360_interior1.jpg');
                    } else if (category === 'outdoor') {
                        backgroundFilename = getAsset('images/bg_360_bridge.jpg');
                    } else if (category === 'soccer') {
                        backgroundFilename = getAsset('images/bg_360_soccer.jpg');
                    } else if (category === 'white') {
                    } else if (category === '') {
                    } else {
                        backgroundFilename = getAsset('images/bg_360_canyon.jpg');
                    }
                }
                if (backgroundFilename) {
                    this.backgroundImage = this.background.addSphere({
                        image: backgroundFilename,
                        position: [0, 0, 0],
                        rotation: [0, 0, 0],
                        sides: 'back',
                        size: 20,
                        color: backgroundColor,
                    });
                }

                if (this.titleText) {
                    this.titleText.destroy();
                    delete this.titleText;
                }
                var title = this.page.getAttr('title');
                if (title !== undefined && title != '') {
                    this.titleText = page.addCanvas({
                        valign: 'top',
                    });
                    this.titleText.addTextButton({
                        label: title,
                        position: [0, .45, 0],
                        size: [.9, .15, 1],
                        fontSize: 40,
                    });
                }
            }

			this.resetCamera();
		},

		loadPreviousPage: function() {
            analytics('event', 'scene.loadPreviousPage');
			if (this.pageIndex > 0) {
				this.loadPage(this.pageIndex - 1);
			}
		},

		loadNextPage: function() {
            analytics('event', 'scene.loadNextPage');
			if (this.pageIndex < (this.pagesHistory.length - 1)) {
				this.loadPage(this.pageIndex + 1);
			}
		},

        loadHomePage: function() {
            analytics('event', 'scene.loadHomePage');
            this.loadPage('peeks.home');
		},

        searchPage: function() {
            analytics('event', 'scene.searchPage');

            this.showKeyboard({
                onUpdate: function(text) {
                    this.showSiteMapMenu(text);
                }
            });
		},

		resetCamera: function (animate) {
			this.camera.destroy();
			this.camera = this.add(new Camera());

			this.camera.setPosition([0, 0, 0]);
			if (animate) {
				this.camera.animateIntro();
			}
		},

        updateFullScreen: function () {
            var document = this.getDocument();
			if (document) {
                if (document.fullscreenEnabled ||
                    document.webkitFullscreenEnabled ||
                    document.mozFullScreenEnabled ||
                    document.msFullscreenEnabled)
                {
                    if (this.isVrMode()) {
                        if (document.fullscreenElement ||
                            document.webkitFullscreenElement ||
                            document.mozFullscreenElement ||
                            document.msFullscreenElement
                        ) {
                        } else {
                            if (this.domElement.requestFullscreen) {
                                this.domElement.requestFullscreen();
                            } else if (this.domElement.webkitRequestFullscreen) {
                                this.domElement.webkitRequestFullscreen();
                            } else if (this.domElement.mozRequestFullScreen) {
                                this.domElement.mozRequestFullScreen();
                            } else if (this.domElement.msRequestFullscreen) {
                                this.domElement.msRequestFullscreen();
                            }
                        }
                    } else {
                        if (document.fullscreenElement ||
                            document.webkitFullscreenElement ||
                            document.mozFullscreenElement ||
                            document.msFullscreenElement
                        ) {
                            if (document.exitFullscreen) {
                                document.exitFullscreen();
                            } else if (document.webkitExitFullscreen) {
                                document.webkitExitFullscreen();
                            } else if (document.mozExitFullscreen) {
                                document.mozExitFullscreen();
                            } else if (document.msExitFullscreen) {
                                document.msExitFullscreen();
                            }
                        }
                    }
                }
            }
        },

		start: function (domElement, page) {
            if (typeof domElement === 'string') {
                domElement = document.getElementById(domElement);
            }
            if (domElement &&
                domElement.nodeName &&
                domElement.nodeName.toLowerCase() === "canvas")
            {
                // This is all good actually
            } else {
                logDebug("Invalid element passed to the peeks scene. Expecting a canvas");
                domElement = undefined;
            }

            var url = document.URL;
            if (url.search('127.0.0.1') != -1) {
                doAnalytics = false;
                PEEKS.setLogLevel(1);
            } else {
                PEEKS.setLogLevel(3);
            }

            analytics('js', new Date());
            analytics('config', 'UA-109650112-1');

            // If the page is not specified, load the page that correspond
            //  to the title of the document
            page = page || document.title;
            this.loadPage(page);

            analytics('event', 'scene.start');
            logDebug('Scene.start');

			this.resetCamera();
			this.window = window;

            if (domElement === undefined) {
                logDebug('Creating default canvas element');
                domElement = document.createElement('canvas');
                this.isFullScreen = true;
                this.width = this.window.innerWidth;
                this.height = this.window.innerHeight;
                document.body.appendChild(domElement);
            } else {
                this.width = domElement.width;
                this.height = domElement.height;
            }

            this.setVrMode(this.isPhone)

            this.domElement = domElement;

            var scene = this;

			this.onStart();

			if (this.isFullScreen) {
                document.addEventListener('keydown', function(event) { scene.onKeyDown(event); } );
                document.addEventListener('keyup', function(event) { scene.onKeyUp(event); } );
            }

            window.addEventListener('orientationchange', function() { scene.screenOrientation = window.orientation || 0; } );
    		window.addEventListener('deviceorientation', function(event) { if (event.alpha != null) { scene.deviceOrientation = event; } } );

            document.addEventListener('mousemove', function(event) { scene.onMouseMove(event); } );
            document.addEventListener('mousedown', function(event) { if (event.target === scene.domElement) { scene.onMouseDown(event); } } );
            document.addEventListener('mouseup', function(event) { scene.onMouseUp(event); } );

            document.addEventListener('mousewheel', function(event) { if (event.target === scene.domElement) { scene.onMouseWheel(event); } } );
            document.addEventListener('MozMousePixelScroll', function(event) { if (event.target === scene.domElement) { scene.onMouseWheel(event); } } );
            document.addEventListener('touchstart', function(event) { if (event.target === scene.domElement) { scene.onMouseDown(event); } } );
            document.addEventListener('touchend', function(event) { scene.onMouseUp(event); } );
            document.addEventListener('touchmove', function(event) { scene.onMouseMove(event); } );

			var animate = function () {
				requestAnimationFrame(animate);

                if (scene.isFullScreen) {
                    scene.onResize(scene.window.innerWidth, scene.window.innerHeight);
                } else {
                    scene.onResize(scene.domElement.width / window.devicePixelRatio, scene.domElement.height / window.devicePixelRatio);
                }

                // Update global UI components
                if (scene.isVrMode()) {
                    if (scene.vrReticle !== undefined) {
                        scene.vrReticle.destroy();
                        delete scene.vrReticle;
                    }

                    if (scene.vrReticle === undefined) {
                        scene.vrReticle = scene.addCanvas({
                            // valign: 'bottom',
                        });

                        scene.vrReticle.vrFixed = true;

                        scene.vrReticle.addRing({ viewBgColor: [1, 1, 1], size: .025 });
                        scene.vrReticle.addRing({ viewBgColor: [.3, .3, .3], size: .02 });
                    }

                    // Update focus all the time when in VR mode
                    scene.onFocusChange();
                } else if (scene.vrReticle) {
                    scene.vrReticle.destroy();
                    delete scene.vrReticle;
                }

				scene.update();
                scene.background.setPosition(scene.camera.position);
				scene.render();
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

function Screen() {
	Asset.call(this);
	this.name = "Screen";
    this.type = "Screen";
    this.radius = 5;
}
Screen.prototype = Object.assign(Object.create(Asset.prototype),
	{
		constructor: Screen,
	}
);

function Page(params) {
	Asset.call(this);
	this.name = "Page";
    this.type = "Page";
    this.initAsset(this, params);
}
Page.prototype = Object.assign(Object.create(Asset.prototype),
	{
		constructor: Page,
	}
);

function Animation(data) {
	Asset.call( this );
    this.primitive = Asset.PrimitiveAnimation;
	this.duration = 10;
	this.delay = 0;
	this.attribute = 'position';
	this.loop = false;
    this.ended = false;

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
            time *= animationSpeed;
			var t = 0;
            if (this.startTime === undefined) {
                this.startTime = time;
            }
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
                if (this.parent.name && t > 0 && t < 1) {
                    if (logVerboseOk()) {
                        logVerbose('Animation update at ' + t.toString() +
                            ': ' + this.parent.name + '[' + this.attribute +
                            '] = ' + this.parent[this.attribute].toString());
                    }
                }
			}

            if (t >= 1 && !this.loop && !this.ended) {
                this.ended = true;
                this.parent.raise(this.onEnd);
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
exports.Screen = Screen;
exports.Page = Page;
exports.Plane = Plane;
exports.Animation = Animation;

exports.setLogLevel = setLogLevel;
exports.logLevel = logLevel;
exports.logDebug = logDebug;
exports.logInfo = logInfo;
exports.logWarning = logWarning;
exports.logError = logError;
exports.registerPage = registerPage;
exports.loadScript = loadScript;
exports.start = start;
exports.getAsset = getAsset;

exports.cvSupported = cvSupported;

exports.registerExtension = registerExtension;
exports.getExtension = getExtension;
exports.addExtensionListener = addExtensionListener;

exports.navigateToPage = navigateToPage;
exports.isPhone = isPhone;
exports.v3 = utils.v3;
exports.color = utils.color;
exports.math = utils.math;

exports.setAnimationSpeed = setAnimationSpeed;

var global = Function('return this')();

if (global.PEEKS === undefined) {
    // Singleton to be called only once
    global.PEEKS = exports;
    window.PEEKS = exports;

    /*
    var peeksSceneProto = Object.create(HTMLElement.prototype);
    peeksSceneProto.createdCallback = function() {
    };
    peeksSceneProto.attachedCallback = function() {
        var peeks = new PEEKS.Scene();
        peeks.start(this.getAttribute('canvas'));
    };
    */

    //document.registerElement('peeks-view', {prototype: peeksSceneProto});
}
