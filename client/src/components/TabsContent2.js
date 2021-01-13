import React, { useState, useContext } from "react";
import ChanelContent from "components/ChanelContent";
import ListVid from "components/CardVideo";
import Tabs from "components/Tabs";
import { API } from "config/api";
import { TaskContext } from "../context/TaskContext";
import { useQuery, useMutation } from "react-query";
import { Link, useParams } from "react-router-dom";
const TabsContent = () => {
    const [isListVid, setListVid] = useState(true);

    const handleTabs = (ket) => {
      setListVid(ket);
    };
    const [state, dispatch] = useContext(TaskContext);
   const { id } = state.user;
   
   const { isLoading, error, data: chanels } = useQuery(
     "getdes",
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
     <div className="col pl-4">
       <Tabs now={(status) => handleTabs(status)} isListVid={isListVid} />
       <hr
         style={{
           backgroundColor: "#C2C2C2",
         }}
       ></hr>
       {isListVid ? (
         <div class="list-grid-prof">
         <ListVid
           id={chanels.chanels.video[0].id}
           thumbnail={chanels.chanels.video[0].thumbnail}
           title={chanels.chanels.video[0].title}
           chanelName={chanels.chanels.chanelName}
           viewCount={chanels.chanels.video[0].viewCount}
           createdAt={chanels.chanels.video[0].createdAt}
         />
         </div>
       ) : (
         <ChanelContent description={chanels.chanels.description} />
       )}
     </div>
   );
};
export default TabsContent;