import mapLibre from 'maplibre-gl'
import { useState, useEffect, useRef } from 'react'
import { CONSTANS } from '@/config/DDBConstans'

export default function AWSMap() {

    useEffect(() => {
        const initMap = async () => {
            const apiKey = CONSTANS.SECRETS.AWS_MAP 
            const colorScheme = "Dark"
            const region = "us-east-1"
            const style = "Monochrome"
        }
    }, [])
    return (
        <div>
            <h1>AWS Map Component</h1>
            <p>This component will display a map using AWS services.</p>
        </div>
    )
}
