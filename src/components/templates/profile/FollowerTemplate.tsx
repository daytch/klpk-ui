import React, { Fragment, useCallback, useRef } from 'react'
import ProfileUserCard from '@/components/organisms/cards/ProfileUserCard'
import { useGetFollowers } from '@/services/profile/query'
import { useFollowUser, useUnFollowUser } from '@/services/profile/mutation'
import { useToast } from '@/hooks/useToast'
import NoDataCard from '@/components/organisms/cards/NoDataCard'

type FollowerTemplateProps = {
  userId?: string
}

export default function FollowerTemplate({ userId }: FollowerTemplateProps) {
  const {
    data: followingPages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
    isError,
  } = useGetFollowers({
    params: {
      userId: userId,
      limit: 10,
    },
    pageParam: 1,
    enabled: !!userId,
  })
  const observer = useRef<IntersectionObserver>()
  const unFollowUser = useUnFollowUser()
  const followUser = useFollowUser()
  const toast = useToast()

  const lastProfileElement = useCallback(
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

  const handleUnFollow = (id: string) => {
    unFollowUser.mutate(id, {
      onSuccess() {
        toast.addToast('success', 'Unfollow berhasil.')
        refetch()
      },
      onError() {
        toast.addToast('error', 'Unfollow gagal.')
      },
    })
  }

  const handleFollowUser = (id: string) => {
    followUser.mutate(id, {
      onSuccess() {
        toast.addToast('success', 'Unfollow berhasil.')
        refetch()
      },
      onError() {
        toast.addToast('error', 'Unfollow gagal.')
      },
    })
  }

  return (
    <Fragment>
      {isError && !isLoading && !followingPages && (
        <div>
          <NoDataCard text="Anda belum memfollow user." />
        </div>
      )}
      {followingPages !== undefined && followingPages.pages.length > 0 && (
        <div className="space-y-6">
          {followingPages.pages.map((page, pageIndex) => {
            if (page.length === 0 && pageIndex === 0) {
              return (
                <div key={pageIndex}>
                  <NoDataCard text="Anda belum memfollow user." />
                </div>
              )
            }
            return (
              page.length > 0 &&
              page.map((profile, profileIndex) => {
                if (
                  followingPages.pages.length === pageIndex + 1 &&
                  page.length === profileIndex + 1
                ) {
                  return (
                    <div
                      key={`${pageIndex}-${profileIndex}`}
                      ref={lastProfileElement}
                    >
                      <ProfileUserCard
                        profilePhoto={profile.photos}
                        name={profile.fullName}
                        onActiveActionClick={() => handleUnFollow(profile.id)}
                        onInactiveActionClick={() =>
                          handleFollowUser(profile.id)
                        }
                        isActive={profile.following}
                      />
                    </div>
                  )
                }

                return (
                  <div key={`${pageIndex}-${profileIndex}`}>
                    <ProfileUserCard
                      profilePhoto={profile.photos}
                      name={profile.fullName}
                      onActiveActionClick={() => handleUnFollow(profile.id)}
                      onInactiveActionClick={() => handleFollowUser(profile.id)}
                      isActive={profile.following}
                    />
                  </div>
                )
              })
            )
          })}
        </div>
      )}
    </Fragment>
  )
}
