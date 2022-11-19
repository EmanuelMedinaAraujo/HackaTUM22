from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .fixed_filter import FixedFilter
from .models import Movie, Person, Genre, Country, Company
from .recommendation_engine import RecommendationAlgorithm
from .serializers import MovieSerializer, PersonSerializer, GenreSerializer, CountrySerializer, CompanySerializer
from rest_framework import permissions


class MovieApiView(APIView):
    def post(self, request, *args, **kwargs):
        '''
        Create the movie with given data
        '''
        data = {
            'tmdb': request.data.get('tmdb'),
            'tvdb': request.data.get('tvdb'),
            'imdb_id': request.data.get('imdb_id'),
            'imdb_episode_id': request.data.get('imdb_episode_id'),
            'title': request.data.get('title'),
            'otitle': request.data.get('otitle'),
            'original': request.data.get('original'),
            'serie': request.data.get('serie'),
            'episode': request.data.get('episode'),
            'episodetitle': request.data.get('episodetitle'),
            'year': request.data.get('year'),
            # 'directors': request.data.get('directors'),
            # 'actors': request.data.get('actors'),
            # 'companies': request.data.get('companies'),
            # 'genres': request.data.get('genres'),
            # 'countries': request.data.get('countries'),
            'banners': request.data.get('banners'),
            'posters': request.data.get('posters'),
            'runtime': request.data.get('runtime'),
            'fsk': request.data.get('fsk')
        }
        serializer = MovieSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MovieDetailApiView(APIView):
    # add permission to check if user is authenticated
    # ->  no permission needed
    # permission_classes = [permissions.IsAuthenticated]

    def get_object(self, movie_id):
        '''
        Helper method to get the object with given movie_id
        '''
        try:
            return Movie.objects.get(pk=movie_id)
        except Movie.DoesNotExist:
            return None

    def get(self, request, movie_id, *args, **kwargs):
        '''
        Retrieves the movie with the given id
        '''
        movie_instance = self.get_object(movie_id)
        if not movie_instance:
            return Response(
                {"res": "Object with specified movie id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = MovieSerializer(movie_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PersonApiView(APIView):
    def post(self, request, *args, **kwargs):
        '''
        Create the movie with given data
        '''
        data = {
            'name': request.data.get('name')
        }
        serializer = PersonSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PersonDetailApiView(APIView):
    # add permission to check if user is authenticated
    # ->  no permission needed
    # permission_classes = [permissions.IsAuthenticated]

    def get_object(self, person_id):
        '''
        Helper method to get the object with given movie_id
        '''
        try:
            return Person.objects.get(pk=person_id)
        except Person.DoesNotExist:
            return None

    def get(self, request, person_id, *args, **kwargs):
        '''
        Retrieves the movie with the given id
        '''
        person_instance = self.get_object(person_id)
        if not person_instance:
            return Response(
                {"res": "Object with specified movie id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = PersonSerializer(person_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GenreApiView(APIView):
    def post(self, request, *args, **kwargs):
        '''
        Create the movie with given data
        '''
        data = {
            'name': request.data.get('name')
        }
        serializer = GenreSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GenreDetailApiView(APIView):
    # add permission to check if user is authenticated
    # ->  no permission needed
    # permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        '''
        Helper method to get the object with given movie_id
        '''
        try:
            return Genre.objects.get(pk=id)
        except Genre.DoesNotExist:
            return None

    def get(self, request, id, *args, **kwargs):
        '''
        Retrieves the movie with the given id
        '''
        instance = self.get_object(id)
        if not instance:
            return Response(
                {"res": "Object with specified movie id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = GenreSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CountryApiView(APIView):
    def post(self, request, *args, **kwargs):
        '''
        Create the movie with given data
        '''
        data = {
            'name': request.data.get('name')
        }
        serializer = CountrySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CountryDetailApiView(APIView):
    # add permission to check if user is authenticated
    # ->  no permission needed
    # permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        '''
        Helper method to get the object with given movie_id
        '''
        try:
            return Country.objects.get(pk=id)
        except Country.DoesNotExist:
            return None

    def get(self, request, id, *args, **kwargs):
        '''
        Retrieves the movie with the given id
        '''
        instance = self.get_object(id)
        if not instance:
            return Response(
                {"res": "Object with specified movie id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = CountrySerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CompanyApiView(APIView):
    def post(self, request, *args, **kwargs):
        '''
        Create the movie with given data
        '''
        data = {
            'name': request.data.get('name')
        }
        serializer = CompanySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CompanyDetailApiView(APIView):
    # add permission to check if user is authenticated
    # ->  no permission needed
    # permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        '''
        Helper method to get the object with given movie_id
        '''
        try:
            return Company.objects.get(pk=id)
        except Company.DoesNotExist:
            return None

    def get(self, request, id, *args, **kwargs):
        '''
        Retrieves the movie with the given id
        '''
        instance = self.get_object(id)
        if not instance:
            return Response(
                {"res": "Object with specified movie id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = CompanySerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MovieApiView(APIView):
    def post(self, request, *args, **kwargs):
        '''
        Create the movie with given data
        '''
        data = {
            'tmdb': request.data.get('tmdb'),
            'tvdb': request.data.get('tvdb'),
            'imdb_id': request.data.get('imdb_id'),
            'imdb_episode_id': request.data.get('imdb_episode_id'),
            'title': request.data.get('title'),
            'otitle': request.data.get('otitle'),
            'original': request.data.get('original'),
            'serie': request.data.get('serie'),
            'episode': request.data.get('episode'),
            'episodetitle': request.data.get('episodetitle'),
            'year': request.data.get('year'),
            # 'directors': request.data.get('directors'),
            # 'actors': request.data.get('actors'),
            # 'companies': request.data.get('companies'),
            # 'genres': request.data.get('genres'),
            # 'countries': request.data.get('countries'),
            'banners': request.data.get('banners'),
            'posters': request.data.get('posters'),
            'runtime': request.data.get('runtime'),
            'fsk': request.data.get('fsk')
        }
        serializer = MovieSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FirstAPIView(APIView):
    def post(self, request, *args, **kwargs):
        config = request.data.get('config')
        filter = FixedFilter(config['genres'], config['showOnlySerie'], config['providers'], config['price'])
        return RecommendationAlgorithm.getFirstSuggestions(filter)


class NextAPIView(APIView):
    def post(self, request, *args, **kwargs):
        config = request.data.get('config')
        filter = FixedFilter(config['genres'], config['showOnlySerie'], config['providers'], config['price'])
        swiped = request.data.get('swipedMovies')
        return RecommendationAlgorithm.getNextSuggestion(filter, swiped)
