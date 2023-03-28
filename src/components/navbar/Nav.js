import {Link} from 'react-router-dom'
import './nav.css'

function Nav() {

  return (
    
    <div id="van">
      <ul className="nav justify-content-end" >
        <li className="nav-item">
          <Link to="/" className="nav-link ">
          <a className='nl'>Home</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/events" className="nav-link ">
          <a className='nl'>Events</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/members" className="nav-link ">
            <a className='nl'>Members</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link ">
            <a className='nl'>Login</a>
          </Link>
          </li>
          
      </ul>
    </div>
  );
}

export default Nav;