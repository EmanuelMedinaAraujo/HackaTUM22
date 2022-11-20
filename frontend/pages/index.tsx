import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import LandingPage from "../components/LandingPage"
import MovieQuiz from "../components/MovieQuiz"
import MovieResult from "../components/MovieResult"
import { addFilter, changePage, CurrentPage, getFirst } from "../state/slices/quizSlice"
import { RootState, useAppDispatch } from "../state/store"

const CompareMovies = dynamic(() => import("../components/CompareMovies"), { ssr: false })

export default function Home() {
  const currentPage = useSelector((state: RootState) => state.quizReducer.currentPage)
  const currentFilters = useSelector((state: RootState) => state.quizReducer.defaultFilters)
  const progress = useSelector((state: RootState) => state.quizReducer.progress)
  const [currentFilterStep, setCurrentFilterStep] = useState(0)
  const dispatch = useAppDispatch()

  const nextStep = async () => {
    if (currentFilterStep < currentFilters.length - 1) {
      setCurrentFilterStep(currentFilterStep + 1)
    } else {
      await dispatch(getFirst())
      dispatch(changePage(CurrentPage.MOVIES))
    }
  }

  return (
    <div className="h-screen">
      {currentPage === CurrentPage.START &&
        <LandingPage />
      }
      {currentPage == CurrentPage.MOVIES &&
        <CompareMovies />
      }
      {currentPage == CurrentPage.FILTERS &&
        <MovieQuiz questions={currentFilters[currentFilterStep]} nextStep={nextStep} />
      }
      {currentPage == CurrentPage.RESULTS &&
        <MovieResult />
      }
    </div>
  )
}
