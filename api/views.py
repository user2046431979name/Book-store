from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from .serializers import *
from django.utils import timezone
from datetime import timedelta





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


class CategoryDetail(generics.ListAPIView):
    serializer_class = BookSerializers
    def get_queryset(self):
        pk = self.kwargs.get("pk")
        queryset = Book.objects.filter(category_id=pk)
        return queryset




class CustomPagination(PageNumberPagination):
    page_size = 18
    page_size_query_param = 'page_size'
    max_page_size = 100
class NewBooksApi(generics.ListAPIView):
    serializer_class = BookSerializers
    pagination_class = CustomPagination
    def get_queryset(self):
        queryset = Book.objects.filter(created_date__gte=timezone.now() - timedelta(days=7))
        return queryset





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
        
        if title and not category_id:
            books = Book.objects.filter(title__icontains=title)
            return books


        if category_id and not title:
            books = Book.objects.filter(category_id=category_id)
            return books
            
        if title and category_id:
            books = Book.objects.filter(title__icontains=title,category_id=category_id)
            return books


