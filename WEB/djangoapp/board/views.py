from django.shortcuts import render
from .models import Post

posts = Post.objects.all() # 게시판에 따른 게시물 로드 다르게 변경해야 함


def please_find_it(request):
    return render(request, 'board/please_find_it.html', {'posts':posts})

def please_take_it(request):
    return render(request, 'board/please_take_it.html', {'posts':posts})

def single_post_page(request, pk):
    post = Post.objects.get(pk=pk)

    return render(request, 'board/single_post_page.html', {'post':post})
