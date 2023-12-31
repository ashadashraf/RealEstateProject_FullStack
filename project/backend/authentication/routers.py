from rest_framework.routers import SimpleRouter
from .viewsets import UserViewSet, LoginViewSet, RegistrationViewSet, RefreshViewSet, GoogleLoginViewSet


routes = SimpleRouter()

routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/googlelogin', GoogleLoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet, basename='auth-register')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')
routes.register(r'user', UserViewSet, basename='user')

urlpatterns = [
    *routes.urls
]