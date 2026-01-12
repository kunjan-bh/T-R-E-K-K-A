from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import Sherpa
from .serializers import (
    SherpaRegisterSerializer,
    SherpaPublicSerializer
)


class SherpaRegisterView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if Sherpa.objects.filter(user=request.user).exists():
            return Response(
                {"detail": "You are already registered as a sherpa"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = SherpaRegisterSerializer(
            data=request.data,
            context={"request": request}
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {"message": "Sherpa registered successfully. Pending verification."},
            status=status.HTTP_201_CREATED
        )


class SherpaListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        sherpas = Sherpa.objects.filter(is_available=True, is_verified=True)
        serializer = SherpaPublicSerializer(sherpas, many=True, context={'request': request})
        return Response(serializer.data)



class MySherpaStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            sherpa = request.user.sherpa_profile
            from .serializers import SherpaPublicSerializer
            serializer = SherpaPublicSerializer(sherpa, context={'request': request})
            data = serializer.data
            # Also add verification and status flags
            data.update({
                "is_sherpa": True,
                "is_verified": sherpa.is_verified,
            })
            return Response(data)
        except Sherpa.DoesNotExist:
            return Response({"is_sherpa": False})

class SherpaUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        try:
            sherpa = request.user.sherpa_profile
        except Sherpa.DoesNotExist:
            return Response(
                {"error": "Not a sherpa"},
                status=status.HTTP_400_BAD_REQUEST
            )

        profile_fields = [
            "experience_years",
            "languages",
            "region",
            "daily_rate",
            "phone",
            "photo",
            "nid_document",
        ]

        changed_profile = False

        # ✅ Handle availability safely
        if "is_available" in request.data:
            raw = request.data.get("is_available")
            new_is_available = str(raw).lower() in ["true", "1", "yes"]

            if sherpa.is_available != new_is_available:
                sherpa.is_available = new_is_available

        # ✅ Handle profile fields
        for field in profile_fields:
            if field in request.data:
                new_value = request.data[field]
                old_value = getattr(sherpa, field)

                if str(old_value) != str(new_value):
                    setattr(sherpa, field, new_value)
                    changed_profile = True

        # ✅ Only reset verification if profile actually changed
        if changed_profile:
            sherpa.is_verified = False

        sherpa.save()

        serializer = SherpaPublicSerializer(
            sherpa, context={"request": request}
        )
        return Response(serializer.data)
