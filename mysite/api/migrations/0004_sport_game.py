# Generated by Django 4.1.6 on 2023-03-16 20:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_event_datetime_event_date_event_time'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sport',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('location', models.CharField(max_length=200)),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('players', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('sport', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.sport')),
            ],
        ),
    ]
