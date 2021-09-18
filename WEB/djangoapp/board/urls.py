from django.urls import path
from . import views

urlpatterns = [
    path('please_find_it', views.please_find_it),
    path('please_take_it', views.please_take_it),
    path('<int:pk>', views.single_post_page),
]