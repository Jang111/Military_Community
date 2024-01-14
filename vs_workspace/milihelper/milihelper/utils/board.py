#from django.db import models
from core import models
import traceback
from core.utils import refiner
from django.utils import timezone
def insert_utils_board(
        id =None,
        title =None,
        content =None,
        author =None,
        password = None,
):
    try:
        if not title:
            return {
                'responseCode' : False,
                'message' : '게시판 제목이 입력되지 않았습니다.'
            }
        if not content:
            return {
                'responseCode' : False,
                'message' : '게시판 내용이 입력되지 않았습니다.'
            }
        if not author:
            return {
                'responseCode' : False,
                'message' : '작성자를 입력받지 못하였습니다.'
            }
        if not password:
            return{
                'responseCode' : False,
                'message' : '비밀번호를 입력받지 못하였습니다.'
            }
        if id:
            pass
        else:
            seq = None
            try:
                seq = models.MainBoard.objects.latest('id').id+1 
                # models.MainBoard.objects.latest('id') : 가장 최근에 저장된 models 객체 반환

            except models.MainBoard.DoesNotExist:
                seq = 1
            mainBoard= models.MainBoard()
            mainBoard.id = seq
            mainBoard.title = title
            mainBoard.content = content
            mainBoard.author = author
            mainBoard.password = password
            mainBoard.save()
        return {
            'responseCode' : True,
            'message' : '게시글이 저장되었습니다.'
        }
    except Exception:
        print(traceback.format_exc())
        return{
            'responseCode' : False,
            'message' : '에러'
        }
    
def look_utils_list(
        page=None
):
    try:
        # print("heelooo")
        total_count = models.MainBoard.objects.count()
        dt_list = list(models.MainBoard.objects.all().
                       order_by('-id').values()[(page-1) * 10:(page-1) * 10 + 10])
        return{
            "responseCode" : True,
            "responseData" : {
                "dt_list":refiner.result_query_refiner(dt_list),
                "total_count" : total_count
            },
            "message" : "성공적으로 조회되었습니다."
        }
    except Exception:
        print(traceback.format_exc())
        return{
            "responseCode" : False,
            "message" : "서버에러"
        }

def reply_utils_list(
        id = None, #댓글 테이블의 id값과 컨텐츠 테이블의 id값을 비교하여 같은 id값을 찾고 해당 컨텐츠 테이블에만 댓글이 달릴 수 있도록 함
        #파라미터 id값은 컨텐츠 테이블의 것이다.
        comment = None
):
    try:
        if not comment:
            return {
                "responseCode" : False,
                "message" : "댓글 내용을 입력해주십시오."
            }
        seq = None
        dt_list = None
        print("senajndj")
        
        try:
            seq = id
            # seq = models.MainReply.objects.latest("id").id + 1
            dt_list = list(models.MainReply.objects.all().order_by("-id").values())
        except models.MainReply.DoesNotExist:
            print("senajndj+error")
            seq = 1
        
        reply = models.MainReply()
        reply.reply_id = seq
        reply.comment = comment
        reply.save()
        return {
            "responseCode" : True,
            "responseData" : {
                "reply_id" : seq,
                "dt_list" : refiner.result_query_refiner(dt_list),
                "comment" : comment
            },
            "message" : "댓글 등록이 완료되었습니다."
        }
    
    except Exception:
        print(traceback.format_exc())
        return {
            "responseCode" : False,
            "message" : "서버 에러"
        }

def updated_db_list( # 수정한 내용을 데이터베이스에 업데이트하는 API
        id = None,
        title=None,
        content=None,
):
    try:
        if not title:
            return {
                "responseCode" : False,
                "message" : "제목을 입력해주십시오."
            }
        if not content:
            return{
                "responseCode" : False,
                "message" : "내용을 입력해주십시오."
            }
        print("여기")
        
        update_board = models.MainBoard.objects.get(id = id) # 선택한 게시글의 id값(rvalue)과 기존의 id값(lvalue 혹은 primary key(pk))를 비교하여 해당하는 정보(제목, 내용, 업데이트 날짜)를 수정하기 위해 해당 객체를 받아옴
        update_board.title = title
        update_board.content = content
        update_board.update_date = timezone.now()
        update_board.save()

        return {
            "responseCode" : True,
            "message" : "게시글 수정이 완료되었습니다."
        }

    except Exception:
        print(traceback.format_exc())
        return {
            "responseCode" : False,
            "message" : "서버 에러"
        }
    
def delete_db_list(
    id = None
):
    try:
        print("DJNS")
        item = models.MainBoard.objects.get(id = id)
        item.delete() # 해당하는 게시글 DB정보 삭제
        
        return {
            "responseCode" : True,
            "message" : "삭제가 완료되었습니다."
        }
    except Exception:
        print(traceback.format_exc())
        return{
            "responseCode": False,
            "message" : "서버에러"
        }
# def look_reply_utils_list(
#         id = None
# ):
#     try:
        
#     except Exception:
#         print(traceback.format.exc())
#         return {
#             "responseCode" : False,
#             "message" : "댓글 조회 불가"
#         }
