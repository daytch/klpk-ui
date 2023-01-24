import React from 'react'
import Head from 'next/head'
import HomepageTemplate from '@/components/templates/homepage'
import { APP_NAME } from '@/utils/constants'
import { BookDataModel } from '@/interfaces/book'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { getCategories } from '@/services/category/api'
import { useGetCategories } from '@/services/category/query'

const datas: BookDataModel[] = [
  {
    id: '1',
    title: 'Noda',
    synopsis: 'test',
    cover: 'https://placeimg.com/138/189/any',
    status: 'Draft',
    isCompleted: false,
    category: {
      id: '1',
      name: 'test',
    },
  },
  {
    id: '2',
    title: 'Noda',
    synopsis: 'test',
    cover: 'https://placeimg.com/138/189/any',
    status: 'Draft',
    isCompleted: false,
    category: {
      id: '1',
      name: 'test',
    },
  },
  {
    id: '3',
    title: 'Noda',
    synopsis: 'test',
    cover: 'https://placeimg.com/138/189/any',
    status: 'Draft',
    isCompleted: false,
    category: {
      id: '1',
      name: 'test',
    },
  },
  {
    id: '4',
    title: 'Noda',
    synopsis: 'test',
    cover: 'https://placeimg.com/138/189/any',
    status: 'Draft',
    isCompleted: false,
    category: {
      id: '1',
      name: 'test',
    },
  },
  {
    id: '5',
    title: 'Noda',
    synopsis: 'test',
    cover: 'https://placeimg.com/138/189/any',
    status: 'Draft',
    isCompleted: false,
    category: {
      id: '1',
      name: 'test',
    },
  },
  {
    id: '6',
    title: 'Noda',
    synopsis: 'test',
    cover: 'https://placeimg.com/138/189/any',
    status: 'Draft',
    isCompleted: false,
    category: {
      id: '1',
      name: 'test',
    },
  },
  {
    id: '7',
    title: 'Noda',
    synopsis: 'test',
    cover: 'https://placeimg.com/138/189/any',
    status: 'Draft',
    isCompleted: false,
    category: {
      id: '1',
      name: 'test',
    },
  },
  {
    id: '8',
    title: 'Noda',
    synopsis: 'test',
    cover: 'https://placeimg.com/138/189/any',
    status: 'Draft',
    isCompleted: false,
    category: {
      id: '1',
      name: 'test',
    },
  },
]

export async function getServerSideProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['get-all-categories'], getCategories)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const Homepage = () => {
  const { data: categories } = useGetCategories()
  return (
    <>
      <Head>
        <title>{`${APP_NAME} | Homepage`}</title>
      </Head>
      <HomepageTemplate
        categories={categories ?? []}
        todayBestSellers={datas}
        monthlyBestSellers={datas}
        completedStories={datas}
      />
    </>
  )
}

export default Homapage
