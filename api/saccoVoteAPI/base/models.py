from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


# Create your models here.

class Sacco(models.Model):
    name = models.CharField(max_length=100)
    logo = models.ImageField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.modified_at = None
        else:
            self.modified_at = timezone.now()
        super().save(*args, **kwargs)


class UserSacco(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sacco = models.ForeignKey(Sacco, on_delete=models.CASCADE)
    role = models.CharField(max_length=10,
                            choices=[('admin', 'Administrator'), ('member', 'Member'), ('staff', 'Staff')],
                            default='member')
    fullname = models.CharField(max_length=100, null=True, blank=True)
    member_id = models.CharField(max_length=100, null=True, blank=True)
    position = models.CharField(max_length=100, null=True, blank=True)
    member_since = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.modified_at = None
        else:
            self.modified_at = timezone.now()
        super().save(*args, **kwargs)
