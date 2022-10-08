import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, Drawer, IconButton } from "@mui/material";
import { Menu, Slider } from 'antd';
import React, { useState } from 'react';
const { SubMenu } = Menu;


const ShopDrawer = ({price,handleSlide,showCategories,showStars,showSubs,showBrand,showColor,showShipping}) => {
   const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer
      PaperProps={{
        elevation: 8,
        sx: {
          marginTop:15,
          width: 270,
          height: 520,
          color: 'black',
          backgroundColor: "white"
        }
      }}
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
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
      </Drawer>
      <Box 
      style={{
          display:"flex",
          justifyContent:"space-between"
      }}
      >
       <Box>
       </Box>
       <Box>
            <IconButton
            sx={{ color: "black" }}
            onClick={() => setOpenDrawer(!openDrawer)}
            >
            <FilterListIcon />
            </IconButton>
       </Box>
      </Box>
    </>
  );
};

export default ShopDrawer;

