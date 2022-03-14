import { configureStore } from '@reduxjs/toolkit'
import todoSlicess from './todoSlice'

export const store = configureStore({
  reducer: {
      todos:todoSlicess
  }
})