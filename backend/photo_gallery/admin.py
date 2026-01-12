# photo_gallery/admin.py

from django.contrib import admin
from django.utils.html import format_html
from .models import TravelPhoto


@admin.register(TravelPhoto)
class TravelPhotoAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "user",
        "location",
        "image_thumbnail",
        "is_public",
        "uploaded_at",
    ]

    list_filter = ["is_public", "uploaded_at", "location"]

    search_fields = ["user__username", "location", "caption"]

    readonly_fields = ["uploaded_at", "image_preview", "image_size"]

    fieldsets = (
        ("User Information", {"fields": ("user",)}),
        (
            "Photo Details",
            {"fields": ("image", "image_preview", "location", "caption", "is_public")},
        ),
        (
            "GPS Coordinates (Optional)",
            {"fields": ("latitude", "longitude"), "classes": ("collapse",)},
        ),
        (
            "Metadata",
            {"fields": ("uploaded_at", "image_size"), "classes": ("collapse",)},
        ),
    )

    list_per_page = 25
    date_hierarchy = "uploaded_at"

    def image_thumbnail(self, obj):
        """Display small thumbnail in list view"""
        if obj.image:
            return format_html(
                '<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 5px;" />',
                obj.image.url,
            )
        return "No Image"

    image_thumbnail.short_description = "Thumbnail"

    def image_preview(self, obj):
        """Display larger image preview in detail view"""
        if obj.image:
            return format_html(
                '<img src="{}" width="300" style="border-radius: 8px;" />',
                obj.image.url,
            )
        return "No Image"

    image_preview.short_description = "Image Preview"

    def image_size(self, obj):
        """Display image size"""
        return f"{obj.image_size} MB"

    image_size.short_description = "File Size"
