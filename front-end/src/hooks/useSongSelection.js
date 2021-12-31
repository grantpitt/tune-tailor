import themeGenres from "../assets/theme-genres.json";
import _ from "lodash";

function useSongSelection(request) {

  async function getPlaylistTracks() {
    const response = await request(
      "https://api.spotify.com/v1/me/playlists?limit=5"
    );
    const playlistUrls = response.items.map((playlist) => playlist.tracks.href);
    const tracks = [];
    await Promise.all(
      playlistUrls.map(async (url) => {
        const res = await request(url + "?limit=50");
        const playlistTracks = res.items.map((item) => item.track);
        tracks.push(...playlistTracks);
      })
    );
    return tracks;
  }

  async function getTopTracks() {
    const response = await request(
      "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50"
    );
    const tracks = response.items;
    return tracks;
  }

  async function compileSongs(songs) {
    const artistGenres = await getArtistGenres(songs);
    return songs.map((song) => {
      const artist = song.artists[0];
      const image = song.album.images[1].url;
      const genres = artistGenres[artist.id];
      return {
        id: song.id,
        name: song.name,
        preview: song.preview_url,
        artistId: artist.id,
        artist: artist.name,
        genres: genres,
        image: image,
      };
    });
  }

  async function getArtistGenres(songs) {
    const artistIds = _.uniq(songs.map((song) => song.artists[0].id));

    const size = artistIds.length;
    const chunkSize = 50; // limit for spotify API endpoint

    const partitionIndices = [];
    for (let i = 0; i < size; i += chunkSize) {
      partitionIndices.push(i);
    }

    const artistGenres = {};
    await Promise.all(
      partitionIndices.map(async (i) => {
        const params = new URLSearchParams({
          ids: artistIds.slice(i, i + chunkSize),
        });
        const response = await request(
          `https://api.spotify.com/v1/artists?${params.toString()}`
        );
        response.artists.forEach((artist) => {
          artistGenres[artist.id] = artist.genres;
        });
      })
    );

    return artistGenres;
  }

  async function getSongWithTheme(theme) {
    const genres = themeGenres[theme];
    const tracks = (
      await Promise.all([getPlaylistTracks(), getTopTracks()])
    ).flat();

    const songs = await compileSongs(tracks);

    // multiply by -1 to sort decending
    const songsByIntersection = _.sortBy(
      _.shuffle(songs),
      (song) => _.intersection(song.genres, genres).length * -1
    );
    const top15 = songsByIntersection.slice(0, 15);
    const songRecomendation = _.sample(top15);

    return songRecomendation;
  }

  return { getSongWithTheme };
}

export default useSongSelection;
