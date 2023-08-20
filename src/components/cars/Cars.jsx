import { useEffect } from "react";
import Car from "./car";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {useSelector, useDispatch} from 'react-redux';
import { fetchCars } from "../../features/cars/carsSlice";


const Cars = () => {
  const dispatch = useDispatch();
  const {cars, isLoading, isError} = useSelector((state) => state.cars);
  console.log(cars)

  useEffect(() =>{
    dispatch(fetchCars())
  },[dispatch]);

  let content = null;
  if(isLoading){
    content = 'Loading';
  }
  if(!isLoading && isError) {
    content = 'Error....'
  }
  if (!isLoading && !isError && cars?.length === 0) {
    content = 'No Cars founds'
  }
  if (!isLoading && !isError && cars?.length > 0) {
    content = 
    <Container>
      <Row>
        
        {cars.map(car => <Car key={car._id} car={car}/>)}
        
      </Row>
    </Container>
  }
  return content;
}

export default Cars;