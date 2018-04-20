function addClassDoc(node, doc) {
    if (window.PEEKS === undefined) {
        console.log('PEEKS is missing');
    } else if (window.PEEKS[node] === undefined) {
        console.log('PEEKS class ' + node + ' missing');
    } else {
        window.PEEKS[node].doc = doc;
    }
}

function addDoc(node, method, doc) {
    if (window.PEEKS === undefined) {
        console.log('PEEKS is missing');
    } else if (window.PEEKS[node] === undefined) {
        console.log('PEEKS class ' + node + ' missing');
    } else if (window.PEEKS[node].prototype[method] === undefined) {
        console.log('PEEKS method ' + node + '.' + method + ' missing');
    } else {
        window.PEEKS[node].prototype[method].doc = doc;
    }
}

addClassDoc('Node', {
    description: '<p>This is the root class. It defines the default behaviors for all Peeks objects.</p>',
});
addDoc('Node', 'DOMcreateElementVideo', {internal: true});
addDoc('Node', 'add', {internal: true});
addDoc('Node', 'addPage', {
    description: '<p>Load and attach a new instance of a named page into the current page.</p>'
    + '<p>You may use this to create your own registered pages previoulsy registered to organize multiple pages using shared widgets declarations.</p>'
    + '<p>There is also a set of predefined system pages that can be used to quickly populate a page with standard widgets. All these pages will be prefixed with "peeks.": <b>peeks.toolbar</b> (Standard navigation toolbar at the bottom of the screen)</p>',
    args: [
        ['name', 'The string describing the name of the registered page to load'],
    ],
    returnValue: 'A new Page',
    usage: 'asset.addPage("peeks.toolbar");',
    example: '',
});
addDoc('Node', 'destroy', {
    description: 'Detach and destroy the node along with all its children if any',
    returnValue: '',
    usage: 'asset.destroy()',
    example: '',
});
addDoc('Node', 'unload', {internal: true});
addDoc('Node', 'addCanvas', {
    description: '<p>Create and attach a 2D Canvas</p>'
        +'<p>A Canvas is a square 2d Assets following the screen orientation and size</p>',
    args: [
        ['parameters', 'Initial parameter values'],
    ],
    returnValue: 'A new Canvas',
    usage: "page.addCanvas({valign: 'top'});",
    example: '',
});
addDoc('Node', 'addLight', {
    description: '<p>Create and attach a Light</p>'
        +'<p>A light is usefulf when dealing with 3d models</p>',
    args: [
        ['parameters', 'Initial parameter values'],
    ],
    returnValue: 'A new Light',
    usage: "page.addLight({ position: [1, 1, 1], intensity: .7 });",
    example: '',
});
addDoc('Node', 'addScreen', {
    description: '<p>Create and attach a 3D sperical Screen</p>'
        +'<p>A Screen is an invisible sphere on which other Assets can be attached using their x/y positions values as 2D coordinates on the sphere.</p>',
    args: [
        ['parameters', 'Initial parameter values'],
    ],
    returnValue: 'A new Screen',
    usage: 'page.addScreen({});',
    example: '',
});
addDoc('Node', 'addButton', {
    description: 'Create and attach a 2D Button',
    args: [
        ['parameters', 'Initial parameter values'],
    ],
    returnValue: 'A new Button',
    usage: 'page.addButton({});',
    example: '',
});
addDoc('Node', 'addStateButton', {
    internal: true,
    description: 'Create and attach a 2D State Button',
    args: [
        ['parameters', 'Initial parameter values'],
    ],
    returnValue: 'A new Button',
    usage: 'page.addStateButton({});',
    example: '',
});
addDoc('Node', 'toggleButtonState', {
    internal: true,
    description: 'Toggle the pressed state of a button',
    args: '',
    returnValue: '',
    usage: 'button.toggleButtonState()',
    example: '',
});
addDoc('Node', 'getButtonState', {
    internal: true,
    description: '',
    args: '',
    returnValue: 'A boolean value',
    usage: 'var isPressed = button.getButtonState()',
    example: '',
});
addDoc('Node', 'setButtonState', {
    internal: true,
    description: 'Force the state of a button',
    args: [
        ['state', 'A boolean value indicating if the button is pressed or not'],
    ],
    returnValue: '',
    usage: 'button.setButtonState(true)',
    example: '',
});
addDoc('Node', 'addCube', {internal: true});
addDoc('Node', 'addRibbon', {internal: true});
addDoc('Node', 'addSphere', {
    internal: true,
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Node', 'addCurvedPanel', {internal: true});
addDoc('Node', 'addRing', {internal: true});
addDoc('Node', 'addDisc', {internal: true});
addDoc('Node', 'addSquare', {internal: true});
addDoc('Node', 'addTextButton', {internal: true});
addDoc('Node', 'addRoundTextButton', {internal: true});
addDoc('Node', 'addIconButton', {internal: true});
addDoc('Node', 'addRoundIconButton', {internal: true});
addDoc('Node', 'addOverlay', {internal: true});
addDoc('Node', 'getChildCount', {
    description: 'Returns the total number of child nodes',
    returnValue: 'A number',
    usage: 'var childCount = asset.getChildCount();',
    example: '',
});
addDoc('Node', 'getChild', {
    description: 'Returns the child at the given index',
    args: [
        ['childIndex', 'A number'],
    ],
    returnValue: 'A Node',
    usage: 'var childCount = asset.getChildCount();',
    example: '',
});
addDoc('Node', 'addVideo', {
    description: 'Create and attach a Video',
    args: [
        ['parameters', 'Initial parameter values'],
    ],
    returnValue: 'A new Video',
    usage: 'asset.addVideo({});',
    example: '',
});
addDoc('Node', 'addImage', {
    description: 'Create and attach an Image',
    args: [
        ['parameters', 'Initial parameter values'],
    ],
    returnValue: 'A new Image',
    usage: 'asset.addImage({});',
    example: '',
});
addDoc('Node', 'toString', {internal: true});
addDoc('Node', 'addText', {
    description: 'Create and attach a Text',
    args: [
        ['parameters', 'Initial parameter values'],
    ],
    returnValue: 'A new Text',
    usage: 'asset.addText({});',
    example: '',
});
addDoc('Node', 'applyParams', {internal: true});
addDoc('Node', 'setAttr', {internal: true});
addDoc('Node', 'getAttrColor', {internal: true});
addDoc('Node', 'getAttrRgba', {internal: true});
addDoc('Node', 'getAttr', {internal: true});
addDoc('Node', 'addAttrAlias', {internal: true});
addDoc('Node', 'initAsset', {internal: true});
addDoc('Node', 'addView', {
    description: 'Create and attach a View with background',
    args: [
        ['parameters', 'Initial parameter values'],
    ],
    returnValue: 'A new View',
    usage: 'asset.addView({});',
    example: '',
});
addDoc('Node', 'progressStart', {internal: true});
addDoc('Node', 'progressStop', {internal: true});
addDoc('Node', 'addExternalView', {internal: true});
addDoc('Node', 'addRecommendationsView', {internal: true});
addDoc('Node', 'getSiteMap', {internal: true});
addDoc('Node', 'setSiteMapMenuPath', {internal: true});
addDoc('Node', 'getSiteMapMenuPath', {internal: true});
addDoc('Node', 'setSiteMapPath', {internal: true});
addDoc('Node', 'getSiteMapPath', {internal: true});
addDoc('Node', 'addSiteMapItem', {internal: true});
addDoc('Node', 'siteMapPathIsLeaf', {internal: true});
addDoc('Node', 'querySiteMapItem', {internal: true});
addDoc('Node', 'querySiteMapMenuAssets', {internal: true});
addDoc('Node', 'querySiteMapAssets', {internal: true});
addDoc('Node', 'querySiteMapItemAssets', {internal: true});
addDoc('Node', 'setAssetPath', {internal: true});
addDoc('Node', 'getAssetPath', {internal: true});
addDoc('Node', 'addAsset', {
    description: 'Create and attach an Asset. This is useful when you need to create new generic containers in your scene hierarchy.',
    args: [
        ['parameters', 'Initial parameter values'],
    ],
    returnValue: 'The new Asset',
    usage: "page.addAsset({ position: [0, 0, -3], rotation: [0, 0, 45] })",
    example: '',
});
addDoc('Node', 'addMesh', {
    description: 'Create and attach a 3d Mesh. Supported format is limited to OBJ.',
    args: [
        ['parameters', 'Initial parameter values.'],
    ],
    returnValue: 'The new Mesh',
    usage: '',
    example: '',
});
addDoc('Node', 'initShapeWeights', {internal: true});
addDoc('Node', 'validateShapeWeights', {internal: true});
addDoc('Node', 'setShape', {internal: true});
addDoc('Node', 'setProperties', {internal: true});
addDoc('Node', 'animate', {
    description: 'Attach a new animation to the node',
    args: [
        ['parameters', 'Initial parameter values.'],
    ],
    returnValue: '',
    usage: 'node.animate({})',
    example: '',
});

addClassDoc('Scene', {
    description: 'class.',
});
addDoc('Scene', 'convertMouse', {internal: true});
addDoc('Scene', 'isVrMode', {internal: true});
addDoc('Scene', 'isGyroMode', {internal: true});
addDoc('Scene', 'getMouse', {internal: true});
addDoc('Scene', 'onPickNode', {internal: true});
addDoc('Scene', 'computeOffsetFromCamera', {internal: true});
addDoc('Scene', 'getCameraQuaternion', {internal: true});
addDoc('Scene', 'onGetCameraQuaternion', {internal: true});
addDoc('Scene', 'onGetCameraTranslation', {internal: true});
addDoc('Scene', 'touchPinch', {internal: true});
addDoc('Scene', 'onFocusChange', {internal: true});
addDoc('Scene', 'onMouseMove', {internal: true});
addDoc('Scene', 'onMouseDown', {internal: true});
addDoc('Scene', 'onMouseUp', {internal: true});
addDoc('Scene', 'onClick', {internal: true});
addDoc('Scene', 'onKeyDown', {internal: true});
addDoc('Scene', 'onKeyUp', {internal: true});
addDoc('Scene', 'onMouseWheel', {internal: true});
addDoc('Scene', 'onStart', {internal: true});
addDoc('Scene', 'onResize', {internal: true});
addDoc('Scene', 'onAnimate', {internal: true});
addDoc('Scene', 'onSynch', {internal: true});
addDoc('Scene', 'getPage', {internal: true});
addDoc('Scene', 'toggleGyroscope', {
    description: 'Invert the state of the Gyroscope',
    args: '',
    returnValue: '',
    usage: 'scene.toggleGyroscope()',
    example: '',
});
addDoc('Scene', 'toggleArMode', {
    description: 'Toggle the AR View. Note that this will require access to the Camera so it can only work in https mode.',
    args: '',
    returnValue: '',
    usage: 'scene.toggleArMode()',
    example: '',
});
addDoc('Scene', 'open2D', {internal: true});
addDoc('Scene', 'onShowSiteMapMenu', {internal: true});
addDoc('Scene', 'showSiteMapMenu', {internal: true});
addDoc('Scene', 'refreshSiteMapMenu', {internal: true});
addDoc('Scene', 'hideSiteMapMenu', {internal: true});
addDoc('Scene', 'showKeyboard', {
    description: 'Make the Keyboard appear',
    args: '',
    returnValue: '',
    usage: 'scene.showKeyboard()',
    example: '',
});
addDoc('Scene', 'hideKeyboard', {
    description: 'Make the Keyboard disappear',
    args: '',
    returnValue: '',
    usage: 'scene.hideKeyboard()',
    example: '',
});
addDoc('Scene', 'getArView', {internal: true});
addDoc('Scene', 'requestFullScreen', {internal: true});
addDoc('Scene', 'exitFullScreen', {internal: true});
addDoc('Scene', 'onLog', {internal: true});
addDoc('Scene', 'setLogLevel', {internal: true});
addDoc('Scene', 'logVerbose', {internal: true});
addDoc('Scene', 'logDebug', {internal: true});
addDoc('Scene', 'logInfo', {internal: true});
addDoc('Scene', 'logWarning', {internal: true});
addDoc('Scene', 'logError', {internal: true});
addDoc('Scene', 'getArImageData', {
    description: 'Query the image data from the AR View. This is especially useful when you want to run Computer Vision algorythms on a live video feed to create Augmented Reality experiences.',
    args: '',
    returnValue: 'An array of pixel values',
    usage: 'vat data = scene.getArImageData()',
    example: '',
});
addDoc('Scene', 'getLight', {
    description: 'Returns the light corresponding to the given number. By default lighting rigs have 3 lights.',
    args: [
        ['lightIndex', 'A number']
    ],
    returnValue: '',
    usage: 'vat light = scene.getLight(lightIndex)',
    example: '',
});
addDoc('Scene', 'setArMode', {
    description: 'Set the state of the Augmented Reality view to activate / deactivate it.',
    args: [
        ['state', 'A boolean value']
    ],
    returnValue: '',
    usage: 'scene.setArMode(true)',
    example: '',
});
addDoc('Scene', 'DOMarGetElement', {internal: true});
addDoc('Scene', 'toggleVrMode', {
    description: 'Toggle the VR Rendering mode.',
    args: '',
    returnValue: '',
    usage: 'scene.toggleVrMode()',
    example: '',
});
addDoc('Scene', 'setVrMode', {
    description: 'Set the state of the Virtual Reality rendering mode to activate/deactive stereoscopic views.',
    args: [
        ['state', 'A boolean value']
    ],
    returnValue: '',
    usage: 'scene.setVrMode(true)',
    example: '',
});
addDoc('Scene', 'loadPage', {
    description: 'Load a named page into the current one.',
    args: [
        ['name', 'The name of a reagistered page to load']
    ],
    returnValue: '',
    usage: 'page.loadPage("banner")',
    example: '',
});
addDoc('Scene', 'loadPreviousPage', {internal: true});
addDoc('Scene', 'loadNextPage', {internal: true});
addDoc('Scene', 'loadHomePage', {internal: true});
addDoc('Scene', 'searchPage', {internal: true});
addDoc('Scene', 'resetCamera', {internal: true});
addDoc('Scene', 'start', {internal: true});
addDoc('Scene', 'onRender', {internal: true});

addClassDoc('Camera', { internal: true, });

addClassDoc('Asset', { description: 'Asset class', });
addDoc('Asset', 'isInCanvas', {internal: true});
addDoc('Asset', 'resetToInitial', {internal: true});
addDoc('Asset', 'updateInitial', {internal: true});
addDoc('Asset', 'setAlpha', {
    description: 'Sets the alpha (opacity)',
    args: [
        ['value', 'An number in [0, 1] range']
    ],
    returnValue: '',
    usage: 'asset.setAlpha(.5)',
    example: '',
});
addDoc('Asset', 'setColor', {
    description: 'Sets the color value',
    args: [
        ['vector', 'An array of 3 values representing RGB in 0, 1] range']
    ],
    returnValue: '',
    usage: 'asset.setColor([1, 0, 0])',
    example: '',
});
addDoc('Asset', 'setPosition', {
    description: 'Sets the xyz position of the Asset',
    args: [
        ['vector', 'An array of 3 numeric values']
    ],
    returnValue: '',
    usage: 'asset.setPosition([0, 0, -5])',
    example: '',
});
addDoc('Asset', 'setRotation', {
    description: 'Sets the xyz rotation euler angles of the Asset',
    args: [
        ['vector', 'An array of 3 numeric values']
    ],
    returnValue: '',
    usage: 'asset.setRotation([0, 0, 45])',
    example: '',
});
addDoc('Asset', 'getPropagatedSize', {internal: true});
addDoc('Asset', 'setSize', {
    description: 'Sets the xyz size of the Asset',
    args: [
        ['vector', 'An array of 3 numeric values']
    ],
    returnValue: '',
    usage: 'asset.setSize([2, 1, 1])',
    example: '',
});
addDoc('Asset', 'measureText', {internal: true});
addDoc('Asset', 'createTextTexture', {internal: true});
addDoc('Asset', 'getTexture', {internal: true});
addDoc('Asset', 'setTexture', {internal: true});
addDoc('Asset', 'setTextureBack', {internal: true});
addDoc('Asset', 'setGeometry', {internal: true});
addDoc('Asset', 'onUpdate', {
    description: 'This method is called at each update of the Frame',
    args: [
        ['function', 'The function to invoke at each Frame']
    ],
    returnValue: '',
    usage: 'asset.onUpdate(function(){})',
    example: '',
});
addDoc('Asset', 'update', {internal: true});
addDoc('Asset', 'raise', {internal: true});
addDoc('Asset', 'render', {internal: true});
addDoc('Asset', 'onRender', {internal: true});
addDoc('Asset', 'onUpdateSiteMapPath', {internal: true});
addDoc('Asset', 'getScene', {
    description: 'Query the root Scene in which this Asset belongs',
    args: '',
    returnValue: 'A Scene',
    usage: 'var scene = asset.getScene()',
    example: '',
});
addDoc('Asset', 'getPage', {
    description: 'Query the root Page in which this Asset belongs',
    args: '',
    returnValue: 'A Page',
    usage: 'var page = asset.getPage()',
    example: '',
});
addDoc('Asset', 'getScreen', {
    internal: true,
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Asset', 'getDocument', {internal: true});
addDoc('Asset', 'getCamera', {internal: true});
addDoc('Asset', 'setVisible', {
    description: 'Set the visibility state',
    args: [
        ['state', 'A boolean value']
    ],
    returnValue: '',
    usage: 'asset.setVisible(true)',
    example: '',
});
addDoc('Asset', 'getVisible', {
    description: 'Returns the visibility state',
    returnValue: 'A boolean value',
    usage: 'var visible = asset.getVisible();',
    example: '',
});
addDoc('Asset', 'show', {internal: true});
addDoc('Asset', 'hide', {internal: true});
addDoc('Asset', 'toggleVisible', {internal: true});
addDoc('Asset', 'animateFlip', {
    description: 'Fire the flip front-to-back animation on the Asset',
    args: '',
    returnValue: '',
    usage: 'asset.animateFlip()',
    example: '',
});
addDoc('Asset', 'animateRotate90', {internal: true});
addDoc('Asset', 'animateFocusStart', {internal: true});
addDoc('Asset', 'animateFocusEnd', {internal: true});
addDoc('Asset', 'animateClick', {internal: true});
addDoc('Asset', 'animateInFromFar', {internal: true});
addDoc('Asset', 'clearAnimations', {
    internal: true,
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Asset', 'clearChildren', {internal: true});
addDoc('Asset', 'onUnload', {internal: true});

addClassDoc('Canvas', { internal: true, description: 'Asset class', });

addClassDoc('Screen', { internal: true, description: 'Asset class', });

addClassDoc('Page', { internal: true, description: 'Asset class', });

addClassDoc('Plane', { internal: true, });

addClassDoc('Light', { internal: true, description: 'Asset class', });

addClassDoc('Tracker', { internal: true, description: 'Asset class', });

addClassDoc('TrackerFace', { internal: true, description: 'Asset class', });

addClassDoc('Overlay', { internal: true, description: 'Asset class', });

addClassDoc('Animation', {
    internal: true,
    description:
        '<p>Animations are objects that update values of their owners with time.</p>' +
        ' They are attached to a Node using the animate({}) methods with the appropriate values.' +
        '',
});
addDoc('Animation', 'interpolateEaseIn', {internal: true});
addDoc('Animation', 'interpolateEaseOut', {internal: true});
addDoc('Animation', 'interpolateEaseInOut', {internal: true});
addDoc('Animation', 'update', {internal: true});

if (window.PEEKS) {

window.PEEKS.generateDoc = function()
    {
        var doc = {
            classes: {},
            classNames: [],
            rootClass: '',
        };
        var sdk = window.PEEKS;
        if (sdk) {
            for (let name in sdk) {
                let sdkItem = sdk[name];
                if (typeof sdkItem === 'function') {
                    if (name[0] === name[0].toUpperCase()) {
                        // Ignore Three wrappers
                        if (name.substr(0, 5) === 'Three') {
                            continue;
                        }
                        // Ignore others
                        if (name === 'EventDispatcher') {
                            continue;
                        }
                        if (sdkItem.doc) {
                            if (!sdkItem.doc.internal) {
                                doc.classes[name] = {
                                    name: name,
                                    class: sdkItem,
                                    methods: {},
                                    methodNames: [],
                                    doc: sdkItem.doc,
                                };
                                doc.classNames.push(name);
                            }
                        } else {
                            if (!sdkItem.internal) {
                                console.log('missing doc for Class ' + name);
                            }
                        }
                    }
                }
            }

            doc.classNames.sort();

            // Evaluate the ranking of each class
            for (let class1 in doc.classes) {
                doc.classes[class1].rank = 0;
                for (let class2 in doc.classes) {
                    if (class1 !== class2) {
                        if (doc.classes[class1].class.prototype instanceof doc.classes[class2].class) {
                            doc.classes[class1].rank = doc.classes[class1].rank + 1;
                        }
                    }
                }
            }

            // Solve the class hierarhcy
            for (let class1 in doc.classes) {
                if (doc.classes[class1].rank === 0) {
                    doc.rootClass = class1;
                } else {
                    for (let class2 in doc.classes) {
                        if (doc.classes[class1].rank === (doc.classes[class2].rank + 1)) {
                            doc.classes[class1].superclass = class2;
                        }
                    }
                }
            }

            // Extract the methds
            for (let className in doc.classes) {
                let proto = doc.classes[className].class.prototype;
                for (let methodName in proto) {
                    let method =  proto[methodName];
                    if (typeof method === `function` && proto.hasOwnProperty(methodName)) {
                        if (methodName !== 'constructor' &&
                            methodName.search("three") !== 0 &&
                            methodName.search("Event") === -1)
                        {
                            if (method.doc) {
                                if (!method.doc.internal) {
                                    method.doc.name = methodName;
                                    doc.classes[className].methods[methodName] = method.doc;
                                    doc.classes[className].methodNames.push(methodName);
                                }
                            } else {
                                console.log('missing doc for ' + className + '.' + methodName);
                            }
                        }
                    }
                }
                doc.classes[className].methodNames.sort();
            }
        }
        return doc;
    }
}
