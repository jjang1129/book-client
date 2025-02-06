import { useEffect, useState } from "react";
import "../asset/header.scss"
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import SearchBook from "../Page/SearchBook";






const Header = () =>{

    const [token , setToken] = useState(null);
    const [keyword, setKeyword] = useState("");  // 검색어 상태 추가
    
    
   
    const {logout : authLogout} = useAuth();
    const navigate =useNavigate();


    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          handleSearch(); // 엔터 키로 검색 실행
        }
      };

      const handleSearch = () => {
       
        if (keyword.trim() !== "") {
         
         navigate("/search?keyword="+keyword+"&page="+1);
       
        
        }
      };

    useEffect(()=>{

        setToken(localStorage.getItem("token"))

       
    },[])

    const logout = ()=>{

        authLogout();
    }

   
    return(
        <>
        {token === null ? (
            <></>
        ):(
            <> 
                <div className="header">
                <div className="header-left" onClick={()=>window.location.href="/"}>
        
                    The Book Note
                </div>
                <div className="header-center">
                <input
                type="text"
                value={keyword}  
                onChange={(e) => setKeyword(e.target.value)}  
                onKeyDown={handleKeyDown} // 엔터 키 처리
                placeholder="책을 검색하세요..."
              />
              <button onClick={handleSearch}>검색</button>
                </div>
                <div className="header-right">
                   <p onClick={logout}>LOGOUT</p>
                   <p onClick={()=> window.location.href= "/mybooks"}>My Books</p>
                </div>
             
                
            
            </div>
            
           
            </>
        )}

    </>)
}

export default Header;