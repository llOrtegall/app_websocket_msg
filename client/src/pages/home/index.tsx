import { MessageData, Messages, OnlineUser } from '../../types/Types'
import { WS_URL } from '../../utils/constanst'
import { useEffect, useState } from 'react'
import { useAuth } from '../../auth'


export default function Home() {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [onlinePeople, setOnlinePeople] = useState<OnlineUser[]>([])
  const [selectedPerson, setSelectedPerson] = useState<OnlineUser | null>(null)
  const [messages, setMessages] = useState<Messages[]>([])
  const [newMessageText, setNewMessageText] = useState('')
  const { user } = useAuth()

  const id = user?.id as string

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}`)
    setWs(ws)
    ws.addEventListener('message', handleMessages)
  }, [])

  const handleMessages = (event: MessageEvent) => {
    const messageData: MessageData = JSON.parse(event.data)
    if (messageData.online) {
      setOnlinePeople(messageData.online)
    } else if (messageData.messages) {
      setMessages(prev => ([...prev, { ...messageData.messages }]))
    }
  }

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault()
    ws?.send(JSON.stringify(
      {
        recipient: selectedPerson?.id,
        text: newMessageText
      }
    ))
    setNewMessageText('')
    setMessages(pre => ([...pre, { text: newMessageText, sender: id, recipient: selectedPerson?.id as string, id: Math.random().toString() }]))
  }

  const handleSelect = (person: OnlineUser) => {
    setSelectedPerson(person)
  }

  const onlinePeopleWithoutMe = onlinePeople.filter(p => p.id !== user?.id)

  return (
    <>
      <div className='w-3/12 p-2 rounded-l-md space-y-1'>
        {
          onlinePeopleWithoutMe.map((person) => (
            <div key={person.id} className={`flex items-center gap-2 hover:bg-slate-600 py-4 rounded-md px-2 cursor-pointer ${selectedPerson?.id ? 'bg-slate-600': ''}`} onClick={() => handleSelect(person)} >
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
              <div className='h-12 border-b flex gap-2 text-center items-center justify-between px-2 border-gray-500 text-white'>
                <span>{selectedPerson.names} {selectedPerson.lastnames}</span>
                <div>
                  <button className='hover:bg-slate-600 p-1 rounded-sm text-gray-200'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>

                  </button>
                  <button className='hover:bg-slate-600 p-1 rounded-sm text-gray-200'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                    </svg>
                  </button>
                  <button className='hover:bg-slate-600 p-1 rounded-sm text-gray-200'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                  </button>
                </div>
              </div>

              <div className='flex-1 p-2'>
                {
                  messages.map(message => (
                    <div key={message.id} className={`flex gap-2 ${message.sender === id ? 'justify-end' : 'justify-start'}`}>
                      <div className={`p-2 rounded-lg ${message.sender === id ? 'bg-green-700' : 'bg-slate-600'}`}>
                        <p className='text-white'>{message.text}</p>
                      </div>
                    </div>
                  ))
                }
              </div>

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

                <form className='flex w-full gap-2 pr-1' onSubmit={sendMessage}>
                  <input type='text' placeholder='Escribe un mensaje' className='w-full py-1 rounded-md px-1 outline-none' value={newMessageText} onChange={ev => setNewMessageText(ev.target.value)} />

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