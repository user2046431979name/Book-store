from rest_framework.serializers import ModelSerializer
from .models import *

class BookSerializers(ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'


class CategorySerializers(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

