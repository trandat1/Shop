from django.db import models


class category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    def get_all_categories():
        return category.objects.all().values()

    def get_categories():
        return category.objects.all()

    def get_categoriesid_by_name(category_name):
        return category.objects.all().get(name=category_name)

