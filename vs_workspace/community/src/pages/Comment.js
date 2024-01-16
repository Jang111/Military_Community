import React, {useState, useEffect} from 'react';
import "./Comment.css";
import axios from 'axios'
import CommentList from "./CommentList";
const Comment = (props)=>{

    const [replier, setReplier] = useState("익명"); // 작성자 : 익명으로 initialize
    const [comment, setComment] = useState(""); // 댓글
    const [comment_list, setCommentList] = useState([]); // 댓글들의 리스트(목록)값 저장 
    const [date, setDate] = useState("");// 작성날짜
    const [isValid, setIsVaild] = useState(false); // 댓글을 올바르게 작성하였는지 검사
    const copyCommentList = [...comment_list]; // '...' : 전개 연산자 사용 -> 1차원의 요소들만 배열로 저장하고 싶을 때 사용 
    const [dt_list, setDt_list] = useState([]); 

    const Registration = async() => {
        try{
            const header = {
                'Content-type': 'application/json; charset = utf-8',
                Accept : 'application/json',
            };

            const datas = {
                id:props.gid,
                comment:comment,
            };

            axios.post('http://localhost:8000/replyList/', datas, {
                header,
            }).then((response) => {
                const res = response.data;
                if(res.responseCode){
                        // const resdt = res.responseData;
                        // // 여기서 resdt.id는 댓글을 다려고 하는 컨텐츠 테이블의 값이 대입되어 있음
                        // // --> id값이 같은 컨텐츠 테이블(내용 테이블)에 대한 댓글만 볼 수 있도록 함
                        // copyCommentList.push(resdt.comment);
                        alert(res.message);
                }else{ 
                    alert(res.message) // 서버 오류
                }
            })
        }catch(e){
            alert("서버 에러")
        }finally{
            setComment(""); // 댓글 등록 후 댓글 작성 textarea는 빈문자열로 초기화
            window.location.reload();
        }
        

    }

    const Review = async() => {
        const header = {
            "Content-type" : "application/json; charset=utf-8",
            Accept : "application/json"
        }

        const datas = {
            id : props.gid
        }
       console.log(props.gid+"dsda")
        axios.post('http://localhost:8000/review/', datas, {
            header,
        }).then((response)=>{
            const res = response.data;
            console.log(res.responseCode);
            if(res.responseCode) {
                const resdt = res.responseData;
                // console.log("ddd");
                setDt_list(resdt.reply_list); // 댓글에 관한 객체를 리스트에 저장
                // copyCommentList.push(resdt.comment);
                // setCommentList(copyCommentList);
            }
        }).catch(
            (response) => {
                alert(response.data.message)
            }
        );
    }

    useEffect(()=>{ // 데이터 가져오기를 위해 사용한 hook
        console.log("useEffect_reply");
        Review();//page가 변경되면 댓글 목록 요청
    }, [])

    return (
        <div>
            <div>
                <br />
                <table className = "tb_comm">
                    <tbody>
                    {
                        dt_list.map((data, i) =>{
                            console.log(data)
                            return (
                                <CommentList replier = {replier} data = {data} key={i + 1} />
                            )
                        })
                    }
                        {/*댓글 목록 코드 작성 */}
                    <tr>
                        <td colspan = "2" className = "reply_title">
                            댓글
                        </td>
                    </tr>
                    <tr>
                        <td className = "reply_comm">
                            <textarea 
                            className = "txtarea" 
                            type="text" 
                            placeholder = "댓글 달기.." 
                            name="comment"
                            onChange={(e)=>{
                                setComment(e.target.value)
                            }}// 텍스트를 입력하는 곳이 변하면 입력한 텍스트 값을 comment 변수에 대입
                            onKeyUp = {
                                (e)=>{
                                    e.target.value.length>0 ? setIsVaild(true):setIsVaild(false)
                                }
                            } // 1글자 이상 입력하였다면 isValid를 true로 설정, 아니라면 false로 설정
                            value={comment}
                            />
                            <input 
                            className="input" 
                            type = "submit" 
                            value = "등록" 
                            onClick={Registration}
                            disabled={isValid ? false:true} // 사용자가 아무것도 입력하지 않았을 경우 비활성화
                            />
                        </td>
                    </tr>
                    </tbody>
                    {/* <input 
                            className="input" 
                            type = "submit" 
                            value = "댓글 조회" 
                            onClick={Review}
                            disabled={isValid ? false:true} // 사용자가 아무것도 입력하지 않았을 경우 게시 x
                    /> */}
                </table>
            </div>
        </div>
    )
}

export default Comment;