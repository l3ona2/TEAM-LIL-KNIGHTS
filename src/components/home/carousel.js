import Carousel from 'react-bootstrap/Carousel';
import img1 from '/workspaces/codespaces-react/src/components/images/w1.png';
import img2 from '/workspaces/codespaces-react/src/components/images/w2.png';
import img3 from '/workspaces/codespaces-react/src/components/images/w3.png';
import './car.css'
function Ncar() {
  return (
    <div className=''>
    <Carousel className='w-100 d-block m-auto' >
      <Carousel.Item>
        <img
          className="w-100"
          src={img1} 
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="  w-100"
          src={img2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img3}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default Ncar;