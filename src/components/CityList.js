import React, { useState } from "react";
import WeatherToday from "./WeatherToday";

function CityList({ cities }) {
  const [selectedCity, setSelectedCity] = useState();
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (city) => {
    setSelectedCity(city);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCity();
    setShowModal(false);
  };

  return (
    <div>
      {cities.length > 0 && (
        <div className="custom-card">
          <p className="font-weight-italic">Select city:</p>
          {cities.map((city) => (
            <div>
              <p className="city-name m-6" onClick={() => handleOpenModal(city)}>
                {city.name}, {city.state}, {city.country}
              </p>
            </div>
          ))}
          {showModal && <WeatherToday selectedCity={selectedCity} handleCloseModal={handleCloseModal} />}
        </div>
      )}
    </div>
  );
}

export default CityList;
