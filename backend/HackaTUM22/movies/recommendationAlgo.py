import models

# Given a fixed filter and a list of movies determine the best next suggestion
class RecommendationAlgorithm():

    # Determine the best next suggestion
    @staticmethod
    def getNextSuggestion(fixedFilter, movies):
        return movies[0]

    # Retrieve two first suggestions
    @staticmethod
    def getFirstSuggestions(fixedFilter):
        firstMovie = models.Movie.objects.all()[0]
        secondMovie = RecommendationAlgorithm.getNextSuggestion(fixedFilter, [])
        return [firstMovie, secondMovie]

