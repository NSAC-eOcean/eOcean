import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "jquery";
import "../css/main.css";

console.log("eOcean: R&R");

window.require(["esri/Map", "esri/views/MapView"], function(Map, MapView) {
  var map = new Map({
    basemap: "dark-gray-vector"
  });

  var view = new MapView({
    container: "mapView",
    map: map,
    center: [47.990341, 29.378586],
    zoom: 8
  });
});
