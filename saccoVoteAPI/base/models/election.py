import pytz
from django.db import models
from django.utils import timezone

from base.models import Sacco
from base.models.base import BaseModel


class Election(BaseModel):
    title = models.CharField(max_length=200, null=False, blank=False)
    start_date = models.DateTimeField(null=False, blank=False)
    end_date = models.DateTimeField(null=False, blank=False)
    sacco = models.ForeignKey(Sacco, null=False, blank=False, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        self.start_date = self.start_date.astimezone(pytz.UTC)
        self.end_date = self.end_date.astimezone(pytz.UTC)
        super(Election, self).save(*args, **kwargs)

    def has_not_started(self):
        return self.start_date > timezone.now()

    def is_ongoing(self):
        now = timezone.now()
        return self.start_date <= now <= self.end_date

    def has_ended(self):
        return self.end_date <= timezone.now()
