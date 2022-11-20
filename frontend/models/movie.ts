export interface Movie {
    id: number;
    title: string;
    year: number;
    genres: Array<string>;
    thumbnail: string;
    description: string;
}

//parse Movies

export function parseMovies(data: any): [Movie, Movie] {
    return data.map((movie: any) => {
        return {
            id: movie.id,
            title: movie.title,
            year: movie.year,
            genres: movie.genres,
            thumbnail: movie.posters,
            description: "Paul (Florian David Fitz) hat eine neue App entwickelt, die jedem Smartphone eine lernfähige Stimme verleiht. NANA ist in der Lage, jeden Nutzer auf emotionale und humorvolle Weise anzusprechen. Während Paul vor allem das Glück seiner potenziellen Kunden im Auge hat, hofft sein Partner Toni (Matthias Schweighöfer) auf das schnelle Geld. Er hat Pauls Handy so manipuliert, dass NANA seine ausgeprägte Kaufsucht noch verschlimmert. Nachdem die beiden ihre Erfindung an einen US-Internetmilliardär verkauft haben, kommt es zum Streit: Paul will sich nicht länger als Konsumschlampe beschimpfen lassen und lässt sich auf eine fatale Wette"
        };
    });
}


export function parseMovie(data: any): Movie {
    return {
        id: data.id,
        title: data.title,
        year: data.year,
        genres: data.genres,
        thumbnail: data.posters,
        description: "Paul (Florian David Fitz) hat eine neue App entwickelt, die jedem Smartphone eine lernfähige Stimme verleiht. NANA ist in der Lage, jeden Nutzer auf emotionale und humorvolle Weise anzusprechen. Während Paul vor allem das Glück seiner potenziellen Kunden im Auge hat, hofft sein Partner Toni (Matthias Schweighöfer) auf das schnelle Geld. Er hat Pauls Handy so manipuliert, dass NANA seine ausgeprägte Kaufsucht noch verschlimmert. Nachdem die beiden ihre Erfindung an einen US-Internetmilliardär verkauft haben, kommt es zum Streit: Paul will sich nicht länger als Konsumschlampe beschimpfen lassen und lässt sich auf eine fatale Wette"
    };
}