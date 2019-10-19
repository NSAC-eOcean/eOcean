import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import $ from "jquery";
import "../css/main.css";

console.log("eOcean: R&R");

// https://sealevel-nexus.jpl.nasa.gov/onearth/wmts/geo/wmts.cgi?Service=wmts&Request=GetTile&Version=1.0.0&layer=SEA_SURFACE_HEIGHT_ALT_GRIDS_L4_2SATS_5DAY_6THDEG_V_JPL1609_MONTHLY&tilematrixset=EPSG4326_1km&Format=image/png&TileMatrix=1&TileCol=2&TileRow=0&TIME=2015-09-01

window.require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/WMTSLayer",
    "esri/widgets/LayerList",
], function (Map, MapView, WMTSLayer, LayerList) {
    var layer = new WMTSLayer({
        url: "https://sealevel-nexus.jpl.nasa.gov/onearth/wmts/geo/wmts.cgi",
        // url: "https://sealevel-nexus.jpl.nasa.gov/onearth/wmts/geo",
        copyright: "<a target='_top' href='sealevel-nexus.jpl.nasa.gov'>Sea Level Data</a> by <a target='_top' href='https://www.nasa.gov'>NASA</a>",
        activeLayer: {
            id: "SEA_SURFACE_HEIGHT_ALT_GRIDS_L4_2SATS_5DAY_6THDEG_V_JPL1609_MONTHLY",
        },
        customLayerParameters: {
        },
        customParameters: {
        },
        title: "Sea Level Anomalies",
        serviceMode: "KVP",
    });
    console.log(layer)

    var map = new Map({
        // basemap: "dark-gray-vector",
        layers: [layer]
    });
    // map.layers.add(layer);
    // console.log(map)
    // window.map = map;
    // window.layer = layer;

    var view = new MapView({
        container: "mapView",
        map: map,
        center: [47.990341, 29.378586],
        // zoom: 8,
        // center: [16.463814503649008, 48.13488142774444],
        scale: 100000000//144201449.5083617
    });

    view.when(function () {
        view.extent = layer.fullExtent;
        var layerList = new LayerList({
            view: view
        });
        view.ui.add(layerList, "bottom-left");
    });
});


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