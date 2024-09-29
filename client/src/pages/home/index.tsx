import { useAuth } from '../../auth'
import { MessageData, OnlineUser } from '../../types/Types'
import { WS_URL } from '../../utils/constanst'
import { useEffect, useState } from 'react'

export default function Home() {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [onlinePeople, setOnlinePeople] = useState<OnlineUser[]>([])
  const { user } = useAuth()

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}`)
    setWs(ws)
    ws.addEventListener('message', handleMessages)
  }, [])

  const handleMessages = (event: MessageEvent) => {
    const messageData: MessageData = JSON.parse(event.data)
    if (messageData.online) {
      setOnlinePeople(messageData.online)
    }
  }

  const onlinePeopleWithoutMe = onlinePeople.filter(p => p.id !== user?.id)

  return(
    <section className='flex w-full h-full'>
      <div className='w-4/12 p-2 rounded-l-md bg-slate-500'>
        contacts
      </div>

      <div className='w-8/12 p-2 rounded-r-md bg-slate-600'>
        messages
      </div>
    </section>
  )
}