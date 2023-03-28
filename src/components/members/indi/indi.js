import React from "react"
import './indi.css'
function Indi(props) 
{ 
  return(
    <div className="individual">
      <h5>{props.name}</h5>
      <h6>{props.branch}</h6>
    </div>

);
}
export default Indi;