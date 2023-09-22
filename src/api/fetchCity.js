import axios from "axios";
const url = "http://api.openweathermap.org/geo/1.0/direct";
const key = "3afe4fa59adc0784f80533e2f330d6c8";

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
