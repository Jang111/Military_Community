import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Modal from 'react-modal';
import './PWDModal_DEL.css';
import Update from "./Update";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const PWDModal_DEL = (props)=>{
    const [writer, setWriter] = useState("");
    const [password, setPassword] = useState("");
    const [Hpassword, setHpassword] = useState(""); // 암호화된 비밀번호값 저장

    const crypto = require("crypto");

    const navigate = useNavigate(); // 다른 페이지로 데이터를 전달하기 위한 함수

    const Delete = (writer,password)=>{
        setHpassword(crypto.createHmac("sha256", "milihelper_key").update(password).digest("hex")); // createHmac의 두번째 인자값이 키인데 그것을 같게 작성하면 결과값도 항상 같게 나옴.
        // console.log(props.password);
        if(writer === props.writer && Hpassword === props.password){
            //Hpassword : 입력받은 password를 해시를 통해 암호화 한것, props.password : 기존 password
            if(window.confirm("한번 삭제하면 복구할 수 없습니다.\n 그래도 삭제하시겠습니까?")){ // 삭제할 것인지 확인 창 띄움.

                const header = {
                    "Content-type" : "application/json; charset = utf-8",
                    Accept : "application/json"
                }
                const datas = {
                    id : props.id
                }
                axios.post("http://localhost:8000/delete/", datas, {
                    header,
                }).then((response)=>{
                    const res = response.data;
                    if (res.responseCode){
                        alert(res.message)
                        window.location.href = "/Community";
                    }
                })
                window.location.href = "/Community";
                }
                else{
                    return false;
                }
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
                    <button className="goodButton" onClick={()=>{Delete(writer, password)}}>입력</button>
                    <button className="badButton" onClick={()=>props.setModalIsOpen(false)}>닫기</button>
                </div>
            </div>
        </Modal>
    )
}

export default PWDModal_DEL