from rest_framework import serializers 
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from dj_rest_auth.registration.serializers import RegisterSerializer as BaseRegisterSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User model - used for displaying user info
    """
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'is_from_nepal', 'date_joined')
        read_only_fields = ('id', 'date_joined')


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration (for our custom endpoint)
    """

    email = serializers.EmailField(
        required = True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="This email is already registered")]
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type':'password'}
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type':'password'}
    )
    is_from_nepal = serializers.BooleanField(required=False, default=False)

    class Meta:
        model = User
        fields = ('email','password','password2','first_name','last_name','is_from_nepal')
        extra_kwargs = {
            'first_name':{'required':False},
            'last_name':{'required':False}
        }

    def validate(self,attrs):
        """
        Check that the two password entries match
        """
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password2":"Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        """
        Create and return a new user instance
        """
        validated_data.pop('password2')
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            is_from_nepal=validated_data.get('is_from_nepal', False)
        )
        return user


class CustomRegisterSerializer(BaseRegisterSerializer):
    """
    Custom registration serializer for django-allauth (for social auth)
    Extends dj-rest-auth's RegisterSerializer to add our custom field
    """
    is_from_nepal = serializers.BooleanField(required=False, default=False)

    def get_cleaned_data(self):
        """
        Return cleaned data with our custom field
        """
        data = super().get_cleaned_data()
        data['is_from_nepal'] = self.validated_data.get('is_from_nepal', False)
        return data

    def custom_signup(self, request, user):
        """
        Save custom fields during signup (called by allauth)
        """
        user.is_from_nepal = self.validated_data.get('is_from_nepal', False)
        user.save()

    
class LoginSerializer(serializers.Serializer):
    """
    Serializer for user login
    """
    email = serializers.EmailField(required=True)
    password = serializers.CharField(
        required=True,
        write_only=True,
        style={'input_type':'password'}
    )
    remember_me = serializers.BooleanField(required=False, default=False)


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint
    """
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True, validators=[validate_password])

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is incorrect")
        return value
    
    def validate_new_password(self, value):
        user = self.context['request'].user
        if user.check_password(value):
            raise serializers.ValidationError("New password cannot be the same as old password")
        return value