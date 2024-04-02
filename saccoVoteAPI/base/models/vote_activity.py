import uuid

from django.db import models

from base.models import SaccoUser, Election


class VoteActivity(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    voter = models.ForeignKey(SaccoUser, on_delete=models.CASCADE)
    election = models.ForeignKey(Election, on_delete=models.CASCADE)
