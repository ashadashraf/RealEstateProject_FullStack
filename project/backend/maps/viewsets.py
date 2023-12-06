from rest_framework import viewsets, status, generics
from maps.models import Maps
from data.models import Property, GeoCordinates
from .serializers import MapsSerializer, GeoCordinatesSerializer
from data.serializers import PropertySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse

class AddMarkerViewSet(viewsets.ModelViewSet):
    http_method_names = ['post']
    serializer_class = MapsSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class GetAllCoordinates(generics.ListAPIView):
    serializer_class = PropertySerializer
    
    def get_queryset(self):
        return GeoCordinates.objects.all()
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = GeoCordinatesSerializer(queryset, many=True)
        geojson_data = {
            "type": "FeatureCollection",
            "features": []
        }

        for index, geo in enumerate(serializer.data):
            coordinates = [float(geo['longitude']), float(geo['latitude'])]

            # Retrieve Property information based on GeoCordinates ForeignKey
            property_info = Property.objects.filter(coordinates__latitude=geo['latitude'], coordinates__longitude=geo['longitude']).first()

            if property_info:
                feature = {
                    "type": "Feature",
                    "properties": {
                        "title": property_info.property_name,
                        "description": property_info.description,
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": coordinates,
                    }
                }
                geojson_data["features"].append(feature)
        
        return JsonResponse(geojson_data, safe=False)