from django.db import models

from base.models.base import BaseModel


class Sacco(BaseModel):
    name = models.CharField(max_length=100, null=False, blank=False)
    logo = models.ImageField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
