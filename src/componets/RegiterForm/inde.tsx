import { ChangeEvent, FormEvent, useState } from 'react'
import { Container, TextInput, NumberInput, Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export default function RegisterForm() {
    const [opened, { open, close }] = useDisclosure()

    const initialState = {
        name: '',
        username: '',
        email: '',
        age: 0
    }

    const [formData, setFormData] = useState(initialState)

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            console.log(formData)
    }

    return (
        <>
            <Button onClick={open} my={'md'} mx={'md'} variant='gradient' color='teal'>
                Sing up
            </Button>

            <Modal opened={opened} onClose={close} title='Register' centered>

                <form onSubmit={handleSubmit}>
                    <Container>
                        <TextInput
                            label="Name"
                            name='name'
                            placeholder="Enter your name"
                            onChange={handleChange}
                            value={formData.name}
                            required
                        />
                        <TextInput
                            label="Username"
                            name='username'
                            placeholder="Enter your username"
                            onChange={handleChange}
                            value={formData.username}
                            required
                        />
                        <TextInput
                            label="Email"
                            name='email'
                            type='email'
                            placeholder="Enter your email"
                            onChange={handleChange}
                            value={formData.email}
                            required
                        />
                        <NumberInput
                            label="Age"
                            name='age'
                            placeholder="Enter your age"
                            onChange={(e) => {
                                setFormData({ ...formData, age: Number(e) })
                            }}
                            value={formData.name}
                            required
                            min={0}
                            max={99}
                        />
                        <Button type="submit" mt="md" fullWidth variant='filled' color='lime'>
                            Register
                        </Button>
                    </Container>
                </form>
            </Modal>
        </>

    )
}
