// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = `https://ecovision-backend.vercel.app/api/listings/${req.body.listing}/comment`

    await axios.post(url, req.body)
        .then((response) => {
            res.json(response.data)
        })
}