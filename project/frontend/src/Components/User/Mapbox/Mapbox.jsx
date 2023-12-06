import '../../../App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useDispatch } from 'react-redux';
import { addAddress } from '../../../Redux/sellPropertyDetails/propertyAddressSlice';
import axios from 'axios';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXNoYWRhc2hyYWYiLCJhIjoiY2xuMzZrd2luMGc1NjJqbXUzeXZudzRhZCJ9.6-dCIqLi0A5a8XpfJKJtEQ';

const Mapbox = () => {
  const dispatch = useDispatch();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(76.2494);
  const [lat, setLat] = useState(9.9477);
  const [zoom, setZoom] = useState(9);
  const [selectedMarkerLocation, setSelectedMarkerLocation] = useState(null);
  useEffect(() => {
      if (map.current) return; // initialize map only once
      
      axios.get('http://127.0.0.1:8000/api/maps/allcoordinates/')
      .then(response => {
        const geoJson = response.data;
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [lng, lat],
          zoom: zoom
        });
        // document.querySelector('.mapboxgl-canvas').style.width = '700px';

        // Add a marker at a fixed location
        map.current.on('load', () => {
          // const marker = new mapboxgl.Marker()
          //   .setLngLat([-71.9, 42.35]) // Set the initial marker location
          //   .addTo(map.current);

            map.current.loadImage(
              "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
              function (error, image) {
                if (error) throw error;
            
                // Check if the image with the same name already exists
                const existingImage = map.current.hasImage("custom-marker");
                if (!existingImage) {
                  map.current.addImage("custom-marker", image);
                }
            
                // Add a GeoJSON source with multiple points
                map.current.addSource("points", {
                  type: "geojson",
                  data: {
                    type: "FeatureCollection",
                    features: geoJson.features,
                  },
                });
            
                // Add a symbol layer
                map.current.addLayer({
                  id: "points",
                  type: "symbol",
                  source: "points",
                  layout: {
                    "icon-image": "custom-marker",
                    // get the title name from the source's "title" property
                    "text-field": ["get", "title"],
                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    "text-offset": [0, 1.25],
                    "text-anchor": "top",
                  },
                });
              }
            );                        
        })
        
        map.current.on('move', () => {
          setLng(map.current.getCenter().lng.toFixed(4));
          setLat(map.current.getCenter().lat.toFixed(4));
          setZoom(map.current.getZoom().toFixed(2));
        });
        // Add a click event listener to the map
        map.current.on('click', (e) => {
          const {x, y} = e.point;
          const lngLat = map.current.unproject([x, y]);
          // Get the clicked coordinates
          const { lng, lat } = lngLat;
          console.log(e.lngLat);
          dispatch(addAddress({ lng, lat }));
          setSelectedMarkerLocation([lng, lat]);
          // Set the marker's new location
          // marker.setLngLat([lng, lat]).addTo(map.current);
        });
        handleResize();
      });
      const handleResize = () => {
        const currentWidth = mapContainer.current.clientWidth;
        const currentHeight = mapContainer.current.clientHeight;
        // console.log(currentHeight, currentWidth);
        map.current.resize();
      };
    
      window.addEventListener('resize', handleResize);
    
      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [lng, lat, zoom]);
    useEffect(() => {
      if (selectedMarkerLocation) {
        // Create a marker for the selected location
        const selectedMarker = new mapboxgl.Marker({
          color: 'red',
          // draggable: true,
        })
          .setLngLat(selectedMarkerLocation)
          .addTo(map.current);
        
        // Remove the marker when the component unmounts or when a new marker is selected
        return () => {
          selectedMarker.remove();
        };
      }
    }, [selectedMarkerLocation]);
      

    return (
      <div>
        {/* <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div> */}
        <div className="map-container" style={{width: '100%'}}>
          <div ref={mapContainer} className="map" />
          {selectedMarkerLocation && (
            <div className="marker">
              <button onClick={() => setSelectedMarkerLocation(null)}>Clear Marker</button>
            </div>
          )}
        </div>
        {/* <div className='select-marker'>
          <button onClick={() => setSelectedMarkerLocation(null)}>Clear Marker</button>
        </div> */}
      </div>
    );
}

export default Mapbox;
