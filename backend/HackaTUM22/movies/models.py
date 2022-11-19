from django.db import models


class Person(models.Model):
    name = models.CharField(max_length=50)


class Company(models.Model):
    name = models.CharField(max_length=50)


class Country(models.Model):
    name = models.CharField(max_length=50)


class Genre(models.Model):
    name = models.CharField(max_length=50)


class Series(models.Model):
    pass


class Season(models.Model):
    series = models.ForeignKey(Series, on_delete=models.CASCADE, related_name='seasons')


class Provider(models.Model):
    pid = models.CharField(max_length=10)
    name = models.CharField(max_length=50)


class Movie(models.Model):
    tmdb = models.IntegerField()
    tvdb = models.IntegerField()
    imdb_id = models.IntegerField()
    imdb_episode_id = models.IntegerField()
    title = models.CharField(max_length=50)
    otitle = models.CharField(max_length=50)
    original = models.BooleanField()
    serie = models.BooleanField()
    episode = models.IntegerField()
    episodetitle = models.CharField(max_length=50)
    year = models.IntegerField()
    directors = models.ManyToManyField(Person, related_name='movies_produced')
    actors = models.ManyToManyField(Person, related_name='movie_roles')
    companies = models.ManyToManyField(Company, related_name='movies_produced')
    genres = models.ManyToManyField(Genre, related_name='movies')
    countries = models.ManyToManyField(Country, related_name='movies')
    banner = models.URLField(max_length=150)
    poster = models.URLField(max_length=150)
    runtime = models.IntegerField()
    fsk = models.IntegerField()


class Version(models.Model):
    internal_id = models.IntegerField()
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='versions', blank=True)
    language = models.CharField(max_length=50)
    subtitles = models.CharField(max_length=50)


class Offer(models.Model):
    movie = models.ForeignKey(Version, on_delete=models.CASCADE, related_name='offers', blank=True)
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name='movies_provided')
    available = models.BooleanField()
    resolution = models.CharField(max_length=20)
    audio = models.CharField(max_length=20)
    added = models.DateTimeField()
    modified = models.DateTimeField()
    timestamp = models.DateTimeField()
    expires = models.DateTimeField()
