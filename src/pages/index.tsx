import React from 'react'
import Head from 'next/head'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import HomepageTemplate from '@/components/templates/homepage'
import { APP_NAME } from '@/utils/constants'
import { getCategories } from '@/services/category/api'
import { useGetCategories } from '@/services/category/query'
import {
  completedBestSellerDummy,
  monthlyBestSellerDummy,
  todayBestSellerDummy,
} from '@/dummy/homepage'

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
        todayBestSellers={todayBestSellerDummy}
        monthlyBestSellers={monthlyBestSellerDummy}
        completedStories={completedBestSellerDummy}
      />
    </>
  )
}

export default Homepage
