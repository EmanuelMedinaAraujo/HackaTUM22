from rest_framework import serializers
from .models import Movie, Person, Company, Country, Genre, Series, Season, Provider, Version, Offer


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['tmdb', 'tvdb', 'imdb_id', 'imdb_episode_id', 'title', 'otitle', 'original', 'serie', 'episode',
                  'episodetitle', 'year', 'directors', 'actors', 'companies', 'genres', 'countries', 'banners',
                  'posters', 'runtime', 'fsk']


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['name']


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['name']


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['name']


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['name']


class SeriesSerializer(serializers.ModelSerializer):
    class Meta:
        Model = Series
        fields = ['otitle']


class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = ['series']


class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = ['pid', 'name']


class VersionSerializer(serializers.ModelSerializer):
    class Meta:
        Model = Version
        fields = ['internal_id', 'movie', 'language', 'subtitles']


class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        Model = Offer
        fields = ['movie', 'provider', 'type', 'url', 'seasonurl', 'seasonurl', 'resolution', 'resolution', 'audio',
                  'added', ' modified', 'timestamp', 'expires']
