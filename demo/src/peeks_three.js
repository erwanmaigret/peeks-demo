PEEKS.texturesCache = {
};

PEEKS.ThreeLoadTexture = function(material, textureUrl, textureRepeat, flipX, flipY,
    removeBackground, useCache)
{
	if (textureUrl != '') {
        // Mangle the name so it's unique with all the given parameters
        var cacheName = textureUrl +
            '&textureRepeat=' + (textureRepeat ? textureRepeat.toString() : '1,1') +
            '&flipX=' + (flipX ? flipX.toString() : 'false') +
            '&flipY=' + (flipY ? flipY.toString() : 'false') +
            '&removeBackground=' + (removeBackground ? removeBackground.toString() : 'false');

        if (useCache && PEEKS.texturesCache[cacheName]) {
            material.map = PEEKS.texturesCache[cacheName];
            return;
        }

		var loader = new THREE.TextureLoader();
        //loader.setCrossOrigin(textureUrl);
        //loader.setCrossOrigin('');
        var mat = material;
        var detour = removeBackground;
		material.map = loader.load(textureUrl,
            function (texture) {
                var width = texture.image.width;
                var height = texture.image.height;
                if (width !== 0 && height !== 0) {
                    //console.log('Loaded texture ' + textureUrl + ' ' +
                    //    width.toString() + 'x' + height.toString());

                    //detour = false;
                    if (detour) {
                        var canvas = document.createElement('canvas');
        				var context = canvas.getContext('2d');
                        canvas.width = width;
                        canvas.height = height;
                        context.clearRect(0, 0, width, height);
                        context.drawImage(texture.image, 0, 0);

                        var imgd = context.getImageData(0, 0, width, height);
                        var pix = imgd.data;

                        if (pix[0] === pix[width * 4 - 4] &&
                            pix[1] === pix[width * 4 - 3] &&
                            pix[2] === pix[width * 4 - 2] &&
                            pix[3] === pix[width  * 4 - 1])
                        {
                            // Take the corner value of the image and
                            //  detour it all around
                            var bgColor = [pix[0], pix[1], pix[2]];
                            var threshold = .005;

                            // Loop over each pixel and invert the color.
                            for (var i = 0, n = pix.length; i < n; i += 4) {
                                if (pix[i+3] < 255) {
                                    detour = false;
                                    break;
                                }
                                var dr = (pix[i] - bgColor[0]) / 255;
                                var dg = (pix[i+1] - bgColor[1]) / 255;
                                var db = (pix[i+2] - bgColor[2]) / 255;
                                var delta = dr * dr + dg * dg + db * db;
                                if (delta < threshold) {
                                    pix[i+3] = 255 * Math.pow(delta / threshold, 2);
                                }
                            }

                            if (detour) {
                                context.putImageData(imgd, 0, 0);
                                texture = new THREE.Texture(canvas);
                                texture.needsUpdate = true;
                                texture.premultiplyAlpha = true;
                                mat.map = texture;
                            }
                        }
                    }
                }
            },
            function (xhr) {
                // console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },
            function (xhr) {
                // console.log( 'An error happened' );
            }
        );

        if (useCache) {
            PEEKS.texturesCache[cacheName] = material.map;
        }

		// Don't mind not POT textures
        material.map.minFilter = THREE.LinearMipMapLinearFilter;

		material.map.wrapS = THREE.RepeatWrapping;
		material.map.wrapT = THREE.RepeatWrapping;
		if (textureRepeat) {
			material.map.repeat.set(textureRepeat[0], textureRepeat[1]);
		}

        if (flipX) {
            material.map.repeat.x = -1;
        }
        if (flipY) {
            material.map.repeat.y = -1;
        }
	}
}

PEEKS.ThreeSetObjectQuaternion = function(quaternion, alpha, beta, gamma, orient) {
    var zee = new THREE.Vector3( 0, 0, 1 );
    var euler = new THREE.Euler();
    var q0 = new THREE.Quaternion();
    var q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis
    euler.set( beta, alpha, - gamma, 'YXZ' ); // 'ZXY' for the device, but 'YXZ' for us
    quaternion.setFromEuler( euler ); // orient the device
    quaternion.multiply( q1 ); // camera looks out the back of the device, not the top
    quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) ); // adjust for screen orientation
}

PEEKS.ThreeTextureLoader = function(path) {
    if (path) {
        if (PEEKS.texturesCache[path]) {
            return PEEKS.texturesCache[path];
        }

        var loader = new THREE.TextureLoader();
        if (/^data:/.test(path)) {
            loader.setCrossOrigin(path);
        } else {
            loader.setCrossOrigin('');
        }
        var texture = loader.load(path);
        texture.name = path;
        PEEKS.texturesCache[path] = texture;
        return texture;
    }
}

PEEKS.ThreeColor = function(value, defaultValue) {
    value = value || defaultValue || [0, 0, 0];
    return new THREE.Color(value[0], value[1], value[2], 1);
}

PEEKS.ThreeFloat = function(value, defaultValue) {
    return value || defaultValue || 0;
}

