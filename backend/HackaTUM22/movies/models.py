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
    title = models.CharField(max_length=50, blank=True)
    otitle = models.CharField(max_length=50, blank=True)
    original = models.BooleanField()
    serie = models.BooleanField()
    episode = models.IntegerField()
    episodetitle = models.CharField(max_length=50, blank=True)
    year = models.IntegerField()
    directors = models.ManyToManyField(Person, related_name='movies_produced', blank=True)
    actors = models.ManyToManyField(Person, related_name='movie_roles', blank=True)
    companies = models.ManyToManyField(Company, related_name='movies_produced', blank=True)
    genres = models.ManyToManyField(Genre, related_name='movies', blank=True)
    countries = models.ManyToManyField(Country, related_name='movies', blank=True)
    banner = models.URLField(max_length=150, blank=True)
    poster = models.URLField(max_length=150, blank=True)
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
    type = models.CharField(max_length=4)
    available = models.BooleanField()
    resolution = models.CharField(max_length=20)
    audio = models.CharField(max_length=20)
    added = models.DateTimeField()
    modified = models.DateTimeField()
    timestamp = models.DateTimeField()
    expires = models.DateTimeField()
