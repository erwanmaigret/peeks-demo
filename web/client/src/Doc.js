function addDoc(node, method, doc) {
    if (window.PEEKS[node] === undefined) {
        console.log('PEEKS class ' + node + ' missing');
    } else if (window.PEEKS[node].prototype[method] === undefined) {
        console.log('PEEKS method ' + node + '.' + method + ' missing');
    } else {
        window.PEEKS[node].prototype[method].doc = doc;
    }
}
window.PEEKS.Node.doc = {
    description: 'Root class. It defines the default behaviors for all Peeks objects.',
};
addDoc('Node', 'DOMcreateElementVideo', {internal: true});
addDoc('Node', 'add', {internal: true});
addDoc('Node', 'addPage', {
    description: '',
    args: '',
    returnValue: 'The created Page object',
    usage: '',
    example: '',
});
addDoc('Node', 'destroy', {
    description: '',
    args: '',
    returnValue: 'Nothing',
    usage: '',
    example: '',
});
addDoc('Node', 'unload', {internal: true});
addDoc('Node', 'addCanvas', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Node', 'addScreen', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Node', 'addButton', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Node', 'addStateButton', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Node', 'toggleButtonState', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Node', 'getButtonState', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Node', 'setButtonState', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Node', 'addCube', {internal: true});
addDoc('Node', 'addRibbon', {internal: true});
addDoc('Node', 'addSphere', {
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
addDoc('Node', 'addVideo', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Node', 'addImage', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Node', 'toString', {internal: true});
addDoc('Node', 'addText', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
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
    description: '',
    args: '',
    returnValue: '',
    usage: '',
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
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Node', 'addMesh', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Node', 'initShapeWeights', {internal: true});
addDoc('Node', 'validateShapeWeights', {internal: true});
addDoc('Node', 'setShape', {internal: true});
addDoc('Node', 'setProperties', {internal: true});
addDoc('Node', 'animate', {internal: true});
addDoc('Node', 'verbose', {internal: true});
addDoc('Node', 'debug', {internal: true});
addDoc('Node', 'info', {internal: true});
addDoc('Node', 'warn', {internal: true});
addDoc('Node', 'error', {internal: true});

window.PEEKS.Scene.doc = {
    description: 'class.',
};
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
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Scene', 'toggleArMode', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Scene', 'open2D', {internal: true});
addDoc('Scene', 'onShowSiteMapMenu', {internal: true});
addDoc('Scene', 'showSiteMapMenu', {internal: true});
addDoc('Scene', 'refreshSiteMapMenu', {internal: true});
addDoc('Scene', 'hideSiteMapMenu', {internal: true});
addDoc('Scene', 'showKeyboard', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Scene', 'hideKeyboard', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Scene', 'getArView', {internal: true});
addDoc('Scene', 'getArImageData', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Scene', 'setArMode', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Scene', 'DOMarGetElement', {internal: true});
addDoc('Scene', 'toggleVrMode', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Scene', 'setVrMode', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Scene', 'loadPage', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Scene', 'loadPreviousPage', {internal: true});
addDoc('Scene', 'loadNextPage', {internal: true});
addDoc('Scene', 'loadHomePage', {internal: true});
addDoc('Scene', 'searchPage', {internal: true});
addDoc('Scene', 'resetCamera', {internal: true});
addDoc('Scene', 'updateFullScreen', {internal: true});
addDoc('Scene', 'start', {internal: true});
addDoc('Scene', 'onRender', {internal: true});

window.PEEKS.Camera.doc = { internal: true, };

window.PEEKS.Asset.doc = { description: 'Asset class', };
addDoc('Asset', 'isInCanvas', {internal: true});
addDoc('Asset', 'resetToInitial', {internal: true});
addDoc('Asset', 'updateInitial', {internal: true});
addDoc('Asset', 'setPosition', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Asset', 'setRotation', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Asset', 'getPropagatedSize', {internal: true});
addDoc('Asset', 'setSize', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Asset', 'measureText', {internal: true});
addDoc('Asset', 'createTextTexture', {internal: true});
addDoc('Asset', 'getTexture', {internal: true});
addDoc('Asset', 'setTexture', {internal: true});
addDoc('Asset', 'setTextureBack', {internal: true});
addDoc('Asset', 'setGeometry', {internal: true});
addDoc('Asset', 'onUpdate', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Asset', 'update', {internal: true});
addDoc('Asset', 'raise', {internal: true});
addDoc('Asset', 'render', {internal: true});
addDoc('Asset', 'onRender', {internal: true});
addDoc('Asset', 'onUpdateSiteMapPath', {internal: true});
addDoc('Asset', 'getScene', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Asset', 'getPage', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Asset', 'getScreen', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Asset', 'getDocument', {internal: true});
addDoc('Asset', 'getCamera', {internal: true});
addDoc('Asset', 'setVisible', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Asset', 'show', {internal: true});
addDoc('Asset', 'hide', {internal: true});
addDoc('Asset', 'toggleVisible', {internal: true});
addDoc('Asset', 'animateFlip', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Asset', 'animateRotate90', {internal: true});
addDoc('Asset', 'animateFocusStart', {internal: true});
addDoc('Asset', 'animateFocusEnd', {internal: true});
addDoc('Asset', 'animateClick', {internal: true});
addDoc('Asset', 'animateInFromFar', {internal: true});
addDoc('Asset', 'clearAnimations', {
    description: '',
    args: '',
    returnValue: '',
    usage: '',
    example: '',
});
addDoc('Asset', 'clearChildren', {internal: true});
addDoc('Asset', 'onUnload', {internal: true});

window.PEEKS.Canvas.doc = { description: 'Asset class', };

window.PEEKS.Screen.doc = { description: 'Asset class', };

window.PEEKS.Page.doc = { description: 'Asset class', };

window.PEEKS.Plane.doc = { internal: true, };

window.PEEKS.Animation.doc = {
    description:
        '<p>Animations are objects that update values of their owners with time.</p>' +
        ' They are attached to a Node using the animate({}) methods with the appropriate values.' +
        '',
};
addDoc('Animation', 'interpolateEaseIn', {internal: true});
addDoc('Animation', 'interpolateEaseOut', {internal: true});
addDoc('Animation', 'interpolateEaseInOut', {internal: true});
addDoc('Animation', 'update', {internal: true});

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
