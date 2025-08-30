from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from users.models import Client
import random

class Command(BaseCommand):
    help = 'Populate database with mock client data'

    def handle(self, *args, **options):
        # Clear existing clients and users
        Client.objects.all().delete()
        User.objects.filter(username__startswith='client_').delete()
        
        # Mock client data
        clients_data = [
            {
                'username': 'client_john',
                'password': 'password123',
                'customer_name': 'John Smith',
                'customer_id': 'CUST001'
            },
            {
                'username': 'client_sarah',
                'password': 'password123',
                'customer_name': 'Sarah Johnson',
                'customer_id': 'CUST002'
            },
            {
                'username': 'client_mike',
                'password': 'password123',
                'customer_name': 'Mike Davis',
                'customer_id': 'CUST003'
            },
            {
                'username': 'client_emily',
                'password': 'password123',
                'customer_name': 'Emily Wilson',
                'customer_id': 'CUST004'
            },
            {
                'username': 'client_david',
                'password': 'password123',
                'customer_name': 'David Brown',
                'customer_id': 'CUST005'
            },
            {
                'username': 'client_lisa',
                'password': 'password123',
                'customer_name': 'Lisa Garcia',
                'customer_id': 'CUST006'
            },
            {
                'username': 'client_robert',
                'password': 'password123',
                'customer_name': 'Robert Martinez',
                'customer_id': 'CUST007'
            },
            {
                'username': 'client_jennifer',
                'password': 'password123',
                'customer_name': 'Jennifer Taylor',
                'customer_id': 'CUST008'
            },
            {
                'username': 'client_michael',
                'password': 'password123',
                'customer_name': 'Michael Anderson',
                'customer_id': 'CUST009'
            },
            {
                'username': 'client_amanda',
                'password': 'password123',
                'customer_name': 'Amanda Thomas',
                'customer_id': 'CUST010'
            }
        ]
        
        # Create clients
        for data in clients_data:
            # Create User first
            user = User.objects.create_user(
                username=data['username'],
                password=data['password'],
                email=f"{data['username']}@example.com"
            )
            
            # Create Client
            Client.objects.create(
                username=user,
                password=data['password'],
                customer_name=data['customer_name'],
                customer_id=data['customer_id']
            )
        
        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {len(clients_data)} clients')
        )
