# from django.conf.urls import url
from django.urls import path, include
from .views import (
    MovieDetailApiView,
)

urlpatterns = [
    path('api/<int:movie_id>/', MovieDetailApiView.as_view())
]
