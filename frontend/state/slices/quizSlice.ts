import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { CurrentState } from '../enums'
import { QuizRequest } from '../../models/quiz';
import { Movie, parseMovies, parseMovie } from '../../models/movie';
import { Filters, defaultFilters } from '../../models/filters';
import { RootState } from '../store';

//Interfaces

export enum CurrentPage {
  START,
  FILTERS,
  MOVIES,
  RESULTS,
}

export enum DetailsModal {
  NONE,
  BOTTOM,
  TOP
}

interface QuizState {
  currentState: CurrentState;
  currentPage: CurrentPage;
  quizeRequest: QuizRequest;
  currentMovies: [Movie | null, Movie | null];
  defaultFilters: Array<Filters>;
  progress: number;
  detailsModal: DetailsModal;
}

//Inital State
export const initialState: QuizState = {
  currentState: CurrentState.initial,
  currentPage: CurrentPage.START,
  quizeRequest: {
    config: {
      "showOnlySerie": false,
      "price": ["15"],
    },
    movies: [],
    currentMovieId: ''
  },
  currentMovies: [null, null],
  defaultFilters: defaultFilters,
  progress: 0,
  detailsModal: DetailsModal.NONE
}

//Async Thunks
export const getNextMovie = createAsyncThunk(
  'quiz/getNextMovie',
  async (pastMovie: string, thunkApi) => {
    const state: RootState = await thunkApi.getState() as RootState;
    let quizeRequest = state.quizReducer.quizeRequest;
    let response = await getMovie(quizeRequest);
    while (state.quizReducer.quizeRequest.movies.includes(response.title) || (response.title === state.quizReducer.currentMovies[0]?.title || response.title === state.quizReducer.currentMovies[1]?.title)) {
      response = await getMovie(quizeRequest)
    }
    return response;
  }
)

//Async Thunks
export const getFirst = createAsyncThunk(
  'quiz/getFirst',
  async (_, thunkApi) => {
    const state: RootState = await thunkApi.getState() as RootState;
    let quizeRequst = state.quizReducer.quizeRequest;
    console.log(state)
    console.log("State ", JSON.stringify(quizeRequst))
    let response = await getMovies(quizeRequst);
    while (response[0].title === response[1].title) {
      response =  await getMovies(quizeRequst);
    }
    return response;
  }
)

export async function getMovies(quiz : QuizRequest) {
  return await fetch('http://localhost:8000/first/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quiz),
  }).then((res) => res.json()).then((data) => parseMovies(data))
}

export async function getMovie(quiz : QuizRequest) {
  return await fetch('http://localhost:8000/next/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quiz),
  }).then((res) => res.json()).then((data) => parseMovie(data))
}

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
      console.log("Addin filter ", action.payload)
      state.quizeRequest.config[action.payload.key] = action.payload.value;
    },
    setDetailsModal: (state, action) => {
      state.detailsModal = action.payload;
    },
    updateProgress: (state) => {
      state.progress = state.progress + 1;
    },
    resetProgress: (state, action) => {
      state.progress = state.progress + 1;
      state.currentPage = CurrentPage.MOVIES
    }
  },
  extraReducers: (builder) => {
    //getNextMovie
    builder.addCase(getNextMovie.pending, (state, action) => {
      state.currentState = CurrentState.loading
    })
    builder.addCase(getNextMovie.fulfilled, (state, action) => {
      state.currentState = CurrentState.fulfilled
      state.progress = state.progress + 1;
      if (state.progress + 1 === 5) {
        state.currentPage = CurrentPage.RESULTS;
        if (state.currentMovies[0]?.title === action.meta.arg) {
          state.currentMovies[0] = null;
        } else {
          state.currentMovies[1] = null;
        }
      } else {
        //Replace the movie that id is in the argument
        if (state.currentMovies[0]?.title === action.meta.arg) {
          state.quizeRequest = {
            ...state.quizeRequest,
            movies: [...state.quizeRequest.movies, state.currentMovies[0].title]
          }
          state.currentMovies[0] = action.payload;
        } else {
          if(state.currentMovies[1]) {
            state.quizeRequest = {
              ...state.quizeRequest,
              movies: [...state.quizeRequest.movies, state.currentMovies[1].title]
            }
          }
          state.currentMovies[1] = action.payload;
        }
        console.log(action.payload)
        console.log(state.quizeRequest)
      }
    })
    builder.addCase(getNextMovie.rejected, (state, action) => {
      state.currentState = CurrentState.error
    })

    builder.addCase(getFirst.pending, (state, action) => {
      state.currentState = CurrentState.loading
    })
    builder.addCase(getFirst.fulfilled, (state, action) => {
      state.currentState = CurrentState.fulfilled
      console.log("Server Response ", action.payload)
      state.currentMovies = action.payload
    })
    builder.addCase(getFirst.rejected, (state, action) => {
      state.currentState = CurrentState.error
    })

  }
})

export const { reset, changePage, addFilter, setDetailsModal, updateProgress } = quizeSlice.actions

export default quizeSlice.reducer