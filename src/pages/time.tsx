import { useEffect, useState } from "react";
import Layout from "@/componets/Layout";
import SocketNative from "@/componets/socketNative";
import SocketLib from "@/componets/SocketLib";


const InactivityDetector = () => {
    const [isInactive, setIsInactive] = useState(false);
    //const [isConnecting, setIsConnecting] = useState(true)

    useEffect(() => {

        let inactivityTimeout: any;

        const resetInactivityTimeout = () => {
            clearTimeout(inactivityTimeout);
            inactivityTimeout = setTimeout(() => setIsInactive(true), 5000); // 5 segundos de inactividad
        };

        const handleUserActivity = () => {
            setIsInactive(false);
            resetInactivityTimeout();
        };

        // Agregar eventos para detectar la actividad del usuario
        window.addEventListener("mousemove", handleUserActivity);
        window.addEventListener("keydown", handleUserActivity);
    }, []);

    return (
        <Layout>
            {isInactive ? (
                <p>El usuario está inactivo.</p>
            ) : (
                <p>El usuario está activo.</p>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <SocketLib />
            </div>
        </Layout>
    );
};

export default InactivityDetector;
