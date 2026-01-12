from django.db import models

class FavoriteDestination(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} - {self.destination}"
