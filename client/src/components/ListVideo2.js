import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image1 from "assets/images/thumbnail1.png";
import Image2 from "assets/images/thumbnail2.png";
import Image3 from "assets/images/thumbnail3.png";
import { listvid } from "fakeData/video";
import { Link} from "react-router-dom";
import View from "assets/images/view.png";
import Date from "assets/images/date.png";
const ListVideo2 = () => {
    
  return (
    <div class="list-grid-prof2 mb-3">
      {listvid.map((listvid) => (
        <div>
          <Link to="/detailvid">
            <img src={listvid.foto} alt="Buku1" className="foto" />
          </Link>
          <h1 className="mt-3">{listvid.tittle}</h1>
          <h5>{listvid.name}</h5>

          <span className="mb-3">
            <img src={View} alt="Buku1" />
            &nbsp;
            {listvid.view}
          </span>
          <span className="mb-3">
            <img src={Date} alt="Buku1" />
            &nbsp;
            {listvid.date}
          </span>
        </div>
      ))}
    </div>
  );
};
export default ListVideo2;
