# Generated by Django 5.0.6 on 2024-06-01 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_rename_coordinate_setting_address'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='setting',
            name='linkMap',
        ),
        migrations.AddField(
            model_name='setting',
            name='duty',
            field=models.TextField(blank=True, verbose_name='режим работы'),
        ),
        migrations.AlterField(
            model_name='setting',
            name='address',
            field=models.TextField(verbose_name='адрес'),
        ),
    ]