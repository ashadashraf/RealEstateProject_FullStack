from rest_framework.routers import SimpleRouter
from .viewsets import AddMarkerViewSet, GetAllCoordinates
from django.urls import path

routes = SimpleRouter()

routes.register(r'addmarker', AddMarkerViewSet, basename='maps-addmarker')

urlpatterns = [
    path('allcoordinates/', GetAllCoordinates.as_view(), name='property-allcoordinates'),
    *routes.urls
]