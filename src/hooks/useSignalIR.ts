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
  const { token } = useAuth()
  const [connection, setConnection] = useState<HubConnection>()
  const isAlreadyConnected = useRef(false)
  const [unReadMessage, setUnReadMessage] = useState<number>(0)

  useEffect(() => {
    if (!token.length) return
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
          console.log(data.notifications)
          setUnReadMessage(data.unreadCount)
        }
      )

      connection.on(
        'ReceiveNotification',
        (notification: NotificationDataModel) => {
          console.log(notification)
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
      console.log(error)
    }
  }

  return { unReadMessage, handleReadMessage, handleDisconnect }
}
