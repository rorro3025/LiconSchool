import { ChangeEvent, FormEvent, useRef, useState, useEffect } from 'react'
import styles from './styles.module.css'
import { SignatureCanvas } from 'react-signature-canvas'
import { Button } from '@mantine/core'

export default function Feedback() {
    const canva = useRef<SignatureCanvas | null>(null)

    const [formData, setFormData] = useState({
        calificacion: '',
        email: '',
    })

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    // Función para guardar en localStorage
    const saveFormOffline = (data: any) => {
        const stored = JSON.parse(localStorage.getItem('offlineForms') || '[]');
        stored.push(data);
        localStorage.setItem('offlineForms', JSON.stringify(stored));
    };

    // Simulación de envío (reemplaza por tu lógica real de envío)
    const sendForm = async (data: any) => {
        // Aquí deberías hacer el fetch/post real
        // Por ahora, simula éxito
        return Promise.resolve(true);
    };

    // Al volver online, intenta enviar los formularios almacenados
    useEffect(() => {
        const trySendStoredForms = async () => {
            const stored = JSON.parse(localStorage.getItem('offlineForms') || '[]');
            if (stored.length === 0) return;
            const remaining = [];
            for (const form of stored) {
                try {
                    const ok = await sendForm(form);
                    if (!ok) remaining.push(form);
                } catch {
                    remaining.push(form);
                }
            }
            localStorage.setItem('offlineForms', JSON.stringify(remaining));
        };
        window.addEventListener('online', trySendStoredForms);
        // Intenta al montar también
        trySendStoredForms();
        return () => window.removeEventListener('online', trySendStoredForms);
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!canva.current) return alert('no canvas')
        if(canva.current.isEmpty()) return alert('canva empty')
        const data = {
            calificacion: formData.calificacion,
            email: formData.email,
            signature: canva.current.toDataURL(),
        };
        if (!navigator.onLine) {
            saveFormOffline(data);
            alert('Estás offline. El formulario se guardó y se enviará cuando vuelvas a estar online.');
            return;
        }
        // Aquí deberías hacer el envío real
        sendForm(data).then(() => {
            alert('Formulario enviado correctamente');
        }).catch(() => {
            alert('Error al enviar el formulario');
        });
    }

    return (
        <form onSubmit={handleSubmit} className={styles.feedbackForm}>
            <div className={styles.formGroup}>
                <label>
                    Calificación:
                </label>
                <select name="calificacion" onChange={handleChangeSelect} className={styles.formGroup}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <br />
            <div className={styles.formGroup}>
                <label>
                    Email:
                </label>
                <input type="email" name="email" required onChange={handleChangeInput} className={styles.formGroup} />
            </div>
            <br />
            <div className={styles.formGroup}>
                <label>
                    Firma:
                </label>
                <div className={styles.canvasContainer}>
                    <SignatureCanvas ref={canva} penColor='darkCyan' />
                    <div>
                        <Button onClick={() => canva.current?.clear()} variant="gradient" fullWidth />
                    </div>
                </div>
            </div>
            <br />
            <button type="submit" className={styles.submitButton}>Enviar</button>
        </form>
    )
}
