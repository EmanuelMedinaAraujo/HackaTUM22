import json
import copy
import requests


def get_list(list_string):
    if not list_string or list_string == "null":
        return None
    elements = list_string.split(', ')
    # print(elements)
    return elements


def get_first(list_string):
    if not list_string or list_string == "null":
        return None
    element = list_string.split(',')
    return element[0]


def parse(source, target):
    with open(source) as dataf, open(target, 'w', encoding='utf-8') as out:
        data = json.load(dataf)
        newdata = []
        for i, block in enumerate(data):
            directors = get_list(block['directors'])
            if directors:
                for director in directors:
                    url = 'http://127.0.0.1:8000/persons/api'
                    new = dict(name=director)
                    # print(new)
                    x = requests.post(url, json=new)

            actors = get_list(block['actors'])
            if actors:
                for actor in actors:
                    url = 'http://127.0.0.1:8000/persons/api'
                    new = {}
                    new['name'] = actor
                    x = requests.post(url, json=new)

            genres = get_list(block['genres'])
            if genres:
                for genre in genres:
                    url = 'http://127.0.0.1:8000/genres/api'
                    new = {}
                    new['name'] = genre
                    x = requests.post(url, json=new)

            countries = get_list(block['countries'])
            if countries:
                for country in countries:
                    url = 'http://127.0.0.1:8000/countries/api'
                    new = {}
                    new['name'] = country
                    x = requests.post(url, json=new)

            companies = get_list(block['companies'])
            if companies:
                for company in companies:
                    url = 'http://127.0.0.1:8000/companies/api'
                    new = {}
                    new['name'] = company
                    x = requests.post(url, json=new)

            new = dict(title=block['title'],
                       # internal_id=block['id'],
                       mdb=block['tmdb'],
                       tvdb=block['tvdb'],
                       imdb_id=block['imdb_id'],
                       imdb_episode_id=block['imdb_episode_id'],
                       otitle=block['otitle'],
                       original=block['original'],
                       episode=block['episode'],
                       episodetitle=block['episodetitle'],
                       oepisodetitle=block['oepisodetitle'],
                       year=block['year'],
                       directors=get_list(block['directors']),
                       actors=get_list(block['actors']),
                       companies=get_list(block['companies']),
                       countries=get_list(block['countries']),
                       genres=get_list(block['genres']),
                       airtime=block['airtime'],
                       banners=get_first(block['banners']),
                       posters=get_first(block['posters']),
                       runtime=block['runtime'],
                       fsk=block['fsk']
                       )

            # print(new)
            url = 'http://127.0.0.1:8000/movies/api'
            x = requests.post(url, json=new)

            newdata.append(copy.deepcopy(new))
        json.dump(newdata, out, indent=2)


parse('../../../streampicker/ap.json', '../../../streampicker/ap_output.json')
parse('../../../streampicker/nf.json', '../../../streampicker/nf_output.json')
parse('../../../streampicker/dp.json', '../../../streampicker/dp_output.json')
parse('../../../streampicker/tn.json', '../../../streampicker/tn_output.json')
