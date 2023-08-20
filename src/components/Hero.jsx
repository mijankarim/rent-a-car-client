import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import porche from '../assets/porche.png'

const Hero = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Row>
          <Col  xs={12} md={6} className='d-flex flex-column justify-content-center'>
          
           <h2>Rent The Best Quality Car&apos;s With Us</h2>
           <p>Always choose the best car from our local stores or order it remotely at the best price for you and get the best quality
            cars for as long as you like</p>
            <div>
            <Button>Book Your Ride</Button>
            </div>
           
          
          </Col>
          <Col  xs={12} md={6}>
           <Image src={porche} alt="car" fluid/>      
           </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;