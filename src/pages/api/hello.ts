import { NextApiRequest, NextApiResponse } from "next";
import * as t from '@turf/turf'

interface UserI {
    username: string
    email: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const fesi = t.polygon([
        [
            [-99.18773082124876, 19.530004919329457], [-99.18938919955953, 19.528441945679518], [-99.19031052084364, 19.525489620858835],
            [-99.18978076110537, 19.522363571070684], [-99.18846787827596, 19.52188597480567], [-99.18750049092787, 19.523818060092054], 
            [-99.18639490538737, 19.52446931958957], [-99.18602637687404,19.527399954844512], [-99.18773082124876, 19.530004919329457]
        ]
    ]
    )
    //const liconPoint = t.point([19.526507, -99.226528])
    const liconPoint = t.point([-99.226528, 19.526507])
    const geo = t.circle(liconPoint, 100, { units: 'kilometers' })

    // long, lat
    const treu = t.point([-99.226600, 19.526967])
    const fasle = t.point([ -99.228614, 19.523489])
    const noIz = t.point([-99.188963, 19.526207 ])

    const distance = t.distance(liconPoint, treu, { units: 'kilometers' })
    console.log(distance)

    res.status(200).json({
        treu: t.booleanPointInPolygon(noIz, fesi),
        false: t.booleanPointInPolygon(fasle, fesi),
        circle: distance <= 30
    })

}
