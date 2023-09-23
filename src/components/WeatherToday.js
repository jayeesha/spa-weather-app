import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import fetchWeather from "../api/fetchWeather";
import CenteredSpinner from "./CenteredSpinner";

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

  const localDateAndTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);

    const dateOptions = { month: "short", day: "numeric" };
    const localDate = date.toLocaleDateString("en-US", dateOptions);
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: false };
    const localTime = date.toLocaleTimeString("en-US", timeOptions);
    return `${localDate}, ${localTime}`;
  };

  return (
    <div>
      <Modal show={true} onHide={handleCloseModal}>
        <Modal.Header closeButton={false} className="centered-modal-header">
          <Modal.Title>
            {selectedCity.name}, {selectedCity.state}, {selectedCity.country}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <CenteredSpinner />
          ) : (
            <div className="weather-container">
              <div className="city-date">{localDateAndTime(weatherData?.list[0].dt)}</div>
              <Row>
                <Col xs={6} md={6} className="p-1">
                  <img
                    className="city-icon"
                    src={`http://openweathermap.org/img/w/${weatherData?.list[0].weather[0].icon}.png`}
                    alt={weatherData?.list[0].weather[0].description}
                  ></img>
                </Col>
                <Col xs={6} md={6} className="p-1">
                  <div className="city-temp">{Math.round(weatherData?.list[0].main.temp)}°C</div>
                </Col>
              </Row>
              <Row className="pl-3">Feels like: {Math.round(weatherData?.list[0].main.feels_like)}°C</Row>
              <Row className="pl-3">Humidity: {weatherData?.list[0].main.humidity}%</Row>
              <Row className="pl-3">Visibility: {weatherData?.list[0].visibility / 1000} Km</Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default WeatherToday;
