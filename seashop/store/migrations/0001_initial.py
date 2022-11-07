# Generated by Django 4.1.2 on 2022-10-29 04:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Categorize',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Username', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=25)),
                ('password', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('image', models.ImageField(upload_to='static/uploads/products')),
                ('price', models.IntegerField(default=0)),
                ('status', models.CharField(choices=[('success', '1'), ('failure', '0')], default='1', max_length=10)),
                ('description', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Size',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('size', models.CharField(choices=[('S', 'S'), ('M', 'M'), ('L', 'L'), ('XL', 'XL'), ('XXL', 'XXL')], default='S', max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Productdetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=999)),
                ('Category', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='store.category')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.product')),
                ('size', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='store.size')),
            ],
        ),
        migrations.CreateModel(
            name='categorydetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Categorize', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='store.categorize')),
                ('Category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.category')),
                ('Product', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='store.product')),
            ],
        ),
    ]
