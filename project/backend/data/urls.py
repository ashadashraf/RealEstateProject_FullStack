from django.urls import path
from data.views import PropertyRegisterView, DocumentsViewset, GetPropertyByTypeView, GetPropertyDetail, GetMyPropertyListing, EditPropertyFavourite
from rest_framework.routers import SimpleRouter


router = SimpleRouter()
# router.register('property/adddocuments', DocumentsViewset)
urlpatterns = [
    path('register/', PropertyRegisterView.as_view(), name='property-register'),
    path('adddocuments/', DocumentsViewset.as_view(), name='property-add-documents'),
    path('browsebytype/', GetPropertyByTypeView.as_view(), name='browse-by-type'),
    path('details/', GetPropertyDetail.as_view(), name='property-detail'),
    path('myproperty/', GetMyPropertyListing.as_view(), name='property-detail'),
    path('favourite/', EditPropertyFavourite.as_view(), name='property-favourite'),
]
urlpatterns += router.urls