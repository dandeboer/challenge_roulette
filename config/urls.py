from django.contrib import admin
from django.urls import path
from challenge_roulette import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home),
    path('getchallenges/', views.get_challenges),
    path('createchallenge/', views.create_challenge)
]
