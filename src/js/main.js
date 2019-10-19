import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import $ from "jquery";
import "../css/main.css";
// import ol from 'ol';

console.log("eOcean: R&R");

// https://sealevel-nexus.jpl.nasa.gov/onearth/wmts/geo/wmts.cgi?Service=wmts&Request=GetTile&Version=1.0.0&layer=SEA_SURFACE_HEIGHT_ALT_GRIDS_L4_2SATS_5DAY_6THDEG_V_JPL1609_MONTHLY&tilematrixset=EPSG4326_1km&Format=image/png&TileMatrix=1&TileCol=2&TileRow=0&TIME=2015-09-01

// window.require([
//     "esri/Map",
//     "esri/views/MapView",
//     "esri/layers/WMTSLayer",
//     "esri/layers/TileLayer",
//     "esri/widgets/LayerList",
// ], function (Map, MapView, WMTSLayer, TileLayer, LayerList) {
//     var layer = new WMTSLayer({
//         // url: "https://sealevel-nexus.jpl.nasa.gov/onearth/wmts/geo/wmts.cgi",
//         url: "https://sealevel-nexus.jpl.nasa.gov/onearth/wmts/geo",
//         copyright: "<a target='_top' href='sealevel-nexus.jpl.nasa.gov'>Sea Level Data</a> by <a target='_top' href='https://www.nasa.gov'>NASA</a>",
//         activeLayer: {
//             id: "SEA_SURFACE_HEIGHT_ALT_GRIDS_L4_2SATS_5DAY_6THDEG_V_JPL1609_MONTHLY",
//         },
//         customLayerParameters: {
//         },
//         customParameters: {
//         },
//         title: "Sea Level Anomalies",
//         // serviceMode: "KVP",
//     });
//     console.log(layer)

//     var map = new Map({
//         // basemap: "dark-gray-vector",
//         layers: [layer]
//     });
//     // map.layers.add(layer);
//     // console.log(map)
//     // window.map = map;
//     // window.layer = layer;

//     var view = new MapView({
//         container: "mapView",
//         map: map,
//         center: [47.990341, 29.378586],
//         // zoom: 8,
//         // center: [16.463814503649008, 48.13488142774444],
//         scale: 100000000//144201449.5083617
//     });

//     view.when(function () {
//         view.extent = layer.fullExtent;
//         var layerList = new LayerList({
//             view: view
//         });
//         view.ui.add(layerList, "bottom-left");
//     });
// });


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
            console.log('Clean')
        else console.log('Trashy ' + (result.score * 100) + '%')
        console.log(result, event.data, $.isEmptyObject(result))
    }
}, false)

$('#uploadForm').on('submit', (event) => {
    $('#upload').modal('hide')
    // console.log(event)
})

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then(registration => {
            window.swreg = registration
            navigator.serviceWorker.ready.then(() => {
                registration.active.postMessage({ event: "registered" })
            })
            // if (Notification.permission !== 'granted') {
            //     window.Notification.requestPermission().then((permission) => {
            //         navigator.serviceWorker.ready.then(() => {
            //             registration.active.postMessage({ event: "notificationState", state: permission })
            //         })
            //     })
            // }
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError)
        })
    })
}





// var map;
// // window.init = () => {

//     map = new OpenLayers.Map({
//         div: "mapView",
//         projection: "EPSG:900913"
//     });

//     var osm = new OpenLayers.Layer.OSM();

//     // If tile matrix identifiers differ from zoom levels (0, 1, 2, ...)
//     // then they must be explicitly provided.
//     var matrixIds = new Array(26);
//     for (var i = 0; i < 26; ++i) {
//         matrixIds[i] = "EPSG4326_1km:" + i;
//     }

