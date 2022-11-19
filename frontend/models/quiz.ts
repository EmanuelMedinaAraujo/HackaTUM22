export interface QuizRequest {
    config: Filters;
    movies: Array<ViewedMovies>;
    currentMovieId: string;
}

export interface Filters {
    [key : string]: Array<string>;
}

export interface ViewedMovies {
    id: number;
    count: number;
}