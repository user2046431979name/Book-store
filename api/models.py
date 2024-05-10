from django.db import models
from django.conf import settings



class Category(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField()


    def __str__(self):
        return self.title

class Book(models.Model):
    image = models.ImageField()
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    price = models.IntegerField()
    rating = models.IntegerField(default=0)
    description = models.TextField()
    isLike = models.BooleanField(default=False)
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title


