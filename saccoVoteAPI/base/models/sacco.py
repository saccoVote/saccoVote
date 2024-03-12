from django.db import models
from django.utils import timezone


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
