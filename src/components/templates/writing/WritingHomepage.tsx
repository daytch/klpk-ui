import React from 'react'
import WritingLayout from '@/components/layouts/writing/WritingHomepage'
import { BookDataModel } from '@/interfaces/book'
import ProductCard from '@/components/molecules/ProductCard'

interface WritingHomepageTemplateProps {
  books: BookDataModel[]
}

const WritingHomepageTemplate: React.FC<WritingHomepageTemplateProps> = ({
  books,
}) => {
  return (
    <WritingLayout>
      {!books?.length && null}
      {!!books?.length && (
        <div className="grid gap-6 grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-[795px] mx-auto">
          {books.map((book, index) => (
            <ProductCard book={book} key={index} contentTypeView="writing" />
          ))}
        </div>
      )}
    </WritingLayout>
  )
}

export default WritingHomepageTemplate
