import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
  });

  const authorize = axios.create({
    baseURL: "http://localhost:8080/api/private",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },

    
  });

  //회원가입 
  export const register = async (data) => {
    // 파라미터로 data 받아서감 (바디로 받음)
  
    return await instance.post("register", data);
  };

  // 보유 라이브러리 리스트 뽑기 

  export const addCheck = async (email) => {
    return await authorize.get("/check", {
      params: {
        email,  // bookCode를 쿼리 파라미터로 전달
      }
    });
  };

  // 보유 책 리스트 
  export const list = async (email) =>{

    return await authorize.get("/list" , {

      params :{
        email,
      }
    })
  } 

  // 책 삭제 

  export const remove = async (email,bookCode) =>{
      
    return await authorize.delete("/remove" ,{

      params:{
        email,
        bookCode,
      }
    } )

  }

  export const login = async (data) => {

    return await instance.post("login",data)
  }
  
