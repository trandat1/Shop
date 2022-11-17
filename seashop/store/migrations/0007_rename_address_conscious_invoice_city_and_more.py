# Generated by Django 4.1.2 on 2022-11-17 17:22

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0006_alter_invoice_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='invoice',
            old_name='address_conscious',
            new_name='city',
        ),
        migrations.RenameField(
            model_name='invoice',
            old_name='address_district',
            new_name='province',
        ),
        migrations.AlterField(
            model_name='invoice',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2022, 11, 18, 0, 22, 28, 717051)),
        ),
    ]
