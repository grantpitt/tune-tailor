import axios from "axios";

function spotifyRequest(access, setAccess, refresh) {

  async function request(url) {
    let headers = {
      Authorization: "Bearer " + access,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      let response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      const status = error?.response?.status || 404;
      if (status === 401) {
        // refresh Access Token
        console.log("Refreshing access token");
        await refreshAccess(() => refreshAccess(url));
      } else {
        console.log(error.response);
      }
    }
  }

  async function refreshAccess(callback) {
    try {
      const res = await axios.get("/api/spotify/refresh-token", { params: { refresh_token: refresh }})
      const updatedAccess = res.data.access_token;
      setAccess(updatedAccess);
      callback();
    } catch (error) {
      console.error(error);
    } 
  }

  return request

}

export default spotifyRequest;
