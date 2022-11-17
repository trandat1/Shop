# Generated by Django 4.1.2 on 2022-11-17 16:41

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2022, 11, 17, 23, 41, 31, 695964)),
        ),
        migrations.AlterField(
            model_name='size',
            name='size',
            field=models.CharField(choices=[('S', 'S'), ('M', 'M'), ('L', 'L'), ('XL', 'XL'), ('XXL', 'XXL'), ('33', '33'), ('32', '32'), ('30', '30'), ('31', '31')], default='S', max_length=10),
        ),
    ]