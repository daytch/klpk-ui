import { Chapter } from '@/interfaces/chapter'
import { create } from 'zustand'

interface State {
  chapters: Chapter[]
  addChapter: (chapter: Chapter[]) => void
  setEmptyChapter: () => void
}

// Create your store, which includes both state and (optionally) actions
export const useChapter = create<State>((set) => ({
  chapters: [],
  addChapter: (chapter) => {
    set(() => ({
      chapters: chapter,
    }))
  },
  setEmptyChapter: () => {
    set({ chapters: [] })
  },
}))
