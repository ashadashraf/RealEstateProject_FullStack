from rest_framework.routers import SimpleRouter
from .viewsets import AddMarkerViewSet

routes = SimpleRouter()

routes.register(r'addmarker', AddMarkerViewSet, basename='maps-addmarker')

urlpatterns = [
    *routes.urls
]