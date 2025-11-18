import { useEffect, useState } from "react";
import Layout from "@/componets/Layout";
import GoogleMap from "@/componets/GeoMap/MapGoogleV";
//import HTTPClient from "@/componets/HTTPClient";
//import dynamic from "next/dynamic";
import UTable from "@/componets/DDBUsers/Table";

/*
const DynamicGeoFenceMap = dynamic(() => import('@/componets/GeoMap'), {
  ssr: false,
  loading: () => <p>Cargando mapa...</p>
});
*/




export default function client() {
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    /*
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
    */
    getLocationCoords().catch(null)
  }, []);
  const getLocationCoords = async () => {
    try {
      const response = await fetch('/api/aws/location');
      if (!response.ok) {
        throw new Error('Failed to fetch location');
      }
      const data = await response.json()
      console.log('licon', data)
      return data;
    } catch (e) {
      console.error(e);
    }

  }
  return (
    <Layout>
      {/*
        coordinates && (
          <DynamicGeoFenceMap coordinates={coordinates} />
        )
      */}
      <GoogleMap />
      <UTable />
      {
        /*
        <HTTPClient/>
        */
      }
    </Layout>
  )
}