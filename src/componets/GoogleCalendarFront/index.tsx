import { Container, Button } from '@mantine/core'
import { useState } from 'react'

export default function GoogleCalendarFront() {
    const [url, setURL] = useState<string | null>(null)

    const getURL = async () => {
      const localS = window.localStorage;
      if(!localS.getItem('bearer')) return alert('No Authorization') 
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

    return (
        <Container>
            <h2>Google Calendar </h2>
            {
                url ? <a href={url ? url : 'NA'}>sing</a> : <p>loading</p>
            }
            <Button onClick={getURL}>Sync</Button>
        </Container>
    )

}
