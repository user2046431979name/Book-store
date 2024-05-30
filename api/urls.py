from django.urls import path,include
from .views import *

urlpatterns = [
    path('book/',BooksApi.as_view()),
    path('book/<int:pk>',BooksDetail.as_view()),

    path('categories/',CategoryApi.as_view()),
    path('categories/<int:pk>', CategoryDetail.as_view()),

<<<<<<< HEAD
    path('newBooks/',NewBooksApi.as_view())
=======
    path('books/',SearchProduct.as_view())
>>>>>>> ce490caf5c85f652562fe3e2861f9805820795f4

]



