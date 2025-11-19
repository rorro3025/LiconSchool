import { ChangeEvent, FormEvent, useEffect } from 'react'
import { Modal, Button, Box, Input, InputLabel, Select } from '@mantine/core'
import { useState } from 'react'
import { makeHTTPRequest } from '@/utils'
import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { mutate } from 'swr';
import { useBoolean } from '@/utils';
import { TermOwnerI, EditTermOwnerI } from '@/interfaces'

interface Props {
    opened: boolean;
    editData: EditTermOwnerI | null;
    close: () => void;
}


const icon = <IconInfoCircle />;

export default function FormModal({ close, opened, editData }: Props) {
    const initialState: TermOwnerI = {
        description: '',
        type: '',
    }

    const isLoading = useBoolean()
    const [data, setData] = useState(initialState)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')



    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        isLoading.setTrue()
        let res: any = null
        if (editData) {
            res = await makeHTTPRequest(`https://xj7fquaclh.execute-api.us-east-1.amazonaws.com/bi/glossary/${editData.uuid}`, {
                method: 'PATCH',
                body: data
            })
        } else {
            res = await makeHTTPRequest('https://xj7fquaclh.execute-api.us-east-1.amazonaws.com/bi/glossary', {
                method: 'POST',
                body: data
            })
        }
        if (res.success === false) {
            setError(true)
            setMessage(res.message)
        }
        else {
            setError(false)
            setData(initialState)
            await mutate('https://xj7fquaclh.execute-api.us-east-1.amazonaws.com/bi/glossary')
            close()
        }
        isLoading.setFalse()
        alert(res.success ? 'Exito':'Error')
    };

    useEffect(() => {
        if (editData) {
            setData(editData)
        }
    }, [editData])
    // <Input placeholder="type" type="text" m={12} name='type' onChange={handleChange} value={data.type} />
    return (
        <Modal opened={opened} onClose={close} title='Add term owner' centered>
            <Box>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <InputLabel htmlFor='type'>Type</InputLabel>
                    <Select m={12} name='type' onChange={(value) => setData({ ...data, type: value || '' })} value={data.type} data={['Área', 'Proceso', 'Sistema o Herramienta', 'Normativas']} />
                    <InputLabel htmlFor='description'>Description</InputLabel>
                    <Input placeholder="description" type="text" name='description' m={12} onChange={handleChange} value={data.description} />
                    <Box m={12}>
                        <Button loading={isLoading.value} type="submit" color='green' variant='gradient' gradient={{ from: 'violet', to: 'teal', deg: 119 }} fullWidth>Save</Button>
                    </Box>
                </form>
            </Box>
            {
                error && <Alert variant="filled" color="red" title="Error" icon={icon} >
                    {message}
                </Alert>
            }


        </Modal>
    )
}