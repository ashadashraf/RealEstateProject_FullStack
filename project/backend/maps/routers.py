from rest_framework.routers import SimpleRouter
from .viewsets import AddMarkerViewSet

routes = SimpleRouter()

routes.register(r'maps/addmarker', AddMarkerViewSet, basename='maps-addmarker')

urlpatterns = [
    *routes.urls
]