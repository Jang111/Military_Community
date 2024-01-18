import React, {useState} from 'react';
import Header from './Header';
import Write from './Write';
import Contents from './Contents';
import axios from 'axios';

const Community = () => {
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName="X-CSRFToken";
    // axios.defaults.headers.common["X-CSRFToken"] = getCookie("csrftoken");    
    return(
        <div class="background">
            <div class="dashBoard">
                <Header />
                <Contents/>
            </div>
        </div>
    )    
}

export default Community