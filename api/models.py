from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import ArrayField


class MessageForAdmin(models.Model):
    name = models.CharField(max_length=255)
    number = models.CharField(max_length=15)
    text = models.TextField()
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Сообщение для админа"

class Setting(models.Model):
    logo = models.ImageField(verbose_name="лого")
    instagram = models.TextField(blank=True)
    facebook = models.TextField(blank=True)
    whatsapp = models.TextField(blank=True)
    address = models.TextField(verbose_name='адрес')
    duty = models.TextField(verbose_name='режим работы', blank=True)
    numberAdmin = models.CharField(max_length=15,verbose_name='номер админа')


    def __str__(self):
        return self.numberAdmin

class Categorie(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField()

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = "Категории"

class Book(models.Model):
    image = models.ImageField()
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    price = models.IntegerField()
    rating = models.IntegerField(default=0)
    description = models.TextField()
    isLike = models.BooleanField(default=False)
    category = models.ForeignKey(Categorie,on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = "Книги"


