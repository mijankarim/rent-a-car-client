import { Container, Row, Col, Image } from "react-bootstrap";
import Spinner from "../components/Spinner";
import dayjs from "dayjs";
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";
import { fetchBookings } from "../features/bookings/bookingsSlice";





function UserBookings() {
  const dispatch = useDispatch();
  const {bookings, isLoading} = useSelector(state => state.bookings);
  console.log(bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  },[dispatch])
 
  const user = JSON.parse(localStorage.getItem("userInfo"));


  return (
    <>
      {isLoading && <Spinner />}
      {bookings && <>
        <h3 className="text-center">
           {user.isAdmin ? "All Recent Bookings." : "Your Booking History"}
        </h3>
    <Container>
      <Row>
        <Col lg={12} sm={12}>
          {user.admin
            ? bookings?.map((booking) => {
                return (
                  <Row key={booking._id}>

                    <Col lg={6} sm={12} className="text-right">
                      {booking.car ? (
                        <Image  src={booking.car.image} fluid/>
                      ) : (
                        <Image />
                      )}
                    </Col>

                    <Col lg={6} sm={12}> 
                      {booking.car ? (
                        <p><b>{booking.car.name}</b></p>) : (<p><b>Not Available</b></p>
                      )}
                      <p>User : <b>{booking.user?.email || "No email"}</b></p>
                      <p>Total Hours : <b>{booking.totalHours}</b></p>
                      <p>Total amount : <b>{booking.totalAmount}</b></p>
                    </Col>

                    <Col lg={12} sm={12}>
                      <p>Transaction Id : <b>{booking.transactionId}</b></p>
                      <p>User Contact :{" "}<b>{booking.user?.phone || "No phone"}</b></p>
                      <p>From: <b>{booking.bookedTimeSlots.from}</b></p>
                      <p>To: <b>{booking.bookedTimeSlots.to}</b></p>
                      <p>
                        Date of booking:{" "}
                        <b>{dayjs(booking.createdAt).format("MMM DD yyyy")}</b>
                      </p>
                    </Col> 

                    
                  </Row>
                  
                );
              })
            : bookings
                .filter((o) => o.user._id == user._id)
                .map((booking) => {
                  return (
                  <Row key={booking._id} className="border mb-2">

                    <Col lg={4} sm={12} className="text-right">
                        {booking.car ? (
                          <Image src={booking.car.image} fluid/>
                        ) : (
                          <Image />
                        )}
                      </Col>

                      <Col lg={4} sm={12}>
                        {booking.car ? (
                          <p>Model:  
                            <b>{booking.car.name}</b>
                          </p>
                        ) : (
                          <p>
                            <b>Not Available</b>
                          </p>
                        )}
                        <p>
                          User : <b>{booking.user.email}</b>
                        </p>
                        <p>
                          Total Hours : <b>{booking.totalHours}</b>
                        </p>
                        
                        <p>
                          Total amount : <b>{booking.totalAmount}</b>
                        </p>
                      </Col>

                      <Col lg={4} sm={12}>
                        <p>
                          Transaction Id : <b>{booking.transactionId}</b>
                        </p>
                        <p>
                          User Contact : <b>{booking.user.phone}</b>
                        </p>
                        <p>
                          From: <b>{booking.bookedTimeSlots.from}</b>
                        </p>
                        <p>
                          To: <b>{booking.bookedTimeSlots.to}</b>
                        </p>
                        <p>
                          Date of booking:{" "}
                          <b>
                            {dayjs(booking.createdAt).format("MMM DD YYYY")}
                          </b>
                        </p>
                      </Col>

                     
                    </Row>
                  );
                })}
        </Col>
      </Row> 
      </Container>
      </>}
      
    </>
  );
}

export default UserBookings;