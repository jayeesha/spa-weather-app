import React, { useState, useEffect } from "react";
import { Spinner, Modal, Button } from "react-bootstrap";
import fetchWeather from "../api/fetchWeather";

function WeatherToday({ selectedCity, handleCloseModal }) {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    setLoading(true);
    const data = await fetchWeather(selectedCity.lat, selectedCity.lon);
    setWeatherData(data);
    setLoading(false);
  };

  return (
    <div>
      <Modal show={true} onHide={handleCloseModal}>
        <Modal.Header closeButton={false}>
          <Modal.Title>
            {selectedCity.name}, {selectedCity.state}, {selectedCity.country}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <div>
              {Math.round(weatherData?.list[0].main.temp)}
              <img
                src={`http://openweathermap.org/img/w/${weatherData?.list[0].weather[0].icon}.png`}
                alt={weatherData?.list[0].weather[0].description}
              ></img>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default WeatherToday;
