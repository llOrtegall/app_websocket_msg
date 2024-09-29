import { WS_URL } from '../../utils/constanst'
import { useEffect } from 'react'

export default function Home() {

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}`)

    ws.onopen = () => {
      console.log('Connected to WS server')
    }
  }, [])

  return(
    <>
      <h1>Hello, world!</h1>
    </>
  )
}