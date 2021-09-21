from django.db import models
from django.conf import settings

class Post(models.Model):
    title = models.CharField(
        max_length=100
    )
    body = models.TextField()
    

