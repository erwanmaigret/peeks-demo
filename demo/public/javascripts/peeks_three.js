var loadTexture = function(material, textureUrl, textureRepeat, flipX, flipY,
    removeBackground)
{
	if (textureUrl != '') {
		var loader = new THREE.TextureLoader();
        var mat = material;
        var detour = removeBackground;
		material.map = loader.load(textureUrl,
            function (texture) {
                var width = texture.image.width;
                var height = texture.image.height;
                if (width !== 0 && height !== 0) {
                    //console.log('Loaded texture ' + textureUrl + ' ' +
                    //    width.toString() + 'x' + height.toString());

                    detour = false;
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
            });

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
        var loader = new THREE.TextureLoader();
        if (/^data:/.test(path)) {
            loader.setCrossOrigin(path);
        } else {
            loader.setCrossOrigin('');
        }
        return loader.load(path);
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

            threeObject.position.z -= distance;
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
			var video = scene.getVideo();
			var window = scene.window;
			var navigator = window.navigator;
			if (video && navigator) {
				if (threeObject.material &&
					(threeObject.material.map === null ||
						threeObject.material.map !== video.texture))
				{
					if (!video.texture) {
						video.texture = new THREE.Texture(video);
                        video.texture.minFilter = THREE.NearestFilter;
                        video.texture.magFilter = THREE.NearestFilter;
						navigator.getUserMedia = (
							navigator.getUserMedia ||
							navigator.webkitGetUserMedia ||
							navigator.mozGetUserMedia ||
							navigator.msGetUserMedia
						);
						if (navigator.getUserMedia) {
							var facingMode = "user";
							var constraints = {
							  audio: false,
							  video: {
							   facingMode: facingMode
							  }
							};
							navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
							  video.srcObject = stream;
								video.play();
							});
						} else {
							 this.error("getUserMedia not supported");
						}
					}
					threeObject.material.map = video.texture;
				}

				if (video.texture && video.readyState === video.HAVE_ENOUGH_DATA) {
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

    // console.log(this.position);
    // console.log(three.scene.position);
    if (this.isVrMode()) {
        var useStereoEffect = false;
        if (useStereoEffect) {
            // This is for test, but it's not working very well
            //  when rotating all the way to the back
            if (three.stereoEffect === undefined) {
                three.stereoEffect = new THREE.StereoEffect(three.renderer);
            }
            three.stereoEffect.render(three.scene, three.camera);
        } else {
            three.renderer.setScissorTest(true);

            three.renderer.setViewport(width / 2, 0, width / 2, height);
            three.renderer.setScissor(width / 2, 0, width / 2, height);

            var width = (this.width) ? this.width : 500;
            var height = (this.height) ? this.height : 500;
            this.three.camera.aspect = (width / 2) / height;
            this.three.camera.updateProjectionMatrix();
            //this.three.renderer.setSize(width, height);

            three.renderer.render(three.scene, three.camera);
            if (three.cssRenderer) {
                three.cssRenderer.render(three.cssScene, three.camera);
            }

            three.renderer.setViewport(0, 0, width / 2, height);
            three.renderer.setScissor(0, 0, width / 2, height);

            three.renderer.render(three.scene, three.camera);
            if (three.cssRenderer) {
                three.cssRenderer.render(three.cssScene, three.camera);
            }
        }
    } else {
        this.three.renderer.setViewport(0, 0, width, height);
        this.three.renderer.setScissor(0, 0, width, height);
        this.three.renderer.setScissorTest(false);

        var width = (this.width) ? this.width : 500;
        var height = (this.height) ? this.height : 500;
        this.three.camera.aspect = width / height;
        this.three.camera.updateProjectionMatrix();

        this.three.renderer.render(this.three.scene, this.three.camera);
        if (this.three.cssRenderer) {
            this.three.cssRenderer.render(this.three.cssScene, this.three.camera);
        }
    }
},

PEEKS.Asset.prototype.threeSynchMaterial = function() {
    var asset = this;
    var threeObject = asset.threeObject;
    if (threeObject && threeObject.children.length == 1) {
        var geometry = threeObject.children[0];

        geometry.traverse(
            function (child) {
                if (child instanceof THREE.Mesh) {
                    if (child.geometry && child.material) {
                        var mat = child.material;
                        var refMat = asset.material || {};
                        mat.map = geometry.texture;
                        mat.transparent = true;
                        mat.opacity = PEEKS.ThreeFloat(asset.alpha, 1);
                        mat.reflectivity = PEEKS.ThreeFloat(refMat.reflectivity , .2);
                        mat.shininess = PEEKS.ThreeFloat(refMat.shininess, 10);
                        mat.emissive = PEEKS.ThreeColor(refMat.emissive, [.05, .05, .05]);
                        mat.specular = PEEKS.ThreeColor(refMat.specular, [.05, .05, .05]);
                        mat.normalMap = PEEKS.ThreeTextureLoader(refMat.normalMap);
                        mat.alphaMap = PEEKS.ThreeTextureLoader(refMat.alphaMap);
                        mat.bumpMap = PEEKS.ThreeTextureLoader(refMat.bumpMap);
                        mat.color = PEEKS.ThreeColor(asset.color, [1, 1, 1]);
                        mat.side = THREE.FrontSide;
                        child.geometry.computeFaceNormals();

                        if (refMat.type === 'fabric') {
                            var shader = THREE.FresnelShader;
    				        var uniforms = THREE.UniformsUtils.merge([
                                THREE.UniformsLib["lights"],
                                shader.uniforms,
                                {
//                                    diffuseMaterial: {type: "c", value: new THREE.Color(1,0,0)},
//                                    specularMaterial: {type: "c", value: new THREE.Color(0.7,0.7,0.7)},
//                                    ambientMaterial:{type:"c", value: new THREE.Color(0.8,0.2,0.2)},
                                    shininessMaterial: {type:"f", value: 16.0}
                                }
                            ]);
                            uniforms[ "uAlbedoMap" ].value = geometry.texture;
                            uniforms[ "uFresnelBias" ].value = PEEKS.ThreeFloat(refMat.fresnelBias , uniforms[ "uFresnelBias" ].value);
                            uniforms[ "uFresnelPower" ].value = PEEKS.ThreeFloat(refMat.fresnelPower , uniforms[ "uFresnelPower" ].value);
                            uniforms[ "uFresnelScale" ].value = PEEKS.ThreeFloat(refMat.fresnelScale , uniforms[ "uFresnelScale" ].value);
                            uniforms[ "uFresnelColor" ].value = PEEKS.v3(refMat.fresnelColor, uniforms[ "uFresnelColor" ].value);

                            var material = new THREE.ShaderMaterial( {
                				uniforms: uniforms,
                				vertexShader: shader.vertexShader,
                				fragmentShader: shader.fragmentShader,
                                lights:true,
                			} );
                            child.material = material;



                            var shader = THREE.ShaderPeeks[ "fabric" ];
            				var fragmentShader = shader.fragmentShader;
            				var vertexShader = shader.vertexShader;
            				var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
            				uniforms[ "enableBump" ].value = true;
            				uniforms[ "enableSpecular" ].value = true;
            				//uniforms[ "tBeckmann" ].value = composerBeckmann.renderTarget1.texture;
            				//uniforms[ "tDiffuse" ].value = mapColor;
            				//uniforms[ "bumpMap" ].value = mapHeight;
            				//uniforms[ "specularMap" ].value = mapSpecular;
                            uniforms[ "tBeckmann" ].value = geometry.texture;
                            uniforms[ "tDiffuse" ].value = new THREE.Color(1,0,0);
            				uniforms[ "bumpMap" ].value = 1.0;
            				uniforms[ "specularMap" ].value = geometry.texture;
            				uniforms[ "diffuse" ].value.setHex( 0xa0a0a0 );
            				uniforms[ "specular" ].value.setHex( 0xa0a0a0 );
            				uniforms[ "uRoughness" ].value = 0.2;
            				uniforms[ "uSpecularBrightness" ].value = 0.5;
            				uniforms[ "bumpScale" ].value = 8;
            				var material = new THREE.ShaderMaterial( { fragmentShader: fragmentShader, vertexShader: vertexShader, uniforms: uniforms, lights: true } );
            				material.extensions.derivatives = true;
                            child.material = material;
                        }
                    }
                }
            }
        );
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
                loadTexture(material, this.getAttr('textureUrl'), this.textureRepeat);
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
                loadTexture(material, this.getAttr('textureUrl'), this.textureRepeat, true);
            } else if (this.primitive === PEEKS.Asset.PrimitiveDisk) {
                var geometry = new THREE.CircleGeometry(.5, 32);
                var material = new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    transparent: true,
                    depthTest: isScreenSpace ? false : true,
                });
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
            } else if (this.primitive === PEEKS.Asset.PrimitivePlane) {
				if (this.geometryUrl) {
					this.threeObject = new THREE.Object3D();

					var manager = new THREE.LoadingManager();
						manager.onProgress = function ( item, loaded, total ) {
						// console.log( item, loaded, total );
					};

					var onProgress = function ( xhr ) {
						if ( xhr.lengthComputable ) {
							var percentComplete = xhr.loaded / xhr.total * 100;
						}
					};

					var onError = function ( xhr ) {
                        console.log( 'Obj loading error' );
					};

                    var peeksObject = this;
					var node = this.threeObject;
                    this.threeObject.peeksAsset = peeksObject;
                    var textureUrl = this.getAttr('textureUrl');
                    var autofit = this.getAttr('autofit');
					var loader = new THREE.OBJLoader( manager );
					loader.load(this.geometryUrl, function ( object ) {
                        // console.log( 'Done loading ' +  this.geometryUrl    );
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

						if (textureUrl != '') {
							var url = textureUrl;
							var loader = new THREE.TextureLoader();
							if (/^data:/.test(textureUrl)) {
								loader.setCrossOrigin(url);
							} else {
								loader.setCrossOrigin('');
							}
							object.texture = loader.load(url);

                            object.parent.peeksAsset.threeSynchMaterial();
						}
					}, onProgress, onError );
				} else if (this.getAttr('text')) {
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
						loadTexture(material, this.textureBackUrl,
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

                    loadTexture(material, this.getAttr('textureUrl'),
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
	}

	this.threeSynchVideoTexture();

	var visible = this.threeGetVisibility();
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

PEEKS.Scene.prototype.onResize = function() {
    var width = (this.width) ? this.width : 500;
	var height = (this.height) ? this.height : 500;
    this.three.camera.aspect = width / height;
    this.three.camera.updateProjectionMatrix();
    this.three.renderer.setSize(width, height);
    if (this.three.cssRenderer) {
        this.three.cssRenderer.setSize(width, height);
    }
}

var CreateCssElement = function ( id, x, y, z) {
	var div = document.createElement('div');
	div.style.width = '256px';
	div.style.height = '256px';
	div.style.backgroundColor = '#000';
	var iframe = document.createElement('iframe');
	iframe.style.width = '256px';
	iframe.style.height = '256px';
	iframe.style.border = '0px';
    iframe.src = [ 'https://assets.bloomingdales.com/navapp/dyn_img/homepage_pools/0929_1009_HP_INTL_02_1505750668351.jpg' ].join( '' );
	div.appendChild(iframe);

	var object = new THREE.CSS3DObject(div);
    object.position.set(0, 0, -256);
    object.scale.set(.1, .1, .1);
	return object;
};

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

    var addCssLayer = false;
    if (addCssLayer) {
        var container = document.createElement( 'div' );
        container.style.position = 'relative';
        document.body.appendChild( container );

        var cssRenderer = new THREE.CSS3DRenderer();
        cssRenderer.setSize(400, 400);
    	cssRenderer.domElement.style.position = 'absolute';
    	cssRenderer.domElement.style.top = 0;

        this.three.cssRenderer = cssRenderer;
        this.three.cssScene = new THREE.Scene();
    	this.three.cssScene.add(new CreateCssElement( 'OX9I1KyNa8M', 0, 0, -240));

        container.appendChild( cssRenderer.domElement );
    }

    var renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
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

THREE.FresnelShader = {

	uniforms: {
        "uAlbedoMap": { value: null },
		"uFresnelBias": { value: 0.1 },
		"uFresnelPower": { value: 2.0 },
		"uFresnelScale": { value: 1.0 },
        "uFresnelColor": { value: [1.0, 1.0, 1.0] },
	},

	vertexShader: [
        //                                    diffuseMaterial: {type: "c", value: new THREE.Color(1,0,0)},
        //                                    specularMaterial: {type: "c", value: new THREE.Color(0.7,0.7,0.7)},
        //                                    ambientMaterial:{type:"c", value: new THREE.Color(0.8,0.2,0.2)},
        " vec3 diffuseMaterial = vec3(1.0,0.0,0.0);",
        " vec3 specularMaterial = vec3(0.7,0.7,0.7);",
        "vec3 ambientMaterial = vec3(0.8,0.2,0.2);",
        "float shininessMaterial = 16.0;",
        "uniform vec3 ambientLight;",
        "uniform vec3 directionalLightColor[NUM_DIR_LIGHTS];",
        "uniform vec3 directionalLightDirection[NUM_DIR_LIGHTS];",
        "uniform vec3 ambientLightColor[1];",
        "",
        "varying vec3 fragColor;",
        "",
        "vec3 phong(vec3 p, vec3 n, vec3 v){",
        "",
        "vec3 fromLight = normalize(directionalLightDirection[0]);",
        "vec3 toLight = -fromLight;",
        "",
        "vec3 reflectLight = reflect(toLight,n);",
        "",
        "float ndots = dot(n, toLight);",
        "float vdotr = abs(dot(v,reflectLight));",
        //"float vdotr = max(0.0,dot(v,reflectLight));",
        "",
        "vec3 ambi = ambientMaterial * ambientLightColor[0];",
        "vec3 diff = diffuseMaterial * directionalLightColor[0] * ndots;",
        "vec3 spec = specularMaterial * directionalLightColor[0] * pow(vdotr,shininessMaterial);",
        "",
        "return ambi + diff + spec ;",
        "//return ambi + diff;",
        "//return spec;",
        "}",

        "varying vec2 vTextureUv;",
		"uniform float uFresnelBias;",
		"uniform float uFresnelScale;",
        "uniform float uFresnelPower;",

		"varying float vReflectionFactor;",

		"void main() {",
            "gl_PointSize = 3.0;",
             "vec4 ecPosition=modelViewMatrix*vec4(position,1.0);",
             "vec3 ecNormal= normalize(normalMatrix*normal);",
             "bool useOrtho = projectionMatrix[2][3] == 0.0;",
             "vec3 viewDir=useOrtho ? vec3(0,0,1) : normalize(-ecPosition.xyz);",
             "fragColor=phong(ecPosition.xyz, ecNormal, viewDir);",

			"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
			"vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",

			"vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );",

			"vec3 I = worldPosition.xyz - cameraPosition;",

			"vReflectionFactor = uFresnelBias + uFresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), uFresnelPower );",

			"gl_Position = projectionMatrix * mvPosition;",
            "vTextureUv = uv;",
		"}"

	].join( "\n" ),

	fragmentShader: [
        "struct ReflectedLight {",
        	"vec3 directDiffuse;",
        	"vec3 directSpecular;",
        	"vec3 indirectDiffuse;",
        	"vec3 indirectSpecular;",
        "};",
        "varying vec2 vTextureUv;",
        "uniform sampler2D uAlbedoMap;",
        "uniform vec3 uFresnelColor;",

		"varying float vReflectionFactor;",
        "varying vec3 fragColor;",
		"void main() {",
            "float opacity = 1.0;",
            "vec3 diffuse = vec3(1.0, 1.0, 1.0);",
            "vec4 diffuseColor = vec4( diffuse, opacity );",
            "vec4 texelColor = texture2D( uAlbedoMap, vTextureUv );",
	        "texelColor = mapTexelToLinear( texelColor );",
	        "diffuseColor *= texelColor;",
            "float specularStrength = 1.0;",
            "ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );",
            "reflectedLight.indirectDiffuse += vec3( 1.0 );",
            "reflectedLight.indirectDiffuse *= diffuseColor.rgb;",
            "vec3 outgoingLight = reflectedLight.indirectDiffuse;",
            "gl_FragColor = vec4( outgoingLight, diffuseColor.a );",
            "gl_FragColor = linearToOutputTexel( gl_FragColor );",
			"gl_FragColor = mix( gl_FragColor, vec4( uFresnelColor, 1.0 ), clamp( vReflectionFactor, 0.0, 1.0 ) );",
		"}"

	].join( "\n" )

};

/**
 * @author alteredq / http://alteredqualia.com/
 *
 */


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
				"specularMap": { value: null },
				"offsetRepeat": { value: new THREE.Vector4( 0, 0, 1, 1 ) },
				"uWrapRGB": { value: new THREE.Vector3( 0.75, 0.375, 0.1875 ) }
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
			"uniform sampler2D specularMap;",
			"varying vec3 vNormal;",
			"varying vec2 vUv;",
			"varying vec3 vViewPosition;",

			THREE.ShaderChunk[ "common" ],
			THREE.ShaderChunk[ "bsdfs" ],
			THREE.ShaderChunk[ "packing" ],
			THREE.ShaderChunk[ "lights_pars" ],
			THREE.ShaderChunk[ "shadowmap_pars_fragment" ],
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

			"void main() {",
                "vec3 outgoingLight = vec3( 0.0 );",
                "vec4 diffuseColor = vec4( diffuse, opacity );",
				"vec4 colDiffuse = texture2D( tDiffuse, vUv );",
				"colDiffuse.rgb *= colDiffuse.rgb;",
				"diffuseColor = diffuseColor * colDiffuse;",
				"vec3 normal = normalize( vNormal );",
				"vec3 viewerDirection = normalize( vViewPosition );",

				"float specularStrength;",
				"if ( enableSpecular ) {",
					"vec4 texelSpecular = texture2D( specularMap, vUv );",
					"specularStrength = texelSpecular.r;",
				"} else {",
					"specularStrength = 1.0;",
				"}",

				"#ifdef USE_BUMPMAP",
					"if ( enableBump ) normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );",
				"#endif",

				"vec3 totalSpecularLight = vec3( 0.0 );",
				"vec3 totalDiffuseLight = vec3( 0.0 );",

				"#if NUM_POINT_LIGHTS > 0",
					"for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {",
						"vec3 lVector = pointLights[ i ].position + vViewPosition.xyz;",
						"float attenuation = calcLightAttenuation( length( lVector ), pointLights[ i ].distance, pointLights[ i ].decay );",
						"lVector = normalize( lVector );",
						"float pointDiffuseWeightFull = max( dot( normal, lVector ), 0.0 );",
						"float pointDiffuseWeightHalf = max( 0.5 * dot( normal, lVector ) + 0.5, 0.0 );",
						"vec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), uWrapRGB );",
						"float pointSpecularWeight = KS_Skin_Specular( normal, lVector, viewerDirection, uRoughness, uSpecularBrightness );",
						"totalDiffuseLight += pointLight[ i ].color * ( pointDiffuseWeight * attenuation );",
						"totalSpecularLight += pointLight[ i ].color * specular * ( pointSpecularWeight * specularStrength * attenuation );",
					"}",
				"#endif",

				// directional lights
				"#if NUM_DIR_LIGHTS > 0",
					"for( int i = 0; i < NUM_DIR_LIGHTS; i++ ) {",
						"vec3 dirVector = directionalLights[ i ].direction;",
						"float dirDiffuseWeightFull = max( dot( normal, dirVector ), 0.0 );",
						"float dirDiffuseWeightHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );",
						"vec3 dirDiffuseWeight = mix( vec3 ( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), uWrapRGB );",
						"float dirSpecularWeight = KS_Skin_Specular( normal, dirVector, viewerDirection, uRoughness, uSpecularBrightness );",
						"totalDiffuseLight += directionalLights[ i ].color * dirDiffuseWeight;",
						"totalSpecularLight += directionalLights[ i ].color * ( dirSpecularWeight * specularStrength );",
					"}",
				"#endif",

				// hemisphere lights
				"#if NUM_HEMI_LIGHTS > 0",
					"for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {",
						"vec3 lVector = hemisphereLightDirection[ i ];",
						"float dotProduct = dot( normal, lVector );",
						"float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;",
						"totalDiffuseLight += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );",
						// specular (sky light)
						"float hemiSpecularWeight = 0.0;",
						"hemiSpecularWeight += KS_Skin_Specular( normal, lVector, viewerDirection, uRoughness, uSpecularBrightness );",
						// specular (ground light)
						"vec3 lVectorGround = -lVector;",
						"hemiSpecularWeight += KS_Skin_Specular( normal, lVectorGround, viewerDirection, uRoughness, uSpecularBrightness );",
						"vec3 hemiSpecularColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );",
						"totalSpecularLight += hemiSpecularColor * specular * ( hemiSpecularWeight * specularStrength );",
					"}",
				"#endif",
				"outgoingLight += diffuseColor.xyz * ( totalDiffuseLight + ambientLightColor * diffuse ) + totalSpecularLight;",
                "gl_FragColor = vec4(outgoingLight.r, outgoingLight.g, outgoingLight.b, 1.0);",
			"}"
		].join( "\n" ),

		vertexShader: [
			"uniform vec4 offsetRepeat;",
			"varying vec3 vNormal;",
			"varying vec2 vUv;",
			"varying vec3 vViewPosition;",
			THREE.ShaderChunk[ "common" ],
			THREE.ShaderChunk[ "lights_pars" ],
			THREE.ShaderChunk[ "shadowmap_pars_vertex" ],
			"void main() {",
				"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
				"vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
				"vViewPosition = -mvPosition.xyz;",
				"vNormal = normalize( normalMatrix * normal );",
				"vUv = uv * offsetRepeat.zw + offsetRepeat.xy;",
				"gl_Position = projectionMatrix * mvPosition;",
				THREE.ShaderChunk[ "shadowmap_vertex" ],
			"}"
		].join( "\n" )

	},
};
