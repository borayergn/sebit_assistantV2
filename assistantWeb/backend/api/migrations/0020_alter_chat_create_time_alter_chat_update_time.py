# Generated by Django 4.2.5 on 2023-10-19 11:26

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_alter_chat_create_time_alter_chat_update_time_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chat',
            name='create_time',
            field=models.DateTimeField(default=datetime.datetime(2023, 10, 19, 11, 26, 51, 339796, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='chat',
            name='update_time',
            field=models.DateTimeField(default=datetime.datetime(2023, 10, 19, 11, 26, 51, 339810, tzinfo=datetime.timezone.utc)),
        ),
    ]