from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Movie
from .serializers import MovieSerializer
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
