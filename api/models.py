from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import ArrayField


class MessageForAdmin(models.Model):
    number = models.CharField(max_length=15)
    text = models.TextField()
    
    def __str__(self):
        return self.number
    

class Setting(models.Model):
    logo = models.ImageField()
    instagram = models.TextField(blank=True) 
    whatsapp = models.TextField(blank=True) 
    facebook = models.TextField(blank=True) 
    numberAdmin = models.CharField(max_length=15)
    coordinate = models.TextField(blank=True)
    linkMap = models.TextField(blank=True)
    
    
    


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


