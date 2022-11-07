from django.db import models


class Categorize(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    def get_by_name(name):
        if Categorize.objects.all().filter(name=name):
            return Categorize.objects.all().get(name=name)
        else:
            return None