from django.contrib import admin
from django.urls import path
from milihelper.views.community import get_views_community
from milihelper.views.board import insert_Data
from milihelper.views.board import look_list
from milihelper.views.board import reply_list
from milihelper.views.board import updated_db
from milihelper.views.board import delete_db
from milihelper.views.board import review_list

urlpatterns = [
    path('community/', get_views_community),
    path('Write/', insert_Data),
    path('lookList/', look_list),
    path('replyList/', reply_list),
    path('Updated/', updated_db),
    path('delete/', delete_db),
    path("review/", review_list),
]