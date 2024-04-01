import pytz
from django.db import models

from base.models.base import BaseModel
from base.models import CustomUser
from base.models import Sacco


class UserSacco(BaseModel):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    sacco = models.ForeignKey(Sacco, on_delete=models.CASCADE)
    role = models.CharField(max_length=10,
                            choices=[('admin', 'Administrator'), ('member', 'Member'), ('staff', 'Staff')],
                            default='member')
    is_vetter = models.BooleanField(default=False)
    fullname = models.CharField(max_length=100, null=True, blank=True)
    member_id = models.CharField(max_length=100, null=True, blank=True)
    position = models.CharField(max_length=100, null=True, blank=True)
    member_since = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.member_since:
            self.member_since = self.member_since.astimezone(pytz.UTC)
        super(UserSacco, self).save(*args, **kwargs)
