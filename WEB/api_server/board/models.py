from django.db import models
from django.conf import settings
from accounts.models import User

class Post(models.Model):
    # 1. 게시글의 id 값
    id = models.AutoField(primary_key=True, null=False, blank=False) 
    # 2. 제목
    title = models.CharField(max_length=100)
    # 3. 작성일, 수정일
    created_at = models.DateTimeField(auto_now_add=True)
    revised_at = models.DateTimeField(auto_now=True)
    # 4. 작성자
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    username = models.CharField(max_length=100)
    useremail = models.CharField(max_length=100)
    # 5. 본문
    body = models.TextField()
    # 6. 태그설정
    tag_lists = (
        ('else', '기타류'),
        ('army_uniform', '군복류'),
        ('running_shirts','런닝'),
        ('underwear', '속옷'),
        ('underclothes', '내복'),
        ('socks', '양말'),
        ('shoes', '신발류'),
        ('towel', '수건'),
        ('caps', '모자류'),
        ('phones','핸드폰'),
        ('books', '책'),
        ('stationery', '문방구'),
    )
    tag = models.CharField(max_length=20, choices=tag_lists, default=tag_lists[0][0])

    # 7. 습득 장소(부대 소속) 
    place = models.TextField(max_length=500)

    # 8. 작성 게시판 선택
    board_lists = (
        ('pick_up', '찾아가세요'),
        ('request', '찾아주세요'),
    )
    board_type = models.CharField(max_length=30, choices=board_lists, default=board_lists[0][0])
    
    status_lists =(
        ('ongoing','거래 진행 중'),
        ('completed', '거래 완료'),
    )
    post_status = models.CharField(max_length=30, choices=status_lists, default=status_lists[0][0])



class Comment(models.Model):
    id = models.AutoField(primary_key=True, null=False, blank=False)
    post = models.ForeignKey(Post, related_name='comments', null=False, blank=False, on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='comments', null=False, blank=False, on_delete=models.CASCADE)
    username = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    revised_at = models.DateTimeField(auto_now=True)
    body = models.TextField()





