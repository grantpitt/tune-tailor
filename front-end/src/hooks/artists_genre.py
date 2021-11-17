import requests
from matplotlib import pyplot as plt
import random
import webbrowser

token = "BQBCqYybRHKWLByO3H4sWC3H4xkMoHNJuY6L-eVsWVV71DkOyDXlgb3FxPUiSEHQBCQ8mG5vAvyB7C-RVFHlx_N7AhQ9Xc2A45qgJbNFE9hWaBE8xm9eLbBtrzV_dZs7B8gc9ERRg60j6ImP9IdcDJGSlAaAMiQxQnVTg4IPbiZMritbEfyBN61A6UK3z2wdGsta2Q"
classical = {'caucasian classical', 'opera', 'classical saxophone', 'classical', 'german baroque', 'finnish classical', 'chinese classical piano', 'italian opera', 'british orchestra', 'american romanticism', 'contemporary jazz', 'early music', 'historic orchestral performance', 'czech classical', 'ukrainian classical', 'contemporary classical', 'american contemporary classical', 'early avant garde', 'classical piano', 'neoclassicism', 'hungarian classical performance', 'british classical piano', 'russian romanticism', 'post-romantic era', 'classical guitar', 'jazz saxophone', 'compositional ambient', 'polish classical', 'french romanticism', 'baltic classical', 'german orchestra', 'orchestra', 'classical era', 'korean classical performance', 'operetta', 'classical performance', 'jazz fusion', 'classical organ', 'french soundtrack', 'chinese classical performance', 'string orchestra', 'avant-garde', 'soundtrack', 'norwegian jazz', 'english baroque', 'classical cello', 'scorecore', 'early romantic era', 'late romantic era', 'baroque', 'choral', 'italian baroque', 'african-american classical', 'norwegian classical', 'japanese vgm', 'french opera', 'german romanticism', 'early modern classical', 'russian modern classical', 'minimalism', 'classical soprano', 'video game music', 'russian classical piano', 'operatic pop', 'american modern classical', 'italian romanticism', 'indie game soundtrack', 'orchestral performance', 'bow pop', 'violin', 'post-minimalism', 'classical trumpet', 'impressionism', 'ecm-style jazz'}
rap = {'queens hip hop', 'chicano rap', 'pop', 'old school hip hop', 'harlem hip hop', 'afrofuturism', 'turntablism', 'new jersey rap', 'bronx hip hop', 'rap', 'dirty south rap', 'alternative rock', 'chicago rap', 'neo soul', 'boom bap', 'boston hip hop', 'hip house', 'hip hop', 'conscious hip hop', 'political hip hop', 'trap queen', 'deep east coast hip hop', 'pop rap', 'detroit hip hop', 'jazz rap', 'electro', 'dance pop', 'east coast hip hop', 'jazz boom bap', 'alternative hip hop', 'atl hip hop', 'canadian old school hip hop', 'west coast rap', 'southern hip hop', 'gangster rap', 'g funk', 'hardcore hip hop', 'indie soul', 'virginia hip hop', 'oakland hip hop', 'rap rock', 'golden age hip hop', 'indie r&b', 'new jack swing', 'r&b', 'philly rap', 'hip pop', 'bboy', 'psychedelic hip hop', 'urban contemporary'}
dance = {'sad rap', 'jazz funk', 'houston rap', 'philly rap', 'australian hip hop', 'reggae', 'pop rap', 'dance pop', 'rap', 'north carolina hip hop', 'smooth jazz', 'meme rap', 'pop', 'reggae fusion', 'minnesota hip hop', 'escape room', 'trap queen', 'lgbtq+ hip hop', 'indie pop', 'pop', 'dance'}
calm = {'art pop', 'canadian indie', 'soundtrack', 'swedish americana', 'indie folk', 'stomp and holler', 'electropop', 'baroque pop', 'dream pop', 'nordic soundtrack', 'austindie', 'experimental folk', 'south african alternative', 'dreamo', 'kc indie', 'hollywood', 'bedroom pop', 'melancholia', 'shoegaze', 'la indie', 'indie poptimism', 'vapor soul', 'alt z', 'shimmer psych', 'norwegian pop', 'north carolina roots', 'eau claire indie', 'chamber pop', 'modern rock', 'new jersey indie', 'modern dream pop', 'nyc pop', 'vermont indie', 'soft rock', 'vintage hollywood', 'indie pop', 'indie garage rock', 'baltimore indie', 'alternative americana', 'brooklyn indie', 'new americana', 'classical', 'polish classical', 'swedish singer-songwriter', 'north carolina indie', 'lo-fi indie', 'early romantic era', 'sydney indie', 'alternative r&b', 'alternative rock', 'singer-songwriter', 'freak folk', 'small room', 'gauze pop', 'atlanta indie', 'chamber psych', 'bubblegrunge', 'experimental ambient', 'slowcore', 'canadian pop', 'pop', 'compositional ambient', 'ambient pop', 'indie rock', 'el paso indie'}
folk = {'texas country', 'contemporary country', 'new americana', 'country', 'outlaw country', 'old-time', 'kentucky roots', 'midwest americana', 'jug band', 'banjo', 'classic country pop', 'deep new americana', 'folk', 'indie folk', 'austindie', 'neo-traditional bluegrass', 'alternative country', 'saskatchewan indie', 'stomp and holler', 'country rock', 'norwegian americana', 'bay area indie', 'lancaster pa indie', 'roots americana', 'north carolina roots', 'indiecoustica', 'country dawn', 'arkansas country', 'swamp rock', 'roots rock', 'canadian country', 'modern old-time', 'western americana', 'progressive bluegrass', 'ok indie', 'canadian americana', 'canadian singer-songwriter', 'bluegrass', 'cowboy western', 'tulsa indie', 'kentucky indie', 'austin americana', 'canadian contemporary country', 'modern southern rock', 'alberta country'}

