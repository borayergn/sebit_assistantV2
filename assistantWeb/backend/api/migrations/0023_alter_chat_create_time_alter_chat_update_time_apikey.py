# Generated by Django 4.2.5 on 2023-11-07 07:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0022_alter_chat_create_time_alter_chat_update_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chat',
            name='create_time',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='chat',
            name='update_time',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.CreateModel(
            name='ApiKey',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key_hash', models.CharField(max_length=30)),
                ('key_name', models.CharField(max_length=30)),
                ('create_time', models.DateTimeField(auto_now_add=True)),
                ('update_time', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
