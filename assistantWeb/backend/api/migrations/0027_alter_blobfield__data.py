# Generated by Django 4.2.5 on 2023-11-24 06:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0026_blobfield_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blobfield',
            name='_data',
            field=models.TextField(blank=True, db_column='data', null=True),
        ),
    ]
