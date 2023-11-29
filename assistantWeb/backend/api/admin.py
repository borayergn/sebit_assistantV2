from django.contrib import admin

from .models import Chat,Message,ApiKey,BlobField
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class BlobInline(admin.StackedInline):
    model = BlobField
    can_delete = False
    verbose_name_plural = "BlobField"
    fk_name = "user"

class UserAdmin(BaseUserAdmin):
    inlines = [BlobInline]

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(UserAdmin, self).get_inline_instances(request, obj)

#re register user to add BLOB profile
admin.site.unregister(User)
admin.site.register(User, UserAdmin)

admin.site.register(Chat)
admin.site.register(Message)
admin.site.register(ApiKey)
admin.site.register(BlobField)


