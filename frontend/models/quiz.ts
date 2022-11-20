export interface QuizRequest {
    config: Filters;
    movies: Array<string>;
    currentMovieId: string;
}

export interface Filters {
    [key : string]: Array<string | boolean> | boolean;
}

export interface ViewedMovies {
    id: number;
    count: number;
}