PEEKS.Asset.prototype.threeSynchXform = function(threeObject) {
	if (threeObject === undefined) {
		threeObject = this.threeObject;
	}

	if (threeObject) {
        var camera = this.getCamera();
        var scene = this.getScene();

        if (this.position) {
            if (this === camera) {
                threeObject.position.set(
                    this.position[0],
                    this.position[1],
                    this.position[2]
                );
            } else {
                threeObject.position.set(
                    this.position[0],
                    this.position[1],
                    this.position[2]
                );
            }

            if (this.quaternion) {
                threeObject.quaternion.copy(new THREE.Quaternion(
                    this.quaternion[0],
                    this.quaternion[1],
                    this.quaternion[2],
                    this.quaternion[3]
                ));
            } else {
    			threeObject.rotation.set(
                    THREE.Math.degToRad(this.rotation[0]),
                    THREE.Math.degToRad(this.rotation[1]),
                    THREE.Math.degToRad(this.rotation[2])
                );
    			threeObject.rotation.order = this.rotationOrder;
            }

			threeObject.scale.set(this.size[0], this.size[1], this.size[2]);
		}

        if (this === camera) {
            if (scene && scene.deviceOrientation !== undefined && scene.isGyroMode()) {
                var alpha = scene.deviceOrientation.alpha;
                var beta = scene.deviceOrientation.beta;
                var gamma = scene.deviceOrientation.gamma;
                var orient = scene.screenOrientation || 0;
                threeObject.rotation.order = 'YXZ';
                PEEKS.ThreeSetObjectQuaternion(threeObject.quaternion,
                    THREE.Math.degToRad(alpha),
                    THREE.Math.degToRad(beta),
                    THREE.Math.degToRad(gamma),
                    THREE.Math.degToRad(orient));
            }
        } else if (this.type === 'Canvas') {
            var pivot = this.threeObjectPivot;
            pivot.position.copy(scene.three.camera.position);
            if (scene.isVrMode() && this.vrFixed !== true) {
                pivot.rotation.x = 0;
                pivot.rotation.y = 0;
                pivot.rotation.z = this.screenOrientation || 0;
            } else {
                pivot.quaternion.copy(scene.three.camera.quaternion);
            }

            var h = .5;
            var scene = this.getScene();
            var tan = Math.tan(THREE.Math.degToRad(scene.cameraAngle / 2));
            var distance = h / tan;
            if (scene.width < scene.height) {
                distance *= scene.height / scene.width;

                var valign = this.getAttr('valign');
                if (valign === 'bottom') {
                    pivot.position.y -= .5 * (scene.height - scene.width) / scene.width;
                } else if (valign === 'top') {
                    pivot.position.y += .5 * (scene.height - scene.width) / scene.width;
                }
            }

            var depthFactor = 10;
            threeObject.position.z -= distance * depthFactor;
            threeObject.scale.set(
                threeObject.scale.x * depthFactor,
                threeObject.scale.y * depthFactor,
                threeObject.scale.z * depthFactor);
		} else {
            this.threeObjectPivot.rotation.set(
                THREE.Math.degToRad(this.pivotRotation[0]),
                THREE.Math.degToRad(this.pivotRotation[1]),
                THREE.Math.degToRad(this.pivotRotation[2])
            );
        }

        // Adjust object in Virtual Screen space
        var screen = this.getScreen();
        if (screen && screen === this.parent) {
            var radius = screen.radius;

            var camPos = scene.three.camera.position;

            var alpha = THREE.Math.degToRad(90 - threeObject.position.x * 180);
            var beta = THREE.Math.degToRad(threeObject.position.y * 90);

            threeObject.rotation.order = 'YXZ';
            threeObject.rotation.x = beta;
            threeObject.rotation.y = -Math.PI / 2 + alpha;
            threeObject.rotation.z = 0;

            var zoom = Math.abs(
                scene.three.camera.quaternion.dot(threeObject.quaternion));
            if (zoom < .95) {
                zoom = 0;
            } else {
                zoom = (zoom - .95) * 20;
                zoom = zoom * zoom;
            }

            threeObject.position.x = camPos.x + radius * Math.cos(alpha);
            threeObject.position.y = camPos.y + radius * Math.sin(beta);
            threeObject.position.z = camPos.z + -radius * Math.sin(alpha);

            var scale = 2 * (.3 + .7 * zoom);

            threeObject.scale.set(
                threeObject.scale.x * scale,
                threeObject.scale.y * scale,
                threeObject.scale.z * scale);
        }
	}
}

PEEKS.Asset.prototype.threeSynchVideoTexture = function() {
	var threeObject = this.threeObject;
	if (threeObject && this.useVideoTexture) {
		var video;
		var scene = this.getScene();
		if (scene) {
            if (this.video === undefined) {
                this.DOMcreateElementVideo();
            }

			var video = this.video;
			var window = scene.window;
			var navigator = window.navigator;
			if (video && navigator) {
                if (this.checkVideoTexture && !this.stopVideoTexture) {
                    // Now we need to restart it like the very first time
                    this.checkVideoTexture = false;
                    video.texture = null;
                }

				if (threeObject.material && (threeObject.material.map === null || threeObject.material.map !== video.texture)) {
					if (!video.texture && !this.stopVideoTexture) {
						video.texture = new THREE.Texture(video);
                        video.texture.minFilter = THREE.NearestFilter;
                        video.texture.magFilter = THREE.NearestFilter;
                        if (this.videoUrl !== undefined) {
                            video.src = this.videoUrl;
                        } else {
                            // This is a camera stream by default
                            navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia );
    						if (navigator.getUserMedia) {
    							var facingMode = "user";
    							var constraints = {
                                    audio: false,
                                    video: { facingMode: facingMode }
                                };
    							navigator.mediaDevices.getUserMedia(constraints).
                                    then(function success(stream) {
                                        video.srcObject = stream;
                                        video.play();
                                        video.addEventListener("playing", function () {
                                            // Do something that is needed when video is ready
                                        });
                                    });
    						} else {
    							 this.error("getUserMedia not supported");
    						}
                        }
					}

					threeObject.material.map = video.texture;
				}

                if (this.stopVideoTexture) {
                    if (video.srcObject) {
                        if (video.srcObject.stop) {
                            video.srcObject.stop();
                        }
                        var tracks = video.srcObject.getTracks();
                        if (tracks) {
                            for (var trackI = 0; trackI < tracks.length; trackI++) {
                                var track = tracks[trackI];
                                if (track.stop) {
                                    track.stop();
                                }
                            }
                        }
                    }
                    this.checkVideoTexture = true;
                    // Still the texture is valid, just does not need to be updated (frozen)
                    return true;
                } else if (video.texture && video.readyState === video.HAVE_ENOUGH_DATA) {
                    var canvas = this.parent.canvas;
                    if (canvas && video.videoWidth !== 0 && video.videoHeight !== 0) {
                        var context = canvas.getContext('2d');
                        if (video.videoWidth !== canvas.width || video.videoHeight !== canvas.height) {
                            canvas.width = video.videoWidth;
                            canvas.height = video.videoHeight;
                            var newRatio = canvas.width / canvas.height;
                            var oldRatio = this.parent.size[0] / this.parent.size[1];
                            if (newRatio > oldRatio) {
                                this.parent.setSize([this.parent.size[0] * (newRatio / oldRatio), this.parent.size[1], 1]);
                            } else {
                                this.parent.setSize([this.parent.size[0], this.parent.size[1] * (oldRatio / newRatio), 1]);
                            }
                        }
                        this.parent.sides = 'back';
                        this.parent.setRotation([0, 180, 0]);
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(video.texture.image, 0, 0);
                        this.parent.canvasUpdated = true;
                    }

					video.texture.needsUpdate = true;
					return true;
				}
			}
		}
	}

	return false;
}

PEEKS.Asset.prototype.threeGetVisibility = function() {
	if (this.visible) {
		if (this.threeObject && this.useVideoTexture) {
			return this.threeSynchVideoTexture();
		} else {
			return true;
		}
	} else {
		return false;
	}
}

function colorToThreeColor(color) {
    return new THREE.Color(color[0], color[1], color[2], 1);
}

PEEKS.Scene.prototype.onGetCameraQuaternion = function() {
    var q = this.three.camera.quaternion;
    return [q.x, q.y, q.z, q.w];
}

PEEKS.Scene.prototype.onGetCameraTranslation = function(translation) {
    var quaternion = this.three.camera.quaternion;

    var vector = new THREE.Vector3(
        translation[0],
        translation[1],
        translation[2]);
    vector.applyQuaternion(quaternion);

    return [vector.x, vector.y, vector.z];
}

PEEKS.Scene.prototype.isVrMode = function() {
    return this.vrMode &&
        (this.isPhone
            ? (this.screenOrientation === -90 || this.screenOrientation === 90)
            : true);
}

