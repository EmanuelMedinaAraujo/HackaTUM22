from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Movie
from .serializers import MovieSerializer
from rest_framework import permissions

class MovieDetailApiView(APIView):
    # add permission to check if user is authenticated
    # ->  no permission needed
    # permission_classes = [permissions.IsAuthenticated]

    def get_object(self, movie_id):
        '''
        Helper method to get the object with given movie_id
        '''
        try:
            return Movie.objects.get(id=movie_id)
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

