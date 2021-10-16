# from django.urls import path
# from rest_framework.urlpatterns import format_suffix_patterns
# from . import views

from django.urls import path, include
from .views import CommentViewSet, PostViewSet



# Blog 목록 보여주기
post_list = PostViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

# Blog detail 보여주기 + 수정 + 삭제
post_detail = PostViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

comment_list = CommentViewSet.as_view({
    'get' : 'list',
    'post' : 'create'
})

comment_detail = CommentViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

urlpatterns =[
    path('', post_list),
    path('<int:pk>/', post_detail),
    path('comment/', comment_list),
    path('comment/<int:pk>', comment_detail),
]