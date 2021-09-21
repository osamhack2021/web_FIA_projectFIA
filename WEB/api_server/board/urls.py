# from django.urls import path
# from rest_framework.urlpatterns import format_suffix_patterns
# from . import views

from django.urls import path, include
from .views import PostViewSet

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

urlpatterns =[
    path('', post_list),
    path('<int:pk>/', post_detail),
]

# urlpatterns = [
#     path('', views.PostList.as_view()),
#     path('<int:pk>/', views.PostDetail.as_view()),
# ]

# urlpatterns = format_suffix_patterns(urlpatterns)