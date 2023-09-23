import React from "react";
import { Spinner } from "react-bootstrap";

function CenteredSpinner() {
  return (
    <div className="spinner-container">
      <Spinner animation="border" variant="primary" role="status" />
    </div>
  );
}

export default CenteredSpinner;
