import React, { useState, useContext } from "react";
import { TaskContext } from "context/TaskContext";
import PageTitle from "components/Title";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import {Link } from "react-router-dom";

const LoginPage = () => {
const [state, dispatch] = useContext(TaskContext);
  console.log(state);
  const handleLogin = () => {
    dispatch({
      type:"LOGIN",
    });
  };
  return (
    <Container className="landing">
      <Row noGutters style={{ width: "100%" }}>
        <PageTitle />

        <Col>
          <Row>
            <div class="card bg-secondary profile-container">
              <div class="card-body">
                <div class="row">
                  <div
                    class="d-flex justify-content-start align-items-center"
                    style={{
                      marginLeft: "28px",
                      marginBottom: "28px",
                    }}
                  >
                    <div>
                      <h1>Sign In</h1>
                    </div>
                  </div>
                </div>
                <div
                  className="row"
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  <div class="d-flex justify-content-start align-items-center">
                    <Form>
                      <Form.Group controlId="Email">
                        <Form.Control
                          type="text"
                          name="Email"
                          required
                          placeholder="Email"
                        />
                      </Form.Group>
                      <Form.Group controlId="Password">
                        <Form.Control
                          type="password"
                          name="Password"
                          required
                          placeholder="Password"
                        />
                      </Form.Group>
                      <Link to="/home">
                        <Button
                          type="submit"
                          style={{
                            backgroundColor: "#FF7A00",
                            border: "none",
                            color: "#FFFFFF",
                            width: "350px",
                            height: "50px",
                            borderRadius: "5px",
                            marginTop: "28px",
                          }}
                          onClick={handleLogin}
                        >
                          Sign In
                        </Button>
                      </Link>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default LoginPage;