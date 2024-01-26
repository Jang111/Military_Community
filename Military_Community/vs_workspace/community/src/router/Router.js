import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import Home from '../pages/Home';
import Community from '../pages/Community';
import Write from '../pages/Write';
import Detail from "../pages/Detail";
import PWDModal from "../pages/PWDModal";
import Update from "../pages/Update";
// import { HashRouter as BrowserRouter,Route, Routes } from "react-router-dom";

class Router extends React.Component{
    render(){
        console.log(process.env.PUBLIC_URL);
        return (// 각 경로와 매칭될 경우에 Rendering할 react요소를 지정
            <BrowserRouter>
                <Routes>
                    <Route path={process.env.PUBLIC_URL+"/"} element={<Home />} />  
                    <Route path={process.env.PUBLIC_URL+"/Community"} element={<Community />} />
                    <Route path={process.env.PUBLIC_URL+"/Write"} element={<Write />} />
                    <Route path={process.env.PUBLIC_URL+"/Detail"} element={<Detail />} /> 
                    <Route path={process.env.PUBLIC_URL+"/PWDModal"} element = {<PWDModal />}/>
                    <Route path={process.env.PUBLIC_URL+"/Update"} element = {<Update />}/>
                </Routes>
            </BrowserRouter>
        )
    }
}
export default Router;