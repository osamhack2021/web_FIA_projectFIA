from .models import Post
from rest_framework import serializers

class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.email')
    username = serializers.ReadOnlyField(source='user.name')
    class Meta:
        model = Post
        fields = '__all__'