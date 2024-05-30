from django.urls import path,include
from .views import *

urlpatterns = [
    path('book/',BooksApi.as_view()),
    path('book/<int:pk>',BooksDetail.as_view()),

    path('categories/',CategoryApi.as_view()),
    path('categories/<int:pk>', CategoryDetail.as_view()),

    path('books/',SearchProduct.as_view()),

    path('question/',MessageForAdminView.as_view())

]



