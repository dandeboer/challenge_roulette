from django.contrib import admin

from .models import Game, Challenge, Person

admin.site.register(Game)
admin.site.register(Challenge)
admin.site.register(Person)