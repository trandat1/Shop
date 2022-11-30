from django.db import models
from .invoices import Invoice

# from invoices import Invoice


class status(models.Model):
    Invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    status = [
        ('booked', '4'),
        ('success', '1'),
        ('wait', '0'),
        ('return', '2'),
        ('revoke', '3')
    ]
    status = models.CharField(max_length=10, choices=status, default='booked')
    date = models.DateTimeField(default='')
    @staticmethod
    def set_status(i,d):
        st = status(Invoice=i,date=d)
        st.save()
    @staticmethod
    def get_status(i):
        return status.objects.all().get(Invoice=i)

    def __str__(self):
        return self.status
