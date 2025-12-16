from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter


class CustomAccountAdapter(DefaultAccountAdapter):
    """
    Custom adapter for django-allauth to work with email-only authentication
    """
    def save_user(self, request, user, form, commit=True):
        """
        Saves a new User instance using information provided in the
        signup form.
        """
        user = super().save_user(request, user, form, commit=False)
        
        # Get the is_from_nepal value from the form data
        data = form.cleaned_data
        user.is_from_nepal = data.get('is_from_nepal', False)
        
        if commit:
            user.save()
        return user


class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    """
    Custom social account adapter
    """
    def save_user(self, request, sociallogin, form=None):
        """
        Saves a newly signed up social login user.
        """
        user = super().save_user(request, sociallogin, form)
        
        # For social login, default is_from_nepal to False
        # Users can update this later in their profile
        if not hasattr(user, 'is_from_nepal'):
            user.is_from_nepal = False
            user.save()
        
        return user

    def populate_user(self, request, sociallogin, data):
        """
        Populate user instance with data from social login
        """
        user = super().populate_user(request, sociallogin, data)
        
        # Set email as required
        if not user.email:
            user.email = data.get('email', '')
        
        # Set names if available
        user.first_name = data.get('first_name', '')
        user.last_name = data.get('last_name', '')
        
        return user