import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { GiCarDoor } from "react-icons/gi";
import { BsFuelPump } from "react-icons/bs";
import { TbManualGearbox } from "react-icons/tb";

const Car = (props) => {
  console.log(props)
  const {_id, name, image, rentPerHour, capacity, transmission, doors, fuelType} = props.car;
  return (
    <Col  xs={12} sm={6} md={4} lg={3} className="mb-3">
      <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
      <div className="price-tag btn btn-danger mb-3">£{rentPerHour} Per Hour</div>
        <Card.Title>{name}</Card.Title>
        <div className="d-flex flex-wrap car-features mt-3 mb-2">
          <div><MdAirlineSeatReclineNormal/> {capacity} Seats</div>
          <div><GiCarDoor/> {doors} Doors</div>
          <div><BsFuelPump/> {fuelType}</div>
          <div><TbManualGearbox/> {transmission}</div>
        </div>

          <Link to={`/booking/${_id}`}><Button variant="primary">
             Book Now
          </Button></Link>
        
        
      </Card.Body>
    </Card> 
    </Col>
  )
}

export default Car;