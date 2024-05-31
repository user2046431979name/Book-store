from rest_framework.serializers import ModelSerializer
from .models import *

class BookSerializers(ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'


class CategorySerializers(ModelSerializer):
    class Meta:
        model = Categorie
        fields = '__all__'

class SettingSerializers(ModelSerializer):
    class Meta:
        model = Setting
        fields = '__all__'

class MessageSerializers(ModelSerializer):
    class Meta:
        model = MessageForAdmin
        fields = '__all__'

