import React, { useContext } from "react";
import { ListGroup, Nav, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "assets/images/logo.png";
import {creator} from "fakeData/creator";
import Subcrib from "assets/images/subcrib.svg";
import { API } from "config/api";
import { TaskContext } from "../context/TaskContext";
import { useQuery, useMutation } from "react-query";
import ListChanel from "components/ListChanel";

const SideBar = () => {
 
 return (
   <Nav
     defaultActiveKey="/home"
     className="flex-column bg-secondary sidenav"
     style={{
       backgroundColor: "#FF7A00",
     }}
   >
     <div className="row pl-5 mb-4">
       <img src={Logo} alt="logo" className="logonav" />
     </div>

     <Nav.Link className="row pl-5" href="/home">
       <div className="row">
         <div className="col-sm-2">
           <svg
             width="24.98px"
             height="25px"
             viewBox="0 0 16 16"
             class="bi bi-house-door"
             fill="#FFFFFF"
             xmlns="http://www.w3.org/2000/svg"
           >
             <path
               fill-rule="evenodd"
               d="M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4h3.5V7.707L8 2.207l-5.5 5.5z"
             />
             <path
               fill-rule="evenodd"
               d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
             />
           </svg>
         </div>
         <div className="col">Home</div>
       </div>
     </Nav.Link>
     <Nav.Link className="row pl-5" href="/subcrib">
       <div className="row">
         <div className="col-sm-2">
           <img src={Subcrib} className="" alt="Buku1" />
         </div>
         <div className="col">Subcribtion</div>
       </div>
     </Nav.Link>
     <div className="row pl-5 mt-4 mb-4">
       <h5
         style={{
           color: "#FF7A00",
         }}
       >
         Chanel
       </h5>
     </div>
  <ListChanel/>
   </Nav>
 );
};

export default SideBar;
