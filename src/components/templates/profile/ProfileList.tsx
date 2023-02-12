import ProfileUserCard from '@/components/organisms/cards/ProfileUserCard'
import React from 'react'

const dummyUser = [
  {
    id: 1,
    image: 'https://picsum.photos/250',
    name: 'User 1',
    isActive: true,
  },
  {
    id: 2,
    image: 'https://picsum.photos/250',
    name: 'User 2',
    isActive: false,
  },
]

export default function ProfileListTemplate() {
  const handleActive = (id: number) => {
    console.log(id)
  }

  const handleInActive = (id: number) => {
    console.log(id)
  }

  return (
    <div className="space-y-6">
      {dummyUser.map((user, index) => (
        <ProfileUserCard
          key={index}
          image={user.image}
          name={user.name}
          isActive={user.isActive}
          onActiveActionClick={function (): void {
            handleActive(user.id)
          }}
          onInactiveActionClick={function (): void {
            handleInActive(user.id)
          }}
        />
      ))}
    </div>
  )
}
