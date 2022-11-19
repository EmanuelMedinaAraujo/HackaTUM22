import { Movie } from "../models/movie"

interface Props {
    movie: Movie
}

export default function MovieResult(props : Movie) {
    return (
        <div>
            <p className="text-2xl">Unsere Empfehlung für Dich</p>
        </div>
    )
}