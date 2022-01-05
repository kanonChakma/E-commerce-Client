import React from 'react';
import TypeEffect from '../Component/Cards/TypeEffect';
import BestSellers from '../Component/Home/BestSellers';
import NewArrivals from '../Component/Home/NewArrivals';

const Home = () => {
    return (
        <div>
             <div className='jumbotron text-center h1 font-weight-bold'>
               <TypeEffect
                 text={["Latest Product","New Arrivals","Best sellers"]}
               />
             </div>
             <h4 className='text-center jumbotron mt-3 mb-3 p-3 display-3 font-weight-bold'>
               New Arrivals
               </h4>
             <NewArrivals/>
             <h4 className='text-center jumbotron mt-3 mb-3 p-3 display-3 font-weight-bold'>
                Best Sellers
              </h4>
            <BestSellers/>
        </div>
    );
};

export default Home;