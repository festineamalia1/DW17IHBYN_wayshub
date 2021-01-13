import React from "react";
import Profil from "assets/images/profil.png";

export default function ProfilCreator({ chanelName , photo}) {
  return (
    <>
      
        <img
          src={`http://localhost:5000/uploads/${photo}`}
          alt="Buku1"
          className="ft-creator"
        />
      
      <div className="col">
        <div className="row ml-1">
          <h4>{chanelName}</h4>
        </div>
        <div className="row ml-1">
          <span>15K Subscriber</span>
        </div>
      </div>
    </>
  );
}
