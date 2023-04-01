import Link from '@/components/atoms/Link'
import { BookCategoryDataModel } from '@/interfaces/book'
import React from 'react'

interface CategoryButtonProps {
  category: BookCategoryDataModel
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  category: { id, name },
}) => {
  return (
    <Link
      to={`/story/search?category=${id}`}
      className="capitalize font-gotham font-light text-gold-100 text-base leading-4 py-[10px] px-3 border border-gold-200 rounded-[20px] whitespace-nowrap"
    >
      {name}
    </Link>
  )
}

export default CategoryButton
