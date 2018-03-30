var Module = {
    wasmBinaryFile: 'https://dev.peeks.io/js/cv/wasm/opencv_js.wasm',
    preRun: [function() {
        Module.FS_createPreloadedFile('/', 'haarcascade_eye.xml', 'https://dev.peeks.io/js/cv/data/haarcascade_eye.xml', true, false);
        Module.FS_createPreloadedFile('/', 'haarcascade_frontalface_default.xml', 'https://dev.peeks.io/js/cv/data/haarcascade_frontalface_default.xml', true, false);
        Module.FS_createPreloadedFile('/', 'haarcascade_profileface.xml', 'https://dev.peeks.io/js/cv/data/haarcascade_profileface.xml', true, false);
    }],
    _main: function() {
        PEEKS.registerExtension('cv', cv);
        console.log('OpenCV.js is ready');
    }
};
