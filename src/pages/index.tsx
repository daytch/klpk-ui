import React from 'react'
import Head from 'next/head'
import { dehydrate } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import HomepageTemplate from '@/components/templates/homepage'
import { APP_NAME } from '@/utils/constants'
import { useGetCategories } from '@/services/category/query'
import { queryClient } from '@/utils/react-query'
import {
  useGetBestSellerBooks,
  useGetBooks,
  useGetTopWriters,
} from '@/services/book/query'
import { getBanners } from '@/services/banner/api'
import { useGetBanners } from '@/services/banner/query'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  await queryClient.prefetchQuery({
    queryKey: ['get-banners'],
    queryFn: () => getBanners(),
  })
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const Homepage = () => {
  const { data: categories } = useGetCategories()
  const { data: dailyBestSeller } = useGetBestSellerBooks('daily', true, 10)
  const { data: monthlyBestSeller } = useGetBestSellerBooks('monthly', true, 10)
  const { data: completedBooks } = useGetBooks(
    { limit: 10, completed: true },
    true
  )
  const { data: topWriters } = useGetTopWriters()
  const { data: banners } = useGetBanners()

  return (
    <>
      <Head>
        <title>{`${APP_NAME} | Homepage`}</title>
      </Head>
      <HomepageTemplate
        categories={categories ?? []}
        todayBestSellers={dailyBestSeller ?? []}
        monthlyBestSellers={monthlyBestSeller ?? []}
        completedStories={completedBooks ?? []}
        topWriters={topWriters ?? []}
        banners={banners ?? []}
      />
    </>
  )
}

export default Homepage
