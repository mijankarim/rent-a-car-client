import { Col, Row, Form, Input} from "antd";
import { useAddcarMutation } from "../slices/carApiSlice";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";


function AddCar() {
  const navigate = useNavigate();
  const [postImage, setPostImage] = useState("")
  const [addcar, {isSuccess}] = useAddcarMutation();
  
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64)
    setPostImage(base64)
  }

  function onFinish(values) {
    values.bookedTimeSlots = [];
    values.image = postImage;
     addcar(values);
     console.log(values)
     navigate('/admin');
  }

  return (
    <>
      
      {user.isAdmin ? (
        <Row justify="center mt-4">
          <Col
            lg={12}
            sm={24}
            xs={24}
            className="p-2 mb-3"
            
          >
            <Form className="bs1 p-1" layout="vertical" onFinish={onFinish}>
              <h3 style={{ color: "black" }}>Add New Car</h3>
              <hr />
              <Form.Item
                name="name"
                label="Car name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter the car name..." />
              </Form.Item>

            
            <input
             type="file"
             label="Image"
             name="image"
             id="file-upload"
             accept = '.jpg, .png, .jpeg'
             onChange={(e) => handleFileUpload(e)}
             />

              <Form.Item
                name="rentPerHour"
                label="Rent per hour"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter the Rent Per Hour..." />
              </Form.Item>
              <Form.Item
                name="capacity"
                label="Capacity"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter Number of Doors..." />
              </Form.Item>
              <Form.Item
                name="doors"
                label="Doors"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter the capacity..." />
              </Form.Item>
              <Form.Item
                name="fuelType"
                label="Fuel Type"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter the fuel type..." />
              </Form.Item>

              <Form.Item
                name="transmission"
                label="Transmission Type"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter the Transmission type..." />
              </Form.Item>

              <button className="btn1">ADD CAR</button>
            </Form>
          </Col>
        </Row>
      ) : (
        <div style={{ height: "50vh" }}>
          <h1 className="errorheading">Error 404, Page not found</h1>
          <button
            className="btnerror mt-2"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Go back
          </button>
        </div>
      )}
      {isSuccess && "Car added successfully!"}
    </>
  );
}

export default AddCar;

function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}