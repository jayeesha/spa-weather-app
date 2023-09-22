import React, { useState } from "react";
import { Form, InputGroup, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import fetchCity from "../api/fetchCity";

function MainView() {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    const data = await fetchCity(query);
    setCities(data);
    setQuery("");
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="main-container ">
      <InputGroup className="mb-3 w-50">
        <Form.Control
          placeholder="Weather of your City"
          className="rounded-pill m-1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button variant="primary" className="rounded-pill m-1" onClick={search}>
          <FontAwesomeIcon icon={faSearch} /> Search
        </Button>
      </InputGroup>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        cities.length > 0 && (
          <div className="city">
            {cities.map((city) => (
              <div>
                <p className="city-name">
                  {city.name}, {city.state}, {city.country}
                </p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default MainView;
