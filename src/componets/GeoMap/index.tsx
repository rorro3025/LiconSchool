import React, { useEffect, useRef, useState } from 'react';
import L, { Map, Circle, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Props {
    coordinates: {
        latitude: number;
        longitude: number;
    } | null;
}

const GeoFenceMap = ({ coordinates }: Props) => {
    const mapRef = useRef(null);
    const [fences, setFences] = useState<Circle[]>([]);
    const [map, setMap] = useState<Map | null>(null);

    useEffect(() => {
        // Inicializar el mapa
        if (!mapRef.current) return;
        const initialFences: LatLngExpression = coordinates ? [coordinates.latitude, coordinates.longitude] : [19.4326, -99.1332];
        const leafletMap = L.map(mapRef.current).setView([...initialFences], 17); // Coordenadas de CDMX

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(leafletMap);

        setMap(leafletMap);

        // Ejemplo: agregar una geocerca circular por defecto
        const circle = L.circle(initialFences, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.3,
            radius: 50
        }).addTo(leafletMap);

        setFences([circle]);

        // Permitir al usuario dibujar geocercas
        leafletMap.on('click', (e) => {
            const newCircle = L.circle([e.latlng.lat, e.latlng.lng, 50], {
                color: 'blue',
                fillColor: '#30f',
                fillOpacity: 0.3,
                radius: 50,
                weight: 2
            }).addTo(leafletMap);

            console.log('n', e.latlng.lat, e.latlng.lng)
            setFences(prev => [...prev, newCircle]);
        });

        return () => {
            leafletMap.remove();
        };
    }, []);

    return (
        <div>
            <div
                ref={mapRef}
                style={{ height: '500px', width: '100%' }}
            />
            <div>
                <h3>Geocercas creadas: {fences.length}</h3>
                <button onClick={() => {
                    if (!map) return console.log("Mapa no cargado");
                    fences.forEach(fence => map.removeLayer(fence));
                    setFences([]);
                }}>
                    Eliminar todas las geocercas
                </button>
            </div>
        </div>
    );
};

export default GeoFenceMap;