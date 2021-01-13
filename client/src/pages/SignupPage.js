import React from "react";

import PageTitle from "components/Title";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
const SignupPage = () => {
  return (
    <Container className="landing">
      <Row noGutters style={{ width: "100%" }}>
        <PageTitle />
        <Link to="/">
          <Button
            variant="primary"
            className="btn btn-primary btn-lg"
            style={{
              marginLeft: "100px",
              backgroundColor: "#FF7A00",
              border: "none",
              color: "#FFFFFF",
              width: "150px",
              height: "40px",
            }}
          >
            Sign In
          </Button>
        </Link>
        <Col>
          <Row>
            <div class="card bg-secondary sign-container">
              <div class="card-body">
                <div class="row">
                  <div
                    class="d-flex justify-content-start align-items-center"
                    style={{
                      marginLeft: "28px",
                    }}
                  >
                    <div>
                      <h1>Sign Up</h1>
                    </div>

                    <Form>
                      <Form.Group controlId="Email">
                        <Form.Control
                          type="text"
                          name="Email"
                          required
                          placeholder="Email"
                          style={{
                            height: "50px",
                            marginBottom: "20px",
                            borderRadius: "10px",
                            width: "350px",
                          }}
                        />
                      </Form.Group>
                      <Form.Group controlId="Email">
                        <Form.Control
                          type="password"
                          name="Password"
                          required
                          placeholder="Password"
                          style={{
                            height: "50px",
                            marginBottom: "20px",
                            borderRadius: "10px",
                            width: "350px",
                          }}
                        />
                      </Form.Group>
                      <Form.Group controlId="Nama Chanel">
                        <Form.Control
                          type="text"
                          name="Nama Chanel"
                          required
                          placeholder="Nama Chanel"
                          style={{
                            height: "50px",
                            marginBottom: "20px",
                            borderRadius: "10px",
                            width: "350px",
                          }}
                        />
                      </Form.Group>
                      <Form.Group controlId="Description Chanel">
                        <Form.Control
                          as="textarea"
                          name="Description Chanel"
                          required
                          placeholder="Description Chanel"
                          style={{
                            height: "122px",
                            marginBottom: "40px",
                            borderRadius: "10px",
                            width: "350px",
                          }}
                        />
                      </Form.Group>
                      {/* <Link to="/index"> */}
                      <Button
                        type="submit"
                        style={{
                          backgroundColor: "#FF7A00",
                          border: "none",
                          color: "#FFFFFF",
                          width: "350px",
                          height: "50px",
                          borderRadius: "5px",
                        }}
                      >
                        Sign Up
                      </Button>
                      {/* </Link> */}
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
export default SignupPage;
