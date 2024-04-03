"""
URL configuration for saccoVoteAPI project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework_nested import routers

from base.views import SignupView, CustomObtainAuthToken, CheckUserView, ElectionViewSet, \
    SaccoUserViewSet, ElectionCandidateViewSet, VoteViewSet, VettingViewSet
from base.views.authenticated_user_view import AuthenticatedUserView
from base.views.sacco_view_set import SaccoViewSet

router = routers.DefaultRouter()
router.register(r'saccos', SaccoViewSet)

sacco_router = routers.NestedSimpleRouter(router, r'saccos', lookup='sacco')
sacco_router.register(r'elections', ElectionViewSet, basename='sacco-elections')
sacco_router.register(r'users', SaccoUserViewSet, basename='sacco-users')
election_router = routers.NestedSimpleRouter(sacco_router, r'elections', lookup='election')
election_router.register(r'candidates', ElectionCandidateViewSet, basename='election-candidates')
election_router.register(r'votes', VoteViewSet, basename='election-votes')
candidate_router = routers.NestedSimpleRouter(election_router, r'candidates', lookup='candidate')
candidate_router.register(r'vetting', VettingViewSet, basename='candidate-vetting')


swagger_schema_view = get_schema_view(
    openapi.Info(
        title="Sacco Vote API",
        default_version='v1',
        description="Sacco Vote API Documentation"
    ),
    public=True,
    permission_classes=[permissions.AllowAny,],
)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('', include(sacco_router.urls)),
    path('', include(election_router.urls)),
    path('', include(candidate_router.urls)),
    path('admin/', admin.site.urls),
    path('swagger<format>/', swagger_schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', swagger_schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', swagger_schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('auth/signin', CustomObtainAuthToken.as_view(), name='signin'),
    path('auth/signup', SignupView.as_view(), name='signup'),
    path('auth/check-user/<str:email>', CheckUserView.as_view(), name='check-user'),
    path('auth/authenticated-user', AuthenticatedUserView.as_view(), name='authenticated-user'),
]

# urlpatterns += router.urls + sacco_router.urls
