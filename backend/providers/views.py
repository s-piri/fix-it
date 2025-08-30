from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Provider
from .serializers import ProviderSerializer
import random

class ProviderSearchView(APIView):
    def get(self, request):
        customer_id = request.GET.get('customer_id')
        job_type = request.GET.get('job_type')
        budget = request.GET.get('budget')
        
        if not all([customer_id, job_type, budget]):
            return Response({
                'error': 'Missing required parameters: customer_id, job_type, budget'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            budget = float(budget)
        except ValueError:
            return Response({
                'error': 'Budget must be a valid number'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        #Select providers that match the job type and are available from the db
        providers = Provider.objects.filter(
            job_type=job_type,
            is_available=True
        )
        
        max_hourly_rate = budget / 2  # Assuming 2 hours (place holder; maybe add logic later?)
        providers = providers.filter(hourly_rate__lte=max_hourly_rate)
        
        #providers = providers.order_by('-rating')[:1] 
        
        providers_list = list(providers)
        print(providers_list)
        random_provider = random.choice(providers_list)
        
        if not providers.exists():
            return Response({
                'error': f'No available providers found for {job_type} within your budget'
            }, status=status.HTTP_404_NOT_FOUND)
        
        #Select the provider with highest rating
        #Serialize to prevent sensitive data exposure (like hourly_rate)
        #serializer = ProviderSerializer(providers.first())
        serializer = ProviderSerializer(random_provider) # randomize to simulate matching cuz we don't have proper logic yet

        return Response({
            'customer_id': customer_id,
            'job_type': job_type,
            'budget': budget,
            'provider': serializer.data
        })
