# serializers.py
from rest_framework import serializers
from .models import Sherpa

class SherpaRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sherpa
        fields = [
            "experience_years",
            "languages",
            "region",
            "daily_rate",
            "phone",
            "photo",
            "nid_document",
            "is_available",
        ]

    def create(self, validated_data):
        user = self.context["request"].user
        return Sherpa.objects.create(user=user, **validated_data)


class SherpaPublicSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="user.get_full_name", read_only=True)
    photo = serializers.SerializerMethodField()
    nid_document = serializers.SerializerMethodField()

    class Meta:
        model = Sherpa
        fields = [
            "id",
            "name",
            "region",
            "experience_years",
            "daily_rate",
            "languages",
            "phone",          # Added phone
            "photo",
            "nid_document",
            "is_verified",
            "is_available",   # Added availability for dashboard
        ]
        read_only_fields = ["is_verified"]

    def get_photo(self, obj):
        """Return absolute URL for photo"""
        request = self.context.get("request")
        if obj.photo:
            if request:
                return request.build_absolute_uri(obj.photo.url)
            return obj.photo.url
        return None

    def get_nid_document(self, obj):
        """Return absolute URL for NID document"""
        request = self.context.get("request")
        if obj.nid_document:
            if request:
                return request.build_absolute_uri(obj.nid_document.url)
            return obj.nid_document.url
        return None
