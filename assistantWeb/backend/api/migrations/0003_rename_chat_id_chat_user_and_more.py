# Generated by Django 4.2.5 on 2023-09-15 09:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_chat_message_user_delete_dummy_chat_chat_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chat',
            old_name='chat_id',
            new_name='user',
        ),
        migrations.RenameField(
            model_name='message',
            old_name='message_id',
            new_name='chat',
        ),
    ]