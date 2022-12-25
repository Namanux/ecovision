// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// * jwt and cookie
import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const SECRET = process.env.JWT_SECRET

  const backendURI = process.env.NEXT_PUBLIC_BACKEND_API || "https://ecovision-backend.vercel.app" 
  const { email, password, remember } = req.body

  const rawResponse = await fetch(`https://ecovision-backend.vercel.app/api/users/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      remember
    })
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
      .json({ success: true })
  }
}