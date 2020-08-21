import React, {useState} from 'react';
import {FaStar} from 'react-icons/fa';


const StarRating = () => {
  const [reting, setRating] = useState(null);
  const [hover,setHover] = useState(null);

  return <div>
    
    
    {[...Array(5)].map((star,i) =>{

      const ratingValue = i + 1;
      
      
         return <label>
        <input type="radio" 
        name="rating"
        value={ratingValue} 
        onClick={()=> setRating(ratingValue)}
        onMouseHover={ () => setHover(ratingValue)}
        onMouseOut={()=> setHover(null)}/>
        <FaStar className= "Star" size={50} color={ratingValue < reting || ratingValue === reting  ? "#858b94" : "#b8c1cf"}/> 
        </label>
    })};
    
    </div>
};



export default StarRating; 
// aca cambiamos los colores 