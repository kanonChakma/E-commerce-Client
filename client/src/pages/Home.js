import React from 'react';
import TypeEffect from '../Component/Cards/TypeEffect';
import CategoryList from '../Component/Category/CategoryList';
import Footer from '../Component/Footer/Footer';
import BestSellers from '../Component/Home/BestSellers';
import Carousele from '../Component/Home/Carousele';
import NewArrivals from '../Component/Home/NewArrivals';
import SubsList from '../Component/SubCategory/SubsList'
const Home = () => {
  const showName=(name)=>(
    <div className='row'>
    <div className='offset-md-1 col-md-4 mt-5 text-center'>
       <h4 className='jumbotron mt-3 mb-3 p-3 display-4 font-weight-bold'>
          {name}
       </h4>
    </div>
 </div>
  )
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
               {showName("New Arrivals")}
             <NewArrivals/>
                 {showName("Best Sellers")}
             <BestSellers/>
                  {showName("Category")}
              <CategoryList/>
                  {showName("SubsCategory")}
              <SubsList/>
        </div>
    );
};

export default Home;