import { useEffect, useRef, useState } from 'react'
import {
  HubConnection,
  HubConnectionBuilder,
  HttpTransportType,
  LogLevel,
} from '@microsoft/signalr'
import { useAuth } from '@/store/useAuth'
import { NotificationDataModel } from '@/interfaces/notification'
import { SIGNAL_IR_URL } from '@/utils/constants'

export default function useSignalIR() {
  const [connection, setConnection] = useState<HubConnection>()
  const isAlreadyConnected = useRef(false)
  const [unReadMessage, setUnReadMessage] = useState<number>(0)
  const [messages, setMessages] = useState<NotificationDataModel[]>([])
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState<NotificationDataModel | undefined>()
  const { token } = useAuth()

  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => {
      setOpen(false)
      setMessage(undefined)
    }, 10000)

    return () => clearTimeout(timer)
  }, [open])

  useEffect(() => {
    if (!token.length || connection !== undefined) return
    const connect = new HubConnectionBuilder()
      .withUrl(SIGNAL_IR_URL, {
        accessTokenFactory: () => token,
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .configureLogging(LogLevel.Information)
      .build()

    setConnection(connect)
  }, [token])

  useEffect(() => {
    const start = async () => {
      if (!connection || isAlreadyConnected.current) return
      try {
        await connection.start()
        isAlreadyConnected.current = true
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    }

    if (connection) {
      connection.onclose(async () => {
        await start()
      })

      connection.on(
        'LoadNotifications',
        (data: {
          notifications: NotificationDataModel[]
          unreadCount: number
        }) => {
          setMessages(data.notifications)
          setUnReadMessage(data.unreadCount)
        }
      )

      connection.on(
        'ReceiveNotification',
        (notification: NotificationDataModel) => {
          setMessage(notification)
          setOpen(true)
        }
      )

      connection.on('CountNotification', (count: number) => {
        setUnReadMessage(count)
      })
    }

    start()
  }, [connection])

  const handleReadMessage = async (id: string) => {
    if (!connection || !isAlreadyConnected.current) return
    try {
      await connection.invoke('Read', { id })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const handleDisconnect = async () => {
    if (!connection || !isAlreadyConnected.current) return
    try {
      await connection.stop()
      setConnection(undefined)
      isAlreadyConnected.current = false
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  return {
    unReadMessage,
    handleReadMessage,
    handleDisconnect,
    messages,
    message,
    open,
    setOpen,
  }
}
