import { useAuth } from '../../auth'
import { MessageData, OnlineUser } from '../../types/Types'
import { WS_URL } from '../../utils/constanst'
import { useEffect, useState } from 'react'

export default function Home() {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [onlinePeople, setOnlinePeople] = useState<OnlineUser[]>([])
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null)
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

  return (
    <>
      <div className='w-3/12 p-2 rounded-l-md space-y-1'>
        {
          onlinePeopleWithoutMe.map((person) => (
            <div key={person.id} className='flex items-center gap-2 hover:bg-slate-600 py-4 rounded-md px-2 cursor-pointer' onClick={() => setSelectedPerson(person.id)}>
              <figure className='relative'>
                <div className='flex items-center justify-center h-12 w-12 rounded-full border font-bold text-yellow-300'>
                  <span>{person.names[0]}</span><span>{person.lastnames[0]}</span>
                </div>
                <div className='absolute p-1.5 border bottom-0 right-0 bg-green-600 rounded-full shadow-sm shadow-gray-400'>
                </div>
              </figure>
              <article className=''>
                <span className='font-semibold text-white'>{person.names} {person.lastnames}</span>
                <p className='text-blue-500'>lastMessage</p>
              </article>

            </div>
          ))
        }
      </div>
      <div className='border border-gray-500'></div>

      {
        selectedPerson
          ? (
            <div className='w-9/12 flex flex-col h-full'>
              <div className='h-12'>header</div>
              <div className='flex-1'>main</div>
              <div className='h-10 p-1 flex gap-2 items-center'>
                <button className='hover:bg-slate-600 p-1 rounded-sm text-gray-200'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                  </svg>
                </button>

                <button className='hover:bg-slate-600 p-1 rounded-sm text-gray-200'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                  </svg>
                </button>

                <form className='flex w-full gap-2'>
                  <input type='text' placeholder='Escribe un mensaje' className='w-full py-1 rounded-md px-1 outline-none' />

                  <button type='submit' className='text-2xl px-4 py-1 rounded-md text-white bg-green-700 hover:bg-green-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          )
          : (
            <div className='w-9/12 flex h-full items-center justify-center text-xl text-gray-400'>
              <p>↩  Selecciona a una persona para chatear</p>
            </div>
          )
      }

    </>
  )
}