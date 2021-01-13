import React, { useContext } from "react";
import SideBar from "components/SideBar";
import NavBar from "components/NavBar";
import FormVideo from "components/FormVideo";

import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Jumbotron, Button } from "react-bootstrap";

export default function AddVideo() {
  return (
    <div className="row mt-4">
      <div className="col-2">
        <SideBar />
      </div>
      <div className="col">
        <div className="row">
          <div>
            <NavBar />
          </div>
        </div>
        <div className="row mt-5">
          <h1 className=" mt-4">Add Video</h1>
        </div>
        <div className="row mt-3">
          <div className="col">
            <FormVideo />
          </div>
        </div>
      </div>
    </div>
  );
}
