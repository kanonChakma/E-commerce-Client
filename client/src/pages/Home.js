import React from 'react';
import TypeEffect from '../Component/Cards/TypeEffect';
import CategoryList from '../Component/Category/CategoryList';
import BestSellers from '../Component/Home/BestSellers';
import Carousele from '../Component/Home/Carousele';
import NewArrivals from '../Component/Home/NewArrivals';
import SubsList from '../Component/SubCategory/SubsList';

const Home = () => {
  const showName=(name)=>(
    <div className='row'>
      <div className='offset-md-2  col-md-2 mt-5 text-center'>
        <h4 className='jumbotron mt-5 mb-4  mb-3 p-3 display-5 font-weight-bold'>
            {name}
        </h4>
      </div>
  </div>
  )
    return (
        <>
             <div className='jumbotron text-center h1  font-weight-bold'>
               <TypeEffect
                 text={["Latest Product","New Arrivals","Best sellers"]}
               />
             </div>
             <div className='my-5'>
                <Carousele/>
             </div>
               {showName("New Arrivals")}
             <NewArrivals/>

               {showName("Category")}
               <CategoryList/>
               
                 {showName("Best Sellers")}
             <BestSellers/>
                  {showName("SubsCategory")}
              <SubsList/>
        </>
    );
};

export default Home;