import React, { useEffect } from 'react';
import TypeEffect from '../Component/Cards/TypeEffect';
import NewArrivals from '../Component/Home/NewArrivals';

const Home = () => {
    return (
        <div>
             <div className='jumbotron text-center h1 font-weight-bold'>
               <TypeEffect
                 text={["Latest Product","New Arrivals","Best sellers"]}
               />
             </div>
             <h1 className='text-center jumbotron mt-3 mb-3 p-3 display-3'>New Arrivals</h1>
            <NewArrivals/>
        </div>
    );
};

export default Home;