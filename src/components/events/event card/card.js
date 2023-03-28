
import './card.css';

function Card(props) {
  return (
    <div className="card">
       <h1>{props.name}</h1>
       <p>event details will be displayed here</p>
       <button className='bu'>More Details</button> 
    </div>
  );
}

export default Card;