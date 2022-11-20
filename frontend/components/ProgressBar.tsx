import { useSelector } from "react-redux"
import { RootState } from "../state/store"

export default function ProgressBar() {
    const progress = useSelector((state : RootState) => state.quizReducer.progress)

    return (
        //A custom progress bar that shows the progress of the quiz
        <div className="bg-purple-200 relative h-5">
            <div className=" bg-purple-800 absolute top-0 left-0 h-full" style={{ width: `${progress *20}%` }}></div>
        </div>
    )
}