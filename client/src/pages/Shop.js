import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons';
import { Container, Grid, useMediaQuery, useTheme } from '@mui/material';
import { Checkbox, Menu, Radio, Slider } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../common/category';
import { getProductByCount, getProductByFilter } from '../common/product';
import { getSubCategories } from '../common/subCategory';
import ShopCard from '../Component/Cards/ShopCard';
import Star from '../Component/Form/Star';
import ShopDrawer from './ShopDrawer';
const { SubMenu } = Menu;

const Shop = () => {
    const[product,setProduct]=useState([])
    const[loading,setLoading]=useState(false)
    const[price,setPrice]=useState([0,0]);
    const[ok,setOk]=useState(false);
    const[category,setCategory]=useState([])
    const[categoryIds,setCategoryIds]=useState([])
    const[subs,setSubs]=useState([])
    const[sub,setSub]=useState('')
    const[star,setStar]=useState('')
    const[brands,setBrands]=useState(["Google","Apple","Samsung","Microsoft","Lenovo","Asus"])
    const[brand,setBrand]=useState('')
    
    const[colors,setColors]=useState(["Black","Brown","Silver","White","Blue"])
    const[color,setColor]=useState('') 
    
    const[shipping,setShipping]=useState("")
    const{search}=useSelector((state)=>({...state}))
    const{text}=search;
    
    const dispatch=useDispatch();
    //side drawer
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    //...Load All Product First...    
    useEffect(()=>{
        loadAllProduct()
        getCategories()
        .then((res)=>setCategory(res.data))
        getSubCategories()
        .then((res)=>{setSubs(res.data)})
    },[])
    const loadAllProduct=()=>{
        setLoading(true)
        getProductByCount(10)
        .then((res)=>{
            setProduct(res.data)
            setLoading(false)
        });
    };

 //...load Product by search-bar...
    useEffect(()=>{
      const delayed=setTimeout(()=>{
        setCategoryIds([])
        fetchProducts({query:text})
        if(!text){
            loadAllProduct()
        }
      },300)
      return ()=>clearTimeout(delayed) 
    },[text])

   const fetchProducts=(arg)=>{
        getProductByFilter(arg)
        .then((res)=>{
            setProduct(res.data)
        })
    }
 //...Load Product By Product Price... 
    useEffect(()=>{
        fetchProducts({price})
    },[ok, price])  


    const handleSlide=(value)=>{
        console.log(value);
         dispatch({
            type: "SEARCH_QUERY",
            payload:{text:""},
         });
         setCategoryIds([]);
         setStar('')
         setBrand('')
         setShipping('')    
         setPrice(value)
         setTimeout(()=>{
           setOk(!ok)
         },300)
      }



  //...Load Product By Category....
  const handleCategory=(e)=>{
    dispatch({
        type: "SEARCH_QUERY",
        payload:{text:""},
     }) 
     setPrice([0,0]); 
     setStar('')
     setColor('')
     setBrand('')
     setShipping('')

    let chekedId=e.target.value;
    let existId=[...categoryIds];

   let foundIds=existId.indexOf(chekedId)
   if(foundIds === -1){
       existId.push(chekedId);
   }else{
       existId.splice(foundIds,1);
   }
   setCategoryIds(existId);
   fetchProducts({category:existId})
} 

  const showCategories=()=>
        category.map((p)=>(
        <div key={p._id}>
            <Checkbox
                checked={categoryIds.includes(p._id)}
                name='category' 
                className='pl-4 pr-4 pb-2'
                value={p._id} 
                onChange={handleCategory}
                >
                  {p.name}
            </Checkbox>
        </div>
        ))    
 //...Load Product By rating...
 const handleStar=(num)=>{
    dispatch({
        type: "SEARCH_QUERY",
        payload:{text:""},
     });
     setCategoryIds([]);
     setPrice([0,0]);
     setColor('')
     setShipping('')
     setStar(num);

     fetchProducts({star:num})
 }
 const showStars=()=>
   <div className='pl-4 pr-4 pb-2'>
     <Star numberOfStars={5} starClick={handleStar}/>
     <Star numberOfStars={4} starClick={handleStar}/>
     <Star numberOfStars={3} starClick={handleStar}/>
     <Star numberOfStars={2} starClick={handleStar}/>
     <Star numberOfStars={1} starClick={handleStar}/>
   </div>
 //--load product by subs
 const handleSub=(sub)=>{
    dispatch({
        type: "SEARCH_QUERY",
        payload:{text:""},
     });
     setCategoryIds([]);
     setPrice([0,0]);
     setStar('')
     setColor('')
     setBrand('')
     setShipping('')
     setSub(sub);

     fetchProducts({sub})
 }
 const showSubs=()=>
     subs.map((p)=>(
         <div
          key={p._id}
          className='p-1 m-1 badge badge-primary'
          onClick={()=>handleSub(p)}
          style={{cursor:"pointer"}}
         >
          {p.name}
         </div>
     ))
 //..Load Product by brand..
 const handleBrand=(e)=>{
    dispatch({
        type: "SEARCH_QUERY",
        payload:{text:""},
     });
     setCategoryIds([]);
     setPrice([0,0]);
     setStar('')
     setSub('');
     setColor('')
     setShipping('')
     setBrand(e.target.value)

     fetchProducts({brand:e.target.value})
 }
 const showBrand=()=>
    brands.map((p)=>(
        <div
           key={p}
           className='pl-4 pr-4'>
          <Radio name={p} checked={p===brand} onChange={handleBrand} value={p}>
              {p}
          </Radio>
        </div>
    ))
 //...Load Product By Color...
 const handleColor=(e)=>{
    dispatch({
        type: "SEARCH_QUERY",
        payload:{text:""},
     });
     setCategoryIds([]);
     setPrice([0,0]);
     setStar('')
     setSub('');
     setBrand('')
     setShipping('')
     setColor(e.target.value)

     fetchProducts({color:e.target.value})
 }
 const showColor=()=>
 colors.map((p)=>(
    <div
       key={p}
       className='pl-4 pr-4'>
      <Radio name={p} checked={p===color} onChange={handleColor} value={p}>
          {p}
      </Radio>
    </div>
))
//...Load Products By Shipping...
const handleShipping=(e)=>{
    dispatch({
        type: "SEARCH_QUERY",
        payload:{text:""},
     });
     setCategoryIds([]);
     setPrice([0,0]);
     setStar('')
     setSub('');
     setBrand('')
     setShipping(e.target.value)

     fetchProducts({shipping:e.target.value})
}
const showShipping=()=>
    <>
    <Checkbox
     className='pl-4 pr-4 pb-2'
     value="Yes" 
     onChange={handleShipping}
     checked={shipping==="Yes"}
     >
       Yes
   </Checkbox>
   <Checkbox
     className='pl-4 pr-4 pb-2'
     value="No" 
     onChange={handleShipping}
     checked={shipping==="No"}
     >
       No
   </Checkbox>
   </>

    return (
         <Container maxWidth="lg">
            <Grid container>
                <Grid xs={12} md={4} lg={3}>
                {isMatch?(<div></div>):(<>
                    <h4 className=' pt-2 font-wight-bold text-center'>Search/Filters</h4> 
                    <hr/>
                    </>)}
                
                  {
                   isMatch? (
                     <>
                       <ShopDrawer fetchProducts={fetchProducts} 
                       showStars={showStars} 
                       showCategories={showCategories}
                       showSubs={showSubs}
                       showBrand={showBrand}
                       showColor={showColor}
                       showShipping={showShipping}
                       handleSlide={handleSlide}
                       price={price}
                       />
                     </>
                   ):(
                    <Menu style={{
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                        padding:"5px", 
                        backgroundColor:"white",
                    }} 
                        mode="inline" 
                        defaultOpenKeys={["sub1","sub2","sub3","sub4","sub5","sub6","sub7"]}>
                        <SubMenu 
                        key="sub1" 
                        //icon={<DollarOutlined />} 
                        title={<span className='h6'>
                            <DollarOutlined/>
                            Price
                        </span>}
                        >
                        <Slider 
                            className='ml-4 mr-4'
                            range
                            value={price}
                            tipFormatter={(v)=>`$${v}`}
                            onChange={handleSlide} 
                            max="5000"
                        />
                        </SubMenu>
                        <SubMenu 
                            key="sub2" 
                            title={<span className='h6'>
                                <DownSquareOutlined/>
                                Category
                            </span>}
                            >
                            <div>
                                {showCategories()}
                            </div>
                        </SubMenu>
                        <SubMenu 
                            key="sub3" 
                            title={<span className='h6'>
                                <StarOutlined/>
                                Rating
                            </span>}
                            >
                            <div>
                                {showStars()}
                            </div>
                        </SubMenu>
                        <SubMenu 
                            key="sub4" 
                            title={<span className='h6'>
                                <DownSquareOutlined/>
                                SubCategory
                            </span>}
                            >
                            <div>
                                {showSubs()}
                            </div>
                        </SubMenu>
                        <SubMenu 
                            key="sub5" 
                            title={<span className='h6'>
                                <DownSquareOutlined/>
                                Brands
                            </span>}
                            >
                            <div>
                                {showBrand()}
                            </div>
                        </SubMenu>
                        <SubMenu 
                            key="sub6" 
                            title={<span className='h6'>
                                <DownSquareOutlined/>
                                Colors
                            </span>}
                            >
                            <div>
                                {showColor()}
                            </div>
                        </SubMenu>
                        <SubMenu 
                            key="sub7" 
                            title={<span className='h6'>
                                <DownSquareOutlined/>
                                Shipping
                            </span>}
                            >
                            <div>
                                {showShipping()}
                            </div>
                        </SubMenu>
                    </Menu> 
                   ) 
                }
                </Grid>
                <Grid xs={12} md={1} lg={1}></Grid>
                <Grid xs={12} md={7} lg={8}>
                {
                    loading?(
                        <h4 className='text-danger'>loading...</h4>
                    ):(
                        <h4 className='text-center pt-3 font-wight-bold'>All Product Lists</h4>
                    )
                }
            {product.length<1 && <p>No prodouct found</p>}
            <Grid container>
                {
                    product.map((p)=>(
                        <Grid key={p._id} pl={1} mb={2} xs={12} sm={3} md={4} lg={3}>
                            <ShopCard product={p}/>
                        </Grid>
                    ))
                }
            </Grid>
                </Grid>
             </Grid>
         </Container>
    );
};

export default Shop;