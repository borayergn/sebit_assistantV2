# Generated by Django 4.2.5 on 2023-11-24 08:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0028_rename__data_blobfield_data'),
    ]

    operations = [
        migrations.AddField(
            model_name='blobfield',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='profile_photos'),
        ),
    ]
