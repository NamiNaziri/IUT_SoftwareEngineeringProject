# Generated by Django 3.2.5 on 2021-07-09 13:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gdm_app', '0005_auto_20210708_2306'),
    ]

    operations = [
        migrations.RenameField(
            model_name='projectmanager',
            old_name='Project',
            new_name='project',
        ),
    ]
