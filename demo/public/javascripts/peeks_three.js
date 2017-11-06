var loadTexture = function(material, textureUrl, textureRepeat, flipX, flipY,
    removeBackground)
{
	if (textureUrl != '') {
		var loader = new THREE.TextureLoader();

		//loader.setCrossOrigin(null);
        var mat = material;
        var detour = removeBackground;
		material.map = loader.load(textureUrl,
            function (texture) {
                var width = texture.image.width;
                var height = texture.image.height;
                if (width !== 0 && height !== 0) {
                    //console.log('Loaded texture ' + textureUrl + ' ' +
                    //    width.toString() + 'x' + height.toString());

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

var setObjectQuaternion = function(quaternion, alpha, beta, gamma, orient) {
    var zee = new THREE.Vector3( 0, 0, 1 );
    var euler = new THREE.Euler();
    var q0 = new THREE.Quaternion();
    var q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis
    euler.set( beta, alpha, - gamma, 'YXZ' ); // 'ZXY' for the device, but 'YXZ' for us
    quaternion.setFromEuler( euler ); // orient the device
    quaternion.multiply( q1 ); // camera looks out the back of the device, not the top
    quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) ); // adjust for screen orientation
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

			threeObject.rotation.set(
                THREE.Math.degToRad(this.rotation[0]),
                THREE.Math.degToRad(this.rotation[1]),
                THREE.Math.degToRad(this.rotation[2])
            );
			threeObject.rotation.order = this.rotationOrder;

			threeObject.scale.set(this.size[0], this.size[1], this.size[2]);
		}

        if (this === camera) {
            if (scene && scene.deviceOrientation !== undefined && scene.gyroscope) {
                var alpha = scene.deviceOrientation.alpha;
                var beta = scene.deviceOrientation.beta;
                var gamma = scene.deviceOrientation.gamma;
                var orient = scene.screenOrientation || 0;
                threeObject.rotation.order = 'YXZ';
                setObjectQuaternion(threeObject.quaternion,
                    THREE.Math.degToRad(alpha),
                    THREE.Math.degToRad(beta),
                    THREE.Math.degToRad(gamma),
                    THREE.Math.degToRad(orient));
            }
        } else if (this.type === 'Canvas') {
            var pivot = this.threeObjectPivot;
            pivot.position.copy(scene.three.camera.position);
            if (scene.isVrMode() && this.vrFixed !== true) {
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

            var zoom = 1;
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
							console.log( Math.round(percentComplete, 2) + '% downloaded' );
						}
					};

					var onError = function ( xhr ) {
                        console.log( 'Obj loading error' );
					};

                    console.log( 'loading ' +  this.geometryUrl    );
                    var peeksObject = this;
					var node = this.threeObject;
					var textureUrl = this.getAttr('textureUrl');
					var loader = new THREE.OBJLoader( manager );
					loader.load(this.geometryUrl, function ( object ) {
                        // console.log( 'Done loading ' +  this.geometryUrl    );
						node.add(object);

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

						if (textureUrl != '') {
							var url = textureUrl;
							var loader = new THREE.TextureLoader();
							if (/^data:/.test(textureUrl)) {
								loader.setCrossOrigin(url);
							} else {
								loader.setCrossOrigin('');
							}
							object.texture = loader.load(url);
							object.traverse( function ( child ) {
								if ( child instanceof THREE.Mesh ) {
                                    if (child.material) {
    									child.material.map = object.texture;
                                        /*
                                        child.material.emissive.r = .2;
        								child.material.emissive.g = .2;
            					        child.material.emissive.b = .2;
                                        */
                                        child.material.side = THREE.DoubleSide;
                                        child.material.shading = THREE.SmoothShading;
                                    }
                                    if (child.geometry) {
                                        child.geometry.computeFaceNormals();
                                    }
								}
							});
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
                        if (ratio < sizeRatio) {
                            threeObject.scale.x = ratio * threeObject.scale.y;
                        } else {
                            threeObject.scale.y = threeObject.scale.x / ratio;
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
	var ambient = new THREE.AmbientLight( 0x101030 );
	scene.add(ambient);
	var directionalLight = new THREE.DirectionalLight( 0xffeedd );
	directionalLight.position.set( 0, 0, 1 );
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
    renderer.setPixelRatio(2);

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
