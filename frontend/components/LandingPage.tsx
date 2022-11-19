import { useDispatch } from "react-redux"
import { changePage, CurrentPage } from "../state/slices/quizSlice"

export default function LandingPage() {
    const dispatch = useDispatch()

    const start = () => {
        dispatch(changePage(CurrentPage.FILTERS))
    }

    //Gradint background
    return (
        <div className="h-screen w-screen flex flex-col justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <p className="text-center text-5xl mt-12 text-white">Willkommen bei Streampicker</p>
            <div className="flex flex-col items-center justify-center">
                <img src="/party.png" className="w-full rounded-box p-2" /> 
            </div>
            <button className="btn md:btn-xl md:text-2xl" onClick={start}>Los geht's</button>
        </div>
    )
}