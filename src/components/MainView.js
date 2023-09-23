import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import SearchBar from "./SearchBar";
import CityList from "./CityList";
import CenteredSpinner from "./CenteredSpinner";

function MainView() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="main-container ">
      <SearchBar setCities={setCities} setLoading={setLoading} />
      {loading ? (
        <CenteredSpinner />
      ) : (
        <div className="result-container w-50">
          <CityList cities={cities} />
        </div>
      )}
    </div>
  );
}

export default MainView;
