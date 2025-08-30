from rest_framework import serializers
from .models import Provider

class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = ['provider_id', 'provider_name', 'job_type', 'eta', 'hourly_rate', 'profile_picture', 'jobs', 'rating', 'vehicle', 'is_available']
