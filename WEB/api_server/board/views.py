#데이터 처리
from .models import Post
from .serializers import PostSerializer
from rest_framework import viewsets


# Post의 목록, detail 보여주기, 수정하기, 삭제하기 모두 가능
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    # serializer.save()가 호출될 때 perform_create()가 호출된다고 생각하면 된다.
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)


# #API VIEW를 사용하기 위한 import
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.http import Http404



# # Post 목록을 보여준다.
# class PostList(APIView):
#     #Post list를 보여준다.
#     def get(self, request):
#         posts = Post.objects.all()
#         #여러 개의 객체를 serialization 하기 위해 many=True로 설정
#         serializer = PostSerializer(posts, many=True)
#         return Response(serializer.data)
    
#     # 새로운 post 작성할 때
#     def post(self, request):
#         #request.data는 사용자의 입력 데이터
#         serializer = PostSerializer(data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class PostDetail(APIView):
#     def get_object(self, pk):
#         try:
#             return Post.objects.get(pk=pk)
#         except Post.DoesNotExist:
#             raise Http404
    
#     # Post의 detail 보기
#     def get(self, request, pk, format=None):
#         post = self.get_object(pk)
#         serializer = PostSerializer(post)
#         return Response(serializer.data)

#     # Post 수정하기
#     def put(self, request, pk, format=None):
#         post = self.get_object(pk)
#         serializer = PostSerializer(post, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data) 
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     # Post 삭제하기
#     def delete(self, request, pk, format=None):
#         blog = self.get_object(pk)
#         blog.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


