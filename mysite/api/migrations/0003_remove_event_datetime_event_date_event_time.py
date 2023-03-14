# Generated by Django 4.1.6 on 2023-03-14 02:13

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_event_code'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='datetime',
        ),
        migrations.AddField(
            model_name='event',
            name='date',
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AddField(
            model_name='event',
            name='time',
            field=models.TimeField(default=datetime.time(10, 0)),
        ),
    ]
