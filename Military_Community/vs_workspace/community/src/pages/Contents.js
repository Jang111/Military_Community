import React, {useState, useEffect} from 'react';
import './Content.css';
import Paging from '../utils/Paging';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const Contents = () => {
    
    const navigate = useNavigate(); // 다른 페이지로 데이터를 전달하기 위한 함수

    
    //목록 선택하기 위한 title변수 설정
    const [title, setTitle] = useState('');

    //board list Data
    const [data_list, setDataList] = useState([]);

    //PagingNation
    const [paging, setPaging] = useState(Paging);

    //요청 시 값 검증
    const lookBoardListCheck = () =>{
        if(paging.page < 1){
            alert("값이 부정확합니다.");
            return false;
        }
        return true;
    };

    const lookBoardList = async() => {
        // console.log("lookBoardList");
        try{
            paging.loading = true;
            if(!lookBoardListCheck()){
                return;
            }
            const header = {
                'Content-type' : 'application/json; charset=utf-8;',
                Accept : 'application/json',
            };
            const data = {
                page : paging.page // 현재 페이지
            };
            // console.log(paging.loading)
            axios.post("http://127.0.0.1:8000/lookList/", data,{
                header,
            }).then(
                (response) => {
                    const res = response.data;//응답값에서 data값 parsing
                    if(res.responseCode){
                        const resData = res.responseData;
                        //total_count 요소을 Paging객체에 추가
                        setPaging({...paging, total_count : resData.total_count});
                        setDataList(resData.dt_list);
                        
                        // console.log(resData.dt_list);
                    }else{
                        alert(res.message);
                    }
                }).catch((response)=>{
                    alert(response);
                });
        }catch(e){
            alert("서버 에러")
        }finally{
            paging.loading = false;
        }
    };

    function handleClick(event){ //커뮤니티(버튼) 클릭시, 커뮤니티(컴포넌트)로 이동
        window.location.href = "/Write"
    }

    const seeDetail = (id, tit, cont, dt, auth, pwd)=>{ // 게시판 요소 클릭 시 컨텐츠 조회 기능
        navigate("/Detail", {
            state:{
                id : id,
                title : tit,
                content: cont,
                pub_date: dt,
                author : auth,
                password : pwd,
            } // /Detail 페이지로 전송할 데이터
        })
    }
    
    //page 선택
    const onSetPage = (value) => {
        //Paging 객체에 page 추가
        setPaging({...paging, page:value});
    };

    //게시글 선택 함수
    const selectContent = (Title)=>{
        console.log("choiced title : ",Title)
        setTitle(Title);
    }

    useEffect(()=>{ // 데이터 가져오기를 위해 사용한 hook
        console.log("useEffect");
        lookBoardList();//page가 변경되면 데이터 목록 요청
    }, [paging.page])
    return (
        <div>
            <div>
                <h2>선배와의 대화</h2>
            </div>
            
            <table className = "tb1">
                <button class="btn2" onClick={handleClick}>
                    글쓰기
                </button>
                <thead>
                    <tr>
                        <th class="number">번호</th>
                        <th class="tit">제목</th>
                        <th class="date">작성일자</th>
                        <th class="writer">작성자</th>
                    </tr>
                </thead>
                {paging.loading && (
                <tbody>
                  <tr>
                    <td style = {{height: 400}}
                        rowSpan = {10}
                        colSpan = {4}
                    >
                        Loading...
                    </td>  
                  </tr>  
                </tbody>
                )}
                {(paging.loading === false) && (data_list.length<1) ? (
                <tbody>
                    <tr>
                        <td style = {{height:400}}
                        colSpan = {4}>
                            No Data
                        </td>
                    </tr>
                </tbody>
                ):(
                    <tbody>
                        {data_list.map((index, i)=>( // index : 테이블의 각 행의 요소(번호, 제목, 작성날짜, 작성자)를 의미 , i : '번호'만을 의미
                            <tr
                                key={index.title}
                                onClick={()=>selectContent(index.title)}
                            >
                                <td>
                                    {paging.total_count-(paging.page-1) * 10 - i}
                                </td>
                                <td style={{cursor:'pointer',}} onClick={()=>seeDetail(index.id,index.title, index.content, index.pub_date, index.author, index.password)}>{index.title}</td>
                                <td>{index.pub_date}</td>
                                <td>{index.author}</td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
            <ul style={{textAlign:"center", paddingTop:12}}>
                {Array.from(
                    {length:(paging.total_count / 10) + 1},
                    (_, idx) => (
                        <li 
                            key={idx+1}
                            style={{
                                padding:8,
                                margin:4,
                                borderRadius:4,
                                cursor:'pointer',
                                border:'2px solid green',
                                width:10,
                                height:10,
                                display: 'inline-block',
                            }}
                            onClick={()=>onSetPage(idx+1)}
                        >
                            {idx+1}
                        </li>
                    ),
                )}
            </ul>
        </div>
    )
}

export default Contents