import { useSelector } from "react-redux";
import { Movie } from "../models/movie";
import MovieCardBottom from "./MovieCardBottom";
import MovieCardTop from "./MovieCardTop";
import ProgressBar from "./ProgressBar";
import { RootState } from "../state/store";

interface Props {
    newMovie: Movie;
    movie2: Movie;
}

export default function CompareMovies() {
    const currentMovies = useSelector((state: RootState) => state.quizReducer.currentMovies);
    //Get window size
    const windowHeight = window.innerHeight;

    return (
        //the Movie card should at a maxiumum be 50% of the screen. The movies are stacked vertically
        <div className="relative md:grid md:grid-cols-2 md:gap-8 md:items-center md:justify-center md:h-screen h-screen">
            {currentMovies[0] != null && currentMovies[1] != null &&
                <>
                    <div className="md:justify-self-end" style={{ height: windowHeight / 2 - 15, width: "auto" }}>
                        <MovieCardTop movie={currentMovies[0]} />
                    </div>
                    <div className="md:justify-self-start" style={{ height: windowHeight / 2 - 15 }}>
                        <MovieCardBottom movie={currentMovies[1]} />
                    </div>
                </>
            }
            <div className="absolute bottom-0 left-0 w-full">
                <ProgressBar />
            </div>
        </div>
    )
}

/*
<div className="md:justify-self-start" style={{ height: windowHeight / 2 - 15 }}>
                <MovieCard movie={{
                    id: 123123123,
                    title: "1000 Dinge",
                    year: 1994,
                    genre: "Drama",
                    thumbnail: "https://www.streampicker.de/files/images/202211/0/spirited,1000717_poster_200.jpg",
                    description: "Paul (Florian David Fitz) hat eine neue App entwickelt, die jedem Smartphone eine lernfähige Stimme verleiht. NANA ist in der Lage, jeden Nutzer auf emotionale und humorvolle Weise anzusprechen. Während Paul vor allem das Glück seiner potenziellen Kunden im Auge hat, hofft sein Partner Toni (Matthias Schweighöfer) auf das schnelle Geld. Er hat Pauls Handy so manipuliert, dass NANA seine ausgeprägte Kaufsucht noch verschlimmert. Nachdem die beiden ihre Erfindung an einen US-Internetmilliardär verkauft haben, kommt es zum Streit: Paul will sich nicht länger als Konsumschlampe beschimpfen lassen und lässt sich auf eine fatale Wette "
                }} />
            </div>
            */