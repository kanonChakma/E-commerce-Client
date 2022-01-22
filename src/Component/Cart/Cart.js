import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CreateCart } from '../../common/cart';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';

const Cart = ({history}) => {
  const {user,cart}=useSelector((state)=>({...state}))
  const getTotal=()=>{
    return cart.reduce((f,s)=>{
       return f+s.count*s.price;
    },0)
   }
  const handleDb=()=>{
    CreateCart(cart,user.token)
    .then((res)=>{
      console.log(res.data);
      if(res.data.ok){
        history.push('/checkout')
       }
     })
     .catch((err)=>console.log(err))
  }
    return (
        <div className='container-fluid'>
           <div className='row pt-3'>
              <div className='col-lg-7 col-md-12 '>
                {!cart.length?(
                  <>
                    <h5>No Product in the cart</h5>
                    <Link to="/shop">Continnue Shopping...</Link>
                  </>
                  ):(
                    <table className='table table-bordered'>
                      <thead className='thead-light'>
                          <tr>
                              <th scope="col">Image</th>
                              <th scope="col">Title</th>
                              <th scope="col">Price</th>
                              <th scope="col">Brand</th>
                              <th scope="col">Color</th>
                              <th scope="col">Count</th>
                              <th scope="col">Shipping</th>
                              <th scope="col">Remove</th>
                          </tr>
                      </thead>
                       {cart.map((p)=>(
                         <CartItem product={p}/>
                       ))}
                    </table>
                )}
              </div>
              <div className='col-lg-5 col-md-12'>
                    <h4>Order Summary</h4>
                    <table class="table">
                        <thead className='thead-light'>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                          </tr>
                        </thead>
                          {
                            cart.map((p)=>(
                                <tbody key={p._id}> 
                                    <tr>
                                        <td>{p.title}</td>
                                        <td>x</td>
                                        <td>{p.count}</td>
                                        <td>=</td>
                                        <td>${p.price*p.count}</td>
                                    </tr> 
                                </tbody>  
                                ))
                            }
                        <tbody>
                            <tr>
                                <td>Total Price</td>
                                <td></td>
                                <td></td>
                                <td>=</td>
                                <td>${getTotal()}</td>
                            </tr>
                          </tbody>
                    </table> 
                
                  <hr/>
                  {
                     user?<button 
                     disabled={!cart.length}
                     onClick={handleDb} 
                     className='btn btn-sm btn-primary mt-2'>
                         Proceed to checkout
                     </button>:<button btn btn-sm btn-primary mt-2>
                        <Link to={{
                            pathname:"/login",
                            state:{from:"cart"},
                        }}>
                           Log in to checkout
                        </Link>
                     </button> 
                    }
              </div>
           </div>
      </div>
    );
};

export default Cart;