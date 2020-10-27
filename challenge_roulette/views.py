from django.shortcuts import render
from .models import Game, Challenge, Person
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

def home(request):
    games = Game.objects.all()
    challenges = Challenge.objects.all()
    return render(request, 'index.html', {'games': games, 'challenges': challenges})

def get_challenges(request):
    smite = Game.objects.get(name='Smite')
    smite_challenges = Challenge.objects.filter(game=smite)
    smite_json = {}
    entry = 0
    for challenge in smite_challenges:
        smite_json['entry'+str(entry)] = {'name': challenge.name, 'description': challenge.description, 'person': challenge.person.name}
        entry += 1
    apex = Game.objects.get(name='Apex')
    apex_challenges = Challenge.objects.filter(game=apex)
    apex_json = {}
    entry = 0
    for challenge in apex_challenges:
        apex_json['entry'+str(entry)] = {'name': challenge.name, 'description': challenge.description, 'person': challenge.person.name}
        entry += 1
    return JsonResponse({'smite': smite_json, 'apex': apex_json})

@csrf_exempt
def create_challenge(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode("utf-8"))
        print(data)
        game = Game.objects.get(name=data['game'])
        print(game)
        person = Person.objects.get(name=data['person'])
        Challenge.objects.create(name=data['name'], description=data['description'], game=game, person=person)
        return JsonResponse({'status': 'working'})
