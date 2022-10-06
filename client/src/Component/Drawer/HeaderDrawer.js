import FilterListIcon from '@mui/icons-material/FilterList';
import { Drawer, IconButton } from "@mui/material";
import { Menu } from 'antd';
import React, { useState } from 'react';
const { SubMenu } = Menu;


const HeaderDrawer = () => {
   const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer
      PaperProps={{
        elevation: 8,
        sx: {
          marginTop:15,
          width: 240,
          height: 500,
          color: 'black',
          backgroundColor: "white"
        }
      }}
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
    
      </Drawer>
      <IconButton
        sx={{ color: "black", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <FilterListIcon />
      </IconButton>
    </>
  );
};

export default HeaderDrawer;

