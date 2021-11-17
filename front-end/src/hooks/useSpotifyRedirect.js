import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useLocalState from "./useLocalState";

function useSpotifyRedirect() {
  const history = useHistory();
  const [access, setAccess] = useLocalState("access", null);
  const [refresh, setRefresh] = useLocalState("refresh", null);
  const [name, setName] = useLocalState("name", null);
  const [id, setId] = useLocalState("id", null);

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

    if (access === null) {
      history.push("/");
    }
  }, [history, setAccess, setRefresh, setId, setName, access]);

  return { access, refresh, name, id };
}

export default useSpotifyRedirect;
