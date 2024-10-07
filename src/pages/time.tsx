import { useEffect, useState } from "react";
import Layout from "@/componets/Layout";

const InactivityDetector = () => {
    const [isInactive, setIsInactive] = useState(false);

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
    </Layout>
);
};

export default InactivityDetector;
