import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const MapWithAutocomplete = ({setAddress}) => {
    const mapContainerRef = useRef(null);
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic3RhZmZnZW5peCIsImEiOiJjbGlieGZnNHIwZmNyM3FtbnRrcTZkOWxoIn0.JwcB7EHafp8ENPMCVwZbBQ';
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [69.3451, 30.3753],
            zoom: 3
        });

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        });

        map.addControl(geocoder);

        geocoder.on('result', (e) => {
            const res = e.result ? e.result : {}
            if(res){
                const a = res.place_name && res.place_name.split(", ");
                const data = {
                address:res.place_name ? res.place_name : "",
                city: a && a.length > 0 && a[0],
                province: a && a.length > 0 && a[1],
                country: a && a.length > 0 && a[2],
                latitude:res.geometry && res.geometry.coordinates && res.geometry.coordinates[0],
                longitude:res.geometry && res.geometry.coordinates && res.geometry.coordinates[1],
                }
                Object.assign(data,{pincode: "1234",})
                setAddress(data)
            }
        });

        return () => map.remove();
    }, []);


    return (
        <div>
            <div ref={mapContainerRef} className="map-container" style={{width:"100%"}}/>
        </div>
    );
};

export default MapWithAutocomplete;
