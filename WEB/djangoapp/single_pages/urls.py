from django.urls import path
from . import views

urlpatterns = [
    path('about_us/', views.about_us),
    path('', views.landing),
]