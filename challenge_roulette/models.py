from django.db import models

class Game(models.Model): 
    name = models.CharField(max_length=50)

class Person(models.Model):
    name = models.CharField(max_length=20)

class Challenge(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=200, null=True, blank=True, )
    game = models.ForeignKey(to=Game, on_delete=models.CASCADE, related_name='challenges')
    person = models.ForeignKey(to=Person, on_delete=models.CASCADE, related_name='challenges')