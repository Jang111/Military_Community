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

class Router extends React.Component{
    render(){
        return (// 각 경로와 매칭될 경우에 Rendering할 react요소를 지정.
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />  
                    <Route path="/Community" element={<Community />} />
                    <Route path="/Write" element={<Write />} />
                    <Route path="/Detail" element={<Detail />} /> 
                    <Route path="/PWDModal" element = {<PWDModal />}/>
                    <Route path="/Update" element = {<Update />}/>
                </Routes>
            </BrowserRouter>
        )
    }
}
export default Router;