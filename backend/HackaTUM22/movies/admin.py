from django.contrib import admin

from movies.models import Person, Company, Country, Genre, Movie, Season, Series, Offer, Version

admin.site.register(Person)
admin.site.register(Company)
admin.site.register(Country)
admin.site.register(Genre)
admin.site.register(Movie)
admin.site.register(Season)
admin.site.register(Series)
admin.site.register(Offer)
admin.site.register(Version)