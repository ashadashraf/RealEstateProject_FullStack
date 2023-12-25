from django.urls import path
from data.views import PropertyRegisterView, DocumentsViewset, GetPropertyByPropertyTypeView, GetPropertyDetail, GetMyPropertyListing, EditPropertyFavourite
from data.views import UpdatePropertyStatus, UpdateProperty, GetFavouriteProperties, GetPropertyByTransactionTypeView, SearchProperty
from rest_framework.routers import SimpleRouter


router = SimpleRouter()
# router.register('property/adddocuments', DocumentsViewset)
urlpatterns = [
    path('register/', PropertyRegisterView.as_view(), name='property-register'),
    path('adddocuments/', DocumentsViewset.as_view(), name='property-add-documents'),
    path('browsebytype/', GetPropertyByPropertyTypeView.as_view(), name='browse-by-property-type'),
    path('details/', GetPropertyDetail.as_view(), name='property-detail'),
    path('myproperty/', GetMyPropertyListing.as_view(), name='property-detail'),
    path('favourite/', EditPropertyFavourite.as_view(), name='property-favourite'),
    path('status/', UpdatePropertyStatus.as_view(), name='property-status'),
    path('update/', UpdateProperty.as_view(), name='property-update'),
    path('favouriteproperties/', GetFavouriteProperties.as_view(), name='favourite-properties'),
    path('browsebytransactiontype/', GetPropertyByTransactionTypeView.as_view(), name='-browse-by-transaction-type'),
    path('search/', SearchProperty.as_view(), name='-browse-by-transaction-type'),
]
urlpatterns += router.urls