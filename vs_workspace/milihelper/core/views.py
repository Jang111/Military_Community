# from django.http import HttpResponse, JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from rest_framework.parsers import JSONParser
# import json
# from milihelper.utils.board import insert_utils_board

# #게시글 등록
# @csrf_exempt
# def insert_Data(request):
#     data = json.loads(request.body)
#     return JsonResponse(
#         data = insert_utils_board(
#             id = data.get('id', None),
#             title = data.get('title', None),
#             content = data.get('content', None),
#             author = data.get('author', None),
#         )
#     )