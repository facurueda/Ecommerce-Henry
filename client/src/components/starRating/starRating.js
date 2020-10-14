import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = (props) => {
  const { rat, setRat } = props
  const [hover, setHover] = useState(null);
  const [rating,setRating] = useState(rat)
  /*  const rating = props; */
  return <div>
    {[...Array(5)].map((star, i) => {
      const ratingValue = i + 1;
      return <label>
        <input type="radio"
          name="rating"
          value={ratingValue}
          onClick={() => {
            setRat({
              target: {
                name: "rating",
                value: ratingValue
              }
            })
            setRating(ratingValue)
          }}
        />
        <FaStar className="Star" size={25} color={ratingValue < (hover || rating) || ratingValue === (hover || rating) /* ratingValue < reting || ratingValue === reting  */ ? "#FFFFFF" : "dimgrey"}
          onMouseEnter={() => setHover(ratingValue)}
          onMouseLeave={() => setHover(null)} />
      </label>
    })}
  </div>
};

export default StarRating;
// aca cambiamos los colores