import axios from "axios";

function useSpotify(access) {

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
      } else {
        console.log(error.response);
      }
    }
  }

  return { request }

}

export default useSpotify;
