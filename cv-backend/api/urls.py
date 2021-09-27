from rest_framework import routers, urlpatterns
from .views import WeatherDataViewSet, UserViewSet, GroupViewSet, RecipeViewSet, ProductMatchViewSet
from rest_framework.authtoken import views
from django.urls import include, path


router = routers.DefaultRouter()
router.register('api/weatherData', WeatherDataViewSet, 'weatherData')
router.register('api/users', UserViewSet, 'users')
router.register('api/groups', GroupViewSet, 'groups')
router.register('api/recipes', RecipeViewSet, 'recipes')
router.register('api/ProductSearch', ProductMatchViewSet, 'productSearch')


urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api-token-auth', views.obtain_auth_token),
]