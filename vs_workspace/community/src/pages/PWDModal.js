import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Modal from 'react-modal';
import './PWDModal.css';
import Update from "./Update";
import {useNavigate} from "react-router-dom";

const PWDModal = (props)=>{
    const [writer, setWriter] = useState("");
    const [password, setPassword] = useState("");
    const [Hpassword, setHpassword] = useState(""); // 암호화된 비밀번호값 저장

    const crypto = require("crypto");

    const navigate = useNavigate(); // 다른 페이지로 데이터를 전달하기 위한 함수

    const upDate = (writer,password)=>{
        setHpassword(crypto.createHmac("sha256", "milihelper_key").update(password).digest("hex")); // createHmac의 두번째 인자값이 키인데 그것을 같게 작성하면 결과값도 항상 같게 나옴.
        // console.log(props.password);
        if(writer === props.writer && Hpassword === props.password){
            //password : 입력받은 password, props.password : 기존 password
            //해야할 것 : 입력받은 password 복호화하여 기존 비번과 일치하는지 검사 후 수정 컴포넌트로 이동
            console.log("success");
            navigate("/Update", {
                state:{
                    writ:writer,
                    title : props.title,
                    content: props.content,
                    id : props.id
                } // /Detail 페이지로 전송할 데이터
            })
            window.location.href = "/Update";
        }else{
            alert("정보가 올바르지 않습니다.")
        }
    }

    return (
        <Modal className = "modal" isOpen={props.modal_is_open} ariaHideApp = {false}>
            <div style={{height:"100%"}}>
                <div className = "buttonDiv">
                    <input 
                    placeholder="writer"
                    onChange={(e)=>{setWriter(e.target.value)}}
                    style={{
                        padding:6,
                        marginTop:6,
                        width:200,
                        fontSize:20,
                        resize:"none",
                        marginRight:20,
                        borderRadius:5,
                    }}
                    />
                    <input 
                    placeholder="password"
                    type="password"
                    onChange={(e)=>{setPassword(e.target.value)}}
                    style={{
                        padding:6,
                        width:200,
                        fontSize:20,
                        resize:"none",
                        borderRadius:4,
                        
                    }}
                    />
                    <button className="goodButton" onClick={()=>{upDate(writer, password)}}>입력</button>
                    <button className="badButton" onClick={()=>props.setModalIsOpen(false)}>닫기</button>
                </div>
            </div>
        </Modal>
    )
}

export default PWDModal