import { useState } from "react";
import { Movie } from "../models/movie";
import Modal from "./Modal";
import Popup from "./Popup";

interface Props {
    movie: Movie;
}

export default function MovieCard(props: Props) {
    const [showDetails, setShowDetails] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    }

    return (
        <div className="flex justify-center items-center h-full">
            <div className="relative">
                <img className="rounded-box" style={{ height: window.innerHeight / 2 - 20, display: "block", objectFit: "scale-down" }} src={props.movie.thumbnail} alt="Movie Thumbnail" />
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 bg-white rounded-t-lg flex justify-center items-center pt-2 pb-1 px-2">
                    <svg onClick={toggleDetails} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" className="w-8 h-8 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
            {showDetails &&
                <Popup movie={props.movie} closePopup={toggleDetails} />
            }
        </div>
    )
}