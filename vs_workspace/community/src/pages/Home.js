import React from 'react';
import '../Button.css';
//함수 1개당 컴포넌트 1개!
const Home = () => {
    
    function handleClick(event){ //커뮤니티(버튼) 클릭시, 커뮤니티(컴포넌트)로 이동
        window.location.href = "/Community"
    }
    return(
            <div className="background">
                <div className="dashBoard">
                    <button class="btn">복지</button>
                    <button class="btn">계획표</button>
                    <button class="btn" onClick={handleClick}>커뮤니티</button> 
                    <button class="btn">마이페이지</button>
                </div>
            </div>
    )
    
}

export default Home; //Router.js에서 import함