from django.core.management.base import BaseCommand
from providers.models import Provider

class Command(BaseCommand):
    help = 'Populate database with mock provider data'

    def handle(self, *args, **options):
        # Clear existing mock data
        Provider.objects.all().delete()
        
        # Mock data
        providers_data = [
            {
                'provider_id': 'PROV001',
                'provider_name': 'John Smith Plumbing',
                'job_type': 'plumbing',
                'eta': '30 minutes',
                'hourly_rate': 75.00,
                'rating': 4.8,
                'jobs': 124,
                'vehicle': 'Toyota HiAce',
                'is_available': True
            },
            {
                'provider_id': 'PROV002',
                'provider_name': 'Mike Johnson Electrical',
                'job_type': 'electrical',
                'eta': '45 minutes',
                'hourly_rate': 85.00,
                'rating': 4.9,
                'jobs': 89,
                'vehicle': 'Ford Transit',
                'is_available': True
            },
            {
                'provider_id': 'PROV003',
                'provider_name': 'Quick Fix Plumbing',
                'job_type': 'plumbing',
                'eta': '20 minutes',
                'hourly_rate': 80.00,
                'rating': 4.6,
                'jobs': 156,
                'vehicle': 'Mercedes Sprinter',
                'is_available': True
            },
            {
                'provider_id': 'PROV004',
                'provider_name': 'Spark Electric',
                'job_type': 'electrical',
                'eta': '35 minutes',
                'hourly_rate': 90.00,
                'rating': 4.8,
                'jobs': 67,
                'vehicle': 'Nissan NV200',
                'is_available': True
            },
            {
                'provider_id': 'PROV005',
                'provider_name': 'Handy Harry Services',
                'job_type': 'handyman',
                'eta': '1 hour',
                'hourly_rate': 65.00,
                'rating': 4.7,
                'jobs': 203,
                'vehicle': 'Chevrolet Express',
                'is_available': True
            },
            {
                'provider_id': 'PROV006',
                'provider_name': 'Master Fix Handyman',
                'job_type': 'handyman',
                'eta': '1.5 hours',
                'hourly_rate': 70.00,
                'rating': 4.9,
                'jobs': 178,
                'vehicle': 'Toyota HiAce',
                'is_available': True
            },
            {
                'provider_id': 'PROV007',
                'provider_name': 'Emergency Plumbing Plus',
                'job_type': 'plumbing',
                'eta': '15 minutes',
                'hourly_rate': 95.00,
                'rating': 4.5,
                'jobs': 92,
                'vehicle': 'Ford Transit',
                'is_available': True
            },
            {
                'provider_id': 'PROV008',
                'provider_name': 'Power Electric Solutions',
                'job_type': 'electrical',
                'eta': '40 minutes',
                'hourly_rate': 88.00,
                'rating': 4.7,
                'jobs': 145,
                'vehicle': 'Mercedes Sprinter',
                'is_available': True
            },
            {
                'provider_id': 'PROV009',
                'provider_name': 'All Around Handyman',
                'job_type': 'handyman',
                'eta': '2 hours',
                'hourly_rate': 60.00,
                'rating': 4.4,
                'jobs': 234,
                'vehicle': 'Nissan NV200',
                'is_available': True
            },
            {
                'provider_id': 'PROV010',
                'provider_name': 'Reliable Plumbing Co',
                'job_type': 'plumbing',
                'eta': '25 minutes',
                'hourly_rate': 78.00,
                'rating': 4.8,
                'jobs': 167,
                'vehicle': 'Chevrolet Express',
                'is_available': True
            },
            {
                'provider_id': 'PROV011',
                'provider_name': 'Auto Care Mechanics',
                'job_type': 'mechanic',
                'eta': '45 minutes',
                'hourly_rate': 85.00,
                'rating': 4.7,
                'jobs': 98,
                'vehicle': 'Toyota HiAce',
                'is_available': True
            },
            {
                'provider_id': 'PROV012',
                'provider_name': 'Quick Lock Services',
                'job_type': 'locksmith',
                'eta': '20 minutes',
                'hourly_rate': 95.00,
                'rating': 4.9,
                'jobs': 76,
                'vehicle': 'Ford Transit',
                'is_available': True
            },
            {
                'provider_id': 'PROV013',
                'provider_name': 'Precision Carpentry',
                'job_type': 'carpenter',
                'eta': '1.5 hours',
                'hourly_rate': 75.00,
                'rating': 4.8,
                'jobs': 112,
                'vehicle': 'Mercedes Sprinter',
                'is_available': True
            }
        ]

        for data in providers_data:
            Provider.objects.create(**data)
        
        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {len(providers_data)} providers')
        )
