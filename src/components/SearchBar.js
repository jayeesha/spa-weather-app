import React, { useState } from "react";
import { Form, InputGroup, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import fetchCity from "../api/fetchCity";

function SearchBar({ setCities, setLoading }) {
  const [query, setQuery] = useState("");
  const [showNotFound, setShowNotFound] = useState(false);
  const [error, catchError] = useState(false);

  const search = async () => {
    setLoading(true);
    setShowNotFound(false);
    catchError(false);
    try {
      const data = await fetchCity(query);
      if (data.length === 0) {
        setShowNotFound(true);
      }
      setCities(data);
    } catch (error) {
      catchError(error);
    }
    setQuery("");
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };
  return (
    <div className="search-container">
      <InputGroup className="mb-3 ">
        <Form.Control
          placeholder="Weather in your city e.g London"
          className="rounded-pill m-1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button variant="primary" className="rounded-pill m-1" onClick={search}>
          <FontAwesomeIcon icon={faSearch} /> Search
        </Button>
      </InputGroup>
      {showNotFound && <Alert variant="warning">Not found</Alert>}
      {error && <Alert Variant="error">Something went wrong. Please try again...</Alert>}
    </div>
  );
}

export default SearchBar;
