from rest_framework.permissions import BasePermission

from base.models import SaccoUser


class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff and request.user.is_superuser


class IsSaccoAdmin(BasePermission):
    """
    Custom permission to only allow sacco admins to perform certain actions
    """
    def has_permission(self, request, view):
        sacco_id = view.kwargs.get('pk') or view.kwargs.get('sacco_pk')
        return SaccoUser.objects.filter(sacco_id=sacco_id, role='admin',
                                        user=request.user).exists()


class IsSaccoMember(BasePermission):
    """
        Custom permission to only allow sacco members, staff, and admins to perform certain actions
    """

    def has_permission(self, request, view):
        sacco_id = view.kwargs.get('pk') or view.kwargs.get('sacco_pk')
        return SaccoUser.objects.filter(
            sacco_id=sacco_id, role__in=['member', 'staff', 'admin'], user=request.user).exists()


class IsSaccoMemberOnly(BasePermission):
    """
        Custom permission to only allow sacco members to perform certain actions
    """
    def has_permission(self, request, view):
        sacco_id = view.kwargs.get('pk') or view.kwargs.get('sacco_pk')
        return SaccoUser.objects.filter(
            sacco_id=sacco_id, role='member', user=request.user).exists()


class IsSaccoVetter(BasePermission):
    def has_permission(self, request, view):
        sacco_id = view.kwargs.get('pk') or view.kwargs.get('sacco_pk')
        return SaccoUser.objects.filter(
            sacco_id=sacco_id, is_vetter=True, user=request.user).exists()


class CanManageSacco(BasePermission):
    def has_permission(self, request, view):
        # it has access to path, query params, body, headers, authenticated user, ip, etc
        # for /saccos, get id from path params, check if user is part of this sacco and their role is admin
        # for /elections find election sacco then using request user, confirm if they can manage the election
        return NotImplementedError


class CanManageSaccoMembers(BasePermission):
    def has_permission(self, request, view):
        return NotImplementedError


class CanManageSaccoElections(BasePermission):
    def has_permission(self, request, view):
        return NotImplementedError


class CanVote(BasePermission):
    """
    permission checklist for who can vote:
        1. user is a member of the sacco the election being voted on belongs to
        2. election is ongoing
        3. user is not a vetter of the election
        4. user hasn't voted in this election
    """
    def has_permission(self, request, view):
        return NotImplementedError

