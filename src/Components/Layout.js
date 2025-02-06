
import { Outlet, } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";

import { useAuth } from "./AuthContext";

const Layout = () => {

   const { token } = useAuth();

 
















  
  
  return (
    <>
    {token && 
      <Header/>
    }
      <Outlet />
     
    </>
  );
};
export default Layout;