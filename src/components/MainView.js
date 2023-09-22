import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function MainView() {
  const search = async () => {};

  return (
    <div className="main-container ">
      <InputGroup className="mb-3 w-50">
        <Form.Control placeholder="Weather of your City" className="rounded-pill m-1" />
        <Button variant="primary" className="rounded-pill m-1" onClick={search}>
          <FontAwesomeIcon icon={faSearch} /> Search
        </Button>
      </InputGroup>
    </div>
  );
}

export default MainView;
