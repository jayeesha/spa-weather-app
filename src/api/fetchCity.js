import axios from "axios";
const url = process.env.REACT_APP_OPEN_WEATHER_MAP_URL + "/geo/1.0/direct";
const key = process.env.REACT_APP_OPEN_WEATHER_MAP_KEY;

const fetchCity = async (query) => {
  const { data } = await axios.get(url, {
    params: {
      q: query,
      limit: 5,
      APPID: key,
    },
  });
  return data;
};

export default fetchCity;
