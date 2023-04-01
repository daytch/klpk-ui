import React from 'react'
import GeneralLayout from '@/components/layouts/general'
import { BookCategoryDataModel, PublicBookDataModel } from '@/interfaces/book'
import BookSlider from '@/components/organisms/BookSlider'
import CategoryButton from '@/components/molecules/CategoryButton'
import BannerSlider from '@/components/organisms/BannerSlider'
import TestimonySlider from '@/components/organisms/TestimonySlider'
import { TopWriterDataModel } from '@/interfaces/writer'
import { BannerDataModel } from '@/interfaces/banner'

interface IHomepageTemplate {
  categories?: BookCategoryDataModel[]
  todayBestSellers?: PublicBookDataModel[]
  monthlyBestSellers?: PublicBookDataModel[]
  completedStories?: PublicBookDataModel[]
  topWriters?: TopWriterDataModel[]
  banners?: BannerDataModel[]
}

const HomepageTemplate: React.FC<IHomepageTemplate> = ({
  categories = [],
  todayBestSellers = [],
  monthlyBestSellers = [],
  completedStories = [],
  topWriters = [],
  banners = [],
}) => {
  return (
    <GeneralLayout>
      <section className="pt-14 pb-2">
        <div className="container">
          <BannerSlider banners={banners.map((banner) => banner.url)} />
        </div>
      </section>

      <section className="">
        <div className="container border-b border-gold-300 pt-11">
          <div className="flex flex-nowrap overflow-auto space-x-3 scrollbar pb-2">
            {categories.map((category) => (
              <CategoryButton key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="">
        <div className="container border-b border-gold-300 pt-11 pb-14">
          <BookSlider
            moreLink="/story/daily-best-seller"
            title="Today Best Seller"
            subTitle="Based on Favorite Choose"
            isBestSeller
            books={todayBestSellers}
          />
        </div>
      </section>

      <section className="">
        <div className="container border-b border-gold-300 pt-11 pb-14">
          <BookSlider
            moreLink="/story/monthly-best-seller"
            title="Monthly Best Sellers"
            subTitle="Based on Favorite Choose"
            books={monthlyBestSellers}
          />
        </div>
      </section>

      <section>
        <div className="container border-b border-gold-300 pt-11 pb-14">
          <TestimonySlider topWriters={topWriters} />
        </div>
      </section>

      <section className="">
        <div className="container !px-4 pt-11 pb-14">
          <BookSlider
            moreLink="/story/search?completed=true"
            title="Completed Story"
            subTitle="Buku yang bisa anda beli"
            books={completedStories}
          />
        </div>
      </section>
    </GeneralLayout>
  )
}

export default HomepageTemplate
