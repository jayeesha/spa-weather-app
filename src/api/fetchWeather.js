import axios from "axios";
const url = "http://api.openweathermap.org/data/2.5/forecast";
const key = process.env.REACT_APP_OPEN_WEATHER_MAP_KEY;

const fetchWeather = async (latitude, longitude) => {
  const { data } = await axios.get(url, {
    params: {
      lat: latitude,
      lon: longitude,
      units: "metric",
      APPID: key,
    },
  });
  return data;
};

export default fetchWeather;
