from rest_framework import generics, viewsets, parsers
from rest_framework.response import Response
from rest_framework import status
from .models import Documents
from .serializers import PropertySerializer, DocumentsSerializer, AllPropertiesSerializer, FavouritesSerializer
from .models import Property
from authentication.models import User
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

# Create your views here.

class DocumentsViewset(generics.ListCreateAPIView):
    queryset = Documents.objects.all()
    serializer_class = DocumentsSerializer

    def create(self, request, *args, **kwargs):
        property_id = request.data['property']
        success = True
        response = []

        for image in request.FILES.getlist('property_images'):
            form_data = {
                'property': property_id,
                'image': image
            }
            
            serializer = DocumentsSerializer(data=form_data)
            if serializer.is_valid():
                serializer.save()
                response.append(serializer.data)
            else:
                success = False

        if success:
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PropertyRegisterView(generics.CreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    # parser_classes = [MultiPartParser, FormParser]
    # permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request, *args, **kwargs):
        formData = request.data
        print(formData)

        serializer = self.get_serializer(data=formData)

        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetPropertyByTypeView(generics.ListAPIView):
    queryset = Property.objects.all()
    serializer_class = AllPropertiesSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        property_type = self.request.query_params.get('browse_type')
        if property_type:
            self.queryset = Property.objects.filter(property_type=property_type)
        data = self.list(request, *args, **kwargs)
        return Response({'message': 'retrieval success', 'data': data.data}, status=status.HTTP_200_OK)

class GetPropertyDetail(generics.RetrieveAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        property_id = self.request.query_params.get('property_id')
        success = False
        response = []
        if property_id:
            try:
                property_obj = Property.objects.get(id=property_id)
                serializer = PropertySerializer(property_obj)
                success = True
                response.append(serializer.data)
            except Property.DoesNotExist:
                response.append({'error': 'Property not found'})
        else:
            response.append({'error': 'property_id parameter is required'})

        if success:
            return Response(response, status=status.HTTP_200_OK)
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
    
class GetMyPropertyListing(generics.ListAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        user_id = self.request.query_params.get('user_id')
        success = False
        response = []
        if user_id:
            try:
                property_obj = Property.objects.filter(user_id=user_id)
                for property in property_obj:
                    serializer = PropertySerializer(property)

                if property_obj:
                    response.append(serializer.data)
                success = True
            except Property.DoesNotExist:
                response.append({'error': 'Property not found'})
        else:
            response.append({'error': 'user_id parameter is required'})

        if success:
            return Response(response, status=status.HTTP_200_OK)
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
    
class EditPropertyFavourite(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = FavouritesSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
    def perform_update(self, serializer):
        property_id = self.request.data.get('property_id')
        if property_id:
            property_instance = Property.objects.get(id=property_id)
            user = self.request.user
            if property_instance in user.favourites.all():
                user.favourites.remove(property_instance)
            else:
                user.favourites.add(property_instance)
        serializer.save()