import React from 'react';
import StarRatings from "react-star-ratings"

const Star = ({numberOfStars,starClick}) => {
    return (
        <div>
          <StarRatings
           changeRating={()=>starClick(numberOfStars)}
           numberOfStars={numberOfStars}
           starDimension="20px"
           starSpacing="2px"
           starRatedColor="red"
           starHoverColor='red'
            starEmptyColor='red'
           />
        </div>
    );
};

export default Star;