from django.urls import path
from .views import ProviderSearchView

urlpatterns = [
    path('search/', ProviderSearchView.as_view(), name='provider-search'),
]
