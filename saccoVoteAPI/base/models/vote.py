import uuid

from django.db import models

from base.models import Election, ElectionCandidate


class Vote(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    election = models.ForeignKey(Election, on_delete=models.CASCADE)
    candidate = models.ForeignKey(ElectionCandidate, on_delete=models.CASCADE)
