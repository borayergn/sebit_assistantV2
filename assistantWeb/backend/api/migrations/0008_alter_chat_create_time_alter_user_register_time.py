# Generated by Django 4.2.5 on 2023-09-25 14:02

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_remove_chat_chatname_chat_chat_name_chat_create_time_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chat',
            name='create_time',
            field=models.DateTimeField(verbose_name=datetime.datetime(2023, 9, 25, 14, 2, 54, 555648, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='user',
            name='register_time',
            field=models.DateTimeField(verbose_name=datetime.datetime(2023, 9, 25, 14, 2, 54, 555208, tzinfo=datetime.timezone.utc)),
        ),
    ]
