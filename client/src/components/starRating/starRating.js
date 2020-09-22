import React, {useState} from 'react';
import {FaStar} from 'react-icons/fa';

const StarRating = (props) => {
  const [rating, setRating] = useState(null);
  const [hover,setHover] = useState(null);
 /*  const rating = props; */
  return <div>
    {[...Array(5)].map((star,i) =>{
      const ratingValue = i + 1;
        return <label>
        <input type="radio" 
        name="rating"
        value={ratingValue} 
        onClick={()=> setRating(ratingValue)}
        />
        <FaStar className= "Star" size={30} color={ ratingValue < (hover || rating) || ratingValue === (hover || rating) /* ratingValue < reting || ratingValue === reting  */ ? "#5ca180" : "F5F3BB"}
        onMouseEnter={ () => setHover(ratingValue)}
        onMouseLeave={()=> setHover(null)}/> 
        </label>
    })}
    <p><strong>The rating is {rating}</strong></p>
    </div>
};

export default StarRating; 
// aca cambiamos los colores 