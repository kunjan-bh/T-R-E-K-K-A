from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator


# Create your models here.
class TravelPhoto(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="travel_photo"
    )
    image = models.ImageField(
        upload_to="travel_photos/%Y/%m/",
        validators=[FileExtensionValidator(["jpg", "jpeg", "png", "webp"])],
    )
    location = models.CharField(max_length=255, db_index=True)
    caption = models.TextField(blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_public = models.BooleanField(default=True)

    latitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )

    class Meta:
        ordering = ["-uploaded_at"]
        indexes = [
            models.Index(fields=["user", "location"]),
            models.Index(fields=["location", "is_public"]),
        ]

    def __str__(self):
        return f"{self.user.username} - {self.location}"
