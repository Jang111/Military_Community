import React, {useState} from 'react';
import Header from './Header';
import Write from './Write';
import Contents from './Contents';
import axios from 'axios';

const Community = () => {
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName="X-CSRFToken";
    // axios.defaults.headers.common["X-CSRFToken"] = getCookie("csrftoken");    
    console.log("dddd")
    return(
        <div className="background">
            <div className="dashBoard">
                <Header />
                <Contents />
            </div>
        </div>
    )    
}

export default Community