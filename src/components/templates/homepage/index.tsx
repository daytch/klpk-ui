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
  recommendedStory?: PublicBookDataModel[]
  shortStory?: PublicBookDataModel[]
  todayBestSellers?: PublicBookDataModel[]
  monthlyBestSellers?: PublicBookDataModel[]
  completedStories?: PublicBookDataModel[]
  topWriters?: TopWriterDataModel[]
  banners?: BannerDataModel[]
}

const HomepageTemplate: React.FC<IHomepageTemplate> = ({
  categories = [],
  recommendedStory=[],
  shortStory = [],
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
          {/* <div
            className="bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md mb-5"
            role="alert"
          >
            <div className="flex">
              <div className="py-1">
                <svg
                  className="fill-current h-6 w-6 text-blue-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">Info Penting !!!</p>
                <p className="text-sm">
                  Untuk sementara kamu bisa download KLPK Apps dari{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://drive.google.com/file/d/137sM0OFYGLVyOEYExMh8fW9lpGRsqvxn/view?usp=sharing"
                    className="font-bold underline"
                  >
                    sini
                  </a>{' '}
                  ya. KLPK Apps akan segera kembali ke PlayStore.
                </p>
              </div>
            </div>
          </div> */}
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
            moreLink="/story/recommended-story"
            title="Recommended story"
            subTitle=""
           // isBestSeller
            books={recommendedStory}
          />
        </div>
      </section>

      <section className="">
        <div className="container border-b border-gold-300 pt-11 pb-14">
          <BookSlider
            moreLink="/story/short-story"
            title="Short story"
            subTitle=""
            // isBestSeller
            books={shortStory}
          />
        </div>
      </section>

      <section className="">
        <div className="container border-b border-gold-300 pt-11 pb-14">
          <BookSlider
            moreLink="/story/daily-best-seller"
            title="Today Best Sellers"
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

      <section className="">
        <div className="container !px-4 pt-11 pb-14">
          <BookSlider
            moreLink="/story/search?completed=true"
            title="Completed Story"
            subTitle="Buku yang bisa anda beli"
            books={completedStories}
            isCompletedBooks
          />
        </div>
      </section>
      
      <section>
        <div className="container border-b border-gold-300 pt-11 pb-14">
          <TestimonySlider topWriters={topWriters} />
        </div>
      </section>

    </GeneralLayout>
  )
}

export default HomepageTemplate
