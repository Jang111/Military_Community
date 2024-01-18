from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
import json
from milihelper.utils.board import insert_utils_board
from milihelper.utils.board import look_utils_list
from milihelper.utils.board import reply_utils_list
from milihelper.utils.board import updated_db_list
from milihelper.utils.board import delete_db_list
from milihelper.utils.board import review_utils_list

#게시글 등록
@csrf_exempt
def insert_Data(request):
    data = json.loads(request.body)
    return JsonResponse(
        data = insert_utils_board(
            id = data.get('id', None),
            title = data.get('title', None),
            content = data.get('content', None),
            author = data.get('author', None),
            password = data.get('password', None)
        )
    )

#게시글 여러개 조회
@csrf_exempt
def look_list(request):
    data = json.loads(request.body)
    return JsonResponse(
        data = look_utils_list(
            page = data.get('page', None)
        )
    )

#과거에 등록했던 댓글 조회
@csrf_exempt
def reply_list(request):
    data = json.loads(request.body)
    return JsonResponse(
        data = reply_utils_list(
            id = data.get('id', None),
            comment = data.get('comment', None)
        )
    )

@csrf_exempt
def updated_db(request):
    data = json.loads(request.body)
    return JsonResponse(
        data = updated_db_list(
            id = data.get('id', None),
            title = data.get('title', None),
            content = data.get('content', None),
        )
    )

@csrf_exempt
def delete_db(request):
    data = json.loads(request.body)
    return JsonResponse(
        data = delete_db_list(
            id = data.get('id', None),
        )
    )

@csrf_exempt #: 댓글 db 등록 api
def reply_list(request):
    data = json.loads(request.body)
    return JsonResponse(
        data = reply_utils_list(
            id = data.get("id", None),
            comment = data.get("comment",None)
        )
    )

@csrf_exempt #: 댓글 조회 api
def review_list(request):
    data = json.loads(request.body)
    return JsonResponse(
        data = review_utils_list(
            id = data.get("id", None)
        )
    )

