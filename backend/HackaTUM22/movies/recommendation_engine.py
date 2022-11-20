from django.db.models import Count
from movies.models import *
import random
import movies.fixed_filter

# Given a fixed filter and a list of movies determine the best next suggestion
class RecommendationAlgorithm():
    # Retrieve two first suggestions
    @staticmethod
    def getFirstSuggestions(fixedFilter):
        firstMovie = RecommendationAlgorithm.getNextSuggestion(fixedFilter, [])
        secondMovie = RecommendationAlgorithm.getNextSuggestion(fixedFilter,[])
        return [firstMovie, secondMovie]

    # Determine the best next suggestion
    @staticmethod
    def getNextSuggestion(fixedFilter, swipedMovies):
        #TODO extract movies correctly from config file
        validMovies = RecommendationAlgorithm.queryDatabaseWithFilter(fixedFilter)
        if(fixedFilter.currentMovie is None):
            randomMovie = validMovies.order_by('?').first()
            fixedFilter.currentMovie = randomMovie
            return randomMovie

        return validMovies.order_by('?').first()
        # Remove current movie from valid movies        
        validMovies = validMovies.exclude(tmdb = fixedFilter.currentMovie.tmdb)

        # Remove swiped movies from valid movies
        for swipedMovie in swipedMovies:
            validMovies = validMovies.exclude(tmdb = swipedMovie.tmdb)
        #return validMovies.order_by('?').first()

        # Determine the best recommendation
        validMovies = RecommendationAlgorithm.getBestSuggestionFrom(validMovies, swipedMovies)
        return validMovies.first()
    
    # Get the best suggestion from a given list using left swiped movies
    @staticmethod
    def getBestSuggestionFrom(validMovies, swipedMovies):
        if(len(swipedMovies) <= 0):
            return validMovies.order_by('?')

        # Count how often each Genre appears in swiped movies list
        result = swipedMovies.values('genres') \
                                .annotate(genresCount=Count('genres'))\
                                .group_by('genres')\
                                .order_by('-genresCount')
        # Get List of genres
        genres = []
        for genre in result:
            genres.append(genre['genres'])
        # Sort validMovies by genres list
        validMovies = sorted(validMovies, key=lambda movie: RecommendationAlgorithm.getGenreScore(movie, genres))

        # Count how often each actor appears in swiped movies list
        result = swipedMovies.values('actors') \
                                .annotate(actorsCount=Count('actors'))\
                                .group_by('actors')\
                                .order_by('-actorsCount')
        # Get List of actors
        actors = []
        for actor in result:
            actors.append(actor['actors'])
        # Sort validMovies by actors list but keeping the genre order
        validMovies = sorted(validMovies, cmp=lambda movie1, movie2: RecommendationAlgorithm.compareMovieByGenreAndActors(movie1, movie2, genres, actors))

        # Count how often each country appears in swiped movies list
        result = swipedMovies.values('country') \
                                .annotate(countryCount=Count('country'))\
                                .group_by('country')\
                                .order_by('-countryCount')
        # Get List of countries
        countries = []
        for country in result:
            countries.append(country['country'])
        # Sort validMovies by countries list but keeping the genre and actor order
        validMovies = sorted(validMovies, cmp=lambda movie1, movie2: RecommendationAlgorithm.compareMovieByGenreActorsAndCountry(movie1, movie2, genres, actors, countries))

        # Count how often each director appears in swiped movies list
        result = swipedMovies.values('director') \
                                .annotate(directorCount=Count('director'))\
                                .group_by('director')\
                                .order_by('-directorCount')
        # Get List of directors
        directors = []
        for director in result:
            directors.append(director['director'])
        # Sort validMovies by directors list but keeping the genre, actor and country order
        validMovies = sorted(validMovies, cmp=lambda movie1, movie2: RecommendationAlgorithm.compareMoviesByGenreActorsCountryAndDirector(movie1, movie2, genres, actors, countries, directors))

        # Get the first entry which is the one with the highest match
        return validMovies.first()

    # Compare two movies by genre and actor
    @staticmethod
    def compareMovieByGenreAndActors(movie1, movie2, genres, actors):
        # Compare by genre
        genreScore1 = RecommendationAlgorithm.getGenreScore(movie1, genres)
        genreScore2 = RecommendationAlgorithm.getGenreScore(movie2, genres)
        if(genreScore1 != genreScore2):
            return genreScore1 - genreScore2
        # Compare by actor
        actorScore1 = RecommendationAlgorithm.getActorScore(movie1, actors)
        actorScore2 = RecommendationAlgorithm.getActorScore(movie2, actors)
        return actorScore1 - actorScore2

    # Compare two movies by genre, actor and country
    @staticmethod
    def compareMovieByGenreActorsAndCountry(movie1, movie2, genres, actors, countries):
        genreAndActorScore1 = RecommendationAlgorithm.compareMovieByGenreAndActors(movie1, movie2, genres, actors)
        genreAndActorScore2 = RecommendationAlgorithm.compareMovieByGenreAndActors(movie2, movie1, genres, actors)
        if(genreAndActorScore1 != genreAndActorScore2):
            return genreAndActorScore1 - genreAndActorScore2
        # Compare by country
        countryScore1 = RecommendationAlgorithm.getCountryScore(movie1, countries)
        countryScore2 = RecommendationAlgorithm.getCountryScore(movie2, countries)
        return countryScore1 - countryScore2

    # Compare two movies by genre, actor, country and director
    @staticmethod
    def compareMoviesByGenreActorsCountryAndDirector(movie1, movie2, genres, actors, countries, directors):
        genreActorAndCountryScore1 = RecommendationAlgorithm.compareMovieByGenreActorsAndCountry(movie1, movie2, genres, actors, countries)
        genreActorAndCountryScore2 = RecommendationAlgorithm.compareMovieByGenreActorsAndCountry(movie2, movie1, genres, actors, countries)
        if(genreActorAndCountryScore1 != genreActorAndCountryScore2):
            return genreActorAndCountryScore1 - genreActorAndCountryScore2
        # Compare by director
        directorScore1 = RecommendationAlgorithm.getDirectorScore(movie1, directors)
        directorScore2 = RecommendationAlgorithm.getDirectorScore(movie2, directors)
        return directorScore1 - directorScore2

    # Get the genre score of a movie
    @staticmethod
    def getGenreScore(movie, genres):
        score = 0
        for genre in movie.genres:
            if genre in genres:
                score += 1
        return score

    # Get the actor score of a movie
    @staticmethod
    def getActorScore(movie,genres, actors):
        score = 0
        for actor in movie.actors:
            if actor in actors:
                score += 1
        return score

    # Get the country score of a movie
    @staticmethod
    def getCountryScore(movie, countries):
        score = 0
        if movie.country in countries:
            score += 1
        return score
    
    # Get the director score of a movie
    @staticmethod
    def getDirectorScore(movie, directors):
        score = 0
        if movie.director in directors:
            score += 1
        return score

    # Query the database using the fixed filter
    @staticmethod
    def queryDatabaseWithFilter(fixedFilter):
        # Retrieve all movies or series according to the fixed filter
        if fixedFilter.showOnlySerie:
            # Retrieve only the first episode of the first season of each series
            #movies = Movie.objects.filter(serie=True, season = 1, episode = 1)
            movies = Movie.objects.all()
        else:
            movies = Movie.objects.all()

        # Filter by genre
        #if len(fixedFilter.genres) > 0:
            # Retrieve all movies which have at least one of the selected genres
            movies = movies.filter(genres__name__in=fixedFilter.genres)
            return movies
        
        # Filter by provider
        validOffers = Offer.filter(movies__name__in=movies)
        if len(fixedFilter.providers) > 0:
            offersByProvider = validOffers.filter(provider__name_in=fixedFilter.providers)
        else:
            offersByProvider = validOffers
        
        # Filter by price
        if(True in fixedFilter.price):
            if(fixedFilter.price[0]):
                offersBySubscription = offersByProvider.filter(type = "ABO")
            if(fixedFilter.price[1]):
                freeOffers = offersByProvider.filter(type="AVOD")
            if(fixedFilter.price[2]):
                offersToBuyOrLend = offersByProvider.filter(type = "PPV"|"DTO"|"SHIP")
            offersByPrice = offersBySubscription.add(freeOffers, offersToBuyOrLend).distinct()
        else:
            offersByPrice = offersByProvider    
        return offersByPrice.values('movie').distinct()