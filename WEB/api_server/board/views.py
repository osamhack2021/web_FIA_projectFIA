#데이터 처리
from .models import Post
from .serializers import PostSerializer
from rest_framework import viewsets
from dj_rest_auth.jwt_auth import JWTCookieAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsAdminOwnerOrReadOnly

# Post의 목록, detail 보여주기, 수정하기, 삭제하기 모두 가능
class PostViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTCookieAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly, IsAdminOwnerOrReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    # serializer.save()가 호출될 때 perform_create()가 호출된다고 생각하면 된다.
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

