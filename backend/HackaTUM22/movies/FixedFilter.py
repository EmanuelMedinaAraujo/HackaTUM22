import models

# Fixed Filter determinded by the user
class FixedFilter():
    genres = []
    showOnlyMovie = False
    providers = []
    price = 0.0

    # Constructor
    def __init__(self, genres, showOnlyMovie, providers, price):
        self.genres = genres
        self.showOnlyMovie = showOnlyMovie
        self.providers = providers
        self.price = price