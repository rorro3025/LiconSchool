import { GoogleMap, useJsApiLoader, Marker, Polygon, Circle } from '@react-google-maps/api'
import { CONSTANS } from '@/config/DDBConstans';

const containerStyle = {
    width: "800px",
    height: "700px"
}

const center = {
    lng: -99.22666654883736,
    lat: 19.526496333269435
}

const polygonCoords = [
    { lng: -99.18773082124876, lat: 19.530004919329457 },
    { lng: -99.18938919955953, lat: 19.528441945679518 },
    { lng: -99.19031052084364, lat: 19.525489620858835 },
    { lng: -99.18978076110537, lat: 19.522363571070684 },
    { lng: -99.18846787827596, lat: 19.52188597480567 },
    { lng: -99.18750049092787, lat: 19.523818060092054 },
    { lng: -99.18639490538737, lat: 19.52446931958957 },
    { lng: -99.18602637687404, lat: 19.527399954844512 },
    { lng: -99.18773082124876, lat: 19.530004919329457 },
];

const circle = {
    Center: [-99.226528, 19.526507],
    Radius: 30,
}


export default function MapGoogleV() {

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: CONSTANS.SECRETS.GOOGLE_MAP
    })

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
        >
            <Marker position={center} />
            <Polygon
                paths={polygonCoords}
                options={{
                    fillColor: "#00BFFF",
                    fillOpacity: 0.35,
                    strokeColor: "#0077FF",
                    strokeOpacity: 0.9,
                    strokeWeight: 2,
                }}
            />
            <Circle
                center={{ lat: circle.Center[1], lng: circle.Center[0] }}
                radius={30}
                options={{
                    fillColor: "#00BFFF",
                    fillOpacity: 0.35,
                    strokeColor: "#0077FF",
                    strokeOpacity: 0.9,
                    strokeWeight: 2,
                }}
            />
            <Circle
                center={{ lat: 19.525908964213187, lng: -99.22611236572266 }}
                radius={30}
                options={{
                    fillColor: "#00BFFF",
                    fillOpacity: 0.35,
                    strokeColor: "#0077FF",
                    strokeOpacity: 0.9,
                    strokeWeight: 2,
                }} />
        </GoogleMap>
    ) : (
        <></>
    )
}