# from django.conf.urls import url
from django.urls import path, include
from .views import (
    MovieDetailApiView, MovieApiView,
)

urlpatterns = [
    path('api', MovieApiView.as_view()),
    path('api/<int:movie_id>/', MovieDetailApiView.as_view())
]
