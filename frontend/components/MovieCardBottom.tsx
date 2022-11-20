import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Movie } from "../models/movie";
import { DetailsModal, getNextMovie, setDetailsModal, updateProgress } from "../state/slices/quizSlice";
import { RootState, useAppDispatch } from "../state/store";

interface Props {
    movie: Movie;
}

export default function MovieCardTop(props: Props) {
    const [showDetails, setShowDetails] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const currentDetailsModal = useSelector((state: RootState) => state.quizReducer.detailsModal);
    const dispatch = useAppDispatch();

    const changeShowModal = () => {
        setShowModal(!showModal);
        if (currentDetailsModal == DetailsModal.NONE) {
            dispatch(setDetailsModal(DetailsModal.BOTTOM));
        } else {
            dispatch(setDetailsModal(DetailsModal.NONE));
        }
    }

    const style = currentDetailsModal != DetailsModal.TOP ? { opacity: 1, transition: "opacity 2s ease-in-out" } : { opacity: 0, transition: "opacity 0.2s ease-in-out" };

    const removeMovie = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        dispatch(getNextMovie(props.movie.title));
    }

    return (
        //Add blured background image
        <div className="relative">
            <div className={`z-40 card ${showModal ? "is-flipped-bottom" : ""} `} onClick={changeShowModal}>
                <div className="card-face card-face-front flex justify-center">
                    <div className="relative mt-5 h-fit" style={style}>
                        <img className="rounded-box" style={{ height: window.innerHeight / 2 - 50, display: "block", objectFit: "cover" }} src={props.movie.thumbnail} alt="Movie Thumbnail" />
                        <div className="bg-white rounded-tl-box rounded-br-box p-1 absolute top-0 left-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                        </div>
                        <div className="bg-white rounded-full p-1 absolute -bottom-4 left-1/2 transform -translate-x-1/2" onClick={removeMovie}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="w-8 h-8 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className={`card-face card-face-back`}>
                    <div className="bg-white p-10 m-10 rounded-box" style={{ height: window.innerHeight / 2 - 50, display: "block", objectFit: "cover" }}>
                        <p className="text-4xl text-center mt-10 mb-5">{props.movie.title}</p>
                        <div className="flex flex-wrap gap-2">
                            {props.movie.genres.map((genre, index) => {
                                return (
                                    <p className="bg-purple-200 rounded-box px-2 py-1 w-fit my-2">{genre}</p>
                                )
                            })}
                            <p className=" bg-blue-200 rounded-box px-2 py-1 w-fit my-2">{props.movie.year}</p>
                        </div>
                        <p className="mt-2">{props.movie.description.substring(0, 80)}... <a onClick={() => setShowDetails(showDetails)}><u>{showDetails ? "mehr" : ""}</u></a></p>
                    </div>
                </div>
            </div>
            <img className="rounded-box absolute top-0 left-0 w-full h-full"
                style={{ height: window.innerHeight / 2, display: "block", objectFit: "cover", filter: "blur(10px)" }}
                src={props.movie.thumbnail} alt="Movie Thumbnail" />
        </div>
    )
}