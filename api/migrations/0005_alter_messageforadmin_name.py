# Generated by Django 5.0.6 on 2024-05-29 08:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_messageforadmin_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='messageforadmin',
            name='name',
            field=models.CharField(max_length=255),
        ),
    ]
