import { configureStore } from '@reduxjs/toolkit'
import BookReducer from "./features/SliceBook"

export const store = configureStore({
  reducer: {
    books : BookReducer
  },
})