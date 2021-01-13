import React, { useState, useRef, useContext } from "react";
import { Container, Row, Col, Button, Form, Navbar, Nav, NavDropdown, ListGroup, Overlay, Tooltip} from "react-bootstrap";
import { Link } from "react-router-dom";
import { TaskContext } from "context/TaskContext";
import Profil from "assets/images/usernav.png";
import Logout from "assets/images/logout.svg";
import { API } from "config/api";
import { useHistory } from "react-router-dom";

import { useQuery, useMutation } from "react-query";
export default function NavBar(props) {
  const [title, setTitle] = useState("");
  const history = useHistory();
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const [state, dispatch] = useContext(TaskContext);
    
    const { id } = state.user;

    const { isLoading, error, data: chanels } = useQuery(
      "getDetChanel",
      async () => {
        const { data } = await API.get(`chanels/${id}`);
        const chanels = data.data;

        return chanels;
      }
    );
  return isLoading || !chanels.chanels ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>error {error.message} </h1>
  ) : (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        style={{
          backgroundColor: "#0B0B0B",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
        }}
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <div style={{ marginTop: 20, marginLeft: 250, width: "550px" }}>
              <Form>
                <Form.Group controlId="Search">
                  <Form.Row>
                   
                      <Form.Control
                        type="text"
                        name="Search"
                        required
                        placeholder="Search"
                       
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onClick={() => {
                          history.push({
                            pathname: "/search",
                            state: {
                              query: title,
                            },
                          });
                        }}
                      />
                  
                   
                  </Form.Row>
                </Form.Group>
              </Form>
            </div>
          </Nav>
          <Nav>
            <Nav.Link href="/addvideo">
              <div className="row">
                <div className="col-sm-3">
                  <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 16 16"
                    class="bi bi-camera-reels"
                    fill="#FFFFFF"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M0 8a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8zm11.5 5.175l3.5 1.556V7.269l-3.5 1.556v4.35zM2 7a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M9 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                    />
                  </svg>
                </div>
                <div className="col">Add Video</div>
              </div>
            </Nav.Link>
            {/*
            <Button ref={target} onClick={() => setShow(!show)}>
              ...
            </Button>
            */}
            <img
              src={`http://localhost:5000/uploads/${chanels.chanels.photo}`}
              alt="Buku1"
              ref={target}
              onClick={() => setShow(!show)}
              className="ft-setting"
            />
            <Overlay target={target.current} show={show} placement="bottom">
              {(props) => (
                <Tooltip id="overlay-example" {...props}>
                  {/*   <ListGroup>
                    <Link to="/mychanel">
                      <ListGroup.Item
                        action
                        style={{
                          backgroundColor: "black",
                          color: "white",
                        }}
                      >
                        My Chanel
                      </ListGroup.Item>
                    </Link>
                    <ListGroup.Item
                      action
                      style={{
                        backgroundColor: "black",
                        color: "white",
                      }}
                      onClick={() =>
                        dispatch({
                          type: "LOGOUT",
                        })
                      }
                    >
                      Logout
                    </ListGroup.Item>
                    </ListGroup> */}
                  <Nav style={{ color: "white" }}>
                    <Nav.Link href="/mychanel">
                      <div className="row">
                        <div className="col-sm-2">
                          <svg
                            width="24.98px"
                            height="25px"
                            viewBox="0 0 16 16"
                            class="bi bi-person"
                            fill="#FFFFFF"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                            />
                          </svg>
                        </div>
                        <div
                          className="col"
                          style={{
                            color: "#FFFFFF",
                          }}
                        >
                          My Chanel
                        </div>
                      </div>
                    </Nav.Link>
                    <Nav.Link
                      onClick={() =>
                        dispatch({
                          type: "LOGOUT",
                        })
                      }
                    >
                      <div className="row">
                        <div className="col-sm-2">
                          <img src={Logout} className="" alt="Buku1" />
                        </div>
                        <div
                          className="col"
                          style={{
                            color: "#FFFFFF",
                          }}
                        >
                          Log Out
                        </div>
                      </div>
                    </Nav.Link>
                  </Nav>
                </Tooltip>
              )}
            </Overlay>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
