import React, {useState} from "react";
import axios from "axios";
import "./Update.css";
import {useLocation} from "react-router-dom";


const Update  = () => { // 게시글 수정 페이지

    


    const location = useLocation();
    const gauthor = location.state.writ; //해당 게시글의 기존 작성자

    const [gtitle, setgTitle] = useState(location.state.title); // //해당 게시글의 기존 제목
    const [gcontent, setgContent] = useState(location.state.content); //해당 게시글의 기존 내용
    
    const gid = location.state.id; // 해당 게시글의 기존 id

    const CompleteUpdate = ()=>{
        //해야할 것 : 수정한 내용을 기존 데이터베이스에 덮어쓰기(새로 추가 x)
        const header = {
            "Content-type": "application/json; charset=utf-8;",
            Accept : "application/json"
        }

        const datas = {
            id : gid,
            title:gtitle,
            content:gcontent
        }

        axios.post("http://localhost:8000/Updated/", datas, {
                header,
        }).then((response)=>{
            const res = response.data;
            if(res.responseCode){
                alert(res.message);
                window.location.href = "/Community";
            }
        }).catch((response)=>{
            alert(response.message);
            }
        )
     }
 
    return (
        <div className="background">
                <div className="dashBoard">
                <h2>게시글 수정</h2>
                <table className = "tb">
                    <tbody>
                        <tr>
                            <td className="td_title">제목</td>
                            <textarea className = "tt" onChange = {(e)=>{setgTitle(e.target.value)}}>{gtitle}</textarea>
                        </tr>
                        <tr>
                            <td className="td_title">작성자</td>
                            <textarea readOnly className = "tt_auth">{gauthor}</textarea>
                        </tr>
                        <tr>
                            <td className="td_title">내용</td>
                            <textarea className = "tt_cont" onChange = {(e)=>{setgContent(e.target.value)}}>{gcontent}</textarea>
                        </tr>
                    </tbody>
                </table>

                <button className = "btn2" onClick = {()=>{CompleteUpdate()}}>
                    완료
                </button>
                </div>
            </div>
    )
}

export default Update