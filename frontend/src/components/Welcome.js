import React from "react";
import { Button } from "react-bootstrap";

const Welcome = () => (
  <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <h1 className="display-4">Fluid jumbotron</h1>
      <p className="lead">
        This is a simple application that retrieves photos using unsplash API.
        In order to start, enter any search term in the input field{" "}
      </p>
      <Button variant="primary" href="https://unsplash.com" target="_blank">
        {" "}
        Learn More{" "}
      </Button>
    </div>
  </div>
);

export default Welcome;
