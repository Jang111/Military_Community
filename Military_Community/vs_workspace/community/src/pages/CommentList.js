import React, {useState} from 'react';
import './CommentList.css'
const CommentList = (props)=>{
    console.log(props.key)
    return (
        <div>
            {/* {console.log(props.index.reply_id + "mmm")} */}
            <div>---------------------------------</div>
            <div>{props.replier}</div>
            <br/>
            <textarea readOnly className="tt_reply">{props.data.comment+"\n- "+props.data.rep_date}</textarea>
            
        </div>
    )
}
export default CommentList;