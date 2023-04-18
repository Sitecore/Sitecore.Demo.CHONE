import * as React from "react";
import mapboxgl from "mapbox-gl";
//import "mapbox-gl/dist/mapbox-gl.css"; 
// import the mapbox-gl styles so that the map is displayed correctly

function MapboxMap() {
    // this is where the map instance will be stored after initialization
  const [map, setMap] = React.useState<mapboxgl.Map>();

    // React ref to store a reference to the DOM node that will be used
  // as a required parameter `container` when initializing the mapbox-gl
  // will contain `null` by default
    const mapNode = React.useRef(null);

  React.useEffect(() => {
    const node = mapNode.current;
        // if the window object is not found, that means
        // the component is rendered on the server
        // or the dom node is not initialized, then return early
    if (typeof window === "undefined" || node === null) return;

        // otherwise, create a map instance
    const mapboxMap = new mapboxgl.Map({
      container: node,
            accessToken: "pk.eyJ1IjoibWZyb25jemFrZG0iLCJhIjoiY2xnNDB0eHIzMDU5bDNrcXR5NmY5YzE2dSJ9.7aNWDHgqccPebU7RRRc9Mw",
            style: "mapbox://styles/mapbox/streets-v11",
      center: [1, 50],
      zoom: 5,
    });

/************* */
mapboxMap.on('load', function () {
  // Add a GeoJSON source containing the state polygons.
  mapboxMap.addSource('states', {
      'type': 'geojson',
      'data': 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson'
  });

  // Add a layer showing the state polygons.
  mapboxMap.addLayer({
      'id': 'states-layer',
      'type': 'fill',
      'source': 'states',
      'paint': {
          'fill-color': 'rgba(255, 191, 0, 0.3)',
          'fill-outline-color': 'rgba(200, 100, 240, 1)'
      }
  });
});


/************* */

    
    mapboxMap.on('style.load', function() {
      mapboxMap.on('click', function(e) {
        var features = mapboxMap.queryRenderedFeatures(e.point, { layers: ['states-layer'] });
        if (!features.length) {
            return;
        }
        var feature = features[0];
        var coordinates = e.lngLat;
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML('Your point of interest is: <br/>' + feature.properties.name)
          .addTo(mapboxMap);
      });
    });

        // save the map object to React.useState
    setMap(mapboxMap);

        return () => {
      mapboxMap.remove();
    };
  }, []);

  return <div ref={mapNode} style={{ width: "100%", height: "800px" }} />;
}

export default MapboxMap