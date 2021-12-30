import requests

classification = "dance"
token = '123'
# get current users' top tracks
users_top = requests.get("https://api.spotify.com/v1/me/top/tracks?time_range=medium_term", headers={
                         "Accept": "application/json", "Content-Type": "application/json", "Authorization": f"Bearer {token}"})
users_playlists = requests.get("https://api.spotify.com/v1/me/playlists", headers={
                               "Accept": "application/json", "Content-Type": "application/json", "Authorization": f"Bearer {token}"})

# isolate track id for each top song
items = users_top.json()['items']
top_songs_id = [item['uri'].split(':')[2] for item in items]
artist_id_song_urls = {}

playlist_id = []
other_items = users_playlists.json()['items'][:5]
for i in range(5):
    playlist_id.append(other_items[i]['id'])

artist_id = []
urls = []
for id in playlist_id:
    songs = requests.get(f"https://api.spotify.com/v1/playlists/{id}/tracks", headers={
        "Accept": "application/json", "Content-Type": "application/json", "Authorization": f"Bearer {token}"})
    for item in songs.json()['items']:
        items.append(item['track']['album'])
        urls.append(item['track']['preview_url'])

# create dictionary with artist ids as keys and preview urls for their songs as values
for i, item in enumerate(items):
    artist_id = (item['artists'][0]['id'])
    if i < len(top_songs_id):
        preview_url = item['uri']
    else:
        j = i-len(top_songs_id)
        preview_url = urls[j]
        if artist_id not in artist_id_song_urls:
            artist_id_song_urls[artist_id] = []
    artist_id_song_urls[artist_id].append(preview_url)
