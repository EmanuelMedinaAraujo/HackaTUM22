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
        //Add blured background image
        <div className="relative flex justify-center items-center h-full">
            <div className="relative z-20">
                <img className="rounded-box" style={{ height: window.innerHeight / 2 - 40, display: "block", objectFit: "cover" }} src={props.movie.thumbnail} alt="Movie Thumbnail" />
                <div className="absolute left-1/2 -bottom-5 transform -translate-x-1/2 bg-white rounded-full flex justify-center items-center p-2 px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" className="w-8 h-8 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className="absolute top-0 left-0 bg-white rounded-tl-box rounded-br-box flex justify-center items-center p-2 px-2">
                <svg onClick={toggleDetails} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                </div>
            </div>
            {showDetails &&
                <Popup movie={props.movie} closePopup={toggleDetails} />
            }
            <img className="rounded-box absolute top-0 left-0 w-full h-full"
                style={{ height: window.innerHeight / 2, display: "block", objectFit: "cover",  filter: "blur(10px)" }} 
                src={props.movie.thumbnail} alt="Movie Thumbnail" />
        </div>
    )
}