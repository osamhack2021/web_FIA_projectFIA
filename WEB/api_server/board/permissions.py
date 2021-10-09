from rest_framework import permissions

class IsAdminOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        # 읽기 권한 요청이 들어오면 허용
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # 요청자(request.user)가 객체(Blog)의 user와 동일한지 확인
        # 추후 admin 계정 권한 추가
        print(request.user.email)
        return obj.user == request.user or request.user.is_admin == True