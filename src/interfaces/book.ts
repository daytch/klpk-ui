export interface BookCategoryDataModel {
  id: string
  name: string
}

export interface BookDataModel {
  id: string
  title: string
  synopsis: string
  cover: string
  status: 'draft' | 'pending' | 'live'
  completed: boolean
  category: BookCategoryDataModel
}

export interface BookChapterDataModel {
  id: string
  name: string
  content: string
  isLocked?: boolean
}

export interface DetailBookDataModel extends BookDataModel {
  chapters: BookChapterDataModel[]
}

export interface PayloadBook {
  title: string
  categoryId: string
  synopsis: string
}

export interface TestimonyDataModel {
  photo: string
  name: string
  description: string
}

export interface PayloadChapter {
  name: string
  content: string
}

export type GetMyBookParams = {
  status?: string
  limit?: number
  page?: number
  userId?: string
  search?: string
}
