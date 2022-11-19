import dynamic from "next/dynamic"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import MovieQuiz from "../components/MovieQuiz"
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

  return (
    <div className="h-screen">
      {currentPage == CurrentPage.MOVIES &&
        <CompareMovies />
      }
      {currentPage == CurrentPage.FILTERS &&
        <MovieQuiz questions={currentFilters[currentFilterStep]} nextStep={nextStep}/>
      }
    </div>
  )
}
