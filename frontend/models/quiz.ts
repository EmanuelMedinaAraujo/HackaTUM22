export interface QuizRequest {
    config: Filters;
    movies: Array<number>;
    currentMovieId: string;
}

export interface Filters {
    [key : string]: Array<string | boolean> | boolean;
}

export interface ViewedMovies {
    id: number;
    count: number;
}