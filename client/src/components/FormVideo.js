import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { Form, Button, Col } from "react-bootstrap";
import { API } from "config/api";
const FormVideo = () => {
   const {  refetch } = useQuery("getAllVideo", () =>
     API.get("/videos")
   );
    const [formData, setFormData] = useState({
      title: "",
      thumbnail: "",
      description: "",
      video: "",
      //chanelId: "",
     
    });
    const [previewSrc, setPreviewSrc] = useState(null);
const [fileName, setFileName] = useState("");
    const { title, thumbnail, description, video } = formData;
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

        formData.append("title", title);
        formData.append("thumbnail", thumbnail);
        formData.append("description", description);
        formData.append("video", video);
     
       

        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };

        const res = await API.post("/videos", formData, config);

        setFormData({
          title: "",
          thumbnail: "",
          description: "",
          video: "",
          //chanelId: "",
        });

        return res;
      } catch (error) {
        console.log(error);
      }
    });

    return (
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
                  placeholder="Title"
                  type="text"
                  class="form-control"
                  required
                  name="title"
                  value={title}
                  onChange={(e) => handleChange(e)}
                />
              </Col>
              <Col>
                {/*<input type="file" className="form-control-file"></input>*/}
                <Form.Group>
                  <div
                    className="form-control"
                    style={{ width: "max-content", cursor: "pointer" }}
                  >
                    <div
                      style={{
                        alignItems: "center",
                      }}
                    >
                      Attach Thumbnail
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        class="bi bi-paperclip"
                        fill="#FF7A00"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"
                        />
                      </svg>
                    </div>
                  </div>
                </Form.Group>
              </Col>
            </Form.Row>
          </Form.Group>
          {/* <Form.File
                    className="form-control"
                    name="thumbnail"
                    onChange={(e) => {
                      handleChange(e);
                      onChangeFiles(e);
                    }}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
          </Form.Group>*/}

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Description"
              name="description"
              value={description}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
         
          <Form.Group>
            <div
              className="form-control"
              style={{ width: "max-content", cursor: "pointer" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Upload Video&nbsp;
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-camera-reels"
                  fill="#FF7A00"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M0 8a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8zm11.5 5.175l3.5 1.556V7.269l-3.5 1.556v4.35zM2 7a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M9 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                  />
                </svg>
              </div>
            </div>
          </Form.Group>
          {/* <Form.File
              className="form-control"
              name="video"
              onChange={(e) => {
                handleChange(e);
                onChangeFiles(e);
              }}
            />
          </Form.Group>

        <Form.Group>
            <Form.Control
              placeholder="chanelId"
              type="text"
              class="form-control"
              required
              name="chanelId"
              value={chanelId}
              onChange={(e) => handleChange(e)}
            />
        </Form.Group> */}

          <Button
            variant="primary"
            size="lg"
            block
            style={{
              backgroundColor: "#FF7A00",
            }}
            type="submit"
          >
            Add
          </Button>
        </Form>
      </Col>
    );
};

export default FormVideo;