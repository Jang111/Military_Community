import React, {useState} from 'react';

const CommentList = (props)=>{
    return (
        <div>
            {console.log(props.index.reply_id + "mmm")}
            { (props.index.reply_id === props.gid) ? // 댓글 테이블과 컨텐츠 테이블의 id가 같은지 검사
                 (<div>{props.replier}<br />
                 {props.index.comment}</div>) : (alert("오류 발생"))}
        </div>
    )
}
export default CommentList;