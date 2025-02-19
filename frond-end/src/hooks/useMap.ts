import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapProps } from "../types/Map";
import { useEffect, useRef } from "react";
import { celciusToFahrenheit } from "../utils/temperature";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export const useMap = (
    { mapContainerRef, data, unit }: MapProps
) => {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);

    // Initialize the map
    useEffect(() => {
        if (mapRef.current || !mapContainerRef.current) return; // Prevent initializing map again

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: data.length > 0 ? [data[0].lon, data[0].lat] : [0, 0],
            zoom: 5,
            doubleClickZoom: false,
        });

        // cleanup when map is destroyed
        return () => {
            if (mapRef.current) {
                markersRef.current.forEach((marker) => marker.remove());
            }
        };
    }, [data, mapContainerRef]); //Update the map and markers when mapContainerRef, data changes

    // Update map and markers when data or unit changes
    useEffect(() => {
        //exiting when data is not available
        if (!mapRef.current || data.length === 0) return;

        // Clear existing markers before adding new ones
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];

        console.log(data);

        // Add markers only if data is available
        if (data.length > 0) {
            data.forEach(({ city, lat, lon, temp }) => {
                const popup = new mapboxgl.Popup({
                    closeButton: false,
                    anchor: "left",
                }).setHTML(
                    `<div class="popup">${city}: ${unit == 1 ? temp : celciusToFahrenheit(temp, unit)} ${unit == 1 ? "C" : "F"
                    }°</div>`
                );

                const marker = new mapboxgl.Marker()
                    .setLngLat([lon, lat])
                    .setPopup(popup)
                    .addTo(mapRef.current!);

                popup.addTo(mapRef.current!);

                markersRef.current.push(marker);
            });
        }

        return () => {
            markersRef.current.forEach((marker) => marker.remove());
        };
    }, [data, unit]);

};
