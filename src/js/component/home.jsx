import React, {useState} from "react";

//include images into your bundle
//import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
import stuff from "../component/stuff.jsx";

const Home = () => {
	return (

        <div class="list roundBorder">
          
            <input type="text" name="tastText" autoComplete="off" placeholder="What need to be done?" />
            <button type="submit" className="addTaskButton"></button>
          
        
        </div>
  );
  };

export default Home;
