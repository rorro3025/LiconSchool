import {Container, Button} from '@mantine/core'
import {useState} from 'react'
import {offsetLine} from "maplibre-gl/src/style/query_utils";

export default function GoogleCalendarFront() {
    const [url, setURL] = useState<string | null>(null)
    const [calendars, setCalendars] = useState<string>('')

    const getURL = async () => {
        const localS = window.localStorage;
        if (!localS.getItem('bearer')) return alert('No Authorization')
        try {

            const response = await fetch("/api/calendar/auth", {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Authorization': `Bearer ${localS.getItem('bearer')}`
                }
            })
            const data = await response.json()
            setURL(data.url)
        } catch (e) {
            console.log(e)
        }
    }

    const handleGetCalendars = async () => {
        try {
            const response = await fetch('/api/calendar/list')
            if (response.ok) {
                const data = await response.json()
                setCalendars(JSON.stringify(data))
            } else {
                const err = await response.json()
                alert(err.error || 'Error')
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleCreateEvent = async () => {
        try {
            const response = await fetch('/api/calendar/create',{
                method: 'POST'
            })
            if (response.ok) {
                const data = await response.json()
                setCalendars(JSON.stringify(data))
            } else {
                const err = await response.json()
                alert(err.error || 'Error')
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Container>
            <h2>Google Calendar</h2>
            {
                url ? <a href={url ? url : 'NA'}>sing</a> : <p>loading</p>
            }
            <Button onClick={getURL}>Sync</Button>
            <p>
                {calendars}
            </p>
            <Container>
                <Button onClick={handleGetCalendars}>get Calendars</Button>
            </Container>
            <Container mt={12}>
                <Button variant={'light'} onClick={handleCreateEvent}>Create Event</Button>
            </Container>

        </Container>
    )

}
