import Confetti from "react-confetti"
import { useSelector } from "react-redux";
import { useAppDispatch } from "../state/store";
import { RootState } from "../state/store";

interface Props {
    
}


export default function MovieResult(props: Props) {
    const currentMovies = useSelector((state : RootState) => state.quizReducer.currentMovies)
    const dispatch = useAppDispatch();

    //The movieUrl is the one that is not null in the currentMovies array
    let movieUrl = currentMovies.filter((movie) => movie !== null)[0]?.thumbnail;

    return (
        <div className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <p className="text-center text-4xl py-10 text-white">Unsere Empfehlung für Dich</p>
            <div className="absolute top-1/2 transform -translate-y-1/2">
            <img className="rounded-box p-2 " src={movieUrl} />
            </div>
            <Confetti/>
        </div>
    )
}