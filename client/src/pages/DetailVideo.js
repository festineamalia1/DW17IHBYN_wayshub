import React, { useState, useContext } from "react";
import SideBar from "components/SideBar";
import NavBar from "components/NavBar";
import ListVideo from "components/ListVideo";
import background from "assets/images/background.png";
import { useParams, Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Jumbotron, Button } from "react-bootstrap";
import Comment from "assets/images/creator1.png";
import ProfilUser from "components/ProfilCreator";
import {comments} from "fakeData/comment";
import ReactPlayer from "react-player";
import {Form} from "react-bootstrap";
import { API } from "config/api";
import { TaskContext } from "../context/TaskContext";
import { useQuery, useMutation } from "react-query";
export default function DetailVideo() {
  const history = useHistory();
   const { id } = useParams();
   
   const [isUnsubcribe, setUnsubcribe] = useState(false);

    const [subcribe] = useMutation((chanelId) =>
      API.post(`/subcribtion/${chanelId}`)
    );

const addSubcribe = () => {
 
  //subcribe(chanelId);
  setUnsubcribe(true);
};

const UnSubcribe = () => {
  //unSubcribe(id);
  setUnsubcribe(false);
};
    
     const { isLoading, error, data: videos, refetch } = useQuery(
       "getDetVideo",
       async () => {
         const { data } = await API.get(`videos/${id}`);
         const videos = data.data;

         return videos;
       }
     );

     const [formData, setFormData] = useState({
       comment: "",
     });
      const { comment } = formData;
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
     const [savecomment] = useMutation(async () => {
       try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const body = JSON.stringify({ comment });
          const res = await API.post(`/videos/${id}/comments`, body, config);

          setFormData({
            comment: "",
            
          });

          return res;
       } catch (error) {
          console.log(error);
       }

     });
     
  return isLoading || !videos.videos ? (
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
        <div className="container">
          <div className="row mt-4">
            <div className="col mt-5 pl-4">
              <div className="row mt-4 pl-4">
                <ReactPlayer
                  width="694px"
                  controls
                  url={`http://localhost:5000/uploads/${videos.videos.video}`}
                />
              </div>
              <div className="row mt-4 pl-4">
                <h3>{videos.videos.title}</h3>
              </div>
              <hr
                style={{
                  backgroundColor: "#C2C2C2",
                }}
              ></hr>
              <div className="row mt-4 pl-4">
                <ProfilUser
                  chanelName={videos.videos.chanels.chanelName}
                  photo={videos.videos.chanels.photo}
                />

                <div className="col-md-3">
                  {isUnsubcribe ? (
                    <Button
                      variant="primary"
                      className="btn btn-primary btn-lg"
                      style={{
                        backgroundColor: "#555555",
                        border: "none",
                        color: "#FFFFFF",
                        width: "150px",
                      }}
                      onClick={() => {
                        UnSubcribe();
                      }}
                    >
                      UnSubscribe
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      className="btn btn-primary btn-lg"
                      style={{
                        backgroundColor: "#FF7A00",
                        border: "none",
                        color: "#FFFFFF",
                        width: "150px",
                      }}
                      onClick={() => {
                        addSubcribe();
                      }}
                    >
                      Subscribe
                    </Button>
                  )}
                </div>
              </div>
              <div className="row mt-4 pl-4 pr-4">
                <p className="text-justify">{videos.videos.description}</p>
              </div>
              <hr
                style={{
                  backgroundColor: "#C2C2C2",
                }}
              ></hr>
              <div className="row mt-4 pl-4 pr-3">
                <div className="col-sm-1">
                  <img
                    src={`http://localhost:5000/uploads/${videos.videos.chanels.photo}`}
                    alt="Buku1"
                    className="photochanel"
                  />
                </div>
                <div className="col">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      savecomment();
                      refetch();
                    }}
                  >
                    <Form.Group controlId="Comment">
                      <Form.Control
                        as="textarea"
                        name="comment"
                        value={comment}
                        required
                        placeholder="Add Comment..."
                        onChange={(e) => handleChange(e)}
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      style={{
                        backgroundColor: "#FF7A00",
                      }}
                      type="submit"
                      onClick={(e) => {
                       
                        savecomment();
                        
                      }}
                    >
                      comment
                    </Button>
                  </Form>
                </div>
              </div>
              {videos.videos.comments.length > 0 &&
                videos.videos.comments.map((comments) => {
                  return (
                    comments && (
                      <div className="row mt-4 pl-4 pr-4">
                        <div className="col-sm-1">
                          <img
                            src={`http://localhost:5000/uploads/${comments.chanels.photo}`}
                            alt="Buku1"
                            className="photochanel"
                          />
                        </div>
                        <div className="col pl-4">
                          <div className="row mb-1">
                            <p>{comments.chanels.chanelName}</p>
                          </div>
                          <div className="row">
                            <span>{comments.comment}</span>
                          </div>
                        </div>
                      </div>
                    )
                  );
                })}
            </div>
            <div className="col mt-5 pl-5">
              <div className="row mt-4">
                <ListVideo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
