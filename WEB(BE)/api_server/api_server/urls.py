"""api_server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from rest_framework import permissions 
from drf_yasg.views import get_schema_view 
from drf_yasg import openapi

schema_view = get_schema_view( 
    openapi.Info( 
        title="Project_FIA Backend API",
        default_version='v1', 
        description="국군장병들의 분실물 상태 공유 플랫폼 Projct_FIA의 Backend Server API 문서입니다.",
        terms_of_service="https://www.google.com/policies/terms/", 
        contact=openapi.Contact(email="munjin0201@naver.com"), 
        license=openapi.License(name="BSD 3-Clause License"), 
    ), 
    public=True, 
    permission_classes=(permissions.AllowAny,), 
)


# A JSON view of your API specification at 
# /swagger.json
# A YAML view of your API specification at 
# /swagger.yaml
# A swagger-ui view of your API specification at 
# /swagger/
# A ReDoc view of your API specification at 
# /redoc/

urlpatterns = [
    path('admin/', admin.site.urls),
    path('board/', include('board.urls')),

    path('accounts/', include('dj_rest_auth.urls')),
    path('accounts/', include('dj_rest_auth.registration.urls')),
    path('accounts/', include('allauth.urls')),
    path('accounts/', include('accounts.urls')),

    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'), 
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'), 
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'), 
]
