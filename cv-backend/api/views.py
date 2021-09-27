from .models import WeatherData, Recipe, Product, Ingredient
from rest_framework import viewsets, permissions
from rest_framework.authentication import BasicAuthentication, SessionAuthentication, TokenAuthentication
from .serializers import WeatherDataSerializer, UserSerializer, GroupSerializer, RecipeSerializer, ProductSerializer, IngredientSerializer
from datetime import datetime, timedelta
from .weatherdata_utils import *
from django.contrib.auth.models import User, Group


class ProductMatchViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    authentication_classes = [TokenAuthentication, SessionAuthentication, BasicAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        headers = self.request.headers
        search_term = headers['Finditem'] if 'Finditem' in headers else ''
        if not search_term:
            return []
        search_terms = search_term.split(',')
        return_list = []
        for item in search_terms:
            matching_ingredients = self.find_matching_ingredients(item)
            matching_products = self.find_matching_products(matching_ingredients)
            return_list += matching_products
        return return_list
        
    def find_matching_ingredients(self, search_term):
        return Ingredient.objects.filter(plural__contains = search_term) | Ingredient.objects.filter(basic__contains = search_term)

    def find_matching_products(self, ingredients):
        matching_products = []
        for ingredient in ingredients:
            matching_products += Product.objects.filter(ingredient_id = ingredient)
        return matching_products
        

class WeatherDataViewSet(viewsets.ModelViewSet):
    serializer_class = WeatherDataSerializer
    authentication_classes = [TokenAuthentication, SessionAuthentication, BasicAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_authenticate_header(self, request):
        return super().get_authenticate_header(request)
    
    def get_queryset(self):
        queryset = WeatherData.objects.all()
        location = self.request.query_params.get("location") if self.request.query_params.get("location") != 'undefined' else ''
        endtime = self.request.query_params.get("endtime") if self.request.query_params.get("endtime") != 'undefined' else ''
        starttime = self.request.query_params.get("starttime") if self.request.query_params.get("starttime") != 'undefined' else ''

        if not endtime and not starttime:
            endtime = (datetime.utcnow()).isoformat(timespec="seconds")
            starttime = (datetime.fromisoformat(endtime) - timedelta(days=3)).isoformat(timespec="seconds")
        elif not endtime and starttime:
            starttime = (datetime.fromisoformat(starttime) - timedelta(hours=3)).isoformat(timespec="seconds")
            endtime = (datetime.fromisoformat(starttime) + timedelta(days=3)).isoformat(timespec="seconds")
        elif endtime and not starttime:
            endtime = (datetime.utcnow()).isoformat(timespec="seconds")
            starttime = (datetime.fromisoformat(endtime) - timedelta(days=3)).isoformat(timespec="seconds")
        else:
            endtime = (datetime.fromisoformat(endtime) - timedelta(hours=3)).isoformat(timespec="seconds")
            starttime = (datetime.fromisoformat(starttime) - timedelta(hours=3)).isoformat(timespec="seconds")

        if not location:
            location = 'Turku'

        queryset = filterQuery(queryset, location, endtime, starttime)
        queryset = fillMissingData(queryset, endtime, starttime, location)

        if not queryset:
            queryForNewData(location, endtime, starttime)
            queryset = filterQuery(WeatherData.objects.all(), location, endtime, starttime)
        
        return queryset

class RecipeViewSet(viewsets.ModelViewSet):
    serializer_class = RecipeSerializer
    authentication_classes = [TokenAuthentication, SessionAuthentication, BasicAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        headers = self.request.headers
        print(headers)

        queryset = Recipe.objects.all().filter(
            category__contains=headers['category'] if 'category' in headers else ''
        ).filter(
            name__contains=headers['name'] if 'name' in headers else ''
        ).filter(
            ingredients__contains=headers['ingredients'] if 'ingredients' in headers else ''
        )

        return queryset

    def get_authenticate_header(self, request):
        return super().get_authenticate_header(request)
    

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication, BasicAuthentication]


    def get_authenticate_header(self, request):
        return super().get_authenticate_header(request)

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

