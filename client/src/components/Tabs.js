import React from "react";

const Tabs = ({ now}) => {
 
  const handleTabs = (ket) => {
    now(ket);
   
  };
  return (
    <div className="row mt-3  pl-4">
      <ul className="tab-item">
        <li onClick={() => handleTabs(true)}>Videos</li>
        <li onClick={() => handleTabs(false)}>Description Chanel</li>
      </ul>
    </div>
  );
};

export default Tabs;
