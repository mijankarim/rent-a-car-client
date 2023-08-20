import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCar } from "../features/car/carSlice";

const Car = () => {
    const {carId} = useParams();
    const dispatch = useDispatch();
    const {car, isLoading, isError} = useSelector(state => state.car);
    console.log(car)

    useEffect(() => {
      dispatch(fetchCar(carId))
    }, [dispatch, carId])


    let content = null;
    if(isLoading){
      content = 'Loading...';
    }
    if(!isLoading && isError) {
      content = 'Error....'
    }
    if (!isLoading && !isError && car?._id) {
        content = (
         <Container className="my-5">
           <Row>
             <Col xs={12} sm={12} md={6}>
               <img src={car.image} alt={car.name}/>
             </Col>
             <Col xs={12} sm={12} md={6} className="d-flex flex-column justify-content-center">
               <h3>{car.name}</h3>
               <p>Rent Per Hour: ${car.rentPerHour}</p>
               <Button>Book Now</Button>
             </Col>
           </Row>
         </Container>
        )
      }
  return content;
}

export default Car