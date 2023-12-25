from rest_framework import generics, viewsets, parsers
from rest_framework.response import Response
from rest_framework import status
from .models import Documents
from .serializers import PropertySerializer, DocumentsSerializer, AllPropertiesSerializer, FavouritesSerializer, PropertyStatusSerializer
from .models import Property
from authentication.models import User
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db.models import Q

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
    

class UpdateProperty(generics.UpdateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        formData = request.data
        property_id = formData['property_id']
        instance = Property.objects.get(id=property_id)
        serializer = self.get_serializer(instance, data=formData, partial=True)

        if serializer.is_valid():
            self.perform_update(serializer)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetPropertyByPropertyTypeView(generics.ListAPIView):
    queryset = Property.objects.all()
    serializer_class = AllPropertiesSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        property_type = self.request.query_params.get('browse_type')
        if property_type:
            self.queryset = Property.objects.filter(property_type=property_type, is_active=True)
        data = self.list(request, *args, **kwargs)
        return Response({'message': 'retrieval success', 'data': data.data}, status=status.HTTP_200_OK)

class GetPropertyByTransactionTypeView(generics.ListAPIView):
    queryset = Property.objects.all()
    serializer_class = AllPropertiesSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        transaction_type = self.request.query_params.get('transaction_type')
        if transaction_type:
            try:
                self.queryset = Property.objects.filter(transaction_type=transaction_type, is_active=True)
            except Property.DoesNotExist:
                return Response({'error': 'Property not found'}, status=status.HTTP_400_BAD_REQUEST)
            data = self.list(request, *args, **kwargs)
            return Response({'message': 'retrieval success', 'data': data.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'transaction_type parameter is required'}, status=status.HTTP_400_BAD_REQUEST)


class GetPropertyDetail(generics.RetrieveAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        property_id = self.request.query_params.get('property_id')
        user_id = self.request.query_params.get('user_id')
        success = False
        response = []
        if property_id:
            try:
                property_obj = Property.objects.get(id=property_id)
                serializer = PropertySerializer(property_obj, context={'request': self.request})
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
                    serializer = PropertySerializer(property, context={'request': self.request})
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
    
    def put(self, request, *args, **kwargs):
        success = False
        response = {'is_favourite': False}
        property_id = request.data.get('property_id')
        user_id = request.data.get('user_id')

        if property_id and user_id:
            try:
                property_instance = get_object_or_404(Property, id=property_id)
                user_instance = get_object_or_404(User, id=user_id)

                if property_instance in user_instance.favourites.all():
                    user_instance.favourites.remove(property_instance)
                else:
                    user_instance.favourites.add(property_instance)
                    response['is_favourite'] = True

                user_instance.save()
                success = True
            except Property.DoesNotExist:
                response['error'] = 'Property not found'
        else:
            response['error'] = 'property_id and user_id parameters are required'

        if success:
            return Response(response, status=status.HTTP_200_OK)
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class UpdatePropertyStatus(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = PropertyStatusSerializer
    permission_classes = [IsAuthenticated]
    
    def update(self, request, *args, **kwargs):
        success = False
        response = []
        property_id = self.request.data.get('property_id')
        property_status = self.request.data.get('property_status')
        user_id = self.request.data.get('user_id')
        if property_id:
            property_instance = Property.objects.get(id=property_id)
            print(property_status, property_instance, property_instance.is_active)
            property_instance.is_active = property_status
            property_instance.save()
            try:
                property_obj = Property.objects.filter(user_id=user_id)
                for property in property_obj:
                    serializer = PropertySerializer(property, context={'request': self.request})
                    if property_obj:
                        response.append(serializer.data)
                success = True
                print('success')
            except Property.DoesNotExist:
                response.append({'error': 'Property not found'})

        if success:
            return Response(response, status=status.HTTP_200_OK)
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
    
class GetFavouriteProperties(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = PropertySerializer
    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_id = request.query_params.get('user_id')
        if user_id:
            try:
                user_obj = User.objects.get(id=user_id)
                properties = user_obj.favourites.all()
                serializer = PropertySerializer(properties, many=True)
                return Response(serializer.data)
            except User.DoesNotExist:
                return Response({"error": "User not found"}, status=404)
        else:
            return Response({"error": "user_id parameter is required"}, status=400)
        
class SearchProperty(generics.ListAPIView):
    queryset = Property.objects.all()
    serializer_class = AllPropertiesSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        search_data = self.request.query_params.get('search')
        if search_data:
            try:
                self.queryset = Property.objects.filter(
                    Q(property_name=search_data) |
                    Q(price=search_data) |
                    Q(locality__unit=search_data) |
                    Q(locality__district=search_data) |
                    Q(locality__state=search_data) |
                    Q(locality__pincode=search_data),
                    is_active=True
                )
                print(self.queryset)
            except Property.DoesNotExist:
                return Response({'error': 'Property not found'}, status=status.HTTP_400_BAD_REQUEST)
            except ValueError:
                # Handle the ValueError (invalid literal for int() with base 10)
                # You may want to log the error or take other actions if needed
                print("Invalid integer for locality__pincode. Skipping this filter.")
                # Proceed with the other filters
                self.queryset = Property.objects.filter(
                    Q(property_name=search_data) |
                    Q(price=search_data) |
                    Q(locality__unit=search_data) |
                    Q(locality__district=search_data) |
                    Q(locality__state=search_data),
                    is_active=True
                )
                print(self.queryset)
            data = self.list(request, *args, **kwargs)
            return Response({'message': 'retrieval success', 'data': data.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'search value parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
