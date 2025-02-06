import { useEffect, useState } from "react";
import { list , remove} from "../api/user";

import "../asset/mybooks.scss"

const MyBooks = () =>{


    const [book, setBook] = useState([])
      

     const getList = async()=>{
        const response = await list(localStorage.getItem("email"))
        setBook(response.data);
         
     }

     const removeBook = async (bookCode)=>{
       
        const response = await remove(localStorage.getItem("email"),bookCode)
     }


    useEffect(()=>{
        getList()

    },[book])


    return (<div className="mybook-container">
        <div className="book-container-head">
            <div className="container-name">
                  제목
            </div>
            <div className="container-author">
                저자
            </div>
            <div className="container-pulisher">
                출판사
            </div>
            <div className="container-price">
                가격
            </div>

        </div>
              <>
            {book?.map((book)=>(
                <div className="book-container">
                    
                <div className="book-info">
                    <div className="info-img"><img src={book?.img}></img></div>
                    <div className="info-title">{book?.title}</div>
                    <div className="info-author">{book?.author} </div>
                    <div className="info-pulisher">{book?.publisher} </div>
                    <div className="info-price">{book?.price}원</div>
                    <button onClick={()=>removeBook(book?.bookCode)}>x</button>
            
             </div>
             </div>
            ))}
            </>
            </div>
    )



}
export default MyBooks;