PEEKS.Scene.prototype.onRender = function() {
    var three = this.three;

    this.camera.threeSynch(three.camera);
	this.threeSynch();
	if (this.page) {
        var bgColor = this.page.getAttrColor('bgColor', [0, 0, 0]);
		three.renderer.setClearColor(colorToThreeColor(bgColor));
	}

    var width = (this.width) ? this.width : 500;
	var height = (this.height) ? this.height : 500;

    if (this.isVrMode()) {
        three.renderer.setScissorTest(true);

        three.renderer.setViewport(width / 2, 0, width / 2, height);
        three.renderer.setScissor(width / 2, 0, width / 2, height);

        var width = (this.width) ? this.width : 500;
        var height = (this.height) ? this.height : 500;
        this.three.camera.aspect = (width / 2) / height;
        this.three.camera.updateProjectionMatrix();

        three.renderer.render(three.scene, three.camera);

        three.renderer.setViewport(0, 0, width / 2, height);
        three.renderer.setScissor(0, 0, width / 2, height);

        three.renderer.render(three.scene, three.camera);
    } else {
        this.three.renderer.setViewport(0, 0, width, height);
        this.three.renderer.setScissor(0, 0, width, height);
        this.three.renderer.setScissorTest(false);

        var width = (this.width) ? this.width : 500;
        var height = (this.height) ? this.height : 500;
        this.three.camera.aspect = width / height;
        this.three.camera.updateProjectionMatrix();

        this.three.renderer.render(this.three.scene, this.three.camera);
    }
},

