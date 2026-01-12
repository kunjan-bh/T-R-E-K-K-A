from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Sherpa(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="sherpa_profile"
    )

    experience_years = models.PositiveIntegerField()
    languages = models.CharField(max_length=255)
    region = models.CharField(max_length=100)
    daily_rate = models.DecimalField(max_digits=8, decimal_places=2)
    phone = models.CharField(max_length=20)

    photo = models.ImageField(
        upload_to="sherpa/photos/",
        blank=True,
        null=True
    )
    nid_document = models.FileField(
        upload_to="sherpa/nid/",
        blank=True,
        null=True
    )

    is_verified = models.BooleanField(default=False)

    #  MUST have default
    is_available = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.get_full_name() or self.user.email
