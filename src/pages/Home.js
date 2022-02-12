import React from 'react';
import TypeEffect from '../Component/Cards/TypeEffect';
import CategoryList from '../Component/Category/CategoryList';
import BestSellers from '../Component/Home/BestSellers';
import Carousele from '../Component/Home/Carousele';
import NewArrivals from '../Component/Home/NewArrivals';
import SubsList from '../Component/SubCategory/SubsList'
const Home = () => {
    return (
        <div>
             <div className='jumbotron text-center h1 font-weight-bold'>
               <TypeEffect
                 text={["Latest Product","New Arrivals","Best sellers"]}
               />
             </div>
             <div>
                <Carousele/>
             </div>
              <h4 className='text-center jumbotron mt-3 mb-3 p-3 display-3 font-weight-bold'>
                 New Arrivals
               </h4>
             <NewArrivals/>
             <h4 className='text-center jumbotron mt-3 mb-3 p-3 display-3 font-weight-bold'>
                Best Sellers
              </h4>
            <BestSellers/>
             <h4 className='text-center jumbotron mt-3 mb-3 p-3 display-3 font-weight-bold'>
                Category
              </h4>
              <CategoryList/>
             
              <h4 className='text-center jumbotron mt-3 mb-3 p-3 display-3 font-weight-bold'>
                SubsCategory
              </h4>
              <SubsList/>
        </div>
    );
};

export default Home;