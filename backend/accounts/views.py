import json
from django.http import JsonResponse
from rest_framework import status, generics
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from datetime import timedelta
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    UserSerializer,
    ResetPasswordSerializer
)
import uuid
from django.utils import timezone
# views.py
from rest_framework.decorators import api_view, permission_classes
import random
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt


User = get_user_model()


class RegisterView(generics.CreateAPIView):
    """
    API endpoint for user registration
    POST /api/auth/signup/
    """
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate JWT tokens for the new user
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'message': 'User registered successfully',
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        remember_me = serializer.validated_data.get('remember_me', False)

        user = authenticate(request, email=email, password=password)

        if not user:
            return Response(
                {'error': 'Invalid email or password'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if not user.is_active:
            return Response(
                {'error': 'This account has been disabled.'},
                status=status.HTTP_403_FORBIDDEN
            )

        refresh = RefreshToken.for_user(user)

        # Set refresh expiry FIRST
        if remember_me:
            refresh.set_exp(lifetime=timedelta(days=30))
        else:
            refresh.set_exp(lifetime=timedelta(days=1))

        access = refresh.access_token  # now derived correctly

        return Response({
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(access),
            },
            'message': 'Login successful'
        }, status=status.HTTP_200_OK)



class LogoutView(APIView):
    """
    API endpoint for user logout
    POST /api/auth/logout/
    """
    # permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response({
                    'message': 'Logout successful'
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'error': 'Refresh token is required'
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)


class UserDetailView(generics.RetrieveUpdateAPIView):
    """
    API endpoint to get/update current user details
    GET/PUT/PATCH /api/auth/user/
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user




User = get_user_model()
@csrf_exempt
def reset_password(request):
    """
    Reset password after OTP verification.
    Expects POST JSON:
    {
        "email": "user@example.com",
        "new_password": "newsecurepassword"
    }
    """
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request method"}, status=405)

    try:
        data = json.loads(request.body)
        # email = data.get("email")
        reset_token = data.get("reset_token")
        new_password = data.get("new_password")

        if not reset_token or not new_password:
            return JsonResponse({"error": "Reset token and new password are required"}, status=400)
        
        record = reset_token_store.get(reset_token)
        
        if not record:
            return JsonResponse(
                {"error": "OTP verification required"},
                status=403
            )
        
        if record["expires_at"] < timezone.now():
            del reset_token_store[reset_token]
            return JsonResponse(
                {"error": "Reset token expired"},
                status=403
            )

        email = record["email"]
        del reset_token_store[reset_token]  # one-time use

        try:
            user = User.objects.get(email=email)
            user.set_password(new_password)
            user.save()
        except User.DoesNotExist:
            # For security: don't reveal if user exists
            pass

        return JsonResponse({"message": "Password reset successfully"})

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)



otp_store = {}
reset_token_store = {}

@api_view(['POST'])
@permission_classes([AllowAny])
def send_otp(request):
    email = request.data.get('email')
    if not email:
        return Response({"success": False, "message": "Email is required"}, status=400)

    otp = str(random.randint(100000, 999999))
    otp_store[email] = otp

    if User.objects.filter(email=email).exists():
        return Response(
            {"success": False, "message": "Account already exists"},
            status=409
        )

    # Send OTP via email
    send_mail(
        subject='Your OTP for Trekya',
        message=f'Your OTP is: {otp}',
        from_email=settings.EMAIL_HOST_USER,  # your Gmail
        recipient_list=[email],
        fail_silently=False,
    )


    return Response({"success": True, "message": "OTP sent successfully"})

@api_view(['POST'])
@permission_classes([AllowAny])
def send_otpV2(request):#for forget password
    email = request.data.get('email')
    if not email:
        return Response({"success": False, "message": "Email is required"}, status=400)

    otp = str(random.randint(100000, 999999))
    otp_store[email] = {
        "otp": otp,
        "expires_at": timezone.now() + timedelta(minutes=5)
    }



    # Send OTP via email
    send_mail(
        subject='Your OTP for Trekya',
        message=f'Your OTP is: {otp}',
        from_email=settings.EMAIL_HOST_USER,  # your Gmail
        recipient_list=[email],
        fail_silently=False,
    )


    return Response({"success": True, "message": "OTP sent successfully"})

@api_view(['POST'])
@permission_classes([AllowAny])
def verify_otp(request):
    email = request.data.get('email')
    otp = request.data.get('otp')

    if not email or not otp:
        return Response({"success": False, "message": "Email and OTP are required"}, status=400)

    record = otp_store.get(email)

    if (
        not record or
        record["otp"] != otp or
        record["expires_at"] < timezone.now()
    ):
        return Response(
            {"success": False, "message": "Invalid or expired OTP"},
            status=400
        )

    # OTP is valid → remove it (one-time use)
    del otp_store[email]

    reset_token = str(uuid.uuid4())
    reset_token_store[reset_token] = {
            "email": email,
            "expires_at": timezone.now() + timedelta(minutes=10)
        }

    return Response({
            "success": True,
            "reset_token": reset_token,
            "message": "OTP verified successfully"
    })
