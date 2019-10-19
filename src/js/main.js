import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import $ from "jquery";
import "../css/main.css";

console.log("eOcean: R&R");

window.addEventListener('message', (event) => {
    if (event.origin === 'http://localhost:9000') {
        const result = {};
        event.data.result.images.forEach(image => {
            image.classifiers.forEach(classifier => {
                classifier.classes.forEach(cls => {
                    result.class = cls.class
                    result.score = cls.score
                })
            })
        });
        if ($.isEmptyObject(result))
            showMessage('No trash detected.', 'Great job 👍!')
        else showMessage('Oh no! trash detected.', 'Great job 👍!')
    }
}, false)

$('#uploadForm').on('submit', (event) => {
    $('#upload').modal('hide')
})

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then(registration => {
            window.swreg = registration
            navigator.serviceWorker.ready.then(() => {
                registration.active.postMessage({ event: "registered" })
            })
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError)
        })
    })
}

var day = new Date('2015-01-01');
var dayParameter = function () {
    return day.toISOString().split('T')[0];
};

var map = new ol.Map({
    view: new ol.View({
        maxResolution: 0.5625,
        projection: ol.proj.get('EPSG:4326'),
        extent: [-180, -90, 180, 90],
        center: [0, 0],
        zoom: 1,
        maxZoom: 8
    }),
    target: 'mapView',
    renderer: ['canvas', 'dom']
});

function update() {
    clearLayers();
    map.addLayer(createLayer());
};

function clearLayers() {
    var activeLayers = map.getLayers().getArray();
    for (var i = 0; i < activeLayers.length; i++) {
        map.removeLayer(activeLayers[i]);
    }
};

function createLayer() {
    var source = new ol.source.WMTS({
        url: 'https://sealevel-nexus.jpl.nasa.gov/onearth/wmts/geo/wmts.cgi?TIME=' + dayParameter(),
        layer: 'SEA_SURFACE_HEIGHT_ALT_GRIDS_L4_2SATS_5DAY_6THDEG_V_JPL1609_MONTHLY',
        format: 'image/png',
        matrixSet: 'EPSG4326_1km',
        tileGrid: new ol.tilegrid.WMTS({
            origin: [-180, 90],
            resolutions: [
                0.5625,
                0.28125,
                0.140625,
                0.0703125,
                0.03515625,
                0.017578125,
                0.0087890625,
                0.00439453125,
                0.002197265625
            ],
            matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            tileSize: 512
        })
    });

    var layer = new ol.layer.Tile({ source: source });
    return layer;
};

update();

$('#day-slider').on('change', (event) => {
    let month = "01";
    if (event.target.value < 10)
        month = "0" + event.target.value
    else month = event.target.value
    day = new Date(`2015-${month}-01`);
    update();
});

let interval = 0;
$('#animateTrigger').on('click', (event) => {
    if ($(event.currentTarget).hasClass('animating')) {
        $(event.currentTarget).removeClass('animating')
        event.currentTarget.innerHTML = "Animate"
        clearInterval(interval)
    } else {
        $(event.currentTarget).addClass('animating')
        event.currentTarget.innerHTML = "Stop Animating";
        let month = 1;
        interval = setInterval(() => {
            $('#day-slider')[0].value = month
            let date = ''
            if (month < 10) date = '2015-0' + month + '-01';
            else date = '2015-' + month + '-01';
            day = new Date(date);
            console.log(date)
            update()
            month++;
            if (month > 12) month = 1
        }, 500)
    }
    $(event.currentTarget)
})

function showMessage(message, title = 'Thanks') {
    $('#messageTitle').html(title)
    $('#messageText').html(message)
    $('#messageModal').modal('show')
}