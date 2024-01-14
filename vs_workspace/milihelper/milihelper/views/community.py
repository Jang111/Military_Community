from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser

from milihelper.utils.community import get_utils_community

def get_views_community(request):
    return JsonResponse(data=get_utils_community())