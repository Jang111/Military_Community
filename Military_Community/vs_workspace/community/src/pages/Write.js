import React, {useState} from 'react';
import axios from 'axios';
import './Write.css'
import Contents from './Contents';
import crypto from "crypto-browserify";
const Write = (data) => {
    // 초기값 : ''
    //setTitle(1)--> title = 1로 설정한다는 의미
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [password, setPassword] = useState('');
    
    // const crypto = require("crypto");

    const insertDataValueCheck = ()=> {
        if(title === ''){
            alert("제목을 입력해주세요.")
            return false;
        }
        if(content === ''){
            alert("내용을 입력해주세요.")
            return false;
        }
        if(author === ''){
            alert("이름을 입력해주세요.")
            return false;
        }
        if(password === ''){
            alert("비밀번호를 입력해주세요.")
            return false;
        }
        return true;
    }
    
    const insertData = async() => {
        if(!insertDataValueCheck()){
            return;
        } // 게시글을 올바른형태로 작성하였는지 검사
        
        const headers = {
            'Content-type' : 'application/json; charset=utf-8;',
            Accept : 'application/json',
        };

        const datas = {
            id : null,
            title: title,
            content: content,
            author: author,
            password : crypto
            .createHmac('sha256', 'milihelper_key')
            .update(password)
            .digest('hex'), // encrypted password
        };

        axios.post('http://127.0.0.1:8000/Write/', datas
        ,{headers,}
        )
        .then(
            (response) => {
                if(response.data.responseCode){
                    alert(response.data.message);  
                    window.location.href = "/Community"
                }else{
                    alert(response.data.message);
                }
            }
        ).catch(
            (response) => {
                alert(response.data.message);
            }
        );
    };

    const handleClick = (e)=>{
        window.location.href = "/Community";
    }
    return (
        <div className="background">
            <h2 className="sectionTitle">글작성</h2>
                <div style={{paddingLeft: '4%', paddingRight:'4%'}}>
                    <h3 style={{fontSize:25, fontWeight: 'bold'}}>제목</h3>
                    <input className="inputs" onChange={(e)=>setTitle(e.target.value)} />
                    <h3 style={{fontSize: 25, fontWeight: 'bold', marginTop: 10}}>
                        내용
                    </h3>
                    <textarea rows={15} class="inputs" onChange={(e)=>setContent(e.target.value)}
                    style={{resize: 'none'}}
                    />
                    <div className="buttonDiv">
                        <input 
                            placeholder="Writer"
                            onChange={(e)=>setAuthor(e.target.value)}
                            style={{
                                padding: 5, 
                                width: 200,
                                fontSize: 20,
                                resize: 'none',
                                marginRight: 20,
                                borderRadius: 4,
                            }}
                        />
                        <input 
                            placeholder="Password"
                            type="password"
                            onChange={(e)=>setPassword(e.target.value)}
                            style={{
                                padding: 6, 
                                width: 200,
                                fontSize: 20,
                                resize: 'none',
                                marginRight: 20,
                                borderRadius: 4,
                            }}
                        />
                        <button className="goodButton" onClick={()=>insertData()}>
                            저장
                        </button>
                        <button className="badButton" onClick={handleClick}>
                            닫기
                        </button>
                    </div>
                </div>
        </div>
    )
}

export default Write