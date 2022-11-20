from django.db import models


class Person(models.Model):
    name = models.CharField(max_length=50, primary_key=True)


class Company(models.Model):
    name = models.CharField(max_length=50, primary_key=True)


class Country(models.Model):
    name = models.CharField(max_length=50, primary_key=True)


class Genre(models.Model):
    name = models.CharField(max_length=50, primary_key=True)

class Series(models.Model):
    otitle = models.CharField(max_length=50, primary_key=True)


class Season(models.Model):
    series = models.ForeignKey(Series, on_delete=models.CASCADE, related_name='seasons')


class Provider(models.Model):
    pid = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=50, blank=True, null=True)


class Movie(models.Model):
    tmdb = models.IntegerField(blank=True, null=True)
    tvdb = models.IntegerField(blank=True, null=True)
    imdb_id = models.IntegerField(blank=True, primary_key=True)
    imdb_episode_id = models.IntegerField(blank=True, null=True)
    title = models.CharField(max_length=50, blank=True, null=True)
    otitle = models.CharField(max_length=50, blank=True, null=True)
    original = models.BooleanField(blank=True, null=True)
    serie = models.BooleanField(blank=True, null=True)
    episode = models.IntegerField(blank=True, null=True)
    episodetitle = models.CharField(max_length=50, blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    directors = models.ManyToManyField(Person, related_name='movies_produced', blank=True, null=True)
    actors = models.ManyToManyField(Person, related_name='movie_roles', blank=True, null=True)
    companies = models.ManyToManyField(Company, related_name='movies_produced', blank=True, null=True)
    genres = models.ManyToManyField(Genre, related_name='movies', blank=True, null=True)
    countries = models.ManyToManyField(Country, related_name='movies', blank=True, null=True)
    banners = models.URLField(max_length=150, blank=True, null=True)
    posters = models.URLField(max_length=150, blank=True, null=True)
    runtime = models.IntegerField(blank=True, null=True)
    fsk = models.IntegerField(blank=True, null=True)

class Version(models.Model):
    internal_id = models.IntegerField(blank=True)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='versions', blank=True, null=True)
    language = models.CharField(max_length=50, blank=True, null=True)
    subtitles = models.CharField(max_length=50, blank=True, null=True)


class Offer(models.Model):
    movie = models.ForeignKey(Version, on_delete=models.CASCADE, related_name='offers', blank=True, null=True)
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name='movies_provided', blank=True, null=True)
    type = models.CharField(max_length=4, blank=True, null=True)
    url = models.URLField(max_length=150, blank=True, null=True)
    seasonurl = models.URLField(max_length=150, blank=True, null=True)
    available = models.BooleanField(blank=True, null=True)
    resolution = models.CharField(max_length=20, blank=True, null=True)
    audio = models.CharField(max_length=20, blank=True, null=True)
    added = models.DateTimeField(blank=True, null=True)
    modified = models.DateTimeField(blank=True, null=True)
    timestamp = models.DateTimeField(blank=True, null=True)
    expires = models.DateTimeField(blank=True, null=True)
