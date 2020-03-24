import 'react'

// This is to get rid of TS Errors for style tags
declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean
    global?: boolean
  }
}
