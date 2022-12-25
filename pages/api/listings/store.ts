// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method != 'POST') {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        })
    }

    const backendURI = process.env.NEXT_PUBLIC_BACKEND_API || "https://ecovision-backend.vercel.app" 
    await fetch(`${backendURI}/api/listings`, {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => res.json())
    .then(response => {
        if(!response.success) {
            return res.status(400).json(response)
        }
    
        return res.status(200).json(response)
    })
    .catch(err => res.status(400).json({
        message: err.message
    }))
}