classification = "dance"
#get current users' top tracks
users_top = requests.get("https://api.spotify.com/v1/me/top/tracks?time_range=medium_term", headers= {"Accept": "application/json", "Content-Type": "application/json", "Authorization": f"Bearer {token}"})

#isolate track id for each top song
items = users_top.json()['tems']
top_songs_id = [item['uri'].split(':')[2] for item in items]
artist_id_song_urls = {}

#create dictionary with artist ids as keys and preview urls for their songs as values
for item in items:
    artist_id = item['artists'][0]['id']
    preview_url = item['uri']
    if artist_id not in artist_id_song_urls:
        artist_id_song_urls[artist_id] = []
    artist_id_song_urls[artist_id].append(preview_url)

artist_id_genres =  {}
genres = set()
for artist in artist_id_song_urls:
    genre_to_retrieve = requests.get(f"https://api.spotify.com/v1/artists/{artist}", headers={ "Accept": "application/json", "Content-Type": "application/json", "Authorization": f"Bearer {token}"})
    genres_1 = genre_to_retrieve.json()["genres"]
    genres.update(genres_1)
    artist_id_genres[artist] = (genres_1)


if classification == "classical":
    intersection = set.intersection(genres,set(classical))
    if not intersection:
        classical = requests.get("https://api.spotify.com/v1/playlists/37i9dQZF1DWWEJlAGA9gs0/tracks", headers={"Accept": "application/json", "Content-Type": "application/json", "Authorization": f"Bearer {token}"})
        items = classical.json()['items']
        classical_preview = random.choice([item['track']['preview_url'] for item in items])
        webbrowser.open(f'{classical_preview}')
    else:
        artist_ids = []
        genre_1 = random.choice(list(intersection))
        for artist, genre in artist_id_genres.items():
            if genre_1 in genre:
                artist_ids.append(artist)
        artist_choice = random.choice(artist_ids)
        classical_preview = random.choice(artist_id_song_urls[f'{artist_choice}'])
        webbrowser.open(f'{classical_preview}')

elif classification == "rap":
    intersection = set.intersection(genres,set(rap))
    if not intersection:
        rap = requests.get("https://api.spotify.com/v1/playlists/37i9dQZF1DX186v583rmzp/tracks", headers={"Accept": "application/json", "Content-Type": "application/json", "Authorization": f"Bearer {token}"})
        items = rap.json()['items']
        rap_preview = random.choice([item['track']['preview_url'] for item in items])
        webbrowser.open(f'{rap_preview}')
    else:
        artist_ids = []
        genre_1 = random.choice(list(intersection))
        for artist, genre in artist_id_genres.items():
            if genre_1 in genre:
                artist_ids.append(artist)
        artist_choice = random.choice(artist_ids)
        rap_preview = random.choice(artist_id_song_urls[f'{artist_choice}'])
        webbrowser.open(f'{rap_preview}')

elif classification == "dance":
    intersection = set.intersection(genres,set(dance))
    if not intersection:
        dance = requests.get("https://api.spotify.com/v1/playlists/0dDgGk8Gwq5YnQMvaKJvrd/tracks", headers={"Accept": "application/json", "Content-Type": "application/json", "Authorization": f"Bearer {token}"})
        items = dance.json()['items']
        dance_preview = random.choice([item['track']['preview_url'] for item in items])
        webbrowser.open(f'{dance_preview}')
    else:
        artist_ids = []
        genre_1 = random.choice(list(intersection))
        for artist, genre in artist_id_genres.items():
            if genre_1 in genre:
                artist_ids.append(artist)
        artist_choice = random.choice(artist_ids)
        dance_preview = random.choice(artist_id_song_urls[f'{artist_choice}'])
        webbrowser.open(f'{dance_preview}')

elif classification == "calm":
    intersection = set.intersection(genres,set(calm))
    if not intersection:
        calm = requests.get("https://api.spotify.com/v1/playlists/7FDRGKQhyaBd9Wc2bzjp4s/tracks", headers={"Accept": "application/json", "Content-Type": "application/json", "Authorization": f"Bearer {token}"})
        items = dance.json()['items']
        calm_preview = random.choice([item['track']['preview_url'] for item in items])
        webbrowser.open(f'{calm_preview}')
    else:
        artist_ids = []
        genre_1 = random.choice(list(intersection))
        for artist, genre in artist_id_genres.items():
            if genre_1 in genre:
                artist_ids.append(artist)
        artist_choice = random.choice(artist_ids)
        calm_preview = random.choice(artist_id_song_urls[f'{artist_choice}'])
        webbrowser.open(f'{calm_preview}')

elif classification == "folk":
    intersection = set.intersection(genres,set(folk))
    if not intersection:
        folk = requests.get("https://api.spotify.com/v1/playlists/05TCeJu3VgY2EKcIhq6qfy/tracks", headers={"Accept": "application/json", "Content-Type": "application/json", "Authorization": f"Bearer {token}"})
        items = dance.json()['items']
        folk_preview = random.choice([item['track']['preview_url'] for item in items])
        webbrowser.open(f'{folk_preview}')
    else:
        artist_ids = []
        genre_1 = random.choice(list(intersection))
        for artist, genre in artist_id_genres.items():
            if genre_1 in genre:
                artist_ids.append(artist)
        artist_choice = random.choice(artist_ids)
        folk_preview = random.choice(artist_id_song_urls[f'{artist_choice}'])
        webbrowser.open(f'{folk_preview}')