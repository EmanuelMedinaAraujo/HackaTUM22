import { useSelector } from "react-redux"
import { RootState } from "../state/store"

export default function ProgressBar() {
    const progress = useSelector((state : RootState) => state.quizReducer.progress)

    return (
        //A custom progress bar that shows the progress of the quiz
        <div className="bg-gray-200 relative h-5">
            <div className="bg-blue-500 absolute top-0 left-0 h-full" style={{ width: `${10}%` }}></div>
        </div>
    )
}