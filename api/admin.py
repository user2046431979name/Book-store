from django.contrib import admin
from .models import *


admin.site.regiter(Book)
admin.site.regiter(Category)


