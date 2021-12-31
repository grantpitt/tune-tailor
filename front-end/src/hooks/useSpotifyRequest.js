import axios from "axios";

function useSpotifyRequest(access, setAccess, refresh) {

  async function request(url) {
    let headers = {
      Authorization: "Bearer " + access.current,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    try {
      let response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      const status = error?.response?.status || 404;
      if (status === 401) {
        return await refreshAccess(() => request(url));
      } else {
        console.log(error.response);
      }
    }
  }

  async function refreshAccess(callback) {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/spotify/refresh-token`, { params: { refresh_token: refresh.current }})
      const updatedAccess = res.data.access_token;
      setAccess(updatedAccess);
      return await callback();
    } catch (error) {
      console.error(error);
    } 
  }

  return request

}

export default useSpotifyRequest;
