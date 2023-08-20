import  { useEffect, useState } from "react";
import { Divider, DatePicker } from "antd";


import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { GiCarDoor } from "react-icons/gi";
import { BsFuelPump } from "react-icons/bs";
import { TbManualGearbox } from "react-icons/tb";

import {Container, Row, Col, Image, Button} from 'react-bootstrap';


import StripeCheckout from "react-stripe-checkout";


import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";

import { fetchCar } from "../features/car/carSlice";
import { useBookCarMutation } from "../slices/bookingApiSlice";


const { RangePicker } = DatePicker;

function BookingCar() {
  const { carId } = useParams();
  const { car, isLoading, isError } = useSelector((state) => state.car);
  const [bookCar] = useBookCarMutation();
  
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalMins, setTotalmins] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
 

  useEffect(() => {
     dispatch(fetchCar(carId))
  }, [dispatch, carId]);

  useEffect(() => {
    setTotalAmount(totalMins * (car.rentPerHour / 60));
  }, [totalMins, car.rentPerHour]);

  function selectTimeSlots(values) {
    if (values) {
      setFrom(moment(values[0]).format("MMM DD yyyy HH"));
      setTo(moment(values[1]).format("MMM DD yyyy HH"));
      setTotalmins(values[1].diff(values[0], "minutes"));
    } else {
      setTotalmins(0);
    }
  }
  
  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("userInfo"))._id,
      car: carId,
      totalMins,
      totalAmount,
      bookedTimeSlots: {
        from,
        to,
      },
    };
    bookCar(reqObj);
  }

  return (
    <>
      {isLoading && <Spinner />}
      {isError && 'Error'}
      <Container className="py-5">
      <Row>
        <Col lg={6} sm={6} xs={12}>
          <Image src={car.image} alt={car.name} fluid className="" />
        </Col>
        <Col lg={6} sm={6} xs={12}>
          <div>
            <div>

            <Divider>
              <h4>CAR DETAILS</h4>
            </Divider>

        <h3>{car.name}</h3>
        <p><strong>£ {car.rentPerHour} Per Hour</strong></p>
        <div className="d-flex flex-wrap car-features mt-3 mb-2">
          <div><MdAirlineSeatReclineNormal/> {car.capacity} Seats</div>
          <div><GiCarDoor/> {car.doors} Doors</div>
          <div><BsFuelPump/> {car.fuelType}</div>
          <div><TbManualGearbox/> {car.transmission}</div>
        </div>

              
            </div>
            <Divider>
              <h4>SELECT TIME SLOTS</h4>
            </Divider>
            <div>
              <RangePicker
                className="RangePicker"
                showTime={{ format: "HH:mm a" }}
                format="MMM DD YYYY HH:mm"
                onChange={selectTimeSlots}
                
                disabledDate={current => {
                  return current && current < moment().add(-1, "days");
                }}
              />
              <br />
              
              {from && to && (
                <div className="mt-3">
                  <p>Total Minutes : <b>{totalMins}</b></p>
                  <h5 className="mb-4">Total Amount : {totalAmount}</h5>
                  <StripeCheckout
                    token={onToken}
                    shippingAddress
                    billingAddress={true}
                    currency="GBP"
                    amount={totalAmount * 100}
                    stripeKey="pk_test_51Ih6rcKIKnko8QH9UEOEQ0ymRNDKmnfeEdROUqZ0Pnj3wOkDbz5KLbu7prRywBAEOxgnJnmWYNKDNKJoDeihY3xt00ORVgWAEM"
                  >
                    <Button>Book Now</Button>
                  </StripeCheckout>
                </div>
              )}
            </div>
          </div>
        </Col>
      
      </Row>
      </Container>
      
    </>
  );
}

export default BookingCar;