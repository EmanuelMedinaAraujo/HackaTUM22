# from django.conf.urls import url
from django.urls import path, include
from .views import (
    MovieDetailApiView, MovieApiView, PersonApiView, PersonDetailApiView, GenreApiView, GenreDetailApiView,
    CountryApiView, CountryDetailApiView, CompanyApiView, CompanyDetailApiView, NextAPIView, FirstAPIView,
)

urlpatterns = [
    path('movies/api', MovieApiView.as_view()),
    path('movies/api/<int:movie_id>/', MovieDetailApiView.as_view()),
    path('persons/api', PersonApiView.as_view()),
    path('persons/api/<int:person_id>/', PersonDetailApiView.as_view()),
    path('genres/api', GenreApiView.as_view()),
    path('genres/api/<int:id>/', GenreDetailApiView.as_view()),
    path('countries/api', CountryApiView.as_view()),
    path('countries/api/<int:id>/', CountryDetailApiView.as_view()),
    path('companies/api', CompanyApiView.as_view()),
    path('companies/api/<int:id>/', CompanyDetailApiView.as_view()),
    path('first/api', FirstAPIView.as_view()),
    path('next/api', NextAPIView.as_view()),
]
