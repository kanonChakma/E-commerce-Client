import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CreateCart } from '../../common/user';
import CartItem from './CartItem';
import CartShortInfo from './CartShortInfo';

const Cart = ({history}) => {

  const {user,cart}=useSelector((state)=>({...state}))
 console.group(cart)
  const getTotal = () => {
    return cart.reduce((f,s)=>{
       return f+s.count*s.price;
    },0)
   }

  const handleDb = () => {
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
       <Container maxWidth = "lg">
         <Grid
         sx={{marginTop:"50px", minHeight:{xs:"auto", md:"70vh"}}}
         container 
         >
         <Grid item xs={12} lg={8}>
         {!cart.length?(
           <>
             <h5>No Product in the cart</h5>
             <Link to="/shop">Continnue Shopping...</Link>
           </>
           ):(<>
            <Grid
            sx={{
              display:{xs:"none",md:"block"}
            }}
            >
            <h4>Edit Your Choices</h4>
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
            </Grid>

            <Grid
            sx={{
              display:{md:"none"}
            }}
            >
            <h4>Edit Your Choices</h4>
            <table className='table table-bordered'>
              <thead className='thead-light'>
                  <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Price</th>
                      <th scope="col">Count</th>
                      <th scope="col">Remove</th>
                  </tr>
              </thead>
               {cart.map((p)=>(
                 <CartShortInfo product={p}/>
               ))}
            </table>
            </Grid>
            </>)}
        </Grid>
         <Grid item xs={12} lg={1}></Grid>
         <Grid item xs={12} lg={3}>
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
              user?
                <button 
                 disabled={!cart.length}
                 onClick={handleDb} 
                 className='btn offset-md-2 text-center  btn-md btn-success bg-secondary text-white mt-5'>
                     Proceed to checkout
              </button>:<button className="btn offset-md-5 btn-sm btn-primary mt-2">
                 <Link to={{
                     pathname:"/login",
                     state:{from:"cart"},
                 }}>
                    Login to checkout
                 </Link>
              </button> 
             }
          </Grid>
         </Grid>
      </Container>
    );
};

export default Cart;




