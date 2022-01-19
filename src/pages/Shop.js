import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getProductByCount, getProductByFilter} from '../common/product';
import {getCategories} from '../common/category';
import ProductCard from '../Component/Cards/ProductCard';
import { Checkbox } from 'antd';
import Star from '../Component/Form/Star'
import { Menu } from 'antd';
import { Slider, Switch } from 'antd';
import { DollarOutlined,DownSquareOutlined,StarOutlined} from '@ant-design/icons';
import { getSubCategories } from '../common/subCategory';
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
    const{search}=useSelector((state)=>({...state}))
    const{text}=search;
    
    const dispatch=useDispatch();

//..Load All Product First..    
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
            console.log(res.data);
            setProduct(res.data)
            setLoading(false)
        });
    };

 //...load Product by search-bar...
    useEffect(()=>{
      const delayed=setTimeout(()=>{
        setCategoryIds([])
        fetchProducts({query:text})
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
    },[ok])  
    const handleSlide=(value)=>{
         dispatch({
            type: "SEARCH_QUERY",
            payload:{text:""},
         });
         setCategoryIds([]);
         setStar('')    
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
 //...Load Product By rating
 const handleStar=(num)=>{
    dispatch({
        type: "SEARCH_QUERY",
        payload:{text:""},
     });
     setCategoryIds([]);
     setPrice([0,0]);
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
 
 const handleSub=(sub)=>{
    dispatch({
        type: "SEARCH_QUERY",
        payload:{text:""},
     });
     setCategoryIds([]);
     setPrice([0,0]);
     setStar('')
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
    return (
        <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-3'>
                <h4 className=' pt-2 font-wight-bold'>Search/Filters</h4>
                <hr/>
                <Menu mode="inline" defaultOpenKeys={["sub1","sub2","sub3","sub4"]} >
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
                </Menu>
              </div>
              <div className='col-md-9'>
                 <div className='row'>
                   {
                      loading?(
                          <h4 className='text-danger'>loading...</h4>
                      ):(
                          <h4 className=' pt-3 font-wight-bold'>Product List</h4>
                      )
                   }
                 </div>
                  {product.length<1 && <p>No prodouct found</p>}
                 <div className='row'>
                   {
                      product.map((p)=>(
                          <div key={p._id} className='col-md-4'>
                              <ProductCard product={p}/>
                          </div>
                      ))
                    }
                 </div>
              </div>
            </div>
        </div>
    );
};

export default Shop;