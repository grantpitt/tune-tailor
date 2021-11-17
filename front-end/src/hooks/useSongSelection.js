import themeGenres from "../assets/theme-genres.json";
import useSpotify from "./useSpotify";
import _ from "lodash";

function useSongSelection(access) {
  const spotify = useSpotify(access);

  async function getSongs() {
    const response = await spotify.request(
      "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=25"
    );
    const songs = response.items;
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
    const artistIds = new Set(songs.map((song) => song.artists[0].id));
    const params = new URLSearchParams({
      ids: [...artistIds],
    });
    const response = await spotify.request(
      `https://api.spotify.com/v1/artists?${params.toString()}`
    );
    const artistGenres = {};
    response.artists.forEach((artist) => {
      artistGenres[artist.id] = artist.genres;
    });
    return artistGenres;
  }

  async function getSongWithTheme(theme) {
    console.log("getting song with theme: ", theme);
    const songs = await getSongs();
    const genres = themeGenres[theme];

    // console.log(songs);
    // let i = 0;
    // for (let song of songs) {
    //   console.log(++i, "=> ", _.intersection(song.genres, genres));
    // }
    // console.log(_.intersection(songs[0].genres, genres));
    // console.log(theme);
    // console.log(genres);

    return _.maxBy(
      _.shuffle(songs),
      (song) => _.intersection(song.genres, genres).length
    );
  }

  return { getSongWithTheme };
}

export default useSongSelection;
