import React from 'react';
import Router from './router/Router';
import './App.css';
// import './Button.css';

class App extends React.Component{
  render(){
    return(
      <div className="dashBoard">
       <div className="sideBar">
         <div className="logo">
           Military Community
           <div className="sideBarFont">
              <a href="./">홈으로</a>
           </div>
         </div>
        </div>
        <div>
          <Router />
        </div>
      </div>
      
    )
  }
}
//Router 컴포넌트가 대입된다.
export default App; // App은 사용자가 임의로 설정한 객체명이다.

