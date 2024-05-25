from django.urls import path,include
from .views import *

urlpatterns = [
    path('books/',BooksApi.as_view()),
    path('books/<int:pk>',BooksDetail.as_view()),

    path('categories/',CategoryApi.as_view()),
    path('categories/<int:pk>', CategoryDetail.as_view()),



]



