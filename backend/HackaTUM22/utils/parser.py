import json
import copy


def get_list(list_string):
    if not list_string or list_string == "null":
        return None
    elements = list_string.split(', ')
    #print(elements)
    return elements

def get_first(list_string):
    if not list_string or list_string == "null":
        return None
    element = list_string.split(',')
    return element[0]




with open('../../../streampicker/ap.json') as dataf, open('../../../output.json', 'w', encoding='utf-8') as out:
    data = json.load(dataf)
    newdata = []
    for i, block in enumerate(data):
        new = dict(title=block['title'],
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

        newdata.append(copy.deepcopy(new))
    json.dump(newdata, out, indent=2)
