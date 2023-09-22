import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import fetchCity from "../api/fetchCity";

function SearchBar({ setCities, setLoading }) {
  const [query, setQuery] = useState("");
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
    <div className="search-container w-50">
      <InputGroup className="mb-3 ">
        <Form.Control
          placeholder="Weather in your city"
          className="rounded-pill m-1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button variant="primary" className="rounded-pill m-1" onClick={search}>
          <FontAwesomeIcon icon={faSearch} /> Search
        </Button>
      </InputGroup>
    </div>
  );
}

export default SearchBar;
