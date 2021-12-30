import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useLocalRef from "./useLocalRef";
import useLocalState from "./useLocalState";
import useSongSelection from "./useSongSelection";
import useSpotifyRequest from "./useSpotifyRequest";

function useSpotify() {
  const history = useHistory();
  const [access, setAccess] = useLocalRef("access", null);
  const [refresh, setRefresh] = useLocalRef("refresh", null);
  const [name, setName] = useLocalState("name", null);
  const [id, setId] = useLocalRef("id", null);

  const request = useSpotifyRequest(access, setAccess, refresh);
  const { getSongWithTheme } = useSongSelection(request);

  useEffect(() => {
    console.log("running useSpotifyRedirect");

    const queryString = window.location.search;
    if (queryString.length > 0) {
      const urlParams = new URLSearchParams(queryString);
      setAccess(urlParams.get("access"));
      setRefresh(urlParams.get("refresh"));
      setName(urlParams.get("name"));
      setId(urlParams.get("id"));

      window.history.replaceState(null, "", "http://localhost:3000/profile");
    }

    if (access.current === null) {
      history.push("/");
    }
  }, [history, setAccess, setRefresh, setId, setName, access]);

  return {
    access: access.current,
    refresh: refresh.current,
    name: name,
    id: id.current,
    getSongWithTheme,
  };
}

export default useSpotify;
