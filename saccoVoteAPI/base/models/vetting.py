from django.db import models

from base.models import CustomUser, Election, SaccoUser
from base.models.base import BaseModel


class Vetting(BaseModel):
    vetter = models.ForeignKey(SaccoUser, null=False, blank=False, on_delete=models.CASCADE,
                               related_name='vetter_vettings')
    candidate = models.ForeignKey(SaccoUser, null=False, blank=False, on_delete=models.CASCADE,
                                  related_name='candidate_vettings')
    election = models.ForeignKey(Election, null=False, blank=False, on_delete=models.CASCADE)
    approved = models.BooleanField(default=False)

    # TODO: add check constraint that ensures the election is in a sacco that the user is a member
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['vetter', 'candidate', 'election'],
                name='unique_election_candidacy_vetting')
        ]
