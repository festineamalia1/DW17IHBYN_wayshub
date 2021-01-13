import React, { useState, useContext } from "react";
import { TaskContext } from "context/TaskContext";

import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { API } from "config/api";

import { useQuery, useMutation } from "react-query";
const SignupForm = () => {
  const { id } = useParams();
    const { refetch } = useQuery("getAllChanel", () => API.get("/chanels"));
     const [formData, setFormData] = useState({
       email: "",
       password: "",
       chanelName: "",
       description: "",
     });
      const { email, password, chanelName, description } = formData;
       const handleChange = (e) => {
         setFormData({ ...formData, [e.target.name]: e.target.value });
       };

        const [signup] = useMutation(async () => {
          try {
            const config = {
              headers: {
                "Content-Type": "application/json",
              },
            };
            const body = JSON.stringify({
              email,
              password,
              chanelName,
              description,
            });
            const res = await API.post(`/register`, body, config);

            setFormData({
              email: "",
              password: "",
              chanelName: "",
              description: "",
            });

            return res;
          } catch (error) {
            console.log(error);
          }
        });
  return (
    <Col>
      <Row>
        <Modal.Dialog>
          <Modal.Body style={{ backgroundColor: "#161616" }}>
            <div
              style={{
                marginBottom: "28px",
              }}
            >
              <h1>Sign Up</h1>
            </div>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                signup();
                refetch();
              }}
            >
              <Form.Group controlId="Email">
                <Form.Control
                  type="text"
                  name="email"
                  value={email}
                  required
                  placeholder="Email"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group controlId="Email">
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  required
                  placeholder="Password"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group controlId="Nama Chanel">
                <Form.Control
                  type="text"
                  name="chanelName"
                  required
                  placeholder="Nama Chanel"
                  value={chanelName}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group controlId="Description Chanel">
                <Form.Control
                  as="textarea"
                  name="description"
                  value={description}
                  required
                  placeholder="Description Chanel"
                  onChange={(e) => handleChange(e)}
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
          </Modal.Body>
        </Modal.Dialog>
      </Row>
    </Col>
  );
};
export default SignupForm;
