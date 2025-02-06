import { useEffect, useState } from "react";
import { fetchBooks , addBook} from "../api/book";
import "../asset/main.scss";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/AuthContext";
import { addCheck} from "../api/user";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


const SearchBook = () => {
  const navigate = useNavigate();  // useNavigate 추가
  const [searchParams] = useSearchParams();
  
   const { token } = useAuth();
  
  const keyword = searchParams.get("keyword");  // URL에서 keyword 파라미터 추출
  const currentPage = parseInt(searchParams.get("page")) || 1;  // URL에서 페이지 번호 가져오기, 기본값은 1
  const [book, setBooks] = useState([]);  // 초기값 null
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [pageBox, setPageBox] = useState([]);  // 페이지 버튼을 저장할 배열
  const [min, setMin] = useState(0);  // 최소 페이지
  const [max, setMax] = useState(10);  // 최대 페이지

  const [myBook , setMyBook] =useState({
    bookCode:"",
    title:"",
    price:"",
    author:"",
    img:"",
    publisher:"",
  })
  const [addedBook, setAddedBook ] = useState([])
 

  const search = async (page = 1) => {
    if (keyword.trim() === "") return; // 검색어가 비어있다면 검색하지 않음

    const response = await fetchBooks(keyword, page);  // 1페이지로 검색
    const response2 = await addCheck(localStorage.getItem("email"))
    const result = response2.data
    
    setAddedBook(result);
    setBooks(response?.items);
    setTotal(response?.total);  // 검색된 총 갯수
    window.scrollTo(0, 0); // 화면 상단으로 스크롤
  };

  // 페이지 변경 시 URL에 반영하고 검색 함수 호출
  const search1 = (page) => {
    navigate(`/search?keyword=${keyword}&page=${page}`);
    search(page); // 페이지 번호를 currentPage로 설정하여 검색
  };

  // 페이지네이션 계산
  useEffect(() => {
    if (total) {
      const num = Math.ceil(total / 10); // 페이지 수 계산 (올림 처리)
      setTotalPage(num); // 총 페이지 수 설정

      const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
      const endPage = Math.min(startPage + 9, num);

      const buttons = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
      setPageBox(buttons); // 페이지 번호 배열 업데이트
    }
  }, [total, currentPage]);

  // 검색 함수 호출
  useEffect(() => {
    if (keyword) {
      search(currentPage);  // 페이지 번호를 currentPage로 설정하여 검색
    } else {
      console.log("keyword가 없거나 비어 있습니다.");
    }
  }, [keyword, currentPage ]);

  // 이전 페이지 버튼
  const pageDown = () => {
    const num = Math.ceil(total / 10) // 총 페이지의 수 1,2,3,4,..6페이지  21페이지면 
    const groupNumber= Math.floor(currentPage/10+1);   // 현재 페이지가 속한 그룹이 어딘지 1~10 = 1, 11~20 = 2  21~30= 3 31 = 4 
    if (currentPage > 1) {
      console.log("작동");
      if(currentPage%10 === 0){
        if(currentPage === 10){
          console.log("10일때")
          const prevPage = 1;
        navigate(`/search?keyword=${keyword}&page=${prevPage}`);
        search(prevPage);
        console.log(prevPage);

        }else {
          const prevPage = (groupNumber-2)*10;
          navigate(`/search?keyword=${keyword}&page=${prevPage}`);
          search(prevPage);

        }
       
      }else if(currentPage%10 > 0){
        if(currentPage< 10){
          const prevPage = 1;
        navigate(`/search?keyword=${keyword}&page=${prevPage}`);
        search(prevPage);


        }else {
          const prevPage = (groupNumber-1)*10;
          navigate(`/search?keyword=${keyword}&page=${prevPage}`);
          search(prevPage);

        }
      


      }
      
     
    } else {
      alert("이미 첫 페이지입니다.");
    }
  };

  const newBook = async(data)=>{

    const response = await addBook(data);
    const response2 = await addCheck(localStorage.getItem("email"))
    const result = response2.data
    
    setAddedBook(result);

 
   if(response){
    alert("추가 완료되었습니다!")
   }else {
    alert("추가 실패 이미 추가된 책인지 확인해보세요")
   }
   
   
    
  }
 
   

  // 다음 페이지 버튼
  const pageUp = () => {
    const num = Math.ceil(total / 10) // 총 페이지의 수 1,2,3,4,..6페이지  16페이지면 
    const groupNumber= Math.floor(currentPage/10+1);   // 현재 페이지가 속한 그룹이 어딘지 1~10 = 1, 11~20 = 2 
    if (currentPage  < num ) {
      
      const nextPage = groupNumber *10+1;
      if(nextPage >= num ){
      navigate(`/search?keyword=${keyword}&page=${num}`);
      search(num);
      }else{
        navigate(`/search?keyword=${keyword}&page=${nextPage}`);
        search(nextPage);
      }
    } else {
      alert("이미 마지막 페이지입니다.");
    }
  };        
  
 
  

 
  const isBookAdded = (isbn) => {
    if(addedBook?.some(book => book.bookCode == isbn)){
      return true;
    }else {
      return false;
    }

  };

  

  


  return (
    <div className="main-box">
      {book === null ? (
        <div>책을 검색해 보세요</div>
      ) : (
        <>
          {book?.length === 0 ? (
            <div>검색 결과가 없습니다.</div>
          ) : (
            book?.map((book, index) => (
              
              
              <>
              
             
              <div className="book-box" key={index}>
                <div className="book-box-left">
                <div className="book-img">
                  <img className="book-image" src={book?.image} alt={book?.title} />
                </div>
                </div>
                <div className="book-box-right">
                <div className="book-title">{book?.title}</div>
                
                  
                  <div className="book-info">
                    {book?.author} | {book?.publisher} | {book?.pubdate.slice(0, 4)}년 {book?.pubdate.slice(4, 6)}월 {book?.pubdate.slice(6, 8)}일
                  </div>
                  <div className="price-add">
                  <div className="book-price">
                    {book?.discount}원
                  </div>
                  <div className="book-button">
                    
                
              {isBookAdded(book?.isbn) ? (
                <button disabled>Added</button>  
              ) : (
                <button onClick={() => newBook({
                  bookCode: book?.isbn,
                  title: book?.title,
                  price: book?.discount,
                  author: book?.author,
                  publisher: book?.publisher,
                  img: book?.image
                })}>Add </button>
              )}
             
                   
                     
                 
                  </div>
                  </div>

                  </div>
                 

               
               
                
               
              </div>

           
          </>
            ))
          )}
           
       
        </>
      )}
     {book && book.length > 0 && (
        <div className="button-container">
          <button className="prev-page" onClick={pageDown}>이전 페이지</button>
          {pageBox?.length === 0 ? (
            <button>1</button>
          ) : (
            pageBox.map((page, index) => (
              <button  className={page == currentPage ? "on" : "off"} key={index} onClick={() => search1(page)}>
                {page}
              </button>
            ))
          )}
          <button className="next-page" onClick={pageUp}>다음 페이지</button>
        </div>
      )}
    </div>
  );
};

export default SearchBook;
