import movies.models

# Fixed Filter determinded by the user
class FixedFilter():

    # List of strings of genres
    genres = []

    # Flag for filtering between movies and series
    showOnlySerie = False

    # List of possible providers
    providers = []

    # Flag for 'inSubscription', 'free' and 'pay or lend'
    # 'Pay or lend' only includes offers which do not require a subscription
    price = (True, False, False)

    # The current visible Movie
    currentMovie = None

    # Constructor
    def __init__(self, genres, showOnlySerie, providers, price):
        self.genres = genres
        self.showOnlySerie = showOnlySerie
        self.providers = providers
        self.price = price