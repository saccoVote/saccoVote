from django.db import models

from base.models import CustomUser, Election, SaccoUser
from base.models.base import BaseModel


class ElectionCandidate(BaseModel):
    sacco_user = models.ForeignKey(SaccoUser, null=False, blank=False, on_delete=models.CASCADE)
    election = models.ForeignKey(Election, null=False, blank=False, on_delete=models.CASCADE)

    # TODO: add check constraint that ensures the election is in a sacco that the user is a member
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['sacco_user', 'election'], name='unique_election_candidacy'
            )
        ]
