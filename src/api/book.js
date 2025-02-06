import axios from "axios";

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});
const authorize = axios.create({
  baseURL: "http://localhost:8080/api/private",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },

  
});
// 요청을 보내는 함수
export const fetchBooks = async (title,page) => {
  try {
    // 요청 보내기 (쿼리 파라미터를 동적으로 추가)
    const response = await authorize.get(`/book?title=${title}&page=${page}`);

    // 응답 데이터 출력
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

export const addBook = async(data) =>{

  const response = await authorize.post("/add",data);
  return response.data;

}