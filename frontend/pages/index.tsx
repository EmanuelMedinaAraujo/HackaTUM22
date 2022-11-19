import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import LandingPage from "../components/LandingPage"
import MovieQuiz from "../components/MovieQuiz"
import MovieResult from "../components/MovieResult"
import { addFilter, changePage, CurrentPage } from "../state/slices/quizSlice"
import { RootState } from "../state/store"

const CompareMovies = dynamic(() => import("../components/CompareMovies"), { ssr: false })

export default function Home() {
  const currentPage = useSelector((state: RootState) => state.quizReducer.currentPage)
  const currentFilters = useSelector((state: RootState) => state.quizReducer.defaultFilters)
  const [currentFilterStep, setCurrentFilterStep] = useState(0)
  const dispatch = useDispatch()

  const nextStep = () => {
    if (currentFilterStep < currentFilters.length - 1) {
      setCurrentFilterStep(currentFilterStep + 1)
    } else {
      dispatch(changePage(CurrentPage.MOVIES))
    }
  }

  useEffect(() => {
    dispatch(changePage(CurrentPage.RESULTS))
  }, [])

  return (
    <div className="h-screen">
      {currentPage === CurrentPage.START && 
        <LandingPage/>
      }
      {currentPage == CurrentPage.MOVIES &&
        <CompareMovies />
      }
      {currentPage == CurrentPage.FILTERS &&
        <MovieQuiz questions={currentFilters[currentFilterStep]} nextStep={nextStep}/>
      }
      {currentPage == CurrentPage.RESULTS &&
       <MovieResult/>
      }
    </div>
  )
}
