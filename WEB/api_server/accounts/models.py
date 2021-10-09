from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone


rank_lists = (
        ('private', '이병'),
        ('first_class private', '일병'),
        ('corporal', '상병'),
        ('sergeant', '병장'),
        ('executive', '간부 및 장교'),
    )

class UserManager(BaseUserManager):
    # 일반 user 생성
    def create_user(self, email, army_num, army_rank, name, password=None):
        if not email:
            raise ValueError('email 입력은 필수입니다.')
        if not army_num:
            raise ValueError('군번 입력은 필수입니다.')
        if not army_rank:
            raise ValueError('계급 입력은 필수입니다.')
        if not name:
            raise ValueError('이름 입력은 필수입니다.')
        user = self.model(
            email = self.normalize_email(email),
            army_num = army_num,
            army_rank = army_rank,
            name = name
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    # 관리자 user 생성
    def create_superuser(self, email, army_num, army_rank, name, password=None):
        user = self.create_user(
            email = self.normalize_email(email),
            army_num = army_num,
            army_rank = army_rank,
            name = name,
            password = password
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(default='', max_length=100, null=False, blank=False, unique=True, help_text='이메일')
    army_num = models.CharField(max_length=100, null=False, blank=False, unique=True, help_text='**-********')
    army_rank = models.CharField(max_length=50, choices=rank_lists, default=rank_lists[0][0])
    name = models.CharField(max_length=100, null=False, blank=False, help_text='본명')
    joined_date = models.DateTimeField('가입일', default=timezone.now)
    
    # User 모델의 필수 field
    is_active = models.BooleanField(default=True)    
    is_admin = models.BooleanField(default=False)
    
    # 헬퍼 클래스 사용
    objects = UserManager()

    # 사용자의 username field는 user_id로 설정
    USERNAME_FIELD = 'email'
    # 필수로 작성해야하는 field
    REQUIRED_FIELDS = ['army_num', 'army_rank', 'name']

    def __str__(self):
        return self.email