import { WS_URL } from '../../utils/constanst'
import { useEffect } from 'react'

export default function Home() {

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}`)

    ws.addEventListener('open', handleMessages)
  }, [])

  const handleMessages = () => {
    console.log('Connected to the server')
  }

  return(
    <>
      <h1>Hello, world!</h1>
    </>
  )
}