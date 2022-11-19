import { configureStore } from '@reduxjs/toolkit'
import quizReducer from './slices/quizSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    quizReducer
  },
})

export const useAppDispatch = () => useDispatch<AppDispatch>()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch