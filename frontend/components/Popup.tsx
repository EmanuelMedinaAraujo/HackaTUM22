import { useState } from "react";
import { Movie } from "../models/movie"

interface Props {
    movie: Movie,
    closePopup: () => void
}

export default function Popup(props: Props) {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <div className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="absolute bottom-0 left-0 w-full h-full bg-white p-2 px-4">
                <div className="absolute top-0 right-0 m-4" onClick={props.closePopup}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div>
                    <p className="text-4xl text-center mt-10 mb-5">{props.movie.title}</p>
                    <div className="flex flex-wrap gap-2">
                        <p className="bg-purple-200 rounded-box px-2 py-1 w-fit my-2">{props.movie.genre}</p>
                        <p className=" bg-blue-200 rounded-box px-2 py-1 w-fit my-2">{props.movie.year}</p>
                    </div>
                    <p className="mt-2">{props.movie.description.substring(0, !showDetails ? 80 : undefined)}... <a onClick={() => setShowDetails(!showDetails)}><u>{!showDetails ? "mehr" : ""}</u></a></p>
                </div>
            </div>
        </div >
    )
}