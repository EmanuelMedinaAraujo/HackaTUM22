from movies.models import *

# Given a fixed filter and a list of movies determine the best next suggestion
class RecommendationAlgorithm():

    # Retrieve two first suggestions
    @staticmethod
    def getFirstSuggestions(fixedFilter):
        availableMovies = RecommendationAlgorithm.queryDatabaseWithFilter(fixedFilter)
        firstMovie = RecommendationAlgorithm.getNextSuggestion(fixedFilter, [])
        fixedFilter.currentMovie = firstMovie
        secondMovie = RecommendationAlgorithm.getNextSuggestion(fixedFilter,[])
        return [firstMovie, secondMovie]

    # Determine the best next suggestion
    @staticmethod
    def getNextSuggestion(fixedFilter, movies):
        validMovies = RecommendationAlgorithm.queryDatabaseWithFilter(fixedFilter)
        if(fixedFilter.currentMovie is not None):
            return validMovies[0]
        validMovies.remove(fixedFilter.currentMovie)
        # TODO Determine the best recommendation
        return validMovies

    # Query the database using the fixed filter
    @staticmethod
    def queryDatabaseWithFilter(fixedFilter):
        # Retrieve all movies or series according to the fixed filter
        if fixedFilter.showOnlySerie:
            # Retrieve only the first episode of the first season of each series
            movies = Movie.objects.filter(serie=True, season = 1, episode = 1)
        else:
            movies = Movie.objects.all()

        # Filter by genre
        if len(fixedFilter.genres) > 0:
            movies = movies.filter(genres__name__in=fixedFilter.genres)
        
        # Filter by provider
        if len(fixedFilter.providers) > 0:
            validOffers = Offer.filter(movies__name__in=movies)
            offersByProvider = validOffers.filter(provider__name_in=fixedFilter.providers)
        
        # Filter by price
        if(True in fixedFilter.price):
            if(fixedFilter.price[0]):
                offersBySubscription = offersByProvider.filter(type = "ABO")
            if(fixedFilter.price[1]):
                freeOffers = offersByProvider.filter(type="AVOD")
            if(fixedFilter.price[2]):
                offersToBuyOrLend = offersByProvider.filter(type = "PPV"|"DTO"|"SHIP")
            offersByPrice = offersBySubscription.add(freeOffers, offersToBuyOrLend).distinct()
        return offersByProvider.values('movie').distinct()