import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { CurrentState } from '../enums'
import { QuizRequest } from '../../models/quiz';
import { Movie } from '../../models/movie';
import { Filters, defaultFilters } from '../../models/filters';

//Interfaces

export enum CurrentPage {
    FILTERS,
    MOVIES,
}

interface QuizState {
  currentState: CurrentState;
  currentPage: CurrentPage;
  quizeRequest: QuizRequest;
  currentMovies: [Movie | null, Movie | null];
  defaultFilters: Array<Filters>;
  progress: number;
}

//Inital State
export const initialState: QuizState = {
  currentState: CurrentState.initial,
  currentPage: CurrentPage.FILTERS,
  quizeRequest: {
    config: {},
    movies: [],
    currentMovieId: ''
  },
  currentMovies: [null, null],
  defaultFilters: defaultFilters,
  progress: 0
}

//Async Thunks
export const getNextMovie = createAsyncThunk(
  'quiz/getNextMovie',
  async (_, thunkApi) => {

  }
)

//Slice
export const quizeSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    reset: (state) => {
      state.quizeRequest = {
        config: {},
        movies: [],
        currentMovieId: ''
      };
    },
    //Define action type as string
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
    addFilter: (state, action) => {
      state.quizeRequest.config[action.payload.key] = action.payload.value;
    }
  },
  extraReducers: (builder) => {
    //getCurrentUser
    builder.addCase(getNextMovie.pending, (state, action) => {
      state.currentState = CurrentState.loading
    })
    builder.addCase(getNextMovie.fulfilled, (state, action) => {
      state.currentState = CurrentState.fulfilled
    })
    builder.addCase(getNextMovie.rejected, (state, action) => {
      state.currentState = CurrentState.error
    })

  }
})

export const { reset, changePage, addFilter } = quizeSlice.actions

export default quizeSlice.reducer