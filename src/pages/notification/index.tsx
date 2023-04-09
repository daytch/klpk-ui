import React, { useCallback, useRef } from 'react'
import Head from 'next/head'
import { APP_NAME } from '@/utils/constants'
import GeneralLayout from '@/components/layouts/general'
import NoDataCard from '@/components/organisms/cards/NoDataCard'
import NotificationCard from '@/components/organisms/cards/NotificationCard'
import { useGetNotifications } from '@/services/notification/query'

const NotificationPage = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isError } =
    useGetNotifications({
      params: { limit: 10 },
      pageParam: 1,
      enabled: true,
    })
  const observer = useRef<IntersectionObserver>()
  const isEmptyData = !data?.pages[0]?.length

  const lastNotification = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      })
      if (node) observer.current.observe(node)
    },
    [isLoading, hasNextPage]
  )

  return (
    <>
      <Head>
        <title>{APP_NAME} | Notifikasi</title>
      </Head>
      <GeneralLayout>
        <div className="container pt-10 pb-20">
          <div className="w-full bg-dark-200 max-w-lg mx-auto rounded-xl overflow-hidden px-6 py-4 min-h-[604px] space-y-4">
            {!isLoading && !isError && isEmptyData && (
              <NoDataCard text="Tidak ada notifikasi" />
            )}
            {!isLoading && !isError && !isEmptyData && (
              <>
                <h1 className="text-left text-2xl text-gold-100 font-bold mb-4">
                  Notifikasi
                </h1>
                {data?.pages.length !== 0 &&
                  data?.pages.map((page, pageIndex) =>
                    page.map((notification, bookIndex) => {
                      if (
                        data.pages.length === pageIndex + 1 &&
                        page.length === bookIndex + 1
                      ) {
                        return (
                          <div
                            key={`${pageIndex}-${bookIndex}`}
                            ref={lastNotification}
                          >
                            <NotificationCard
                              notification={notification}
                              isDisabled={notification.read}
                            />
                          </div>
                        )
                      }
                      return (
                        <div key={`${pageIndex}-${bookIndex}`}>
                          <NotificationCard
                            notification={notification}
                            isDisabled={notification.read}
                          />
                        </div>
                      )
                    })
                  )}
              </>
            )}
          </div>
        </div>
      </GeneralLayout>
    </>
  )
}

export default NotificationPage
