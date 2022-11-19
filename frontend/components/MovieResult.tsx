import { Movie } from "../models/movie"

interface Props {
    movie: Movie
}

export default function MovieResult(props : Props) {
    return (
        <div>
            <p className="text-4xl">Unsere Empfehlung für Dich</p>
            <p className="text-2xl">{props.movie.title}</p> 
        </div>
    )
}