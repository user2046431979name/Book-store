from rest_framework import generics
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
import json




class BooksApi(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializers



class BooksDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializers



class CategoryApi(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializers




class SearchProduct(APIView):
    def post(self,request):
        title = request.data.get('title')
        category_id = request.data.get('category_id')

        books = Book.objects.all()
        if not title and not category_id:
            return Response({'message': 'Ключи "title" и "category_id" отсутствуют в запросе'},
                            status=status.HTTP_400_BAD_REQUEST)

        if title:
            books = books.filter(title__icontains=title)

        if category_id:
            books = books.filter(category_id=category_id)
        if title and category_id:
            books = books.filter(title__icontains=title,category_id=category_id)

        serializer = BookSerializers(books,many=True)

        return Response({'books': serializer.data})



