import React from "react";

import { Container, Row, Col, Button, Card } from "react-bootstrap";
import View from "assets/images/view.png";
import Date from "assets/images/date.png";



const CardVideo = ({
  id,
  title,
  chanelName,
  viewCount,
  createdAt,
  thumbnail,
}) => {
 

  
  return (
    <div>
      <Card
        style={{ width: 270, backgroundColor: "#0B0B0B", marginBottom: 15 }}
      >
        <img
          src={`http://localhost:5000/uploads/${thumbnail}`}
          alt="thumbnail"
          className="foto"
          style={{
            width: 270,
            height: 171,
            objectFit: "cover",
          }}
        />

        <h1>{title}</h1>
        <h5>{chanelName}</h5>
        <div className="row">
          <div className="col-md-3">
            <span>
              <img src={View} alt="Buku1" />
              &nbsp;
              {viewCount}
            </span>
          </div>
          <div className="col">
            <span>
              <img src={Date} alt="Buku1" />
              &nbsp;
              {createdAt}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default CardVideo;
