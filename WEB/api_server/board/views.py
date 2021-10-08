#데이터 처리
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from rest_framework import viewsets, filters
from dj_rest_auth.jwt_auth import JWTCookieAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsAdminOwnerOrReadOnly
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

# Post의 목록, detail 보여주기, 수정하기, 삭제하기 모두 가능
class PostViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTCookieAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly, IsAdminOwnerOrReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    # filter_backends = [DjangoFilterBackend]
    filter_backends = [SearchFilter, DjangoFilterBackend, OrderingFilter]

    # 검색시 & 기능 사용가능, 정확하게 매칭이 되어야 검색 결과가 나온다.
    filter_fields = ['user__email', 'tag', 'board_type', 'post_status']
    # 검색시 search=... 형태로 사능 가능, 검색 내용이 포함된 결과물들을 보여준다.
    search_fields = ['title', 'body',]

    ordering_fields = ['id']
    ordering = ['-id']


    # Post 데이터 get 요청에 대한 양식 변경
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response({"data" : serializer.data})
    
    # Post 데이터 get 요청에 대한 양식 변경
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({"data" : serializer.data})

    # serializer.save()가 호출될 때 perform_create()가 호출된다고 생각하면 된다.
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

class CommentViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTCookieAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly, IsAdminOwnerOrReadOnly]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

# Post 데이터 get 요청에 대한 양식 변경
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response({"data" : serializer.data})

# Post 데이터 get 요청에 대한 양식 변경

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({"data" : serializer.data})

    # serializer.save()가 호출될 때 perform_create()가 호출된다고 생각하면 된다.

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)
