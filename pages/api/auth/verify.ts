import type { NextApiRequest, NextApiResponse } from 'next'

import { verify } from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == 'GET'){

        let cookie = req.cookies
        
        if(cookie.ecovision != undefined){
            const decode = verify(cookie.ecovision, "7ujm&UJM")

            return res.json({
                verified: true,
                decode
            })
        }

        // return res.json({})
    }
}