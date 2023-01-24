import React from 'react'
import GeneralLayout from '@/components/layouts/general'
import {
  BookCategoryDataModel,
  BookDataModel,
  TestimonyDataModel,
} from '@/interfaces/book'
import BookSlider from '@/components/organisms/BookSlider'
import CategoryButton from '@/components/molecules/CategoryButton'
import BannerSlider from '@/components/organisms/BannerSlider'
import TestimonySlider from '@/components/organisms/TestimonySlider'

interface IHomepageTemplate {
  categories?: BookCategoryDataModel[]
  todayBestSellers?: BookDataModel[]
  monthlyBestSellers?: BookDataModel[]
  completedStories?: BookDataModel[]
}

const testimonies: TestimonyDataModel[] = [
  {
    photo: 'https://placeimg.com/90/90/any',
    name: 'Patrick Kellan',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quas necessitatibus modi cum labore dignissimos fuga quidem perspiciatis accusantium! Optio nulla dignissimos eaque voluptates consequuntur delectus vitae?',
  },
  {
    photo: 'https://placeimg.com/90/90/any',
    name: 'Patrick Kellan',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quas necessitatibus modi cum labore dignissimos fuga quidem perspiciatis accusantium! Optio nulla dignissimos eaque voluptates consequuntur delectus vitae?',
  },
  {
    photo: 'https://placeimg.com/90/90/any',
    name: 'Patrick Kellan',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quas necessitatibus modi cum labore dignissimos fuga quidem perspiciatis accusantium! Optio nulla dignissimos eaque voluptates consequuntur delectus vitae?',
  },
  {
    photo: 'https://placeimg.com/90/90/any',
    name: 'Patrick Kellan',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quas necessitatibus modi cum labore dignissimos fuga quidem perspiciatis accusantium! Optio nulla dignissimos eaque voluptates consequuntur delectus vitae?',
  },
  {
    photo: 'https://placeimg.com/90/90/any',
    name: 'Patrick Kellan',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quas necessitatibus modi cum labore dignissimos fuga quidem perspiciatis accusantium! Optio nulla dignissimos eaque voluptates consequuntur delectus vitae?',
  },
]

const HomepageTemplate: React.FC<IHomepageTemplate> = ({
  categories = [],
  todayBestSellers = [],
  monthlyBestSellers = [],
  completedStories = [],
}) => {
  return (
    <GeneralLayout>
      <section className="pt-14 pb-2">
        <div className="container">
          <BannerSlider
            banners={[
              '/assets/images/banner-01.jpg',
              'https://placeimg.com/959/224/any',
            ]}
          />
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
            title="Today Best Seller"
            subTitle="Based on Favorite Choose"
            isBestSeller
            books={todayBestSellers}
          />
        </div>
      </section>
      <section>
        <div className="container border-b border-gold-300 pt-11 pb-14">
          <TestimonySlider testimonies={testimonies} />
        </div>
      </section>
      <section className="">
        <div className="container border-b border-gold-300 pt-11 pb-14">
          <BookSlider
            title="Monthly Best Sellers"
            subTitle="Based on Favorite Choose"
            books={monthlyBestSellers}
          />
        </div>
      </section>
      <section className="">
        <div className="container !px-4 pt-11 pb-14">
          <BookSlider
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
