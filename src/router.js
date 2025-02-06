import { createBrowserRouter } from "react-router-dom";
import Main from "./main";
import Resgister from "./Page/Register";
import Layout from "./Components/Layout";
import AfterLogin from "./Page/AfterLoign";
import MyBooks from "./Page/MyBooks";
import SearchBook from "./Page/SearchBook";



const router = createBrowserRouter([
   
      {
        path:"/register",
        element : <Resgister/>,
    },
    {path: "/",
        element: <Layout/>,
        children:[
            {
                index:true,
                element:<Main/>,
            },
            {
                  path:"/search",
                  element:<SearchBook/>,
            },
       
            {
                path:"/mybooks",
                element:<MyBooks/>,
            }
          
        ]
    },
    
])

export default router;