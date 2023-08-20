
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { GiCarDoor } from "react-icons/gi";
import { BsFuelPump } from "react-icons/bs";
import { TbManualGearbox } from "react-icons/tb";


import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { useDeletecarMutation } from "../slices/carApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCars } from "../features/cars/carsSlice";


function AdminHome() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const {cars, isLoading, isError} = useSelector(state => state.cars);
  const [deletecar] = useDeletecarMutation();

  useEffect(() => {
    dispatch(fetchCars())
  },[dispatch])

  
 

  return (
    <>
      {user.isAdmin ? (
        <Container>
        <Row  className="mt-5 mb-5">
          <Col xs={12}>
            <div className="d-flex justify-content-between">
              <h3 className="mt-1 mr-2">
                Admin Panel
              </h3>
              <Link to={"/addcar"}>
                <Button>Add Car</Button>
              </Link>
            </div>
          </Col>
        </Row>
        </Container>
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

      {isLoading && <Spinner />}
      {user.isAdmin ? (
        <Container>
        <Row>
          {cars?.map((car) => {
            return (
              <Col lg={12} md={12} sm={12} xs={12} key={car._id}>



     <Row className="border mb-3">  
      
      <Col xs={12} sm={6} lg={3}>
        <Image fluid src={car.image} />
      </Col>
      
      <Col xs={12} sm={6} lg={3} className="d-flex flex-column align-items-center justify-content-center">
        <h3>{car.name}</h3>
        <p>£{car.rentPerHour} Per Hour</p>   
      </Col>

      <Col xs={12} sm={6} lg={3} className="d-flex justify-content-center align-items-center">
        <div className="d-flex flex-wrap car-features mt-3 mb-2">
          <div><MdAirlineSeatReclineNormal/> {car.capacity} Seats</div>
          <div><GiCarDoor/> {car.doors} Doors</div>
          <div><BsFuelPump/> {car.fuelType}</div>
          <div><TbManualGearbox/> {car.transmission}</div>
        </div>
      </Col>

      <Col xs={12} sm={6} lg={3} className="d-flex justify-content-center align-items-center">
        <div className="mr-4">
          <Link to={`/updatecar/${car._id}`} className="mr-5">
             <Button className="me-2">
                <EditOutlined
                  className="mr-5"
                  style={{ color: "white", cursor: "pointer" }}/>Edit
              </Button>
          </Link>
                      
          
          <Popconfirm
                        title="Do you want to delete this car?"
                        onConfirm={() => {
                          deletecar(car._id);
                         
                        }}
                        okText="Yes"
                        cancelText="No"
                        className="ml-5"
                      ><Button className="ms-2" variant="danger">
                        <DeleteOutlined
                          style={{ color: "white", cursor: "pointer" }}
                        />
                         Delete</Button>
                      </Popconfirm>
                     
                    </div>
      </Col> 
  
     </Row> 
   
    </Col>
            );
          })}
  </Row>
</Container>
      ) : (
        (window.href = "/")
      )}   
    </>
  );
}

export default AdminHome;