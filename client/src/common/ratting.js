import React from "react";
import StarRatings from "react-star-ratings";

export const avarageRatting=(product)=>{
  console.log(product);
     if(product && product.ratings){
         let rattingArray=product && product.ratings;
         let total=[];
         let length=rattingArray.length;
         console.log(rattingArray);
        rattingArray.map((r)=>total.push(r.star));
        let sumRatting=total.reduce((p,n)=>p+n,0);
        let highest=length*5;
        let result=(sumRatting*5)/highest;

    return(
        <div className="text-center pt-1 pb-3">
          <StarRatings
           starDimension="20px"
           starSpacing="2px"
           editing={false}
           starRatedColor="red"
          rating={result}/>{" "}
          ({product.ratings.length})
        </div>
      )
    }
 }