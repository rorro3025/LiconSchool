import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import styles from './styles.module.css'
import { SignatureCanvas } from 'react-signature-canvas'
import { Button } from '@mantine/core'
import { saveIntoDB } from '@/utils/db'

export default function Feedback() {
    const canva = useRef<SignatureCanvas | null>(null)

    const [formData, setFormData] = useState({
        order: '',
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

    const saveFormOffline = async (form: {
        order: string,
        calificacion: string,
        email: string,
        signature: string,
    }) => {
        await saveIntoDB(form.order, form)
        const registration = await navigator.serviceWorker.ready
        //@ts-ignore
        registration.sync.register(`feedback-${form.order}`)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!canva.current) return alert('no canvas')
        if (canva.current.isEmpty()) return alert('canva empty')
        if (!formData.order) return alert('Numer o de orden necesario')
        const data = {
            order: formData.order,
            calificacion: formData.calificacion,
            email: formData.email,
            signature: canva.current.toDataURL(),
        };
        if (!navigator.onLine) {
            saveFormOffline(data);
            alert('Estás offline. El formulario se guardó y se enviará cuando vuelvas a estar online.');
            return;
        }
        console.log('online', data)
        // Aquí deberías hacer el envío real
        alert('Done');
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
                    Order:
                </label>
                <input type="number" name="order" required onChange={handleChangeInput} className={styles.formGroup} />
            </div>
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
                <div className={styles.signatureContainer}>
                    <SignatureCanvas ref={canva} penColor='darkCyan' canvasProps={{
                        style: { width: '100%', minHeight: '150px' }
                    }} />
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
