import { Movie } from "../models/movie";
import MovieCard from "./MovieCard";
import ProgressBar from "./ProgressBar";

interface Props {
    newMovie: Movie;
    movie2: Movie;
}

export default function CompareMovies() {
    //Get window size
    const windowHeight = window.innerHeight;

    return (
        //the Movie card should at a maxiumum be 50% of the screen. The movies are stacked vertically
        <div className="relative md:grid md:grid-cols-2 md:gap-8 md:items-center md:justify-center md:h-screen h-screen">
            <div className="md:justify-self-end" style={{ height: windowHeight / 2 - 15, width: "auto" }}>
                <MovieCard movie={{
                    id: 123123123,
                    title: "1000 Dinge",
                    year: 1994,
                    genre: "Drama",
                    thumbnail: "https://www.streampicker.de/files/images/202209/0/100-dinge,971428_poster_200.jpg",
                    description: "Paul (Florian David Fitz) hat eine neue App entwickelt, die jedem Smartphone eine lernfähige Stimme verleiht. NANA ist in der Lage, jeden Nutzer auf emotionale und humorvolle Weise anzusprechen. Während Paul vor allem das Glück seiner potenziellen Kunden im Auge hat, hofft sein Partner Toni (Matthias Schweighöfer) auf das schnelle Geld. Er hat Pauls Handy so manipuliert, dass NANA seine ausgeprägte Kaufsucht noch verschlimmert. Nachdem die beiden ihre Erfindung an einen US-Internetmilliardär verkauft haben, kommt es zum Streit: Paul will sich nicht länger als Konsumschlampe beschimpfen lassen und lässt sich auf eine fatale Wette "
                }} />
            </div>
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
            <div className="absolute bottom-0 left-0 w-full">
                <ProgressBar />
            </div>
        </div>
    )
}