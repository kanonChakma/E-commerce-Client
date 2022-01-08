import React from "react"
import StarRatings from "react-star-ratings"

export const avarageRatting=(product)=>{
     if(product && product.ratings){
         let rattingArray=product && product.ratings;
         let total=[];
         let length=rattingArray.length;
        rattingArray.map((r)=>total.push(r.star));
        let sumRatting=total.reduce((p,n)=>p+n,0);
        console.log("sumRatting",sumRatting)
        let highest=length*5;
        console.log("highest",highest)
        let result=(sumRatting*5)/highest;
        console.log("result",result)
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