//     var wmts = new OpenLayers.Layer.WMTS({
//         name: "Sea Level Anomalies",
//         url: "https://sealevel-nexus.jpl.nasa.gov/onearth/wmts/geo/wmts.cgi",
//         layer: "SEA_SURFACE_HEIGHT_ALT_GRIDS_L4_2SATS_5DAY_6THDEG_V_JPL1609_MONTHLY",
//         matrixSet: "EPSG4326_1km",
//         tileMatrix: 2,
//         // matrixIds: matrixIds,
//         format: "image/png",
//         style: "_null",
//         opacity: 0.7,
//         isBaseLayer: false
//     });

//     map.addLayers([osm, wmts]);
//     map.addControl(new OpenLayers.Control.LayerSwitcher());
//     map.setCenter(new OpenLayers.LonLat(-13677832, 5213272), 13);

// }

// init();


// https://sealevel-nexus.jpl.nasa.gov/onearth/wmts/geo/wmts.cgi?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=SEA_SURFACE_HEIGHT_ALT_GRIDS_L4_2SATS_5DAY_6THDEG_V_JPL1609_MONTHLY&STYLE=_null&TILEMATRIXSET=EPSG4326_1km&TILEMATRIX=EPSG4326_1km%3A11&TILEROW=755&TILECOL=323&FORMAT=image%2Fpng
// https://sealevel-nexus.jpl.nasa.gov/onearth/wmts/geo/wmts.cgi?Service=wmts&Request=GetTile&Version=1.0.0&layer=SEA_SURFACE_HEIGHT_ALT_GRIDS_L4_2SATS_5DAY_6THDEG_V_JPL1609_MONTHLY&tilematrixset=EPSG4326_1km&Format=image/png&TileMatrix=2&TileCol=2&TileRow=0&TIME=1992-10-01?

// https://sealevel-nexus.jpl.nasa.gov/onearth/wmts/geo/wmts.cgi?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=SEA_SURFACE_HEIGHT_ALT_GRIDS_L4_2SATS_5DAY_6THDEG_V_JPL1609_MONTHLY&TILEMATRIXSET=EPSG4326_1km&TILEMATRIX=EPSG4326_1km%3A11&TILEROW=0&TILECOL=2&TIME=1992-10-01

// Seven day slider based off today, remember what today is
var today = new Date();

// Selected day to show on the map
var day = new Date('2015-01-01');

// GIBS needs the day as a string parameter in the form of YYYY-MM-DD.
// Date.toISOString returns YYYY-MM-DDTHH:MM:SSZ. Split at the 'T' and
// take the date which is the first part.
var dayParameter = function () {
    return day.toISOString().split('T')[0];
};

var map = new ol.Map({
    view: new ol.View({
        maxResolution: 0.5625,
        projection: ol.proj.get('EPSG:4326'),
        extent: [-180, -90, 180, 90],
        center: [0, 0],
        zoom: 2,
        maxZoom: 8
    }),
    target: 'mapView',
    renderer: ['canvas', 'dom']
});

function update() {
    // There is only one layer in this example, but remove them all
    // anyway
    clearLayers();

    // Add the new layer for the selected time
    map.addLayer(createLayer());

    // Update the day label
    document.querySelector('#day-label').textContent = dayParameter();
};

function clearLayers() {
    // Get a copy of the current layer list and then remove each
    // layer.
    var activeLayers = map.getLayers().getArray();
    for (var i = 0; i < activeLayers.length; i++) {
        map.removeLayer(activeLayers[i]);
    }
};

function createLayer() {
    var source = new ol.source.WMTS({
        url: 'https://sealevel-nexus.jpl.nasa.gov/onearth/wmts/geo/wmts.cgi?TIME=' + dayParameter(),//'2015-01-01',//
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

// Slider values are in 'days from present'.
document.querySelector('#day-slider')
    .addEventListener('change', function (event) {
        // Add the slider value (effectively subracting) to today's
        // date.
        let month = "01";
        if (event.target.value < 10)
            month = "0" + event.target.value
        else month = event.target.value
        // console.log(event.target.value)
        var newDay = new Date(`2015-${month}-01`);
        // newDay.setUTCDate(today.getUTCDate() +
        //     Number.parseInt(event.target.value));
        day = newDay;
        update();
    });
