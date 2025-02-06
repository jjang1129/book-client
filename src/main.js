import { useEffect, useState } from "react";
import { fetchBooks } from "./api/book";
import { login } from "./api/user";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./Components/AuthContext";
import "./asset/main.scss"
import bookImage from './asset/book.webp';








const Main = ()=>{
   
    const navigate = useNavigate();
    const { login: authLogin } = useAuth(); // login이 다른 함수명으로 있어서 이름을 변경
    const { token } = useAuth();
    const [user , setUser] = useState({
        email:"",
        pwd:"",
    }
    );

   

    const [isLogin, setIsLogin ] = useState(false);


 
    const getLogin= async()=>{
        const response = await login(user)
        const  result= response.data;
        if(result){
            alert("로그인 성공")
            
            authLogin(result)
            setIsLogin(true);
           
            console.log(result)
         
        }else {
            alert("아이디 또는 비밀번호가 틀렸습니다")
        }

    }


    useEffect(()=>{

      
    },[isLogin])
    
 

    return (
        <>
        { !token &&
            <div className="main-box">
            <div className="start-container">
                <div className="container-left">
                    <img src={bookImage} style={{width: "500px",height : "500px"}}></img>
                   
                </div>
                <div className="container-right">
                <div className="information">The Book Note에 오신것을 환영합니다</div>
                <div className="login-form">
                    <input type="text" placeholder="ID" onChange={(e)=>setUser({...user,email:e.target.value})}  value={user.email}></input>
                    <input type="password" placeholder="PassWord" onChange={(e)=>setUser({...user,pwd:e.target.value})} value={user.pwd}></input>
                    <button onClick={getLogin}>LOGIN</button>
                </div>
                <a href="/register">Create your Account</a>
                </div>
               
            
            
            </div>
          </div>
         }
    </>
    )
}

export default Main;