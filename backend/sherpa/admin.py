from django.contrib import admin
from .models import Sherpa

@admin.register(Sherpa)
class SherpaAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'region', 'is_verified', 'is_available', 'nid_document_display')
    list_filter = ('is_verified', 'region')
    search_fields = ('user__email', 'user__first_name')

    # Add custom actions
    actions = ['verify_sherpas', 'unverify_sherpas']

    @admin.action(description="Verify selected Sherpas")
    def verify_sherpas(self, request, queryset):
        updated = queryset.update(is_verified=True)
        self.message_user(request, f"{updated} sherpa(s) marked as verified.")

    @admin.action(description="Unverify selected Sherpas")
    def unverify_sherpas(self, request, queryset):
        updated = queryset.update(is_verified=False)
        self.message_user(request, f"{updated} sherpa(s) marked as unverified.")

    def nid_document_display(self, obj):
        if obj.nid_document:
            return obj.nid_document.url.split('/')[-1]
        return "-"
    nid_document_display.short_description = "NID"
