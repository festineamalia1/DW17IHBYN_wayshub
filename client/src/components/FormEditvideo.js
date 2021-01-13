import React, { useState, useContext } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { API } from "config/api";
import { useQuery, useMutation } from "react-query";
import { TaskContext } from "../context/TaskContext";
const FormChanel = () => {
  const [state] = useContext(TaskContext);
  const chanelId = state.user.id;
   const { isLoading, error, data, refetch } = useQuery("getDetail", () =>
     API.get(`/chanels/${chanelId}`)
   );
   const [formData, setFormData] = useState({
     chanelName: "",
     thumbnail: "",
     description: "",
     photo: "",
    
   });
   const [previewSrc, setPreviewSrc] = useState(null);
    const { chanelName, thumbnail, description, photo } = formData;
     const handleChange = (event) => {
       const updateForm = { ...formData };
       updateForm[event.target.name] =
         event.target.type === "file"
           ? event.target.files[0]
           : event.target.value;
       setFormData(updateForm);
     };
     const onChangeFiles = (e) => {
       let fileInfo = e.target.files[0];

       let reader = new FileReader();

       if (e.target.files.length === 0) {
         return;
       }

       reader.onloadend = (e) => {
         setPreviewSrc([reader.result]);
       };

       reader.readAsDataURL(fileInfo);
     };
      console.log(formData);
      const [
        tambah,
        { isLoading: isLoadingMutation, error: erorMutation },
      ] = useMutation(async () => {
        try {
          const formData = new FormData();

          formData.append("chanelName", chanelName);
          formData.append("thumbnail", thumbnail);
          formData.append("description", description);
          formData.append("photo", photo);
         
          const config = {
            headers: {
              "content-type": "multipart/form-data",
            },
          };

          const res = await API.patch(`/chanels/${chanelId}`, formData, config);

          setFormData({
            chanelName: "",
            thumbnail: "",
            description: "",
            photo: "",
            
          });

          return res;
        } catch (error) {
          console.log(error);
        }
      });

   return isLoading ? (
     <h1>Loading...</h1>
   ) : error ? (
     <h1>error {error.message} </h1>
   ) : (
     <Col>
       <Form
         onSubmit={(e) => {
           e.preventDefault();
           tambah();
           refetch();
         }}
       >
         <Form.Group>
           <Form.Row>
             <Col>
               <Form.Control
                 placeholder={data.data.data.chanels.chanelName}
                 type="text"
                 class="form-control"
                 name="chanelName"
                 value={chanelName}
                 onChange={(e) => handleChange(e)}
               />
             </Col>
             <Col>
               <Form.Group>
                 {/*  <div
                   className="form-control"
                   style={{ width: "max-content", cursor: "pointer" }}
                 >
                   <div
                     style={{
                       alignItems: "center",
                     }}
                   >
                     Upload Cover&nbsp;
                     <svg
                       width="1em"
                       height="1em"
                       viewBox="0 0 16 16"
                       class="bi bi-file-image"
                       fill="#FF7A00"
                       xmlns="http://www.w3.org/2000/svg"
                     >
                       <path
                         fill-rule="evenodd"
                         d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V2a1 1 0 0 0-1-1H4z"
                       />
                       <path
                         fill-rule="evenodd"
                         d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                       />
                     </svg>
                   </div>
                 </div>*/}
                 <Form.File
                   name="thumbnail"
                   className="form-control"
                   accept="image/*"
                   onChange={(e) => {
                     handleChange(e);
                     onChangeFiles(e);
                   }}
                   // style={{ display: "none" }}
                 />
               </Form.Group>
             </Col>
           </Form.Row>
         </Form.Group>

         <Form.Group controlId="exampleForm.ControlTextarea1">
           <Form.Control
             as="textarea"
             rows="3"
             placeholder={data.data.data.chanels.description}
             name="description"
             value={description}
             onChange={(e) => handleChange(e)}
           />
         </Form.Group>
         <Form.Group>
          {/* <div
             className="form-control"
             style={{ width: "max-content", cursor: "pointer" }}
           >
             <div
               style={{
                 alignItems: "center",
               }}
             >
               Upload Photo&nbsp;
               <svg
                 width="1em"
                 height="1em"
                 viewBox="0 0 16 16"
                 class="bi bi-file-image"
                 fill="#FF7A00"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path
                   fill-rule="evenodd"
                   d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V2a1 1 0 0 0-1-1H4z"
                 />
                 <path
                   fill-rule="evenodd"
                   d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                 />
               </svg>
             </div>
           </div>*/}
           <Form.File
             className="form-control"
             name="photo"
             onChange={(e) => {
               handleChange(e);
               onChangeFiles(e);
             }}
           />
         </Form.Group>

         <Button
           variant="primary"
           size="lg"
           block
           style={{
             backgroundColor: "#FF7A00",
           }}
           type="submit"
         >
           Save
         </Button>
       </Form>
     </Col>
   );
};

export default FormChanel;