PEEKS.Asset.prototype.threeSynchGeometry = function() {
    var asset = this;
    var threeObject = asset.threeObject;
    if (threeObject && threeObject.children.length > 0) {
        var geometry = threeObject.children[0];
        for (meshI = 0; meshI < geometry.children.length; meshI++) {
            var mesh = geometry.children[meshI];
            if (mesh.geometry !== undefined) {
                if (mesh.geometry.positionInitial === undefined) {
                    mesh.geometry.positionInitial = mesh.geometry.attributes.position.array.slice();
                } else {
                    mesh.geometry.attributes.position.array = mesh.geometry.positionInitial.slice();
                    mesh.geometry.attributes.position.needsUpdate = true;
                }
                var vtx = mesh.geometry.attributes.position.array;
                var vtxRef = mesh.geometry.positionInitial;
                for (var shapeName in asset.shapes) {
                    if (asset.shapes.hasOwnProperty(shapeName)) {
                        //console.log("synching " + this.name + " -> " + shape);
                        var shape = asset.shapes[shapeName];
                        var weight = shape.weightEval;
                        if (weight !== 0 &&
                            shape.threeObject &&
                            shape.threeObject.children.length > 0)
                        {
                            var shapeGeometry = shape.threeObject.children[0];
                            if (meshI < shapeGeometry.children.length) {
                                var shapeMesh = shapeGeometry.children[meshI];
                                if (shapeMesh.geometry !== undefined) {
                                    var shapeVtx = shapeMesh.geometry.attributes.position.array;
                                    for (var vtxI = 0; vtxI < vtx.length; vtxI++) {
                                        vtx[vtxI] += (shapeVtx[vtxI] - vtxRef[vtxI]) * weight;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
},

PEEKS.ThreeShaderAttr = function(material, name, value) {
    if (typeof value === 'string') {
        // This is a texture resource to load
        value = PEEKS.ThreeTextureLoader(value);
    }
    material[name] = value;
    material.uniforms[name].value = value;
},

PEEKS.Asset.prototype.threeSynchMaterial = function() {
    var asset = this;
    var threeObject = asset.threeObject;
    if (!threeObject) {
        return;
    }
    for (var geomI = 0; geomI < threeObject.children.length; geomI++) {
        var geometry = threeObject.children[geomI];
        for (var childI = 0; childI < geometry.children.length; childI++) {
            var child = geometry.children[childI];
            if (child instanceof THREE.Mesh) {
                if (child.geometry && child.material) {
                    var refMat = asset.material || {};
                    if (refMat.type === 'velvet') {
                        var shader = THREE.ShaderPeeks["fabric"];
        				var fragmentShader = shader.fragmentShader;
        				var vertexShader = shader.vertexShader;
        				var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
        				//uniforms[ "enableBump" ].value = true;
        				uniforms[ "enableSpecular" ].value = true;
                        uniforms[ "tBeckmann" ].value = PEEKS.ThreeTextureLoader(refMat.specularMap);
                        uniforms[ "tDiffuse" ].value = PEEKS.ThreeTextureLoader(asset.textureUrl);
        				uniforms[ "diffuse" ].value.setHex( 0xffffff );
        				uniforms[ "specular" ].value.setHex( 0xa0a0a0 );
        				uniforms[ "uRoughness" ].value = 0.2;
        				uniforms[ "uSpecularBrightness" ].value = 0.5;
        				uniforms[ "bumpScale" ].value = 8;
        				var material = new THREE.ShaderMaterial( { fragmentShader: fragmentShader, vertexShader: vertexShader, uniforms: uniforms, lights: true } );
        				material.extensions.derivatives = true;
                        child.material = material;
                        if (refMat.type === "velvet") {
                            uniforms["uFresnelBias"].value = 0.01;
                            uniforms["uFresnelPower"].value = 2.0;
                            uniforms["uFresnelScale"].value = 0.4;
                            uniforms["uFresnelColor"].value = [1.0, 1.0, 1.0];
                        } else {
                            uniforms["uFresnelScale"].value = 0.0;
                        }
                    } else if (refMat.type === 'phong') {
                        var shader = THREE.ShaderPeeks["phong"];
        				var fragmentShader = shader.fragmentShader;
        				var vertexShader = shader.vertexShader;
        				var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
        				var material = new THREE.ShaderMaterial( {
                            fragmentShader: fragmentShader,
                            vertexShader: vertexShader,
                            uniforms: uniforms,
                            lights: true,
                        } );
                        child.material = material;

                        /*
                        Internal defaults:

                        material.type = 'MeshPhongMaterial';
                        material.color = new THREE.Color( 0xff0000 ); // diffuse
                        material.specular = new THREE.Color( 0x0000ff );
                        material.shininess = 30;

                        material.lightMap = null;
                        material.lightMapIntensity = 1.0;

                        material.aoMap = null;
                        material.aoMapIntensity = 1.0;

                        material.emissive = new THREE.Color( 0x000000 );
                        material.emissiveIntensity = 1.0;
                        material.emissiveMap = null;

                        material.bumpMap = null;
                        material.bumpScale = 1;

                        material.normalMap = null;
                        material.normalScale = new THREE.Vector2( 1, 1 );

                        material.displacementMap = null;
                        material.displacementScale = 1;
                        material.displacementBias = 0;

                        material.specularMap = null;

                        material.alphaMap = null;

                        material.envMap = null;
                        material.combine = THREE.MultiplyOperation;
                        material.reflectivity = 1;
                        material.refractionRatio = 0.98;

                        material.wireframe = false;
                        material.wireframeLinewidth = 1;
                        material.wireframeLinecap = 'round';
                        material.wireframeLinejoin = 'round';

                        material.skinning = false;
                        material.morphTargets = false;
                        material.morphNormals = false;
                        */

                        material.extensions.derivatives = true;
                        material.extensions.fragDepth = true;
            			material.extensions.drawBuffers = true;
                        material.extensions.shaderTextureLOD = true;

                        // Defaults:
                        material.color = 0xffffff;
                        material.transparent = true;
                        material.side = THREE.FrontSide;
                        material.depthTest = true;

                        PEEKS.ThreeShaderAttr(material, 'map', asset.textureUrl);
                        PEEKS.ThreeShaderAttr(material, 'normalMap', refMat.normalMap);
                        PEEKS.ThreeShaderAttr(material, 'alphaMap', refMat.alphaMap);
                        PEEKS.ThreeShaderAttr(material, 'bumpMap', refMat.bumpMap);
                        PEEKS.ThreeShaderAttr(material, 'opacity', PEEKS.ThreeFloat(asset.alpha, 1));
                        PEEKS.ThreeShaderAttr(material, 'reflectivity', PEEKS.ThreeFloat(refMat.reflectivity , .2));
                        PEEKS.ThreeShaderAttr(material, 'shininess', PEEKS.ThreeFloat(refMat.shininess , 10));
                        PEEKS.ThreeShaderAttr(material, 'emissive', PEEKS.ThreeColor(refMat.emissive, [.05, .05, .05]));
                        PEEKS.ThreeShaderAttr(material, 'specular', PEEKS.ThreeColor(refMat.specular, [.05, .05, .05]));
                        // PEEKS.ThreeShaderAttr(material, 'color', PEEKS.ThreeColor(refMat.color, [1, 1, 1]));
                        // PEEKS.ThreeShaderAttr(material, 'side', THREE.FrontSide);
                    } else {
                        var material = child.material;
                        if (material.type !== 'MeshPhongMaterial') {
                            material = new THREE.MeshPhongMaterial({
                                color: 0xffffff,
                                transparent: true,
                                side: THREE.FrontSide,
                                depthTest: true,
                            });
                            child.material = material;
                        }
                        material.map = PEEKS.ThreeTextureLoader(asset.textureUrl);
                        material.transparent = true;
                        material.opacity = PEEKS.ThreeFloat(asset.alpha, 1);
                        material.reflectivity = PEEKS.ThreeFloat(refMat.reflectivity , .2);
                        material.shininess = PEEKS.ThreeFloat(refMat.shininess, 10);
                        material.emissive = PEEKS.ThreeColor(refMat.emissive, [.05, .05, .05]);
                        material.specular = PEEKS.ThreeColor(refMat.specular, [.05, .05, .05]);
                        material.normalMap = PEEKS.ThreeTextureLoader(refMat.normalMap);
                        material.alphaMap = PEEKS.ThreeTextureLoader(refMat.alphaMap);
                        material.bumpMap = PEEKS.ThreeTextureLoader(refMat.bumpMap);
                        asset.getAttrColor('color', [1, 1, 1, 1]);
                        material.color = PEEKS.ThreeColor(asset.color, [1, 1, 1]);
                        material.side = THREE.FrontSide;
                    }
                }
            }
        }
    }
},

PEEKS.Asset.prototype.threeSynch = function(threeObject) {
	if (!this.threeObject) {
		if (this.primitive) {
			var isScreenSpace = false;
			var parent = this;
			while (parent) {
				if (parent.type === 'Canvas') {
					isScreenSpace = true;
					break;
				}
				parent = parent.parent;
			}

            if (this.primitive === PEEKS.Asset.PrimitiveCube) {
                var geometry = new THREE.CubeGeometry(1, 1, 1);
                var material = new THREE.MeshPhongMaterial({
                    color: 0xffffff,
                    transparent: false,
                    side: THREE.FrontSide,
                    //shading: THREE.SmoothShading,
                    depthTest: isScreenSpace ? false : true,
                });
                this.threeObject = new THREE.Mesh(geometry, material);
            } else if (this.primitive === PEEKS.Asset.PrimitiveRibbon) {
                var points = [];
                if (this.points) {
                    for (var pointI = 0; pointI < this.points.length; pointI++) {
                        points.push(new THREE.Vector3(
                            this.points[pointI][0],
                            this.points[pointI][1],
                            this.points[pointI][2]));
                    }
                }

                var geometry = new THREE.BufferGeometry().setFromPoints( points );

                var material = new THREE.LineBasicMaterial();

                this.threeObject = new THREE.Line( geometry, material );
            } else if (this.primitive === PEEKS.Asset.PrimitiveSphere) {
                var geometry = new THREE.SphereGeometry(1, 32, 32);
                var material = new THREE.MeshBasicMaterial({
                    color: 0xff0000,
                    transparent: true,
                    side: this.getAttr('sides') === 'back' ? THREE.BackSide : THREE.FrontSide,
                    depthTest: isScreenSpace ? false : true,
                    depthWrite: this.getAttr('depthWrite') === 'false' ? false : true,
                });
                this.threeObject = new THREE.Mesh(geometry, material);
                PEEKS.ThreeLoadTexture(material, this.getAttr('textureUrl'), this.textureRepeat);
            } else if (this.primitive === PEEKS.Asset.PrimitiveCurvedPanel) {
                var geometry = new THREE.SphereGeometry(1, 32, 32,
                    Math.PI * 1.45, Math.PI * .1,
                    Math.PI * .45, Math.PI * .1);
                var material = new THREE.MeshBasicMaterial({
                    color: 0xff0000,
                    transparent: true,
                    side: this.getAttr('sides') === 'back' ? THREE.BackSide : THREE.FrontSide,
                    depthTest: isScreenSpace ? false : true,
                    depthWrite: this.getAttr('depthWrite') === 'false' ? false : true,
                });
                this.threeObject = new THREE.Mesh(geometry, material);
                PEEKS.ThreeLoadTexture(material, this.getAttr('textureUrl'), this.textureRepeat, true);
            } else if (this.primitive === PEEKS.Asset.PrimitiveDisc) {
                var geometry = new THREE.CircleGeometry(.5, 32);
                var material = new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    transparent: true,
                    depthTest: isScreenSpace ? false : true,
                });
                PEEKS.ThreeLoadTexture(material, this.getAttr('textureUrl'),
                    this.textureRepeat,
                    false, false,
                    this.imageDetour
                );
                this.threeObject = new THREE.Mesh(geometry, material);
            } else if (this.primitive === PEEKS.Asset.PrimitiveRing) {
                var geometry = new THREE.RingGeometry(0.4, 0.5, 32);
                var material = new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    transparent: true,
                    depthTest: isScreenSpace ? false : true,
                });
                this.threeObject = new THREE.Mesh(geometry, material);
            } else if (this.primitive === PEEKS.Asset.PrimitiveCircle) {
                var geometry = new THREE.RingGeometry(0.48, 0.5, 32);
                var material = new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    transparent: true,
                    depthTest: isScreenSpace ? false : true,
                });
                this.threeObject = new THREE.Mesh(geometry, material);
            } else if (this.primitive === PEEKS.Asset.PrimitiveMesh) {
                this.threeObject = new THREE.Object3D();

                var manager = new THREE.LoadingManager();
                    manager.onProgress = function ( item, loaded, total ) {
                    // console.log( item, loaded, total );
                };

                var onProgress = function (xhr) {
                };

                var onError = function (xhr) {
                };

                var peeksObject = this;
                var node = this.threeObject;
                this.threeObject.peeksAsset = peeksObject;
                var autofit = this.getAttr('autofit');
                var loader = new THREE.OBJLoader( manager );
                loader.load(this.geometryUrl, function ( object ) {
                    node.add(object);
                    if (autofit) {
                        var boundingSphere;
                        object.traverse( function ( child ) {
                            if ( child instanceof THREE.Mesh ) {
                                if (child.geometry) {
                                    child.geometry.computeBoundingSphere();
                                    if (boundingSphere === undefined) {
                                        boundingSphere = child.geometry.boundingSphere;
                                    }
                                    child.position.set(
                                        -boundingSphere.center.x,
                                        -boundingSphere.center.y,
                                        -boundingSphere.center.z
                                    );
                                }
                            }
                        });
                    }

                    object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            if (child.geometry) {
                                child.geometry.computeFaceNormals();
                            }
                        }
                    });

                    object.parent.peeksAsset.threeSynchMaterial();
                }, onProgress, onError );
            } else if (this.primitive === PEEKS.Asset.PrimitivePlane) {
                if (this.getAttr('text')) {
                    this.threeObject = new THREE.Object3D();

					var geometry = new THREE.PlaneGeometry(1, 1);
					var material = new THREE.MeshBasicMaterial({
						color: 0xffffff,
						transparent: true,
						side: THREE.FrontSide,
						depthTest: isScreenSpace ? false : true,
					});

					var plane = new THREE.Mesh(geometry, material);
					this.threeObject.add(plane);

					textTexture = this.createTextTexture();
					if (textTexture) {
						var texture = new THREE.Texture(textTexture.canvas);
						texture.needsUpdate = true;
						texture.premultiplyAlpha = true;
						material.map = texture;
                        if (textTexture.size) {
                            if (textTexture.size[0] > textTexture.size[1]) {
                                plane.scale.x = textTexture.size[0] / textTexture.textSize[0];
                                plane.scale.y = plane.scale.x * textTexture.size[1] / textTexture.size[0];
                            } else {
                                plane.scale.y = textTexture.size[1] / textTexture.textSize[1];
                                plane.scale.x = plane.scale.y * textTexture.size[0] / textTexture.size[1];
                            }

                            // Reset to have a fixed fit in height for all texts
                            // unless specified to fit in width (and then fallback to above computation)
                            plane.scale.x = textTexture.size[0] * .0005;
                            plane.scale.y = textTexture.size[1] * .0005;

                            var scale = this.getPropagatedSize();
                            if (scale[0] > scale[1]) {
                                plane.scale.y *= scale[0] / scale[1];
                            } else {
                                plane.scale.y *= scale[1] / scale[0];
                            }

                            var yOffset = (textTexture.relativeTop - textTexture.relativeBot) / 2;
                            yOffset = yOffset / textTexture.size[1];
                            plane.position.y = plane.scale.y * yOffset;
                        }
					}
                } else {
					var backSide;

					if (this.textureBackUrl !== "") {
						var geometry = new THREE.PlaneGeometry(1, 1);
						var material = new THREE.MeshBasicMaterial({
							color: 0xffffff,
							transparent: true,
							side: THREE.FrontSide,
						});
						backSide = new THREE.Mesh(geometry, material);
						backSide.rotation.y = THREE.Math.degToRad(180);
						PEEKS.ThreeLoadTexture(material, this.textureBackUrl,
                            this.textureRepeat,
                            false, false,
                            this.imageDetour
                        );
					}

					var geometry = new THREE.PlaneGeometry(1, 1);
					var material = new THREE.MeshBasicMaterial({
						color: 0xffffff,
						transparent: true,
						side: backSide ? THREE.FrontSide : THREE.DoubleSide,
						depthTest: isScreenSpace ? false : true,
					});

					var plane = new THREE.Mesh(geometry, material);
					this.threeObject = plane;

                    PEEKS.ThreeLoadTexture(material, this.getAttr('textureUrl'),
                        this.textureRepeat,
                        false, false,
                        this.imageDetour
                    );

					if (backSide) {
						this.threeObject.add(backSide);
					}
				}
			} else {
				this.threeObject = new THREE.Object3D();
			}
		} else {
			this.threeObject = new THREE.Object3D();
		}
		this.threeObjectPivot = new THREE.Object3D();
		this.threeObjectPivot.add(this.threeObject);

		this.threeObject.peeksAsset = this;
	} else {
        if (this.primitive === PEEKS.Asset.PrimitiveMesh) {
            if (this.materialNeedsUpdate) {
                this.materialNeedsUpdate = false;
                this.threeSynchMaterial();
            }

            if (this.shapes) {
                this.threeSynchGeometry();
            }
        }
    }

	this.threeSynchVideoTexture();

	this.threeObject.visible = this.threeGetVisibility();

	if (threeObject === undefined) {
		threeObject = this.threeObject;
	}

	if (!threeObject.visible) {
		// Skip any operations on such objects
		return;
	}

	this.threeSynchXform(threeObject);

	if (threeObject.material) {
		var color = this.getAttrColor('color', [1, 1, 1, 1]);
		if (this.getAttr('textureUrl') === undefined || this.getAttr('textureUrl') === "") {
            color = this.getAttrColor('viewBgColor');
		}
		if (color && threeObject.material.color) {
			threeObject.material.color.r = color[0];
			threeObject.material.color.g = color[1];
			threeObject.material.color.b = color[2];
		}
        // Comment this out to vizualize all layers for debug
        threeObject.material.opacity = this.getAttr('alpha', 1);
        var sides = this.getAttr('sides');
        switch (sides) {
            case 'back':
                threeObject.material.side = THREE.BackSide;
                break;
            case 'both':
                threeObject.material.side = THREE.DoubleSide;
                break;
            default:
            case 'front':
                threeObject.material.side = THREE.FrontSide;
                break;
        }
        threeObject.material.depthWrite = this.getAttr('depthWrite') === 'false' ? false : true;

        // Check on aspect ratio in case of texture present
        if (this.primitive === PEEKS.Asset.PrimitivePlane) {
            if (threeObject.material &&
                threeObject.material.map &&
                threeObject.material.map.image)
            {
                var image = threeObject.material.map.image;
                if (image.width !== 0 && image.height !== 0) {
                    var ratio = image.width / image.height;
                    var sizeRatio = threeObject.scale.x / threeObject.scale.y;
                    if (ratio !== sizeRatio) {
                        var valign = this.valign;
                        if (ratio < sizeRatio) {
                            threeObject.scale.x = ratio * threeObject.scale.y;
                        } else {
                            threeObject.scale.y = threeObject.scale.x / ratio;
                            if (valign) {
                                switch (valign) {
                                    case 'top': {
                                        threeObject.position.y += (1 - threeObject.scale.y) / 2;
                                        break;
                                    }
                                    case 'bottom': {
                                        threeObject.position.y -= (1 - threeObject.scale.y) / 2;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
	}

	for (var childI = 0; childI < this.children.length; childI++) {
		var child = this.children[childI];
		if (!child.threeObject) {
			child.threeSynch();
			this.threeObject.add(child.threeObjectPivot);
		} else {
			child.threeSynch();
		}
	}

	return this.threeObject;
}

PEEKS.Asset.prototype.threeGetNode = function() {
	this.threeSynch();
	return this.threeObject;
}

PEEKS.Asset.prototype.onUnload = function() {
	if (this.threeObjectPivot) {
		if (this.threeObjectPivot.parent) {
			this.threeObjectPivot.parent.remove(this.threeObjectPivot);
		}
		delete this.threeObjectPivot;
		delete this.threeObject;
	}
}

PEEKS.Scene.prototype.onPickNode = function(mouse) {
    if (mouse === undefined) {
        return;
    }

	var raycaster = new THREE.Raycaster();
	raycaster.setFromCamera(new THREE.Vector3(mouse[0], mouse[1], 0), this.three.camera);
	var objects = raycaster.intersectObjects(this.threeObject.children, true);

    // First pass for Canvas only object
	for (var objectI = 0; objectI < objects.length; objectI++) {
		var object = objects[objectI].object;
		while (object) {
			if (object.peeksAsset && object.peeksAsset.onClick !== undefined) {
				if (object.peeksAsset !== this && object.peeksAsset.isInCanvas()) {
					return object.peeksAsset;
				}
			}
			object = object.parent;
		}
	}

    // Second pass for any other object
	for (var objectI = 0; objectI < objects.length; objectI++) {
		var object = objects[objectI].object;
		while (object) {
			if (object.peeksAsset && object.peeksAsset.onClick !== undefined) {
				if (object.peeksAsset !== this) {
					return object.peeksAsset;
				}
			}
			object = object.parent;
		}
	}

	// Third pass for default click if handled
	for (var objectI = 0; objectI < objects.length; objectI++) {
		var object = objects[objectI].object;
		while (object) {
			if (object.peeksAsset) {
				if (object.peeksAsset !== this) {
					return object.peeksAsset;
				}
			}
			object = object.parent;
		}
	}
}

PEEKS.Scene.prototype.onResize = function(width, height) {
    if (width && height) {
        // If dimensions are specified, make sure update is required
        if (width === this.width && height === this.height) {
            return;
        }
        //console.log('Resizing Canvas from ' + this.width.toString() + 'x' + this.height.toString() + ' to ' + width.toString() + 'x' + height.toString());
        this.width = width;
        this.height = height;
    } else {
        width = (this.width) ? this.width : 500;
    	height = (this.height) ? this.height : 500;
        //console.log('Setting initial size to ' + this.width.toString() + 'x' + this.height.toString());
    }
    this.three.camera.aspect = width / height;
    this.three.camera.updateProjectionMatrix();
    this.three.renderer.setSize(width, height);
}

PEEKS.Scene.prototype.onStart = function() {
	this.three = {};
    var scene = new THREE.Scene();
    var a_scene = document.querySelector('a-scene')
    if (a_scene) {
        // Use A-Frame's scene instead
        console.log(a_scene);
        scene = a_scene.object3D;
    }
	var ambient = new THREE.AmbientLight( 0x101010 );
	scene.add(ambient);
	var directionalLight = new THREE.DirectionalLight( 0xdddddd );
	directionalLight.position.set(0, 0, -1);
	scene.add( directionalLight );
    var directionalLight = new THREE.DirectionalLight( 0xdddddd );
	directionalLight.position.set(0, 0, 1);
	scene.add( directionalLight );

    var canvas = this.domElement;
    if (canvas === undefined) {
        canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
    }
    var renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas: canvas,
        // This improves performances a lot of course, we may want this
        //  as an option in case we're just dealing with textured elements
        // antialias: false,
    });
    renderer.sortObjects = false;
	renderer.setClearColor(0xffffff, 1);

    // Always work retina-style with 4 fragments per pixel
    // This should be adaptive based on the device performances
    renderer.setPixelRatio(window.devicePixelRatio);

    this.cameraAngle = 55;
	var camera = new THREE.PerspectiveCamera(this.cameraAngle, 1, 0.1, 1000);
    var a_camera = document.querySelector('a-camera')
    if (a_camera) {
        // Use A-Frame's scene instead
        console.log(a_camera);
        if (a_camera.object3D && a_camera.object3D.children[0]) {
            var perspectiveCamera = a_camera.object3D.children[0]
            if (perspectiveCamera.type === 'PerspectiveCamera') {
                camera = perspectiveCamera;
            }
        }
        //camera = a_camera.object3D;
    }

    this.three.scene = scene;
	this.three.camera = camera;
	this.three.renderer = renderer;
	this.domElement = this.three.renderer.domElement;

    // For camera debug and added pivot
    //var cameraHelper = new THREE.CameraHelper( camera );
    //scene.add( cameraHelper );
    //var camPivot = new THREE.Object3D();
    //scene.add(camPivot);
    //camPivot.add(camera);
    //camPivot.rotation.x = THREE.Math.degToRad(10);

    this.three.scene.add(this.threeGetNode());

    this.onResize();
}

THREE.ShaderPeeks = {
    'fabric' : {
		uniforms: THREE.UniformsUtils.merge( [
			THREE.UniformsLib[ "lights" ],
			{
				"enableBump": { value: 0 },
				"enableSpecular": { value: 0 },
				"tDiffuse": { value: null },
				"tBeckmann": { value: null },
				"diffuse": { value: new THREE.Color( 0xeeeeee ) },
				"specular": { value: new THREE.Color( 0x111111 ) },
				"opacity": { value: 1 },
				"uRoughness": { value: 0.15 },
				"uSpecularBrightness": { value: 0.75 },
				"bumpMap": { value: null },
				"bumpScale": { value: 1 },
				"offsetRepeat": { value: new THREE.Vector4( 0, 0, 1, 1 ) },
				"uWrapRGB": { value: new THREE.Vector3( 0.75, 0.375, 0.1875 ) },

                "uFresnelBias": { value: 0.1 },
        		"uFresnelPower": { value: 2.0 },
        		"uFresnelScale": { value: 1.0 },
                "uFresnelColor": { value: [1.0, 1.0, 1.0] },
			}
		] ),

		fragmentShader: [
			"#define USE_BUMPMAP",
			"uniform bool enableBump;",
			"uniform bool enableSpecular;",
			"uniform vec3 diffuse;",
			"uniform vec3 specular;",
			"uniform float opacity;",
			"uniform float uRoughness;",
			"uniform float uSpecularBrightness;",
			"uniform vec3 uWrapRGB;",
			"uniform sampler2D tDiffuse;",
            "uniform sampler2D tBeckmann;",
			"varying vec3 vNormal;",
			"varying vec2 vUv;",
			"varying vec3 vViewPosition;",

			THREE.ShaderChunk[ "common" ],
			THREE.ShaderChunk[ "bsdfs" ],
			THREE.ShaderChunk[ "packing" ],
			THREE.ShaderChunk[ "lights_pars" ],
			THREE.ShaderChunk[ "bumpmap_pars_fragment" ],

			// Fresnel term
			"float fresnelReflectance( vec3 H, vec3 V, float F0 ) {",
				"float base = 1.0 - dot( V, H );",
				"float exponential = pow( base, 5.0 );",
				"return exponential + F0 * ( 1.0 - exponential );",
			"}",

			// Kelemen/Szirmay-Kalos specular BRDF
			"float KS_Skin_Specular(vec3 N, vec3 L, vec3 V, float m, float rho_s) {",
				"float result = 0.0;",
				"float ndotl = dot( N, L );",
				"if( ndotl > 0.0 ) {",
					"vec3 h = L + V;", // Unnormalized half-way vector
					"vec3 H = normalize( h );",
					"float ndoth = dot( N, H );",
                    "float PH = pow( 2.0 * texture2D( tBeckmann, vec2( ndoth, m ) ).x, 10.0 );",
					"float F = fresnelReflectance( H, V, 0.028 );",
					"float frSpec = max( PH * F / dot( h, h ), 0.0 );",
					"result = ndotl * rho_s * frSpec;", // BRDF * dot(N,L) * rho_s
				"}",
				"return result;",
			"}",

            "uniform vec3 uFresnelColor;",
            "varying float vReflectionFactor;",
            "varying float vSpecularFactor;",

            "#if NUM_DIR_LIGHTS > 0",
            "uniform vec3 directionalLightColor[NUM_DIR_LIGHTS];",
            "uniform vec3 directionalLightDirection[NUM_DIR_LIGHTS];",
            "#endif",

            "void main() {",
                "vec3 outgoingLight = vec3( 0.0 );",
                "vec4 diffuseColor = vec4( diffuse, opacity );",
				"vec4 colDiffuse = texture2D( tDiffuse, vUv );",
				"colDiffuse.rgb *= colDiffuse.rgb;",
				"diffuseColor = diffuseColor * colDiffuse;",
				"vec3 normal = normalize( vNormal );",
				"vec3 viewerDirection = normalize( vViewPosition );",

				"float specularStrength = 1.0;",

				"vec3 totalSpecularLight = vec3( 0.0 );",
				"vec3 totalDiffuseLight = vec3( 0.0 );",

				"#if NUM_DIR_LIGHTS > 0",
					"for( int i = 0; i < NUM_DIR_LIGHTS; i++ ) {",
						"vec3 dirVector = directionalLights[ i ].direction;",
						"float dirDiffuseWeightFull = max( dot( normal, dirVector ), 0.0 );",
						"float dirDiffuseWeightHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );",
						"vec3 dirDiffuseWeight = mix( vec3 ( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), 0.5 );",
                        "totalDiffuseLight += directionalLights[ i ].color * dirDiffuseWeight;",

                        "float dirSpecularWeight = KS_Skin_Specular( normal, dirVector, viewerDirection, uRoughness, uSpecularBrightness );",
                        "totalSpecularLight += directionalLights[ i ].color * ( dirSpecularWeight * specularStrength );",

                        /*
                        "vec3 lightVector = normalize(uLightPosition - vVertex);",
                        "float lightDiffuseFactor = clamp(dot(normal, lightVector), 0.0, 1.0);",
                        "vec3 light" + lightId + "Reflection = normalize(reflect(-light" + lightId + "Vector, normal));\n",
                        "float light" + lightId + "SpecularFactor = dot(normalize(vec3(0.0, 0.0, 1000.0) - vVertex), light" + lightId + "Reflection);\n",
                        "light" + lightId + "SpecularFactor = pow(light" + lightId + "SpecularFactor, uCosinePower) * uReflectivity;\n",
                        "light" + lightId + "SpecularFactor = clamp(light" + lightId + "SpecularFactor, 0.0, 1.0);\n",
                        "lightDiffuse += uLight" + lightId + "Color.rgb * light" + lightId + "DiffuseFactor;\n",
                        "lightSpecular += light" + lightId + "SpecularFactor * uLight" + lightId + "Color;\n",
                        "lightSpecularAlpha += light" + lightId + "SpecularFactor;\n",
                        */
					"}",
				"#endif",

				"outgoingLight += diffuseColor.rgb * ( totalDiffuseLight + ambientLightColor * diffuse ) + totalSpecularLight;",

                "gl_FragColor = vec4(outgoingLight, 1.0);",
                // "gl_FragColor.rgb = gl_FragColor.rgb * (1.0 - clamp( vSpecularFactor, 0.0, 0.7 ));",
                "gl_FragColor = mix( gl_FragColor, vec4( uFresnelColor, 1.0 ), clamp( vReflectionFactor, 0.0, 1.0 ) );",
			"}"
		].join( "\n" ),

		vertexShader: [
			"uniform vec4 offsetRepeat;",
			"varying vec3 vNormal;",
			"varying vec2 vUv;",
			"varying vec3 vViewPosition;",
			THREE.ShaderChunk[ "common" ],
			THREE.ShaderChunk[ "lights_pars" ],
            "uniform float uFresnelBias;",
    		"uniform float uFresnelScale;",
            "uniform float uFresnelPower;",
            "varying float vReflectionFactor;",
            //"varying float vDiffuseFactor;",
            //"varying float vSpecularFactor;",
			"void main() {",
				"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
				"vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
				"vViewPosition = -mvPosition.xyz;",
				"vNormal = normalize( normalMatrix * normal );",
				"vUv = uv * offsetRepeat.zw + offsetRepeat.xy;",
				"gl_Position = projectionMatrix * mvPosition;",
    			"vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );",
    			"vec3 I = worldPosition.xyz - cameraPosition;",
                "vReflectionFactor = uFresnelBias + uFresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), uFresnelPower );",
                //"vReflectionFactor = 0.01 + 1.0 * pow( 1.0 + dot( normalize( I ), worldNormal ), 2.0 );",
                //"vDiffuseFactor = 0.2 + 2.0 * pow( 1.0 + dot( normalize( I ), worldNormal ), 1.0 );",
                //"vSpecularFactor = 0.2 + 2.0 * pow( 1.0 + dot( normalize( I ), worldNormal ), 1.0 );",
			"}"
		].join( "\n" )

	},

    'phong' : {
		uniforms: THREE.UniformsUtils.merge( [
            THREE.UniformsLib.common,
            THREE.UniformsLib.specularmap,
            THREE.UniformsLib.envmap,
            THREE.UniformsLib.aomap,
            THREE.UniformsLib.lightmap,
            THREE.UniformsLib.emissivemap,
            THREE.UniformsLib.bumpmap,
            THREE.UniformsLib.normalmap,
            THREE.UniformsLib.displacementmap,
            THREE.UniformsLib.gradientmap,
            THREE.UniformsLib.fog,
            THREE.UniformsLib.lights,
            {
                emissive: { value: new THREE.Color( 0x000000 ) },
                specular: { value: new THREE.Color( 0x111111 ) },
                shininess: { value: 30 }
            }
		] ),

		fragmentShader: [
            // "#define PHONG",
            "uniform vec3 diffuse;",
            "uniform vec3 emissive;",
            "uniform vec3 specular;",
            "uniform float shininess;",
            "uniform float opacity;",
            THREE.ShaderChunk[ "common" ],
            THREE.ShaderChunk[ "packing" ],
            THREE.ShaderChunk[ "dithering_pars_fragment" ],
            THREE.ShaderChunk[ "color_pars_fragment" ],
            THREE.ShaderChunk[ "uv_pars_fragment" ],
            THREE.ShaderChunk[ "uv2_pars_fragment" ],
            THREE.ShaderChunk[ "map_pars_fragment" ],
            THREE.ShaderChunk[ "alphamap_pars_fragment" ],
            THREE.ShaderChunk[ "aomap_pars_fragment" ],
            THREE.ShaderChunk[ "lightmap_pars_fragment" ],
            THREE.ShaderChunk[ "emissivemap_pars_fragment" ],
            THREE.ShaderChunk[ "envmap_pars_fragment" ],
            THREE.ShaderChunk[ "gradientmap_pars_fragment" ],
            THREE.ShaderChunk[ "fog_pars_fragment" ],
            THREE.ShaderChunk[ "bsdfs" ],
            THREE.ShaderChunk[ "lights_pars" ],
            THREE.ShaderChunk[ "lights_phong_pars_fragment" ],
            THREE.ShaderChunk[ "shadowmap_pars_fragment" ],
            THREE.ShaderChunk[ "bumpmap_pars_fragment" ],
            THREE.ShaderChunk[ "normalmap_pars_fragment" ],
            THREE.ShaderChunk[ "specularmap_pars_fragment" ],
            THREE.ShaderChunk[ "logdepthbuf_pars_fragment" ],
            THREE.ShaderChunk[ "clipping_planes_pars_fragment" ],
            "void main() {",
                THREE.ShaderChunk[ "clipping_planes_fragment" ],
                "vec4 diffuseColor = vec4( diffuse, opacity );",
                "ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );",
                "vec3 totalEmissiveRadiance = emissive;",
                THREE.ShaderChunk[ "logdepthbuf_fragment" ],
                THREE.ShaderChunk[ "map_fragment" ],
                THREE.ShaderChunk[ "color_fragment" ],
                THREE.ShaderChunk[ "alphamap_fragment" ],
                THREE.ShaderChunk[ "alphatest_fragment" ],
                THREE.ShaderChunk[ "specularmap_fragment" ],
                THREE.ShaderChunk[ "normal_fragment" ],
                THREE.ShaderChunk[ "emissivemap_fragment" ],
                THREE.ShaderChunk[ "lights_phong_fragment" ],
                THREE.ShaderChunk[ "lights_template" ],
                THREE.ShaderChunk[ "aomap_fragment" ],
                "vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;",
                THREE.ShaderChunk[ "envmap_fragment" ],
                "gl_FragColor = vec4( outgoingLight, diffuseColor.a );",
                THREE.ShaderChunk[ "tonemapping_fragment" ],
                THREE.ShaderChunk[ "encodings_fragment" ],
                THREE.ShaderChunk[ "fog_fragment" ],
                THREE.ShaderChunk[ "premultiplied_alpha_fragment" ],
                THREE.ShaderChunk[ "dithering_fragment" ],
            "}"
		].join( "\n" ),

		vertexShader: [
            // "#define PHONG",
            "varying vec3 vViewPosition;",
            "#ifndef FLAT_SHADED",
            "varying vec3 vNormal;",
            "#endif",
            THREE.ShaderChunk[ "common" ],
            THREE.ShaderChunk[ "uv_pars_vertex" ],
            THREE.ShaderChunk[ "uv2_pars_vertex" ],
            THREE.ShaderChunk[ "displacementmap_pars_vertex" ],
            THREE.ShaderChunk[ "envmap_pars_vertex" ],
            THREE.ShaderChunk[ "color_pars_vertex" ],
            THREE.ShaderChunk[ "fog_pars_vertex" ],
            THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
            THREE.ShaderChunk[ "skinning_pars_vertex" ],
            THREE.ShaderChunk[ "shadowmap_pars_vertex" ],
            THREE.ShaderChunk[ "logdepthbuf_pars_vertex" ],
            THREE.ShaderChunk[ "clipping_planes_pars_vertex" ],
            "void main() {",
                THREE.ShaderChunk[ "uv_vertex" ],
                THREE.ShaderChunk[ "uv2_vertex" ],
                THREE.ShaderChunk[ "color_vertex" ],
                THREE.ShaderChunk[ "beginnormal_vertex" ],
                THREE.ShaderChunk[ "morphnormal_vertex" ],
                THREE.ShaderChunk[ "skinbase_vertex" ],
                THREE.ShaderChunk[ "skinnormal_vertex" ],
                THREE.ShaderChunk[ "defaultnormal_vertex" ],
                "#ifndef FLAT_SHADED",
                "vNormal = normalize( transformedNormal );",
                "#endif",
                THREE.ShaderChunk[ "begin_vertex" ],
                THREE.ShaderChunk[ "morphtarget_vertex" ],
                THREE.ShaderChunk[ "skinning_vertex" ],
                THREE.ShaderChunk[ "displacementmap_vertex" ],
                THREE.ShaderChunk[ "project_vertex" ],
                THREE.ShaderChunk[ "logdepthbuf_vertex" ],
                THREE.ShaderChunk[ "clipping_planes_vertex" ],
                "vViewPosition = - mvPosition.xyz;",
                THREE.ShaderChunk[ "worldpos_vertex" ],
                THREE.ShaderChunk[ "envmap_vertex" ],
                THREE.ShaderChunk[ "shadowmap_vertex" ],
                THREE.ShaderChunk[ "fog_vertex" ],
            "}"
		].join( "\n" )

	},
};
