from .models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    #오버라이딩, userserializer는 create 시에 입력 데이터에 대한 검증이 필수이다. 
    def create(self, validated_data):
        user = User.objects.create_user(
            email = validated_data['email'],
            army_num = validated_data['army_num'],
            army_rank = validated_data['army_rank'],
            name = validated_data['name'],
            password = validated_data['password']
        )
        return user
    class Meta:
        model = User
        fields = ['email', 'army_num', 'army_rank', 'name', 'password']