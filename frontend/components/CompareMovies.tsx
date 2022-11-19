import { Movie } from "../models/movie";
import MovieCard from "./MovieCard";

interface Props {
    newMovie: Movie;
    movie2: Movie;
}

export default function CompareMovies() {
    //Get window size
    const windowHeight = window.innerHeight;

    return (
        //the Movie card should at a maxiumum be 50% of the screen. The movies are stacked vertically
        <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center md:justify-center md:h-screen">
            <div className="md:justify-self-end" style={{ height: windowHeight / 2, width: "auto" }}>
                <MovieCard movie={{
                    id: 123123123,
                    title: "1000 Dinge",
                    year: 1994,
                    genre: "Drama",
                    thumbnail: "https://images-ext-2.discordapp.net/external/F6MO7PqDtwnMTojW2FW22-F6_qcet6FsFxsWOVGuJTs/https/www.vodster.de/db/w500/5tJQB1c9AzsQoOy3WW5NQcJCQ9X.jpg",
                    description: "Paul (Florian David Fitz) hat eine neue App entwickelt, die jedem Smartphone eine lernfähige Stimme verleiht. NANA ist in der Lage, jeden Nutzer auf emotionale und humorvolle Weise anzusprechen. Während Paul vor allem das Glück seiner potenziellen Kunden im Auge hat, hofft sein Partner Toni (Matthias Schweighöfer) auf das schnelle Geld. Er hat Pauls Handy so manipuliert, dass NANA seine ausgeprägte Kaufsucht noch verschlimmert. Nachdem die beiden ihre Erfindung an einen US-Internetmilliardär verkauft haben, kommt es zum Streit: Paul will sich nicht länger als Konsumschlampe beschimpfen lassen und lässt sich auf eine fatale Wette "
                }} />
            </div>
            <div className="md:justify-self-start" style={{ height: windowHeight / 2 }}>
                <MovieCard movie={{
                    id: 123123123,
                    title: "1000 Dinge",
                    year: 1994,
                    genre: "Drama",
                    thumbnail: "https://images-ext-2.discordapp.net/external/F6MO7PqDtwnMTojW2FW22-F6_qcet6FsFxsWOVGuJTs/https/www.vodster.de/db/w500/5tJQB1c9AzsQoOy3WW5NQcJCQ9X.jpg",
                    description: "Paul (Florian David Fitz) hat eine neue App entwickelt, die jedem Smartphone eine lernfähige Stimme verleiht. NANA ist in der Lage, jeden Nutzer auf emotionale und humorvolle Weise anzusprechen. Während Paul vor allem das Glück seiner potenziellen Kunden im Auge hat, hofft sein Partner Toni (Matthias Schweighöfer) auf das schnelle Geld. Er hat Pauls Handy so manipuliert, dass NANA seine ausgeprägte Kaufsucht noch verschlimmert. Nachdem die beiden ihre Erfindung an einen US-Internetmilliardär verkauft haben, kommt es zum Streit: Paul will sich nicht länger als Konsumschlampe beschimpfen lassen und lässt sich auf eine fatale Wette "
                }} />
            </div>
        </div>
    )
}