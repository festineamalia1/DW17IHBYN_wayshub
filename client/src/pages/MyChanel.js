import React, { useState, useContext } from "react";
import SideBar from "components/SideBar";
import NavBar from "components/NavBar";
import Tabs from "components/Tabs"

import background from "assets/images/background.png";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Image, Jumbotron, Button } from "react-bootstrap";
import Profil from "assets/images/profil.png";
import ProfilUser from "components/ProfilCreator";
import { API } from "config/api";
import { TaskContext } from "../context/TaskContext";
import { useQuery, useMutation } from "react-query";
import TabsContent from "components/TabsContent2";
export default function MyChanel({ current }) {
  const [state, dispatch] = useContext(TaskContext);
  const { chanelName } = state.user;
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
         <div className="row pr-5">
           <img
             src={`http://localhost:5000/uploads/${chanels.chanels.thumbnail}`}
             className="channel"
             alt="Buku1"
             
           />
         </div>

         <div className="row mt-5 pl-4">
           <ProfilUser
             chanelName={chanels.chanels.chanelName}
             photo={chanels.chanels.photo}
           />
           <div className="col-md-3">
             <Link to="/edit">
               <Button
                 variant="primary"
                 className="btn btn-primary btn-lg"
                 style={{
                   backgroundColor: "#FF7A00",
                   border: "none",
                   color: "#FFFFFF",
                   width: "150px",
                   marginLeft: "60px",
                 }}
               >
                 Edit Chanel
               </Button>
             </Link>
           </div>
         </div>

         <div className="row">
           <TabsContent />
         </div>
       </div>
     </div>
   );
}
