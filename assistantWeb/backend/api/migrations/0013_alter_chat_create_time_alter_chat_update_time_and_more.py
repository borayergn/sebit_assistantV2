# Generated by Django 4.2.5 on 2023-10-13 06:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_chat_create_time_alter_chat_update_time_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chat',
            name='create_time',
            field=models.DateTimeField(default=datetime.datetime(2023, 10, 13, 6, 10, 28, 385508, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='chat',
            name='update_time',
            field=models.DateTimeField(default=datetime.datetime(2023, 10, 13, 6, 10, 28, 385517, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='user',
            name='register_time',
            field=models.DateTimeField(default=datetime.datetime(2023, 10, 13, 6, 10, 28, 385262, tzinfo=datetime.timezone.utc)),
        ),
    ]
