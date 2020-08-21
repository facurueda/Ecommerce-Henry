import React, {useState} from 'react';
import {FaStar} from 'react-icons/fa';


const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover,setHover] = useState(null);

  return <div>
    
    
    {[...Array(5)].map((star,i) =>{

      const ratingValue = i + 1;
      
      
        return <label>
        <input type="radio" 
        name="rating"
        value={ratingValue} 
        onClick={()=> setRating(ratingValue)}
        />
        <FaStar className= "Star" size={50} color={ ratingValue < (hover || rating) || ratingValue == (hover || rating) /* ratingValue < reting || ratingValue === reting  */ ? "#858b94" : "#b8c1cf"}
        onMouseEnter={ () => setHover(ratingValue)}
        onMouseLeave={()=> setHover(null)}/> 
        </label>
    })}
    <p><strong>The riting is {rating}</strong></p>
    
    </div>
};



export default StarRating; 
// aca cambiamos los colores 