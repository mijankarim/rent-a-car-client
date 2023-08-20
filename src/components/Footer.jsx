import {Container, Row, Col} from 'react-bootstrap'
const Footer = () => {
  return (
    <footer className='footer pt-5 pb-3 mt-5'>
    <Container>
      <Row>
        <Col xs={12} sm={6} md={4} lg={3}>
          <h4 className="mb-3">Rent A Car</h4>
          <p>At Rent a Car, we're committed to providing top-notch car rental services, ensuring your travels are not only comfortable but also memorable.</p>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <h4 className="mb-3">Links</h4>
          <ul className="p-0 list-unstyled">
            <li>About</li>
            <li>Contact</li>
            <li>FAQ</li>
          </ul>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <h4 className="mb-3">Location</h4>
          <p>45 Penarth Rd, Cardiff CF10 5DJ</p>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <h4 className="mb-3">Contact</h4> 
          <p>Phone: 029 2038 9222</p>
        </Col>
      </Row>
      <Row>
        <Col>
        <p className='text-center pt-5'>© 2023 Rentacar. All Rights Reserved.</p>
        </Col>
      </Row>
    </Container>
    </footer>
  )
}

export default Footer;