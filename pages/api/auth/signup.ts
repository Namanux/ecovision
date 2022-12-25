// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'

type Data = {
  name: string,
  email: string,
  password: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const SECRET = process.env.SECRET_KEY
  const backendURI = process.env.NEXT_PUBLIC_BACKEND_API || "https://ecovision-backend.vercel.app" 
  const rawResponse = await fetch(`${backendURI}/api/users/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  })

  const response = await rawResponse.json()

  if(response.success) {
    let data = response.data
    const token = sign({
      uid: data.user.uid,
      email: data.user.email,
      access_token: data.user.stsTokenManager.accessToken,
      token_type: 'Bearer',
      // expires_in: data.user.stsTokenManager.expirationTime // 3600 * 24 * 30
    }, "7ujm&UJM", {expiresIn: '1h'})

    const serialized = serialize("ecovision", token, {
      // domain: "https://ecovision-three.vercel.app",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600, // * 24 * 30,
      path: "/"
    })

    res.setHeader('Set-Cookie', serialized)
      .status(200)
      .json({ success: true, message: "Registration successful" })
  }
}