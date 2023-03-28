import React from "react"
import Indi from "./indi/indi";
import './members.css';
function Members() 
{ 
  return(
    <div className="mem">
        <div className="club">
            <div><h3 className="m-5">Club Name</h3></div>
            <div className="clubbox">
                <Indi name="member name" branch="member branch"/>
            </div>
        </div>
    </div>

);
}
export default Members;