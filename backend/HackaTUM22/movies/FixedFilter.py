import models

# Fixed Filter determinded by the user
class FixedFilter():

    # List of strings of genres
    genres = []

    # Flag for filtering between movies and series
    showOnlyMovie = False

    # List of possible providers
    providers = []

    # Flag for 'inSubscription', 'free' and 'pay or lend'
    price = (True, False, False)

    # Constructor
    def __init__(self, genres, showOnlyMovie, providers, price):
        self.genres = genres
        self.showOnlyMovie = showOnlyMovie
        self.providers = providers
        self.price = price