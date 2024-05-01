from django.db import models
from django.conf import settings


class Book(models.Model):
    image = models.ImageField()
    title = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    rating = models.IntegerField(default=0)
    isLike = models.BooleanField(default=False)
    def __str__(self):
        return self.title


