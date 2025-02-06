import { useState } from "react";
import { register } from "../api/user";
const Resgister = ()=>{

 const [user, setUser] = useState({
    email:"",
    pwd:"",
    nickname:""
 })


 const registerSubmt = async() =>{
 const   response = await register (user) 
   console.log(response);
   console.log(response.data);
 if(response.data == false){
    alert("중복된 아이디 입니다 ")
 } else {
    alert("회원가입 완료!")
 }
 }

    return <>
    <div>
        닉네임 : <input type="text"  value={user.nickname} onChange={(e)=>
            setUser({...user,nickname:e.target.value})
        }/>
        아이디 : <input type="text" value={user.email}  onChange={(e)=>
            setUser({...user,email:e.target.value})
        }/>
        비밀번호 : <input type="text" value={user.pwd} onChange={(e)=>
            setUser({...user,pwd:e.target.value})
        }/>
        <button onClick={registerSubmt}>확인</button>
    </div>
    </>
}
export default Resgister;