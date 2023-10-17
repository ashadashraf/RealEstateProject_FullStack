from rest_framework import viewsets, status
from maps.models import Maps
from .serializers import MapsSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

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