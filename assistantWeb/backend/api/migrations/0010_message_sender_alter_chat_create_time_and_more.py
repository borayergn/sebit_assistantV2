# Generated by Django 4.2.5 on 2023-09-26 11:59

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_chat_create_time_alter_user_register_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='sender',
            field=models.CharField(default='user', max_length=4),
        ),
        migrations.AlterField(
            model_name='chat',
            name='create_time',
            field=models.DateTimeField(default=datetime.datetime(2023, 9, 26, 11, 59, 44, 684818, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='user',
            name='register_time',
            field=models.DateTimeField(default=datetime.datetime(2023, 9, 26, 11, 59, 44, 684432, tzinfo=datetime.timezone.utc)),
        ),
    ]