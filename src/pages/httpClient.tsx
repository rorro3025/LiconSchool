import { useEffect, useState } from "react";
import Layout from "@/componets/Layout";
import HTTPClient from "@/componets/HTTPClient";
import dynamic from "next/dynamic";

const DynamicGeoFenceMap = dynamic(() => import('@/componets/GeoMap'), {
  ssr: false,
  loading: () => <p>Cargando mapa...</p>
});



export default function client() {
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Ubicación actual:", position.coords);
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    } else {
      console.log("Geolocalización no está disponible");
    }

  }, []);
  return (
    <Layout>
      {
        coordinates && (
          <DynamicGeoFenceMap coordinates={coordinates} />
        )
      }
      {
        /*
        <HTTPClient/>
        */
      }
    </Layout>
  )
}