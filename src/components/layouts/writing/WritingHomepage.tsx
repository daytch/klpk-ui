import { joinClass } from '@/utils/common'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import GeneralLayout from '../general'

interface WritingLayoutProps {
  children: React.ReactNode
}

const activeButtonClassName = 'bg-dark-100 text-gold-200 '
const defaultButtonClassName = 'bg-transparent text-kplkWhite'

const WritingLayout: React.FC<WritingLayoutProps> = ({ children }) => {
  const { query, push, pathname } = useRouter()
  const isDraft = useMemo(
    () => query?.writingTab === 'draft',
    [query?.writingTab]
  )
  const isPublish = useMemo(
    () => query?.writingTab === 'publish' || !query?.writingTab,
    [query?.writingTab]
  )

  const handleClickTab = (tab: 'draft' | 'publish') => {
    push({ pathname, query: { writingTab: tab } })
  }

  return (
    <GeneralLayout headerMode="write">
      <div className="container pt-10 pb-20">
        <div className="w-full bg-dark-300 rounded-xl overflow-hidden px-6 py-4 min-h-[604px]">
          <div className="flex justify-center space-x-8 mb-2">
            <button
              type="button"
              onClick={() => handleClickTab('publish')}
              className={joinClass(
                'py-2 px-3 min-w-[132px] text-xs rounded-lg',
                isPublish ? activeButtonClassName : defaultButtonClassName
              )}
            >
              Diterbitkan
            </button>
            <button
              type="button"
              onClick={() => handleClickTab('draft')}
              className={joinClass(
                'py-2 px-3 min-w-[132px] text-xs rounded-lg',
                isDraft ? activeButtonClassName : defaultButtonClassName
              )}
            >
              Draft
            </button>
          </div>
          <hr className="border-gold-300 mb-7" />
          {children}
        </div>
      </div>
    </GeneralLayout>
  )
}

export default WritingLayout
