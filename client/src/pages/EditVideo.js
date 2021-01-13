
import React, { useContext } from "react";
import SideBar from "components/SideBar";
import NavBar from "components/NavBar";
import FormEditvideo from "components/FormEditvideo";

import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Jumbotron, Button } from "react-bootstrap";

export default function EditVideo() {
  return (
    <div className="row mt-4">
      <div className="col-2">
        <SideBar />
      </div>
      <div className="col-10">
        <div className="row">
          <div>
            <NavBar />
          </div>
        </div>
        <div className="row mt-5">
          <h1 className="pl-5 mt-4">Edit Channel</h1>
        </div>
        <div className="row mt-3">
          <div className="col pl-5">
            <FormEditvideo />
          </div>
        </div>
      </div>
    </div>
  );
}
