import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import fetchWeather from "../api/fetchWeather";
import CenteredSpinner from "./CenteredSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

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

  const makeWeatherJsonData = () => {
    const data = {
      date: localDateAndTime(weatherData?.list[0].dt),
      city: `${selectedCity.name}, ${selectedCity.state}, ${selectedCity.country}`,
      temperature: Math.round(weatherData?.list[0].main.temp),
      weather: weatherData?.list[0].weather[0].main,
      description: weatherData?.list[0].weather[0].description,
      feels_like_temperature: Math.round(weatherData?.list[0].main.feels_like),
      humidity: weatherData?.list[0].main.humidity,
      visibility: weatherData?.list[0].visibility,
    };
    return data;
  };

  const handleExportClick = () => {
    const dataToday = makeWeatherJsonData();
    const jsonData = JSON.stringify(dataToday, null, 2);

    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `weather_today_${selectedCity.name}_${selectedCity.state}_${selectedCity.country}.json`;

    a.click();
    URL.revokeObjectURL(url);
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
                <Col xs={4} md={4} className="p-1">
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
              <Row className="font-weight-bold">
                {weatherData?.list[0].weather[0].main}, {weatherData?.list[0].weather[0].description}
              </Row>
              <Row>Feels like: {Math.round(weatherData?.list[0].main.feels_like)}°C</Row>
              <Row>Humidity: {weatherData?.list[0].main.humidity}%</Row>
              <Row>Visibility: {weatherData?.list[0].visibility / 1000} Km</Row>
              <Row className="m-3">
                <Button size="sm" variant="outline-primary" onClick={handleExportClick}>
                  Export as JSON
                  <FontAwesomeIcon icon={faDownload} className="pl-2" />
                </Button>
              </Row>
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
