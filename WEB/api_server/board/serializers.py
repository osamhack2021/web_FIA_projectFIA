from .models import Post, Comment
from rest_framework import serializers


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.email')
    username = serializers.ReadOnlyField(source='user.name')

    class Meta:
        model = Comment
        fields = '__all__'



class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.email')
    username = serializers.ReadOnlyField(source='user.name')
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = '__all__'


        