import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Logo from "assets/images/logo.png";
import { Link } from "react-router-dom";
const Title = () => {
  return (
    <Col md={5}>
      <img src={Logo} alt="logo" className="logo-title" />
      <h1>
        <strong>&#38; Chill</strong>
      </h1>
      <p>Join now, share your creations with another</p>
      <p>people and enjoy other creations</p>
      <br />
      <Link to="/signup">
        <Button
          variant="primary"
          className="btn btn-primary btn-lg"
          style={{
            backgroundColor: "#FF7A00",
            border: "none",
            color: "#FFFFFF",
            width: "150px",
            height: "40px",
          }}
        >
          Sign Up
        </Button>
      </Link>
    </Col>
  );
};
export default Title;