import React, { useState, useContext } from "react";
import { TaskContext } from "context/TaskContext";
import Login from "components/LoginForm";
import Signup from "components/SignupForm";
import Logo from "assets/images/title.png";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginPage = () => {
  

 
  const [isLoginPg, setLoginPg] = useState(true);
  const handleLoginPg= () =>{
    (isLoginPg === true)? setLoginPg(false):setLoginPg(true)
  }
  return (
    <Container className="landing">
      <Row noGutters style={{ width: "100%" }}>
        <Col md={5}>
          <img
            src={Logo}
            alt="logo"
            className="logo-title"
            style={{ width: "387px", height: "294px" }}
          />
        
          <br />
          <br />
          <Button
            variant="primary"
            className="btn btn-primary btn-lg"
            style={{
              backgroundColor: "#FF7A00",
              border: "none",
              color: "#FFFFFF",
              width: "150px",
            }}
            onClick={handleLoginPg}
          >
            {isLoginPg === true ? "Sign Up" : "Sign In"}
          </Button>
        </Col>
        {isLoginPg ? <Login /> : <Signup />}
      </Row>
    </Container>
  );
};
export default LoginPage;
