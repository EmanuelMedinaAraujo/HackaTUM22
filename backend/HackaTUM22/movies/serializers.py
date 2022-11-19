from rest_framework import serializers
from .models import *


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['tmdb', 'tvdb', 'imdb_id', 'imdb_episode_id', 'title', 'otitle', 'original', 'serie', 'episode',
                  'episodetitle', 'year', 'directors', 'actors', 'companies', 'genres', 'countries', 'banner', 'poster',
                  'runtime', 'fsk']
