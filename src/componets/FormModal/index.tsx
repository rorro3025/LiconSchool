import { ChangeEvent, FormEvent } from 'react'
import { Modal, Button, Box, Input, InputLabel } from '@mantine/core'
import { useState } from 'react'
import { makeHTTPRequest } from '@/utils'
import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { mutate } from 'swr';

interface DataI {
    description: string;
    type: string;
}


interface EditData extends DataI {
    uuid: string;
}

interface Props {
    opened: boolean;
    editData?: EditData;
    close: () => void;
}


const icon = <IconInfoCircle />;

export default function FormModal({ close, opened }: Props) {
    const initialState: DataI = {
        description: '',
        type: '',
    }

    const [data, setData] = useState(initialState)
    const [error, setError]= useState(false)
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
        const res = await makeHTTPRequest('https://xj7fquaclh.execute-api.us-east-1.amazonaws.com/bi/glossary', {
            method: 'POST',
            body: data
        })
        if(res.success === false){
        setError(true)
        setMessage(res.message)
        } 
        else {
            setError(false)
            setData(initialState)
            await mutate('https://xj7fquaclh.execute-api.us-east-1.amazonaws.com/bi/glossary')
            close()
        }
        console.log(res)
        
    };

    return (
        <Modal opened={opened} onClose={close} title='Add term owner' centered>
            <Box>
                <form onSubmit={handleSubmit}>
                    <InputLabel htmlFor='type'>Type</InputLabel>
                    <Input placeholder="type" type="text" m={12} name='type' onChange={handleChange} value={data.type} />
                    <InputLabel htmlFor='description'>Description</InputLabel>
                    <Input placeholder="description" type="text" name='description' m={12} onChange={handleChange} />
                    <Button type="submit" m={12} color='green' variant='gradient'>Save</Button>
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