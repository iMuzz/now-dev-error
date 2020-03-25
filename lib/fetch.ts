import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import { NextPageContext } from 'next'

import { IS_PROD, IS_BROWSER } from '../config/build'

interface IRequest {
  path: string
  method?: string
  body?: any
}

// This is for Authenticated client-side AND server-side fetch requests.
// Where the request could happen on either the client or server
export const authFetch = async (ctx: NextPageContext, reqOptions: IRequest, errHandler: Function) => {
  const { token } = nextCookie(ctx)
  const { path, method, body } = reqOptions
  const protocol = IS_PROD ? 'https' : 'http'

  const apiUrl = IS_BROWSER
    ? `${protocol}://${window.location.host}/api${path}`
    : `${protocol}://${ctx.req && ctx.req.headers['x-forwarded-host']}/api${path}`

  try {
    const response = await fetch(apiUrl, {
      method: method ? method : 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.stringify({ token }),
      },
      body: JSON.stringify(body),
    })

    if (response.ok) {
      return await response.json()
    } else {
      // https://github.com/developit/unfetch#caveats
      return errHandler()
    }
  } catch (error) {
    // Implementation or Network error
    return errHandler()
  }
}

interface IClientReq {
  method?: string
  body?: any
}

// This is for Authenticated client-side fetch requests. Where you know the fetch request is going
// ONLY going to happen on the browser and NOT Happen server-side
export const clientFetch = async (path: string, reqOptions: IClientReq = { method: 'GET' }, _errHandler?: Function) => {
  const token = cookie.get('token')
  const { method, body } = reqOptions
  const protocol = IS_PROD ? 'https' : 'http'

  const apiUrl = `${protocol}://${window.location.host}/api${path}`

  try {
    const response = await fetch(apiUrl, {
      method: method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.stringify({ token }),
      },
      body: JSON.stringify(body),
    })

    if (response.ok) {
      return await response.json()
    } else {
      // return errHandler()
    }
  } catch (error) {
    // Implementation or Network error
    // return errHandler()
  }
}
