import React, { useEffect, useState } from 'react'
import { NotificationDataModel } from '@/interfaces/notification'
import Image from 'next/image'
import IconMessage from '@/assets/icons/message.svg'
import {
  createNotificationTitle,
  createRelativeTime,
  sanitizeHTML,
} from '@/utils/common'
import Button from '@/components/atoms/Button'
import useSignalIR from '@/hooks/useSignalIR'

interface NotificationCardProps {
  notification: NotificationDataModel

  isDisabled?: boolean
  hideReadButton?: boolean
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  isDisabled,
  hideReadButton,
}) => {
  const [content, setContent] = useState('')
  const [unRead, setUnRead] = useState(false)
  const { handleReadMessage } = useSignalIR()

  const handleSanitizeContent = async () => {
    const notificationContent = await sanitizeHTML(notification.content)
    setContent(notificationContent)
  }

  const handleClickMessage = async () => {
    if (!notification?.id) return
    await handleReadMessage(notification.id)
    setUnRead(true)
  }

  useEffect(() => {
    handleSanitizeContent()
    setUnRead(notification?.read ?? false)
  }, [notification])

  return (
    <div className="mt-2 px-6 py-4 bg-dark-300 rounded-lg shadow w-full">
      <div className=" inline-flex items-center justify-between w-full">
        <div className="inline-flex items-center">
          <Image
            src={IconMessage}
            width={24}
            height={24}
            alt="Training Icon"
            className="w-6 h-6 mr-3"
          />
          <h3 className="font-bold text-base text-gold-200">
            {createNotificationTitle(notification.type)}
          </h3>
        </div>
        <p className="text-xs text-gold-300">
          {createRelativeTime(notification.creationDate)}
        </p>
      </div>
      <p
        className="mt-1 mb-4 text-sm text-gold-400"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {!unRead && !hideReadButton && (
        <div className="flex justify-end">
          <Button
            onClick={handleClickMessage}
            disabled={isDisabled}
            isFullWidth={false}
          >
            Tandai Dibaca
          </Button>
        </div>
      )}
    </div>
  )
}

export default NotificationCard
