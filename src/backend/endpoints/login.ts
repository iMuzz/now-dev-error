import { json, send, createError, run } from 'micro'
import { IncomingMessage, ServerResponse } from 'http'

import { auth } from '../lib/authenticate'

const loginHandler = async (req: IncomingMessage, res: ServerResponse) => {
  // TODO: Fix the any here
  const userCreds: any = await json(req)

  try {
    const token = await auth(userCreds)
    res.setHeader('Authorization', `Bearer ${token}`)
    send(res, 200, { token: token })
  } catch (error) {
    console.log(error)
    throw createError(error.statusCode, error.statusText)
  }
}

export default async (req: any, res: any) => run(req, res, loginHandler)
