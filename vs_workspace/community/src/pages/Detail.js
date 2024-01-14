import React,{useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import axios from 'axios';
import "../App.css";
import "./Detail.css";
import Comment from "./Comment";
import PWDModal from "./PWDModal";
import PWDModal_DEL from "./PWDModal_DEL";
import {useNavigate} from "react-router-dom";

const Detail = () =>{

    const location = useLocation();
    const title = location.state.title;
    const pubDate = location.state.pub_date;
    const content = location.state.content;
    const author = location.state.author;
    const id = location.state.id;
    const password = location.state.password;

    const [modal_is_open_update, setModalIsOpen_upt] = useState(false);
    const [modal_is_open_delete, setModalIsOpen_del] = useState(false);

    // console.log(title); --> Contents.js에서 선택한 데이터 리스트의 제목 출력
    
    const [gtitle, setTitle] = useState("");//db의 title 정보 저장
    const [gpubDate, setPubDate] = useState(""); //db의 pub-date 정보 저장
    const [gcontent, setContent] = useState(""); //db의 content 정보 저장
    const [gauthor, setAuthor] = useState(""); // db의 author 정보 저장
    const [gid, setId] = useState(0);
    

    const lookDetail = async()=>{
        setId(id);
        setTitle(title); // gtitle 초기화
        setPubDate(pubDate);
        setContent(content);
        setAuthor(author);
        console.log(id+"check");
    }

    useEffect(()=>{
        lookDetail();
        console.log(title);
    }, []); // Too many rerenders에러가 나타날 경우를 방지하기 위해 작성
    //setState()함수를 컴포넌트 바디에 그냥 선언해주게 되면 state가 변화될 때마다 컴포넌트가 리렌더링되고,
    // 컴포넌트가 리렌더링 되면서 또다시 setState가 실행된다.
    // -> 무한 반복 -> useEffect()함수 안에 선언

    return(
        <div class="background">
            <div class="dashBoard">
                <h2>작성글</h2>
                <table className = "tb">
                    <tbody>
                        <tr>
                            <td className="td_title">제목</td>
                            <td className = "td">{gtitle}</td>
                        </tr>
                        <tr>
                            <td className="td_title">작성자</td>
                            <td className = "td">{gauthor}</td>
                        </tr>
                        <tr>
                            <td className="td_title">날짜</td>
                            <td className = "td">{gpubDate}</td>
                        </tr>
                        <tr>
                            <td className="td_title">내용</td>
                            <td className = "td">{gcontent}</td>
                        </tr>
                    </tbody>
                </table>
                <button className = "btn2" onClick = {()=>setModalIsOpen_upt(true)}>
                    수정
                </button>
                <button className = "btn3" onClick = {()=>setModalIsOpen_del(true)}>
                    삭제
                </button>
                <PWDModal modal_is_open = {modal_is_open_update} setModalIsOpen={setModalIsOpen_upt} writer = {gauthor} password = {password} title={gtitle} content={gcontent} id = {gid}/>
                <PWDModal_DEL modal_is_open = {modal_is_open_delete} setModalIsOpen={setModalIsOpen_del} writer = {gauthor} password = {password} id={gid}/>
                <Comment gid = {gid}/> {/*댓글 컴포넌트*/}
            </div>
            
        </div>
        
    )
    }


export default Detail