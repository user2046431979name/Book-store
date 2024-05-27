from rest_framework import generics
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
import json




class BooksApi(generics.ListCreateAPIView):
    serializer_class = BookSerializers
    def get_queryset(self):
        title = self.request.GET.get('title')
        category_id = self.request.GET.get('category_id')
        queryset = Book.objects.all().order_by('-created_date')
        if title and category_id:
            queryset = queryset.filter(title__icontains = title,category_id = category_id)
            return queryset
        if title and not category_id:
            queryset = queryset.filter(title__icontains = title)
            return queryset
        if category_id and not title:
            queryset = queryset.filter(category_id = category_id)
            return queryset
        return queryset



class BooksDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializers



class CategoryApi(generics.ListCreateAPIView):
    queryset = Categorie.objects.all()
    serializer_class = CategorySerializers


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categorie.objects.all()
    serializer_class = CategorySerializers



<<<<<<< HEAD
# class SearchProduct(APIView):
#     def post(self,request):
#         title = request.POST.get('title')
#         category_id = request.data.get('category_id')

#         books = Book.objects.all()
#         if not title and not category_id:
#             return Response({'message': 'Ключи "title" и "category_id" отсутствуют в запросе'},status=status.HTTP_400_BAD_REQUEST)
#         if title and category_id:
#             books = books.filter(title__icontains=title,category_id=category_id)

#         if title:
#             books = books.filter(title__icontains=title)

#         if category_id:
#             books = books.filter(category_id=category_id)

#         serializer = BookSerializers(books,many=True)
#         return Response({'books': serializer.data})
    
  

class SearchProduct(generics.ListAPIView):
    serializer_class = BookSerializers

    def get_queryset(self):

        title = self.request.GET.get('title')
        category_id = self.request.GET.get('category_id')
        
        if title:
            books = Book.objects.filter(title__icontains=title)
            return books


        if category_id:
            books = Book.objects.filter(category_id=category_id)
            return books
            
        if title and category_id:
            books = Book.objects.filter(title__icontains=title,category_id=category_id)
            return books

=======
>>>>>>> d3724db4d706d1dfab476c5eabbf0fe371ceff18
