import { Col, Row, Form, Input } from "antd";

import Spinner from "../components/Spinner";
import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";

import {useUpdatecarMutation} from '../slices/carApiSlice';
import { fetchCar } from "../features/car/carSlice";

function UpdateCar() {
  const dispatch = useDispatch();
  const { carId } = useParams();
  const navigate = useNavigate();
  
  const {car, isLoading} = useSelector(state => state.car);

  console.log(car)
 
  
  const [updatecar] = useUpdatecarMutation(); 
  
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [postImage, setPostImage] = useState(car.image)
  
  useEffect(() => {
    dispatch(fetchCar(carId))
  }, [dispatch, carId]) 
 

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64)
    setPostImage(base64)
  }

  function onFinish(values) {
    values.image = postImage;
    updatecar({
        id: carId,
        data: values
    })
    navigate('/admin')
    console.log(values);
  }
  return (
    <>
      {isLoading && <Spinner />}
      {car && <>
      { user.isAdmin ? (
        <Row justify="center mt-4">
          <Col
            lg={12}
            sm={24}
            xs={24}
            className="p-2 mb-3"
            
          >
              <Form
                initialValues={car}
                className="bs1 p-1"
                layout="vertical"
                onFinish={onFinish}
              >
                <h3>Edit Car</h3>
                <hr />
                <Form.Item
                  name="name"
                  label="Car name"
                  rules={[{ required: true }]}
                >
                  <Input />
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
                  <Input />
                </Form.Item>
                <Form.Item
                  name="capacity"
                  label="Capacity"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="doors"
                  label="Doors"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="fuelType"
                  label="Fuel Type"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="transmission"
                  label="Transmission Type"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <button className="btn1">EDIT CAR</button>
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
      </>
    }
      
    </>
  );
}

export default UpdateCar;

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